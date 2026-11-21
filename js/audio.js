/* BreathSync – bộ âm thanh (Web Audio, tự tổng hợp, không cần tệp nhạc).
   - Nền "sóng biển": tiếng ồn hồng qua bộ lọc; dâng lên khi hít vào, giữ khi nín, rút xa khi thở ra.
   - Nền "ấm": hợp âm Rê treo (D–A–E) mềm, bộ lọc mở ra khi hít vào, khép lại khi thở ra.
   - Chuông bát hát: các hoạ âm không điều hoà + vang (reverb) – cao khi hít vào, trầm khi thở ra,
     tiếng gõ gỗ nhẹ khi nín. Kết thúc: ba tiếng chuông lớn.
   - Nhịp đôi tai (tuỳ chọn, cần tai nghe): hai sóng sin lệch nhau vài Hz, âm lượng rất nhỏ.
   - Giọng đọc: speechSynthesis của máy (vi-VN / en-US) nếu có. */
window.Sound = (function () {
  let ctx = null, master = null, dry = null, wet = null, verb = null;
  let oceanNodes = null, padNodes = null, binNodes = null;
  const st = { volume: 0.7, ambience: 'ocean', binaural: false, binHz: 10 };

  function init() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return false;
      ctx = new C();
      master = ctx.createGain(); master.gain.value = st.volume;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18; comp.ratio.value = 3;
      master.connect(comp).connect(ctx.destination);
      dry = ctx.createGain(); dry.connect(master);
      verb = ctx.createConvolver(); verb.buffer = impulse(3.2, 2.4);
      wet = ctx.createGain(); wet.gain.value = 0.55;
      verb.connect(wet).connect(master);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }
  function impulse(sec, decay) {
    const len = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return b;
  }
  function pinkBuffer(sec) {
    const len = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        b0 = .99886 * b0 + w * .0555179; b1 = .99332 * b1 + w * .0750759; b2 = .969 * b2 + w * .153852;
        b3 = .8665 * b3 + w * .3104856; b4 = .55 * b4 + w * .5329522; b5 = -.7616 * b5 - w * .016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362) * .11; b6 = w * .115926;
      }
      // làm mềm điểm nối vòng lặp
      const f = Math.floor(ctx.sampleRate * .05); for (let i = 0; i < f; i++) { const k = i / f; d[i] *= k; d[len - 1 - i] *= k; }
    }
    return b;
  }
  const now = () => ctx.currentTime;
  function ramp(param, v, t) { const n = now(); param.cancelScheduledValues(n); param.setValueAtTime(param.value, n); param.linearRampToValueAtTime(v, n + Math.max(.05, t)); }

  /* ---------- nền sóng biển ---------- */
  function startOcean() {
    const src = ctx.createBufferSource(); src.buffer = pinkBuffer(6); src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; lp.Q.value = .4;
    const g = ctx.createGain(); g.gain.value = 0.0001;
    src.connect(lp).connect(g).connect(dry); src.start();
    ramp(g.gain, .16, 1.5);
    oceanNodes = { src, lp, g };
  }
  /* ---------- nền ấm (hợp âm treo) ---------- */
  function startPad() {
    const out = ctx.createGain(); out.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = .7;
    lp.connect(out); out.connect(dry); out.connect(verb);
    const freqs = [73.42, 146.83, 220, 329.63, 440];
    const oscs = [];
    freqs.forEach((f, i) => {
      [-4, 4].forEach(cents => {
        const o = ctx.createOscillator(); o.type = i === 0 ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = cents;
        const g = ctx.createGain(); g.gain.value = (i === 0 ? .22 : .12) / (1 + i * .35);
        o.connect(g).connect(lp); o.start(); oscs.push(o);
      });
    });
    const lfo = ctx.createOscillator(); lfo.frequency.value = .07; const lg = ctx.createGain(); lg.gain.value = 60;
    lfo.connect(lg).connect(lp.frequency); lfo.start(); oscs.push(lfo);
    ramp(out.gain, .12, 2);
    padNodes = { out, lp, oscs };
  }
  /* ---------- nhịp đôi tai ---------- */
  function startBin() {
    const g = ctx.createGain(); g.gain.value = 0.0001; g.connect(dry);
    const base = 180, l = ctx.createOscillator(), r = ctx.createOscillator();
    l.frequency.value = base; r.frequency.value = base + st.binHz;
    if (ctx.createStereoPanner) { const pl = ctx.createStereoPanner(), pr = ctx.createStereoPanner(); pl.pan.value = -1; pr.pan.value = 1; l.connect(pl).connect(g); r.connect(pr).connect(g); }
    else { l.connect(g); r.connect(g); }
    l.start(); r.start(); ramp(g.gain, .035, 1.5);
    binNodes = { g, oscs: [l, r] };
  }
  function stopNodes(n, oscKey) {
    if (!n) return; const t = now();
    const g = n.g || n.out; try { g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(.0001, t + .8); } catch (e) { }
    const list = n.oscs || [n.src]; list.forEach(o => { try { o.stop(t + .9); } catch (e) { } });
  }
  function startAmbient() {
    if (!init()) return; stopAmbient(true);
    if (st.ambience === 'ocean' || st.ambience === 'both') startOcean();
    if (st.ambience === 'pad' || st.ambience === 'both') startPad();
    if (st.binaural) startBin();
  }
  function stopAmbient() { stopNodes(oceanNodes); stopNodes(padNodes); stopNodes(binNodes); oceanNodes = padNodes = binNodes = null; }

  /* Gọi ở đầu mỗi thì: nền âm co giãn theo hơi thở */
  function breath(key, dur) {
    if (!ctx) return;
    const inhale = key === 'inhale', out = key === 'exhale' || key === 'hum';
    if (oceanNodes) {
      if (inhale) { ramp(oceanNodes.g.gain, .34, dur); ramp(oceanNodes.lp.frequency, 1500, dur); }
      else if (out) { ramp(oceanNodes.g.gain, .08, dur); ramp(oceanNodes.lp.frequency, 300, dur); }
      else { ramp(oceanNodes.g.gain, .22, Math.min(1.5, dur)); ramp(oceanNodes.lp.frequency, 900, Math.min(1.5, dur)); }
    }
    if (padNodes) {
      if (inhale) { ramp(padNodes.lp.frequency, 1500, dur); ramp(padNodes.out.gain, .16, dur); }
      else if (out) { ramp(padNodes.lp.frequency, 420, dur); ramp(padNodes.out.gain, .1, dur); }
    }
  }

  /* ---------- chuông bát hát ---------- */
  function bowl(f, vol, len) {
    if (!init()) return;
    const t = now(), out = ctx.createGain(); out.gain.value = vol;
    out.connect(dry); out.connect(verb);
    const partials = [[1, 1, 1], [2.76, .45, .62], [5.4, .22, .4], [8.93, .1, .26]];
    partials.forEach(([r, a, d]) => {
      [0, 1.8].forEach((beat, k) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = f * r + beat * (k ? 1 : 0);
        const L = len * d;
        g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(a * (k ? .5 : 1), t + .012);
        g.gain.exponentialRampToValueAtTime(.0001, t + L);
        o.connect(g).connect(out); o.start(t); o.stop(t + L + .05);
      });
    });
  }
  function wood(vol) {
    if (!init()) return;
    const t = now(), o = ctx.createOscillator(), g = ctx.createGain(), bp = ctx.createBiquadFilter();
    o.type = 'triangle'; o.frequency.setValueAtTime(880, t); o.frequency.exponentialRampToValueAtTime(620, t + .08);
    bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 4;
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + .18);
    o.connect(bp).connect(g); g.connect(dry); g.connect(verb); o.start(t); o.stop(t + .2);
  }
  function cue(key) {
    if (key === 'inhale') bowl(392, .22, 4.2);        // Sol – sáng, mở
    else if (key === 'hold') wood(.18);                // tiếng mõ gỗ nhẹ
    else if (key === 'exhale') bowl(261.63, .24, 5);  // Đô – trầm, buông
    else if (key === 'hum') bowl(196, .2, 5);
  }
  function gong() {
    [0, 2.2, 4.4].forEach((d, i) => setTimeout(() => bowl(i === 2 ? 130.81 : 196, .32, 7), d * 1000));
  }

  /* ---------- giọng đọc ---------- */
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices(); } catch (e) { voices = []; } }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function pickVoice(lang) { const p = lang === 'vi' ? 'vi' : 'en'; return voices.find(v => v.lang && v.lang.toLowerCase().startsWith(p)); }
  function hasVoice(lang) { if (!('speechSynthesis' in window)) return false; loadVoices(); return !!pickVoice(lang) || voices.length === 0; }
  function say(text, lang) {
    if (!('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); const v = pickVoice(lang);
      if (v) u.voice = v; u.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
      u.rate = lang === 'vi' ? .9 : .85; u.pitch = .95; u.volume = Math.min(1, st.volume + .2);
      speechSynthesis.speak(u);
    } catch (e) { }
  }

  function set(k, v) {
    st[k] = v;
    if (k === 'volume' && master) ramp(master.gain, v, .15);
  }
  function suspend() { if (ctx && ctx.state === 'running') ctx.suspend(); }
  return { init, set, st, startAmbient, stopAmbient, breath, cue, gong, say, hasVoice, suspend, get running() { return !!(oceanNodes || padNodes || binNodes); } };
})();
