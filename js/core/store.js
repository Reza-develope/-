/* =====================================================================
   js/core/store.js — PENYIMPANAN & PENCATATAN.
   • IndexedDB (database "akatsuki-fc"): cards (status SRS per kartu+arah), log (riwayat review,
     hanya ditambah), marks (⭐), kv (hitungan harian, dll). Semua dibaca ke memori saat mulai,
     jadi UI tidak pernah menunggu disk; tulis ke disk dilakukan per jawaban dalam satu transaksi.
   • localStorage hanya untuk pengaturan kecil (butuh sinkron saat halaman dimuat: tema, dst).
   • Cadangan JSON (gabung/ganti), ekspor CSV riwayat, migrasi dari versi lama, minta penyimpanan permanen.
   • Kalau IndexedDB tidak tersedia (mis. mode privat tertentu) → jatuh ke mode memori + peringatan.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  if (!FC.util && typeof require === 'function') require('./util.js');
  var U = FC.util;

  var DB_NAME = 'akatsuki-fc', DB_VER = 1, SET_KEY = 'fc.settings.v2', MIG_KEY = 'fc.migrated.v2';

  var DEFAULTS = {
    theme: 'auto',            // auto | light | dark
    furigana: false,
    dir: 'f',                 // f = Jepang → Indonesia · r = Indonesia → Jepang
    newPerDay: 20,
    revPerDay: 200,
    dr: 0.9,
    learnSteps: '1 10',
    relearnSteps: '10',
    override: true,
    fuzz: true,
    leech: 8,
    rollover: 4,
    newOrder: 'urut',         // urut | acak
    mix: 'campur',            // campur | setelah | sebelum
    revOrder: 'retensi',      // retensi (peluang ingat terendah dulu) | tempo (paling lama jatuh tempo dulu)
    tts: false,               // ucapkan kartu otomatis
    ttsRate: 0.9,
    haptics: true,
    showExample: true,
    active: [],               // id deck yang kartu barunya ikut sesi harian
    lastDeck: '',
    intro: false
  };

  var S = {
    DEFAULTS: DEFAULTS, mode: 'idb', persisted: false, error: null,
    settings: Object.assign({}, DEFAULTS),
    _db: null, _cards: new Map(), _marks: new Map(), _kv: {}, _logCache: null, _lastLogId: 0, _pending: [], _listeners: [], _errListeners: []
  };

  /* ---------- pengaturan (localStorage, sinkron) ---------- */
  function loadSettings() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(SET_KEY)) || {}; } catch (e) {}
    S.settings = Object.assign({}, DEFAULTS, s);
    if (!Array.isArray(S.settings.active)) S.settings.active = [];
  }
  function saveSettings() { try { localStorage.setItem(SET_KEY, JSON.stringify(S.settings)); } catch (e) {} }
  S.get = function (k) { return S.settings[k]; };
  S.set = function (k, v) { var o = {}; o[k] = v; S.patch(o); };
  S.patch = function (obj) {
    var changed = [];
    Object.keys(obj).forEach(function (k) { if (JSON.stringify(S.settings[k]) !== JSON.stringify(obj[k])) { S.settings[k] = obj[k]; changed.push(k); } });
    if (!changed.length) return;
    saveSettings();
    S._listeners.slice().forEach(function (fn) { try { fn(changed); } catch (e) { console.error(e); } });
  };
  S.onChange = function (fn) { S._listeners.push(fn); return function () { S._listeners = S._listeners.filter(function (f) { return f !== fn; }); }; };
  S.onError = function (fn) { S._errListeners.push(fn); };
  function fail(e, what) { console.warn('[store] ' + what, e); S.error = what; S._errListeners.forEach(function (fn) { try { fn(what, e); } catch (_) {} }); }

  /* ---------- IndexedDB ---------- */
  var rq = function (r) { return new Promise(function (res, rej) { r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; }); };
  var txDone = function (tx) { return new Promise(function (res, rej) { tx.oncomplete = function () { res(); }; tx.onerror = function () { rej(tx.error); }; tx.onabort = function () { rej(tx.error || new Error('transaksi dibatalkan')); }; }); };

  function openDb() {
    return new Promise(function (resolve, reject) {
      var idb = root.indexedDB;
      if (!idb) return reject(new Error('IndexedDB tidak tersedia'));
      var req;
      try { req = idb.open(DB_NAME, DB_VER); } catch (e) { return reject(e); }
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('cards')) db.createObjectStore('cards', { keyPath: 'k' });
        if (!db.objectStoreNames.contains('log')) db.createObjectStore('log', { keyPath: 'id' }).createIndex('k', 'k', { unique: false });
        if (!db.objectStoreNames.contains('marks')) db.createObjectStore('marks', { keyPath: 'cid' });
        if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv', { keyPath: 'key' });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
      req.onblocked = function () { reject(new Error('database terblokir oleh tab lain')); };
    });
  }

  function track(p) {
    S._pending.push(p);
    var done = function () { S._pending = S._pending.filter(function (x) { return x !== p; }); };
    p.then(done, function (e) { done(); fail(e, 'Gagal menyimpan ke browser'); });
    return p;
  }
  S.flush = function () { return Promise.all(S._pending.slice().map(function (p) { return p.catch(function () {}); })); };

  S.ready = (function () {
    loadSettings();
    return openDb().then(function (db) {
      S._db = db;
      db.onversionchange = function () { db.close(); };
      var tx = db.transaction(['cards', 'marks', 'kv'], 'readonly');
      return Promise.all([rq(tx.objectStore('cards').getAll()), rq(tx.objectStore('marks').getAll()), rq(tx.objectStore('kv').getAll())]);
    }).then(function (r) {
      r[0].forEach(function (c) { S._cards.set(c.k, c); });
      r[1].forEach(function (m) { S._marks.set(m.cid, m); });
      r[2].forEach(function (x) { S._kv[x.key] = x.val; });
      return S;
    }).catch(function (e) {
      S.mode = 'memory'; S._db = null; fail(e, 'Penyimpanan browser tidak tersedia — progres hanya disimpan sementara. Unduh cadangan secara berkala.');
      return S;
    }).then(function () {
      try {
        if (navigator.storage && navigator.storage.persisted) navigator.storage.persisted().then(function (p) { S.persisted = !!p; });
      } catch (e) {}
      return S;
    });
  })();

  S.requestPersist = function () {
    try { if (navigator.storage && navigator.storage.persist) return navigator.storage.persist().then(function (p) { S.persisted = !!p; return S.persisted; }); } catch (e) {}
    return Promise.resolve(false);
  };
  S.estimate = function () {
    try { if (navigator.storage && navigator.storage.estimate) return navigator.storage.estimate(); } catch (e) {}
    return Promise.resolve(null);
  };

  /* ---------- kartu & hitungan harian ---------- */
  S.getCard = function (k) { return S._cards.get(k) || null; };
  S.allCards = function () { return S._cards; };
  S.daily = function (day) {
    var d = S._kv.daily;
    if (!d || d.day !== day) return { day: day, nw: 0, rv: 0, nb: 0, rb: 0 };
    return { day: d.day, nw: d.nw || 0, rv: d.rv || 0, nb: d.nb || 0, rb: d.rb || 0 };
  };
  function kvPut(store, key, val) { S._kv[key] = val; if (store) store.put({ key: key, val: val }); }

  /** Simpan hasil satu jawaban secara atomik: kartu + riwayat + hitungan harian. */
  S.commit = function (rec, log, daily) {
    log.id = Math.max(log.id, S._lastLogId + 1); S._lastLogId = log.id;
    S._cards.set(rec.k, rec);
    S._kv.daily = daily;
    if (S._logCache) S._logCache.push(log);
    if (!S._db) { S._memLog = S._memLog || []; S._memLog.push(log); return Promise.resolve(); }
    var tx = S._db.transaction(['cards', 'log', 'kv'], 'readwrite');
    tx.objectStore('cards').put(rec); tx.objectStore('log').put(log); tx.objectStore('kv').put({ key: 'daily', val: daily });
    return track(txDone(tx));
  };
  /** Batalkan jawaban terakhir: pulihkan kartu (atau hapus bila tadinya baru), buang barisnya dari riwayat. */
  S.undo = function (k, prev, logId, daily) {
    if (prev) S._cards.set(k, prev); else S._cards.delete(k);
    S._kv.daily = daily;
    if (S._logCache) S._logCache = S._logCache.filter(function (l) { return l.id !== logId; });
    if (!S._db) { S._memLog = (S._memLog || []).filter(function (l) { return l.id !== logId; }); return Promise.resolve(); }
    var tx = S._db.transaction(['cards', 'log', 'kv'], 'readwrite');
    if (prev) tx.objectStore('cards').put(prev); else tx.objectStore('cards').delete(k);
    tx.objectStore('log').delete(logId); tx.objectStore('kv').put({ key: 'daily', val: daily });
    return track(txDone(tx));
  };
  /** Ubah catatan kartu tanpa riwayat (mis. tandai sibling, reset kartu). */
  S.putCard = function (rec) {
    S._cards.set(rec.k, rec);
    if (!S._db) return Promise.resolve();
    var tx = S._db.transaction('cards', 'readwrite'); tx.objectStore('cards').put(rec);
    return track(txDone(tx));
  };
  S.deleteCards = function (keys) {
    keys.forEach(function (k) { S._cards.delete(k); });
    if (!S._db) return Promise.resolve();
    var tx = S._db.transaction('cards', 'readwrite'); keys.forEach(function (k) { tx.objectStore('cards').delete(k); });
    return track(txDone(tx));
  };
  S.getKv = function (key) { return S._kv[key]; };
  S.setKv = function (key, val) {
    S._kv[key] = val;
    if (!S._db) return Promise.resolve();
    var tx = S._db.transaction('kv', 'readwrite'); tx.objectStore('kv').put({ key: key, val: val });
    return track(txDone(tx));
  };

  /* ---------- riwayat ---------- */
  S.allLog = function () {
    if (S._logCache) return Promise.resolve(S._logCache);
    if (!S._db) { S._logCache = (S._memLog || []).slice(); return Promise.resolve(S._logCache); }
    var tx = S._db.transaction('log', 'readonly');
    return rq(tx.objectStore('log').getAll()).then(function (rows) {
      rows.sort(function (a, b) { return a.id - b.id; });
      if (rows.length) S._lastLogId = Math.max(S._lastLogId, rows[rows.length - 1].id);
      S._logCache = rows; return rows;
    });
  };
  S.cardLog = function (k) { return S.allLog().then(function (rows) { return rows.filter(function (l) { return l.k === k; }); }); };

  /* ---------- ⭐ kartu susah ---------- */
  S.isStarred = function (cid) { return S._marks.has(cid); };
  S.stars = function () { return Array.from(S._marks.values()); };
  S.starCount = function () { return S._marks.size; };
  S.setStar = function (cid, card, sh, on) {
    if (on === undefined) on = !S._marks.has(cid);
    var tx = S._db ? S._db.transaction('marks', 'readwrite') : null;
    if (on) {
      var m = { cid: cid, c: { front: card.front, back: card.back, backSub: card.backSub, level: card.level, type: card.type, example: card.example, exampleMeaning: card.exampleMeaning }, sh: sh || null, ts: Date.now() };
      Object.keys(m.c).forEach(function (k) { if (m.c[k] === undefined) delete m.c[k]; });
      S._marks.set(cid, m); if (tx) tx.objectStore('marks').put(m);
    } else { S._marks.delete(cid); if (tx) tx.objectStore('marks').delete(cid); }
    if (tx) track(txDone(tx));
    return on;
  };

  /* ---------- cadangan ---------- */
  function bunpouKeys() {
    var out = {};
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf('bunpou:') === 0) out[k] = localStorage.getItem(k); } } catch (e) {}
    return out;
  }
  S.exportJSON = function () {
    return S.allLog().then(function (log) {
      return {
        format: 'akatsuki-fc-backup', version: 2, exportedAt: Date.now(),
        settings: S.settings,
        cards: Array.from(S._cards.values()), log: log, marks: Array.from(S._marks.values()),
        kv: S._kv, bunpou: bunpouKeys()
      };
    });
  };
  S.exportCSV = function () {
    return S.allLog().then(function (log) {
      var G = ['', 'Lagi', 'Sulit', 'Bagus', 'Mudah'], T = ['Baru', 'Belajar', 'Review', 'Belajar-ulang'];
      var rows = ['waktu,kartu,arah,nilai,status_sebelum,jarak_hari,interval_hari,stabilitas,stabilitas_cepat,kesulitan,peluang_ingat,durasi_ms'];
      log.forEach(function (l) {
        var p = String(l.k).split(':');
        rows.push([new Date(l.id).toISOString(), p[0], p[1] === 'r' ? 'ID→JP' : 'JP→ID', G[l.g], T[l.st], l.el, l.iv, l.s, l.sf, l.d, l.r == null ? '' : l.r, l.ms || 0].join(','));
      });
      return rows.join('\n');
    });
  };

  /** Impor cadangan (format v2 atau cadangan SRS lama). mode: 'merge' | 'replace'. */
  S.importJSON = function (obj, mode) {
    if (!obj || typeof obj !== 'object') return Promise.reject(new Error('Berkas bukan cadangan yang valid'));
    var rep = { cards: 0, log: 0, marks: 0, legacy: false };
    if (obj.format !== 'akatsuki-fc-backup') {
      if (obj.decks && obj.log) { S.setKv('legacySrs', obj); rep.legacy = true; mergeLegacyDays(obj); return Promise.resolve(rep); }
      return Promise.reject(new Error('Format cadangan tidak dikenali'));
    }
    var replace = mode === 'replace';
    var work = replace ? S.reset(true) : Promise.resolve();
    return work.then(function () { return S.allLog(); }).then(function (curLog) {
      var seen = new Set(curLog.map(function (l) { return l.id; }));
      var cards = [], log = [], marks = [];
      (obj.cards || []).forEach(function (c) {
        if (!c || !c.k) return;
        var cur = S._cards.get(c.k);
        if (!cur || (c.lr || 0) > (cur.lr || 0)) { cards.push(c); S._cards.set(c.k, c); }
      });
      (obj.log || []).forEach(function (l) { if (l && l.id && !seen.has(l.id)) { log.push(l); seen.add(l.id); } });
      (obj.marks || []).forEach(function (m) { if (m && m.cid && !S._marks.has(m.cid)) { marks.push(m); S._marks.set(m.cid, m); } });
      if (S._logCache) { S._logCache = S._logCache.concat(log).sort(function (a, b) { return a.id - b.id; }); }
      S._lastLogId = Math.max(S._lastLogId, log.reduce(function (m, l) { return Math.max(m, l.id); }, 0));
      var kv = obj.kv || {};
      if (replace || !S._kv.daily) { if (kv.daily) S._kv.daily = kv.daily; }
      ['legacyDays', 'legacySrs'].forEach(function (k) { if (kv[k] && (replace || !S._kv[k])) S._kv[k] = kv[k]; });
      if (replace && obj.settings) { S.settings = Object.assign({}, DEFAULTS, obj.settings); saveSettings(); }
      if (obj.bunpou) Object.keys(obj.bunpou).forEach(function (k) { try { if (replace || localStorage.getItem(k) == null) localStorage.setItem(k, obj.bunpou[k]); } catch (e) {} });
      rep.cards = cards.length; rep.log = log.length; rep.marks = marks.length;
      if (!S._db) return rep;
      var tx = S._db.transaction(['cards', 'log', 'marks', 'kv'], 'readwrite');
      cards.forEach(function (c) { tx.objectStore('cards').put(c); });
      log.forEach(function (l) { tx.objectStore('log').put(l); });
      marks.forEach(function (m) { tx.objectStore('marks').put(m); });
      Object.keys(S._kv).forEach(function (k) { tx.objectStore('kv').put({ key: k, val: S._kv[k] }); });
      return txDone(tx).then(function () { return rep; });
    });
  };

  /** Hapus semua progres. keepSettings=true untuk dipakai internal saat "ganti" cadangan. */
  S.reset = function (internal) {
    S._cards = new Map(); S._marks = new Map(); S._kv = {}; S._logCache = []; S._lastLogId = 0; S._memLog = [];
    if (!internal) { S.settings = Object.assign({}, DEFAULTS); saveSettings(); try { localStorage.setItem(MIG_KEY, '1'); } catch (e) {} }
    if (!S._db) return Promise.resolve();
    var tx = S._db.transaction(['cards', 'log', 'marks', 'kv'], 'readwrite');
    ['cards', 'log', 'marks', 'kv'].forEach(function (n) { tx.objectStore(n).clear(); });
    return txDone(tx);
  };

  /* ---------- migrasi dari versi lama (sekali jalan) ---------- */
  function mergeLegacyDays(srs) {
    var days = Object.assign({}, S._kv.legacyDays || {});
    (srs.log || []).forEach(function (l) {
      if (!l || !l.at) return;
      var d = new Date(l.at), key = d.getFullYear() + '-' + U.pad2(d.getMonth() + 1) + '-' + U.pad2(d.getDate());
      days[key] = (days[key] || 0) + Math.max(1, +l.n || 1);
    });
    S.setKv('legacyDays', days);
  }
  S.migrateLegacy = function () {
    var rep = { stars: 0, srsLog: 0, settings: [] };
    try { if (localStorage.getItem(MIG_KEY)) return Promise.resolve(rep); } catch (e) { return Promise.resolve(rep); }
    var jobs = [];
    try {
      var stars = JSON.parse(localStorage.getItem('fcStarredCards') || 'null');
      if (stars && typeof stars === 'object') Object.keys(stars).forEach(function (key) {
        var c = stars[key]; if (!c || c.front == null || c.back == null) return;
        var cid = U.cardId(c.front, c.back);
        if (!S._marks.has(cid)) { S.setStar(cid, c, null, true); rep.stars++; }
      });
    } catch (e) {}
    try {
      var o = {}, fm = localStorage.getItem('furiganaMode'), rv = localStorage.getItem('fc_reverse_mode');
      if (fm === '1') { o.furigana = true; rep.settings.push('furigana'); }
      if (rv === '1') { o.dir = 'r'; rep.settings.push('arah'); }
      if (Object.keys(o).length) S.patch(o);
    } catch (e) {}
    try {
      var srs = JSON.parse(localStorage.getItem('fcSrsV1') || 'null');
      if (srs && srs.decks && srs.log) { jobs.push(S.setKv('legacySrs', srs)); mergeLegacyDays(srs); rep.srsLog = srs.log.length; }
    } catch (e) {}
    try { localStorage.setItem(MIG_KEY, '1'); } catch (e) {}
    return Promise.all(jobs).then(function () { return rep; });
  };

  FC.store = S;
  if (typeof module !== 'undefined' && module.exports) module.exports = S;
})(typeof window !== 'undefined' ? window : globalThis);
