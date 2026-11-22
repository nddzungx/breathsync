/* BreathSync – service worker: lưu ứng dụng vào máy để chạy khi không có mạng.
   MỖI LẦN CẬP NHẬT: đổi số phiên bản trong CACHE (ví dụ v2.0.1) để máy người dùng tải bản mới. */
const CACHE = 'breathsync-v2.1.1';
const FILES = ['./', './index.html', './manifest.webmanifest', './js/i18n.js', './js/data.js', './js/audio.js', './js/app.js', './js/install-guide.js',
  './img/logo.svg', './img/qr_ung_ho.png', './icons/favicon-32.png', './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  e.respondWith(caches.match(req, { ignoreSearch: new URL(req.url).origin === location.origin }).then(hit => hit || fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
    return res;
  }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
