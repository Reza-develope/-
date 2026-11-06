/* =====================================================================
   js/core/userdecks.js — DECK BUATAN PENGGUNA: bikin, ubah, dan hapus deck & kartu langsung dari web, tanpa coding.
   • Tiap deck disimpan sebagai satu kunci kv "ud:<id>" (IndexedDB, lewat FC.store), jadi otomatis ikut cadangan JSON.
   • Deck dipasang ke FC.data sebagai deck daun biasa (D.setUserDeck) → jadwal FSRS, sesi harian, bintang, latihan bebas,
     statistik, dan pencarian bekerja tanpa kode khusus.
   • Kartu memegang ID tetap "<deck>.<nomor>", bukan hash isi seperti kartu bawaan. Akibatnya: memperbaiki salah ketik tidak
     mengubah jadwal belajar, dan kartu yang kebetulan sama dengan kartu bawaan tidak berbagi progres.
   • Semua teks dibersihkan (panjang dibatasi, karakter kontrol dibuang, NFC). Isi dari cadangan atau impor tidak dipercaya:
     dibersihkan lagi setiap kali deck dimuat.
   • Format tukar-menukar berupa teks: satu kartu per baris, "depan | bacaan | arti" (juga Tab dari Excel/Sheets,
     tabel Markdown, dan CSV). Baris berawalan # adalah komentar; "# Deck: nama" memberi nama deck.
   Tanpa DOM. Dites di tools/test-userdecks.js.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  if (!FC.util && typeof require === 'function') require('./util.js');
  var U = FC.util;

  var KEY = 'ud:', ID_RE = /^u_[a-z0-9]{4,16}$/;
  var LIMITS = { decks: 100, cards: 3000, title: 60, sub: 80, front: 100, back: 150, backSub: 300, example: 300, exampleMeaning: 300, paste: 600000 };
  var TYPES = ['noun', 'verb', 'i-adj', 'na-adj', 'pronoun', 'adjective', 'kanji'];     // sama dengan label di cardface.js
  // Kelas karakter ditulis lewat kode angka (bukan literal) supaya berkas tetap bersih dari karakter tak terlihat.
  var cp = function (a, b) { return String.fromCodePoint(a) + (b ? '-' + String.fromCodePoint(b) : ''); };
  var charClass = function (ranges, flags) { return new RegExp('[' + ranges.map(function (r) { return cp(r[0], r[1]); }).join('') + ']', flags); };
  var KANJI = charClass([[0x3400, 0x4dbf], [0x4e00, 0x9fff], [0xf900, 0xfaff], [0x3005], [0x3006], [0x20000, 0x2fa1f]], 'u');     // kanji (termasuk 々 dan 〆)
  var BREAKS = charClass([[0x09, 0x0d], [0x2028], [0x2029]], 'g');                                   // tab, baris baru, pemisah baris/paragraf → spasi
  var INVISIBLE = charClass([[0x00, 0x1f], [0x7f, 0x9f], [0x200b], [0x202a, 0x202e], [0x2066, 0x2069], [0xfeff]], 'g');   // kontrol, spasi lebar-nol, pembalik arah teks, BOM

  var UD = FC.userDecks = { LIMITS: LIMITS, TYPES: TYPES, KEY: KEY };
  var decks = new Map(), listeners = [];     // id → { meta:{id,title,sub,created,updated,seq}, cards:[objek kartu] }
  var D = function () { return FC.data; }, S = function () { return FC.store; };

  UD.onChange = function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; };
  function changed(ev) { listeners.slice().forEach(function (fn) { try { fn(ev); } catch (e) { console.error(e); } }); }

  /* ---------- pembersihan teks ---------- */
  // Hanya teks dan angka yang dianggap isian. Objek/larik/fungsi (mustahil dari JSON yang sah) dibuang tanpa memanggil toString().
  var asText = function (v) { return typeof v === 'string' ? v : (typeof v === 'number' && isFinite(v) ? String(v) : ''); };
  function clean(s, max) {
    s = asText(s);
    try { s = s.normalize('NFC'); } catch (e) {}
    s = s.replace(BREAKS, ' ').replace(INVISIBLE, '').replace(/ {2,}/g, ' ').trim();
    if (s.length > max) s = Array.from(s).slice(0, max).join('').trim();
    return s;
  }
  UD.clean = clean;

  /** Isian kartu mentah → kolom bersih. Kana murni tanpa bacaan: bacaan = tulisannya (kebiasaan deck bawaan). */
  function fields(raw) {
    raw = raw || {};
    var f = { front: clean(raw.front, LIMITS.front), back: clean(raw.back, LIMITS.back), backSub: clean(raw.backSub, LIMITS.backSub) };
    var ex = clean(raw.example, LIMITS.example), em = clean(raw.exampleMeaning, LIMITS.exampleMeaning), ty = asText(raw.type).trim().toLowerCase();
    if (ex) { f.example = ex; if (em) f.exampleMeaning = em; }
    if (TYPES.indexOf(ty) >= 0) f.type = ty;
    if (!f.back && f.front && !KANJI.test(f.front)) f.back = f.front;
    return f;
  }
  function problem(f) {
    if (!f.front) return { field: 'front', error: 'Isi bagian depan kartu dulu.' };
    if (!f.backSub) return { field: 'backSub', error: 'Isi arti kartunya dulu.' };
    return null;
  }
  /** Periksa isian kartu tanpa menyimpan: {ok, card} atau {ok:false, field, error}. */
  UD.check = function (raw) { var f = fields(raw), p = problem(f); return p ? { ok: false, field: p.field, error: p.error, card: f } : { ok: true, card: f }; };
  var sig = function (f) { return f.front + '\u0001' + (f.back || '') + '\u0001' + (f.backSub || ''); };     // dua kartu "persis sama" bila ketiganya sama

  /* ---------- id ---------- */
  function rid(len) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz', out = '', buf = null;
    try { if (root.crypto && root.crypto.getRandomValues) buf = root.crypto.getRandomValues(new Uint8Array(len)); } catch (e) {}
    for (var i = 0; i < len; i++) out += chars.charAt((buf ? buf[i] : Math.floor(Math.random() * 256)) % 36);
    return out;
  }
  function newDeckId() {
    var id, data = D();
    do { id = 'u_' + rid(8); } while (decks.has(id) || (data.byId && data.byId.has(id)));
    return id;
  }
  var nextCardId = function (rec) { return rec.meta.id + '.' + (rec.meta.seq++).toString(36); };

  /* ---------- kartu & deck ---------- */
  function makeCard(id, f) {
    var c = { front: f.front, back: f.back, backSub: f.backSub };
    if (f.example) c.example = f.example;
    if (f.exampleMeaning) c.exampleMeaning = f.exampleMeaning;
    if (f.type) c.type = f.type;
    Object.defineProperty(c, '_id', { value: id, enumerable: false });      // FC.data.cid() memakai ini, bukan hash isi
    return c;
  }
  function stored(rec) {
    var m = rec.meta;
    return {
      v: 1, id: m.id, title: m.title, sub: m.sub, created: m.created, updated: m.updated, seq: m.seq,
      cards: rec.cards.map(function (c) {
        var o = { id: c._id, front: c.front, back: c.back, backSub: c.backSub };
        if (c.example) o.example = c.example;
        if (c.exampleMeaning) o.exampleMeaning = c.exampleMeaning;
        if (c.type) o.type = c.type;
        return o;
      })
    };
  }
  /** Dari data tersimpan/impor (tidak dipercaya) → rekaman bersih, atau null bila bukan deck yang sah. */
  function fromStored(raw, keyId) {
    if (!raw || typeof raw !== 'object') return null;
    var id = asText(raw.id) || String(keyId || '');
    if (!ID_RE.test(id) || (keyId && id !== keyId)) return null;
    var now = Date.now(), created = +raw.created || now;
    var rec = { meta: { id: id, title: clean(raw.title, LIMITS.title) || 'Deck tanpa nama', sub: clean(raw.sub, LIMITS.sub), created: created, updated: +raw.updated || created, seq: 1 }, cards: [] };
    var seen = new Set(), maxSeq = 0, orphans = [];
    (Array.isArray(raw.cards) ? raw.cards : []).slice(0, LIMITS.cards).forEach(function (rc) {
      if (!rc || typeof rc !== 'object') return;
      var f = fields(rc); if (!f.front) return;
      var cid = typeof rc.id === 'string' ? rc.id : '', m = /^(.+)\.([0-9a-z]{1,8})$/.exec(cid);
      if (!m || m[1] !== id || seen.has(cid)) { orphans.push(f); return; }      // id rusak atau ganda: diberi id baru di bawah
      seen.add(cid); var n = parseInt(m[2], 36); if (n > maxSeq) maxSeq = n;
      rec.cards.push(makeCard(cid, f));
    });
    rec.meta.seq = Math.max(Math.floor(+raw.seq) || 1, maxSeq + 1);
    orphans.forEach(function (f) { rec.cards.push(makeCard(nextCardId(rec), f)); });
    return rec;
  }
  function install(rec) { decks.set(rec.meta.id, rec); D().setUserDeck(rec.meta, rec.cards); }
  /** Simpan perubahan: perbarui memori (FC.data) lalu penyimpanan. */
  function commit(rec) {
    rec.meta.updated = Date.now();
    D().setUserDeck(rec.meta, rec.cards);
    var p = S().setKv(KEY + rec.meta.id, stored(rec));
    changed({ type: 'deck', id: rec.meta.id });
    return p;
  }
  /** Tambah banyak kartu: lewati yang tidak sah dan yang persis sama; berhenti di batas per deck. */
  function fill(rec, list) {
    var seen = new Set(rec.cards.map(sig)), added = 0, skipped = 0, capped = false;
    list.forEach(function (raw) {
      var f = fields(raw);
      if (problem(f)) { skipped++; return; }
      var s = sig(f); if (seen.has(s)) { skipped++; return; }
      if (rec.cards.length >= LIMITS.cards) { capped = true; skipped++; return; }
      seen.add(s); rec.cards.push(makeCard(nextCardId(rec), f)); added++;
    });
    return { added: added, skipped: skipped, capped: capped };
  }
  var info = function (rec) { var m = rec.meta; return { id: m.id, title: m.title, sub: m.sub, created: m.created, updated: m.updated, count: rec.cards.length }; };

  /* ---------- memuat ---------- */
  /** Pasang semua deck pengguna dari penyimpanan ke FC.data. Aman dipanggil ulang (mis. setelah memulihkan cadangan). */
  UD.load = function () {
    var st = S(), data = D(), n = 0, bad = 0;
    Array.from(decks.keys()).forEach(function (id) { data.dropUserDeck(id); });
    decks.clear();
    st.kvKeys(KEY).sort().forEach(function (k) {
      if (decks.size >= LIMITS.decks) { bad++; return; }
      try {
        var rec = fromStored(st.getKv(k), k.slice(KEY.length));
        if (rec) { install(rec); n++; } else bad++;
      } catch (e) { bad++; console.warn('[userdecks] gagal memuat ' + k, e); }
    });
    changed({ type: 'load' });
    return { decks: n, skipped: bad };
  };

  /* ---------- baca ---------- */
  UD.has = function (id) { return decks.has(id); };
  UD.get = function (id) { var r = decks.get(id); return r ? info(r) : null; };
  UD.cards = function (id) { var r = decks.get(id); return r ? r.cards : []; };      // daftar hidup (sama dengan yang dipakai FC.data)
  UD.list = function () { return D().decks.filter(function (d) { return d.user && decks.has(d.id); }).map(function (d) { return info(decks.get(d.id)); }); };
  UD.totals = function () { var c = 0; decks.forEach(function (r) { c += r.cards.length; }); return { decks: decks.size, cards: c }; };

  /* ---------- deck: buat, ganti nama, hapus ---------- */
  UD.create = function (opts) {
    opts = opts || {};
    var title = clean(opts.title, LIMITS.title);
    if (!title) return { ok: false, error: 'Beri nama deck dulu.' };
    if (decks.size >= LIMITS.decks) return { ok: false, error: 'Maksimal ' + LIMITS.decks + ' deck. Hapus deck yang tidak dipakai dulu.' };
    var now = Date.now(), id = newDeckId();
    var rec = { meta: { id: id, title: title, sub: clean(opts.sub, LIMITS.sub), created: now, updated: now, seq: 1 }, cards: [] };
    var res = opts.cards && opts.cards.length ? fill(rec, opts.cards) : { added: 0, skipped: 0, capped: false };
    decks.set(id, rec); commit(rec);
    return { ok: true, id: id, added: res.added, skipped: res.skipped, capped: res.capped };
  };
  UD.rename = function (id, opts) {
    var rec = decks.get(id); if (!rec) return { ok: false, error: 'Deck tidak ditemukan.' };
    var title = clean(opts && opts.title, LIMITS.title);
    if (!title) return { ok: false, error: 'Nama deck tidak boleh kosong.' };
    var sub = clean(opts && opts.sub, LIMITS.sub);
    if (title !== rec.meta.title || sub !== rec.meta.sub) { rec.meta.title = title; rec.meta.sub = sub; commit(rec); }
    return { ok: true, title: title, sub: sub };
  };
  /**
   * Hapus deck beserta jadwal belajar, bintang, dan keanggotaannya di sesi harian. Promise<{ok, cards, records, undo}>.
   * undo() (Promise<boolean>, sekali pakai) mengembalikan semuanya persis seperti semula; dipakai tombol "Urungkan" di toast.
   */
  UD.remove = function (id) {
    var rec = decks.get(id); if (!rec) return Promise.resolve({ ok: false, error: 'Deck tidak ditemukan.' });
    var st = S(), keys = new Set(), n = rec.cards.length;
    rec.cards.forEach(function (c) { ['f', 'r'].forEach(function (d) { var k = c._id + ':' + d; if (st.getCard(k)) keys.add(k); }); });
    st.allCards().forEach(function (r) { if (r.dk === id) keys.add(r.k); });                  // catatan yatim milik deck ini ikut dibersihkan
    var saved = Array.from(keys).map(function (k) { return st.getCard(k); }).filter(Boolean);
    var marks = st.stars().filter(function (m) { return m.sh === id || String(m.cid).indexOf(id + '.') === 0; });
    var wasActive = (st.get('active') || []).indexOf(id) >= 0, snapshot = stored(rec);
    marks.forEach(function (m) { st.setStar(m.cid, m.c, m.sh, false); });
    return st.deleteCards(Array.from(keys)).then(function () {
      decks.delete(id); D().dropUserDeck(id);
      st.set('active', (st.get('active') || []).filter(function (x) { return x !== id; }));
      return st.delKv(KEY + id);
    }).then(function () {
      changed({ type: 'remove', id: id });
      var used = false;
      return {
        ok: true, cards: n, records: saved.length,
        undo: function () {
          if (used || decks.has(id) || decks.size >= LIMITS.decks) return Promise.resolve(false);
          var back = fromStored(snapshot, id); if (!back) return Promise.resolve(false);
          used = true;
          install(back);
          saved.forEach(function (r) { st.putCard(r); });
          marks.forEach(function (m) { st.setStar(m.cid, m.c, m.sh, true); });
          if (wasActive) st.set('active', (st.get('active') || []).filter(function (x) { return x !== id; }).concat([id]));
          return st.setKv(KEY + id, stored(back)).then(function () { changed({ type: 'deck', id: id }); return true; });
        }
      };
    });
  };

  /* ---------- kartu: tambah, ubah, hapus ---------- */
  UD.addCard = function (id, raw) {
    var rec = decks.get(id); if (!rec) return { ok: false, error: 'Deck tidak ditemukan.' };
    var f = fields(raw), p = problem(f);
    if (p) return { ok: false, field: p.field, error: p.error };
    if (rec.cards.length >= LIMITS.cards) return { ok: false, error: 'Satu deck maksimal ' + U.fmtNum(LIMITS.cards) + ' kartu.' };
    var s = sig(f);
    if (rec.cards.some(function (c) { return sig(c) === s; })) return { ok: false, duplicate: true, error: 'Kartu yang persis sama sudah ada di deck ini.' };
    var c = makeCard(nextCardId(rec), f); rec.cards.push(c); commit(rec);
    return { ok: true, card: c, total: rec.cards.length };
  };
  /**
   * Pratinjau impor: berapa kartu yang benar-benar akan masuk ke deck `id` (null = deck baru), berapa yang sudah ada/rusak.
   * `cards` = kartu (sudah dibersihkan) yang akan masuk, berurutan, sebanyak `fresh`.
   */
  UD.countNew = function (id, list) {
    var rec = id ? decks.get(id) : null, seen = new Set(rec ? rec.cards.map(sig) : []), fresh = [], dup = 0, bad = 0;
    (list || []).forEach(function (raw) {
      var f = fields(raw); if (problem(f)) { bad++; return; }
      var s = sig(f); if (seen.has(s)) { dup++; return; }
      seen.add(s); fresh.push(f);
    });
    var room = Math.max(0, LIMITS.cards - (rec ? rec.cards.length : 0));
    return { fresh: Math.min(fresh.length, room), dup: dup, bad: bad, room: room, over: Math.max(0, fresh.length - room), cards: fresh.slice(0, room) };
  };
  /** Tambah banyak kartu sekaligus (hasil parseText). Satu kali simpan. */
  UD.addCards = function (id, list) {
    var rec = decks.get(id); if (!rec) return { ok: false, error: 'Deck tidak ditemukan.' };
    var res = fill(rec, list || []);
    if (res.added) commit(rec);
    return { ok: true, added: res.added, skipped: res.skipped, capped: res.capped, total: rec.cards.length };
  };
  UD.updateCard = function (id, cardId, raw) {
    var rec = decks.get(id), c = rec && rec.cards.filter(function (x) { return x._id === cardId; })[0];
    if (!c) return { ok: false, error: 'Kartu tidak ditemukan.' };
    var f = fields(raw), p = problem(f);
    if (p) return { ok: false, field: p.field, error: p.error };
    var s = sig(f);
    if (rec.cards.some(function (x) { return x !== c && sig(x) === s; })) return { ok: false, duplicate: true, error: 'Kartu lain di deck ini sudah persis sama.' };
    delete c.example; delete c.exampleMeaning; delete c.type;
    c.front = f.front; c.back = f.back; c.backSub = f.backSub;
    if (f.example) c.example = f.example;
    if (f.exampleMeaning) c.exampleMeaning = f.exampleMeaning;
    if (f.type) c.type = f.type;
    commit(rec);
    if (S().isStarred(cardId)) S().setStar(cardId, c, id, true);          // salinan di Kartu Susah ikut diperbarui
    return { ok: true, card: c };
  };
  /** Hapus satu kartu beserta jadwal dan bintangnya. Mengembalikan undo() untuk membatalkan (jadwal ikut kembali). */
  UD.removeCard = function (id, cardId) {
    var rec = decks.get(id), idx = rec ? rec.cards.findIndex(function (x) { return x._id === cardId; }) : -1;
    if (idx < 0) return { ok: false, error: 'Kartu tidak ditemukan.' };
    var st = S(), c = rec.cards[idx], keys = ['f', 'r'].map(function (d) { return cardId + ':' + d; });
    var saved = keys.map(function (k) { return st.getCard(k); }).filter(Boolean);
    var starred = st.isStarred(cardId), used = false;
    rec.cards.splice(idx, 1);
    if (saved.length) st.deleteCards(saved.map(function (r) { return r.k; }));
    if (starred) st.setStar(cardId, c, id, false);
    commit(rec);
    return {
      ok: true, card: c, hadProgress: saved.length > 0,
      undo: function () {
        if (used || decks.get(id) !== rec) return false;
        used = true;
        rec.cards.splice(Math.min(idx, rec.cards.length), 0, c);
        saved.forEach(function (r) { st.putCard(r); });
        if (starred) st.setStar(cardId, c, id, true);
        commit(rec);
        return true;
      }
    };
  };

  /* ---------- teks: baca & tulis ---------- */
  var HEADER = new Set(['kanji', 'kana', 'hiragana', 'katakana', 'bacaan', 'baca', 'cara baca', 'arti', 'artinya', 'indonesia', 'bahasa indonesia',
    'depan', 'belakang', 'jepang', 'bahasa jepang', 'kosakata', 'kotoba', 'kata', 'front', 'back', 'meaning', 'reading', 'japanese', 'indonesian',
    'contoh', 'contoh kalimat', 'arti contoh', 'jenis', 'no', 'nomor', '#', '漢字', 'ひらがな', 'かな', '読み', '読み方', '意味', '日本語', 'インドネシア語']);
  function isHeader(cells) {
    var seen = 0;
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i].toLowerCase().replace(/[:：]\s*$/, '').trim();
      if (!c) continue;
      if (!HEADER.has(c)) return false;
      seen++;
    }
    return seen >= 2;
  }
  var TAB_RE = /\t/, PIPE_RE = /[|｜]/;
  var usable = function (cells) { var n = 0; for (var i = 0; i < cells.length; i++) if (String(cells[i]).trim()) n++; return n; };      // sel yang ada isinya
  /**
   * Pemisah yang dipakai teks tempelan. Yang dihitung baris yang benar-benar terbelah jadi >= 2 sel berisi, jadi satu Tab nyasar
   * (mis. indentasi di depan baris `a | b | c`) tidak mengubah cara baca seluruh daftar. Seri → Tab (hasil salin dari Excel).
   */
  function detectDelimiter(lines) {
    var sample = lines.slice(0, 200), tab = 0, pipe = 0, anyTab = false, anyPipe = false;
    sample.forEach(function (l) {
      if (l.indexOf('\t') >= 0) { anyTab = true; if (usable(l.split(TAB_RE)) >= 2) tab++; }
      if (PIPE_RE.test(l)) { anyPipe = true; if (usable(l.split(PIPE_RE)) >= 2) pipe++; }
    });
    if (tab || pipe) return tab >= pipe ? 'tab' : 'pipe';
    var comma = 0, semi = 0;
    sample.forEach(function (l) { comma += (l.match(/,/g) || []).length; semi += (l.match(/;/g) || []).length; });
    if (comma || semi) return semi > comma ? ';' : ',';          // Excel berbahasa Indonesia mengekspor CSV dengan titik koma
    return anyTab ? 'tab' : anyPipe ? 'pipe' : null;
  }
  /** CSV (RFC 4180 ringkas): sel boleh dikutip, "" = tanda kutip, baris baru boleh ada di dalam kutipan. */
  function parseCSV(text, d) {
    var rows = [], row = [], cell = '', q = false, line = 1, start = 1;
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (q) {
        if (ch === '"') { if (text.charAt(i + 1) === '"') { cell += '"'; i++; } else q = false; }
        else { if (ch === '\n') line++; cell += ch; }
      } else if (ch === '"' && cell === '') q = true;
      else if (ch === d) { row.push(cell); cell = ''; }
      else if (ch === '\n') { row.push(cell); rows.push({ n: start, cells: row, raw: row.join(d) }); row = []; cell = ''; line++; start = line; }
      else cell += ch;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push({ n: start, cells: row, raw: row.join(d) }); }
    return rows;
  }
  /** Baris yang tidak terbelah oleh pemisah utama tetapi terbelah oleh pemisah Tab/garis tegak yang lain dibaca dengan yang lain itu (`via`). */
  function splitRows(text, delim) {
    if (delim === ',' || delim === ';') return parseCSV(text, delim);
    var re = delim === 'tab' ? TAB_RE : delim === 'pipe' ? PIPE_RE : null, alt = delim === 'tab' ? PIPE_RE : delim === 'pipe' ? TAB_RE : null;
    return text.split('\n').map(function (l, i) {
      var cells = re ? l.split(re) : [l], via = delim;
      if (alt && usable(cells) < 2) { var other = l.split(alt); if (usable(other) >= 2) { cells = other; via = delim === 'tab' ? 'pipe' : 'tab'; } }
      return { n: i + 1, cells: cells, raw: l, via: via };
    });
  }

  /**
   * Teks → kartu. Mengembalikan { cards:[{front,back,backSub,example?,exampleMeaning?,type?}], skipped:[{line,reason}],
   * title, sub, delimiter, rows, truncated }. Kolom: depan | bacaan | arti | contoh | arti contoh | jenis.
   * Baris dua kolom dibaca "depan | arti". Judul kolom di baris pertama, garis tabel Markdown, dan baris # dilewati.
   * Bila SELURUH teks hanya memakai dua kolom, kolom kosong di ujung baris (mis. Excel yang menambah Tab) diabaikan.
   */
  UD.parseText = function (text) {
    var out = { cards: [], skipped: [], title: '', sub: '', delimiter: null, rows: 0, truncated: false };
    text = String(text == null ? '' : text);
    if (text.length > LIMITS.paste) { text = text.slice(0, LIMITS.paste); out.truncated = true; }
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
    text = text.replace(/\r\n?/g, '\n');
    var body = text.split('\n').filter(function (l) { var t = l.trim(); return t && t.charAt(0) !== '#'; });
    out.delimiter = detectDelimiter(body);

    // Putaran 1: buang baris kosong, komentar, garis tabel; kupas tanda | di tepi baris tabel Markdown.
    var rows = [];
    splitRows(text, out.delimiter).forEach(function (r) {
      var cells = r.cells.map(function (c) { return String(c).trim(); });
      if (!cells.some(Boolean)) return;
      var lead = cells.filter(Boolean)[0] || '';
      if (lead.charAt(0) === '#') {
        var m = /^#\s*(deck|judul|nama)\s*[:：]\s*(.+)$/i.exec(r.raw.trim()), k = /^#\s*(keterangan|ket|sub|deskripsi)\s*[:：]\s*(.+)$/i.exec(r.raw.trim());
        if (m && !out.title) out.title = clean(m[2], LIMITS.title);
        if (k && !out.sub) out.sub = clean(k[2], LIMITS.sub);
        return;
      }
      if (r.via === 'pipe') {                                                 // tabel Markdown: | a | b | c |
        var t = r.raw.trim();
        if (/^[|｜]/.test(t) && cells[0] === '') {
          cells.shift();
          if (/[|｜]$/.test(t) && cells.length && cells[cells.length - 1] === '') cells.pop();
        }
      }
      if (cells.some(Boolean) && cells.every(function (c) { return !c || /^:?-{2,}:?$/.test(c); })) return;    // |---|---|
      rows.push({ n: r.n, cells: cells });
    });
    if (rows.length && isHeader(rows[0].cells)) rows.shift();                  // judul kolom ("Kanji | Hiragana | Arti")

    // Lebar tabel = kolom terjauh yang terisi di baris mana pun.
    var cols = 0;
    rows.forEach(function (r) { var n = r.cells.length; while (n && !r.cells[n - 1]) n--; if (n > cols) cols = n; });

    // Putaran 2: satu baris satu kartu.
    var seen = new Set();
    rows.forEach(function (r) {
      var cells = r.cells.slice();
      out.rows++;
      if (out.cards.length >= LIMITS.cards) { out.truncated = true; out.skipped.push({ line: r.n, reason: 'melebihi batas ' + U.fmtNum(LIMITS.cards) + ' kartu per deck' }); return; }
      if (cols <= 2) cells.length = Math.min(cells.length, 2);               // tabel dua kolom: sisa sel kosong di ujung bukan kolom
      else while (cells.length > 3 && !cells[cells.length - 1]) cells.pop();   // tabel penuh: sel kosong di ujung tidak berarti
      if (cells.length < 2) { out.skipped.push({ line: r.n, reason: 'hanya satu kolom (tulis depan | bacaan | arti)' }); return; }
      var raw = cells.length === 2 ? { front: cells[0], back: '', backSub: cells[1] }
        : { front: cells[0], back: cells[1], backSub: cells[2], example: cells[3], exampleMeaning: cells[4], type: cells[5] };
      var f = fields(raw), p = problem(f);
      if (p) { out.skipped.push({ line: r.n, reason: p.field === 'front' ? 'bagian depan kosong' : 'arti kosong' }); return; }
      var s = sig(f);
      if (seen.has(s)) { out.skipped.push({ line: r.n, reason: 'sama persis dengan kartu sebelumnya' }); return; }
      seen.add(s); out.cards.push(f);
    });
    return out;
  };

  var cellText = function (s) { return String(s || '').replace(/[|｜]/g, '¦'); };      // tanda | di dalam isi kartu diganti agar tidak dibaca sebagai pemisah
  /** Isi deck sebagai teks yang bisa ditempel lagi lewat parseText. Kolom contoh/jenis hanya ada bila dipakai. */
  UD.toText = function (id) {
    var rec = decks.get(id); if (!rec) return '';
    var extra = rec.cards.some(function (c) { return c.example || c.exampleMeaning || c.type; });
    var out = ['# Deck: ' + rec.meta.title];
    if (rec.meta.sub) out.push('# Keterangan: ' + rec.meta.sub);
    out.push('# Format: ' + (extra ? 'depan | bacaan | arti | contoh | arti contoh | jenis' : 'depan | bacaan | arti'));
    rec.cards.forEach(function (c) {
      var row = [c.front, c.back || '', c.backSub];
      if (extra) row.push(c.example || '', c.exampleMeaning || '', c.type || '');
      while (row.length > 3 && !row[row.length - 1]) row.pop();
      out.push(row.map(cellText).join(' | '));
    });
    return out.join('\n') + '\n';
  };
  /** Nama berkas aman untuk unduhan, mis. "Kosakata-kantor.txt". */
  UD.fileName = function (id, ext) {
    var r = decks.get(id), t = r ? r.meta.title : 'deck';
    t = Array.from(t.replace(/[\\/:*?"<>|\u0000-\u001f]+/g, ' ').trim().replace(/\s+/g, '-')).slice(0, 40).join('') || 'deck';
    return t + (ext || '.txt');
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = UD;
})(typeof window !== 'undefined' ? window : globalThis);
