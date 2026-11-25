#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-all.js — jalankan SEMUA pemeriksaan berurutan dan tampilkan ringkasan. Keluar dengan kode 1 bila ada yang gagal.
   Pakai (sebelum setiap deploy):  node tools/test-all.js
   ===================================================================== */
const { spawnSync } = require('child_process'), path = require('path');
const steps = [
  ['Pemeriksa data (sintaks, struktur, count, kuis, PWA, BUILD)', 'check-data.js'],
  ['FSRS-7 vs vektor referensi', 'test-fsrs.js'],
  ['Penjadwal', 'test-scheduler.js'],
  ['Inti aplikasi (data, sesi, penyimpanan, cadangan)', 'test-core.js'],
  ['Deck buatan pengguna', 'test-userdecks.js'],
  ['Pengaman data', 'test-safety.js'],
  ['Perbaikan v28', 'test-v28.js'],
  ['Furigana', 'test-furigana.js'],
  ['Buku Bunpou', 'verify-buku.js']
];
let failed = 0;
for (const [label, file] of steps) {
  const r = spawnSync(process.execPath, [path.join(__dirname, file)], { encoding: 'utf8', env: Object.assign({}, process.env, { TZ: 'Asia/Jakarta' }) });
  const ok = r.status === 0;
  const last = (r.stdout || '').trim().split('\n').filter(l => /lulus|baik|LULUS|semua|bab ·/i.test(l)).pop() || '';
  console.log((ok ? '✓ ' : '✗ ') + label + (last ? '  —  ' + last.trim() : ''));
  if (!ok) { failed++; console.log((r.stdout || '').split('\n').filter(l => /✗|MASALAH/.test(l) || /^\s+(✗|-)/.test(l)).slice(0, 15).join('\n') + '\n' + (r.stderr || '').split('\n').filter(l => !/^\s+at /.test(l)).slice(0, 6).join('\n')); }
}
console.log(failed ? '\n' + failed + ' pemeriksaan GAGAL.' : '\nSemua pemeriksaan lulus.');
process.exit(failed ? 1 : 0);
