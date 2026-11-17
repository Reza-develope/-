#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/verify-buku.js — pemeriksa isi Buku Bunpou (data/buku/*.js).
   Memeriksa: struktur tiap bab & pola, penulisan penanda (kanji tanpa furigana, kurung tidak seimbang, cara baca bukan kana),
   jumlah baris contoh vs terjemahan, sorotan di contoh, dan membandingkan cara baca dengan mesin furigana aplikasi
   (cara baca yang tidak bisa dipecah per-kanji ditandai "perlu dicek" — bisa jadi salah ketik, bisa juga cuma kosakata langka).
   Pakai:
       node tools/verify-buku.js            periksa semua level & bab
       node tools/verify-buku.js --list     juga cetak setiap kalimat contoh + bacaan kana-nya (untuk dibaca ulang)
   Keluar dengan kode 1 bila ada KESALAHAN (peringatan tidak menggagalkan).
   ===================================================================== */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LIST = process.argv.includes('--list');

global.window = global; global.FC = {};
require(path.join(ROOT, 'js/core/furigana-data.js'));
require(path.join(ROOT, 'js/core/furigana.js'));
const B = require(path.join(ROOT, 'js/core/buku.js'));
require(path.join(ROOT, 'data/buku/index.js'));

const errors = [], warns = [], infos = [];
const err = (where, msg) => errors.push(where + ' — ' + msg);
const warn = (where, msg) => warns.push(where + ' — ' + msg);

function checkText(where, s, opts) {
  if (typeof s !== 'string' || !s.trim()) { err(where, 'teks kosong / bukan string'); return; }
  B.check(s).forEach(p => err(where, p));
  if (opts && opts.noBrace && /[{}]/.test(s)) err(where, 'tidak boleh ada { } di sini');
  // cara baca vs mesin furigana
  B.parse(s).forEach(n => {
    if (!n.r) return;
    const kanjiOnly = n.r.replace(/[0-9０-９]/g, '');
    if (kanjiOnly.length < 2) return;
    let html = '';
    try { html = FC.furigana.render(n.r, n.rt); } catch (e) { err(where, 'mesin furigana gagal untuk ' + n.r + '[' + n.rt + ']: ' + e.message); return; }
    const rubies = (html.match(/<ruby>/g) || []).length;
    if (rubies < kanjiOnly.length) infos.push(where + ' — cek bacaan: ' + n.r + '[' + n.rt + ']');
  });
}

const idx = FC.bukuIndex;
if (!idx || !Array.isArray(idx.levels)) { console.error('FC.bukuIndex tidak valid'); process.exit(1); }

let nBab = 0, nPola = 0, nContoh = 0;
const seenJp = new Map();

for (const lv of idx.levels) {
  if (!lv.id || !lv.title || !Array.isArray(lv.babs) || !lv.babs.length) err('level ' + lv.id, 'id/title/babs tidak lengkap');
  if (lv.total && lv.babs.some(n => n > lv.total)) err('level ' + lv.id, 'ada nomor bab melebihi total');
  for (const n of lv.babs) {
    const file = B.fileOf(lv.id, n) + '.js', fp = path.join(ROOT, 'data/buku', file);
    if (!fs.existsSync(fp)) { err(file, 'berkas tidak ada'); continue; }
    delete require.cache[require.resolve(fp)];
    try { require(fp); } catch (e) { err(file, 'gagal dimuat: ' + e.message); continue; }
    const bab = B.get(lv.id, n);
    if (!bab) { err(file, 'tidak memanggil FC.defineBuku(\'' + lv.id + '\', { n: ' + n + ' … })'); continue; }
    nBab++;
    const W = lv.id + ' bab ' + n;
    if (bab.n !== n) err(W, 'nomor bab di berkas (' + bab.n + ') tidak sama dengan indeks');
    ['title', 'arti', 'topic', 'topicArti'].forEach(k => checkText(W + ' ' + k, bab[k], { noBrace: true }));
    if (!Array.isArray(bab.bisa) || bab.bisa.length < 2) err(W, '"bisa" minimal 2 butir');
    else bab.bisa.forEach((t, i) => checkText(W + ' bisa[' + i + ']', t, { noBrace: true }));
    if (!Array.isArray(bab.pola) || !bab.pola.length) { err(W, 'tidak ada pola'); continue; }

    bab.pola.forEach((p, i) => {
      nPola++;
      const P = W + ' pola ' + (i + 1) + ' (' + B.plain(p.name || '?') + ')';
      ['name', 'short', 'arti', 'inti'].forEach(k => checkText(P + ' ' + k, p[k], { noBrace: true }));
      if (p.short && B.plain(p.short).length > 14) warn(P, '"short" terlalu panjang untuk tab (' + B.plain(p.short).length + ' karakter)');
      if (!Array.isArray(p.rumus) || !p.rumus.length || !p.rumus.every(l => Array.isArray(l) && l.length)) err(P, '"rumus" harus berupa daftar baris, tiap baris berisi token');
      else p.rumus.forEach((l, li) => l.forEach((tk, ti) => checkText(P + ' rumus[' + li + '][' + ti + ']', String(tk).replace(/^=/, ''), { noBrace: true })));
      if (p.rumusNote) checkText(P + ' rumusNote', p.rumusNote, { noBrace: true });
      (p.tabel || []).forEach((t, ti) => {
        checkText(P + ' tabel[' + ti + '].judul', t.judul, { noBrace: true });
        if (!Array.isArray(t.kepala) || !Array.isArray(t.baris) || !t.baris.length) { err(P, 'tabel[' + ti + '] harus punya kepala & baris'); return; }
        t.kepala.forEach((c, ci) => checkText(P + ' tabel[' + ti + '].kepala[' + ci + ']', c, { noBrace: true }));
        t.baris.forEach((r, ri) => {
          if (r.length !== t.kepala.length) err(P, 'tabel[' + ti + '] baris ' + (ri + 1) + ' jumlah kolomnya beda dari kepala');
          r.forEach((c, ci) => checkText(P + ' tabel[' + ti + '][' + ri + '][' + ci + ']', c, { noBrace: true }));
        });
      });
      if (!Array.isArray(p.jelas) || p.jelas.length < 2) err(P, '"jelas" minimal 2 butir');
      else p.jelas.forEach((t, k) => checkText(P + ' jelas[' + k + ']', t));
      if (!Array.isArray(p.awas) || p.awas.length < 1) err(P, '"awas" minimal 1 butir');
      else p.awas.forEach((t, k) => checkText(P + ' awas[' + k + ']', t));
      if (!Array.isArray(p.contoh) || p.contoh.length < 3) err(P, '"contoh" minimal 3 kalimat');
      else p.contoh.forEach((c, k) => {
        nContoh++;
        const C = P + ' contoh ' + (k + 1);
        checkText(C + ' jp', c.jp); checkText(C + ' id', c.id, { noBrace: true });
        if (!/\{[^}]+\}/.test(c.jp || '')) warn(C, 'tidak ada bagian yang disorot { }');
        const lj = String(c.jp || '').split('\n').length, li = String(c.id || '').split('\n').length;
        if (lj !== li) err(C, 'jumlah baris Jepang (' + lj + ') ≠ jumlah baris terjemahan (' + li + ')');
        const plain = B.plain(c.jp || '');
        if (plain.replace(/\n/g, '').length > 60) warn(C, 'kalimat panjang (' + plain.length + ' karakter) — pertimbangkan dipendekkan');
        if (seenJp.has(plain)) warn(C, 'kalimat sama dengan ' + seenJp.get(plain)); else seenJp.set(plain, C);
        if (LIST) console.log('  ' + (k + 1) + '. ' + plain.replace(/\n/g, ' / ') + '\n     ' + B.kana(c.jp).replace(/\n/g, ' / ') + '\n     ' + String(c.id).replace(/\n/g, ' / '));
      });
      if (LIST) console.log('— ' + P + '\n');
    });
  }
}

if (infos.length) { console.log('\nPERLU DICEK (' + infos.length + ') — cara baca yang tidak cocok dipecah per-kanji oleh mesin furigana:'); infos.forEach(s => console.log('  ? ' + s)); }
if (warns.length) { console.log('\nPERINGATAN (' + warns.length + '):'); warns.forEach(s => console.log('  ! ' + s)); }
if (errors.length) { console.log('\nKESALAHAN (' + errors.length + '):'); errors.forEach(s => console.log('  ✗ ' + s)); }
console.log('\n' + nBab + ' bab · ' + nPola + ' pola · ' + nContoh + ' contoh — ' + (errors.length ? errors.length + ' kesalahan' : 'tanpa kesalahan'));
process.exit(errors.length ? 1 : 0);
