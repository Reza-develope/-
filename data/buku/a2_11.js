/* =====================================================================
   data/buku/a2_11.js — Buku Bunpou Irodori A2 (初級1) · Bab 11
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧): ➊ V-て行きます／来ます ➋ N1とN2（と）、どっちがいいですか？／S。どれがいいですか？
   ➌ Nのほうがいいです ➍ 【疑問詞】でもいいです.
   ===================================================================== */
FC.defineBuku('a2', {
  n: 11,
  title: '肉[にく]と野菜[やさい]は私[わたし]が買[か]って行[い]きます',
  arti: 'Daging dan sayurnya, saya yang beli dan bawa',
  topic: 'おいしい料理[りょうり]',
  topicArti: 'Masakan yang enak',
  bisa: [
    'Berunding siapa membawa apa untuk acara barbeku atau pesta',
    'Berunding soal belanja untuk pesta dan memilih di antara beberapa pilihan',
    'Menanyakan bahan masakan dan tanggal kedaluwarsa',
    'Membaca label pada kemasan makanan'
  ],
  pola: [
    {
      name: 'V-て行[い]きます ／ V-て来[き]ます',
      short: 'て行[い]く／て来[く]る',
      arti: 'V dulu lalu pergi／datang (membawa)',
      inti: 'Pakai ini untuk bilang **melakukan V dulu**, lalu **pergi** (行[い]く) atau **datang** (来[く]る) dalam keadaan itu: **“beli lalu pergi”, “bawa lalu datang”**.',
      rumus: [['V-て', '+', '=行[い]きます'], ['V-て', '+', '=来[き]ます']],
      rumusNote: '行[い]く = menuju tujuan／menjauh dari tempat bicara · 来[く]る = datang ke tempat bicara／kembali',
      tabel: [{
        judul: 'Kata kerja yang sering dipakai',
        kepala: ['V-て', 'V-て行[い]きます', 'V-て来[き]ます'],
        baris: [
          ['持[も]って', '持[も]って行[い]きます＝membawa (ke sana)', '持[も]って来[き]ます＝membawa (ke sini)'],
          ['買[か]って', '買[か]って行[い]きます＝beli dulu, lalu pergi', '買[か]って来[き]ます＝beli dulu, lalu datang／kembali'],
          ['作[つく]って', '作[つく]って行[い]きます＝buat dulu, lalu pergi', '作[つく]って来[き]ます＝buat dulu, lalu datang']
        ]
      }],
      jelas: [
        '**V-て行[い]きます** = melakukan V **dulu**, lalu **pergi** ke tempat lain dengan hasil／keadaan itu. 「肉[にく]と野菜[やさい]は、私[わたし]が買[か]っ{て行[い]きます}」 = “Daging dan sayurnya, saya yang beli lalu bawa (ke sana)”. Cocok untuk membagi barang bawaan (barbeku, pesta).',
        '**V-て来[き]ます** dilihat dari sudut pandang **tempat tujuan／tempat bicara**: 「国[くに]の料理[りょうり]を作[つく]っ{て来[き]ました}。どうぞ」 = “Saya membuat masakan negaraku dan membawanya ke sini. Silakan.”',
        '**V-て来[き]ます** juga berarti **pergi melakukan V lalu kembali**: 「ちょっと飲[の]み物[もの]を買[か]っ{て来[き]ます}」 = “Saya (pergi) beli minuman sebentar, lalu kembali”.',
        'Kata kerja yang sering dipakai: 持[も]つ (membawa), 買[か]う (membeli), 作[つく]る (membuat), 食[た]べる (食[た]べて行[い]く = makan dulu baru pergi).'
      ],
      contoh: [
        { jp: '明日[あした]のパーティーに、飲[の]み物[もの]を買[か]っ{て行[い]きます}。', id: 'Ke pesta besok, saya akan membeli minuman lalu membawanya.' },
        { jp: '私[わたし]は、デザートを作[つく]っ{て行[い]きます}。', id: 'Saya akan membuat makanan penutup lalu membawanya.' },
        { jp: '国[くに]のお菓子[かし]を持[も]っ{て来[き]ました}。どうぞ。', id: 'Saya membawa kue dari negaraku. Silakan.' },
        { jp: 'A：お肉[にく]は、だれが買[か]いますか。\nB：私[わたし]が買[か]っ{て行[い]きます}。', id: 'A: Siapa yang membeli daging?\nB: Saya yang beli lalu bawa.' },
        { jp: 'ちょっとコンビニで水[みず]を買[か]っ{て来[き]ます}。', id: 'Saya beli air di minimarket sebentar (lalu kembali).' },
        { jp: '朝[あさ]ご飯[はん]を食[た]べ{て行[い]きます}。', id: 'Saya makan sarapan dulu baru berangkat.' }
      ],
      awas: [
        'Pakai bentuk **て**: ×買[か]う行[い]きます／×買[か]いて行[い]きます → ○買[か]って行[い]きます.',
        'Bedakan: **V-て行[い]きます** (V dulu, lalu pergi) dan **V-に行[い]きます** (pergi **untuk** V, bab 8): 買[か]って行[い]く = beli dulu baru berangkat; 買[か]いに行[い]く = berangkat untuk membeli.',
        '「行[い]って来[き]ます」 (pergi lalu kembali) adalah ucapan saat berangkat dari rumah, dan dijawab 「行[い]ってらっしゃい」. Ini V-て＋来[き]ます yang sudah menjadi ungkapan tetap (行[い]く → 行[い]って ＋ 来[き]ます).'
      ],
      kw: 'bawa membawa beli lalu pergi datang kembali て行く て来る barbeku pesta bawaan'
    },
    {
      name: 'N1とN2（と）、どっちがいいですか？ ／ S。どれがいいですか？',
      short: 'どっち／どれ',
      arti: 'N1 atau N2, mana yang kamu pilih?',
      inti: 'Pakai ini untuk **meminta lawan bicara memilih** dari pilihan yang terbatas. Dua pilihan → **どっち**, tiga atau lebih → **どれ**.',
      rumus: [['N1', '=と', 'N2', '=（と）', '、', '=どっち', '=がいいですか？'], ['Daftar pilihan', '。', '=どれ', '=がいいですか？']],
      rumusNote: 'どっち = どちら (lebih santai) · 2 pilihan: どっち／どちら · 3 pilihan atau lebih: どれ',
      tabel: [{
        judul: 'Memilih kata tanya',
        kepala: ['Jumlah pilihan', 'Kata tanya', 'Contoh'],
        baris: [
          ['2 pilihan', 'どっち／どちら', '肉[にく]と魚[さかな]と、どっちがいいですか？'],
          ['3 pilihan atau lebih', 'どれ', 'お茶[ちゃ]がいろいろありますね。どれがいいですか？']
        ]
      }],
      jelas: [
        'Pilihan hanya **dua**: sebut keduanya dengan と, lalu tanyakan **どっち**: 「チョコレートケーキとチーズケーキ{と}、どっち{がいいですか}？」. **と** yang kedua (yang ada setelah N2) boleh dihilangkan.',
        'Pilihan **tiga atau lebih**: sebut dulu pilihannya sebagai kalimat tersendiri, lalu tanyakan **どれ**: 「アイスは三[みっ]つあります。{どれがいいですか}？」.',
        '**どっち** adalah bentuk santai dari **どちら**. Kepada orang yang harus dihormati, pakai どちら.',
        'Jawab dengan **Nがいいです／Nのほうがいいです** (pola 3), atau 「どっちでもいいです」 (pola 4).'
      ],
      contoh: [
        { jp: 'コーヒーと紅茶[こうちゃ]と、{どっちがいいですか}？', id: 'Kopi atau teh, mana yang kamu mau?' },
        { jp: 'カレーとラーメンと、{どちらがいいですか}？', id: 'Kari atau ramen, mana yang bagus?' },
        { jp: '赤[あか]いシャツと青[あお]いシャツと、{どっちがいいですか}？', id: 'Kemeja merah atau kemeja biru, mana yang bagus?' },
        { jp: 'A：ジュースがいろいろありますね。{どれがいいですか}？\nB：オレンジジュースがいいです。', id: 'A: Banyak macam jus ya. Mau yang mana?\nB: Jus jeruk.' },
        { jp: 'A：バーベキューは、土曜日[どようび]と日曜日[にちようび]と、{どっちがいいですか}？\nB：日曜日[にちようび]がいいです。', id: 'A: Untuk barbeku, Sabtu atau Minggu, mana yang bagus?\nB: Minggu saja.' },
        { jp: 'ケーキ屋[や]さんに、いちごとチョコとチーズがあります。{どれがいいですか}？', id: 'Di toko kue ada stroberi, cokelat, dan keju. Mau yang mana?' }
      ],
      awas: [
        'Dua pilihan → **どっち**, tiga atau lebih → **どれ**. Jangan terbalik: ×三[みっ]つの中[なか]で、どっちがいいですか → ○どれがいいですか.',
        'Pilihannya harus **disebut dulu**: pakai 「N1とN2と」 atau kalimat daftar. Tanpa daftar, lawan bicara tidak tahu apa saja pilihannya.'
      ],
      kw: 'memilih pilihan mana yang どっち どれ どちら dua pilihan tiga pilihan menawarkan'
    },
    {
      name: 'Nのほうがいいです',
      short: 'のほうがいい',
      arti: 'yang N lebih baik／saya pilih N',
      inti: 'Pakai ini untuk **memilih satu dari dua**: **“Yang N saja (lebih baik)”**.',
      rumus: [['N', '=のほうが', '=いいです']],
      rumusNote: 'N = pilihanmu · のほう boleh dihilangkan: Nがいいです',
      jelas: [
        '**Nのほうがいいです** = “yang N lebih baik／saya pilih N”. **ほう** = “pihak／sisi”; kamu menunjuk salah satu **sisi** dari dua pilihan.',
        'Menjawab 「N1とN2と、どっちがいいですか？」: 「お茶[ちゃ]{のほうがいいです}」. Versi singkatnya: 「お茶[ちゃ]{がいいです}」 (のほう dihilangkan).',
        'Selain untuk menjawab, juga dipakai untuk **menyarankan**: 「電車[でんしゃ]{のほうがいいです}よ」 (naik kereta lebih baik lho).',
        '**の** wajib ada setelah kata benda: 肉[にく]{のほうが}, bukan 肉[にく]ほうが.'
      ],
      contoh: [
        { jp: 'コーヒー{のほうがいいです}。', id: 'Saya pilih kopi.' },
        { jp: 'A：魚[さかな]と肉[にく]と、どっちがいいですか？\nB：魚[さかな]{のほうがいいです}。', id: 'A: Ikan atau daging, mana yang kamu mau?\nB: Saya pilih ikan.' },
        { jp: 'A：どっちがいいですか？\nB：こっち{がいいです}。', id: 'A: Yang mana yang bagus?\nB: Yang ini saja.' },
        { jp: 'ここは混[こ]んでいます。あのお店[みせ]{のほうがいいですよ}。', id: 'Di sini ramai. Toko yang itu lebih baik lho.' },
        { jp: '大[おお]きいお皿[さら]{のほうがいいです}。', id: 'Saya pilih piring yang besar.' },
        { jp: '私[わたし]は、甘[あま]いお菓子[かし]{のほうがいいです}。', id: 'Saya lebih suka kue yang manis.' }
      ],
      awas: [
        'Jangan lupa **の**: ×肉[にく]ほうがいいです → ○肉[にく]のほうがいいです.',
        'Pola ini untuk memilih **satu dari dua**. Memilih satu dari banyak cukup dengan 「Nがいいです」 (どれがいいですか？ → これがいいです).'
      ],
      kw: 'memilih lebih baik pilih のほうがいい dua pilihan menyarankan'
    },
    {
      name: '【疑問詞[ぎもんし]】でもいいです',
      short: '疑問詞[ぎもんし]でも',
      arti: 'apa pun／kapan pun／mana pun boleh',
      inti: 'Pakai ini untuk bilang **tidak ada pilihan khusus**: **“apa saja boleh”, “terserah”**.',
      rumus: [['疑問詞[ぎもんし]', '+', '=でも', '+', '=いいです']],
      rumusNote: '疑問詞[ぎもんし] = kata tanya (なに／どれ／どっち／いつ／どこ／だれ／いくつ)',
      tabel: [{
        judul: 'Kata tanya ＋ でも',
        kepala: ['Kata tanya', '＋ でも', 'Artinya'],
        baris: [
          ['何[なに]', '何[なん]でも', 'apa pun'],
          ['どれ', 'どれでも', 'yang mana pun'],
          ['どっち', 'どっちでも', 'yang mana pun (dari dua)'],
          ['いつ', 'いつでも', 'kapan pun'],
          ['だれ', 'だれでも', 'siapa pun'],
          ['どこ', 'どこでも', 'di mana pun'],
          ['いくつ', 'いくつでも', 'berapa pun']
        ]
      }],
      jelas: [
        '**疑問詞[ぎもんし] (kata tanya) ＋ でも** = “… pun”: 何[なん]でも (apa pun), いつでも (kapan pun), どこでも (di mana pun), だれでも (siapa pun), どっちでも／どれでも (mana pun), いくつでも (berapa pun).',
        'Dengan **いいです**, artinya kamu **tidak punya preferensi**: 「{何[なん]でもいいです}」 = “apa saja boleh”, “terserah”.',
        'Dipakai untuk menjawab pertanyaan pilihan: 「いつ会[あ]いましょうか？」 → 「いつでもいいです」. 「どっちがいいですか？」 → 「どっちでもいいです」.',
        'Kalau diucapkan sendirian bisa terdengar sedikit **cuek**. Biasanya diberi nada ramah (…いいですよ) atau diikuti alasan.'
      ],
      contoh: [
        { jp: 'A：昼[ひる]ご飯[はん]は、どこで食[た]べますか？\nB：{どこでもいいです}よ。', id: 'A: Makan siang di mana?\nB: Di mana saja boleh.' },
        { jp: 'A：パーティーは、いつがいいですか？\nB：{いつでもいいです}。', id: 'A: Pestanya kapan enaknya?\nB: Kapan saja boleh.' },
        { jp: 'A：コーヒーと紅茶[こうちゃ]と、どっちがいいですか？\nB：{どっちでもいいです}。', id: 'A: Kopi atau teh, mana yang kamu mau?\nB: Mana saja boleh.' },
        { jp: 'A：おにぎりは、いくつ買[か]いますか？\nB：{いくつでもいいです}よ。', id: 'A: Onigirinya beli berapa?\nB: Berapa pun boleh.' },
        { jp: '手伝[てつだ]いは、{だれでもいいです}。', id: 'Untuk membantu, siapa saja boleh.' },
        { jp: 'プレゼントは、{何[なん]でもいいです}。', id: 'Hadiahnya, apa saja boleh.' }
      ],
      awas: [
        'Bedakan: **Nでもいいですか？** (bab 7: “kalau N, bolehkah?”, mengajukan alternatif) dan **疑問詞[ぎもんし]でもいいです** (“apa pun boleh”).',
        'Kata 何[なに] dalam 何[なん]でも dibaca **なん** (bukan なに): 何[なん]でもいいです.',
        'Kepada guru atau atasan, ganti どっち dengan **どちら**: 「どちらでもいいですよ」 lebih sopan daripada 「どっちでもいいです」.'
      ],
      kw: 'apa saja terserah apa pun kapan pun di mana pun siapa pun でもいい 疑問詞 tidak ada preferensi'
    }
  ]
});
