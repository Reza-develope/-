/* =====================================================================
   js/core/store.js — PENYIMPANAN & PENCATATAN.
   • IndexedDB (database "akatsuki-fc"): cards (status SRS per kartu+arah), log (riwayat review,
     hanya ditambah), marks (⭐), kv (hitungan harian, deck buatan pengguna `ud:*`, dll). Semua dibaca ke memori saat mulai,
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
  var UD_PREFIX = 'ud:';    // kunci kv deck buatan pengguna (satu kunci per deck) — ikut cadangan karena kv diekspor utuh

  var SETTINGS_VER = 28;     // naik tiap kali nilai bawaan berubah dan pengguna lama perlu dimigrasi sekali saja
  var DEFAULTS = {
    sv: SETTINGS_VER,
    theme: 'auto',            // auto | light | dark
    furigana: false,
    dir: 'f',                 // f = Jepang → Indonesia · r = Indonesia → Jepang
    newPerDay: 20,
    revPerDay: 200,
    dr: 0.9,
    learnSteps: '1 10',
    relearnSteps: '10',
    override: false,          // lompatan awal FSRS: mati bawaan (kartu baru tetap lewat langkah belajar dulu)
    fuzz: true,
    leech: 0,                 // 0 = mati. Kartu bandel tidak otomatis diberi bintang kecuali diaktifkan di Pengaturan
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

  /* ---------- lapisan pengaman: kesehatan tulis, jurnal, kanari, hari belajar ---------- */
  var JKEY = 'fc.journal.v1', CKEY = 'fc.canary.v1', SDB = 'akatsuki-fc-safety';
  S.health = { ok: true, dirty: false, fails: 0, lastOk: 0, lastErr: '', vanished: null, fresh: false };
  S._hl = [];
  S.onHealth = function (fn) { S._hl.push(fn); };
  function emitHealth() { S._hl.slice().forEach(function (fn) { try { fn(S.health); } catch (e) {} }); }
  /** Catatan kejadian penyimpanan di localStorage (terpisah dari IndexedDB) supaya penyebab kehilangan data bisa dilacak. */
  S.journal = function (ev, info) {
    try {
      var j = JSON.parse(localStorage.getItem(JKEY) || '[]'); if (!Array.isArray(j)) j = [];
      j.push({ t: Date.now(), e: ev, i: info == null ? '' : String(info).slice(0, 140) });
      localStorage.setItem(JKEY, JSON.stringify(j.slice(-40)));
    } catch (e) {}
  };
  S.getJournal = function () { try { var j = JSON.parse(localStorage.getItem(JKEY) || '[]'); return Array.isArray(j) ? j : []; } catch (e) { return []; } };
  function tally() { return { c: S._cards.size, l: (S._logCache || S._memLog || []).length, d: Object.keys(S._kv.days || {}).length, m: S._marks.size, u: S.kvKeys(UD_PREFIX).length }; }

  /** Kanari: hitungan data terakhir yang diketahui, disimpan di localStorage. Bila IndexedDB tiba-tiba kosong padahal kanari berisi → data hilang. */
  var stT = 0, rtT = 0, back = 0;
  function stamp() {
    if (stT || S.mode !== 'idb') return;
    stT = setTimeout(function () {
      stT = 0; var n = tally(); if (!n.c && !n.l && !n.d) return;                      // keadaan kosong tidak boleh menimpa kanari
      try { localStorage.setItem(CKEY, JSON.stringify({ c: n.c, l: n.l, d: n.d, m: n.m, t: Date.now(), b: S._kv.lastBackup || 0, u: String(root.location ? root.location.origin + root.location.pathname : '') })); } catch (e) {}
    }, 2500);
  }
  function canaryCheck() {
    var c = null; try { c = JSON.parse(localStorage.getItem(CKEY)); } catch (e) {}
    var n = tally(), empty = !n.c && !n.l && !n.d && !n.m && !n.u;
    if (c && empty && (c.c || c.l || c.d)) { S.health.vanished = c; S.journal('data-hilang', 'kanari ' + c.c + ' kartu/' + c.l + ' riwayat/' + c.d + ' hari, kini kosong'); }
    else if (empty && !c) S.health.fresh = true;
    else stamp();
  }

  /** Hari belajar (kv "days": {"YYYY-MM-DD": jumlah jawaban}) — catatan kecil terpisah dari riwayat supaya hari beruntun tidak bergantung pada satu tabel. */
  function bump(ms, by) {
    var d = Object.assign({}, S._kv.days || {}), k = U.dayKey(U.dayIndex(ms, S.settings.rollover));
    d[k] = Math.max(0, (d[k] || 0) + by); if (!d[k]) delete d[k];
    return (S._kv.days = d);
  }

  /** Transaksi yang tidak pernah melempar galat ke UI: bila koneksi mati, kembalikan transaksi palsu yang gagal → ditandai kotor → disinkron ulang. */
  function deadTx(err) {
    var req = { error: err, set onsuccess(f) {}, set onerror(f) { setTimeout(f, 0); } };
    var os = { put: function () {}, delete: function () {}, clear: function () {}, get: function () { return req; }, getAll: function () { return req; } };
    var tx = { error: err, objectStore: function () { return os; } };
    setTimeout(function () { if (tx.onabort) tx.onabort(); }, 0);
    return tx;
  }
  function guard(db) {
    return { raw: db, transaction: function (names, mode) {
      try { return mode === 'readwrite' ? db.transaction(names, mode, { durability: 'strict' }) : db.transaction(names, mode); }   // strict: tunggu benar-benar tertulis ke disk
      catch (e) { S.journal('tx-gagal', e && e.name); setTimeout(S._reopen, 0); return deadTx(e); }
    } };
  }
  function hook(db) {
    db.onversionchange = function () { db.close(); S.journal('versionchange'); };
    db.onclose = function () { S.journal('db-tertutup'); };
  }
  S._reopen = function () {
    if (S.mode !== 'idb' || !S._db || S._reopening) return S._reopening;
    try { S._db.raw.transaction('kv', 'readonly'); return null; } catch (e) {}          // sambungan masih hidup
    S._reopening = openDb().then(function (db) { S._db = guard(db); hook(db); S._reopening = null; S.journal('buka-ulang-ok'); }, function (e) { S._reopening = null; S.journal('buka-ulang-gagal', e && (e.name || e.message)); });
    return S._reopening;
  };
  function schedule() { if (rtT) return; back = Math.min(60000, (back || 1500) * 2); rtT = setTimeout(function () { rtT = 0; S.resync(); }, back); }
  function wrFail(e) {
    var hh = S.health, first = !hh.dirty; hh.dirty = true; hh.ok = false; hh.fails++; hh.lastErr = (e && (e.name || e.message)) || 'galat';
    S.journal('tulis-gagal', hh.lastErr);
    if (first) fail(e, 'Gagal menyimpan ke browser. Aplikasi mencoba lagi otomatis; unduh cadangan bila terus berulang.');
    emitHealth(); S._reopen(); schedule();
  }
  /** Tulis ulang seluruh keadaan di memori ke disk dalam satu transaksi (kartu: yang lebih baru menang, supaya tab lain tidak tertimpa). */
  S.resync = function () {
    if (S.mode !== 'idb') return Promise.resolve(false);
    return Promise.resolve(S._reopen()).then(function () { return S.allLog(); }).then(function (log) {
      return rq(S._db.transaction('cards', 'readonly').objectStore('cards').getAll()).then(function (disk) {
        var dm = new Map(disk.map(function (c) { return [c.k, c]; })), tx = S._db.transaction(['cards', 'log', 'marks', 'kv'], 'readwrite');
        S._cards.forEach(function (c) { var d = dm.get(c.k); if (!d || (c.lr || 0) >= (d.lr || 0)) tx.objectStore('cards').put(c); });
        log.forEach(function (l) { tx.objectStore('log').put(l); });
        S._marks.forEach(function (m) { tx.objectStore('marks').put(m); });
        Object.keys(S._kv).forEach(function (k) { tx.objectStore('kv').put({ key: k, val: S._kv[k] }); });
        return txDone(tx);
      });
    }).then(function () {
      var was = !S.health.ok; S.health.dirty = false; S.health.ok = true; S.health.lastOk = Date.now(); back = 0;
      S.journal('sinkron-ulang-ok'); if (was) emitHealth(); stamp(); return true;
    }, function (e) { S.journal('sinkron-ulang-gagal', e && (e.name || e.message)); schedule(); return false; });
  };
  function openRetry(n) {
    if (!root.indexedDB) return openDb();
    return openDb().catch(function (e) {
      if (n <= 1) throw e;
      S.journal('buka-gagal', e && (e.name || e.message));
      return new Promise(function (r) { setTimeout(r, 600); }).then(function () { return openRetry(n - 1); });
    });
  }

  /* ---------- pengaturan (localStorage, sinkron) ---------- */
  /** Migrasi nilai bawaan lama yang berisiko (lompatan awal aktif, auto-bintang kartu bandel). Hanya sekali per pengguna
      lama (ditandai `sv`). Mengembalikan true bila ada nilai yang benar-benar berubah, supaya app bisa memberi tahu. */
  function migrateSettings(s) {
    if (+s.sv >= SETTINGS_VER) return false;
    var changed = false;
    if (s.override === undefined || s.override === true) { s.override = false; changed = true; }
    if (s.leech === undefined || +s.leech > 0) { s.leech = 0; changed = true; }
    s.sv = SETTINGS_VER;
    return changed;
  }
  S._migrateSettings = migrateSettings;
  function loadSettings() {
    var s = {}, had = false;
    try { var raw = localStorage.getItem(SET_KEY); if (raw) { s = JSON.parse(raw) || {}; had = true; } } catch (e) {}
    var needSave = had && !(+s.sv >= SETTINGS_VER);
    var changed = had ? migrateSettings(s) : false;      // pemasangan baru: tidak ada yang perlu dimigrasi, DEFAULTS sudah yang baru
    S.settings = Object.assign({}, DEFAULTS, s);
    if (!Array.isArray(S.settings.active)) S.settings.active = [];
    if (needSave) saveSettings();
    S.settingsMigrated = changed;
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
    p.then(function () { done(); S.health.lastOk = Date.now(); stamp(); }, function (e) { done(); wrFail(e); });
    return p;
  }
  S.flush = function () { return Promise.all(S._pending.slice().map(function (p) { return p.catch(function () {}); })); };

  S.ready = (function () {
    loadSettings();
    return openRetry(3).then(function (db) {
      S._db = guard(db); hook(db);
      var tx = db.transaction(['cards', 'marks', 'kv'], 'readonly');
      return Promise.all([rq(tx.objectStore('cards').getAll()), rq(tx.objectStore('marks').getAll()), rq(tx.objectStore('kv').getAll())]);
    }).then(function (r) {
      r[0].forEach(function (c) { S._cards.set(c.k, c); });
      r[1].forEach(function (m) { S._marks.set(m.cid, m); });
      r[2].forEach(function (x) { S._kv[x.key] = x.val; });
      return S.allLog().then(function () { canaryCheck(); return S; });
    }).catch(function (e) {
      S.mode = 'memory'; S._db = null; S.health.ok = false; S.journal('mode-memori', e && (e.name || e.message)); fail(e, 'Penyimpanan browser tidak tersedia — progres hanya disimpan sementara. Buat cadangan secara berkala.');
      return S;
    }).then(function () {
      try {
        if (navigator.storage && navigator.storage.persisted) navigator.storage.persisted().then(function (p) { S.persisted = !!p; });
      } catch (e) {}
      if (S.mode === 'idb') bootSnap();
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
    S._kv.daily = daily; var days = bump(log.id, 1);
    if (S._logCache) S._logCache.push(log);
    if (!S._db) { S._memLog = S._memLog || []; S._memLog.push(log); return Promise.resolve(); }
    var tx = S._db.transaction(['cards', 'log', 'kv'], 'readwrite');
    tx.objectStore('cards').put(rec); tx.objectStore('log').put(log); tx.objectStore('kv').put({ key: 'daily', val: daily }); tx.objectStore('kv').put({ key: 'days', val: days });
    return track(txDone(tx));
  };
  /** Batalkan jawaban terakhir: pulihkan kartu (atau hapus bila tadinya baru), buang barisnya dari riwayat. */
  S.undo = function (k, prev, logId, daily) {
    if (prev) S._cards.set(k, prev); else S._cards.delete(k);
    S._kv.daily = daily; var days = bump(logId, -1);
    if (S._logCache) S._logCache = S._logCache.filter(function (l) { return l.id !== logId; });
    if (!S._db) { S._memLog = (S._memLog || []).filter(function (l) { return l.id !== logId; }); return Promise.resolve(); }
    var tx = S._db.transaction(['cards', 'log', 'kv'], 'readwrite');
    if (prev) tx.objectStore('cards').put(prev); else tx.objectStore('cards').delete(k);
    tx.objectStore('log').delete(logId); tx.objectStore('kv').put({ key: 'daily', val: daily }); tx.objectStore('kv').put({ key: 'days', val: days });
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
  S.delKv = function (key) {
    delete S._kv[key];
    if (!S._db) return Promise.resolve();
    var tx = S._db.transaction('kv', 'readwrite'); tx.objectStore('kv').delete(key);
    return track(txDone(tx));
  };
  /** semua kunci kv berawalan tertentu (dipakai deck buatan pengguna: "ud:<id>") */
  S.kvKeys = function (prefix) { return Object.keys(S._kv).filter(function (k) { return k.indexOf(prefix) === 0; }); };

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
  /** Gabungkan satu kunci "bunpou:*" dari cadangan ke yang ada di perangkat. Tanda "paham" Buku Bunpou ({idPola: waktu}) disatukan;
      halaman Latihan ({items: {id: {c, n, t}}}) mengambil percobaan yang lebih baru per soal. Selain itu: yang di perangkat menang. */
  function mergeBunpou(key, curRaw, newRaw) {
    var cur, nw;
    try { cur = JSON.parse(curRaw); nw = JSON.parse(newRaw); } catch (e) { return curRaw == null ? newRaw : curRaw; }
    var isObj = function (x) { return x && typeof x === 'object' && !Array.isArray(x); };
    if (!isObj(cur)) return newRaw;
    if (!isObj(nw)) return curRaw;
    var out;
    if (key === 'bunpou:buku') {
      out = Object.assign({}, cur);
      Object.keys(nw).forEach(function (id) { var t = +nw[id] || 0; if (t && (!out[id] || t > (+out[id] || 0))) out[id] = nw[id]; });
      return JSON.stringify(out);
    }
    if (isObj(nw.items)) {
      var items = Object.assign({}, isObj(cur.items) ? cur.items : {});
      Object.keys(nw.items).forEach(function (id) {
        var a = items[id], b = nw.items[id];
        if (isObj(b) && (!isObj(a) || (+b.t || 0) > (+a.t || 0))) items[id] = b;
      });
      out = Object.assign({}, cur); out.items = items;
      return JSON.stringify(out);
    }
    return curRaw;
  }
  S._mergeBunpou = mergeBunpou;
  function clearBunpou() {
    try { Object.keys(bunpouKeys()).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
    try { if (root.FC && root.FC.buku && root.FC.buku.reloadDone) root.FC.buku.reloadDone(); } catch (e) {}
  }
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
    var rep = { cards: 0, log: 0, marks: 0, decks: 0, legacy: false };
    if (obj.format !== 'akatsuki-fc-backup') {
      if (obj.decks && obj.log) { S.setKv('legacySrs', obj); rep.legacy = true; mergeLegacyDays(obj); return Promise.resolve(rep); }
      return Promise.reject(new Error('Format cadangan tidak dikenali'));
    }
    if (!Array.isArray(obj.cards || []) || !Array.isArray(obj.log || []) || !Array.isArray(obj.marks || [])) return Promise.reject(new Error('Isi cadangan rusak, tidak ada yang diubah'));
    var replace = mode === 'replace';
    var work = replace ? S.reset(true, UD_PREFIX) : Promise.resolve();      // deck buatan pengguna bukan progres: tidak ikut terhapus
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
      if (kv.days && typeof kv.days === 'object') { var dd = Object.assign({}, S._kv.days || {}); Object.keys(kv.days).forEach(function (k) { if (/^\d{4}-\d{2}-\d{2}$/.test(k)) dd[k] = Math.max(dd[k] || 0, +kv.days[k] || 0); }); S._kv.days = dd; }      // hari belajar: gabung, ambil yang terbanyak
      // deck buatan pengguna ("ud:<id>"): gabung → yang `updated`-nya lebih baru menang; ganti → deck di cadangan menggantikan deck
      // yang sama di perangkat ini, sedangkan deck yang HANYA ada di perangkat tetap dipertahankan (cadangan lama tidak boleh menghapus deck baru).
      // Isinya tidak dipercaya begitu saja: userdecks.js membersihkannya lagi saat deck dimuat (FC.userDecks.load).
      Object.keys(kv).forEach(function (k) {
        var v = kv[k];
        if (k.indexOf(UD_PREFIX) !== 0 || !v || typeof v !== 'object' || !Array.isArray(v.cards)) return;
        var cur = S._kv[k];
        if (replace || !cur || (+v.updated || 0) > (+cur.updated || 0)) { S._kv[k] = v; rep.decks++; }
      });
      // skor terbaik kuis: ambil yang tertinggi per kuis (seri → yang lebih baru). Ikut diekspor sejak dulu, tapi sebelumnya tak pernah dipulihkan.
      if (kv.quizBest && typeof kv.quizBest === 'object' && !Array.isArray(kv.quizBest)) {
        var qb = Object.assign({}, S._kv.quizBest || {});
        Object.keys(kv.quizBest).forEach(function (id) {
          var n = kv.quizBest[id], c = qb[id];
          if (!n || typeof n !== 'object') return;
          if (!c || (+n.score || 0) > (+c.score || 0) || ((+n.score || 0) === (+c.score || 0) && (+n.at || 0) > (+c.at || 0))) qb[id] = n;
        });
        S._kv.quizBest = qb;
      }
      if (+kv.lastBackup > (+S._kv.lastBackup || 0)) S._kv.lastBackup = +kv.lastBackup;
      if (replace && obj.settings) { var rs = Object.assign({}, obj.settings); migrateSettings(rs); S.settings = Object.assign({}, DEFAULTS, rs); saveSettings(); }
      if (obj.bunpou && typeof obj.bunpou === 'object') {
        if (replace) clearBunpou();                                           // "ganti" = hasilnya sama persis dengan cadangan
        Object.keys(obj.bunpou).forEach(function (k) {
          if (k.indexOf('bunpou:') !== 0 || typeof obj.bunpou[k] !== 'string') return;
          try { var cur = localStorage.getItem(k); localStorage.setItem(k, cur == null ? obj.bunpou[k] : mergeBunpou(k, cur, obj.bunpou[k])); } catch (e) {}
        });
        try { if (root.FC && root.FC.buku && root.FC.buku.reloadDone) root.FC.buku.reloadDone(); } catch (e) {}
      }
      rep.cards = cards.length; rep.log = log.length; rep.marks = marks.length;
      if (!S._db) return rep;
      var tx = S._db.transaction(['cards', 'log', 'marks', 'kv'], 'readwrite');
      cards.forEach(function (c) { tx.objectStore('cards').put(c); });
      log.forEach(function (l) { tx.objectStore('log').put(l); });
      marks.forEach(function (m) { tx.objectStore('marks').put(m); });
      Object.keys(S._kv).forEach(function (k) { tx.objectStore('kv').put({ key: k, val: S._kv[k] }); });
      return txDone(tx).then(function () { stamp(); return rep; });
    });
  };

  /** Hapus semua progres. internal=true dipakai saat "ganti" cadangan (pengaturan tidak direset).
      keepPrefix: kunci kv berawalan ini dipertahankan (deck buatan pengguna bukan progres, jadi tidak ikut terhapus). */
  S.reset = function (internal, keepPrefix) {      // selalu simpan titik pemulihan dulu, lalu hapus
    return S.snapshot(internal ? 'pre-ganti' : 'pre-hapus').catch(function () {}).then(function () { return resetNow(internal, keepPrefix); });
  };
  function resetNow(internal, keepPrefix) {
    try { localStorage.removeItem(CKEY); } catch (e) {}                                      // reset disengaja: kanari lama bukan tanda data hilang
    var keep = {};
    if (keepPrefix) Object.keys(S._kv).forEach(function (k) { if (k.indexOf(keepPrefix) === 0) keep[k] = S._kv[k]; });
    S._cards = new Map(); S._marks = new Map(); S._kv = Object.assign({}, keep); S._logCache = []; S._lastLogId = 0; S._memLog = [];
    if (!internal) { S.settings = Object.assign({}, DEFAULTS); saveSettings(); clearBunpou(); try { localStorage.setItem(MIG_KEY, '1'); } catch (e) {} }
    if (!S._db) return Promise.resolve();
    var tx = S._db.transaction(['cards', 'log', 'marks', 'kv'], 'readwrite');
    ['cards', 'log', 'marks', 'kv'].forEach(function (n) { tx.objectStore(n).clear(); });
    Object.keys(keep).forEach(function (k) { tx.objectStore('kv').put({ key: k, val: keep[k] }); });
    return txDone(tx);
  }

  /* ---------- titik pemulihan: salinan penuh di database TERPISAH (otomatis, dan sebelum aksi berbahaya) ---------- */
  function sdb() {
    return new Promise(function (res, rej) {
      if (!root.indexedDB) return rej(new Error('tanpa IndexedDB'));
      var r = root.indexedDB.open(SDB, 1);
      r.onupgradeneeded = function () { r.result.createObjectStore('snap', { keyPath: 'id' }); r.result.createObjectStore('blob', { keyPath: 'id' }); };
      r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); };
    });
  }
  var score = function (n) { return n.c + n.l + n.d * 5; };
  S.snapshots = function () {
    return sdb().then(function (db) {
      return rq(db.transaction('snap').objectStore('snap').getAll()).then(function (rows) { db.close(); return rows.sort(function (a, b) { return b.id - a.id; }); });
    }).catch(function () { return []; });
  };
  /** Simpan titik pemulihan. Keadaan kosong tidak pernah dijadikan titik; satu titik "terbanyak" tidak ikut dirotasi. */
  S.snapshot = function (why) {
    var n = tally();
    if (S.mode !== 'idb' || (!n.c && !n.l && !n.d)) return Promise.resolve(false);
    return S.exportJSON().then(function (obj) {
      var id = Date.now(), json = JSON.stringify(obj);
      return sdb().then(function (db) {
        return rq(db.transaction('snap').objectStore('snap').getAll()).then(function (rows) {
          var peak = rows.filter(function (x) { return x.peak; })[0], rec = { id: id, why: why || 'auto', n: n, peak: !peak || score(n) > score(peak.n) };
          var tx = db.transaction(['snap', 'blob'], 'readwrite'), sn = tx.objectStore('snap'), bl = tx.objectStore('blob');
          if (rec.peak && peak) { peak.peak = false; sn.put(peak); }
          sn.put(rec); bl.put({ id: id, json: json });
          var left = rows.filter(function (x) { return x.id !== id; }).concat([rec]).sort(function (a, b) { return b.id - a.id; }), cnt = { auto: 0, pre: 0 };
          left.forEach(function (x) { var k = /^pre/.test(x.why) ? 'pre' : 'auto'; if (!x.peak && ++cnt[k] > (k === 'pre' ? 3 : 7)) { sn.delete(x.id); bl.delete(x.id); } });
          return txDone(tx).then(function () { db.close(); S._lastSnap = id; S.journal('titik-pemulihan', rec.why + ' ' + n.c + 'k/' + n.d + 'h'); return true; });
        });
      });
    }).catch(function (e) { S.journal('titik-pemulihan-gagal', e && (e.name || e.message)); return false; });
  };
  S.autoSnap = function (why) { if (S.mode !== 'idb' || Date.now() - (S._lastSnap || 0) < 20 * 36e5) return Promise.resolve(false); return S.snapshot(why); };
  S.restoreSnapshot = function (id) {
    return sdb().then(function (db) { return rq(db.transaction('blob').objectStore('blob').get(id)).then(function (x) { db.close(); return x; }); })
      .then(function (x) { if (!x) throw new Error('Titik pemulihan tidak ditemukan'); S.journal('pulihkan', id); return S.importJSON(JSON.parse(x.json), 'replace'); });
  };
  function bootSnap() { S.snapshots().then(function (rows) { S._lastSnap = rows.length ? rows[0].id : 0; return S.autoSnap('auto-buka'); }); }

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
