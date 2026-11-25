/* data/buku/a2_14.js — Buku Bunpou Irodori A2 (初級1) · Bab 14
   Penanda & aturan: lihat kepala a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧, Japan Foundation): ❶–❻ */
FC.defineBuku('a2', {
  n: 14,
  title: '休[やす]みを取[と]ってもいいでしょうか？',
  arti: 'Bolehkah saya mengambil libur?',
  topic: '仕事[しごと]の連絡[れんらく]',
  topicArti: 'Berkomunikasi di tempat kerja',
  bisa: [
    'Mengabari tempat kerja lewat telepon kalau terlambat atau libur',
    'Meminta izin meninggalkan tempat kerja atau pulang lebih awal',
    'Menyebut alasan dengan sopan dan runtut',
    'Memahami cara mengisi formulir cuti'
  ],
  pola: [
    {
      name: 'N-で／ナA-で／イA-くて／V-て（sebab）', short: 'て（sebab）', arti: 'karena ~ (menyebut sebab secara singkat)',
      inti: 'Menyebut **sebab** secara ringkas dengan menyambung kalimat: sebab di depan, akibat atau keadaan di belakang.',
      rumus: [['N', '+', '=で、', '+', '~'], ['ナA-', '+', '=で、', '+', '~'], ['イA-', '+', '=くて、', '+', '~'], ['V-て', '+', '~']],
      rumusNote: 'イA- = kata sifat-i tanpa い · V-て = bentuk て',
      jelas: [
        'Bentuk: **N＋で**, **ナA＋で**, **イA→くて**, **V-て**. 「頭[あたま]が痛[いた]く{て}、早退[そうたい]します」 = “kepala saya sakit, jadi pulang awal”.',
        'Cocok untuk alasan terlambat, libur, atau minta maaf lewat telepon.',
        'Minta maaf atas hal yang sudah terjadi: **V-て＋すみませんでした** = “maaf karena ~”: 「昨日[きのう]は、休[やす]ん{で}すみませんでした」.'
      ],
      contoh: [
        { jp: '事故[じこ]{で}、電車[でんしゃ]が遅[おく]れています。', id: 'Kereta terlambat karena kecelakaan.' },
        { jp: '熱[ねつ]があっ{て}、今日[きょう]は休[やす]みます。', id: 'Saya demam, jadi hari ini libur.' },
        { jp: '寝坊[ねぼう]し{て}、遅刻[ちこく]しました。', id: 'Saya kesiangan, jadi terlambat.' },
        { jp: '昨日[きのう]は、休[やす]ん{で}すみませんでした。', id: 'Maaf, kemarin saya libur.' }
      ],
      awas: [
        'Bagian belakang berupa fakta atau keadaan. **Permintaan, ajakan, atau niat tidak bisa** dipakai di belakang: ×熱[ねつ]があって、休[やす]んでください.',
        'Kalau mau menekankan alasan dengan tegas, pakai ～ので／～から. Pola ini terasa ringan dan netral.'
      ],
      kw: 'karena sebab alasan terlambat libur maaf menyambung'
    },
    {
      name: 'S1。それで、S2', short: 'それで', arti: 'karena itu / makanya ~',
      inti: 'Menghubungkan **sebab** (kalimat 1) dengan **akibat atau tindakan** (kalimat 2).',
      rumus: [['S1。', '+', '=それで、', '+', 'S2。']],
      rumusNote: 'S1 = sebab · S2 = akibat atau tindakan',
      jelas: [
        '**それで** = “karena itu／makanya”. Kalimat pertama berisi sebab, kalimat kedua berisi akibat atau tindakan.',
        'Berguna untuk menjelaskan situasi pelan-pelan saat menelepon tempat kerja: **sebab dulu, lalu kesimpulan**.'
      ],
      contoh: [
        { jp: 'おなかが痛[いた]いんです。{それで}、今日[きょう]は休[やす]みたいんです。', id: 'Perut saya sakit. Makanya hari ini saya ingin libur.' },
        { jp: '電車[でんしゃ]が止[と]まりました。{それで}、三十分[さんじゅっぷん]ぐらい遅[おく]れます。', id: 'Kereta berhenti. Karena itu saya terlambat sekitar 30 menit.' },
        { jp: '昨日[きのう]、遅[おそ]くまで働[はたら]きました。{それで}、今日[きょう]は、ちょっと眠[ねむ]いです。', id: 'Kemarin saya kerja sampai larut. Makanya hari ini agak ngantuk.' }
      ],
      awas: [
        '**それで** menyambung sebab → akibat. **でも** (tetapi) justru berlawanan: 「忙[いそが]しいです。でも、行[い]きます」.'
      ],
      kw: 'karena itu makanya jadi menyambung kalimat sebab akibat'
    },
    {
      name: 'V-てもいいですか？', short: 'てもいいですか', arti: 'bolehkah saya ~?',
      inti: 'Dipakai untuk **meminta izin** melakukan sesuatu.',
      rumus: [['V-て', '+', '=もいいですか？']],
      rumusNote: 'Dengan teman: V-てもいい？ (tanpa ですか)',
      jelas: [
        '**V-て＋もいいですか** = “bolehkah saya ~?”. Jawab ya: はい、いいですよ／どうぞ.',
        'Menolak dengan halus: すみません、ちょっと…'
      ],
      contoh: [
        { jp: 'ここで、写真[しゃしん]を撮[と]っ{てもいいですか}。', id: 'Bolehkah saya mengambil foto di sini?' },
        { jp: '窓[まど]を開[あ]け{てもいいですか}。', id: 'Bolehkah saya membuka jendela?' },
        { jp: 'トイレに行[い]って来[き]{てもいいですか}。', id: 'Bolehkah saya pergi ke toilet sebentar?' },
        { jp: 'ちょっと、電話[でんわ]をし{てもいいですか}。', id: 'Bolehkah saya menelepon sebentar?' }
      ],
      awas: [
        'Menolak mentah-mentah dengan 「だめです」 terdengar kasar di tempat kerja. Pakai 「すみません、ちょっと…」 atau 「すみませんが、今[いま]は…」.'
      ],
      kw: 'bolehkah izin meminta izin boleh'
    },
    {
      name: 'V-てもいいでしょうか？', short: 'てもいいでしょうか', arti: 'apakah boleh kiranya saya ~? (lebih sopan)',
      inti: 'Versi **lebih sopan dan hati-hati** dari ～てもいいですか, cocok untuk atasan atau izin yang agak berat (libur, pulang awal).',
      rumus: [['V-て', '+', '=もいいでしょうか？']],
      rumusNote: 'でしょうか = ですか versi lembut',
      jelas: [
        '**～でしょうか** terdengar lebih halus dan tidak memaksa. Ke atasan atau pelanggan, pakai ini.',
        'Biasanya didahului alasan: 「用事[ようじ]があるんです。早退[そうたい]し{てもいいでしょうか}」.',
        'Untuk izin sepele, ～てもいいですか sudah cukup.'
      ],
      contoh: [
        { jp: '明日[あした]の午後[ごご]、早退[そうたい]し{てもいいでしょうか}。', id: 'Bolehkah besok siang saya pulang lebih awal?' },
        { jp: '来週[らいしゅう]の月曜日[げつようび]、休[やす]みを取[と]っ{てもいいでしょうか}。', id: 'Bolehkah saya mengambil libur Senin depan?' },
        { jp: '今日[きょう]は、先[さき]に帰[かえ]っ{てもいいでしょうか}。', id: 'Bolehkah hari ini saya pulang duluan?' },
        { jp: 'ここに荷物[にもつ]を置[お]い{てもいいでしょうか}。', id: 'Bolehkah saya menaruh barang di sini?' }
      ],
      awas: [
        'Meski sopan, ini tetap **minta izin**, bukan sekadar bertanya “mungkinkah”. Siapkan alasan (それで／んです) supaya izin mudah diberikan.'
      ],
      kw: 'bolehkah sopan atasan izin libur pulang awal'
    },
    {
      name: 'V-なければなりません', short: 'なければ', arti: 'harus ~',
      inti: 'Menyatakan **kewajiban**: sesuatu yang memang harus dilakukan.',
      rumus: [['V-', '+', '=なければなりません']],
      rumusNote: 'V- = bentuk ない tanpa ない · 行[い]か・食[た]べ・し・来[こ]',
      tabel: [{
        judul: 'Bentuk ない → なければなりません',
        kepala: ['Kelompok', 'Kamus', 'なければなりません'],
        baris: [
          ['Kel. 1', '行[い]く', '行[い]かなければなりません'],
          ['Kel. 1', '待[ま]つ', '待[ま]たなければなりません'],
          ['Kel. 2', '食[た]べる', '食[た]べなければなりません'],
          ['Kel. 3', 'する', 'しなければなりません'],
          ['Kel. 3', '来[く]る', '来[こ]なければなりません']
        ]
      }],
      jelas: [
        '**V-なければなりません** = “harus ~”. Bentuknya: ない-form, buang い, tambah **ければなりません**.',
        'Dengan teman sering menjadi ～なきゃ.'
      ],
      contoh: [
        { jp: '役所[やくしょ]に行[い]か{なければなりません}。', id: 'Saya harus pergi ke kantor pemerintahan.' },
        { jp: '明日[あした]までに、書類[しょるい]を出[だ]さ{なければなりません}。', id: 'Saya harus menyerahkan dokumen paling lambat besok.' },
        { jp: '毎朝[まいあさ]、六時[ろくじ]に起[お]き{なければなりません}。', id: 'Saya harus bangun jam enam setiap pagi.' },
        { jp: '今日[きょう]は、薬[くすり]を飲[の]ま{なければなりません}。', id: 'Hari ini saya harus minum obat.' }
      ],
      awas: [
        '**Bukan “tidak boleh”.** なければなりません = “harus”. Larangan itu ～てはいけません; “tidak perlu” itu ～なくてもいいです.',
        '来[く]る → 来[こ]なければなりません (baca こ, bukan き).'
      ],
      kw: 'harus wajib kewajiban keharusan'
    },
    {
      name: '～んです ①', short: 'んです①', arti: 'soalnya ~ (memberi alasan atau latar belakang)',
      inti: 'Dipakai untuk **memberi alasan atau latar belakang**, sehingga kalimat terdengar menjelaskan, bukan sekadar menyatakan.',
      rumus: [['V／イA（bentuk biasa）', '+', '=んです'], ['ナA／N', '+', '=なんです']],
      rumusNote: 'Bentuk biasa = kamus／ない／た · ナA／N memakai な',
      jelas: [
        '**～んです** = “soalnya ~”. Sering dipakai saat meminta izin atau menolak: 「用事[ようじ]がある{んです}」.',
        'Bentuk: bentuk biasa + んです; ナA／N + **なんです**.'
      ],
      contoh: [
        { jp: '明日[あした]、東京[とうきょう]から友[とも]だちが来[く]る{んです}。', id: 'Soalnya besok teman saya datang dari Tokyo.' },
        { jp: '今日[きょう]は、ちょっと用事[ようじ]がある{んです}。', id: 'Soalnya hari ini saya ada urusan.' },
        { jp: 'ちょっと、病院[びょういん]に行[い]かなければならない{んです}。', id: 'Soalnya saya harus pergi ke rumah sakit sebentar.' },
        { jp: '実[じつ]は、今朝[けさ]から頭[あたま]が痛[いた]い{んです}。', id: 'Sebenarnya sejak pagi tadi kepala saya sakit.' }
      ],
      awas: [
        'ナA／N tidak pakai だ: ×暇[ひま]だんです → 暇[ひま]なんです.',
        'Bab 15 punya ～んです ② (menjelaskan gejala ke dokter): bentuknya sama, situasinya beda.'
      ],
      kw: 'soalnya alasan penjelasan izin menolak latar belakang'
    }
  ]
});
