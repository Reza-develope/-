#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/build-furigana.js — membuat js/core/furigana-data.js + js/core/furigana.js dari furigana.js LAMA.
   Algoritmanya TIDAK diubah (disalin per baris); yang dibuang hanya pengikat DOM/toggle lama.
   Pakai:  node tools/build-furigana.js "<folder aplikasi lama>/js/furigana.js"
   Cukup dijalankan sekali; hasilnya sudah ada di repo. Disimpan sebagai dokumentasi asal-usul kode.
   ===================================================================== */
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.resolve(process.argv[2]), 'utf8').split('\n');
const L = (a, b) => src.slice(a - 1, b);                  // baris a..b (1-based, inklusif)
const dedent = lines => lines.map(l => l.startsWith('        ') ? l.slice(8) : l);

const chk = (n, re) => { if (!re.test(src[n - 1])) throw new Error('baris ' + n + ' tidak sesuai dugaan: ' + src[n - 1].slice(0, 80)); };
chk(9, /KANJI_REGEX/); chk(10, /KANJI_OR_DIGIT_REGEX/); chk(13, /function fcSegmentFront/); chk(49, /const KANJI_READINGS/);
chk(55, /const SPECIAL_COMPOUNDS/); chk(59, /const RENDAKU_MAP/); chk(278, /function fcRenderFurigana/); chk(349, /function fcRefreshFurigana/);

/* ---- berkas data ---- */
const dataOut = [
  '/* =====================================================================',
  '   js/core/furigana-data.js — KAMUS CARA BACA KANJI untuk mesin furigana (js/core/furigana.js).',
  '   Disalin apa adanya dari aplikasi lama; tambah kanji/kata baru di sini kalau ada bacaan yang masih',
  '   jatuh ke "satu furigana di atas seluruh kelompok kanji" (aman, tapi kurang presisi).',
  '   ===================================================================== */',
  '(function (root) {',
  "  'use strict';",
  ...dedent(L(34, 48)).map(l => '  ' + l),
  '  ' + src[48].trim(),                                   // KANJI_READINGS
  ...dedent(L(50, 54)).map(l => '  ' + l),
  '  ' + src[54].trim(),                                   // SPECIAL_COMPOUNDS
  '  root.FC = root.FC || {};',
  '  root.FC.furiData = { KANJI_READINGS: KANJI_READINGS, SPECIAL_COMPOUNDS: SPECIAL_COMPOUNDS };',
  "})(typeof window !== 'undefined' ? window : globalThis);",
  ''
].join('\n');

/* ---- berkas logika ---- */
let renderFn = L(278, 347);
const modeLine = renderFn.findIndex(l => /if \(!furiganaMode\) return front;/.test(l));
if (modeLine < 0) throw new Error('baris cek furiganaMode tidak ditemukan');
renderFn.splice(modeLine, 1);
const logicOut = [
  '/* =====================================================================',
  '   js/core/furigana.js — MESIN FURIGANA (ruby per-kanji, dengan pengaman). Algoritma dari aplikasi lama,',
  '   tidak diubah; hanya dipisah dari tombol/DOM. Dipakai sebagai:  FC.furigana.render(depan, bacaan) → HTML.',
  '   Total bacaan yang ditampilkan SELALU sama dengan data "bacaan" — kalau ragu, jatuh ke satu <ruby> utuh.',
  '   Butuh js/core/furigana-data.js dimuat lebih dulu.',
  '   ===================================================================== */',
  '(function (root) {',
  "  'use strict';",
  '  var KANJI_READINGS = root.FC.furiData.KANJI_READINGS, SPECIAL_COMPOUNDS = root.FC.furiData.SPECIAL_COMPOUNDS;',
  ...dedent(L(9, 10)).map(l => '  ' + l),
  '',
  ...dedent(L(12, 32)).map(l => '  ' + l),
  '',
  ...dedent(L(57, 277)).map(l => '  ' + l),
  ...dedent(renderFn).map(l => '  ' + l),
  '',
  '  root.FC.furigana = { render: fcRenderFurigana, hasKanji: function (s) { return KANJI_REGEX.test(s || \'\'); } };',
  "})(typeof window !== 'undefined' ? window : globalThis);",
  ''
].join('\n');

fs.writeFileSync(path.join(__dirname, '../js/core/furigana-data.js'), dataOut);
fs.writeFileSync(path.join(__dirname, '../js/core/furigana.js'), logicOut);
console.log('furigana-data.js', dataOut.length, 'B | furigana.js', logicOut.length, 'B');
