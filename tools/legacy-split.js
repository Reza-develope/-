#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/legacy-split.js — mengubah data aplikasi LAMA (js/flashcard-data.js, js/quiz-data.js,
   menu di index.html, kata sandi di flashcard.js/quiz.js) menjadi susunan BARU yang dimuat
   per bagian (lazy):  data/manifest.js, data/locks.js, data/decks/*.js, data/quiz/*.js

   Pakai:   node tools/legacy-split.js "<folder aplikasi lama>"
   Aman dijalankan ulang (hasilnya selalu sama). Hanya menimpa berkas hasil buatannya sendiri.
   Sesudahnya jalankan:  node tools/verify-data.js "<folder aplikasi lama>"
   ===================================================================== */
const fs = require('fs');
const path = require('path');
const L = require('./_lib');

const origArg = process.argv[2];
if (!origArg) { console.error('Pakai: node tools/legacy-split.js "<folder aplikasi lama>"'); process.exit(1); }
const T = L.readLegacy(path.resolve(origArg));
const { D, Q, fcMenu, mcMenu, locks } = T;

const report = { dupRemoved: [], sameKeyDiff: [], notes: [] };
const menu = new Map();
fcMenu.forEach(m => { if (!menu.has(m.id)) menu.set(m.id, m); });
const cardsOf = id => (D[id] || []);

/* ---- sanity: semua deck berisi kartu harus ada di menu lama (kalau tidak, deck itu tak akan tampil) ---- */
Object.keys(D).forEach(id => { if (cardsOf(id).length && !menu.has(id)) throw new Error('deck "' + id + '" punya kartu tapi tidak ada di menu index.html lama'); });

/* ---- util: dedupe duplikat PERSIS (isi sama) di dalam satu deck daun; catat yang kuncinya sama tapi isi beda ---- */
function dedupeLeaf(deckId, list) {
  const seenSig = new Set(), firstByKey = new Map(), out = [];
  list.forEach(c => {
    const sig = L.cardSig(c), key = L.cardKey(c);
    if (seenSig.has(sig)) { report.dupRemoved.push(deckId + ': ' + key); return; }
    seenSig.add(sig);
    if (firstByKey.has(key)) report.sameKeyDiff.push(deckId + ': ' + key + '  [' + firstByKey.get(key).backSub + '] vs [' + c.backSub + ']');
    else firstByKey.set(key, c);
    out.push(c);
  });
  return out;
}

/* ---- struktur keluaran ---- */
const shards = new Map();            // shardId -> { label, decks: [[leafId, cards]] }
const addLeaf = (shardId, label, leafId, cards) => {
  if (!shards.has(shardId)) shards.set(shardId, { label, decks: [] });
  shards.get(shardId).decks.push([leafId, cards]);
};
const decksByGroup = { a1: [], a2: [], a22: [], kanji: [], lainnya: [], pribadi: [] };
const ob = (o) => { Object.keys(o).forEach(k => o[k] === undefined && delete o[k]); return o; };

/* ---- 1) keluarga bab: Irodori_A1/A2/A3_<n> (+ _<part>) dan kanji_idr_A22_7 ---- */
const famRe = /^(Irodori_A([123])_(\d+)|kanji_idr_A22_7)(?:_(\d+))?$/;
const fams = new Map();
Object.keys(D).forEach(id => {
  const m = famRe.exec(id); if (!m) return;
  const f = fams.get(m[1]) || fams.set(m[1], { id: m[1], level: m[2], n: m[3] ? +m[3] : 0, parts: [], full: null }).get(m[1]);
  if (m[4]) f.parts.push({ id, n: +m[4] }); else f.full = id;
});
const LEVEL_GROUP = { 1: 'a1', 2: 'a2', 3: 'a22' }, LEVEL_NAME = { 1: 'Irodori A1', 2: 'Irodori A2', 3: 'Irodori A2.2' };
const chapterCards = new Map();      // chapterId -> kartu terselesaikan (gabungan bagian, unik per kunci)
const chapterDecks = { a1: [], a2: [], a22: [], kanji: [] };

[...fams.values()].sort((a, b) => (a.level || 'z').localeCompare(b.level || 'z') || a.n - b.n).forEach(f => {
  f.parts.sort((a, b) => a.n - b.n);
  const isKanji = f.id === 'kanji_idr_A22_7';
  const group = isKanji ? 'kanji' : LEVEL_GROUP[f.level];
  const label = isKanji ? 'Kanji A2.2 · bab 7' : LEVEL_NAME[f.level] + ' · Bab ' + f.n;
  const list = [];
  if (!f.parts.length) {
    if (!f.full) throw new Error('keluarga ' + f.id + ' tanpa deck penuh');
    const cards = dedupeLeaf(f.full, cardsOf(f.full));
    addLeaf(f.id, label, f.full, cards);
    list.push(ob({ id: f.full, group, title: 'Bab ' + f.n, shard: f.id }));
    chapterCards.set(f.id, L.dedupeByKey(cards));
  } else {
    if (f.full) {   // deck penuh lama HARUS sama persis dengan gabungan bagiannya, kalau tidak berhenti
      const a = cardsOf(f.full).map(L.cardSig), b = f.parts.flatMap(p => cardsOf(p.id)).map(L.cardSig);
      if (a.length !== b.length || a.some((x, i) => x !== b[i])) throw new Error('deck penuh ' + f.full + ' TIDAK sama dengan gabungan bagiannya — perlu keputusan manual');
    }
    const kids = [];
    const resolved = [];
    f.parts.forEach(p => {
      const cards = dedupeLeaf(p.id, cardsOf(p.id));
      addLeaf(f.id, label, p.id, cards);
      kids.push(ob({ id: p.id, group, title: 'Part ' + p.n, shard: f.id, parent: f.id }));
      resolved.push(...cards);
    });
    chapterCards.set(f.id, L.dedupeByKey(resolved));
    if (isKanji) list.push(ob({ id: f.id, group, title: 'Kanji A2.2', sub: 'bab 7', children: kids.map(k => k.id) }));
    else list.push(ob({ id: f.id, group, title: 'Bab ' + f.n, children: kids.map(k => k.id) }));
    list.push(...kids);
  }
  (chapterDecks[group] = chapterDecks[group] || []).push(...list);
});

/* ---- 2) paket gabungan (range): virtual kalau isinya SAMA PERSIS dengan gabungan bab, kalau tidak simpan sebagai deck sendiri ---- */
const PACKS = [
  { id: 'final_A2_1sampai18', group: 'a2', title: 'Semua bab 1–18', ofPacks: ['final_A2_1sampai6', 'final_A2_7sampai12', 'final_A2_13sampai18'] },
  { id: 'final_A2_1sampai6', group: 'a2', title: 'Bab 1–6', chapters: [1, 6], pre: 'Irodori_A2_' },
  { id: 'final_A2_7sampai12', group: 'a2', title: 'Bab 7–12', chapters: [7, 12], pre: 'Irodori_A2_' },
  { id: 'final_A2_13sampai18', group: 'a2', title: 'Bab 13–18', chapters: [13, 18], pre: 'Irodori_A2_' },
  { id: 'A3_1sampai6', group: 'a22', title: 'Bab 1–6', chapters: [1, 6], pre: 'Irodori_A3_' },
  { id: 'A3_7sampai12', group: 'a22', title: 'Bab 7–12', chapters: [7, 12], pre: 'Irodori_A3_' },
  { id: 'A3_13sampai18', group: 'a22', title: 'Bab 13–18', chapters: [13, 18], pre: 'Irodori_A3_' }
];
const packResolved = new Map();      // id -> kartu terselesaikan (sudah dengan revisi)
const packVirtual = new Map();       // id -> true/false
const packPatch = new Map();         // id -> jumlah kartu revisi
const packInfo = [];
// urutan pengerjaan: paket bab dulu, baru "Semua bab"
[...PACKS].sort((a, b) => (a.ofPacks ? 1 : 0) - (b.ofPacks ? 1 : 0)).forEach(p => {
  if (!D[p.id] || !D[p.id].length) throw new Error('paket ' + p.id + ' kosong/tidak ada di data lama');
  let kids;
  if (p.ofPacks) kids = p.ofPacks;
  else { kids = []; for (let n = p.chapters[0]; n <= p.chapters[1]; n++) if (chapterCards.has(p.pre + n)) kids.push(p.pre + n); }
  const union = L.dedupeByKey(kids.flatMap(k => p.ofPacks ? packResolved.get(k) : chapterCards.get(k)));
  const unionMap = new Map(union.map(c => [L.cardKey(c), c]));
  const packFirst = new Map();
  cardsOf(p.id).forEach(c => { const k = L.cardKey(c); if (!packFirst.has(k)) packFirst.set(k, c); });
  const onlyInPack = [...packFirst.keys()].filter(k => !unionMap.has(k)).length;
  const onlyInUnion = [...unionMap.keys()].filter(k => !packFirst.has(k)).length;
  const diffCards = [...packFirst].filter(([k, c]) => unionMap.has(k) && L.cardSig(c) !== L.cardSig(unionMap.get(k))).map(([, c]) => c);
  // Virtual = himpunan kunci persis sama dengan gabungan anak. Isi yang berbeda (arti yang digabung manual) disimpan sebagai REVISI kecil.
  const virtual = onlyInPack === 0 && onlyInUnion === 0;
  packVirtual.set(p.id, virtual);
  packInfo.push(p.id + ': ' + (virtual ? 'VIRTUAL (gabungan ' + kids.length + ' anak, ' + union.length + ' kartu) + ' + diffCards.length + ' kartu revisi' : 'DISIMPAN SENDIRI (himpunan kunci beda)') + '  [kunci hanya di paket=' + onlyInPack + ', hanya di gabungan=' + onlyInUnion + ', paket lama=' + cardsOf(p.id).length + ' entri]');
  if (virtual) {
    packPatch.set(p.id, diffCards.length);
    if (diffCards.length) addLeaf(p.id, 'Revisi arti pada paket ' + p.title + ' (' + (p.group === 'a2' ? 'Irodori A2' : 'Irodori A2.2') + ') — menggantikan kartu berkunci sama dari bab-babnya', p.id, diffCards);
    const pm = new Map(diffCards.map(c => [L.cardKey(c), c]));
    packResolved.set(p.id, union.map(c => pm.get(L.cardKey(c)) || c));
  } else {
    const cards = dedupeLeaf(p.id, cardsOf(p.id));
    addLeaf(p.id, 'Paket ' + p.title + ' (' + (p.group === 'a2' ? 'Irodori A2' : 'Irodori A2.2') + ')', p.id, cards);
    packResolved.set(p.id, cards);
  }
  p._kids = kids;
});
const packDeck = p => ob({ id: p.id, group: p.group, title: p.title, sub: 'Gabungan', pack: true,
  children: packVirtual.get(p.id) ? p._kids : undefined, patch: packVirtual.get(p.id) && packPatch.get(p.id) ? p.id : undefined,
  shard: packVirtual.get(p.id) ? undefined : p.id });

/* ---- 3) deck mandiri → shard bertema ---- */
const own = id => { const m = menu.get(id); if (!m) throw new Error('menu lama tidak punya ' + id); return m; };
function leafFromMenu(id, group, shardId, label, extra) {
  const m = own(id);
  addLeaf(shardId, label, id, dedupeLeaf(id, cardsOf(id)));
  return ob(Object.assign({ id, group, title: m.h3, sub: m.span || undefined, shard: shardId }, extra || {}));
}
function soonFromMenu(id, group) { const m = own(id); return ob({ id, group, title: m.h3, sub: m.span || undefined, soon: true }); }

// kanji N5 (100 kanji = 10 part x 10)
const kanjiN5Ids = ['kanji_n5'].concat(Array.from({ length: 9 }, (_, i) => 'kanji_n5_p' + (i + 2)));
const kanjiGroup = [];
kanjiGroup.push(ob({ id: 'kanji_n5_100', group: 'kanji', title: '100 Kanji N5', children: kanjiN5Ids }));
kanjiN5Ids.forEach((id, i) => kanjiGroup.push(leafFromMenu(id, 'kanji', 'kanji_n5_100', '100 Kanji N5', { title: 'Part ' + (i + 1), sub: undefined, parent: 'kanji_n5_100' })));
kanjiGroup.push(leafFromMenu('kanji_idri_12', 'kanji', 'kanji_idri_12', 'Kanji A2 · bab 12', { title: 'Kanji A2', sub: 'bab 12' }));
kanjiGroup.push(...chapterDecks.kanji);
for (let i = 1; i <= 10; i++) kanjiGroup.push(soonFromMenu('kanji_N5_P' + i, 'kanji'));
kanjiGroup.push(ob({ id: 'serupa_tapi_tak_sama', group: 'kanji', title: 'serupa tapi tak sama', children: ['serupa_tapi_tak_sama_p1', 'serupa_tapi_tak_sama_p2'] }));
['serupa_tapi_tak_sama_p1', 'serupa_tapi_tak_sama_p2'].forEach((id, i) => kanjiGroup.push(leafFromMenu(id, 'kanji', 'tematik', 'Deck bertema', { title: 'Part ' + (i + 1), sub: undefined, parent: 'serupa_tapi_tak_sama' })));

// lainnya
const lainnya = [];
['buah_basic', 'buah_improve', 'sayuran_basic', 'sayuran_improve', 'aneka_memakai', 'anggota_tubuh'].forEach(id => lainnya.push(leafFromMenu(id, 'lainnya', 'tematik', 'Deck bertema')));
['keterangan_waktu', 'kata_kerja_P1', 'kata_kerja_P2', 'kata_kerja_P3', 'kata_kerja_P4', 'kata_kerja_P5', 'kata_kerja_P6', 'kata_sifat', 'kata_sifat_P1', 'kata_sifat_P2', 'kata_sifat_P3', 'kata_benda', 'kenjougo', 'sonkeigo'].forEach(id => lainnya.push(soonFromMenu(id, 'lainnya')));

// pribadi
const pribadi = [];
pribadi.push(leafFromMenu('pribadi_admin', 'pribadi', 'pribadi_admin', 'Kamus pribadi (admin)'));
pribadi.push(leafFromMenu('pribadi_jimmy', 'pribadi', 'pribadi_jimmy', 'Kamus pribadi (Jimmy)'));

// urutan tematik dalam shard (sesuai daftar di instruksi)
const tem = shards.get('tematik');
const temOrder = ['buah_basic', 'buah_improve', 'sayuran_basic', 'sayuran_improve', 'aneka_memakai', 'serupa_tapi_tak_sama_p1', 'serupa_tapi_tak_sama_p2', 'anggota_tubuh'];
tem.decks.sort((a, b) => temOrder.indexOf(a[0]) - temOrder.indexOf(b[0]));
tem.label = 'Deck bertema: buah, sayuran, aneka "memakai", serupa tapi tak sama, anggota tubuh';

/* ---- 4) rakit manifest ---- */
const byPackId = Object.fromEntries(PACKS.map(p => [p.id, p]));
const a2Packs = ['final_A2_1sampai18', 'final_A2_1sampai6', 'final_A2_7sampai12', 'final_A2_13sampai18'].map(id => packDeck(byPackId[id]));
const a22Packs = ['A3_1sampai6', 'A3_7sampai12', 'A3_13sampai18'].map(id => packDeck(byPackId[id]));
const decks = [].concat(chapterDecks.a1, a2Packs, chapterDecks.a2, a22Packs, chapterDecks.a22, kanjiGroup, lainnya, pribadi);

const manifest = {
  version: 1,
  groups: [
    { id: 'a1', title: 'Irodori A1', sub: '入門', icon: '📕' },
    { id: 'a2', title: 'Irodori A2', sub: '初級1', icon: '📙' },
    { id: 'a22', title: 'Irodori A2.2', sub: '初級2', icon: '📒' },
    { id: 'kanji', title: 'Kanji', sub: 'N5 & Irodori', icon: '漢' },
    { id: 'lainnya', title: 'Lainnya', sub: 'Tema & kosakata', icon: '💬' },
    { id: 'pribadi', title: 'Pribadi', sub: 'Deck khusus', icon: '🔐' }
  ],
  decks,
  quiz: mcMenu.map(m => { if (!Q[m.id]) throw new Error('menu kuis ' + m.id + ' tanpa data'); return ob({ id: m.id, title: m.h3, sub: m.span || undefined, shard: m.id, count: Q[m.id].length }); })
};
Object.keys(Q).forEach(id => { if (!mcMenu.some(m => m.id === id)) throw new Error('data kuis ' + id + ' tidak ada di menu lama'); });

// hitung `count` lewat penyelesai (leaf = isi shard, induk = gabungan anak tanpa duplikat kunci)
const shardMap = new Map([...shards].map(([sid, s]) => [sid, Object.fromEntries(s.decks)]));
const resolver = L.makeResolver(manifest, shardMap);
manifest.decks.forEach(d => { d.count = d.soon ? 0 : resolver.resolve(d.id).length; });

/* ---- 5) tulis berkas ---- */
const DATA = L.DATA_DIR;
fs.mkdirSync(path.join(DATA, 'decks'), { recursive: true });
fs.mkdirSync(path.join(DATA, 'quiz'), { recursive: true });
[path.join(DATA, 'decks'), path.join(DATA, 'quiz')].forEach(dir => L.listJs(dir).forEach(f => fs.unlinkSync(path.join(dir, f))));
['manifest.js', 'locks.js'].forEach(f => { const p = path.join(DATA, f); if (fs.existsSync(p)) fs.unlinkSync(p); });

shards.forEach((s, sid) => fs.writeFileSync(path.join(DATA, 'decks', sid + '.js'), L.fmtShard(sid, s.label, s.decks)));
mcMenu.forEach(m => fs.writeFileSync(path.join(DATA, 'quiz', m.id + '.js'), L.fmtQuizShard(m.id, m.h3 + ' · ' + m.span, Q[m.id])));
fs.writeFileSync(path.join(DATA, 'manifest.js'), L.fmtManifest(manifest));
fs.writeFileSync(path.join(DATA, 'locks.js'), L.fmtLocks(locks));

/* ---- 6) laporan ---- */
const leafCount = manifest.decks.filter(d => d.shard).length, parentCount = manifest.decks.filter(d => d.children).length;
const soonCount = manifest.decks.filter(d => d.soon).length;
let biggest = { sid: '', n: 0 };
shards.forEach((_, sid) => { const n = fs.statSync(path.join(DATA, 'decks', sid + '.js')).size; if (n > biggest.n) biggest = { sid, n }; });
console.log('== legacy-split selesai ==');
console.log('shard kartu      :', shards.size, '(terbesar ' + biggest.sid + ' ' + biggest.n + ' bytes)');
console.log('deck di manifest :', manifest.decks.length, '= daun ' + leafCount + ' + induk/gabungan ' + parentCount + ' + segera-hadir ' + soonCount);
console.log('shard kuis       :', mcMenu.length);
console.log('ukuran data/     :', L.dirBytes(DATA), 'bytes   (flashcard-data.js lama: 1455415 bytes)');
console.log('paket gabungan   :'); packInfo.forEach(x => console.log('   ' + x));
console.log('duplikat persis dibuang di deck daun (' + report.dupRemoved.length + '):'); report.dupRemoved.forEach(x => console.log('   ' + x));
console.log('kunci sama tapi isi beda di deck daun yang sama, DIPERTAHANKAN (' + report.sameKeyDiff.length + '):'); report.sameKeyDiff.forEach(x => console.log('   ' + x));
console.log('deck uji coba kosong dibuang:', L.DROPPED_IDS.join(', '));
