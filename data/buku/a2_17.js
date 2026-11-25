/* data/buku/a2_17.js — Buku Bunpou Irodori A2 (初級1) · Bab 17
   Penanda & aturan: lihat kepala a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧, Japan Foundation): ❶–❸ */
FC.defineBuku('a2', {
  n: 17,
  title: '兄[あに]がくれたお守[まも]りです',
  arti: 'Ini jimat pemberian kakak laki-lakiku',
  topic: '交際[こうさい]',
  topicArti: 'Hubungan antarpribadi',
  bisa: [
    'Menyapa dan menyerahkan oleh-oleh saat bertamu ke rumah orang',
    'Menjelaskan barang milikmu: dari mana dan dari siapa',
    'Menulis email singkat ucapan terima kasih'
  ],
  pola: [
    {
      name: 'V（普通形[ふつうけい]）＋N ②', short: 'V＋N②', arti: 'N yang sudah ~ / N yang sedang ~',
      inti: 'Lanjutan Bab 15: kata kerja bentuk **lampau (V-た)** dan **sedang berlangsung (V-ている)** juga bisa menerangkan kata benda.',
      rumus: [['V-た／V-ている', '+', 'N']],
      rumusNote: 'Cara kerjanya sama dengan Bab 15: penjelas di depan, kata benda di belakang',
      jelas: [
        '**Penjelas di depan, kata benda di belakang**: 「インドネシアから{持[も]って来[き]た}お菓子[かし]」 = “kue yang dibawa dari Indonesia”.',
        'Lihat bentuk kata kerjanya: **V-た** = sesuatu yang sudah terjadi; **V-ている** = sesuatu yang sedang berlangsung.'
      ],
      contoh: [
        { jp: 'これは、インドネシアから{持[も]って来[き]た}お菓子[かし]です。', id: 'Ini kue yang dibawa dari Indonesia.' },
        { jp: 'これは、昨日[きのう]、{買[か]った}靴[くつ]です。', id: 'Ini sepatu yang saya beli kemarin.' },
        { jp: 'あそこで{話[はな]している}人[ひと]は、私[わたし]の先生[せんせい]です。', id: 'Orang yang sedang bicara di sana adalah guru saya.' },
        { jp: '赤[あか]い服[ふく]を{着[き]ている}人[ひと]が、ミロさんです。', id: 'Orang yang memakai baju merah itu Miro.' }
      ],
      awas: [
        'Jangan pakai ます／ました di depan kata benda: ×持[も]って来[き]ましたお菓子[かし] → 持[も]って来[き]たお菓子[かし].',
        'Jangan menambah の: ×買[か]ったの靴[くつ].'
      ],
      kw: 'penjelas kata benda yang sudah lampau sedang berlangsung'
    },
    {
      name: '【人[ひと]】に【物[もの]】をもらいます', short: 'をもらいます', arti: 'menerima ~ dari ~',
      inti: 'Menyatakan bahwa **kamu (penerima)** mendapat sesuatu dari seseorang.',
      rumus: [['Pemberi', '+', '=に', '+', 'Barang', '+', '=を', '+', '=もらいます']],
      rumusNote: 'Subjek = penerima (biasanya kamu, tidak disebut) · に boleh diganti から',
      jelas: [
        '**もらいます** = “menerima”. Subjeknya **si penerima**; pemberi ditandai **に**, barang ditandai **を**.',
        'Berguna untuk menjelaskan asal barang: 「友[とも]だち{に}もらったんです」 (んです dari Bab 14).'
      ],
      contoh: [
        { jp: 'このマグカップは、誕生日[たんじょうび]に友[とも]だち{に}もらいました。', id: 'Mug ini saya dapat dari teman saat ulang tahun.' },
        { jp: '先生[せんせい]{に}、日本語[にほんご]の本[ほん]をもらいました。', id: 'Saya mendapat buku bahasa Jepang dari guru.' },
        { jp: '隣[となり]の人[ひと]{に}、野菜[やさい]をもらいました。', id: 'Saya mendapat sayur dari tetangga.' },
        { jp: '母[はは]{に}、かばんをもらいました。', id: 'Saya mendapat tas dari ibu.' }
      ],
      awas: [
        'Jangan tertukar: もらいます (menerima) ≠ あげます (memberi, Bab 18).',
        'Pemberi memakai に／から, bukan で: ×友[とも]だちでもらいました.'
      ],
      kw: 'menerima mendapat dari seseorang hadiah barang'
    },
    {
      name: '【人[ひと]】が【物[もの]】をくれます', short: 'がくれます', arti: 'memberi (kepadaku / pihakku)',
      inti: 'Menyatakan bahwa **seseorang memberi sesuatu kepadamu** atau pihakmu.',
      rumus: [['Pemberi', '+', '=が', '+', 'Barang', '+', '=を', '+', '=くれます']],
      rumusNote: 'Pemberi = subjek · penerima (kamu／keluargamu) biasanya tidak disebut',
      jelas: [
        '**くれます** = “memberi (kepadaku)”. Pemberi menjadi subjek (**が**), barang ditandai **を**.',
        'Dapat dijadikan penjelas kata benda (pola ①): 「兄[あに]が{くれた}お守[まも]り」 = “jimat pemberian kakakku”.'
      ],
      contoh: [
        { jp: '友[とも]だち{が}、お土産[みやげ]をくれました。', id: 'Teman saya memberi oleh-oleh.' },
        { jp: '田中[たなか]さん{が}、日本語[にほんご]の辞書[じしょ]をくれました。', id: 'Pak Tanaka memberi saya kamus bahasa Jepang.' },
        { jp: '先生[せんせい]{が}、きれいな花[はな]をくれました。', id: 'Guru memberi saya bunga yang cantik.' },
        { jp: 'これは、兄[あに]{が}くれたお守[まも]りです。', id: 'Ini jimat pemberian kakak laki-laki saya.' }
      ],
      awas: [
        'くれます hanya untuk pemberian **kepadamu atau pihakmu**. Kalau kamu yang memberi, pakai あげます (Bab 18).'
      ],
      kw: 'memberi kepadaku pemberian dari orang lain hadiah'
    }
  ]
});
