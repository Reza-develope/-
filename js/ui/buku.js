/* =====================================================================
   js/ui/buku.js — BUKU BUNPOU IRODORI (tampilan).
   • FC.bukuUI.mountList(el)         daftar bab + pencarian pola — dipasang di tab Latihan → "Buku Bunpou" (practice.js)
   • FC.bukuUI.openBab(level, n, i)  layar baca satu bab: Ringkasan + satu pola per halaman (rumus, penjelasan gampang,
                                     contoh bersuara, "Awas!"), tombol Sebelumnya/Berikutnya, tanda "sudah paham".
   Furigana mengikuti tombol ふりがな global (FC.store 'furigana'); semua kanji di buku ditulis 漢字[よみ] (lihat js/core/buku.js).
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, B = FC.buku, h = U.h;
  var BK = FC.bukuUI = {};
  var OPS = /^[+＋→／＝、,]$/;          // token rumus yang hanya tanda penghubung
  var q = '';                          // kata kunci pencarian di daftar

  /* ---------- teks bertanda → HTML ---------- */
  function furiOn() { return !!(FC.store && FC.store.get('furigana')); }
  function nodeHtml(n, furi) {
    if (n.r) return furi ? FC.furigana.render(n.r, n.rt) : U.esc(n.r);
    return U.esc(n.t).replace(/\n/g, '<br>');
  }
  function rich(str, opts) {
    var furi = furiOn(), nodes = B.parse(str, opts), out = '', i = 0;
    while (i < nodes.length) {
      var n = nodes[i], inner = '';
      while (i < nodes.length && nodes[i].b === n.b && nodes[i].h === n.h && nodes[i].q === n.q) { inner += nodeHtml(nodes[i], furi); i++; }
      if (n.q) inner = '<span class="kt">' + inner + '</span>';
      if (n.h) inner = '<mark class="hl">' + inner + '</mark>';
      if (n.b) inner = '<strong>' + inner + '</strong>';
      out += inner;
    }
    return out;
  }
  /** elemen dengan isi teks bertanda: R('p.kelas', teks, {quote:true}) */
  function R(sel, str, opts) { return h(sel, { html: rich(str, opts) }); }

  /* ---------- bagian-bagian halaman pola ---------- */
  function formulaEl(p) {
    var box = h('div.bk-formula', h('div.bk-label', 'Rumus'));
    p.rumus.forEach(function (line) {
      var row = h('div.bk-fline.jp');
      line.forEach(function (tk) {
        tk = String(tk);
        if (OPS.test(tk)) row.appendChild(R('span.bk-op', tk));
        else if (tk.charAt(0) === '=') row.appendChild(R('span.bk-chip.fix', tk.slice(1)));
        else row.appendChild(R('span.bk-chip.var', tk));
      });
      box.appendChild(row);
    });
    if (p.rumusNote) box.appendChild(R('p.bk-fnote', p.rumusNote));
    return box;
  }
  function tableEl(t) {
    // sel bahasa Jepang yang pendek tidak boleh terpotong di tengah kata (.tn = tanpa pindah baris);
    // teks Indonesia dan kalimat panjang boleh turun baris. Kolom pertama berhuruf Latin = label (.tl).
    var JP = /[぀-ヿ㐀-鿿]/;
    function cell(tag, c, first) {
      var p = B.plain(c), cls = '';
      if (JP.test(p) && p.length <= 8) cls += '.tn';
      if (first && /[A-Za-z]/.test(p)) cls += '.tl';
      return R(tag + '.jp' + cls, c);
    }
    var head = h('tr', t.kepala.map(function (c) { return cell('th', c, false); }));
    var body = t.baris.map(function (r) { return h('tr', r.map(function (c, i) { return cell('td', c, i === 0); })); });
    return h('div.bk-tbl', R('div.bk-tbl-t', t.judul), h('div.bk-tbl-s', h('table', h('thead', head), h('tbody', body))));
  }
  function section(label, node, cls) { return h('section.bk-sec' + (cls ? '.' + cls : ''), h('h3.bk-h', label), node); }

  function spokenText(c) { return String(c.jp).split('\n').map(function (l) { return B.kana(l).replace(/^[A-Z]：/, ''); }).join(' '); }
  function say(c) {
    var T = FC.tts;
    if (!T || !T.supported) return false;
    if (T.hasJa === false) { UI.toast('Perangkat ini belum punya suara bahasa Jepang.'); return false; }
    return T.speak(spokenText(c));
  }
  function exampleEl(c, k) {
    var jp = h('div.bk-jp.jp'), id = h('div.bk-id');
    String(c.jp).split('\n').forEach(function (line) {
      var row = h('div.bk-line'), m = /^([A-Z]：)/.exec(line);
      if (m) { row.appendChild(h('span.bk-spk', m[1])); line = line.slice(m[1].length); }
      row.insertAdjacentHTML('beforeend', rich(line));
      jp.appendChild(row);
    });
    String(c.id).split('\n').forEach(function (line) { id.appendChild(R('div', line)); });
    var btn = FC.tts && FC.tts.supported
      ? h('button.bk-say', { type: 'button', title: 'Dengarkan', 'aria-label': 'Dengarkan contoh ' + (k + 1), onclick: function () { say(c); } }, UI.iconEl('speaker'))
      : null;
    return h('li.bk-ex', h('span.bk-exn', { 'aria-hidden': 'true' }, String(k + 1)), h('div.bk-exb', jp, id), btn);
  }

  /* =====================================================================
     DAFTAR BAB (di tab Latihan)
     ===================================================================== */
  function booksSync() {
    return B.levels().map(function (lv) {
      return { level: lv, babs: lv.babs.map(function (n) { return B.get(lv.id, n); }).filter(Boolean).sort(function (a, b) { return a.n - b.n; }) };
    });
  }
  function babRow(lv, bab) {
    var n = bab.pola.length, done = B.doneCount(lv.id, bab);
    return h('button.row.bk-babrow', { type: 'button', onclick: function () { BK.openBab(lv.id, bab.n); } },
      h('span.bk-bno', { 'aria-hidden': 'true' }, String(bab.n)),
      h('div.row-main', R('div.row-title.jp', bab.title), h('div.row-sub', bab.arti),
        h('div.row-sub.meta', h('span', n + ' pola'), done ? h('span.bk-prog' + (done === n ? '.all' : ''), done + '/' + n + ' paham') : null)),
      h('div.row-end', UI.iconEl('chev', 'sm')));
  }
  function polaRow(lv, r) {
    var id = B.polaId(lv.id, r.bab.n, r.i);
    return h('button.row', { type: 'button', onclick: function () { BK.openBab(lv.id, r.bab.n, r.i); } },
      h('span.bk-bno', { 'aria-hidden': 'true' }, String(r.bab.n)),
      h('div.row-main', R('div.row-title.jp', r.pola.name), R('div.row-sub', r.pola.arti), h('div.row-sub.faint', 'Bab ' + r.bab.n + ' · pola ' + (r.i + 1))),
      h('div.row-end', B.isDone(id) ? h('span.bk-okmark', { title: 'Sudah paham' }, UI.iconEl('check', 'sm')) : null, UI.iconEl('chev', 'sm')));
  }
  function levelSection(bk) {
    var lv = bk.level, sec = h('section.bk-level');
    sec.appendChild(h('div.section-title', h('span', lv.title + ' ', h('span.jp.faint.bk-lvsub', lv.sub)), h('span.faint.small', bk.babs.length + ' dari ' + lv.total + ' bab')));
    sec.appendChild(h('div.rows', bk.babs.map(function (b) { return babRow(lv, b); })));
    if (lv.total > bk.babs.length) sec.appendChild(h('p.bk-soon', 'Bab lainnya segera hadir.'));
    return sec;
  }

  BK.mountList = function (el) {
    var wrap = h('div.bk-wrap'), box = h('div.bk-list'), books = null;
    var input = h('input.input', { type: 'search', placeholder: 'Cari pola, mis. ので, bisa, sebaiknya', 'aria-label': 'Cari pola bunpou', autocomplete: 'off', value: q });
    input.addEventListener('input', U.debounce(function () { q = input.value; paint(); }, 120));
    wrap.appendChild(h('p.screen-sub.how', 'Penjelasan bunpou yang gampang: rumus, arti, dan contoh sederhana. Pilih bab, lalu baca polanya satu per satu.'));
    wrap.appendChild(h('div.search', UI.iconEl('search'), input));
    wrap.appendChild(box);
    el.appendChild(wrap);

    function paint() {
      wrap.classList.toggle('bk-furi', furiOn());
      U.clear(box);
      if (!books) return;
      var term = q.trim();
      if (term) {
        var hits = [];
        books.forEach(function (bk) { B.search(bk.babs, term).forEach(function (r) { hits.push(polaRow(bk.level, r)); }); });
        if (!hits.length) { box.appendChild(h('div.empty', h('h3', 'Pola ga ketemu nih 😅'), h('p', 'Coba kata lain, mis. “karena”, “bisa”, atau ので.'))); return; }
        box.appendChild(h('div.rows.bk-hits', hits));
        return;
      }
      books.forEach(function (bk) { box.appendChild(levelSection(bk)); });
    }
    function load() {
      U.clear(box); box.appendChild(h('div.study-msg', h('div.spinner', { 'aria-hidden': 'true' }), h('p', 'Memuat buku…')));
      Promise.all(B.levels().map(function (lv) { return B.load(lv.id); })).then(function () {
        if (!wrap.isConnected) return; books = booksSync(); paint();
      }, function (e) {
        if (!wrap.isConnected) return; U.clear(box);
        box.appendChild(h('div.study-msg', h('h2', 'Buku gagal dimuat'), h('p', (e && e.message) || 'Periksa koneksi lalu coba lagi.'), h('div.sheet-actions', h('button.btn.btn-primary', { type: 'button', onclick: load }, 'Coba lagi'))));
      });
    }
    if (B.levels().every(function (lv) { return B.loaded(lv.id); })) { books = booksSync(); paint(); } else load();
    var off = FC.bus.on('furigana', function () { if (!wrap.isConnected) return off(); paint(); });
    // kembali dari layar baca → catatan "sudah paham" mungkin berubah
    var offProg = FC.bus.on('buku:progress', function () { if (!wrap.isConnected) return offProg(); paint(); });
  };

  /* =====================================================================
     LAYAR BACA SATU BAB
     ===================================================================== */
  BK.openBab = function (levelId, n, polaIdx) {
    B.load(levelId).then(function (book) {
      var bab = book.babs.filter(function (b) { return b.n === n; })[0];
      if (!bab) return;
      openLayer(book, bab, polaIdx == null ? -1 : Math.max(-1, Math.min(polaIdx, bab.pola.length - 1)));
    }, function (e) { UI.toast((e && e.message) || 'Buku belum bisa dimuat.', { ms: 5000 }); });
  };

  function openLayer(book, bab, view) {
    var V = { book: book, level: book.level, bab: bab, view: view, dead: false, layer: null };

    V.layer = UI.layer('full', function (L) {
      L.el.classList.add('bk-layer'); L.el.classList.toggle('bk-furi', furiOn());
      V.bar = UI.fullBar({ title: 'Bab ' + bab.n, sub: ' ', onBack: function () { L.close(); }, backLabel: 'Tutup buku', actions: [UI.furiButton()] });
      V.tabs = h('div.bk-tabs', { role: 'tablist', 'aria-label': 'Isi bab' });
      V.inner = h('div.full-inner.bk-inner', { role: 'tabpanel' });
      V.body = h('div.full-body.bk-body', V.inner);
      V.prev = h('button.btn.bk-prev', { type: 'button' });
      V.next = h('button.btn.btn-primary.bk-next', { type: 'button' });
      V.nav = h('div.bk-nav', h('div.bk-nav-in', V.prev, V.next));
      L.el.appendChild(V.bar); L.el.appendChild(V.tabs); L.el.appendChild(V.body); L.el.appendChild(V.nav);
    }, function () {
      V.dead = true; document.removeEventListener('keydown', onKey, true);
      FC.bus.emit('buku:progress');
    });
    document.addEventListener('keydown', onKey, true);
    var offFuri = FC.bus.on('furigana', function () {
      if (V.dead) return offFuri();
      var keep = V.body.scrollTop; V.layer.el.classList.toggle('bk-furi', furiOn());
      drawTabs(); drawContent(); V.body.scrollTop = keep;
    });
    function polaIdOf(i) { return B.polaId(V.level.id, V.bab.n, i); }

    /* ---- tetangga: halaman sebelum / sesudah (lintas bab) ---- */
    function prevTarget() {
      var babs = V.book.babs, bi = babs.indexOf(V.bab);
      if (V.view > -1) return { bab: V.bab, view: V.view - 1, label: V.view === 0 ? 'Ringkasan' : 'Pola ' + V.view };
      if (bi > 0) { var pb = babs[bi - 1]; return { bab: pb, view: pb.pola.length - 1, label: 'Bab ' + pb.n }; }
      return null;
    }
    function nextTarget() {
      var babs = V.book.babs, bi = babs.indexOf(V.bab), N = V.bab.pola.length;
      if (V.view < N - 1) return { bab: V.bab, view: V.view + 1, label: 'Pola ' + (V.view + 2) };
      if (bi < babs.length - 1) { var nb = babs[bi + 1]; return { bab: nb, view: -1, label: 'Bab ' + nb.n }; }
      return null;
    }
    function goTo(t) { if (!t) return; V.bab = t.bab; go(t.view); }
    function stepPrev() { goTo(prevTarget()); }
    function stepNext() { var t = nextTarget(); if (t) goTo(t); else V.layer.close(); }
    function onKey(e) {
      if (V.dead || UI.topLayer() !== V.layer || e.ctrlKey || e.metaKey || e.altKey) return;
      var tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); stepNext(); } else if (e.key === 'ArrowLeft') { e.preventDefault(); stepPrev(); }
    }

    /* ---- gambar ulang bagian-bagian ---- */
    function drawBar() {
      V.bar.querySelector('.fullbar-title .t').textContent = 'Bab ' + V.bab.n + ' · ' + (V.view < 0 ? 'Ringkasan' : 'Pola ' + (V.view + 1) + ' dari ' + V.bab.pola.length);
      V.bar.querySelector('.fullbar-title .s').textContent = 'Buku Bunpou · ' + V.level.title;
    }
    function drawTabs() {
      U.clear(V.tabs);
      function tab(html, view, label, done) {
        var b = h('button.chip.bk-tab', { type: 'button', role: 'tab', 'aria-selected': V.view === view ? 'true' : 'false', 'aria-label': label, onclick: function () { go(view); } });
        b.innerHTML = html; if (done) b.setAttribute('data-done', '1');
        V.tabs.appendChild(b);
      }
      tab('Ringkasan', -1, 'Ringkasan bab ' + V.bab.n);
      V.bab.pola.forEach(function (p, i) { tab('<b class="bk-cn">' + (i + 1) + '</b>' + rich(p.short), i, 'Pola ' + (i + 1) + ': ' + B.plain(p.name), B.isDone(polaIdOf(i))); });
      var sel = V.tabs.querySelector('[aria-selected="true"]');
      if (sel && sel.scrollIntoView) { try { sel.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {} }
    }
    function setBtn(btn, iconName, text, after) {
      U.clear(btn);
      var ic = UI.iconEl(iconName), tx = h('span', text);
      if (after) { btn.appendChild(tx); btn.appendChild(ic); } else { btn.appendChild(ic); btn.appendChild(tx); }
    }
    function drawNav() {
      var p = prevTarget(), n = nextTarget();
      V.prev.disabled = !p; V.prev.onclick = stepPrev;
      setBtn(V.prev, 'back', p ? p.label : 'Sebelumnya');
      V.prev.setAttribute('aria-label', p ? 'Sebelumnya: ' + p.label : 'Sebelumnya');
      V.next.onclick = stepNext;
      setBtn(V.next, n ? 'chev' : 'check', n ? n.label : 'Selesai', true);
      V.next.setAttribute('aria-label', n ? 'Berikutnya: ' + n.label : 'Selesai, tutup buku');
    }
    function drawContent() {
      U.clear(V.inner);
      V.inner.appendChild(V.view < 0 ? summaryEl() : polaEl(V.view));
    }
    function go(view) {
      V.view = view; drawBar(); drawTabs(); drawContent(); drawNav(); V.body.scrollTop = 0;
    }

    /* ---- isi: ringkasan bab ---- */
    function summaryEl() {
      var b = V.bab, el = h('div.bk-sum');
      el.appendChild(h('div.bk-sum-tags', h('span.tag.tag-level', V.level.title + ' · Bab ' + b.n), R('span.tag.jp', b.topic)));
      el.appendChild(R('h2.bk-sum-title.jp', b.title));
      el.appendChild(h('p.bk-sum-arti', '“' + b.arti + '”'));
      el.appendChild(h('p.bk-sum-topic', 'Tema: ' + b.topicArti));
      el.appendChild(section('Setelah bab ini kamu bisa', h('ul.bk-ul', b.bisa.map(function (t) { return R('li', t); }))));
      var rows = b.pola.map(function (p, i) {
        var done = B.isDone(polaIdOf(i));
        return h('button.row', { type: 'button', onclick: function () { go(i); } },
          h('span.bk-no.sm', { 'aria-hidden': 'true' }, String(i + 1)),
          h('div.row-main', R('div.row-title.jp', p.name), R('div.row-sub', p.arti)),
          h('div.row-end', done ? h('span.bk-okmark', { title: 'Sudah paham' }, UI.iconEl('check', 'sm')) : null, UI.iconEl('chev', 'sm')));
      });
      el.appendChild(section('Pola di bab ini', h('div.rows', rows)));
      if (FC.practice && FC.practice.openBunpou) {
        el.appendChild(h('div.bk-practice',
          h('p.small.muted', 'Sudah baca? Coba latihannya biar makin nempel.'),
          h('button.btn.btn-block', { type: 'button', onclick: function () { FC.practice.openBunpou(V.level.id); } }, UI.iconEl('pencil'), 'Latihan soal Bunpou ' + V.level.title)));
      }
      return el;
    }

    /* ---- isi: satu pola ---- */
    function polaEl(i) {
      var p = V.bab.pola[i], id = polaIdOf(i), art = h('article.bk-pola');
      art.appendChild(h('header.bk-phead', h('span.bk-no', { 'aria-hidden': 'true' }, String(i + 1)), h('div.bk-ptitle', R('h2.bk-name.jp', p.name), R('p.bk-arti', p.arti))));
      art.appendChild(h('div.bk-inti', h('div.bk-label', 'Intinya'), R('p', p.inti, { quote: true })));
      art.appendChild(formulaEl(p));
      (p.tabel || []).forEach(function (t) { art.appendChild(tableEl(t)); });
      art.appendChild(section('Penjelasan', h('ul.bk-ul', p.jelas.map(function (t) { return R('li', t, { quote: true }); }))));
      art.appendChild(section('Contoh', h('ol.bk-exs', p.contoh.map(exampleEl))));
      art.appendChild(section('Awas!', h('ul.bk-ul', p.awas.map(function (t) { return R('li', t, { quote: true }); })), 'bk-awas'));
      art.appendChild(doneBtn(id));
      return art;
    }
    function doneBtn(id) {
      var on = B.isDone(id), b = h('button.btn.btn-block.bk-donebtn', { type: 'button' });
      function paint() { U.clear(b); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.appendChild(UI.iconEl('check')); b.appendChild(h('span', on ? 'Sudah paham' : 'Tandai sudah paham')); }
      b.addEventListener('click', function () { on = B.setDone(id, !on); paint(); drawTabs(); U.vibrate(8); });
      paint(); return b;
    }

    go(view);
  }
})(window);
