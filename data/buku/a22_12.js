/* =====================================================================
   data/buku/a22_12.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 12
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧): ➊ V-るまで ➋ V-やすいです／V-にくいです
   ➌ N1とN2（と）、どちら／どっちが～か？／（N1より）N2のほうが.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 12,
  title: 'この掃除機[そうじき]は軽[かる]くて動[うご]かしやすいですよ',
  arti: 'Penyedot debu ini ringan dan mudah digerakkan lho',
  topic: '上手[じょうず]な買[か]い物[もの]',
  topicArti: 'Belanja dengan cerdas',
  bisa: [
    'Bilang “sampai …” untuk batas berupa kejadian, misalnya sampai barang tiba',
    'Menilai barang: “mudah dipakai”, “sulit dibaca”',
    'Membandingkan dua barang: “yang mana lebih …?”',
    'Memberi rekomendasi: “yang ini lebih ringan daripada yang itu”'
  ],
  pola: [
    {
      name: 'V-るまで、～',
      short: 'るまで',
      arti: 'sampai ~ (kejadian)',
      inti: 'Pakai ini untuk bilang **“sampai (suatu kejadian terjadi)”**: batas akhir berupa kejadian atau kegiatan.',
      rumus: [['V-る', '+', '=まで', '、', 'Kegiatan yang berlanjut']],
      rumusNote: 'V-る = bentuk kamus · bandingkan: N＋まで = sampai N',
      jelas: [
        '**V-るまで** = “sampai (kejadian) …”: 「バスが来[く]る{まで}、ここで待[ま]ちます」 = “saya menunggu di sini sampai busnya datang”.',
        'まで menunjukkan **batas akhir** dari kegiatan yang **berlangsung terus** di bagian belakang: 待[ま]つ (menunggu), 働[はたら]く (bekerja), かかる (memakan waktu), 寝[ね]る (tidur).',
        'Sebelum まで dipakai **bentuk kamus**, karena pada saat kegiatan di belakang berlangsung, kejadian di depan **belum terjadi**. Walau ceritanya sudah lampau, tetap V-る: 「届[とど]く{まで}、三日[みっか]かかりました」.',
        'Untuk kata benda: **Nまで** (駅[えき]まで = sampai stasiun). Untuk kejadian pakai **V-るまで**.'
      ],
      contoh: [
        { jp: 'バスが来[く]る{まで}、ここで待[ま]ちましょう。', id: 'Mari tunggu di sini sampai busnya datang.' },
        { jp: 'お店[みせ]が開[あ]く{まで}、一時間[いちじかん]ぐらいかかります。', id: 'Sampai tokonya buka, butuh sekitar satu jam.' },
        { jp: '日本語[にほんご]が話[はな]せる{まで}、毎日[まいにち]勉強[べんきょう]します。', id: 'Sampai bisa berbicara bahasa Jepang, saya belajar setiap hari.' },
        { jp: '父[ちち]が寝[ね]る{まで}、静[しず]かにしていました。', id: 'Sampai ayah tidur, saya diam-diam.' },
        { jp: 'A：荷物[にもつ]は、いつ届[とど]きますか。\nB：注文[ちゅうもん]してから届[とど]く{まで}、三日[みっか]ぐらいかかります。', id: 'A: Kapan paketnya sampai?\nB: Dari pemesanan sampai tiba, butuh sekitar tiga hari.' },
        { jp: '値段[ねだん]が安[やす]くなる{まで}、買[か]うのをやめます。', id: 'Saya tunda membeli sampai harganya turun.' }
      ],
      awas: [
        'Sebelum まで pakai **bentuk kamus**, bukan lampau: ×届[とど]いたまで → ○届[とど]くまで.',
        'まで = “sampai (terus-menerus)”, bukan “sebelum (batas waktu)”. “Harus selesai sebelum jam 5” memakai までに. まで dipakai untuk kegiatan yang **berlangsung terus** sampai titik itu.',
        'Jangan pakai bentuk sopan: ×来[き]ますまで → ○来[く]るまで.'
      ],
      kw: 'sampai batas akhir menunggu sampai まで kejadian'
    },
    {
      name: 'V-やすいです／V-にくいです',
      short: 'やすい／にくい',
      arti: 'mudah ~ / sulit ~',
      inti: 'Tempelkan **やすい** (mudah) atau **にくい** (sulit) pada kata kerja untuk menilai **seberapa gampang** sesuatu dipakai, dimakan, atau dibaca.',
      rumus: [['V (bentuk ます tanpa ます)', '+', '=やすいです'], ['V (bentuk ます tanpa ます)', '+', '=にくいです']],
      rumusNote: 'Hasilnya berperilaku seperti sifat-い (やすかった, にくくない)',
      tabel: [{
        judul: 'Cara membentuk',
        kepala: ['Kamus', 'V-やすい', 'V-にくい'],
        baris: [
          ['使[つか]う', '使[つか]いやすい', '使[つか]いにくい'],
          ['読[よ]む', '読[よ]みやすい', '読[よ]みにくい'],
          ['歩[ある]く', '歩[ある]きやすい', '歩[ある]きにくい'],
          ['食[た]べる', '食[た]べやすい', '食[た]べにくい'],
          ['わかる', 'わかりやすい', 'わかりにくい']
        ]
      }],
      jelas: [
        '**V-やすい** = “mudah …”, **V-にくい** = “sulit …”. Dipakai untuk menilai **sifat sebuah benda** (HP, sepatu, buku, jalan): mudah dipakai, sulit dibaca.',
        'Cara membuat: **bentuk ます** tanpa ます + やすい／にくい: 使[つか]います → 使[つか]い{やすい}.',
        'Hasilnya berperilaku seperti **sifat-い**: 使[つか]いやすいです (sekarang), 使[つか]いやすかったです (dulu), 使[つか]いにくくないです (tidak sulit), 使[つか]いやすくて (dan mudah dipakai).',
        'Bendanya ditandai **は／が**, bukan を: 「この靴[くつ]は、歩[ある]き{やすい}です」.',
        'Bisa disambung dengan bentuk て sifat-い: 「軽[かる]くて、持[も]ち{やすい}」 (ringan dan mudah dibawa).'
      ],
      contoh: [
        { jp: 'この靴[くつ]は、軽[かる]くて歩[ある]き{やすいです}。', id: 'Sepatu ini ringan dan mudah dipakai berjalan.' },
        { jp: 'この辞書[じしょ]は、字[じ]が小[ちい]さくて読[よ]み{にくいです}。', id: 'Kamus ini hurufnya kecil jadi sulit dibaca.' },
        { jp: '先生[せんせい]の説明[せつめい]は、とてもわかり{やすいです}。', id: 'Penjelasan guru sangat mudah dipahami.' },
        { jp: 'このパンは、固[かた]くて食[た]べ{にくいです}。', id: 'Roti ini keras jadi sulit dimakan.' },
        { jp: 'A：この傘[かさ]は、どうですか。\nB：軽[かる]いので、持[も]ち{やすいです}よ。', id: 'A: Payung ini bagaimana?\nB: Ringan, jadi mudah dibawa.' },
        { jp: '道[みち]が暗[くら]くて、夜[よる]は歩[ある]き{にくいです}。', id: 'Jalannya gelap, jadi sulit dilewati kalau malam.' }
      ],
      awas: [
        'Pakai **bentuk ます tanpa ます**: ×使[つか]うやすい／×使[つか]ってやすい → ○使[つか]いやすい.',
        'Bendanya ditandai は／が, bukan を: ×この靴[くつ]を歩[ある]きやすいです → ○この靴[くつ]は歩[ある]きやすいです.',
        'やすい (mudah) ≠ 安[やす]い (murah)! Artinya beda walau bunyinya sama. Lihat konteksnya.'
      ],
      kw: 'mudah sulit dipakai dibaca やすい にくい penilaian'
    },
    {
      name: 'N1とN2（と）、どちら／どっちが～か？／（N1より）N2のほうが、～',
      short: 'どっち・ほうが',
      arti: 'N1 atau N2, mana yang lebih ~? / N2 lebih ~ (daripada N1)',
      inti: 'Pola untuk **membandingkan dua hal**: bertanya “mana yang lebih …?” dan menjawab “… yang lebih …”.',
      rumus: [
        ['N1', '=と', 'N2', '=（と）', '、', '=どちら／どっち', '=が', 'A', 'ですか？'],
        ['（N1', '=より）', 'N2', '=のほうが', 'A', 'です']
      ],
      rumusNote: 'どっち = どちら (lebih santai) · ほう = “pihak／sisi” · より = “daripada”',
      tabel: [{
        judul: 'Tanya dan jawab',
        kepala: ['Tanya', 'Jawab'],
        baris: [
          ['バスと電車[でんしゃ]と、どちらが速[はや]いですか', '電車[でんしゃ]のほうが速[はや]いです'],
          ['この店[みせ]とあの店[みせ]と、どっちが安[やす]いですか', 'あの店[みせ]のほうが安[やす]いです'],
          ['りんごとみかんと、どちらが好[す]きですか', 'みかんのほうが好[す]きです']
        ]
      }],
      jelas: [
        '**Bertanya**: 「N1とN2と、**どちら／どっち**が～ですか」 = “N1 dan N2, mana yang lebih ~?”. **どっち** lebih santai daripada どちら.',
        '**Menjawab**: 「**N2のほう**が～です」 = “yang N2 lebih ~”. Untuk memperjelas, tambahkan **N1より**: 「N1より、N2のほうが～です」 = “N2 lebih ~ daripada N1”.',
        '**ほう** = “pihak／sisi”. **の** wajib: ○こっち**の**ほうが, ×こっちほうが.',
        'Yang dibandingkan **dua hal**. Kalau tiga atau lebih (“yang paling …”), pakai いちばん.',
        'Kalau kedua-duanya sama: どちらも～です (dua-duanya ~) atau 同[おな]じです (sama).'
      ],
      contoh: [
        { jp: '電車[でんしゃ]とバスと、{どちらが}便利[べんり]ですか。', id: 'Kereta dan bus, mana yang lebih praktis?' },
        { jp: '{バスより}、電車[でんしゃ]{のほうが}便利[べんり]です。', id: 'Kereta lebih praktis daripada bus.' },
        { jp: 'この傘[かさ]とあの傘[かさ]と、{どっちが}軽[かる]いですか。', id: 'Payung ini dan payung itu, mana yang lebih ringan?' },
        { jp: 'こっち{のほうが}、あっちより安[やす]いですよ。', id: 'Yang ini lebih murah daripada yang di sana lho.' },
        { jp: 'A：ラーメンとうどんと、{どちらが}好[す]きですか。\nB：うどん{のほうが}好[す]きです。', id: 'A: Ramen dan udon, kamu lebih suka yang mana?\nB: Saya lebih suka udon.' },
        { jp: 'A：この二[ふた]つ、{どっちが}使[つか]いやすいですか。\nB：{こっちのほうが}、使[つか]いやすいですよ。', id: 'A: Dari dua ini, mana yang lebih mudah dipakai?\nB: Yang ini lebih mudah dipakai.' }
      ],
      awas: [
        'Jangan lupakan **の**: ×こっちほうが → ○こっちのほうが.',
        'Perhatikan urutan: 「バスより電車[でんしゃ]のほうが速[はや]い」 = kereta lebih cepat. Kalau terbalik (電車[でんしゃ]よりバスのほうが速[はや]い), artinya juga terbalik.',
        'Jawaban “mana yang lebih” memakai **ほうが**; jangan pakai いちばん (paling).'
      ],
      kw: 'membandingkan mana yang lebih daripada どちら どっち ほうが より dua benda'
    }
  ]
});
