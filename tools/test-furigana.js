#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-furigana.js — uji mesin furigana TANPA butuh aplikasi lama. Janji mesin: total bacaan yang tampil SELALU sama dengan
   data "bacaan" kartu; kalau ragu atau ambigu, jatuh ke satu <ruby> di atas seluruh kata (tidak pernah menebak potongan).
   Memeriksa setiap kartu berkanji di data/ + kasus-kasus yang dulu salah (黄色い, 新築祝い, 低く見る).
   Pakai:  node tools/test-furigana.js
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require('./_lib');
const ROOT = path.resolve(__dirname, '..');
global.window = globalThis; global.FC = {};
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'js/core/furigana-data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'js/core/furigana.js'), 'utf8'));
const R = (f, b) => FC.furigana.render(f, b);
let pass = 0, fail = 0; const bad = [];
const ok = (name, cond, info) => { if (cond) pass++; else { fail++; bad.push(name + (info !== undefined ? ' → ' + info : '')); } };

// bacaan yang tampil = isi <rt> + kana di luar ruby
const shown = html => html.replace(/<ruby>[^<]*<rt>([^<]*)<\/rt><\/ruby>/g, '$1').replace(/<[^>]+>/g, '');
const norm = s => String(s).normalize('NFKC').replace(/\s+/g, '');
// data memakai okurigana dalam kurung: はし(る) — mesin menggabungnya
const expectReading = (front, back) => { const m = /\(([^)]*)\)\s*$/.exec(back); return m && front.endsWith(m[1]) ? back.slice(0, -m[0].length) + m[1] : back; };

// --- kasus tertentu ---
ok('黄色い utuh (dulu cuma "き")', shown(R('黄色い', 'きいろい')) === 'きいろい', R('黄色い', 'きいろい'));
ok('新築祝い utuh (dulu kehilangan "いわ")', shown(R('新築祝い', 'しんちくいわい')) === 'しんちくいわい', R('新築祝い', 'しんちくいわい'));
ok('歌う: okurigana dipisah dari kanji', R('歌う', 'うたう') === '<ruby>歌<rt>うた</rt></ruby>う', R('歌う', 'うたう'));
ok('失う: okurigana dipisah dari kanji', R('失う', 'うしなう') === '<ruby>失<rt>うしな</rt></ruby>う', R('失う', 'うしなう'));
ok('低く見る: ambigu → satu ruby utuh, tidak menebak', R('低く見る', 'ひくくみる') === '<ruby>低く見る<rt>ひくくみる</rt></ruby>', R('低く見る', 'ひくくみる'));
ok('okurigana dalam kurung: 走る', shown(R('走る', 'はし(る)')) === 'はしる', R('走る', 'はし(る)'));
ok('tanpa kanji: tidak diubah', R('すみません', 'すみません') === 'すみません' || shown(R('すみません', 'すみません')) === 'すみません', R('すみません', 'すみません'));
ok('bacaan kosong tidak membuat galat', typeof R('日本', '') === 'string');

// --- semua kartu berkanji di data/ ---
const data = L.loadNewData(); data.errors.forEach(e => ok('muat data', false, e));
const KANJI = /[\u4E00-\u9FFF\u3400-\u4DBF々〆〤]/, seen = new Set();
let total = 0, whole = 0;
data.shards.forEach(obj => Object.keys(obj).forEach(did => obj[did].forEach(c => {
  const k = c.front + '|' + c.back; if (seen.has(k) || !KANJI.test(c.front)) return; seen.add(k); total++;
  let html; try { html = R(c.front, c.back); } catch (e) { return ok('galat render ' + k, false, e.message); }
  if (norm(shown(html)) !== norm(expectReading(c.front, c.back))) ok('bacaan tak sama ' + k, false, html);
  if ((html.match(/<ruby>/g) || []).length === 1 && html.startsWith('<ruby>') && html.indexOf('</ruby>') === html.length - 7) whole++;
  pass++;
})));
console.log('  ' + total + ' kartu berkanji diperiksa; ' + whole + ' memakai satu ruby utuh (fallback aman)');

console.log('Furigana: ' + pass + ' lulus, ' + fail + ' gagal');
if (fail) { bad.slice(0, 30).forEach(b => console.log('  ✗ ' + b)); process.exit(1); }
console.log('LULUS — bacaan furigana selalu sama dengan data.');
