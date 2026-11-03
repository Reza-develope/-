#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-fsrs.js — membuktikan js/core/fsrs.js cocok dengan implementasi referensi FSRS-7.

   Sumber kebenaran ada dua:
   1) tools/fsrs-golden.json — ±1.100 vektor yang dihasilkan langsung oleh kode resmi ts-fsrs v6
      (FSRS7Algorithm), mencakup kartu baru, next_state acak, kurva lupa, interval, dan rantai review.
   2) Vektor "known-answer" dari repositori resmi (fsrs-rs c9562d6 & srs-benchmark b4b0254),
      yang di sana pun diuji sampai 4 angka desimal.

   Pakai:  node tools/test-fsrs.js
   ===================================================================== */
const fs = require('fs');
const path = require('path');
const FSRS = require('../js/core/fsrs.js');
const G = JSON.parse(fs.readFileSync(path.join(__dirname, 'fsrs-golden.json'), 'utf8'));
const f = FSRS.create();

let pass = 0, fail = 0;
const bad = [];
const near = (a, b, rel) => a === b || Math.abs(a - b) <= rel * Math.max(1, Math.abs(a), Math.abs(b));
function check(name, cond, info) { if (cond) pass++; else { fail++; if (bad.length < 15) bad.push(name + (info ? ' → ' + info : '')); } }
const sameState = (a, b) => a.s === b.s && a.sf === b.sf && a.d === b.d;
const fmt = o => JSON.stringify(o);

/* 1) kartu baru */
G.init.forEach(c => { const got = f.nextState(null, 0, c.g); check('init g=' + c.g, sameState(got, c.out), fmt(got) + ' ≠ ' + fmt(c.out)); });

/* 2) next_state: harus identik sampai bit terakhir (pembulatan 8 desimal sama-sama dipakai) */
G.state.forEach((c, i) => { const got = f.nextState(c.mem, c.t, c.g); check('state#' + i, sameState(got, c.out), fmt(got) + ' ≠ ' + fmt(c.out)); });

/* 3) kurva lupa */
G.curve.forEach((c, i) => {
  const r = f.retrievability(c.t, c.mem);
  check('kurva#' + i, near(r, c.r, 1e-12), r + ' ≠ ' + c.r);
});

/* 4) interval */
G.interval.forEach((c, i) => {
  const d = f.nextInterval(c.mem, c.dr);
  check('interval#' + i, near(d, c.days, 1e-9), d + ' ≠ ' + c.days);
  // dan benar-benar kembali ke retensi yang diminta
  const back = f.retrievability(d, c.mem);
  check('interval-balik#' + i, Math.abs(back - c.dr) < 2e-3 || d >= 36499, 'R(' + d + ')=' + back + ' vs ' + c.dr);
});

/* 5) rantai review */
G.chains.forEach((ch, ci) => {
  let mem = null;
  ch.forEach((st, k) => {
    mem = f.nextState(mem, st.t, st.g);
    check('rantai ' + ci + '.' + k, sameState(mem, st.out), fmt(mem) + ' ≠ ' + fmt(st.out));
    check('rantai-iv ' + ci + '.' + k, near(f.nextInterval(mem, 0.9), st.iv90, 1e-9));
  });
});

/* 6) known-answer dari fsrs-rs / srs-benchmark (4 desimal) */
{
  const ratings = [1, 3, 3, 3, 3, 3], gaps = [0, 0, 1, 3, 8, 21];
  const expect = [
    { d: 6.1686, s: 0.1104, sf: 0.0883 }, { d: 6.1092, s: 0.1104, sf: 0.0883 },
    { d: 6.0504, s: 0.9169, sf: 44.4442 }, { d: 5.9922, s: 3.5338, sf: 193.5973 },
    { d: 5.9346, s: 10.186, sf: 407.6265 }, { d: 5.8775, s: 25.9857, sf: 700.5589 }
  ];
  let mem = null;
  ratings.forEach((g, i) => {
    mem = f.nextState(mem, gaps[i], g);
    const r4 = { d: +mem.d.toFixed(4), s: +mem.s.toFixed(4), sf: +mem.sf.toFixed(4) };
    check('KAT fsrs-rs #' + i, fmt(r4) === fmt(expect[i]), fmt(r4) + ' ≠ ' + fmt(expect[i]));
  });
}

/* 7) sifat-sifat yang harus selalu benar */
{
  // waktu negatif diperlakukan 0 (tidak NaN)
  const m = { s: 10, sf: 8, d: 5 };
  [-1e-9, -1, -36500].forEach(t => { check('t negatif ' + t, f.retrievability(t, m) === f.retrievability(0, m) && sameState(f.nextState(m, t, 3), f.nextState(m, 0, 3))); });
  // Lagi ≤ Sulit ≤ Bagus ≤ Mudah pada stabilitas (untuk keadaan realistis)
  let monotone = true;
  G.state.forEach(c => { const a = [1, 2, 3, 4].map(g => f.nextState(c.mem, c.t, g).s); if (!(a[0] <= a[1] + 1e-9 && a[1] <= a[2] + 1e-9 && a[2] <= a[3] + 1e-9)) monotone = false; });
  check('stabilitas monoton terhadap nilai', monotone);
  // bobot salah ditolak
  let threw = false; try { FSRS.create([1, 2, 3]); } catch (e) { threw = true; } check('bobot salah ditolak', threw);
  // nilai salah ditolak
  threw = false; try { f.nextState(null, 0, 5); } catch (e) { threw = true; } check('nilai 5 ditolak', threw);
  // retensi di luar (0,1) ditolak
  threw = false; try { f.nextInterval(m, 1); } catch (e) { threw = true; } check('retensi 1 ditolak', threw);
  // interval membesar bila retensi diturunkan
  check('interval naik saat retensi turun', f.nextInterval(m, 0.8) > f.nextInterval(m, 0.9) && f.nextInterval(m, 0.9) > f.nextInterval(m, 0.97));
  // kurva menurun terhadap waktu, antara 0 dan 1
  let prev = 2, okc = true; for (let t = 0; t < 400; t += 3) { const r = f.retrievability(t, m); if (!(r <= prev + 1e-12 && r > 0 && r < 1)) okc = false; prev = r; } check('kurva menurun di (0,1)', okc);
}

console.log('FSRS-7: ' + pass + ' lulus, ' + fail + ' gagal');
if (fail) { bad.forEach(b => console.log('  ✗ ' + b)); process.exit(1); }
console.log('LULUS — js/core/fsrs.js cocok dengan implementasi referensi.');
