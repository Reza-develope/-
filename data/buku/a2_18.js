/* data/buku/a2_18.js — Buku Bunpou Irodori A2 (初級1) · Bab 18
   Penanda & aturan: lihat kepala a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧, Japan Foundation): ❶–❹ */
FC.defineBuku('a2', {
  n: 18,
  title: '何[なに]かプレゼントをあげませんか？',
  arti: 'Bagaimana kalau kita memberi hadiah?',
  topic: '交際[こうさい]',
  topicArti: 'Hubungan antarpribadi',
  bisa: [
    'Mengucapkan selamat ulang tahun atau pernikahan',
    'Berdiskusi memilih hadiah untuk seseorang',
    'Menyampaikan ucapan terima kasih atas hadiah',
    'Menulis pesan ucapan atau perpisahan'
  ],
  pola: [
    {
      name: 'S（普通形[ふつうけい]）そうです', short: 'そうです（kabar）', arti: 'katanya ~ / kabarnya ~',
      inti: 'Menyampaikan **kabar yang kamu dengar** dari orang lain atau dari berita.',
      rumus: [['S-biasa', '+', '=そうです']],
      rumusNote: 'S-biasa = kalimat bentuk biasa (kamus／ない／た) · ナA／N memakai だ',
      jelas: [
        '**S（bentuk biasa）＋そうです** = “katanya ~”. Kamu tidak mengalami sendiri, hanya meneruskan kabar.',
        'Isi kabar pakai **bentuk biasa**: 結婚[けっこん]する／結婚[けっこん]した／安[やす]い. ナA／N pakai **だ**: 元気[げんき]だ{そうです}.',
        'Tambah **ね** untuk nada “oh, ternyata ya”: ～そうですね.'
      ],
      contoh: [
        { jp: '山田[やまだ]さんは、来月[らいげつ]、結婚[けっこん]する{そうです}。', id: 'Katanya Pak Yamada akan menikah bulan depan.' },
        { jp: '明日[あした]は、雨[あめ]が降[ふ]る{そうです}。', id: 'Katanya besok akan hujan.' },
        { jp: '田中[たなか]さんは、試験[しけん]に合格[ごうかく]した{そうです}ね。', id: 'Katanya Pak Tanaka lulus ujian ya.' },
        { jp: 'あのレストランは、とても安[やす]い{そうです}。', id: 'Katanya restoran itu sangat murah.' }
      ],
      awas: [
        'Tertukar dengan V-ます＋そうです (Bab 13): 降[ふ]りそうです = “kelihatannya mau hujan” (dugaan sendiri); 降[ふ]るそうです = “katanya akan hujan” (kabar orang lain).',
        'ナA／N: 元気[げんき]だそうです (ada だ) = “katanya sehat”. 元気[げんき]そうです = “kelihatan sehat”, artinya lain.'
      ],
      kw: 'katanya kabarnya dengar dari orang lain berita'
    },
    {
      name: '【人[ひと]】に【物[もの]】をあげます', short: 'をあげます', arti: 'memberi ~ kepada ~',
      inti: 'Menyatakan bahwa **seseorang memberi sesuatu kepada orang lain** (termasuk kamu memberi orang lain).',
      rumus: [['Pemberi', '+', '=は', '+', 'Penerima', '+', '=に', '+', 'Barang', '+', '=を', '+', '=あげます']],
      rumusNote: 'Penerima ditandai に · barang ditandai を · sering dipakai sebagai ajakan: ～あげませんか？',
      tabel: [{
        judul: 'Tiga kata “memberi／menerima”',
        kepala: ['Kata', 'Arah', 'Subjek'],
        baris: [
          ['あげます', 'kamu／orang A → orang lain', 'pemberi'],
          ['くれます', 'orang lain → kamu', 'pemberi'],
          ['もらいます', 'kamu ← orang lain', 'penerima (kamu)']
        ]
      }],
      jelas: [
        '**あげます** = “memberi (kepada orang lain)”. Penerima ditandai **に**, barang ditandai **を**.',
        'Sering dipakai dalam ajakan: 「何[なに]かあげませんか」 = “bagaimana kalau kita beri sesuatu?”.'
      ],
      contoh: [
        { jp: '妹[いもうと]に、時計[とけい]を{あげました}。', id: 'Saya memberi adik perempuan saya jam tangan.' },
        { jp: 'アナさんに、何[なに]か{あげませんか}。', id: 'Bagaimana kalau kita beri Ana sesuatu?' },
        { jp: '田中[たなか]さんは、アナさんにチョコレートを{あげました}。', id: 'Pak Tanaka memberi Ana cokelat.' },
        { jp: '先生[せんせい]の誕生日[たんじょうび]に、花[はな]を{あげます}。', id: 'Saya akan memberi guru bunga saat ulang tahunnya.' }
      ],
      awas: [
        'Jangan terbalik: ×友[とも]だちが私[わたし]にあげました → 友[とも]だちが私[わたし]にくれました.',
        'Penerima memakai に, bukan を: ×友[とも]だちをあげました.'
      ],
      kw: 'memberi hadiah kepada orang lain ajakan memberi'
    },
    {
      name: 'S（普通形[ふつうけい]）と言[い]っていました', short: 'といっていました', arti: 'dia bilang bahwa ~',
      inti: 'Mengutip **ucapan orang lain** yang pernah kamu dengar.',
      rumus: [['S-biasa', '+', '=と', '+', '=いっていました']],
      rumusNote: 'いう = 言[い]う · ナA／N memakai だ sebelum と',
      jelas: [
        '**S＋と言[い]っていました** = “dia bilang bahwa ~”. Isi ucapan diubah ke **bentuk biasa**.',
        'ナA／N: tambahkan だ sebelum と (好[す]きだと言[い]っていました).'
      ],
      contoh: [
        { jp: '山田[やまだ]さんは、来週[らいしゅう]、休[やす]みたい{と言[い]っていました}。', id: 'Pak Yamada bilang ingin libur minggu depan.' },
        { jp: 'ミロさんは、ケーキが好[す]きだ{と言[い]っていました}。', id: 'Miro bilang dia suka kue.' },
        { jp: '先生[せんせい]は、明日[あした]、テストをする{と言[い]っていました}。', id: 'Guru bilang besok ada tes.' },
        { jp: 'ナナさんは、日本[にほん]の生活[せいかつ]は楽[たの]しい{と言[い]っていました}。', id: 'Nana bilang hidup di Jepang menyenangkan.' }
      ],
      awas: [
        'Jangan masukkan bentuk sopan ke dalam kutipan: ×休[やす]みたいですと言[い]っていました → 休[やす]みたいと言[い]っていました.',
        'Beda dengan そうです (pola ①): そうです = kabar tanpa menyebut sumber; ～と言[い]っていました = kamu menyebut **siapa** yang berkata.'
      ],
      kw: 'dia bilang mengutip ucapan orang lain'
    },
    {
      name: 'S（普通形[ふつうけい]）と思[おも]います', short: 'とおもいます', arti: 'saya pikir ~ / saya kira ~',
      inti: 'Menyampaikan **pendapat atau dugaan** dengan nada lembut.',
      rumus: [['S-biasa', '+', '=と', '+', '=おもいます']],
      rumusNote: 'おもう = 思[おも]う · ナA／N memakai だ · negatif: ～ないと思[おも]います',
      jelas: [
        '**S＋と思[おも]います** = “saya pikir ~”. Kalimat bentuk biasa + と思[おも]います; ナA／N + だ.',
        'Untuk pendapat negatif: ～ないと思[おも]います (saya kira tidak ~).'
      ],
      contoh: [
        { jp: '田中[たなか]さんは、花[はな]が好[す]きだ{と思[おも]います}。', id: 'Saya kira Pak Tanaka suka bunga.' },
        { jp: '明日[あした]は、雨[あめ]が降[ふ]る{と思[おも]います}。', id: 'Saya kira besok akan hujan.' },
        { jp: 'プレゼントは、時計[とけい]がいい{と思[おも]います}。', id: 'Saya pikir hadiahnya sebaiknya jam tangan.' },
        { jp: 'この料理[りょうり]は、ちょっと辛[から]い{と思[おも]います}。', id: 'Saya rasa masakan ini agak pedas.' }
      ],
      awas: [
        'と思[おも]います melunakkan pendapat. Jangan dipakai untuk fakta pasti: ×私[わたし]は学生[がくせい]だと思[おも]います (kalau kamu memang pelajar).',
        'Bentuk sopan tidak masuk sebelum と: ×いいですと思[おも]います → いいと思[おも]います.'
      ],
      kw: 'saya pikir kira pendapat dugaan opini'
    }
  ]
});
