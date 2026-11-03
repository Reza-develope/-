/* =====================================================================
   data/locks.js — GEMBOK DECK & KUIS. Ini SOFT LOCK di sisi klien: password dan isi deck
   tetap bisa dibaca lewat View Source. Cukup untuk membatasi iseng, bukan untuk rahasia.

   Menambah gembok:
     deck: { id_deck: { tier: "pro" | "exclusive" | "admin", pw: "passwordnya" } }   (id_deck = kolom `id` di manifest.js)
     quiz: { id_kuis: { tier: "pro" | "exclusive",           pw: "passwordnya" } }   (id_kuis = kolom `id` di bagian `quiz`)
   Membuka gembok: hapus barisnya.
   tier = jenis lencana & teks yang tampil saat password diminta (pro 🔒, exclusive 👑💎, admin 💀).
   text = teks di jendela password; text.wrong = pesan kalau password salah.
   ===================================================================== */
window.FC = window.FC || {};
FC.locks = {
  deck: {
	padir: { tier: "pro", pw: "1" },
    pribadi_jimmy: { tier: "pro", pw: "5" },
    pribadi_admin: { tier: "admin", pw: "wokwok" }
  },
  quiz: {
    IrodoriA2_bunpou_15: { tier: "pro", pw: "xauusd2024" },
    IrodoriA2_bunpou_14: { tier: "pro", pw: "xauusd2024" },
    IrodoriA2_bunpou_13: { tier: "pro", pw: "xauusd2024" },
    kanji_n5_p2: { tier: "pro", pw: "xauusd2024" }
  },
  text: {
    admin: "no no ya",
    exclusive: "Deck ini EXCLUSIVE 💎, minta password ke admin",
    pro: "minta ke admin, atau ke yang punya deck",
    quizExclusive: "sumimasennn, mahal mina",
    quizPro: "すみません,  高いですから🙏🏻",
    wrong: ""
  }
};
