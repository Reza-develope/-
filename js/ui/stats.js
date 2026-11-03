/* =====================================================================
   js/ui/stats.js — tab Statistik (dari riwayat review di IndexedDB + catatan kartu).
   Satu warna (nila) berjenjang untuk semua grafik; setiap grafik punya tabel pendamping.
     • Angka utama: hari ini, hari beruntun, retensi 30 hari, jumlah kartu dipelajari
     • Aktivitas 20 minggu (peta panas) • Jadwal jatuh tempo 7/14/30 hari • Status kartu (belajar/muda/matang)
     • Retensi per minggu vs target • Sebaran jawaban 30 hari
   Riwayat harian dari aplikasi versi lama (kv "legacyDays") ikut dihitung di aktivitas & hari beruntun.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, h = U.h, ST = FC.scheduler.ST, S = FC.store;
  var NS = 'http://www.w3.org/2000/svg';
  var state = { range: 14, token: 0 }, cache = null;
  var STATS = FC.stats = {};

  function sv(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    for (var i = 2; i < arguments.length; i++) { var c = arguments[i]; if (c == null || c === false) continue; e.appendChild(c.nodeType ? c : document.createTextNode(String(c))); }
    return e;
  }
  var pct = function (x) { return Math.round(x * 100) + '%'; };

  /* ---------- perhitungan ---------- */
  STATS.compute = function (log) {
    var roll = S.get('rollover'), now = Date.now(), today = U.dayIndex(now, roll), key = (S._lastLogId || 0) + ':' + log.length + ':' + today + ':' + roll;
    if (cache && cache.key === key) return cache.val;
    var perDay = new Map(), legacy = S.getKv('legacyDays') || {};
    Object.keys(legacy).forEach(function (k) {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(k); if (!m) return;
      var idx = Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / U.DAY);
      perDay.set(idx, { n: +legacy[k] || 0, ms: 0, again: 0, legacy: true });
    });
    var from30 = today - 29, ans = [0, 0, 0, 0, 0], ret = { n: 0, ok: 0 }, weeks = [];
    for (var w = 0; w < 8; w++) weeks.push({ n: 0, ok: 0 });
    log.forEach(function (l) {
      var i = U.dayIndex(l.id, roll), o = perDay.get(i);
      if (!o) { o = { n: 0, ms: 0, again: 0 }; perDay.set(i, o); }
      o.n++; o.ms += l.ms || 0; if (l.g === 1) o.again++;
      if (i >= from30 && l.g >= 1 && l.g <= 4) ans[l.g]++;
      if (l.st === ST.REVIEW) {
        if (i >= from30) { ret.n++; if (l.g > 1) ret.ok++; }
        var wk = Math.floor((today - i) / 7); if (wk >= 0 && wk < 8) { weeks[wk].n++; if (l.g > 1) weeks[wk].ok++; }
      }
    });
    var days = Array.from(perDay.keys()).filter(function (i) { return perDay.get(i).n > 0; }).sort(function (a, b) { return a - b; });
    var longest = 0, run = 0, prev = null;
    days.forEach(function (i) { run = prev !== null && i === prev + 1 ? run + 1 : 1; if (run > longest) longest = run; prev = i; });
    var cur = 0, d = perDay.has(today) && perDay.get(today).n > 0 ? today : today - 1;
    while (perDay.has(d) && perDay.get(d).n > 0) { cur++; d--; }
    var val = { today: today, perDay: perDay, ans: ans, ret: ret, weeks: weeks, streak: { current: cur, longest: Math.max(longest, cur) }, total: log.length };
    cache = { key: key, val: val }; return val;
  };
  STATS.streak = function () { return S.allLog().then(function (log) { return STATS.compute(log).streak; }); };

  function cardStates(dir) {
    var o = { learn: 0, young: 0, mature: 0, cards: new Set() };
    S.allCards().forEach(function (c) {
      o.cards.add(c.id);
      if (c.dir !== dir) return;
      if (c.st === ST.REVIEW) { if ((c.ivl || 0) >= 21) o.mature++; else o.young++; } else o.learn++;
    });
    return o;
  }
  function forecast(days, dir, today) {
    var roll = S.get('rollover'), counts = new Array(days).fill(0);
    S.allCards().forEach(function (c) {
      if (c.dir !== dir) return;
      var off = Math.max(0, U.dayIndex(c.due, roll) - today);
      if (off < days) counts[off]++;
    });
    return counts;
  }
  function niceMax(v) {
    var steps = [10, 20, 30, 40, 50, 60, 80, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1500, 2000, 3000, 5000];
    for (var i = 0; i < steps.length; i++) if (steps[i] >= v) return steps[i];
    return Math.ceil(v / 1000) * 1000;
  }

  /* ---------- komponen kecil ---------- */
  function tip(wrap, svgEl, vbW, hit) {
    var el = h('div.vtip', { hidden: true, role: 'status' }), timer = 0;
    wrap.appendChild(el);
    function show(e) {
      var r = svgEl.getBoundingClientRect(), k = r.width / vbW, x = (e.clientX - r.left) / k, y = (e.clientY - r.top) / k, t = hit(x, y);
      if (!t) { el.hidden = true; return; }
      el.textContent = t.text; el.hidden = false;
      var left = U.clamp(t.x * k + (r.left - wrap.getBoundingClientRect().left), 56, wrap.clientWidth - 56);
      el.style.left = left + 'px'; el.style.top = (t.y * k + (r.top - wrap.getBoundingClientRect().top) - 8) + 'px';
    }
    svgEl.addEventListener('pointermove', show);
    svgEl.addEventListener('pointerdown', function (e) { show(e); clearTimeout(timer); if (e.pointerType !== 'mouse') timer = setTimeout(function () { el.hidden = true; }, 2600); });
    svgEl.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') el.hidden = true; });
  }
  function twin(headers, rows, label) {
    return h('details.twin', h('summary', label || 'Lihat sebagai tabel'),
      h('div.tbl-wrap', h('table.tbl', h('thead', h('tr', headers.map(function (x, i) { return h('th' + (i ? '.r' : ''), { scope: 'col' }, x); }))),
        h('tbody', rows.map(function (r) { return h('tr', r.map(function (x, i) { return i ? h('td.r.num', String(x)) : h('th', { scope: 'row' }, String(x)); })); })))));
  }
  function kpi(label, value, sub) { return h('div.kpi', h('div.kpi-v', value), h('div.kpi-l', label), sub ? h('div.kpi-s', sub) : null); }
  function section(title, sub, body) { return h('section.section.vsec', h('h2.section-title', title), sub ? h('p.vsub', sub) : null, body); }

  /* ---------- peta panas aktivitas ---------- */
  function heatmap(D) {
    var WK = 20, step = 15, cell = 12, padL = 28, padT = 18, W = padL + WK * step - 3, H = padT + 7 * step - 3, today = D.today;
    var wdToday = (new Date(today * U.DAY).getUTCDay() + 6) % 7, start = today - wdToday - (WK - 1) * 7, vals = [], total = 0, activeDays = 0;
    for (var i = start; i <= today; i++) { var o = D.perDay.get(i); if (o && o.n) { vals.push(o.n); total += o.n; activeDays++; } }
    vals.sort(function (a, b) { return a - b; });
    var peak = vals.length ? vals[vals.length - 1] : 1;   // tingkat warna relatif terhadap hari tersibukmu (hari tunggal = paling pekat)
    var level = function (n) { return !n ? 0 : n <= peak * 0.25 ? 1 : n <= peak * 0.5 ? 2 : n <= peak * 0.75 ? 3 : 4; };
    var svgEl = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'heat', role: 'img', 'aria-label': 'Aktivitas belajar ' + WK + ' minggu terakhir: ' + activeDays + ' hari aktif, ' + total + ' jawaban.' });
    ['Sen', 'Rab', 'Jum'].forEach(function (t, k) { svgEl.appendChild(sv('text', { x: 0, y: padT + k * 2 * step + 10, class: 'ax' }, t)); });
    var lastMonth = -1;
    for (var c = 0; c < WK; c++) {
      var d0 = new Date((start + c * 7) * U.DAY), mo = d0.getUTCMonth();
      if (mo !== lastMonth) { if (c === 0 || c * step - (lastMonth < 0 ? 0 : 0) >= 0) svgEl.appendChild(sv('text', { x: padL + c * step, y: 10, class: 'ax' }, U.BLN[mo])); lastMonth = mo; }
      for (var r = 0; r < 7; r++) {
        var idx = start + c * 7 + r; if (idx > today) break;
        var n = (D.perDay.get(idx) || {}).n || 0;
        svgEl.appendChild(sv('rect', { x: padL + c * step, y: padT + r * step, width: cell, height: cell, rx: 3, class: 'cell lv' + level(n) + (idx === today ? ' today' : '') }));
      }
    }
    var wrap = h('div.vwrap.heat-wrap', svgEl);
    tip(wrap, svgEl, W, function (x, y) {
      var c = Math.floor((x - padL) / step), r = Math.floor((y - padT) / step); if (c < 0 || c >= WK || r < 0 || r > 6) return null;
      var idx = start + c * 7 + r; if (idx > today) return null;
      var o = D.perDay.get(idx), n = o ? o.n : 0;
      return { text: U.fmtDayShort(idx) + ': ' + (n ? U.fmtNum(n) + ' jawaban' : 'tidak belajar'), x: padL + c * step + cell / 2, y: padT + r * step };
    });
    var legend = h('div.heat-legend', h('span', 'Sedikit'), [0, 1, 2, 3, 4].map(function (l) { return h('i.sw.lv' + l); }), h('span', 'Banyak'));
    var rows = []; for (var j = 0; j < 30; j++) { var ix = today - j, p = D.perDay.get(ix); rows.push([U.fmtDayShort(ix), p ? p.n : 0, p && p.ms ? U.fmtDur(p.ms) : '-']); }
    return h('div', wrap, legend, twin(['Tanggal', 'Jawaban', 'Waktu'], rows, 'Lihat 30 hari terakhir sebagai tabel'));
  }

  /* ---------- jadwal jatuh tempo ---------- */
  function forecastChart(counts, today) {
    var n = counts.length, W = 340, H = 170, padL = 34, padR = 6, padT = 16, padB = 26, pw = W - padL - padR, ph = H - padT - padB;
    var peak = Math.max.apply(null, counts.concat([0])), top = niceMax(peak), slot = pw / n, bw = Math.min(24, Math.max(4, slot * 0.66));
    var peakAt = counts.indexOf(peak);
    var svgEl = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'bars', role: 'img', 'aria-label': 'Jadwal jatuh tempo ' + n + ' hari ke depan. Puncak ' + peak + ' kartu.' });
    [0, 0.5, 1].forEach(function (f) {
      var y = padT + ph - f * ph;
      svgEl.appendChild(sv('line', { x1: padL, x2: W - padR, y1: y, y2: y, class: f === 0 ? 'axis' : 'grid' }));
      svgEl.appendChild(sv('text', { x: padL - 6, y: y + 3.5, 'text-anchor': 'end', class: 'ax' }, U.fmtNum(top * f)));
    });
    var labeled = {}; if (peak > 0) labeled[peakAt] = 1; if (counts[0] > 0) labeled[0] = 1;
    counts.forEach(function (v, i) {
      var x = padL + slot * i + (slot - bw) / 2, hh = v / top * ph, y = padT + ph - hh;
      if (v > 0) {
        var r = Math.min(4, bw / 2, hh);
        svgEl.appendChild(sv('path', { class: 'col', d: 'M' + x + ',' + (y + r) + ' a' + r + ',' + r + ' 0 0 1 ' + r + ',-' + r + ' h' + (bw - 2 * r) + ' a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r + ' V' + (padT + ph) + ' H' + x + ' Z' }));
        if (labeled[i]) svgEl.appendChild(sv('text', { x: x + bw / 2, y: y - 5, 'text-anchor': 'middle', class: 'val' }, U.fmtNum(v)));
      }
      var dt = new Date((today + i) * U.DAY), show = n <= 14 || i % 5 === 0 || i === 0;
      if (show) svgEl.appendChild(sv('text', { x: x + bw / 2, y: H - 8, 'text-anchor': 'middle', class: 'ax' + (i === 0 ? ' now' : '') }, i === 0 && n > 14 ? 'Ini' : String(dt.getUTCDate())));
    });
    var wrap = h('div.vwrap', svgEl);
    tip(wrap, svgEl, W, function (x) {
      var i = Math.floor((x - padL) / slot); if (i < 0 || i >= n) return null;
      var bx = padL + slot * i + slot / 2, by = padT + ph - counts[i] / top * ph;
      return { text: (i === 0 ? 'Hari ini' : U.fmtDayShort(today + i)) + ': ' + U.fmtNum(counts[i]) + ' kartu', x: bx, y: Math.min(by, padT + ph - 4) };
    });
    var rows = counts.map(function (v, i) { return [i === 0 ? 'Hari ini' : U.fmtDayShort(today + i), v]; });
    return h('div', wrap, h('p.vnote', 'Hari ini ada di paling kiri; kartu yang terlambat dihitung di sana.'), twin(['Hari', 'Kartu jatuh tempo'], rows));
  }

  /* ---------- status kartu (batang segmen tinggi) ---------- */
  function stateBar(st) {
    var parts = [['Belajar', st.learn, 'p1'], ['Muda', st.young, 'p2'], ['Matang', st.mature, 'p3']], total = st.learn + st.young + st.mature;
    if (!total) return h('p.muted', 'Belum ada kartu yang dipelajari di arah ini.');
    var bar = h('div.stackbar', { role: 'img', 'aria-label': parts.map(function (p) { return p[0] + ' ' + p[1]; }).join(', ') });
    parts.forEach(function (p) {
      if (!p[1]) return; var share = p[1] / total, fits = share >= 0.14 && String(p[1]).length <= 4;
      bar.appendChild(h('div.seg-block.' + p[2], { style: { flexGrow: String(p[1]) }, title: p[0] + ': ' + U.fmtNum(p[1]) + ' kartu (' + pct(share) + ')' }, fits ? h('span.num', U.fmtNum(p[1])) : null));
    });
    var legend = h('div.stack-legend', parts.map(function (p) { return h('span', h('i.sw.' + p[2]), p[0]); }));
    return h('div', bar, legend, h('p.vnote', 'Muda: interval di bawah 21 hari. Matang: 21 hari atau lebih.'),
      twin(['Status', 'Kartu', 'Porsi'], parts.map(function (p) { return [p[0], U.fmtNum(p[1]), pct(p[1] / total)]; })));
  }

  /* ---------- retensi per minggu ---------- */
  function retentionChart(weeks, target) {
    var data = weeks.slice().reverse().map(function (w, i) { return { i: i, n: w.n, p: w.n >= 5 ? w.ok / w.n : null }; });   // lama → baru
    var pts = data.filter(function (d) { return d.p != null; });
    if (pts.length < 2) return h('p.muted', 'Belum cukup data. Retensi dihitung dari kartu review yang kamu jawab; dibutuhkan sedikitnya 5 jawaban per minggu selama 2 minggu.');
    var W = 340, H = 160, padL = 34, padR = 44, padT = 16, padB = 26, pw = W - padL - padR, ph = H - padT - padB;
    var minP = Math.min.apply(null, pts.map(function (d) { return d.p; }).concat([target])), lo = Math.max(0, Math.floor((minP * 100 - 8) / 10) * 10), hi = 100;
    var X = function (i) { return padL + pw * i / 7; }, Y = function (v) { return padT + ph - (v * 100 - lo) / (hi - lo) * ph; };
    var svgEl = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'line', role: 'img', 'aria-label': 'Retensi per minggu, ' + pts.length + ' minggu dengan data. Terbaru ' + pct(pts[pts.length - 1].p) + ', target ' + pct(target) + '.' });
    var ticks = []; for (var t = lo; t <= hi; t += (hi - lo > 40 ? 20 : 10)) ticks.push(t);
    ticks.forEach(function (t) {
      var y = padT + ph - (t - lo) / (hi - lo) * ph;
      svgEl.appendChild(sv('line', { x1: padL, x2: W - padR, y1: y, y2: y, class: t === lo ? 'axis' : 'grid' }));
      svgEl.appendChild(sv('text', { x: padL - 6, y: y + 3.5, 'text-anchor': 'end', class: 'ax' }, t + '%'));
    });
    svgEl.appendChild(sv('line', { x1: padL, x2: W - padR, y1: Y(target), y2: Y(target), class: 'target' }));
    svgEl.appendChild(sv('text', { x: W - padR + 4, y: Y(target) + 3.5, class: 'ax' }, 'Target'));
    var d = pts.map(function (p, k) { return (k ? 'L' : 'M') + X(p.i).toFixed(1) + ',' + Y(p.p).toFixed(1); }).join(' ');
    svgEl.appendChild(sv('path', { d: d, class: 'ln' }));
    pts.forEach(function (p, k) {
      svgEl.appendChild(sv('circle', { cx: X(p.i), cy: Y(p.p), r: k === pts.length - 1 ? 5 : 4, class: 'dot' }));
    });
    var last = pts[pts.length - 1];
    svgEl.appendChild(sv('text', { x: X(last.i) + 9, y: Y(last.p) - 8, class: 'val', 'text-anchor': 'middle' }, pct(last.p)));
    var todayIdx = U.dayIndex(Date.now(), S.get('rollover'));
    data.forEach(function (p, i) { if (i % 2 === 1 || i === 7) { var s = todayIdx - 7 * (7 - i) - 6, dt = new Date(s * U.DAY); svgEl.appendChild(sv('text', { x: X(i), y: H - 8, 'text-anchor': 'middle', class: 'ax' }, dt.getUTCDate() + ' ' + U.BLN[dt.getUTCMonth()])); } });
    var wrap = h('div.vwrap', svgEl);
    tip(wrap, svgEl, W, function (x) {
      var best = null; pts.forEach(function (p) { if (!best || Math.abs(X(p.i) - x) < Math.abs(X(best.i) - x)) best = p; });
      if (!best || Math.abs(X(best.i) - x) > 26) return null;
      return { text: 'Minggu ' + (7 - best.i === 0 ? 'ini' : (7 - best.i) + ' minggu lalu') + ': ' + pct(best.p) + ' dari ' + best.n + ' review', x: X(best.i), y: Y(best.p) };
    });
    var rows = data.map(function (p) { var s = todayIdx - 7 * (7 - p.i) - 6, dt = new Date(s * U.DAY); return [dt.getUTCDate() + ' ' + U.BLN[dt.getUTCMonth()], p.n, p.p == null ? '-' : pct(p.p)]; });
    return h('div', wrap, h('p.vnote', 'Garis tipis menunjukkan target retensi ' + pct(target) + '. Retensi = jawaban selain Lagi pada kartu review.'), twin(['Mulai minggu', 'Review', 'Retensi'], rows));
  }

  /* ---------- sebaran jawaban ---------- */
  function answerBars(ans) {
    var total = ans[1] + ans[2] + ans[3] + ans[4];
    if (!total) return h('p.muted', 'Belum ada jawaban dalam 30 hari terakhir.');
    var max = Math.max(ans[1], ans[2], ans[3], ans[4]), names = ['', 'Lagi', 'Sulit', 'Bagus', 'Mudah'];
    return h('div.hbars', [1, 2, 3, 4].map(function (g) {
      return h('div.hbar', h('span.hb-l', names[g]), h('div.hb-track', h('i', { style: { width: (ans[g] / max * 100) + '%' } })), h('span.hb-v.num', U.fmtNum(ans[g]) + ' ', h('em', pct(ans[g] / total))));
    }));
  }

  /* ---------- layar ---------- */
  function render(el) {
    var token = ++state.token;
    U.clear(el);
    var dir = S.get('dir') === 'r' ? 'r' : 'f';
    el.appendChild(h('div.screen-head', h('div', h('h1.screen-title', 'Statistik'), h('p.screen-sub', 'Arah kartu: ' + (dir === 'r' ? 'Indonesia ke Jepang' : 'Jepang ke Indonesia') + '. Ubah di Pengaturan.'))));
    var holder = h('div.stats', h('p.muted', 'Menghitung…'));
    el.appendChild(holder);
    S.allLog().then(function (log) {
      if (token !== state.token || !holder.isConnected) return;
      var D = STATS.compute(log), st = cardStates(dir), target = S.get('dr');
      U.clear(holder);
      if (!log.length && !S.allCards().size && !D.perDay.size) {
        holder.appendChild(h('div.empty', h('h3', 'Belum ada data'), h('p', 'Selesaikan sesi belajar pertamamu, lalu grafik dan angka di sini akan terisi.'),
          h('div.sheet-actions', h('button.btn.btn-primary', { type: 'button', onclick: function () { FC.app.go('home'); } }, 'Ke Beranda'))));
        return;
      }
      var tod = D.perDay.get(D.today) || { n: 0, ms: 0 }, rr = D.ret.n >= 10 ? D.ret.ok / D.ret.n : null;
      holder.appendChild(h('div.kpis',
        kpi('Hari ini', h('span', U.fmtNum(tod.n), h('small', ' kartu')), tod.ms ? U.fmtDur(tod.ms) : tod.n ? 'waktu tidak tercatat' : 'belum belajar'),
        kpi('Beruntun', h('span', U.fmtNum(D.streak.current), h('small', ' hari')), 'terpanjang ' + D.streak.longest + ' hari'),
        kpi('Retensi 30 hari', rr == null ? '-' : pct(rr), rr == null ? 'butuh 10 review' : 'target ' + pct(target)),
        kpi('Dipelajari', h('span', U.fmtNum(st.cards.size), h('small', ' kartu')), U.fmtNum(st.mature) + ' sudah matang')));
      holder.appendChild(section('Aktivitas', '20 minggu terakhir. Warna yang lebih pekat berarti lebih banyak jawaban.', heatmap(D)));
      var fwrap = h('div'), draw = function () { U.clear(fwrap); fwrap.appendChild(forecastChart(forecast(state.range, dir, D.today), D.today)); };
      var seg = h('div.seg.seg-sm', { role: 'radiogroup', 'aria-label': 'Rentang jadwal' }, [7, 14, 30].map(function (n) {
        var b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(state.range === n) }, n + ' hari');
        b.addEventListener('click', function () { state.range = n; U.$$('button', seg).forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); }); draw(); }); return b;
      }));
      draw();
      holder.appendChild(section('Jadwal jatuh tempo', 'Berapa kartu yang harus kamu ulang tiap hari ke depan.', h('div', seg, fwrap)));
      holder.appendChild(section('Status kartu', null, stateBar(st)));
      holder.appendChild(section('Retensi', 'Seberapa sering kamu masih ingat saat kartu muncul, per minggu.', retentionChart(D.weeks, target)));
      holder.appendChild(section('Jawaban 30 hari', null, answerBars(D.ans)));
    }).catch(function (e) { U.clear(holder); holder.appendChild(h('div.banner.err', 'Statistik gagal dihitung: ' + ((e && e.message) || e))); });
  }

  FC.app.register('stats', { render: render, show: render });
  FC.bus.on('progress', function () { if (FC.app.current() === 'stats') render(U.$('#screen-stats')); });
})(window);
