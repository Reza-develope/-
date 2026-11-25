/* =====================================================================
   data/buku/a2_02.js — Buku Bunpou Irodori A2 (初級1) · Bab 2
   Penanda teks: 漢字[よみ] furigana · {sorot} · **tebal** · 「kutipan Jepang」. Rumus: token berawalan "=" = bagian tetap (merah).
   Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran); daftar pola mengikuti daftar isi resmi Irodori 初級1 (文法ノート).
   ===================================================================== */
FC.defineBuku('a2', {
  n: 2,
  title: 'ゲームをするのが好[す]きです',
  arti: 'Saya suka main gim',
  topic: '今[いま]の私[わたし]',
  topicArti: 'Aku yang sekarang',
  bisa: [
    'Menceritakan hobi dan kegiatan kesukaanmu dengan kalimat sederhana',
    'Menanyakan dan menjawab apa yang dilakukan di hari libur',
    'Membaca dan menulis perkenalan singkat, misalnya perkenalan staf yang dipasang di tempat kerja',
    'Menyebut bahasa atau keahlian yang kamu kuasai'
  ],
  pola: [
    {
      name: 'V-ることです',
      short: 'ることです',
      arti: '(hobiku) adalah melakukan ~',
      inti: 'Pakai ini untuk menyebut **hobi atau kegiatan** yang dijelaskan dengan kata kerja: “hobiku adalah (melakukan) ~”.',
      rumus: [['趣味[しゅみ]は', '+', 'V-る', '+', '=ことです']],
      rumusNote: 'V-る = bentuk kamus · Tanya: 趣味[しゅみ]は何[なん]ですか？ (Apa hobimu?)',
      tabel: [{
        judul: 'Dari bentuk ます ke ～ことです',
        kepala: ['Bentuk ます', 'V-る', '～ことです'],
        baris: [
          ['散歩[さんぽ]します', '散歩[さんぽ]する', '公園[こうえん]を散歩[さんぽ]することです'],
          ['撮[と]ります', '撮[と]る', '写真[しゃしん]を撮[と]ることです'],
          ['弾[ひ]きます', '弾[ひ]く', 'ギターを弾[ひ]くことです'],
          ['釣[つ]ります', '釣[つ]る', '魚[さかな]を釣[つ]ることです']
        ]
      }],
      jelas: [
        'Kata kerja **harus berbentuk kamus** (V-る), lalu ditutup 「{ことです}」. **こと** mengubah kata kerja menjadi “kegiatan / hal”.',
        'Sering dipakai untuk menjawab 「趣味[しゅみ]は何[なん]ですか？」 (Apa hobimu?).',
        'Kalau hobimu cukup disebut dengan kata benda, boleh langsung 「趣味[しゅみ]は料理[りょうり]です」. Pakai ことです kalau hobimu berupa **kegiatan** yang dijelaskan dengan kata kerja: 「料理[りょうり]をすることです」.',
        'Objek kata kerja tetap ditandai を seperti biasa: 「音楽[おんがく]を聞[き]くことです」.'
      ],
      contoh: [
        { jp: '私[わたし]の趣味[しゅみ]は、公園[こうえん]を{散歩[さんぽ]することです}。', id: 'Hobi saya jalan-jalan di taman.' },
        { jp: '趣味[しゅみ]は、写真[しゃしん]を{撮[と]ることです}。', id: 'Hobi saya memotret.' },
        { jp: 'ミナさんの趣味[しゅみ]は、ギターを{弾[ひ]くことです}。', id: 'Hobi Mina bermain gitar.' },
        { jp: '父[ちち]の趣味[しゅみ]は、魚[さかな]を{釣[つ]ることです}。', id: 'Hobi ayah saya memancing.' },
        { jp: 'A：趣味[しゅみ]は何[なん]ですか。\nB：音楽[おんがく]を{聞[き]くことです}。', id: 'A: Apa hobimu?\nB: Mendengarkan musik.' }
      ],
      awas: [
        'Jangan pakai bentuk ます: ×映画[えいが]を見[み]ますことです → ○映画[えいが]を見[み]ることです.',
        'Kata kerja tidak bisa langsung diikuti です: ×趣味[しゅみ]は映画[えいが]を見[み]るです. Harus ada こと.'
      ],
      kw: 'hobi kegiatan kebiasaan menyebut hobi こと'
    },
    {
      name: 'V-るのが好[す]きです',
      short: 'のが好[す]きです',
      arti: 'suka melakukan ~',
      inti: 'Pakai **の** untuk mengubah kata kerja menjadi “hal melakukan ~”, lalu katakan kamu **suka** melakukannya.',
      rumus: [['V-る', '+', '=のが', '+', '好[す]きです'], ['V-る', '+', '=のは', '+', 'あまり好[す]きじゃないです']],
      rumusNote: 'V-る = bentuk kamus · の membuat kata kerja berperan seperti kata benda',
      tabel: [{
        judul: 'Tingkat suka',
        kepala: ['Ungkapan', 'Arti', 'Contoh'],
        baris: [
          ['大好[だいす]きです', 'suka sekali', '走[はし]るのが大好[だいす]きです'],
          ['好[す]きです', 'suka', '歌[うた]うのが好[す]きです'],
          ['あまり好[す]きじゃないです', 'kurang suka', '掃除[そうじ]をするのは、あまり好[す]きじゃないです']
        ]
      }],
      jelas: [
        'の membuat kata kerja berperan seperti kata benda. 「ゲームを{する}のが好[す]きです」 = “suka main gim” (secara harfiah: “hal bermain gim itu saya suka”).',
        'Kata kerja di depan の berbentuk **kamus**: 「見[み]るのが好[す]き」, 「泳[およ]ぐのが好[す]き」, 「するのが好[す]き」.',
        'Yang disukai ditandai **が**. Untuk menyatakan kurang suka atau membandingkan, sering dipakai **は**: 「掃除[そうじ]をするのは、あまり好[す]きじゃないです」.',
        'Kalau yang disukai berupa **benda**, cukup 「ゲームが好[す]きです」. Dengan V-るのが好[す]きです kamu menyebut **kegiatannya**: suka melakukan hal itu.'
      ],
      contoh: [
        { jp: '休[やす]みの日[ひ]は、音楽[おんがく]を{聞[き]くのが好[す]きです}。', id: 'Di hari libur, saya suka mendengarkan musik.' },
        { jp: '私[わたし]は、友[とも]だちと{話[はな]すのが大好[だいす]きです}。', id: 'Saya sangat suka mengobrol dengan teman.' },
        { jp: '弟[おとうと]は、朝[あさ]{走[はし]るのが好[す]きです}。', id: 'Adik laki-laki saya suka berlari di pagi hari.' },
        { jp: '料理[りょうり]を{するのは、あまり好[す]きじゃないです}。', id: 'Saya kurang suka memasak.' },
        { jp: 'A：何[なに]をするのが好[す]きですか。\nB：{歩[ある]くのが好[す]きです}。', id: 'A: Kamu suka melakukan apa?\nB: Saya suka berjalan kaki.' }
      ],
      awas: [
        'Jangan pakai bentuk ます: ×見[み]ますのが好[す]きです → ○見[み]るのが好[す]きです.',
        'Kalau yang disukai berupa **benda**, jangan pakai の: ○映画[えいが]が好[す]きです, ×映画[えいが]のが好[す]きです.'
      ],
      kw: 'suka kegiatan hobi の menyukai kurang suka'
    },
    {
      name: '【人[ひと]】と【場所[ばしょ]】でV-ます',
      short: '人[ひと]と・場所[ばしょ]で',
      arti: 'melakukan ~ bersama (orang) di (tempat)',
      inti: 'Pakai **と** untuk “bersama siapa” dan **で** untuk “di mana kegiatan itu berlangsung”.',
      rumus: [['【人[ひと]】', '+', '=と', '+', '【場所[ばしょ]】', '+', '=で', '+', 'V-ます']],
      rumusNote: 'Urutan 【人[ひと]】と dan 【場所[ばしょ]】で boleh ditukar',
      tabel: [{
        judul: 'と, で, dan に',
        kepala: ['Partikel', 'Menunjukkan', 'Contoh'],
        baris: [
          ['と', 'bersama siapa', '友[とも]だちと'],
          ['で', 'tempat kegiatan', '公園[こうえん]で走[はし]ります'],
          ['に', 'tujuan (pergi / datang)', '公園[こうえん]に行[い]きます']
        ]
      }],
      jelas: [
        '**と** = “bersama”. 「友[とも]だち{と}」 = bersama teman. Kalau kamu melakukannya sendirian, katakan 「一人[ひとり]で」 (sendiri).',
        '**で** = “di (tempat kegiatan)”. 「体育館[たいいくかん]{で}運動[うんどう]します」 = “berolahraga di gimnasium”.',
        'Sering ditambah kata frekuensi di depan: たいてい (biasanya), よく (sering), ときどき (kadang-kadang), いつも (selalu).',
        'Bedakan で dan に: で = tempat **kegiatan**, に = tempat **tujuan** (行[い]く・来[く]る) atau tempat **berada** (ある・いる). 「公園[こうえん]で走[はし]ります」 ≠ 「公園[こうえん]に行[い]きます」.'
      ],
      contoh: [
        { jp: '日曜日[にちようび]は、{家族[かぞく]と公園[こうえん]で}お弁当[べんとう]を食[た]べます。', id: 'Hari Minggu, saya makan bekal bersama keluarga di taman.' },
        { jp: '{会社[かいしゃ]の人[ひと]と食堂[しょくどう]で}昼[ひる]ご飯[はん]を食[た]べます。', id: 'Saya makan siang bersama orang-orang kantor di kantin.' },
        { jp: '週末[しゅうまつ]は、{妹[いもうと]とデパートで}買[か]い物[もの]をします。', id: 'Akhir pekan, saya berbelanja bersama adik perempuan di pusat perbelanjaan.' },
        { jp: 'ときどき、{恋人[こいびと]と海[うみ]で}散歩[さんぽ]します。', id: 'Kadang-kadang saya jalan-jalan bersama pacar di pantai.' },
        { jp: 'A：休[やす]みの日[ひ]は、何[なに]をしますか。\nB：{友[とも]だちとジムで}運動[うんどう]します。', id: 'A: Di hari libur, kamu melakukan apa?\nB: Saya berolahraga bersama teman di gym.' }
      ],
      awas: [
        'Jangan tertukar: と = **orang**, で = **tempat**. ×公園[こうえん]と友[とも]だちで → ○友[とも]だちと公園[こうえん]で.',
        'Untuk kata kerja pergi / datang / pulang (行[い]く・来[く]る・帰[かえ]る), tempat tujuan memakai **に／へ**, bukan で: ○友[とも]だちと駅[えき]に行[い]きます.'
      ],
      kw: 'bersama dengan siapa di mana tempat と で kegiatan'
    },
    {
      name: 'V1-て、V2',
      short: 'V1-て、V2',
      arti: 'melakukan V1, lalu V2 (kegiatan berurutan)',
      inti: 'Sambungkan beberapa kegiatan **berurutan** dengan **bentuk-て**: “lakukan ini, lalu itu”.',
      rumus: [['V1-て', '、', 'V2-て', '、', 'V3-ます']],
      rumusNote: 'Hanya kata kerja **terakhir** yang membawa kala (ます／ました) dan tingkat kesopanan',
      jelas: [
        '**Bentuk-て** menyambung kegiatan menurut **urutan kejadian**: 「顔[かお]を洗[あら]{って}、ご飯[はん]を食[た]べます」 = “cuci muka, lalu makan”.',
        'Hanya kata kerja **terakhir** yang menunjukkan kala (ます／ました) dan tingkat kesopanan. Kata kerja sebelumnya tetap bentuk-て, baik untuk masa lalu maupun masa depan.',
        'Boleh ditambah そのあと (setelah itu) atau それから (kemudian) kalau ingin menegaskan urutan: 「掃除[そうじ]をして、{そのあと}、買[か]い物[もの]に行[い]きます」.',
        'Dua sampai tiga kata kerja sudah cukup. Kalau terlalu panjang, pecah menjadi beberapa kalimat supaya mudah diikuti.'
      ],
      contoh: [
        { jp: '毎朝[まいあさ]、顔[かお]を{洗[あら]って}、朝[あさ]ご飯[はん]を食[た]べます。', id: 'Tiap pagi, saya cuci muka lalu sarapan.' },
        { jp: '日曜日[にちようび]は、掃除[そうじ]を{して}、買[か]い物[もの]に行[い]きます。', id: 'Hari Minggu, saya bersih-bersih lalu pergi belanja.' },
        { jp: '昨日[きのう]は、友[とも]だちと映画[えいが]を{見[み]て}、ご飯[はん]を食[た]べました。', id: 'Kemarin saya menonton film bersama teman, lalu makan.' },
        { jp: '日本[にほん]に{来[き]て}、すぐに日本語[にほんご]学校[がっこう]に入[はい]りました。', id: 'Setelah datang ke Jepang, saya langsung masuk sekolah bahasa Jepang.' },
        { jp: '明日[あした]は、朝[あさ]早[はや]く{起[お]きて}、電車[でんしゃ]で海[うみ]に行[い]きます。', id: 'Besok saya akan bangun pagi-pagi, lalu pergi ke pantai naik kereta.' }
      ],
      awas: [
        'Jangan membuat tiap kata kerja berakhir ます／ました. ×ご飯[はん]を食[た]べました、映画[えいが]を見[み]ました terdengar seperti dua kalimat terpisah dan urutannya kurang jelas. Gabungkan: ○ご飯[はん]を食[た]べて、映画[えいが]を見[み]ました.',
        'Perhatikan bentuk-て tiap kelompok kata kerja. Pengecualian: 行[い]く → 行[い]って (bukan ×行[い]いて).'
      ],
      kw: 'lalu kemudian berurutan urutan kegiatan bentuk te sambung kata kerja'
    },
    {
      name: 'V-ています ②',
      short: 'ています②',
      arti: 'rutin ~ / menekuni ~ (kebiasaan)',
      inti: 'V-ています juga dipakai untuk **kegiatan yang dijalani berulang secara rutin**, misalnya les, olahraga, atau hobi yang kamu tekuni.',
      rumus: [['V-て', '+', '=います']],
      rumusNote: 'Sering ditemani kata frekuensi: 毎日[まいにち] (tiap hari), 毎週[まいしゅう] (tiap minggu), 週[しゅう]に2回[にかい] (2 kali seminggu)',
      tabel: [{
        judul: 'Kata kerja yang sering dipakai untuk kegiatan rutin',
        kepala: ['Kata kerja', 'V-ています', 'Arti'],
        baris: [
          ['習[なら]う', '習[なら]っています', 'sedang les / belajar (rutin)'],
          ['通[かよ]う', '通[かよ]っています', 'rutin pergi ke (gym, kursus)'],
          ['やる', 'やっています', 'menekuni (olahraga, hobi)'],
          ['する', 'しています', 'melakukan secara rutin']
        ]
      }],
      jelas: [
        'Di sini V-ています menyatakan **kegiatan rutin atau yang sedang ditekuni** (les, olahraga, hobi). Berbeda dengan ① di Bab 1 yang tentang pekerjaan atau sekolah.',
        'Contoh: 「ピアノを{習[なら]っています}」 = “Saya les piano”. Kamu tidak sedang bermain piano saat bicara; maksudnya kegiatan itu berjalan terus.',
        'Kata keterangan yang sering menyertai: 毎日[まいにち] (tiap hari), 毎週[まいしゅう] (tiap minggu), 週[しゅう]に2回[にかい] (2 kali seminggu), ～から (sejak ~).',
        'Cara bertanya: 「何[なに]か習[なら]っていますか？」 (Sedang les sesuatu?).'
      ],
      contoh: [
        { jp: '週[しゅう]に2回[にかい]、ジムに{通[かよ]っています}。', id: 'Saya pergi ke gym dua kali seminggu.' },
        { jp: '去年[きょねん]から、日本[にほん]の料理[りょうり]を{習[なら]っています}。', id: 'Sejak tahun lalu saya les masakan Jepang.' },
        { jp: '毎朝[まいあさ]、公園[こうえん]で{走[はし]っています}。', id: 'Tiap pagi saya berlari di taman.' },
        { jp: '毎週[まいしゅう]土曜日[どようび]に、友[とも]だちと{サッカーをしています}。', id: 'Tiap hari Sabtu saya main sepak bola dengan teman.' },
        { jp: 'A：何[なに]か習[なら]っていますか。\nB：ええ、ギターを{習[なら]っています}。', id: 'A: Kamu sedang les sesuatu?\nB: Ya, saya les gitar.' }
      ],
      awas: [
        'Hati-hati dengan waktunya: 「習[なら]っています」 = masih berlangsung. Untuk kegiatan yang sudah selesai, pakai bentuk lampau: 「去年[きょねん]まで習[なら]っていました」 (sampai tahun lalu saya les).',
        'Kebiasaan sehari-hari yang biasa boleh pakai V-ます saja: 「毎日[まいにち]、ご飯[はん]を食[た]べます」. V-ています lebih menekankan kegiatan yang **ditekuni dalam jangka panjang**.'
      ],
      kw: 'rutin kebiasaan les kursus tiap minggu menekuni hobi ています'
    },
    {
      name: 'Nができます',
      short: 'ができます',
      arti: 'bisa ~ / menguasai ~',
      inti: 'Pakai ini untuk bilang kamu **bisa / menguasai** sesuatu, misalnya bahasa atau keahlian.',
      rumus: [['N', '+', '=ができます'], ['N', '+', '=はできません']],
      rumusNote: 'N = bahasa, olahraga, keahlian, dan sebagainya · Tanya: Nができますか？',
      tabel: [{
        judul: 'Tingkat kemampuan',
        kepala: ['Ungkapan', 'Arti'],
        baris: [
          ['よくできます', 'bisa dengan baik'],
          ['できます', 'bisa'],
          ['少[すこ]しできます', 'bisa sedikit'],
          ['あまりできません', 'kurang bisa'],
          ['できません', 'tidak bisa']
        ]
      }],
      jelas: [
        'Yang dikuasai ditandai **が**, bukan を: 「日本語[にほんご]{が}できます」 = “Saya bisa bahasa Jepang”.',
        'Akhiran 「～語[ご]」 berarti “bahasa ~”: 日本語[にほんご], 英語[えいご], 中国語[ちゅうごくご]. 「何語[なにご]ができますか？」 = “Bisa bahasa apa?”.',
        'Boleh menambah tingkat kemampuan di depan: 少[すこ]し (sedikit), よく (dengan baik), あまり～ない (kurang).',
        'Kalau menyebut beberapa hal, pisahkan dengan 、: 「英語[えいご]、タイ語[ご]、ベトナム語[ご]ができます」.'
      ],
      contoh: [
        { jp: '私[わたし]は、インドネシア語[ご]と英語[えいご]{ができます}。', id: 'Saya bisa bahasa Indonesia dan bahasa Inggris.' },
        { jp: '日本語[にほんご]が少[すこ]し{できます}。', id: 'Saya bisa sedikit bahasa Jepang.' },
        { jp: '妹[いもうと]は、ピアノが{できます}。', id: 'Adik perempuan saya bisa main piano.' },
        { jp: '運転[うんてん]は{できません}。', id: 'Saya tidak bisa menyetir.' },
        { jp: 'A：何語[なにご]ができますか。\nB：中国語[ちゅうごくご]と日本語[にほんご]が{できます}。', id: 'A: Bisa bahasa apa?\nB: Saya bisa bahasa Mandarin dan bahasa Jepang.' }
      ],
      awas: [
        'Jangan pakai を: ×日本語[にほんご]をできます → ○日本語[にほんご]ができます.',
        'Nができます dipakai untuk **kata benda** (bahasa, keahlian). Untuk “bisa melakukan (kata kerja)” ada pola lain: V-ることができます (Bab 5) dan bentuk potensial.'
      ],
      kw: 'bisa mampu bahasa keahlian できる menguasai'
    }
  ]
});
