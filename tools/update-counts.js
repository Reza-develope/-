#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/update-counts.js — menyegarkan angka `count` di data/manifest.js setelah kamu
   mengedit/menambah kartu di data/decks/*.js atau soal di data/quiz/*.js.

   Pakai:   node tools/update-counts.js
   Hanya `count` yang berubah. File ditulis ulang dengan format yang sama (satu deck per baris).
   ===================================================================== */
const fs = require('fs');
const path = require('path');
const L = require('./_lib');

const data = L.loadNewData();
const problems = L.checkStructure(data);
if (problems.length) {
  console.error('Struktur data bermasalah, count tidak diubah:');
  problems.forEach(p => console.error('  - ' + p));
  process.exit(1);
}
const m = data.manifest;
const resolver = L.makeResolver(m, data.shards);
let changed = 0;
m.decks.forEach(d => {
  const n = d.soon ? 0 : resolver.resolve(d.id).length;
  if (d.count !== n) { console.log('  ' + d.id + ': ' + d.count + ' → ' + n); d.count = n; changed++; }
});
m.quiz.forEach(x => {
  const n = (data.quizzes.get(x.shard || x.id) || []).length;
  if (x.count !== n) { console.log('  kuis ' + x.id + ': ' + x.count + ' → ' + n); x.count = n; changed++; }
});
fs.writeFileSync(path.join(L.DATA_DIR, 'manifest.js'), L.fmtManifest(m));
console.log(changed ? 'Selesai: ' + changed + ' angka diperbarui.' : 'Semua angka sudah benar.');
