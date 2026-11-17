/* =====================================================================
   data/buku/a22_03.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 3
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   ===================================================================== */
FC.defineBuku('a22', {
  n: 3,
  title: 'アレルギーがあるので、食[た]べられないんです',
  arti: 'Saya tidak bisa makan karena ada alergi',
  topic: 'レストランで',
  topicArti: 'Di restoran',
  bisa: [
    'Menjelaskan alasan dengan sopan, misalnya kenapa kamu tidak bisa makan sesuatu',
    'Memastikan sesuatu ke pelayan atau teman dengan よね',
    'Memilih saat memesan: “yang ini saja, tolong”',
    'Menyorot satu hal dari beberapa: “yang paling populer itu …”'
  ],
  pola: [
    {
      name: 'S1ので、S2',
      short: 'ので',
      arti: 'karena ~, jadi ~ (alasan yang lembut)',
      inti: 'Pakai **ので** untuk memberi **alasan dengan lembut**. Cocok saat menolak, minta maaf, atau menjelaskan keadaan.',
      rumus: [['Alasan', '+', '=ので', '、', 'Hasil']],
      rumusNote: 'Sebelum ので pakai bentuk biasa. Kata benda dan kata sifat-な berubah jadi **な**.',
      tabel: [{
        judul: 'Bentuk sebelum ので',
        kepala: ['Jenis', 'Bentuk biasa', 'Sebelum ので'],
        baris: [
          ['Kata kerja', '行[い]く', '行[い]くので'],
          ['Kerja (lampau)', '行[い]った', '行[い]ったので'],
          ['Sifat-い', '高[たか]い', '高[たか]いので'],
          ['Sifat-な', '静[しず]か', '静[しず]かなので'],
          ['Kata benda', '雨[あめ]', '雨[あめ]なので']
        ]
      }],
      jelas: [
        '**ので** = “karena”. Nadanya lebih lembut daripada から, jadi pas untuk **alasan menolak atau minta maaf**: 「アレルギーがある{ので}、食[た]べません」.',
        'Sama seperti から: alasan ditulis **di depan**, hasilnya di belakang.',
        'Perhatikan **な**: kata benda dan kata sifat-な + **な** + ので (雨[あめ]**な**ので, 静[しず]か**な**ので).',
        'Bonus: di judul bab, 食[た]べられない = “tidak bisa makan” (dibahas lengkap di Bab 5), dan **んです** memberi nada “saya jelaskan ya”. Cukup dikenali dulu.'
      ],
      contoh: [
        { jp: 'アレルギーがある{ので}、えびは食[た]べません。', id: 'Karena saya alergi, saya tidak makan udang.' },
        { jp: '雨[あめ]な{ので}、きょうは家[いえ]にいます。', id: 'Karena hujan, hari ini saya di rumah.' },
        { jp: 'この道[みち]は静[しず]かな{ので}、散歩[さんぽ]にいいです。', id: 'Jalan ini tenang, jadi bagus untuk jalan-jalan.' },
        { jp: '電車[でんしゃ]が遅[おく]れた{ので}、会社[かいしゃ]に遅[おく]れました。', id: 'Karena kereta terlambat, saya terlambat sampai di kantor.' },
        { jp: 'A：ご飯[はん]を、もう少[すこ]しいかがですか。\nB：いいえ、もうお腹[なか]がいっぱいな{ので}、けっこうです。', id: 'A: Mau nambah nasi sedikit lagi?\nB: Tidak, perut saya sudah penuh, jadi cukup, terima kasih.' }
      ],
      awas: [
        'Jangan lupa **な**: ×雨[あめ]だので, ×静[しず]かだので → ○雨[あめ]なので, ○静[しず]かなので.',
        'ので terdengar lebih **sopan dan objektif**, から lebih langsung. Saat menolak orang atau minta maaf, pilih ので.'
      ],
      kw: 'karena alasan menolak lembut sopan minta maaf'
    },
    {
      name: 'Sよね',
      short: 'よね',
      arti: '~ ya? / ~ kan? (memastikan)',
      inti: 'Pakai **よね** untuk **memastikan** sesuatu yang kamu kira benar: “…, kan?”.',
      rumus: [['Kalimat', '+', '=よね']],
      rumusNote: 'よ (memberi tahu) + ね (minta setuju) → よね (memastikan dugaan)',
      jelas: [
        '**よね** = “…, kan?”. Kamu **sudah punya dugaan**, lalu mengeceknya ke lawan bicara: 「豚肉[ぶたにく]は入[はい]っていません{よね}」.',
        'Sangat berguna **di restoran**: memastikan bahan makanan, harga, atau jam buka.',
        'Biasanya dijawab 「はい」 (benar) atau 「いいえ」 (bukan / ada).',
        'Di obrolan, ～ている sering terdengar ～てる: 「入[はい]ってます{よね}」.'
      ],
      contoh: [
        { jp: 'この料理[りょうり]、豚肉[ぶたにく]は入[はい]っていません{よね}。', id: 'Masakan ini tidak ada daging babinya, kan?' },
        { jp: 'あしたは、日曜日[にちようび]です{よね}。', id: 'Besok hari Minggu, kan?' },
        { jp: 'このお店[みせ]は、おすしが有名[ゆうめい]です{よね}。', id: 'Toko ini terkenal dengan sushinya, kan?' },
        { jp: 'リナさんは、先月[せんげつ]、日本[にほん]に来[き]ました{よね}。', id: 'Rina datang ke Jepang bulan lalu, kan?' },
        { jp: 'A：すみません、この料理[りょうり]に、えびは入[はい]っていません{よね}。\nB：はい、入[はい]っていませんよ。', id: 'A: Permisi, masakan ini tidak ada udangnya, kan?\nB: Ya, tidak ada kok.' }
      ],
      awas: [
        '**よ** = “kamu belum tahu, saya kasih tahu”. **よね** = “saya kira begitu, benar kan?”. Beda tujuan.',
        'Kalau kamu sama sekali **tidak tahu**, tanya biasa dengan か: 「えびは入[はい]っていますか」. よね dipakai kalau sudah ada dugaan.'
      ],
      kw: 'kan memastikan mengecek dugaan restoran bahan makanan'
    },
    {
      name: 'Nで～',
      short: 'Nで',
      arti: 'N saja (memilih salah satu)',
      inti: 'Pakai **で** setelah pilihanmu untuk bilang “**yang ini saja**”, misalnya saat memesan.',
      rumus: [['N', '+', '=で', '+', '=お願[ねが]いします'], ['N', '+', '=で', '+', '=いいです']],
      rumusNote: 'N = pilihanmu (meja, ukuran, jenis menu, hari, dan sebagainya)',
      jelas: [
        '**で** di sini = “pakai / dengan (pilihan ini)”. Dari beberapa pilihan, kamu mengambil satu: 「カウンター{で}お願[ねが]いします」 = “Counter saja, tolong”.',
        'Penutup yang umum: **お願[ねが]いします** (tolong / saya minta) dan **いいです** (itu sudah cukup / boleh).',
        'Sering dipakai saat memilih tempat duduk, ukuran, jenis menu, hari, atau cara bayar.',
        'Biasanya didahului pilihan: 「AとBがありますが…」 atau 「どちらにしますか」 (mau yang mana?).'
      ],
      contoh: [
        { jp: 'A：席[せき]は、テーブルとカウンターがありますが…。\nB：カウンター{で}お願[ねが]いします。', id: 'A: Tempat duduknya ada meja dan counter…\nB: Counter saja, tolong.' },
        { jp: 'A：飲[の]み物[もの]は、何[なに]にしますか。\nB：お茶[ちゃ]{で}いいです。', id: 'A: Minumnya mau apa?\nB: Teh saja sudah cukup.' },
        { jp: 'A：サイズは、どうしますか。\nB：Mサイズ{で}お願[ねが]いします。', id: 'A: Ukurannya mau yang mana?\nB: Ukuran M saja, tolong.' },
        { jp: 'A：いつがいいですか。\nB：土曜日[どようび]{で}いいです。', id: 'A: Kapan baiknya?\nB: Hari Sabtu saja boleh.' },
        { jp: 'A：お会計[かいけい]は、現金[げんきん]ですか。\nB：いいえ、カード{で}お願[ねが]いします。', id: 'A: Bayarnya tunai?\nB: Bukan, pakai kartu saja, tolong.' }
      ],
      awas: [
        'Ini beda dengan で “di tempat” (レストラン**で**食[た]べる = makan **di** restoran). Di sini で = “pilihan yang diambil”.',
        'Kalau tidak ada pilihan lain dan kamu hanya **meminta sesuatu**, pakai を: 「水[みず]をお願[ねが]いします」 = “minta air”.'
      ],
      kw: 'saja memilih pesan memesan pakai ukuran meja bayar'
    },
    {
      name: 'ナA-な／イA-い／V-る のは、Nです',
      short: 'のは、Nです',
      arti: 'yang ~ itu adalah N',
      inti: 'Pakai ini untuk **menyorot satu hal** dari beberapa: “yang paling populer itu …”.',
      rumus: [['Klausa (bentuk biasa)', '+', '=のは', '、', 'N', '+', '=です']],
      rumusNote: 'の mengubah klausa jadi “hal yang ~” · は = topik · N = jawabannya',
      tabel: [{
        judul: 'Bentuk sebelum のは',
        kepala: ['Jenis', 'Biasa', 'Sebelum のは'],
        baris: [
          ['Kata kerja', '飲[の]む', '飲[の]むのは'],
          ['Sifat-い', 'おいしい', 'おいしいのは'],
          ['Sifat-な', '有名[ゆうめい]', '有名[ゆうめい]なのは']
        ]
      }],
      jelas: [
        '**の** mengubah klausa jadi “hal yang ~”, **は** menjadikannya topik, lalu **N です** memberi jawabannya: 「人気[にんき]がある{のは}、ラーメン{です}」 = “Yang populer itu ramen”.',
        'Padanan bahasa Indonesianya “**yang … itu …**”. Cocok untuk menyebut yang paling enak, murah, atau populer di antara beberapa.',
        'Sebelum のは pakai **bentuk biasa**. Kata sifat-な + **な** (有名[ゆうめい]**な**のは).',
        'Sering dipakai untuk **menjawab** pertanyaan seperti 「何[なに]が人気[にんき]ですか」 (apa yang populer?).'
      ],
      contoh: [
        { jp: 'この店[みせ]で一番[いちばん]人気[にんき]がある{のは}、カレー{です}。', id: 'Yang paling populer di toko ini adalah kari.' },
        { jp: '安[やす]い{のは}、この赤[あか]いシャツ{です}。', id: 'Yang murah itu kemeja merah ini.' },
        { jp: '朝[あさ]、いつも飲[の]む{のは}、コーヒー{です}。', id: 'Yang selalu saya minum tiap pagi itu kopi.' },
        { jp: 'このクラスで有名[ゆうめい]な{のは}、ディアンさん{です}。', id: 'Di kelas ini yang terkenal itu Dian.' },
        { jp: 'A：この店[みせ]で、何[なに]がおいしいですか。\nB：おいしい{のは}、魚[さかな]のフライ{です}。', id: 'A: Di toko ini, apa yang enak?\nB: Yang enak itu ikan goreng tepung.' }
      ],
      awas: [
        'Jangan lupa **の**: ×人気[にんき]があるは、ラーメンです → ○人気[にんき]がある**の**は、ラーメンです.',
        'Kata sifat-な butuh **な**: ×有名[ゆうめい]のは → ○有名[ゆうめい]なのは.'
      ],
      kw: 'yang itu menyorot yang paling populer yang enak yang murah'
    }
  ]
});
