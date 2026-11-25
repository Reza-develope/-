/* data/buku/a2_13.js — Buku Bunpou Irodori A2 (初級1) · Bab 13
   Penanda & aturan: lihat kepala a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧, Japan Foundation): ❶–❺ */
FC.defineBuku('a2', {
  n: 13,
  title: 'あと十分[じゅっぷん]ぐらいで終[お]わりそうです',
  arti: 'Sepertinya sekitar 10 menit lagi selesai',
  topic: '仕事[しごと]の連絡[れんらく]',
  topicArti: 'Berkomunikasi di tempat kerja',
  bisa: [
    'Melapor ke atasan kalau ada masalah di tempat kerja',
    'Menjawab perkiraan kapan pekerjaanmu selesai',
    'Bertanya dan memahami cara pakai mesin di kantor',
    'Memahami instruksi kerja dan email pemberitahuan singkat'
  ],
  pola: [
    {
      name: '～んですが…', short: 'んですが', arti: 'begini, ~ (menyampaikan masalah sambil berharap dibantu)',
      inti: 'Pakai ini untuk **menyampaikan masalah atau situasi** lebih dulu, lalu berharap lawan bicara membantu atau menanggapi.',
      rumus: [['V／イA（bentuk biasa）', '+', '=んですが…'], ['ナA／N', '+', '=なんですが…']],
      rumusNote: 'Bentuk biasa = kamus／ない／た · kalimat sengaja digantung tanpa kelanjutan',
      jelas: [
        '**～んですが…** = “begini lho, ~ (tolong ya)”. Kalimat dibiarkan menggantung supaya lawan bicara yang menawarkan bantuan: 「パソコンが動[うご]かない{んですが}…」.',
        'Bentuk: **bentuk biasa + んです**. Kata sifat-na dan kata benda memakai **な**: 「この机[つくえ]、不便[ふべん]な{んですが}…」.',
        'Biasanya dipakai ke atasan atau orang yang belum akrab untuk melapor masalah atau membuka permintaan.'
      ],
      contoh: [
        { jp: '会議室[かいぎしつ]の電気[でんき]がつかない{んですが}…。', id: 'Lampu ruang rapat tidak menyala, (bagaimana ya)…' },
        { jp: 'コピー機[き]の使[つか]い方[かた]がわからない{んですが}…。', id: 'Saya tidak tahu cara pakai mesin fotokopi, (bisa tolong)…' },
        { jp: '明日[あした]、ちょっと都合[つごう]が悪[わる]い{んですが}…。', id: 'Besok waktunya agak kurang cocok bagi saya, (bagaimana ya)…' },
        { jp: 'この机[つくえ]、不便[ふべん]な{んですが}…。', id: 'Meja ini kurang praktis, (bagaimana ya)…' }
      ],
      awas: [
        'Kata sifat-na dan kata benda tidak pakai だ: ×不便[ふべん]だんですが → 不便[ふべん]なんですが.',
        'Kalau ingin meminta dengan jelas, lanjutkan kalimatnya: 「動[うご]かない{んですが}、見[み]てもらえませんか」.'
      ],
      kw: 'begini masalah melapor membuka permintaan menggantung'
    },
    {
      name: 'V-そうです', short: 'V-そうです', arti: 'sepertinya akan ~ / kelihatannya mau ~',
      inti: 'Menebak **kejadian yang tampak akan terjadi** dari keadaan yang kamu lihat sekarang.',
      rumus: [['V-ます', '+', '=そうです']],
      rumusNote: 'V-ます = bentuk ます tanpa ます (終[お]わり・降[ふ]り・かかり) · bukan bentuk kamus',
      jelas: [
        'Dipakai saat kamu **menilai dari keadaan di depan mata**: 「あと十分[じゅっぷん]で終[お]わり{そうです}」 = “kelihatannya 10 menit lagi selesai”.',
        'Bentuk: ambil ます-form, buang ます, tambah そうです. Sering dipakai menjawab 「どのぐらいかかり{そうです}か」.',
        'Biasanya untuk kejadian dekat: pekerjaan hampir selesai, hujan hampir turun.'
      ],
      contoh: [
        { jp: '仕事[しごと]は、三十分[さんじゅっぷん]ぐらいで終[お]わり{そうです}。', id: 'Pekerjaan ini sepertinya selesai sekitar 30 menit lagi.' },
        { jp: '雨[あめ]が降[ふ]り{そうです}ね。', id: 'Kelihatannya mau hujan ya.' },
        { jp: '今日[きょう]は、早[はや]く帰[かえ]れ{そうです}。', id: 'Hari ini sepertinya bisa pulang lebih awal.' },
        { jp: '会議[かいぎ]は、長[なが]くかかり{そうです}。', id: 'Rapat sepertinya akan memakan waktu lama.' }
      ],
      awas: [
        '**V-ます＋そうです** = dugaan dari penampilan; **V-る＋そうです** (Bab 18) = kabar dari orang lain. 降[ふ]りそうです ≠ 降[ふ]るそうです.'
      ],
      kw: 'sepertinya kelihatannya akan hampir selesai perkiraan dugaan'
    },
    {
      name: 'V-たいとき、～', short: 'たいとき', arti: 'kalau ingin ~, (maka) ~',
      inti: 'Dipakai untuk bertanya atau memberi tahu **apa yang dilakukan pada saat ingin** melakukan sesuatu.',
      rumus: [['V-たい', '+', '=とき、', '+', '~']],
      rumusNote: 'V-たい = bentuk ます tanpa ます + たい · bagian belakang biasanya cara atau instruksi',
      jelas: [
        'とき = “saat”. **V-たい＋とき** = “saat ingin ~”. Sering ditambah は: ～たいときは.',
        'Bagian belakang biasanya cara atau instruksi: ～ばいいですか／～てください.'
      ],
      contoh: [
        { jp: '両面[りょうめん]コピーし{たいとき}は、どうすればいいですか。', id: 'Kalau mau fotokopi bolak-balik, bagaimana caranya?' },
        { jp: '休[やす]みを取[と]り{たいとき}は、だれに言[い]えばいいですか。', id: 'Kalau mau libur, bilang ke siapa?' },
        { jp: 'この機械[きかい]を使[つか]い{たいとき}は、受付[うけつけ]に聞[き]いてください。', id: 'Kalau mau pakai mesin ini, tanya ke resepsionis.' },
        { jp: '早[はや]く帰[かえ]り{たいとき}は、先[さき]に言[い]ってください。', id: 'Kalau mau pulang lebih awal, bilang dulu.' }
      ],
      awas: [
        'Jangan campur dengan ～たいんですが: ～たいんですが = “saya ingin ~, (tolong)”; ～たいとき = “kalau ingin ~, (bagaimana)”.'
      ],
      kw: 'kalau ingin saat mau cara melakukan instruksi'
    },
    {
      name: 'V-ると、～', short: 'ると', arti: 'kalau/begitu ~, maka ~ (hasil otomatis)',
      inti: 'Menjelaskan **hasil yang pasti terjadi** setelah melakukan sesuatu, misalnya cara pakai mesin.',
      rumus: [['V-る', '+', '=と、', '+', '~']],
      rumusNote: 'V-る = bentuk kamus · bagian belakang berupa kejadian, bukan permintaan',
      jelas: [
        '**V-る＋と** = “begitu ~, maka ~”. Hubungan sebab-akibat yang **otomatis**: A dilakukan → B terjadi.',
        'Cocok untuk petunjuk pemakaian mesin, aturan alam, dan petunjuk jalan.'
      ],
      contoh: [
        { jp: 'このスタートボタンを押[お]す{と}、コピーが始[はじ]まります。', id: 'Begitu tombol start ditekan, fotokopi mulai.' },
        { jp: '右[みぎ]に回[まわ]す{と}、ドアが開[あ]きます。', id: 'Kalau diputar ke kanan, pintunya terbuka.' },
        { jp: '電源[でんげん]を入[い]れる{と}、画面[がめん]が明[あか]るくなります。', id: 'Begitu dayanya dinyalakan, layarnya jadi terang.' },
        { jp: '春[はる]になる{と}、桜[さくら]が咲[さ]きます。', id: 'Kalau musim semi tiba, sakura mekar.' }
      ],
      awas: [
        'Bagian belakang tidak boleh berupa permintaan, ajakan, atau niat: ×押[お]すと、待[ま]ってください. Untuk itu pakai ～たら atau ～てから.'
      ],
      kw: 'kalau begitu otomatis hasil sebab akibat petunjuk tombol'
    },
    {
      name: 'はい、【否定文[ひていぶん]】／いいえ、【肯定文[こうていぶん]】', short: 'はい／いいえ', arti: 'menjawab pertanyaan negatif (～ないですか？)',
      inti: 'Pada pertanyaan negatif, はい／いいえ menilai **benar atau tidaknya isi pertanyaan**, bukan “ya/tidak” terhadap tindakannya.',
      rumus: [['A：', '~ないですか？'], ['B：', '=はい、', '~ないです。'], ['B：', '=いいえ、', '~ます／あります。']],
      rumusNote: 'はい = “benar, seperti yang kamu duga” → kalimat negatif · いいえ = “tidak begitu” → kalimat positif',
      jelas: [
        'Pertanyaan 「使[つか]ったことないですか」 = “belum pernah pakai, ya?”. Kalau memang belum pernah → 「**はい**、ないです」 (benar, belum pernah).',
        'Kalau sebenarnya pernah → 「**いいえ**、あります」 (tidak begitu, saya pernah).',
        'Kalau bingung, tambahkan kalimat lengkap setelah はい／いいえ supaya jelas.'
      ],
      contoh: [
        { jp: 'A：コピー機[き]、使[つか]ったことないですか。\nB：{はい}、ないです。', id: 'A: Belum pernah pakai mesin fotokopi?\nB: Benar, belum pernah.' },
        { jp: 'A：昨日[きのう]、ご飯[はん]を食[た]べませんでしたか。\nB：{いいえ}、食[た]べました。', id: 'A: Kemarin kamu tidak makan?\nB: Tidak begitu, saya makan.' },
        { jp: 'A：今日[きょう]は、忙[いそが]しくないですか。\nB：{はい}、忙[いそが]しくないです。', id: 'A: Hari ini tidak sibuk?\nB: Benar, tidak sibuk.' },
        { jp: 'A：この漢字[かんじ]、わからないですか。\nB：{いいえ}、わかります。', id: 'A: Kanji ini tidak paham?\nB: Tidak begitu, saya paham.' }
      ],
      awas: [
        'Jangan menjawab dengan “Ya” ala bahasa Indonesia untuk tindakan yang kamu lakukan: 「使[つか]ったことないですか」→ ×「はい、あります」 itu bertentangan.'
      ],
      kw: 'pertanyaan negatif menjawab ya tidak benar salah'
    }
  ]
});
