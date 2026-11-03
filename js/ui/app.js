/* =====================================================================
   js/ui/app.js — kerangka aplikasi: bilah atas (merek + tombol furigana), tab navigasi, pengatur rute (#/home …),
   tema, pendaftaran service worker, dan urutan mulai (boot). Layar-layar mendaftar lewat FC.app.register().
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, h = U.h;

  var TABS = [
    { id: 'home', label: 'Beranda', icon: 'home' },
    { id: 'decks', label: 'Deck', icon: 'decks' },
    { id: 'practice', label: 'Latihan', icon: 'pencil' },
    { id: 'stats', label: 'Statistik', icon: 'chart' },
    { id: 'settings', label: 'Pengaturan', icon: 'sliders' }
  ];
  var mods = {}, current = null, A = FC.app = {};
  A.register = function (id, mod) { mods[id] = mod; };
  A.current = function () { return current; };
  A.go = function (tab) { if (location.hash !== '#/' + tab) location.hash = '#/' + tab; else show(tab); };
  A.refresh = function () { if (current && mods[current] && mods[current].render) mods[current].render(U.$('#screen-' + current)); };

  /* ---------- tema ---------- */
  function applyTheme() {
    var t = FC.store.get('theme'), r = document.documentElement;
    if (t === 'dark' || t === 'light') r.setAttribute('data-theme', t); else r.removeAttribute('data-theme');
    var dark = t === 'dark' || (t === 'auto' && root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)').matches);
    var m = U.$('#themeColor'); if (m) m.setAttribute('content', dark ? '#0d1322' : '#f5f6fa');
  }
  if (root.matchMedia) { try { root.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (e) {} }

  /* ---------- kerangka ---------- */
  function buildChrome() {
    var moon = FC.ui.moon(0.62, 26, { ring: 0, label: '' });
    moon.el.classList.add('brand-moon'); moon.el.setAttribute('aria-hidden', 'true');
    var furi = h('button.furi-toggle', { type: 'button', id: 'furiToggle', 'aria-pressed': 'false', title: 'Tampilkan furigana (cara baca) di atas kanji' },
      h('span.jp', 'ふりがな'), h('span.mini-switch', { 'aria-hidden': 'true' }));
    furi.addEventListener('click', function () { FC.store.set('furigana', !FC.store.get('furigana')); });
    U.$('#topbar').appendChild(h('div.brand', moon.el, h('div.brand-text', h('span.brand-name', '赤月'), h('span.brand-sub', 'Belajar Bahasa Jepang'))));
    U.$('#topbar').appendChild(furi);

    var bar = U.$('#tabbar');
    TABS.forEach(function (t) {
      var b = h('button.tab', { type: 'button', 'data-tab': t.id, onclick: function () { A.go(t.id); } }, UI.iconEl(t.icon), h('span', t.label));
      bar.appendChild(b);
    });
  }
  function syncFuri() { var b = U.$('#furiToggle'); if (b) b.setAttribute('aria-pressed', FC.store.get('furigana') ? 'true' : 'false'); }

  /* ---------- rute ---------- */
  function show(tab) {
    if (!mods[tab]) tab = 'home';
    var changed = current !== tab;
    current = tab;
    U.$$('.screen').forEach(function (s) { s.classList.toggle('on', s.id === 'screen-' + tab); });
    U.$$('.tab').forEach(function (b) { if (b.getAttribute('data-tab') === tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    var el = U.$('#screen-' + tab), m = mods[tab];
    if (m.show) m.show(el, changed); else m.render(el);
    if (changed) window.scrollTo(0, 0);
    document.title = (tab === 'home' ? '' : TABS.filter(function (t) { return t.id === tab; })[0].label + ' — ') + 'Belajar Bahasa Jepang kelas 赤月';
  }
  function route() { var m = /^#\/([a-z]+)/.exec(location.hash); show(m ? m[1] : 'home'); }

  /* ---------- service worker ---------- */
  function registerSW() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    var had = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.register('sw.js').catch(function () {});
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (had) UI.toast('Versi baru siap dipakai.', { ms: 9000, action: { label: 'Muat ulang', onclick: function () { location.reload(); } } });
      had = true;
    });
  }

  /* ---------- mulai ---------- */
  function boot() {
    try { FC.data.init(); } catch (e) { return fatal('Data deck gagal dimuat', e); }
    FC.store.ready.then(function () { return FC.store.migrateLegacy(); }).then(function (rep) {
      applyTheme(); buildChrome(); syncFuri();
      FC.store.onChange(function (keys) {
        if (keys.indexOf('theme') >= 0) applyTheme();
        if (keys.indexOf('furigana') >= 0) { syncFuri(); FC.bus.emit('furigana'); }
        if (keys.some(function (k) { return ['dir', 'newPerDay', 'revPerDay', 'rollover', 'active', 'dr'].indexOf(k) >= 0; })) FC.bus.emit('progress');
      });
      FC.store.onError(function (msg) { UI.toast(msg, { ms: 7000 }); });
      root.addEventListener('hashchange', route);
      route();
      if (rep && rep.stars) UI.toast(rep.stars + ' kartu bintang dari versi lama dipindahkan.', { ms: 5000 });
      registerSW();
      FC.ready = true; FC.bus.emit('ready');
    }).catch(function (e) { fatal('Aplikasi gagal dimulai', e); });
  }
  function fatal(title, e) {
    console.error(e);
    var m = U.$('#screens'); m.innerHTML = '';
    m.appendChild(h('div.empty', h('h3', title), h('p', String(e && e.message || e)), h('p.small', 'Muat ulang halaman. Bila tetap gagal, hapus data situs di pengaturan browser lalu coba lagi.')));
    U.$('#screen-home').classList.add('on');
  }
  A.boot = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
