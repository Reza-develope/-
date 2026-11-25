/* =====================================================================
   data/buku/a2_05.js — Buku Bunpou Irodori A2 (初級1) · Bab 5
   Penanda teks: 漢字[よみ] furigana · {sorot} · **tebal** · 「kutipan Jepang」. Rumus: token berawalan "=" = bagian tetap (merah).
   Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran); daftar pola mengikuti daftar isi resmi Irodori 初級1 (文法ノート).
   ===================================================================== */
FC.defineBuku('a2', {
  n: 5,
  title: 'とてもにぎやかで便利[べんり]です',
  arti: 'Ramai sekali dan praktis',
  topic: '私[わたし]の町[まち]',
  topicArti: 'Kotaku',
  bisa: [
    'Menceritakan kesanmu tentang kota tempat tinggalmu dengan kalimat sederhana',
    'Menanyakan tempat rekomendasi di sekitar kota dan memahami jawabannya',
    'Membaca peta kota untuk mendapat informasi tentang tempat terkenal dan toko',
    'Menyebutkan apa saja yang bisa dilakukan di suatu tempat'
  ],
  pola: [
    {
      name: 'Nで、～／ナA-で、～／イA-くて、～',
      short: 'で・くて',
      arti: '~ dan ~ (menyambung sifat atau benda)',
      inti: 'Sambungkan dua keterangan dalam satu kalimat dengan bentuk **で／くて**: “~ dan ~”.',
      rumus: [['N', '=で', '、', '～'], ['ナA', '=で', '、', '～'], ['イA-い', '→', 'イA-', '=くて', '、', '～']],
      rumusNote: 'Hanya bagian terakhir yang memakai です／でした',
      tabel: [{
        judul: 'Cara membentuknya',
        kepala: ['Jenis', 'Asal', 'Disambung'],
        baris: [
          ['Kata benda', '学生[がくせい]', '学生[がくせい]で、～'],
          ['Sifat-な', 'にぎやか', 'にぎやかで、～'],
          ['Sifat-い', '安[やす]い', '安[やす]くて、～'],
          ['いい', 'いい', 'よくて、～']
        ]
      }],
      jelas: [
        '**で／くて** = “dan”. Menyatukan dua kesan jadi satu kalimat: 「この町[まち]は、静[しず]か{で}、きれいです」 (tenang dan bersih).',
        'Hanya bagian **terakhir** yang memakai です／でした. Bagian sebelumnya tetap berbentuk で／くて.',
        'Cocok untuk menyambung hal-hal yang **searah** (sama-sama baik atau sama-sama kurang baik): 「安[やす]くて、おいしい」, 「古[ふる]くて、せまい」. Untuk hal yang **berlawanan**, dipakai けど (pola berikutnya).',
        'Kata benda + で juga bisa menyambung keterangan: 「私[わたし]は学生[がくせい]{で}、20歳[はたち]です」 (Saya pelajar dan berusia 20 tahun).'
      ],
      contoh: [
        { jp: 'この店[みせ]は、安[やす]く{て}、おいしいです。', id: 'Toko ini murah dan enak.' },
        { jp: '私[わたし]の町[まち]は、静[しず]か{で}、空気[くうき]がきれいです。', id: 'Kotaku tenang dan udaranya bersih.' },
        { jp: 'このアパートは、駅[えき]から近[ちか]く{て}、便利[べんり]です。', id: 'Apartemen ini dekat dari stasiun dan praktis.' },
        { jp: '友[とも]だちは、親切[しんせつ]{で}、おもしろい人[ひと]です。', id: 'Temanku baik hati dan orangnya menyenangkan.' },
        { jp: 'A：あなたの町[まち]は、どんな町[まち]ですか。\nB：小[ちい]さく{て}、静[しず]かな町[まち]です。', id: 'A: Kotamu seperti apa?\nB: Kota yang kecil dan tenang.' }
      ],
      awas: [
        'Sifat-い tidak memakai で: ×安[やす]いで、おいしい → ○安[やす]くて、おいしい.',
        'Jangan menaruh です di bagian pertama: ×にぎやかですで、便利[べんり]です → ○にぎやかで、便利[べんり]です.',
        'Untuk menyatakan pertentangan (“tapi”), pakai けど (pola berikutnya), bukan て／で: 「高[たか]いけど、おいしいです」.'
      ],
      kw: 'dan menyambung sifat くて で kota benda kesan'
    },
    {
      name: 'Nだ／ナA-だ／イA-い けど、～',
      short: 'けど',
      arti: '~, tetapi ~',
      inti: 'Pakai **けど** untuk menyambung dua hal yang **berlawanan**: “~, tapi ~”.',
      rumus: [['N／ナA-だ', '+', '=けど'], ['イA-い', '+', '=けど'], ['V（bentuk biasa）', '+', '=けど']],
      rumusNote: 'Sopan: ですけど／ますけど · けど dipakai terutama dalam bahasa lisan',
      tabel: [{
        judul: 'Bentuk sebelum けど',
        kepala: ['Jenis', 'Bentuk biasa', '+ けど'],
        baris: [
          ['Kata benda', '休[やす]みだ', '休[やす]みだけど、～'],
          ['Sifat-な', '不便[ふべん]だ', '不便[ふべん]だけど、～'],
          ['Sifat-い', '高[たか]い', '高[たか]いけど、～'],
          ['Kata kerja', '行[い]った', '行[い]ったけど、～']
        ]
      }],
      jelas: [
        'けど = “tapi / meskipun”. Bagian kedua menunjukkan hal yang **berlawanan** atau tak terduga dari bagian pertama: 「遠[とお]い{けど}、きれいです」.',
        'Sebelum けど dipakai **bentuk biasa**: sifat-い tetap ～い, sifat-な dan kata benda menjadi **～だ**. Boleh juga bentuk sopan: 「遠[とお]いです{けど}」.',
        'けど bernuansa percakapan. Dalam situasi yang lebih resmi dipakai が (A2.2 Bab 4) atau けれども.',
        'Pola penyambung yang sudah kamu kenal punya tugas masing-masing: て／で (searah), から (alasan), dan けど khusus untuk **pertentangan**.'
      ],
      contoh: [
        { jp: 'この町[まち]は、小[ちい]さい{けど}、とても便利[べんり]です。', id: 'Kota ini kecil, tapi sangat praktis.' },
        { jp: 'この食堂[しょくどう]は、古[ふる]い{けど}、おいしいです。', id: 'Kantin ini tua, tapi enak.' },
        { jp: '日曜日[にちようび]は休[やす]み{だけど}、店[みせ]は開[あ]いています。', id: 'Hari Minggu libur, tapi tokonya buka.' },
        { jp: 'この公園[こうえん]は、有名[ゆうめい]{だけど}、人[ひと]が少[すく]ないです。', id: 'Taman ini terkenal, tapi orangnya sedikit.' },
        { jp: 'A：新[あたら]しいアパートは、どうですか。\nB：せまい{けど}、きれいです。', id: 'A: Bagaimana apartemen barumu?\nB: Sempit, tapi bersih.' }
      ],
      awas: [
        'Kata benda dan sifat-な dalam bentuk biasa memakai **だけど**, bukan けど saja: ○静[しず]かだけど, ×静[しず]かけど.',
        'Ke atasan atau orang yang belum akrab, lebih sopan pakai ですけど／ますけど: ○高[たか]いですけど、おいしいです.'
      ],
      kw: 'tapi tetapi けど meskipun berlawanan'
    },
    {
      name: 'V-ることができます',
      short: 'ことができます',
      arti: 'bisa ~ (mampu / ada kesempatan)',
      inti: 'Pakai ini untuk bilang **bisa melakukan sesuatu**, karena mampu atau karena **tempat dan kondisinya memungkinkan**.',
      rumus: [['V-る', '+', '=ことが', '+', '=できます'], ['V-る', '+', '=ことが', '+', '=できません']],
      rumusNote: 'V-る = bentuk kamus · Tanya: V-ることができますか？',
      tabel: [{
        judul: 'Contoh',
        kepala: ['Kamus', 'V-ることができます', 'Artinya'],
        baris: [
          ['見[み]る', '見[み]ることができます', 'bisa melihat'],
          ['食[た]べる', '食[た]べることができます', 'bisa makan'],
          ['泳[およ]ぐ', '泳[およ]ぐことができます', 'bisa berenang'],
          ['する', 'することができます', 'bisa melakukan'],
          ['来[く]る', '来[く]ることができます', 'bisa datang']
        ]
      }],
      jelas: [
        '**V-る (kamus) + ことができます**. こと mengubah kata kerja menjadi “hal”, jadi arti harfiahnya “hal melakukan ~ itu mungkin”.',
        'Dua nuansa: ① **kemampuan** (「泳[およ]ぐ{ことができます}」 = bisa berenang) dan ② **kemungkinan / kesempatan** karena tempat atau aturan (「ここで写真[しゃしん]を撮[と]る{ことができます}」 = di sini bisa memotret). Konteks yang menentukan.',
        'Sering muncul untuk menjelaskan sebuah tempat: 「この町[まち]では、おいしい魚[さかな]を食[た]べる{ことができます}」.',
        'Negatif: ～ことができません. Tanya: ～ことができますか？ Untuk **kata benda** pakai Nができます (Bab 2): 「日本語[にほんご]ができます」.'
      ],
      contoh: [
        { jp: 'この公園[こうえん]では、ボートに乗[の]る{ことができます}。', id: 'Di taman ini kamu bisa naik perahu.' },
        { jp: '駅[えき]の前[まえ]の店[みせ]で、地図[ちず]を買[か]う{ことができます}。', id: 'Di toko depan stasiun kamu bisa membeli peta.' },
        { jp: 'この海[うみ]では、夏[なつ]に泳[およ]ぐ{ことができます}。', id: 'Di pantai ini kamu bisa berenang pada musim panas.' },
        { jp: '私[わたし]は、まだ漢字[かんじ]を書[か]く{ことができません}。', id: 'Saya belum bisa menulis kanji.' },
        { jp: 'A：ここで写真[しゃしん]を撮[と]る{ことができますか}。\nB：はい、{できます}よ。', id: 'A: Bisakah memotret di sini?\nB: Ya, bisa.' }
      ],
      awas: [
        'Jangan pakai bentuk ます: ×見[み]ますことができます → ○見[み]ることができます.',
        'Objek kata kerja tetap memakai を di dalam pola ini: ○ご飯[はん]を食[た]べることができます.',
        'Untuk bahasa atau keahlian (kata benda), pakai Nができます, bukan pola ini: ○日本語[にほんご]ができます.'
      ],
      kw: 'bisa dapat mampu kemungkinan kesempatan ことができる'
    }
  ]
});
