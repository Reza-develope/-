/* =====================================================================
   data/buku/a22_14.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 14
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧, Japan Foundation): ❶〜❷.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 14,
  title: '前髪[まえがみ]は、もう少[すこ]し短[みじか]く切[き]ってもらえますか？',
  arti: 'Bisa tolong potongkan poninya sedikit lebih pendek?',
  topic: 'さまざまなサービス',
  topicArti: 'Berbagai layanan',
  bisa: [
    'Menyampaikan hasil yang kamu inginkan di salon atau tukang cukur: “potong pendek”, “buat rapi”',
    'Meminta layanan dilakukan dengan cara tertentu: “tolong tulis lebih besar”, “tolong cuci bersih”',
    'Mengatakan sesuatu dibuat “untuk siapa”: “untuk orang asing, ada layanan …”',
    'Memahami penjelasan tentang layanan umum seperti paket, laundry, dan kantor pos'
  ],
  pola: [
    {
      name: 'ナA-に／イA-く V',
      short: 'く／に＋V',
      arti: '(melakukan) dengan cara ~ / sampai jadi ~',
      inti: 'Ubah kata sifat jadi **keterangan** untuk kata kerja: sifat-い → **く**, sifat-な → **に**. Dipakai untuk bilang **cara** atau **hasil** yang kamu mau.',
      rumus: [['イA-い', '→', 'イA-', '=く', '+', 'V'], ['ナA-な', '→', 'ナA-', '=に', '+', 'V']],
      rumusNote: 'V = kata kerja yang diterangkan (切[き]る, 書[か]く, 洗[あら]う …)',
      tabel: [{
        judul: 'Mengubah kata sifat',
        kepala: ['Jenis', 'Biasa', 'Keterangan'],
        baris: [
          ['Sifat-い', '短[みじか]い', '短[みじか]く'],
          ['Sifat-い', '大[おお]きい', '大[おお]きく'],
          ['Sifat-い', 'いい', 'よく'],
          ['Sifat-な', 'きれい（な）', 'きれいに'],
          ['Sifat-な', '静[しず]か（な）', '静[しず]かに']
        ]
      }],
      jelas: [
        'Sifat-い: buang **い**, ganti **く** (短[みじか]い → 短[みじか]**く**). Sifat-な: ganti **な** jadi **に** (きれい → きれい**に**). Hasilnya dipasang di depan kata kerja.',
        'Dua fungsi: **cara** melakukan (「上手[じょうず]に話[はな]す」 = berbicara dengan pandai) dan **hasil** yang diinginkan (「髪[かみ]を短[みじか]{く}切[き]る」 = memotong rambut sampai pendek).',
        'Cocok untuk **meminta** sesuatu di salon, toko, atau layanan lain: 「もう少[すこ]し短[みじか]{く}切[き]ってください」.',
        '**いい** berubah jadi **よく** (bukan ×いく): 「よく洗[あら]ってください」 = “tolong cuci dengan bersih”.',
        'Lihat judul bab ini: 「短[みじか]く切[き]ってもらえますか」 = “bisa tolong potongkan (jadi) pendek?”. 短[みじか]く adalah pola ini; ～てもらえますか (meminta tolong) dibahas di Bab 18.'
      ],
      contoh: [
        { jp: '髪[かみ]を、短[みじか]{く}切[き]ってください。', id: 'Tolong potong rambutnya pendek.' },
        { jp: '部屋[へや]を、きれい{に}掃除[そうじ]しました。', id: 'Saya membersihkan kamar sampai bersih.' },
        { jp: 'もう少[すこ]し、大[おお]き{く}書[か]いてください。', id: 'Tolong tulis sedikit lebih besar.' },
        { jp: 'このシャツは、{よく}洗[あら]ってから、干[ほ]してください。', id: 'Kemeja ini, tolong dicuci bersih dulu, baru dijemur.' },
        { jp: '夜[よる]は、静[しず]か{に}してください。', id: 'Malam hari, tolong tenang.' },
        { jp: 'A：どのくらい切[き]りますか。\nB：五[ご]センチぐらい、短[みじか]{く}切[き]ってください。', id: 'A: Dipotong sekitar berapa?\nB: Tolong potong pendek sekitar lima senti.' }
      ],
      awas: [
        'Sifat-い pakai **く**, sifat-な pakai **に**. Jangan tertukar: ×きれいく, ×短[みじか]に.',
        'Bedakan dengan bentuk **て** (Bab 1): 「大[おお]きくて、おいしい」 = “besar **dan** enak” (menyambung sifat). 「大[おお]きく切[き]る」 = “memotong **dengan ukuran besar**” (menerangkan kata kerja).'
      ],
      kw: 'cara hasil keterangan sifat adjektiva menjadi pendek besar bersih potong rambut salon'
    },
    {
      name: 'Nのために、～',
      short: 'のために',
      arti: 'untuk (kepentingan) N / demi N',
      inti: 'Pakai ini untuk bilang **siapa atau apa yang dituju**: “untuk N”, “demi N”.',
      rumus: [['N', '+', '=の', '+', '=ために', '、', 'Hal yang dilakukan / disediakan']],
      rumusNote: 'N = orang yang diuntungkan atau hal yang dituju',
      jelas: [
        '**N＋の＋ために** = “untuk N / demi N”. **の** tidak boleh hilang: 「家族[かぞく]{のために}」.',
        'N bisa **orang** yang diuntungkan (「子[こ]ども{のために}本[ほん]を買[か]う」) atau **hal yang dituju** (「健康[けんこう]{のために}歩[ある]く」).',
        'Setelahnya menyebut **apa yang dilakukan atau disediakan** untuk N: ～があります, ～を作[つく]ります, ～をします.',
        'Untuk menerangkan benda, pakai **Nのための＋benda**: 「外国人[がいこくじん]{のための}サービス」 = “layanan untuk orang asing”.'
      ],
      contoh: [
        { jp: '外国人[がいこくじん]{のために}、英語[えいご]の案内[あんない]を作[つく]りました。', id: 'Saya membuat panduan bahasa Inggris untuk orang asing.' },
        { jp: '家族[かぞく]{のために}、毎日[まいにち]ご飯[はん]を作[つく]ります。', id: 'Saya memasak setiap hari untuk keluarga.' },
        { jp: '健康[けんこう]{のために}、毎朝[まいあさ]、少[すこ]し歩[ある]いています。', id: 'Demi kesehatan, setiap pagi saya berjalan sedikit.' },
        { jp: '子[こ]ども{のために}、新[あたら]しい本[ほん]を買[か]いました。', id: 'Saya membeli buku baru untuk anak.' },
        { jp: '留学生[りゅうがくせい]{のために}、日本語[にほんご]のクラスがあります。', id: 'Untuk pelajar asing, ada kelas bahasa Jepang.' }
      ],
      awas: [
        'Jangan lupa **の**: ×家族[かぞく]ために → ○家族[かぞく]{の}ために.',
        'Untuk **tindakan** (“untuk makan”, “untuk belajar”), pakai **V-るために** (Bab 18), bukan Nのために. N = benda / orang, V = tindakan.'
      ],
      kw: 'untuk demi tujuan kepentingan manfaat orang yang dituju layanan'
    }
  ]
});
