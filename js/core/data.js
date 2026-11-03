/* =====================================================================
   js/core/data.js — DATA KARTU & KUIS: manifest, gembok, pemuat shard (lazy), penyelesai deck.
   Manifest + gembok dimuat di awal (kecil). Isi kartu ada di data/decks/<shard>.js dan hanya diunduh
   saat dibutuhkan. Penyelesai deck sama dengan tools/_lib.js (induk/gabungan = gabungan anak,
   duplikat depan|baca dibuang — pertama menang — lalu kartu revisi `patch` menggantikan yang berkunci sama).
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  if (!FC.util && typeof require === 'function') require('./util.js');
  var U = FC.util;

  var shards = {}, quizzes = {}, pending = {}, unlocked = new Set();
  var origin = new WeakMap();                 // kartu → id deck daun asalnya
  var byCid = new Map(), shardOfCid = new Map();

  FC.defineShard = function (id, obj) {
    shards[id] = obj;
    var isPatch = !!(D.patchShards && D.patchShards.has(id));       // shard revisi: kartu "curated" menang atas kartu daun
    Object.keys(obj).forEach(function (deckId) {
      var d = D.byId && D.byId.get(deckId), leaf = !!(d && d.shard);
      obj[deckId].forEach(function (c) {
        var cid = cidOf(c);
        if (isPatch || !byCid.has(cid)) byCid.set(cid, c);
        if (!isPatch || !shardOfCid.has(cid)) shardOfCid.set(cid, id);
        if (leaf && !origin.has(c)) origin.set(c, deckId);
      });
    });
    var p = pending['s:' + id]; if (p) { delete pending['s:' + id]; p.resolve(obj); }
  };
  FC.defineQuiz = function (id, arr) {
    quizzes[id] = arr;
    var p = pending['q:' + id]; if (p) { delete pending['q:' + id]; p.resolve(arr); }
  };

  var D = { shards: shards, patchShards: new Set() };
  D.cardKey = function (c) { return c.front + '|' + c.back; };
  function cidOf(c) {
    if (c._id) return c._id;
    var id = U.cardId(c.front, c.back);
    try { Object.defineProperty(c, '_id', { value: id, enumerable: false }); } catch (e) {}
    return id;
  }
  D.cid = cidOf;

  /* ---------- manifest ---------- */
  D.init = function () {
    var m = D.manifest = FC.manifest, L = D.locks = FC.locks || { deck: {}, quiz: {}, text: {} };
    if (!m) throw new Error('data/manifest.js belum dimuat');
    D.groups = m.groups; D.decks = m.decks; D.quizList = m.quiz;
    D.byId = new Map(m.decks.map(function (d) { return [d.id, d]; }));
    D.quizById = new Map(m.quiz.map(function (q) { return [q.id, q]; }));
    D.kids = {};
    m.decks.forEach(function (d) { if (d.parent) (D.kids[d.parent] = D.kids[d.parent] || []).push(d.id); });
    D.groupById = new Map(m.groups.map(function (g) { return [g.id, g]; }));
    D.patchShards = new Set(m.decks.filter(function (d) { return d.patch; }).map(function (d) { return d.patch; }));
    return D;
  };
  D.deck = function (id) { return D.byId.get(id) || null; };
  D.topDecks = function (groupId) { return D.decks.filter(function (d) { return d.group === groupId && !d.parent; }); };
  D.childDecks = function (id) { return (D.kids[id] || []).map(function (c) { return D.byId.get(c); }); };
  /** id semua deck daun (yang punya `shard`) di bawah deck ini; daun itu sendiri bila daun. */
  D.leavesOf = function (id, seen) {
    seen = seen || new Set(); if (seen.has(id)) return []; seen.add(id);
    var d = D.byId.get(id); if (!d) return [];
    if (d.shard) return [id];
    var out = []; (d.children || []).forEach(function (c) { D.leavesOf(c, seen).forEach(function (x) { if (out.indexOf(x) < 0) out.push(x); }); });
    return out;
  };
  /** shard apa saja yang harus diunduh supaya deck ini bisa diselesaikan */
  D.shardsFor = function (id) {
    var need = [], seen = new Set();
    (function walk(x) {
      if (seen.has(x)) return; seen.add(x);
      var d = D.byId.get(x); if (!d) return;
      if (d.shard && need.indexOf(d.shard) < 0) need.push(d.shard);
      if (d.patch && need.indexOf(d.patch) < 0) need.push(d.patch);
      (d.children || []).forEach(walk);
    })(id);
    return need;
  };
  D.isParentOf = function (parentId, id) { var d = D.byId.get(id); return !!d && d.parent === parentId; };
  D.groupOf = function (id) { var d = D.byId.get(id); return d ? D.groupById.get(d.group) : null; };
  D.titleOf = function (id) {
    var d = D.byId.get(id); if (!d) return id;
    var par = d.parent ? D.byId.get(d.parent) : null;
    return (par ? par.title + ', ' : '') + d.title;
  };

  /* ---------- pemuatan ---------- */
  var BUILD = function () { return FC.BUILD ? '?v=' + encodeURIComponent(FC.BUILD) : ''; };
  function loadScript(kind, id, url) {
    var key = kind + ':' + id;
    if (kind === 's' && shards[id]) return Promise.resolve(shards[id]);
    if (kind === 'q' && quizzes[id]) return Promise.resolve(quizzes[id]);
    if (pending[key]) return pending[key].promise;
    var p = {}; p.promise = new Promise(function (res, rej) { p.resolve = res; p.reject = rej; });
    pending[key] = p;
    var s = document.createElement('script'); s.src = url + BUILD(); s.async = true;
    s.onerror = function () { delete pending[key]; s.remove(); var e = new Error((kind === 'q' ? 'Soal' : 'Kartu') + ' belum bisa dimuat. Periksa koneksi internet lalu coba lagi.'); e.shard = id; p.reject(e); };
    document.head.appendChild(s);
    return p.promise;
  }
  D.loadShard = function (id) { return loadScript('s', id, 'data/decks/' + id + '.js'); };
  D.loadQuiz = function (id) {
    var q = D.quizById.get(id); var file = q && q.shard ? q.shard : id;
    return loadScript('q', file, 'data/quiz/' + file + '.js').then(function () { return quizzes[file]; });
  };
  D.loadShards = function (ids) { return Promise.all(ids.map(D.loadShard)); };
  D.loadAll = function (onProgress) {
    var ids = []; D.decks.forEach(function (d) { if (d.shard && ids.indexOf(d.shard) < 0) ids.push(d.shard); if (d.patch && ids.indexOf(d.patch) < 0) ids.push(d.patch); });
    var done = 0;
    return Promise.all(ids.map(function (id) { return D.loadShard(id).then(function () { if (onProgress) onProgress(++done, ids.length); }); }));
  };
  D.allLoaded = function () { return D.decks.every(function (d) { return (!d.shard || shards[d.shard]) && (!d.patch || shards[d.patch]); }); };
  D.isLoaded = function (id) { return D.shardsFor(id).every(function (s) { return !!shards[s]; }); };

  /* ---------- penyelesai deck ---------- */
  var memo = {};
  function resolveSync(id, stack) {
    if (memo[id]) return memo[id];
    if (stack.indexOf(id) >= 0) throw new Error('siklus deck: ' + stack.concat(id).join(' > '));
    var d = D.byId.get(id); if (!d) throw new Error('deck tidak dikenal: ' + id);
    var out;
    if (d.children) {
      var seen = new Set(); out = [];
      d.children.forEach(function (cid) { resolveSync(cid, stack.concat(id)).forEach(function (c) { var k = D.cardKey(c); if (!seen.has(k)) { seen.add(k); out.push(c); } }); });
      if (d.patch) {
        var ps = shards[d.patch], pm = new Map(((ps && ps[id]) || []).map(function (c) { return [D.cardKey(c), c]; }));
        out = out.map(function (c) { var r = pm.get(D.cardKey(c)); if (r && !origin.has(r)) origin.set(r, origin.get(c)); return r || c; });
      }
    } else if (d.shard) {
      var sh = shards[d.shard]; if (!sh || !sh[id]) throw new Error('shard "' + d.shard + '" belum dimuat untuk deck ' + id);
      out = sh[id];
    } else out = [];
    out.forEach(cidOf);
    memo[id] = out; return out;
  }
  /** Kartu sebuah deck (muat shard yang dibutuhkan lebih dulu). */
  D.resolve = function (id) { return D.loadShards(D.shardsFor(id)).then(function () { return resolveSync(id, []); }); };
  D.resolveSync = function (id) { return resolveSync(id, []); };
  D.originOf = function (card) { return origin.get(card) || null; };
  D.shardOfDeck = function (id) { var d = D.byId.get(id); return d ? d.shard || null : null; };
  /** kartu (objek) dari id-nya, bila shardnya sudah dimuat */
  D.findCard = function (cid) { return byCid.get(cid) || null; };
  D.shardOfCard = function (cid) { return shardOfCid.get(cid) || null; };

  /* ---------- gembok ---------- */
  D.lockOf = function (id) { return (D.locks.deck && D.locks.deck[id]) || null; };
  D.quizLockOf = function (id) { return (D.locks.quiz && D.locks.quiz[id]) || null; };
  /** deck induk ikut terkunci bila ada anak/daun yang terkunci? Tidak — gembok per id, seperti aplikasi lama. */
  D.isUnlocked = function (key) { return unlocked.has(key); };
  D.unlock = function (key) { unlocked.add(key); };
  D.lockText = function (kind, tier) {
    var t = D.locks.text || {};
    if (kind === 'quiz') return tier === 'exclusive' ? (t.quizExclusive || 'sumimasennn, mahal mina') : (t.quizPro || 'すみません,  高いですから🙏🏻');
    return t[tier] || '';
  };
  D.wrongText = function () { return (D.locks.text && D.locks.text.wrong) || 'Yah, passwordnya salah! Coba inget-inget lagi deh.'; };
  D.TIERS = {
    pro: { label: 'PRO', icon: '🔒' },
    exclusive: { label: 'Exclusive', icon: '💎' },
    admin: { label: 'Admin', icon: '💀' }
  };

  /* ---------- pencarian deck ---------- */
  D.searchDecks = function (q) {
    q = U.norm(q).trim(); if (!q) return [];
    var terms = q.split(/\s+/);
    return D.decks.filter(function (d) {
      var g = D.groupById.get(d.group), par = d.parent ? D.byId.get(d.parent) : null;
      var hay = U.norm([d.title, d.sub, d.keywords, d.id.replace(/_/g, ' '), g && g.title, g && g.sub, par && par.title].join(' '));
      return terms.every(function (t) { return hay.indexOf(t) >= 0; });
    });
  };

  FC.data = D;
  if (typeof module !== 'undefined' && module.exports) module.exports = D;
})(typeof window !== 'undefined' ? window : globalThis);
