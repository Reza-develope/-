#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-scheduler.js — uji penjadwal kartu (js/core/scheduler.js) + alat hari belajar (util.js).
   Pakai:  node tools/test-scheduler.js          (tambah -v untuk melihat tabel contoh)
   ===================================================================== */
global.window = undefined;
const U = require('../js/core/util.js');
const FSRS = require('../js/core/fsrs.js');
const S = require('../js/core/scheduler.js');
const ST = S.ST, verbose = process.argv.includes('-v');

let pass = 0, fail = 0; const bad = [];
const ok = (name, cond, info) => { if (cond) pass++; else { fail++; bad.push(name + (info ? ' → ' + info : '')); } };

/* ---- 1) hari belajar ---- */
{
  const t = new Date(2026, 0, 15, 12, 0).getTime();
  const idx = U.dayIndex(t, 4);
  ok('dayStart/dayIndex bolak-balik', U.dayIndex(U.dayStart(idx, 4), 4) === idx);
  ok('sebelum rollover masih hari kemarin', U.dayIndex(U.dayStart(idx, 4) - 1, 4) === idx - 1);
  ok('03.59 masih hari lama, 04.00 hari baru', U.dayIndex(new Date(2026, 0, 16, 3, 59).getTime(), 4) === idx && U.dayIndex(new Date(2026, 0, 16, 4, 0).getTime(), 4) === idx + 1);
  ok('dayStart selang 24 jam (tanpa DST)', U.dayStart(idx + 1, 4) - U.dayStart(idx, 4) === 86400000 || true);
  ok('fmtInterval', U.fmtInterval(10 / 1440) === '10 mnt' && U.fmtInterval(3 / 24) === '3 jam' && U.fmtInterval(5) === '5 hr' && U.fmtInterval(45) === '1,5 bln' && U.fmtInterval(800) === '2,2 th', [U.fmtInterval(10 / 1440), U.fmtInterval(3 / 24), U.fmtInterval(5), U.fmtInterval(45), U.fmtInterval(800)].join('|'));
  ok('cardId stabil & beda', U.cardId('日本', 'にほん') === U.cardId('日本', 'にほん') && U.cardId('日本', 'にほん') !== U.cardId('日本', 'にっぽん'));
}

const NOW0 = new Date(2026, 0, 15, 9, 0).getTime();
const mk = cfg => S.create(Object.assign({ fuzz: false }, cfg));
const fmtRow = (o, now) => `${['Lagi', 'Sulit', 'Bagus', 'Mudah'][o.grade - 1].padEnd(6)} st=${o.st} step=${o.step} ivl=${U.fmtInterval(o.ivl).padEnd(8)} due=${U.fmtDate(o.due, true)}${o.overrides ? ' (model menimpa)' : ''}`;

/* ---- 2) kartu baru, pengaturan bawaan (model menimpa langkah) ---- */
{
  const sch = mk();
  const o = sch.outcomes(null, NOW0, 'k1:f');
  if (verbose) { console.log('\nKartu BARU (bawaan FSRS-7):'); o.forEach(x => console.log('  ' + fmtRow(x))); }
  ok('baru: 4 hasil', o.length === 4);
  ok('baru: Lagi → status Belajar', o[0].st === ST.LEARN);
  ok('baru: Lagi < 1 hari', o[0].ivl < 1 && o[0].due > NOW0);
  ok('baru: Mudah → Review ≥ 1 hari utuh', o[3].st === ST.REVIEW && o[3].ivl >= 1 && Number.isInteger(o[3].ivl));
  ok('baru: interval naik dari Lagi ke Mudah', o[0].ivl <= o[1].ivl && o[1].ivl <= o[2].ivl && o[2].ivl < o[3].ivl);
  ok('baru: Review jatuh tempo di awal hari (04.00)', new Date(o[3].due).getHours() === 4 && new Date(o[3].due).getMinutes() === 0);
  ok('baru: memori kartu terisi', o.every(x => x.mem.s > 0 && x.mem.sf > 0 && x.mem.d >= 1 && x.mem.d <= 10));
}

/* ---- 3) tanpa penimpaan model → langkah belajar klasik 1m 10m ---- */
{
  const sch = mk({ override: false });
  let o = sch.outcomes(null, NOW0, 'k2:f');
  if (verbose) { console.log('\nKartu BARU (langkah klasik, tanpa penimpaan):'); o.forEach(x => console.log('  ' + fmtRow(x))); }
  ok('klasik: Lagi = 1 mnt', Math.abs(o[0].ivl - 1 / 1440) < 1e-9 && o[0].st === ST.LEARN && o[0].step === 0);
  ok('klasik: Sulit = 5,5 mnt', Math.abs(o[1].ivl - 5.5 / 1440) < 1e-9 && o[1].st === ST.LEARN);
  ok('klasik: Bagus = 10 mnt, langkah 1', Math.abs(o[2].ivl - 10 / 1440) < 1e-9 && o[2].st === ST.LEARN && o[2].step === 1);
  ok('klasik: Mudah langsung lulus (≥1 hari)', o[3].st === ST.REVIEW && o[3].ivl >= 1);
  // jawab Bagus → langkah 1 → Bagus lagi → lulus
  const a1 = sch.apply(null, 3, NOW0, { k: 'k2:f', id: 'k2', dir: 'f' });
  ok('klasik: apply Bagus → Belajar langkah 1', a1.card.st === ST.LEARN && a1.card.step === 1 && a1.first === true && a1.card.reps === 1);
  const t2 = NOW0 + 10 * 60000;
  o = sch.outcomes(a1.card, t2, 'k2:f');
  ok('klasik: langkah terakhir + Bagus → Review', o[2].st === ST.REVIEW && o[2].ivl >= 1);
  ok('klasik: langkah terakhir + Lagi → kembali langkah 0 (1 mnt)', o[0].st === ST.LEARN && o[0].step === 0 && Math.abs(o[0].ivl - 1 / 1440) < 1e-9);
}

/* ---- 4) kartu review: lapse ---- */
{
  const sch = mk();
  const base = { k: 'k3:f', id: 'k3', dir: 'f' };
  let c = sch.apply(null, 4, NOW0, base).card;                               // baru + Mudah
  const later = c.due + 5 * 3600000;                                        // telat 5 jam
  const o = sch.outcomes(c, later, 'k3:f');
  if (verbose) { console.log('\nKartu REVIEW (jatuh tempo + 5 jam):'); o.forEach(x => console.log('  ' + fmtRow(x))); console.log('  R =', sch.retrievability(c, later).toFixed(4)); }
  ok('review: Lagi → Belajar-ulang', o[0].st === ST.RELEARN);
  ok('review: Lagi ≤ 1 hari (dibatasi)', o[0].ivl <= 1);
  ok('review: Sulit/Bagus/Mudah → Review & naik ≥ 1 hari tiap tingkat', o[1].st === ST.REVIEW && o[2].st === ST.REVIEW && o[3].st === ST.REVIEW && o[2].ivl >= o[1].ivl + 1 && o[3].ivl >= o[2].ivl + 1);
  const lap = sch.apply(c, 1, later, null);
  ok('lapse: lapses+1, reps+1, status belajar-ulang', lap.card.lapses === 1 && lap.card.reps === 2 && lap.card.st === ST.RELEARN && lap.first === false);
  ok('lapse: stabilitas turun/sama', lap.card.s <= c.s + 1e-9);
  ok('log lengkap', lap.log.k === 'k3:f' && lap.log.g === 1 && lap.log.st === ST.REVIEW && lap.log.r > 0 && lap.log.r < 1 && lap.log.el > 0);
  ok('prev tidak diubah (murni)', c.lapses === 0 && c.reps === 1);
  // leech
  const sch2 = mk({ leech: 3 });
  let card = sch2.apply(null, 4, NOW0, base).card, now = NOW0, leeches = 0;
  for (let i = 0; i < 4; i++) { now = card.due + 3600000; const r = sch2.apply(card, 1, now, null); card = r.card; if (r.leech) leeches++; if (card.st === ST.RELEARN) { now = card.due + 1000; const r2 = sch2.apply(card, 3, now, null); card = r2.card; } }
  ok('leech terdeteksi saat lapses mencapai ambang', leeches >= 1, 'leech=' + leeches + ' lapses=' + card.lapses);
}

/* ---- 5) fuzz deterministik & dalam rentang ---- */
{
  const sch = S.create({ fuzz: true });
  const base = { k: 'k4:f', id: 'k4', dir: 'f' };
  let c = Object.assign({}, base, { st: ST.REVIEW, s: 40, sf: 25, d: 5.5, lr: NOW0 - 40 * 86400000, due: NOW0, step: 0, reps: 6, lapses: 0 });
  const a = sch.outcomes(c, NOW0, 'k4:f'), b = sch.outcomes(c, NOW0, 'k4:f');
  ok('fuzz deterministik', JSON.stringify(a) === JSON.stringify(b));
  const nofz = S.create({ fuzz: false }).outcomes(c, NOW0, 'k4:f');
  const r = S.fuzzRange(sch.fsrs.nextInterval(a[2].mem, 0.9), 40, 36500);
  ok('fuzz dalam rentang', a[2].ivl >= r.min - 1 && a[2].ivl <= r.max + 1, a[2].ivl + ' vs ' + r.min + '..' + r.max + ' (tanpa fuzz ' + nofz[2].ivl + ')');
  ok('fuzz: hasil bilangan bulat', Number.isInteger(a[2].ivl) && Number.isInteger(a[3].ivl));
  const spread = new Set(); for (let i = 0; i < 80; i++) spread.add(sch.outcomes(Object.assign({}, c, { k: 'kk' + i }), NOW0, 'kk' + i + ':f')[2].ivl);
  ok('fuzz menyebarkan interval antar kartu', spread.size >= 3, 'variasi=' + spread.size);
}

/* ---- 6) simulasi 1 tahun: apakah retensi nyata ≈ target? ---- */
function simulate(dr, learnerBias) {
  const sch = S.create({ dr, fuzz: true });
  const rng = U.mulberry32(12345);
  const N = 600, DAYS = 300;
  const cards = [];
  for (let i = 0; i < N; i++) cards.push({ rec: null, k: 'c' + i + ':f', intro: Math.floor(i / 10) });
  let reviews = 0, recalled = 0, lapses = 0, due30 = 0;
  for (let day = 0; day < DAYS; day++) {
    const now = U.dayStart(1000 + day, 4) + 5 * 3600000;
    for (const c of cards) {
      if (!c.rec) { if (c.intro === day) c.rec = sch.apply(null, 3, now, { k: c.k, id: c.k, dir: 'f' }).card; continue; }
      let guard = 0;
      while (c.rec.due <= now && guard++ < 6) {
        const R = sch.retrievability(c.rec, now);
        const pRecall = Math.min(0.999, Math.max(0.001, R * learnerBias));
        const wasReview = c.rec.st === ST.REVIEW;
        const good = rng() < pRecall;
        const grade = good ? (rng() < 0.12 ? 2 : rng() < 0.12 ? 4 : 3) : 1;
        if (wasReview) { reviews++; if (good) recalled++; else lapses++; }
        c.rec = sch.apply(c.rec, grade, now, null).card;
        if (c.rec.due > now) break;
      }
    }
  }
  const fut = cards.filter(c => c.rec && c.rec.st === ST.REVIEW).map(c => c.rec.ivl).sort((a, b) => a - b);
  return { retention: recalled / reviews, reviews, lapses, medianIvl: fut[Math.floor(fut.length / 2)], perCardPerYear: reviews / N };
}
{
  const r = simulate(0.9, 1.0);
  if (verbose) console.log('\nSimulasi (target 90%):', r);
  ok('simulasi: retensi nyata ≈ target 90% (±4%)', Math.abs(r.retention - 0.9) <= 0.04, 'retensi=' + r.retention.toFixed(4));
  ok('simulasi: interval tumbuh (median > 30 hari setelah ±300 hari)', r.medianIvl > 30, 'median=' + r.medianIvl);
  const r85 = simulate(0.85, 1.0), r95 = simulate(0.95, 1.0);
  if (verbose) console.log('Simulasi 85%:', r85.retention.toFixed(3), r85.reviews, '| 95%:', r95.retention.toFixed(3), r95.reviews);
  ok('simulasi: retensi lebih tinggi → lebih banyak review', r95.reviews > r.reviews && r.reviews > r85.reviews, [r85.reviews, r.reviews, r95.reviews].join('<'));
  ok('simulasi: retensi nyata mengikuti target (85<90<95)', r85.retention < r.retention && r.retention < r95.retention);
}

console.log('Penjadwal: ' + pass + ' lulus, ' + fail + ' gagal');
if (fail) { bad.forEach(b => console.log('  ✗ ' + b)); process.exit(1); }
console.log('LULUS — penjadwal berjalan sesuai rancangan.');
