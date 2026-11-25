/* =====================================================================
   data/buku/a2_07.js — Buku Bunpou Irodori A2 (初級1) · Bab 7
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧): ➊ Nはどうですか？ ➋ Nでもいいですか？
   ➌ Nで、～／V-て、～ ＜原因・理由＞.
   ===================================================================== */
FC.defineBuku('a2', {
  n: 7,
  title: '道[みち]に迷[まよ]ってちょっと遅[おく]れます',
  arti: 'Saya tersesat, jadi akan terlambat sedikit',
  topic: 'いっしょに出[で]かける',
  topicArti: 'Pergi bersama-sama',
  bisa: [
    'Menanyakan dan memahami waktu serta tempat janjian',
    'Mengusulkan waktu atau tempat bertemu, lalu menyepakatinya bersama',
    'Mengabari bahwa kamu akan terlambat, lengkap dengan alasannya',
    'Membaca dan menulis pesan singkat tentang keterlambatan'
  ],
  pola: [
    {
      name: 'Nはどうですか？',
      short: 'はどうですか',
      arti: 'bagaimana kalau N? (mengusulkan waktu／tempat)',
      inti: 'Pakai ini untuk **mengusulkan** sesuatu sambil menanyakan pendapat lawan bicara: **“Bagaimana kalau …?”** Di bab ini N adalah waktu atau tempat janjian.',
      rumus: [['N', '+', '=は', '+', '=どうですか？']],
      rumusNote: 'N = kata waktu／tempat／pilihan (6時[ろくじ]・駅[えき]の前[まえ]・北口[きたぐち])',
      jelas: [
        '**Nはどうですか？** = “Bagaimana kalau N?”. Kamu mengusulkan sesuatu, lalu bertanya apakah lawan bicara setuju: 「6時[ろくじ]{はどうですか}？」 = “Bagaimana kalau jam 6?”.',
        'Di bab ini N biasanya **kata waktu** (6時[ろくじ], 明日[あした], 土曜日[どようび]) atau **tempat** (駅[えき]の北口[きたぐち], 駅[えき]の前[まえ]) untuk menentukan janji bertemu.',
        'Menjawab: setuju → 「いいですよ」「はい、大丈夫[だいじょうぶ]です」; kurang cocok → 「すみません、ちょっと…」, lalu ajukan usul lain (lihat pola berikutnya). Kalau sudah sepakat, biasanya diulang untuk memastikan: 「わかりました。北口[きたぐち]ですね」.',
        'Pola yang sama juga dipakai untuk menanyakan **kesan／keadaan**: 「日本[にほん]の生活[せいかつ]{はどうですか}？」 = “Bagaimana hidup di Jepang?”. Konteks menentukan artinya.'
      ],
      contoh: [
        { jp: '明日[あした]の午後[ごご]{はどうですか}？', id: 'Bagaimana kalau besok sore?' },
        { jp: '待[ま]ち合[あ]わせは、駅[えき]の前[まえ]{はどうですか}？', id: 'Untuk tempat janjian, bagaimana kalau di depan stasiun?' },
        { jp: 'A：何時[なんじ]にしますか。\nB：6時[ろくじ]{はどうですか}？\nA：はい、いいですよ。', id: 'A: Jam berapa kita ketemu?\nB: Bagaimana kalau jam 6?\nA: Ya, boleh.' },
        { jp: '来週[らいしゅう]の土曜日[どようび]{はどうですか}？', id: 'Bagaimana kalau Sabtu depan?' },
        { jp: 'A：どこで会[あ]いますか。\nB：駅[えき]の北口[きたぐち]{はどうですか}？\nA：わかりました。北口[きたぐち]ですね。', id: 'A: Kita ketemu di mana?\nB: Bagaimana kalau di pintu keluar utara stasiun?\nA: Baik. Pintu keluar utara ya.' },
        { jp: '新[あたら]しい学校[がっこう]{はどうですか}？', id: 'Bagaimana sekolah barumu?' }
      ],
      awas: [
        '**どうですか** di sini bukan menanyakan “bagaimana caranya”. 「駅[えき]はどうですか」 = “Bagaimana kalau (bertemu di) stasiun?”. Untuk menanyakan cara, pakai どうやって.',
        'Pola ini dipakai untuk **kata benda** (waktu, tempat, barang). Untuk mengajak melakukan kegiatan, pakai 「V-ませんか？」 atau 「V-ましょう」.'
      ],
      kw: 'bagaimana kalau usul waktu tempat janjian bertemu どうですか mengusulkan'
    },
    {
      name: 'Nでもいいですか？',
      short: 'でもいいですか',
      arti: 'kalau N, apakah boleh? (mengusulkan alternatif)',
      inti: 'Pakai ini untuk **menawarkan pilihan lain** dan menanyakan apakah lawan bicara keberatan: **“Kalau N, apakah tidak apa-apa?”**',
      rumus: [['N', '+', '=でも', '+', '=いいですか？']],
      rumusNote: 'N = waktu／tempat／benda · Jawab: いいですよ ／ すみません、ちょっと…',
      jelas: [
        '**Nでもいいですか？** = “Kalau N, apakah boleh?”. Dipakai saat usul lawan bicara **kurang cocok** bagimu, sehingga kamu menawarkan alternatif. Contoh: diusulkan jam 6, tapi kamu baru bisa jam 6.30 → 「6時半[ろくじはん]{でもいいですか}？」.',
        '**でも** memberi kesan “kalau ini pun tidak apa-apa?”, jadi terdengar **rendah hati** dan cocok untuk meminta kelonggaran.',
        'Menjawab: boleh → 「いいですよ」「大丈夫[だいじょうぶ]です」; tidak bisa → 「すみません、ちょっと…」 (menolak halus), lalu beri usul lain.',
        'Kedua pola bab ini sering berpasangan: yang satu mengusulkan dengan 「Nはどうですか？」, yang satu menawar dengan 「N’でもいいですか？」.'
      ],
      contoh: [
        { jp: '6時半[ろくじはん]{でもいいですか}？', id: 'Kalau jam 6.30, apakah boleh?' },
        { jp: 'コンビニの前[まえ]{でもいいですか}？', id: 'Kalau di depan minimarket, apakah boleh?' },
        { jp: 'A：6時[ろくじ]はどうですか。\nB：すみません、仕事[しごと]があります。7時[しちじ]{でもいいですか}？\nA：いいですよ。', id: 'A: Bagaimana kalau jam 6?\nB: Maaf, saya ada kerja. Kalau jam 7, apakah boleh?\nA: Boleh.' },
        { jp: '日曜日[にちようび]{でもいいですか}？', id: 'Kalau hari Minggu, apakah boleh?' },
        { jp: 'A：図書館[としょかん]の前[まえ]で会[あ]いましょう。\nB：すみません、場所[ばしょ]がよくわかりません。駅[えき]の前[まえ]{でもいいですか}？\nA：はい、いいですよ。', id: 'A: Ayo bertemu di depan perpustakaan.\nB: Maaf, saya kurang tahu tempatnya. Kalau di depan stasiun, apakah boleh?\nA: Ya, boleh.' },
        { jp: 'こちらの席[せき]{でもいいですか}？', id: 'Kalau kursi di sini, apakah boleh?' }
      ],
      awas: [
        'N dipasang **langsung** sebelum でも, tanpa partikel lain: ×6時半[ろくじはん]にでもいいですか → ○6時半[ろくじはん]でもいいですか.',
        'Bedakan: **Nでもいいですか？** (usul alternatif: “kalau N bagaimana?”) dan **疑問詞[ぎもんし]＋でもいいです** (apa pun boleh, bab 11).',
        'Pola ini hanya untuk **kata benda**. Untuk meminta izin melakukan sesuatu (“bolehkah saya makan?”) bentuknya lain: V-てもいいですか？ (bab 14).'
      ],
      kw: 'kalau boleh alternatif tawar menawar waktu tempat でも いいですか izin'
    },
    {
      name: 'Nで、～ ／ V-て、～（原因[げんいん]・理由[りゆう]）',
      short: 'で／て 理由[りゆう]',
      arti: 'karena ~ (sebab／alasan)',
      inti: 'Pakai ini untuk menyebut **sebab** terjadinya sesuatu: **kata benda ＋ で** atau **kata kerja bentuk て**, lalu akibatnya.',
      rumus: [['N', '+', '=で', '、', 'Akibat'], ['V-て', '、', 'Akibat']],
      rumusNote: 'V-て = bentuk-te · Akibat = kejadian／keadaan (terlambat, berhenti, bingung, dan sebagainya)',
      tabel: [{
        judul: 'Ingat lagi: bentuk V-て',
        kepala: ['Kelompok', 'Bentuk kamus', 'V-て'],
        baris: [
          ['Kel. 1', '迷[まよ]う ・ 待[ま]つ ・ 乗[の]る', '迷[まよ]って ・ 待[ま]って ・ 乗[の]って'],
          ['Kel. 1', '読[よ]む ・ 遊[あそ]ぶ', '読[よ]んで ・ 遊[あそ]んで'],
          ['Kel. 1', '書[か]く ・ 行[い]く', '書[か]いて ・ 行[い]って（行[い]く = pengecualian）'],
          ['Kel. 1', '話[はな]す', '話[はな]して'],
          ['Kel. 2', '起[お]きる ・ 食[た]べる', '起[お]きて ・ 食[た]べて'],
          ['Kel. 3', 'する ・ 来[く]る', 'して ・ 来[き]て']
        ]
      }],
      jelas: [
        '**Nで** = “karena N”. N adalah **kejadian／keadaan** yang menjadi sebab: 事故[じこ] (kecelakaan), 渋滞[じゅうたい] (macet), 雨[あめ] (hujan), 病気[びょうき] (sakit). 「大雪[おおゆき]{で}、バスが遅[おく]れました」 = “Karena salju lebat, busnya terlambat”.',
        '**V-て** = “karena melakukan／mengalami V”: 「道[みち]に迷[まよ]っ{て}、ちょっと遅[おく]れます」, 「財布[さいふ]を忘[わす]れ{て}、取[と]りに帰[かえ]りました」.',
        'Bentuk て yang kamu kenal untuk **menyambung kalimat／urutan kegiatan** juga bisa menyatakan **sebab**. Mana yang dimaksud ditentukan oleh isi kalimatnya.',
        'Bagian akibat biasanya berupa **kejadian, keadaan atau perasaan** (terlambat, berhenti, bingung, lelah). Cocok sekali untuk memberi kabar: 「事故[じこ]{で}、電車[でんしゃ]が止[と]まりました」.',
        'Waktu (lampau／sekarang) ditandai **di akhir kalimat saja**; bagian て tidak berubah: 「ねぼうし{て}、遅[おく]れ{ました}」.'
      ],
      contoh: [
        { jp: '事故[じこ]{で}、電車[でんしゃ]が止[と]まりました。', id: 'Karena kecelakaan, kereta berhenti.' },
        { jp: '台風[たいふう]{で}、飛行機[ひこうき]が遅[おく]れました。', id: 'Karena topan, pesawat terlambat.' },
        { jp: 'ねぼうし{て}、会社[かいしゃ]に遅[おく]れました。', id: 'Karena kesiangan, saya terlambat ke kantor.' },
        { jp: '雨[あめ]{で}、電車[でんしゃ]が遅[おく]れています。', id: 'Karena hujan, kereta terlambat.' },
        { jp: '風邪[かぜ]{で}、きのうは学校[がっこう]を休[やす]みました。', id: 'Karena flu, kemarin saya tidak masuk sekolah.' },
        { jp: 'A：遅[おそ]かったですね。\nB：すみません。電車[でんしゃ]が止[と]まっ{て}、遅[おく]れました。', id: 'A: Kamu terlambat ya.\nB: Maaf. Kereta berhenti, jadi saya terlambat.' }
      ],
      awas: [
        'Setelah て-sebab, bagian akibat **tidak boleh berupa perintah, ajakan, permintaan atau niat**: ×雨[あめ]で、家[いえ]で食[た]べましょう → ○雨[あめ]ですから、家[いえ]で食[た]べましょう. Untuk itu pakai **から**.',
        'Hati-hati, **で** juga berarti “dengan／naik”. 「バス{で}行[い]きます」 = naik bus; 「事故[じこ]{で}遅[おく]れます」 = karena kecelakaan. Artinya ditentukan oleh kata bendanya.',
        'Jangan ubah bentuk て demi menyatakan waktu: ×ねぼうしたて、遅[おく]れました → ○ねぼうして、遅[おく]れました.'
      ],
      kw: 'karena alasan sebab terlambat で て macet kecelakaan hujan ねぼう'
    }
  ]
});
