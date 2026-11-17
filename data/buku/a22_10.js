/* =====================================================================
   data/buku/a22_10.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 10
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧): ➊ 【疑問詞】V-ばいいですか ➋ V-てはいけません／だめです ➌ V-なくちゃ
   ➍ V-るように／V-ないように ➎ 受身② ➏ S（普通形）の？ ➐ V-なきゃ.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 10,
  title: 'どんな服[ふく]を着[き]て行[い]けばいいですか？',
  arti: 'Sebaiknya pakai baju seperti apa ya?',
  topic: '年中行事[ねんじゅうぎょうじ]とマナー',
  topicArti: 'Perayaan tahunan dan tata krama',
  bisa: [
    'Menanyakan tata krama dan kebiasaan: “sebaiknya bagaimana?”, “bawa apa?”',
    'Bilang “tidak boleh” dan “harus” dalam aturan maupun obrolan akrab',
    'Menjelaskan tujuan sebuah aturan: “supaya …”, “agar tidak …”',
    'Menceritakan kejadian ketika kamu ditegur atau dimarahi orang (pasif)',
    'Bertanya dengan akrab memakai 「～の？」'
  ],
  pola: [
    {
      name: '【疑問詞[ぎもんし]】V-ばいいですか',
      short: 'ばいいですか',
      arti: 'sebaiknya (apa / bagaimana) ~? (minta saran)',
      inti: 'Pola untuk **meminta saran atau petunjuk**: “sebaiknya bagaimana / bawa apa?”. Mirip V-たらいいですか di Bab 5.',
      rumus: [['Kata tanya', '+', 'V-ば', '+', '=いいですか']],
      rumusNote: 'V-ば = bentuk “kalau” (bentuk ば) · kata tanya: 何[なに]を, どうやって, いつ, どこで …',
      tabel: [{
        judul: 'Cara membuat bentuk ば',
        kepala: ['Kelompok', 'Kamus', 'V-ば'],
        baris: [
          ['Kel. 1', '行[い]く', '行[い]けば'],
          ['Kel. 1', '買[か]う', '買[か]えば'],
          ['Kel. 1', '書[か]く', '書[か]けば'],
          ['Kel. 2', '着[き]る', '着[き]れば'],
          ['Kel. 2', '食[た]べる', '食[た]べれば'],
          ['Kel. 3', 'する', 'すれば'],
          ['Kel. 3', '来[く]る', '来[く]れば']
        ]
      }],
      jelas: [
        '**V-ばいいですか** = “sebaiknya … bagaimana?”. Dipakai untuk **bertanya cara atau pilihan** kepada orang yang lebih tahu.',
        'Rumusnya: kata tanya + **V-ば** + いいですか: 「何[なに]を持[も]って行[い]け{ばいいですか}」.',
        'Bentuk ば: **Kel. 1** u → **え**＋ば (行[い]く → 行[い]け**ば**). **Kel. 2** る → **れ**ば (着[き]る → 着[き]れ**ば**). する → **すれ**ば, 来[く]る → **来[く]れ**ば.',
        'Artinya hampir sama dengan V-たらいいですか (Bab 5). Keduanya bisa dipakai untuk meminta saran.',
        'Jawabannya berupa saran: 「黒[くろ]い服[ふく]を着[き]れ{ばいいです}よ」 = “pakai baju hitam saja”.'
      ],
      contoh: [
        { jp: '結婚式[けっこんしき]には、どんな服[ふく]を着[き]れ{ばいいですか}。', id: 'Untuk pesta pernikahan, sebaiknya pakai baju seperti apa?' },
        { jp: 'お祝[いわ]いのお金[かね]は、どうやって渡[わた]せ{ばいいですか}。', id: 'Uang hadiah sebaiknya diserahkan dengan cara bagaimana?' },
        { jp: '日本[にほん]の家[いえ]に入[はい]るとき、くつはどこに置[お]け{ばいいですか}。', id: 'Waktu masuk rumah di Jepang, sepatu sebaiknya diletakkan di mana?' },
        { jp: 'このごみは、いつ出[だ]せ{ばいいですか}。', id: 'Sampah ini sebaiknya dikeluarkan kapan?' },
        { jp: 'A：お見舞[みま]いには、何[なに]を持[も]って行[い]け{ばいいですか}。\nB：果物[くだもの]がいいですよ。', id: 'A: Untuk menjenguk orang sakit, sebaiknya bawa apa?\nB: Buah-buahan saja bagus.' },
        { jp: 'わからないことは、だれに聞[き]け{ばいいですか}。', id: 'Kalau ada yang tidak dimengerti, sebaiknya bertanya ke siapa?' }
      ],
      awas: [
        'Bentuk ば bukan bentuk て／た: ×行[い]ってばいいですか → ○行[い]けばいいですか.',
        'Untuk **meminta izin** (“boleh …?”) pakai V-てもいいですか, bukan V-ばいいですか.'
      ],
      kw: 'sebaiknya bagaimana minta saran bentuk ba petunjuk tata krama'
    },
    {
      name: 'V-てはいけません／だめです／V-ちゃいけません／だめです',
      short: 'てはいけない',
      arti: 'tidak boleh ~ (larangan)',
      inti: 'Pakai ini untuk bilang **larangan**: “tidak boleh …”. Versi **ちゃ** dipakai dalam obrolan akrab.',
      rumus: [['V-て', '+', '=はいけません／だめです'], ['V-ちゃ', '+', '=いけません／だめです']],
      rumusNote: 'Akrab: て＋は → ちゃ · で＋は → じゃ',
      tabel: [{
        judul: 'Bentuk baku dan akrab',
        kepala: ['Kamus', 'V-ては (baku)', 'V-ちゃ／じゃ (akrab)'],
        baris: [
          ['話[はな]す', '話[はな]しては', '話[はな]しちゃ'],
          ['入[はい]る', '入[はい]っては', '入[はい]っちゃ'],
          ['飲[の]む', '飲[の]んでは', '飲[の]んじゃ'],
          ['食[た]べる', '食[た]べては', '食[た]べちゃ'],
          ['撮[と]る', '撮[と]っては', '撮[と]っちゃ']
        ]
      }],
      jelas: [
        '**V-てはいけません** = “tidak boleh …” (larangan tegas, aturan, rambu). **V-てはだめです** terdengar lebih lisan.',
        '**Akrab**: て＋は → **ちゃ**, で＋は → **じゃ**: 食[た]べ{ちゃ}いけない／だめ, 飲[の]ん{じゃ}だめ.',
        'Bentuk ちゃ sudah muncul di Bab 4 (V-ちゃだめです). Di sini kamu belajar bentuk lengkapnya **V-てはいけません**, yang dipakai di rambu dan aturan.',
        'Sering muncul untuk **aturan di tempat umum**: 「図書館[としょかん]で、大[おお]きい声[こえ]で話[はな]し{てはいけません}」 = “di perpustakaan tidak boleh bicara keras”.'
      ],
      contoh: [
        { jp: '電車[でんしゃ]の中[なか]で、大[おお]きい声[こえ]で話[はな]し{てはいけません}。', id: 'Di dalam kereta tidak boleh bicara dengan suara keras.' },
        { jp: 'ここに、車[くるま]を止[と]め{てはいけません}。', id: 'Dilarang memarkir mobil di sini.' },
        { jp: '結婚式[けっこんしき]で、白[しろ]い服[ふく]を着[き]{てはいけません}よ。', id: 'Di pesta pernikahan, tidak boleh memakai baju putih lho.' },
        { jp: '授業中[じゅぎょうちゅう]に、スマホを使[つか]っ{ちゃだめ}だよ。', id: 'Waktu pelajaran, tidak boleh pakai HP lho.' },
        { jp: 'A：食[た]べ{ちゃだめ}だよ。まだ熱[あつ]いから。\nB：はーい。', id: 'A: Jangan dimakan dulu. Masih panas.\nB: Iya.' },
        { jp: '夜[よる]は、大[おお]きい音[おと]を出[だ]し{てはだめです}。', id: 'Malam hari tidak boleh membuat suara keras.' }
      ],
      awas: [
        'Jangan tertukar dengan **V-なくてはいけません** (“harus”). V-ては = larangan; V-なくては = kewajiban.',
        'Bentuk akrab: て → ちゃ, **で → じゃ**: ×飲[の]んちゃだめ → ○飲[の]んじゃだめ.',
        'Ke atasan atau orang yang belum akrab, larangan langsung terdengar keras. Pakai V-ないでください atau jelaskan alasannya dulu.'
      ],
      kw: 'tidak boleh larangan dilarang aturan ちゃ じゃ'
    },
    {
      name: 'V-なくちゃ',
      short: 'なくちゃ',
      arti: 'harus ~ (akrab, lebih singkat)',
      inti: 'Versi **lebih singkat** dari なくちゃならない: bagian ならない／いけない **dihilangkan**. Sering dipakai untuk bicara pada diri sendiri.',
      rumus: [['V-ない', '→', 'V-な', '+', '=くちゃ']],
      rumusNote: 'ならない／いけない tidak diucapkan karena maknanya sudah jelas',
      tabel: [{
        judul: 'Dari versi panjang ke versi pendek',
        kepala: ['Baku', 'Akrab', 'Lebih singkat'],
        baris: [
          ['行[い]かなければなりません', '行[い]かなくちゃならない', '行[い]かなくちゃ'],
          ['寝[ね]なければなりません', '寝[ね]なくちゃならない', '寝[ね]なくちゃ'],
          ['急[いそ]がなければなりません', '急[いそ]がなくちゃならない', '急[いそ]がなくちゃ']
        ]
      }],
      jelas: [
        '**V-なくちゃ** = “harus …!” — bentuk akrab yang paling pendek. ならない／いけない **tidak diucapkan** karena maknanya sudah jelas.',
        'Sering dipakai untuk **bicara pada diri sendiri** (“aduh, harus …”) atau mengingatkan teman: 「もう行[い]か{なくちゃ}」 = “aku harus pergi sekarang”.',
        'Ada versi yang lebih santai lagi: **V-なきゃ** (pola terakhir di bab ini). Artinya sama.',
        'Biasanya disambung よ／ね supaya terdengar lembut: 「宿題[しゅくだい]し{なくちゃ}ね」.'
      ],
      contoh: [
        { jp: 'もう12時[じゅうにじ]だ。早[はや]く寝[ね]{なくちゃ}。', id: 'Sudah jam dua belas. Aku harus cepat tidur.' },
        { jp: 'ごみは、自分[じぶん]で持[も]って帰[かえ]ら{なくちゃ}。', id: 'Sampah harus dibawa pulang sendiri.' },
        { jp: 'あっ、バスが来[き]た。急[いそ]が{なくちゃ}。', id: 'Ah, busnya datang. Harus buru-buru.' },
        { jp: '友[とも]だちが来[く]るから、部屋[へや]を片付[かたづ]け{なくちゃ}ね。', id: 'Teman mau datang, jadi harus bereskan kamar ya.' },
        { jp: 'A：もうこんな時間[じかん]だね。\nB：うん、そろそろ帰[かえ]ら{なくちゃ}。', id: 'A: Sudah selarut ini ya.\nB: Iya, sudah waktunya aku pulang.' }
      ],
      awas: [
        'Ragam akrab: untuk teman, keluarga, atau diri sendiri. Ke atasan atau pelanggan pakai ～なければなりません／～なくてはいけません.',
        'なくちゃ = “harus”. “Tidak perlu” = ～なくてもいいです. Jangan tertukar.'
      ],
      kw: 'harus akrab singkat kasual なくちゃ'
    },
    {
      name: 'V-るように、～／V-ないように、～',
      short: 'ように',
      arti: 'supaya ~ / agar tidak ~',
      inti: 'Pakai **ように** untuk menyatakan **tujuan**: “supaya (bisa) …”, “agar tidak …”.',
      rumus: [['V-る／V-ない', '+', '=ように', '、', 'Tindakan']],
      rumusNote: 'Bagian depan = tujuan · bagian belakang = yang kamu lakukan untuk mencapainya',
      jelas: [
        '**V-るように、～** = “supaya (bisa) …, (aku) …”. Bagian **depan** adalah tujuan, bagian **belakang** adalah tindakan untuk mencapainya.',
        '**V-ないように、～** = “supaya tidak …, (aku) …”: 「かぜを引[ひ]かない{ように}、あたたかくします」.',
        'Di bagian depan sering muncul **bentuk bisa** (見[み]える, 座[すわ]れる, 聞[き]こえる) atau hal yang **tidak langsung kamu kendalikan**: 「みんなが座[すわ]れる{ように}」.',
        'Subjek bagian depan dan belakang **boleh berbeda**: 「子[こ]どもが寝[ね]られる{ように}、私[わたし]は静[しず]かにします」.'
      ],
      contoh: [
        { jp: '外国[がいこく]の人[ひと]にも、わかる{ように}、ゆっくり話[はな]します。', id: 'Supaya orang asing pun mengerti, saya bicara pelan-pelan.' },
        { jp: 'かぜを引[ひ]かない{ように}、あたたかい服[ふく]を着[き]ます。', id: 'Supaya tidak masuk angin, saya memakai baju hangat.' },
        { jp: '赤[あか]ちゃんが起[お]きない{ように}、静[しず]かに歩[ある]きます。', id: 'Supaya bayi tidak terbangun, saya berjalan pelan-pelan.' },
        { jp: '忘[わす]れ物[もの]をしない{ように}、かばんの中[なか]をもう一度[いちど]見[み]ます。', id: 'Supaya tidak ada barang yang tertinggal, saya mengecek isi tas sekali lagi.' },
        { jp: 'A：どうして毎日[まいにち]、日本語[にほんご]で日記[にっき]を書[か]いているんですか。\nB：日本語[にほんご]が話[はな]せる{ように}、練習[れんしゅう]しているんです。', id: 'A: Kenapa kamu menulis diari bahasa Jepang setiap hari?\nB: Supaya bisa bicara bahasa Jepang, saya berlatih.' },
        { jp: 'みんなが座[すわ]れる{ように}、いすを並[なら]べました。', id: 'Supaya semua orang bisa duduk, saya menata kursi berjajar.' }
      ],
      awas: [
        'Jangan tertukar dengan **ために** (tujuan dari tindakan yang disengaja; V-るために ada di Bab 18). Dengan **bentuk bisa**, **ない**, atau hal yang terjadi sendiri, pakai ように.',
        'Di depan ように pakai **bentuk biasa** (わかる, 忘[わす]れない), bukan bentuk sopan ます.',
        'ように juga muncul di pola lain (V-ないようにしてください di Bab 16, V-るようになりました di Bab 17). Itu pola yang berbeda.'
      ],
      kw: 'supaya agar tujuan agar tidak ように'
    },
    {
      name: 'V-（ら）れます ＜受身[うけみ]②＞',
      short: 'pasif ②',
      arti: 'di-V oleh ~ (aku yang menerima tindakan)',
      inti: 'Pasif untuk bilang bahwa **kamu** menerima tindakan dari orang lain: “aku **ditegur / dimarahi / dipuji / diajak** oleh …”.',
      rumus: [['N1', '+', '=は', '+', 'N2', '+', '=に', '+', 'V-（ら）れます']],
      rumusNote: 'N1 = yang menerima tindakan · N2 = pelaku (ditandai に) · kutipan: 「～」と言[い]われました',
      tabel: [{
        judul: 'Bentuk pasif (ulangan Bab 7)',
        kepala: ['Kelompok', 'Kamus', 'Pasif'],
        baris: [
          ['Kel. 1', '怒[おこ]る', '怒[おこ]られます'],
          ['Kel. 1', '呼[よ]ぶ', '呼[よ]ばれます'],
          ['Kel. 1', '言[い]う', '言[い]われます'],
          ['Kel. 2', 'ほめる', 'ほめられます'],
          ['Kel. 3', '注意[ちゅうい]する', '注意[ちゅうい]されます']
        ]
      }],
      jelas: [
        'Di Bab 7, pasif dipakai untuk **pengumuman** (acara menjadi subjek). Di sini pasif dipakai untuk **pengalaman pribadi**: kamu yang menerima tindakan orang lain.',
        'Susunannya: 「(私[わたし]は)店長[てんちょう]{に}注意[ちゅうい]{されました}」 = “(saya) ditegur oleh manajer”. **Pelaku** ditandai **に**.',
        'Isi kata-kata orang bisa dikutip dengan **と**: 「早[はや]く来[き]て」と{言[い]われました} = “saya disuruh datang lebih awal”.',
        'Sering bernuansa **kurang enak** (ditegur, dimarahi), tapi bisa juga positif: ほめられました (dipuji), 誘[さそ]われました (diajak).',
        'Cara membentuk sama dengan Bab 7: Kel. 1 u → **あ**＋れます (う → わ), Kel. 2 **られ**ます, Kel. 3 **され**ます.'
      ],
      contoh: [
        { jp: '私[わたし]は、先生[せんせい]に{ほめられました}。', id: 'Saya dipuji oleh guru.' },
        { jp: '遅刻[ちこく]して、上司[じょうし]に{怒[おこ]られました}。', id: 'Saya terlambat dan dimarahi atasan.' },
        { jp: '店[みせ]の人[ひと]に、「ここで写真[しゃしん]を撮[と]らないでください」と{言[い]われました}。', id: 'Saya dibilangi pegawai toko: “Tolong jangan memotret di sini”.' },
        { jp: 'きのう、友[とも]だちにパーティーに{誘[さそ]われました}。', id: 'Kemarin saya diajak teman ke pesta.' },
        { jp: '電車[でんしゃ]の中[なか]で、知[し]らない人[ひと]に{話[はな]しかけられました}。', id: 'Di dalam kereta, saya diajak bicara oleh orang yang tidak dikenal.' },
        { jp: 'A：どうしたんですか。\nB：駅[えき]で、知[し]らない人[ひと]に{呼[よ]ばれました}が、だれかわかりませんでした。', id: 'A: Ada apa?\nB: Di stasiun saya dipanggil orang yang tidak dikenal, tapi saya tidak tahu siapa.' }
      ],
      awas: [
        'Pelaku ditandai **に**: ×店長[てんちょう]が注意[ちゅうい]されました／×店長[てんちょう]を注意[ちゅうい]されました → ○店長[てんちょう]に注意[ちゅうい]されました.',
        'Bentuk kelompok 2 sama dengan “bisa” (ほめられる). Kalau ada **pelaku dengan に** dan tindakan yang kamu terima, itu pasif.',
        'Subjek “saya” (私[わたし]は) boleh dihilangkan kalau sudah jelas.'
      ],
      kw: 'dimarahi ditegur dipuji diajak dipanggil pasif oleh'
    },
    {
      name: 'S（普通形[ふつうけい]）の？',
      short: 'の？',
      arti: '~ ya? (pertanyaan akrab)',
      inti: 'Pertanyaan **akrab** (ke teman atau keluarga) yang artinya sama dengan ～んですか: cukup tambah の dan naikkan nada.',
      rumus: [['Bentuk biasa', '+', '=の', '？'], ['N／ナA', '+', '=なの', '？']],
      rumusNote: 'Nada naik di akhir · jawab: うん (ya) ／ ううん (tidak)',
      tabel: [{
        judul: 'Dari sopan ke akrab',
        kepala: ['Sopan', 'Akrab'],
        baris: [
          ['行[い]くんですか', '行[い]くの？'],
          ['食[た]べたんですか', '食[た]べたの？'],
          ['高[たか]いんですか', '高[たか]いの？'],
          ['休[やす]みなんですか', '休[やす]みなの？'],
          ['元気[げんき]なんですか', '元気[げんき]なの？']
        ]
      }],
      jelas: [
        '**～の？** = ～んですか？ versi akrab. Dipakai ke teman, keluarga, dan anak-anak, bukan ke atasan.',
        'Cara membuat: **bentuk biasa** + **の**, dengan nada **naik**. N／ナA → **なの？** (bukan ×だの).',
        'Dipakai untuk menanyakan alasan atau memastikan hal yang kamu lihat: 「どうして泣[な]いている{の}？」 = “kenapa kamu menangis?”.',
        'Jawaban akrab: うん／ううん, lalu dilanjutkan **～んだ** (menjelaskan; bentuk akrab dari ～んです): 「うん、おなかがすいてる{んだ}」.'
      ],
      contoh: [
        { jp: 'あした、学校[がっこう]に行[い]く{の}？', id: 'Besok kamu pergi ke sekolah?' },
        { jp: '宿題[しゅくだい]、もうした{の}？', id: 'PR-nya sudah dikerjakan?' },
        { jp: 'どうして泣[な]いている{の}？', id: 'Kenapa kamu menangis?' },
        { jp: '今日[きょう]は、お休[やす]み{なの}？', id: 'Hari ini kamu libur?' },
        { jp: 'A：この料理[りょうり]、辛[から]い{の}？\nB：うん、ちょっと辛[から]いよ。', id: 'A: Masakan ini pedas?\nB: Iya, agak pedas.' },
        { jp: '日曜日[にちようび]も、仕事[しごと]{なの}？', id: 'Hari Minggu pun kamu kerja?' }
      ],
      awas: [
        'N／ナA + **なの**, bukan だの: ×休[やす]みだの？ → ○休[やす]みなの？',
        'の？ itu akrab. Ke orang yang baru dikenal atau atasan, pakai んですか.',
        'Ucapkan dengan nada naik supaya terdengar sebagai pertanyaan.'
      ],
      kw: 'pertanyaan akrab の kasual teman memangnya'
    },
    {
      name: 'V-なきゃ',
      short: 'なきゃ',
      arti: 'harus ~ (sangat akrab)',
      inti: 'Bentuk **paling singkat** untuk “harus …”, berasal dari V-なければ. Dipakai untuk bicara pada diri sendiri atau ke teman akrab.',
      rumus: [['V-ない', '→', 'V-な', '+', '=きゃ']],
      rumusNote: 'なければ → なきゃ · ならない／いけない boleh dihilangkan',
      tabel: [{
        judul: 'Tiga tingkat “harus”: dari sopan ke santai',
        kepala: ['Sopan', 'Akrab', 'Paling santai'],
        baris: [
          ['払[はら]わなければなりません', '払[はら]わなくちゃ', '払[はら]わなきゃ'],
          ['食[た]べなければなりません', '食[た]べなくちゃ', '食[た]べなきゃ'],
          ['しなければなりません', 'しなくちゃ', 'しなきゃ']
        ]
      }],
      jelas: [
        '**V-なきゃ** = “harus …”, mirip なくちゃ tapi **lebih santai**. Asalnya V-なければ yang dipendekkan: なければ → **なきゃ**.',
        'Bagian ならない／いけない biasanya **tidak diucapkan**: 「もう行[い]か{なきゃ}」.',
        'Dipakai untuk bicara pada diri sendiri atau ke teman: 「そろそろ帰[かえ]ら{なきゃ}」.',
        'Artinya **sama** dengan V-なくちゃ (pola ke-3 di bab ini); pilih yang terasa enak. Dalam tulisan atau situasi formal, pakai なければなりません.'
      ],
      contoh: [
        { jp: 'もうすぐ電車[でんしゃ]が来[く]る。走[はし]ら{なきゃ}！', id: 'Sebentar lagi keretanya datang. Harus lari!' },
        { jp: '明日[あした]は試験[しけん]だ。勉強[べんきょう]し{なきゃ}。', id: 'Besok ujian. Harus belajar.' },
        { jp: '実家[じっか]に電話[でんわ]し{なきゃ}。', id: 'Aku harus menelepon rumah orang tua.' },
        { jp: 'あ、傘[かさ]を忘[わす]れた！取[と]りに帰[かえ]ら{なきゃ}。', id: 'Ah, payungku ketinggalan! Harus pulang mengambilnya.' },
        { jp: 'A：もうこんな時間[じかん]！\nB：ほんとだ。行[い]か{なきゃ}。', id: 'A: Sudah selarut ini!\nB: Benar juga. Harus pergi.' },
        { jp: 'ごみの日[ひ]だ。ごみを出[だ]さ{なきゃ}。', id: 'Hari buang sampah. Harus keluarkan sampah.' }
      ],
      awas: [
        'Sangat santai: hanya untuk teman, keluarga, atau bicara sendiri. Jangan dipakai ke atasan, guru, atau pelanggan.',
        'Cara membuat: **V-ない → buang い → なきゃ**: 食[た]べない → 食[た]べなきゃ. Jangan ×食[た]べるなきゃ.',
        'なきゃ artinya “harus”, bukan “tidak boleh”. “Tidak boleh” = V-ちゃだめ.'
      ],
      kw: 'harus santai singkat なきゃ なければ'
    }
  ]
});
