/* =====================================================================
   data/buku/a22_16.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 16
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧, Japan Foundation): ❶〜❺.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 16,
  title: '地震[じしん]が来[き]ても、あわてて動[うご]かないでください',
  arti: 'Meskipun ada gempa, tolong jangan bergerak dengan panik',
  topic: '自然[しぜん]と環境[かんきょう]',
  topicArti: 'Alam dan lingkungan',
  bisa: [
    'Memahami perintah dan larangan singkat saat darurat: 「逃[に]げろ！」「走[はし]るな！」',
    'Meminta orang lain “usahakan jangan ~” dengan sopan',
    'Menjelaskan akibat yang bisa terjadi: “kalau …, jadi tidak bisa ~”',
    'Mengatakan “meskipun ~, tetap ~”',
    'Menyelipkan pertanyaan ya / tidak ke dalam kalimat: “apakah ~ atau tidak”'
  ],
  pola: [
    {
      name: 'V（命令形[めいれいけい]）／V-るな（禁止[きんし]の命令形[めいれいけい]）',
      short: '命令形[めいれいけい]・るな',
      arti: 'lakukan! (perintah) / jangan! (larangan)',
      inti: 'Bentuk **perintah** dan **larangan** yang **keras**. Banyak dipakai di keadaan darurat dan rambu, jadi penting untuk **dipahami**.',
      rumus: [['V (bentuk kamus)', '→', 'V (bentuk perintah)'], ['V-る', '+', '=な']],
      rumusNote: 'Perintah: lihat tabel · Larangan: bentuk kamus + な (semua kelompok sama)',
      tabel: [{
        judul: 'Cara membuat bentuk perintah',
        kepala: ['Kelompok', 'Kamus', 'Perintah'],
        baris: [
          ['Kel. 1', '急[いそ]ぐ', '急[いそ]げ'],
          ['Kel. 1', '集[あつ]まる', '集[あつ]まれ'],
          ['Kel. 1', '待[ま]つ', '待[ま]て'],
          ['Kel. 2', '逃[に]げる', '逃[に]げろ'],
          ['Kel. 2', '起[お]きる', '起[お]きろ'],
          ['Kel. 3', 'する', 'しろ'],
          ['Kel. 3', '来[く]る', '来[こ]い']
        ]
      }],
      jelas: [
        '**Perintah** — Kel. 1: huruf terakhir pindah ke baris **え** (急[いそ]**ぐ** → 急[いそ]**げ**, 集[あつ]ま**る** → 集[あつ]ま**れ**). Kel. 2: **る → ろ** (逃[に]げ**る** → 逃[に]げ**ろ**). する → **しろ**, 来[く]る → **来[こ]い**.',
        '**Larangan** — **bentuk kamus + な**, sama untuk semua kelompok: 走[はし]る{な}, 入[はい]る{な}, さわる{な}.',
        'Nadanya **keras dan kasar**. Dipakai saat darurat (「逃[に]げろ！」), di rambu (「止[と]まれ」), di olahraga, atau antar teman laki-laki yang sangat akrab.',
        'Sebagai pelajar, fokuslah pada **memahaminya** saat mendengar pengumuman bencana atau membaca rambu. Untuk meminta orang sehari-hari pakai **V-てください** / **V-ないでください**.'
      ],
      contoh: [
        { jp: '地震[じしん]だ！ 机[つくえ]の下[した]に{入[はい]れ}！', id: 'Gempa! Masuk ke bawah meja!' },
        { jp: '火事[かじ]だ！ 早[はや]く{逃[に]げろ}！', id: 'Kebakaran! Cepat lari!' },
        { jp: '危[あぶ]ない！ ここでは、走[はし]る{な}！', id: 'Awas! Di sini jangan lari!' },
        { jp: '道[みち]に、「{止[と]まれ}」と書[か]いてあります。', id: 'Di jalan tertulis “Berhenti”.' },
        { jp: '試合[しあい]で、コーチが「もっと{走[はし]れ}！ あきらめる{な}！」と言[い]いました。', id: 'Dalam pertandingan, pelatih berkata, “Lari lebih banyak! Jangan menyerah!”' },
        { jp: 'A：{待[ま]て}！ そっちに行[い]く{な}！\nB：えっ、どうして？', id: 'A: Tunggu! Jangan pergi ke sana!\nB: Eh, kenapa?' }
      ],
      awas: [
        'Jangan dipakai ke atasan, guru, atau orang yang baru kamu kenal. Terdengar sangat kasar. Pakai **V-てください** / **V-ないでください**.',
        '「走[はし]るな」 = “jangan lari!” (larangan keras). 「走[はし]らない」 = “tidak lari” (hanya bentuk negatif biasa). Jangan tertukar.'
      ],
      kw: 'perintah larangan darurat rambu kasar jangan cepat lari gempa kebakaran'
    },
    {
      name: 'V-ないようにしてください',
      short: 'ないように',
      arti: 'usahakan jangan ~ (permintaan halus)',
      inti: 'Pakai ini untuk meminta orang **berusaha supaya tidak** melakukan sesuatu. Lebih **lembut** daripada “jangan ~”.',
      rumus: [['V-ない', '+', '=ように', '+', '=してください'], ['V-る', '+', '=ように', '+', '=してください']],
      rumusNote: 'V-ない → “usahakan jangan ~” · V-る → “usahakan ~”',
      jelas: [
        '**V-ない＋ようにしてください** = “**usahakan jangan** ~”. Lebih **lunak** daripada V-ないでください (“jangan ~”), karena hanya meminta kamu **berusaha**.',
        'Positif: **V-る＋ようにしてください** = “**usahakan** ~”: 「毎日[まいにち]、水[みず]を飲[の]む{ようにしてください}」.',
        'Sering ditemani **できるだけ** atau **なるべく** (sebisa mungkin): 「できるだけ、走[はし]らない{ようにしてください}」.',
        'Cocok untuk **pengumuman, nasihat, dan petunjuk keselamatan**, karena terdengar sopan dan tidak memaksa.'
      ],
      contoh: [
        { jp: '地震[じしん]のときは、エレベーターを使[つか]わない{ようにしてください}。', id: 'Saat gempa, tolong usahakan jangan memakai lift.' },
        { jp: 'ここでは、大[おお]きい声[こえ]で話[はな]さない{ようにしてください}。', id: 'Di sini, tolong usahakan jangan bicara dengan suara keras.' },
        { jp: '夜[よる]は、できるだけ一人[ひとり]で歩[ある]かない{ようにしてください}。', id: 'Malam hari, sebisa mungkin usahakan jangan berjalan sendirian.' },
        { jp: '熱[あつ]いので、さわらない{ようにしてください}。', id: 'Karena panas, tolong usahakan jangan menyentuhnya.' },
        { jp: '毎日[まいにち]、水[みず]を飲[の]む{ようにしてください}。', id: 'Tolong usahakan minum air setiap hari.' },
        { jp: 'A：地震[じしん]のとき、どうしたらいいですか。\nB：あわてて外[そと]に出[で]ない{ようにしてください}。', id: 'A: Kalau ada gempa, sebaiknya bagaimana?\nB: Tolong usahakan jangan panik keluar.' }
      ],
      awas: [
        '**ようにしてください** lebih lembut daripada **ないでください**. Untuk larangan tegas (rambu, bahaya langsung) pakai V-てはいけません (Bab 10) atau V-るな.',
        'Jangan hilangkan **して**: ×使[つか]わないようにください → ○使[つか]わない{ようにしてください}. Dan sebelum ように pakai **bentuk biasa**, bukan ます: ×使[つか]いませんようにしてください.'
      ],
      kw: 'usahakan jangan sebisa mungkin permintaan halus pengumuman nasihat keselamatan'
    },
    {
      name: 'V-（られ）なくなります',
      short: 'なくなります',
      arti: 'jadi tidak bisa ~ / tidak ~ lagi',
      inti: 'Pakai ini untuk bilang bahwa **keadaan berubah** dari “bisa / biasa” menjadi “**tidak bisa / tidak lagi**”.',
      rumus: [['V-（られ）ない', '→', 'V-（られ）な', '+', '=くなります']],
      rumusNote: 'V-ない → buang い, ganti くなります (seperti sifat-い: 高[たか]い → 高[たか]くなります)',
      tabel: [{
        judul: 'Dua cara pakai',
        kepala: ['Macam', 'Contoh', 'Artinya'],
        baris: [
          ['Jadi tidak bisa', '逃[に]げられなくなります', 'jadi tidak bisa kabur'],
          ['Jadi tidak bisa', '歩[ある]けなくなります', 'jadi tidak bisa berjalan'],
          ['Jadi tidak ~', '動[うご]かなくなります', 'jadi tidak bergerak / tidak berfungsi'],
          ['Tidak lagi', '食[た]べなくなります', 'jadi tidak makan lagi']
        ]
      }],
      jelas: [
        'Dari **V-ない**, buang **い** lalu ganti **くなります**: 開[あ]かない → 開[あ]か{なくなります}.',
        'Dua arti: (1) dengan **bentuk bisa** → “**jadi tidak bisa** ~”: 逃[に]げられ{なくなります}. (2) dengan kata kerja biasa → “**jadi tidak ~ / tidak lagi ~**”: 動[うご]か{なくなります}, 食[た]べ{なくなります}.',
        'Intinya ada **perubahan** dari keadaan yang tadinya normal. Dipakai untuk **menjelaskan bahaya**: “kalau begini, nanti jadi tidak bisa ~”.',
        'Lampau: **V-なくなりました** = “sudah jadi tidak ~”: 「スマホが動[うご]かなくなりました」 = “HP-ku jadi tidak berfungsi”.'
      ],
      contoh: [
        { jp: '煙[けむり]が多[おお]いと、前[まえ]が見[み]え{なくなります}。', id: 'Kalau asapnya banyak, bagian depan jadi tidak kelihatan.' },
        { jp: '地震[じしん]のあと、電車[でんしゃ]が動[うご]か{なくなりました}。', id: 'Setelah gempa, kereta jadi tidak jalan.' },
        { jp: '停電[ていでん]になると、エレベーターが使[つか]え{なくなります}。', id: 'Kalau listrik padam, lift jadi tidak bisa dipakai.' },
        { jp: '足[あし]をけがして、走[はし]れ{なくなりました}。', id: 'Karena kakiku cedera, aku jadi tidak bisa berlari.' },
        { jp: '最近[さいきん]、子[こ]どもが野菜[やさい]を食[た]べ{なくなりました}。', id: 'Akhir-akhir ini anak saya jadi tidak mau makan sayur.' },
        { jp: 'パスワードを忘[わす]れると、スマホが使[つか]え{なくなります}よ。', id: 'Kalau lupa kata sandi, HP jadi tidak bisa dipakai lho.' }
      ],
      awas: [
        '**なくなる** juga kata kerja sendiri: 「お金[かね]がなくなりました」 = “uangnya habis”. Di pola ini, yang ditaruh di depannya adalah **kata kerja bentuk ない** (動[うご]か**なく**なる).',
        'Jangan tertukar dengan **V-ようになりました** (Bab 17). 話[はな]せる**ようになりました** = jadi **bisa**; 話[はな]せ**なくなりました** = jadi **tidak bisa**. Dua-duanya kebalikan.'
      ],
      kw: 'jadi tidak bisa tidak lagi berhenti perubahan keadaan bahaya tidak berfungsi'
    },
    {
      name: 'Sても、～',
      short: 'ても',
      arti: 'meskipun ~, tetap ~',
      inti: 'Pakai **ても** untuk bilang “**meskipun / biarpun** ~”. Bagian belakang tetap berlaku walaupun ada kondisi di depan.',
      rumus: [['V-て', '+', '=も', '、', 'Kalimat'], ['イA-く', '+', '=ても', '、', 'Kalimat'], ['ナA／N', '+', '=でも', '、', 'Kalimat']],
      rumusNote: 'Sifat-い: い → くても · Sifat-な dan kata benda: でも',
      tabel: [{
        judul: 'Membuat bentuk ても',
        kepala: ['Jenis', 'Biasa', 'Bentuk ても'],
        baris: [
          ['Kata kerja', '来[く]る', '来[き]ても'],
          ['Kata kerja', '行[い]く', '行[い]っても'],
          ['Kata kerja', '飲[の]む', '飲[の]んでも'],
          ['Negatif', '食[た]べない', '食[た]べなくても'],
          ['Sifat-い', '高[たか]い', '高[たか]くても'],
          ['Sifat-な', '静[しず]か', '静[しず]かでも'],
          ['Kata benda', '雨[あめ]', '雨[あめ]でも']
        ]
      }],
      jelas: [
        '**ても** = “meskipun / biarpun”. Bagian depan adalah **kondisi**, bagian belakang adalah hasil yang **tetap berlaku** (atau tidak sesuai harapan).',
        'Kata kerja: ambil bentuk **て** lalu tambah **も** (行[い]っ**て** → 行[い]っ**ても**). Sifat-い: い → **くても**. Sifat-な dan kata benda: **でも**.',
        'Bagian belakang bisa berupa **pernyataan tegas, permintaan, atau larangan**: 「雨[あめ]が降[ふ]っ{ても}、行[い]きます」 = “meskipun hujan, saya tetap pergi”.',
        'Beda dengan ～たら (Bab 7): たら = “kalau ~” (syarat biasa); ても = “**bahkan kalau** ~, tetap ~”.',
        'Kalau di depannya ada kata tanya, artinya “mana pun / kapan pun” (Bab 13): 「いつ来[き]{ても}いい」.'
      ],
      contoh: [
        { jp: '雨[あめ]が降[ふ]っ{ても}、試合[しあい]は行[おこな]われます。', id: 'Meskipun hujan, pertandingan tetap diadakan.' },
        { jp: '安[やす]く{ても}、使[つか]わないものは買[か]いません。', id: 'Meskipun murah, barang yang tidak dipakai tidak saya beli.' },
        { jp: '日曜日[にちようび]で{も}、仕事[しごと]があります。', id: 'Meskipun hari Minggu, ada pekerjaan.' },
        { jp: '薬[くすり]を飲[の]ん{でも}、まだ熱[ねつ]が下[さ]がりません。', id: 'Meskipun sudah minum obat, demamnya belum turun.' },
        { jp: 'A：遅[おく]れ{ても}、入[はい]れますか。\nB：はい、遅[おく]れ{ても}大丈夫[だいじょうぶ]ですよ。', id: 'A: Meskipun terlambat, bisa masuk?\nB: Ya, meskipun terlambat tidak apa-apa lho.' },
        { jp: '一人[ひとり]で行[い]っ{ても}、楽[たの]しいですよ。', id: 'Meskipun pergi sendirian, tetap menyenangkan lho.' }
      ],
      awas: [
        'Jangan lupa bentuk **て**: ×行[い]くも → ○行[い]っ{ても}. Sifat-い pakai **くても** (×高[たか]いても).',
        'Sifat-な dan kata benda pakai **でも**: ○雨[あめ]でも, ○静[しず]かでも (×雨[あめ]ても).'
      ],
      kw: 'meskipun biarpun walaupun tetap kondisi'
    },
    {
      name: 'V（普通形[ふつうけい]）かどうか、～',
      short: 'かどうか',
      arti: 'apakah ~ atau tidak',
      inti: 'Pakai ini untuk **menyelipkan pertanyaan ya / tidak** ke dalam kalimat lain: “tidak tahu **apakah** ~ **atau tidak**”.',
      rumus: [['S (bentuk biasa)', '+', '=かどうか', '、', 'わかりません／聞[き]きます …']],
      rumusNote: 'Kata benda dan sifat-な: tanpa だ (安全[あんぜん]かどうか)',
      tabel: [{
        judul: 'Bentuk di depan かどうか',
        kepala: ['Jenis', 'Kalimat biasa', '＋ かどうか'],
        baris: [
          ['Kata kerja', '行[い]く', '行[い]くかどうか'],
          ['Lampau', '終[お]わった', '終[お]わったかどうか'],
          ['Negatif', '来[こ]ない', '来[こ]ないかどうか'],
          ['Sifat-い', 'おいしい', 'おいしいかどうか'],
          ['Sifat-な', '安全[あんぜん]（だ）', '安全[あんぜん]かどうか'],
          ['Kata benda', '本当[ほんとう]（だ）', '本当[ほんとう]かどうか']
        ]
      }],
      jelas: [
        '**かどうか** = “apakah ~ atau tidak”. Pertanyaan **ya / tidak** (「バスは来[く]る？」) diselipkan ke dalam kalimat: 「バスが来[く]る{かどうか}、わかりません」.',
        'Bagian depan pakai **bentuk biasa** (bukan ます). Kata benda dan sifat-な **tanpa だ**: 「本当[ほんとう]{かどうか}」.',
        'Kata kerja di belakang biasanya soal **tahu / tanya / cek**: わかりません, 知[し]りません, 聞[き]いてみます, 確認[かくにん]してください, 調[しら]べます.',
        'Bedakan dengan 【kata tanya】+**か** (Bab 8): ada kata tanya → **か** saja (「どこにあるか、わかりません」). Tidak ada kata tanya (jawabannya ya / tidak) → **かどうか** (「あるかどうか、わかりません」).'
      ],
      contoh: [
        { jp: 'このバスが駅[えき]に行[い]く{かどうか}、わかりません。', id: 'Saya tidak tahu apakah bus ini pergi ke stasiun atau tidak.' },
        { jp: 'あしたの試合[しあい]がある{かどうか}、電話[でんわ]で聞[き]いてみます。', id: 'Saya akan coba bertanya lewat telepon apakah pertandingan besok ada atau tidak.' },
        { jp: 'この水[みず]が飲[の]める{かどうか}、教[おし]えてください。', id: 'Tolong beri tahu apakah air ini bisa diminum atau tidak.' },
        { jp: '避難所[ひなんじょ]が安全[あんぜん]{かどうか}、まだわかりません。', id: 'Belum tahu apakah tempat pengungsian itu aman atau tidak.' },
        { jp: '試験[しけん]に合格[ごうかく]した{かどうか}、まだ知[し]りません。', id: 'Saya belum tahu apakah lulus ujian atau tidak.' },
        { jp: 'A：あした、雨[あめ]が降[ふ]る{かどうか}、知[し]っていますか。\nB：いいえ、わかりません。天気予報[てんきよほう]を見[み]てみましょう。', id: 'A: Tahukah kamu apakah besok hujan atau tidak?\nB: Tidak tahu. Coba kita lihat prakiraan cuaca.' }
      ],
      awas: [
        'Kata benda dan sifat-な **tanpa だ**: ×安全[あんぜん]だかどうか → ○安全[あんぜん]かどうか.',
        'Di depan かどうか pakai **bentuk biasa**: ○行[い]くかどうか, bukan ×行[い]きますかどうか. Kesopanan kalimat ditentukan oleh bagian belakang (わかりません dan sebagainya).'
      ],
      kw: 'apakah atau tidak tanya ya tidak tidak tahu memastikan menanyakan kalimat tersisip'
    }
  ]
});
