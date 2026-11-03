#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/verify-data.js — membuktikan data BARU tidak kehilangan apa pun dibanding data LAMA.

   Pakai:   node tools/verify-data.js "<folder aplikasi lama>"
   Keluar dengan kode 1 kalau ada yang tidak cocok.
   ===================================================================== */
const path = require('path');
const L = require('./_lib');

const origArg = process.argv[2];
if (!origArg) { console.error('Pakai: node tools/verify-data.js "<folder aplikasi lama>"'); process.exit(1); }
const old = L.readLegacy(path.resolve(origArg));
const neu = L.loadNewData();
const fails = [], notes = [];
const fail = s => fails.push(s);

/* (d) struktur */
L.checkStructure(neu).forEach(p => fail('struktur: ' + p));
if (fails.length) { console.log('GAGAL (struktur):'); fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }

const m = neu.manifest;
const resolver = L.makeResolver(m, neu.shards);
const sigs = list => list.map(L.cardSig);
const dedupeSig = list => { const s = new Set(); return list.filter(c => { const g = L.cardSig(c); if (s.has(g)) return false; s.add(g); return true; }); };
const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
let checkedDecks = 0, orderFree = 0;

/* (a) tiap deck lama berisi kartu harus terwakili persis */
Object.keys(old.D).forEach(id => {
  const oldList = old.D[id];
  if (!oldList.length) return;
  const d = resolver.byId.get(id);
  if (!d) { fail('deck lama "' + id + '" (' + oldList.length + ' kartu) tidak ada di manifest baru'); return; }
  const got = resolver.resolve(id);
  checkedDecks++;
  if (d.shard) {                       // deck daun: sama persis, kecuali duplikat PERSIS yang dibuang
    const exp = sigs(dedupeSig(oldList)), have = sigs(got);
    if (!eq(exp, have)) fail('deck daun ' + id + ': isi/urutan berbeda dari data lama (lama ' + oldList.length + ', baru ' + got.length + ')');
  } else if (d.pack) {                 // paket gabungan virtual: kumpulan (kunci+isi) sama, urutan boleh beda
    orderFree++;
    const A = new Map(), B = new Map();
    oldList.forEach(c => { const k = L.cardKey(c); if (!A.has(k)) A.set(k, L.cardSig(c)); });
    got.forEach(c => B.set(L.cardKey(c), L.cardSig(c)));
    if (A.size !== B.size || [...A].some(([k, s]) => B.get(k) !== s)) fail('paket virtual ' + id + ': kumpulan kartu berbeda dari paket lama');
  } else {                             // induk bab/seri: gabungan anak, tanpa duplikat kunci, urutan sama
    const exp = sigs(L.dedupeByKey(oldList)), have = sigs(got);
    if (!eq(exp, have)) fail('deck induk ' + id + ': gabungan anak berbeda dari deck penuh lama (lama ' + oldList.length + ', baru ' + got.length + ')');
  }
});
// deck baru tanpa padanan lama (selain induk seri baru) cuma dicatat
m.decks.forEach(d => { if (!(old.D[d.id] && old.D[d.id].length) && !d.soon) notes.push('deck baru tanpa padanan lama: ' + d.id + ' (' + d.title + ', ' + resolver.resolve(d.id).length + ' kartu)'); });

/* (b) tak ada kartu lama (kunci+isi lengkap) yang hilang dari gabungan semua deck daun baru (+ kartu revisi paket) */
const allNew = new Set();
m.decks.filter(d => d.shard).forEach(d => resolver.resolve(d.id).forEach(c => allNew.add(L.cardSig(c))));
m.decks.filter(d => d.patch).forEach(d => neu.shards.get(d.patch)[d.id].forEach(c => allNew.add(L.cardSig(c))));   // kartu revisi paket juga "daun"
const lost = new Set();
Object.keys(old.D).forEach(id => old.D[id].forEach(c => { if (!allNew.has(L.cardSig(c))) lost.add(id + ': ' + L.cardKey(c)); }));
lost.forEach(x => fail('kartu lama hilang: ' + x));
const oldUnique = new Set(); Object.keys(old.D).forEach(id => old.D[id].forEach(c => oldUnique.add(L.cardSig(c))));

/* frontSub: yang dibuang harus benar-benar konstanta bawaan */
Object.keys(old.D).forEach(id => old.D[id].forEach(c => { if (c.frontSub !== undefined && c.frontSub !== L.DEFAULT_FRONT_SUB) { if (!allNew.has(L.cardSig(c))) fail('frontSub non-bawaan hilang di ' + id); } }));

/* (c) count == hasil resolusi */
m.decks.forEach(d => { const n = d.soon ? 0 : resolver.resolve(d.id).length; if (d.count !== n) fail('count ' + d.id + ': manifest ' + d.count + ' ≠ hasil ' + n); });
m.quiz.forEach(x => { const n = (neu.quizzes.get(x.shard || x.id) || []).length; if (x.count !== n) fail('count kuis ' + x.id + ': manifest ' + x.count + ' ≠ ' + n); });

/* (e) kuis identik */
const oldQ = Object.keys(old.Q);
oldQ.forEach(id => {
  const nq = neu.quizzes.get(id);
  if (!nq) { fail('kuis ' + id + ' hilang'); return; }
  if (!eq(old.Q[id].map(L.quizSig), nq.map(L.quizSig))) fail('kuis ' + id + ': soal berbeda dari data lama');
});
if (m.quiz.length !== oldQ.length) fail('jumlah kuis berbeda: lama ' + oldQ.length + ', baru ' + m.quiz.length);

/* (f) gembok */
const jl = o => JSON.stringify(Object.keys(o).sort().map(k => [k, o[k]]));
if (jl(neu.locks.deck) !== jl(old.locks.deck)) fail('gembok deck berbeda');
if (jl(neu.locks.quiz) !== jl(old.locks.quiz)) fail('gembok kuis berbeda');
if (jl(neu.locks.text) !== jl(old.locks.text)) fail('teks gembok berbeda');
Object.keys(neu.locks.deck).forEach(id => { if (!resolver.byId.has(id)) fail('gembok untuk deck yang tidak ada: ' + id); });
Object.keys(neu.locks.quiz).forEach(id => { if (!m.quiz.some(x => x.id === id)) fail('gembok untuk kuis yang tidak ada: ' + id); });

/* ringkasan */
const leaf = m.decks.filter(d => d.shard).length, parents = m.decks.filter(d => d.children).length, soon = m.decks.filter(d => d.soon).length;
console.log('Deck lama berkartu diperiksa  :', checkedDecks, '(paket virtual urutan-bebas: ' + orderFree + ')');
console.log('Kartu unik lama (kunci+isi)   :', oldUnique.size, '| di gabungan daun baru:', allNew.size, '| hilang:', lost.size);
console.log('Manifest                      :', m.decks.length, 'deck = daun ' + leaf + ' + induk/gabungan ' + parents + ' + segera-hadir ' + soon, '| kuis', m.quiz.length);
console.log('Ukuran data/                  :', L.dirBytes(L.DATA_DIR), 'bytes (lama: 1455415 + 121.5 KB kuis)');
notes.forEach(n => console.log('  catatan: ' + n));
if (fails.length) { console.log('\nGAGAL (' + fails.length + '):'); fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
console.log('\nLULUS — tidak ada data yang hilang.');
