/* =====================================================================
   data/buku/a22_09.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 9
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧): ➊ ～んですか ➋ Nしか＋否定文 ➌ Nだけ ➍ V-たりして ➎ V-なくちゃならない
   ➏ 可能形③ ➐ S（普通形）＋人が／人も ➑ V-ながら ➒ Nによって.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 9,
  title: '成人[せいじん]の日[ひ]は、何[なに]をするんですか？',
  arti: 'Pada Hari Kedewasaan, biasanya melakukan apa?',
  topic: '年中行事[ねんじゅうぎょうじ]とマナー',
  topicArti: 'Perayaan tahunan dan tata krama',
  bisa: [
    'Bertanya lebih dalam tentang kebiasaan dan perayaan: “memangnya …?”',
    'Bilang “hanya” dengan **だけ** dan **しか**',
    'Menceritakan liburan dengan menyebut beberapa contoh kegiatan (～たりして)',
    'Bilang “harus …” dan “bisa …” dalam obrolan akrab',
    'Memperkenalkan perayaan di negaramu: “banyak orang yang …”, “berbeda tergantung …”'
  ],
  pola: [
    {
      name: '～んですか？',
      short: 'んですか',
      arti: 'memangnya ~? (ingin tahu penjelasannya)',
      inti: 'Pakai **んですか** kalau kamu **tertarik** dan ingin tahu lebih jauh: alasan, keadaan, atau kebiasaannya.',
      rumus: [['Bentuk biasa', '+', '=んですか'], ['N／ナA', '+', '=なんですか']],
      rumusNote: 'N dan ナA: だ berubah jadi **な** (休[やす]み → 休[やす]みなんですか)',
      tabel: [{
        judul: 'Bentuk sebelum んですか',
        kepala: ['Jenis', 'Bentuk biasa', '～んですか'],
        baris: [
          ['Kata kerja', '行[い]く', '行[い]くんですか'],
          ['Kata kerja (lampau)', '食[た]べた', '食[た]べたんですか'],
          ['Sifat-い', '高[たか]い', '高[たか]いんですか'],
          ['Sifat-な', '静[しず]か', '静[しず]かなんですか'],
          ['Kata benda', '休[やす]み', '休[やす]みなんですか']
        ]
      }],
      jelas: [
        '**～んですか** dipakai saat kamu **melihat atau mendengar sesuatu** lalu ingin tahu lebih jauh: alasan, keadaan, atau kebiasaannya. Mirip “memangnya …?” atau “jadi …?”.',
        'Cocok untuk menggali cerita dengan kata tanya: 「お正月[しょうがつ]は、何[なに]をする{んですか}」 = “Waktu tahun baru, biasanya melakukan apa?”. 何[なに]をしますか juga benar, tapi ～んですか terasa **lebih berminat pada ceritanya**.',
        'Cara membuat: **bentuk biasa** ＋ んですか. Kata benda dan sifat-な + **なんですか** (だ → な).',
        'Jawabannya biasanya ～んです／～んですよ (menjelaskan): 「はい、毎年[まいとし]、帰[かえ]る{んです}」.',
        'Versi akrab untuk teman: **～の？** (ada di Bab 10).'
      ],
      contoh: [
        { jp: 'お正月[しょうがつ]には、家族[かぞく]で何[なに]を{食[た]べるんですか}。', id: 'Waktu tahun baru, keluarga biasanya makan apa?' },
        { jp: 'このお祭[まつ]りは、毎年[まいとし]{あるんですか}。', id: 'Apakah festival ini ada setiap tahun?' },
        { jp: 'あしたは、会社[かいしゃ]が{休[やす]みなんですか}。', id: 'Besok kantornya libur?' },
        { jp: 'この町[まち]のお祭[まつ]りは、にぎやか{なんですか}。', id: 'Festival di kota ini ramai?' },
        { jp: 'A：毎年[まいとし]、田舎[いなか]に{帰[かえ]るんですか}。\nB：はい、お正月[しょうがつ]は、いつも帰[かえ]る{んです}。', id: 'A: Setiap tahun kamu pulang kampung?\nB: Ya, kalau tahun baru, saya selalu pulang.' },
        { jp: 'きのうは、どうして学校[がっこう]を{休[やす]んだんですか}。', id: 'Kemarin kenapa kamu tidak masuk sekolah?' }
      ],
      awas: [
        'Kata benda dan sifat-な pakai **な**, bukan だ: ×休[やす]みだんですか → ○休[やす]みなんですか.',
        'んですか menunjukkan **rasa ingin tahu**. Kalau hanya menanyakan fakta secara netral, ですか／ますか biasa sudah cukup.'
      ],
      kw: 'memangnya penjelasan alasan ingin tahu んです'
    },
    {
      name: 'Nしか＋否定文[ひていぶん]',
      short: 'しか',
      arti: 'hanya N (cuma, sedikit)',
      inti: '**しか** selalu dipasangkan dengan kalimat **negatif**: “tidak ada selain N” = “**cuma** N (sedikit)”.',
      rumus: [['N', '+', '=しか', '+', 'V-ません／V-ない']],
      rumusNote: 'Kalimatnya negatif, tapi artinya “hanya” · nuansa: sedikit / kurang',
      jelas: [
        '**Nしか～ません** = “hanya N”, dengan nuansa **sedikit atau kurang**: 「1000円[せんえん]{しか}ありません」 = “uang saya cuma 1.000 yen”.',
        'Kalimatnya **negatif**, tapi terjemahan bahasa Indonesianya positif (“cuma ada”).',
        'Partikel を／が **dihilangkan** sebelum しか: ×水[みず]をしか飲[の]みません → ○水[みず]{しか}飲[の]みません. Partikel lain (に, で, と) **tetap ada**: 友[とも]だち{にしか}話[はな]していません.',
        'Boleh dipasang setelah jumlah: 3時間[さんじかん]{しか}寝[ね]ませんでした = “cuma tidur 3 jam”.'
      ],
      contoh: [
        { jp: '今月[こんげつ]は、お金[かね]が{1000円[せんえん]しか}ありません。', id: 'Bulan ini uang saya cuma tinggal seribu yen.' },
        { jp: 'きのうは、{3時間[さんじかん]しか}寝[ね]ませんでした。', id: 'Kemarin saya cuma tidur tiga jam.' },
        { jp: 'このクラスには、男[おとこ]の人[ひと]が{二人[ふたり]しか}いません。', id: 'Di kelas ini cuma ada dua laki-laki.' },
        { jp: '私[わたし]は、{ひらがなしか}書[か]けません。', id: 'Saya cuma bisa menulis hiragana.' },
        { jp: 'A：お祭[まつ]りで、何[なに]か食[た]べましたか。\nB：いいえ、{ジュースしか}飲[の]んでいません。', id: 'A: Kamu makan sesuatu di festival?\nB: Tidak, saya cuma minum jus.' }
      ],
      awas: [
        'Kalimat sesudah しか **wajib negatif**: ×1000円[せんえん]しかあります → ○1000円[せんえん]しかありません.',
        'Jangan pakai を／が bersama しか: ×水[みず]をしか飲[の]みません → ○水[みず]しか飲[の]みません.'
      ],
      kw: 'hanya cuma sedikit negatif tidak lebih しか'
    },
    {
      name: 'Nだけ',
      short: 'だけ',
      arti: 'hanya N',
      inti: 'Pakai **だけ** untuk bilang **“hanya N”** secara netral, biasanya dengan kalimat **positif**.',
      rumus: [['N', '+', '=だけ', '+', 'V-ます']],
      rumusNote: 'だけ → kalimat positif · しか → kalimat negatif',
      tabel: [{
        judul: 'Bandingkan だけ dan しか',
        kepala: ['Pola', 'Contoh', 'Nuansa'],
        baris: [
          ['Nだけ＋positif', '1日[いちにち]だけ休[やす]みました', 'hanya satu hari (netral)'],
          ['Nしか＋negatif', '1日[いちにち]しか休[やす]みませんでした', 'cuma satu hari (sedikit)']
        ]
      }],
      jelas: [
        '**だけ** = “hanya”, pernyataan **netral** tentang jumlah atau batas: 「日曜日[にちようび]{だけ}休[やす]みです」 = “libur hanya hari Minggu”.',
        'Ditaruh **setelah kata benda** atau jumlah: 水[みず]{だけ}, 二人[ふたり]{だけ}.',
        'Partikel を／が biasanya **dihilangkan**: ビール{だけ}飲[の]みました.',
        'Bisa juga dengan kalimat negatif untuk bilang “hanya … yang tidak …”: 「私[わたし]{だけ}行[い]きませんでした」 = “hanya saya yang tidak pergi”.'
      ],
      contoh: [
        { jp: 'お正月[しょうがつ]は、{二日間[ふつかかん]だけ}休[やす]みました。', id: 'Waktu tahun baru, saya libur hanya dua hari.' },
        { jp: 'お酒[さけ]は、{一杯[いっぱい]だけ}飲[の]みました。', id: 'Soal minuman keras, saya minum hanya satu gelas.' },
        { jp: 'このカードは、{日本[にほん]だけ}で使[つか]えます。', id: 'Kartu ini hanya bisa dipakai di Jepang.' },
        { jp: 'A：パーティーには、みんな来[き]ましたか。\nB：いいえ、{田中[たなか]さんだけ}来[き]ました。', id: 'A: Semua orang datang ke pesta?\nB: Tidak, hanya Tanaka-san yang datang.' },
        { jp: '朝[あさ]は、コーヒー{だけ}飲[の]みます。', id: 'Pagi hari saya hanya minum kopi.' }
      ],
      awas: [
        'Bedakan dengan しか: だけ → kalimat **positif** (ビールだけ飲[の]みました); しか → kalimat **negatif** (ビールしか飲[の]みませんでした). Artinya mirip, nuansanya beda.',
        'Jangan pakai を／が sebelum だけ: ×ビールをだけ飲[の]みました → ○ビールだけ飲[の]みました.'
      ],
      kw: 'hanya saja cuma positif だけ'
    },
    {
      name: 'V-たりして、～',
      short: 'たりして',
      arti: 'melakukan ~ dan semacamnya, lalu ~',
      inti: 'Pakai **たりして** untuk menyebut **contoh kegiatan** yang kamu lakukan, lalu menyambungnya dengan kesan atau perasaan.',
      rumus: [['V-た', '+', '=り', '+', '=して', '、', 'kesan／hasil'], ['V1-たり', '+', 'V2-たり', '+', '=して', '、', 'kesan／hasil']],
      rumusNote: 'Menyebut satu atau dua kegiatan sebagai **contoh**',
      jelas: [
        '**V-たり** = “melakukan … (misalnya)”: menyebut **sebagian** kegiatan sebagai contoh, bukan semuanya.',
        'Di pola ini, **して** menyambung ke kalimat berikutnya: 「友[とも]だちと遊[あそ]ん{だりして}、楽[たの]しかったです」 = “bermain dengan teman dan semacamnya, menyenangkan”.',
        'Cara membentuk: **V-た** ＋ **り**: 食[た]べた → 食[た]べ{たり}, 歌[うた]った → 歌[うた]っ{たり}.',
        'Boleh menyebut **dua** kegiatan supaya kesannya “macam-macam”: 「食[た]べ{たり}、飲[の]ん{だりして}」.',
        'Bagian belakang berisi **kesan atau perasaan**: 楽[たの]しかったです, 疲[つか]れました, 忙[いそが]しかったです.'
      ],
      contoh: [
        { jp: '休[やす]みの日[ひ]は、本[ほん]を読[よ]ん{だりして}、ゆっくりしました。', id: 'Waktu libur, saya membaca buku dan semacamnya, bersantai.' },
        { jp: '友[とも]だちと、ゲームを{したりして}、楽[たの]しかったです。', id: 'Main game dan semacamnya dengan teman, menyenangkan.' },
        { jp: '日曜日[にちようび]は、洗濯[せんたく]を{したり}、掃除[そうじ]を{したりして}、一日[いちにち]が終[お]わりました。', id: 'Hari Minggu, saya mencuci, bersih-bersih dan sebagainya, lalu hari pun habis.' },
        { jp: '夏[なつ]は、海[うみ]で泳[およ]い{だり}、スイカを食[た]べ{たりして}、楽[たの]しかったです。', id: 'Musim panas, berenang di laut dan makan semangka, menyenangkan.' },
        { jp: 'A：お正月[しょうがつ]は、何[なに]をしましたか。\nB：家族[かぞく]とテレビを見[み]{たりして}、のんびりしました。', id: 'A: Waktu tahun baru, kamu ngapain?\nB: Menonton TV dengan keluarga dan semacamnya, santai-santai.' },
        { jp: '日本[にほん]に来[き]てから、道[みち]に迷[まよ]っ{たりして}、大変[たいへん]でした。', id: 'Sejak datang ke Jepang, saya tersesat dan hal semacamnya, repot sekali.' }
      ],
      awas: [
        'Pakai **bentuk た** + り: ×食[た]べるりして → ○食[た]べたりして.',
        'Jangan lupa **して** kalau kalimat berlanjut: ×買[か]い物[もの]をしたり、楽[たの]しかったです → ○買[か]い物[もの]をしたりして、楽[たの]しかったです.',
        'Pola ini menyebut **contoh**, bukan urutan. Untuk kegiatan yang berurutan pakai て (Bab 1).'
      ],
      kw: 'misalnya contoh kegiatan antara lain semacamnya たり'
    },
    {
      name: 'V-なくちゃならない',
      short: 'なくちゃならない',
      arti: 'harus ~ (ragam akrab)',
      inti: 'Bentuk **akrab** dari “harus …” — dipakai dalam obrolan dengan teman atau keluarga.',
      rumus: [['V-ない', '→', 'V-なくちゃ', '+', '=ならない']],
      rumusNote: 'なくちゃ asalnya dari なくては (て＋は → ちゃ)',
      tabel: [{
        judul: 'Cara mengubah',
        kepala: ['Kamus', 'V-ない', 'Akrab: harus ~'],
        baris: [
          ['払[はら]う', '払[はら]わない', '払[はら]わなくちゃならない'],
          ['食[た]べる', '食[た]べない', '食[た]べなくちゃならない'],
          ['勉強[べんきょう]する', '勉強[べんきょう]しない', '勉強[べんきょう]しなくちゃならない'],
          ['来[く]る', '来[こ]ない', '来[こ]なくちゃならない']
        ]
      }],
      jelas: [
        '**V-なくちゃならない** = “harus …” (kewajiban). Ini ragam lisan yang **akrab**; bentuk bakunya V-なければなりません.',
        'Cara mudah: V-ない → ganti い dengan **くちゃ**: 払[はら]わな**い** → 払[はら]わな**くちゃ**ならない.',
        'Dipakai untuk **kewajiban pribadi** atau keluhan: 「毎日[まいにち]、早[はや]く{起[お]きなくちゃならない}」.',
        'Sering disambung dengan し untuk menyebut beban: 「～なくちゃならない{し}、大変[たいへん]です」 = “harus …, dan lagi …, repot”.'
      ],
      contoh: [
        { jp: '明日[あした]は、六時[ろくじ]に{起[お]きなくちゃならない}。', id: 'Besok aku harus bangun jam enam.' },
        { jp: '来月[らいげつ]までに、レポートを{出[だ]さなくちゃならない}。', id: 'Aku harus mengumpulkan laporan sebelum bulan depan.' },
        { jp: 'お祭[まつ]りの前[まえ]に、部屋[へや]を掃除[そうじ]{しなくちゃならない}。', id: 'Sebelum festival, aku harus membersihkan kamar.' },
        { jp: 'ごみは、月曜日[げつようび]に{出[だ]さなくちゃならない}。', id: 'Sampah harus dikeluarkan hari Senin.' },
        { jp: 'A：あした、映画[えいが]に行[い]かない？\nB：ごめん、あしたは{働[はたら]かなくちゃならない}んだ。', id: 'A: Besok nonton film yuk?\nB: Maaf, besok aku harus kerja.' }
      ],
      awas: [
        'Ini ragam **akrab**. Ke atasan atau di tulisan resmi pakai V-なければなりません.',
        'なくちゃならない = “**harus**”, bukan “tidak boleh”. Larangan = V-ちゃだめ (Bab 4).'
      ],
      kw: 'harus kewajiban akrab kasual なくちゃ'
    },
    {
      name: 'V-れます ＜可能形[かのうけい]③＞',
      short: 'bentuk bisa ③',
      arti: 'bisa ~ (ragam lisan, ら dibuang)',
      inti: 'Dalam percakapan, **ら** pada bentuk “bisa” kelompok 2 sering dibuang: 食[た]べられる → 食[た]べ**れ**る.',
      rumus: [['V-られます', '→', 'V-れます']],
      rumusNote: 'Hanya untuk percakapan · hanya Kel. 2 dan 来[く]る',
      tabel: [{
        judul: 'Bentuk bisa: baku dan lisan',
        kepala: ['Kamus', 'Baku', 'Lisan (ら抜[ぬ]き)'],
        baris: [
          ['食[た]べる', '食[た]べられます', '食[た]べれます'],
          ['見[み]る', '見[み]られます', '見[み]れます'],
          ['起[お]きる', '起[お]きられます', '起[お]きれます'],
          ['来[く]る', '来[こ]られます', '来[こ]れます'],
          ['飲[の]む (Kel. 1)', '飲[の]めます', '飲[の]めます (tetap)'],
          ['する (Kel. 3)', 'できます', 'できます (tetap)']
        ]
      }],
      jelas: [
        'Bentuk “bisa” kelompok 2 (食[た]べ**られ**る) dan 来[く]る (来[こ]**られ**る) punya **ら**. Dalam percakapan sehari-hari, **ら dibuang**: 食[た]べ{れ}る, 来[こ]{れ}る. Orang Jepang menyebutnya 「ら抜[ぬ]き言葉[ことば]」.',
        'Artinya **sama persis**: 見[み]{れました} = 見[み]られました (bisa melihat).',
        'Cocok untuk obrolan dan pesan santai. Di **surat resmi, laporan, dan ujian**, tulis bentuk lengkap ～られる.',
        'Kelompok 1 (飲[の]める) dan する → できる **tidak punya ら**, jadi tidak berubah.'
      ],
      contoh: [
        { jp: '週末[しゅうまつ]は、好[す]きな映画[えいが]が{見[み]れて}、よかったです。', id: 'Akhir pekan, saya bisa menonton film kesukaan, senang sekali.' },
        { jp: 'おいしいケーキが{食[た]べれて}、うれしかったです。', id: 'Senang sekali bisa makan kue yang enak.' },
        { jp: '朝[あさ]、六時[ろくじ]には{起[お]きれません}。', id: 'Aku tidak bisa bangun jam enam pagi.' },
        { jp: 'あした、パーティーに{来[こ]れる}？', id: 'Besok bisa datang ke pesta?' },
        { jp: 'A：納豆[なっとう]は{食[た]べれます}か。\nB：いいえ、まだ{食[た]べれません}。', id: 'A: Kamu bisa makan natto?\nB: Belum bisa.' }
      ],
      awas: [
        'Hanya untuk **percakapan**. Di ujian bahasa dan surat resmi, tulis 見[み]られる, 食[た]べられる.',
        'ら抜[ぬ]き **hanya** untuk kelompok 2 dan 来[く]る. Kelompok 1 tidak: ×飲[の]れる → ○飲[の]める.',
        'Jangan tertukar dengan **pasif** kelompok 2 (食[た]べられる = “dimakan”). Bentuk pasif tidak pernah dibuang ら-nya; ら抜[ぬ]き hanya untuk arti “bisa”.'
      ],
      kw: 'bisa lisan percakapan ranuki ra nuki dibuang'
    },
    {
      name: 'S（普通形[ふつうけい]）＋人[ひと]が～／S（普通形[ふつうけい]）＋人[ひと]も～',
      short: 'orang yang ~',
      arti: 'orang yang ~ (banyak / ada juga)',
      inti: 'Kalimat bentuk biasa ＋ 人[ひと] = “**orang yang** …”. Cocok untuk bilang “banyak orang yang …” dan “ada juga orang yang …”.',
      rumus: [
        ['Kalimat (bentuk biasa)', '+', '=人[ひと]', '+', '=が', '+', '多[おお]いです／います'],
        ['Kalimat (bentuk biasa)', '+', '=人[ひと]', '+', '=も', '+', 'います']
      ],
      rumusNote: 'Dipakai untuk menjelaskan kebiasaan atau kecenderungan orang banyak',
      tabel: [{
        judul: 'Contoh keterangan + 人[ひと]',
        kepala: ['Keterangan (bentuk biasa)', 'Artinya'],
        baris: [
          ['国[くに]に帰[かえ]る人[ひと]', 'orang yang pulang ke negara asal'],
          ['旅行[りょこう]しない人[ひと]', 'orang yang tidak bepergian'],
          ['家[いえ]で休[やす]む人[ひと]', 'orang yang beristirahat di rumah'],
          ['お祭[まつ]りが好[す]きな人[ひと]', 'orang yang suka festival'],
          ['忙[いそが]しい人[ひと]', 'orang yang sibuk']
        ]
      }],
      jelas: [
        'Keterangan (kalimat bentuk biasa) ditaruh **di depan 人[ひと]** untuk menjelaskan orangnya: 「日本[にほん]に住[す]んでいる{人[ひと]}」 = “orang yang tinggal di Jepang”.',
        '**～人[ひと]が多[おお]いです／少[すく]ないです** = “banyak／sedikit orang yang …”. Cocok untuk bercerita tentang kebiasaan negara atau daerahmu.',
        '**～人[ひと]もいます** = “ada juga orang yang …”: menambahkan **contoh lain** yang berbeda dari kebiasaan umum.',
        'Sifat-な memakai **な** dan kata benda memakai **の** sebelum 人[ひと]: お祭[まつ]りが好[す]きな人[ひと], 学生[がくせい]の人[ひと].',
        'Perhatikan partikelnya: **が** menandai “orang yang …” sebagai subjek, **も** berarti “juga”.'
      ],
      contoh: [
        { jp: 'お盆[ぼん]には、旅行[りょこう]に{行[い]く人[ひと]が}多[おお]いです。', id: 'Waktu Obon, banyak orang yang bepergian.' },
        { jp: '私[わたし]の町[まち]では、お正月[しょうがつ]に神社[じんじゃ]へ{行[い]く人[ひと]が}たくさんいます。', id: 'Di kota saya, banyak orang yang pergi ke kuil pada tahun baru.' },
        { jp: '休[やす]みの日[ひ]に、家[いえ]で{寝[ね]ている人[ひと]も}います。', id: 'Ada juga orang yang tidur di rumah pada hari libur.' },
        { jp: '日本[にほん]では、お祭[まつ]りで{浴衣[ゆかた]を着[き]る人[ひと]も}います。', id: 'Di Jepang, ada juga orang yang memakai yukata saat festival.' },
        { jp: 'A：日本[にほん]のお正月[しょうがつ]は、どうですか。\nB：{旅行[りょこう]する人[ひと]も}いますが、{家[いえ]で休[やす]む人[ひと]が}多[おお]いです。', id: 'A: Bagaimana tahun baru di Jepang?\nB: Ada juga orang yang bepergian, tapi banyak yang beristirahat di rumah.' }
      ],
      awas: [
        'Keterangannya **bentuk biasa**, bukan bentuk sopan: ×帰[かえ]ります人[ひと] → ○帰[かえ]る人[ひと].',
        'Sifat-な dan kata benda: ○好[す]きな人[ひと], ○学生[がくせい]の人[ひと]; ×好[す]きだ人[ひと].'
      ],
      kw: 'orang yang banyak orang ada juga orang yang kebiasaan'
    },
    {
      name: 'V-ながら、～',
      short: 'ながら',
      arti: 'sambil ~',
      inti: 'Pakai **ながら** untuk bilang melakukan dua hal **sekaligus**: “sambil …”.',
      rumus: [['V1 (bentuk ます tanpa ます)', '+', '=ながら', '、', 'V2']],
      rumusNote: 'Pelakunya sama · kegiatan utama ada di V2 (belakang)',
      tabel: [{
        judul: 'Cara membentuk',
        kepala: ['Kamus', 'Bentuk ます', 'V-ながら'],
        baris: [
          ['歩[ある]く', '歩[ある]きます', '歩[ある]きながら'],
          ['聞[き]く', '聞[き]きます', '聞[き]きながら'],
          ['食[た]べる', '食[た]べます', '食[た]べながら'],
          ['する', 'します', 'しながら'],
          ['来[く]る', '来[き]ます', '来[き]ながら']
        ]
      }],
      jelas: [
        '**V1-ながら V2** = “melakukan V2 **sambil** V1”. Kedua kegiatan dilakukan oleh **orang yang sama pada waktu yang sama**.',
        'Kegiatan **utama** ada di **V2** (belakang); V1 hanya pelengkap: 「音楽[おんがく]を聞[き]き{ながら}、勉強[べんきょう]します」 = “belajar sambil mendengarkan musik” (yang utama: belajar).',
        'Cara membuat: bentuk ます, buang ます, tambah ながら.',
        'Kalau pelakunya berbeda, jangan pakai ながら.'
      ],
      contoh: [
        { jp: '音楽[おんがく]を{聞[き]きながら}、料理[りょうり]をします。', id: 'Saya memasak sambil mendengarkan musik.' },
        { jp: 'お茶[ちゃ]を{飲[の]みながら}、友[とも]だちと話[はな]しました。', id: 'Saya mengobrol dengan teman sambil minum teh.' },
        { jp: '歌[うた]を{歌[うた]いながら}、お風呂[ふろ]に入[はい]ります。', id: 'Saya mandi sambil bernyanyi.' },
        { jp: '{歩[ある]きながら}、食[た]べないでください。', id: 'Tolong jangan makan sambil berjalan.' },
        { jp: 'A：お祭[まつ]りでは、何[なに]をしますか。\nB：屋台[やたい]で買[か]った物[もの]を{食[た]べながら}、町[まち]を歩[ある]きます。', id: 'A: Di festival, ngapain saja?\nB: Berjalan keliling kota sambil makan jajanan dari kios.' },
        { jp: '子[こ]どもは、テレビを{見[み]ながら}ご飯[はん]を食[た]べています。', id: 'Anak itu makan sambil menonton TV.' }
      ],
      awas: [
        'Pelakunya harus **sama**: ×弟[おとうと]が歌[うた]いながら、私[わたし]が踊[おど]ります. Kalau pelakunya berbeda, pakai kalimat terpisah.',
        'Yang **utama** adalah V2. 「食[た]べながら話[はな]す」 = bicara yang utama; 「話[はな]しながら食[た]べる」 = makan yang utama.',
        'Pakai **bentuk ます tanpa ます**: ×食[た]べるながら → ○食[た]べながら.'
      ],
      kw: 'sambil bersamaan dua kegiatan ながら'
    },
    {
      name: 'Nによって',
      short: 'によって',
      arti: 'tergantung N / berbeda menurut N',
      inti: 'Pakai **によって** untuk bilang bahwa sesuatu **berbeda-beda tergantung** N (negara, daerah, orang, musim).',
      rumus: [['N', '+', '=によって', '+', '違[ちが]います／変[か]わります']],
      rumusNote: 'Diikuti kata yang menyatakan **perbedaan** atau **perubahan**',
      jelas: [
        '**Nによって～** = “tergantung／menurut N, (hasilnya) berbeda”. Biasanya diikuti 違[ちが]います (berbeda) atau 変[か]わります (berubah).',
        'Contoh: 「国[くに]{によって}、お祝[いわ]いの仕方[しかた]が違[ちが]います」 = “cara merayakan berbeda tergantung negaranya”.',
        'N yang sering dipakai: 国[くに] (negara), 人[ひと] (orang), 地域[ちいき] (daerah), 季節[きせつ] (musim), 天気[てんき] (cuaca).',
        'Hati-hati dengan yang mirip: **について** (tentang), **にとって** (bagi), **において** (di; resmi, ada di Bab 7).'
      ],
      contoh: [
        { jp: '成人式[せいじんしき]の日[ひ]は、地域[ちいき]{によって}違[ちが]います。', id: 'Tanggal upacara kedewasaan berbeda tergantung daerahnya.' },
        { jp: '国[くに]{によって}、お正月[しょうがつ]の食[た]べ物[もの]は違[ちが]います。', id: 'Makanan tahun baru berbeda-beda menurut negara.' },
        { jp: '人[ひと]{によって}、好[す]きな味[あじ]が違[ちが]います。', id: 'Selera yang disukai berbeda-beda menurut orang.' },
        { jp: '店[みせ]{によって}、値段[ねだん]が全然[ぜんぜん]違[ちが]いますね。', id: 'Harganya sangat berbeda tergantung tokonya ya.' },
        { jp: '季節[きせつ]{によって}、町[まち]の様子[ようす]が変[か]わります。', id: 'Suasana kota berubah tergantung musim.' },
        { jp: 'A：お祭[まつ]りは、毎年[まいとし]同[おな]じ日[ひ]ですか。\nB：いいえ、天気[てんき]{によって}、変[か]わります。', id: 'A: Festivalnya tiap tahun di tanggal yang sama?\nB: Tidak, berubah tergantung cuaca.' }
      ],
      awas: [
        'によって di sini **bukan** “oleh” atau “untuk”. Artinya “tergantung／menurut”, dan biasanya diikuti kata yang menyatakan **perbedaan** (違[ちが]う, 変[か]わる).',
        'Jangan tertukar: **によって** (tergantung), **にとって** (bagi), **について** (tentang), **において** (di; resmi).'
      ],
      kw: 'tergantung berbeda menurut bergantung によって'
    }
  ]
});
