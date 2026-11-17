/* =====================================================================
   data/buku/a22_13.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 13
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧, Japan Foundation): ❶〜❺.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 13,
  title: 'いろいろな資料[しりょう]を展示[てんじ]してあります',
  arti: 'Berbagai bahan dipamerkan di sini',
  topic: 'さまざまなサービス',
  topicArti: 'Berbagai layanan',
  bisa: [
    'Memahami penjelasan tentang fasilitas umum: dibangun kapan, dipakai untuk apa',
    'Bilang bahwa sesuatu “sudah disiapkan” atau “sudah dipasang” oleh seseorang',
    'Menyebut dua hal sekaligus: “bukan hanya A, tapi B juga”',
    'Menjelaskan syarat pemakaian: “kalau warga kota, …” dan “di mana pun / kapan pun boleh”'
  ],
  pola: [
    {
      name: 'V-（ら）れます ＜受身[うけみ]④＞',
      short: 'pasif ④',
      arti: 'di- ~ (pasif untuk benda / peristiwa)',
      inti: 'Pakai **pasif** kalau yang ingin kamu ceritakan adalah **bendanya** (gedung, alat, acara), bukan siapa yang melakukannya: “dibangun”, “dipakai”.',
      rumus: [['N', '=が', 'V-（ら）れ', '+', '=ます／ました'], ['N', '=が', 'V-（ら）れ', '+', '=ています']],
      rumusNote: 'N = benda / tempat / peristiwa · Pelaku biasanya tidak disebut',
      tabel: [{
        judul: 'Cara mengubah ke bentuk pasif',
        kepala: ['Kelompok', 'Kamus', 'Pasif'],
        baris: [
          ['Kel. 1', '書[か]く', '書[か]かれる'],
          ['Kel. 1', '使[つか]う', '使[つか]われる'],
          ['Kel. 1', '作[つく]る', '作[つく]られる'],
          ['Kel. 2', '建[た]てる', '建[た]てられる'],
          ['Kel. 3', 'する', 'される'],
          ['Kel. 3', '来[く]る', '来[こ]られる']
        ]
      }],
      jelas: [
        'Ini pasif untuk **benda atau peristiwa**. Yang jadi pusat cerita adalah bendanya, jadi bendanya ditaruh di depan: 「この橋[はし]は{作[つく]られました}」 = “jembatan ini dibuat”.',
        'Pelaku (**siapa** yang membuat) **tidak disebut**, karena tidak penting atau tidak diketahui. Pola ini sering muncul di papan informasi, brosur, dan penjelasan sejarah gedung.',
        'Kel. 1: huruf terakhir pindah ke baris **あ**, lalu + **れる** (書[か]**く** → 書[か]**かれる**). Khusus **う** menjadi **わ** (使[つか]**う** → 使[つか]**われる**). Kel. 2: + **られる** (建[た]てる → 建[た]て**られる**). する → **される**.',
        'Tiga bentuk yang sering dipakai: **～れます** (kebiasaan / pengumuman), **～れました** (sudah terjadi), **～れています** (keadaan sekarang: “dipakai”, “dijual”, “disebut”).'
      ],
      contoh: [
        { jp: 'この橋[はし]は、百年前[ひゃくねんまえ]に{建[た]てられました}。', id: 'Jembatan ini dibangun seratus tahun lalu.' },
        { jp: 'この道具[どうぐ]は、昔[むかし]、畑[はたけ]で{使[つか]われていました}。', id: 'Alat ini dulu dipakai di ladang.' },
        { jp: 'この町[まち]では、毎年[まいとし]、夏[なつ]に花火大会[はなびたいかい]が{行[おこな]われます}。', id: 'Di kota ini, setiap tahun pada musim panas diadakan festival kembang api.' },
        { jp: 'この本[ほん]は、世界[せかい]のいろいろな国[くに]で{読[よ]まれています}。', id: 'Buku ini dibaca di berbagai negara di dunia.' },
        { jp: '市民[しみん]ホールは、コンサートや会議[かいぎ]に{使[つか]われています}。', id: 'Aula warga dipakai untuk konser dan rapat.' },
        { jp: 'A：この建物[たてもの]、古[ふる]いですね。\nB：ええ、江戸時代[えどじだい]に{建[た]てられました}よ。', id: 'A: Gedung ini tua ya.\nB: Iya, dibangun pada zaman Edo lho.' }
      ],
      awas: [
        'Pasif ini **bukan** “jadi korban”. Untuk perasaan rugi (「かばんを盗[ぬす]まれました」) ada pola lain di Bab 11. Di sini hanya menyatakan **fakta** tentang benda.',
        'Kalau pelakunya penting atau ingin disebut, pakai kalimat aktif biasa: 「父[ちち]がこの家[いえ]を建[た]てました」, bukan pasif.'
      ],
      kw: 'pasif dibuat dibangun dipakai diadakan dibaca benda peristiwa gedung sejarah'
    },
    {
      name: 'V-てあります',
      short: 'てあります',
      arti: 'sudah di- ~ (sengaja, hasilnya masih ada)',
      inti: 'Pakai ini kalau **seseorang sudah sengaja melakukan sesuatu** dan **hasilnya masih ada** sekarang: “sudah dipasang”, “sudah disiapkan”.',
      rumus: [['N', '=が', 'V-て', '+', '=あります'], ['N', '=を', 'V-て', '+', '=あります']],
      rumusNote: 'V = kata kerja **transitif** (yang bisa diberi を) · Pelakunya tidak disebut',
      tabel: [{
        judul: 'V-ています atau V-てあります?',
        kepala: ['Pola', 'Contoh', 'Artinya'],
        baris: [
          ['V-ています', 'ドアが開[あ]いています', 'Pintunya terbuka (keadaannya saja)'],
          ['V-てあります', 'ドアが開[あ]けてあります', 'Pintunya sengaja dibukakan (sudah disiapkan)'],
          ['V-ています', '電気[でんき]がついています', 'Lampunya menyala'],
          ['V-てあります', '電気[でんき]をつけてあります', 'Lampunya sudah dinyalakan (oleh seseorang)']
        ]
      }],
      jelas: [
        '**V-てあります** = “sudah di- ~ (oleh seseorang) dan keadaannya **masih begitu**”. Ada **niat atau persiapan** dari orang yang melakukannya.',
        'Dipakai untuk menjelaskan **apa yang terlihat**: 「壁[かべ]に地図[ちず]が{貼[は]ってあります}」, atau **persiapan** yang sudah beres: 「ホテルは{予約[よやく]してあります}」.',
        'Objeknya bisa ditandai **が** (fokus pada bendanya) atau **を** (fokus pada hal yang dilakukan): 「資料[しりょう]が／を{展示[てんじ]してあります}」.',
        'Bandingkan: **V-ています** = keadaan yang terjadi begitu saja (kata kerja intransitif: 開[あ]く, つく). **V-てあります** = keadaan hasil perbuatan orang (kata kerja transitif: 開[あ]ける, つける).'
      ],
      contoh: [
        { jp: '壁[かべ]に、大[おお]きな地図[ちず]が{貼[は]ってあります}。', id: 'Di dinding ada peta besar yang sudah ditempel.' },
        { jp: '机[つくえ]の上[うえ]に、メモが{置[お]いてあります}。', id: 'Di atas meja ada catatan yang sudah diletakkan.' },
        { jp: '旅行[りょこう]のホテルは、もう{予約[よやく]してあります}。', id: 'Hotel untuk perjalanan sudah saya pesan.' },
        { jp: '入[い]り口[ぐち]に、きれいな花[はな]が{飾[かざ]ってあります}。', id: 'Di pintu masuk dipajang bunga yang indah.' },
        { jp: 'A：飲[の]み物[もの]は、ありますか。\nB：はい、冷蔵庫[れいぞうこ]に{入[い]れてあります}よ。', id: 'A: Ada minuman?\nB: Ada, sudah saya taruh di kulkas lho.' }
      ],
      awas: [
        'Pakai kata kerja **transitif** (yang bisa diberi を). 「開[あ]ける」 → ○開[あ]けてあります, tetapi 「開[あ]く」 → ×開[あ]いてあります (pakai 開[あ]いています).',
        'V-てあります tidak untuk kegiatan yang **sedang berlangsung**: 「今[いま]、宿題[しゅくだい]をしています」. V-てあります artinya “sudah siap”: 「宿題[しゅくだい]はしてあります」.'
      ],
      kw: 'sudah dipasang dipajang disiapkan sengaja tertempel tertulis hasil keadaan transitif'
    },
    {
      name: 'N1だけじゃなくて、N2も～',
      short: 'だけじゃなくて',
      arti: 'bukan hanya N1, tapi N2 juga ~',
      inti: 'Pakai ini untuk bilang bahwa **bukan hanya satu hal**, tetapi **ada hal lain juga**: “bukan cuma A, B juga”.',
      rumus: [['N1', '+', '=だけじゃなくて', '、', 'N2', '+', '=も', '+', 'Kalimat']],
      rumusNote: 'N1 = hal pertama · N2 = hal tambahan · だけじゃなくて = bentuk santai dari だけではなくて',
      jelas: [
        '**N1だけじゃなくて** = “bukan hanya N1”, lalu **N2も** = “N2 juga”. Dua-duanya **sama-sama berlaku**.',
        'Contoh: 「ラーメン{だけじゃなくて}、カレー{も}おいしいです」 = “bukan hanya ramen, kari pun enak”.',
        'Kalau N2 membawa partikel: **が／を** diganti **も**; partikel lain tetap, lalu ditambah **も** (に → **にも**, で → **でも**).',
        'だけじゃなくて adalah bentuk **lisan / santai** dari **だけではなくて**. Di tulisan resmi sering muncul だけでなく.'
      ],
      contoh: [
        { jp: 'この公園[こうえん]では、サッカー{だけじゃなくて}、野球[やきゅう]{も}できます。', id: 'Di taman ini, bukan hanya sepak bola, bisa main bisbol juga.' },
        { jp: 'この店[みせ]は、ラーメン{だけじゃなくて}、カレー{も}おいしいです。', id: 'Toko ini, bukan hanya ramennya, karinya juga enak.' },
        { jp: 'ディアンさんは、日本語[にほんご]{だけじゃなくて}、英語[えいご]{も}話[はな]せます。', id: 'Dian bukan hanya bisa bahasa Jepang, bahasa Inggris juga.' },
        { jp: '土曜日[どようび]{だけじゃなくて}、日曜日[にちようび]{も}働[はたら]きます。', id: 'Bukan hanya hari Sabtu, hari Minggu juga saya bekerja.' },
        { jp: 'A：この体育館[たいいくかん]は、スポーツをする所[ところ]ですか。\nB：スポーツ{だけじゃなくて}、コンサート{にも}使[つか]われていますよ。', id: 'A: Gedung olahraga ini tempat untuk berolahraga ya?\nB: Bukan hanya olahraga, dipakai untuk konser juga lho.' }
      ],
      awas: [
        'Jangan lupa **も** di N2: ○雑誌[ざっし]{も}借[か]りられます. Tanpa も, arti “juga”-nya hilang dan kalimat terdengar janggal.',
        'Jangan tertukar dengan **だけ** (Bab 9): 「本[ほん]だけ借[か]りられます」 = “hanya buku yang bisa dipinjam”. だけじゃなくて justru berarti “**bukan hanya** buku”.'
      ],
      kw: 'bukan hanya bukan cuma juga selain tambahan dua hal'
    },
    {
      name: 'Nなら、～',
      short: 'Nなら (syarat)',
      arti: 'kalau (itu) N, ~ (syarat / batas)',
      inti: 'Pakai **なら** untuk menyebut **syarat atau batas**: “kalau N, maka ~”. Biasanya untuk aturan yang berlaku **hanya bagi N tertentu**.',
      rumus: [['N', '+', '=なら', '、', 'Hal yang berlaku']],
      rumusNote: 'N = syarat / batas (siapa, di mana, kapan) · Setelahnya: いいです／無料[むりょう]です／使[つか]えます …',
      jelas: [
        '**なら** setelah N = “kalau (itu) N”. N-nya adalah **syarat atau batas**: siapa, di mana, atau kapan aturan itu berlaku.',
        'Contoh: 「学生[がくせい]{なら}、無料[むりょう]です」 = “kalau pelajar, gratis” (yang bukan pelajar belum tentu gratis).',
        'Setelah なら biasanya ada hal yang **boleh / bisa / berlaku**: いいです, 大丈夫[だいじょうぶ]です, 使[つか]えます, 安[やす]くなります.',
        'Beda dengan Bab 4: di sana なら **menanggapi topik** lawan bicara lalu memberi saran. Di sini なら **membatasi cakupan** aturan.'
      ],
      contoh: [
        { jp: '学生[がくせい]{なら}、入場料[にゅうじょうりょう]は無料[むりょう]です。', id: 'Kalau pelajar, biaya masuk gratis.' },
        { jp: 'この町[まち]に住[す]んでいる人[ひと]{なら}、だれでもカードが作[つく]れます。', id: 'Kalau orang yang tinggal di kota ini, siapa pun bisa membuat kartu.' },
        { jp: '三時[さんじ]まで{なら}、会議室[かいぎしつ]を使[つか]ってもいいです。', id: 'Kalau sampai jam tiga, ruang rapat boleh dipakai.' },
        { jp: '日曜日[にちようび]{なら}、一日中[いちにちじゅう]あいています。', id: 'Kalau hari Minggu, buka sepanjang hari.' },
        { jp: 'A：このチケットは、土曜日[どようび]も使[つか]えますか。\nB：平日[へいじつ]{なら}、使[つか]えますが、土曜日[どようび]は使[つか]えません。', id: 'A: Tiket ini bisa dipakai hari Sabtu juga?\nB: Kalau hari kerja bisa, tapi hari Sabtu tidak bisa.' }
      ],
      awas: [
        'なら **tidak memakai だ**: ×学生[がくせい]だなら → ○学生[がくせい]なら.',
        'N + なら secara halus berarti “**kalau bukan N, belum tentu**”. 「学生[がくせい]なら無料[むりょう]」 → yang bukan pelajar mungkin bayar. Jadi pilih N dengan hati-hati.'
      ],
      kw: 'kalau asal syarat batas cakupan hanya untuk aturan berlaku peraturan'
    },
    {
      name: '【疑問詞[ぎもんし]】V-ても、～',
      short: '疑問詞[ぎもんし]＋ても',
      arti: 'di mana / kapan / siapa pun ~ (boleh)',
      inti: 'Gabungkan **kata tanya** dengan **V-ても** untuk bilang “**mana pun / kapan pun / siapa pun**”. Setelahnya biasanya いいです (“boleh”).',
      rumus: [['Kata tanya', '+', 'V-て', '+', '=も', '、', 'いいです／大丈夫[だいじょうぶ]です']],
      rumusNote: 'Kata tanya: いつ, どこ, だれ, 何[なに], どれ, どちら …',
      tabel: [{
        judul: 'Kata tanya + V-ても',
        kepala: ['Kata tanya', 'Contoh', 'Artinya'],
        baris: [
          ['いつ', 'いつ来[き]てもいいです', 'kapan pun boleh datang'],
          ['どこ', 'どこに座[すわ]ってもいいです', 'boleh duduk di mana pun'],
          ['だれ', 'だれが使[つか]ってもいいです', 'siapa pun boleh memakai'],
          ['何[なに]', '何[なに]を食[た]べてもいいです', 'boleh makan apa pun'],
          ['どれ', 'どれを選[えら]んでもいいです', 'boleh pilih yang mana pun']
        ]
      }],
      jelas: [
        '**V-ても** artinya “meskipun ~”. Kalau di depannya ada **kata tanya**, artinya jadi “**mana pun / kapan pun / siapa pun**”: 「どこに座[すわ]っ{ても}いい」 = “duduk di mana pun boleh”.',
        'Cara membuat V-ても: ambil bentuk **V-て**, lalu tambah **も** (座[すわ]っ**て** → 座[すわ]っ**ても**). Cara lengkapnya ada di Bab 16 (Sても).',
        'Yang paling sering ada di belakangnya: **いいです** (boleh), **大丈夫[だいじょうぶ]です** (tidak apa-apa), **かまいません** (tidak masalah).',
        'Bisa juga diikuti hasil lain: 「いつ{行[い]っても}、混[こ]んでいます」 = “kapan pun pergi, selalu ramai”.'
      ],
      contoh: [
        { jp: 'この部屋[へや]は、だれが{使[つか]っても}いいです。', id: 'Ruangan ini, siapa pun boleh memakainya.' },
        { jp: '席[せき]は自由[じゆう]です。どこに{座[すわ]っても}いいですよ。', id: 'Tempat duduk bebas. Boleh duduk di mana pun lho.' },
        { jp: 'メニューの中[なか]から、何[なに]を{選[えら]んでも}いいです。', id: 'Dari menu ini, boleh pilih apa pun.' },
        { jp: 'A：いつ、見学[けんがく]に{行[い]っても}いいですか。\nB：はい、いつ{来[き]ても}大丈夫[だいじょうぶ]ですよ。', id: 'A: Kapan boleh pergi melihat-lihat?\nB: Ya, kapan pun datang tidak masalah lho.' },
        { jp: 'このラーメン屋[や]は、いつ{行[い]っても}、混[こ]んでいます。', id: 'Kedai ramen ini, kapan pun pergi selalu ramai.' }
      ],
      awas: [
        'Jangan tertukar dengan 【kata tanya】+**か** (Bab 8): 「どこに返[かえ]すか、わかりません」 = “tidak tahu mau mengembalikan di mana”. Dengan **ても** artinya “di mana pun (boleh)”.',
        '**いいです** di sini berarti “**boleh**”, bukan “bagus”. Bentuk mirip tanpa kata kerja: 「どこでもいいです」 = “di mana saja terserah”.'
      ],
      kw: 'mana pun kapan pun siapa pun apa pun boleh terserah bebas kata tanya'
    }
  ]
});
