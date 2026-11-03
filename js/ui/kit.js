/* =====================================================================
   js/ui/kit.js — perangkat UI bersama: ikon, lapisan (lembar/dialog/layar penuh) yang menghormati tombol
   Kembali, toast, konfirmasi, kata sandi deck, bulan merah, lencana gembok, pesan antar-modul (FC.bus).
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  var U = FC.util, h = U.h;

  /* ---------- pesan antar-modul ---------- */
  var subs = {};
  FC.bus = {
    on: function (ev, fn) { (subs[ev] = subs[ev] || []).push(fn); return function () { subs[ev] = (subs[ev] || []).filter(function (f) { return f !== fn; }); }; },
    emit: function (ev, a) { (subs[ev] || []).slice().forEach(function (fn) { try { fn(a); } catch (e) { console.error(e); } }); }
  };

  var UI = FC.ui = { h: h };

  /* ---------- ikon (garis 24×24) ---------- */
  var P = {
    home: 'M3.5 11 12 4l8.5 7M5.5 9.5V20h5v-5.5h3V20h5V9.5',
    decks: 'M5 4.5h10a2 2 0 0 1 2 2V19H7a2 2 0 0 1-2-2zM9 2.5h10a2 2 0 0 1 2 2V16M8.5 9h5M8.5 12.5h5',
    pencil: 'M4 20l.9-4L16.2 4.7a2 2 0 0 1 2.8 0l.3.3a2 2 0 0 1 0 2.8L8 19.1zM14.2 6.7l3.1 3.1',
    chart: 'M5 20V11M12 20V4M19 20v-6',
    sliders: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 4.5v5M9 14.5v5',
    star: 'M12 3.6l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 17.2 6.7 20l1.1-6L3.4 9.9l6-.8z',
    back: 'M15 5l-7 7 7 7',
    chev: 'M9 5l7 7-7 7',
    down: 'M6 9l6 6 6-6',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    undo: 'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-4',
    speaker: 'M4 9.5v5h4l5 4v-13l-5 4zM16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    close: 'M6 6l12 12M18 6 6 18',
    search: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM20 20l-4.2-4.2',
    plus: 'M12 5v14M5 12h14',
    info: 'M12 11v5.5M12 7.5h.01M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z',
    lock: 'M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13V20h-13z',
    download: 'M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14',
    upload: 'M12 15V4M7.5 8 12 3.5 16.5 8M5 20h14',
    trash: 'M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.8 13h9.4l.8-13',
    flame: 'M12 3c.8 3.2 4.5 4.6 4.5 9.2a4.5 4.5 0 0 1-9 0c0-1.8.8-3 1.6-4 .3 1 1 1.7 1.9 1.8C11.3 8.2 11.8 5.8 12 3z',
    moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z',
    skip: 'M5 5l9 7-9 7zM18 5v14',
    clock: 'M12 7v5l3 2M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z',
    shuffle: 'M4 7h3.5c4 0 5 10 9 10H20M4 17h3.5c1.4 0 2.4-1.2 3.3-2.6M13.2 9.6C14 8.2 15 7 16.5 7H20M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5',
    book: 'M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11'
  };
  UI.icon = function (name, cls) {
    var d = P[name] || '';
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>';
  };
  UI.iconEl = function (name, cls) { var t = document.createElement('span'); t.innerHTML = UI.icon(name, cls); return t.firstChild; };

  /** Bilah atas untuk lapisan layar penuh: tombol kembali, judul, aksi di kanan. */
  UI.fullBar = function (o) {
    var back = h('button.btn.btn-icon', { type: 'button', 'aria-label': o.backLabel || 'Kembali', onclick: o.onBack }, UI.iconEl(o.backIcon || 'back'));
    return h('div.fullbar', back,
      h('div.fullbar-title', h('div.t', { text: o.title || '' }), o.sub ? h('div.s', { text: o.sub }) : null),
      h('div.fullbar-actions', o.actions || []));
  };
  /** Tombol kecil "ふ" untuk menyalakan furigana dari dalam layar penuh. */
  UI.furiButton = function () {
    var b = h('button.furi-mini.jp', { type: 'button', title: 'Furigana (cara baca kanji)', 'aria-label': 'Furigana' }, 'ふ');
    var sync = function () { b.setAttribute('aria-pressed', FC.store.get('furigana') ? 'true' : 'false'); };
    b.addEventListener('click', function () { FC.store.set('furigana', !FC.store.get('furigana')); });
    var off = FC.bus.on('furigana', function () { if (!b.isConnected) return off(); sync(); });
    sync(); return b;
  };

  /* ---------- lapisan + tombol Kembali ---------- */
  /* Semua lapisan berbagi SATU entri riwayat browser: dibuat saat lapisan pertama dibuka, dilepas saat yang terakhir tertutup.
     Pelepasan ditunda satu putaran (relTimer) dan dibatalkan kalau lapisan baru langsung dibuka (dialog password → lembar deck),
     serta pendorongan entri baru menunggu history.back() yang masih berjalan (pendingPush). Tanpa ini tombol Kembali bisa
     mundur satu langkah terlalu jauh dan melempar pengguna ke Beranda. */
  var stack = [], entry = false, ignorePop = 0, relTimer = 0, pendingPush = false;
  function pushEntry() { try { history.pushState({ fc: 1 }, ''); entry = true; } catch (e) {} }
  function ensureEntry() {
    if (relTimer) { clearTimeout(relTimer); relTimer = 0; }
    if (entry) return;
    if (ignorePop > 0) { pendingPush = true; return; }
    pushEntry();
  }
  function releaseEntry() {
    if (!entry || stack.length || relTimer) return;
    relTimer = setTimeout(function () {
      relTimer = 0;
      if (entry && !stack.length) { entry = false; ignorePop++; try { history.back(); } catch (e) { ignorePop--; } }
    }, 0);
  }
  window.addEventListener('popstate', function () {
    if (ignorePop > 0) {
      ignorePop--;
      if (!ignorePop && pendingPush) { pendingPush = false; if (stack.length) pushEntry(); }
      return;
    }
    entry = false;
    if (stack.length) closeLayer(stack[stack.length - 1], true);
    if (stack.length) ensureEntry();
  });
  function closeLayer(L, fromPop) {
    if (L.closed) return;
    L.closed = true;
    var i = stack.indexOf(L); if (i >= 0) stack.splice(i, 1);
    L.el.classList.remove('in');
    var gone = function () { if (L.el.parentNode) L.el.parentNode.removeChild(L.el); };
    setTimeout(gone, L.kind === 'full' ? 0 : 260);
    document.body.classList.toggle('layer-full', stack.some(function (x) { return x.kind === 'full'; }));
    try { if (L.onClose) L.onClose(); } catch (e) { console.error(e); }
    if (!fromPop) releaseEntry();
  }
  /**
   * Buka lapisan. kind: 'sheet' | 'dialog' | 'full'. build(layer) mengisi layer.el.
   * Kembalikan {el, close}. Tombol Kembali (HP) menutup lapisan paling atas.
   */
  UI.layer = function (kind, build, onClose) {
    var el = h('div.layer' + (kind === 'full' ? '.full' : ''));
    var L = { el: el, kind: kind, closed: false, onClose: onClose, close: function () { closeLayer(L, false); } };
    stack.push(L);
    el.style.zIndex = String(50 + stack.length);          // yang dibuka belakangan selalu di atas (di bawah toast z=90)
    document.getElementById('layers').appendChild(el);
    if (kind !== 'full') {
      var bd = h('div.backdrop', { onclick: function () { if (L.dismissable !== false) L.close(); } });
      el.appendChild(bd);
    }
    L.dismissable = true;
    build(L);
    ensureEntry();
    document.body.classList.toggle('layer-full', kind === 'full' || stack.some(function (x) { return x.kind === 'full'; }));
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('in'); }); });
    return L;
  };
  UI.topLayer = function () { return stack[stack.length - 1] || null; };
  /** Salinan daftar lapisan yang terbuka (dari bawah ke atas). */
  UI.layers = function () { return stack.slice(); };
  UI.closeAllLayers = function () { stack.slice().reverse().forEach(function (L) { closeLayer(L, false); }); };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && stack.length) { var t = stack[stack.length - 1]; if (t.kind !== 'full' && t.dismissable !== false) { e.preventDefault(); t.close(); } }
  });

  /** Lembar bawah (di layar lebar jadi dialog di tengah). body: Node. Mengembalikan layer. */
  UI.sheet = function (opts, onClose) {
    return UI.layer('sheet', function (L) {
      var head = h('div.sheet-head', h('div', h('h2.sheet-title', opts.title || ''), opts.sub ? h('p.sheet-sub', opts.sub) : null),
        h('button.btn.btn-icon', { type: 'button', 'aria-label': 'Tutup', onclick: function () { L.close(); } }, UI.iconEl('close')));
      var sh = h('div.sheet', { role: 'dialog', 'aria-modal': 'true', 'aria-label': opts.title || 'Lembar' }, h('div.sheet-grip'), head, opts.body);
      L.sheet = sh; L.el.appendChild(sh);
      setTimeout(function () { var f = sh.querySelector('[autofocus],button.btn-primary,button,input'); if (f && opts.focus !== false) f.focus({ preventScroll: true }); }, 60);
    }, onClose);
  };

  /** Dialog tengah dengan tombol. actions: [{label, primary, danger, value, keepOpen, onclick}] → Promise<value> */
  UI.dialog = function (opts) {
    return new Promise(function (resolve) {
      var done = false, input = null, err = null;
      var finish = function (v) { if (!done) { done = true; resolve(v); } };
      var L = UI.layer('dialog', function (L) {
        if (opts.input) { input = h('input.input', { type: opts.input.type || 'text', placeholder: opts.input.placeholder || '', autocomplete: 'off', 'aria-label': opts.input.label || opts.title, autofocus: true }); }
        err = h('p.err', { role: 'alert' });
        var btns = opts.actions.map(function (a) {
          return h('button.btn' + (a.primary ? '.btn-primary' : '') + (a.danger ? '.btn-danger' + (a.primary ? '.solid' : '') : ''), { type: 'button', onclick: function () {
            if (a.onclick) { var r = a.onclick({ input: input, error: err, shake: function () { if (input) { input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake'); input.focus(); } } }); if (r === false) return; }
            finish(a.value); L.close();
          } }, a.label);
        });
        var d = h('div.dialog', { role: 'dialog', 'aria-modal': 'true', 'aria-label': opts.title }, h('h2', opts.title), opts.text ? h('p', opts.text) : null, input, opts.input ? err : null, h('div.actions', btns));
        if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); var p = btns[opts.actions.findIndex(function (a) { return a.primary; })]; if (p) p.click(); } });
        L.el.appendChild(d);
        setTimeout(function () { (input || d.querySelector('.btn-primary') || d.querySelector('button')).focus(); }, 60);
      }, function () { finish(opts.cancelValue === undefined ? false : opts.cancelValue); });
    });
  };
  UI.confirm = function (opts) {
    return UI.dialog({ title: opts.title, text: opts.text, cancelValue: false, actions: [
      { label: opts.cancel || 'Batal', value: false },
      { label: opts.ok || 'Ya', value: true, primary: true, danger: !!opts.danger }
    ] });
  };
  UI.alert = function (title, text, ok) { return UI.dialog({ title: title, text: text, actions: [{ label: ok || 'Mengerti', value: true, primary: true }] }); };

  /** Minta kata sandi untuk deck/kuis terkunci. Teksnya sama dengan aplikasi lama (data/locks.js). */
  UI.askPassword = function (title, kind, lock, key) {
    var D = FC.data;
    if (D.isUnlocked(key)) return Promise.resolve(true);
    return UI.dialog({
      title: '🔒 ' + title, text: D.lockText(kind, lock.tier), input: { type: 'password', placeholder: 'Password…', label: 'Password' }, cancelValue: false,
      actions: [
        { label: 'Batal', value: false },
        { label: 'Buka 🔓', value: true, primary: true, onclick: function (ctx) {
          if (ctx.input.value === lock.pw) { D.unlock(key); return true; }
          ctx.error.textContent = D.wrongText(); ctx.input.value = ''; ctx.shake(); return false;
        } }
      ]
    });
  };

  /** Lencana gembok: PRO / Exclusive / Admin (admin bergantian "Admin"/"Danger" seperti dulu). */
  UI.tier = function (tier) {
    if (tier === 'admin') return h('span.tier.tier-admin', { title: 'Deck admin' }, '💀', h('span.alt', h('span', 'Admin'), h('span', 'Danger')));
    if (tier === 'exclusive') return h('span.tier.tier-exclusive', { title: 'Deck exclusive' }, '👑', 'Exclusive', '💎');
    return h('span.tier.tier-pro', { title: 'Deck pro' }, UI.iconEl('lock', 'sm'), 'PRO');
  };

  /* ---------- toast ---------- */
  UI.toast = function (msg, opts) {
    opts = opts || {};
    var box = document.getElementById('toasts'), el = h('div.toast', { role: 'status' }, h('span', msg));
    if (opts.action) el.appendChild(h('button', { type: 'button', onclick: function () { try { opts.action.onclick(); } finally { gone(); } } }, opts.action.label));
    box.appendChild(el);
    var t = setTimeout(gone, opts.ms || 3800);
    function gone() { clearTimeout(t); if (!el.parentNode) return; el.classList.add('out'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 260); }
    return { close: gone };
  };

  /* ---------- bulan merah (赤月) ---------- */
  // luas bagian terang (0..1) untuk bulan sabit hasil dua lingkaran sepusat bergeser sejauh d (satuan r)
  function litFraction(d) { if (d <= 0) return 0; if (d >= 2) return 1; var lens = 2 * Math.acos(d / 2) - (d / 2) * Math.sqrt(4 - d * d); return 1 - lens / Math.PI; }
  function offsetFor(p) { var lo = 0, hi = 2; for (var i = 0; i < 30; i++) { var mid = (lo + hi) / 2; if (litFraction(mid) < p) lo = mid; else hi = mid; } return (lo + hi) / 2; }
  var moonSeq = 0;
  /** SVG bulan: p = 0..1 bagian yang menyala. Mengembalikan {el, set(p, animateMs)}. */
  UI.moon = function (p, size, opts) {
    opts = opts || {};
    var R = 44, id = 'mk' + (++moonSeq), NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('width', size); svg.setAttribute('height', size); svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', opts.label || 'Kemajuan hari ini');
    svg.innerHTML = '<defs><mask id="' + id + '"><rect width="100" height="100" fill="#000"/><circle cx="50" cy="50" r="' + R + '" fill="#fff"/><circle class="shade" cx="50" cy="50" r="' + (R + 0.4) + '" fill="#000"/></mask></defs>' +
      '<circle cx="50" cy="50" r="' + R + '" fill="var(--moon-body)" stroke="var(--moon-track)" stroke-width="' + (opts.ring || 2.2) + '"/>' +
      '<circle cx="50" cy="50" r="' + R + '" fill="var(--seal)" mask="url(#' + id + ')"/>';
    var shade = svg.querySelector('.shade'), cur = 0, raf = 0;
    function draw(v) { cur = v; shade.setAttribute('cx', 50 + offsetFor(Math.min(1, Math.max(0, v))) * R + (v >= 0.999 ? 10 : 0)); }
    draw(p || 0);
    return {
      el: svg,
      set: function (to, ms) {
        cancelAnimationFrame(raf);
        if (!ms || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return draw(to);
        var from = cur, t0 = performance.now();
        (function step(now) { var k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3); draw(from + (to - from) * e); if (k < 1) raf = requestAnimationFrame(step); })(t0);
      }
    };
  };

  /* ---------- lain-lain ---------- */
  UI.download = function (filename, text, type) {
    var blob = new Blob([text], { type: type || 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  };
  UI.pickFile = function (accept) {
    return new Promise(function (resolve) {
      var inp = h('input', { type: 'file', accept: accept || '.json', style: { display: 'none' } });
      inp.addEventListener('change', function () { var f = inp.files && inp.files[0]; if (!f) return resolve(null); var r = new FileReader(); r.onload = function () { resolve({ name: f.name, text: r.result }); }; r.onerror = function () { resolve(null); }; r.readAsText(f); });
      document.body.appendChild(inp); inp.click(); setTimeout(function () { inp.remove(); }, 60000);
    });
  };

  /** Cantumkan tombol ★ yang sinkron dengan penyimpanan. */
  UI.starButton = function (card, sh) {
    var cid = FC.data.cid(card);
    var b = h('button.btn.btn-icon', { type: 'button', 'aria-label': 'Tandai kartu susah' });
    function sync() { var on = FC.store.isStarred(cid); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.setAttribute('aria-label', on ? 'Lepas bintang kartu' : 'Tandai kartu susah'); b.innerHTML = UI.icon('star', on ? 'fill' : ''); }
    b.addEventListener('click', function (e) { e.stopPropagation(); var on = FC.store.setStar(cid, card, sh || FC.data.shardOfCard(cid), undefined); sync(); U.vibrate(8); FC.bus.emit('stars'); if (on) UI.toast('Masuk ke Kartu Susah'); });
    sync(); return b;
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = UI;
})(typeof window !== 'undefined' ? window : globalThis);
