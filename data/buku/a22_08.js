/* =====================================================================
   data/buku/a22_08.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 8
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧): ➊ もうV-ました／まだV-ていません ➋ まだV-ます ➌ 【疑問詞】＋S（普通形）か.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 8,
  title: '屋台[やたい]はどこかわかりますか？',
  arti: 'Tahukah kamu di mana kios makanan (yatai) berada?',
  topic: '地域[ちいき]のイベント',
  topicArti: 'Acara di lingkungan sekitar',
  bisa: [
    'Menanyakan apakah suatu acara **sudah** dimulai atau **masih** berlangsung',
    'Menjawab “sudah” dan “belum” dengan benar',
    'Menyisipkan pertanyaan ke dalam kalimat: “tahukah kamu jam berapa mulainya?”',
    'Bertanya kepada petugas acara soal waktu dan tempat dengan sopan'
  ],
  pola: [
    {
      name: 'もうV-ました／まだV-ていません',
      short: 'もう／まだ',
      arti: 'sudah ~ / belum ~',
      inti: 'Pakai **もう** untuk bilang “**sudah** …” dan **まだ…ていません** untuk bilang “**belum** …”.',
      rumus: [['=もう', '+', 'V-ました'], ['=まだ', '+', 'V-ていません']],
      rumusNote: 'Tanya: もう～ましたか？ · Jawab: はい、もう～ました／いいえ、まだ～ていません',
      jelas: [
        '**もう＋V-ました** = “sudah …”. Untuk bertanya: 「もう{食[た]べました}か」 = “sudah makan?”.',
        'Jawaban “**belum**” bukan ～ませんでした, tapi **まだ＋V-ていません**: 「まだ{始[はじ]まっていません}」 = “belum dimulai”.',
        'Kenapa pakai ～ています? Karena “belum terjadi” berarti **keadaan sekarang** masih belum berubah.',
        'Dalam percakapan, ～ていません sering menjadi **～てません**: 「まだ食[た]べ{てません}」.',
        'Jawaban singkat: はい、もう～ました／いいえ、まだです.'
      ],
      contoh: [
        { jp: 'A：もうお昼[ひる]ご飯[はん]を{食[た]べましたか}。\nB：いいえ、まだ{食[た]べていません}。', id: 'A: Sudah makan siang?\nB: Belum, saya belum makan.' },
        { jp: 'バスは、もう{出[で]ました}よ。', id: 'Busnya sudah berangkat lho.' },
        { jp: '花火[はなび]は、まだ{始[はじ]まっていません}。', id: 'Kembang apinya belum dimulai.' },
        { jp: 'A：イベントに、もう{申[もう]し込[こ]みましたか}。\nB：いいえ、まだ{申[もう]し込[こ]んでいません}。', id: 'A: Sudah mendaftar untuk acara itu?\nB: Belum, saya belum mendaftar.' },
        { jp: 'メールは、まだ{読[よ]んでいません}。', id: 'Emailnya belum saya baca.' },
        { jp: 'A：山田[やまだ]さんは、もう{来[き]ましたか}。\nB：いいえ、まだ{来[き]てません}。', id: 'A: Yamada-san sudah datang?\nB: Belum, belum datang.' }
      ],
      awas: [
        '“Belum” = **まだ＋V-ていません**. Jangan pakai ×まだ食[た]べませんでした atau ×まだ食[た]べました.',
        'Jangan jawab “belum” dengan もう: ×いいえ、もう食[た]べていません. Untuk “belum” selalu pakai **まだ**.'
      ],
      kw: 'sudah belum selesai jawaban mulai もう まだ'
    },
    {
      name: 'まだV-ます／まだV-ています',
      short: 'まだ (masih)',
      arti: 'masih ~',
      inti: 'Pakai **まだ** untuk bilang bahwa sesuatu **masih** berlangsung atau **masih** ada.',
      rumus: [['=まだ', '+', 'V-ます'], ['=まだ', '+', 'V-ています']],
      rumusNote: 'Lawannya: もう～ました (sudah selesai)',
      jelas: [
        '**まだ＋V-ています／V-ます** = “masih …”: 「まだ{やっています}か」 = “apakah masih berlangsung / masih buka?”.',
        'Jawabannya berpasangan dengan **もう**: はい、まだやっています (masih) ／ いいえ、もう終[お]わりました (sudah selesai).',
        'Dengan kata kerja keadaan seperti あります・います, cukup **V-ます**: 「まだ時間[じかん]が{あります}」 = “masih ada waktu”.',
        'Dalam percakapan, やっています → **やってます**, 開[あ]いています → **開[あ]いてます**.'
      ],
      contoh: [
        { jp: 'A：バザーは、まだ{やっていますか}。\nB：いいえ、もう{終[お]わりました}。', id: 'A: Apakah bazar masih berlangsung?\nB: Tidak, sudah selesai.' },
        { jp: 'まだ時間[じかん]が{ありますから}、ゆっくり食[た]べてください。', id: 'Masih ada waktu, jadi makanlah pelan-pelan.' },
        { jp: '雨[あめ]は、まだ{降[ふ]っています}。', id: 'Hujannya masih turun.' },
        { jp: 'A：山田[やまだ]さんは、まだ会社[かいしゃ]に{いますか}。\nB：ええ、まだ{います}よ。', id: 'A: Yamada-san masih ada di kantor?\nB: Ya, masih ada.' },
        { jp: 'あの店[みせ]は、まだ{開[あ]いてます}か。', id: 'Toko itu masih buka?' }
      ],
      awas: [
        'もう dan まだ bukan sinonim: もう＋V-ました／V-ています = “sudah”, まだ＋V-ます／V-ています = “masih”. Pilih sesuai maksudmu.',
        'まだ＋V-ています (“masih”) berbeda dari まだ＋V-ていません (“belum”). Perhatikan ada tidaknya ません.'
      ],
      kw: 'masih belum berlangsung buka masih ada まだ'
    },
    {
      name: '【疑問詞[ぎもんし]】＋S（普通形[ふつうけい]）か、～',
      short: 'kata tanya＋か',
      arti: '(tahu / tanya) apa, siapa, kapan, di mana ~',
      inti: 'Sisipkan sebuah **pertanyaan** ke dalam kalimat lain: “tahukah kamu **jam berapa** …?”, “saya tidak tahu **di mana** …”.',
      rumus: [['Kata tanya', '+', 'Kalimat (bentuk biasa)', '+', '=か', '、', 'わかりますか／教[おし]えてください']],
      rumusNote: 'Kata benda dan sifat-な: **tanpa だ** sebelum か',
      tabel: [{
        judul: 'Bentuk sebelum か',
        kepala: ['Jenis', 'Bentuk biasa', 'Sebelum か'],
        baris: [
          ['Kata kerja', '何時[なんじ]に始[はじ]まる', '何時[なんじ]に始[はじ]まるか'],
          ['Kata kerja (lampau)', 'だれが来[き]た', 'だれが来[き]たか'],
          ['Sifat-い', 'どれが安[やす]い', 'どれが安[やす]いか'],
          ['Sifat-な', 'どちらが便利[べんり]だ', 'どちらが便利[べんり]か'],
          ['Kata benda', '会場[かいじょう]はどこだ', '会場[かいじょう]はどこか']
        ]
      }],
      jelas: [
        'Pertanyaan biasa (どこですか) kalau **disisipkan** ke kalimat lain berubah menjadi **bentuk biasa ＋ か**: 「会場[かいじょう]はどこ{か}、わかりますか」 = “tahukah kamu di mana tempat acaranya?”.',
        'Bagian belakang yang sering dipakai: **わかりますか／わかりません**, **知[し]っていますか／知[し]りません**, **教[おし]えてください**, **まだ決[き]まっていません**.',
        'Kata tanya yang bisa dipakai: だれ, 何[なに], いつ, どこ, どれ, 何時[なんじ], 何人[なんにん], どうやって, どうして.',
        'Kata benda dan sifat-な: **buang だ** sebelum か → 会場[かいじょう]はどこ{か}. Kata kerja dan sifat-い tetap bentuk biasa: 始[はじ]まる{か}, 安[やす]い{か}.',
        'Tanda tanya (？) hanya dipakai kalau **kalimat keseluruhan** bertanya: わかりますか？ (bertanya) ／ わかりません。 (menyatakan).'
      ],
      contoh: [
        { jp: 'あしたのバザーは、何時[なんじ]に{終[お]わるか}、わかりますか。', id: 'Tahukah kamu jam berapa bazar besok selesai?' },
        { jp: '受付[うけつけ]は、どこ{か}、教[おし]えてください。', id: 'Tolong beri tahu di mana meja pendaftarannya.' },
        { jp: 'だれが司会[しかい]を{するか}、まだ決[き]まっていません。', id: 'Siapa yang akan jadi pembawa acara belum diputuskan.' },
        { jp: 'このイベントに、何人[なんにん]{来[く]るか}、わかりません。', id: 'Saya tidak tahu berapa orang yang akan datang ke acara ini.' },
        { jp: 'A：このお祭[まつ]りは、いつから{始[はじ]まったか}、知[し]っていますか。\nB：いいえ、知[し]りません。', id: 'A: Tahu sejak kapan festival ini dimulai?\nB: Tidak, saya tidak tahu.' },
        { jp: 'どちらのバスが{便利[べんり]か}、教[おし]えてください。', id: 'Tolong beri tahu bus yang mana yang praktis.' }
      ],
      awas: [
        'Jangan masukkan ですか／ますか ke dalam: ×何時[なんじ]に始[はじ]まりますか、わかりますか → ○何時[なんじ]に始[はじ]まるか、わかりますか.',
        'Kata benda／sifat-な tidak memakai だ: ×どこだか → ○どこか.',
        'Pola ini untuk **kata tanya** (apa, siapa, kapan, di mana). Untuk “apakah … atau tidak” (ya／tidak) dipakai **かどうか** (Bab 16).'
      ],
      kw: 'kata tanya kalimat tanya tidak langsung tahu tidak tahu kapan di mana siapa'
    }
  ]
});
