/* data/buku/a2_15.js — Buku Bunpou Irodori A2 (初級1) · Bab 15
   Penanda & aturan: lihat kepala a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧, Japan Foundation): ❶–❺ */
FC.defineBuku('a2', {
  n: 15,
  title: '熱[ねつ]があってのどが痛[いた]いんです',
  arti: 'Saya demam dan tenggorokan sakit',
  topic: '健康[けんこう]な生活[せいかつ]',
  topicArti: 'Hidup sehat',
  bisa: [
    'Menjelaskan gejala sakit kepada dokter',
    'Memahami petunjuk dokter dan apoteker',
    'Mengisi formulir pemeriksaan di rumah sakit',
    'Memahami aturan minum obat'
  ],
  pola: [
    {
      name: '～んです ②', short: 'んです②', arti: 'menjelaskan keadaan atau gejala (mis. ke dokter)',
      inti: 'Dipakai untuk **menjelaskan keadaan atau gejala** yang menjadi alasan kamu datang atau bicara.',
      rumus: [['V／イA（bentuk biasa）', '+', '=んです'], ['ナA／N', '+', '=なんです']],
      rumusNote: 'Rumus sama dengan ～んです ① (Bab 14) · ナA／N memakai な',
      jelas: [
        'Saat dokter bertanya 「どうしましたか」, jawab dengan **gejala＋んです**: 「のどが痛[いた]い{んです}」.',
        'Gejala yang berlangsung sejak kemarin bisa disambung dengan ～て: 「熱[ねつ]があっ{て}、のどが痛[いた]い{んです}」.',
        'Bedanya dengan ① hanya situasinya: di sini untuk menjelaskan **kondisi tubuh**.'
      ],
      contoh: [
        { jp: '昨日[きのう]から熱[ねつ]があって、のどが痛[いた]い{んです}。', id: 'Sejak kemarin saya demam dan tenggorokan sakit.' },
        { jp: 'せきが止[と]まらない{んです}。', id: 'Batuk saya tidak berhenti.' },
        { jp: '夜[よる]、よく眠[ねむ]れない{んです}。', id: 'Malam hari saya sulit tidur.' },
        { jp: 'おなかの調子[ちょうし]が悪[わる]い{んです}。', id: 'Kondisi perut saya kurang baik.' }
      ],
      awas: [
        '「のどが痛[いた]いです」 saja terdengar seperti laporan biasa. Di klinik, ～んです membuat penjelasan terdengar **alami dan mengajak ditanggapi**.'
      ],
      kw: 'gejala sakit dokter menjelaskan keadaan kondisi tubuh'
    },
    {
      name: 'V-ないでください', short: 'ないでください', arti: 'tolong jangan ~',
      inti: 'Meminta lawan bicara **tidak melakukan** sesuatu, misalnya nasihat dokter.',
      rumus: [['V-ない', '+', '=でください']],
      rumusNote: 'Pasangannya V-てください (tolong lakukan ~)',
      tabel: [{
        judul: 'Ingat lagi: bentuk ない',
        kepala: ['Kelompok', 'Kamus', 'ない-form'],
        baris: [
          ['Kel. 1', '飲[の]む', '飲[の]まない'],
          ['Kel. 1', '会[あ]う', '会[あ]わない'],
          ['Kel. 2', '食[た]べる', '食[た]べない'],
          ['Kel. 3', 'する', 'しない'],
          ['Kel. 3', '来[く]る', '来[こ]ない']
        ]
      }],
      jelas: [
        '**V-ない＋でください** = “tolong jangan ~”. Cocok untuk nasihat dokter, aturan tempat, atau larangan halus.',
        'Pasangannya V-てください yang meminta orang melakukan sesuatu.'
      ],
      contoh: [
        { jp: '今週[こんしゅう]は、お酒[さけ]を飲[の]ま{ないでください}。', id: 'Minggu ini tolong jangan minum alkohol.' },
        { jp: '今日[きょう]は、お風呂[ふろ]に入[はい]ら{ないでください}。', id: 'Hari ini tolong jangan mandi berendam.' },
        { jp: '夜[よる]は、コーヒーを飲[の]ま{ないでください}。', id: 'Malam hari, tolong jangan minum kopi.' },
        { jp: 'ここで、たばこを吸[す]わ{ないでください}。', id: 'Tolong jangan merokok di sini.' }
      ],
      awas: [
        'Jangan lupa **で**: ×飲[の]まないください → 飲[の]まないでください.',
        'Kel. 1 berakhiran う berubah jadi **わ**: 会[あ]う → 会[あ]わない, 吸[す]う → 吸[す]わない.'
      ],
      kw: 'tolong jangan larangan nasihat dokter ない'
    },
    {
      name: 'V（普通形[ふつうけい]）＋N ①', short: 'V＋N①', arti: 'N yang ~ (kata kerja menerangkan kata benda)',
      inti: 'Letakkan **kata kerja bentuk biasa** tepat di depan kata benda untuk menerangkannya: “obat **yang menurunkan demam**”.',
      rumus: [['V-る／V-ない', '+', 'N']],
      rumusNote: 'Bagian V memakai bentuk biasa, tanpa ます／です',
      jelas: [
        'Di bahasa Jepang, **penjelasan ditaruh di depan kata benda**: 「熱[ねつ]を{下[さ]げる}薬[くすり]」 = “obat yang menurunkan demam”.',
        'Penjelas memakai **bentuk biasa** (kamus／ない), objek tetap ditandai を.',
        'Sering dipakai untuk menjelaskan fungsi obat atau benda.'
      ],
      contoh: [
        { jp: 'これは、熱[ねつ]を{下[さ]げる}薬[くすり]です。', id: 'Ini obat yang menurunkan demam.' },
        { jp: 'これは、のどの痛[いた]みを{止[と]める}薬[くすり]です。', id: 'Ini obat yang menghentikan sakit tenggorokan.' },
        { jp: '花粉症[かふんしょう]を{抑[おさ]える}薬[くすり]はありますか。', id: 'Apakah ada obat yang meredakan alergi serbuk sari?' },
        { jp: '寝[ね]る前[まえ]に{飲[の]む}薬[くすり]は、どれですか。', id: 'Yang mana obat yang diminum sebelum tidur?' }
      ],
      awas: [
        'Jangan pakai ます di dalam penjelas: ×熱[ねつ]を下[さ]げます薬[くすり] → 熱[ねつ]を下[さ]げる薬[くすり].',
        'Urutan tidak boleh dibalik seperti bahasa Indonesia: ×薬[くすり]熱[ねつ]を下[さ]げる.'
      ],
      kw: 'penjelas kata benda yang menerangkan obat bentuk biasa'
    },
    {
      name: 'V-るまえに、～／V-たあと、～', short: 'まえに／あと', arti: 'sebelum ~ / setelah ~',
      inti: 'Menunjukkan **urutan** dua kegiatan: sebelum atau sesudah sesuatu.',
      rumus: [['V-る', '+', '=まえに、', '+', '~'], ['V-た', '+', '=あと（で）、', '+', '~']],
      rumusNote: 'まえに selalu V-る (kamus) · あと memakai V-た',
      jelas: [
        '**V-る＋まえに** = “sebelum ~”; **V-た＋あと(で)** = “setelah ~”.',
        'まえに selalu **bentuk kamus**, bahkan untuk kejadian lampau; あと memakai **V-た**.',
        'Versi kata benda: Nの前[まえ]に／Nのあと (Bab 8).'
      ],
      contoh: [
        { jp: '寝[ね]る{前[まえ]に}、薬[くすり]を飲[の]んでください。', id: 'Sebelum tidur, tolong minum obat.' },
        { jp: 'ご飯[はん]を食[た]べる{前[まえ]に}、手[て]を洗[あら]います。', id: 'Sebelum makan, saya mencuci tangan.' },
        { jp: '薬[くすり]を飲[の]ん{だあと}、運転[うんてん]しないでください。', id: 'Setelah minum obat, tolong jangan mengemudi.' },
        { jp: '仕事[しごと]が終[お]わっ{たあと}、病院[びょういん]に行[い]きます。', id: 'Setelah pekerjaan selesai, saya pergi ke rumah sakit.' }
      ],
      awas: [
        'Jangan pakai V-た di まえに: ×食[た]べた前[まえ]に → 食[た]べる前[まえ]に.',
        'Pada まえに, kegiatan di **belakang** dilakukan lebih dulu; pada あと, kegiatan di **depan** dilakukan lebih dulu.'
      ],
      kw: 'sebelum setelah urutan kegiatan sesudah'
    },
    {
      name: '～とき（に）、～', short: 'とき（に）', arti: 'saat ~ / ketika ~',
      inti: 'Menyambung situasi dengan tindakan atau keadaan yang berlaku **pada saat itu**.',
      rumus: [['V／イA-い', '+', '=とき（に）、', '+', '~'], ['ナA-な', '+', '=とき（に）、', '+', '~'], ['Nの', '+', '=とき（に）、', '+', '~']],
      rumusNote: 'V／イA memakai bentuk biasa · ナA＋な · N＋の · に boleh dihilangkan',
      jelas: [
        '**～とき（に）** = “saat ~”. V／イA pakai bentuk biasa; **ナA＋な**; **N＋の**: 「元気[げんき]な{とき}」「子[こ]どもの{とき}」.',
        'V-る = belum atau sedang akan terjadi, V-た = sudah terjadi: 日本[にほん]に来[く]る{とき} (saat hendak datang) vs 来[き]た{とき} (saat sudah datang).'
      ],
      contoh: [
        { jp: '熱[ねつ]が高[たか]い{とき}は、お風呂[ふろ]に入[はい]らないでください。', id: 'Saat demam tinggi, tolong jangan mandi berendam.' },
        { jp: '眠[ねむ]れない{とき}に、この薬[くすり]を飲[の]んでください。', id: 'Saat tidak bisa tidur, tolong minum obat ini.' },
        { jp: '元気[げんき]な{とき}は、毎日[まいにち]走[はし]ります。', id: 'Saat sehat, saya berlari setiap hari.' },
        { jp: '子[こ]どもの{とき}、よく病気[びょうき]になりました。', id: 'Waktu kecil, saya sering sakit.' }
      ],
      awas: [
        'Jangan tertukar: ×元気[げんき]のとき, ×子[こ]どもなとき. **ナA＋な／N＋の**.'
      ],
      kw: 'saat ketika waktu kondisi tertentu'
    }
  ]
});
