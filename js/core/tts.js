/* =====================================================================
   js/core/tts.js — suara bahasa Jepang lewat Web Speech API bawaan browser (tanpa berkas suara, tanpa internet
   bila suara Jepang sudah terpasang di perangkat). FC.tts.speak(teks), FC.tts.stop(), FC.tts.supported.
   ===================================================================== */
(function (root) {
  'use strict';
  var FC = root.FC = root.FC || {};
  var synth = root.speechSynthesis, voices = [], T = { supported: !!(synth && root.SpeechSynthesisUtterance), hasJa: null };
  function load() { try { voices = synth.getVoices() || []; if (voices.length) T.hasJa = voices.some(function (v) { return /^ja/i.test(v.lang); }); } catch (e) {} }
  if (T.supported) { load(); try { synth.addEventListener('voiceschanged', load); } catch (e) { synth.onvoiceschanged = load; } }

  /** teks yang enak diucapkan: bacaan tanpa tanda ～, tanpa isi kurung, hanya alternatif pertama sebelum ／ */
  T.clean = function (s) {
    return String(s || '').split(/[／/]/)[0].replace(/[（(][^）)]*[）)]/g, '').replace(/[～〜~]/g, ' ').replace(/\s+/g, ' ').trim();
  };
  T.speak = function (text, opts) {
    if (!T.supported) return false;
    var t = T.clean(text); if (!t) return false;
    try {
      synth.cancel();
      var u = new root.SpeechSynthesisUtterance(t);
      u.lang = 'ja-JP'; u.rate = (opts && opts.rate) || (FC.store ? FC.store.get('ttsRate') : 0.9) || 0.9;
      var v = voices.filter(function (x) { return /^ja/i.test(x.lang); });
      if (v.length) u.voice = v.find(function (x) { return /google|kyoko|o-ren|haruka|nanami/i.test(x.name); }) || v[0];
      synth.speak(u); return true;
    } catch (e) { return false; }
  };
  T.stop = function () { try { if (synth) synth.cancel(); } catch (e) {} };
  FC.tts = T;
  if (typeof module !== 'undefined' && module.exports) module.exports = T;
})(typeof window !== 'undefined' ? window : globalThis);
