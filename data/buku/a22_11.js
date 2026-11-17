/* =====================================================================
   data/buku/a22_11.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 11
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧): ➊ V-てみてもいいですか ➋ ナA-／イA-すぎます ➌ ナA-な／イA-い の
   ➍ Nを V-（ら）れます＜受身③＞ ➎ S（普通形）かもしれません ➏ V-てしまいました.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 11,
  title: 'ポイントカードを忘[わす]れてしまいました',
  arti: 'Aduh, kartu poin saya ketinggalan',
  topic: '上手[じょうず]な買[か]い物[もの]',
  topicArti: 'Belanja dengan cerdas',
  bisa: [
    'Meminta izin mencoba barang di toko: “boleh saya coba …?”',
    'Menyampaikan keluhan atau penilaian: “terlalu mahal”, “terlalu mencolok”',
    'Meminta barang lain yang lebih sesuai: “ada yang lebih …?”',
    'Menceritakan kejadian yang merugikan, misalnya barang dicuri',
    'Menyampaikan dugaan (“mungkin …”) dan penyesalan (“aduh, terlanjur …”) saat kehilangan barang'
  ],
  pola: [
    {
      name: 'V-てみてもいいですか？',
      short: 'てみてもいい',
      arti: 'boleh saya coba ~?',
      inti: 'Pakai ini untuk **meminta izin mencoba** sesuatu: baju, makanan, atau barang di toko.',
      rumus: [['V-て', '+', '=みてもいいですか']],
      rumusNote: 'V-てみる = mencoba ~ · V-てもいいですか = bolehkah ~?',
      tabel: [{
        judul: 'Tiga bagian pola',
        kepala: ['Bagian', 'Artinya'],
        baris: [
          ['V-てみる', 'mencoba melakukan ~ (untuk melihat hasilnya)'],
          ['V-てもいいですか', 'bolehkah ~?'],
          ['V-てみてもいいですか', 'bolehkah saya mencoba ~?']
        ]
      }],
      jelas: [
        '**V-てみる** = “mencoba (melakukan) ~”. Dipakai untuk hal yang ingin **dicoba dulu**: 着[き]てみる (mencoba baju), 食[た]べてみる (mencicipi), 使[つか]ってみる (mencoba pakai).',
        'Ditambah **てもいいですか**, jadi “bolehkah saya mencoba ~?” — kalimat yang sangat berguna di toko.',
        'Cara menjawab: はい、どうぞ (silakan) ／ すみません、ちょっと… (maaf, kurang bisa).',
        'V-てみます juga bisa dipakai sendiri tanpa meminta izin: 「あした、食[た]べ{てみます}」 = “besok saya coba makan”.'
      ],
      contoh: [
        { jp: 'この靴[くつ]、履[は]い{てみてもいいですか}。', id: 'Boleh saya coba sepatu ini?' },
        { jp: 'この帽子[ぼうし]、かぶっ{てみてもいいですか}。', id: 'Boleh saya coba memakai topi ini?' },
        { jp: 'ちょっと、食[た]べ{てみてもいいですか}。', id: 'Boleh saya mencicipinya sedikit?' },
        { jp: 'このカメラ、使[つか]っ{てみてもいいですか}。', id: 'Boleh saya coba memakai kamera ini?' },
        { jp: 'A：すみません、このコート、着[き]{てみてもいいですか}。\nB：はい、どうぞ。あちらで着[き]てください。', id: 'A: Permisi, boleh saya coba mantel ini?\nB: Silakan. Tolong coba di sebelah sana.' }
      ],
      awas: [
        'Jangan lupa **て**: ×着[き]みてもいいですか → ○着[き]てみてもいいですか.',
        'Untuk **meminta izin biasa** (tanpa “mencoba”) cukup V-てもいいですか. Tambahkan **みて** hanya kalau memang ingin mencoba dulu.'
      ],
      kw: 'coba mencoba mencicipi boleh izin てみる toko'
    },
    {
      name: 'ナA-／イA-すぎます',
      short: 'すぎます',
      arti: 'terlalu ~',
      inti: 'Pakai ini untuk bilang **“terlalu …”** (melewati batas yang pas), biasanya bernuansa **kurang menyenangkan**.',
      rumus: [['イA (buang い)', '+', '=すぎます'], ['ナA', '+', '=すぎます']],
      rumusNote: 'Sifat-い: buang い · sifat-な: langsung (tanpa な)',
      tabel: [{
        judul: 'Cara membentuk',
        kepala: ['Jenis', 'Biasa', '～すぎます'],
        baris: [
          ['Sifat-い', '高[たか]い', '高[たか]すぎます'],
          ['Sifat-い', '大[おお]きい', '大[おお]きすぎます'],
          ['Sifat-い', '小[ちい]さい', '小[ちい]さすぎます'],
          ['Sifat-な', '派手[はで]', '派手[はで]すぎます'],
          ['Sifat-な', '地味[じみ]', '地味[じみ]すぎます']
        ]
      }],
      jelas: [
        '**～すぎます** = “terlalu …”: sesuatu **melebihi batas** yang pas. 「ちょっと大[おお]き{すぎます}」 = “agak terlalu besar”.',
        'Cara membentuk: **sifat-い** buang い + すぎます (高[たか]い → 高[たか]{すぎます}); **sifat-な** langsung + すぎます (派手[はで] → 派手[はで]{すぎます}).',
        'Sering dipakai di toko untuk **menolak dengan halus**: 「ちょっと高[たか]{すぎます}」 (agak terlalu mahal), lalu meminta barang lain.',
        'Nuansanya biasanya **negatif** (kelebihan yang tidak diinginkan). Untuk memuji, pakai とても／すごく.'
      ],
      contoh: [
        { jp: 'このシャツは、私[わたし]には大[おお]き{すぎます}。', id: 'Kemeja ini terlalu besar untuk saya.' },
        { jp: 'この店[みせ]の料理[りょうり]は、辛[から]{すぎます}。', id: 'Masakan toko ini terlalu pedas.' },
        { jp: 'この赤[あか]いネクタイは、派手[はで]{すぎます}よ。', id: 'Dasi merah ini terlalu mencolok lho.' },
        { jp: 'この部屋[へや]は、狭[せま]{すぎます}。', id: 'Kamar ini terlalu sempit.' },
        { jp: 'A：このかばん、どうですか。\nB：すてきですが、私[わたし]には地味[じみ]{すぎます}。', id: 'A: Tas ini bagaimana?\nB: Bagus, tapi buat saya terlalu polos.' },
        { jp: 'この問題[もんだい]は、難[むずか]し{すぎます}。', id: 'Soal ini terlalu sulit.' }
      ],
      awas: [
        'Sifat-い: **buang い**: ×高[たか]いすぎます → ○高[たか]すぎます. Sifat-な: jangan tambah な／だ: ×派手[はで]なすぎます → ○派手[はで]すぎます.',
        'Tambahkan **ちょっと** di depan supaya keluhan terdengar lebih halus: 「ちょっと高[たか]すぎます」 lebih sopan daripada 「高[たか]すぎます」.'
      ],
      kw: 'terlalu berlebihan sudah melewati batas mahal besar kecil すぎ'
    },
    {
      name: 'ナA-な／イA-い の',
      short: '～いの／～なの',
      arti: 'yang ~ (pengganti nama benda)',
      inti: 'Pakai **の** setelah kata sifat untuk bilang **“yang …”** tanpa mengulang nama bendanya.',
      rumus: [['イA-い', '+', '=の'], ['ナA-な', '+', '=の']],
      rumusNote: 'の menggantikan benda yang sudah jelas dari konteks (misalnya di toko)',
      tabel: [{
        judul: 'Contoh kata sifat + の',
        kepala: ['Kata sifat', '＋ の', 'Artinya'],
        baris: [
          ['大[おお]きい', '大[おお]きいの', 'yang besar'],
          ['小[ちい]さい', '小[ちい]さいの', 'yang kecil'],
          ['安[やす]い', '安[やす]いの', 'yang murah'],
          ['派手[はで]な', '派手[はで]なの', 'yang mencolok'],
          ['シンプルな', 'シンプルなの', 'yang sederhana']
        ]
      }],
      jelas: [
        '**Kata sifat + の** = “yang …”. Dipakai kalau **bendanya sudah jelas** dari percakapan (misalnya di toko), jadi tidak perlu disebut lagi.',
        '「もっと安[やす]い{の}、ありますか」 = “ada yang lebih murah?”. の di sini menggantikan “sweter／tas／…” yang sedang dibicarakan.',
        'Sifat-い: langsung + の (大[おお]きい{の}). Sifat-な: + **な** + の (派手[はで]{なの}).',
        'Sering dipakai dengan **もっと／もう少[すこ]し** (lebih／sedikit lebih) untuk meminta barang lain: 「もう少[すこ]し小[ちい]さい{の}」.'
      ],
      contoh: [
        { jp: 'もう少[すこ]し小[ちい]さい{の}は、ありますか。', id: 'Ada yang sedikit lebih kecil?' },
        { jp: 'もっと安[やす]い{の}を見[み]せてください。', id: 'Tolong tunjukkan yang lebih murah.' },
        { jp: 'もう少[すこ]しシンプル{なの}がいいです。', id: 'Saya mau yang sedikit lebih sederhana.' },
        { jp: '青[あお]い{の}は、ありますか。', id: 'Ada yang biru?' },
        { jp: 'A：この黒[くろ]い靴[くつ]は、大[おお]きい{の}もありますか。\nB：はい、大[おお]きい{の}はこちらです。', id: 'A: Sepatu hitam ini ada yang lebih besar?\nB: Ada, yang besar ada di sini.' },
        { jp: 'パンは、柔[やわ]らかい{の}が好[す]きです。', id: 'Soal roti, saya suka yang empuk.' }
      ],
      awas: [
        'Jangan lupa **な** untuk sifat-な: ×派手[はで]の → ○派手[はで]なの.',
        'の menggantikan benda. Jangan menyebut bendanya lagi: ×大[おお]きいのセーター → ○大[おお]きいの／大[おお]きいセーター.',
        'Kalau bendanya belum jelas bagi lawan bicara, sebutkan bendanya dulu.'
      ],
      kw: 'yang pengganti benda の kata sifat toko minta barang lain'
    },
    {
      name: 'NをV-（ら）れます ＜受身[うけみ]③＞',
      short: 'pasif ③',
      arti: 'milikku di-V orang lain (dirugikan)',
      inti: 'Pasif untuk bilang bahwa **barang atau bagian tubuhmu** terkena tindakan orang lain sehingga kamu **dirugikan**: “sepedaku **dicuri**”.',
      rumus: [['(私[わたし]は)', '+', 'N', '+', '=を', '+', 'V-（ら）れます']],
      rumusNote: 'Barang tetap ditandai を · pelaku (kalau disebut) ditandai に',
      tabel: [{
        judul: 'Kata kerja yang sering dipakai',
        kepala: ['Kamus', 'Pasif', 'Artinya'],
        baris: [
          ['盗[ぬす]む', '盗[ぬす]まれる', 'dicuri'],
          ['踏[ふ]む', '踏[ふ]まれる', 'diinjak'],
          ['取[と]る', '取[と]られる', 'diambil'],
          ['壊[こわ]す', '壊[こわ]される', 'dirusak'],
          ['見[み]る', '見[み]られる', 'dilihat']
        ]
      }],
      jelas: [
        '**Pasif ③** = pasif “penderitaan”: sesuatu **milikmu** dikenai tindakan orang lain, dan kamu **dirugikan** atau kesal.',
        'Susunannya: 「(私[わたし]は)**自転車[じてんしゃ]を**盗[ぬす]{まれました}」. Perhatikan: **barangnya tetap ditandai を** walaupun kalimatnya pasif. Subjek “saya” sering dihilangkan.',
        'Bandingkan dengan Bab 10 (pasif ②): di sana **orangnya** yang dikenai (“aku ditegur oleh X”). Di sini yang dikenai adalah **barang atau bagian tubuh milikku**.',
        'Pelaku, kalau disebut, ditandai に: 「知[し]らない人[ひと]に、足[あし]を踏[ふ]{まれました}」.',
        'Dalam bahasa Indonesia biasanya menjadi “di-” atau “kena …”: “dompetku dicuri”.'
      ],
      contoh: [
        { jp: '電車[でんしゃ]の中[なか]で、財布[さいふ]を盗[ぬす]{まれました}。', id: 'Dompet saya dicuri di dalam kereta.' },
        { jp: '満員[まんいん]電車[でんしゃ]で、足[あし]を踏[ふ]{まれました}。', id: 'Di kereta yang penuh sesak, kaki saya terinjak.' },
        { jp: 'だれかに、かばんを取[と]{られました}。', id: 'Tas saya diambil seseorang.' },
        { jp: '子[こ]どもに、大事[だいじ]なお皿[さら]を壊[こわ]{されました}。', id: 'Piring penting saya dipecahkan anak kecil.' },
        { jp: 'A：どうしたんですか。\nB：バスの中[なか]で、傘[かさ]をと{られました}。', id: 'A: Ada apa?\nB: Payung saya diambil orang di dalam bus.' },
        { jp: '写真[しゃしん]を勝手[かって]に見[み]{られました}。', id: 'Foto saya dilihat seenaknya.' }
      ],
      awas: [
        'Dengan **を**, kalimat menekankan bahwa **kamu yang dirugikan**. Dengan **が** (自転車[じてんしゃ]が盗[ぬす]まれました) kalimat hanya menyatakan kejadiannya (pasif benda; ada di Bab 13).',
        'Pelaku ditandai に, bukan が: ×知[し]らない人[ひと]が足[あし]を踏[ふ]まれました → ○知[し]らない人[ひと]に足[あし]を踏[ふ]まれました.',
        'Pola ini untuk hal yang **merugikan**. Untuk menerima kebaikan orang, pakai V-てもらいます (Bab 18).'
      ],
      kw: 'dicuri diinjak diambil dirusak dirugikan pasif penderitaan barang milik'
    },
    {
      name: 'S（普通形[ふつうけい]）かもしれません',
      short: 'かもしれません',
      arti: 'mungkin ~',
      inti: 'Pakai ini untuk bilang **kemungkinan**: “mungkin …”, “bisa jadi …” (belum yakin).',
      rumus: [['Kalimat (bentuk biasa)', '+', '=かもしれません']],
      rumusNote: 'N／ナA: **tanpa だ** · lampau: V-た＋かもしれません',
      tabel: [{
        judul: 'Bentuk sebelum かもしれません',
        kepala: ['Jenis', 'Biasa', '～かもしれません'],
        baris: [
          ['Kata kerja', '降[ふ]る', '降[ふ]るかもしれません'],
          ['Kata kerja (lampau)', '忘[わす]れた', '忘[わす]れたかもしれません'],
          ['Sifat-い', '高[たか]い', '高[たか]いかもしれません'],
          ['Sifat-な', '便利[べんり]だ', '便利[べんり]かもしれません'],
          ['Kata benda', '休[やす]みだ', '休[やす]みかもしれません']
        ]
      }],
      jelas: [
        '**～かもしれません** = “mungkin ~”, tingkat keyakinan **rendah** (sekitar separuh atau kurang). 「あした、雨[あめ]が降[ふ]る{かもしれません}」 = “besok mungkin hujan”.',
        'Di depannya pakai **bentuk biasa**. Kata benda dan sifat-な: **buang だ**: 休[やす]み{かもしれません}.',
        'Bisa untuk **masa lalu** (kamu menduga sesuatu sudah terjadi): 「どこかに落[お]とした{かもしれません}」 = “mungkin saya menjatuhkannya di suatu tempat”.',
        'Sering dipasangkan dengan **もしかしたら** (“barangkali”) di awal kalimat.',
        'Versi akrab: ～かもしれない／～かも.'
      ],
      contoh: [
        { jp: 'あしたは、雨[あめ]{かもしれません}。', id: 'Besok mungkin hujan.' },
        { jp: 'この道[みち]は、混[こ]んでいる{かもしれません}。', id: 'Jalan ini mungkin macet.' },
        { jp: 'もしかしたら、電車[でんしゃ]の中[なか]に傘[かさ]を忘[わす]れた{かもしれません}。', id: 'Barangkali payung saya tertinggal di dalam kereta.' },
        { jp: '山田[やまだ]さんは、今日[きょう]は来[こ]ない{かもしれません}。', id: 'Yamada-san mungkin tidak datang hari ini.' },
        { jp: 'A：このお店[みせ]、まだ開[あ]いていますか。\nB：もう閉[し]まった{かもしれません}よ。', id: 'A: Toko ini masih buka?\nB: Mungkin sudah tutup lho.' }
      ],
      awas: [
        'Jangan taruh だ／です: ×雨[あめ]だかもしれません／×雨[あめ]ですかもしれません → ○雨[あめ]かもしれません.',
        'Jangan pakai bentuk ます: ×降[ふ]りますかもしれません → ○降[ふ]るかもしれません.',
        'かもしれません berarti **belum yakin**. Kalau kamu yakin, pakai kalimat biasa saja.'
      ],
      kw: 'mungkin barangkali bisa jadi kemungkinan かも belum yakin'
    },
    {
      name: 'V-てしまいました',
      short: 'てしまいました',
      arti: 'terlanjur ~ / sudah ~ (menyesal, tuntas)',
      inti: 'Pakai ini untuk bilang **“aduh, (sudah) terlanjur …”**: tindakan yang **tidak disengaja** atau **disesali**, atau sesuatu yang **sudah selesai tuntas**.',
      rumus: [['V-て', '+', '=しまいました']],
      rumusNote: 'Akrab: V-て＋しまった → V-ちゃった · V-で＋しまった → V-じゃった',
      tabel: [{
        judul: 'Bentuk baku dan akrab',
        kepala: ['Baku', 'Akrab'],
        baris: [
          ['忘[わす]れてしまいました', '忘[わす]れちゃいました／忘[わす]れちゃった'],
          ['なくしてしまいました', 'なくしちゃいました／なくしちゃった'],
          ['飲[の]んでしまいました', '飲[の]んじゃいました／飲[の]んじゃった'],
          ['食[た]べてしまいました', '食[た]べちゃいました／食[た]べちゃった']
        ]
      }],
      jelas: [
        '**V-てしまいました** punya **dua arti**: (1) **menyesal／tidak sengaja**: 「財布[さいふ]を落[お]として{しまいました}」 (aduh, dompetku jatuh); (2) **selesai tuntas**: 「宿題[しゅくだい]を全部[ぜんぶ]して{しまいました}」 (sudah kuselesaikan semua).',
        'Arti pertama lebih sering. Untuk kejadian buruk atau kesalahan, dipakai untuk **menyampaikan penyesalan atau permintaan maaf**: 「すみません、忘[わす]れて{しまいました}」.',
        'Dalam obrolan, menjadi **ちゃう／ちゃった** (て → ちゃ, で → じゃ): 食[た]べ{ちゃった}, 飲[の]ん{じゃった}.',
        'Cocok dipakai ketika kehilangan atau melupakan sesuatu dan ingin memberi tahu orang lain dengan nada menyesal.'
      ],
      contoh: [
        { jp: '電車[でんしゃ]の中[なか]で、スマホを落[お]として{しまいました}。', id: 'Aduh, ponsel saya terjatuh di dalam kereta.' },
        { jp: 'すみません、約束[やくそく]の時間[じかん]を忘[わす]れて{しまいました}。', id: 'Maaf, saya lupa waktu janji kita.' },
        { jp: 'ケーキを一人[ひとり]で全部[ぜんぶ]食[た]べて{しまいました}。', id: 'Saya makan semua kue itu sendirian (aduh).' },
        { jp: '大切[たいせつ]なカップを割[わ]って{しまいました}。', id: 'Aduh, saya memecahkan cangkir yang berharga.' },
        { jp: 'A：宿題[しゅくだい]は、もう終[お]わりましたか。\nB：はい、昨日[きのう]の夜[よる]に全部[ぜんぶ]して{しまいました}。', id: 'A: PR-nya sudah selesai?\nB: Ya, tadi malam sudah saya selesaikan semuanya.' },
        { jp: '傘[かさ]をなくし{ちゃった}。', id: 'Payungku hilang (aduh).' }
      ],
      awas: [
        'Arti utamanya **penyesalan**. Untuk kejadian biasa yang netral, cukup ました biasa: 「ご飯[はん]を食[た]べました」 = “saya makan”; 「ご飯[はん]を食[た]べてしまいました」 = “(terlanjur) sudah kuhabiskan”.',
        'Bentuk akrab: て → ちゃ, **で → じゃ**: ×飲[の]んちゃった → ○飲[の]んじゃった.'
      ],
      kw: 'terlanjur menyesal tidak sengaja lupa hilang selesai tuntas てしまう ちゃった'
    }
  ]
});
