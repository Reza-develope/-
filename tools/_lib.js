'use strict';
/* =====================================================================
   tools/_lib.js — fungsi bersama untuk tools/legacy-split.js, tools/verify-data.js
   dan tools/update-counts.js (pembaca data lama, penulis berkas data baru,
   pemuat data baru, penyelesai deck, pemeriksa struktur).
   Tidak perlu dijalankan sendiri.
   ===================================================================== */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const DEFAULT_FRONT_SUB = 'ketuk untuk jawaban';
// Dua deck uji coba kosong di index.html lama (judul "8888/0909" dan "1SF56/H1H") sengaja dibuang.
const DROPPED_IDS = ['Sh218', '8880'];

/* ------------------------------------------------------------------ kartu */
const CARD_KEYS = ['front', 'back', 'backSub', 'level', 'type', 'example', 'exampleMeaning'];
const cardKey = c => c.front + '|' + c.back;

// Bentuk kanonik sebuah kartu: tanpa frontSub bawaan, urutan field tetap.
function normCard(c) {
  const o = {};
  for (const k of CARD_KEYS) if (c[k] !== undefined) o[k] = c[k];
  Object.keys(c).filter(k => !(k in o) && k !== 'frontSub').sort().forEach(k => { o[k] = c[k]; });
  if (c.frontSub !== undefined && c.frontSub !== DEFAULT_FRONT_SUB) o.frontSub = c.frontSub; // isi asli, bukan default
  return o;
}
const cardSig = c => JSON.stringify(normCard(c));

function dedupeByKey(list) {
  const seen = new Set();
  return list.filter(c => { const k = cardKey(c); if (seen.has(k)) return false; seen.add(k); return true; });
}

/* ------------------------------------------------------------------ pembuat teks JS */
const q = s => JSON.stringify(s).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const keyq = k => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : q(k));

function fmtVal(v) {
  if (typeof v === 'string') return q(v);
  if (Array.isArray(v)) return '[' + v.map(fmtVal).join(', ') + ']';
  if (v && typeof v === 'object') return fmtObj(v);
  return JSON.stringify(v);
}
function fmtObj(o, order) {
  const ks = (order || []).filter(k => o[k] !== undefined);
  Object.keys(o).forEach(k => { if (!ks.includes(k) && o[k] !== undefined) ks.push(k); });
  return '{ ' + ks.map(k => keyq(k) + ': ' + fmtVal(o[k])).join(', ') + ' }';
}
const fmtCard = c => fmtObj(normCard(c), CARD_KEYS);
const QUIZ_FIELDS = ['question', 'correct', 'wrong', 'explanation'];
const normQuiz = x => { const o = {}; QUIZ_FIELDS.forEach(k => { if (x[k] !== undefined) o[k] = x[k]; }); Object.keys(x).forEach(k => { if (!(k in o)) o[k] = x[k]; }); return o; };
const quizSig = x => JSON.stringify(normQuiz(x));
const safeComment = s => String(s).replace(/\*\//g, '* /');

// decks = [[leafDeckId, cards[]], ...]
function fmtShard(shardId, label, decks) {
  const total = decks.reduce((a, d) => a + d[1].length, 0);
  const out = ['/* ' + safeComment(label) + ' — ' + total + ' kartu */', 'FC.defineShard(' + q(shardId) + ', {'];
  decks.forEach(([id, list], di) => {
    out.push('  ' + q(id) + ': [');
    list.forEach((c, i) => out.push('    ' + fmtCard(c) + (i < list.length - 1 ? ',' : '')));
    out.push('  ]' + (di < decks.length - 1 ? ',' : ''));
  });
  out.push('});', '');
  return out.join('\n');
}

function fmtQuizShard(id, label, list) {
  const out = ['/* ' + safeComment(label) + ' — ' + list.length + ' soal */', 'FC.defineQuiz(' + q(id) + ', ['];
  list.forEach((x, i) => out.push('  ' + fmtObj(normQuiz(x), QUIZ_FIELDS) + (i < list.length - 1 ? ',' : '')));
  out.push(']);', '');
  return out.join('\n');
}

const GROUP_KEYS = ['id', 'title', 'sub', 'icon'];
const DECK_KEYS = ['id', 'group', 'title', 'sub', 'shard', 'count', 'children', 'patch', 'parent', 'pack', 'soon', 'keywords'];
const QUIZ_KEYS = ['id', 'title', 'sub', 'shard', 'count'];

const MANIFEST_HEADER = [
  '/* =====================================================================',
  '   data/manifest.js — DAFTAR deck & kuis. Isi kartu ada di data/decks/*.js dan data/quiz/*.js.',
  '   Dibuat oleh tools/legacy-split.js; setelah mengedit kartu di shard, jalankan',
  '       node tools/update-counts.js',
  '   untuk menyegarkan angka `count` (file ini ditulis ulang dengan format yang sama).',
  '',
  '   Kolom deck:',
  '     id        id deck (dipakai juga sebagai kunci data lama)       group    id grup (lihat `groups`)',
  '     title/sub teks yang tampil                                      shard    deck "daun": berkas data/decks/<shard>.js',
  '     count     jumlah kartu setelah deck diselesaikan                children deck induk/gabungan: id anak (kartu digabung, duplikat',
  '                                                                              kunci depan|baca dibuang, kemunculan pertama menang)',
  '     parent    induk untuk tampilan bertingkat                       pack     true = "Paket gabungan" (ditampilkan di bagian Paket)',
  '     patch     (hanya bersama children) shard berisi kartu REVISI: kartu di sana menggantikan kartu',
  '               berkunci sama (depan|baca) di hasil gabungan, mis. arti yang sudah digabung manual',
  '     soon      true = belum ada kartunya                              keywords kata kunci pencarian tambahan',
  '   ===================================================================== */'
].join('\n');

function fmtManifest(m) {
  const out = [MANIFEST_HEADER, 'window.FC = window.FC || {};', 'FC.manifest = {', '  version: ' + (m.version || 1) + ','];
  out.push('  groups: [');
  m.groups.forEach((g, i) => out.push('    ' + fmtObj(g, GROUP_KEYS) + (i < m.groups.length - 1 ? ',' : '')));
  out.push('  ],', '  decks: [');
  let prev = null;
  m.decks.forEach((d, i) => {
    if (d.group !== prev) { const g = m.groups.find(x => x.id === d.group); out.push('    // ---- ' + d.group + (g ? ' · ' + g.title : '') + ' ----'); prev = d.group; }
    out.push('    ' + fmtObj(d, DECK_KEYS) + (i < m.decks.length - 1 ? ',' : ''));
  });
  out.push('  ],', '  quiz: [');
  m.quiz.forEach((x, i) => out.push('    ' + fmtObj(x, QUIZ_KEYS) + (i < m.quiz.length - 1 ? ',' : '')));
  out.push('  ]', '};', '');
  return out.join('\n');
}

const LOCKS_HEADER = [
  '/* =====================================================================',
  '   data/locks.js — GEMBOK DECK & KUIS. Ini SOFT LOCK di sisi klien: password dan isi deck',
  '   tetap bisa dibaca lewat View Source. Cukup untuk membatasi iseng, bukan untuk rahasia.',
  '',
  '   Menambah gembok:',
  '     deck: { id_deck: { tier: "pro" | "exclusive" | "admin", pw: "passwordnya" } }   (id_deck = kolom `id` di manifest.js)',
  '     quiz: { id_kuis: { tier: "pro" | "exclusive",           pw: "passwordnya" } }   (id_kuis = kolom `id` di bagian `quiz`)',
  '   Membuka gembok: hapus barisnya.',
  '   tier = jenis lencana & teks yang tampil saat password diminta (pro 🔒, exclusive 👑💎, admin 💀).',
  '   text = teks di jendela password; text.wrong = pesan kalau password salah.',
  '   ===================================================================== */'
].join('\n');

function fmtLocks(L) {
  const out = [LOCKS_HEADER, 'window.FC = window.FC || {};', 'FC.locks = {'];
  for (const name of ['deck', 'quiz']) {
    const ks = Object.keys(L[name]);
    if (!ks.length) { out.push('  ' + name + ': {},'); continue; }
    out.push('  ' + name + ': {');
    ks.forEach((k, i) => out.push('    ' + keyq(k) + ': { tier: ' + q(L[name][k].tier) + ', pw: ' + q(L[name][k].pw) + ' }' + (i < ks.length - 1 ? ',' : '')));
    out.push('  },');
  }
  const tk = Object.keys(L.text);
  out.push('  text: {');
  tk.forEach((k, i) => out.push('    ' + keyq(k) + ': ' + q(L.text[k]) + (i < tk.length - 1 ? ',' : '')));
  out.push('  }', '};', '');
  return out.join('\n');
}

/* ------------------------------------------------------------------ data lama */
// Ambil literal objek `const NAME = { ... }` dari sumber JS (peduli string & komentar), lalu evaluasi.
function extractConstObject(src, name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*\\{').exec(src);
  if (!m) throw new Error('tidak menemukan ' + name);
  const start = m.index + m[0].length - 1;
  let depth = 0, i = start;
  for (; i < src.length; i++) {
    const ch = src[i], nx = src[i + 1];
    if (ch === '/' && nx === '/') { i = src.indexOf('\n', i); if (i < 0) break; continue; }
    if (ch === '/' && nx === '*') { i = src.indexOf('*/', i + 2) + 1; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { const qc = ch; for (i++; i < src.length && src[i] !== qc; i++) if (src[i] === '\\') i++; continue; }
    if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) break;
  }
  return vm.runInNewContext('(' + src.slice(start, i + 1) + ')', {});
}
const unq = raw => vm.runInNewContext("'" + raw + "'", {});
function grabHandlerText(src, mapName) {
  const m = new RegExp("askDeckPassword\\(\\s*title\\s*,\\s*'((?:[^'\\\\]|\\\\.)*)'\\s*,\\s*" + mapName + '\\[category\\]\\s*\\)').exec(src);
  if (!m) throw new Error('teks modal untuk ' + mapName + ' tidak ketemu');
  return unq(m[1]);
}

function readLegacy(orig) {
  const rd = f => fs.readFileSync(path.join(orig, f), 'utf8');
  const ev = (f, name) => vm.runInNewContext(rd(f) + '\n;' + name, {}, { timeout: 30000 });
  const D = ev('js/flashcard-data.js', 'fcFlashcardData');
  const Q = ev('js/quiz-data.js', 'mcFlashcardData');
  const html = rd('index.html');
  const iFc = html.indexOf('id="fcMenuGrid"'), iMc = html.indexOf('id="mcMenuGrid"'), iBp = html.indexOf('id="home-page-bp"');
  if (iFc < 0 || iMc < 0 || iBp < 0) throw new Error('index.html lama: grid menu tidak ditemukan');
  const re = /<div class="menu-card"[^>]*?data-category="([^"]*)"[^>]*>\s*<h3>([\s\S]*?)<\/h3>\s*<span>([\s\S]*?)<\/span>/g;
  const parse = s => { const r = []; let m; re.lastIndex = 0; while ((m = re.exec(s))) r.push({ id: m[1], h3: m[2].trim(), span: m[3].trim() }); return r; };
  const fcSrc = rd('js/flashcard.js'), mcSrc = rd('js/quiz.js'), navSrc = rd('js/nav.js');
  const tier = (map, t) => Object.keys(map).map(id => [id, { tier: t, pw: map[id] }]);
  const locks = {
    deck: Object.fromEntries([].concat(
      tier(extractConstObject(fcSrc, 'fcDeckPasswords'), 'pro'),
      tier(extractConstObject(fcSrc, 'fcExclusivePasswords'), 'exclusive'),
      tier(extractConstObject(fcSrc, 'fcAdminPasswords'), 'admin'))),
    quiz: Object.fromEntries([].concat(
      tier(extractConstObject(mcSrc, 'mcDeckPasswords'), 'pro'),
      tier(extractConstObject(mcSrc, 'mcExclusivePasswords'), 'exclusive'))),
    text: {
      admin: grabHandlerText(fcSrc, 'fcAdminPasswords'),
      exclusive: grabHandlerText(fcSrc, 'fcExclusivePasswords'),
      pro: grabHandlerText(fcSrc, 'fcDeckPasswords'),
      quizExclusive: grabHandlerText(mcSrc, 'mcExclusivePasswords'),
      quizPro: grabHandlerText(mcSrc, 'mcDeckPasswords'),
      wrong: (() => { const m = /errorEl\.innerText\s*=\s*'((?:[^'\\]|\\.)*)'/.exec(navSrc); if (!m) throw new Error('teks password salah tidak ketemu di nav.js'); return unq(m[1]); })()
    }
  };
  return { D, Q, fcMenu: parse(html.slice(iFc, iMc)), mcMenu: parse(html.slice(iMc, iBp)), locks, sources: { fcSrc, mcSrc, navSrc } };
}

/* ------------------------------------------------------------------ data baru */
function listJs(dir) { return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort() : []; }

// Muat manifest + locks + semua shard ke VM dengan FC tiruan. Tidak ada efek samping.
function loadNewData(dataDir) {
  dataDir = dataDir || DATA_DIR;
  const errors = [];
  const ctx = vm.createContext({});
  ctx.window = ctx;
  const shards = new Map(), shardFiles = new Map(), quizzes = new Map(), quizFiles = new Map();
  let cur = null;
  ctx.FC = {
    defineShard(id, obj) { if (shards.has(id)) errors.push('shard "' + id + '" didefinisikan dua kali (' + shardFiles.get(id) + ' & ' + cur + ')'); shards.set(id, obj); shardFiles.set(id, cur); },
    defineQuiz(id, arr) { if (quizzes.has(id)) errors.push('kuis "' + id + '" didefinisikan dua kali (' + quizFiles.get(id) + ' & ' + cur + ')'); quizzes.set(id, arr); quizFiles.set(id, cur); }
  };
  const run = file => {
    cur = path.relative(dataDir, file).split(path.sep).join('/');
    try { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file, timeout: 30000 }); }
    catch (e) { errors.push(cur + ': ' + e.message); }
  };
  const mf = path.join(dataDir, 'manifest.js'), lf = path.join(dataDir, 'locks.js');
  if (fs.existsSync(mf)) run(mf); else errors.push('data/manifest.js tidak ada');
  if (fs.existsSync(lf)) run(lf);
  const dd = path.join(dataDir, 'decks'), qd = path.join(dataDir, 'quiz');
  listJs(dd).forEach(f => run(path.join(dd, f)));
  listJs(qd).forEach(f => run(path.join(qd, f)));
  return { manifest: ctx.FC.manifest, locks: ctx.FC.locks, shards, shardFiles, quizzes, quizFiles, errors, dataDir };
}

// Penyelesai deck: leaf = kartu shard apa adanya; induk/gabungan = gabungan anak, duplikat kunci dibuang (pertama menang).
function makeResolver(manifest, shards) {
  const byId = new Map(manifest.decks.map(d => [d.id, d]));
  const memo = new Map();
  function res(id, stack) {
    if (memo.has(id)) return memo.get(id);
    if (stack.includes(id)) throw new Error('siklus deck: ' + stack.concat(id).join(' > '));
    const d = byId.get(id);
    if (!d) throw new Error('deck tidak dikenal: ' + id);
    let out;
    if (d.children) {
      const seen = new Set(); out = [];
      for (const cid of d.children) for (const c of res(cid, stack.concat(id))) { const k = cardKey(c); if (!seen.has(k)) { seen.add(k); out.push(c); } }
      if (d.patch) {   // kartu revisi menggantikan kartu berkunci sama, posisinya tetap
        const ps = shards.get(d.patch);
        if (!ps || !Array.isArray(ps[id])) throw new Error('deck ' + id + ': shard revisi "' + d.patch + '" tidak mendefinisikannya');
        const pm = new Map(ps[id].map(c => [cardKey(c), c]));
        out = out.map(c => pm.get(cardKey(c)) || c);
      }
    } else if (d.shard) {
      const sh = shards.get(d.shard);
      if (!sh || !Array.isArray(sh[id])) throw new Error('deck ' + id + ': shard "' + d.shard + '" tidak mendefinisikannya');
      out = sh[id];
    } else out = [];
    memo.set(id, out);
    return out;
  }
  return { byId, resolve: id => res(id, []) };
}

// Pemeriksaan struktur; mengembalikan daftar masalah (string).
function checkStructure(L) {
  const P = [], m = L.manifest;
  if (!m || !Array.isArray(m.decks) || !Array.isArray(m.groups) || !Array.isArray(m.quiz)) return ['FC.manifest tidak lengkap (butuh groups, decks, quiz)'];
  L.errors.forEach(e => P.push('muat: ' + e));
  const ids = new Set(), groupIds = new Set(m.groups.map(g => g.id));
  m.decks.forEach(d => {
    if (ids.has(d.id)) P.push('id deck ganda: ' + d.id);
    ids.add(d.id);
    if (!groupIds.has(d.group)) P.push('deck ' + d.id + ': grup "' + d.group + '" tidak ada');
    if (d.children && d.shard) P.push('deck ' + d.id + ': tidak boleh punya children DAN shard');
    if (d.patch && !d.children) P.push('deck ' + d.id + ': patch hanya boleh bersama children');
    if (!d.children && !d.shard && !d.soon) P.push('deck ' + d.id + ': tanpa children/shard harus soon:true');
    if (d.soon && (d.children || d.shard)) P.push('deck ' + d.id + ': soon:true tapi punya children/shard');
  });
  const byId = new Map(m.decks.map(d => [d.id, d]));
  m.decks.forEach(d => {
    (d.children || []).forEach(cid => { if (!byId.has(cid)) P.push('deck ' + d.id + ': anak "' + cid + '" tidak ada'); });
    if (d.parent) {
      const par = byId.get(d.parent);
      if (!par) P.push('deck ' + d.id + ': parent "' + d.parent + '" tidak ada');
      else if (!(par.children || []).includes(d.id)) P.push('deck ' + d.id + ': parent "' + d.parent + '" tidak mencantumkannya di children');
    }
  });
  const lowerFiles = new Map();
  const defined = new Map();
  L.shards.forEach((obj, sid) => {
    const file = L.shardFiles.get(sid);
    if (file !== 'decks/' + sid + '.js') P.push('shard "' + sid + '" didefinisikan di ' + file + ' (nama berkas harus decks/' + sid + '.js)');
    const low = (file || '').toLowerCase();
    if (lowerFiles.has(low)) P.push('nama berkas sama jika huruf besar/kecil diabaikan: ' + file + ' & ' + lowerFiles.get(low));
    lowerFiles.set(low, file);
    Object.keys(obj).forEach(lid => { if (defined.has(lid)) P.push('leaf "' + lid + '" didefinisikan di dua shard: ' + defined.get(lid) + ' & ' + sid); defined.set(lid, sid); });
  });
  m.decks.filter(d => d.shard).forEach(d => {
    if (!L.shards.has(d.shard)) P.push('deck ' + d.id + ': berkas shard "' + d.shard + '" tidak ada');
    else if (!Array.isArray(L.shards.get(d.shard)[d.id])) P.push('deck ' + d.id + ': shard "' + d.shard + '" tidak mendefinisikan leaf ini');
  });
  m.decks.filter(d => d.patch).forEach(d => {
    if (!L.shards.has(d.patch)) P.push('deck ' + d.id + ': berkas shard revisi "' + d.patch + '" tidak ada');
    else if (!Array.isArray(L.shards.get(d.patch)[d.id])) P.push('deck ' + d.id + ': shard revisi "' + d.patch + '" tidak mendefinisikan ' + d.id);
  });
  defined.forEach((sid, lid) => { const d = byId.get(lid); if (!d || (d.shard !== sid && d.patch !== sid)) P.push('leaf "' + lid + '" di shard "' + sid + '" tidak dirujuk manifest (yatim)'); });
  const qids = new Set();
  m.quiz.forEach(x => {
    if (qids.has(x.id)) P.push('id kuis ganda: ' + x.id);
    qids.add(x.id);
    const sh = x.shard || x.id;
    if (!L.quizzes.has(sh)) P.push('kuis ' + x.id + ': berkas data/quiz/' + sh + '.js tidak ada');
  });
  L.quizzes.forEach((_, qid) => { if (!m.quiz.some(x => (x.shard || x.id) === qid)) P.push('shard kuis "' + qid + '" tidak dirujuk manifest (yatim)'); });
  L.quizzes.forEach((_, qid) => { if (L.quizFiles.get(qid) !== 'quiz/' + qid + '.js') P.push('kuis "' + qid + '" didefinisikan di ' + L.quizFiles.get(qid) + ' (nama berkas harus quiz/' + qid + '.js)'); });
  try {
    const r = makeResolver(m, L.shards); m.decks.forEach(d => r.resolve(d.id));
    m.decks.filter(d => d.patch).forEach(d => {
      const plain = new Set(); for (const cid of d.children) r.resolve(cid).forEach(c => plain.add(cardKey(c)));
      L.shards.get(d.patch)[d.id].forEach(c => { if (!plain.has(cardKey(c))) P.push('deck ' + d.id + ': kartu revisi "' + cardKey(c) + '" tidak ada di gabungan anak (revisi tak terpakai)'); });
    });
  } catch (e) { P.push(e.message); }
  return P;
}

function dirBytes(dir) {
  let n = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const f of fs.readdirSync(dir)) { const p = path.join(dir, f), st = fs.statSync(p); n += st.isDirectory() ? dirBytes(p) : st.size; }
  return n;
}

module.exports = {
  ROOT, DATA_DIR, DEFAULT_FRONT_SUB, DROPPED_IDS, CARD_KEYS,
  cardKey, normCard, cardSig, dedupeByKey, normQuiz, quizSig,
  q, fmtCard, fmtShard, fmtQuizShard, fmtManifest, fmtLocks,
  readLegacy, loadNewData, makeResolver, checkStructure, dirBytes, listJs
};
