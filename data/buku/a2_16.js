/* data/buku/a2_16.js — Buku Bunpou Irodori A2 (初級1) · Bab 16
   Penanda & aturan: lihat kepala a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧, Japan Foundation): ❶–❹ */
FC.defineBuku('a2', {
  n: 16,
  title: '食[た]べすぎないようにしています',
  arti: 'Saya berusaha tidak makan terlalu banyak',
  topic: '健康[けんこう]な生活[せいかつ]',
  topicArti: 'Hidup sehat',
  bisa: [
    'Memberi saran kalau temanmu kurang sehat',
    'Menceritakan hal yang kamu jaga demi kesehatan',
    'Memahami berita dan poster pencegahan penyakit'
  ],
  pola: [
    {
      name: 'V-るといいです（よ）', short: 'るといい', arti: 'sebaiknya ~ / bagus kalau ~ (saran)',
      inti: 'Memberi **saran ringan** kepada teman atau rekan: “lebih baik kalau ~”.',
      rumus: [['V-る', '+', '=といいです（よ）']],
      rumusNote: 'V-る = bentuk kamus · よ di akhir membuat saran terasa ramah',
      jelas: [
        '**V-る＋といいです** = “sebaiknya ~”. Sering muncul dengan ～ときは: 「眠[ねむ]れないときは、～{といいです}よ」.',
        'Akhiran **よ** membuat saran terasa bersahabat.'
      ],
      contoh: [
        { jp: 'かぜをひいたときは、早[はや]く寝[ね]る{といいですよ}。', id: 'Kalau masuk angin, sebaiknya tidur lebih awal.' },
        { jp: '頭[あたま]が痛[いた]いときは、薬[くすり]を飲[の]む{といいですよ}。', id: 'Kalau kepala sakit, sebaiknya minum obat.' },
        { jp: '疲[つか]れたときは、少[すこ]し休[やす]む{といいです}。', id: 'Kalau lelah, sebaiknya istirahat sebentar.' },
        { jp: '日本語[にほんご]は、毎日[まいにち]少[すこ]しずつ勉強[べんきょう]する{といいですよ}。', id: 'Bahasa Jepang sebaiknya dipelajari sedikit-sedikit setiap hari.' }
      ],
      awas: [
        'Ini **saran**, bukan perintah. Ke atasan, saran langsung bisa terasa menggurui; lebih aman bertanya atau menawarkan.'
      ],
      kw: 'sebaiknya saran anjuran bagus kalau'
    },
    {
      name: 'V-すぎます', short: 'すぎます', arti: '~ terlalu banyak / berlebihan',
      inti: 'Menyatakan tindakan yang **melampaui batas wajar**, biasanya kurang baik.',
      rumus: [['V-ます', '+', '=すぎます']],
      rumusNote: 'V-ます = bentuk ます tanpa ます · berubah seperti Kel. 2: すぎました／すぎて',
      jelas: [
        '**V-すぎます** = “~ terlalu banyak”. Berbeda dengan とても／すごく yang sekadar “sangat”, すぎます terasa **berlebihan**.',
        'Bonus: kata sifat juga bisa: 高[たか]すぎます (terlalu mahal), 静[しず]かすぎます (terlalu sepi).'
      ],
      contoh: [
        { jp: '昨日[きのう]、飲[の]み{すぎました}。', id: 'Kemarin saya minum terlalu banyak.' },
        { jp: '昨日[きのう]は、夜[よる]遅[おそ]くまでゲームをし{すぎました}。', id: 'Kemarin saya main game terlalu larut malam.' },
        { jp: '最近[さいきん]、働[はたら]き{すぎ}て、疲[つか]れています。', id: 'Akhir-akhir ini saya kerja berlebihan, jadi lelah.' },
        { jp: '食[た]べ{すぎ}て、おなかが痛[いた]いです。', id: 'Saya makan kebanyakan, jadi perut sakit.' }
      ],
      awas: [
        'すぎます bukan pujian: ia bernada **“kelewat batas”**, jadi biasanya negatif.'
      ],
      kw: 'terlalu berlebihan kebanyakan kelewat'
    },
    {
      name: 'V1-たり、V2-たり（します）', short: 'たり～たり', arti: 'kadang ~, kadang ~ (menyebut contoh kegiatan)',
      inti: 'Menyebut **beberapa contoh** kegiatan, tidak semuanya, tanpa urutan tertentu.',
      rumus: [['V1-た', '+', '=り、', '+', 'V2-た', '+', '=り', '+', '=します']],
      rumusNote: 'V-た + り · kalimat ditutup します／しています／しました',
      jelas: [
        '**V1-たり、V2-たり します** = “kadang ~, kadang ~”. Bisa dua kegiatan atau lebih, atau dua kegiatan yang berlawanan.',
        'Berbeda dengan V-て、V-ます (Bab 2) yang menyebut kegiatan **berurutan**; ～たり～たり hanya contoh.'
      ],
      contoh: [
        { jp: '休[やす]みの日[ひ]は、本[ほん]を読[よ]ん{だり}、映画[えいが]を見[み]{たり}します。', id: 'Hari libur, saya membaca buku, menonton film, dan sebagainya.' },
        { jp: '週末[しゅうまつ]は、友[とも]だちに会[あ]っ{たり}、買[か]い物[もの]に行[い]っ{たり}します。', id: 'Akhir pekan, saya bertemu teman, belanja, dan sebagainya.' },
        { jp: '健康[けんこう]のために、歩[ある]い{たり}、泳[およ]い{だり}しています。', id: 'Demi kesehatan, saya berjalan, berenang, dan sebagainya.' },
        { jp: '夜[よる]、眠[ねむ]れなくて、起[お]き{たり}寝[ね]{たり}します。', id: 'Malam hari saya tidak bisa tidur, jadi bangun lalu tidur lagi.' }
      ],
      awas: [
        'Jangan lupa menutup dengan します: ×本[ほん]を読[よ]んだり、映画[えいが]を見[み]たり.',
        'Tiap kata kerja harus **V-たり**: ×読[よ]んで、見[み]たりします.'
      ],
      kw: 'kadang contoh kegiatan beberapa dan sebagainya'
    },
    {
      name: 'V-るようにしています／V-ないようにしています', short: 'ようにする', arti: 'berusaha (terus) ~ / berusaha tidak ~',
      inti: 'Menyatakan **usaha atau kebiasaan** yang dijaga, biasanya demi kesehatan.',
      rumus: [['V-る', '+', '=ようにしています'], ['V-ない', '+', '=ようにしています']],
      rumusNote: 'Kata pendukung: できるだけ・なるべく・毎日[まいにち]・いつも',
      jelas: [
        '**V-る／V-ない＋ようにしています** = “saya berusaha (terus) ~ / tidak ~”.',
        'Menunjukkan kebiasaan yang kamu jaga dengan sengaja.'
      ],
      contoh: [
        { jp: '野菜[やさい]をたくさん食[た]べる{ようにしています}。', id: 'Saya berusaha makan banyak sayur.' },
        { jp: '夜[よる]は、早[はや]く寝[ね]る{ようにしています}。', id: 'Malam hari saya berusaha tidur lebih awal.' },
        { jp: '健康[けんこう]のために、食[た]べすぎない{ようにしています}。', id: 'Demi kesehatan, saya berusaha tidak makan berlebihan.' },
        { jp: '甘[あま]い物[もの]は、あまり食[た]べない{ようにしています}。', id: 'Saya berusaha tidak terlalu banyak makan yang manis.' }
      ],
      awas: [
        'Bedakan: ～ようにしています (aku **berusaha**), ～ようになりました (A2.2 Bab 17: sekarang **jadi bisa**), ～ようにしてください (A2.2 Bab 16: tolong **usahakan**).'
      ],
      kw: 'berusaha kebiasaan menjaga kesehatan berusaha tidak'
    }
  ]
});
