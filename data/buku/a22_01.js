/* =====================================================================
   data/buku/a22_01.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 1
   Penanda teks: 漢字[よみ] furigana · {sorot} · **tebal** · 「kutipan Jepang」. Rumus: token berawalan "=" = bagian tetap (merah).
   Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran); daftar pola mengikuti daftar isi resmi Irodori 初級2.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 1,
  title: '先週[せんしゅう]、日本[にほん]に来[き]たばかりです',
  arti: 'Saya baru datang ke Jepang minggu lalu',
  topic: '私[わたし]の周[まわ]りの人[ひと]たち',
  topicArti: 'Orang-orang di sekitarku',
  bisa: [
    'Memperkenalkan diri dan bercerita tentang kota asalmu dengan kalimat sederhana',
    'Bilang bahwa sesuatu “baru saja” terjadi',
    'Menceritakan pekerjaan atau tempat tinggalmu yang dulu',
    'Menyambung beberapa kalimat jadi satu supaya ceritamu lebih mengalir'
  ],
  pola: [
    {
      name: 'N1というN2',
      short: 'という',
      arti: 'yang namanya ~ / yang disebut ~',
      inti: 'Pakai ini untuk menyebut **nama** sesuatu yang mungkin belum dikenal lawan bicaramu.',
      rumus: [['N1', '+', '=という', '+', 'N2']],
      rumusNote: 'N1 = nama · N2 = jenisnya (kota, toko, orang, masakan, dan sebagainya)',
      jelas: [
        'Urutannya: **nama dulu, baru jenisnya**. 「バンドン{という}町[まち]」 = “kota yang namanya Bandung”.',
        'Jenis (N2) yang sering dipakai: 町[まち] (kota), 店[みせ] (toko), 人[ひと] (orang), 料理[りょうり] (masakan), 花[はな] (bunga).',
        'Bisa juga untuk menjelaskan **arti kata**: ～{という}意味[いみ]です = “artinya ~”.',
        'Di obrolan santai, という sering diucapkan **っていう**.'
      ],
      contoh: [
        { jp: '私[わたし]は、バンドン{という}町[まち]から来[き]ました。', id: 'Saya datang dari kota yang namanya Bandung.' },
        { jp: '「さくら」{という}花[はな]が好[す]きです。', id: 'Saya suka bunga yang namanya “sakura”.' },
        { jp: '駅[えき]の前[まえ]に、「ひまわり」{という}店[みせ]があります。', id: 'Di depan stasiun ada toko yang namanya “Himawari”.' },
        { jp: '田中[たなか]さん{という}人[ひと]を知[し]っていますか。', id: 'Apakah kamu kenal orang yang bernama Tanaka?' },
        { jp: '「おいしい」は、「enak」{という}意味[いみ]です。', id: '“おいしい” artinya “enak”.' }
      ],
      awas: [
        'Jangan dibalik: ×町[まち]というバンドン. Yang ditulis lebih dulu selalu **namanya**.',
        'Kalau hanya pakai と, artinya berubah: 「バンドンと町[まち]」 = “Bandung dan kota”, bukan “kota yang namanya Bandung”.'
      ],
      kw: 'nama bernama disebut arti kata'
    },
    {
      name: 'V-たばかりです',
      short: 'たばかり',
      arti: 'baru saja ~',
      inti: 'Pakai ini kalau sesuatu **baru saja terjadi**, belum lama.',
      rumus: [['V-た', '+', '=ばかりです']],
      rumusNote: 'V-た = bentuk lampau (bentuk-ta)',
      tabel: [{
        judul: 'Ingat lagi: bentuk V-た',
        kepala: ['Kelompok', 'Bentuk kamus', 'V-た'],
        baris: [
          ['Kel. 1', '行[い]く', '行[い]った'],
          ['Kel. 1', '飲[の]む', '飲[の]んだ'],
          ['Kel. 2', '食[た]べる', '食[た]べた'],
          ['Kel. 3', '来[く]る', '来[き]た'],
          ['Kel. 3', 'する', 'した']
        ]
      }],
      jelas: [
        'Yang dihitung adalah **perasaanmu**: “ini masih baru”. Bisa baru kemarin, bisa juga baru beberapa bulan.',
        'Sebelum ばかり, kata kerjanya harus berbentuk **V-た** (lampau): 「来[き]た{ばかり}です」.',
        'Sering ditemani kata waktu: さっき (tadi), 先週[せんしゅう] (minggu lalu), 先月[せんげつ] (bulan lalu).',
        'Kata kerja yang sering dipakai: 来[く]る (datang), 着[つ]く (tiba), 始[はじ]める (mulai), 入[はい]る (masuk), 買[か]う (membeli), 食[た]べる (makan).'
      ],
      contoh: [
        { jp: 'さっき、ご飯[はん]を食[た]べ{たばかりです}。', id: 'Tadi saya baru saja makan.' },
        { jp: 'この靴[くつ]は、きのう買[か]っ{たばかりです}。', id: 'Sepatu ini baru kemarin saya beli.' },
        { jp: '日本語[にほんご]の勉強[べんきょう]を始[はじ]め{たばかりです}。', id: 'Saya baru mulai belajar bahasa Jepang.' },
        { jp: '先月[せんげつ]、日本[にほん]に来[き]{たばかりです}。', id: 'Bulan lalu saya baru datang ke Jepang.' },
        { jp: 'A：もう宿題[しゅくだい]をしましたか。\nB：いいえ、今[いま]、家[いえ]に帰[かえ]っ{たばかりです}。', id: 'A: Sudah mengerjakan PR?\nB: Belum, saya baru saja sampai di rumah.' }
      ],
      awas: [
        'Jangan pakai bentuk kamus atau ます: ×食[た]べるばかりです, ×食[た]べますばかりです. Harus **V-た**.',
        'ばかり juga bisa berarti “hanya / melulu” (ご飯[はん]ばかり食[た]べる = makan nasi melulu). Di pola ini artinya hanya “baru saja”.'
      ],
      kw: 'baru saja baru lalu belum lama'
    },
    {
      name: 'V-ていました',
      short: 'ていました',
      arti: 'dulu ~ / waktu itu sedang ~',
      inti: 'Ini bentuk **masa lalu** dari V-ています: untuk menceritakan keadaan atau kebiasaanmu **dulu**.',
      rumus: [['V-て', '+', '=いました'], ['V-て', '+', '=いませんでした']],
      rumusNote: 'Sekarang → V-ています · Dulu → V-ていました',
      jelas: [
        '**Keadaan dulu**: tempat tinggal, pekerjaan, sekolah. 「ジャカルタに住[す]ん{でいました}」 = “dulu tinggal di Jakarta”.',
        '**Kebiasaan dulu** yang dilakukan berulang: 「毎日[まいにち]、公園[こうえん]で走[はし]っ{ていました}」 = “dulu tiap hari lari di taman”.',
        'Bisa juga berarti “**sedang** melakukan” pada waktu tertentu di masa lalu: 「きのうの夜[よる]、テレビを見[み]{ていました}」.',
        'Rumus gampang: ています → いました (bagian います dijadikan lampau).'
      ],
      contoh: [
        { jp: '前[まえ]は、レストランで働[はたら]い{ていました}。', id: 'Dulu saya bekerja di restoran.' },
        { jp: '日本[にほん]に来[く]る前[まえ]、ジャカルタに住[す]ん{でいました}。', id: 'Sebelum datang ke Jepang, saya tinggal di Jakarta.' },
        { jp: '子[こ]どものとき、毎日[まいにち]サッカーをし{ていました}。', id: 'Waktu kecil, saya main sepak bola setiap hari.' },
        { jp: 'きのうの夜[よる]、友[とも]だちと電話[でんわ]で話[はな]し{ていました}。', id: 'Tadi malam saya sedang ngobrol dengan teman lewat telepon.' },
        { jp: '去年[きょねん]まで、大学[だいがく]で日本語[にほんご]を勉強[べんきょう]し{ていました}。', id: 'Sampai tahun lalu, saya belajar bahasa Jepang di universitas.' }
      ],
      awas: [
        'Pilih sesuai waktunya: **sekarang** → ています (「今[いま]は東京[とうきょう]に住[す]んでいます」), **dulu** → ていました.',
        'Beda dengan V-ました biasa: 「働[はたら]きました」 = kejadian yang selesai; 「働[はたら]いていました」 = keadaan yang berlangsung selama suatu masa.'
      ],
      kw: 'dulu masa lalu kebiasaan sedang lampau'
    },
    {
      name: 'それ／そこ ＜文脈[ぶんみゃく]指示[しじ]＞',
      short: 'それ・そこ',
      arti: 'itu / di sana (yang baru disebut)',
      inti: 'それ dan そこ bisa **menunjuk kembali** ke sesuatu yang baru kamu sebut, supaya tidak mengulang kata yang sama.',
      rumus: [['benda / hal yang baru disebut', '→', '=それ'], ['tempat yang baru disebut', '→', '=そこ']],
      jelas: [
        'Biasanya それ = “itu (dekat kamu)”. Di sini fungsinya lain: menunjuk **hal yang baru disebut** dalam percakapan atau tulisan, dekat atau jauh tidak penting.',
        '**そこ** untuk **tempat**. **それ** untuk **benda, kejadian, atau kata-kata** yang baru disebut.',
        'Cara cek gampang: lihat kalimat sebelumnya, apa yang baru disebut? Itulah yang ditunjuk oleh それ／そこ.'
      ],
      contoh: [
        { jp: 'バンドンという町[まち]があります。{そこ}は、とてもにぎやかです。', id: 'Ada kota yang namanya Bandung. Di sana sangat ramai.' },
        { jp: '先週[せんしゅう]、京都[きょうと]に行[い]きました。{そこ}で、お寺[てら]を見[み]ました。', id: 'Minggu lalu saya pergi ke Kyoto. Di sana saya melihat kuil.' },
        { jp: '駅[えき]のそばに、新[あたら]しいパン屋[や]ができました。{そこ}のパンは、おいしいですよ。', id: 'Dekat stasiun ada toko roti baru. Roti di sana enak lho.' },
        { jp: '新[あたら]しいスマホを買[か]いました。{それ}は、とても軽[かる]いです。', id: 'Saya beli HP baru. HP itu ringan sekali.' },
        { jp: 'A：来月[らいげつ]、国[くに]に帰[かえ]ります。\nB：{それ}は、いいですね。', id: 'A: Bulan depan saya pulang ke negara asal.\nB: Wah, itu bagus ya.' }
      ],
      awas: [
        'Jangan tertukar: そこ hanya untuk **tempat**. Untuk benda atau kejadian pakai それ.',
        'あれ／あそこ untuk yang jauh dari kita berdua (kelihatan atau sama-sama diingat), bukan untuk menunjuk kalimat yang baru kamu ucapkan.'
      ],
      kw: 'itu di sana menunjuk kata tunjuk sebelumnya konteks'
    },
    {
      name: '～て、～／～から、～／～けど、～',
      short: 'て・から・けど',
      arti: 'menyambung kalimat: dan / karena / tapi',
      inti: 'Satu kalimat panjang lebih enak daripada dua kalimat pendek: pakai **て** (dan), **から** (karena), atau **けど** (tapi).',
      rumus: [
        ['Kalimat 1', '+', '=て', '、', 'Kalimat 2'],
        ['Kalimat 1', '+', '=から', '、', 'Kalimat 2'],
        ['Kalimat 1', '+', '=けど', '、', 'Kalimat 2']
      ],
      rumusNote: 'て = dan / lalu · から = karena Kalimat 1 · けど = tapi',
      tabel: [{
        judul: 'Bentuk て untuk kata sifat dan kata benda',
        kepala: ['Jenis', 'Biasa', 'Bentuk て'],
        baris: [
          ['Kata kerja', '食[た]べる', '食[た]べて'],
          ['Sifat-い', '大[おお]きい', '大[おお]きくて'],
          ['Sifat-な', '静[しず]か', '静[しず]かで'],
          ['Kata benda', '学生[がくせい]', '学生[がくせい]で']
        ]
      }],
      jelas: [
        '**て** = “dan”. Untuk menyebut beberapa keadaan atau kegiatan berurutan: 「町[まち]は小[ちい]さく{て}、静[しず]かです」 (kotanya kecil dan tenang).',
        '**から** = “karena”. Alasan ditulis **di depan**, hasilnya di belakang: 「雨[あめ]だ{から}、行[い]きません」.',
        '**けど** = “tapi”. Menyambung dua hal yang berlawanan: 「高[たか]い{けど}、おいしい」. Lebih santai daripada が (ada di Bab 4).',
        'から dan けど bisa dipasang setelah bentuk sopan maupun bentuk biasa: 「おいしいです{けど}」, 「おいしい{けど}」.'
      ],
      contoh: [
        { jp: '私[わたし]の町[まち]は小[ちい]さく{て}、静[しず]かです。', id: 'Kota saya kecil dan tenang.' },
        { jp: '朝[あさ]、起[お]き{て}、顔[かお]を洗[あら]っ{て}、ご飯[はん]を食[た]べます。', id: 'Pagi hari, saya bangun, cuci muka, lalu sarapan.' },
        { jp: '今日[きょう]は雨[あめ]だ{から}、出[で]かけません。', id: 'Karena hari ini hujan, saya tidak keluar.' },
        { jp: 'この店[みせ]は安[やす]い{から}、いつも混[こ]んでいます。', id: 'Toko ini murah, jadi selalu ramai.' },
        { jp: '日本語[にほんご]は難[むずか]しい{けど}、おもしろいです。', id: 'Bahasa Jepang sulit, tapi menarik.' },
        { jp: 'この店[みせ]は小[ちい]さい{けど}、料理[りょうり]がおいしいです。', id: 'Toko ini kecil, tapi masakannya enak.' }
      ],
      awas: [
        'Letak “karena” berbeda dari bahasa Indonesia: から ditaruh **setelah** alasannya. “Karena hujan, saya tidak pergi” → 雨[あめ]だから、行[い]きません.',
        'Kata sifat-い pakai **くて** (×大[おお]きいて). Kata sifat-な dan kata benda pakai **で**.'
      ],
      kw: 'dan karena tapi menyambung kalimat alasan lalu'
    }
  ]
});
