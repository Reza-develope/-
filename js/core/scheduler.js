/* =====================================================================
   js/core/scheduler.js — PENJADWAL KARTU (lapisan di atas mesin FSRS-7).
   Meniru perilaku DefaultScheduler ts-fsrs v6 / Anki modern:
     • status kartu: 0 Baru · 1 Belajar · 2 Review · 3 Belajar-ulang
     • langkah belajar (default 1m 10m) & langkah belajar-ulang (10m)
     • "model boleh menimpa langkah" (default FSRS-7): interval hasil model yang lebih panjang
       menggantikan langkah; "Lagi" dibatasi paling lama `graduating` hari
     • interval ≥ 1 hari dibulatkan ke HARI UTUH dan jatuh tempo pada pergantian hari (04.00)
     • interval < 1 hari tetap di status belajar dengan jam jatuh tempo persis
     • urutan Lagi ≤ Sulit ≤ Bagus ≤ Mudah dijaga (selisih ≥ 1 hari setelah tingkat-hari)
     • fuzz deterministik (hasil sama untuk kartu+percobaan yang sama, jadi pratinjau = hasil nyata)
     • penanda "leech" (kartu yang terlalu sering lupa)
   Murni fungsi: tidak menyentuh DOM maupun penyimpanan. Dites di tools/test-scheduler.js.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  if (!FC.util && typeof require === 'function') require('./util.js');
  if (!FC.fsrs && typeof require === 'function') require('./fsrs.js');
  var U = FC.util, FSRS = FC.fsrs;

  var ST = { NEW: 0, LEARN: 1, REVIEW: 2, RELEARN: 3 };
  var DAY = U.DAY;

  var DEFAULTS = {
    dr: 0.9,                 // target peluang ingat saat review (0.70–0.99)
    learnSteps: [1, 10],     // menit
    relearnSteps: [10],      // menit
    graduating: 1,           // hari — interval minimum kartu review
    override: true,          // model FSRS boleh menimpa langkah belajar
    fuzz: true,              // sebar interval ≥ 2,5 hari sedikit supaya kartu tidak menumpuk di hari yang sama
    maxIvl: 36500,           // hari
    leech: 8,                // jumlah lupa sebelum dianggap leech (0 = mati)
    rollover: 4,             // jam pergantian hari belajar
    weights: null            // null = bobot bawaan FSRS-7
  };

  function normalize(cfg) {
    var c = Object.assign({}, DEFAULTS, cfg || {});
    c.dr = U.clamp(+c.dr || DEFAULTS.dr, 0.7, 0.99);
    var steps = function (a, def) { return (Array.isArray(a) ? a : def).map(Number).filter(function (x) { return isFinite(x) && x > 0; }); };
    c.learnSteps = steps(c.learnSteps, DEFAULTS.learnSteps);
    c.relearnSteps = steps(c.relearnSteps, DEFAULTS.relearnSteps);
    c.graduating = Math.max(1, Math.round(+c.graduating || 1));
    c.maxIvl = Math.max(1, Math.round(+c.maxIvl || DEFAULTS.maxIvl));
    c.leech = Math.max(0, Math.round(+c.leech || 0));
    c.rollover = U.clamp(Math.round(+c.rollover || 0), 0, 12);
    c.override = !!c.override; c.fuzz = !!c.fuzz;
    return c;
  }

  /* ---------- tabel langkah (setara calculateLearningSteps) ---------- */
  function stepTable(cfg, st, step) {
    var steps = (st === ST.RELEARN || st === ST.REVIEW) ? cfg.relearnSteps : cfg.learnSteps;
    var n = steps.length;
    if (n === 0 || step >= n) return {};
    var cur = steps[Math.max(0, step)];
    if (st === ST.REVIEW) return { 1: { min: cur, next: 0 } };
    var first = steps[0], second = n > 1 ? steps[1] : undefined;
    var hard = second === undefined ? first * 1.5 : (first + second) / 2;
    var out = { 1: { min: first, next: 0 }, 2: { min: hard, next: step } };
    var nextUnit = steps[step + 1];
    if (nextUnit) {
      var nextMin = (step === 0 && second !== undefined) ? second : nextUnit;
      if (nextMin > 0) out[3] = { min: nextMin, next: step + 1 };
    }
    return out;
  }

  /* ---------- fuzz ---------- */
  var FUZZ = [{ start: 2.5, end: 7, factor: 0.15 }, { start: 7, end: 20, factor: 0.1 }, { start: 20, end: Infinity, factor: 0.05 }];
  function fuzzRange(iv, elapsed, maxIvl) {
    var delta = 1;
    FUZZ.forEach(function (r) { delta += r.factor * Math.max(Math.min(iv, r.end) - r.start, 0); });
    var capped = Math.min(iv, maxIvl);
    var min = Math.max(2, Math.round(capped - delta));
    var max = Math.min(Math.round(capped + delta), maxIvl);
    if (capped > elapsed) min = Math.max(min, elapsed + 1);
    return { min: Math.min(min, max), max: max };
  }
  function applyFuzz(iv, elapsedWhole, cfg, seed) {
    if (!cfg.fuzz || iv < 2.5) return iv;
    var r = fuzzRange(iv, elapsedWhole, cfg.maxIvl);
    return Math.floor(U.seededRng(seed)() * (r.max - r.min + 1) + r.min);
  }

  /* ---------- urutan interval (setara calculateScheduleDay) ---------- */
  var sec = function (d) { return Math.round(d * 86400); };
  function scheduleDay(cands, maxIvl) {
    var day, sub = cands[0];
    for (var i = 0; i < cands.length; i++) {
      var iv = cands[i];
      if (iv >= 1) {
        day = Math.min(day === undefined ? iv : Math.max(iv, day + 1), maxIvl);
      } else if (day === undefined && i > 0) {
        var raised = Math.max(iv, sub);
        sub = (sub > 0 && sec(iv) >= sec(cands[i - 1]) && sec(raised) === sec(sub)) ? sub + 1 / 86400 : raised;
      }
    }
    return day !== undefined ? day : sub;
  }

  function create(userCfg) {
    var cfg = normalize(userCfg);
    var fsrs = FSRS.create(cfg.weights || undefined);

    function elapsedOf(card, now) { return card && card.lr ? Math.max(0, (now - card.lr) / DAY) : 0; }
    function memOf(card) { return card && card.s ? { s: card.s, sf: card.sf, d: card.d } : null; }

    /** Peluang ingat sekarang (0..1); null untuk kartu baru. */
    function retrievability(card, now) {
      if (!card || !card.s) return null;
      return fsrs.retrievability(elapsedOf(card, now), memOf(card));
    }

    /**
     * Hasil untuk keempat nilai (indeks 0..3 = Lagi, Sulit, Bagus, Mudah) tanpa mengubah apa pun.
     * Tiap hasil: {grade, st, step, mem, ivl, due, overrides}.  ivl dalam HARI (pecahan bila < 1).
     */
    function outcomes(card, now, key) {
      var st = card ? card.st : ST.NEW, step = card ? (card.step || 0) : 0;
      var el = elapsedOf(card, now), mem = memOf(card);
      var seed = key + ':' + (card ? card.reps || 0 : 0);
      var table = stepTable(cfg, st, step);
      var hasSteps = ((st === ST.RELEARN || st === ST.REVIEW) ? cfg.relearnSteps : cfg.learnSteps).length > 0;

      var mems = [], raw = [], over = [];
      for (var g = 1; g <= 4; g++) {
        var m = fsrs.nextState(mem, el, g);
        mems.push(m);
        var modelIv = (function (mm) { return function () { return applyFuzz(fsrs.nextInterval(mm, cfg.dr), Math.floor(el), cfg, seed); }; })(m);
        var t = table[g], si = t ? Math.round(Math.max(0, t.min) * 60) / 60 / 1440 : undefined;
        if (si !== undefined && !(si > 0)) si = undefined;
        var iv;
        if (g === 1) {
          if (si === undefined) iv = modelIv();
          else iv = cfg.override ? Math.max(si, Math.min(modelIv(), cfg.graduating)) : si;
        } else if (si === undefined) {
          iv = hasSteps ? Math.max(modelIv(), cfg.graduating) : modelIv();
        } else {
          iv = cfg.override ? Math.max(si, modelIv()) : si;
        }
        raw.push(iv);
        over.push(si !== undefined && iv !== si);
      }

      var out = [];
      for (var i = 0; i < 4; i++) {
        var fin = scheduleDay(raw.slice(0, i + 1), cfg.maxIvl);
        if (fin >= 1) fin = Math.max(1, Math.round(fin));
        var learnSt = st === ST.NEW ? ST.LEARN : st === ST.REVIEW ? ST.RELEARN : st;
        var stay = (i === 0 && over[0]) || fin < cfg.graduating;
        var nst = stay ? learnSt : ST.REVIEW;
        var nstep = stay && table[i + 1] ? Math.max(0, table[i + 1].next) : 0;
        var due = fin >= 1 ? U.dayStart(U.dayIndex(now, cfg.rollover) + fin, cfg.rollover) : now + Math.round(fin * 86400) * 1000;
        out.push({ grade: i + 1, st: nst, step: nstep, mem: mems[i], ivl: fin, due: due, overrides: over[i] });
      }
      return out;
    }

    /**
     * Terapkan satu jawaban. `prev` = catatan kartu (atau null bila baru), `ident` = {k,id,dir,sh,dk,created}
     * untuk kartu baru. Mengembalikan {card, log, leech, first, outcomes} — `prev` tidak diubah.
     */
    function apply(prev, grade, now, ident, extra) {
      var base = prev || Object.assign({ st: ST.NEW, s: 0, sf: 0, d: 0, due: 0, lr: 0, step: 0, reps: 0, lapses: 0 }, ident || {});
      var outs = outcomes(prev, now, base.k || '');
      var o = outs[grade - 1];
      var r = retrievability(prev, now);
      var prevSt = prev ? prev.st : ST.NEW;
      var lapsed = grade === 1 && prevSt === ST.REVIEW;
      var card = Object.assign({}, base, {
        st: o.st, step: o.step, s: o.mem.s, sf: o.mem.sf, d: o.mem.d, due: o.due, lr: now,
        reps: (base.reps || 0) + 1, lapses: (base.lapses || 0) + (lapsed ? 1 : 0), ivl: o.ivl
      });
      var round = function (x, dp) { var f = Math.pow(10, dp); return Math.round(x * f) / f; };
      var log = {
        id: now, k: base.k, g: grade, st: prevSt,
        el: round(elapsedOf(prev, now), 4), iv: round(o.ivl, 4),
        s: round(o.mem.s, 4), sf: round(o.mem.sf, 4), d: round(o.mem.d, 3),
        r: r == null ? null : round(r, 4), ms: (extra && extra.ms) || 0
      };
      var leech = lapsed && cfg.leech > 0 && card.lapses >= cfg.leech &&
        ((card.lapses - cfg.leech) % Math.max(1, Math.ceil(cfg.leech / 2)) === 0);
      return { card: card, log: log, leech: leech, first: prevSt === ST.NEW, outcomes: outs };
    }

    return { cfg: cfg, fsrs: fsrs, outcomes: outcomes, apply: apply, retrievability: retrievability, stepTable: function (st, step) { return stepTable(cfg, st, step); } };
  }

  var Scheduler = { ST: ST, DEFAULTS: DEFAULTS, normalize: normalize, create: create, fuzzRange: fuzzRange, scheduleDay: scheduleDay };
  FC.scheduler = Scheduler;
  if (typeof module !== 'undefined' && module.exports) module.exports = Scheduler;
})(typeof window !== 'undefined' ? window : globalThis);
