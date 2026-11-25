/* =====================================================================
   data/buku/a2_10.js — Buku Bunpou Irodori A2 (初級1) · Bab 10
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧): ➊ V-てみたいんですが… ➋ 【期間】（に）～回 ➌ V-ましょうか？
   ➍ 聞き返し ➎ Nのとき、～／ナA-なとき、～／イA-いとき、～.
   ===================================================================== */
FC.defineBuku('a2', {
  n: 10,
  title: '日本語[にほんご]教室[きょうしつ]に参加[さんか]したいんですが…',
  arti: 'Saya ingin ikut kelas bahasa Jepang, …',
  topic: '日本語[にほんご]学習[がくしゅう]',
  topicArti: 'Belajar bahasa Jepang',
  bisa: [
    'Mencari informasi kelas bahasa Jepang dari brosur atau pengumuman',
    'Menanyakan tentang kelas atau kegiatan, lalu memahami penjelasannya',
    'Menyatakan keinginan mencoba sesuatu dengan halus',
    'Menjawab pertanyaan tentang pengalaman belajar dan tujuanmu'
  ],
  pola: [
    {
      name: 'V-てみたいんですが…',
      short: 'てみたいんですが',
      arti: 'saya ingin mencoba ~, … (halus)',
      inti: 'Pakai ini untuk menyampaikan keinginan **mencoba sesuatu yang baru** sambil bertanya atau meminta dengan halus.',
      rumus: [['V-て', '+', '=みたいんですが…']],
      rumusNote: 'V-てみる = mencoba V · V-てみたい = ingin mencoba V · んですが… = membuka percakapan',
      tabel: [{
        judul: 'Membentuk V-てみたい',
        kepala: ['Kamus', 'V-て', 'V-てみたいんですが…'],
        baris: [
          ['習[なら]う', '習[なら]って', '習[なら]ってみたいんですが…'],
          ['作[つく]る', '作[つく]って', '作[つく]ってみたいんですが…'],
          ['着[き]る', '着[き]て', '着[き]てみたいんですが…'],
          ['参加[さんか]する', '参加[さんか]して', '参加[さんか]してみたいんですが…']
        ]
      }],
      jelas: [
        '**V-てみる** = “mencoba melakukan V (untuk tahu bagaimana)”. **V-てみたい** = “ingin mencoba V”. Ditambah **んですが…**, menjadi cara halus untuk menyampaikan keinginan sambil bertanya: 「日本[にほん]の料理[りょうり]を作[つく]っ{てみたいんですが}…」.',
        'Dipakai untuk hal yang **baru atau belum pernah** kamu lakukan. Kamu belum tahu rasanya／isinya, jadi “ingin coba dulu”.',
        'Beda dengan V-たいんですが… (bab 8): V-てみたい menekankan **“coba dulu／pengalaman pertama”**, sedangkan V-たい hanya “ingin V”.',
        'Cocok untuk menanyakan kegiatan, kelas, atau tempat. Setelah kalimat menggantung, lawan bicara biasanya menjelaskan atau bertanya balik.',
        'Bentuk **V-てみます** (mencoba) dibahas lebih lanjut di bab 12.'
      ],
      contoh: [
        { jp: '日本[にほん]の料理[りょうり]を作[つく]っ{てみたいんですが}…。', id: 'Saya ingin mencoba membuat masakan Jepang, …' },
        { jp: '茶道[さどう]を習[なら]っ{てみたいんですが}…。', id: 'Saya ingin mencoba belajar upacara minum teh, …' },
        { jp: 'A：いらっしゃいませ。\nB：あの、ヨガを習[なら]っ{てみたいんですが}…。\nA：体験[たいけん]レッスンはどうですか。', id: 'A: Selamat datang.\nB: Permisi, saya ingin mencoba belajar yoga, …\nA: Bagaimana kalau pelajaran percobaan?' },
        { jp: '日本[にほん]の着物[きもの]を着[き]{てみたいんですが}…。', id: 'Saya ingin mencoba memakai kimono Jepang, …' },
        { jp: '一度[いちど]、スキーをし{てみたいんですが}、どこがいいですか？', id: 'Saya ingin mencoba main ski sekali saja, di mana yang bagus?' },
        { jp: 'この納豆[なっとう]を食[た]べ{てみたいです}。', id: 'Saya ingin coba makan natto ini.' }
      ],
      awas: [
        'Pakai bentuk **て** + みたい: ×やりみたい → ○やっ**て**みたい.',
        'Hanya untuk hal yang **baru／belum pernah**. Untuk hal yang sudah rutin, tidak cocok: ×毎日[まいにち]ご飯[はん]を食[た]べてみたいです.',
        '**みる** di sini ditulis **hiragana**: 食[た]べてみる, bukan 食[た]べて見[み]る. Artinya “mencoba”, bukan “melihat”.'
      ],
      kw: 'ingin mencoba てみたい んですが halus pertama kali kelas klub'
    },
    {
      name: '【期間[きかん]】（に）～回[かい]',
      short: 'に～回[かい]',
      arti: '~ kali per (minggu／bulan／tahun)',
      inti: 'Pakai ini untuk menyebut **seberapa sering** sesuatu terjadi dalam jangka waktu tertentu: **“… kali dalam seminggu／sebulan／setahun”**.',
      rumus: [['【Periode】', '+', '=（に）', '+', '【Jumlah】', '+', '=回[かい]']],
      rumusNote: 'に boleh dihilangkan · ぐらい setelah 回[かい] = sekitar',
      tabel: [{
        judul: 'Periode dan contoh',
        kepala: ['Periode', 'Contoh', 'Artinya'],
        baris: [
          ['週[しゅう]／～週間[しゅうかん]', '週[しゅう]に1回[いっかい] ・ 2週間[にしゅうかん]に1回[いっかい]', 'sekali seminggu ・ sekali tiap dua minggu'],
          ['月[つき]／～か月[げつ]', '月[つき]に2回[にかい] ・ 3[さん]か月[げつ]に1回[いっかい]', 'dua kali sebulan ・ sekali tiap tiga bulan'],
          ['年[ねん]／～年[ねん]', '1年[いちねん]に3回[さんかい] ・ 4年[よねん]に1回[いっかい]', 'tiga kali setahun ・ sekali tiap empat tahun'],
          ['1日[いちにち]', '1日[いちにち]に3回[さんかい]', 'tiga kali sehari']
        ]
      }],
      jelas: [
        'Urutannya: **periode ＋ に ＋ jumlah ＋ 回[かい]**. 「週[しゅう]{に}1回[いっかい]」 = “sekali seminggu”. 回[かい] = “kali”.',
        'Periode yang dipakai: 週[しゅう]／～週間[しゅうかん] (minggu), 月[つき]／～か月[げつ] (bulan), 年[ねん]／～年[ねん] (tahun), 1日[いちにち] (hari). Untuk “setiap dua minggu／empat tahun”, taruh angka di depan: 2週間[にしゅうかん]に1回[いっかい], 4年[よねん]に1回[いっかい].',
        '**に** boleh dihilangkan (lebih santai): 「週[しゅう]1回[いっかい]」「月[つき]2回[にかい]」. Kalau ingin “sekitar”, tambahkan **ぐらい** setelah 回[かい]: 「月[つき]に2回[にかい]ぐらい」.',
        'Pola ini bisa juga menjadi **predikat**: 「料理[りょうり]教室[きょうしつ]は週[しゅう]に1回[いっかい]です」 (kelas masaknya seminggu sekali).'
      ],
      contoh: [
        { jp: '水泳[すいえい]教室[きょうしつ]は、{週[しゅう]に2回[にかい]}です。', id: 'Kelas renang diadakan dua kali seminggu.' },
        { jp: 'ジムには、{週[しゅう]に3回[さんかい]}行[い]きます。', id: 'Saya pergi ke gym tiga kali seminggu.' },
        { jp: 'ワールドカップは、{4年[よねん]に1回[いっかい]}あります。', id: 'Piala Dunia diadakan sekali empat tahun.' },
        { jp: '国[くに]の家族[かぞく]に、{月[つき]に1回[いっかい]}電話[でんわ]します。', id: 'Saya menelepon keluarga di kampung halaman sekali sebulan.' },
        { jp: 'A：クラスは、{週[しゅう]に}何回[なんかい]ありますか。\nB：{週[しゅう]に2回[にかい]}あります。', id: 'A: Berapa kali kelasnya dalam seminggu?\nB: Dua kali seminggu.' },
        { jp: '友[とも]だちとは、{月[つき]に2回[にかい]ぐらい}会[あ]います。', id: 'Saya bertemu teman sekitar dua kali sebulan.' }
      ],
      awas: [
        'Urutannya **periode → 回[かい]**: ×2回[にかい]週[しゅう]に → ○週[しゅう]に2回[にかい]. Jangan dibalik.',
        '**に** dipasang **setelah periode**, bukan setelah 回[かい]: ×週[しゅう]1回[いっかい]に → ○週[しゅう]に1回[いっかい].',
        'Hati-hati: 回[かい] = **berapa kali** (frekuensi), 時間[じかん] = **berapa lama** (durasi). 週[しゅう]に2回[にかい] ≠ 週[しゅう]に2時間[にじかん].'
      ],
      kw: 'sering frekuensi seminggu sekali sebulan setahun 週に 月に 回 kali per'
    },
    {
      name: 'V-ましょうか？',
      short: 'ましょうか',
      arti: 'mau saya ~kan? (menawarkan bantuan)',
      inti: 'Pakai ini untuk **menawarkan bantuan**: **“Mau saya V-kan (untukmu)?”**',
      rumus: [['V-ます (tanpa ます)', '+', '=ましょうか？']],
      rumusNote: 'Menerima: お願[ねが]いします ／ Menolak halus: 大丈夫[だいじょうぶ]です',
      tabel: [{
        judul: 'Tiga pola yang mirip',
        kepala: ['Pola', 'Arti', 'Contoh'],
        baris: [
          ['V-ましょうか？', 'Mau saya V? (tawaran)', '荷物[にもつ]を持[も]ちましょうか？'],
          ['V-ましょう', 'Ayo V! (ajakan)', 'いっしょに行[い]きましょう'],
          ['V-ませんか？', 'Mau V? (ajakan sopan)', 'いっしょに行[い]きませんか？']
        ]
      }],
      jelas: [
        '**V-ましょうか？** = “Mau saya V?”. Pelakunya **kamu sendiri**: kamu menawarkan diri untuk membantu. 「荷物[にもつ]を持[も]ち{ましょうか}？」 = “Mau saya bawakan barangnya?”.',
        'Cara membuat: V-ます → V-ま**しょうか**: 手伝[てつだ]います → 手伝[てつだ]い{ましょうか}.',
        'Menjawab: menerima → 「お願[ねが]いします」「ありがとうございます」; menolak halus → 「大丈夫[だいじょうぶ]です。ありがとうございます」. Untuk lebih sopan, awali dengan 「よかったら、〜ましょうか？」 (kalau berkenan).',
        'Bedakan tiga pola yang mirip (lihat tabel): **V-ましょうか？** (tawaran), **V-ましょう** (ajakan “ayo!”), **V-ませんか？** (ajakan sopan).',
        'V-ましょうか？ juga bisa dipakai untuk mengajukan usul **bersama**: 「そろそろ帰[かえ]り{ましょうか}」 = “Bagaimana kalau kita pulang sekarang?”. Konteks menentukan artinya.'
      ],
      contoh: [
        { jp: '重[おも]いですね。荷物[にもつ]を持[も]ち{ましょうか}？', id: 'Berat ya. Mau saya bawakan barangnya?' },
        { jp: 'よかったら、手伝[てつだ]い{ましょうか}？', id: 'Kalau berkenan, mau saya bantu?' },
        { jp: 'A：窓[まど]を開[あ]け{ましょうか}？\nB：はい、お願[ねが]いします。', id: 'A: Mau saya buka jendelanya?\nB: Ya, tolong.' },
        { jp: 'A：コピーし{ましょうか}？\nB：いいえ、大丈夫[だいじょうぶ]です。ありがとうございます。', id: 'A: Mau saya fotokopikan?\nB: Tidak usah, tidak apa-apa. Terima kasih.' },
        { jp: '駅[えき]まで、車[くるま]で送[おく]り{ましょうか}？', id: 'Mau saya antar sampai stasiun naik mobil?' },
        { jp: 'ちょっと暑[あつ]いですね。エアコンをつけ{ましょうか}？', id: 'Agak panas ya. Mau saya nyalakan AC?' }
      ],
      awas: [
        'Pelaku tawaran adalah **kamu**. Kalau kamu ingin **meminta orang lain** melakukannya, pakai V-てもらえませんか？ (bab 9), bukan V-ましょうか？.',
        'Dengan **V-ませんか？** bukan tawaran, melainkan ajakan: 「いっしょに食[た]べませんか」.',
        'Jangan lupa akhiran **か**: tanpa か (V-ましょう) artinya “ayo ~!”.'
      ],
      kw: 'menawarkan bantuan mau saya ましょうか tawaran membantu mari'
    },
    {
      name: '聞[き]き返[かえ]し',
      short: '聞[き]き返[かえ]し',
      arti: 'menanyakan arti／meminta diulang',
      inti: 'Pakai ini ketika **tidak paham** kata atau kalimat lawan bicara: menanyakan **arti kata**, atau meminta **diulang**.',
      rumus: [['「X」', '=は、どういう意味[いみ]ですか？'], ['「X」', '=は何[なん]ですか？'], ['Ulangi kata X', '+', '=？（nada naik）']],
      rumusNote: 'X = kata yang tidak kamu mengerti',
      tabel: [{
        judul: 'Dua jenis 聞[き]き返[かえ]し',
        kepala: ['Keperluan', 'Ungkapan'],
        baris: [
          ['Menanyakan arti kata', '「X」は、どういう意味[いみ]ですか？／「X」は何[なん]ですか？／「X」って何[なん]ですか？（santai）／ulangi 「X？」 dengan nada naik'],
          ['Meminta diulang (kurang jelas terdengar)', 'もう一度[いちど]お願[ねが]いします。／もう少[すこ]しゆっくりお願[ねが]いします。']
        ]
      }],
      jelas: [
        '**聞[き]き返[かえ]し** = bertanya balik ketika kamu tidak mengerti. Ada dua jenis: (1) menanyakan **arti** kata, (2) meminta lawan bicara **mengulang** karena tidak terdengar jelas. Bab ini terutama membahas jenis (1).',
        'Menanyakan arti: 「すみません。「さんかひ」{は、どういう意味[いみ]ですか}？」. Kutip kata yang tidak kamu mengerti di depan. Bisa juga 「「さんかひ」は何[なん]ですか？」, atau santai 「「さんかひ」って何[なん]？」.',
        'Cara paling cepat: **ulangi kata itu dengan nada naik**. 「さんかひ？」 = “Apa itu sankahi?”. Lawan bicara biasanya langsung menjelaskan.',
        'Untuk meminta diulang: 「もう一度[いちど]お願[ねが]いします」, 「もう少[すこ]しゆっくりお願[ねが]いします」. Awali dengan 「すみません」 supaya sopan.'
      ],
      contoh: [
        { jp: 'すみません。「体験[たいけん]」{は、どういう意味[いみ]ですか}？', id: 'Maaf. Apa arti “taiken”?' },
        { jp: 'すみません。「見学[けんがく]」{は何[なん]ですか}？', id: 'Maaf. Apa itu “kengaku”?' },
        { jp: 'A：これは、お祭[まつ]りのチラシです。\nB：「チラシ」{って何[なん]ですか}？\nA：紙[かみ]のお知[し]らせです。', id: 'A: Ini selebaran festival.\nB: “Chirashi” itu apa?\nA: Pengumuman di kertas.' },
        { jp: 'A：来週[らいしゅう]、体育館[たいいくかん]でバザーがあります。\nB：{バザー}？\nA：安[やす]く物[もの]を売[う]るイベントです。', id: 'A: Minggu depan ada bazar di gedung olahraga.\nB: Bazar?\nA: Acara menjual barang murah.' },
        { jp: 'すみません。もう一度[いちど]、{お願[ねが]いします}。', id: 'Maaf. Tolong sekali lagi.' },
        { jp: 'すみません。もう少[すこ]し、{ゆっくりお願[ねが]いします}。', id: 'Maaf. Tolong sedikit lebih pelan.' }
      ],
      awas: [
        'Kutip **kata yang tidak kamu mengerti** saja: 「「さんかひ」は、どういう意味[いみ]ですか」. Jangan memakai どういう意味[いみ]ですか untuk meminta diulang; itu khusus menanyakan **arti**.',
        'Mengulang kata dengan nada naik cocok untuk percakapan akrab. Kepada guru atau atasan, tambahkan 「すみません」 atau pakai 「〜は、どういう意味[いみ]ですか」.',
        'Bedakan: 「〜は何[なん]ですか」 (apa itu ~?) bisa menanyakan arti kata maupun benda; 「どういう意味[いみ]ですか」 khusus menanyakan **arti**.'
      ],
      kw: 'tidak mengerti menanyakan arti どういう意味 もう一度 diulang 聞き返し ゆっくり'
    },
    {
      name: 'Nのとき、～ ／ ナA-なとき、～ ／ イA-いとき、～',
      short: 'とき',
      arti: 'ketika ~ (saat／kondisi)',
      inti: 'Pakai ini untuk menyatakan **saat／kondisi** terjadinya sesuatu: **“ketika ~”, “waktu ~”**.',
      rumus: [['N', '=の', '=とき', '、', '～'], ['ナA-な', '=とき', '、', '～'], ['イA-い', '=とき', '、', '～']],
      rumusNote: 'N ＋ の · ナA ＋ な · イA ＋ い (bentuk biasa sebelum とき)',
      tabel: [{
        judul: 'Sebelum とき',
        kepala: ['Kata benda', 'ナA (sifat-な)', 'イA (sifat-い)'],
        baris: [
          ['子[こ]どもの＋とき', '暇[ひま]な＋とき', '若[わか]い＋とき'],
          ['休[やす]みの＋とき', '元気[げんき]な＋とき', '忙[いそが]しい＋とき'],
          ['高校[こうこう]の＋とき', '静[しず]かな＋とき', '寒[さむ]い＋とき']
        ]
      }],
      jelas: [
        '**とき** = “saat／ketika”. Bagian di depan とき menjelaskan keadaan, bagian belakang menyebut apa yang terjadi saat itu: 「学生[がくせい]の{とき}、よく図書館[としょかん]で勉強[べんきょう]しました」.',
        'Kata benda memakai **の**: 子[こ]どもの{とき}, 休[やす]みの{とき}. Sifat-な memakai **な**: 暇[ひま]な{とき}. Sifat-い langsung: 若[わか]い{とき}, 忙[いそが]しい{とき}.',
        'Di bab ini fokusnya **kata benda**, tetapi sifat juga boleh. Untuk kata kerja (V-たいとき, V-るとき, dan sebagainya) dipelajari di bab 13 dan 15.',
        'Bagian belakang bebas: lampau (勉強[べんきょう]しました), kebiasaan (よく散歩[さんぽ]します), dan sebagainya.'
      ],
      contoh: [
        { jp: '子[こ]どもの{とき}、夏[なつ]はよく川[かわ]で泳[およ]ぎました。', id: 'Waktu kecil, di musim panas saya sering berenang di sungai.' },
        { jp: '病気[びょうき]の{とき}、会社[かいしゃ]を休[やす]みます。', id: 'Ketika sakit, saya tidak masuk kantor.' },
        { jp: '暇[ひま]な{とき}、よく散歩[さんぽ]します。', id: 'Ketika senggang, saya sering jalan-jalan.' },
        { jp: '若[わか]い{とき}、サッカーをしていました。', id: 'Waktu muda, saya bermain sepak bola.' },
        { jp: '忙[いそが]しい{とき}は、コンビニで晩[ばん]ご飯[はん]を買[か]います。', id: 'Ketika sibuk, saya membeli makan malam di minimarket.' },
        { jp: 'A：暇[ひま]な{とき}は、何[なに]をしますか。\nB：家[いえ]で映画[えいが]を見[み]ます。', id: 'A: Ketika senggang, kamu melakukan apa?\nB: Saya menonton film di rumah.' }
      ],
      awas: [
        'Jangan pakai **だ／な** setelah kata benda: ×学生[がくせい]なとき／×暇[ひま]だとき → ○学生[がくせい]のとき／○暇[ひま]なとき. Kata benda → **の**; sifat-な → **な**.',
        'Pakai **bentuk kamus** sifat-い, bukan bentuk sopan: ×忙[いそが]しいですとき → ○忙[いそが]しいとき.',
        'Di bab ini fokusnya bentuk **non-lampau** di depan とき. Bentuk lampau juga ada (高校[こうこう]**だった**とき／忙[いそが]し**かった**とき), tetapi bentuk sopan tidak dipakai: ×高校[こうこう]でしたとき → ○高校[こうこう]だったとき.'
      ],
      kw: 'ketika waktu saat とき kondisi masa kecil sibuk senggang の とき'
    }
  ]
});
