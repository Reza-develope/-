/* =====================================================================
   js/core/session.js — SESI BELAJAR: menyusun antrean harian, memilih kartu berikutnya,
   mencatat jawaban (lewat penjadwal + penyimpanan), batal (undo), tunda, serta ringkasan hari ini.

   Model (mirip Anki):
     • Antrean = kartu BELAJAR yang jatuh tempo (menit/jam) → kartu REVIEW yang jatuh tempo hari ini
       (peluang ingat terendah dulu) → kartu BARU dari deck aktif; baru & review bisa dicampur/dipisah.
     • Batas harian kartu baru & review berlaku global (dibagi ke semua deck).
     • "Belajar lebih": tambah jatah hari ini tanpa mengubah pengaturan.
     • Kartu belajar yang jatuh tempo ≤ 20 menit ke depan ditampilkan kalau antrean lain sudah habis.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  if (!FC.util && typeof require === 'function') { require('./util.js'); require('./fsrs.js'); require('./scheduler.js'); }
  var U = FC.util, SCH = FC.scheduler, ST = SCH.ST;
  var LEARN_AHEAD = 20 * 60000, UNDO_DEPTH = 30;

  var SESS = {};
  var dirOf = function () { return FC.store.get('dir') === 'r' ? 'r' : 'f'; };

  /** Penjadwal sesuai pengaturan sekarang. */
  SESS.makeScheduler = function () {
    var g = FC.store.get.bind(FC.store);
    var steps = function (s) { return String(s || '').split(/[\s,;]+/).map(Number).filter(function (x) { return x > 0; }); };
    return SCH.create({
      dr: g('dr'), learnSteps: steps(g('learnSteps')), relearnSteps: steps(g('relearnSteps')),
      override: g('override'), fuzz: g('fuzz'), leech: g('leech'), rollover: g('rollover')
    });
  };
  var dayNow = function (now) { return U.dayIndex(now, FC.store.get('rollover')); };
  var keyOf = function (cid, dir) { return cid + ':' + dir; };

  function limits(now) {
    var day = dayNow(now), d = FC.store.daily(day), s = FC.store;
    return {
      day: day, nw: d.nw, rv: d.rv, nb: d.nb || 0, rb: d.rb || 0,
      newLeft: Math.max(0, s.get('newPerDay') + (d.nb || 0) - d.nw),
      revLeft: Math.max(0, s.get('revPerDay') + (d.rb || 0) - d.rv)
    };
  }
  SESS.limits = limits;

  var buriedKeys = function (day) { var b = FC.store.getKv('buried'); return b && b.day === day ? new Set(b.keys) : new Set(); };

  /** kartu aktif yang boleh dipakai di sesi global: tidak terkunci, atau sudah dibuka di halaman ini */
  function deckAccessible(id) {
    var lock = FC.data.lockOf(id);
    return !lock || FC.data.isUnlocked('deck:' + id);
  }
  function leafAccessible(dk) {
    if (!dk) return true;
    if (!deckAccessible(dk)) return false;
    var d = FC.data.deck(dk); return !(d && d.parent && !deckAccessible(d.parent));
  }

  /** Memuat isi kartu untuk sekumpulan catatan SRS (hanya shard yang perlu). Mengembalikan Map key → kartu. */
  function contentFor(recs) {
    var need = new Set(); recs.forEach(function (r) { if (r.sh) need.add(r.sh); });
    return FC.data.loadShards(Array.from(need)).catch(function () {}).then(function () {
      var m = new Map();
      recs.forEach(function (r) {
        var c = FC.data.findCard(r.id);
        if (!c) { var mk = FC.store.stars().filter(function (s) { return s.cid === r.id; })[0]; if (mk) c = mk.c; }
        if (c) m.set(r.k, c);
      });
      return m;
    });
  }

  /** Daftar kartu baru (tanpa catatan SRS pada arah ini) dari kumpulan deck, urut deck → urut kartu. */
  function newCandidates(cards, dir) {
    var out = [], seen = new Set();
    cards.forEach(function (c) {
      var id = FC.data.cid(c);
      if (seen.has(id)) return; seen.add(id);
      if (!FC.store.getCard(keyOf(id, dir))) out.push(c);
    });
    return out;
  }

  /** Kartu dari deck-deck tertentu (hanya yang bisa diakses), deduplikasi, urutan = urutan deck. */
  function cardsOfDecks(ids) {
    var jobs = ids.filter(function (id) { return FC.data.deck(id) && !FC.data.deck(id).soon; }).map(function (id) { return FC.data.resolve(id).catch(function () { return []; }); });
    return Promise.all(jobs).then(function (lists) {
      var seen = new Set(), out = [];
      lists.forEach(function (l) { l.forEach(function (c) { var id = FC.data.cid(c); if (!seen.has(id)) { seen.add(id); out.push(c); } }); });
      return out;
    });
  }

  /* ---------------- membangun sesi ---------------- */
  /**
   * opts: { scope: {type:'all'} | {type:'deck', id} | {type:'star'}, now?, rng? }
   * Mengembalikan Promise<Session>.
   */
  SESS.build = function (opts) {
    var sch = SESS.makeScheduler(), now = (opts && opts.now) || Date.now(), dir = dirOf(), scope = opts.scope || { type: 'all' };
    var lim = limits(now), st = FC.store;
    var buried = buriedKeys(lim.day);

    var contentP;      // → { set: Set<cid>|null, newCards: card[] , title }
    if (scope.type === 'deck') {
      contentP = FC.data.resolve(scope.id).then(function (cards) {
        return { set: new Set(cards.map(FC.data.cid)), newCards: newCandidates(cards, dir), title: FC.data.titleOf(scope.id) };
      });
    } else if (scope.type === 'star') {
      var stars = st.stars();
      var shardsNeeded = Array.from(new Set(stars.map(function (m) { return m.sh; }).filter(Boolean)));
      contentP = FC.data.loadShards(shardsNeeded).catch(function () {}).then(function () {
        var cards = stars.map(function (m) { return FC.data.findCard(m.cid) || m.c; });
        return { set: new Set(stars.map(function (m) { return m.cid; })), newCards: newCandidates(cards, dir), title: '⭐ Kartu Susah' };
      });
    } else {
      var active = (st.get('active') || []).filter(function (id) { return FC.data.deck(id) && deckAccessible(id); });
      contentP = cardsOfDecks(active).then(function (cards) { return { set: null, newCards: newCandidates(cards, dir), title: 'Belajar hari ini' }; });
    }

    return contentP.then(function (ct) {
      // --- kumpulkan catatan jatuh tempo ---
      var recs = [];
      st.allCards().forEach(function (r) {
        if (r.dir !== dir || buried.has(r.k)) return;
        if (ct.set && !ct.set.has(r.id)) return;
        if (!ct.set && !leafAccessible(r.dk)) return;
        recs.push(r);
      });
      var learnRecs = [], revRecs = [];
      recs.forEach(function (r) {
        if (r.st === ST.LEARN || r.st === ST.RELEARN) { if (r.due <= now + LEARN_AHEAD) learnRecs.push(r); }
        else if (r.st === ST.REVIEW && U.dayIndex(r.due, st.get('rollover')) <= lim.day) revRecs.push(r);
      });
      // urutan review
      if (st.get('revOrder') === 'tempo') revRecs.sort(function (a, b) { return a.due - b.due; });
      else { var rr = new Map(); revRecs.forEach(function (r) { rr.set(r.k, sch.retrievability(r, now)); }); revRecs.sort(function (a, b) { return rr.get(a.k) - rr.get(b.k); }); }
      revRecs = revRecs.slice(0, lim.revLeft);
      var newCards = ct.newCards.filter(function (c) { return !buried.has(keyOf(FC.data.cid(c), dir)); });
      if (st.get('newOrder') === 'acak') U.shuffle(newCards, (opts && opts.rng) || U.seededRng('baru:' + lim.day + ':' + (scope.id || scope.type)));
      newCards = newCards.slice(0, lim.newLeft);

      return contentFor(learnRecs.concat(revRecs)).then(function (cmap) {
        var item = function (r, kind) { var c = cmap.get(r.k); return c ? { key: r.k, cid: r.id, dir: dir, card: c, kind: kind, rec: r } : null; };
        var learnQ = learnRecs.map(function (r) { return item(r, 'l'); }).filter(Boolean).sort(function (a, b) { return a.rec.due - b.rec.due; });
        var revQ = revRecs.map(function (r) { return item(r, 'r'); }).filter(Boolean);
        var newQ = newCards.map(function (c) { var id = FC.data.cid(c); return { key: keyOf(id, dir), cid: id, dir: dir, card: c, kind: 'n', rec: null }; });
        return new Session(sch, scope, dir, now, ct.title, learnQ, mix(revQ, newQ, st.get('mix')));
      });
    });
  };

  function mix(revQ, newQ, mode) {
    if (mode === 'setelah') return revQ.concat(newQ);
    if (mode === 'sebelum') return newQ.concat(revQ);
    if (!newQ.length) return revQ.slice();
    if (!revQ.length) return newQ.slice();
    var out = [], step = (revQ.length + newQ.length) / newQ.length, ni = 0, ri = 0;     // sebar kartu baru merata di antara review
    for (var i = 0; i < revQ.length + newQ.length; i++) {
      var wantNew = ni < newQ.length && (ri >= revQ.length || i >= Math.floor((ni + 0.5) * step));
      out.push(wantNew ? newQ[ni++] : revQ[ri++]);
    }
    return out;
  }
  SESS._mix = mix;

  /* ---------------- objek sesi ---------------- */
  function Session(sch, scope, dir, now, title, learnQ, mainQ) {
    this.sch = sch; this.scope = scope; this.dir = dir; this.title = title; this.startedAt = now;
    this.learnQ = learnQ; this.mainQ = mainQ; this.cur = null; this.undoStack = [];
    this.stats = { done: 0, again: 0, ms: 0 };
    this.initial = { n: mainQ.filter(function (i) { return i.kind === 'n'; }).length, l: learnQ.length, r: mainQ.filter(function (i) { return i.kind === 'r'; }).length };
  }
  var P = Session.prototype;

  P.counts = function () {
    var n = 0, r = 0, l = this.learnQ.length;
    this.mainQ.forEach(function (i) { if (i.kind === 'n') n++; else r++; });
    var c = this.cur; if (c) { if (c.kind === 'n') n++; else if (c.kind === 'r') r++; else l++; }
    return { n: n, l: l, r: r, total: n + l + r };
  };
  P.remaining = function () { return this.counts().total; };

  /** Pilih & kembalikan kartu berikutnya (atau null bila selesai). */
  P.next = function (now) {
    now = now || Date.now();
    var it = null;
    if (this.learnQ.length && this.learnQ[0].rec.due <= now) it = this.learnQ.shift();
    else if (this.mainQ.length) it = this.mainQ.shift();
    else if (this.learnQ.length && this.learnQ[0].rec.due <= now + LEARN_AHEAD) it = this.learnQ.shift();
    this.cur = it; this.shownAt = now;
    return it;
  };
  /** Kapan kartu belajar berikutnya jatuh tempo (untuk layar "tunggu sebentar"), atau null. */
  P.nextLearnDue = function () { return this.learnQ.length ? this.learnQ[0].rec.due : null; };

  /** Pratinjau 4 tombol untuk kartu sekarang: [{grade,label,ivl,due}] */
  P.preview = function (now) {
    now = now || Date.now();
    var it = this.cur; if (!it) return [];
    var rec = FC.store.getCard(it.key);
    return this.sch.outcomes(rec, now, it.key).map(function (o) { return { grade: o.grade, label: U.fmtInterval(o.ivl), ivl: o.ivl, due: o.due, st: o.st }; });
  };

  /** Catat jawaban untuk kartu sekarang. Mengembalikan {leech, first, due, card}. */
  P.answer = function (grade, now) {
    now = now || Date.now();
    var it = this.cur; if (!it) return null;
    var st = FC.store, prev = st.getCard(it.key);
    var ms = Math.min(this.shownAt ? now - this.shownAt : 0, 600000);
    var cardId = it.cid, leaf = FC.data.originOf(it.card) || (this.scope.type === 'deck' ? this.scope.id : null);
    var sh = FC.data.shardOfCard(cardId) || (leaf ? FC.data.shardOfDeck(leaf) : null);
    var ident = { k: it.key, id: cardId, dir: it.dir, sh: sh, dk: leaf, created: now };
    var res = this.sch.apply(prev, grade, now, ident, { ms: ms });
    var day = dayNow(now), dPrev = st.daily(day), dNew = Object.assign({}, dPrev);
    if (res.first) dNew.nw = (dNew.nw || 0) + 1; else if (prev && prev.st === ST.REVIEW) dNew.rv = (dNew.rv || 0) + 1;
    dNew.day = day;
    st.commit(res.card, res.log, dNew);
    this.undoStack.push({ item: it, prev: prev, logId: res.log.id, daily: dPrev, kind: it.kind });
    if (this.undoStack.length > UNDO_DEPTH) this.undoStack.shift();
    this.stats.done++; this.stats.ms += ms; if (grade === 1) this.stats.again++;
    // kartu belajar yang akan jatuh tempo dalam waktu dekat → masuk antrean sesi ini lagi
    if ((res.card.st === ST.LEARN || res.card.st === ST.RELEARN) && res.card.due <= now + LEARN_AHEAD) {
      var q = { key: it.key, cid: it.cid, dir: it.dir, card: it.card, kind: 'l', rec: res.card };
      this.learnQ.push(q); this.learnQ.sort(function (a, b) { return a.rec.due - b.rec.due; });
    }
    this.cur = null;
    return { leech: res.leech, first: res.first, due: res.card.due, card: res.card, grade: grade };
  };

  P.canUndo = function () { return this.undoStack.length > 0; };
  /** Batalkan jawaban terakhir; kartunya jadi kartu sekarang lagi. */
  P.undo = function () {
    var u = this.undoStack.pop(); if (!u) return null;
    FC.store.undo(u.item.key, u.prev, u.logId, u.daily);
    var k = u.item.key;
    this.learnQ = this.learnQ.filter(function (x) { return x.key !== k; });          // buang salinan yang sempat masuk lagi
    if (this.cur) this.mainQ.unshift(this.cur);                                      // kartu yang sedang tampil dikembalikan ke depan antrean
    this.cur = Object.assign({}, u.item, { rec: u.prev });
    this.stats.done = Math.max(0, this.stats.done - 1);
    this.shownAt = Date.now();
    return this.cur;
  };

  /** Tunda kartu sekarang sampai besok. */
  P.bury = function (now) {
    now = now || Date.now();
    var it = this.cur; if (!it) return;
    var day = dayNow(now), b = FC.store.getKv('buried'), keys = b && b.day === day ? b.keys.slice() : [];
    keys.push(it.key); FC.store.setKv('buried', { day: day, keys: keys });
    this.cur = null;
  };

  SESS.Session = Session;

  /* ---------------- ringkasan & statistik cepat ---------------- */
  /** Angka untuk Beranda: berapa yang menunggu hari ini (arah sekarang). newAvail=null bila deck aktif belum dimuat. */
  SESS.today = function (now) {
    now = now || Date.now();
    var st = FC.store, dir = dirOf(), lim = limits(now), sch = SESS.makeScheduler(), rollover = st.get('rollover');
    var r = { dir: dir, learn: 0, review: 0, newAvail: 0, newLeft: lim.newLeft, revLeft: lim.revLeft, doneNew: lim.nw, doneRev: lim.rv, total: 0, learned: 0, locked: 0 };
    st.allCards().forEach(function (c) {
      if (c.dir !== dir) return;
      r.total++;
      if (!leafAccessible(c.dk)) { if ((c.st === ST.REVIEW && U.dayIndex(c.due, rollover) <= lim.day) || ((c.st === ST.LEARN || c.st === ST.RELEARN) && c.due <= now + LEARN_AHEAD)) r.locked++; return; }
      if (c.st === ST.LEARN || c.st === ST.RELEARN) { if (c.due <= now + LEARN_AHEAD) r.learn++; }
      else if (c.st === ST.REVIEW && U.dayIndex(c.due, rollover) <= lim.day) r.review++;
    });
    r.reviewShown = Math.min(r.review, lim.revLeft);
    var active = (st.get('active') || []).filter(function (id) { return FC.data.deck(id) && deckAccessible(id); });
    var allLoaded = active.every(function (id) { return FC.data.isLoaded(id); });
    if (!active.length) r.newAvail = 0;
    else if (!allLoaded) r.newAvail = null;
    else {
      var seen = new Set(), n = 0;
      active.forEach(function (id) { FC.data.resolveSync(id).forEach(function (c) { var cid = FC.data.cid(c); if (seen.has(cid)) return; seen.add(cid); if (!st.getCard(keyOf(cid, dir))) n++; }); });
      r.newAvail = n;
    }
    r.newShown = r.newAvail == null ? null : Math.min(r.newAvail, lim.newLeft);
    r.pending = r.learn + r.reviewShown + (r.newShown || 0);
    return r;
  };

  /** Statistik per deck daun dari catatan SRS: {dk → {learned, due, learn}} (arah sekarang). */
  SESS.leafStats = function (now) {
    now = now || Date.now();
    var st = FC.store, dir = dirOf(), day = dayNow(now), rollover = st.get('rollover'), out = {};
    st.allCards().forEach(function (c) {
      if (c.dir !== dir || !c.dk) return;
      var o = out[c.dk] || (out[c.dk] = { learned: 0, due: 0, mature: 0 });
      o.learned++;
      if (c.st === ST.REVIEW && U.dayIndex(c.due, rollover) <= day) o.due++;
      else if ((c.st === ST.LEARN || c.st === ST.RELEARN) && c.due <= now + LEARN_AHEAD) o.due++;
      if (c.st === ST.REVIEW && (c.ivl || 0) >= 21) o.mature++;
    });
    return out;
  };
  SESS.deckStats = function (deckId, leafStats) {
    var o = { learned: 0, due: 0, mature: 0 };
    FC.data.leavesOf(deckId).forEach(function (l) { var s = leafStats[l]; if (s) { o.learned += s.learned; o.due += s.due; o.mature += s.mature; } });
    return o;
  };

  /** Tambah jatah hari ini ("Belajar lebih"). */
  SESS.extend = function (kind, n, now) {
    now = now || Date.now();
    var day = dayNow(now), d = Object.assign({}, FC.store.daily(day), { day: day });
    if (kind === 'new') d.nb = (d.nb || 0) + n; else d.rb = (d.rb || 0) + n;
    return FC.store.setKv('daily', d);
  };

  /** Kartu untuk latihan bebas (tanpa jadwal): isi deck / kartu susah. */
  SESS.cramCards = function (scope) {
    if (scope.type === 'star') {
      var stars = FC.store.stars();
      return FC.data.loadShards(Array.from(new Set(stars.map(function (m) { return m.sh; }).filter(Boolean)))).catch(function () {}).then(function () {
        return stars.map(function (m) { return FC.data.findCard(m.cid) || m.c; });
      });
    }
    return FC.data.resolve(scope.id).then(function (c) { return c.slice(); });
  };

  /** Atur ulang kemajuan satu deck (semua arah) — kartu jadi baru lagi. */
  SESS.resetDeck = function (deckId) {
    return FC.data.resolve(deckId).then(function (cards) {
      var keys = []; cards.forEach(function (c) { var id = FC.data.cid(c); ['f', 'r'].forEach(function (d) { var k = keyOf(id, d); if (FC.store.getCard(k)) keys.push(k); }); });
      return FC.store.deleteCards(keys).then(function () { return keys.length; });
    });
  };

  FC.session = SESS;
  if (typeof module !== 'undefined' && module.exports) module.exports = SESS;
})(typeof window !== 'undefined' ? window : globalThis);
