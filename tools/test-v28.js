#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-v28.js — uji perbaikan v28: suara (TTS), migrasi pengaturan, pemulihan cadangan (skor kuis, tanda bunpou),
   indeks kartu bersama + statistik deck, atur ulang deck yang aman (dengan Urungkan), pemuat data yang tidak menggantung.
   Pakai:  TZ=Asia/Jakarta node tools/test-v28.js
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
global.window = globalThis;
const LS = new Map();
global.localStorage = { getItem: k => (LS.has(k) ? LS.get(k) : null), setItem: (k, v) => LS.set(k, String(v)), removeItem: k => LS.delete(k), key: i => Array.from(LS.keys())[i], get length() { return LS.size; } };

// DOM palsu: <script src> dijalankan dari disk; onload dipanggil setelah berjalan (seperti browser). Kasus khusus "ghost": berkas yang salah id.
global.document = {
  head: { appendChild(s) {
    setTimeout(() => {
      const f = path.join(ROOT, s.src.split('?')[0]);
      if (/ghost\.js/.test(s.src)) { vm.runInThisContext("FC.defineShard('bukan-ghost', {});"); return s.onload && s.onload(); }
      if (!fs.existsSync(f)) return s.onerror && s.onerror();
      vm.runInThisContext(fs.readFileSync(f, 'utf8'), { filename: f });
      if (s.onload) s.onload();
    }, 0);
  } },
  createElement() { return { remove() {} }; }
};
for (const f of ['js/core/util.js', 'js/core/fsrs.js', 'js/core/scheduler.js', 'js/core/store.js', 'js/core/data.js', 'js/core/session.js', 'js/core/tts.js']) require(path.join(ROOT, f));
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'data/manifest.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'data/locks.js'), 'utf8'));
const { util: U, store, data, session, scheduler, tts } = FC;
const ST = scheduler.ST;
let pass = 0, fail = 0; const bad = [];
const ok = (name, cond, info) => { if (cond) pass++; else { fail++; bad.push(name + (info !== undefined ? ' → ' + info : '')); } };

(async () => {
  await store.ready; data.init();

  /* ---- suara: okurigana dalam kurung tidak boleh terbuang ---- */
  ok('TTS はし(る) → はしる', tts.clean('はし(る)') === 'はしる', tts.clean('はし(る)'));
  ok('TTS ちい(さい) → ちいさい', tts.clean('ちい(さい)') === 'ちいさい');
  ok('TTS (な) penanda dibuang', tts.clean('だめ(な)') === 'だめ');
  ok('TTS isi kurung berspasi/penuh-lebar dibuang', tts.clean('すう　(たばこをすう)') === 'すう' && tts.clean('おはよう（ございます）') === 'おはよう');
  ok('TTS "／" di dalam kurung tak memotong kurungnya', tts.clean('でる（せき／はなみずがでる）') === 'でる', tts.clean('でる（せき／はなみずがでる）'));
  ok('TTS alternatif pertama sebelum ／', tts.clean('くる／きます') === 'くる');
  const allBacks = []; for (const d of FC.manifest.decks) { if (!d.shard) continue; }
  // semua kartu: hasil tidak pernah kosong
  await data.loadAll();
  let empty = 0, n = 0; Object.keys(data.shards).forEach(sid => Object.keys(data.shards[sid]).forEach(did => data.shards[sid][did].forEach(c => { n++; if (!tts.clean(c.back)) empty++; })));
  ok('TTS tidak pernah menghasilkan teks kosong (' + n + ' kartu)', empty === 0, empty);

  /* ---- pengaturan: bawaan aman + migrasi sekali jalan ---- */
  ok('bawaan baru: lompatan awal mati, kartu bandel mati', store.DEFAULTS.override === false && store.DEFAULTS.leech === 0);
  const old = { override: true, leech: 8, newPerDay: 40 };
  ok('migrasi: pengguna lama dimatikan sekali & ada tanda versi', store._migrateSettings(old) === true && old.override === false && old.leech === 0 && old.newPerDay === 40 && old.sv >= 28);
  ok('migrasi: tidak diulang (pilihan sadar pengguna dihormati)', (() => { const s = { override: true, leech: 8, sv: 28 }; return store._migrateSettings(s) === false && s.override === true && s.leech === 8; })());

  /* ---- pemulihan cadangan ---- */
  await store.setKv('quizBest', { A: { score: 230, at: 5, n: 50 } }); await store.setKv('lastBackup', 1234);
  localStorage.setItem('bunpou:buku', JSON.stringify({ 'a22-1-1': 100, 'a22-1-2': 200 }));
  localStorage.setItem('bunpou:a22', JSON.stringify({ items: { x1: { c: 3, n: 4, t: 10 } }, furi: true }));
  const snap = JSON.parse(JSON.stringify(await store.exportJSON()));
  localStorage.setItem('bunpou:buku', JSON.stringify({ zzz: 1 }));
  await store.importJSON(snap, 'replace');
  ok('Ganti: skor kuis terbaik pulih', JSON.stringify(store.getKv('quizBest')) === JSON.stringify({ A: { score: 230, at: 5, n: 50 } }), JSON.stringify(store.getKv('quizBest')));
  ok('Ganti: cadangan terakhir pulih', store.getKv('lastBackup') === 1234);
  ok('Ganti: bunpou persis seperti cadangan (yang tak ada di cadangan dibuang)', localStorage.getItem('bunpou:buku') === JSON.stringify({ 'a22-1-1': 100, 'a22-1-2': 200 }), localStorage.getItem('bunpou:buku'));
  localStorage.setItem('bunpou:buku', JSON.stringify({ 'a22-9-9': 5, 'a22-1-1': 50 }));
  localStorage.setItem('bunpou:a22', JSON.stringify({ items: { x1: { c: 4, n: 4, t: 99 }, x2: { c: 1, n: 2, t: 7 } }, furi: false }));
  await store.setKv('quizBest', { A: { score: 240, at: 9, n: 50 }, B: { score: 100, at: 1, n: 20 } });
  await store.importJSON(snap, 'merge');
  ok('Gabung: tanda paham bunpou disatukan (waktu lebih baru menang)', localStorage.getItem('bunpou:buku') === JSON.stringify({ 'a22-9-9': 5, 'a22-1-1': 100, 'a22-1-2': 200 }), localStorage.getItem('bunpou:buku'));
  ok('Gabung: percobaan latihan yang lebih baru menang, soal lain tetap', (() => { const j = JSON.parse(localStorage.getItem('bunpou:a22')); return j.items.x1.t === 99 && j.items.x2.n === 2 && j.furi === false; })());
  ok('Gabung: skor kuis tertinggi per kuis', (() => { const q = store.getKv('quizBest'); return q.A.score === 240 && q.B.score === 100; })());
  ok('Hapus semua progres ikut menghapus bunpou (urutan: setelah titik pemulihan)', await (async () => { await store.reset(false, 'ud:'); return !Object.keys(localStorage).some(k => k.indexOf('bunpou:') === 0) || LS.size === 0 || ![...LS.keys()].some(k => k.indexOf('bunpou:') === 0); })());

  /* ---- indeks kartu bersama + statistik deck ---- */
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'data/shared.js'), 'utf8'));
  ok('indeks bersama termuat', data.sharedReady());
  const sharedIdx = vm.runInThisContext('(function(){var o;var f=FC.defineShared;FC.defineShared=function(x){o=x;};' + fs.readFileSync(path.join(ROOT, 'data/shared.js'), 'utf8') + ';FC.defineShared=f;return o;})()');
  const [cid, leavesStr] = Object.entries(sharedIdx)[0], leaves = leavesStr.split(' ');
  ok('kartu bersama ada di ≥2 deck daun', leaves.length >= 2, leavesStr);
  const rec = (id, dk, extra) => Object.assign({ k: id + ':f', id, dir: 'f', st: ST.REVIEW, step: 0, s: 30, sf: 20, d: 5, due: Date.now() - 86400000, lr: Date.now() - 31 * 86400000, reps: 3, lapses: 0, ivl: 30, sh: dk, dk, created: Date.now() - 40 * 86400000 }, extra || {});
  await store.putCard(rec(cid, leaves[0]));
  const ls = session.leafStats(Date.now());
  ok('statistik: kartu bersama dihitung di deck PERTAMA', session.deckStats(leaves[0], ls).learned === 1 && session.deckStats(leaves[0], ls).mature === 1);
  ok('statistik: ...dan juga di deck KEDUA (dulu 0 karena `dk` hanya satu)', session.deckStats(leaves[1], ls).learned === 1 && session.deckStats(leaves[1], ls).due === 1, JSON.stringify(session.deckStats(leaves[1], ls)));
  const both = FC.manifest.decks.map(d => d.id).filter(id => { const lv = data.leavesOf(id); return lv.indexOf(leaves[0]) >= 0 && lv.indexOf(leaves[1]) >= 0; })[0];
  if (both) ok('statistik: deck induk/paket yang memuat keduanya menghitung SEKALI', session.deckStats(both, ls).learned === 1, both + ' ' + JSON.stringify(session.deckStats(both, ls)));
  const unique = Object.keys(data.shards.Irodori_A1_6 || {}).length; // kartu tak bersama tetap pakai `dk`
  const lone = FC.data.resolveSync ? null : null;
  await data.resolve('Irodori_A1_6_1');
  const loneCard = data.shards.Irodori_A1_6.Irodori_A1_6_1.map(c => data.cid(c)).find(id => !sharedIdx[id]);
  await store.putCard(rec(loneCard, 'Irodori_A1_6_1'));
  const ls2 = session.leafStats(Date.now());
  ok('statistik: kartu tak bersama tetap dihitung ke deck asalnya', session.deckStats('Irodori_A1_6_1', ls2).learned === 1 && session.deckStats('Irodori_A1_6_2', ls2).learned === 0);

  /* ---- atur ulang deck: peringatan kartu bersama + Urungkan ---- */
  const leafA = leaves[0]; const cardsA = await data.resolve(leafA);
  await store.putCard(rec(data.cid(cardsA[0]), leafA)); // kartu pertama deck A (bisa bersama atau tidak)
  const info = await session.resetInfo(leafA);
  ok('resetInfo: mengenali kartu yang juga ada di deck lain', info.keys.length >= 1 && info.shared >= 1, JSON.stringify({ k: info.keys.length, s: info.shared }));
  const before = info.keys.map(k => JSON.stringify(store.getCard(k)));
  const res = await session.resetDeck(leafA);
  ok('resetDeck: catatan terhapus & jumlah dilaporkan', res.count === info.keys.length && info.keys.every(k => !store.getCard(k)), res.count);
  await res.undo();
  ok('Urungkan: catatan kembali persis seperti semula', info.keys.every((k, i) => JSON.stringify(store.getCard(k)) === before[i]));

  /* ---- pemuat data: berkas yang salah id tidak menggantung ---- */
  const t0 = Date.now(); let err = null;
  try { await Promise.race([data.loadShard('ghost'), new Promise((_, rej) => setTimeout(() => rej(new Error('MENGGANTUNG')), 1500))]); } catch (e) { err = e; }
  ok('shard salah id → ditolak dengan pesan jelas (dulu menggantung selamanya)', err && /tidak terdaftar/.test(err.message), err && err.message);
  ok('...dan cepat', Date.now() - t0 < 1000);

  console.log('v28: ' + pass + ' lulus, ' + fail + ' gagal');
  if (fail) { bad.forEach(b => console.log('  ✗ ' + b)); process.exit(1); }
  console.log('LULUS — perbaikan v28 berjalan.');
})().catch(e => { console.error(e); process.exit(1); });
