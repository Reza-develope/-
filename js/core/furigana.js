/* =====================================================================
   js/core/furigana.js — MESIN FURIGANA (ruby per-kanji, dengan pengaman). Algoritma dari aplikasi lama,
   tidak diubah; hanya dipisah dari tombol/DOM. Dipakai sebagai:  FC.furigana.render(depan, bacaan) → HTML.
   Total bacaan yang ditampilkan SELALU sama dengan data "bacaan" — kalau ragu, jatuh ke satu <ruby> utuh.
   Butuh js/core/furigana-data.js dimuat lebih dulu.
   ===================================================================== */
(function (root) {
  'use strict';
  var KANJI_READINGS = root.FC.furiData.KANJI_READINGS, SPECIAL_COMPOUNDS = root.FC.furiData.SPECIAL_COMPOUNDS;
  const KANJI_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF々〆〤]/;
  const KANJI_OR_DIGIT_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF々〆〤0-90-9]/;

  // Pecah teks jadi runs: yang butuh cara baca (kanji/angka) vs yang literal (hiragana/katakana/simbol)
  function fcSegmentFront(front) {
      const segments = [];
      let current = '';
      let currentType = null;
      for (const ch of front) {
          const type = KANJI_OR_DIGIT_REGEX.test(ch);
          if (currentType === null || type === currentType) {
              current += ch;
          } else {
              segments.push({ text: current, needsReading: currentType });
              current = ch;
          }
          currentType = type;
      }
      if (current) segments.push({ text: current, needsReading: currentType });
      return segments;
  }
  
  // ======================= KAMUS CARA BACA KANJI (buat furigana presisi per-kanji) =======================
  // Kamus ini isinya cara baca "dasar" tiap kanji (on-yomi & kun-yomi paling umum),

  // --- Aturan perubahan bunyi otomatis, biar KANJI_READINGS di atas cukup nyimpan
  //     satu bentuk dasar per bacaan (sokuon/rendaku/handaku dihitung sendiri) ---
  const RENDAKU_MAP = {'は':'ば','ひ':'び','ふ':'ぶ','へ':'べ','ほ':'ぼ','か':'が','き':'ぎ','く':'ぐ','け':'げ','こ':'ご','さ':'ざ','し':'じ','す':'ず','せ':'ぜ','そ':'ぞ','た':'だ','ち':'ぢ','つ':'づ','て':'で','と':'ど'};
  const HANDAKU_MAP = {'は':'ぱ','ひ':'ぴ','ふ':'ぷ','へ':'ぺ','ほ':'ぽ'};
  const SOKUON_TRIGGER = new Set(['く','き','ち','つ']);
  
  function rendakuVariant(r) {
      if (!r) return null;
      const v = RENDAKU_MAP[r[0]];
      return v ? v + r.slice(1) : null;
  }
  function handakuVariant(r) {
      if (!r) return null;
      const v = HANDAKU_MAP[r[0]];
      return v ? v + r.slice(1) : null;
  }
  function sokuonSelfVariant(r) {
      // (cuma untuk bacaan 2 kana+; bacaan 1 kana kayak 'き'/'ち' bakal jadi 'っ' doang, itu bukan bacaan valid)
      if (r && r.length > 1 && SOKUON_TRIGGER.has(r[r.length - 1])) return r.slice(0, -1) + 'っ';
      return null;
  }
  // Dari daftar bacaan dasar, hasilkan SEMUA varian bunyi yang mungkin (dasar +
  // rendaku + handaku + sokuon-diri-sendiri). Dipakai tiap kali mau cocokkan
  // kandidat bacaan terhadap data asli.
  function expandVariants(baseList) {
      const out = new Set();
      for (const r of baseList) {
          if (!r) continue;
          out.add(r);
          const rv = rendakuVariant(r); if (rv) out.add(rv);
          const hv = handakuVariant(r); if (hv) out.add(hv);
          const sv = sokuonSelfVariant(r); if (sv) out.add(sv);
      }
      return [...out].sort((a, b) => b.length - a.length);
  }
  
  // --- Sistem baca angka: tiap digit dibaca beda tergantung POSISI (satuan/
  //     puluhan/ratusan/ribuan), bukan sekadar disambung — "24" itu "dua-puluh-
  //     empat", bukan angka '2' lalu '4' dibaca sendiri-sendiri. Satu blok angka
  //     dianggap SATU unit furigana, sesuai konvensi furigana angka pada umumnya. ---
  const DIGIT_ONES = {'0':['ぜろ','れい'],'1':['いち'],'2':['に'],'3':['さん'],'4':['よん','よ','し'],'5':['ご'],'6':['ろく'],'7':['なな','しち'],'8':['はち'],'9':['きゅう','く']};
  
  function placeCandidates(d, place) {
      if (place === 0) {
          if (d === '0') return [''];
          return DIGIT_ONES[d].slice();
      }
      if (d === '0') return [''];
      if (place === 1) {
          if (d === '1') return ['じゅう'];
          return DIGIT_ONES[d].filter(b => b !== 'し' && b !== 'く').map(b => b + 'じゅう');
      }
      if (place === 2) {
          const specials = {'3':['さんびゃく'],'6':['ろっぴゃく'],'8':['はっぴゃく']};
          const base = specials[d] || [];
          if (d === '1') return ['ひゃく'];
          return base.concat(DIGIT_ONES[d].filter(b => b !== 'し' && b !== 'しち' && b !== 'く').map(b => b + 'ひゃく'));
      }
      if (place === 3) {
          const specials = {'3':['さんぜん'],'8':['はっせん']};
          const base = specials[d] || [];
          if (d === '1') return ['せん', 'いっせん'];
          return base.concat(DIGIT_ONES[d].filter(b => b !== 'し' && b !== 'しち' && b !== 'く').map(b => b + 'せん'));
      }
      return DIGIT_ONES[d].slice();
  }
  
  function numberReadingCandidates(digits, maxCandidates = 40) {
      const n = digits.length;
      if (n === 0) return [];
      if (n === 1) return DIGIT_ONES[digits].slice();
      const perPlace = [];
      for (let i = 0; i < n; i++) {
          const place = Math.min(n - 1 - i, 3);
          perPlace.push(placeCandidates(digits[i], place));
      }
      let results = [''];
      for (const cands of perPlace) {
          const next = [];
          outer:
          for (const prefix of results) {
              for (const c of cands) {
                  next.push(prefix + c);
                  if (next.length >= maxCandidates) break outer;
              }
          }
          results = next;
      }
      // じゅう (puluhan) sering menyusut jadi じゅっ/じっ sebelum penyebut yang
      // berawal bunyi tak bersuara (10分->じゅっぷん). Tambahkan sebagai kandidat.
      const extra = [];
      for (const r of results) {
          if (r.endsWith('じゅう')) {
              const stem = r.slice(0, -3);
              extra.push(stem + 'じゅっ', stem + 'じっ');
          }
      }
      const all = results.concat(extra).filter(r => r);
      const seen = new Set();
      const out = [];
      for (const r of all) {
          if (!seen.has(r)) { seen.add(r); out.push(r); }
      }
      out.sort((a, b) => b.length - a.length);
      return out;
  }
  
  // --- Mesin pencocokan: cari pembagian per-karakter yang MEREKONSTRUKSI PERSIS
  //     bacaan asli yang sudah benar (dari data 'back'). Kalau gak ketemu pembagian
  //     yang pasti dan tunggal, return null — pemanggil WAJIB pakai fallback aman
  //     (satu furigana di atas semua kanji), gak boleh nebak. Ini yang menjamin
  //     fitur ini gak akan pernah nampilin bacaan yang salah: total bacaan yang
  //     ditampilkan selalu persis sama dengan data yang sudah diverifikasi. ---
  function isDigit(ch) { return ch >= '0' && ch <= '9'; }
  
  function digitRunLength(text, start) {
      let i = start;
      while (i < text.length && isDigit(text[i])) i++;
      return i - start;
  }
  
  function findSegmentations(text, reading, cache, limit, prevReading) {
      const cacheKey = text + '\u0000' + reading + '\u0000' + (text[0] === '々' ? (prevReading || '') : '');
      if (cache.has(cacheKey)) return cache.get(cacheKey);
      if (text === '' && reading === '') return [[]];
      if (text === '' || reading === '') return [];
  
      const results = [];
  
      function tryConsume(piece, cand, nextPrevReading) {
          if (results.length >= limit) return;
          if (!reading.startsWith(cand, reading.length - reading.length)) { /* noop */ }
          if (reading.indexOf(cand) !== 0) return;
          const rest = findSegmentations(text.slice(piece.length), reading.slice(cand.length), cache, limit - results.length, nextPrevReading);
          for (const r of rest) {
              results.push([[piece, cand], ...r]);
              if (results.length >= limit) return;
          }
      }
  
      // 0) tanda pengulangan 々: selalu mengulang bacaan karakter sebelumnya
      if (text[0] === '々' && prevReading) {
          for (const cand of expandVariants([prevReading])) {
              if (results.length >= limit) break;
              tryConsume('々', cand, cand);
          }
      }
  
      // 1) override kata khusus (jukujikun / nama), dicoba dari yang paling panjang
      const maxLen = Math.min(text.length, 7);
      for (let L = maxLen; L >= 1 && results.length < limit; L--) {
          const piece = text.slice(0, L);
          if (SPECIAL_COMPOUNDS.hasOwnProperty(piece)) {
              for (const cand of expandVariants(SPECIAL_COMPOUNDS[piece])) {
                  if (results.length >= limit) break;
                  tryConsume(piece, cand, cand);
              }
          }
      }
  
      // 2) rangkaian digit (dicoba dari rangkaian penuh dulu, baru makin pendek)
      const dlen = digitRunLength(text, 0);
      if (dlen > 0) {
          for (let L = dlen; L >= 1 && results.length < limit; L--) {
              const piece = text.slice(0, L);
              for (const cand of expandVariants(numberReadingCandidates(piece))) {
                  if (results.length >= limit) break;
                  tryConsume(piece, cand, cand);
              }
          }
      }
  
      // 3) satu kanji dari kamus
      if (dlen === 0 && text[0] !== '々') {
          const ch = text[0];
          const base = KANJI_READINGS[ch];
          if (base) {
              for (const cand of expandVariants(base)) {
                  if (results.length >= limit) break;
                  tryConsume(ch, cand, cand);
              }
          }
      }
  
      cache.set(cacheKey, results);
      return results;
  }
  
  function matchSegment(text, reading) {
      const cache = new Map();
      const segs = findSegmentations(text, reading, cache, 2, null);
      if (segs.length === 0) return { pieces: null, status: 'nomatch' };
      if (segs.length >= 2 && JSON.stringify(segs[0]) !== JSON.stringify(segs[1])) {
          return { pieces: null, status: 'ambiguous' };
      }
      return { pieces: segs[0], status: 'ok' };
  }
  
  // CATATAN PENTING soal posisi furigana per-kanji:
  // Dulu, kanji yang NEMPEL jadi kata majemuk (misal 教科書, 郵便局, 大丈夫) gak
  // dipecah per-huruf sama sekali — satu bacaan lengkap dipasang ngambang rata di
  // tengah di atas SELURUH kelompok kanji itu. Aman (bacaan totalnya tetap benar),
  // tapi kurang presisi: hiragananya gak nempel di kanji yang bersangkutan.
  //
  // Sekarang tiap kelompok kanji nempel itu dicocokkan ke KANJI_READINGS (kamus
  // cara baca per-kanji hasil verifikasi manual terhadap SEMUA kosakata di file
  // ini) lewat matchSegment(). Kalau ketemu SATU cara pecah yang PASTI merekonstruksi
  // persis bacaan aslinya (termasuk lewat SPECIAL_COMPOUNDS buat kata tak-beraturan
  // kayak 今日=きょう, dan aturan sokuon/rendaku/handaku otomatis kayak 学校=がっこう),
  // tiap kanji dapet <ruby> sendiri-sendiri, presisi nempel di kanji itu.
  //
  // Kalau kamus gak punya jawaban pasti, ATAU ternyata ada lebih dari satu cara
  // pecah yang sama-sama valid (ambigu) — sistem TIDAK PERNAH NEBAK. Otomatis balik
  // ke cara lama yang aman: satu <ruby> ngambang di atas seluruh kelompok. Jadi:
  // - Kanji yang berdiri SENDIRI (dijepit kana, misal 知り合い -> 知/り/合/い):
  //   selalu presisi (batasnya pasti dari pencocokan literal).
  // - Kanji yang nempel jadi kelompok: presisi per-kanji KALAU kamus yakin;
  //   fallback aman (ngambang di seluruh kelompok) kalau kamus ragu.
  // Di kedua kasus, TOTAL bacaan yang ditampilkan selalu 100% sama dengan data
  // 'back' yang sudah diverifikasi — fitur ini gak pernah nampilin bacaan yang
  // beda dari data asli, cuma beda cara motong-motongnya di layar.
  function fcRenderFurigana(front, back) {
      if (!front) return front;
      if (!back || back === front) return front;
      if (!KANJI_REGEX.test(front)) return front; // ga ada kanji sama sekali, gausah dikasih furigana
  
      const segments = fcSegmentFront(front);
  
      // Normalisasi kecil buat beberapa data verba yang nulis bacaan dg format
      // "き(る)" buat kata 着る (maksudnya: 着 dibaca き, "る"-nya cuma diulang
      // dalam kurung krn emang udah ada sbg kana di front). Kalau pola ini kedetek
      // PERSIS — isi kurung di akhir 'back' sama persis dgn kana terakhir di
      // 'front' — kurungnya dilepas dulu SEBELUM diproses, biar gak ada "(" nyasar
      // ikut ketampil sbg furigana & gak ada ")" yang somehow hilang gak ke-render.
      // Cuma nembak kalau cocok PERSIS, jadi entri lain (kartu referensi cara baca
      // kanji yang isi 'back'-nya emang sengaja banyak varian dlm kurung) gak kesenggol.
      const lastSeg = segments[segments.length - 1];
      if (lastSeg && !lastSeg.needsReading) {
          const parenSuffix = `(${lastSeg.text})`;
          if (back.endsWith(parenSuffix)) {
              back = back.slice(0, -parenSuffix.length) + lastSeg.text;
          }
      }
  
      let pointer = 0;
      let html = '';
      let failed = false;
  
      for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          if (!seg.needsReading) {
              // bagian literal (hiragana/katakana/simbol) harus persis sama di posisi ini
              const slice = back.slice(pointer, pointer + seg.text.length);
              if (slice !== seg.text) { failed = true; break; }
              html += seg.text;
              pointer += seg.text.length;
          } else {
              // cari batas akhir: posisi mulainya bagian literal berikutnya (kalau ada) di 'back'
              let boundary = back.length;
              const nextLiteral = segments.slice(i + 1).find(s => !s.needsReading);
              if (nextLiteral) {
                  const found = back.indexOf(nextLiteral.text, pointer);
                  if (found === -1) { failed = true; break; }
                  boundary = found;
              }
              const segReading = back.slice(pointer, boundary);
              if (!segReading) { failed = true; break; }
              // Batas segmen ini sendiri udah pasti benar (segReading = bacaan lengkap
              // yang 100% akurat buat seg.text, dari pencocokan literal di atas). Sekarang
              // coba pecah LEBIH LANJUT per-kanji lewat kamus cara baca — kalau pasti &
              // tunggal, tiap kanji dapet <ruby> sendiri; kalau ragu/ambigu, JANGAN NEBAK,
              // pakai fallback aman (satu <ruby> di seluruh kelompok, seperti sebelumnya).
              const matchResult = matchSegment(seg.text, segReading);
              if (matchResult.status === 'ok' && matchResult.pieces && matchResult.pieces.length > 0) {
                  html += matchResult.pieces.map(([pt, pr]) => `<ruby>${pt}<rt>${pr}</rt></ruby>`).join('');
              } else {
                  html += `<ruby>${seg.text}<rt>${segReading}</rt></ruby>`;
              }
              pointer = boundary;
          }
      }
  
      // Kalau ada bagian yang gagal dicocokin (data ga standar), fallback aman:
      // satu furigana gede di atas semua kanji, drpd hasilnya salah potong/rusak.
      if (failed) {
          return `<ruby>${front}<rt>${back}</rt></ruby>`;
      }
  
      return html;
  }

  root.FC.furigana = { render: fcRenderFurigana, hasKanji: function (s) { return KANJI_REGEX.test(s || ''); } };
})(typeof window !== 'undefined' ? window : globalThis);
