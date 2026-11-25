#!/usr/bin/env node
'use strict';
/* tools/test-safety.js — lapisan pengaman penyimpanan (mode memori di Node): catatan hari belajar, gabung cadangan, validasi, reset, jurnal.
   Pakai:  TZ=Asia/Jakarta node tools/test-safety.js */
const path = require('path'), ROOT = path.join(__dirname, '..');
global.window = globalThis;
const LS = new Map();
global.localStorage = { getItem: k => (LS.has(k) ? LS.get(k) : null), setItem: (k, v) => LS.set(k, String(v)), removeItem: k => LS.delete(k), key: i => Array.from(LS.keys())[i], get length() { return LS.size; } };
for (const f of ['js/core/util.js', 'js/core/store.js']) require(path.join(ROOT, f));
const { util: U, store: S } = FC;
let pass = 0, bad = [];
const ok = (n, c, i) => { if (c) pass++; else bad.push(n + (i !== undefined ? ' → ' + i : '')); };
(async () => {
  await S.ready;
  const T = new Date(2026, 0, 15, 9, 0).getTime(), key = U.dayKey(U.dayIndex(T, S.get('rollover')));
  const daily = { day: 1, nw: 1, rv: 0, nb: 0, rb: 0 };
  S.commit({ k: 'a:f', lr: T }, { id: T, k: 'a:f', g: 3, st: 0 }, daily);
  S.commit({ k: 'b:f', lr: T + 1 }, { id: T + 1, k: 'b:f', g: 3, st: 0 }, daily);
  ok('hari belajar bertambah per jawaban', (S.getKv('days') || {})[key] === 2, JSON.stringify(S.getKv('days')));
  S.undo('b:f', null, T + 1, daily);
  ok('undo mengurangi hari belajar', (S.getKv('days') || {})[key] === 1);
  S.undo('a:f', null, T, daily);
  ok('hari kosong dihapus dari catatan', !(S.getKv('days') || {})[key]);
  const bk = { format: 'akatsuki-fc-backup', version: 2, cards: [], log: [], marks: [], kv: { days: { '2026-01-10': 3, '2026-01-11': 2, rusak: 9 } } };
  await S.importJSON(bk, 'merge');
  ok('gabung cadangan: hari belajar masuk, kunci rusak ditolak', S.getKv('days')['2026-01-10'] === 3 && S.getKv('days').rusak === undefined);
  await S.importJSON({ format: 'akatsuki-fc-backup', cards: [], log: [], marks: [], kv: { days: { '2026-01-10': 1, '2026-01-11': 5 } } }, 'merge');
  ok('gabung memakai nilai terbanyak per hari', S.getKv('days')['2026-01-10'] === 3 && S.getKv('days')['2026-01-11'] === 5);
  let err = null; try { await S.importJSON({ format: 'akatsuki-fc-backup', cards: 'x', log: [] }, 'replace'); } catch (e) { err = e; }
  ok('cadangan rusak ditolak sebelum menghapus apa pun', !!err && Object.keys(S.getKv('days')).length === 2, err && err.message);
  S.journal('uji', 'a'); ok('jurnal tercatat', S.getJournal().some(e => e.e === 'uji'));
  ok('mode memori tidak membuat titik pemulihan', (await S.snapshot('auto')) === false && (await S.snapshots()).length === 0);
  await S.reset(false); ok('reset tetap selesai tanpa IndexedDB', !S.getKv('days'));
  console.log(bad.length ? 'GAGAL:\n  ' + bad.join('\n  ') : 'semua lulus'); console.log(pass + ' lulus, ' + bad.length + ' gagal');
  process.exit(bad.length ? 1 : 0);
})();
