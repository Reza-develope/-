/* =====================================================================
   data/buku/a22_18.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 18
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧, Japan Foundation): ❶〜❺.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 18,
  title: '将来[しょうらい]、自分[じぶん]の会社[かいしゃ]を作[つく]ろうと思[おも]います',
  arti: 'Di masa depan, saya berpikir untuk mendirikan perusahaan sendiri',
  topic: '私[わたし]の人生[じんせい]',
  topicArti: 'Hidupku',
  bisa: [
    'Menceritakan mimpi dan rencanamu di masa depan: “saya berpikir untuk ~”',
    'Menyebut tujuan dari sebuah usaha: “untuk ~, saya ~”',
    'Bilang bahwa kamu melakukan sesuatu untuk orang lain: ～てあげます',
    'Berterima kasih dengan menyebut kebaikan orang: ～てもらいました, ～てくれました'
  ],
  pola: [
    {
      name: 'V-（よ）うと思[おも]います／思[おも]っています',
      short: '（よ）うと思[おも]う',
      arti: 'berpikir akan ~ / berniat ~',
      inti: 'Pakai **bentuk niat (よ)う** + **と思[おも]います** untuk menyampaikan **niat atau rencanamu** yang belum terlalu pasti.',
      rumus: [['V-（よ）う', '+', '=と思[おも]います'], ['V-（よ）う', '+', '=と思[おも]っています']],
      rumusNote: 'V-（よ）う = bentuk niat (意向形[いこうけい]) · と思[おも]います = baru terpikir · と思[おも]っています = sudah lama berniat',
      tabel: [{
        judul: 'Cara membuat bentuk niat (意向形[いこうけい])',
        kepala: ['Kelompok', 'Kamus', 'Bentuk niat'],
        baris: [
          ['Kel. 1', '作[つく]る', '作[つく]ろう'],
          ['Kel. 1', '行[い]く', '行[い]こう'],
          ['Kel. 1', '飲[の]む', '飲[の]もう'],
          ['Kel. 1', '買[か]う', '買[か]おう'],
          ['Kel. 2', '食[た]べる', '食[た]べよう'],
          ['Kel. 3', 'する', 'しよう'],
          ['Kel. 3', '来[く]る', '来[こ]よう']
        ]
      }],
      jelas: [
        '**V-（よ）う** = bentuk niat (artinya juga “ayo ~”). Ditambah **と思[おも]います** → “saya berpikir akan ~”, yaitu **niat atau rencana** yang belum terlalu pasti.',
        'Kel. 1: huruf terakhir pindah ke baris **お** + **う** (作[つく]**る** → 作[つく]**ろう**). Kel. 2: **る → よう** (食[た]べ**る** → 食[た]べ**よう**). する → **しよう**, 来[く]る → **来[こ]よう**.',
        '**と思[おも]います** = niat yang kamu sampaikan **sekarang** (baru terpikir atau sedang memutuskan). **と思[おも]っています** = niat yang **sudah kamu pegang** sejak lama: 「ずっと、留学[りゅうがく]しようと思[おも]っています」.',
        'Untuk niat **orang lain**, pakai **と思[おも]っています**: 「兄[あに]は、来年[らいねん]、会社[かいしゃ]を始[はじ]めようと思[おも]っています」.'
      ],
      contoh: [
        { jp: '来年[らいねん]、日本語[にほんご]の試験[しけん]を{受[う]けようと思[おも]います}。', id: 'Tahun depan saya berpikir untuk ikut ujian bahasa Jepang.' },
        { jp: '今度[こんど]の休[やす]みに、京都[きょうと]へ{行[い]こうと思[おも]います}。', id: 'Pada libur kali ini, saya berpikir untuk pergi ke Kyoto.' },
        { jp: '週末[しゅうまつ]は、部屋[へや]を{掃除[そうじ]しようと思[おも]います}。', id: 'Akhir pekan ini saya berpikir untuk membersihkan kamar.' },
        { jp: 'ずっと、国[くに]で店[みせ]を{始[はじ]めようと思[おも]っています}。', id: 'Sudah lama saya berniat membuka toko di negara asalku.' },
        { jp: '夏[なつ]は、友[とも]だちと富士山[ふじさん]に{登[のぼ]ろうと思[おも]っています}。', id: 'Musim panas nanti saya berniat mendaki Gunung Fuji bersama teman.' },
        { jp: 'A：卒業[そつぎょう]したら、何[なに]をしますか。\nB：大学院[だいがくいん]に{進[すす]もうと思[おも]っています}。', id: 'A: Kalau sudah lulus, mau melakukan apa?\nB: Saya berniat melanjutkan ke program pascasarjana.' }
      ],
      awas: [
        'Bentuk di depan と思[おも]います adalah **bentuk niat** (作[つく]ろう). Kalau pakai bentuk kamus, artinya lain: 「作[つく]ると思[おも]います」 = “saya kira (dia) akan membuat” (perkiraan).',
        'Kel. 2 pakai **よう**: ○食[た]べよう (×食[た]べろう, ×食[た]べるう). Dibanding つもり (Bab 6, rencana yang lebih mantap), (よ)うと思[おも]います terdengar lebih lunak.'
      ],
      kw: 'berniat berpikir akan rencana mimpi masa depan bentuk niat volisional ayo'
    },
    {
      name: 'V-るために、～',
      short: 'ために',
      arti: 'untuk ~ (tujuan)',
      inti: 'Pakai ini untuk menyebut **tujuan** dari sebuah tindakan: “**untuk** ~, (saya) ~”.',
      rumus: [['V1-る', '+', '=ために', '、', 'V2']],
      rumusNote: 'V1 = tujuan · V2 = usaha untuk mencapai tujuan itu · Kata benda: Nのために (Bab 14)',
      jelas: [
        '**V1-るために、V2** = “untuk V1, (saya) V2”. Bagian depan = **tujuan**, bagian belakang = **usaha** yang dilakukan.',
        'Di depan ために pakai **bentuk kamus**: 「日本[にほん]に住[す]む{ために}」. Kalau kata benda, pakai **Nの＋ために** (Bab 14): 「留学[りゅうがく]の{ために}」.',
        'Pelaku V1 dan V2 **sama** (orangnya itu-itu saja), dan V1 adalah tindakan yang **sengaja kamu lakukan** (住[す]む, 買[か]う, 勉強[べんきょう]する).',
        'Kalau V1 berupa **bentuk bisa** atau hal yang tidak bisa diatur kemauan, atau pelakunya beda, pakai **ように** (Bab 10): 「ちゃんと話[はな]せる{ように}、練習[れんしゅう]します」.'
      ],
      contoh: [
        { jp: '日本語[にほんご]の先生[せんせい]になる{ために}、大学[だいがく]で勉強[べんきょう]しています。', id: 'Untuk menjadi guru bahasa Jepang, saya belajar di universitas.' },
        { jp: '車[くるま]を買[か]う{ために}、毎月[まいつき]、お金[かね]をためています。', id: 'Untuk membeli mobil, saya menabung uang setiap bulan.' },
        { jp: '家族[かぞく]に会[あ]う{ために}、来月[らいげつ]、国[くに]へ帰[かえ]ります。', id: 'Untuk bertemu keluarga, bulan depan saya pulang ke negara asal.' },
        { jp: '健康[けんこう]の{ために}、毎日[まいにち]、野菜[やさい]を食[た]べます。', id: 'Demi kesehatan, setiap hari saya makan sayur.' },
        { jp: '日本[にほん]の大学[だいがく]に入[はい]る{ために}、一日[いちにち]五時間[ごじかん]勉強[べんきょう]します。', id: 'Untuk masuk universitas di Jepang, saya belajar lima jam sehari.' },
        { jp: 'A：どうして、日本[にほん]に来[き]たんですか。\nB：日本[にほん]の会社[かいしゃ]で働[はたら]く{ために}、来[き]ました。', id: 'A: Kenapa kamu datang ke Jepang?\nB: Saya datang untuk bekerja di perusahaan Jepang.' }
      ],
      awas: [
        'Pakai **bentuk kamus** (V-る): ×住[す]んだために. (V-た + ために berarti “karena”, bukan “untuk”.)',
        '**ために** di sini = “untuk (tujuan)”. Untuk “karena” (alasan) yang umum pakai **から／ので** (Bab 1, 3).'
      ],
      kw: 'untuk tujuan agar supaya usaha demi bertujuan'
    },
    {
      name: 'V-てあげます',
      short: 'てあげる',
      arti: 'melakukan ~ untuk (orang lain)',
      inti: 'Pakai ini untuk bilang **kamu melakukan sesuatu untuk orang lain** sebagai kebaikan: “aku → orang lain”.',
      rumus: [['Pemberi', '=は', 'Penerima', '=に', 'N', '=を', 'V-て', '+', '=あげます']],
      rumusNote: 'Pemberi = aku atau pihakku · Penerima ditandai に',
      tabel: [{
        judul: 'Tiga serangkai “memberi–menerima”',
        kepala: ['Pola', 'Arah kebaikan', 'Contoh'],
        baris: [
          ['V-てあげます', 'aku → orang lain', '友[とも]だちに教[おし]えてあげます'],
          ['V-てくれます', 'orang lain → aku', '友[とも]だちが教[おし]えてくれます'],
          ['V-てもらいます', 'aku menerima dari orang lain', '友[とも]だちに教[おし]えてもらいます']
        ]
      }],
      jelas: [
        '**V-てあげます** = “melakukan ~ **untuk** orang lain”. Arah kebaikannya dari **aku (atau pihakku)** ke orang lain.',
        'Orang yang menerima ditandai **に**: 「友[とも]だち{に}、本[ほん]を貸[か]し{てあげました}」 = “aku meminjamkan buku untuk teman”.',
        'Kata kerjanya berbentuk **V-て**: 作[つく]る → 作[つく]っ{てあげます}.',
        'Ada **tiga serangkai** “memberi–menerima”: **てあげます** (aku → orang lain), **てくれます** (orang lain → aku), **てもらいます** (aku menerima dari orang lain). Lihat tabel, dan dua pola berikutnya.'
      ],
      contoh: [
        { jp: '友[とも]だちに、日本語[にほんご]を教[おし]え{てあげました}。', id: 'Saya mengajari temanku bahasa Jepang.' },
        { jp: '妹[いもうと]に、新[あたら]しい服[ふく]を買[か]っ{てあげました}。', id: 'Saya membelikan adikku baju baru.' },
        { jp: '母[はは]の誕生日[たんじょうび]に、ケーキを作[つく]っ{てあげるつもりです}。', id: 'Untuk ulang tahun ibu, saya berencana membuatkan kue.' },
        { jp: '子[こ]どもに、絵本[えほん]を読[よ]ん{であげます}。', id: 'Saya membacakan buku bergambar untuk anak.' },
        { jp: 'おばあさんの重[おも]い荷物[にもつ]を、持[も]っ{てあげました}。', id: 'Saya membawakan barang berat milik nenek.' },
        { jp: 'A：この漢字[かんじ]、読[よ]めません。\nB：私[わたし]が読[よ]ん{であげる}よ。', id: 'A: Aku tidak bisa membaca kanji ini.\nB: Aku bacakan ya.' }
      ],
      awas: [
        'Orang yang menerima ditandai **に**: ○友[とも]だち{に}教[おし]えてあげる. Jangan pakai を untuk penerima.',
        'Ke guru, atasan, atau orang yang dihormati, てあげます terdengar seperti “saya berbaik hati”. Lebih sopan menawarkan dengan **V-ましょうか**.',
        'Jangan dipakai untuk kebaikan yang **orang lain lakukan padamu**: itu **てくれます** (pola 5).'
      ],
      kw: 'memberi melakukan untuk orang lain membantu kebaikan aku ke orang lain membawakan membacakan'
    },
    {
      name: 'V-てもらいます',
      short: 'てもらう',
      arti: 'menerima kebaikan dari ~ (dibantu / dibuatkan)',
      inti: 'Pakai ini untuk bilang **kamu menerima kebaikan dari orang lain**: dibantu, diajari, dibuatkan.',
      rumus: [['Penerima', '=は', 'Pemberi', '=に', 'N', '=を', 'V-て', '+', '=もらいます']],
      rumusNote: 'Penerima = aku atau pihakku (subjek) · Pemberi ditandai に (kadang から)',
      tabel: [{
        judul: 'Satu kejadian, dua cara bercerita',
        kepala: ['Pola', 'Subjek', 'Contoh'],
        baris: [
          ['V-てくれます', 'yang berbuat baik', '先生[せんせい]が教[おし]えてくれました'],
          ['V-てもらいます', 'yang menerima (aku)', '先生[せんせい]に教[おし]えてもらいました']
        ]
      }],
      jelas: [
        '**V-てもらいます** = “menerima kebaikan: **dibantu / diajari / dibuatkan** oleh orang lain”. Subjek kalimat adalah **yang menerima** (biasanya aku).',
        'Orang yang berbuat baik ditandai **に** (kadang **から**): 「先生[せんせい]{に}、日本語[にほんご]を教[おし]え{てもらいました}」.',
        'Artinya hampir sama dengan **てくれます**, tapi **sudut pandangnya beda**: てもらう = “aku yang menerima”, てくれる = “dia yang memberi” (lihat tabel).',
        'Bentuk untuk **meminta tolong**: **V-てもらえますか** = “bisa tolong ~?”. Seperti di judul Bab 14: 「切[き]ってもらえますか」.'
      ],
      contoh: [
        { jp: '先生[せんせい]に、作文[さくぶん]を直[なお]し{てもらいました}。', id: 'Saya minta guru memperbaiki karangan saya.' },
        { jp: '友[とも]だちに、引[ひ]っ越[こ]しを手伝[てつだ]っ{てもらいました}。', id: 'Temanku membantu pindahan saya.' },
        { jp: '山田[やまだ]さんに、駅[えき]まで車[くるま]で送[おく]っ{てもらいました}。', id: 'Saya diantar Yamada-san naik mobil sampai stasiun.' },
        { jp: '日本[にほん]の友[とも]だちに、おいしい店[みせ]を教[おし]え{てもらいました}。', id: 'Saya diberi tahu teman Jepang tentang toko yang enak.' },
        { jp: 'この荷物[にもつ]、ちょっと持[も]っ{てもらえますか}。', id: 'Barang ini, bisa tolong dibawakan sebentar?' },
        { jp: 'A：日本語[にほんご]、上手[じょうず]ですね。\nB：職場[しょくば]の人[ひと]に、毎日[まいにち]、教[おし]え{てもらっています}。', id: 'A: Bahasa Jepangmu bagus ya.\nB: Setiap hari saya diajari orang di tempat kerja.' }
      ],
      awas: [
        'Orang yang berbuat baik ditandai **に** (bukan が): ○先生[せんせい]{に}教[おし]えてもらいました. Kalau mau pemberinya jadi subjek, ganti ke **てくれました**: 先生[せんせい]が教[おし]えてくれました.',
        'Subjek てもらいます adalah **penerima**. Jangan tertukar dengan てあげます: てもらう = aku menerima, てあげる = aku memberi.'
      ],
      kw: 'menerima dibantu diajari dibuatkan minta tolong diantar kebaikan dari orang lain'
    },
    {
      name: 'V-てくれます',
      short: 'てくれる',
      arti: '(dia) melakukan ~ untukku',
      inti: 'Pakai ini untuk bilang **orang lain melakukan sesuatu untukku** (atau pihakku) sebagai kebaikan.',
      rumus: [['Pemberi', '=が', 'N', '=を', 'V-て', '+', '=くれます'], ['Pemberi', '=は', 'Aku', '=に', 'N', '=を', 'V-て', '+', '=くれます']],
      rumusNote: 'Pemberi = yang berbuat baik (subjek) · Penerima = aku atau pihakku, biasanya tidak disebut',
      jelas: [
        '**V-てくれます** = “**dia melakukan ~ untukku**”. Subjeknya adalah **orang yang berbuat baik**, ditandai **が／は**.',
        'Penerima adalah **aku** atau orang di pihakku (keluarga, teman dekat). Biasanya “aku” **tidak disebut**: 「友[とも]だちが、手伝[てつだ]ってくれました」.',
        'Cocok untuk **berterima kasih** dan bercerita tentang kebaikan orang: ありがたかった, うれしかった, 助[たす]かりました.',
        'Pemberi **が／は** → てくれます. Pemberi **に** → てもらいます. Artinya sama, sudut pandangnya beda (lihat pola 4).'
      ],
      contoh: [
        { jp: '山田[やまだ]さんは、私[わたし]に、おいしい店[みせ]を教[おし]え{てくれました}。', id: 'Yamada-san memberitahuku toko yang enak.' },
        { jp: '先生[せんせい]は、いつもやさしく説明[せつめい]し{てくれます}。', id: 'Guru selalu menjelaskan dengan ramah kepadaku.' },
        { jp: '友[とも]だちが、空港[くうこう]まで迎[むか]えに来[き]{てくれました}。', id: 'Temanku datang menjemputku sampai bandara.' },
        { jp: '母[はは]は、毎月[まいつき]、国[くに]から荷物[にもつ]を送[おく]っ{てくれます}。', id: 'Ibu setiap bulan mengirimiku paket dari negara asal.' },
        { jp: '近所[きんじょ]の人[ひと]が、ごみの出[だ]し方[かた]を教[おし]え{てくれました}。', id: 'Tetangga mengajariku cara membuang sampah.' },
        { jp: 'A：その傘[かさ]、いいですね。\nB：ええ、姉[あね]が買[か]っ{てくれました}。', id: 'A: Payung itu bagus ya.\nB: Iya, kakakku yang membelikannya untukku.' }
      ],
      awas: [
        'Subjeknya **pemberi** (が／は). Jangan menaruh “aku” sebagai subjek: ×私[わたし]は先生[せんせい]に教[おし]えてくれました. Kalau “aku” yang jadi subjek, pakai **てもらいました**.',
        'てくれます **hanya** untuk kebaikan yang sampai ke **aku / pihakku**. Kebaikan antara dua orang lain pakai てあげます: 「田中[たなか]さんは、山田[やまだ]さんに本[ほん]を貸[か]してあげました」.'
      ],
      kw: 'dia melakukan untukku kebaikan orang lain berterima kasih membantu mengajari menjemput'
    }
  ]
});
