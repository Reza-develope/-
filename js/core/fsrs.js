/* =====================================================================
   js/core/fsrs.js — MESIN INGATAN FSRS-7 (Free Spaced Repetition Scheduler, "dual-trace").
   Ini model ingatan yang dipakai Anki modern & pustaka resmi open-spaced-repetition (ts-fsrs v6).

   Tiap kartu punya tiga angka ingatan:
     s  = stability       (seberapa awet ingatan "pelan"; hari sampai peluang ingat turun ke 90%)
     sf = stabilityFast   (jejak ingatan "cepat"; terutama berperan di hitungan jam–hari pertama)
     d  = difficulty      (1 = mudah … 10 = sulit)
   Waktu selalu dalam HARI PECAHAN (mis. 10 menit = 10/1440), jadi pengulangan di hari yang
   sama (langkah belajar) ikut terhitung presisi, tidak perlu rumus khusus "same-day".

   File ini murni matematika (tanpa DOM, tanpa penyimpanan). Dibuktikan cocok dengan kode
   resmi lewat tools/test-fsrs.js (vektor emas dari implementasi referensi).
   ===================================================================== */
(function (root) {
  'use strict';

  // 34 bobot bawaan FSRS-7 (fsrs-rs inference_v7 / srs-benchmark init_w)
  const DEFAULT_W = Object.freeze([
    0.1104, 2.2395, 3.9221, 11.7841, 6.1686, 0.6457, 3.6807, 1.9795, 0, 1.3826,
    0.7024, 0.5999, 0.8146, 0.6398, 1, 1.3207, 0.6707, 3.8668, 0.4416, 0.0934,
    1.8631, 0.6162, 1.0869, 0.1567, 0.0801, 0.2421, 0.9464, 0.1433, 0.7145, 0,
    0.5667, 0.3734, 0.5333, 0.3048
  ]);

  const B = { sMin: 0.0001, sMax: 36500, sfMin: 0.0001, sfMax: 36500, dMin: 1, dMax: 10 };
  const MIN_T = 1 / 86400, LOG_MIN_T = Math.log(MIN_T);
  const DR_MIN = 0.0001, DR_MAX = 0.9999;
  const LOG_S_MAX = Math.log(B.sMax);

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const round8 = x => Math.round(x * 1e8) / 1e8;

  function create(weights) {
    const w = weights || DEFAULT_W;
    if (!Array.isArray(w) && !(w && w.length)) throw new Error('FSRS-7 butuh 34 bobot');
    if (w.length !== 34 || !Array.prototype.every.call(w, Number.isFinite)) throw new Error('FSRS-7 butuh tepat 34 bobot berhingga');

    /* ---- kurva lupa: campuran dua pangkat (jejak cepat + jejak pelan) ---- */
    function prepareFast(sFast) {
      const decay = -clamp(w[23] * Math.pow(sFast, w[33] - 0.3), 0.01, 0.95);
      const factor = Math.exp(Math.min(Math.log(w[25]) / decay, 60)) - 1;
      return { decay, scale: factor / sFast };
    }
    function fastComponent(t, p) {
      const base = 1 + p.scale * Math.max(t, 0);
      return { recall: Math.pow(base, p.decay), derivative: p.decay * Math.pow(base, p.decay - 1) * p.scale };
    }
    function prepareCurve(st) {
      const s = clamp(st.s, B.sMin, B.sMax), sf = clamp(st.sf, B.sfMin, B.sfMax), d = clamp(st.d, B.dMin, B.dMax);
      const fast = prepareFast(sf);
      const decay = -clamp(w[24], 0.01, 0.95);
      const scale = ((Math.pow(w[26], 1 / decay) - 1) * Math.exp((d - 5) * (w[32] - 0.3))) / s;
      const weight1 = w[27] * Math.pow(sf, -w[29]);
      const weight2 = w[28] * Math.pow(s, w[30]) * Math.exp((d - 5) * (w[31] - 0.5));
      return { fast, decay, scale, weight1, weight2, total: weight1 + weight2 };
    }
    function computeCurve(t, p) {
      const days = Math.max(t, 0);
      const fast = fastComponent(days, p.fast);
      const base = 1 + p.scale * days;
      const slow = Math.pow(base, p.decay);
      const derivative = p.decay * Math.pow(base, p.decay - 1) * p.scale;
      return {
        retrievability: ((p.weight1 * fast.recall + p.weight2 * slow) / p.total) * (1 - 2e-5) + 1e-5,
        derivative: ((p.weight1 * fast.derivative + p.weight2 * derivative) / p.total) * (1 - 2e-5)
      };
    }

    /** Peluang ingat (0..1) setelah t hari sejak review terakhir. */
    function retrievability(t, st) { return computeCurve(t, prepareCurve(st)).retrievability; }

    /** Hari (pecahan) sampai peluang ingat turun ke `desiredRetention` — Newton + bisection cadangan. */
    function nextInterval(st, desiredRetention) {
      if (!(desiredRetention > 0 && desiredRetention < 1)) throw new Error('Retensi harus di antara 0 dan 1');
      const target = clamp(desiredRetention, DR_MIN, DR_MAX);
      if (target >= DR_MAX) return 0;
      const s = clamp(st.s, B.sMin, B.sMax), sf = clamp(st.sf, B.sfMin, B.sfMax);
      const maxStability = Math.max(s, sf);
      const p = prepareCurve(st);
      let logT = Math.log(maxStability);
      for (let i = 0; i < 7; i++) {
        logT = clamp(logT, LOG_MIN_T, LOG_S_MAX);
        const t = clamp(Math.exp(logT), MIN_T, B.sMax);
        const c = computeCurve(t, p);
        logT -= clamp((c.retrievability - target) / Math.min(c.derivative * t, -1e-12), -4, 4);
        if (!Number.isFinite(logT)) break;
      }
      const interval = clamp(Math.exp(logT), 0, B.sMax);
      if (Math.abs(computeCurve(interval, p).retrievability - target) <= 1e-3) return interval;
      let low = 0, high = Math.min(Math.max(maxStability, 1), B.sMax);
      while (computeCurve(high, p).retrievability > target && high < B.sMax) high = Math.min(high * 2, B.sMax);
      for (let i = 0; i < 50; i++) {
        const mid = (low + high) / 2;
        if (computeCurve(mid, p).retrievability > target) low = mid; else high = mid;
      }
      return (low + high) / 2;
    }

    /* ---- pembaruan ingatan ---- */
    const initStability = g => clamp(w[g - 1], B.sMin, B.sMax);
    const initDifficulty = g => w[4] - Math.exp(w[5] * (g - 1)) + 1;

    function nextStability(s, d, r, g, start) {
      const fail = w[start + 3] * (Math.pow(s + 1, w[start + 4]) - 1) * Math.exp((1 - r) * w[start + 5]);
      const pls = Math.min(s, fail);
      if (g === 1) return pls;
      const hardPenalty = g === 2 ? w[start + 6] : 1;
      const easyBonus = g === 4 ? w[start + 7] : 1;
      const increase = Math.exp(w[start] - 1.5) * (11 - d) * Math.pow(s, -w[start + 1]) *
        (Math.exp((1 - r) * w[start + 2]) - 1) * hardPenalty * easyBonus + 1;
      return Math.max(pls, s * increase);
    }

    /**
     * Ingatan baru setelah satu review.
     * @param mem  {s, sf, d} sebelumnya, atau null untuk kartu baru
     * @param t    hari (pecahan) sejak review terakhir (diabaikan untuk kartu baru)
     * @param g    1=Lagi 2=Sulit 3=Bagus 4=Mudah
     */
    function nextState(mem, t, g) {
      if (!(g >= 1 && g <= 4) || g !== Math.floor(g)) throw new Error('Nilai harus 1..4');
      if (!mem || (!mem.s && !mem.sf && !mem.d)) {
        const s0 = initStability(g);
        return {
          s: clamp(round8(s0), B.sMin, B.sMax),
          sf: clamp(round8(s0 * 0.8), B.sfMin, B.sfMax),
          d: clamp(round8(initDifficulty(g)), B.dMin, B.dMax)
        };
      }
      const s = clamp(mem.s, B.sMin, B.sMax), sf = clamp(mem.sf, B.sfMin, B.sfMax), d = clamp(mem.d, B.dMin, B.dMax);
      const r = computeCurve(t, prepareCurve(mem)).retrievability;
      const stability = nextStability(s, d, r, g, 7);
      let stabilityFast = nextStability(sf, d, fastComponent(t, prepareFast(sf)).recall, g, 15);
      if (g === 1) stabilityFast = Math.min(stabilityFast, stability * 0.8);
      let deltaD = -w[6] * (g - 3);
      if (g === 1) deltaD *= r + 0.1;
      const difficulty = 0.01 * initDifficulty(4) + 0.99 * (d + ((10 - d) * deltaD) / 9);
      return {
        s: clamp(round8(stability), B.sMin, B.sMax),
        sf: clamp(round8(stabilityFast), B.sfMin, B.sfMax),
        d: clamp(round8(difficulty), B.dMin, B.dMax)
      };
    }

    return { weights: w, retrievability, nextInterval, nextState, initStability, initDifficulty };
  }

  const FSRS = { VERSION: 7, DEFAULT_W, create, MAX_S: B.sMax };
  if (typeof module !== 'undefined' && module.exports) module.exports = FSRS;
  root.FC = root.FC || {};
  root.FC.fsrs = FSRS;
})(typeof window !== 'undefined' ? window : globalThis);
