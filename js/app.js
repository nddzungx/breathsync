/* BreathSync – giao diện & bộ máy phiên thở.
   Phụ thuộc: js/i18n.js (I18N), js/data.js (APP, MODES, BRAKE, SAFETY, ABOUT, CONSENT), js/audio.js (Sound). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const KEY = 'breathsync:v2', SESS = 'breathsync:sessions';
  const DURS = [1, 3, 5, 10, 15, Infinity];

  /* ================= cài đặt ================= */
  function load(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  const old = load('breathsync:settings', {}); // bản 1.x
  const S = Object.assign({
    lang: null, mode: { diaphragm: 'belly' }[old.lastMode] || old.lastMode || 'belly',
    variant: { theta: old.thetaVariant || 'A' }, dur: old.lastDuration === 'inf' ? 'inf' : (old.lastDuration || 5),
    sound: old.soundOn !== false, vib: old.vibrateOn !== false, ambience: 'ocean', bell: true, voice: false, binaural: false, volume: 70,
    timing: old.timingMode === 'custom' ? 'custom' : 'standard', inhale: typeof old.customInhaleSec === 'number' ? old.customInhaleSec : null,
    agreed: false, holdSeen: false, welcomeHidden: false
  }, load(KEY, {}));
  if (!MODES.find(m => m.id === S.mode)) S.mode = 'belly';
  const qs = new URLSearchParams(location.search);
  if (qs.get('lang') === 'en' || qs.get('lang') === 'vi') S.lang = qs.get('lang');
  if (!S.lang) S.lang = (navigator.language || 'vi').toLowerCase().startsWith('vi') ? 'vi' : 'en';
  const persist = () => save(KEY, S);

  const tr = (o) => (o && typeof o === 'object') ? (o[S.lang] || o.vi) : o;
  function t(k, vars) { let s = (I18N[S.lang] && I18N[S.lang][k]) || I18N.vi[k] || k; if (vars) for (const v in vars) s = s.split('{' + v + '}').join(vars[v]); return s; }
  const durMin = () => S.dur === 'inf' ? Infinity : +S.dur;

  /* ================= kỹ thuật & nhịp ================= */
  const mode = () => MODES.find(m => m.id === S.mode);
  function variant() { const m = mode(); const id = S.variant[m.id] || m.variants[0].id; return m.variants.find(v => v.id === id) || m.variants[0]; }
  const r1 = x => Math.round(x * 10) / 10;
  function phases() {
    const base = variant().phases;
    if (S.timing === 'custom' && S.inhale) { const k = S.inhale / base[0].dur; return base.map(p => Object.assign({}, p, { dur: Math.max(.5, r1(p.dur * k)) })); }
    return base;
  }

  /* ================= trạng thái phiên ================= */
  const R = { running: false, paused: false, idx: 0, phaseStart: 0, sessStart: 0, pausedAt: 0, cycles: 0, lastSec: -1, lastKey: null, lastIdx: -1, raf: 0 };

  /* ================= DOM ================= */
  const el = {
    band: $('bandBadge'), src: $('srcBadge'), phase: $('phaseLabel'), count: $('countNum'), ratio: $('ratioCap'), hint: $('phaseHint'),
    ring: $('ringGroup'), prog: $('progressRing'), fill: $('sessionFill'), meta: $('metaRow'), cyc: $('cycleNum'), tNow: $('timeNow'), tTot: $('timeTotal'),
    tap: $('tapHint'), modes: $('modeRail'), vars: $('variantRow'), caution: $('cautionBox'), cautionT: $('cautionText'), dur: $('durRow'),
    go: $('goBtn'), goL: $('goLabel'), goI: $('goIcon'), reset: $('resetBtn'), snd: $('soundBtn'), today: $('todayRow'), streak: $('streakText')
  };
  const RC = 2 * Math.PI * 140; el.prog.style.strokeDasharray = RC.toFixed(2);

  /* ================= dựng giao diện ================= */
  function applyI18n() {
    document.documentElement.lang = S.lang;
    document.querySelectorAll('[data-i]').forEach(n => { n.textContent = t(n.dataset.i); });
    document.querySelectorAll('[data-i-html]').forEach(n => { n.innerHTML = t(n.dataset.iHtml); });
    document.querySelectorAll('[data-i-aria]').forEach(n => { n.setAttribute('aria-label', t(n.dataset.iAria)); });
    $('langBtn').textContent = S.lang === 'vi' ? 'EN' : 'VI'; $('langBtn').setAttribute('aria-label', t('lang_to'));
    $('welcomeCard').hidden = !!S.welcomeHidden;
    $('streakPill').title = t('streak_title');
    $('verText').textContent = APP.version;
  }
  function renderModes() {
    el.modes.innerHTML = '';
    MODES.forEach(m => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'mode' + (m.id === S.mode ? ' on' : '');
      b.style.setProperty('--card-rgb', m.rgb); b.dataset.id = m.id;
      b.innerHTML = `<span class="n"><span>0${m.n}</span><span>${esc(tr(m.src))}</span></span><b>${esc(tr(m.name))}</b><small>${esc(tr(m.band))}</small>`;
      b.addEventListener('click', () => selectMode(m.id));
      el.modes.appendChild(b);
    });
  }
  function renderVariants() {
    const m = mode(), v = variant();
    el.vars.hidden = m.variants.length < 2; el.vars.innerHTML = '';
    m.variants.forEach(x => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'variant' + (x.id === v.id ? ' on' : '');
      b.innerHTML = `${esc(tr(x.sub))}<b>${esc(tr(x.label))}</b>`;
      b.addEventListener('click', () => {
        if (x.hold && !S.holdSeen) { S.holdSeen = true; toast(t('first_hold'), 4200); }
        S.variant[m.id] = x.id; persist(); stop(false); renderVariants(); renderMode();
      });
      el.vars.appendChild(b);
    });
  }
  function renderMode() {
    const m = mode(), root = document.documentElement.style;
    root.setProperty('--accent', m.accent); root.setProperty('--accent-soft', m.soft); root.setProperty('--accent-rgb', m.rgb);
    document.querySelector('meta[name=theme-color]').setAttribute('content', '#0a0f1c');
    el.band.textContent = tr(m.band); el.src.textContent = tr(m.src);
    [...el.modes.children].forEach(c => c.classList.toggle('on', c.dataset.id === m.id));
    el.cautionT.textContent = tr(m.caution); el.caution.hidden = !m.caution;
    $('whySub').textContent = tr(m.name);
    $('howList').innerHTML = m.how.map(x => `<li>${esc(tr(x))}</li>`).join('');
    $('whenText').textContent = tr(m.when);
    const lvName = { y: t('level_y'), p: t('level_p'), d: t('level_d') };
    $('evText').innerHTML = m.ev.map(([x, lv]) => `<p>${esc(tr(x))} <span class="lv ${lv}">${lvName[lv]}</span></p>`).join('');
    $('tagRow').innerHTML = m.tags.map(x => `<span class="tag">${esc(tr(x))}</span>`).join('');
    $('srcText').innerHTML = `${t('source')}: ${esc(tr(m.source))}` + (m.link ? ` <a href="${m.link}" target="_blank" rel="noopener">YouTube ↗</a>` : '');
    renderRatio(); renderTimingPreview(); readyReadout();
  }
  function renderRatio() {
    const ps = phases();
    el.ratio.innerHTML = ps.map((p, i) => `<span class="seg" data-i="${i}">${fmtN(p.dur)}</span>` + (i < ps.length - 1 ? '<span class="sep">·</span>' : '')).join('');
  }
  const fmtN = x => (Math.round(x * 10) / 10).toString().replace('.', S.lang === 'vi' ? ',' : '.');
  function renderDur() {
    el.dur.innerHTML = '';
    DURS.forEach(d => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
      const val = isFinite(d) ? d : 'inf'; b.textContent = isFinite(d) ? d + "'" : '∞';
      b.setAttribute('aria-pressed', String(String(S.dur) === String(val)));
      b.setAttribute('aria-label', isFinite(d) ? d + ' ' + t('min') : '∞');
      b.addEventListener('click', () => { S.dur = val; persist(); renderDur(); updateTotal(); });
      el.dur.appendChild(b);
    });
    updateTotal();
  }
  function renderBrake() {
    const B = BRAKE;
    $('brakeBody').innerHTML = `<p class="hint">${esc(tr(B.intro))}</p>
      <table class="t"><thead><tr>${B.head.map(h => `<th>${esc(tr(h))}</th>`).join('')}</tr></thead>
      <tbody>${B.rows.map(r => `<tr><td>${esc(tr(r[0]))}</td><td class="mono"><b>${r[1]}</b></td><td>${esc(tr(r[2]))}</td></tr>`).join('')}</tbody></table>
      <div><p class="label">${esc(tr(B.planTitle))}</p><ul class="list">${B.plan.map(p => `<li>${tr(p)}</li>`).join('')}</ul></div>
      <p class="hint">${esc(tr(B.base))}</p>`;
  }
  function renderSafety() { $('safetyList').innerHTML = SAFETY.map(s => `<li>${tr(s)}</li>`).join(''); }
  function renderSoundUI() {
    document.querySelectorAll('#ambRow .chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.amb === S.ambience)));
    $('optBell').checked = S.bell; $('optVoice').checked = S.voice; $('optBin').checked = S.binaural; $('optVib').checked = S.vib;
    $('volRange').value = S.volume;
    el.snd.setAttribute('aria-pressed', String(S.sound));
    el.snd.querySelector('.on').hidden = !S.sound; el.snd.querySelector('.off').hidden = S.sound;
    const parts = [];
    if (S.ambience !== 'off') parts.push(t('amb_' + S.ambience));
    if (S.bell) parts.push(S.lang === 'vi' ? 'chuông bát' : 'bowl');
    if (S.voice) parts.push(S.lang === 'vi' ? 'giọng đọc' : 'voice');
    $('soundSub').textContent = S.sound ? (parts.join(' · ') || t('amb_off')) : t('sound_off');
    Sound.set('volume', S.volume / 100); Sound.set('ambience', S.ambience); Sound.set('binaural', S.binaural); Sound.set('binHz', mode().binaural);
  }
  function renderTimingUI() {
    $('timingStd').setAttribute('aria-pressed', String(S.timing === 'standard'));
    $('timingCus').setAttribute('aria-pressed', String(S.timing === 'custom'));
    $('timingPanel').hidden = S.timing !== 'custom';
    $('inhaleInput').value = S.inhale || variant().phases[0].dur;
    $('timingSub').textContent = S.timing === 'custom' && S.inhale ? t('timing_cus', { s: fmtN(S.inhale) }) : t('timing_std');
    renderTimingPreview();
  }
  function renderTimingPreview() {
    const p = $('timingPreview'); if (!p) return;
    p.textContent = S.timing === 'custom' && S.inhale ? t('new_rhythm', { r: phases().map(x => fmtN(x.dur)).join(' · ') }) : '';
  }
  function renderAll() {
    applyI18n(); renderModes(); renderVariants(); renderMode(); renderDur(); renderBrake(); renderSafety(); renderSoundUI(); renderTimingUI(); renderToday(); rateRender();
    setGo();
  }

  /* ================= đọc số ================= */
  const ease = x => -(Math.cos(Math.PI * x) - 1) / 2;
  const scaleRing = s => { el.ring.style.transform = `scale(${s.toFixed(4)})`; };
  const arc = f => { el.prog.style.strokeDashoffset = (RC * (1 - Math.max(0, Math.min(1, f)))).toFixed(2); };
  function hiSeg(i) { [...el.ratio.children].forEach(s => { if (s.classList.contains('seg')) s.classList.toggle('on', +s.dataset.i === i); }); }
  function readyReadout() {
    if (R.running) return;
    el.phase.textContent = t('ready'); el.count.textContent = fmtN(Math.ceil(phases()[0].dur)); el.hint.textContent = '';
    scaleRing(.62); arc(0); hiSeg(-1); el.fill.style.width = '0%'; el.meta.hidden = true; el.tap.textContent = t('tap_hint');
  }
  const mmss = s => { s = Math.max(0, Math.floor(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  function updateTotal() { el.tTot.textContent = isFinite(durMin()) ? mmss(durMin() * 60) : '∞'; }
  function setGo() {
    const play = '<polygon points="6 3 20 12 6 21"/>', pause = '<rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/>';
    if (!R.running) { el.goL.textContent = t('start'); el.goI.innerHTML = play; }
    else if (R.paused) { el.goL.textContent = t('resume'); el.goI.innerHTML = play; }
    else { el.goL.textContent = t('pause'); el.goI.innerHTML = pause; }
    document.body.classList.toggle('running', R.running);
    el.reset.disabled = !R.running;
    if (R.running) el.tap.textContent = R.paused ? t('tap_hint_pause') : t('tap_hint_run');
  }

  /* ================= màn hình luôn sáng ================= */
  let lock = null;
  async function wake(on) {
    try {
      if (on && 'wakeLock' in navigator && !lock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); }
      if (!on && lock) { await lock.release(); lock = null; }
    } catch (e) { lock = null; }
  }

  /* ================= phiên thở ================= */
  function start() {
    if (!S.agreed) { openConsent(); return; }
    if (S.sound) { Sound.init(); Sound.set('binHz', mode().binaural); Sound.startAmbient(); }
    Object.assign(R, { running: true, paused: false, idx: 0, cycles: 0, lastSec: -1, lastKey: null, lastIdx: -1 });
    R.sessStart = R.phaseStart = performance.now();
    el.meta.hidden = false; $('swBtn').disabled = true; $('inhaleInput').disabled = true;
    setGo(); wake(true); window.scrollTo({ top: 0, behavior: 'smooth' }); tick();
  }
  function pause() {
    R.paused = true; R.pausedAt = performance.now(); cancelAnimationFrame(R.raf);
    Sound.stopAmbient(); if ('speechSynthesis' in window) speechSynthesis.cancel();
    el.phase.textContent = t('paused'); setGo(); wake(false);
  }
  function resume() {
    const d = performance.now() - R.pausedAt; R.phaseStart += d; R.sessStart += d; R.paused = false;
    R.lastKey = null; R.lastIdx = -1; // phát lại tín hiệu nhịp hiện tại
    if (S.sound) { Sound.init(); Sound.startAmbient(); }
    setGo(); wake(true); tick();
  }
  function stop(log) {
    if (R.running && log) { const ms = (R.paused ? R.pausedAt : performance.now()) - R.sessStart; if (ms > 25000) logSession(ms); }
    R.running = false; R.paused = false; cancelAnimationFrame(R.raf);
    Sound.stopAmbient(); if ('speechSynthesis' in window) speechSynthesis.cancel();
    $('swBtn').disabled = false; $('inhaleInput').disabled = false;
    setGo(); wake(false); readyReadout();
  }
  function finish() {
    logSession(performance.now() - R.sessStart);
    R.running = false; cancelAnimationFrame(R.raf); Sound.stopAmbient();
    if (S.sound && S.bell) Sound.gong();
    if (S.sound && S.voice) Sound.say(S.lang === 'vi' ? 'Hoàn thành. Thở tự nhiên nhé.' : 'Well done. Breathe naturally.', S.lang);
    $('swBtn').disabled = false; $('inhaleInput').disabled = false;
    setGo(); wake(false);
    el.phase.textContent = t('done'); el.count.textContent = '✓'; el.hint.textContent = ''; scaleRing(.62); arc(1); hiSeg(-1); el.fill.style.width = '100%';
    el.tap.textContent = t('tap_hint');
    setTimeout(() => { if (!R.running) { el.fill.style.width = '0%'; arc(0); } }, 2500);
    if (S.vib && navigator.vibrate) navigator.vibrate([80, 120, 80, 120, 160]);
  }
  function onPhase(p) {
    el.phase.textContent = tr(p.label); el.hint.textContent = tr(p.hint) || ''; hiSeg(R.idx);
    if (S.sound) {
      Sound.breath(p.key, p.dur);
      if (S.bell) Sound.cue(p.key);
      if (S.voice) Sound.say(tr(p.label).replace(/[–-].*$/, '').trim(), S.lang);
    }
    if (S.vib && navigator.vibrate) navigator.vibrate(p.key === 'inhale' ? 60 : p.key === 'hold' ? [30, 60, 30] : 100);
  }
  function tick() {
    if (!R.running || R.paused) return;
    const nowT = performance.now(), ps = phases();
    if (R.idx >= ps.length) R.idx = 0;
    let p = ps[R.idx], el2 = (nowT - R.phaseStart) / 1000;
    while (el2 >= p.dur) {
      R.phaseStart += p.dur * 1000; R.idx++;
      if (R.idx >= ps.length) { R.idx = 0; R.cycles++; }
      p = ps[R.idx]; el2 = (nowT - R.phaseStart) / 1000; R.lastSec = -1;
    }
    const tot = durMin() * 60, se = (nowT - R.sessStart) / 1000;
    // hết giờ: kết thúc ngay khi vừa xong trọn một chu kỳ (không cắt ngang thì thở ra)
    if (isFinite(tot) && se >= tot && ((R.idx === 0 && R.lastIdx > 0) || se >= tot + 30)) { finish(); return; }
    if (R.idx !== R.lastIdx) { R.lastIdx = R.idx; R.lastKey = p.key; onPhase(p); }
    const pr = Math.min(1, el2 / p.dur); let s;
    if (p.key === 'inhale') s = .62 + .38 * ease(pr);
    else if (p.key === 'exhale' || p.key === 'hum') s = 1 - .38 * ease(pr);
    else s = 1;
    if (!reduce) { if (p.key === 'hum') s += Math.sin(nowT / 1000 * 2 * Math.PI * 4) * .012; else if (p.key === 'hold') s += Math.sin(nowT / 1000 * 2 * Math.PI * .6) * .006; }
    scaleRing(s); arc(pr);
    const rem = Math.max(1, Math.ceil(p.dur - el2 - 1e-6));
    if (rem !== R.lastSec) { R.lastSec = rem; el.count.textContent = rem; }
    el.cyc.textContent = R.cycles;
    el.tNow.textContent = mmss(se);
    if (isFinite(tot)) el.fill.style.width = Math.min(100, se / tot * 100).toFixed(2) + '%';
    else el.fill.style.width = (50 + 10 * Math.sin(se / 6)) + '%';
    R.raf = requestAnimationFrame(tick);
  }
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function selectMode(id) {
    if (S.mode === id) return;
    S.mode = id; persist(); stop(false); renderVariants(); renderMode(); renderTimingUI(); renderSoundUI();
    const b = el.modes.querySelector(`[data-id="${id}"]`); if (b) b.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }

  /* ================= nhật ký & chuỗi ngày ================= */
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  function logSession(ms) {
    const a = load(SESS, []); a.push({ date: iso(new Date()), modeId: S.mode, v: variant().id, minutes: Math.round(ms / 6000) / 10 });
    if (a.length > 1000) a.splice(0, a.length - 1000); save(SESS, a); renderToday();
  }
  function renderToday() {
    const a = load(SESS, []), days = new Set(a.map(s => s.date)), today = iso(new Date());
    let streak = 0; const c = new Date(); if (!days.has(today)) c.setDate(c.getDate() - 1);
    while (days.has(iso(c))) { streak++; c.setDate(c.getDate() - 1); }
    const tm = a.filter(s => s.date === today).reduce((x, s) => x + (s.minutes || 0), 0);
    const all = a.reduce((x, s) => x + (s.minutes || 0), 0);
    el.streak.textContent = t('streak_pill', { d: streak });
    el.today.innerHTML = [t('today', { m: fmtN(Math.round(tm * 10) / 10) }), t('streak_l', { d: streak }), t('total', { m: Math.round(all) })].map(x => `<span>${x}</span>`).join('');
  }

  /* ================= nhịp riêng ================= */
  const sw = { on: false, t0: 0, raf: 0 };
  function swTick() { if (!sw.on) return; $('swRead').textContent = ((performance.now() - sw.t0) / 1000).toFixed(1) + 's'; sw.raf = requestAnimationFrame(swTick); }
  function setInhale(sec) {
    S.inhale = r1(Math.min(12, Math.max(2, sec))); persist();
    $('inhaleInput').value = S.inhale; renderRatio(); renderTimingUI(); readyReadout();
  }

  /* ================= đo nhịp thở tự nhiên ================= */
  const RM = { taps: [], reads: [] };
  const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
  function stable(a, n) {
    if (!a.length) return { v: null, c: 0, idx: new Set() };
    const s = [...a].sort((x, y) => x - y), h = s.length / 2, med = s.length % 2 ? s[Math.floor(h)] : (s[h - 1] + s[h]) / 2;
    const pick = a.map((v, i) => ({ v, i, d: Math.abs(v - med) })).sort((x, y) => x.d - y.d || x.i - y.i).slice(0, Math.min(n, a.length));
    return { v: mean(pick.map(p => p.v)), c: pick.length, idx: new Set(pick.map(p => p.i)) };
  }
  function rateRender() {
    const n = RM.taps.length, m = RM.reads.length;
    $('rateCount').textContent = n ? t('rate_n', { n, m }) : t('rate_none');
    if (!m) { $('rateLast').textContent = $('rateAll').textContent = $('rateStable').textContent = '—'; $('rateHist').innerHTML = ''; return; }
    $('rateLast').textContent = fmtN(RM.reads[m - 1]); $('rateAll').textContent = fmtN(mean(RM.reads));
    const st = stable(RM.reads, 10); $('rateStable').textContent = fmtN(st.v) + (st.c < 10 ? ` (${st.c}/10)` : '');
    $('rateHist').innerHTML = RM.reads.map((b, i) => `<i class="${st.idx.has(i) ? 'st' : ''}${i === m - 1 ? ' last' : ''}">${fmtN(b)}</i>`).join('');
    $('rateHist').scrollLeft = 1e6;
  }

  /* ================= tiện ích ================= */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  let toastT = 0;
  function toast(msg, ms) { const n = $('toast'); n.textContent = msg; n.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { n.hidden = true; }, ms || 2000); }
  async function copy(v) {
    try { await navigator.clipboard.writeText(v); }
    catch (e) { const ta = document.createElement('textarea'); ta.value = v; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (x) { } ta.remove(); }
    toast(t('copied') + ': ' + v);
  }

  /* ================= giới thiệu & ủng hộ ================= */
  function openAbout(scrollTo) {
    const A = ABOUT, y = new Date().getFullYear();
    const appsHtml = APP.apps.map(a => `<a class="btn line sm" href="${a.url}" target="_blank" rel="noopener">${esc(tr(a))}</a>`).join('');
    $('aboutBody').innerHTML = `
      <div class="sheet-head"><h2 id="aboutTitle">${esc(t('about_short'))}</h2><button class="icon-btn" type="button" data-close aria-label="${esc(t('close'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
      <div class="about-hero"><img src="img/logo.svg" alt="BreathSync"><b>BreathSync</b><span class="src">${esc(tr(A.tagline))} · ${esc(tr(A.version))} ${APP.version}</span></div>
      <div class="card"><p class="label">${esc(tr(A.appTitle))}</p><p class="hint">${esc(tr(A.app))}</p><div class="btn-row" style="justify-content:flex-start;margin-top:10px"><button class="btn sm" type="button" data-guide>${esc(t('open_guide_about'))}</button></div></div>
      <div class="card"><p class="label">${esc(tr(A.devTitle))}</p><div class="row" style="align-items:flex-start"><span class="avatar">D</span><p class="hint">${tr(A.dev)}</p></div></div>
      <div class="card center" id="coffee"><p class="label">${esc(tr(A.coffeeTitle))}</p><p class="hint">${esc(tr(A.coffee))}</p>
        <img class="qr" src="img/qr_ung_ho.png" alt="VietQR ${APP.bank.bank} ${APP.bank.acc}" width="230">
        <p class="hint"><b>${APP.bank.name}</b><br>${APP.bank.bank} · <b class="mono">${APP.bank.acc}</b></p>
        <div class="btn-row" style="margin-top:8px"><button class="btn sm" type="button" data-copy="${APP.bank.acc}">📋 ${esc(tr(A.copyAcc))}</button></div>
        <p class="src" style="margin-top:8px">${esc(tr(A.qrHelp))}</p>
        <hr style="border:0;border-top:1px solid var(--line);margin:14px 0">
        <p class="label">${esc(tr(A.paypalTitle))}</p><p class="hint">${esc(tr(A.paypal))}</p>
        <p class="hint mono" style="margin-top:6px"><b>${APP.paypal.email}</b></p>
        <div class="btn-row" style="margin-top:8px"><a class="btn sm" href="${APP.paypal.me || 'https://www.paypal.com/myaccount/transfer/homepage/pay'}" target="_blank" rel="noopener">🅿️ ${esc(tr(A.openPaypal))}</a><button class="btn line sm" type="button" data-copy="${APP.paypal.email}">📋 ${esc(tr(A.copyPaypal))}</button></div>
      </div>
      <div class="card"><p class="label">${esc(tr(A.shareTitle))}</p><p class="hint mono"><b>${APP.url}</b></p>
        <div class="btn-row" style="justify-content:flex-start;margin-top:8px"><button class="btn sm" type="button" data-share>📤 ${esc(tr(A.share))}</button><button class="btn line sm" type="button" data-copy="${APP.url}">📋 ${esc(tr(A.copyLink))}</button><a class="btn line sm" href="${APP.repo}" target="_blank" rel="noopener">${esc(tr(A.github))}</a></div></div>
      <div class="card"><p class="label">${esc(tr(A.moreTitle))}</p><div class="btn-row" style="justify-content:flex-start"><a class="btn sm" href="${APP.site}" target="_blank" rel="noopener">hlvsuckhoe.com</a>${appsHtml}</div></div>
      <div class="card"><p class="label">${esc(tr(A.contactTitle))}</p><p class="hint">${esc(tr(A.contact))} <b>${APP.email}</b></p>
        <div class="btn-row" style="justify-content:flex-start;margin-top:8px"><a class="btn sm" href="mailto:${APP.email}?subject=${encodeURIComponent('BreathSync v' + APP.version)}">✉️ ${esc(tr(A.sendMail))}</a><button class="btn line sm" type="button" data-copy="${APP.email}">📋 ${APP.email}</button></div></div>
      <div class="card" id="disclaimer"><p class="label">${esc(tr(A.disTitle))}</p><ol class="list">${A.dis.map(d => `<li>${tr(d)}</li>`).join('')}</ol></div>
      <div class="card"><p class="label">${esc(tr(A.copyTitle))}</p><p class="hint">${esc(tr(A.copy).replace('{y}', y > 2026 ? '2026–' + y : '2026'))}</p><p class="src" style="margin-top:6px">${esc(tr(A.credit))}</p></div>`;
    $('aboutSheet').hidden = false; document.body.style.overflow = 'hidden';
    const inner = $('aboutBody'); inner.scrollTop = 0;
    if (scrollTo) setTimeout(() => { const n = $(scrollTo); if (n) n.scrollIntoView({ block: 'start' }); }, 30);
    inner.querySelector('[data-close]').focus();
  }
  function openGuide() {
    const G = GUIDE, pickId = ['belly:A', 'alpha:A', 'theta:A', 'delta:A', 'belly:B', 'belly:C', 'hum:A'];
    const sec = x => {
      let h = `<div class="card"><h3>${esc(tr(x.h))}</h3>`;
      if (x.body) h += x.body.map(p => `<p class="hint" style="margin-bottom:8px">${tr(p)}</p>`).join('');
      if (x.steps) h += `<ol class="steps">${x.steps.map(p => `<li>${tr(p)}</li>`).join('')}</ol>`;
      if (x.list) h += `<ul class="list">${x.list.map(p => `<li>${tr(p)}</li>`).join('')}</ul>`;
      if (x.note) h += `<p class="src" style="margin-top:8px">${esc(tr(x.note))}</p>`;
      if (x.table) h += `<table class="t"><tbody>${x.table.map((r, i) => `<tr><td>${esc(tr(r[0]))}</td><td><button class="btn line sm" type="button" data-pick="${pickId[i]}" style="white-space:nowrap">${esc(tr(r[1]))}</button></td></tr>`).join('')}</tbody></table>`;
      if (x.qa) h += `<div class="qa">${x.qa.map(q => `<b>${esc(tr(q[0]))}</b><p>${esc(tr(q[1]))}</p>`).join('')}</div>`;
      return h + '</div>';
    };
    $('guideBody').innerHTML = `<div class="sheet-head"><h2 id="guideTitle">${esc(tr(G.title))}</h2><button class="icon-btn" type="button" data-close aria-label="${esc(t('close'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>`
      + G.sections.map(sec).join('')
      + `<button class="btn solid block" type="button" data-close style="height:48px">${esc(t('start'))} ▶</button>`;
    $('guideSheet').hidden = false; document.body.style.overflow = 'hidden'; $('guideBody').scrollTop = 0;
  }
  function closeSheet(id) { $(id).hidden = true; document.body.style.overflow = ''; }
  function openConsent() {
    const C = CONSENT;
    $('consentBody').innerHTML = `
      <div class="about-hero"><img src="img/logo.svg" alt="" style="width:64px;height:64px;border-radius:16px"><b id="consentTitle" style="font-size:21px">${esc(tr(C.title))}</b></div>
      <ul class="list">${C.points.map(p => `<li>${tr(p)}</li>`).join('')}</ul>
      <label class="switch" style="padding:8px 0"><span>${esc(tr(C.agree))}</span><input type="checkbox" id="agreeChk"></label>
      <button class="btn solid block" type="button" id="agreeGo" style="height:50px">${esc(tr(C.go))}</button>
      <div class="row" style="justify-content:center;gap:18px"><button class="linkish" type="button" id="agreeGuide">${esc(t('guide_open'))}</button><button class="linkish" type="button" id="agreeMore">${esc(tr(C.more))}</button></div>`;
    $('consentSheet').hidden = false; document.body.style.overflow = 'hidden';
    $('agreeGo').onclick = () => { if (!$('agreeChk').checked) { toast(tr(C.need)); return; } S.agreed = true; persist(); closeSheet('consentSheet'); };
    $('agreeMore').onclick = () => { closeSheet('consentSheet'); openAbout('disclaimer'); };
    $('agreeGuide').onclick = () => { closeSheet('consentSheet'); openGuide(); };
  }

  /* ================= gắn sự kiện ================= */
  function toggleRun() { if (!R.running) start(); else if (R.paused) resume(); else pause(); }
  el.go.addEventListener('click', toggleRun);
  $('ringBtn').addEventListener('click', toggleRun);
  el.reset.addEventListener('click', () => stop(true));
  el.snd.addEventListener('click', () => {
    S.sound = !S.sound; persist(); renderSoundUI();
    if (R.running && !R.paused) { if (S.sound) { Sound.init(); Sound.startAmbient(); } else Sound.stopAmbient(); }
    if (!S.sound) toast(t('sound_off'));
  });
  $('langBtn').addEventListener('click', () => {
    S.lang = S.lang === 'vi' ? 'en' : 'vi'; persist(); renderAll();
    if (!$('guideSheet').hidden) openGuide();
  });
  $('guideBtn').addEventListener('click', () => openGuide());
  $('footGuide').addEventListener('click', e => { e.preventDefault(); openGuide(); });
  $('welcomeGo').addEventListener('click', () => openGuide());
  $('welcomeHide').addEventListener('click', () => { S.welcomeHidden = true; persist(); $('welcomeCard').hidden = true; });
  $('aboutBtn').addEventListener('click', () => openAbout());
  $('footAbout').addEventListener('click', e => { e.preventDefault(); openAbout(); });
  ['aboutSheet', 'consentSheet', 'guideSheet'].forEach(id => $(id).addEventListener('click', e => {
    if (e.target.id === 'aboutSheet' || (id === 'aboutSheet' && e.target.closest('[data-close]'))) closeSheet('aboutSheet');
    if (e.target.id === 'guideSheet' || (id === 'guideSheet' && e.target.closest('[data-close]'))) closeSheet('guideSheet');
    if (e.target.closest('[data-guide]')) { closeSheet(id); openGuide(); }
    const pick = e.target.closest('[data-pick]'); if (pick) { closeSheet('guideSheet'); const [m, v] = pick.dataset.pick.split(':'); S.variant[m] = v; if (S.mode === m) { persist(); stop(false); renderVariants(); renderMode(); renderTimingUI(); } else selectMode(m); window.scrollTo({ top: document.getElementById('modeRail').offsetTop - 80, behavior: 'smooth' }); }
    const c = e.target.closest('[data-copy]'); if (c) copy(c.dataset.copy);
    if (e.target.closest('[data-share]')) {
      if (navigator.share) navigator.share({ title: 'BreathSync', text: t('share_text'), url: APP.url }).catch(() => { }); else copy(APP.url);
    }
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (!$('aboutSheet').hidden) closeSheet('aboutSheet'); if (!$('guideSheet').hidden) closeSheet('guideSheet'); }
    if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); toggleRun(); }
  });

  // nhịp riêng
  $('timingStd').addEventListener('click', () => { S.timing = 'standard'; persist(); stop(false); renderTimingUI(); renderRatio(); readyReadout(); });
  $('timingCus').addEventListener('click', () => { S.timing = 'custom'; if (!S.inhale) S.inhale = variant().phases[0].dur; persist(); stop(false); renderTimingUI(); renderRatio(); readyReadout(); });
  $('swBtn').addEventListener('click', () => {
    if (R.running) return;
    if (!sw.on) { sw.on = true; sw.t0 = performance.now(); $('swBtn').textContent = t('sw_stop'); $('swBtn').classList.add('measuring'); swTick(); }
    else { sw.on = false; cancelAnimationFrame(sw.raf); const s = (performance.now() - sw.t0) / 1000; $('swBtn').textContent = t('sw_start'); $('swBtn').classList.remove('measuring'); setInhale(s); $('swRead').textContent = t('measured', { s: fmtN(S.inhale) }); }
  });
  $('inhaleInput').addEventListener('change', () => { const v = parseFloat(String($('inhaleInput').value).replace(',', '.')); setInhale(isFinite(v) ? v : variant().phases[0].dur); });

  // âm thanh
  document.querySelectorAll('#ambRow .chip').forEach(b => b.addEventListener('click', () => {
    S.ambience = b.dataset.amb; persist(); renderSoundUI(); if (R.running && !R.paused && S.sound) Sound.startAmbient();
  }));
  $('optBell').addEventListener('change', e => { S.bell = e.target.checked; persist(); renderSoundUI(); });
  $('optVoice').addEventListener('change', e => { S.voice = e.target.checked; persist(); renderSoundUI(); if (S.voice && !Sound.hasVoice(S.lang)) toast(t('no_voice'), 3500); });
  $('optBin').addEventListener('change', e => { S.binaural = e.target.checked; persist(); renderSoundUI(); if (R.running && !R.paused && S.sound) Sound.startAmbient(); });
  $('optVib').addEventListener('change', e => { S.vib = e.target.checked; persist(); if (S.vib && navigator.vibrate) navigator.vibrate(40); });
  $('volRange').addEventListener('input', e => { S.volume = +e.target.value; Sound.set('volume', S.volume / 100); });
  $('volRange').addEventListener('change', persist);
  $('testSound').addEventListener('click', () => {
    if (!Sound.init()) return; Sound.set('volume', S.volume / 100);
    Sound.cue('inhale'); setTimeout(() => Sound.cue('hold'), 1300); setTimeout(() => Sound.cue('exhale'), 2200);
    if (S.voice) Sound.say(tr(MODES[0].variants[0].phases[0].label), S.lang);
  });

  // đo nhịp thở
  $('rateTap').addEventListener('click', () => {
    const n = performance.now(); RM.taps.push(n);
    if (RM.taps.length > 1) { const iv = n - RM.taps[RM.taps.length - 2]; if (iv > 1200 && iv < 60000) RM.reads.push(60000 / iv); }
    rateRender(); const b = $('rateTap'); b.classList.add('tapped'); setTimeout(() => b.classList.remove('tapped'), 140);
    if (S.vib && navigator.vibrate) navigator.vibrate(15);
  });
  $('rateReset').addEventListener('click', () => { RM.taps = []; RM.reads = []; rateRender(); });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && R.running && !R.paused) pause();
    else if (!document.hidden && R.running && !R.paused) wake(true);
  });

  /* ================= khởi động ================= */
  renderAll();
  if (!S.agreed) setTimeout(openConsent, 400);
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
})();
