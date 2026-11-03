/* =====================================================================
   js/ui/practice.js — tab Latihan: Shiken Pilihan Ganda (aturan lama: skor /250, lulus ≥200, jawaban benar/salah
   disorot 1,2 detik, evaluasi jawaban salah) + Latihan Bunpou (halaman mandiri di folder bunpou/ lewat iframe).
   Skor terbaik tiap kuis disimpan di penyimpanan (kv "quizBest") dan ikut cadangan.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, D = FC.data, h = U.h;
  var MAX = 250, PASS = 200, LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
  var tab = 'mc', q = '', refs = {};

  var BUNPOU = [
    { id: 'a1', file: 'bunpou/Latihan_Bunpou_A1.html', title: 'Irodori A1', sub: '入門', note: 'bab 3 sampai 18' },
    { id: 'a2', file: 'bunpou/Latihan_Bunpou_A2.html', title: 'Irodori A2', sub: '初級1', note: 'bab 1 sampai 18' },
    { id: 'a22', file: 'bunpou/Latihan_Bunpou_A2_2.html', title: 'Irodori A2.2', sub: '初級2', note: 'bab 1 sampai 18' }
  ];

  /* ---------- daftar ---------- */
  function bestOf(id) { var b = FC.store.getKv('quizBest'); return b && b[id] ? b[id] : null; }

  function quizRow(item) {
    var lock = D.quizLockOf(item.id), best = bestOf(item.id);
    return h('button.row.quiz-row', { type: 'button', onclick: function () { openQuiz(item); } },
      h('div.row-main', h('div.row-title', item.title), h('div.row-sub.meta', h('span.jp', item.sub), h('span', item.count ? item.count + ' soal' : 'Segera hadir'))),
      h('div.row-end', best ? h('span.best' + (best.score >= PASS ? '.pass' : ''), { title: 'Skor terbaik' }, best.score + '/' + MAX) : null, lock ? UI.tier(lock.tier) : null, UI.iconEl('chev', 'sm')));
  }
  function fillQuizList() {
    var list = U.clear(refs.list), term = U.norm(q).trim().split(/\s+/).filter(Boolean);
    var hits = D.quizList.filter(function (it) { var hay = U.norm(it.title + ' ' + it.sub); return term.every(function (t) { return hay.indexOf(t) >= 0; }); });
    if (!hits.length) { list.appendChild(h('div.empty', h('h3', 'Deck ga ketemu nih 😅'), h('p', 'Coba kata kunci lain.'))); return; }
    list.appendChild(h('div.rows', hits.map(quizRow)));
  }

  function render(el) {
    U.clear(el); refs = {};
    el.appendChild(h('div.screen-head', h('div', h('h1.screen-title', 'Latihan'), h('p.screen-sub', 'Uji pemahamanmu dengan soal pilihan ganda atau latihan bunpou.'))));
    var seg = h('div.seg', { role: 'tablist', 'aria-label': 'Jenis latihan' },
      h('button', { type: 'button', role: 'tab', 'aria-selected': tab === 'mc' ? 'true' : 'false', onclick: function () { tab = 'mc'; render(el); } }, 'Pilihan ganda'),
      h('button', { type: 'button', role: 'tab', 'aria-selected': tab === 'bp' ? 'true' : 'false', onclick: function () { tab = 'bp'; render(el); } }, 'Bunpou'));
    el.appendChild(seg);
    if (tab === 'mc') {
      refs.input = h('input.input', { type: 'search', placeholder: 'Cari kuis', 'aria-label': 'Cari kuis', autocomplete: 'off', value: q });
      refs.input.addEventListener('input', U.debounce(function () { q = refs.input.value; fillQuizList(); }, 120));
      refs.list = h('div.quiz-list');
      el.appendChild(h('p.screen-sub.how', 'Baca pertanyaannya, lalu pilih jawaban yang benar. Nilai penuh 250, lulus di 200.'));
      el.appendChild(h('div.search', UI.iconEl('search'), refs.input));
      el.appendChild(refs.list); fillQuizList();
    } else {
      el.appendChild(h('p.screen-sub.how', 'Pilih level yang mau dilatih: satu bunpou, satu bab, atau campuran. Progres tersimpan di browser ini.'));
      el.appendChild(h('div.rows', BUNPOU.map(function (b) {
        return h('button.row', { type: 'button', onclick: function () { openBunpou(b); } },
          h('div.row-main', h('div.row-title', b.title), h('div.row-sub.meta', h('span.jp', b.sub), h('span', b.note))), h('div.row-end', UI.iconEl('chev', 'sm')));
      })));
    }
  }
  FC.app.register('practice', { render: render, show: function (el) { render(el); } });

  /* ---------- bunpou ---------- */
  function themeNow() {
    var t = FC.store.get('theme');
    if (t === 'dark' || t === 'light') return t;
    return root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function openBunpou(b) {
    UI.layer('full', function (L) {
      var url = new URL(b.file, document.baseURI).href + (b.file.indexOf('?') < 0 ? '?' : '&') + 'theme=' + themeNow();
      var frame = h('iframe.bp-frame', { title: 'Latihan Bunpou ' + b.title, src: url });
      L.el.classList.add('bunpou');
      L.el.appendChild(UI.fullBar({ title: 'Latihan Bunpou', sub: b.title, onBack: function () { L.close(); }, backLabel: 'Tutup latihan' }));
      L.el.appendChild(frame);
      var off = FC.store.onChange(function (keys) { if (!L.el.isConnected) return off(); if (keys.indexOf('theme') >= 0) { try { frame.contentWindow.postMessage({ type: 'fc-theme', theme: themeNow() }, '*'); } catch (e) {} } });
    });
  }

  /* ---------- kuis pilihan ganda ---------- */
  function openQuiz(item) {
    var lock = D.quizLockOf(item.id);
    var go = function () {
      if (!item.count) { UI.alert('Segera hadir', 'early acces, bentar saya coba sempurnain'); return; }
      play(item);
    };
    if (lock && !D.isUnlocked('quiz:' + item.id)) UI.askPassword(item.title + ' ' + item.sub, 'quiz', lock, 'quiz:' + item.id).then(function (ok) { if (ok) go(); });
    else go();
  }

  function play(item) {
    var st = { arr: [], i: 0, ok: 0, bad: 0, log: [], timer: 0, answered: false }, V = {};
    var pill = h('div.qpill', { 'aria-label': 'Skor' }, h('span.dot.dot-ok', { title: 'Benar' }), h('b.num', '0'), h('span.sep', '/'), h('span.dot.dot-bad', { title: 'Salah' }), h('b.num', '0'));
    UI.layer('full', function (L) {
      V.inner = h('div.full-inner.quiz-inner'); V.body = h('div.full-body.quiz-body', V.inner); V.prog = h('div.bar.study-prog', h('i'));
      L.el.classList.add('quiz');
      L.el.appendChild(UI.fullBar({ title: item.title, sub: item.sub, onBack: function () { L.close(); }, backLabel: 'Kembali ke menu', actions: [pill] }));
      L.el.appendChild(V.prog); L.el.appendChild(V.body);
      V.layer = L;
    }, function () { clearTimeout(st.timer); st.dead = true; document.removeEventListener('keydown', onKey, true); if (FC.app.current() === 'practice' && tab === 'mc') fillQuizList(); });
    document.addEventListener('keydown', onKey, true);

    function load() {
      U.clear(V.inner); V.inner.appendChild(h('div.study-msg', h('div.spinner', { 'aria-hidden': 'true' }), h('p', 'Memuat soal…')));
      D.loadQuiz(item.id).then(function (arr) {
        if (st.dead) return;
        if (!arr || !arr.length) { V.layer.close(); UI.alert('Segera hadir', 'early acces, bentar saya coba sempurnain'); return; }
        start(arr);
      }, function (e) {
        if (st.dead) return; U.clear(V.inner);
        V.inner.appendChild(h('div.study-msg', h('h2', 'Soal gagal dimuat'), h('p', (e && e.message) || 'Periksa koneksi lalu coba lagi.'), h('div.sheet-actions', h('button.btn.btn-primary', { type: 'button', onclick: load }, 'Coba lagi'))));
      });
    }
    function start(arr) { st.arr = arr.slice(); st.i = 0; st.ok = 0; st.bad = 0; st.log = []; score(); question(); }
    function score() { pill.children[1].textContent = st.ok; pill.children[4].textContent = st.bad; }

    function question() {
      var it = st.arr[st.i]; if (!it) return result();
      st.answered = false; U.clear(V.inner); V.body.scrollTop = 0;
      V.prog.firstChild.style.width = (st.i / st.arr.length * 100) + '%';
      var opts = U.shuffle([it.correct].concat(it.wrong || []), Math.random);
      V.btns = opts.map(function (o, k) {
        var b = h('button.opt', { type: 'button', 'data-l': LABELS[k] || String(k + 1) }, h('span.opt-l', LABELS[k] || String(k + 1)), h('span.opt-t.jp', o));
        b.addEventListener('click', function () { pick(b, o, it); });
        return b;
      });
      V.inner.appendChild(h('div.quiz-counter', 'Soal ' + (st.i + 1) + ' dari ' + st.arr.length));
      V.inner.appendChild(h('div.quiz-q.jp', it.question));
      V.inner.appendChild(h('p.quiz-prompt', 'Pilih jawaban yang benar'));
      V.inner.appendChild(h('div.opts', V.btns));
    }

    function pick(btn, ans, it) {
      if (st.answered || st.dead) return; st.answered = true;
      V.btns.forEach(function (b) { b.disabled = true; if (b !== btn) b.classList.add('dimmed'); });
      if (ans === it.correct) { btn.classList.remove('dimmed'); btn.classList.add('correct'); st.ok++; U.vibrate(8); }
      else {
        btn.classList.remove('dimmed'); btn.classList.add('wrong'); st.bad++; U.vibrate([10, 30, 10]);
        st.log.push({ question: it.question, selected: ans, correct: it.correct, explanation: it.explanation || '' });
        V.btns.forEach(function (b) { if (b.querySelector('.opt-t').textContent === it.correct) { b.classList.remove('dimmed'); b.classList.add('correct'); } });
      }
      score(); clearTimeout(st.timer); st.timer = setTimeout(advance, 1200);
    }
    function advance() { if (st.dead) return; clearTimeout(st.timer); st.i++; question(); }

    function result() {
      var total = st.ok + st.bad, finalScore = total ? Math.round(st.ok / total * MAX) : 0, pass = finalScore >= PASS;
      var title = 'Kuis Selesai!', fb = 'Belum lulus, yuk diulang biar makin nempel!';
      if (finalScore === MAX) { title = 'Perfect Score!'; fb = 'Sempurna banget, gokil! 🔥🔥'; }
      else if (pass) { title = 'Lulus!'; fb = 'Mantap, kamu lulus deck ini!'; }
      else if (finalScore >= PASS - 30) { title = 'Hampir Lulus'; fb = 'Dikit lagi lulus, ulangi yuk!'; }
      var best = FC.store.getKv('quizBest') || {};
      var prev = best[item.id], isBest = !prev || finalScore > prev.score;
      if (total && isBest) { best = Object.assign({}, best); best[item.id] = { score: finalScore, at: Date.now(), n: total }; FC.store.setKv('quizBest', best); }
      V.prog.firstChild.style.width = '100%'; U.clear(V.inner); V.body.scrollTop = 0;
      var card = h('div.result',
        h('div.result-score', h('span.num', String(finalScore)), h('span.max', ' / ' + MAX)),
        h('div.pass-tag.' + (pass ? 'pass' : 'fail'), pass ? '✓ Lulus' : '✕ Belum Lulus'),
        h('div.gauge', h('div.gauge-track', h('i.gauge-pass', { style: { left: (PASS / MAX * 100) + '%' } }), h('i.gauge-dot' + (pass ? '.pass' : '.fail'), { style: { left: (finalScore / MAX * 100) + '%' } })), h('div.gauge-labels', h('span', '0'), h('span', String(MAX)))),
        h('div.result-title', title),
        h('div.result-counts', h('span', h('b.num', String(st.ok)), ' benar'), h('span', h('b.num', String(st.bad)), ' salah'), h('span', h('b.num', String(total)), ' soal')),
        h('p.result-fb', fb),
        total && !isBest && prev ? h('p.small.muted', 'Skor terbaikmu masih ' + prev.score + ' dari ' + MAX + '.') : null,
        total && isBest ? h('p.small.best-note', prev ? 'Skor terbaik baru!' : 'Skor pertama tersimpan.') : null);
      V.inner.appendChild(card);
      if (st.log.length) {
        V.inner.appendChild(h('div.review', h('h3.review-title', 'Evaluasi jawaban salah (' + st.log.length + ')'), st.log.map(function (l) {
          return h('div.review-item', h('div.review-q.jp', l.question),
            h('div.review-a.wrong', h('span', 'Jawaban kamu'), h('span.jp', l.selected)), h('div.review-a.correct', h('span', 'Jawaban benar'), h('span.jp', l.correct)),
            l.explanation ? h('div.review-note', '💡 ' + l.explanation) : null);
        })));
      } else if (total) V.inner.appendChild(h('div.review-empty', '🎉 Semua jawaban kamu benar, mantap!'));
      V.inner.appendChild(h('div.sheet-actions.result-actions', h('button.btn.btn-primary.btn-block', { type: 'button', onclick: function () { start(st.arr); } }, 'Ulangi'), h('button.btn.btn-block', { type: 'button', onclick: function () { V.layer.close(); } }, 'Kembali ke menu')));
    }

    function onKey(e) {
      if (UI.topLayer() !== V.layer || st.dead || e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key;
      if (!V.btns || !V.btns.length) return;
      if (st.answered) { if (k === 'Enter' || k === ' ') { e.preventDefault(); advance(); } return; }
      var n = /^[1-6]$/.test(k) ? +k - 1 : /^[a-fA-F]$/.test(k) ? k.toUpperCase().charCodeAt(0) - 65 : -1;
      if (n >= 0 && V.btns[n]) { e.preventDefault(); V.btns[n].click(); }
    }
    load();
  }
})(window);
