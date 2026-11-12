/* =====================================================================
   js/ui/home.js — Beranda: Bulan Merah (赤月) yang makin penuh seiring kartu hari ini selesai, jumlah baru/belajar/review,
   tombol "Mulai belajar", arah kartu, deck aktif, dan pintasan ⭐ Kartu Susah. Kosong → ajakan memilih deck pertama.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, D = FC.data, h = U.h;
  var state = { lastP: null, anim: false, loading: false, failed: false };

  FC.bus.on('session:end', function () { state.anim = true; });
  FC.bus.on('progress', function () { state.failed = false; if (FC.app.current() === 'home') render(U.$('#screen-home')); });
  FC.bus.on('stars', function () { if (FC.app.current() === 'home') render(U.$('#screen-home')); });
  FC.bus.on('furigana', function () { /* beranda tidak menampilkan kartu */ });

  function activeDecks() { return (FC.store.get('active') || []).filter(function (id) { return D.deck(id) && !D.deck(id).soon; }); }

  /** muat kartu deck aktif di latar belakang supaya jumlah "baru" bisa dihitung, lalu gambar ulang */
  function preload(ids) {
    if (state.loading || state.failed) return;
    var need = [];
    ids.forEach(function (id) { if (!D.isLoaded(id)) D.shardsFor(id).forEach(function (s) { if (need.indexOf(s) < 0) need.push(s); }); });
    if (!need.length) return;
    state.loading = true;
    D.loadShards(need).then(function () { state.loading = false; if (FC.app.current() === 'home') render(U.$('#screen-home')); },
      function () { state.loading = false; state.failed = true; if (FC.app.current() === 'home') render(U.$('#screen-home')); });
  }

  function count(n, label, cls, hint) {
    return h('button.count.k-' + cls, { type: 'button', title: hint || '', 'aria-label': label + ': ' + (n == null ? 'memuat' : U.fmtNum(n)) + ' kartu. Ketuk untuk melihat daftarnya.', onclick: function () { openCards(cls); } },
      h('div.count-n.num', n == null ? '–' : U.fmtNum(n)), h('div.count-l', label));
  }

  /** Ketuk Baru / Belajar / Review → daftar kartunya. Memakai antrean sesi yang sama dengan "Mulai belajar", jadi isinya cocok dengan angkanya. */
  var CARD_LISTS = {
    new: { title: 'Kartu baru hari ini', empty: 'Tidak ada kartu baru untuk hari ini.' },
    learn: { title: 'Kartu yang sedang dipelajari', empty: 'Tidak ada kartu belajar yang menunggu.' },
    review: { title: 'Kartu review hari ini', empty: 'Tidak ada kartu review untuk hari ini.' }
  };
  var listing = false;
  function openCards(kind) {
    if (listing) return; listing = true;
    FC.session.build({ scope: { type: 'all' } }).then(function (sess) {
      var q = kind === 'learn' ? sess.learnQ : sess.mainQ.filter(function (i) { return i.kind === (kind === 'new' ? 'n' : 'r'); });
      var cards = q.map(function (i) { return i.card; }), meta = CARD_LISTS[kind];
      if (!cards.length) { UI.toast(meta.empty); return; }
      FC.decksUI.openCardList(meta.title, cards, { placeholder: 'Cari di daftar ini' });
    }).catch(function () { UI.toast('Kartu gagal dimuat. Coba lagi.'); }).then(function () { listing = false; });
  }

  function tomorrowDue() {
    var S = FC.store, dir = S.get('dir') === 'r' ? 'r' : 'f', roll = S.get('rollover'), day = U.dayIndex(Date.now(), roll) + 1, n = 0;
    S.allCards().forEach(function (c) { if (c.dir === dir && c.st === FC.scheduler.ST.REVIEW && U.dayIndex(c.due, roll) === day) n++; });
    return n;
  }

  function onboarding(el) {
    var open = function (d) { return !d.pack && !d.soon && !D.lockOf(d.id); };
    var tops = D.topDecks('a1').filter(open).slice(0, 3);
    if (!tops.length) tops = D.decks.filter(function (d) { return !d.parent && open(d); }).slice(0, 3);
    var moon = UI.moon(0, 132, { label: 'Bulan belum menyala' });
    var box = h('div.onboard',
      h('div.hero', h('div.hero-moon', moon.el),
        h('div.hero-text', h('h1.hero-title', 'Mulai dari satu deck'),
          h('p.hero-sub', 'Pilih deck yang ingin dipelajari. Tiap hari aplikasi menyiapkan kartu baru dan kartu yang waktunya diulang, dijadwalkan dengan FSRS agar kamu mengulang tepat sebelum lupa.'))),
      h('h2.section-title', 'Saran untuk pemula'),
      h('div.rows', tops.map(function (d) {
        return h('div.row', h('div.row-main', h('div.row-title', d.title), h('div.row-sub.meta', h('span', U.fmtNum(d.count) + ' kartu'), d.children ? h('span', d.children.length + ' bagian') : null, d.sub ? h('span.jp', d.sub) : null)),
          h('div.row-end', h('button.btn.btn-sm.btn-primary', { type: 'button', onclick: function () {
            var cur = (FC.store.get('active') || []).slice(); if (cur.indexOf(d.id) < 0) cur.push(d.id);
            FC.store.set('active', cur); UI.toast(d.title + ' masuk ke sesi harian'); FC.bus.emit('progress');
          } }, 'Tambah')));
      })),
      h('div.sheet-actions',
        h('button.btn.btn-block', { type: 'button', onclick: function () { FC.app.go('decks'); } }, 'Lihat semua deck'),
        FC.myDecks ? h('button.btn.btn-quiet.btn-block', { type: 'button', onclick: function () { FC.myDecks.create(); } }, 'Atau buat deck sendiri') : null));
    el.appendChild(box);
  }

  function render(el) {
    if (!el) return;
    var S = FC.store, r = FC.session.today(), active = activeDecks(), hasRecords = S.allCards().size > 0;
    U.clear(el);
    if (!active.length && !hasRecords) { state.lastP = 0; return onboarding(el); }
    preload(active.filter(function (id) { return !D.lockOf(id) || D.isUnlocked('deck:' + id); }));

    var unknownNew = r.newShown === null && !state.failed;
    var done = r.doneNew + r.doneRev, pending = r.pending, total = done + pending;
    var p = total ? done / total : 0; if (!pending && done) p = 1;

    var animate = state.anim && state.lastP != null && Math.abs(state.lastP - p) > 0.004; state.anim = false;
    var moon = UI.moon(animate ? state.lastP : p, 132, { label: 'Kemajuan hari ini ' + Math.round(p * 100) + ' persen' });
    if (animate) setTimeout(function () { moon.set(p, 1100); }, 280);
    state.lastP = p;

    var head, sub;
    if (unknownNew) { head = 'Menyiapkan kartu…'; sub = 'Mengunduh isi deck aktif.'; }
    else if (pending > 0) { head = U.fmtNum(pending) + ' kartu menunggu'; sub = done ? done + ' kartu sudah selesai hari ini.' : 'Mulai sekarang selagi ingatan masih segar.'; }
    else if (done > 0) { var tm = tomorrowDue(); head = 'Selesai untuk hari ini'; sub = tm ? 'Besok ada ' + U.fmtNum(tm) + ' kartu review.' : 'Kartu berikutnya jatuh tempo di hari-hari mendatang.'; }
    else if (!active.length) { head = 'Belum ada deck aktif'; sub = 'Tambahkan deck ke sesi harian dari tab Deck.'; }
    else if (r.newLeft === 0) { head = 'Batas kartu baru tercapai'; sub = 'Kamu bisa menambah kartu baru lewat "Belajar lebih".'; }
    else { head = 'Tidak ada kartu hari ini'; sub = 'Semua kartu di deck aktif sudah dipelajari.'; }

    var streak = h('span.streak', { hidden: true }, UI.iconEl('flame', 'sm'), h('span'));
    if (FC.stats && FC.stats.streak) FC.stats.streak().then(function (s) {
      if (!streak.isConnected || !s.current) return;
      streak.lastChild.textContent = s.current + ' hari beruntun'; streak.hidden = false;
    }).catch(function () {});

    el.appendChild(h('div.hero', h('div.hero-moon', moon.el),
      h('div.hero-text', h('h1.hero-title', head), h('p.hero-sub', sub), streak)));
    el.appendChild(h('div.counts', { role: 'group', 'aria-label': 'Rincian kartu hari ini' },
      count(unknownNew ? null : r.newShown, 'Baru', 'new', 'Kartu baru hari ini'), count(r.learn, 'Belajar', 'learn', 'Kartu yang sedang dipelajari'), count(r.reviewShown, 'Review', 'review', 'Kartu yang waktunya diulang')));

    var cta;
    if (pending > 0) cta = h('button.btn.btn-primary.btn-block.cta', { type: 'button', onclick: function () { FC.study.start({ type: 'all' }); } }, 'Mulai belajar');
    else if (active.length) cta = h('button.btn.btn-block.cta', { type: 'button', onclick: function () { FC.study.more({ type: 'all' }); } }, 'Belajar lebih');
    else cta = h('button.btn.btn-primary.btn-block.cta', { type: 'button', onclick: function () { FC.app.go('decks'); } }, 'Pilih deck');
    el.appendChild(cta);

    if (r.locked) el.appendChild(h('div.banner', UI.iconEl('lock', 'sm'), h('span', U.fmtNum(r.locked) + ' kartu jatuh tempo ada di deck terkunci. Buka kuncinya dari tab Deck agar ikut sesi.')));

    /* arah kartu */
    var dir = S.get('dir') === 'r' ? 'r' : 'f';
    var seg = h('div.seg', { role: 'radiogroup', 'aria-label': 'Arah kartu' },
      h('button', { type: 'button', role: 'radio', 'aria-checked': dir === 'f' ? 'true' : 'false', onclick: function () { S.set('dir', 'f'); } }, 'Jepang ke Indonesia'),
      h('button', { type: 'button', role: 'radio', 'aria-checked': dir === 'r' ? 'true' : 'false', onclick: function () { S.set('dir', 'r'); } }, 'Indonesia ke Jepang'));
    el.appendChild(h('div.section.dir-block', h('div.field', h('div.field-label', 'Arah kartu'), seg, h('p.field-hint', 'Jadwal tiap arah dicatat terpisah, jadi ganti arah tidak menghapus progres.'))));

    /* deck aktif */
    var LS = FC.session.leafStats();
    var sec = h('section.section', h('h2.section-title', 'Deck aktif', h('button.link.btn-link', { type: 'button', onclick: function () { FC.app.go('decks'); } }, active.length ? 'Atur' : 'Tambah')));
    if (active.length) sec.appendChild(h('div.rows', active.map(function (id) { return FC.decksUI.row(D.deck(id), LS); })));
    else sec.appendChild(h('p.muted', 'Belum ada. Buka tab Deck, pilih deck, lalu nyalakan "Ikut sesi harian".'));
    el.appendChild(sec);

    if (S.starCount()) el.appendChild(h('section.section', h('h2.section-title', 'Kartu Susah'), h('div.rows', FC.decksUI.starRow())));
  }

  FC.app.register('home', { render: render, show: function (el) { render(el); } });
})(window);
