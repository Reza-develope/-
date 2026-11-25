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
      var ud = { decks: 0, skipped: 0 };
      try { ud = FC.userDecks.load(); } catch (e) { console.error(e); }          // deck buatan pengguna ("Deck Saya") hidup di penyimpanan, bukan di berkas data
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
      if (ud.skipped) UI.toast(ud.skipped + ' deck buatan sendiri rusak dan dilewati. Bila punya cadangan, pulihkan dari Pengaturan.', { ms: 8000 });
      // indeks kartu yang dipakai bersama antar-deck (kecil): setelah termuat, angka progres per deck dihitung ulang
      if (FC.data.loadShared) FC.data.loadShared().then(function () { FC.bus.emit('progress'); }, function () {});
      if (FC.store.settingsMigrated) UI.toast('Pembaruan: Lompatan awal FSRS dan auto-bintang kartu bandel kini mati secara bawaan. Bisa dinyalakan lagi di Pengaturan.', { ms: 9000 });
      registerSW();
      FC.ready = true; FC.bus.emit('ready');
    }).catch(function (e) { fatal('Aplikasi gagal dimulai', e); });
  }
  /** Jalan keluar saat aplikasi gagal mulai: baca langsung dari IndexedDB (tanpa lewat store.js yang mungkin justru bermasalah) dan salin
      sebagai teks cadangan, supaya progres bisa diselamatkan SEBELUM apa pun dihapus. */
  function rescue(btn, box) {
    var out = { format: 'akatsuki-fc-backup', version: 2, exportedAt: Date.now(), settings: {}, cards: [], log: [], marks: [], kv: {}, bunpou: {} };
    try { out.settings = JSON.parse(localStorage.getItem('fc.settings.v2') || '{}'); } catch (e) {}
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf('bunpou:') === 0) out.bunpou[k] = localStorage.getItem(k); } } catch (e) {}
    var fail = function () { btn.textContent = 'Penyimpanan tidak bisa dibaca'; btn.disabled = false; };
    var req; try { req = indexedDB.open('akatsuki-fc'); } catch (e) { return fail(); }
    req.onerror = fail;
    req.onsuccess = function () {
      var db = req.result, names = ['cards', 'log', 'marks', 'kv'].filter(function (n) { return db.objectStoreNames.contains(n); });
      if (!names.length) { db.close(); btn.textContent = 'Penyimpanan kosong'; return; }
      var tx = db.transaction(names, 'readonly'), left = names.length;
      tx.onerror = function () { db.close(); fail(); };
      names.forEach(function (n) {
        var r = tx.objectStore(n).getAll();
        r.onsuccess = function () {
          if (n === 'kv') r.result.forEach(function (x) { out.kv[x.key] = x.val; }); else out[n] = r.result;
          if (--left) return;
          db.close();
          var text = JSON.stringify(out), done = function (msg) { btn.textContent = msg; };
          var ta = h('textarea.input.paste-box', { readonly: true, rows: 5, 'aria-label': 'Teks cadangan darurat' }); ta.value = text;
          ta.addEventListener('focus', function () { ta.select(); });
          var show = function () { box.appendChild(ta); ta.focus(); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('Tersalin: tempel ke Catatan atau email ke dirimu sendiri'); }, function () { done('Salin manual dari kotak di bawah'); show(); });
          else { done('Salin manual dari kotak di bawah'); show(); }
        };
      });
    };
  }
  function fatal(title, e) {
    console.error(e);
    var m = U.$('#screens'); m.innerHTML = '';
    var box = h('div'), save = h('button.btn.btn-block', { type: 'button' }, 'Selamatkan data: salin sebagai teks cadangan');
    save.addEventListener('click', function () { save.disabled = true; rescue(save, box); });
    m.appendChild(h('div.empty', h('h3', title), h('p', String(e && e.message || e)),
      h('p.small', 'Muat ulang halaman dulu. Jangan hapus data situs atau data aplikasi: progres belajarmu masih tersimpan di sana dan akan ikut hilang. Bila tetap gagal, salin dulu cadangan darurat di bawah dan simpan di tempat aman.'),
      h('div.sheet-actions', h('button.btn.btn-primary.btn-block', { type: 'button', onclick: function () { location.reload(); } }, 'Muat ulang'), save), box));
    U.$('#screen-home').classList.add('on');
  }
  A.boot = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
