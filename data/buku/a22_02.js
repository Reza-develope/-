/* =====================================================================
   data/buku/a22_02.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 2
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   ===================================================================== */
FC.defineBuku('a22', {
  n: 2,
  title: 'まじめそうな人[ひと]ですね',
  arti: 'Orangnya kelihatan serius ya',
  topic: '私[わたし]の周[まわ]りの人[ひと]たち',
  topicArti: 'Orang-orang di sekitarku',
  bisa: [
    'Menjelaskan ciri-ciri orang: rambut, mata, tinggi badan, dan sifatnya',
    'Menunjuk orang lewat pakaian atau kegiatannya (“orang yang memakai topi”)',
    'Memberi tahu sesuatu yang belum diketahui lawan bicara dengan よ',
    'Menyebut beberapa alasan atau kelebihan sekaligus dengan し'
  ],
  pola: [
    {
      name: 'N1はN2が ナA-です／イA-いです',
      short: 'N1はN2が',
      arti: 'N1 itu N2-nya ~ (ciri orang / benda)',
      inti: 'Pakai ini untuk menjelaskan **bagian atau ciri** dari seseorang: “Si A, **rambutnya** pendek”.',
      rumus: [['N1', '+', '=は', '+', 'N2', '+', '=が', '+', 'kata sifat']],
      rumusNote: 'N1 = orangnya (topik) · N2 = bagian / cirinya · kata sifat = kata sifat-い atau -な',
      jelas: [
        'Dua tahap: **N1** = yang dibicarakan, **N2** = bagiannya. 「アリさん{は}背[せ]{が}高[たか]いです」 = “Ali itu tinggi badannya”.',
        'N2 yang sering dipakai: 髪[かみ] (rambut), 目[め] (mata), 背[せ] (tinggi badan), 声[こえ] (suara), 性格[せいかく] (sifat).',
        'Kata sifat-い: 長[なが]い (panjang), 短[みじか]い (pendek), 大[おお]きい (besar), 優[やさ]しい (baik hati). Kata sifat-な: きれい, 上手[じょうず], 静[しず]か.',
        'Bonus: di judul bab ada まじめ**そう**な人[ひと] = “orang yang **kelihatannya** serius”. Bentuk そう belum jadi target bab ini, cukup dikenali dulu.'
      ],
      contoh: [
        { jp: 'アリさんは、背[せ]{が}高[たか]いです。', id: 'Ali itu tinggi badannya.' },
        { jp: 'ディアンさんは、髪[かみ]{が}長[なが]いです。', id: 'Rambut Dian panjang.' },
        { jp: 'リナさんは、目[め]{が}大[おお]きいです。', id: 'Mata Rina besar.' },
        { jp: 'うちの猫[ねこ]は、しっぽ{が}長[なが]いです。', id: 'Kucing di rumah saya ekornya panjang.' },
        { jp: 'A：田中[たなか]さんは、どんな人[ひと]ですか。\nB：背[せ]{が}高[たか]くて、性格[せいかく]{が}いいです。', id: 'A: Tanaka-san itu orang yang seperti apa?\nB: Badannya tinggi, dan sifatnya baik.' }
      ],
      awas: [
        'Setelah N2 pakai **が**, bukan を: ×髪[かみ]を長[なが]いです → ○髪[かみ]が長[なが]いです.',
        '高[たか]い bisa “tinggi” atau “mahal”. Untuk orang, sebut bagiannya: 背[せ]が高[たか]いです (jangan hanya 高[たか]いです).'
      ],
      kw: 'ciri rambut mata tinggi badan sifat penampilan deskripsi orang'
    },
    {
      name: 'V-ている＋N',
      short: 'ている＋N',
      arti: 'N yang sedang ~ / yang memakai ~',
      inti: 'Pakai ini untuk **menunjuk orang atau benda** lewat apa yang sedang dikerjakan atau dipakainya.',
      rumus: [['V-て', '+', '=いる', '+', 'N']],
      rumusNote: 'Keterangan ditaruh **di depan** kata bendanya (kebalikan dari bahasa Indonesia)',
      jelas: [
        'Bahasa Jepang menaruh keterangan **sebelum** kata benda. “Orang **yang memakai topi**” → 「帽子[ぼうし]をかぶっ{ている}人[ひと]」.',
        'Sebelum N pakai **bentuk biasa** (V-ている), bukan V-ています: 「本[ほん]を読[よ]ん{でいる}人[ひと]」.',
        'Kata kerja “memakai / membawa” yang sering muncul: かぶっている (topi), かけている (kacamata), 着[き]ている (baju), はいている (celana, sepatu), 持[も]っている (membawa).',
        'Cocok untuk menjawab 「どの人[ひと]ですか」 = “yang mana orangnya?”.'
      ],
      contoh: [
        { jp: 'あそこで、コーヒーを{飲[の]んでいる}人[ひと]は、だれですか。', id: 'Siapa orang yang sedang minum kopi di sana itu?' },
        { jp: '赤[あか]い帽子[ぼうし]を{かぶっている}人[ひと]が、ディアンさんです。', id: 'Orang yang memakai topi merah itu Dian.' },
        { jp: '先生[せんせい]と{話[はな]している}人[ひと]は、私[わたし]の友[とも]だちです。', id: 'Orang yang sedang bicara dengan guru itu teman saya.' },
        { jp: '黒[くろ]いかばんを{持[も]っている}人[ひと]を知[し]っていますか。', id: 'Apakah kamu kenal orang yang membawa tas hitam?' },
        { jp: 'A：山田[やまだ]さんは、どの人[ひと]ですか。\nB：あそこで、写真[しゃしん]を{撮[と]っている}人[ひと]です。', id: 'A: Yamada-san itu yang mana?\nB: Orang yang sedang memotret di sana.' }
      ],
      awas: [
        'Jangan pakai bentuk sopan di depan kata benda: ×飲[の]んでいます人[ひと] → ○飲[の]んでいる人[ひと].',
        'Urutannya terbalik dari bahasa Indonesia: ×人[ひと]帽子[ぼうし]をかぶっている → ○帽子[ぼうし]をかぶっている人[ひと].'
      ],
      kw: 'yang sedang yang memakai orang yang menunjuk orang topi kacamata membawa'
    },
    {
      name: 'Sよ',
      short: 'よ',
      arti: 'lho / ya (memberi tahu)',
      inti: 'Taruh **よ** di akhir kalimat untuk **memberi tahu** sesuatu yang mungkin belum diketahui lawan bicaramu.',
      rumus: [['Kalimat', '+', '=よ']],
      rumusNote: 'Kalimat boleh bentuk sopan (ですよ、ますよ) atau bentuk biasa (だよ)',
      tabel: [{
        judul: 'よ dan ね itu beda',
        kepala: ['Akhiran', 'Fungsi'],
        baris: [
          ['よ', 'memberi tahu hal baru: あしたは休[やす]みですよ。'],
          ['ね', 'minta persetujuan: いい天気[てんき]ですね。']
        ]
      }],
      jelas: [
        '**よ** = “lho / ya / nih”. Kamu tahu sesuatu, lawan bicara mungkin belum tahu: 「あの人[ひと]は先生[せんせい]です{よ}」.',
        'Cocok untuk **memberi tahu, mengingatkan, atau memperingatkan**: 「危[あぶ]ないです{よ}」 = “awas, bahaya lho”.',
        'Di obrolan, ～ている sering terdengar ～てる: 「読[よ]んでる人[ひと]ですよ」.'
      ],
      contoh: [
        { jp: 'この店[みせ]のラーメンは、おいしいです{よ}。', id: 'Ramen toko ini enak lho.' },
        { jp: 'あしたは、学校[がっこう]が休[やす]みです{よ}。', id: 'Besok sekolah libur lho.' },
        { jp: 'あそこで、本[ほん]を読[よ]んでる人[ひと]が、田中[たなか]さんです{よ}。', id: 'Orang yang sedang baca buku di sana itu Tanaka-san lho.' },
        { jp: 'その道[みち]は、車[くるま]が多[おお]いです{よ}。', id: 'Jalan itu banyak mobilnya lho (hati-hati).' },
        { jp: 'A：いい天気[てんき]ですね。\nB：ええ。でも、午後[ごご]は雨[あめ]です{よ}。', id: 'A: Cuacanya bagus ya.\nB: Iya. Tapi sore nanti hujan lho.' }
      ],
      awas: [
        'Kalau kamu dan lawan bicara **sama-sama sudah tahu**, pakai ね (bukan よ): cuaca bagus yang kelihatan oleh kalian berdua → いい天気[てんき]ですね.',
        'Ke atasan atau orang yang baru kenal, よ bisa terdengar menggurui. Pakai dengan nada lembut: ですよ／ますよ.'
      ],
      kw: 'lho ya memberi tahu menekankan akhiran kalimat mengingatkan'
    },
    {
      name: 'Sし、～',
      short: 'し',
      arti: '~, lagi pula ~ (beberapa alasan / ciri)',
      inti: 'Pakai **し** untuk **menumpuk beberapa alasan atau kelebihan** sekaligus: “…, … pula, …”.',
      rumus: [['Alasan 1', '+', '=し', '、', 'Alasan 2', '+', '=し', '、', 'Kesimpulan']],
      rumusNote: 'Sebelum し pakai **bentuk biasa** (lihat tabel)',
      tabel: [{
        judul: 'Bentuk biasa sebelum し',
        kepala: ['Jenis', 'Bentuk sopan', 'Sebelum し'],
        baris: [
          ['Kata kerja', '行[い]きます', '行[い]くし'],
          ['Kerja (negatif)', '行[い]きません', '行[い]かないし'],
          ['Sifat-い', '安[やす]いです', '安[やす]いし'],
          ['Sifat-な', '便利[べんり]です', '便利[べんり]だし'],
          ['Kata benda', '雨[あめ]です', '雨[あめ]だし']
        ]
      }],
      jelas: [
        '**し** = “…, ditambah lagi …”. Menyebut alasan atau kelebihan satu per satu: 「この店[みせ]は、安[やす]い{し}、おいしいです」.',
        'Biasanya dipakai **dua kali** (～し、～し、kesimpulan). Boleh juga **sekali saja**, terdengar seperti “dan masih ada alasan lain”.',
        'Kata sifat-な dan kata benda wajib pakai **だ** sebelum し: 便利[べんり]**だ**し, 雨[あめ]**だ**し.',
        'Cocok untuk **memberi alasan** atau **memuji**: 「いい人[ひと]だし、親切[しんせつ]です」.'
      ],
      contoh: [
        { jp: 'このレストランは、安[やす]い{し}、おいしい{し}、人気[にんき]があります。', id: 'Restoran ini murah, enak, dan populer.' },
        { jp: 'アリさんは、背[せ]が高[たか]い{し}、優[やさ]しい{し}、サッカーも上手[じょうず]です。', id: 'Ali tinggi, baik hati, dan jago main bola juga.' },
        { jp: 'きょうは、雨[あめ]だ{し}、寒[さむ]い{し}、出[で]かけません。', id: 'Hari ini hujan dan dingin pula, jadi saya tidak keluar.' },
        { jp: 'この町[まち]は、バスが便利[べんり]だ{し}、物[もの]も安[やす]いです。', id: 'Kota ini busnya praktis, dan barang-barangnya juga murah.' },
        { jp: 'A：あした、いっしょに行[い]きませんか。\nB：すみません。あしたは、雨[あめ]だ{し}、ちょっと疲[つか]れています。', id: 'A: Besok pergi bareng, mau?\nB: Maaf. Besok hujan, lagi pula saya agak capek.' }
      ],
      awas: [
        'Jangan lupa **だ**: ×便利[べんり]し → ○便利[べんり]だし. (Di percakapan sopan, ～ですし juga dipakai; di buku ini kita latihan bentuk biasa dulu.)',
        'Untuk kegiatan **berurutan** (bangun, lalu cuci muka) pakai **て**, bukan し. し hanya untuk alasan atau ciri yang sejenis.'
      ],
      kw: 'alasan lagi pula dan juga beberapa alasan kelebihan'
    }
  ]
});
