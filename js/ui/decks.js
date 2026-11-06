/* =====================================================================
   js/ui/decks.js — tab Deck: daftar isi (seperti daftar isi buku), pencarian, lembar deck (statistik + tombol belajar),
   daftar kartu, deck ⭐ Kartu Susah, serta pemeriksaan gembok. Dipakai juga oleh Beranda (FC.decksUI).
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, D = FC.data, h = U.h, ST = FC.scheduler.ST;
  var DU = FC.decksUI = {};
  var state = { group: 'all', q: '' }, refs = {}, built = false;
  var dirNow = function () { return FC.store.get('dir') === 'r' ? 'r' : 'f'; };

  /* ---------- gembok ---------- */
  /** Minta kata sandi bila deck (atau induknya) terkunci. Promise<boolean>. */
  DU.ensureAccess = function (id) {
    var d = D.deck(id), chain = d && d.parent ? [d.parent, id] : [id];
    return chain.reduce(function (p, x) {
      return p.then(function (ok) {
        if (!ok) return false;
        var lock = D.lockOf(x);
        if (!lock || D.isUnlocked('deck:' + x)) return true;
        return UI.askPassword(D.deck(x).title, 'deck', lock, 'deck:' + x);
      });
    }, Promise.resolve(true));
  };

  /* ---------- angka ---------- */
  /** Hitung kartu deck menurut status SRS (arah sekarang). cards = isi deck yang sudah dimuat. */
  function numbers(cards) {
    var S = FC.store, dir = dirNow(), now = Date.now(), roll = S.get('rollover'), day = U.dayIndex(now, roll);
    var o = { total: cards.length, fresh: 0, learn: 0, young: 0, mature: 0, due: 0 };
    cards.forEach(function (c) {
      var r = S.getCard(D.cid(c) + ':' + dir);
      if (!r) { o.fresh++; return; }
      if (r.st === ST.REVIEW) { if ((r.ivl || 0) >= 21) o.mature++; else o.young++; if (U.dayIndex(r.due, roll) <= day) o.due++; }
      else { o.learn++; if (r.due <= now + 20 * U.MIN) o.due++; }
    });
    return o;
  }

  /* ---------- baris deck (gaya daftar isi) ---------- */
  DU.row = function (d, LS, opts) {
    opts = opts || {};
    var st = FC.session.deckStats(d.id, LS), lock = D.lockOf(d.id), kids = D.childDecks(d.id);
    var pct = d.count ? Math.min(100, Math.round(st.learned / d.count * 100)) : 0;
    var meta = h('div.row-sub.meta');
    if (d.soon) meta.appendChild(h('span', 'Segera hadir'));
    else {
      meta.appendChild(h('span', U.fmtNum(d.count) + ' kartu'));
      if (kids.length) meta.appendChild(h('span', kids.length + ' bagian'));
      if (opts.where) meta.appendChild(h('span', opts.where));
      else if (d.sub) meta.appendChild(h('span.jp', d.sub));
    }
    var main = h('div.row-main', h('div.row-title', d.title), meta);
    if (!d.soon && st.learned) main.appendChild(h('div.bar.deck-bar', { title: st.learned + ' dari ' + d.count + ' kartu sudah dipelajari' }, h('i', { style: { width: pct + '%' } })));
    var end = h('div.row-end');
    if (st.due) end.appendChild(h('span.due-badge', { title: st.due + ' kartu jatuh tempo' }, String(st.due)));
    if (lock) end.appendChild(UI.tier(lock.tier));
    if (!d.soon) end.appendChild(UI.iconEl('chev', 'sm'));
    if (d.soon) return h('div.row.deck-row.soon', main, end);
    return h('button.row.deck-row', { type: 'button', onclick: function () { DU.openDeck(d.id); } }, main, end);
  };
  DU.starRow = starRow;
  DU.switchRow = switchRow;       // dipakai juga oleh editor deck buatan sendiri (mydecks.js)
  function starRow() {
    var n = FC.store.starCount();
    return h('button.row.deck-row.star-row', { type: 'button', onclick: function () { DU.openStar(); } },
      h('span.star-glyph', UI.iconEl('star', 'fill')),
      h('div.row-main', h('div.row-title', 'Kartu Susah'), h('div.row-sub.meta', h('span', n + ' kartu bertanda bintang'))),
      h('div.row-end', UI.iconEl('chev', 'sm')));
  }

  /* ---------- layar Deck ---------- */
  function build(el) {
    built = true;
    refs.search = h('input.input', { type: 'search', placeholder: 'Cari deck, bab, atau kanji', 'aria-label': 'Cari deck', autocomplete: 'off', enterkeyhint: 'search' });
    refs.search.addEventListener('input', U.debounce(function () { state.q = refs.search.value; renderList(); }, 120));
    refs.chips = h('div.chips', { role: 'group', 'aria-label': 'Saring menurut kelompok' });
    [{ id: 'all', title: 'Semua' }].concat(D.groups).forEach(function (g) {
      var b = h('button.chip', { type: 'button', 'data-g': g.id, onclick: function () { state.group = g.id; syncChips(); renderList(); } }, g.title);
      refs.chips.appendChild(b);
    });
    refs.list = h('div.deck-list');
    el.appendChild(h('div.screen-head', h('div', h('h1.screen-title', 'Deck'), h('p.screen-sub', 'Pilih deck untuk dipelajari atau dilatih. Kartu hanya diunduh saat dibuka.'))));
    el.appendChild(h('div.search', UI.iconEl('search'), refs.search));
    el.appendChild(h('div.chips-wrap', refs.chips));
    el.appendChild(refs.list);
  }
  function syncChips() { U.$$('.chip', refs.chips).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-g') === state.group ? 'true' : 'false'); }); }

  function groupSection(g, LS) {
    var tops = D.topDecks(g.id), packs = tops.filter(function (d) { return d.pack; }), regular = tops.filter(function (d) { return !d.pack; });
    var sec = h('section.group', h('div.group-head', h('h2.group-title', g.title), g.sub ? h('span.group-sub.jp', g.sub) : null));
    if (regular.length) sec.appendChild(h('div.rows', regular.map(function (d) { return DU.row(d, LS); })));
    if (packs.length) { sec.appendChild(h('h3.subhead', 'Paket gabungan')); sec.appendChild(h('div.rows', packs.map(function (d) { return DU.row(d, LS); }))); }
    if (!regular.length && !packs.length) sec.appendChild(h('p.muted.small', 'Belum ada deck.'));
    return sec;
  }

  function renderList() {
    if (!refs.list) return;
    var list = U.clear(refs.list), LS = FC.session.leafStats(), q = state.q.trim();
    syncChips();
    if (q) {
      var hits = D.searchDecks(q).filter(function (d) { return state.group === 'all' || d.group === state.group; });
      if (!hits.length) { list.appendChild(h('div.empty', h('h3', 'Deck tidak ketemu'), h('p', 'Coba kata kunci lain, misalnya "bab 7", "kanji", atau "A2".'))); return; }
      var shown = hits.slice(0, 60);
      list.appendChild(h('p.muted.small.result-count', hits.length + ' deck ditemukan' + (hits.length > shown.length ? ', menampilkan ' + shown.length + ' pertama' : '')));
      list.appendChild(h('div.rows', shown.map(function (d) {
        var g = D.groupById.get(d.group), par = d.parent ? D.deck(d.parent) : null;
        return DU.row(d, LS, { where: (g ? g.title : '') + (par ? ', ' + par.title : '') });
      })));
      return;
    }
    if (FC.store.starCount() && (state.group === 'all')) list.appendChild(h('div.rows.star-rows', starRow()));
    D.groups.forEach(function (g) {
      if (state.group !== 'all' && state.group !== g.id) return;
      list.appendChild(g.user && FC.myDecks ? FC.myDecks.section(LS) : groupSection(g, LS));      // "Deck Saya": deck buatan pengguna (mydecks.js)
    });
  }

  FC.app.register('decks', {
    render: function (el) { if (!built) build(el); renderList(); },
    show: function (el) { if (!built) build(el); renderList(); }
  });
  FC.bus.on('progress', function () { if (FC.app.current() === 'decks') renderList(); });
  FC.bus.on('stars', function () { if (FC.app.current() === 'decks') renderList(); });

  /* ---------- lembar deck ---------- */
  DU.openDeck = function (id) {
    var d = D.deck(id); if (!d) return;
    if (d.soon) { UI.toast('Deck ini belum ada kartunya.'); return; }
    DU.ensureAccess(id).then(function (ok) { if (ok) openSheet(id); });
  };

  function statBox(num, label, cls) { return h('div.dstat' + (cls ? '.' + cls : ''), h('div.dstat-n.num', U.fmtNum(num)), h('div.dstat-l', label)); }
  function stackBar(n) {
    var t = Math.max(1, n.total), w = function (x) { return (x / t * 100).toFixed(2) + '%'; };
    return h('div.stack', { role: 'img', 'aria-label': n.mature + ' dikuasai, ' + (n.young + n.learn) + ' sedang dipelajari, ' + n.fresh + ' baru' },
      h('i.s-mature', { style: { width: w(n.mature) } }), h('i.s-young', { style: { width: w(n.young + n.learn) } }), h('i.s-fresh', { style: { width: w(n.fresh) } }));
  }
  function legend() {
    return h('div.stack-legend', h('span', h('i.s-mature'), 'Dikuasai'), h('span', h('i.s-young'), 'Dipelajari'), h('span', h('i.s-fresh'), 'Baru'));
  }
  function switchRow(label, hint, checked, onchange) {
    var inp = h('input', { type: 'checkbox', role: 'switch', 'aria-label': label }); inp.checked = !!checked;
    inp.addEventListener('change', function () { onchange(inp.checked); });
    return h('label.setting-row', h('div.setting-text', h('div.setting-label', label), hint ? h('div.setting-hint', hint) : null), h('span.switch', inp, h('i')));
  }

  function openSheet(id) {
    var d = D.deck(id), par = d.parent ? D.deck(d.parent) : null, body = h('div.deck-sheet', h('p.muted', 'Memuat kartu…'));
    var L = UI.sheet({ title: d.title, sub: par ? par.title : (d.sub || (D.groupOf(id) || {}).title || ''), body: body });
    function load() {
      D.resolve(id).then(function (cards) { fill(L, body, id, cards); }).catch(function (e) {
        U.clear(body);
        body.appendChild(h('div.banner.err', h('span', (e && e.message) || 'Kartu gagal dimuat.')));
        body.appendChild(h('div.sheet-actions', h('button.btn.btn-primary', { type: 'button', onclick: function () { U.clear(body); body.appendChild(h('p.muted', 'Memuat kartu…')); load(); } }, 'Coba lagi')));
      });
    }
    load();
  }

  function fill(L, body, id, cards) {
    var S = FC.store, d = D.deck(id), n = numbers(cards), lim = FC.session.limits(Date.now());
    U.clear(body);
    var go = function (fn) { return function () { var below = UI.layers(); fn(); below.forEach(function (x) { x.close(); }); }; };   // buka layar belajar dulu, baru tutup SEMUA lembar di bawahnya (satu entri riwayat saja)
    var mine = !!d.user && !!FC.myDecks;
    if (mine && !cards.length) { body.appendChild(FC.myDecks.emptyState(id, go)); body.appendChild(FC.myDecks.footer(id, L)); return; }      // deck buatan sendiri yang masih kosong
    var todayNew = Math.min(n.fresh, lim.newLeft);
    body.appendChild(h('div.deck-stats', statBox(n.fresh, 'Baru', 'new'), statBox(n.due, 'Jatuh tempo', 'due'), statBox(n.mature, 'Dikuasai', 'mature'), statBox(n.total, 'Total')));
    body.appendChild(stackBar(n)); body.appendChild(legend());
    body.appendChild(h('div.sheet-actions',
      h('button.btn.btn-primary.btn-block', { type: 'button', onclick: go(function () { FC.study.start({ type: 'deck', id: id }); }) }, 'Belajar'),
      h('p.hint.center', n.due + ' review dan ' + todayNew + ' kartu baru untuk hari ini'),
      h('button.btn.btn-block', { type: 'button', onclick: go(function () { FC.study.cram({ type: 'deck', id: id }); }) }, 'Latihan bebas'),
      h('p.hint.center', 'Membalik semua kartu tanpa mengubah jadwal')));
    if (mine) body.appendChild(FC.myDecks.editRow(id, go));
    var active = (S.get('active') || []).indexOf(id) >= 0, locked = !!D.lockOf(id) || (d.parent && !!D.lockOf(d.parent));
    body.appendChild(switchRow('Ikut sesi harian', locked ? 'Deck terkunci baru ikut sesi harian setelah kuncinya dibuka di halaman ini.' : 'Kartu baru dan review deck ini muncul di Beranda.', active, function (on) {
      var cur = (S.get('active') || []).filter(function (x) { return x !== id; });
      if (on) cur.push(id);
      S.set('active', cur); FC.bus.emit('progress');
      UI.toast(on ? 'Masuk ke sesi harian' : 'Dikeluarkan dari sesi harian');
    }));
    var kids = D.childDecks(id);
    if (kids.length) {
      var LS = FC.session.leafStats();
      body.appendChild(h('h3.subhead', 'Bagian'));
      body.appendChild(h('div.rows', kids.map(function (k) { var row = DU.row(k, LS); return row; })));
    }
    body.appendChild(h('div.rows.tight', h('button.row', { type: 'button', onclick: function () { DU.openCardList(D.titleOf(id), cards); } },
      h('div.row-main', h('div.row-title', 'Daftar kartu'), h('div.row-sub', U.fmtNum(cards.length) + ' kartu, ketuk untuk melihat detail jadwal')), h('div.row-end', UI.iconEl('chev', 'sm')))));
    if (n.fresh < n.total) {
      body.appendChild(h('button.btn.btn-quiet.btn-danger-quiet.btn-block', { type: 'button', onclick: function () {
        UI.confirm({ title: 'Atur ulang progres deck ini?', text: 'Semua kartu di deck ini kembali jadi baru, di kedua arah. Riwayat review di Statistik tetap tersimpan.', ok: 'Atur ulang', danger: true }).then(function (ok) {
          if (!ok) return;
          FC.session.resetDeck(id).then(function (k) { UI.toast(k + ' catatan kartu direset'); FC.bus.emit('progress'); fill(L, body, id, cards); });
        });
      } }, 'Atur ulang progres deck'));
    }
    if (mine) body.appendChild(FC.myDecks.footer(id, L));
  }

  /* ---------- ⭐ Kartu Susah ---------- */
  DU.openStar = function () {
    var S = FC.store, n0 = S.starCount();
    if (!n0) { UI.toast('Belum ada kartu bintang. Ketuk ⭐ saat belajar untuk menandai kartu susah.'); return; }
    var body = h('div.deck-sheet', h('p.muted', 'Memuat kartu…'));
    var L = UI.sheet({ title: 'Kartu Susah', sub: n0 + ' kartu bertanda bintang', body: body });
    FC.session.cramCards({ type: 'star' }).then(function (cards) {
      var n = numbers(cards);
      U.clear(body);
      body.appendChild(h('div.deck-stats', statBox(n.fresh, 'Baru', 'new'), statBox(n.due, 'Jatuh tempo', 'due'), statBox(n.mature, 'Dikuasai', 'mature'), statBox(n.total, 'Total')));
      var go = function (fn) { return function () { var below = UI.layers(); fn(); below.forEach(function (x) { x.close(); }); }; };   // buka layar belajar dulu, baru tutup SEMUA lembar di bawahnya (satu entri riwayat saja)
      body.appendChild(h('div.sheet-actions',
        h('button.btn.btn-primary.btn-block', { type: 'button', onclick: go(function () { FC.study.start({ type: 'star' }); }) }, 'Belajar kartu susah'),
        h('button.btn.btn-block', { type: 'button', onclick: go(function () { FC.study.cram({ type: 'star' }); }) }, 'Latihan bebas')));
      body.appendChild(h('div.rows.tight', h('button.row', { type: 'button', onclick: function () { DU.openCardList('Kartu Susah', cards); } },
        h('div.row-main', h('div.row-title', 'Daftar kartu'), h('div.row-sub', 'Ketuk bintang untuk melepas tanda')), h('div.row-end', UI.iconEl('chev', 'sm')))));
      body.appendChild(h('button.btn.btn-quiet.btn-danger-quiet.btn-block', { type: 'button', onclick: function () {
        UI.confirm({ title: 'Kosongkan Kartu Susah?', text: 'Semua tanda bintang dilepas. Jadwal belajar kartunya tidak berubah.', ok: 'Kosongkan', danger: true }).then(function (ok) {
          if (!ok) return; S.stars().forEach(function (m) { S.setStar(m.cid, m.c, m.sh, false); });
          L.close(); FC.bus.emit('stars'); FC.bus.emit('progress'); UI.toast('Kartu Susah dikosongkan');
        });
      } }, 'Kosongkan semua bintang'));
    }).catch(function (e) { U.clear(body); body.appendChild(h('div.banner.err', (e && e.message) || 'Kartu gagal dimuat.')); });
  };

  /* ---------- daftar kartu ---------- */
  var STATE_LABEL = { new: 'Baru', learn: 'Sedang belajar', review: 'Review' };
  function cardRow(c, dir) {
    var S = FC.store, cid = D.cid(c), rec = S.getCard(cid + ':' + dir), jp = FC.face.japanese(c), roll = S.get('rollover');
    var kind = !rec ? 'new' : rec.st === ST.REVIEW ? 'review' : 'learn', due = '';
    if (kind === 'review') { var left = U.dayIndex(rec.due, roll) - U.dayIndex(Date.now(), roll); due = left <= 0 ? 'Hari ini' : left === 1 ? 'Besok' : U.fmtInterval(left); }
    else if (kind === 'learn') due = 'Belajar';
    var open = function () { FC.study.cardInfo(c); };
    return h('div.citem', { role: 'button', tabindex: '0', onclick: open, onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } } },
      h('span.dot.dot-' + kind, { title: STATE_LABEL[kind], role: 'img', 'aria-label': STATE_LABEL[kind] }),
      h('div.citem-main',
        h('div.citem-front.jp' + (jp.ruby ? '.has-ruby' : ''), { html: jp.html }),
        c.back && c.back !== c.front ? h('div.citem-read.jp', c.back) : null,
        c.backSub ? h('div.citem-mean', c.backSub) : null),
      h('div.citem-end', due ? h('span.citem-due', due) : null, UI.starButton(c)));
  }

  DU.openCardList = function (title, cards) {
    var PAGE = 40, shown = 0, filtered = cards, dir = dirNow();
    UI.layer('full', function (L) {
      var list = h('div.citems'), sentinel = h('div.sentinel', { hidden: true }, h('button.btn.btn-quiet', { type: 'button', onclick: more }, 'Tampilkan lebih banyak'));
      var count = h('p.muted.small.result-count');
      var input = h('input.input', { type: 'search', placeholder: 'Cari di deck ini', 'aria-label': 'Cari kartu', autocomplete: 'off' });
      var body = h('div.full-body', h('div.full-inner', h('div.search', UI.iconEl('search'), input), count, list, sentinel));
      var bar = UI.fullBar({ title: 'Daftar kartu', sub: title, onBack: function () { L.close(); }, actions: [UI.furiButton()] });
      L.el.appendChild(bar); L.el.appendChild(body);
      function more() {
        var end = Math.min(filtered.length, shown + PAGE), frag = document.createDocumentFragment();
        for (var i = shown; i < end; i++) frag.appendChild(cardRow(filtered[i], dir));
        list.appendChild(frag); shown = end; sentinel.hidden = shown >= filtered.length;
      }
      function reset() {
        U.clear(list); shown = 0; more();
        count.textContent = U.fmtNum(filtered.length) + (filtered.length === cards.length ? ' kartu' : ' dari ' + U.fmtNum(cards.length) + ' kartu');
        if (!filtered.length) list.appendChild(h('div.empty', h('p', 'Tidak ada kartu yang cocok.')));
      }
      input.addEventListener('input', U.debounce(function () {
        var q = U.norm(input.value).trim();
        filtered = !q ? cards : cards.filter(function (c) { return U.norm(c.front + ' ' + c.back + ' ' + (c.backSub || '')).indexOf(q) >= 0; });
        reset();
      }, 140));
      if ('IntersectionObserver' in root) {
        var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting && shown < filtered.length) more(); }, { root: body, rootMargin: '500px 0px' });
        io.observe(sentinel); sentinel.hidden = false; sentinel.classList.add('auto');
        L.io = io;
      }
      var off = FC.bus.on('furigana', function () { if (!L.el.isConnected) return off(); var keep = shown; U.clear(list); shown = 0; while (shown < keep) more(); });
      reset();
    });
  };
})(window);
