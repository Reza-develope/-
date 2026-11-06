/* =====================================================================
   js/ui/mydecks.js — "Deck Saya": bikin deck sendiri langsung dari web, tanpa coding.
   • MD.section(LS)        bagian "Deck Saya" di tab Deck (daftar deck + tombol Buat deck / Impor dari teks)
   • MD.create({deck?})    lembar "Deck baru" (atau "Ubah nama deck") → deck baru langsung dibuka di editor
   • MD.openEditor(id)     layar penuh: form tambah kartu, daftar kartu (ketuk untuk ubah/hapus), cari, tempel banyak, menu deck
   • MD.editCard(...)      lembar ubah kartu (dipakai juga dari layar belajar)
   • MD.openBulk(opts)     tempel banyak kartu / impor deck dari teks atau berkas, dengan pratinjau sebelum disimpan
   • MD.share(id)          salin, unduh, atau kirim isi deck sebagai teks
   • MD.remove(id)         hapus deck (dengan tombol Urungkan)
   Semua aturan data (batas, pembersihan teks, penyimpanan, jadwal belajar) ada di js/core/userdecks.js; berkas ini hanya tampilan.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC, U = FC.util, UI = FC.ui, D = FC.data, UD = FC.userDecks, h = U.h;
  var MD = FC.myDecks = {};
  var LIM = UD.LIMITS, fmt = U.fmtNum;
  var TYPE_LABEL = { noun: 'Kata benda', verb: 'Kata kerja', 'i-adj': 'Kata sifat-i', 'na-adj': 'Kata sifat-na', pronoun: 'Kata ganti', adjective: 'Kata sifat', kanji: 'Kanji' };
  var SAMPLE = '会社 | かいしゃ | perusahaan\n学校 | がっこう | sekolah\n食べる | たべる | makan\nごみ | ごみ | sampah';
  var composing = function (e) { return e.isComposing || e.keyCode === 229; };      // Enter yang menutup konversi IME bukan "kirim"
  var seq = 0;

  /* ---------- kabar ke layar lain (Deck, Beranda, Statistik menggambar ulang lewat 'progress') ---------- */
  var notifyTimer = 0;
  UD.onChange(function (ev) {
    clearTimeout(notifyTimer);
    notifyTimer = setTimeout(function () { FC.bus.emit('userdecks', ev); FC.bus.emit('progress'); }, 200);
  });

  /* ---------- alat kecil ---------- */
  function joinDaily(id) {
    var cur = (FC.store.get('active') || []).filter(function (x) { return x !== id; });
    cur.push(id); FC.store.set('active', cur);
  }
  function legacyCopy(ta) {
    try { ta.focus(); ta.select(); ta.setSelectionRange(0, ta.value.length); return !!document.execCommand('copy'); } catch (e) { return false; }
  }
  /** Salin teks ke papan klip. Promise<boolean>; `ta` (textarea berisi teks yang sama) dipakai bila API modern tidak tersedia. */
  function copyText(text, ta) {
    if (navigator.clipboard && navigator.clipboard.writeText && root.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(ta); });
    }
    return Promise.resolve(legacyCopy(ta));
  }
  function menuRow(title, sub, onclick, danger) {
    return h('button.row', { type: 'button', onclick: onclick },
      h('div.row-main', h('div.row-title' + (danger ? '.err' : ''), title), h('div.row-sub', sub)), h('div.row-end', UI.iconEl('chev', 'sm')));
  }
  function memoryBanner() {
    if (FC.store.mode !== 'memory') return null;
    return h('div.banner.err', UI.iconEl('info', 'sm'), h('span', 'Penyimpanan browser tidak tersedia, jadi deck ini hanya bertahan sampai halaman ditutup. Gunakan Bagikan deck untuk menyimpan teksnya.'));
  }

  /* ---------- kolom isian ---------- */
  function field(label, input, hint) {
    var id = 'myf' + (++seq), err = h('div.field-err', { id: id + '-e', role: 'alert' });
    input.id = id;
    input.setAttribute('aria-describedby', id + '-e' + (hint ? ' ' + id + '-h' : ''));
    var api = {
      input: input,
      el: h('div.field', h('label', { for: id }, label), input, hint ? h('div.field-hint', { id: id + '-h' }, hint) : null, err),
      error: function (msg) { err.textContent = msg || ''; if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); }
    };
    input.addEventListener('input', function () { api.error(''); });
    return api;
  }
  function textInput(o) {
    var attrs = { type: 'text', lang: o.lang, placeholder: o.placeholder, maxlength: String(o.max), autocomplete: 'off', autocapitalize: 'off', enterkeyhint: o.enter || 'next' };
    if (!o.spell) attrs.spellcheck = 'false';
    return h('input.input' + (o.jp ? '.jp' : ''), attrs);
  }

  /**
   * Formulir kartu (dipakai di editor dan di lembar ubah kartu). Enter pindah ke kolom berikutnya, dan di kolom terakhir
   * mengirim formulir. Mengembalikan { el (elemen <form>), values(), set(kartu), clear(), focus(), showError(hasil) }.
   */
  function cardForm(o) {
    o = o || {};
    var F = {};
    F.front = field('Tulisan Jepang (depan kartu)', textInput({ jp: true, lang: 'ja', placeholder: '例: 会社', max: LIM.front }));
    F.back = field('Cara baca (hiragana)', textInput({ jp: true, lang: 'ja', placeholder: '例: かいしゃ', max: LIM.back }), 'Boleh dikosongkan kalau tulisan depan sudah hiragana atau katakana.');
    F.backSub = field('Arti (bahasa Indonesia)', textInput({ lang: 'id', placeholder: 'mis. perusahaan', max: LIM.backSub, enter: 'done', spell: true }));
    F.example = field('Contoh kalimat', textInput({ jp: true, lang: 'ja', placeholder: '例: 会社に行きます。', max: LIM.example }));
    F.exampleMeaning = field('Arti contoh kalimat', textInput({ lang: 'id', placeholder: 'mis. Saya pergi ke kantor.', max: LIM.exampleMeaning, enter: 'done', spell: true }));
    var sel = h('select.input.select.full', h('option', { value: '' }, 'Tidak diisi'));
    UD.TYPES.forEach(function (t) { sel.appendChild(h('option', { value: t }, TYPE_LABEL[t] || t)); });
    F.type = field('Jenis kata', sel);
    var more = h('details.my-more', h('summary', 'Contoh kalimat dan jenis kata (opsional)'), F.example.el, F.exampleMeaning.el, F.type.el);
    var form = h('form.my-form', { novalidate: true, autocomplete: 'off' }, F.front.el, F.back.el, F.backSub.el, more);
    var submit = function () { if (o.onSubmit) o.onSubmit(); };
    form.addEventListener('submit', function (e) { e.preventDefault(); submit(); });
    [[F.front, F.back, F.backSub], [F.example, F.exampleMeaning]].forEach(function (chain) {
      chain.forEach(function (f, i) {
        f.input.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter' || composing(e) || e.altKey || e.ctrlKey || e.metaKey) return;
          e.preventDefault();
          if (chain[i + 1]) chain[i + 1].input.focus(); else submit();
        });
      });
    });
    var api = { el: form };
    api.values = function () {
      return { front: F.front.input.value, back: F.back.input.value, backSub: F.backSub.input.value, example: F.example.input.value, exampleMeaning: F.exampleMeaning.input.value, type: sel.value };
    };
    api.set = function (c) {
      F.front.input.value = c.front || ''; F.back.input.value = c.back || ''; F.backSub.input.value = c.backSub || '';
      F.example.input.value = c.example || ''; F.exampleMeaning.input.value = c.exampleMeaning || ''; sel.value = c.type || '';
      more.open = !!(c.example || c.exampleMeaning || c.type);
    };
    api.clear = function () { api.set({}); more.open = false; Object.keys(F).forEach(function (k) { F[k].error(''); }); };
    api.focus = function () { F.front.input.focus(); };
    api.showError = function (res) {
      var f = res.duplicate ? F.front : (F[res.field] || F.front);
      f.error(res.error); f.input.focus();
    };
    return api;
  }

  /* =====================================================================
     Bagian "Deck Saya" di tab Deck
     ===================================================================== */
  MD.section = function (LS) {
    var g = D.groupById.get(D.USER_GROUP), mine = D.topDecks(D.USER_GROUP);
    var head = h('div.group-head' + (mine.length ? '.has-actions' : ''), h('h2.group-title', g.title), g.sub ? h('span.group-sub.jp', g.sub) : null);
    if (mine.length) head.appendChild(h('div.group-actions', h('button.btn.btn-sm.btn-primary', { type: 'button', onclick: function () { MD.create(); } }, UI.iconEl('plus', 'sm'), 'Buat deck')));
    var sec = h('section.group.group-mine', head);
    if (!mine.length) {
      sec.appendChild(h('div.mine-empty',
        h('h3', 'Bikin deck sendiri'),
        h('p', 'Tulis kosakatamu sendiri, atau tempel daftar dari catatan, Excel, atau temanmu. Tanpa coding, dan langsung dipelajari dengan jadwal ulang pintar seperti deck lainnya.'),
        h('div.mine-btns',
          h('button.btn.btn-primary', { type: 'button', onclick: function () { MD.create(); } }, UI.iconEl('plus', 'sm'), 'Buat deck'),
          h('button.btn', { type: 'button', onclick: function () { MD.openBulk({ create: true }); } }, UI.iconEl('paste', 'sm'), 'Impor dari teks'))));
    } else {
      sec.appendChild(h('div.rows', mine.map(function (d) { return FC.decksUI.row(d, LS); })));
      sec.appendChild(h('div.mine-tail', h('button.btn.btn-quiet.btn-sm', { type: 'button', onclick: function () { MD.openBulk({ create: true }); } }, UI.iconEl('paste', 'sm'), 'Impor deck dari teks')));
    }
    return sec;
  };

  /* ---------- lembar deck: baris tambahan untuk deck buatan sendiri ---------- */
  /** Baris "Edit deck" (di bawah tombol belajar). go(fn) = membuka layar penuh lalu menutup lembar di bawahnya. */
  MD.editRow = function (id, go) {
    return h('div.rows.tight', menuRow('Edit deck', 'Tambah, ubah, atau hapus kartu', go(function () { MD.openEditor(id); })));
  };
  /** Deck masih kosong: ajak menambah kartu. */
  MD.emptyState = function (id, go) {
    return h('div.my-empty',
      h('h3', 'Deck ini masih kosong'),
      h('p', 'Tambahkan kartu pertamamu satu per satu, atau tempel banyak kartu sekaligus dari catatan atau Excel.'),
      h('div.sheet-actions',
        h('button.btn.btn-primary.btn-block', { type: 'button', onclick: go(function () { MD.openEditor(id, { fresh: true }); }) }, UI.iconEl('plus', 'sm'), 'Tambah kartu'),
        h('button.btn.btn-block', { type: 'button', onclick: go(function () { MD.openBulk({ deck: id }); }) }, UI.iconEl('paste', 'sm'), 'Tempel banyak kartu')));
  };
  /** Bagikan & Hapus di dasar lembar deck. */
  MD.footer = function (id, L) {
    return h('div.my-foot-actions',
      h('button.btn.btn-quiet.btn-block', { type: 'button', onclick: function () { MD.share(id); } }, UI.iconEl('share', 'sm'), 'Bagikan deck'),
      h('button.btn.btn-quiet.btn-danger-quiet.btn-block', { type: 'button', onclick: function () { MD.remove(id, function () { L.close(); }); } }, UI.iconEl('trash', 'sm'), 'Hapus deck'));
  };

  /* =====================================================================
     Deck baru / ubah nama
     ===================================================================== */
  MD.create = function (o) {
    o = o || {};
    var cur = o.deck ? UD.get(o.deck) : null;
    if (o.deck && !cur) return null;
    var name = textInput({ lang: 'id', placeholder: 'mis. Kosakata kantor', max: LIM.title, enter: 'next', spell: true });
    var sub = textInput({ lang: 'id', placeholder: 'mis. Bab 5 atau dari buku catatan', max: LIM.sub, enter: 'done', spell: true });
    if (cur) { name.value = cur.title; sub.value = cur.sub || ''; }
    var nameF = field('Nama deck', name), subF = field('Keterangan (opsional)', sub);
    var layer;
    function submit() {
      if (cur) {
        var r = UD.rename(cur.id, { title: name.value, sub: sub.value });
        if (!r.ok) { nameF.error(r.error); name.focus(); return; }
        layer.close(); UI.toast('Nama deck diperbarui'); return;
      }
      var res = UD.create({ title: name.value, sub: sub.value });
      if (!res.ok) { nameF.error(res.error); name.focus(); return; }
      joinDaily(res.id);
      MD.openEditor(res.id, { fresh: true });          // layar penuh dibuka dulu, baru lembar ini ditutup (satu entri riwayat saja)
      layer.close();
    }
    var form = h('form', { novalidate: true, autocomplete: 'off' }, nameF.el, subF.el,
      h('div.sheet-actions', h('button.btn.btn-primary.btn-block', { type: 'submit' }, cur ? 'Simpan' : 'Buat deck'),
        cur ? null : h('p.hint.center', 'Deck baru otomatis ikut sesi harian. Bisa dimatikan kapan saja.')));
    form.addEventListener('submit', function (e) { e.preventDefault(); submit(); });
    [name, sub].forEach(function (inp, i) {
      inp.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' || composing(e)) return;
        e.preventDefault(); if (i === 0) sub.focus(); else submit();
      });
    });
    layer = UI.sheet({ title: cur ? 'Ubah nama deck' : 'Deck baru', sub: cur ? null : 'Isi kartunya di langkah berikutnya.', body: form, focus: false });
    setTimeout(function () { name.focus({ preventScroll: true }); }, 120);
    return layer;
  };

  /* =====================================================================
     Editor deck
     ===================================================================== */
  MD.openEditor = function (id, o) {
    o = o || {};
    if (!UD.has(id)) return null;
    var PAGE = 40, V = { q: '', shown: 0, all: [], filtered: [], index: new Map() }, last = null, io = null, rafId = 0, cleanup = null;
    return UI.layer('full', function (L) {
      L.el.classList.add('my-editor');
      var info = function () { return UD.get(id) || { title: '', count: 0 }; };
      var barSub = function () { var n = info().count; return n ? fmt(n) + ' kartu' : 'Belum ada kartu'; };
      var form = cardForm({ onSubmit: add });
      var status = h('div.my-status', { role: 'status', 'aria-live': 'polite' });
      var count = h('p.muted.small.result-count');
      var list = h('div.citems.my-cards');
      var sentinel = h('div.sentinel', { hidden: true }, h('button.btn.btn-quiet', { type: 'button', onclick: function () { more(); } }, 'Tampilkan lebih banyak'));
      var search = h('input.input', { type: 'search', placeholder: 'Cari di deck ini', 'aria-label': 'Cari kartu di deck ini', autocomplete: 'off', enterkeyhint: 'search' });

      form.el.appendChild(h('div.sheet-actions', h('button.btn.btn-primary.btn-block', { type: 'submit' }, UI.iconEl('plus', 'sm'), 'Tambah kartu')));
      var panel = h('section.my-add', h('h2.my-h', 'Tambah kartu'), form.el, status, h('p.field-hint.my-autosave', 'Perubahan tersimpan otomatis di browser ini.'));

      var active = (FC.store.get('active') || []).indexOf(id) >= 0;
      var daily = FC.decksUI.switchRow('Ikut sesi harian', 'Kartu baru dan review deck ini muncul di Beranda.', active, function (on) {
        var cur = (FC.store.get('active') || []).filter(function (x) { return x !== id; });
        if (on) cur.push(id);
        FC.store.set('active', cur); UI.toast(on ? 'Masuk ke sesi harian' : 'Dikeluarkan dari sesi harian');
      });
      var tools = h('div.my-tools',
        h('button.btn', { type: 'button', onclick: function () { MD.openBulk({ deck: id }); } }, UI.iconEl('paste', 'sm'), 'Tempel banyak'),
        h('button.btn', { type: 'button', onclick: studyNow }, UI.iconEl('book', 'sm'), 'Belajar'));

      var menuBtn = h('button.btn.btn-icon', { type: 'button', 'aria-label': 'Menu deck', onclick: menu }, UI.iconEl('more'));
      var bar = UI.fullBar({ title: info().title, sub: barSub(), onBack: function () { L.close(); }, actions: [UI.furiButton(), menuBtn] });
      var inner = h('div.full-inner.my-inner', memoryBanner(), panel, tools, daily, h('div.search.my-search', UI.iconEl('search'), search), count, list, sentinel);
      var body = h('div.full-body', inner);
      L.el.appendChild(bar); L.el.appendChild(body);

      /* --- aksi --- */
      function add() {
        var res = UD.addCard(id, form.values());
        if (!res.ok) { form.showError(res); return; }
        form.clear(); form.focus();
        last = res.card; drawStatus();
      }
      function drawStatus() {
        U.clear(status);
        if (!last) return;
        var c = last;
        status.appendChild(UI.iconEl('check', 'sm'));
        status.appendChild(h('span.my-status-text', 'Ditambahkan: ', h('b.jp', c.front), ' · ' + c.backSub));
        status.appendChild(h('button.btn-link', { type: 'button', onclick: function () { UD.removeCard(id, c._id); last = null; drawStatus(); form.focus(); } }, 'Urungkan'));
      }
      function studyNow() {
        if (!UD.cards(id).length) { UI.toast('Tambahkan kartu dulu.'); form.focus(); return; }
        var below = UI.layers(); FC.study.start({ type: 'deck', id: id }); below.forEach(function (x) { x.close(); });
      }
      function menu() {
        var sh = UI.sheet({ title: 'Menu deck', sub: info().title, focus: false, body: h('div.rows',
          menuRow('Ubah nama dan keterangan', 'Nama yang tampil di daftar deck', function () { sh.close(); MD.create({ deck: id }); }),
          menuRow('Bagikan deck', 'Salin atau unduh sebagai teks untuk dikirim ke teman', function () { sh.close(); MD.share(id); }),
          menuRow('Hapus deck', 'Kartu dan jadwal belajarnya ikut terhapus', function () { sh.close(); MD.remove(id, function () { L.close(); }); }, true)) });
      }

      /* --- daftar kartu --- */
      function row(c, idx) {
        var jp = FC.face.japanese(c), open = function () { MD.editCard(id, c._id, { allowDelete: true }); };
        return h('div.citem.my-row', { role: 'button', tabindex: '0', 'data-id': c._id, 'aria-label': 'Ubah kartu: ' + c.front + (c.backSub ? ', ' + c.backSub : ''), onclick: open,
            onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } } },
          h('span.citem-no.num', { 'aria-hidden': 'true' }, String(idx + 1)),
          h('div.citem-main',
            h('div.citem-front.jp' + (jp.ruby ? '.has-ruby' : ''), { html: jp.html }),
            c.back && c.back !== c.front ? h('div.citem-read.jp', c.back) : null,
            c.backSub ? h('div.citem-mean', c.backSub) : null),
          h('div.citem-end', UI.iconEl('pencil', 'sm')));
      }
      function more(upto) {
        var end = Math.min(V.filtered.length, upto || V.shown + PAGE), frag = document.createDocumentFragment();
        for (var i = V.shown; i < end; i++) frag.appendChild(row(V.filtered[i], V.index.get(V.filtered[i])));
        list.appendChild(frag); V.shown = end; sentinel.hidden = V.shown >= V.filtered.length;
      }
      function renderList(keep) {
        var cards = UD.cards(id), q = U.norm(V.q).trim(), top = body.scrollTop;
        V.all = cards; V.index = new Map(cards.map(function (c, i) { return [c, i]; }));
        V.filtered = !q ? cards : cards.filter(function (c) { return U.norm(c.front + ' ' + c.back + ' ' + (c.backSub || '')).indexOf(q) >= 0; });
        U.clear(list); V.shown = 0; more(Math.max(PAGE, keep || 0));
        count.textContent = !cards.length ? '' : fmt(V.filtered.length) + (V.filtered.length === cards.length ? ' kartu, ketuk untuk mengubah' : ' dari ' + fmt(cards.length) + ' kartu');
        if (!cards.length) list.appendChild(h('div.empty', h('h3', 'Belum ada kartu'), h('p', 'Isi formulir di atas untuk menambah kartu pertama, atau tempel banyak kartu sekaligus.')));
        else if (!V.filtered.length) list.appendChild(h('div.empty', h('p', 'Tidak ada kartu yang cocok.')));
        body.scrollTop = top;
      }
      function refresh() {
        if (!UD.has(id)) return;
        var t = bar.querySelector('.fullbar-title .t'), s = bar.querySelector('.fullbar-title .s');
        if (t) t.textContent = info().title; if (s) s.textContent = barSub();
        if (last && UD.cards(id).indexOf(last) < 0) { last = null; drawStatus(); }
        renderList(V.shown);
      }

      search.addEventListener('input', U.debounce(function () { V.q = search.value; renderList(); }, 140));
      if ('IntersectionObserver' in root) {
        io = new IntersectionObserver(function (es) { if (es[0].isIntersecting && V.shown < V.filtered.length) more(); }, { root: body, rootMargin: '500px 0px' });
        io.observe(sentinel);
      }
      var offChange = UD.onChange(function (ev) {
        if (!L.el.isConnected) return;
        if (ev.type === 'remove' && ev.id === id) { L.close(); return; }
        if (ev.type !== 'load' && ev.id !== id) return;
        if (!rafId) rafId = requestAnimationFrame(function () { rafId = 0; refresh(); });          // rapatkan banyak perubahan beruntun jadi satu gambar ulang
      });
      var offFuri = FC.bus.on('furigana', function () { if (!L.el.isConnected) return offFuri(); renderList(V.shown); });
      cleanup = function () { offChange(); offFuri(); if (io) io.disconnect(); if (rafId) cancelAnimationFrame(rafId); };

      renderList();
      if (o.fresh) setTimeout(function () { form.focus(); }, 160);
    }, function () { if (cleanup) cleanup(); });
  };

  /* =====================================================================
     Ubah / hapus satu kartu
     ===================================================================== */
  MD.editCard = function (deckId, cardId, o) {
    o = o || {};
    var card = UD.cards(deckId).filter(function (c) { return c._id === cardId; })[0], dk = UD.get(deckId);
    if (!card || !dk) { UI.toast('Kartu tidak ditemukan.'); return null; }
    var layer, form = cardForm({ onSubmit: save });
    form.set(card);
    var studied = ['f', 'r'].some(function (d) { return !!FC.store.getCard(cardId + ':' + d); });
    function save() {
      var res = UD.updateCard(deckId, cardId, form.values());
      if (!res.ok) { form.showError(res); return; }
      layer.close(); UI.toast('Perubahan disimpan');
      if (o.onSaved) o.onSaved(res.card);
    }
    function del() {
      var r = UD.removeCard(deckId, cardId);
      if (!r.ok) return;
      layer.close();
      UI.toast('Kartu dihapus', { ms: 7000, action: { label: 'Urungkan', onclick: function () { r.undo(); } } });
    }
    var actions = h('div.sheet-actions',
      h('button.btn.btn-primary.btn-block', { type: 'submit' }, 'Simpan'),
      studied ? h('p.hint.center', 'Kartu ini sudah punya jadwal belajar. Mengubah tulisannya tidak mengulang jadwal.') : null,
      o.allowDelete ? h('button.btn.btn-quiet.btn-danger-quiet.btn-block', { type: 'button', onclick: del }, UI.iconEl('trash', 'sm'), 'Hapus kartu') : null);
    form.el.appendChild(actions);
    layer = UI.sheet({ title: 'Ubah kartu', sub: dk.title, body: form.el, focus: false });
    return layer;
  };

  /* =====================================================================
     Tempel banyak kartu / impor dari teks atau berkas
     ===================================================================== */
  var DELIM = { tab: 'Tab (dari Excel atau Google Sheets)', pipe: 'garis tegak |', ',': 'koma (CSV)', ';': 'titik koma (CSV)' };
  MD.openBulk = function (o) {
    o = o || {};
    var deck = o.deck ? UD.get(o.deck) : null;
    if (o.deck && !deck) return null;
    return UI.layer('full', function (L) {
      var parsed = null, nameTouched = false;
      var id = 'myb' + (++seq);
      var ta = h('textarea.textarea.jp', { rows: '9', placeholder: SAMPLE, 'aria-label': 'Daftar kartu untuk ditempel', 'aria-describedby': id + '-help', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off' });
      var pv = h('div.my-pv', { 'aria-live': 'polite' });
      var go = h('button.btn.btn-primary.btn-block', { type: 'button', disabled: true, onclick: submit }, '');
      var nameF = null, subF = null, nameBox = null;
      if (!deck) {
        nameF = field('Nama deck', textInput({ lang: 'id', placeholder: 'mis. Kosakata kantor', max: LIM.title, enter: 'next', spell: true }));
        subF = field('Keterangan (opsional)', textInput({ lang: 'id', placeholder: 'mis. Bab 5', max: LIM.sub, enter: 'done', spell: true }));
        [nameF, subF].forEach(function (f) { f.input.addEventListener('input', function () { nameTouched = true; }); });
        nameBox = h('div.my-namebox', nameF.el, subF.el);
      }
      var sample = h('details.my-more.my-sample', h('summary', 'Lihat contoh format'),
        h('pre.my-pre.jp', SAMPLE),
        h('ul.my-notes',
          h('li', 'Cara baca boleh dikosongkan. Kalau hanya dua bagian, dibaca tulisan Jepang | arti.'),
          h('li', 'Baris yang diawali # diabaikan. Tabel Markdown dan CSV juga bisa dibaca.')),
        h('button.btn.btn-sm', { type: 'button', onclick: function () { ta.value = SAMPLE; analyze(); ta.focus(); } }, 'Pakai contoh ini'));
      var fileBtn = h('button.btn.btn-sm', { type: 'button', onclick: pickFile }, UI.iconEl('upload', 'sm'), 'Pilih berkas .txt atau .csv');

      var inner = h('div.full-inner.my-inner', nameBox,
        h('p.my-lead', { id: id + '-help' }, 'Tulis atau tempel satu kartu per baris, dipisah tanda |  →  tulisan Jepang | cara baca | arti. Dari Excel atau Google Sheets? Blok sel-selnya, salin, lalu tempel di sini.'),
        sample, h('div.field', h('label', { for: id + '-ta' }, 'Daftar kartu'), ta), h('div.my-bulk-tools', fileBtn), pv);
      ta.id = id + '-ta';
      var bar = UI.fullBar({ title: deck ? 'Tempel banyak kartu' : 'Impor deck dari teks', sub: deck ? deck.title : 'Deck baru', onBack: function () { L.close(); } });
      var body = h('div.full-body', inner), foot = h('div.my-foot', h('div.my-foot-inner', go));
      L.el.classList.add('my-bulk'); L.el.appendChild(bar); L.el.appendChild(body); L.el.appendChild(foot);

      function setGo(n) {
        go.disabled = n < 1;
        go.textContent = n < 1 ? (deck ? 'Tambahkan kartu' : 'Buat deck') : (deck ? 'Tambahkan ' + fmt(n) + ' kartu' : 'Buat deck dengan ' + fmt(n) + ' kartu');
      }
      function analyze() {
        var text = ta.value;
        U.clear(pv); parsed = null;
        if (!text.trim()) { setGo(0); return; }
        var r = UD.parseText(text), cn = UD.countNew(deck ? deck.id : null, r.cards);
        parsed = r;
        if (!deck && !nameTouched) { if (r.title) nameF.input.value = r.title; if (r.sub) subF.input.value = r.sub; }
        setGo(cn.fresh);
        var lines = text.replace(/\r\n?/g, '\n').split('\n');
        if (!r.cards.length) {
          pv.appendChild(h('div.banner', UI.iconEl('info', 'sm'), h('span', 'Belum ada baris yang bisa dibaca. Tiap baris perlu minimal dua bagian yang dipisah tanda |, misalnya: 犬 | いぬ | anjing')));
        } else {
          pv.appendChild(h('div.pv-head', h('b.num', fmt(cn.fresh)), ' kartu siap ' + (deck ? 'ditambahkan' : 'dibuat') + (r.delimiter && DELIM[r.delimiter] ? ' · pemisah: ' + DELIM[r.delimiter] : '')));
          var notes = [];
          if (cn.dup) notes.push(fmt(cn.dup) + ' sudah ada di deck ini, dilewati');
          if (cn.over) notes.push(fmt(cn.over) + ' melebihi batas ' + fmt(LIM.cards) + ' kartu per deck, dilewati');
          if (r.truncated && !cn.over) notes.push('teks terlalu panjang, hanya sebagian yang dibaca');
          if (notes.length) pv.appendChild(h('p.pv-note', notes.join('. ') + '.'));
          var show = cn.cards.slice(0, 6);                                    // hanya kartu yang benar-benar akan masuk (yang kembar tidak ditampilkan)
          if (show.length) pv.appendChild(h('div.pv-table', { role: 'table', 'aria-label': 'Contoh kartu yang akan ditambahkan' },
            show.map(function (c) { return h('div.pv-row', { role: 'row' }, h('span.jp', { role: 'cell' }, c.front), h('span.jp', { role: 'cell' }, c.back || ''), h('span', { role: 'cell' }, c.backSub)); })));
          if (cn.fresh > show.length) pv.appendChild(h('p.pv-more', '…dan ' + fmt(cn.fresh - show.length) + ' kartu lainnya'));
        }
        var bad = r.skipped.filter(function (s) { return !/^sama persis|^melebihi batas/.test(s.reason); }), same = r.skipped.length - bad.length;
        if (same) pv.appendChild(h('p.pv-note', fmt(same) + ' baris kembar atau melebihi batas dilewati.'));
        if (bad.length) {
          pv.appendChild(h('div.pv-skip', h('div.pv-skip-title', fmt(bad.length) + ' baris tidak terbaca'),
            bad.slice(0, 5).map(function (s) {
              var raw = (lines[s.line - 1] || '').trim(); if (raw.length > 60) raw = raw.slice(0, 60) + '…';
              return h('div.pv-skip-row', h('span.num', 'Baris ' + s.line + ': '), s.reason, raw ? h('div.pv-skip-raw.jp', raw) : null);
            }), bad.length > 5 ? h('div.pv-skip-more', '…dan ' + fmt(bad.length - 5) + ' baris lainnya') : null));
        }
      }
      function pickFile() {
        UI.pickFile('.txt,.csv,.tsv,.md,text/plain,text/csv,text/tab-separated-values').then(function (f) {
          if (!f) return;
          ta.value = f.text; analyze();
          UI.toast('Berkas dibaca: ' + f.name);
        });
      }
      function submit() {
        if (!parsed || !parsed.cards.length) return;
        var res;
        if (deck) {
          res = UD.addCards(deck.id, parsed.cards);
          if (!res.ok) { UI.toast(res.error || 'Gagal menambahkan kartu.'); return; }
          L.close();
          UI.toast(res.added ? fmt(res.added) + ' kartu ditambahkan' + (res.skipped ? ', ' + fmt(res.skipped) + ' dilewati' : '') : 'Tidak ada kartu baru: semuanya sudah ada di deck ini', { ms: 4600 });
          return;
        }
        res = UD.create({ title: nameF.input.value, sub: subF.input.value, cards: parsed.cards });
        if (!res.ok) { nameF.error(res.error); try { nameF.input.scrollIntoView({ block: 'center' }); } catch (e) {} nameF.input.focus(); return; }
        joinDaily(res.id);
        MD.openEditor(res.id);
        L.close();
        UI.toast('Deck dibuat dengan ' + fmt(res.added) + ' kartu' + (res.skipped ? ', ' + fmt(res.skipped) + ' dilewati' : ''), { ms: 4600 });
      }

      ta.addEventListener('input', U.debounce(analyze, 220));
      setGo(0);
      setTimeout(function () { (nameF ? nameF.input : ta).focus({ preventScroll: true }); }, 140);
    });
  };

  /* =====================================================================
     Bagikan deck sebagai teks
     ===================================================================== */
  MD.share = function (id) {
    var info = UD.get(id); if (!info) return null;
    var text = UD.toText(id), ta = h('textarea.textarea.jp', { rows: '8', readonly: true, 'aria-label': 'Isi deck sebagai teks', spellcheck: 'false' });
    ta.value = text;
    var copyBtn = h('button.btn.btn-primary.btn-block', { type: 'button', onclick: function () {
      copyText(text, ta).then(function (ok) { UI.toast(ok ? 'Teks disalin' : 'Tidak bisa menyalin otomatis. Teksnya sudah terpilih: tekan lama lalu pilih Salin.', { ms: ok ? 3000 : 6000 }); });
    } }, UI.iconEl('copy', 'sm'), 'Salin teks');
    var dl = h('button.btn.btn-block', { type: 'button', onclick: function () {
      UI.download(UD.fileName(id), String.fromCharCode(0xfeff) + text, 'text/plain;charset=utf-8'); UI.toast('Berkas diunduh');
    } }, UI.iconEl('download', 'sm'), 'Unduh berkas .txt');
    var canShare = typeof navigator.share === 'function';
    var send = !canShare ? null : h('button.btn.btn-block', { type: 'button', onclick: function () {
      navigator.share({ title: info.title, text: text }).catch(function () { /* dibatalkan */ });
    } }, UI.iconEl('share', 'sm'), 'Kirim lewat aplikasi lain');
    return UI.sheet({ title: 'Bagikan deck', sub: info.title + ' · ' + fmt(info.count) + ' kartu', focus: false, body: h('div.my-share',
      h('p.muted.small', 'Salin teks ini dan kirim lewat WhatsApp atau simpan di catatan. Temanmu cukup buka tab Deck, pilih Impor deck dari teks, lalu tempel.'),
      ta, h('div.sheet-actions', copyBtn, dl, send)) });
  };

  /* =====================================================================
     Hapus deck (dengan Urungkan)
     ===================================================================== */
  MD.remove = function (id, onDone) {
    var d = UD.get(id); if (!d) return null;
    return UI.confirm({
      title: 'Hapus deck "' + d.title + '"?',
      text: d.count ? fmt(d.count) + ' kartu beserta jadwal belajar dan bintangnya dihapus dari perangkat ini. Kamu masih bisa mengurungkan beberapa detik setelah ini.' : 'Deck kosong ini akan dihapus.',
      ok: 'Hapus deck', danger: true
    }).then(function (yes) {
      if (!yes) return false;
      return UD.remove(id).then(function (r) {
        if (!r.ok) { UI.toast(r.error || 'Deck tidak bisa dihapus.'); return false; }
        if (onDone) onDone();
        UI.toast('Deck dihapus', { ms: 9000, action: { label: 'Urungkan', onclick: function () {
          r.undo().then(function (ok) { UI.toast(ok ? 'Deck dikembalikan' : 'Deck tidak bisa dikembalikan'); });
        } } });
        return true;
      });
    });
  };
})(window);
