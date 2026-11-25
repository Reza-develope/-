/* =====================================================================
   data/buku/a2_03.js — Buku Bunpou Irodori A2 (初級1) · Bab 3
   Penanda teks: 漢字[よみ] furigana · {sorot} · **tebal** · 「kutipan Jepang」. Rumus: token berawalan "=" = bagian tetap (merah).
   Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran); daftar pola mengikuti daftar isi resmi Irodori 初級1 (文法ノート).
   ===================================================================== */
FC.defineBuku('a2', {
  n: 3,
  title: '冬[ふゆ]はとても寒[さむ]くなります',
  arti: 'Musim dingin jadi sangat dingin',
  topic: '季節[きせつ]と天気[てんき]',
  topicArti: 'Musim dan cuaca',
  bisa: [
    'Memahami video singkat tentang empat musim di Jepang dan ciri tiap musimnya',
    'Menceritakan ciri-ciri musim di negaramu dengan kalimat sederhana',
    'Menyebut musim favoritmu beserta alasannya',
    'Menyebut beberapa contoh sekaligus dengan や dan とか'
  ],
  pola: [
    {
      name: 'Nに／ナA-に／イA-くなります',
      short: 'になります',
      arti: 'menjadi ~ (perubahan keadaan)',
      inti: 'Pakai ini untuk bilang suatu keadaan **berubah menjadi** keadaan baru.',
      rumus: [['N', '+', '=になります'], ['ナA', '+', '=になります'], ['イA-い', '→', 'イA-', '=くなります']],
      rumusNote: 'いい → よくなります (bukan ×いくなります)',
      tabel: [{
        judul: 'Contoh perubahan',
        kepala: ['Jenis', 'Asal', 'Menjadi'],
        baris: [
          ['Kata benda', '夏[なつ]', '夏[なつ]になります'],
          ['Sifat-な', '静[しず]か', '静[しず]かになります'],
          ['Sifat-い', '暑[あつ]い', '暑[あつ]くなります'],
          ['Sifat-い', '寒[さむ]い', '寒[さむ]くなります'],
          ['Pengecualian', 'いい', 'よくなります']
        ]
      }],
      jelas: [
        'Arti dasarnya **“menjadi ~”**. Dipakai untuk perubahan musim, cuaca, suasana, kondisi badan, dan sebagainya.',
        'Cara menyambung: kata benda dan sifat-な + **に**. Sifat-い: buang い, ganti dengan **く**.',
        'Bisa diberi kata penguat: とても (sangat), だんだん (perlahan-lahan), もうすぐ (sebentar lagi): 「だんだん暖[あたた]かく{なります}」.',
        'Bentuk lampaunya なりました (sudah menjadi): 「夜[よる]に{なりました}」, 「寒[さむ]く{なりました}」.'
      ],
      contoh: [
        { jp: '春[はる]は、だんだん{暖[あたた]かくなります}。', id: 'Musim semi lama-lama jadi hangat.' },
        { jp: '秋[あき]は、朝[あさ]と夜[よる]が{すずしくなります}。', id: 'Di musim gugur, pagi dan malam jadi sejuk.' },
        { jp: '冬[ふゆ]の山[やま]は、とても{静[しず]かになります}。', id: 'Gunung di musim dingin jadi sangat sunyi.' },
        { jp: 'もうすぐ、{夏[なつ]になります}。', id: 'Sebentar lagi akan masuk musim panas.' },
        { jp: 'A：風邪[かぜ]は、どうですか。\nB：もう、{よくなりました}。', id: 'A: Bagaimana flumu?\nB: Sudah membaik.' }
      ],
      awas: [
        'Sifat-い tidak memakai に: ×暑[あつ]いになります → ○暑[あつ]くなります. Kata benda dan sifat-な pakai に, sifat-い pakai く.',
        'いい (baik) menjadi **よく**なります, bukan ×いくなります. Ini pengecualian.',
        'Bedakan keadaan sekarang dan perubahan: 「寒[さむ]いです」 (dingin) ≠ 「寒[さむ]くなります」 (menjadi dingin).'
      ],
      kw: 'menjadi berubah musim くなる になる hangat dingin panas perubahan'
    },
    {
      name: 'いちばん ナA-です／イA-いです',
      short: 'いちばん',
      arti: 'paling ~',
      inti: 'Pakai **いちばん** di depan kata sifat (atau kata kerja) untuk bilang “yang **paling** ~”.',
      rumus: [['N', '+', '=が', '+', '=いちばん', '+', 'ナA-です／イA-いです'], ['kelompok', '+', '=の中[なか]で', '+', 'N', '+', '=が', '+', '=いちばん', '+', '～です']],
      rumusNote: 'Baris kedua dipakai kalau kamu ingin menyebut kelompok pembandingnya lebih dulu',
      tabel: [{
        judul: 'Kata tanya yang sering dipakai',
        kepala: ['Kata tanya', 'Artinya', 'Contoh'],
        baris: [
          ['どの季節[きせつ]', 'musim apa', 'どの季節[きせつ]がいちばん好[す]きですか？'],
          ['何[なに]', 'apa', '何[なに]がいちばん好[す]きですか？'],
          ['どれ', 'yang mana', 'どれがいちばん安[やす]いですか？'],
          ['どこ', 'tempat mana', 'どこがいちばん有名[ゆうめい]ですか？'],
          ['だれ', 'siapa', 'だれがいちばん上手[じょうず]ですか？']
        ]
      }],
      jelas: [
        '**いちばん** ditaruh tepat di depan kata sifat (好[す]き, 大[おお]きい, 暑[あつ]い…): 「夏[なつ]が{いちばん}暑[あつ]いです」 = “Musim panas yang paling panas”.',
        'Hal yang dibandingkan ditandai **が**. Kalau perlu, sebut kelompoknya dulu dengan 「～の中[なか]で」: 「季節[きせつ]の中[なか]で、春[はる]が{いちばん}好[す]きです」.',
        'Pertanyaannya memakai kata tanya + が: 「どの季節[きせつ]がいちばん好[す]きですか？」.',
        'Bisa dipakai dengan banyak kata sifat: 暑[あつ]い (panas), 寒[さむ]い (dingin), 有名[ゆうめい] (terkenal), 安[やす]い (murah), dan seterusnya.'
      ],
      contoh: [
        { jp: '季節[きせつ]の中[なか]で、春[はる]が{いちばん}好[す]きです。', id: 'Di antara musim-musim, saya paling suka musim semi.' },
        { jp: '日本[にほん]では、8月[はちがつ]が{いちばん暑[あつ]いです}。', id: 'Di Jepang, bulan Agustus yang paling panas.' },
        { jp: 'この町[まち]で、この公園[こうえん]が{いちばん}有名[ゆうめい]です。', id: 'Di kota ini, taman ini yang paling terkenal.' },
        { jp: 'クラスで、だれが{いちばん}日本語[にほんご]が上手[じょうず]ですか。', id: 'Di kelas, siapa yang paling pandai bahasa Jepang?' },
        { jp: 'A：何[なに]が{いちばん}好[す]きですか。\nB：ラーメンが{いちばん}好[す]きです。', id: 'A: Kamu paling suka apa?\nB: Saya paling suka ramen.' }
      ],
      awas: [
        'Hal yang menang ditandai **が**, bukan を: ○春[はる]がいちばん好[す]きです, ×春[はる]をいちばん好[す]きです.',
        'Jangan menyisipkan の di antara いちばん dan kata sifat: ×いちばんの暑[あつ]いです → ○いちばん暑[あつ]いです.'
      ],
      kw: 'paling terbaik superlatif いちばん musim favorit'
    },
    {
      name: 'イA-いのが好[す]きです／苦手[にがて]です',
      short: 'のが好[す]き／苦手[にがて]',
      arti: 'suka / kurang tahan (hal yang ~)',
      inti: 'Dengan **の**, kata sifat bisa dipakai seperti kata benda: “yang ~ itu saya suka / kurang tahan”.',
      rumus: [['イA-い', '+', '=のが', '+', '好[す]きです／苦手[にがて]です'], ['ナA-な', '+', '=のが', '+', '好[す]きです／苦手[にがて]です']],
      rumusNote: 'の = “yang ~ (hal / cuaca / benda)” · 苦手[にがて] = kurang pandai, kurang tahan',
      tabel: [{
        judul: 'Contoh',
        kepala: ['Kata sifat', '+ のが', 'Arti'],
        baris: [
          ['すずしい', 'すずしいのが好[す]きです', 'suka yang sejuk'],
          ['暖[あたた]かい', '暖[あたた]かいのが好[す]きです', 'suka yang hangat'],
          ['寒[さむ]い', '寒[さむ]いのが苦手[にがて]です', 'kurang tahan dingin'],
          ['静[しず]か（な）', '静[しず]かなのが好[す]きです', 'suka yang tenang']
        ]
      }],
      jelas: [
        'Bentuk: kata sifat-い (tetap berakhiran い) + **のが**. 「すずしい{のが}好[す]きです」 = “Saya suka (cuaca) yang sejuk”. の menggantikan “hal / cuaca / benda yang ~”.',
        'Kata sifat-な: ～な + のが: 「静[しず]か{なのが}好[す]きです」.',
        '**苦手[にがて]** = kurang pandai / kurang tahan. Lebih halus daripada “tidak suka”: 「寒[さむ]いのが苦手[にがて]です」.',
        'Pola ini mirip V-るのが好[す]きです di Bab 2: の membuat kata lain berperan seperti kata benda. Bedanya, kata di depan の sekarang adalah **kata sifat**.'
      ],
      contoh: [
        { jp: '私[わたし]は、{すずしいのが好[す]きです}。', id: 'Saya suka yang sejuk.' },
        { jp: '弟[おとうと]は、{寒[さむ]いのが苦手[にがて]です}。', id: 'Adik laki-laki saya kurang tahan dingin.' },
        { jp: '母[はは]は、{にぎやかなのが好[す]きです}。', id: 'Ibu saya suka yang ramai.' },
        { jp: '私[わたし]は、{むし暑[あつ]いのが苦手[にがて]です}。', id: 'Saya kurang tahan cuaca yang pengap (panas lembap).' },
        { jp: 'A：どんな天気[てんき]が好[す]きですか。\nB：{暖[あたた]かいのが好[す]きです}。', id: 'A: Cuaca seperti apa yang kamu suka?\nB: Saya suka yang hangat.' }
      ],
      awas: [
        'Jangan membuang の: ×暑[あつ]い好[す]きです → ○暑[あつ]いのが好[す]きです. Kalau yang disukai berupa **benda**, cukup 「夏[なつ]が好[す]きです」 tanpa の.',
        'Sifat-な memakai な + の: ×静[しず]かのが好[す]きです → ○静[しず]かなのが好[す]きです.',
        '苦手[にがて] bukan “sama sekali tidak bisa”: 「泳[およ]ぐのが苦手[にがて]です」 artinya kurang pandai atau kurang suka berenang.'
      ],
      kw: 'suka tidak suka kurang tahan 苦手 好き sifat の'
    },
    {
      name: 'ナA-です／イA-いです から',
      short: 'ですから',
      arti: '~. Soalnya ~ (alasan ditaruh belakangan)',
      inti: 'Taruh **kesimpulan dulu**, baru alasannya di akhir dengan **から**: “~. Soalnya ~”.',
      rumus: [['Kesimpulan', '+', '。', '+', 'Alasan', '+', '=から', '+', '。']],
      rumusNote: 'Alasan: ～です／～ます + から (kata benda, sifat-な, sifat-い, maupun kata kerja)',
      tabel: [{
        judul: 'Alasan + から',
        kepala: ['Jenis', 'Alasan', '+ から'],
        baris: [
          ['Sifat-な', 'きれいです', 'きれいですから'],
          ['Sifat-い', '暑[あつ]いです', '暑[あつ]いですから'],
          ['Kata benda', '雨[あめ]です', '雨[あめ]ですから'],
          ['Kata kerja', 'できます', 'できますから']
        ]
      }],
      jelas: [
        'Urutannya mirip bahasa Indonesia “…. Soalnya …”: 「春[はる]が好[す]きです。花[はな]がきれいです{から}」.',
        'Bagian alasan memakai bentuk sopan (です／ます) lalu ditutup **から**.',
        'Cocok untuk menambahkan alasan setelah kamu menyatakan pendapat atau perasaan.',
        'Bandingkan dengan pola berikutnya (S1から、S2) yang menaruh alasan di **depan**.'
      ],
      contoh: [
        { jp: '夏[なつ]は好[す]きじゃないです。{暑[あつ]いですから}。', id: 'Saya tidak suka musim panas. Soalnya panas.' },
        { jp: '春[はる]が好[す]きです。{花[はな]がきれいですから}。', id: 'Saya suka musim semi. Soalnya bunga-bunganya indah.' },
        { jp: '冬[ふゆ]が楽[たの]しみです。{スキーができますから}。', id: 'Saya menantikan musim dingin. Soalnya bisa main ski.' },
        { jp: '8月[はちがつ]は、出[で]かけたくないです。{とても暑[あつ]いですから}。', id: 'Bulan Agustus saya tidak ingin keluar rumah. Soalnya panas sekali.' },
        { jp: 'A：どうして秋[あき]が好[す]きですか。\nB：{果物[くだもの]がおいしいですから}。', id: 'A: Kenapa kamu suka musim gugur?\nB: Soalnya buah-buahannya enak.' }
      ],
      awas: [
        'から selalu menempel di belakang **alasan**. 「行[い]きません。雨[あめ]ですから」 = “Saya tidak pergi. Soalnya hujan.” Kalau ditukar (「雨[あめ]です。行[い]きませんから」), artinya jadi terbalik dan terdengar aneh.',
        'Dalam pola ini hasil selalu **lebih dulu**. Kalau alasan ingin ditaruh di depan, pakai pola berikutnya (S1から、S2).'
      ],
      kw: 'soalnya karena alasan から tambahan sebab'
    },
    {
      name: 'S1から、S2',
      short: 'S1から、S2',
      arti: 'karena S1, (maka) S2',
      inti: 'Alasan di **depan**, hasil di **belakang**: “karena ~, ~”.',
      rumus: [['S1（alasan）', '+', '=から', '+', '、', '+', 'S2（hasil）']],
      rumusNote: 'S = kalimat · sebelum から boleh bentuk sopan atau bentuk biasa',
      tabel: [{
        judul: 'Bentuk sebelum から',
        kepala: ['Jenis', 'Sopan', 'Biasa'],
        baris: [
          ['Kata kerja', '食[た]べますから', '食[た]べるから'],
          ['Sifat-い', '暑[あつ]いですから', '暑[あつ]いから'],
          ['Sifat-な', '好[す]きですから', '好[す]きだから'],
          ['Kata benda', '雨[あめ]ですから', '雨[あめ]だから']
        ]
      }],
      jelas: [
        'S1 = alasan, S2 = hasil / pendapat / ajakan. Bagian **から** menandai “karena”: 「安[やす]い{から}、よく買[か]います」 = “Karena murah, saya sering membelinya”.',
        'Sebelum から boleh bentuk sopan atau **bentuk biasa**. Kalau bentuk biasa, kata benda dan sifat-な memakai **だ**: 「雨[あめ]だ{から}」, 「好[す]きだ{から}」.',
        'Sama seperti pola sebelumnya, tetapi urutannya terbalik: alasan dulu, hasil kemudian.',
        'Setelah から, hasilnya bisa berupa ajakan atau permintaan: 「寒[さむ]いです{から}、窓[まど]を閉[し]めてください」.'
      ],
      contoh: [
        { jp: '夏[なつ]は暑[あつ]い{から}、海[うみ]に行[い]きたいです。', id: 'Karena musim panas itu panas, saya ingin pergi ke pantai.' },
        { jp: '雨[あめ]が多[おお]い{から}、私[わたし]は梅雨[つゆ]が苦手[にがて]です。', id: 'Karena banyak hujan, saya kurang suka musim hujan.' },
        { jp: '桜[さくら]がきれい{ですから}、春[はる]が好[す]きです。', id: 'Karena sakuranya indah, saya suka musim semi.' },
        { jp: '明日[あした]は休[やす]み{だから}、友[とも]だちと出[で]かけます。', id: 'Karena besok libur, saya akan pergi dengan teman.' },
        { jp: 'A：どうして冬[ふゆ]が好[す]きですか。\nB：スキーが好[す]き{だから}、冬[ふゆ]が好[す]きです。', id: 'A: Kenapa kamu suka musim dingin?\nB: Karena suka ski, saya suka musim dingin.' }
      ],
      awas: [
        'Jangan terbalik: から ada di akhir **alasan**. ○暑[あつ]いから、窓[まど]を開[あ]けます (Karena panas, saya buka jendela). Bukan ×窓[まど]を開[あ]けますから、暑[あつ]いです.',
        'Untuk bentuk biasa, kata benda dan sifat-な butuh **だ**: ○雨[あめ]だから, ×雨[あめ]から.'
      ],
      kw: 'karena alasan から sebab akibat penyebab'
    },
    {
      name: 'N1やN2',
      short: 'や',
      arti: 'N1, N2, dan sebagainya (contoh-contoh)',
      inti: 'Pakai **や** untuk menyebut beberapa **contoh** saja: “N1, N2, dan sebagainya”.',
      rumus: [['N1', '+', '=や', '+', 'N2', '+', '=など']],
      rumusNote: 'など = dan sebagainya (boleh dilesapkan)',
      tabel: [{
        judul: 'と dan や',
        kepala: ['Partikel', 'Artinya', 'Contoh'],
        baris: [
          ['と', 'hanya dua itu (lengkap)', '犬[いぬ]と猫[ねこ]がいます'],
          ['や', 'contoh saja (masih ada yang lain)', '犬[いぬ]や猫[ねこ]がいます']
        ]
      }],
      jelas: [
        '**や** menyebut contoh-contoh yang mewakili, dan masih ada hal lain yang tidak disebut. Di akhir boleh ditambah 「など」 (dan sebagainya).',
        'や hanya menyambung **kata benda** (bukan kata kerja atau kalimat).',
        'Bedanya dengan **と**: と menyebut daftar yang **lengkap**, や hanya menyebut sebagian. 「犬[いぬ]と猫[ねこ]がいます」 (hanya anjing dan kucing) ↔ 「犬[いぬ]{や}猫[ねこ]がいます」 (anjing, kucing, dan lainnya).',
        'Partikel setelahnya (が, を, で...) ditaruh sekali di belakang benda terakhir: 「公園[こうえん]{や}川[かわ]で遊[あそ]びます」 = “bermain di taman, sungai, dan sebagainya”.'
      ],
      contoh: [
        { jp: '春[はる]は、桜[さくら]{や}梅[うめ]などの花[はな]が咲[さ]きます。', id: 'Di musim semi, bunga seperti sakura dan ume mekar.' },
        { jp: '日本[にほん]では、7月[しちがつ]{や}8月[はちがつ]が暑[あつ]いです。', id: 'Di Jepang, bulan Juli, Agustus, dan sekitarnya panas.' },
        { jp: '冬[ふゆ]は、スキー{や}スケートができます。', id: 'Di musim dingin, kita bisa main ski, seluncur es, dan sejenisnya.' },
        { jp: '週末[しゅうまつ]は、公園[こうえん]{や}図書館[としょかん]に行[い]きます。', id: 'Akhir pekan saya pergi ke taman, perpustakaan, dan sebagainya.' },
        { jp: '冷蔵庫[れいぞうこ]に、牛乳[ぎゅうにゅう]{や}卵[たまご]があります。', id: 'Di kulkas ada susu, telur, dan lain-lain.' }
      ],
      awas: [
        'や tidak dipakai untuk menyambung kata kerja atau kalimat: ×食[た]べるや飲[の]む. Untuk kata kerja pakai bentuk-て atau V1-たり、V2-たり (Bab 16).',
        'Kalau memang hanya dua hal (lengkap), pakai と, bukan や: 「兄[あに]と姉[あね]がいます」 = hanya kakak laki-laki dan kakak perempuan.'
      ],
      kw: 'dan contoh や など daftar beberapa dan lain-lain'
    },
    {
      name: 'N1とか（N2とか）',
      short: 'とか',
      arti: 'misalnya N1, N2 (ragam santai)',
      inti: 'Seperti や, tetapi lebih **santai** dan dipakai dalam percakapan: “misalnya N1, N2, ...”.',
      rumus: [['N1', '+', '=とか', '+', 'N2', '+', '=とか']],
      rumusNote: 'とか biasanya diulang setelah tiap contoh · とか yang terakhir boleh dilesapkan',
      tabel: [{
        judul: 'や dan とか',
        kepala: ['Pola', 'Cara pakai', 'Contoh'],
        baris: [
          ['N1やN2', 'や tidak diulang · lebih netral', 'スキーやスケート'],
          ['N1とかN2とか', 'とか diulang · lebih santai', 'スキーとかスケートとか']
        ]
      }],
      jelas: [
        '**とか** = “misalnya / seperti”. Dalam percakapan sehari-hari, orang menyebut beberapa contoh dengan とか: 「スポーツは、サッカー{とか}、テニス{とか}が好[す]きです」.',
        'Bedanya dengan や: や tidak diulang dan agak lebih netral. とか biasanya diulang di tiap contoh dan terasa lebih akrab.',
        'Boleh juga dipakai untuk satu contoh saja sebagai gaya bicara: 「ケーキ{とか}、どうですか？」 = “Kue atau semacamnya, bagaimana?”.',
        'とか cocok untuk obrolan. Untuk tulisan resmi atau situasi formal, pakai や／など.'
      ],
      contoh: [
        { jp: '好[す]きなスポーツは、サッカー{とか}、テニス{とか}です。', id: 'Olahraga yang saya suka misalnya sepak bola dan tenis.' },
        { jp: '冬[ふゆ]は、鍋[なべ]{とか}、おでん{とか}が食[た]べたくなります。', id: 'Kalau musim dingin, jadi ingin makan hot pot atau oden.' },
        { jp: '夏[なつ]は、かき氷[ごおり]{とか}、スイカ{とか}がおいしいですよね。', id: 'Di musim panas, es serut atau semangka itu enak ya.' },
        { jp: '週末[しゅうまつ]は、映画[えいが]{とか}、買[か]い物[もの]{とか}をします。', id: 'Akhir pekan saya misalnya nonton film dan belanja.' },
        { jp: 'A：休[やす]みの日[ひ]は、何[なに]をしますか。\nB：掃除[そうじ]{とか}、洗濯[せんたく]{とか}です。', id: 'A: Di hari libur, kamu melakukan apa?\nB: Misalnya bersih-bersih dan mencuci.' }
      ],
      awas: [
        'とか terasa santai. Dalam surat resmi atau tulisan formal, pakai や／など.',
        'Jangan menggantikan と dengan とか kalau kamu ingin menyebut daftar yang **lengkap**: とか selalu memberi kesan “dan semacamnya”.'
      ],
      kw: 'misalnya seperti contoh とか santai percakapan'
    }
  ]
});
