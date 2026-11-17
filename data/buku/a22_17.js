/* =====================================================================
   data/buku/a22_17.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 17
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧, Japan Foundation): ❶ (bab ini hanya punya satu pola).
   ===================================================================== */
FC.defineBuku('a22', {
  n: 17,
  title: '日本語[にほんご]が前[まえ]より話[はな]せるようになりました',
  arti: 'Saya jadi lebih bisa berbicara bahasa Jepang dibanding dulu',
  topic: '私[わたし]の人生[じんせい]',
  topicArti: 'Hidupku',
  bisa: [
    'Menceritakan perubahan dirimu setelah tinggal di Jepang: “sekarang sudah bisa ~”',
    'Membandingkan dirimu yang dulu dan yang sekarang',
    'Menceritakan kemajuan belajar bahasa Jepang kepada rekan kerja atau gurumu',
    'Menulis pesan singkat berisi kabar terbaru'
  ],
  pola: [
    {
      name: 'V-（られ）るようになりました',
      short: 'ようになる',
      arti: 'jadi bisa ~ (dulu belum, sekarang sudah)',
      inti: 'Pakai ini untuk bilang bahwa kamu **sekarang sudah bisa** melakukan sesuatu yang **dulu belum bisa**. Menunjukkan **kemajuan**.',
      rumus: [['V-（られ）る', '+', '=ようになりました']],
      rumusNote: 'V-（られ）る = bentuk bisa (bentuk kamus) · Kebalikannya: V-（られ）なくなりました (Bab 16)',
      tabel: [{
        judul: 'Ingat lagi: bentuk bisa (bentuk kamus)',
        kepala: ['Kelompok', 'Kamus', 'Bentuk bisa'],
        baris: [
          ['Kel. 1', '話[はな]す', '話[はな]せる'],
          ['Kel. 1', '泳[およ]ぐ', '泳[およ]げる'],
          ['Kel. 2', '食[た]べる', '食[た]べられる'],
          ['Kel. 2', '見[み]る', '見[み]られる'],
          ['Kel. 3', 'する', 'できる'],
          ['Kel. 3', '来[く]る', '来[こ]られる']
        ]
      }],
      jelas: [
        '**V-（られ）る＋ようになりました** = “**jadi bisa** ~”. Dulu belum bisa, sekarang sudah bisa: 「日本語[にほんご]が話[はな]せる{ようになりました}」.',
        'Pakai **bentuk bisa** dalam bentuk kamus (lihat tabel), lalu tambah **ようになりました**. Hal yang “bisa dilakukan” biasanya ditandai **が**.',
        'Sering ditemani kata waktu atau pembanding: **前[まえ]より** (dibanding dulu), **最近[さいきん]** (akhir-akhir ini), **だんだん** (lama-lama), **やっと** (akhirnya).',
        'Bonus: dengan **V-る biasa**, artinya “jadi (sering) melakukan”, yaitu kebiasaan baru: 「毎日[まいにち]、新聞[しんぶん]を読[よ]む{ようになりました}」.'
      ],
      contoh: [
        { jp: 'ひらがなが、全部[ぜんぶ]読[よ]める{ようになりました}。', id: 'Saya sudah jadi bisa membaca semua hiragana.' },
        { jp: '一人[ひとり]で、電車[でんしゃ]に乗[の]れる{ようになりました}。', id: 'Saya sudah jadi bisa naik kereta sendirian.' },
        { jp: 'やっと、納豆[なっとう]が食[た]べられる{ようになりました}。', id: 'Akhirnya saya jadi bisa makan natto.' },
        { jp: '日本語[にほんご]で、メールが書[か]ける{ようになりました}。', id: 'Saya sudah jadi bisa menulis email dalam bahasa Jepang.' },
        { jp: 'A：日本[にほん]の生活[せいかつ]には、慣[な]れましたか。\nB：はい。最近[さいきん]、一人[ひとり]で病院[びょういん]にも行[い]ける{ようになりました}。', id: 'A: Sudah terbiasa dengan kehidupan di Jepang?\nB: Ya. Akhir-akhir ini saya sudah bisa pergi ke rumah sakit sendirian juga.' },
        { jp: 'ここに来[き]てから、毎朝[まいあさ]、ニュースを見[み]る{ようになりました}。', id: 'Sejak datang ke sini, saya jadi menonton berita setiap pagi.' }
      ],
      awas: [
        'Lihat akhirnya: **ようになりました** = “sudah jadi” (perubahan yang sudah terjadi). **ようになります** = “nanti akan jadi”. **ようにしてください** (Bab 16) = “tolong usahakan”. Sama-sama ada ように, tapi artinya beda.',
        'Hanya untuk **perubahan**. Kalau dari dulu memang sudah bisa, cukup 話[はな]せます, jangan pakai ようになりました.'
      ],
      kw: 'jadi bisa sudah bisa akhirnya perubahan kemajuan dulu sekarang kebiasaan baru'
    }
  ]
});
