/* =====================================================================
   js/core/util.js — alat kecil bersama: hash, hari belajar, format, DOM.
   Semua dipasang di FC.util. Tidak butuh pustaka luar; aman dijalankan di Node (untuk tes).
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  var U = FC.util = {};

  /* ---------- hash & PRNG ---------- */
  // cyrb53 — hash 53-bit cepat (domain publik). Dipakai membuat ID kartu yang stabil.
  U.hash = function (str, seed) {
    seed = seed || 0;
    var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
  // ID kartu = hash(depan + pemisah + bacaan). Kartu yang sama di beberapa deck = satu kartu = satu progres.
  U.cardId = function (front, back) { return U.hash(String(front) + '\u0001' + String(back)).toString(36); };
  U.fnv1a32 = function (str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return h >>> 0;
  };
  U.mulberry32 = function (seed) {
    var a = seed >>> 0;
    return function () {
      var t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  U.seededRng = function (seedStr) { return U.mulberry32(U.fnv1a32(String(seedStr))); };
  U.shuffle = function (arr, rng) {
    rng = rng || Math.random;
    for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
    return arr;
  };

  /* ---------- hari belajar (ganti hari pukul `rollover`, default 04.00 waktu setempat) ---------- */
  var DAY = 86400000, HOUR = 3600000;
  U.DAY = DAY; U.HOUR = HOUR; U.MIN = 60000;
  U.dayIndex = function (ms, rollover) {
    var d = new Date(ms - (rollover == null ? 4 : rollover) * HOUR);
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY);
  };
  // epoch ms saat hari belajar ke-`idx` dimulai (jam `rollover` waktu setempat)
  U.dayStart = function (idx, rollover) {
    var d = new Date(idx * DAY);
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), rollover == null ? 4 : rollover, 0, 0, 0).getTime();
  };
  U.dayKey = function (idx) { var d = new Date(idx * DAY); return d.getUTCFullYear() + '-' + U.pad2(d.getUTCMonth() + 1) + '-' + U.pad2(d.getUTCDate()); };
  U.pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
  U.clamp = function (v, lo, hi) { return Math.min(Math.max(v, lo), hi); };

  /* ---------- format ---------- */
  var nf = function (x, dp) { var s = x.toFixed(dp); if (dp) s = s.replace(/\.?0+$/, ''); return s.replace('.', ','); };
  // interval dalam HARI (boleh pecahan) → teks singkat: "10 mnt", "3 jam", "5 hr", "2,5 bln", "1,3 th"
  U.fmtInterval = function (days) {
    var min = days * 1440;
    if (min < 1) return '<1 mnt';
    if (min < 59.5) return Math.round(min) + ' mnt';
    var hr = min / 60;
    if (hr < 23.5) return Math.round(hr) + ' jam';
    if (days < 30) return Math.round(days) + ' hr';
    if (days < 365) return nf(days / 30.4375, 1) + ' bln';
    return nf(days / 365.25, 1) + ' th';
  };
  U.fmtNum = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  U.fmtPct = function (x, dp) { return nf(x * 100, dp == null ? 0 : dp) + '%'; };
  U.fmtDur = function (ms) {
    var s = Math.round(ms / 1000);
    if (s < 60) return s + ' dtk';
    var m = Math.floor(s / 60); if (m < 60) return m + ' mnt' + (s % 60 && m < 10 ? ' ' + (s % 60) + ' dtk' : '');
    return Math.floor(m / 60) + ' jam ' + (m % 60) + ' mnt';
  };
  var BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  var HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  U.BLN = BLN; U.HARI = HARI;
  U.fmtDate = function (ms, withTime) {
    var d = new Date(ms);
    return d.getDate() + ' ' + BLN[d.getMonth()] + ' ' + d.getFullYear() + (withTime ? ', ' + U.pad2(d.getHours()) + '.' + U.pad2(d.getMinutes()) : '');
  };
  U.fmtDayShort = function (idx) { var d = new Date(idx * DAY); return HARI[d.getUTCDay()] + ', ' + d.getUTCDate() + ' ' + BLN[d.getUTCMonth()]; };
  // "5 mnt lalu", "kemarin" …
  U.fmtAgo = function (ms, now) {
    var diff = (now || Date.now()) - ms;
    if (diff < 60000) return 'baru saja';
    if (diff < HOUR) return Math.round(diff / 60000) + ' mnt lalu';
    if (diff < DAY) return Math.round(diff / HOUR) + ' jam lalu';
    var dd = Math.round(diff / DAY);
    return dd === 1 ? 'kemarin' : dd + ' hari lalu';
  };

  /* ---------- teks & DOM ---------- */
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  U.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); };
  U.norm = function (s) { return String(s || '').toLowerCase().normalize('NFKC'); };   // untuk pencarian
  U.debounce = function (fn, ms) { var t; return function () { var a = arguments, th = this; clearTimeout(t); t = setTimeout(function () { fn.apply(th, a); }, ms); }; };

  /* h('div.kelas#id', {atribut}, anak…) — pembuat elemen ringkas. Teks anak otomatis aman (textContent). */
  U.h = function (sel, attrs) {
    var m = /^([a-z0-9-]*)((?:[.#][\w-]+)*)$/i.exec(sel || 'div');
    var el = document.createElement(m && m[1] ? m[1] : 'div');
    if (m && m[2]) m[2].replace(/([.#])([\w-]+)/g, function (_, k, v) { if (k === '#') el.id = v; else el.classList.add(v); });
    var i = 1;
    if (attrs && typeof attrs === 'object' && !(attrs.nodeType) && !Array.isArray(attrs)) {
      i = 2;
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') v.split(/\s+/).forEach(function (c) { if (c) el.classList.add(c); });
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (k === 'dataset') Object.keys(v).forEach(function (d) { el.dataset[d] = v[d]; });
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, v);
      });
    }
    for (; i < arguments.length; i++) U.append(el, arguments[i]);
    return el;
  };
  U.append = function (el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { U.append(el, x); });
    else if (c.nodeType) el.appendChild(c);
    else el.appendChild(document.createTextNode(String(c)));
  };
  U.$ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  U.$$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  U.clear = function (el) { while (el.firstChild) el.removeChild(el.firstChild); return el; };
  U.vibrate = function (ms) { try { if (navigator.vibrate) navigator.vibrate(ms || 10); } catch (e) {} };

  if (typeof module !== 'undefined' && module.exports) module.exports = U;
})(typeof window !== 'undefined' ? window : globalThis);
