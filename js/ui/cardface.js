/* =====================================================================
   js/ui/cardface.js — merakit isi sisi kartu (dipakai layar belajar, latihan bebas & daftar kartu).
   Arah f = Jepang → Indonesia (depan: kanji, jawaban: bacaan + arti). Arah r = Indonesia → Jepang (kebalikannya).
   Furigana mengikuti pengaturan global; kotak "Contoh penggunaan" menyorot kata yang sedang dipelajari.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  var U = FC.util, esc = U.esc;

  var TYPES = {
    noun: { label: 'Kata benda', pos: '名' }, verb: { label: 'Kata kerja', pos: '動' },
    'i-adj': { label: 'Kata sifat-i', pos: '形' }, 'na-adj': { label: 'Kata sifat-na', pos: '形動' },
    pronoun: { label: 'Kata ganti', pos: '代' }, adjective: { label: 'Kata sifat', pos: '形' }, kanji: { label: 'Kanji', pos: '漢' }
  };
  var F = {};

  F.badges = function (c) {
    var out = '';
    if (c.level) out += '<span class="tag tag-level">' + esc(c.level) + '</span>';
    var t = c.type && TYPES[c.type];
    if (t) out += '<span class="tag tag-type"><span class="pos jp">' + t.pos + '</span>' + t.label + '</span>';
    return out;
  };

  // sorot kata yang sedang dipelajari di kalimat contoh (furigana tetap utuh)
  F.processExample = function (html, front) {
    var m = front ? front.match(/^[一-鿿㐀-䶿々〆〤]+/) : null;
    var target = m ? m[0] : front;
    if (!target) return html;
    var re = new RegExp('<ruby>' + target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '<rt>.*?<\\/rt><\\/ruby>');
    var hit = html.match(re);
    if (hit) return html.replace(re, '<mark class="hl">' + hit[0] + '</mark>');
    if (html.indexOf(target) >= 0) return html.replace(target, '<mark class="hl">' + target + '</mark>');
    return html;
  };
  // Contoh kalimat boleh memuat penanda furigana (<ruby>…<rt>…</rt></ruby>) dan hanya itu. Tag lain dilucuti, supaya teks buatan
  // pengguna (atau cadangan/impor yang tidak tepercaya) tidak bisa menyuntikkan HTML. Isi deck bawaan tidak berubah.
  F.safeExample = function (s) {
    return String(s).split(/(<\/?(?:ruby|rt)>)/i).map(function (part, i) { return i % 2 ? part.toLowerCase() : esc(part); }).join('');
  };
  F.exampleBox = function (c) {
    if (!c.example || !FC.store.get('showExample')) return '';
    return '<div class="example"><div class="example-label">Contoh penggunaan</div><div class="example-jp jp">' + F.processExample(F.safeExample(c.example), c.front) +
      '</div>' + (c.exampleMeaning ? '<div class="example-id">' + esc(c.exampleMeaning) + '</div>' : '') + '</div>';
  };

  var UNSAFE = /[&<>"]/;
  /** HTML teks Jepang bila perlu dengan furigana (hanya bila pengaturan menyala & teks aman). */
  F.japanese = function (c) {
    if (FC.store.get('furigana') && !UNSAFE.test(c.front) && !UNSAFE.test(c.back)) {
      var html = FC.furigana.render(c.front, c.back);
      return { html: html, ruby: html.indexOf('<ruby') >= 0 };
    }
    return { html: esc(c.front), ruby: false };
  };
  /** kelas ukuran huruf menurut panjang teks */
  F.size = function (text) {
    var n = Array.from(String(text || '')).length;
    return n <= 2 ? 's1' : n <= 4 ? 's2' : n <= 8 ? 's3' : n <= 16 ? 's4' : 's5';
  };

  /**
   * Bagian-bagian kartu untuk arah tertentu:
   * { q: {html, jp, ruby, size}, a: {html, jp, ruby, size}, aSub: {html, jp}, badges, example, spoken }
   */
  F.parts = function (c, dir) {
    var jp = F.japanese(c), plainReading = esc(c.back), meaning = esc(c.backSub || '');
    var out = { badges: F.badges(c), example: F.exampleBox(c), spoken: c.back || c.front };
    if (dir === 'r') {
      out.q = { html: meaning, jp: false, ruby: false, size: F.size(c.backSub) };
      out.a = { html: jp.html, jp: true, ruby: jp.ruby, size: F.size(c.front) };
      out.aSub = { html: plainReading, jp: true };
    } else {
      out.q = { html: jp.html, jp: true, ruby: jp.ruby, size: F.size(c.front) };
      out.a = { html: plainReading, jp: true, ruby: false, size: F.size(c.back) };
      out.aSub = { html: meaning, jp: false };
    }
    return out;
  };

  /** Elemen sisi kartu: kelas .face dengan bagian pertanyaan & (bila `revealed`) jawaban. */
  F.build = function (c, dir, revealed) {
    var p = F.parts(c, dir), h = U.h;
    var q = h('div.face-q' + (p.q.jp ? '.jp' : '') + '.' + p.q.size + (p.q.ruby ? '.has-ruby' : ''), { html: p.q.html });
    var grid = Array.from(c.front || '').length <= 3 && dir !== 'r';
    var root = h('div.face', h('div.face-top', h('div.badges', { html: p.badges })));
    var qwrap = h('div.face-qwrap' + (grid ? '.grid' : ''), q);
    root.appendChild(qwrap);
    var ans = h('div.face-a', { hidden: !revealed },
      h('div.face-rule'),
      h('div.face-amain' + (p.a.jp ? '.jp' : '') + '.' + p.a.size + (p.a.ruby ? '.has-ruby' : ''), { html: p.a.html }),
      p.aSub.html ? h('div.face-asub' + (p.aSub.jp ? '.jp' : ''), { html: p.aSub.html }) : null,
      p.example ? h('div', { html: p.example }) : null);
    root.appendChild(ans);
    root._ans = ans; root._parts = p;
    return root;
  };

  FC.face = F;
  if (typeof module !== 'undefined' && module.exports) module.exports = F;
})(typeof window !== 'undefined' ? window : globalThis);
