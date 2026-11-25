#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/check-data.js — pemeriksa menyeluruh sebelum dikirim / di-deploy. Keluar dengan kode 1 bila ada MASALAH.
   Memeriksa: sintaks semua berkas JS, struktur manifest (deck, grup, induk-anak, shard yatim), angka count, kartu ganda dan kosong
   dalam satu deck, kuis (id, jumlah, opsi kembar), berkas kuis yatim / bukan .js, indeks kartu bersama (data/shared.js) tidak basi,
   manifest.webmanifest + ikon, BUILD index.html = sw.js, semua berkas SHELL service worker ada.
   Pakai:  node tools/check-data.js
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require('./_lib');
const ROOT = path.resolve(__dirname, '..');
const problems = [], notes = [];
const bad = m => problems.push(m);

// 1) sintaks semua JS
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f), st = fs.statSync(p);
    if (st.isDirectory()) { if (f !== 'node_modules' && f !== '.git') walk(p); }
    else if (f.endsWith('.js')) { try { new vm.Script(fs.readFileSync(p, 'utf8'), { filename: p }); } catch (e) { bad('sintaks ' + path.relative(ROOT, p) + ': ' + e.message); } }
  }
})(ROOT);

// 2) struktur data
const data = L.loadNewData();
data.errors.forEach(e => bad('muat data: ' + e));
L.checkStructure(data).forEach(e => bad('struktur: ' + e));
const m = data.manifest, resolver = L.makeResolver(m, data.shards);
const byId = new Map(m.decks.map(d => [d.id, d]));

// 3) count benar
m.decks.forEach(d => { if (d.soon) return; let n; try { n = resolver.resolve(d.id).length; } catch (e) { return bad('deck ' + d.id + ': ' + e.message); } if (n !== d.count) bad('count ' + d.id + ': manifest ' + d.count + ', nyata ' + n + ' (jalankan node tools/update-counts.js)'); });
m.decks.filter(d => d.soon && d.count).forEach(d => bad('deck "soon" ' + d.id + ' tidak boleh punya count'));

// 4) kartu ganda & kosong dalam satu deck daun
data.shards.forEach((obj, sid) => Object.keys(obj).forEach(did => {
  const seen = new Map();
  obj[did].forEach((c, i) => {
    ['front', 'back', 'backSub'].forEach(k => { if (c[k] == null || !String(c[k]).trim()) bad('kartu kosong ' + sid + '::' + did + ' #' + (i + 1) + ' (' + k + ')'); });
    const k = c.front + '|' + c.back;
    if (seen.has(k)) bad('kartu ganda ' + sid + '::' + did + ' #' + (seen.get(k) + 1) + ' & #' + (i + 1) + ': ' + k + ' (gabungkan artinya dengan "; " lalu hapus salah satunya)'); else seen.set(k, i);
  });
}));

// 5) kuis
const quizDir = path.join(data.dataDir, 'quiz');
const quizFilesOnDisk = fs.readdirSync(quizDir);
quizFilesOnDisk.filter(f => !f.endsWith('.js')).forEach(f => bad('berkas bukan .js di data/quiz (tak pernah dimuat): ' + f));
const refQuiz = new Set(m.quiz.map(q => q.shard || q.id));
quizFilesOnDisk.filter(f => f.endsWith('.js') && !refQuiz.has(f.replace(/\.js$/, ''))).forEach(f => bad('berkas kuis yatim (tak ada di manifest): ' + f));
m.quiz.forEach(q => {
  const key = q.shard || q.id, arr = data.quizzes.get(key);
  if (!arr) return bad('kuis ' + q.id + ': FC.defineQuiz("' + key + '") tidak ditemukan di data/quiz/' + key + '.js');
  if (q.count !== arr.length) bad('kuis ' + q.id + ': count manifest ' + q.count + ', nyata ' + arr.length);
  arr.forEach((it, i) => {
    const t = 'kuis ' + q.id + ' #' + (i + 1);
    if (!it.question || !String(it.question).trim()) bad(t + ': question kosong');
    if (it.correct == null || !String(it.correct).trim()) bad(t + ': correct kosong');
    if (!Array.isArray(it.wrong) || it.wrong.length < 2) { bad(t + ': minimal 2 pengecoh'); return; }
    const all = [it.correct].concat(it.wrong).map(x => String(x).trim()), dup = all.filter((x, j) => all.indexOf(x) !== j);
    if (dup.length) bad(t + ': opsi kembar ' + JSON.stringify(dup) + ' — ' + String(it.question).slice(0, 40));
  });
});
m.quiz.forEach(q => { const n = data.quizzes.get(q.shard || q.id); if (n && !n.some(x => x.explanation)) notes.push('kuis ' + q.id + ' belum punya penjelasan'); });

// 6) indeks kartu bersama tidak basi
const sharedPath = path.join(data.dataDir, 'shared.js');
if (!fs.existsSync(sharedPath)) bad('data/shared.js tidak ada (jalankan node tools/update-counts.js)');
else if (fs.readFileSync(sharedPath, 'utf8') !== L.fmtShared(L.computeShared(m, data.shards))) bad('data/shared.js basi (jalankan node tools/update-counts.js)');

// 7) PWA
const wm = path.join(ROOT, 'manifest.webmanifest');
if (!fs.existsSync(wm)) bad('manifest.webmanifest tidak ada');
else { try { const j = JSON.parse(fs.readFileSync(wm, 'utf8')); (j.icons || []).concat((j.shortcuts || []).flatMap(s => s.icons || [])).forEach(ic => { if (!fs.existsSync(path.join(ROOT, ic.src))) bad('ikon manifest tidak ada: ' + ic.src); }); } catch (e) { bad('manifest.webmanifest bukan JSON: ' + e.message); } }

// 8) BUILD dan berkas SHELL service worker
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const bSw = (/const BUILD = '([^']+)'/.exec(sw) || [])[1], bHtml = (/FC\.BUILD\s*=\s*'([^']+)'/.exec(html) || [])[1];
if (!bSw || !bHtml) bad('BUILD tidak terbaca di sw.js / index.html'); else if (bSw !== bHtml) bad('BUILD berbeda: sw.js ' + bSw + ' vs index.html ' + bHtml + ' (jalankan node tools/bump-build.js)');
const shell = /const SHELL_FILES = \[([\s\S]*?)\];/.exec(sw);
if (shell) (shell[1].match(/'([^']+)'/g) || []).map(s => s.slice(1, -1)).filter(f => f !== './').forEach(f => { if (!fs.existsSync(path.join(ROOT, f))) bad('SHELL service worker menunjuk berkas yang tidak ada: ' + f); });

notes.forEach(n => console.log('  catatan: ' + n));
if (problems.length) { console.log('MASALAH (' + problems.length + '):'); problems.forEach(p => console.log('  ✗ ' + p)); process.exit(1); }
console.log('check-data: semua baik — ' + m.decks.length + ' deck, ' + m.quiz.length + ' kuis, ' + data.shards.size + ' shard.');
