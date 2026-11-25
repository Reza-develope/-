/* =====================================================================
   js/core/buku.js — BUKU BUNPOU IRODORI: pemuat bab (diunduh saat dibutuhkan), pembaca penanda teks, pencarian, dan catatan "sudah paham".
   Isi bab ada di data/buku/<level>_<nn>.js (mis. a22_01.js) dan didaftarkan lewat FC.defineBuku(level, bab).
   Daftar level & bab ada di data/buku/index.js (FC.bukuIndex).

   Penanda teks di berkas data (dipakai di judul, rumus, tabel, penjelasan, contoh):
     漢字[よみ]    kanji + cara baca. SETIAP kanji wajib diberi cara baca (furigana tampil bila tombol ふりがな menyala).
                   Tulis okurigana di luar kurung: 食[た]べる, 来[き]ます. Angka boleh ikut: 4時間[よじかん].
     {…}           sorot — bagian tata bahasa yang sedang dibahas (warna merah muda)
     **…**         tebal
     「…」         kutipan Jepang di dalam penjelasan (otomatis diberi warna nila)
   FC.buku.kana(teks) → bacaan hiragana polos (untuk suara), FC.buku.plain(teks) → teks tanpa penanda.
   Aman dijalankan di Node (tools/verify-buku.js memakainya).
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  var B = FC.buku = {};

  var data = {};                 // level → { nomor bab → bab }
  var pending = {};              // "level:nomor" → { promise, resolve, reject }

  /* ---------- daftar level ---------- */
  B.levels = function () { return (FC.bukuIndex && FC.bukuIndex.levels) || []; };
  B.level = function (id) { return B.levels().filter(function (l) { return l.id === id; })[0] || null; };
  var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
  B.fileOf = function (levelId, n) { return levelId + '_' + pad2(n); };
  B.polaId = function (levelId, n, i) { return levelId + '-' + n + '-' + (i + 1); };

  /* ---------- pendaftaran & pemuatan ---------- */
  FC.defineBuku = function (levelId, bab) {
    (data[levelId] = data[levelId] || {})[bab.n] = bab;
    var p = pending[levelId + ':' + bab.n]; if (p) { delete pending[levelId + ':' + bab.n]; p.resolve(bab); }
  };
  var BUILD = function () { return FC.BUILD ? '?v=' + encodeURIComponent(FC.BUILD) : ''; };
  function loadBab(levelId, n) {
    if (data[levelId] && data[levelId][n]) return Promise.resolve(data[levelId][n]);
    var key = levelId + ':' + n;
    if (pending[key]) return pending[key].promise;
    var p = {}; p.promise = new Promise(function (res, rej) { p.resolve = res; p.reject = rej; });
    pending[key] = p;
    var s = document.createElement('script'); s.src = 'data/buku/' + B.fileOf(levelId, n) + '.js' + BUILD(); s.async = true;
    s.onerror = function () { delete pending[key]; s.remove(); var e = new Error('Isi bab belum bisa dimuat. Periksa koneksi internet lalu coba lagi.'); e.bab = n; p.reject(e); };
    // berkas terunduh tapi FC.defineBuku tidak dipanggil dengan level & nomor yang sama (salah ketik) → dulu menggantung selamanya
    s.onload = function () { if (!pending[key]) return; delete pending[key]; var e = new Error('Berkas bab ' + levelId + ' ' + n + ' termuat tetapi isinya tidak terdaftar. Periksa level dan nomor di FC.defineBuku.'); e.bab = n; p.reject(e); };
    document.head.appendChild(s);
    return p.promise;
  }
  /** Muat semua bab sebuah level → { level, babs:[…terurut] } */
  B.load = function (levelId) {
    var lv = B.level(levelId);
    if (!lv) return Promise.reject(new Error('Level tidak dikenal: ' + levelId));
    return Promise.all(lv.babs.map(function (n) { return loadBab(levelId, n); })).then(function (babs) {
      return { level: lv, babs: babs.slice().sort(function (a, b) { return a.n - b.n; }) };
    });
  };
  B.loaded = function (levelId) { var lv = B.level(levelId); return !!lv && lv.babs.every(function (n) { return data[levelId] && data[levelId][n]; }); };
  B.get = function (levelId, n) { return (data[levelId] && data[levelId][n]) || null; };

  /* ---------- pembaca penanda teks ---------- */
  var RUBY = /([0-9０-９㐀-䶿一-鿿々〆]+)\[([^\[\]]+)\]/y;
  var KANJI_ANY = /[㐀-䶿一-鿿々〆]/;
  /**
   * Pecah teks bertanda menjadi simpul: { t, b, h, q } (teks biasa) atau { r, rt, b, h, q } (kanji + cara baca).
   * b = tebal, h = sorot, q = di dalam 「…」 (hanya bila opts.quote).
   */
  B.parse = function (str, opts) {
    var s = String(str == null ? '' : str), out = [], i = 0, buf = '', st = { b: false, h: false, q: false }, quote = !!(opts && opts.quote);
    function flush() { if (buf) { out.push({ t: buf, b: st.b, h: st.h, q: st.q }); buf = ''; } }
    while (i < s.length) {
      var ch = s.charAt(i);
      if (ch === '*' && s.charAt(i + 1) === '*') { flush(); st.b = !st.b; i += 2; continue; }
      if (ch === '{') { flush(); st.h = true; i++; continue; }
      if (ch === '}') { flush(); st.h = false; i++; continue; }
      RUBY.lastIndex = i;
      var m = RUBY.exec(s);
      if (m) { flush(); out.push({ r: m[1], rt: m[2], b: st.b, h: st.h, q: st.q }); i += m[0].length; continue; }
      if (quote && ch === '「') { flush(); st.q = true; buf += ch; i++; continue; }
      if (quote && ch === '」') { buf += ch; flush(); st.q = false; i++; continue; }
      buf += ch; i++;
    }
    flush();
    return out;
  };
  /** bacaan hiragana polos (kanji diganti cara bacanya; penanda dibuang) */
  B.kana = function (str) { return B.parse(str).map(function (n) { return n.r ? n.rt : n.t; }).join(''); };
  /** teks tanpa penanda (kanji tanpa cara baca) */
  B.plain = function (str) { return B.parse(str).map(function (n) { return n.r || n.t; }).join(''); };

  /** Pemeriksa penulisan (dipakai tools/verify-buku.js). Kembalikan daftar masalah (teks). */
  B.check = function (str) {
    var s = String(str == null ? '' : str), probs = [];
    var stars = (s.match(/\*\*/g) || []).length; if (stars % 2) probs.push('tanda ** tidak berpasangan');
    var depth = 0, bad = false;
    for (var i = 0; i < s.length; i++) { var c = s.charAt(i); if (c === '{') { depth++; if (depth > 1) bad = true; } else if (c === '}') { depth--; if (depth < 0) bad = true; } }
    if (depth !== 0 || bad) probs.push('kurung kurawal { } tidak seimbang');
    var nodes = B.parse(s, { quote: true });
    nodes.forEach(function (n) {
      if (n.r) {
        if (!/^[぀-ゟ゠-ヿー]+$/.test(n.rt)) probs.push('cara baca bukan kana: ' + n.r + '[' + n.rt + ']');
        if (/[<>&"]/.test(n.r + n.rt)) probs.push('karakter terlarang di ' + n.r);
      } else if (KANJI_ANY.test(n.t)) {
        probs.push('kanji tanpa cara baca: ' + (n.t.match(KANJI_ANY) || [''])[0] + ' (di "' + n.t + '")');
      }
    });
    if (/[\[\]]/.test(nodes.map(function (n) { return n.r ? '' : n.t; }).join(''))) probs.push('kurung siku [ ] nyasar (bukan pasangan kanji[よみ])');
    return probs;
  };

  /* ---------- pencarian ---------- */
  var norm = function (s) { return String(s || '').toLowerCase().normalize('NFKC'); };
  function hay(bab, p) {
    return norm([B.plain(p.name), B.kana(p.name), p.short ? B.plain(p.short) : '', p.arti, p.inti, p.kw, 'bab ' + bab.n].join(' '));
  }
  /** Cari pola di semua bab yang sudah dimuat. Semua kata kunci harus cocok. → [{ bab, pola, i }] */
  B.search = function (babs, query) {
    var terms = norm(query).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var out = [];
    babs.forEach(function (bab) {
      bab.pola.forEach(function (p, i) {
        var h = hay(bab, p);
        if (terms.every(function (t) { return h.indexOf(t) >= 0; })) out.push({ bab: bab, pola: p, i: i });
      });
    });
    return out;
  };

  /* ---------- catatan "sudah paham" (disimpan di localStorage; kuncinya berawalan "bunpou:" sehingga ikut cadangan JSON) ---------- */
  var PK = 'bunpou:buku';
  var memo = null;
  function readDone() {
    if (memo) return memo;
    try { var v = JSON.parse(localStorage.getItem(PK) || '{}'); memo = v && typeof v === 'object' && !Array.isArray(v) ? v : {}; } catch (e) { memo = {}; }
    return memo;
  }
  B.isDone = function (id) { return !!readDone()[id]; };
  B.setDone = function (id, on) {
    var d = readDone();
    if (on) d[id] = Date.now(); else delete d[id];
    try { localStorage.setItem(PK, JSON.stringify(d)); } catch (e) {}
    return on;
  };
  /** jumlah pola yang sudah ditandai paham di sebuah bab */
  B.doneCount = function (levelId, bab) {
    var d = readDone(), n = 0;
    bab.pola.forEach(function (p, i) { if (d[B.polaId(levelId, bab.n, i)]) n++; });
    return n;
  };
  /** buang ingatan di memori (dipanggil store.js setelah cadangan dipulihkan / progres dihapus) */
  B.reloadDone = function () { memo = null; };

  if (typeof module !== 'undefined' && module.exports) module.exports = B;
})(typeof window !== 'undefined' ? window : globalThis);
