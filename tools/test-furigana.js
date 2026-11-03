#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-furigana.js — uji banding: mesin furigana BARU harus menghasilkan HTML yang sama persis
   dengan mesin LAMA untuk setiap kartu di data/ (dan beberapa kasus angka/tanggal).
   Pakai:  node tools/test-furigana.js "<folder aplikasi lama>"
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require('./_lib');
const oldDir = process.argv[2];
if (!oldDir) { console.error('Pakai: node tools/test-furigana.js "<folder aplikasi lama>"'); process.exit(1); }

// --- mesin lama, dijalankan di sandbox dengan DOM palsu dan furiganaMode = true ---
const fake = () => ({ classList: { toggle() {}, add() {}, remove() {} }, addEventListener() {}, setAttribute() {}, getAttribute() { return null; }, innerText: '' });
const sandbox = { localStorage: { getItem: () => '1', setItem() {} }, document: { getElementById: fake, querySelectorAll: () => [] }, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(oldDir, 'js/furigana.js'), 'utf8'), sandbox);
const oldRender = vm.runInContext('(function(f,b){return fcRenderFurigana(f,b)})', sandbox);

// --- mesin baru ---
global.window = global; global.FC = {};
require('../js/core/furigana-data.js'); require('../js/core/furigana.js');
const newRender = FC.furigana.render;

const data = L.loadNewData();
const pairs = new Map();
for (const sh of data.shards.values()) for (const id of Object.keys(sh)) for (const c of sh[id]) pairs.set(c.front + '\u0001' + c.back, [c.front, c.back]);
['3日|みっか', '20日|はつか', '100円|ひゃくえん', '1,000円|せんえん', '2人|ふたり', '今日|きょう', '着る|きる', '着る|き(る)', '学校|がっこう', '日本語|にほんご', '食べ物|たべもの', 'ABC|えーびーしー', '|', '漢字|']
  .forEach(s => { const [f, b] = s.split('|'); pairs.set(f + '\u0001' + b, [f, b]); });

let diff = 0, n = 0, withRuby = 0; const shown = [];
for (const [f, b] of pairs.values()) {
  n++;
  const a = oldRender(f, b), c = newRender(f, b);
  if (a.includes('<ruby')) withRuby++;
  if (a !== c) { diff++; if (shown.length < 8) shown.push(JSON.stringify([f, b, a, c])); }
}
console.log('pasangan diuji:', n, '| yang berfurigana:', withRuby, '| beda:', diff);
if (diff) { shown.forEach(s => console.log('  ✗ ' + s)); process.exit(1); }
console.log('LULUS — furigana baru identik dengan yang lama.');
