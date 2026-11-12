/* =====================================================================
   js/ui/settings.js — tab Pengaturan: tampilan, sesi harian, penjadwal FSRS-7, suara, data & cadangan, hapus progres, tentang.
   Setiap perubahan langsung tersimpan (FC.store.set) dan tidak perlu tombol "Simpan".
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, D = FC.data, h = U.h, S = FC.store;

  /* ---------- kontrol ---------- */
  function row(label, hint, control, stack) {
    return h('div.setting-row' + (stack ? '.is-block' : ''), h('div.setting-text', h('div.setting-label', label), hint ? h('div.setting-hint', hint) : null), control);
  }
  function toggle(label, hint, key, after) {
    var inp = h('input', { type: 'checkbox', role: 'switch', 'aria-label': label }); inp.checked = !!S.get(key);
    inp.addEventListener('change', function () { S.set(key, inp.checked); if (after) after(inp.checked); });
    var el = h('label.setting-row', h('div.setting-text', h('div.setting-label', label), hint ? h('div.setting-hint', hint) : null), h('span.switch', inp, h('i')));
    el._input = inp; return el;
  }
  function seg(label, key, options, after) {
    var el = h('div.seg', { role: 'radiogroup', 'aria-label': label });
    options.forEach(function (o) {
      var b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(S.get(key) === o.v) }, o.t);
      b.addEventListener('click', function () { U.$$('button', el).forEach(function (x) { x.setAttribute('aria-checked', 'false'); }); b.setAttribute('aria-checked', 'true'); S.set(key, o.v); if (after) after(o.v); });
      el.appendChild(b);
    });
    return el;
  }
  function stepper(label, key, min, max, step) {
    var input = h('input.input.step-input.num', { type: 'number', inputmode: 'numeric', min: min, max: max, step: step, value: S.get(key), 'aria-label': label });
    var set = function (v) { v = Math.round(+v); if (isNaN(v)) v = S.get(key); v = U.clamp(v, min, max); input.value = v; S.set(key, v); };
    input.addEventListener('change', function () { set(input.value); });
    return h('div.stepper',
      h('button.btn.btn-icon.step-btn', { type: 'button', 'aria-label': 'Kurangi ' + label, onclick: function () { set(+input.value - step); } }, '−'), input,
      h('button.btn.btn-icon.step-btn', { type: 'button', 'aria-label': 'Tambah ' + label, onclick: function () { set(+input.value + step); } }, '+'));
  }
  function slider(label, key, o) {
    var cur = Math.round(S.get(key) * o.mul);
    var out = h('output.slider-out.num', o.fmt(cur));
    var inp = h('input.range', { type: 'range', min: o.min, max: o.max, step: o.step, value: cur, 'aria-label': label });
    var fill = function () { inp.style.setProperty('--fill', ((inp.value - o.min) / (o.max - o.min) * 100) + '%'); };
    inp.addEventListener('input', function () { out.textContent = o.fmt(+inp.value); fill(); });
    inp.addEventListener('change', function () { S.set(key, +inp.value / o.mul); });
    fill();
    return h('div.slider', inp, out);
  }
  function stepsInput(label, key, hint) {
    var inp = h('input.input.steps-input.num', { type: 'text', inputmode: 'decimal', value: S.get(key), 'aria-label': label, placeholder: 'mis. 1 10' });
    inp.addEventListener('change', function () {
      var parts = String(inp.value).split(/[\s,;]+/).filter(Boolean), nums = parts.map(Number);
      if (!parts.length || nums.some(function (n) { return !(n > 0) || n > 1440; }) || nums.length > 6) { UI.toast('Isi dengan angka menit dipisah spasi, misalnya 1 10.', { ms: 4500 }); inp.value = S.get(key); return; }
      var v = nums.join(' '); inp.value = v; S.set(key, v);
    });
    return inp;
  }
  function group(title, sub, children) {
    return h('section.set-group', h('h2.section-title', title), sub ? h('p.set-sub', sub) : null, h('div.set-rows', children));
  }
  var fmtBytes = function (n) { return n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(0) + ' KB' : n < 1073741824 ? (n / 1048576).toFixed(1).replace('.', ',') + ' MB' : (n / 1073741824).toFixed(1).replace('.', ',') + ' GB'; };

  /* ---------- cadangan ---------- */
  var stamp = function () { var d = new Date(); return d.getFullYear() + '-' + U.pad2(d.getMonth() + 1) + '-' + U.pad2(d.getDate()); };
  function exportBackup() {
    S.exportJSON().then(function (obj) {
      UI.download('flashcard-akatsuki-cadangan-' + stamp() + '.json', JSON.stringify(obj));
      S.setKv('lastBackup', Date.now()); UI.toast('Cadangan diunduh. Simpan berkasnya di tempat aman.');
      FC.app.refresh();
    }).catch(function (e) { UI.alert('Cadangan gagal dibuat', (e && e.message) || ''); });
  }
  function importBackup() {
    UI.pickFile('.json,application/json').then(function (f) {
      if (!f) return;
      var obj; try { obj = JSON.parse(f.text); } catch (e) { UI.alert('Berkas tidak valid', 'Berkas ini bukan JSON yang bisa dibaca.'); return; }
      var modern = obj && obj.format === 'akatsuki-fc-backup', legacy = obj && obj.decks && obj.log;
      if (!modern && !legacy) { UI.alert('Format tidak dikenali', 'Pilih berkas cadangan yang diunduh dari aplikasi ini.'); return; }
      var nMine = modern ? Object.keys(obj.kv || {}).filter(function (k) { return k.indexOf(FC.userDecks.KEY) === 0; }).length : 0;
      var info = modern ? U.fmtNum((obj.cards || []).length) + ' catatan kartu, ' + U.fmtNum((obj.log || []).length) + ' riwayat jawaban, ' + (obj.marks || []).length + ' kartu bintang' + (nMine ? ', ' + nMine + ' deck buatan sendiri.' : '.')
        : 'Cadangan versi lama. Riwayat harinya akan dihitung di Statistik; jadwal kartu dimulai dari awal dengan FSRS.';
      UI.dialog({ title: 'Pulihkan cadangan', text: info + (modern ? ' "Gabung" menambahkan ke data sekarang (yang lebih baru menang). "Ganti" menghapus progres sekarang lebih dulu; deck buatan sendiri yang hanya ada di perangkat ini tetap dipertahankan.' : ''), cancelValue: false, actions: modern ? [
        { label: 'Batal', value: false }, { label: 'Ganti', value: 'replace', danger: true }, { label: 'Gabung', value: 'merge', primary: true }
      ] : [{ label: 'Batal', value: false }, { label: 'Impor', value: 'merge', primary: true }] }).then(function (mode) {
        if (!mode) return;
        S.importJSON(obj, mode).then(function (rep) {
          UI.toast(modern ? 'Dipulihkan: ' + rep.cards + ' kartu, ' + rep.log + ' riwayat' + (rep.decks ? ', ' + rep.decks + ' deck' : '') + '.' : 'Cadangan lama dibaca.', { ms: 4200 });
          if (mode === 'replace') setTimeout(function () { location.reload(); }, 900);
          else { try { FC.userDecks.load(); } catch (e) { console.error(e); } FC.bus.emit('progress'); FC.bus.emit('stars'); FC.app.refresh(); }
        }).catch(function (e) { UI.alert('Pemulihan gagal', (e && e.message) || 'Berkas tidak bisa dipakai.'); });
      });
    });
  }
  function exportCsv() { S.exportCSV().then(function (csv) { UI.download('riwayat-review-' + stamp() + '.csv', '﻿' + csv, 'text/csv;charset=utf-8'); }); }
  function wipe() {
    var mineN = FC.userDecks.totals().decks;
    UI.confirm({ title: 'Hapus semua progres?', text: 'Jadwal semua kartu, riwayat review, kartu bintang, skor kuis, dan progres bunpou dihapus dari perangkat ini. Pengaturan kembali ke bawaan. Tidak bisa dibatalkan.' + (mineN ? ' Deck buatanmu (' + mineN + ' deck) tetap ada, hanya jadwal belajarnya yang dihapus.' : ''), ok: 'Lanjut', danger: true }).then(function (ok) {
      if (!ok) return;
      UI.confirm({ title: 'Yakin hapus semuanya?', text: 'Unduh cadangan dulu bila kamu mungkin butuh data ini lagi.', ok: 'Hapus semua', cancel: 'Batal', danger: true }).then(function (ok2) {
        if (!ok2) return;
        try { Object.keys(localStorage).filter(function (k) { return k.indexOf('bunpou:') === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
        S.reset(false, FC.userDecks.KEY).then(function () { UI.toast('Semua progres dihapus.'); setTimeout(function () { location.reload(); }, 700); });
      });
    });
  }

  /* ---------- layar ---------- */
  function render(el) {
    U.clear(el);
    el.appendChild(h('div.screen-head', h('div', h('h1.screen-title', 'Pengaturan'), h('p.screen-sub', 'Perubahan langsung tersimpan.'))));

    el.appendChild(group('Tampilan', null, [
      row('Tema', null, seg('Tema', 'theme', [{ v: 'auto', t: 'Otomatis' }, { v: 'light', t: 'Terang' }, { v: 'dark', t: 'Gelap' }]), true),
      toggle('Furigana', 'Tampilkan cara baca di atas kanji pada kartu. Bisa juga diubah dari tombol di bilah atas.', 'furigana'),
      toggle('Contoh kalimat', 'Tampilkan kotak contoh penggunaan setelah jawaban dibuka.', 'showExample'),
      row('Arah kartu', 'Jadwal tiap arah dicatat terpisah.', seg('Arah kartu', 'dir', [{ v: 'f', t: 'Jepang ke Indonesia' }, { v: 'r', t: 'Indonesia ke Jepang' }]), true)
    ]));

    el.appendChild(group('Sesi harian', 'Batas ini berlaku untuk semua deck sekaligus.', [
      row('Kartu baru per hari', null, stepper('kartu baru per hari', 'newPerDay', 0, 500, 5)),
      row('Review maksimal per hari', null, stepper('review maksimal per hari', 'revPerDay', 0, 2000, 25)),
      row('Urutan kartu baru', null, seg('Urutan kartu baru', 'newOrder', [{ v: 'urut', t: 'Berurutan' }, { v: 'acak', t: 'Acak' }]), true),
      row('Campuran kartu', null, seg('Campuran kartu', 'mix', [{ v: 'campur', t: 'Campur' }, { v: 'setelah', t: 'Review dulu' }, { v: 'sebelum', t: 'Baru dulu' }]), true),
      row('Urutan review', 'Paling lupa dulu = peluang ingat terendah tampil lebih awal.', seg('Urutan review', 'revOrder', [{ v: 'retensi', t: 'Paling lupa dulu' }, { v: 'tempo', t: 'Paling lama menunggu' }]), true)
    ]));

    el.appendChild(group('Penjadwal FSRS-7', 'Mengatur kapan kartu muncul lagi. Bawaannya sudah seimbang untuk kebanyakan orang.', [
      row('Target retensi', 'Peluang ingat yang dituju saat kartu muncul. Makin tinggi, makin sering mengulang.', slider('Target retensi', 'dr', { min: 70, max: 97, step: 1, mul: 100, fmt: function (v) { return v + '%'; } }), true),
      row('Langkah belajar (menit)', 'Untuk kartu baru, dipisah spasi.', stepsInput('Langkah belajar', 'learnSteps')),
      row('Langkah belajar ulang (menit)', 'Untuk kartu yang terlupa saat review.', stepsInput('Langkah belajar ulang', 'relearnSteps')),
      toggle('Lompatan awal dari FSRS', 'Kartu baru yang dijawab Bagus bisa langsung dijadwalkan beberapa hari ke depan tanpa menunggu langkah belajar.', 'override'),
      toggle('Geser interval sedikit', 'Menghindari kartu yang sama selalu muncul bersamaan.', 'fuzz'),
      row('Batas kartu bandel', 'Kartu yang terlupa sebanyak ini otomatis diberi bintang.', stepper('batas kartu bandel', 'leech', 2, 30, 1)),
      row('Pergantian hari', 'Jam saat hari belajar baru dimulai.', (function () {
        var sel = h('select.input.select', { 'aria-label': 'Pergantian hari' });
        for (var i = 0; i < 8; i++) sel.appendChild(h('option', { value: String(i), selected: S.get('rollover') === i }, U.pad2(i) + '.00'));
        sel.addEventListener('change', function () { S.set('rollover', +sel.value); }); return sel;
      })())
    ]));

    var ttsHint = FC.tts.supported ? (FC.tts.hasJa === false ? 'Suara bahasa Jepang belum terpasang di perangkat ini.' : 'Memakai suara bawaan perangkat, tanpa internet.') : 'Browser ini belum mendukung suara.';
    el.appendChild(group('Suara dan getar', null, [
      toggle('Ucapkan kartu otomatis', ttsHint, 'tts'),
      row('Kecepatan suara', null, slider('Kecepatan suara', 'ttsRate', { min: 60, max: 130, step: 5, mul: 100, fmt: function (v) { return (v / 100).toFixed(2).replace('.', ',') + 'x'; } }), true),
      toggle('Getar', 'Getaran singkat saat menjawab (di HP).', 'haptics')
    ]));

    /* data & cadangan */
    var status = h('div.storage-line', h('span', 'Memeriksa penyimpanan…'));
    var dataRows = [
      row('Penyimpanan', null, status, true),
      row('Unduh cadangan', S.getKv('lastBackup') ? 'Terakhir: ' + U.fmtAgo(S.getKv('lastBackup')) + '.' : 'Belum pernah. Disarankan sebelum ganti HP atau menghapus data browser.', h('button.btn.btn-sm', { type: 'button', onclick: exportBackup }, UI.iconEl('download', 'sm'), 'Unduh')),
      row('Pulihkan cadangan', 'Dari berkas .json hasil unduhan.', h('button.btn.btn-sm', { type: 'button', onclick: importBackup }, UI.iconEl('upload', 'sm'), 'Pilih berkas')),
      FC.userDecks.totals().decks ? row('Deck buatanmu', U.fmtNum(FC.userDecks.totals().decks) + ' deck, ' + U.fmtNum(FC.userDecks.totals().cards) + ' kartu. Ikut tersimpan di cadangan.', h('button.btn.btn-sm', { type: 'button', onclick: function () { FC.app.go('decks'); } }, 'Buka')) : null,
      row('Ekspor riwayat review', 'Berkas CSV untuk dibuka di spreadsheet.', h('button.btn.btn-sm', { type: 'button', onclick: exportCsv }, UI.iconEl('download', 'sm'), 'CSV'))
    ];
    var offBtn = h('button.btn.btn-sm', { type: 'button' }, 'Unduh semua deck');
    offBtn.addEventListener('click', function () {
      offBtn.disabled = true; offBtn.textContent = 'Mengunduh 0%';
      D.loadAll(function (d, t) { offBtn.textContent = 'Mengunduh ' + Math.round(d / t * 100) + '%'; }).then(function () { offBtn.textContent = 'Siap offline'; UI.toast('Semua deck sudah diunduh.'); },
        function (e) { offBtn.disabled = false; offBtn.textContent = 'Coba lagi'; UI.toast((e && e.message) || 'Pengunduhan gagal.'); });
    });
    if (D.allLoaded()) { offBtn.textContent = 'Sudah diunduh'; offBtn.disabled = true; }
    dataRows.push(row('Pakai tanpa internet', 'Isi deck diunduh saat dibuka. Unduh semuanya sekarang agar bisa dipakai offline.', offBtn));
    el.appendChild(group('Data dan cadangan', 'Progres belajar dan deck buatanmu disimpan di browser ini. Unduh cadangan secara berkala.', dataRows));
    refreshStatus(status);

    el.appendChild(group('Zona bahaya', null, [row('Hapus semua progres', 'Menghapus jadwal belajar, riwayat, dan bintang di perangkat ini. Deck buatanmu tetap ada.', h('button.btn.btn-sm.btn-danger', { type: 'button', onclick: wipe }, UI.iconEl('trash', 'sm'), 'Hapus'))]));

    var nDecks = D.decks.filter(function (d) { return d.shard && !d.user; }).length;
    el.appendChild(h('section.set-group.about', h('h2.section-title', 'Tentang'),
      h('details.fsrs-note', h('summary', 'Cara kerja jadwal belajar'),
        h('p', 'Setiap kartu punya tiga angka yang diperbarui tiap kali dijawab: stabilitas (berapa lama ingatan bertahan), kesulitan, dan peluang ingat saat ini. FSRS-7 memakai dua jejak ingatan, cepat dan lambat, sehingga jeda antar pengulangan lebih akurat dibanding aturan tetap.'),
        h('p', 'Kartu baru dimulai dengan langkah belajar singkat, lalu masuk ke jadwal harian. Menjawab Lagi mengembalikan kartu ke langkah belajar ulang; Sulit, Bagus, dan Mudah memperpanjang jeda dengan kelipatan berbeda. Target retensi menentukan kapan kartu dimunculkan lagi.'),
        h('p', 'Kartu yang sama di beberapa deck dihitung satu kartu dengan satu progres. Tiap arah (Jepang ke Indonesia dan sebaliknya) punya jadwal sendiri.')),
      h('p.about-line', 'Belajar Bahasa Jepang kelas 赤月. ' + U.fmtNum(nDecks) + ' deck dasar, ' + D.quizList.length + ' kuis. Versi ' + (FC.BUILD || 'dev') + '.')));
  }

  function refreshStatus(box) {
    var done = function (txt, warn) { if (!box.isConnected) return; U.clear(box); box.appendChild(h('span' + (warn ? '.warn' : ''), txt)); };
    var p = (navigator.storage && navigator.storage.persisted) ? navigator.storage.persisted().catch(function () { return false; }) : Promise.resolve(false);
    Promise.all([p, S.estimate()]).then(function (res) {
      S.persisted = !!res[0]; var est = res[1];
      if (!box.isConnected) return;
      U.clear(box);
      if (S.mode === 'memory') { box.appendChild(h('p.warn', 'Penyimpanan browser tidak tersedia. Progres hanya tersimpan sementara; unduh cadangan sebelum menutup halaman.')); return; }
      box.appendChild(h('p', 'Tersimpan di browser ini (IndexedDB)' + (est ? ', terpakai ' + fmtBytes(est.usage || 0) : '') + '.'));
      box.appendChild(h('p.muted.small', S.persisted ? 'Penyimpanan dilindungi: browser tidak menghapusnya saat ruang menipis.' : 'Browser boleh menghapusnya bila ruang menipis. Minta perlindungan agar lebih aman.'));
      if (!S.persisted) box.appendChild(h('button.btn.btn-sm', { type: 'button', onclick: function () { S.requestPersist().then(function (ok) { UI.toast(ok ? 'Penyimpanan dilindungi.' : 'Browser belum mengizinkan. Coba lagi setelah beberapa kali memakai aplikasi, atau pasang aplikasi ke layar utama.', { ms: 5600 }); refreshStatus(box); }); } }, 'Lindungi penyimpanan'));
    }).catch(function () { done('Status penyimpanan tidak bisa dibaca.', true); });
  }

  FC.app.register('settings', { render: render, show: function (el) { render(el); } });
})(window);
