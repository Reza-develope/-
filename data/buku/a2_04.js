/* =====================================================================
   data/buku/a2_04.js — Buku Bunpou Irodori A2 (初級1) · Bab 4
   Penanda teks: 漢字[よみ] furigana · {sorot} · **tebal** · 「kutipan Jepang」. Rumus: token berawalan "=" = bagian tetap (merah).
   Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran); daftar pola mengikuti daftar isi resmi Irodori 初級1 (文法ノート).
   ===================================================================== */
FC.defineBuku('a2', {
  n: 4,
  title: '昨日[きのう]はすごい雨[あめ]でしたね',
  arti: 'Kemarin hujannya deras sekali ya',
  topic: '季節[きせつ]と天気[てんき]',
  topicArti: 'Musim dan cuaca',
  bisa: [
    'Menyapa orang sambil membicarakan cuaca',
    'Memahami prakiraan cuaca secara garis besar',
    'Membaca unggahan singkat di media sosial tentang cuaca, misalnya topan',
    'Mengajak lawan bicara sependapat dengan akhiran ね'
  ],
  pola: [
    {
      name: 'Sね ＜共感[きょうかん]＞',
      short: 'ね（共感[きょうかん]）',
      arti: '~ ya? (mengajak sependapat)',
      inti: 'Taruh **ね** di akhir kalimat untuk **mengajak lawan bicara sependapat** atau berbagi perasaan: “~ ya?”.',
      rumus: [['S', '+', '=ね']],
      rumusNote: 'S = kalimat (bentuk sopan maupun biasa) · 共感[きょうかん] = ikut merasakan hal yang sama',
      tabel: [{
        judul: 'Jawaban yang umum untuk ～ね',
        kepala: ['Jawaban', 'Artinya', 'Dipakai saat'],
        baris: [
          ['そうですね。', 'Iya, ya.', 'setuju'],
          ['ええ、本当[ほんとう]ですね。', 'Ya, benar sekali.', 'setuju sambil menekankan'],
          ['そうですか。', 'Oh, begitu.', 'baru tahu / belum merasakan sendiri']
        ]
      }],
      jelas: [
        '**ね** bukan pertanyaan sungguhan. Ia mengajak lawan bicara **setuju** dengan perasaanmu atau hal yang sama-sama kalian lihat: 「今日[きょう]は、暑[あつ]いです{ね}」 = “Hari ini panas ya”.',
        'Sering dipakai sebagai **basa-basi** pembuka obrolan. Orang Jepang suka menyapa sambil membahas cuaca.',
        'Pakai ketika kamu dan lawan bicara sama-sama bisa merasakan atau melihat hal itu (cuaca hari ini, makanan di depan kalian).',
        'Boleh dipakai dengan bentuk sopan maupun biasa: 「暑[あつ]いです{ね}」, 「暑[あつ]い{ね}」 (akrab).'
      ],
      contoh: [
        { jp: '寒[さむ]い朝[あさ]です{ね}。', id: 'Pagi yang dingin ya.' },
        { jp: '最近[さいきん]、雨[あめ]が多[おお]いです{ね}。', id: 'Akhir-akhir ini hujannya banyak ya.' },
        { jp: '桜[さくら]が、とてもきれいです{ね}。', id: 'Sakuranya cantik sekali ya.' },
        { jp: '今日[きょう]は、風[かぜ]が強[つよ]いです{ね}。', id: 'Hari ini anginnya kencang ya.' },
        { jp: 'A：今日[きょう]は、すずしいです{ね}。\nB：ええ、本当[ほんとう]に、すずしいです{ね}。', id: 'A: Hari ini sejuk ya.\nB: Iya, benar-benar sejuk ya.' }
      ],
      awas: [
        'Jangan pakai ね untuk hal yang **hanya kamu yang tahu** atau untuk mengabari sesuatu yang baru. Untuk memberi tahu, pakai よ (lihat A2.2 Bab 2).',
        'Dengan nada naik ↗, ね juga bisa berarti memastikan (“…, kan?”): 「あしたは休[やす]みです{ね}？」. Arti ini berbeda dari ね “ikut merasakan”.'
      ],
      kw: 'ya kan sepakat ね basa-basi cuaca menyapa berbagi perasaan'
    },
    {
      name: '非過去[ひかこ]・過去[かこ]',
      short: '非過去[ひかこ]・過去[かこ]',
      arti: 'bentuk sekarang / akan datang dan bentuk lampau',
      inti: 'Kata benda dan kata sifat juga punya **bentuk lampau**. Pilih bentuk sesuai apakah kejadiannya **sudah lewat** atau belum.',
      rumus: [['N／ナA', '+', '=でした'], ['イA-い', '→', 'イA-', '=かったです']],
      rumusNote: '非過去[ひかこ] = sekarang / akan datang / kebiasaan · 過去[かこ] = sudah lampau · いい → よかったです',
      tabel: [
        {
          judul: 'Kata benda dan sifat-な',
          kepala: ['Waktu', 'Positif', 'Negatif'],
          baris: [
            ['非過去[ひかこ]', '雨[あめ]です', '雨[あめ]じゃないです'],
            ['過去[かこ]', '雨[あめ]でした', '雨[あめ]じゃなかったです']
          ]
        },
        {
          judul: 'Sifat-い',
          kepala: ['Waktu', 'Positif', 'Negatif'],
          baris: [
            ['非過去[ひかこ]', '寒[さむ]いです', '寒[さむ]くないです'],
            ['過去[かこ]', '寒[さむ]かったです', '寒[さむ]くなかったです']
          ]
        }
      ],
      jelas: [
        'Kata benda dan sifat-な: です → **でした** (lampau). Negatif: じゃないです → **じゃなかったです**.',
        'Sifat-い: buang い, tambah **かったです**. Negatif: くないです → **くなかったです**. 「寒[さむ]い」 → 「寒[さむ]{かったです}」.',
        'Kata kerja sudah kamu kenal: ます → ました.',
        'Kata penanda waktu membantu: 昨日[きのう]・先週[せんしゅう]・去年[きょねん] → biasanya lampau. 明日[あした]・来週[らいしゅう] → bukan lampau.'
      ],
      contoh: [
        { jp: '先週[せんしゅう]の天気[てんき]は、ずっと{くもりでした}。', id: 'Cuaca minggu lalu mendung terus.' },
        { jp: '昨日[きのう]は、とても{寒[さむ]かったです}。', id: 'Kemarin dingin sekali.' },
        { jp: '昨日[きのう]の夜[よる]の景色[けしき]は、{きれいでした}。', id: 'Pemandangan semalam indah.' },
        { jp: '去年[きょねん]の夏[なつ]は、あまり{暑[あつ]くなかったです}。', id: 'Musim panas tahun lalu tidak begitu panas.' },
        { jp: 'A：旅行[りょこう]は、どうでしたか。\nB：天気[てんき]が{よかったです}。', id: 'A: Bagaimana liburannya?\nB: Cuacanya bagus.' }
      ],
      awas: [
        'Kesalahan umum pada sifat-い: ×寒[さむ]いでした → ○寒[さむ]かったです. Pada sifat-い, yang berubah adalah **kata sifatnya**, bukan です.',
        'いい → **よ**かったです／**よ**くなかったです. ×いかったです.',
        'Negatif lampau untuk kata benda dan sifat-な: ○雨[あめ]じゃなかったです, ×雨[あめ]じゃないでした.'
      ],
      kw: 'lampau masa lalu でした かったです kemarin kala waktu bentuk lampau sifat benda'
    },
    {
      name: 'V-ています ③',
      short: 'ています③',
      arti: 'sedang ~ (berlangsung sekarang)',
      inti: 'Pakai V-ています untuk menyatakan **sedang terjadi saat ini**: “sedang ~”.',
      rumus: [['V-て', '+', '=います']],
      rumusNote: 'Kata penanda: 今[いま] (sekarang), 今[いま]も (sekarang pun), ずっと (terus-menerus)',
      tabel: [{
        judul: 'Kata kerja cuaca',
        kepala: ['Kata kerja', 'V-ています', 'Artinya'],
        baris: [
          ['雨[あめ]が降[ふ]る', '雨[あめ]が降[ふ]っています', 'sedang hujan'],
          ['雪[ゆき]が降[ふ]る', '雪[ゆき]が降[ふ]っています', 'sedang turun salju'],
          ['風[かぜ]が吹[ふ]く', '風[かぜ]が吹[ふ]いています', 'angin sedang bertiup'],
          ['雷[かみなり]が鳴[な]る', '雷[かみなり]が鳴[な]っています', 'petir sedang menggelegar'],
          ['くもる', 'くもっています', 'sedang mendung'],
          ['晴[は]れる', '晴[は]れています', 'sedang cerah']
        ]
      }],
      jelas: [
        'Ini arti “sedang berlangsung” yang paling dasar: hujan yang sedang turun, orang yang sedang makan, dan sebagainya. Cocok dengan kata 今[いま] (sekarang).',
        'Untuk melaporkan kondisi cuaca saat ini, kata kerja cuaca dipakai dengan ています: 「雪[ゆき]が降[ふ]って{います}」.',
        '晴[は]れる dan くもる lebih sering muncul sebagai **-ています** karena menggambarkan **keadaan saat ini**: 「今[いま]、晴[は]れて{います}」 (sekarang cerah).',
        'Bandingkan: 「雨[あめ]が降[ふ]ります」 = (akan) hujan, 「雨[あめ]が降[ふ]っています」 = sekarang sedang hujan.'
      ],
      contoh: [
        { jp: '外[そと]は、強[つよ]い風[かぜ]が{吹[ふ]いています}。', id: 'Di luar, angin kencang sedang bertiup.' },
        { jp: '今[いま]、雪[ゆき]が{降[ふ]っています}。', id: 'Sekarang sedang turun salju.' },
        { jp: '朝[あさ]から、ずっと{くもっています}。', id: 'Dari pagi mendung terus.' },
        { jp: '遠[とお]くで、雷[かみなり]が{鳴[な]っています}。', id: 'Di kejauhan, petir sedang menggelegar.' },
        { jp: 'A：そちらの天気[てんき]は、どうですか。\nB：今[いま]、{晴[は]れています}。', id: 'A: Bagaimana cuaca di sana?\nB: Sekarang cerah.' }
      ],
      awas: [
        'Untuk kejadian yang **akan** terjadi, jangan pakai ています: 「明日[あした]、雨[あめ]が降[ふ]ります」 (besok akan hujan), bukan ×降[ふ]っています.',
        'V-ています punya tiga “wajah”: ① pekerjaan / sekolah (Bab 1), ② kebiasaan rutin (Bab 2), ③ sedang berlangsung (ini). Kata penanda membantu: 今[いま] → ③, 毎週[まいしゅう]・毎日[まいにち] → ②.'
      ],
      kw: 'sedang berlangsung hujan salju angin progresif sekarang ています'
    },
    {
      name: 'N／ナA／イA-い／V-る でしょう',
      short: 'でしょう',
      arti: 'mungkin / kemungkinan besar ~ (prakiraan)',
      inti: 'Pakai **でしょう** untuk **menduga atau memperkirakan**, misalnya dalam prakiraan cuaca: “kemungkinan besar ~”.',
      rumus: [['N／ナA', '+', '=でしょう'], ['イA-い', '+', '=でしょう'], ['V-る', '+', '=でしょう']],
      rumusNote: 'Sebelum でしょう, kata benda dan sifat-な tidak memakai だ',
      tabel: [{
        judul: 'Contoh',
        kepala: ['Jenis', 'Bentuk biasa', 'Dugaan'],
        baris: [
          ['Kata kerja', '晴[は]れる', '晴[は]れるでしょう'],
          ['Kata kerja (negatif)', '降[ふ]らない', '降[ふ]らないでしょう'],
          ['Sifat-い', '寒[さむ]い', '寒[さむ]いでしょう'],
          ['Sifat-な', '静[しず]か', '静[しず]かでしょう'],
          ['Kata benda', '雨[あめ]', '雨[あめ]でしょう']
        ]
      }],
      jelas: [
        'Bentuk: **bentuk biasa (kamus) + でしょう**. Kata benda dan sifat-な langsung + でしょう **tanpa だ**.',
        'Banyak dipakai dalam **prakiraan cuaca**: 「明日[あした]は、晴[は]れる{でしょう}」. Terdengar sedikit lebih formal daripada ～と思[おも]います (Bab 18).',
        'Dengan nada naik ↗, でしょう？ berarti “…, kan?” (memastikan kepada lawan bicara): 「寒[さむ]い{でしょう}？」.',
        'でしょう menyatakan perkiraan, bukan kepastian. Untuk menyatakan fakta, pakai です／ます.'
      ],
      contoh: [
        { jp: '明日[あした]は、雨[あめ]が降[ふ]る{でしょう}。', id: 'Besok kemungkinan hujan.' },
        { jp: '週末[しゅうまつ]は、いい天気[てんき]{でしょう}。', id: 'Akhir pekan kemungkinan cuacanya bagus.' },
        { jp: '夜[よる]は、少[すこ]し寒[さむ]くなる{でしょう}。', id: 'Malam hari kemungkinan agak dingin.' },
        { jp: '山[やま]では、雪[ゆき]{でしょう}。', id: 'Di pegunungan, kemungkinan salju.' },
        { jp: 'A：明日[あした]、台風[たいふう]が来[き]ますか。\nB：たぶん、来[こ]ない{でしょう}。', id: 'A: Apakah besok topan datang?\nB: Mungkin tidak datang.' }
      ],
      awas: [
        'Jangan menambah だ: ×雨[あめ]だでしょう, ×静[しず]かだでしょう → ○雨[あめ]でしょう, ○静[しず]かでしょう.',
        'Jangan pakai bentuk ます: ×降[ふ]りますでしょう → ○降[ふ]るでしょう.',
        'Kalau kamu **yakin** atau sedang melihatnya sendiri, jangan pakai でしょう: ○今[いま]、雨[あめ]が降[ふ]っています, ×今[いま]、雨[あめ]が降[ふ]るでしょう.'
      ],
      kw: 'mungkin kemungkinan besar prakiraan cuaca ramalan でしょう'
    }
  ]
});
