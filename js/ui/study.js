/* =====================================================================
   js/ui/study.js — layar belajar.
   • STUDY.start(scope)  sesi SRS (FSRS): tampilkan jawaban → pilih Lagi/Sulit/Bagus/Mudah (pratinjau jarak tiap tombol), batal, tunda, ⭐, suara, info.
   • STUDY.cram(scope)   latihan bebas tanpa jadwal: balik kartu, acak, "Sudah hafal" (aturan lama dipertahankan).
   • STUDY.cardInfo(card) lembar info kartu: status FSRS per arah + riwayat jawaban.
   • STUDY.more(scope)   "Belajar lebih": tambah jatah hari ini lalu mulai.
   Pintasan papan ketik: Spasi/Enter tampilkan & Bagus, 1–4 nilai, Z batal, S bintang, B tunda, P suara, I info.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, D = FC.data, h = U.h, ST = FC.scheduler.ST;
  var STUDY = FC.study = {};
  var GRADES = [
    { g: 1, label: 'Lagi', cls: 'again' }, { g: 2, label: 'Sulit', cls: 'hard' },
    { g: 3, label: 'Bagus', cls: 'good' }, { g: 4, label: 'Mudah', cls: 'easy' }
  ];
  var ST_LABEL = ['Baru', 'Belajar', 'Review', 'Belajar ulang'];
  var DIR_LABEL = { f: 'Jepang ke Indonesia', r: 'Indonesia ke Jepang' };
  var scopeTitle = function (s) { return s.type === 'star' ? 'Kartu Susah' : s.type === 'deck' ? D.titleOf(s.id) : 'Belajar hari ini'; };

  /* ---------- rangka layar penuh ---------- */
  function shell(o) {
    var V = { dead: false };
    V.layer = UI.layer('full', function (L) {
      V.stage = h('div.study-stage'); V.body = h('div.full-body.study-body', V.stage);
      V.counts = h('div.scounts'); V.foot = h('div.study-foot'); V.prog = h('div.bar.study-prog', h('i'));
      V.bar = UI.fullBar({ title: o.title, onBack: function () { L.close(); }, backLabel: 'Tutup sesi', actions: o.actions ? o.actions(V) : [UI.furiButton()] });
      V.bar.querySelector('.fullbar-title').appendChild(V.counts);
      L.el.classList.add('study'); L.el.appendChild(V.bar); L.el.appendChild(V.prog); L.el.appendChild(V.body); L.el.appendChild(V.foot);
    }, function () { V.dead = true; if (V.onClose) V.onClose(); });
    V.loading = function (msg) { U.clear(V.stage); V.foot.hidden = true; V.stage.appendChild(h('div.study-msg', h('div.spinner', { 'aria-hidden': 'true' }), h('p', msg || 'Menyiapkan kartu…'))); };
    V.fail = function (e, retry) {
      U.clear(V.stage); V.foot.hidden = true;
      V.stage.appendChild(h('div.study-msg', h('h2', 'Kartu gagal dimuat'), h('p', (e && e.message) || 'Periksa koneksi internet lalu coba lagi.'),
        h('div.sheet-actions', h('button.btn.btn-primary', { type: 'button', onclick: retry }, 'Coba lagi'), h('button.btn', { type: 'button', onclick: function () { V.layer.close(); } }, 'Tutup'))));
    };
    return V;
  }
  function toolBtn(icon, label, onclick, extra) {
    return h('button.tool', Object.assign({ type: 'button', onclick: onclick, 'aria-label': label }, extra || {}), UI.iconEl(icon), h('span', label));
  }

  function tomorrowDue() {
    var S = FC.store, dir = S.get('dir') === 'r' ? 'r' : 'f', roll = S.get('rollover'), day = U.dayIndex(Date.now(), roll) + 1, n = 0;
    S.allCards().forEach(function (c) { if (c.dir === dir && c.st === ST.REVIEW && U.dayIndex(c.due, roll) === day) n++; });
    return n;
  }
  var spoken = function (card) { return card.back || card.front; };
  function speak(card, quiet) {
    if (!FC.tts.supported) { if (!quiet) UI.toast('Browser ini belum mendukung suara.'); return; }
    if (FC.tts.hasJa === false && !quiet) UI.toast('Suara bahasa Jepang belum terpasang di perangkat ini.');
    FC.tts.speak(spoken(card));
  }
  function toggleStar(card, itemSh) {
    var cid = D.cid(card), on = FC.store.setStar(cid, card, itemSh || D.shardOfCard(cid), undefined);
    FC.bus.emit('stars'); U.vibrate(8);
    UI.toast(on ? 'Masuk ke Kartu Susah' : 'Bintang dilepas');
    return on;
  }

  /* =====================================================================
     SESI SRS
     ===================================================================== */
  STUDY.start = function (scope) {
    var S = FC.store, sess = null, item = null, face = null, revealed = false, V;
    V = shell({ title: scopeTitle(scope) });
    V.onClose = function () { FC.tts.stop(); document.removeEventListener('keydown', onKey, true); document.removeEventListener('keyup', onKeyUp, true); FC.bus.emit('session:end'); FC.bus.emit('progress'); };
    V.loading();
    function boot() {
      V.loading();
      FC.session.build({ scope: scope }).then(function (s) { if (V.dead) return; sess = s; document.addEventListener('keydown', onKey, true); document.addEventListener('keyup', onKeyUp, true); V.foot.hidden = false; next(); },
        function (e) { if (!V.dead) V.fail(e, boot); });
    }
    boot();

    function counts() {
      var c = sess.counts(), k = item && item.kind;
      U.clear(V.counts);
      [['n', 'Baru', c.n, 'new'], ['l', 'Belajar', c.l, 'learn'], ['r', 'Review', c.r, 'review']].forEach(function (x) {
        V.counts.appendChild(h('span.sc.sc-' + x[3] + (k === x[0] ? '.cur' : ''), { title: x[1] }, h('span.sc-l', x[1]), ' ', h('b.num', String(x[2]))));
      });
      var done = sess.stats.done, rem = c.total;
      V.prog.firstChild.style.width = (done + rem ? Math.min(100, done / (done + rem) * 100) : 0) + '%';
    }

    function next() {
      if (V.dead) return;
      var it = sess.next(Date.now());
      if (!it) return finish();
      present(it, false);
    }

    function present(it, show, silent) {
      item = it; revealed = !!show;
      face = FC.face.build(it.card, it.dir, revealed);
      face.addEventListener('click', function (e) { if (!revealed && !e.target.closest('button,a')) reveal(); });
      U.clear(V.stage); V.stage.appendChild(face); V.body.scrollTop = 0;
      counts(); drawFoot();
      if (S.get('tts') && it.dir === 'f' && !revealed && !silent) speak(it.card, true);
    }

    function reveal() {
      if (!item || revealed || V.dead) return;
      revealed = true; face._ans.hidden = false; face.classList.add('revealed');
      drawFoot();
      try { face._ans.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
      if (S.get('tts') && item.dir === 'r') speak(item.card, true);
    }

    function drawFoot() {
      U.clear(V.foot); V.foot.hidden = false;
      var main = h('div.foot-main');
      if (!revealed) main.appendChild(h('button.btn.btn-primary.btn-block.reveal', { type: 'button', onclick: reveal }, 'Tampilkan jawaban', h('kbd', 'Spasi')));
      else {
        var pv = sess.preview(Date.now());
        main.appendChild(h('div.grades', { role: 'group', 'aria-label': 'Seberapa ingat kamu?' }, GRADES.map(function (g, i) {
          return h('button.grade.grade-' + g.cls, { type: 'button', onclick: function () { answer(g.g); }, 'aria-label': g.label + ', berikutnya ' + (pv[i] ? pv[i].label : '') },
            h('span.g-ivl.num', pv[i] ? pv[i].label : ''), h('span.g-label', g.label), h('kbd', String(g.g)));
        })));
      }
      var starred = FC.store.isStarred(item.cid);
      var tools = h('div.tools',
        toolBtn('undo', 'Batal', undo, { disabled: !sess.canUndo() }),
        toolBtn('skip', 'Tunda', bury),
        toolBtn('star', 'Bintang', function () { var on = toggleStar(item.card); this.setAttribute('aria-pressed', on ? 'true' : 'false'); this.firstChild.classList.toggle('fill', on); }, { 'aria-pressed': starred ? 'true' : 'false' }),
        toolBtn('speaker', 'Suara', function () { speak(item.card); }),
        toolBtn('info', 'Info', function () { STUDY.cardInfo(item.card); }));
      if (starred) tools.children[2].firstChild.classList.add('fill');
      V.foot.appendChild(main); V.foot.appendChild(tools);
    }

    function answer(g) {
      if (!item || !revealed || V.dead) return;
      var it = item, res = sess.answer(g, Date.now());
      if (!res) return;
      if (S.get('haptics')) U.vibrate(g === 1 ? [12, 40, 12] : 8);
      if (res.leech && !S.isStarred(it.cid)) {
        S.setStar(it.cid, it.card, D.shardOfCard(it.cid), true); FC.bus.emit('stars');
        UI.toast('Kartu ini sering terlupa, dimasukkan ke Kartu Susah.', { ms: 5200 });
      }
      item = null; next();
    }

    function undo() {
      if (!sess || !sess.canUndo()) { UI.toast('Belum ada jawaban yang bisa dibatalkan.'); return; }
      var it = sess.undo(); if (!it) return;
      present(it, false); UI.toast('Jawaban dibatalkan');
    }

    function bury() {
      if (!item) return;
      sess.bury(Date.now()); item = null; UI.toast('Kartu ditunda sampai besok'); next();
    }

    function finish() {
      item = null; face = null; U.clear(V.stage); V.foot.hidden = true; counts();
      V.prog.firstChild.style.width = '100%';
      var st = sess.stats, acc = st.done ? Math.round((st.done - st.again) / st.done * 100) : 0, tm = tomorrowDue();
      var box = h('div.finish');
      if (st.done) {
        box.appendChild(h('div.finish-cheer.jp', 'すごい🥳🤩🔥!'));
        box.appendChild(h('h2', 'Sesi selesai'));
        box.appendChild(h('div.finish-stats',
          h('div', h('b.num', U.fmtNum(st.done)), h('span', 'kartu')), h('div', h('b.num', U.fmtDur(st.ms)), h('span', 'waktu')), h('div', h('b.num', acc + '%'), h('span', 'ingat'))));
      } else {
        box.appendChild(h('h2', 'Tidak ada kartu untuk dipelajari'));
        box.appendChild(h('p.muted', scope.type === 'all'
          ? 'Semua kartu hari ini sudah selesai, atau belum ada deck aktif.'
          : 'Tidak ada kartu jatuh tempo atau kartu baru yang tersisa di sini untuk hari ini.'));
      }
      if (tm) box.appendChild(h('p.finish-next', 'Besok ada ' + U.fmtNum(tm) + ' kartu review.'));
      box.appendChild(h('div.sheet-actions',
        h('button.btn.btn-primary.btn-block', { type: 'button', onclick: function () { if (STUDY.more(scope)) V.layer.close(); } }, 'Belajar lebih'),
        scope.type !== 'all' ? h('button.btn.btn-block', { type: 'button', onclick: function () { STUDY.cram(scope); V.layer.close(); } }, 'Latihan bebas') : null,
        h('button.btn.btn-quiet.btn-block', { type: 'button', onclick: function () { V.layer.close(); } }, 'Selesai')));
      V.stage.appendChild(box);
      FC.bus.emit('progress');
    }

    function onKeyUp(e) { if (e.key === ' ' && UI.topLayer() === V.layer && !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target || {}).tagName || '')) e.preventDefault(); }
    function onKey(e) {
      if (UI.topLayer() !== V.layer || V.dead || !sess) return;
      var t = e.target; if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      var k = e.key;
      if ((e.ctrlKey || e.metaKey) && (k === 'z' || k === 'Z')) { e.preventDefault(); undo(); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!item) return;
      if (k === ' ' || k === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!revealed) reveal(); else answer(3); }
      else if (k >= '1' && k <= '4') { e.preventDefault(); if (!revealed) reveal(); else answer(+k); }
      else if (k === 'z' || k === 'Z') undo();
      else if (k === 's' || k === 'S') { toggleStar(item.card); drawFoot(); }
      else if (k === 'b' || k === 'B') bury();
      else if (k === 'p' || k === 'P' || k === 'v' || k === 'V') speak(item.card);
      else if (k === 'i' || k === 'I') STUDY.cardInfo(item.card);
    }

    // tombol ⋯ di bilah atas: info, tunda, bintang, akhiri
    V.bar.querySelector('.fullbar-actions').appendChild(h('button.btn.btn-icon', { type: 'button', 'aria-label': 'Menu sesi', onclick: function () {
      if (!sess) return;
      var mineDeck = item && FC.myDecks && D.originOf(item.card), mine = !!mineDeck && D.isUserDeck(mineDeck);      // kartu dari "Deck Saya" boleh diperbaiki langsung dari sini
      var sh = UI.sheet({ title: 'Sesi belajar', sub: scopeTitle(scope), body: h('div.rows',
        h('button.row', { type: 'button', onclick: function () { sh.close(); if (item) STUDY.cardInfo(item.card); } }, h('div.row-main', h('div.row-title', 'Info kartu'), h('div.row-sub', 'Status FSRS dan riwayat jawaban')), h('div.row-end', UI.iconEl('chev', 'sm'))),
        mine ? h('button.row', { type: 'button', onclick: function () {
          sh.close(); var cur = item; if (!cur) return;
          FC.myDecks.editCard(mineDeck, D.cid(cur.card), { allowDelete: false, onSaved: function () { if (item === cur && !V.dead) present(cur, revealed, true); } });      // hapus kartu sengaja tidak ditawarkan di tengah sesi
        } }, h('div.row-main', h('div.row-title', 'Ubah kartu'), h('div.row-sub', 'Perbaiki tulisan, cara baca, atau arti')), h('div.row-end', UI.iconEl('chev', 'sm'))) : null,
        h('button.row', { type: 'button', onclick: function () { sh.close(); bury(); } }, h('div.row-main', h('div.row-title', 'Tunda kartu ini'), h('div.row-sub', 'Muncul lagi besok')), h('div.row-end', UI.iconEl('chev', 'sm'))),
        h('button.row', { type: 'button', onclick: function () { sh.close(); V.layer.close(); } }, h('div.row-main', h('div.row-title', 'Akhiri sesi'), h('div.row-sub', 'Jawaban sebelumnya sudah tersimpan')), h('div.row-end', UI.iconEl('chev', 'sm')))), focus: false });
    } }, UI.iconEl('more')));

    // furigana diganti dari dalam sesi → gambar ulang kartu yang tampil (jawaban tetap terbuka bila sudah)
    var off = FC.bus.on('furigana', function () { if (V.dead) return off(); if (item) { var keep = revealed; present(item, keep, true); } });
  };

  STUDY.more = function (scope) {
    var r = FC.session.today();
    if (scope.type === 'all' && r.newAvail === 0 && !(r.review > r.revLeft)) { UI.toast('Semua kartu di deck aktif sudah dipelajari. Tambah deck dari tab Deck.', { ms: 5000 }); return false; }
    FC.session.extend('new', 10);
    if (r.review > r.revLeft) FC.session.extend('rev', 20);
    FC.bus.emit('progress');
    STUDY.start(scope);
    return true;
  };

  /* =====================================================================
     LATIHAN BEBAS (tanpa jadwal) — perilaku lama: balik kartu, acak, "Sudah hafal" mengeluarkan kartu dari tumpukan
     ===================================================================== */
  STUDY.cram = function (scope) {
    var V = shell({ title: scopeTitle(scope) }), pile = [], all = [], idx = 0, revealed = false, face = null, dir = FC.store.get('dir') === 'r' ? 'r' : 'f';
    V.onClose = function () { FC.tts.stop(); document.removeEventListener('keydown', onKey, true); document.removeEventListener('keyup', onKeyUp, true); };
    V.loading();
    FC.session.cramCards(scope).then(function (cards) {
      if (V.dead) return;
      all = cards.slice(); pile = cards.slice(); document.addEventListener('keydown', onKey, true); document.addEventListener('keyup', onKeyUp, true); V.foot.hidden = false; show();
    }, function (e) { if (!V.dead) V.fail(e, function () { V.layer.close(); STUDY.cram(scope); }); });

    function cur() { return pile[idx]; }
    function show() {
      if (V.dead) return;
      U.clear(V.stage); U.clear(V.counts); U.clear(V.foot);
      if (!all.length) { V.foot.hidden = true; V.stage.appendChild(h('div.study-msg', h('h2', 'Deck ini kosong'), h('p', 'Belum ada kartu untuk dilatih.'))); return; }
      if (!pile.length) {
        V.foot.hidden = true; V.prog.firstChild.style.width = '100%';
        V.stage.appendChild(h('div.finish', h('div.finish-cheer.jp', 'すごい🥳🤩🔥!'), h('h2', 'Semua kartu di kategori ini sudah kamu hafal!'), h('p.muted', 'Gas ke part selanjutnya!'),
          h('div.sheet-actions', h('button.btn.btn-primary.btn-block', { type: 'button', onclick: function () { pile = all.slice(); idx = 0; show(); } }, 'Ulangi dari awal'), h('button.btn.btn-quiet.btn-block', { type: 'button', onclick: function () { V.layer.close(); } }, 'Selesai'))));
        return;
      }
      revealed = false; V.foot.hidden = false;
      var c = cur();
      face = FC.face.build(c, dir, false);
      face.addEventListener('click', function (e) { if (!e.target.closest('button,a')) toggle(); });
      V.stage.appendChild(face); V.body.scrollTop = 0;
      V.counts.appendChild(h('span.sc.cram-count', h('b.num', (idx + 1) + ' / ' + pile.length)));
      V.prog.firstChild.style.width = ((all.length - pile.length) / all.length * 100) + '%';
      drawFoot();
      if (FC.store.get('tts') && dir === 'f') speak(c, true);
    }
    function toggle() { if (!face) return; revealed = !revealed; face._ans.hidden = !revealed; face.classList.toggle('revealed', revealed); drawFoot(); if (revealed && FC.store.get('tts') && dir === 'r') speak(cur(), true); }
    function drawFoot() {
      U.clear(V.foot);
      var main = h('div.foot-main');
      if (!revealed) main.appendChild(h('button.btn.btn-primary.btn-block.reveal', { type: 'button', onclick: toggle }, 'Tampilkan jawaban', h('kbd', 'Spasi')));
      else main.appendChild(h('div.grades.two', h('button.grade.grade-hard', { type: 'button', onclick: again }, h('span.g-label', 'Masih lupa')), h('button.grade.grade-good', { type: 'button', onclick: known }, h('span.g-label', 'Sudah hafal'), h('kbd', 'Enter'))));
      var c = cur(), starred = FC.store.isStarred(D.cid(c));
      var tools = h('div.tools',
        toolBtn('back', 'Sebelumnya', function () { go(-1); }),
        toolBtn('shuffle', 'Acak', shuffle),
        toolBtn('star', 'Bintang', function () { var on = toggleStar(c); this.setAttribute('aria-pressed', on ? 'true' : 'false'); this.firstChild.classList.toggle('fill', on); }, { 'aria-pressed': starred ? 'true' : 'false' }),
        toolBtn('speaker', 'Suara', function () { speak(c); }),
        toolBtn('chev', 'Berikutnya', function () { go(1); }));
      if (starred) tools.children[2].firstChild.classList.add('fill');
      V.foot.appendChild(main); V.foot.appendChild(tools);
    }
    function go(d) { if (!pile.length) return; idx = (idx + d + pile.length) % pile.length; show(); }
    function again() { go(1); }
    function known() { if (!pile.length) return; pile.splice(idx, 1); if (idx >= pile.length) idx = 0; show(); }
    function shuffle() { U.shuffle(pile, Math.random); idx = 0; show(); UI.toast('Kartu diacak'); }
    function onKeyUp(e) { if (e.key === ' ' && UI.topLayer() === V.layer && !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target || {}).tagName || '')) e.preventDefault(); }
    function onKey(e) {
      if (UI.topLayer() !== V.layer || V.dead) return;
      var t = e.target; if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey || !pile.length) return;
      var k = e.key;
      if (k === ' ') { e.preventDefault(); toggle(); }
      else if (k === 'Enter') { e.preventDefault(); if (revealed) known(); else toggle(); }
      else if (k === 'ArrowRight') go(1); else if (k === 'ArrowLeft') go(-1);
      else if (k === 's' || k === 'S') { toggleStar(cur()); drawFoot(); }
      else if (k === 'p' || k === 'P') speak(cur());
    }
    // geser kiri/kanan untuk berpindah kartu
    var sx = 0, sy = 0;
    V.body.addEventListener('touchstart', function (e) { var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
    V.body.addEventListener('touchend', function (e) {
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6) go(dx < 0 ? 1 : -1);
    }, { passive: true });
    var off = FC.bus.on('furigana', function () { if (V.dead) return off(); if (pile.length) { var keep = revealed; show(); if (keep) toggle(); } });
  };

  /* =====================================================================
     INFO KARTU
     ===================================================================== */
  STUDY.cardInfo = function (card) {
    var S = FC.store, cid = D.cid(card), now = Date.now(), roll = S.get('rollover'), sch = FC.session.makeScheduler();
    var body = h('div.cinfo');
    var jp = FC.face.japanese(card);
    var head = h('div.cinfo-head', h('div.cinfo-front.jp' + (jp.ruby ? '.has-ruby' : ''), { html: jp.html }),
      card.back && card.back !== card.front ? h('div.cinfo-read.jp', card.back) : null, card.backSub ? h('div.cinfo-mean', card.backSub) : null,
      h('div.badges', { html: FC.face.badges(card) }));
    body.appendChild(head);
    var dueText = function (r) {
      if (r.st === ST.REVIEW) { var left = U.dayIndex(r.due, roll) - U.dayIndex(now, roll); return U.fmtDate(r.due) + (left <= 0 ? ' (hari ini)' : left === 1 ? ' (besok)' : ' (' + U.fmtInterval(left) + ' lagi)'); }
      return r.due <= now ? 'Sekarang' : U.fmtDate(r.due, true);
    };
    var any = false;
    ['f', 'r'].forEach(function (dir) {
      var r = S.getCard(cid + ':' + dir);
      var sec = h('section.cinfo-sec', h('h3', DIR_LABEL[dir]));
      if (!r) sec.appendChild(h('p.muted.small', 'Belum dipelajari di arah ini.'));
      else {
        any = true;
        var ret = sch.retrievability(r, now);
        sec.appendChild(h('dl.kv',
          kv('Status', ST_LABEL[r.st]), kv('Jatuh tempo', dueText(r)), kv('Interval', U.fmtInterval(r.ivl || 0)),
          kv('Peluang ingat sekarang', U.fmtPct(ret)), kv('Stabilitas', U.fmtInterval(r.s || 0)), kv('Kesulitan', (r.d || 0).toFixed(1) + ' dari 10'),
          kv('Dijawab', U.fmtNum(r.reps || 0) + ' kali'), kv('Lupa', U.fmtNum(r.lapses || 0) + ' kali'), r.created ? kv('Mulai dipelajari', U.fmtDate(r.created)) : null));
      }
      body.appendChild(sec);
    });
    var logBox = h('section.cinfo-sec', h('h3', 'Riwayat jawaban'), h('p.muted.small', any ? 'Memuat…' : 'Belum ada riwayat.'));
    body.appendChild(logBox);
    var L = UI.sheet({ title: 'Info kartu', sub: 'Dihitung dengan FSRS-7', body: body, focus: false });
    if (any) Promise.all([S.cardLog(cid + ':f'), S.cardLog(cid + ':r')]).then(function (res) {
      var rows = res[0].concat(res[1]).sort(function (a, b) { return b.id - a.id; });
      var gl = ['', 'Lagi', 'Sulit', 'Bagus', 'Mudah'], gc = ['', 'again', 'hard', 'good', 'easy'];
      U.clear(logBox); logBox.appendChild(h('h3', 'Riwayat jawaban'));
      if (!rows.length) { logBox.appendChild(h('p.muted.small', 'Belum ada riwayat.')); return; }
      logBox.appendChild(h('div.loglist', rows.slice(0, 14).map(function (l) {
        return h('div.logrow', h('span.log-when', U.fmtDate(l.id, true)), h('span.log-g.g-' + gc[l.g], gl[l.g]),
          h('span.log-meta', (l.k.slice(-1) === 'r' ? 'ID ke JP, ' : '') + 'interval ' + U.fmtInterval(l.iv || 0) + (l.r != null ? ', ingat ' + Math.round(l.r * 100) + '%' : '')));
      })));
      if (rows.length > 14) logBox.appendChild(h('p.muted.small', 'Menampilkan 14 dari ' + rows.length + ' jawaban terakhir.'));
    });
    function kv(k, v) { return h('div', h('dt', k), h('dd', v)); }
    return L;
  };
})(window);
