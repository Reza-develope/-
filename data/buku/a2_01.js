/* =====================================================================
   data/buku/a2_01.js — Buku Bunpou Irodori A2 (初級1) · Bab 1
   Penanda teks: 漢字[よみ] furigana · {sorot} · **tebal** · 「kutipan Jepang」. Rumus: token berawalan "=" = bagian tetap (merah).
   Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran); daftar pola mengikuti daftar isi resmi Irodori 初級1 (文法ノート).
   ===================================================================== */
FC.defineBuku('a2', {
  n: 1,
  title: 'レストランで働[はたら]いています',
  arti: 'Saya bekerja di restoran',
  topic: '今[いま]の私[わたし]',
  topicArti: 'Aku yang sekarang',
  bisa: [
    'Menyapa orang yang lama tidak kamu temui dan menanyakan kabarnya',
    'Menceritakan kabarmu belakangan ini, misalnya sudah berapa lama tinggal di Jepang',
    'Menceritakan pekerjaan atau kegiatanmu di Jepang dengan kalimat sederhana',
    'Memilih gaya bicara sopan atau akrab sesuai lawan bicara'
  ],
  pola: [
    {
      name: '丁寧体[ていねいたい]・普通体[ふつうたい]',
      short: '丁寧体[ていねいたい]・普通体[ふつうたい]',
      arti: 'gaya sopan (です・ます) dan gaya biasa / akrab',
      inti: 'Satu maksud bisa diucapkan dengan **gaya sopan** atau **gaya biasa (akrab)**. Pilih sesuai kamu sedang bicara dengan siapa.',
      rumus: [['=丁寧体[ていねいたい]', '→', 'です・ます'], ['=普通体[ふつうたい]', '→', 'だ・V-る・V-た・V-ない']],
      rumusNote: '丁寧体[ていねいたい] = ke orang baru kenal, atasan, pelanggan · 普通体[ふつうたい] = ke teman, keluarga, orang yang sudah akrab',
      tabel: [{
        judul: 'Mengubah gaya sopan jadi gaya biasa',
        kepala: ['Jenis', 'Sopan', 'Biasa'],
        baris: [
          ['Kata kerja', '食[た]べます', '食[た]べる'],
          ['Kata kerja (negatif)', '食[た]べません', '食[た]べない'],
          ['Sifat-い', '寒[さむ]いです', '寒[さむ]い'],
          ['Sifat-な', '元気[げんき]です', '元気[げんき]だ'],
          ['Kata benda', '雨[あめ]です', '雨[あめ]だ'],
          ['Salam', 'お久[ひさ]しぶりです', '久[ひさ]しぶり']
        ]
      }],
      jelas: [
        'Gaya **sopan** (です・ます) dipakai ke orang yang baru kenal, atasan, pelanggan, atau orang yang lebih tua. Kalau ragu, pilih gaya ini.',
        'Gaya **biasa** (tanpa です・ます) dipakai ke teman, keluarga, atau orang yang sudah akrab: 「{久[ひさ]しぶり}。{元気[げんき]}？」.',
        'Di kalimat tanya gaya biasa, か dibuang dan nada suara dinaikkan: 「お元気[げんき]ですか？」 → 「元気[げんき]？」. Salam ikut jadi pendek: 「おはようございます」 → 「おはよう」, 「ありがとうございます」 → 「ありがとう」.',
        'Di bab-bab berikutnya kamu akan sering bertemu bentuk biasa di dalam kalimat (V-る, V-た, V-ない), jadi pastikan perubahannya sudah akrab.'
      ],
      contoh: [
        { jp: '先輩[せんぱい]に：{お久[ひさ]しぶりです}。お元気[げんき]ですか？', id: 'Ke senior: Sudah lama tidak bertemu. Apa kabar?' },
        { jp: '友[とも]だちに：{久[ひさ]しぶり}。{元気[げんき]}？', id: 'Ke teman: Lama nggak ketemu. Gimana kabarmu?' },
        { jp: '先生[せんせい]に：もうご飯[はん]を{食[た]べましたか}。\n友[とも]だちに：もうご飯[はん]を{食[た]べた}？', id: 'Ke guru: Apakah Anda sudah makan?\nKe teman: Sudah makan?' },
        { jp: '上司[じょうし]に：あしたは{来[き]ません}。\n友[とも]だちに：あしたは{来[こ]ない}。', id: 'Ke atasan: Besok saya tidak datang.\nKe teman: Besok aku nggak datang.' },
        { jp: '友[とも]だちに：この店[みせ]、安[やす]くて{おいしい}ね。\n先輩[せんぱい]に：この店[みせ]、安[やす]くて{おいしいです}ね。', id: 'Ke teman: Tempat ini murah dan enak ya.\nKe senior: Tempat ini murah dan enak ya.' }
      ],
      awas: [
        'Ke orang yang belum akrab, jangan langsung memakai gaya biasa. Bisa terdengar kasar atau terlalu sok akrab. Kalau ragu, mulai dari gaya sopan.',
        'Pertanyaan gaya biasa tidak memakai か: ○元気[げんき]？ ×元気[げんき]か？ (か di akhir kalimat biasa terdengar kasar).'
      ],
      kw: 'sopan akrab biasa formal teman atasan gaya bicara です ます bentuk biasa'
    },
    {
      name: '【期間[きかん]】になります',
      short: '期間[きかん]になります',
      arti: 'sudah (selama) ~ sejak ~',
      inti: 'Pakai ini untuk bilang **sudah berapa lama** kamu melakukan sesuatu atau berada di suatu keadaan sampai sekarang.',
      rumus: [['V-て', '+', '【期間[きかん]】', '+', '=になります']],
      rumusNote: '【期間[きかん]】 = lamanya waktu (1年[いちねん], 半年[はんとし], 2週間[にしゅうかん]) · V-て = kejadian yang jadi titik awal',
      tabel: [{
        judul: 'Lamanya waktu yang sering dipakai',
        kepala: ['Satuan', 'Contoh', 'Arti'],
        baris: [
          ['～週間[しゅうかん]', '2週間[にしゅうかん]', '2 minggu'],
          ['～か月[げつ]', '三[さん]か月[げつ]', '3 bulan'],
          ['半年[はんとし]', '半年[はんとし]', 'setengah tahun'],
          ['～年[ねん]', '1年[いちねん]', '1 tahun']
        ]
      }],
      jelas: [
        'Bagian di depan adalah **V-て** yang menunjukkan **titik awal**: 「日本[にほん]に来[き]て」 = “sejak datang ke Jepang”, 「ここで働[はたら]いて」 = “sejak bekerja di sini”.',
        'Lalu sebut lamanya waktu dan tutup dengan 「{になります}」: 「来[き]て1年[いちねん]{になります}」 = “sudah 1 tahun sejak datang”.',
        'Cocok untuk menjawab 「日本[にほん]に来[き]てどのぐらいですか？」 (Sudah berapa lama sejak datang ke Jepang?).',
        'Boleh ditambah ちょうど (tepat) atau もう (sudah): 「ちょうど1年[いちねん]になります」.'
      ],
      contoh: [
        { jp: '日本[にほん]に来[き]て、{1年[いちねん]になります}。', id: 'Sudah 1 tahun sejak saya datang ke Jepang.' },
        { jp: 'このレストランで働[はたら]いて、{半年[はんとし]になります}。', id: 'Sudah setengah tahun saya bekerja di restoran ini.' },
        { jp: '日本語[にほんご]を勉強[べんきょう]して、{三[さん]か月[げつ]になります}。', id: 'Sudah 3 bulan saya belajar bahasa Jepang.' },
        { jp: '結婚[けっこん]して、ちょうど{10年[じゅうねん]になります}。', id: 'Sudah tepat 10 tahun sejak kami menikah.' },
        { jp: 'A：日本[にほん]に来[き]て、どのぐらいですか。\nB：{2週間[にしゅうかん]になります}。', id: 'A: Sudah berapa lama sejak kamu datang ke Jepang?\nB: Sudah 2 minggu.' }
      ],
      awas: [
        'Bagian depan harus **V-て**, bukan bentuk ます: ×日本[にほん]に来[き]ました1年[いちねん]になります → ○日本[にほん]に来[き]て1年[いちねん]になります.',
        'Pola ini menyatakan keadaan yang **masih berlanjut** sampai sekarang. Untuk menyebut **kapan** kejadiannya, pakai pola berikutnya: 「去年[きょねん]の9月[くがつ]に来[き]ました」.'
      ],
      kw: 'sudah berapa lama sejak durasi tahun bulan minggu ちょうど'
    },
    {
      name: '【時点[じてん]】（に）来[き]ました',
      short: '（に）来[き]ました',
      arti: 'datang pada (waktu) ~ — kata waktu dengan atau tanpa に',
      inti: 'Untuk bilang **kapan** sesuatu terjadi, taruh kata waktu di depan kata kerja. Waktu yang **spesifik** (bulan, tanggal, jam) diikuti **に**.',
      rumus: [['【時点[じてん]】', '+', '=（に）', '+', 'V-ました']],
      rumusNote: '【時点[じてん]】 = kata penunjuk waktu: 9月[くがつ], 3時[さんじ], 昨日[きのう], 先週[せんしゅう] dan sebagainya',
      tabel: [{
        judul: 'Perlu に atau tidak?',
        kepala: ['Kata waktu', 'Contoh', 'に'],
        baris: [
          ['Bulan / tanggal / jam', '9月[くがつ]・5日[いつか]・3時[さんじ]', 'pakai に'],
          ['Hari dalam seminggu', '月曜日[げつようび]', 'pakai に'],
          ['～前[まえ]', '3年前[さんねんまえ]', 'pakai に'],
          ['Waktu relatif', '昨日[きのう]・先週[せんしゅう]・今年[ことし]', 'tanpa に']
        ]
      }],
      jelas: [
        'Pola dasar: **kata waktu + (に) + kata kerja**. 「去年[きょねん]の9月[くがつ]{に}来[き]ました」 = “Saya datang bulan September tahun lalu”.',
        'Waktu yang **spesifik** (nama bulan, tanggal, jam, hari) diikuti **に**. Waktu yang bergantung pada “sekarang” (kemarin, minggu lalu, tahun lalu) biasanya **tanpa に**.',
        'Kalau digabung, に menempel di belakang bagian yang spesifik: 「去年[きょねん]の9月[くがつ]{に}」 (去年[きょねん] tanpa に, 9月[くがつ] pakai に).',
        'Pertanyaannya: 「いつ日本[にほん]に来[き]ましたか？」 (Kapan datang ke Jepang?). Pola ini juga cocok dengan kata kerja lain, misalnya 始[はじ]めました (mulai), 着[つ]きました (tiba), 結婚[けっこん]しました (menikah).'
      ],
      contoh: [
        { jp: '去年[きょねん]の9月[くがつ]{に}日本[にほん]に来[き]ました。', id: 'Saya datang ke Jepang bulan September tahun lalu.' },
        { jp: '{先週[せんしゅう]}、このお店[みせ]で働[はたら]き始[はじ]めました。', id: 'Minggu lalu saya mulai bekerja di toko ini.' },
        { jp: '3年前[さんねんまえ]{に}、国[くに]で結婚[けっこん]しました。', id: 'Tiga tahun lalu saya menikah di negara asal.' },
        { jp: '{今朝[けさ]}、{7時[しちじ]に}起[お]きました。', id: 'Tadi pagi saya bangun jam 7.' },
        { jp: 'A：いつ日本[にほん]に来[き]ましたか。\nB：去年[きょねん]の{12月[じゅうにがつ]に}来[き]ました。', id: 'A: Kapan kamu datang ke Jepang?\nB: Saya datang bulan Desember tahun lalu.' }
      ],
      awas: [
        'Jangan menambahkan に pada kata waktu yang relatif: ×昨日[きのう]に来[き]ました → ○昨日[きのう]来[き]ました.',
        'Bedakan: 「去年[きょねん]の9月[くがつ]に来[き]ました」 = **kapan** datang. 「来[き]て1年[いちねん]になります」 = **sudah berapa lama** sampai sekarang.'
      ],
      kw: 'kapan waktu に tahun lalu bulan tanggal jam datang'
    },
    {
      name: 'V-ています ①',
      short: 'ています①',
      arti: 'sedang menjalani ~ (pekerjaan, sekolah)',
      inti: 'Pakai V-ています untuk bilang bahwa kamu **sedang menjalani** sesuatu saat ini, seperti pekerjaan atau sekolah.',
      rumus: [['V-て', '+', '=います'], ['V-て', '+', '=いません']],
      rumusNote: 'Tanya: 何[なに]をしていますか？ (Sedang menjalani apa? Kerja apa?)',
      tabel: [
        {
          judul: 'Kata kerja yang sering dipakai',
          kepala: ['Kata kerja', 'V-ています', 'Arti'],
          baris: [
            ['働[はたら]く', '働[はたら]いています', 'bekerja'],
            ['勉強[べんきょう]する', '勉強[べんきょう]しています', 'belajar / bersekolah'],
            ['通[かよ]う', '通[かよ]っています', 'pergi-pulang (sekolah, tempat kerja)'],
            ['作[つく]る', '作[つく]っています', 'membuat / memproduksi']
          ]
        },
        {
          judul: 'Ingat lagi: bentuk-て',
          kepala: ['Kelompok', 'Akhiran kamus', 'Bentuk-て', 'Contoh'],
          baris: [
            ['Kel. 1', 'う・つ・る', '～って', '買[か]う → 買[か]って'],
            ['Kel. 1', 'む・ぶ・ぬ', '～んで', '飲[の]む → 飲[の]んで'],
            ['Kel. 1', 'く', '～いて', '働[はたら]く → 働[はたら]いて'],
            ['Kel. 1', 'ぐ', '～いで', '泳[およ]ぐ → 泳[およ]いで'],
            ['Kel. 1', 'す', '～して', '話[はな]す → 話[はな]して'],
            ['Kel. 2', 'る', '～て', '食[た]べる → 食[た]べて'],
            ['Kel. 3', 'する／来[く]る', 'して／来[き]て', '勉強[べんきょう]する → 勉強[べんきょう]して'],
            ['Pengecualian', '行[い]く', '行[い]って', '行[い]く → 行[い]って']
          ]
        }
      ],
      jelas: [
        'Bentuk: **bentuk-て + います**. Di bab ini artinya **“sedang menjalani”**: pekerjaan, sekolah, atau kegiatan yang menjadi bagian hidupmu sekarang.',
        '「レストランで{働[はたら]いています}」 bukan berarti kamu sedang mengantar pesanan saat berbicara, tetapi “saya bekerja di restoran” (pekerjaanku saat ini).',
        'Cara bertanya: 「何[なに]をしていますか？」 atau 「どんな仕事[しごと]をしていますか？」. Tempat bekerja atau belajar ditandai **で**.',
        'Negatif: V-ていません. 「今[いま]は、仕事[しごと]を{していません}」 = “Sekarang saya tidak bekerja”.',
        'V-ています punya beberapa arti. Ini yang ①. Yang ② (kebiasaan rutin) ada di Bab 2, dan yang ③ (sedang berlangsung) ada di Bab 4.'
      ],
      contoh: [
        { jp: 'レストランで{働[はたら]いています}。', id: 'Saya bekerja di restoran.' },
        { jp: '日本語[にほんご]学校[がっこう]で{勉強[べんきょう]しています}。', id: 'Saya belajar di sekolah bahasa Jepang.' },
        { jp: '姉[あね]は、専門[せんもん]学校[がっこう]に{通[かよ]っています}。', id: 'Kakak perempuan saya bersekolah di sekolah kejuruan.' },
        { jp: '今[いま]は、仕事[しごと]を{していません}。', id: 'Sekarang saya tidak bekerja.' },
        { jp: 'A：日本[にほん]では、何[なに]をしていますか。\nB：ホテルで{働[はたら]いています}。', id: 'A: Di Jepang, kamu melakukan apa (kerja apa)?\nB: Saya bekerja di hotel.' }
      ],
      awas: [
        'Jangan lupa membentuk **て** dengan benar: ×働[はたら]きています → ○働[はたら]いています. Cek tabel bentuk-て di atas.',
        'Tempat bekerja pakai **で**, bukan に: ○レストランで働[はたら]いています, ×レストランに働[はたら]いています.'
      ],
      kw: 'sedang bekerja belajar sekolah pekerjaan sekarang bentuk te ています'
    }
  ]
});
