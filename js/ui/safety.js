/* =====================================================================
   js/ui/safety.js — pengaman progres: cadangan 1 ketuk (lembar bagikan di HP), pengingat cadangan,
   pemulihan saat data tampak hilang, titik pemulihan otomatis, dan catatan penyimpanan untuk diagnosis.
   Catatan jujur: semua salinan di dalam browser ikut hilang bila data situs dihapus / alamat berganti.
   Hanya berkas cadangan di luar browser yang benar-benar aman, jadi di sinilah cadangan dibuat semudah mungkin.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, S = FC.store, h = U.h, DAY = 864e5, SF = FC.safety = {};
  var ls = function (k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; };
  var fmt = function (ms) { return new Date(ms).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); };
  var WHY = { 'auto-buka': 'otomatis saat dibuka', 'auto-tutup': 'otomatis saat ditutup', 'pre-ganti': 'sebelum pemulihan', 'pre-hapus': 'sebelum hapus semua', 'pre-reset': 'sebelum atur ulang deck' };

  SF.backupAge = function () { var t = S.getKv('lastBackup'); return t ? (Date.now() - t) / DAY : Infinity; };

  var fmtSize = function (n) { return n < 1024 ? n + ' B' : n < 1048576 ? Math.round(n / 1024) + ' KB' : (n / 1048576).toFixed(1).replace('.', ',') + ' MB'; };
  var stampName = function () { var d = new Date(); return 'flashcard-akatsuki-cadangan-' + d.getFullYear() + '-' + U.pad2(d.getMonth() + 1) + '-' + U.pad2(d.getDate()) + '.json'; };
  /** Dicatat "sudah dicadangkan" HANYA setelah ada bukti: lembar bagikan selesai, atau pengguna menegaskan berkasnya ada.
      (Dulu pencatatan terjadi tepat setelah unduhan DIMULAI, padahal di WebView/APK unduhan sering gagal diam-diam atau 0 KB:
      app mengira aman dan berhenti mengingatkan selama 7 hari.) */
  var mark = function (how) { S.setKv('lastBackup', Date.now()); S.journal('cadangan', how); try { FC.app.refresh(); } catch (e) {} };

  /** Salin teks ke clipboard → Promise<boolean>. Jalan di HTTPS biasa dan, lewat cadangan execCommand, di sebagian WebView. */
  SF.copyText = function (text) {
    var legacy = function () {
      try {
        var ta = h('textarea', { readonly: true, tabindex: '-1', 'aria-hidden': 'true', style: { position: 'fixed', top: '0', left: '0', opacity: '0' } });
        ta.value = text; document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
        var ok = !!document.execCommand('copy'); ta.remove(); return ok;
      } catch (e) { return false; }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacy(); });
    return Promise.resolve(legacy());
  };

  /** Lembar "Simpan cadangan". Tiga jalur, karena tak ada satu pun yang pasti jalan di semua perangkat:
      1) Bagikan (HP): hasilnya pasti — selesai berarti sudah sampai di tujuan yang dipilih.
      2) Unduh berkas: browser TIDAK memberi tahu apakah berkasnya benar-benar tersimpan, jadi pengguna diminta menegaskan;
         kalau tidak ada / 0 KB → jatuh ke jalur 3.
      3) Salin sebagai teks: jalan di mana pun (termasuk APK). Tempel ke catatan/email-ke-diri-sendiri; bisa dipulihkan dari teks. */
  SF.backupSheet = function () {
    return S.exportJSON().then(function (obj) {
      var text = JSON.stringify(obj), name = stampName(), size = new Blob([text]).size, L;
      var file = null; try { file = new File([text], name, { type: 'application/json' }); } catch (e) {}
      var canShare = !!(file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] }));
      var body = h('div.backup-sheet');
      var say = function (nodes) { U.clear(body); nodes.forEach(function (n) { if (n) body.appendChild(n); }); };
      var btn = function (label, fn, primary) { return h('button.btn.btn-block' + (primary ? '.btn-primary' : ''), { type: 'button', onclick: fn }, label); };
      var finish = function (how) { mark(how); L.close(); UI.toast('Cadangan dicatat ✓', { ms: 4200 }); };

      function home() {
        say([
          h('p.muted', U.fmtNum((obj.cards || []).length) + ' catatan kartu · ' + U.fmtNum((obj.log || []).length) + ' riwayat jawaban · ' + fmtSize(size) + '. Simpan di luar browser (Drive, Files, WhatsApp ke dirimu sendiri); salinan di dalam browser ikut hilang bila data situs dihapus.'),
          h('div.sheet-actions', [canShare ? btn('Bagikan / simpan ke berkas', share, true) : null, btn('Unduh berkas', download, !canShare), btn('Salin sebagai teks', copy, false)])
        ]);
      }
      function share() {
        navigator.share({ files: [file], title: 'Cadangan Flashcard Akatsuki' }).then(function () { finish('bagikan'); }, function (e) {
          if (e && e.name === 'AbortError') return;                              // dibatalkan: tidak dianggap sebagai cadangan
          say([h('p.err', 'Lembar bagikan tidak bisa dibuka di perangkat ini.'), h('div.sheet-actions', [btn('Unduh berkas', download, true), btn('Salin sebagai teks', copy, false)])]);
        });
      }
      function download() {
        try { UI.download(name, text); } catch (e) {}
        say([
          h('p', 'Unduhan dimulai. Buka folder Download dan pastikan berkas ' + name + ' berukuran sekitar ' + fmtSize(size) + ', bukan 0 KB.'),
          h('div.sheet-actions', [btn('Ya, berkasnya ada dan ada isinya', function () { finish('unduh'); }, true), btn('Tidak ada atau 0 KB, pakai cara lain', copy, false)])
        ]);
      }
      function copy() {
        SF.copyText(text).then(function (ok) {
          if (!ok) return manual();
          say([
            h('p', 'Teks cadangan (' + U.fmtNum(text.length) + ' karakter) sudah disalin. Tempel ke Catatan, Keep, atau email ke dirimu sendiri. Pulihkan nanti lewat Pengaturan → Tempel teks cadangan.'),
            h('div.sheet-actions', [btn('Sudah kutempel dan kusimpan', function () { finish('salin'); }, true), btn('Kembali', home, false)])
          ]);
        });
      }
      function manual() {
        var ta = h('textarea.input.paste-box', { readonly: true, rows: 6, 'aria-label': 'Teks cadangan' }); ta.value = text;
        ta.addEventListener('focus', function () { ta.select(); });
        say([h('p', 'Penyalinan otomatis diblokir. Ketuk kotak di bawah, pilih semua, salin, lalu tempel ke tempat aman.'), ta,
          h('div.sheet-actions', [btn('Sudah kusalin dan kusimpan', function () { finish('salin'); }, true), btn('Kembali', home, false)])]);
      }
      home();
      L = UI.sheet({ title: 'Simpan cadangan', body: body });
      return true;
    });
  };

  function restore(id, when) {
    return UI.confirm({ title: 'Pulihkan titik ini?', text: 'Progres sekarang diganti dengan salinan ' + when + '. Salinan progres sekarang disimpan dulu sebagai titik pemulihan.', ok: 'Pulihkan', danger: true }).then(function (ok) {
      if (ok) S.restoreSnapshot(id).then(function () { UI.toast('Dipulihkan.'); setTimeout(function () { location.reload(); }, 800); }, function (e) { UI.alert('Pemulihan gagal', (e && e.message) || ''); });
    });
  }

  /** IndexedDB kosong padahal kanari mencatat data → tawarkan pemulihan. */
  function vanished(c) {
    S.snapshots().then(function (rows) {
      var best = rows.filter(function (x) { return x.peak; })[0] || rows[0];
      UI.dialog({ title: 'Progresmu tampak hilang', cancelValue: false,
        text: 'Sebelumnya tercatat ' + c.c + ' kartu dan ' + c.d + ' hari belajar, tetapi penyimpanan sekarang kosong.' + (best ? ' Ada titik pemulihan otomatis (' + fmt(best.id) + ': ' + best.n.c + ' kartu, ' + best.n.d + ' hari belajar).' : ' Tidak ada titik pemulihan otomatis. Pulihkan dari berkas cadangan lewat Pengaturan → Pulihkan cadangan.'),
        actions: best ? [{ label: 'Nanti', value: false }, { label: 'Pulihkan', value: true, primary: true }] : [{ label: 'Mengerti', value: false, primary: true }] }).then(function (ok) { if (ok && best) restore(best.id, fmt(best.id)); });
    });
  }

  function nudge() {
    var n = (S._logCache || []).length, age = SF.backupAge();
    if (n < 30 || age < 7 || Date.now() - (+ls('fc.nudge') || 0) < DAY) return;
    ls('fc.nudge', String(Date.now()));
    (FC.stats && FC.stats.streak ? FC.stats.streak() : Promise.resolve({ current: 0 })).then(function (st) {
      var msg = st.current >= 3 ? 'Streak ' + st.current + ' hari belum dicadangkan. Satu ketukan supaya aman.' : age === Infinity ? 'Progresmu belum pernah dicadangkan.' : 'Cadangan terakhir ' + Math.floor(age) + ' hari lalu.';
      UI.toast(msg, { ms: 14000, action: { label: 'Cadangkan', onclick: function () { SF.backupSheet(); } } });
    });
  }

  function start() {
    var hh = S.health;
    if (hh.vanished) vanished(hh.vanished);
    else if (S.mode === 'memory') UI.alert('Penyimpanan browser tidak tersedia', 'Progres sesi ini hanya tersimpan sementara dan hilang saat halaman ditutup. Buka di browser biasa (bukan mode privat) lalu muat ulang. Sementara itu, buat cadangan (Cadangkan) sebelum menutup halaman.');
    else if (hh.fresh && !ls('fc.hint1')) { ls('fc.hint1', '1'); UI.toast('Belum ada data. Pernah belajar di alamat atau browser lain? Pulihkan lewat Pengaturan → Pulihkan cadangan.', { ms: 10000 }); }
    else nudge();
  }

  var bad = false;
  S.onHealth(function (x) { if (!x.ok) bad = true; else if (bad) { bad = false; UI.toast('Penyimpanan pulih. Progres tersimpan ✓'); } });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') S.autoSnap('auto-tutup'); else if (S.health.dirty) S.resync(); });
  root.addEventListener('online', function () { if (S.health.dirty) S.resync(); });
  if (FC.ready) start(); else FC.bus.on('ready', start);

  /* ---------- bagian di Pengaturan ---------- */
  function row(label, hint, ctl) { return h('div.setting-row', h('div.setting-text', h('div.setting-label', label), hint ? h('div.setting-hint', hint) : null), ctl); }
  SF.settingsGroup = function () {
    var age = SF.backupAge(), hh = S.health;
    var st = S.mode === 'memory' ? 'Tidak tersimpan: penyimpanan browser tidak tersedia.' : hh.dirty ? 'Ada tulisan yang belum masuk ke browser; mencoba lagi otomatis.' : hh.lastOk ? 'Penulisan terakhir berhasil pukul ' + new Date(hh.lastOk).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + '.' : 'Siap menyimpan.';
    var bk = h('button.btn.btn-sm.btn-primary', { type: 'button' }, UI.iconEl('download', 'sm'), 'Cadangkan');
    bk.addEventListener('click', function () { bk.disabled = true; SF.backupSheet().then(function () { bk.disabled = false; }, function (e) { bk.disabled = false; UI.alert('Cadangan gagal', (e && e.message) || ''); }); });
    var snaps = h('div.set-rows', row('Titik pemulihan otomatis', 'Memeriksa…', null));
    S.snapshots().then(function (rows) {
      U.clear(snaps); if (!snaps.isConnected && !rows.length) return;
      if (!rows.length) { snaps.appendChild(row('Titik pemulihan otomatis', 'Belum ada. Dibuat otomatis saat aplikasi dibuka atau ditutup.', null)); return; }
      rows.forEach(function (x) {
        snaps.appendChild(row(fmt(x.id) + (x.peak ? ' · terbanyak' : ''), x.n.c + ' kartu · ' + x.n.d + ' hari belajar · ' + (WHY[x.why] || x.why), h('button.btn.btn-sm', { type: 'button', onclick: function () { restore(x.id, fmt(x.id)); } }, 'Pulihkan')));
      });
    });
    var jr = h('details.fsrs-note', h('summary', 'Catatan penyimpanan (untuk diagnosis)'));
    var J = S.getJournal().reverse(); if (!J.length) jr.appendChild(h('p.muted.small', 'Belum ada kejadian.'));
    J.forEach(function (e) { jr.appendChild(h('p.muted.small', fmt(e.t) + ' · ' + e.e + (e.i ? ' · ' + e.i : ''))); });
    return h('section.set-group', h('h2.section-title', 'Keamanan data'),
      h('p.set-sub', '“Lindungi penyimpanan” hanya mencegah browser membuang data saat ruang menipis. Itu tidak menolong bila data situs dihapus, alamat atau browser berbeda, atau aplikasi dicopot. Satu-satunya pengaman untuk itu adalah cadangan di luar browser.'),
      h('div.set-rows', [row('Status penyimpanan', st, null),
        row('Cadangan di luar browser', age === Infinity ? 'Belum pernah dicadangkan.' : 'Terakhir ' + U.fmtAgo(S.getKv('lastBackup')) + (age >= 7 ? ' — sudah lama.' : '.'), bk), snaps]), jr);
  };
})(window);
