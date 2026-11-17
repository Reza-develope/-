/* =====================================================================
   data/buku/a22_05.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 5
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   ===================================================================== */
FC.defineBuku('a22', {
  n: 5,
  title: '早[はや]く予約[よやく]したほうがいいですよ',
  arti: 'Sebaiknya cepat-cepat reservasi lho',
  topic: '旅行[りょこう]に行[い]こう',
  topicArti: 'Ayo pergi berlibur',
  bisa: [
    'Mengatakan apa yang **bisa** kamu lakukan (bentuk kemampuan)',
    'Mencari atau menanyakan “tempat yang …”',
    'Menyampaikan kabar dari orang lain: “katanya …”, “dia bilang …”',
    'Meminta saran: “sebaiknya bagaimana / kapan / di mana?”',
    'Memberi saran: “sebaiknya …” dan “sebaiknya tidak …”'
  ],
  pola: [
    {
      name: 'V-（られ）ます ＜可能形[かのうけい]①＞',
      short: 'bentuk bisa',
      arti: 'bisa ~ (bentuk kemampuan)',
      inti: 'Ubah kata kerja ke **bentuk “bisa”** untuk bilang kemampuan atau kemungkinan: “bisa makan”, “bisa pergi”.',
      rumus: [['V (bentuk kamus)', '→', 'V (bentuk bisa)', '+', '=ます']],
      rumusNote: 'Yang “bisa dilakukan” biasanya ditandai **が** (bukan を)',
      tabel: [{
        judul: 'Cara mengubah',
        kepala: ['Kelompok', 'Kamus', 'Bentuk bisa'],
        baris: [
          ['Kel. 1', '飲[の]む', '飲[の]めます'],
          ['Kel. 1', '買[か]う', '買[か]えます'],
          ['Kel. 1', '泳[およ]ぐ', '泳[およ]げます'],
          ['Kel. 2', '食[た]べる', '食[た]べられます'],
          ['Kel. 2', '見[み]る', '見[み]られます'],
          ['Kel. 3', 'する', 'できます'],
          ['Kel. 3', '来[く]る', '来[こ]られます']
        ]
      }],
      jelas: [
        '**Kelompok 1**: huruf terakhir bentuk kamus pindah ke baris **え** (う → え) lalu + ます: 飲[の]**む** → 飲[の]**め**ます.',
        '**Kelompok 2**: る → **られ**ます: 食[た]べ**る** → 食[た]べ**られ**ます.',
        '**Kelompok 3**: する → **できます**, 来[く]る → 来[こ]**られ**ます.',
        'Objeknya biasanya pakai **が**: 「日本語[にほんご]{が}話[はな]せます」 = “bisa bicara bahasa Jepang”.',
        'Bisa dipakai untuk bertanya kemungkinan: 「遊[あそ]べますか」 = “bisa main di sini?”.'
      ],
      contoh: [
        { jp: 'ディアンさんは、日本語[にほんご]が{話[はな]せます}。', id: 'Dian bisa bicara bahasa Jepang.' },
        { jp: 'この店[みせ]では、おいしい魚[さかな]が{食[た]べられます}。', id: 'Di toko ini kita bisa makan ikan yang enak.' },
        { jp: '私[わたし]は、漢字[かんじ]が少[すこ]し{読[よ]めます}。', id: 'Saya bisa membaca sedikit kanji.' },
        { jp: 'ここで、カードが{使[つか]えます}か。', id: 'Di sini bisa pakai kartu?' },
        { jp: 'A：あした、パーティーに{来[こ]られます}か。\nB：すみません、あしたは{行[い]けません}。', id: 'A: Besok bisa datang ke pesta?\nB: Maaf, besok saya tidak bisa pergi.' }
      ],
      awas: [
        'Dua yang tidak beraturan: **する** → **できます** (bukan ×されます), **来[く]る** → **来[こ]られます** (bacaannya berubah jadi こ).',
        'Ingat **が**: ○日本語[にほんご]が話[はな]せます. (Dalam percakapan kadang terdengar を, tapi untuk latihan pakai が.)'
      ],
      kw: 'bisa kemampuan dapat mampu kemungkinan bentuk potensial'
    },
    {
      name: '～ところ',
      short: 'ところ',
      arti: 'tempat yang ~',
      inti: 'Pakai **ところ** (“tempat”) untuk bilang **“tempat yang …”**: keterangannya ditaruh di depan.',
      rumus: [['Keterangan (bentuk biasa)', '+', '=ところ']],
      rumusNote: 'Di depan ところ tidak boleh pakai ～ます',
      tabel: [{
        judul: 'Contoh keterangan + ところ',
        kepala: ['Contoh', 'Artinya'],
        baris: [
          ['遊[あそ]べるところ', 'tempat yang bisa dipakai bermain'],
          ['読[よ]めるところ', 'tempat yang bisa dipakai membaca'],
          ['安[やす]いところ', 'tempat yang murah'],
          ['静[しず]かなところ', 'tempat yang tenang']
        ]
      }],
      jelas: [
        '**ところ** = “tempat”. Keterangannya **di depan**: 「遊[あそ]べる{ところ}」 = “tempat yang bisa dipakai bermain”.',
        'Keterangan memakai **bentuk biasa** (V-る／V-ている／V-ない, kata sifat-い). Kata sifat-な + **な**: 静[しず]か**な**ところ.',
        'Sering dipakai saat **mencari atau bertanya**: 「～ところはありますか」 = “ada tempat yang ~?”.'
      ],
      contoh: [
        { jp: '子[こ]どもが{遊[あそ]べるところ}は、ありますか。', id: 'Ada tempat yang bisa dipakai anak-anak bermain?' },
        { jp: '安[やす]くて、きれいな{ところ}を探[さが]しています。', id: 'Saya sedang mencari tempat yang murah dan bersih.' },
        { jp: '静[しず]かな{ところ}で、本[ほん]を読[よ]みたいです。', id: 'Saya ingin membaca buku di tempat yang tenang.' },
        { jp: 'この町[まち]に、おいしいラーメンが{食[た]べられるところ}はありますか。', id: 'Di kota ini ada tempat yang bisa makan ramen enak?' },
        { jp: 'A：このへんに、コーヒーが{飲[の]めるところ}はありますか。\nB：はい、駅[えき]の前[まえ]にありますよ。', id: 'A: Di sekitar sini ada tempat yang bisa minum kopi?\nB: Ada, di depan stasiun.' }
      ],
      awas: [
        'Jangan pakai bentuk sopan di depan ところ: ×遊[あそ]べますところ → ○遊[あそ]べるところ.',
        'Untuk tempat yang jelas, sebut namanya (駅[えき], 店[みせ], 公園[こうえん]). ところ dipakai untuk “tempat” yang masih umum atau belum ditentukan.'
      ],
      kw: 'tempat yang mencari tempat tempat untuk'
    },
    {
      name: 'S（普通形[ふつうけい]）って聞[き]きました／って言[い]っていました',
      short: 'って (katanya)',
      arti: 'katanya ~ / dia bilang ~',
      inti: 'Pakai ini untuk **menyampaikan kabar dari orang lain**: “katanya …”, “dia bilang …”.',
      rumus: [['Kalimat (bentuk biasa)', '+', '=って聞[き]きました'], ['Kalimat (bentuk biasa)', '+', '=って言[い]っていました']],
      rumusNote: 'って = bentuk lisan dari と · 聞[き]きました = “saya dengar” · 言[い]っていました = “(dia) bilang”',
      tabel: [{
        judul: 'Bentuk sebelum って',
        kepala: ['Jenis', 'Bentuk biasa', 'Sebelum って'],
        baris: [
          ['Kata kerja', '行[い]く', '行[い]くって'],
          ['Sifat-い', 'おいしい', 'おいしいって'],
          ['Sifat-な', '便利[べんり]', '便利[べんり]だって'],
          ['Kata benda', '休[やす]み', '休[やす]みだって']
        ]
      }],
      jelas: [
        '**って聞[き]きました** = “saya dengar / katanya …”. Informasinya dari **orang lain**, bukan pengalamanmu sendiri.',
        '**って言[い]っていました** = “(dia) bilang …”: 「田中[たなか]さんが、あしたは休[やす]みだ{って}言[い]っていました」.',
        'Sebelum って pakai **bentuk biasa**. Kata benda dan kata sifat-な + **だ** (便利[べんり]だって).',
        'Di obrolan, 言[い]っていました sering jadi 言[い]ってました.'
      ],
      contoh: [
        { jp: 'あの店[みせ]は、安[やす]くておいしい{って聞[き]きました}。', id: 'Saya dengar toko itu murah dan enak.' },
        { jp: '京都[きょうと]は、秋[あき]がきれいだ{って聞[き]きました}。', id: 'Katanya Kyoto indah kalau musim gugur.' },
        { jp: '田中[たなか]さんは、あしたは来[こ]ない{って言[い]っていました}。', id: 'Tanaka-san bilang besok dia tidak datang.' },
        { jp: 'リナさんが、この映画[えいが]はおもしろい{って言[い]ってました}。', id: 'Rina bilang film ini menarik.' },
        { jp: 'A：このへんの海[うみ]は、きれいですか。\nB：ええ。夏[なつ]は、人[ひと]が多[おお]い{って聞[き]きました}。', id: 'A: Lautnya di sekitar sini bagus?\nB: Ya. Katanya kalau musim panas banyak orang.' }
      ],
      awas: [
        '聞[き]く bisa “mendengar” atau “bertanya”. Di pola ini artinya “**mendengar (kabar)**”, bukan bertanya.',
        'Jangan lupa **だ** untuk kata benda dan kata sifat-な: ×便利[べんり]って聞[き]きました → ○便利[べんり]だって聞[き]きました.'
      ],
      kw: 'katanya dengar kabar dia bilang menyampaikan'
    },
    {
      name: '【疑問詞[ぎもんし]】V-たらいいですか',
      short: 'たらいいですか',
      arti: 'sebaiknya (bagaimana / kapan / di mana) ~?',
      inti: 'Pakai ini untuk **meminta saran**: “sebaiknya bagaimana / kapan / ke mana?”.',
      rumus: [['Kata tanya', '+', 'V-た', '+', '=らいいですか']],
      rumusNote: 'Kata tanya: 何[なに]で, いつ, どこで, どうやって, 何時[なんじ]に …',
      jelas: [
        '**V-たらいいですか** = “sebaiknya … bagaimana?”. Dipakai saat **bingung dan butuh saran** dari orang lain.',
        'Rumusnya: **V-た** (bentuk lampau) + **ら** + いいですか: 行[い]った + ら → 行[い]っ{たらいいですか}.',
        'Kata tanya yang sering dipakai: 何[なに]で (pakai apa), いつ (kapan), どこで (di mana), どうやって (bagaimana caranya), 何時[なんじ]に (jam berapa).',
        'Jawabannya biasanya **saran**: 「バスで行[い]ったらいいですよ」 = “sebaiknya naik bus”.'
      ],
      contoh: [
        { jp: '駅[えき]まで、何[なに]で{行[い]ったらいいですか}。', id: 'Ke stasiun sebaiknya naik apa?' },
        { jp: 'パスポートは、いつ{出[だ]したらいいですか}。', id: 'Paspor sebaiknya diserahkan kapan?' },
        { jp: 'このお土産[みやげ]は、どこで{買[か]ったらいいですか}。', id: 'Oleh-oleh ini sebaiknya dibeli di mana?' },
        { jp: '日本語[にほんご]は、どうやって{勉強[べんきょう]したらいいですか}。', id: 'Bahasa Jepang sebaiknya dipelajari dengan cara apa?' },
        { jp: 'A：あした、何時[なんじ]に{来[き]たらいいですか}。\nB：九時[くじ]に来[き]てください。', id: 'A: Besok sebaiknya datang jam berapa?\nB: Tolong datang jam sembilan.' }
      ],
      awas: [
        'Pakai **V-た + ら** (bukan bentuk kamus): ×行[い]くらいいですか → ○行[い]ったらいいですか.',
        'Pola ini untuk **meminta saran**. Untuk meminta izin (“boleh … ?”) pakai pola lain (V-てもいいですか).'
      ],
      kw: 'sebaiknya bagaimana minta saran kapan di mana'
    },
    {
      name: 'V-たほうがいいです／V-ないほうがいいです',
      short: 'ほうがいい',
      arti: 'sebaiknya ~ / sebaiknya tidak ~',
      inti: 'Pakai ini untuk **memberi saran**: “sebaiknya …” atau “sebaiknya tidak …”.',
      rumus: [['V-た', '+', '=ほうがいいです'], ['V-ない', '+', '=ほうがいいです']],
      rumusNote: 'Sebelum ほう pakai **V-た** atau **V-ない** (bukan bentuk kamus atau ます)',
      jelas: [
        '**V-た＋ほうがいいです** = “sebaiknya …”: 「早[はや]く寝[ね]{たほうがいい}です」 = “sebaiknya tidur cepat”.',
        '**V-ない＋ほうがいいです** = “sebaiknya **tidak** …”: 「たくさん食[た]べ{ないほうがいい}です」.',
        'Untuk saran positif pakai **bentuk た**, walaupun artinya soal yang akan datang: 行[い]っ{たほうがいい} (sebaiknya pergi).',
        'Biasanya ditutup よ supaya terdengar ramah: 「行[い]ったほうがいいですよ」.'
      ],
      contoh: [
        { jp: '雨[あめ]ですから、かさを持[も]って行[い]っ{たほうがいい}ですよ。', id: 'Karena hujan, sebaiknya bawa payung lho.' },
        { jp: '疲[つか]れていますね。きょうは、早[はや]く寝[ね]{たほうがいい}ですよ。', id: 'Kamu kelihatan capek. Hari ini sebaiknya tidur cepat.' },
        { jp: '夜[よる]は、コーヒーを飲[の]ま{ないほうがいい}ですよ。', id: 'Malam hari sebaiknya jangan minum kopi.' },
        { jp: '人気[にんき]の店[みせ]ですから、予約[よやく]し{たほうがいい}ですよ。', id: 'Karena toko ini populer, sebaiknya reservasi lho.' },
        { jp: 'A：あしたは日曜日[にちようび]ですね。バスで行[い]きましょうか。\nB：日曜日[にちようび]は、バスが混[こ]みます。電車[でんしゃ]で行[い]っ{たほうがいい}ですよ。', id: 'A: Besok hari Minggu ya. Naik bus saja?\nB: Hari Minggu bus penuh. Sebaiknya naik kereta lho.' }
      ],
      awas: [
        'Jangan pakai bentuk kamus untuk saran positif: ×行[い]くほうがいいです → ○行[い]ったほうがいいです. (Negatif tetap ない: 行[い]かないほうがいいです.)',
        'Ke atasan atau guru, saran langsung bisa terdengar menyuruh. Lembutkan dengan よ dan nada ramah, atau pakai kalimat tanya.'
      ],
      kw: 'sebaiknya saran anjuran sebaiknya tidak'
    }
  ]
});
