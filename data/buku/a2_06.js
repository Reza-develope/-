/* =====================================================================
   data/buku/a2_06.js — Buku Bunpou Irodori A2 (初級1) · Bab 6
   Penanda teks: 漢字[よみ] furigana · {sorot} · **tebal** · 「kutipan Jepang」. Rumus: token berawalan "=" = bagian tetap (merah).
   Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran); daftar pola mengikuti daftar isi resmi Irodori 初級1 (文法ノート).
   ===================================================================== */
FC.defineBuku('a2', {
  n: 6,
  title: '郵便局[ゆうびんきょく]はどう行[い]ったらいいですか？',
  arti: 'Bagaimana cara ke kantor pos?',
  topic: '私[わたし]の町[まち]',
  topicArti: 'Kotaku',
  bisa: [
    'Menanyakan jalan kepada orang lain dan memahami jawabannya',
    'Menanyakan jalan lewat telepon',
    'Menjelaskan arah ke tujuan, misalnya saat menumpang mobil',
    'Meluruskan informasi yang salah dengan 「～じゃなくて、～」'
  ],
  pola: [
    {
      name: 'Nに行[い]きたいんですが…',
      short: '行[い]きたいんですが',
      arti: 'saya ingin pergi ke N, (bagaimana caranya?)',
      inti: 'Cara sopan untuk **membuka pertanyaan** tentang jalan atau meminta bantuan: “saya ingin pergi ke ~, tapi (bagaimana ya?)”.',
      rumus: [['N', '+', '=に', '+', '=行[い]きたい', '+', '=んですが…']],
      rumusNote: 'が… dibiarkan menggantung supaya lawan bicara menjawab',
      tabel: [{
        judul: 'Tiga cara bertanya jalan',
        kepala: ['Cara', 'Contoh', 'Kesan'],
        baris: [
          ['Nはどこですか？', '駅[えき]はどこですか？', 'langsung menanyakan letak'],
          ['Nはどう行[い]ったらいいですか？', '駅[えき]はどう行[い]ったらいいですか？', 'menanyakan cara menuju'],
          ['Nに行[い]きたいんですが…', '駅[えき]に行[い]きたいんですが…', 'lembut, membuka percakapan']
        ]
      }],
      jelas: [
        'Bentuk: **N + に + 行[い]きたい + んですが…**. 「行[い]きたい」 = “ingin pergi”, 「んです」 = menjelaskan keadaanmu, 「が…」 = kalimat dibiarkan menggantung agar lawan bicara menanggapi.',
        'Kamu tidak perlu mengatakan “tolong beri tahu”: lawan bicara akan menangkap maksudmu dan menjelaskan jalannya.',
        'Cocok juga di telepon atau di loket: 「市役所[しやくしょ]に{行[い]きたいんですが}…」. Awali dengan 「すみません、」 supaya lebih sopan.',
        'Pola ini berkembang di Bab 8 (V-たいんですが…) dan Bab 13 (～んですが…).'
      ],
      contoh: [
        { jp: 'すみません、市役所[しやくしょ]に{行[い]きたいんですが}…。', id: 'Permisi, saya ingin pergi ke balai kota, tapi ...' },
        { jp: 'あのう、バス停[てい]に{行[い]きたいんですが}…。', id: 'Anu, saya ingin ke halte bus, ...' },
        { jp: '駅[えき]の北口[きたぐち]に{行[い]きたいんですが}…。', id: 'Saya ingin pergi ke pintu utara stasiun, ...' },
        { jp: 'すみません、いちばん近[ちか]い銀行[ぎんこう]に{行[い]きたいんですが}…。', id: 'Permisi, saya ingin pergi ke bank terdekat, ...' },
        { jp: 'A：すみません、病院[びょういん]に{行[い]きたいんですが}…。\nB：病院[びょういん]ですか。この道[みち]をまっすぐ行[い]ってください。', id: 'A: Permisi, saya ingin pergi ke rumah sakit, ...\nB: Rumah sakit? Silakan lurus saja di jalan ini.' }
      ],
      awas: [
        'Jangan menambah どこですか setelahnya: 「～に行[い]きたいんですが…」 sudah kalimat lengkap yang menggantung. ×行[い]きたいんですがどこですか.',
        'Jangan pakai bentuk ます: ×行[い]きますんですが → ○行[い]きたいんですが (V-たい).',
        'Tujuan ditandai に (atau へ): ○駅[えき]に行[い]きたい, ×駅[えき]を行[い]きたい.'
      ],
      kw: 'tanya jalan ingin pergi ke んですが sopan membuka percakapan'
    },
    {
      name: 'V-て、～',
      short: 'V-て、～',
      arti: '~ lalu ~ (petunjuk arah berurutan)',
      inti: 'Saat menjelaskan jalan, sambungkan langkah-langkahnya dengan **bentuk-て**, lalu tutup dengan **ください**.',
      rumus: [['V1-て', '、', 'V2-て', '、', 'V3-', '=てください']],
      rumusNote: 'Langkah terakhir: V-てください (tolong ~)',
      tabel: [{
        judul: 'Ungkapan yang sering dipakai untuk menunjukkan jalan',
        kepala: ['Ungkapan', 'Artinya'],
        baris: [
          ['まっすぐ行[い]く', 'jalan lurus'],
          ['右[みぎ]／左[ひだり]に曲[ま]がる', 'belok kanan / kiri'],
          ['橋[はし]を渡[わた]る', 'menyeberangi jembatan'],
          ['道[みち]を渡[わた]る', 'menyeberang jalan'],
          ['二[ふた]つ目[め]の信号[しんごう]', 'lampu lalu lintas yang kedua'],
          ['角[かど]', 'sudut / tikungan']
        ]
      }],
      jelas: [
        'Sama dengan pola V1-て、V2 di Bab 2: urutan kata kerja = urutan perjalanan. Bedanya, di akhir kamu **meminta** orang melakukannya, jadi ditutup dengan **ください**.',
        'Satu langkah, satu kata kerja, sambil menyebut penanda jalan: 信号[しんごう] (lampu lalu lintas), 角[かど] (tikungan), 橋[はし] (jembatan). Contoh: 「まっすぐ行[い]{って}、角[かど]を左[ひだり]に曲[ま]がってください」.',
        'Untuk urutan penanda: 一[ひと]つ目[め] (pertama), 二[ふた]つ目[め] (kedua), 三[みっ]つ目[め] (ketiga).',
        'Kalimat penutup yang sering dipakai: 「すぐ左[ひだり]にあります」 (langsung ada di sebelah kiri).'
      ],
      contoh: [
        { jp: 'この道[みち]をまっすぐ{行[い]って}、駅[えき]の前[まえ]を右[みぎ]に{曲[ま]がってください}。', id: 'Silakan lurus di jalan ini, lalu belok kanan di depan stasiun.' },
        { jp: '橋[はし]を{渡[わた]って}、すぐ左[ひだり]に{曲[ま]がってください}。', id: 'Seberangi jembatan, lalu langsung belok kiri.' },
        { jp: '信号[しんごう]を{渡[わた]って}、銀行[ぎんこう]の角[かど]を右[みぎ]に{曲[ま]がってください}。', id: 'Seberangi lampu lalu lintas, lalu belok kanan di sudut bank.' },
        { jp: 'エレベーターで3階[さんがい]まで{上[あ]がって}、右[みぎ]に{行[い]ってください}。', id: 'Naik lift sampai lantai 3, lalu pergilah ke kanan.' },
        { jp: 'A：この近[ちか]くに、郵便局[ゆうびんきょく]はありますか。\nB：ええ、この道[みち]を{まっすぐ行[い]って}、コンビニの角[かど]を{左[ひだり]に曲[ま]がってください}。', id: 'A: Apakah di dekat sini ada kantor pos?\nB: Ada. Lurus di jalan ini, lalu belok kiri di sudut minimarket.' }
      ],
      awas: [
        'Hanya langkah terakhir yang memakai ください. Jangan mengulangnya di setiap langkah: ×行[い]ってください、曲[ま]がってください → ○行[い]って、曲[ま]がってください.',
        'Bentuk-て harus benar: 行[い]く → 行[い]って, 渡[わた]る → 渡[わた]って, 曲[ま]がる → 曲[ま]がって.',
        'Partikel: arah memakai に (右[みぎ]に曲[ま]がる), sedangkan sudut atau jalan tempat berbelok memakai を (角[かど]を曲[ま]がる): 「角[かど]を右[みぎ]に曲[ま]がってください」.'
      ],
      kw: 'petunjuk arah belok lurus tolong sambung kata kerja ください jalan'
    },
    {
      name: 'N1じゃなくて、N2',
      short: 'じゃなくて',
      arti: 'bukan N1, melainkan N2',
      inti: 'Pakai ini untuk **meluruskan**: “bukan N1, melainkan N2”.',
      rumus: [['N1', '+', '=じゃなくて', '+', '、', '+', 'N2', '+', '=です']],
      rumusNote: 'Lebih resmi: N1ではなくて、N2です · bisa juga untuk sifat-な: 静[しず]かじゃなくて、にぎやかです',
      tabel: [{
        judul: 'Contoh',
        kepala: ['Jenis', 'Contoh'],
        baris: [
          ['Kata benda', '右[みぎ]じゃなくて、左[ひだり]です'],
          ['Tempat', '北口[きたぐち]じゃなくて、南口[みなみぐち]です'],
          ['Sifat-な', '静[しず]かじゃなくて、にぎやかです']
        ]
      }],
      jelas: [
        '**じゃなくて** = “bukan ~, melainkan …”. Ini bentuk negatif kata benda (じゃない) yang disambung dengan て: N1じゃなくて + N2です.',
        'Sering dipakai untuk **meluruskan salah paham** lawan bicara: 「左[ひだり]ですか？」 → 「いえ、左[ひだり]{じゃなくて}、右[みぎ]です」.',
        'Bisa juga dengan sifat-な (静[しず]かじゃなくて…). Untuk sifat-い, bentuknya lain: ～くなくて (Bab 12).',
        'Dalam bahasa yang lebih resmi: ではなくて／ではなく.'
      ],
      contoh: [
        { jp: '右[みぎ]{じゃなくて}、左[ひだり]です。', id: 'Bukan kanan, melainkan kiri.' },
        { jp: '駅[えき]の北口[きたぐち]{じゃなくて}、南口[みなみぐち]で会[あ]いましょう。', id: 'Mari bertemu di pintu selatan stasiun, bukan pintu utara.' },
        { jp: '私[わたし]は、学生[がくせい]{じゃなくて}、会社員[かいしゃいん]です。', id: 'Saya bukan pelajar, melainkan karyawan perusahaan.' },
        { jp: 'ここは、静[しず]か{じゃなくて}、とてもにぎやかです。', id: 'Di sini bukan tenang, melainkan sangat ramai.' },
        { jp: 'A：月曜日[げつようび]ですか。\nB：いえ、月曜日[げつようび]{じゃなくて}、火曜日[かようび]です。', id: 'A: Hari Senin ya?\nB: Bukan, bukan hari Senin, melainkan hari Selasa.' }
      ],
      awas: [
        'Untuk menyambung ke penjelasan yang benar, pakai じゃなくて. Kalau pakai じゃない, kalimat berhenti di situ: 「右[みぎ]じゃないです」 (bukan kanan).',
        'じゃなくて hanya untuk kata benda dan sifat-な. Untuk sifat-い dan kata kerja bentuknya lain: 高[たか]くなくて, 行[い]かなくて (bukan ×高[たか]いじゃなくて).'
      ],
      kw: 'bukan melainkan koreksi じゃなくて meluruskan negatif kata benda'
    }
  ]
});
