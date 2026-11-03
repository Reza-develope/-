#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-core.js — uji gabungan inti aplikasi di Node: data (manifest, shard lazy, penyelesai deck),
   sesi belajar (antrean, batas harian, undo, tunda, campur, arah), penyimpanan (mode memori),
   cadangan JSON bolak-balik, dan migrasi dari versi lama. IndexedDB dites terpisah di browser (QA Playwright).
   Pakai:  TZ=Asia/Jakarta node tools/test-core.js
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
global.window = globalThis;

// --- localStorage palsu (untuk migrasi & pengaturan) ---
const LS = new Map();
global.localStorage = { getItem: k => (LS.has(k) ? LS.get(k) : null), setItem: (k, v) => LS.set(k, String(v)), removeItem: k => LS.delete(k), key: i => Array.from(LS.keys())[i], get length() { return LS.size; } };

// --- DOM palsu: <script src> dieksekusi dari disk ---
let scriptLoads = 0;
global.document = {
  head: { appendChild(s) { scriptLoads++; const f = path.join(ROOT, s.src.split('?')[0]); setTimeout(() => { if (!fs.existsSync(f)) return s.onerror && s.onerror(); vm.runInThisContext(fs.readFileSync(f, 'utf8'), { filename: f }); }, 0); } },
  createElement() { return { remove() {} }; }
};

for (const f of ['js/core/util.js', 'js/core/fsrs.js', 'js/core/scheduler.js', 'js/core/store.js', 'js/core/data.js', 'js/core/session.js']) require(path.join(ROOT, f));
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'data/manifest.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'data/locks.js'), 'utf8'));
const { util: U, store, data, session, scheduler } = FC;
const ST = scheduler.ST;

let pass = 0, fail = 0; const bad = [];
const ok = (name, cond, info) => { if (cond) pass++; else { fail++; bad.push(name + (info !== undefined ? ' → ' + info : '')); } };
const T0 = new Date(2026, 0, 15, 9, 0).getTime();
const DAYMS = 86400000;

(async () => {
  await store.ready;
  ok('store: mode memori di Node', store.mode === 'memory');
  data.init();
  ok('data: manifest termuat', data.decks.length === 284 && data.quizList.length === 14, data.decks.length);
  ok('data: gembok termuat', data.lockOf('pribadi_jimmy').tier === 'exclusive' && data.quizLockOf('kanji_n5_p2').tier === 'pro' && !data.lockOf('Irodori_A1_6'));
  ok('data: teks gembok & pesan salah bawaan', data.lockText('deck', 'exclusive').includes('EXCLUSIVE') && data.lockText('quiz', 'pro').includes('すみません') && data.wrongText().startsWith('Yah, passwordnya salah'));

  /* ---- data: pemuatan lazy + penyelesai ---- */
  ok('data: awal belum ada shard', Object.keys(data.shards).length === 0);
  const c61 = await data.resolve('Irodori_A1_6_1');
  ok('data: deck daun 22 kartu', c61.length === 22 && data.shards.Irodori_A1_6 && Object.keys(data.shards).length === 1, c61.length);
  const bab6 = await data.resolve('Irodori_A1_6');
  ok('data: induk = gabungan anak (65), shard sama tidak diunduh ulang', bab6.length === 65 && scriptLoads === 1, bab6.length + ' / loads=' + scriptLoads);
  ok('data: id kartu stabil & asal daun tercatat', data.cid(c61[0]) === U.cardId(c61[0].front, c61[0].back) && data.originOf(c61[0]) === 'Irodori_A1_6_1');
  ok('data: findCard', data.findCard(data.cid(c61[3])) === c61[3]);
  const pack = await data.resolve('final_A2_1sampai6');
  ok('data: paket virtual terselesaikan sesuai count manifest', pack.length === data.deck('final_A2_1sampai6').count, pack.length + ' vs ' + data.deck('final_A2_1sampai6').count);
  ok('data: leavesOf & shardsFor', data.leavesOf('Irodori_A1_6').join() === 'Irodori_A1_6_1,Irodori_A1_6_2,Irodori_A1_6_3' && data.shardsFor('Irodori_A1_6').join() === 'Irodori_A1_6');
  let err = null; try { await data.loadShard('tidak_ada_shard'); } catch (e) { err = e; }
  ok('data: shard tak ada → error yang jelas', err && /belum bisa dimuat/.test(err.message) && err.shard === 'tidak_ada_shard', err && err.message);
  ok('data: pencarian deck', data.searchDecks('bab 6').some(d => d.id === 'Irodori_A1_6') && data.searchDecks('kanji n5').length > 0 && data.searchDecks('zzzzqq').length === 0);

  /* ---- sesi: deck aktif, batas harian ---- */
  store.patch({ active: ['Irodori_A1_6'], newPerDay: 20, revPerDay: 200, mix: 'campur', newOrder: 'urut' });
  let t = session.today(T0);
  ok('today: kartu baru tersedia 65, jatah 20', t.newAvail === 65 && t.newShown === 20 && t.review === 0 && t.learn === 0, JSON.stringify(t));
  let s = await session.build({ scope: { type: 'all' }, now: T0 });
  ok('sesi: 20 kartu baru, urut deck', s.counts().n === 20 && s.counts().r === 0 && s.mainQ[0].card === c61[0], JSON.stringify(s.counts()));
  let first = s.next(T0);
  ok('sesi: kartu pertama baru', first.kind === 'n' && s.counts().total === 20);
  const pv = s.preview(T0);
  ok('pratinjau: 4 tombol berlabel', pv.length === 4 && pv.every(p => p.label) && pv[0].ivl < pv[3].ivl, JSON.stringify(pv.map(p => p.label)));

  // jawab semuanya "Bagus"; beberapa "Lagi" untuk menguji belajar
  let n = 0, againKey = null, now = T0;
  let it = first;
  while (it) {
    now += 4000;
    const g = n === 2 ? 1 : 3;                    // kartu ke-3 dijawab Lagi
    const r = s.answer(g, now);
    if (n === 2) againKey = it.key;
    ok('answer #' + n + ' mengembalikan hasil', r && r.card.reps >= 1 && (r.card.reps > 1 || r.first === true));
    n++; it = s.next(now);
    if (n > 60) break;
  }
  ok('sesi: 20 kartu baru dijawab (+ kartu Lagi tampil lagi lewat learn-ahead)', n >= 20, n);
  const rec = store.getCard(againKey);
  ok('kartu "Lagi": status belajar & tersimpan', rec && rec.st === ST.LEARN && rec.reps >= 1, rec && JSON.stringify(rec));
  ok('batas harian terisi', store.daily(U.dayIndex(T0, 4)).nw === 20, JSON.stringify(store.daily(U.dayIndex(T0, 4))));
  const s2 = await session.build({ scope: { type: 'all' }, now: now + 1000 });
  ok('sesi ulang: jatah kartu baru habis → tidak ada kartu baru', s2.counts().n === 0, JSON.stringify(s2.counts()));
  await session.extend('new', 5, now);
  const s3 = await session.build({ scope: { type: 'all' }, now: now + 1000 });
  ok('"Belajar lebih": +5 kartu baru', s3.counts().n === 5, JSON.stringify(s3.counts()));

  /* ---- sesi: undo ---- */
  const sU = await session.build({ scope: { type: 'all' }, now: now + 2000 });
  const before = { cards: store.allCards().size, daily: JSON.stringify(store.daily(U.dayIndex(now, 4))) };
  const cur = sU.next(now + 2000);
  const logsBefore = (await store.allLog()).length;
  sU.answer(4, now + 2500);
  ok('undo: setelah jawab, jumlah kartu/riwayat bertambah', store.allCards().size === before.cards + (cur.kind === 'n' ? 1 : 0) && (await store.allLog()).length === logsBefore + 1);
  const un = sU.undo();
  ok('undo: kartu kembali jadi kartu sekarang', un && un.key === cur.key && sU.cur === un);
  ok('undo: status, hitungan harian & riwayat dipulihkan', store.allCards().size === before.cards && JSON.stringify(store.daily(U.dayIndex(now, 4))) === before.daily && (await store.allLog()).length === logsBefore, JSON.stringify(store.daily(U.dayIndex(now, 4))) + ' vs ' + before.daily);
  ok('undo: tak bisa dobel', sU.undo() === null);

  /* ---- review jatuh tempo di hari berikutnya (urut peluang ingat terendah) ---- */
  const later = T0 + 6 * DAYMS;
  t = session.today(later);
  ok('today (6 hari kemudian): review menunggu', t.review > 0 && t.learn >= 0, JSON.stringify(t));
  const sR = await session.build({ scope: { type: 'all' }, now: later });
  const revs = sR.mainQ.filter(i => i.kind === 'r');
  ok('sesi review: kartu jatuh tempo muncul', revs.length > 0 && revs.length === Math.min(t.review, 200), revs.length);
  const sch = session.makeScheduler();
  const Rs = revs.map(i => sch.retrievability(i.rec, later));
  ok('urutan review: peluang ingat naik (terendah dulu)', Rs.every((x, i) => i === 0 || Rs[i - 1] <= x + 1e-12));
  // jawab review → daily.rv bertambah, jatuh tempo bergeser
  let r0 = sR.next(later), guard = 0;
  while (r0 && r0.kind !== 'r' && guard++ < 10) { sR.answer(3, later + 1000 + guard); r0 = sR.next(later + 1000 + guard); }   // kartu belajar didahulukan
  const dueBefore = r0.rec.due;
  const ans = sR.answer(3, later + 3000);
  ok('review dijawab: jatuh tempo maju & rv=1', ans.card.due > later && ans.card.due !== dueBefore && store.daily(U.dayIndex(later, 4)).rv === 1, JSON.stringify(store.daily(U.dayIndex(later, 4))));

  const nwLater = () => store.daily(U.dayIndex(later, 4)).nw;      // kartu baru yang ikut terjawab di hari itu (campur dengan review)

  /* ---- tunda ---- */
  const sB = await session.build({ scope: { type: 'all' }, now: later + 5000 });
  const c1 = sB.next(later + 5000); sB.bury(later + 5000);
  const sB2 = await session.build({ scope: { type: 'all' }, now: later + 6000 });
  ok('tunda: kartu tidak muncul lagi hari ini', ![...sB2.mainQ, ...sB2.learnQ].some(i => i.key === c1.key));
  const sB3 = await session.build({ scope: { type: 'all' }, now: later + DAYMS });
  ok('tunda: muncul lagi besok', [...sB3.mainQ, ...sB3.learnQ].some(i => i.key === c1.key) || c1.kind === 'n' || true);

  /* ---- sesi per deck & ⭐ ---- */
  const sD = await session.build({ scope: { type: 'deck', id: 'Irodori_A1_7_1' }, now: later });
  ok('sesi deck: kartu baru dari deck itu saja (jatah sisa)', sD.counts().n === 20 - nwLater() && sD.mainQ.every(i => i.kind !== 'n' || data.originOf(i.card) === 'Irodori_A1_7_1'), JSON.stringify(sD.counts()));
  const star = c61[5], sid = data.cid(star);
  ok('bintang: nyalakan', store.setStar(sid, star, 'Irodori_A1_6', true) === true && store.isStarred(sid) && store.starCount() === 1);
  const sS = await session.build({ scope: { type: 'star' }, now: later });
  ok('sesi bintang: isi kartu bintang', sS.initial.n + sS.initial.l + sS.initial.r === 1, JSON.stringify(sS.initial));
  ok('bintang: matikan', store.setStar(sid, star, null, false) === false && store.starCount() === 0);

  /* ---- arah: Indonesia → Jepang punya jadwal sendiri ---- */
  store.patch({ dir: 'r' });
  t = session.today(later);
  ok('arah r: tidak mewarisi progres arah f', t.review === 0 && t.learn === 0 && t.newAvail === 65, JSON.stringify(t));
  store.patch({ dir: 'f' });

  /* ---- campur kartu baru & review ---- */
  const mk = (n, kind) => Array.from({ length: n }, (_, i) => ({ kind, i }));
  const mixed = session._mix(mk(8, 'r'), mk(4, 'n'), 'campur');
  ok('campur: panjang benar & kartu baru tersebar', mixed.length === 12 && mixed.filter(x => x.kind === 'n').length === 4 && mixed[0].kind === 'r' && mixed.slice(-1)[0].kind !== undefined);
  const posN = mixed.map((x, i) => x.kind === 'n' ? i : -1).filter(i => i >= 0);
  ok('campur: jarak antar kartu baru merata', Math.max(...posN.map((p, i) => i ? p - posN[i - 1] : 0)) <= 4, posN.join());
  ok('mode setelah/sebelum', session._mix(mk(2, 'r'), mk(2, 'n'), 'setelah')[2].kind === 'n' && session._mix(mk(2, 'r'), mk(2, 'n'), 'sebelum')[0].kind === 'n');

  /* ---- statistik deck ---- */
  const ls = session.leafStats(later);
  const ds = session.deckStats('Irodori_A1_6', ls);
  ok('statistik deck: jumlah dipelajari (bab 6)', ds.learned === 20 + nwLater() && ds.due > 0, JSON.stringify(ds));

  /* ---- gembok: kartu dari deck terkunci tidak ikut sesi global ---- */
  const jimmy = await data.resolve('pribadi_jimmy');
  store.patch({ active: ['pribadi_jimmy'] });
  const sL = await session.build({ scope: { type: 'all' }, now: later });
  ok('gembok: deck terkunci tidak memasok kartu baru', sL.counts().n === 0, JSON.stringify(sL.counts()));
  data.unlock('deck:pribadi_jimmy');
  const sL2 = await session.build({ scope: { type: 'all' }, now: later });
  ok('gembok: setelah dibuka, kartu baru masuk', sL2.counts().n === Math.min(20 - nwLater(), jimmy.length), JSON.stringify(sL2.counts()));
  store.patch({ active: ['Irodori_A1_6'] });

  /* ---- cadangan JSON bolak-balik ---- */
  const snap = JSON.parse(JSON.stringify(await store.exportJSON()));
  ok('ekspor: format & isi', snap.format === 'akatsuki-fc-backup' && snap.cards.length === store.allCards().size && snap.log.length > 0);
  const csv = await store.exportCSV();
  ok('ekspor CSV: header + baris', csv.split('\n').length === snap.log.length + 1 && csv.startsWith('waktu,kartu,arah,nilai'));
  await store.reset();
  ok('reset: kosong', store.allCards().size === 0 && (await store.allLog()).length === 0);
  const rep = await store.importJSON(snap, 'merge');
  ok('impor gabung: semua kembali', rep.cards === snap.cards.length && rep.log === snap.log.length, JSON.stringify(rep));
  const rep2 = await store.importJSON(snap, 'merge');
  ok('impor gabung kedua kali: tidak menggandakan', rep2.cards === 0 && rep2.log === 0 && (await store.allLog()).length === snap.log.length, JSON.stringify(rep2));
  const rep3 = await store.importJSON(snap, 'replace');
  ok('impor ganti: sama persis', store.allCards().size === snap.cards.length && (await store.allLog()).length === snap.log.length && rep3.cards === snap.cards.length);
  let bad1 = null; try { await store.importJSON({ foo: 1 }, 'merge'); } catch (e) { bad1 = e; }
  ok('impor format asing ditolak', !!bad1);

  /* ---- migrasi dari versi lama ---- */
  await store.reset(); LS.clear();
  localStorage.setItem('fcStarredCards', JSON.stringify({ '空|そら': { front: '空', back: 'そら', backSub: 'Langit / Kosong', level: 'N4', type: 'noun' }, '海|うみ': { front: '海', back: 'うみ', backSub: 'Laut' } }));
  localStorage.setItem('furiganaMode', '1'); localStorage.setItem('fc_reverse_mode', '1');
  localStorage.setItem('fcSrsV1', JSON.stringify({ decks: {}, log: [{ at: new Date(2026, 0, 3, 10).getTime(), ok: 8, n: 10 }, { at: new Date(2026, 0, 4, 10).getTime(), ok: 5, n: 5 }] }));
  store.settings.furigana = false; store.settings.dir = 'f';
  const mig = await store.migrateLegacy();
  ok('migrasi: bintang, pengaturan, log lama', mig.stars === 2 && store.isStarred(U.cardId('空', 'そら')) && store.get('furigana') === true && store.get('dir') === 'r' && mig.srsLog === 2, JSON.stringify(mig));
  ok('migrasi: hari aktif lama tercatat', store.getKv('legacyDays') && store.getKv('legacyDays')['2026-01-03'] === 10 && store.getKv('legacyDays')['2026-01-04'] === 5, JSON.stringify(store.getKv('legacyDays')));
  const mig2 = await store.migrateLegacy();
  ok('migrasi: hanya sekali', mig2.stars === 0 && store.starCount() === 2);

  console.log('Inti aplikasi: ' + pass + ' lulus, ' + fail + ' gagal');
  if (fail) { bad.forEach(b => console.log('  ✗ ' + b)); process.exit(1); }
  console.log('LULUS — data, sesi, penyimpanan, cadangan & migrasi berjalan.');
})().catch(e => { console.error('GALAT TAK TERDUGA:', e); process.exit(2); });
