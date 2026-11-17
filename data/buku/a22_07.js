/* =====================================================================
   data/buku/a22_07.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 7
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧): ➊ ～たら ➋ 受身① ➌ 可能形②.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 7,
  title: '雨[あめ]が降[ふ]ったら、ホールでやります',
  arti: 'Kalau hujan, kami adakan di aula',
  topic: '地域[ちいき]のイベント',
  topicArti: 'Acara di lingkungan sekitar',
  bisa: [
    'Bilang “**kalau** … maka …” dan “**setelah** … selesai, baru …”',
    'Membaca pengumuman acara yang memakai kalimat pasif: “akan diadakan”, “dibatalkan”, “ditunda”',
    'Bilang bahwa sesuatu **bisa** dilakukan siapa pun, atau bisa dilakukan di tempat tertentu',
    'Menanyakan dan menjelaskan rencana acara di lingkunganmu, termasuk rencana kalau hujan'
  ],
  pola: [
    {
      name: '～たら、～',
      short: 'たら',
      arti: 'kalau ~ / setelah ~ (baru) ~',
      inti: 'Pakai **たら** untuk bilang “**kalau** … maka …” dan juga “**setelah** … selesai, baru …”.',
      rumus: [['Kalimat 1 (bentuk た)', '+', '=ら', '、', 'Kalimat 2']],
      rumusNote: 'V-たら · イA-かったら · ナA／N-だったら · negatif: ～なかったら',
      tabel: [{
        judul: 'Cara membentuk たら',
        kepala: ['Jenis', 'Biasa', 'Bentuk たら'],
        baris: [
          ['Kata kerja', '降[ふ]る', '降[ふ]ったら'],
          ['Kata kerja (negatif)', '降[ふ]らない', '降[ふ]らなかったら'],
          ['Sifat-い', '安[やす]い', '安[やす]かったら'],
          ['Sifat-な', '暇[ひま]', '暇[ひま]だったら'],
          ['Kata benda', '雨[あめ]', '雨[あめ]だったら']
        ]
      }],
      jelas: [
        '**Kondisi**: kalau hal di depan terjadi, hal di belakang berlaku. 「時間[じかん]があっ{たら}、行[い]きます」 = “kalau ada waktu, saya pergi”.',
        '**Urutan**: setelah hal di depan **selesai**, baru hal di belakang. 「宿題[しゅくだい]が終[お]わっ{たら}、ゲームをします」 = “setelah PR selesai, saya main game”.',
        'Cara membentuk: ambil **bentuk lampau (V-た)** lalu tambah **ら**. Sifat-い: い → **かったら**. Sifat-な dan kata benda: + **だったら**. Negatif: ない → **なかったら**.',
        'Walaupun bentuknya “lampau”, artinya untuk **masa depan**: 「あした、晴[は]れ{たら}」 = “kalau besok cerah”.',
        'Bagian belakang bebas: boleh berisi **ajakan** (～ましょう), **permintaan** (～てください), atau **keinginan** (～たいです). Tambahkan **もし** di awal kalau mau menegaskan “seandainya”.'
      ],
      contoh: [
        { jp: 'あした、晴[は]れ{たら}、公園[こうえん]でお弁当[べんとう]を食[た]べましょう。', id: 'Kalau besok cerah, ayo makan bekal di taman.' },
        { jp: '安[やす]{かったら}、そのかばんを買[か]います。', id: 'Kalau murah, saya beli tas itu.' },
        { jp: '暇[ひま]{だったら}、ちょっと手伝[てつだ]ってくれませんか。', id: 'Kalau kamu senggang, bisa bantu saya sebentar?' },
        { jp: 'わから{なかったら}、いつでも聞[き]いてください。', id: 'Kalau tidak mengerti, tanyalah kapan saja.' },
        { jp: 'うちに帰[かえ]っ{たら}、すぐ電話[でんわ]します。', id: 'Setelah sampai di rumah, saya langsung telepon.' },
        { jp: 'お祭[まつ]りが終[お]わっ{たら}、みんなでご飯[はん]を食[た]べましょう。', id: 'Setelah festival selesai, ayo kita makan bersama.' },
        { jp: 'A：あした、雨[あめ]が降[ふ]っ{たら}、どうしますか。\nB：雨[あめ]{だったら}、中止[ちゅうし]です。', id: 'A: Kalau besok hujan, bagaimana?\nB: Kalau hujan, dibatalkan.' }
      ],
      awas: [
        'た di たら **bukan** berarti lampau. 「あした、雨[あめ]が降[ふ]ったら」 tetap “kalau besok hujan”.',
        'Sifat-い dan sifat-な／kata benda punya bentuk sendiri: ×安[やす]いたら → ○安[やす]かったら, ×暇[ひま]たら → ○暇[ひま]だったら.'
      ],
      kw: 'kalau jika seandainya setelah bersyarat kondisi'
    },
    {
      name: 'V-（ら）れます ＜受身[うけみ]①＞',
      short: 'pasif ①',
      arti: 'di-~ (pasif untuk pengumuman)',
      inti: 'Di pengumuman, pasif dipakai untuk bilang **apa yang terjadi** tanpa menyebut siapa pelakunya: “diadakan”, “dibatalkan”, “ditunda”.',
      rumus: [['Acara', '+', '=が', '+', 'V-（ら）れます']],
      rumusNote: 'Pelaku tidak disebut · tempat resmi: ～において (= で yang lebih formal)',
      tabel: [{
        judul: 'Cara membentuk pasif',
        kepala: ['Kelompok', 'Kamus', 'Pasif'],
        baris: [
          ['Kel. 1', '行[おこな]う', '行[おこな]われます'],
          ['Kel. 1', '開[ひら]く', '開[ひら]かれます'],
          ['Kel. 2', '建[た]てる', '建[た]てられます'],
          ['Kel. 3', '開催[かいさい]する', '開催[かいさい]されます'],
          ['Kel. 3', '中止[ちゅうし]する', '中止[ちゅうし]されます']
        ]
      }],
      jelas: [
        'Di papan pengumuman, brosur, dan siaran lingkungan, kalimat pasif membuat pengumuman terdengar **resmi dan netral**: 「お祭[まつ]りが{行[おこな]われます}」 = “festival akan dilaksanakan”.',
        'Yang jadi subjek adalah **acaranya** (ditandai **が**). **Siapa penyelenggaranya tidak disebut.** Dalam bahasa Indonesia biasanya menjadi “di-”: diadakan, dibatalkan, ditunda.',
        'Cara membentuk: **Kel. 1** u → **あ**＋れます (書[か]く → 書[か]かれます; khusus う → **わ**: 行[おこな]う → 行[おこな]**わ**れます). **Kel. 2** る → **られ**ます. **Kel. 3** する → **され**ます.',
        'Kata kerja yang sering muncul: 開催[かいさい]される (diadakan), 行[おこな]われる (dilaksanakan), 開[ひら]かれる (diselenggarakan), 中止[ちゅうし]される (dibatalkan), 延期[えんき]される (ditunda).',
        'Tempat acara yang resmi memakai **において**: 「市民[しみん]センター{において}、説明会[せつめいかい]が行[おこな]われます」. Artinya sama dengan で, hanya lebih formal.'
      ],
      contoh: [
        { jp: '来月[らいげつ]、市民[しみん]センターで夏祭[なつまつ]りが{行[おこな]われます}。', id: 'Bulan depan, festival musim panas akan dilaksanakan di balai warga.' },
        { jp: '8月[はちがつ]5日[いつか]、河原[かわら]{において}、花火大会[はなびたいかい]が{開催[かいさい]されます}。', id: 'Tanggal 5 Agustus, di tepi sungai akan diadakan acara kembang api.' },
        { jp: '大雨[おおあめ]のため、あしたのバーベキューは{中止[ちゅうし]されます}。', id: 'Karena hujan deras, barbekyu besok dibatalkan.' },
        { jp: '台風[たいふう]が来[く]るので、運動会[うんどうかい]は来週[らいしゅう]に{延期[えんき]されます}。', id: 'Karena topan akan datang, pertandingan olahraga ditunda ke minggu depan.' },
        { jp: 'A：ごみ拾[ひろ]いは、いつですか。\nB：日曜日[にちようび]に{行[おこな]われます}よ。', id: 'A: Kapan acara pungut sampah?\nB: Akan dilaksanakan hari Minggu.' },
        { jp: 'この地域[ちいき]では、毎年[まいとし]10月[じゅうがつ]に秋祭[あきまつ]りが{開[ひら]かれます}。', id: 'Di daerah ini, setiap tahun bulan Oktober diadakan festival musim gugur.' }
      ],
      awas: [
        'Subjeknya **acara/benda** dan ditandai **が**: ×お祭[まつ]りを行[おこな]われます → ○お祭[まつ]りが行[おこな]われます.',
        'Bentuk kelompok 2 sama dengan bentuk “bisa” (建[た]てられます). Lihat subjeknya: **acara/benda ＋ が** = pasif; **orang** yang melakukan biasanya berarti “bisa”.',
        'Pasif ini **netral**, bukan keluhan. Pasif yang bernuansa “ditegur” atau “dirugikan” ada di Bab 10 dan Bab 11.'
      ],
      kw: 'pasif diadakan dilaksanakan dibatalkan ditunda pengumuman acara'
    },
    {
      name: 'V-（られ）ます ＜可能形[かのうけい]②＞',
      short: 'bentuk bisa ②',
      arti: 'bisa ~ (siapa pun / keadaan memungkinkan)',
      inti: 'Bentuk “bisa” tidak hanya untuk **kemampuan**, tapi juga untuk **kemungkinan**: “di sini bisa …”, “siapa pun bisa …”.',
      rumus: [['N', '+', '=が', '+', 'V (bentuk bisa)', '+', '=ます']],
      rumusNote: 'Cara membentuknya sama seperti Bab 5 · だれでも = “siapa pun”',
      tabel: [{
        judul: 'Ulangan bentuk bisa (Bab 5)',
        kepala: ['Kelompok', 'Kamus', 'Bentuk bisa'],
        baris: [
          ['Kel. 1', '踊[おど]る', '踊[おど]れます'],
          ['Kel. 1', '作[つく]る', '作[つく]れます'],
          ['Kel. 1', '歌[うた]う', '歌[うた]えます'],
          ['Kel. 2', '借[か]りる', '借[か]りられます'],
          ['Kel. 3', '参加[さんか]する', '参加[さんか]できます'],
          ['Kel. 3', '来[く]る', '来[こ]られます']
        ]
      }],
      jelas: [
        'Cara membentuknya **sama dengan Bab 5**. Yang baru di sini adalah **cara memakainya** untuk acara dan layanan di lingkungan.',
        '**Kemampuan** orangnya: 「私[わたし]は、ダンスが{踊[おど]れます}」 = “saya bisa menari”.',
        '**Kemungkinan karena aturan atau keadaan**: 「このイベントは、無料[むりょう]で{参加[さんか]できます}」 = “acara ini bisa diikuti gratis”.',
        'Kata **だれでも** (siapa pun) sering ditaruh di depan untuk bilang bahwa **tidak ada syarat**: 「だれでも{参加[さんか]できます}」.',
        'Yang “bisa dilakukan” biasanya ditandai **が**: 「ダンス{が}踊[おど]れます」. Bentuk negatifnya ～ません (“tidak bisa”).'
      ],
      contoh: [
        { jp: 'このイベントは、無料[むりょう]で、だれでも{参加[さんか]できます}。', id: 'Acara ini gratis, siapa pun bisa ikut.' },
        { jp: 'この料理[りょうり]は、簡単[かんたん]なので、初[はじ]めてでも{作[つく]れます}。', id: 'Masakan ini mudah, jadi pemula pun bisa membuatnya.' },
        { jp: '図書館[としょかん]では、本[ほん]が三冊[さんさつ]まで{借[か]りられます}。', id: 'Di perpustakaan, kita bisa meminjam buku sampai tiga buah.' },
        { jp: 'ホールでは、七時[しちじ]まで{練習[れんしゅう]できます}。', id: 'Di aula, kita bisa berlatih sampai jam tujuh.' },
        { jp: 'A：このイベントには、外国人[がいこくじん]も{参加[さんか]できますか}。\nB：はい、だれでも{参加[さんか]できます}よ。', id: 'A: Orang asing juga bisa ikut acara ini?\nB: Ya, siapa pun bisa ikut.' },
        { jp: 'うちの近[ちか]くの公園[こうえん]では、夏[なつ]に花火[はなび]が{見[み]られます}。', id: 'Di taman dekat rumah saya, kita bisa melihat kembang api saat musim panas.' }
      ],
      awas: [
        'Kelompok 1 **tidak** memakai られ: ○踊[おど]れます, ×踊[おど]られます (itu bukan “bisa”).',
        'Untuk kata benda ＋ する, bentuk bisanya **できます**: ○参加[さんか]できます, ×参加[さんか]されます (itu bentuk pasif).'
      ],
      kw: 'bisa dapat siapa pun kemungkinan kemampuan bentuk potensial'
    }
  ]
});
