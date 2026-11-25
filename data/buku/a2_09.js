/* =====================================================================
   data/buku/a2_09.js — Buku Bunpou Irodori A2 (初級1) · Bab 9
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧): ➊ Nで ＜手段＞ ➋ N1はN2が ナA-です／イA-いです、NはV-るのが ナA-です／イA-いです
   ➌ N1は、～。（でも、）N2は、～。 ＜対比＞ ➍ V-てもらえませんか？ ➎ V-方.
   ===================================================================== */
FC.defineBuku('a2', {
  n: 9,
  title: '読[よ]み方[かた]を教[おし]えてもらえませんか？',
  arti: 'Bisakah kamu mengajari saya cara membacanya?',
  topic: '日本語[にほんご]学習[がくしゅう]',
  topicArti: 'Belajar bahasa Jepang',
  bisa: [
    'Menceritakan bagaimana kamu belajar bahasa Jepang (dengan apa, lewat apa)',
    'Menyampaikan bagian bahasa Jepang yang mudah, sulit, disukai atau kurang kamu kuasai',
    'Meminta tolong dengan sopan, misalnya minta diajari cara membaca',
    'Membaca tulisan di forum internet tentang cara belajar'
  ],
  pola: [
    {
      name: 'Nで ＜手段[しゅだん]＞',
      short: 'で（cara）',
      arti: 'dengan／lewat N (cara, alat, bahasa)',
      inti: 'Pakai ini untuk menyebut **cara atau alat** melakukan sesuatu: **“dengan ~”, “lewat ~”**.',
      rumus: [['N', '+', '=で', '+', 'V']],
      rumusNote: 'N = alat／cara／media／bahasa · Menanyakan cara: どうやって～ますか？',
      jelas: [
        '**で** biasanya menandai **tempat** kegiatan (学校[がっこう]で), tetapi juga menandai **cara／alat**. Di bab sebelumnya kamu memakainya untuk kendaraan (電車[でんしゃ]で). Sekarang untuk cara belajar: 「アニメ{で}日本語[にほんご]を勉強[べんきょう]しました」 = “Saya belajar bahasa Jepang lewat anime”.',
        'Contoh cara／alat／media: 本[ほん]で, ラジオで, ネットで, アプリで, テレビで, 辞書[じしょ]で. Juga **bahasa**: 日本語[にほんご]{で}話[はな]す (berbicara dalam bahasa Jepang).',
        'Menanyakan cara: 「**どうやって**日本語[にほんご]を勉強[べんきょう]しましたか？」. Kalau hanya 「どこで」, jawabannya bisa **tempat** maupun cara, jadi pakai どうやって untuk menanyakan cara saja.',
        'Bedakan lewat kata bendanya: 「日本語[にほんご]学校[がっこう]{で}勉強[べんきょう]しました」 (tempat) dan 「アプリ{で}勉強[べんきょう]しました」 (cara). Dua-duanya で.'
      ],
      contoh: [
        { jp: 'アプリ{で}日本語[にほんご]を勉強[べんきょう]しています。', id: 'Saya belajar bahasa Jepang dengan aplikasi.' },
        { jp: 'ネット{で}、わからない言葉[ことば]を調[しら]べます。', id: 'Saya mencari kata yang tidak saya tahu lewat internet.' },
        { jp: 'A：{どうやって}日本語[にほんご]を勉強[べんきょう]しましたか。\nB：ドラマ{で}勉強[べんきょう]しました。', id: 'A: Bagaimana kamu belajar bahasa Jepang?\nB: Saya belajar lewat drama.' },
        { jp: '日本[にほん]の友[とも]だちと、日本語[にほんご]{で}話[はな]しています。', id: 'Saya berbicara dengan teman Jepang dalam bahasa Jepang.' },
        { jp: '辞書[じしょ]{で}、意味[いみ]を調[しら]べました。', id: 'Saya mengecek artinya dengan kamus.' },
        { jp: 'ペン{で}名前[なまえ]を書[か]いてください。', id: 'Tolong tulis namamu dengan pulpen.' }
      ],
      awas: [
        'で = “dengan／lewat”. Jangan pakai を untuk cara: ×アプリを勉強[べんきょう]しました → ○アプリで勉強[べんきょう]しました.',
        'Satu で bisa punya dua arti: 「学校[がっこう]で勉強[べんきょう]」 = belajar **di** sekolah (tempat); 「本[ほん]で勉強[べんきょう]」 = belajar **dengan** buku (cara). Lihat kata bendanya.',
        'Untuk menanyakan **cara saja**, pakai どうやって. 「どこで勉強[べんきょう]しましたか」 bisa dijawab dengan tempat.'
      ],
      kw: 'dengan lewat cara alat media bahasa で 手段 どうやって aplikasi internet'
    },
    {
      name: 'N1はN2が ナA-です／イA-いです ／ NはV-るのが ナA-です／イA-いです',
      short: 'は～が（sifat）',
      arti: 'soal N1, N2-nya ~ (menilai satu sisi)',
      inti: 'Pakai ini untuk menilai **satu sisi／bagian** dari suatu hal: **“Bahasa Jepang itu hurufnya sulit”**, **“berbicara itu (bagiku) berat”**.',
      rumus: [['N1', '=は', 'N2', '=が', 'ナA／イA', '+', '=です'], ['N', '=は', 'V-る', '=のが', 'ナA／イA', '+', '=です']],
      rumusNote: 'N1 = topik · N2 = bagian yang dinilai · V-る = bentuk kamus, ditambah の supaya menjadi kata benda',
      tabel: [{
        judul: 'Kata yang sering dipakai',
        kepala: ['Jenis', 'Kata'],
        baris: [
          ['Bagian／sisi (N2)', '文字[もじ]・文法[ぶんぽう]・発音[はつおん]・漢字[かんじ]・会話[かいわ]・単語[たんご]'],
          ['Penilaian (sifat)', '難[むずか]しい・簡単[かんたん]（な）・大変[たいへん]（な）・得意[とくい]（な）・苦手[にがて]（な）・おもしろい'],
          ['Kegiatan (V-るの)', '読[よ]むの・話[はな]すの・書[か]くの・覚[おぼ]えるの']
        ]
      }],
      jelas: [
        'Kalimat dua tingkat: **N1は** (topik) ＋ **N2が** (bagian yang dinilai) ＋ sifat. 「インドネシア語[ご]{は}文法[ぶんぽう]{が}簡単[かんたん]です」 = “Bahasa Indonesia, tata bahasanya mudah”. Kamu tidak bilang seluruhnya mudah, tetapi **sisi tertentu**nya.',
        'Sifatnya bisa **sifat-い** (難[むずか]しい, おもしろい) atau **sifat-な** (簡単[かんたん]（な）, 大変[たいへん]（な）, 得意[とくい]（な）, 苦手[にがて]（な）, 好[す]き（な）).',
        'Kalau yang dinilai adalah **kegiatan**, ubah kata kerjanya menjadi kata benda dengan **bentuk kamus ＋ の**: 「話[はな]す{のが}大変[たいへん]です」 (berbicara itu berat), 「文字[もじ]を覚[おぼ]える{のが}難[むずか]しいです」 (menghafal huruf itu sulit). Sama seperti 「V-るのが好[す]きです」 yang sudah kamu kenal.',
        'Objek kata kerja tetap ditandai **を** di dalam bagian V-る: 「文字[もじ]**を**覚[おぼ]えるのが難[むずか]しいです」.'
      ],
      contoh: [
        { jp: '日本語[にほんご]は、発音[はつおん]{が}難[むずか]しいです。', id: 'Bahasa Jepang itu pelafalannya sulit.' },
        { jp: '英語[えいご]は、文法[ぶんぽう]{が}簡単[かんたん]です。', id: 'Bahasa Inggris itu tata bahasanya mudah.' },
        { jp: '日本語[にほんご]は、話[はな]す{のが}大変[たいへん]です。', id: 'Bahasa Jepang itu berbicaranya sulit (berat).' },
        { jp: 'インドネシア語[ご]は、発音[はつおん]{が}簡単[かんたん]です。', id: 'Bahasa Indonesia itu pelafalannya mudah.' },
        { jp: '私[わたし]は、話[はな]す{のが}得意[とくい]です。', id: 'Saya jago berbicara.' },
        { jp: 'A：日本語[にほんご]の勉強[べんきょう]は、どうですか。\nB：漢字[かんじ]{が}難[むずか]しいです。', id: 'A: Belajar bahasa Jepang bagaimana?\nB: Kanjinya sulit.' }
      ],
      awas: [
        'Jangan pakai が untuk topik: ×インドネシア語[ご]が文法[ぶんぽう]が簡単[かんたん]です → ○インドネシア語[ご]**は**文法[ぶんぽう]**が**簡単[かんたん]です. Topik = は, bagian yang dinilai = が.',
        'Kata kerja harus **bentuk kamus ＋ の** (bukan bentuk ます): ×話[はな]しますのが大変[たいへん]です → ○話[はな]すのが大変[たいへん]です.',
        'Beda arti: 「インドネシア語[ご]は簡単[かんたん]です」 = bahasa Indonesia secara keseluruhan mudah; 「インドネシア語[ご]は文法[ぶんぽう]が簡単[かんたん]です」 = yang mudah **tata bahasanya**. Pakai pola ini kalau ingin menunjuk bagian tertentu.'
      ],
      kw: 'sulit mudah tata bahasa huruf pelafalan menilai bagian は が のが 得意 苦手 大変'
    },
    {
      name: 'N1は、～。（でも、）N2は、～。 ＜対比[たいひ]＞',
      short: 'は（kontras）',
      arti: 'N1 sih ~, tapi N2 ~ (mempertentangkan dua sisi)',
      inti: 'Pakai ini untuk **mempertentangkan dua hal**: **“yang ini ~, tetapi yang itu ~”**.',
      rumus: [['N1', '=は', '、', '～。'], ['（', '=でも', '、）', 'N2', '=は', '、', '～。']],
      rumusNote: 'は menandai tiap bagian yang dipertentangkan · でも = tetapi (memperkuat kontras)',
      jelas: [
        '**は** tidak hanya menandai topik, tetapi juga bisa **mempertentangkan**: 「肉[にく]{は}好[す]きです。野菜[やさい]{は}苦手[にがて]です」 = “Kalau daging sih suka, kalau sayur kurang cocok”.',
        'Bagian yang di kalimat tunggal memakai が／を berubah menjadi **は** saat dipertentangkan: 「話[はな]す**のが**好[す]きです」 → 「話[はな]す**のは**好[す]きです。でも、書[か]く**のは**苦手[にがて]です」.',
        '**でも** = “tetapi”, ditaruh di awal kalimat kedua untuk memperjelas kontras. Boleh dihilangkan.',
        'Pasangan kata yang sering dipakai: 好[す]き↔苦手[にがて], 得意[とくい]↔苦手[にがて], 簡単[かんたん]↔大変[たいへん]／難[むずか]しい.',
        'Pola ini cocok untuk menyampaikan penilaian yang **seimbang**: sisi yang mudah dan sisi yang sulit dari satu hal.'
      ],
      contoh: [
        { jp: '漢字[かんじ]を読[よ]む{のは}得意[とくい]です。でも、書[か]く{のは}苦手[にがて]です。', id: 'Membaca kanji saya jago. Tetapi menulisnya kurang.' },
        { jp: '読[よ]む{のは}簡単[かんたん]です。でも、書[か]く{のは}難[むずか]しいです。', id: 'Membaca itu mudah. Tetapi menulis itu sulit.' },
        { jp: '日本語[にほんご]の会話[かいわ]{は}得意[とくい]です。でも、作文[さくぶん]{は}苦手[にがて]です。', id: 'Percakapan bahasa Jepang saya jago, tetapi mengarang kurang.' },
        { jp: 'この店[みせ]の料理[りょうり]{は}おいしいです。でも、値段[ねだん]{は}ちょっと高[たか]いです。', id: 'Masakan toko ini enak. Tetapi harganya agak mahal.' },
        { jp: 'A：日本語[にほんご]の勉強[べんきょう]は、どうですか。\nB：話[はな]す{のは}楽[たの]しいです。でも、読[よ]む{のは}ちょっと大変[たいへん]です。', id: 'A: Belajar bahasa Jepang bagaimana?\nB: Berbicara itu menyenangkan. Tetapi membaca agak berat.' },
        { jp: '肉[にく]{は}食[た]べます。でも、魚[さかな]{は}食[た]べません。', id: 'Daging saya makan, tetapi ikan tidak.' }
      ],
      awas: [
        'Kalimat kedua tetap membawa **は**; kalau lupa, kalimatnya tetap benar tetapi tidak lagi terdengar sebagai pertentangan: 書[か]くのが苦手[にがて]です (netral) → ○書[か]く**のは**苦手[にがて]です (kontras).',
        'Tanpa でも pun, dua kalimat ber-**は** yang isinya berlawanan sudah terdengar sebagai kontras.',
        'Tidak semua は itu kontras. は biasa hanya menandai topik; kesan kontras muncul ketika dua kalimat **bersisian** dan isinya berlawanan.'
      ],
      kw: 'kontras tetapi tapi は でも membandingkan dua sisi suka tidak bisa'
    },
    {
      name: 'V-てもらえませんか？',
      short: 'てもらえませんか',
      arti: 'bisakah tolong ~? (permintaan sopan)',
      inti: 'Pakai ini untuk **meminta tolong dengan sopan**: **“Bisakah kamu tolong ~?”** Lebih halus daripada V-てください.',
      rumus: [['V-て', '+', '=もらえませんか？']],
      rumusNote: 'V-て = bentuk-te · Lawan bicara yang diminta tolong tidak perlu disebut · Jawab: いいですよ ／ すみません、ちょっと…',
      tabel: [{
        judul: 'Kata kerja yang sering dipakai',
        kepala: ['Kamus', 'V-て', 'Permintaan'],
        baris: [
          ['教[おし]える', '教[おし]えて', '教[おし]えてもらえませんか？'],
          ['見[み]せる', '見[み]せて', '見[み]せてもらえませんか？'],
          ['貸[か]す', '貸[か]して', '貸[か]してもらえませんか？'],
          ['説明[せつめい]する', '説明[せつめい]して', '説明[せつめい]してもらえませんか？'],
          ['書[か]く', '書[か]いて', '書[か]いてもらえませんか？'],
          ['言[い]う', '言[い]って', '言[い]ってもらえませんか？']
        ]
      }],
      jelas: [
        '**V-てもらえませんか？** = “Bisakah (kamu) tolong V-kan (untukku)?”. Secara harfiah: “Bisakah saya menerima kebaikanmu melakukan V?”. **もらう** = menerima.',
        'Lebih **sopan** daripada **V-てください** yang terdengar lebih langsung. Cocok untuk meminta tolong kepada guru, atasan, atau orang yang belum akrab.',
        'Lawan bicara yang diminta tolong **tidak perlu disebut**; kalau perlu, panggil saja di depan: 「先生[せんせい]、教[おし]えてもらえませんか？」. Hal yang diminta ditandai **を**: 「この言葉[ことば]の意味[いみ]{を}教[おし]えてもらえませんか？」. **に** hanya muncul bila menyebut orang lain yang memberi bantuan, misalnya pada kalimat pernyataan 「友[とも]だち{に}教[おし]えてもらいました」 (“saya diajari teman”).',
        'Menjawab: setuju → 「はい、いいですよ」「いいですよ」; tidak bisa → 「すみません、ちょっと…」 (menolak halus).',
        'Tentang もらう (menerima) akan dipelajari lebih jauh di bab 17 (【人[ひと]】に【物[もの]】をもらいます).'
      ],
      contoh: [
        { jp: 'すみません、写真[しゃしん]を撮[と]っ{てもらえませんか}？', id: 'Permisi, bisakah tolong fotokan saya?' },
        { jp: 'そのペン、ちょっと貸[か]し{てもらえませんか}？', id: 'Bisakah pinjamkan pulpen itu sebentar?' },
        { jp: 'A：すみません。日本語[にほんご]をチェックし{てもらえませんか}？\nB：いいですよ。見[み]せてください。', id: 'A: Permisi. Bisakah tolong periksa bahasa Jepang saya?\nB: Boleh. Coba saya lihat.' },
        { jp: 'もう一度[いちど]、ゆっくり言[い]っ{てもらえませんか}？', id: 'Bisakah tolong ulangi sekali lagi, pelan-pelan?' },
        { jp: 'A：先生[せんせい]、この言葉[ことば]の意味[いみ]を説明[せつめい]し{てもらえませんか}？\nB：はい、いいですよ。', id: 'A: Sensei, bisakah Anda menjelaskan arti kata ini?\nB: Ya, boleh.' },
        { jp: '住所[じゅうしょ]をここに書[か]い{てもらえませんか}？', id: 'Bisakah tolong tuliskan alamat di sini?' }
      ],
      awas: [
        'Pakai bentuk **て** sebelum もらえません: ×教[おし]えるもらえませんか／×教[おし]えますもらえませんか → ○教[おし]え**て**もらえませんか.',
        'V-てください terdengar lebih langsung. Untuk guru, atasan, atau orang yang baru dikenal, V-てもらえませんか lebih aman.',
        'Bentuknya **pertanyaan negatif** (〜ませんか), bukan 〜ますか. 「V-てもらえますか？」 juga ada, tetapi sedikit kurang halus.'
      ],
      kw: 'tolong meminta sopan bisakah てもらえませんか permintaan halus もらう'
    },
    {
      name: 'V-方[かた]',
      short: 'V-方[かた]',
      arti: 'cara ~ (cara membaca, cara memakai)',
      inti: 'Pakai ini untuk menyebut **cara melakukan sesuatu**: **“cara ~”**.',
      rumus: [['V-ます (tanpa ます)', '+', '=方[かた]']],
      rumusNote: 'Hasilnya kata benda · Kalau ada objek: Nを V → Nの V-方[かた]',
      tabel: [{
        judul: 'Membentuk V-方[かた]',
        kepala: ['Kamus', 'V-方[かた]', 'Artinya'],
        baris: [
          ['読[よ]む', '読[よ]み方[かた]', 'cara membaca'],
          ['書[か]く', '書[か]き方[かた]', 'cara menulis'],
          ['使[つか]う', '使[つか]い方[かた]', 'cara memakai'],
          ['行[い]く', '行[い]き方[かた]', 'cara pergi (rute)'],
          ['食[た]べる', '食[た]べ方[かた]', 'cara makan'],
          ['やる', 'やり方[かた]', 'cara mengerjakan'],
          ['する', 'し方[かた]', 'cara melakukan']
        ]
      }],
      jelas: [
        '**V-方[かた]** = “cara V”. **Bentuk ます tanpa ます ＋ 方[かた]**: 読[よ]みます → 読[よ]み{方[かた]}. Hasilnya **kata benda**, jadi bisa diikuti が／は／を.',
        'Kalau ada objek, **を berubah menjadi の**: 漢字[かんじ]**を**読[よ]む → 漢字[かんじ]**の**読[よ]み方[かた]. 「この辞書[じしょ]の使[つか]い{方[かた]}を教[おし]えてください」.',
        'Untuk する dipakai **し方[かた]** (atau やり方[かた]): 「いい練習[れんしゅう]のし{方[かた]}がありますか？」.',
        'Sering dipakai bersama: ～が**わかりません**, ～を**教[おし]えてください**, ～を**教[おし]えてもらえませんか？** (pola 4).'
      ],
      contoh: [
        { jp: 'この漢字[かんじ]の読[よ]み{方[かた]}がわかりません。', id: 'Saya tidak tahu cara membaca kanji ini.' },
        { jp: 'このアプリの使[つか]い{方[かた]}を教[おし]えてください。', id: 'Tolong ajari cara memakai aplikasi ini.' },
        { jp: 'A：駅[えき]までの行[い]き{方[かた]}を教[おし]えてもらえませんか？\nB：はい、いいですよ。', id: 'A: Bisakah tolong beri tahu cara ke stasiun?\nB: Ya, boleh.' },
        { jp: 'メールの書[か]き{方[かた]}を勉強[べんきょう]しています。', id: 'Saya sedang belajar cara menulis email.' },
        { jp: '日本語[にほんご]の、いい勉強[べんきょう]のし{方[かた]}がありますか？', id: 'Adakah cara belajar bahasa Jepang yang bagus?' },
        { jp: 'この料理[りょうり]の作[つく]り{方[かた]}を知[し]っていますか？', id: 'Apakah kamu tahu cara membuat masakan ini?' }
      ],
      awas: [
        'Pakai **bentuk ます tanpa ます**: ×読[よ]む方[かた]／×読[よ]んで方[かた] → ○読[よ]み方[かた].',
        'Objek memakai **の**, bukan を: ×漢字[かんじ]を読[よ]み方[かた] → ○漢字[かんじ]の読[よ]み方[かた].',
        'Jangan tertukar dengan で＜手段[しゅだん]＞ (pola 1): 「ネットで調[しら]べる」 (dengan apa) dan 「調[しら]べ方[かた]」 (bagaimana caranya).'
      ],
      kw: 'cara membaca menulis memakai 方 かた V-方 し方 やり方 行き方 使い方'
    }
  ]
});
