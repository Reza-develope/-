/* =====================================================================
   sw.js — layanan offline.
   • Cangkang aplikasi (HTML/CSS/JS/manifest/ikon): jaringan dulu (maks. 4 detik), jatuh ke salinan tersimpan bila offline.
   • Isi deck & kuis (data/decks, data/quiz): salinan tersimpan dulu — nama berkasnya membawa ?v=BUILD sehingga tak pernah basi.
   • Huruf Google Fonts: tampilkan salinan lalu perbarui di latar.
   Saat data/kode berubah, naikkan BUILD di sini DAN di index.html (jalankan: node tools/bump-build.js).
   ===================================================================== */
'use strict';
const BUILD = '2026.11.12-2048';
const SHELL = 'fc-shell-' + BUILD, DATA = 'fc-data-' + BUILD, FONTS = 'fc-fonts-v1';
const SHELL_FILES = [
  './', 'index.html', 'manifest.webmanifest', 'assets/icon.svg', 'assets/icons/icon-192.png',
  'css/tokens.css', 'css/base.css', 'css/screens.css',
  'data/manifest.js', 'data/locks.js',
  'js/core/util.js', 'js/core/fsrs.js', 'js/core/scheduler.js', 'js/core/store.js', 'js/core/data.js', 'js/core/session.js', 'js/core/userdecks.js',
  'js/core/furigana-data.js', 'js/core/furigana.js', 'js/core/tts.js',
  'js/ui/kit.js', 'js/ui/cardface.js', 'js/ui/app.js', 'js/ui/home.js', 'js/ui/decks.js', 'js/ui/mydecks.js', 'js/ui/study.js', 'js/ui/practice.js', 'js/ui/stats.js', 'js/ui/settings.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL)
      .then((c) => Promise.all(SHELL_FILES.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('fc-') && ![SHELL, DATA, FONTS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const net = fetch(req).then((res) => { if (res && res.ok) cache.put(req, res.clone()).catch(() => {}); return res; });
  try {
    return await Promise.race([net, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000))]);
  } catch (err) {
    const hit = (await cache.match(req)) || (req.mode === 'navigate' ? (await cache.match('index.html')) || (await cache.match('./')) : null);
    if (hit) { net.catch(() => {}); return hit; }
    return net;                                   // tidak ada salinan: tunggu jaringan apa adanya
  }
}
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName), hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
  return res;
}
async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName), hit = await cache.match(req);
  const net = fetch(req).then((res) => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {}); return res; }).catch(() => hit || Response.error());
  return hit || net;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    if (/\/data\/(decks|quiz)\//.test(url.pathname)) e.respondWith(cacheFirst(req, DATA));
    else e.respondWith(networkFirst(req, SHELL));
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(staleWhileRevalidate(req, FONTS));
  }
});
