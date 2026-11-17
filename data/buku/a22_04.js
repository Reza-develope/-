/* =====================================================================
   data/buku/a22_04.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 4
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   ===================================================================== */
FC.defineBuku('a22', {
  n: 4,
  title: 'しょうゆをつけないで食[た]べてください',
  arti: 'Tolong dimakan tanpa dicelup kecap asin',
  topic: 'レストランで',
  topicArti: 'Di restoran',
  bisa: [
    'Menanggapi topik lawan bicara: “kalau soal itu, …”',
    'Menjelaskan cara makan atau cara melakukan sesuatu: “dengan …” dan “tanpa …”',
    'Melarang dengan santai ke teman atau keluarga: “jangan … ya”',
    'Menjelaskan urutan: “setelah … baru …”',
    'Menyambung dua hal yang berlawanan dengan sopan (が)'
  ],
  pola: [
    {
      name: 'Nなら、～',
      short: 'Nなら',
      arti: 'kalau soal N, ~',
      inti: 'Pakai **なら** untuk **menanggapi topik** lawan bicara, lalu memberi saran atau informasi: “Kalau soal itu, …”.',
      rumus: [['N', '+', '=なら', '、', 'Saran / informasi']],
      rumusNote: 'N = topik yang baru diangkat lawan bicara',
      jelas: [
        '**なら** = “kalau (soal) …”. Lawan bicara mengangkat topik, kamu menanggapinya: 「ラーメン{なら}、駅[えき]の前[まえ]の店[みせ]がおいしいですよ」.',
        'Setelahnya biasanya **saran, rekomendasi, atau informasi** yang berguna: おすすめです, いいですよ, あります.',
        'N sudah **disebut lawan bicara** (atau situasinya jelas). Bisa kata benda biasa, tempat, atau waktu: 「日曜日[にちようび]{なら}、大丈夫[だいじょうぶ]です」.'
      ],
      contoh: [
        { jp: 'A：おいしいラーメンの店[みせ]を知[し]っていますか。\nB：ラーメン{なら}、駅[えき]の前[まえ]の店[みせ]がおいしいですよ。', id: 'A: Tahu toko ramen yang enak?\nB: Kalau ramen, toko di depan stasiun enak lho.' },
        { jp: 'A：あした、いっしょに行[い]きませんか。\nB：あした{なら}、大丈夫[だいじょうぶ]です。', id: 'A: Besok pergi bareng, mau?\nB: Kalau besok, saya bisa.' },
        { jp: 'A：安[やす]いホテルを探[さが]しています。\nB：安[やす]いホテル{なら}、このサイトが便利[べんり]ですよ。', id: 'A: Saya sedang cari hotel murah.\nB: Kalau hotel murah, situs ini praktis lho.' },
        { jp: 'A：日本語[にほんご]を勉強[べんきょう]したいです。\nB：日本語[にほんご]{なら}、田中[たなか]先生[せんせい]がいいですよ。', id: 'A: Saya ingin belajar bahasa Jepang.\nB: Kalau bahasa Jepang, Tanaka-sensei bagus lho.' },
        { jp: 'A：このへんに、トイレはありますか。\nB：トイレ{なら}、あのコンビニにありますよ。', id: 'A: Di sekitar sini ada toilet?\nB: Kalau toilet, ada di minimarket itu.' }
      ],
      awas: [
        'なら **menanggapi topik orang lain**. Kalau kamu sendiri yang membuka topik, pakai は: 「ラーメンは、好[す]きですか」.',
        'なら tidak selalu “jika”. Di pola ini artinya “kalau soal N”, dan hasilnya berupa saran atau informasi.'
      ],
      kw: 'kalau soal menanggapi topik saran rekomendasi'
    },
    {
      name: 'V-て、～／V-ないで、～ ＜方法[ほうほう]＞',
      short: 'て／ないで',
      arti: 'dengan cara ~ / tanpa ~',
      inti: 'Pakai ini untuk menjelaskan **cara** melakukan sesuatu: **V-て** = “dengan cara …”, **V-ないで** = “tanpa …”.',
      rumus: [['V1-て', '、', 'V2'], ['V1-ない', '+', '=で', '、', 'V2']],
      rumusNote: 'V2 = kegiatan utama · V1 = cara melakukannya',
      tabel: [{
        judul: 'Dengan cara / tanpa cara',
        kepala: ['Arti', 'Bentuk', 'Contoh'],
        baris: [
          ['dengan cara ~', 'V-て', 'つけて食[た]べる'],
          ['tanpa ~', 'V-ないで', 'つけないで食[た]べる']
        ]
      }],
      jelas: [
        '**V-て** menjelaskan **cara** V2: 「しょうゆをつけ{て}食[た]べる」 = “makan dengan mencelupkan ke kecap asin”.',
        '**V-ないで** = “**tanpa** melakukan V”: 「しょうゆをつけ{ないで}食[た]べる」 = “makan tanpa mencelupkan ke kecap asin”.',
        'V-ない → V-ない**で** (bukan ～なくて). Contoh: 使[つか]わない → 使[つか]わないで.',
        'Cocok untuk **petunjuk** cara makan, memasak, atau memakai sesuatu.'
      ],
      contoh: [
        { jp: '野菜[やさい]は、しょうゆを{つけて}食[た]べてください。', id: 'Sayurannya, tolong dimakan dengan dicelup kecap asin.' },
        { jp: 'このおすしは、何[なに]も{つけないで}食[た]べてください。', id: 'Sushi ini, tolong dimakan tanpa dicelup apa-apa.' },
        { jp: '毎朝[まいあさ]、バスに{乗[の]って}学校[がっこう]へ行[い]きます。', id: 'Tiap pagi saya pergi ke sekolah naik bus.' },
        { jp: 'きのうの夜[よる]、電気[でんき]を{消[け]さないで}寝[ね]ました。', id: 'Tadi malam saya tidur tanpa mematikan lampu.' },
        { jp: 'A：このソースは、どうやって使[つか]いますか。\nB：野菜[やさい]に{かけて}食[た]べます。', id: 'A: Saus ini dipakainya bagaimana?\nB: Dituang ke sayuran lalu dimakan.' }
      ],
      awas: [
        'Negatif: V-ない → V-ない**で** (×食[た]べなくて). ～なくて dipakai untuk **sebab atau perasaan** (dibahas di Bab 6).',
        'Waktu dan kesopanan ditentukan oleh **V2** (kata kerja terakhir): 食[た]べてください (permintaan), 食[た]べます (biasa). V1 tetap berbentuk て／ないで.'
      ],
      kw: 'cara tanpa dengan cara makan petunjuk mencelupkan'
    },
    {
      name: 'V-ちゃだめです',
      short: 'ちゃだめ',
      arti: 'tidak boleh ~ (ragam akrab)',
      inti: 'Bentuk **santai** dari 「V-てはいけません」: cara melarang **teman atau keluarga**.',
      rumus: [['V-て', '→', 'V-ちゃ', '+', '=だめです']],
      rumusNote: 'て＋は → **ちゃ** · で＋は → **じゃ**',
      tabel: [{
        judul: 'Dari 「～てはいけません」 ke 「～ちゃだめです」',
        kepala: ['Resmi', 'Santai', 'Arti'],
        baris: [
          ['食[た]べては', '食[た]べちゃ', 'makan'],
          ['行[い]っては', '行[い]っちゃ', 'pergi'],
          ['飲[の]んでは', '飲[の]んじゃ', 'minum']
        ]
      }],
      jelas: [
        '**ちゃだめ** = “jangan / tidak boleh”, dipakai ke **teman, keluarga, atau adik**: 「ここで食[た]べ{ちゃだめ}だよ」.',
        'Asalnya: V-て**は**いけません → V-て**は** diucapkan cepat jadi **ちゃ**.',
        'Kalau kata kerjanya berakhir **で** (飲[の]んで, 読[よ]んで), jadi **じゃ**: 飲[の]んで**は** → 飲[の]ん**じゃ**.',
        'Boleh pakai です (ちゃだめです) atau dipendekkan (ちゃだめ／ちゃだめだよ).'
      ],
      contoh: [
        { jp: 'ここで、写真[しゃしん]を{撮[と]っちゃだめ}ですよ。', id: 'Di sini tidak boleh memotret lho.' },
        { jp: 'ここに、車[くるま]を{止[と]めちゃだめ}ですよ。', id: 'Mobil tidak boleh diparkir di sini lho.' },
        { jp: 'ゲームばかり{しちゃだめ}ですよ。', id: 'Jangan main game melulu ya.' },
        { jp: 'まだ、{食[た]べちゃだめ}ですよ。みんなを待[ま]ちましょう。', id: 'Jangan makan dulu ya. Mari kita tunggu semuanya.' },
        { jp: 'A：お母[かあ]さん、ジュースを飲[の]んでもいい？\nB：夜[よる]は、{飲[の]んじゃだめ}よ。', id: 'A: Bu, boleh minum jus?\nB: Malam-malam tidak boleh minum itu, ya.' }
      ],
      awas: [
        'Ini bahasa **lisan akrab**. Ke guru, atasan, atau tamu pakai 「～てはいけません」 atau 「～ないでください」.',
        'Bedakan **ちゃ** dan **じゃ** dari akhir bentuk て／で: 食[た]べ**ちゃ**, 飲[の]ん**じゃ** (bukan ×飲[の]んちゃ).'
      ],
      kw: 'tidak boleh jangan larangan santai akrab lisan'
    },
    {
      name: 'V-てから、～',
      short: 'てから',
      arti: 'setelah ~, (baru) ~',
      inti: 'Pakai **てから** untuk menegaskan **urutan**: kerjakan V1 dulu sampai selesai, **baru** V2.',
      rumus: [['V1-て', '+', '=から', '、', 'V2']],
      rumusNote: 'V1 selesai dulu → baru V2',
      jelas: [
        '**てから** = “setelah … (baru) …”: 「手[て]を洗[あら]っ{てから}、食[た]べます」 = “cuci tangan dulu, baru makan”.',
        'V1 memakai **bentuk て**: 食[た]べて, 洗[あら]って, 飲[の]んで + から.',
        'Beda dengan V-て biasa (“lalu”): V-て hanya menyambung, sedangkan **てから** menegaskan “V1 harus selesai dulu”.',
        'Kadang artinya “**sejak** …”: 日本[にほん]に来[き]{てから}、毎日[まいにち]自転車[じてんしゃ]に乗[の]っています.'
      ],
      contoh: [
        { jp: '手[て]を洗[あら]っ{てから}、ご飯[はん]を食[た]べます。', id: 'Saya cuci tangan dulu, baru makan.' },
        { jp: '宿題[しゅくだい]を{してから}、ゲームをします。', id: 'Saya mengerjakan PR dulu, baru main game.' },
        { jp: '日本[にほん]に{来[き]てから}、毎日[まいにち]自転車[じてんしゃ]に乗[の]っています。', id: 'Sejak datang ke Jepang, saya naik sepeda setiap hari.' },
        { jp: 'お風呂[ふろ]に{入[はい]ってから}、寝[ね]ます。', id: 'Saya mandi dulu, baru tidur.' },
        { jp: 'A：もう、食[た]べてもいいですか。\nB：いいえ、みんなが来[き]{てから}、食[た]べましょう。', id: 'A: Boleh makan sekarang?\nB: Belum, setelah semua datang, baru kita makan.' }
      ],
      awas: [
        'Jangan tertukar dengan **から** “karena” (Bab 1): 食[た]べ**てから** = setelah makan; 食[た]べ**るから** = karena makan / karena akan makan.',
        'V1 pakai **bentuk て**, bukan bentuk kamus: ×食[た]べるから、行[い]きます (artinya jadi “karena makan, …”).'
      ],
      kw: 'setelah baru urutan dulu sejak'
    },
    {
      name: 'S1が、S2',
      short: 'が (tapi)',
      arti: '~, tetapi ~ (sopan)',
      inti: 'Pakai **が** di tengah kalimat untuk menyambung dua hal yang **berlawanan**: “…, **tetapi** …”. Lebih sopan daripada けど.',
      rumus: [['Kalimat 1', '+', '=が', '、', 'Kalimat 2']],
      rumusNote: 'Biasanya kalimat 1 berbentuk sopan (～です／～ます)',
      jelas: [
        '**が** = “tetapi”: 「新[あたら]しいです{が}、あまり人[ひと]がいません」 = “baru, tetapi tidak banyak orangnya”.',
        'Lebih **sopan** daripada けど (Bab 1). Pakai が di percakapan sopan, tulisan, atau dengan orang yang baru kamu kenal.',
        'Juga dipakai untuk **membuka pembicaraan** dengan sopan sebelum bertanya atau meminta: 「すみません{が}、トイレはどこですか」.'
      ],
      contoh: [
        { jp: 'この店[みせ]は、新[あたら]しいです{が}、あまり人[ひと]がいません。', id: 'Toko ini baru, tetapi tidak banyak orangnya.' },
        { jp: '日本語[にほんご]は難[むずか]しいです{が}、毎日[まいにち]勉強[べんきょう]しています。', id: 'Bahasa Jepang sulit, tetapi saya belajar setiap hari.' },
        { jp: 'すみません{が}、トイレはどこですか。', id: 'Maaf, toiletnya di mana ya?' },
        { jp: '朝[あさ]は晴[は]れていました{が}、午後[ごご]から雨[あめ]になりました。', id: 'Paginya cerah, tetapi sejak siang jadi hujan.' },
        { jp: 'A：このシャツ、ほかの色[いろ]はありますか。\nB：赤[あか]はありません{が}、青[あお]ならあります。', id: 'A: Kemeja ini ada warna lain?\nB: Merah tidak ada, tetapi kalau biru ada.' }
      ],
      awas: [
        'が “tetapi” beda dengan が penanda subjek (「私[わたし]**が**行[い]きます」). が “tetapi” muncul **setelah satu kalimat utuh**, biasanya sebelum tanda 、.',
        'けど lebih santai, が lebih sopan. Ke teman cukup けど; ke guru, atasan, atau tamu pakai が.'
      ],
      kw: 'tetapi tapi sopan berlawanan maaf permisi'
    }
  ]
});
