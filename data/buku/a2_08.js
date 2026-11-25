/* =====================================================================
   data/buku/a2_08.js — Buku Bunpou Irodori A2 (初級1) · Bab 8
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧): ➊ もうV-ました ➋ V-たことがあります ➌ V-に行きませんか？
   ➍ Nの前に、～／Nのあと（で）、～ ➎ V-たいんですが….
   ===================================================================== */
FC.defineBuku('a2', {
  n: 8,
  title: '野球[やきゅう]、したことありますか？',
  arti: 'Kamu pernah main bisbol?',
  topic: 'いっしょに出[で]かける',
  topicArti: 'Pergi bersama-sama',
  bisa: [
    'Mengajak seseorang makan, berbelanja atau menonton sesuatu bersama-sama',
    'Menanyakan apakah lawan bicara sudah atau pernah melakukan sesuatu',
    'Berunding soal kegiatan sebelum／sesudah suatu acara',
    'Menyampaikan keinginan dengan halus saat berbelanja atau meminta bantuan'
  ],
  pola: [
    {
      name: 'もうV-ましたか？',
      short: 'もうV-ました',
      arti: 'sudah ~? (kegiatan yang sudah／belum selesai)',
      inti: 'Pakai ini untuk menanyakan apakah suatu kegiatan **sudah dilakukan／sudah selesai**: **“Sudah ~?”**',
      rumus: [['=もう', '+', 'V-ました', '+', '=か？'], ['Jawab:', '=はい、V-ました', '／', '=いいえ、まだです']],
      rumusNote: 'もう = sudah · まだ = belum',
      jelas: [
        '**もうV-ましたか？** = “Sudah V?”. **もう** = “sudah (pada saat ini)”. Kamu menanyakan apakah kegiatan itu **sudah terjadi**.',
        'Dipakai untuk mengecek sebelum mengajak seseorang, atau untuk kegiatan yang **memang diharapkan sudah selesai** (makan siang, PR, dan sebagainya): 「{もう}昼[ひる]ご飯[はん]を食[た]べ{ましたか}？」.',
        'Menjawab: sudah → 「はい、(もう)V-ました」; belum → 「**いいえ、まだです**」. Bentuk lengkap untuk “belum”: 「まだV-ていません」.',
        'Dalam percakapan santai: 「宿題[しゅくだい]、もうやった？」 (bentuk biasa／普通体[ふつうたい] = tanpa です・ます).',
        'Beda dengan V-たことがあります (pola 2): もうV-ましたか？ menanyakan kegiatan yang **semestinya sudah** dilakukan, sedangkan V-たことがありますか？ menanyakan **pengalaman** secara umum.'
      ],
      contoh: [
        { jp: '新[あたら]しいお店[みせ]に、{もう}行[い]き{ましたか}？', id: 'Apakah kamu sudah pergi ke toko yang baru?' },
        { jp: '{もう}昼[ひる]ご飯[はん]を食[た]べ{ましたか}？', id: 'Apakah kamu sudah makan siang?' },
        { jp: 'A：宿題[しゅくだい]は、{もう}やり{ましたか}？\nB：いいえ、{まだです}。', id: 'A: PR-nya sudah dikerjakan?\nB: Belum.' },
        { jp: 'A：図書館[としょかん]の本[ほん]は、{もう}返[かえ]し{ましたか}？\nB：はい、きのう返[かえ]しました。でも、CDは{まだです}。', id: 'A: Apakah buku perpustakaan sudah kamu kembalikan?\nB: Sudah, kemarin. Tapi CD-nya belum.' },
        { jp: '宿題[しゅくだい]、{もう}やっ{た}？', id: 'PR-nya sudah dikerjakan? (santai)' },
        { jp: '切符[きっぷ]は、{もう}買[か]い{ましたか}？', id: 'Tiketnya sudah dibeli?' }
      ],
      awas: [
        'Untuk “belum”, jawab 「まだです」 (atau 「まだV-ていません」), bukan 「V-ませんでした」 yang artinya “tidak melakukan (waktu itu)”.',
        'Kalau hanya ingin menanyakan **pengalaman hidup** (“pernah makan sushi?”), pakai **V-たことがありますか？** (pola 2), bukan もうV-ましたか？.',
        '**もう** di sini = “sudah”. Jangan campur dengan もう少[すこ]し (“sedikit lagi”) atau もう一度[いちど] (“sekali lagi”): artinya berbeda.'
      ],
      kw: 'sudah belum もう まだ menanyakan selesai kegiatan sudah dilakukan'
    },
    {
      name: 'V-たことがあります',
      short: 'たことがある',
      arti: 'pernah ~ (pengalaman)',
      inti: 'Pakai ini untuk bercerita atau bertanya tentang **pengalaman** di masa lalu: **“pernah ~”**.',
      rumus: [['V-た', '+', '=ことがあります']],
      rumusNote: 'V-た = bentuk lampau · Tanya: V-たことがありますか？ · Belum pernah: V-たことがありません／ないです',
      tabel: [{
        judul: 'Ingat lagi: bentuk V-た (bentuk lampau)',
        kepala: ['Kelompok', 'Perubahan', 'Contoh (kamus → V-た)'],
        baris: [
          ['Kel. 1', 'う・つ・る → った', '買[か]う → 買[か]った ・ 待[ま]つ → 待[ま]った ・ 作[つく]る → 作[つく]った'],
          ['Kel. 1', 'む・ぶ・ぬ → んだ', '飲[の]む → 飲[の]んだ ・ 遊[あそ]ぶ → 遊[あそ]んだ'],
          ['Kel. 1', 'く → いた', '書[か]く → 書[か]いた ・ 働[はたら]く → 働[はたら]いた'],
          ['Kel. 1', 'ぐ → いだ', '泳[およ]ぐ → 泳[およ]いだ'],
          ['Kel. 1', 'す → した', '話[はな]す → 話[はな]した'],
          ['Kel. 1', 'Pengecualian', '行[い]く → 行[い]った （×行[い]いた）'],
          ['Kel. 2', 'る → た', '見[み]る → 見[み]た ・ 食[た]べる → 食[た]べた'],
          ['Kel. 3', 'Tidak beraturan', 'する → した ・ 来[く]る → 来[き]た']
        ]
      }],
      jelas: [
        '**V-たことがあります** = “pernah V”. Dipakai untuk **pengalaman** di masa lalu (sekali atau lebih), tanpa menyebut kapan persisnya.',
        'Tanya: 「V-たことがありますか？」. Jawab: 「はい、あります」／「いいえ、ありません」 (boleh juga 「ないです」). Jumlah bisa ditambahkan: 「一度[いちど]あります」 (pernah sekali).',
        'Dalam percakapan, **が** sering dihilangkan: 「見[み]たことあります」「見[み]たことないです」. Bentuk biasa (普通体[ふつうたい]):「V-たことが{ある}／{ない}」.',
        'V-た dibuat dari bentuk て: akhiran **て → た**, **で → だ** (lihat tabel).',
        'Beda dengan もうV-ましたか？ (pola 1): V-たことがありますか？ menanyakan **pengalaman secara umum**, sedangkan もうV-ましたか？ menanyakan kegiatan yang **semestinya sudah** dilakukan.'
      ],
      contoh: [
        { jp: '日本[にほん]の映画[えいが]を見[み]{たことがありますか}？', id: 'Pernahkah kamu menonton film Jepang?' },
        { jp: 'A：納豆[なっとう]を食[た]べ{たことがありますか}？\nB：いいえ、食[た]べ{たことがありません}。', id: 'A: Pernahkah kamu makan natto?\nB: Belum, saya belum pernah.' },
        { jp: '富士山[ふじさん]に登[のぼ]っ{たことがあります}。', id: 'Saya pernah mendaki Gunung Fuji.' },
        { jp: '野球[やきゅう]を{したことがあります}か？', id: 'Pernahkah kamu bermain bisbol?' },
        { jp: 'A：あそこのラーメン屋[や]、行[い]っ{たことある}？\nB：うん、{あるよ}。おいしいよ。', id: 'A: Pernah ke kedai ramen di sana?\nB: Ya, pernah. Enak lho.' },
        { jp: 'まだ日本[にほん]に行[い]っ{たことがありません}。', id: 'Saya belum pernah pergi ke Jepang.' }
      ],
      awas: [
        'Pakai **bentuk V-た**, bukan bentuk kamus atau ます: ×食[た]べるたことがあります／×食[た]べますことがあります → ○食[た]べたことがあります.',
        '**行[い]く → 行[い]った** (bukan 行[い]いた): satu-satunya pengecualian untuk akhiran く di Kelompok 1.',
        'Jawaban “belum pernah” adalah 「ありません／ないです」. 「まだです」 dipakai untuk もうV-ましたか？ (pola 1), bukan di sini.'
      ],
      kw: 'pernah pengalaman たことがある た形 belum pernah lampau'
    },
    {
      name: 'V-に行[い]きませんか？',
      short: 'に行[い]きませんか',
      arti: 'mau pergi untuk ~ bersama? (ajakan)',
      inti: 'Pakai ini untuk **mengajak** seseorang pergi melakukan sesuatu bersama-sama: **“Mau pergi (untuk) ~ bersama?”**',
      rumus: [['V-ます (tanpa ます)', '+', '=に', '+', '=行[い]きませんか？']],
      rumusNote: 'Bentuk biasa／santai: V-に行[い]かない？ · Tujuan boleh berupa kata benda kegiatan: 買[か]い物[もの]に行[い]く',
      tabel: [{
        judul: 'Membentuk “pergi untuk V”',
        kepala: ['Kamus', 'V-ます tanpa ます', 'V-に行[い]く'],
        baris: [
          ['食[た]べる', '食[た]べ', '食[た]べに行[い]く'],
          ['飲[の]む', '飲[の]み', '飲[の]みに行[い]く'],
          ['見[み]る', '見[み]', '見[み]に行[い]く'],
          ['買[か]う', '買[か]い', '買[か]いに行[い]く'],
          ['する', 'し', 'しに行[い]く']
        ]
      }],
      jelas: [
        '**V-に行[い]く** = “pergi untuk V”. **に** menunjukkan **tujuan** kepergian. Kata kerjanya diubah ke **bentuk ます tanpa ます**: 食[た]べます → 食[た]べ{に}行[い]きます.',
        'Ditambah **〜ませんか？**, menjadi **ajakan**: 「いっしょに食[た]べ{に行[い]きませんか}？」 = “Mau pergi makan bersama?”. Menerima: 「いいですね。行[い]きましょう」「ぜひ」. Menolak halus: 「すみません、ちょっと…」.',
        'Tujuan boleh berupa **kata benda kegiatan**: 買[か]い物[もの]{に}行[い]く, 食事[しょくじ]{に}行[い]く, 散歩[さんぽ]{に}行[い]く. Untuk kata benda + する, boleh juga: 勉強[べんきょう]{に}行[い]く = 勉強[べんきょう]し{に}行[い]く.',
        'Selain 行[い]く bisa 来[く]る: 「友[とも]だちが遊[あそ]び{に来[き]ました}」 (teman datang untuk main).',
        'Dalam percakapan santai: 「今度[こんど]、映画[えいが]を見[み]{に行[い]かない}？」.'
      ],
      contoh: [
        { jp: 'いっしょに食[た]べ{に行[い]きませんか}？', id: 'Mau pergi makan bersama?' },
        { jp: '今度[こんど]の日曜日[にちようび]、映画[えいが]を見[み]{に行[い]きませんか}？', id: 'Hari Minggu nanti, mau pergi nonton film?' },
        { jp: 'A：あした、お茶[ちゃ]を飲[の]み{に行[い]きませんか}？\nB：いいですね。行[い]きましょう。', id: 'A: Besok mau pergi minum teh?\nB: Boleh juga. Ayo pergi.' },
        { jp: 'A：土曜日[どようび]、買[か]い物[もの]{に行[い]きませんか}？\nB：すみません、土曜日[どようび]はちょっと…。', id: 'A: Hari Sabtu, mau pergi belanja?\nB: Maaf, hari Sabtu agak…' },
        { jp: '今度[こんど]、いっしょに遊[あそ]び{に行[い]かない}？', id: 'Lain kali, mau main bareng? (santai)' },
        { jp: '友[とも]だちが、日本[にほん]から遊[あそ]び{に来[き]ました}。', id: 'Temanku datang dari Jepang untuk main.' }
      ],
      awas: [
        'Pakai **bentuk ます tanpa ます** + に, bukan bentuk kamus: ×食[た]べるに行[い]きます → ○食[た]べに行[い]きます.',
        'Bedakan: 食[た]べ**に**行[い]きます (pergi **untuk** makan) dan 食[た]べ**て**行[い]きます (makan **dulu**, lalu pergi, bab 11).',
        'Ajakan 「行[い]きませんか」 disambut dengan 「行[い]きましょう」 (setuju). 「行[い]きますか？」 hanya bertanya “apakah kamu akan pergi?”.'
      ],
      kw: 'ajakan mengajak pergi untuk makan nonton belanja に行く ませんか tujuan'
    },
    {
      name: 'Nの前[まえ]に、～ ／ Nのあと（で）、～',
      short: '前[まえ]に・あとで',
      arti: 'sebelum N／sesudah N',
      inti: 'Pakai ini untuk menyatakan **urutan kegiatan**: kegiatan di belakang terjadi **sebelum** atau **sesudah** N.',
      rumus: [['N', '=の前[まえ]に', '、', 'Kegiatan'], ['N', '=のあと(で)', '、', 'Kegiatan']],
      rumusNote: 'N = kata benda kegiatan／acara (食事[しょくじ]・買[か]い物[もの]・映画[えいが]・仕事[しごと]・勉強[べんきょう]・授業[じゅぎょう]) · で boleh dihilangkan',
      tabel: [{
        judul: 'Urutan kejadian',
        kepala: ['Pola', 'Urutan', 'Contoh'],
        baris: [
          ['Nの前[まえ]に、A', 'A → N', '食事[しょくじ]の前[まえ]に、手[て]を洗[あら]います（cuci tangan → makan）'],
          ['Nのあと(で)、A', 'N → A', '食事[しょくじ]のあとで、散歩[さんぽ]します（makan → jalan-jalan）']
        ]
      }],
      jelas: [
        '**Nの前[まえ]に、A** = “Sebelum N, A”. A terjadi **lebih dulu**, N menyusul: 「試験[しけん]の{前[まえ]に}、先生[せんせい]に質問[しつもん]したいんですが…」 = “Sebelum ujian, saya ingin bertanya kepada guru, …”.',
        '**Nのあと(で)、A** = “Sesudah N, A”. N terjadi **lebih dulu**, A menyusul: 「授業[じゅぎょう]の{あとで}、図書館[としょかん]に行[い]きます」 = “Sesudah kelas, saya pergi ke perpustakaan”.',
        'N di sini berupa **kegiatan／acara**: 食事[しょくじ], 買[か]い物[もの], 映画[えいが], 仕事[しごと], 勉強[べんきょう], 授業[じゅぎょう], 学校[がっこう].',
        '**で** setelah あと boleh dihilangkan: 「仕事[しごと]の{あと}、友[とも]だちに会[あ]います」.'
      ],
      contoh: [
        { jp: '食事[しょくじ]の{前[まえ]に}、手[て]を洗[あら]ってください。', id: 'Sebelum makan, tolong cuci tangan.' },
        { jp: '映画[えいが]の{前[まえ]に}、ポップコーンを買[か]いましょう。', id: 'Sebelum filmnya, ayo beli popcorn.' },
        { jp: '授業[じゅぎょう]の{あとで}、図書館[としょかん]に行[い]きます。', id: 'Sesudah kelas, saya pergi ke perpustakaan.' },
        { jp: '仕事[しごと]の{あと}、友[とも]だちに会[あ]います。', id: 'Sesudah kerja, saya bertemu teman.' },
        { jp: 'A：買[か]い物[もの]の{あとで}、お茶[ちゃ]を飲[の]みませんか？\nB：いいですね。でも、買[か]い物[もの]の{前[まえ]に}、銀行[ぎんこう]に行[い]きたいんですが…。', id: 'A: Sesudah belanja, mau minum teh?\nB: Boleh. Tapi sebelum belanja, saya ingin pergi ke bank, …' },
        { jp: '日本語[にほんご]の勉強[べんきょう]の{前[まえ]に}、少[すこ]し休[やす]みます。', id: 'Sebelum belajar bahasa Jepang, saya istirahat sebentar.' }
      ],
      awas: [
        'Jangan terbalik: 「N**の前[まえ]に**、A」 → **A dulu**, N belakangan. 「N**のあとで**、A」 → **N dulu**, A belakangan.',
        'Setelah N dipakai **の**: ×食事[しょくじ]前[まえ]に／×食事[しょくじ]あとで → ○食事[しょくじ]の前[まえ]に／○食事[しょくじ]のあとで.',
        'Dengan kata benda **tempat**, 前[まえ] biasanya berarti “di depan”: 駅[えき]の前[まえ]で会[あ]います = “bertemu di depan stasiun”, bukan “sebelum stasiun”. Untuk arti “sebelum”, pakai kata benda **kegiatan／peristiwa** (食事[しょくじ], 試験[しけん], 会議[かいぎ]).',
        'Untuk kata kerja (“sebelum makan”, “sesudah makan”) bentuknya lain (V-る前[まえ]に／V-たあと) dan dipelajari di bab 15.'
      ],
      kw: 'sebelum sesudah urutan 前に あとで kegiatan makan belanja kerja'
    },
    {
      name: 'V-たいんですが…',
      short: 'たいんですが',
      arti: 'saya ingin ~, … (permintaan halus)',
      inti: 'Pakai ini untuk **menyampaikan keinginan sekaligus meminta／berkonsultasi dengan halus**: **“Saya ingin ~, …”**',
      rumus: [['V-ます (tanpa ます)', '+', '=たいんですが…']],
      rumusNote: 'V-たい = ingin V · んです = menjelaskan keadaan · が… = kalimat dibiarkan menggantung, menunggu tanggapan',
      tabel: [{
        judul: 'Membentuk V-たい',
        kepala: ['Kamus', 'V-たい', 'V-たいんですが…'],
        baris: [
          ['買[か]う', '買[か]いたい', '買[か]いたいんですが…'],
          ['休[やす]む', '休[やす]みたい', '休[やす]みたいんですが…'],
          ['見[み]る', '見[み]たい', '見[み]たいんですが…'],
          ['相談[そうだん]する', '相談[そうだん]したい', '相談[そうだん]したいんですが…']
        ]
      }],
      jelas: [
        '**V-たい** = “ingin V”. Ditambah **んですが…**, menjadi cara halus menyampaikan keinginan sambil meminta tanggapan: 「この靴[くつ]を買[か]い{たいんですが}…」 = “Saya ingin membeli sepatu ini, …(bisa dibantu?)”.',
        'Kalimat **berhenti di が…** (menggantung). Kamu menyampaikan keinginan lalu **menunggu respons** lawan bicara (bantuan, saran, izin). Sering dipakai di toko, kantor, atau saat bertanya.',
        'Di bab 6 kamu belajar 「Nに行[い]きたいんですが…」; sekarang dipakai dengan **kata kerja lain**: 買[か]う, 休[やす]む, 見[み]る, 相談[そうだん]する, dan sebagainya.',
        'Kalimat boleh **dilanjutkan** setelah が: 「コーヒーが飲[の]み{たいんですが}、この近[ちか]くにカフェがありますか？」.',
        'Objek V-たい boleh ditandai **を** atau **が**: 「水[みず]を／が飲[の]みたい」.'
      ],
      contoh: [
        { jp: 'この靴[くつ]を買[か]い{たいんですが}…。', id: 'Saya ingin membeli sepatu ini, …' },
        { jp: '先生[せんせい]に相談[そうだん]し{たいんですが}…。', id: 'Saya ingin berkonsultasi dengan guru, …' },
        { jp: 'A：いらっしゃいませ。\nB：すみません、スマホのケースを探[さが]し{たいんですが}…。\nA：こちらです。どうぞ。', id: 'A: Selamat datang.\nB: Permisi, saya ingin mencari casing HP, …\nA: Di sini. Silakan.' },
        { jp: 'A：すみません、明日[あした]、早[はや]く帰[かえ]り{たいんですが}…。\nB：はい、いいですよ。', id: 'A: Maaf, besok saya ingin pulang lebih awal, …\nB: Ya, boleh.' },
        { jp: '日本[にほん]の歴史[れきし]を勉強[べんきょう]し{たいんですが}…。', id: 'Saya ingin belajar sejarah Jepang, …' },
        { jp: 'コーヒーが飲[の]み{たいんですが}、この近[ちか]くにカフェがありますか？', id: 'Saya ingin minum kopi, apakah ada kafe di dekat sini?' }
      ],
      awas: [
        'Pakai **bentuk ます tanpa ます** + たい: ×買[か]うたい／×買[か]いますたい → ○買[か]いたい.',
        '**V-たい** dipakai untuk keinginan **dirimu** (dan untuk menanyakan keinginan lawan bicara: 「V-たいですか？」). Untuk menceritakan keinginan orang lain biasanya dipakai bentuk lain, jadi hindari 「田中[たなか]さんは〜たいです」.',
        'Kalau tujuanmu **meminta bantuan**, jangan berhenti di 「〜たいです」. **んですが…** membuat kalimat lebih halus dan membuka percakapan.'
      ],
      kw: 'ingin ~ たい んですが permintaan halus toko konsultasi keinginan'
    }
  ]
});
