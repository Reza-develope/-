/* =====================================================================
   data/buku/a22_15.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 15
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級2 (内容一覧, Japan Foundation): ❶〜❷.
   ===================================================================== */
FC.defineBuku('a22', {
  n: 15,
  title: '会議室[かいぎしつ]の電気[でんき]がついたままでした',
  arti: 'Lampu ruang rapat tadi dibiarkan menyala',
  topic: '自然[しぜん]と環境[かんきょう]',
  topicArti: 'Alam dan lingkungan',
  bisa: [
    'Bilang bahwa sesuatu “dibiarkan begitu saja”: lampu menyala, jendela terbuka, air mengalir',
    'Menegur atau mengingatkan dengan halus soal hemat energi dan kebersihan',
    'Mengatakan sesuatu “bagus untuk ~” atau “berguna untuk ~”',
    'Memahami tulisan ajakan ramah lingkungan di kantor atau tempat umum'
  ],
  pola: [
    {
      name: 'V-たままです',
      short: 'たまま',
      arti: 'dibiarkan ~ / tetap dalam keadaan ~',
      inti: 'Pakai ini kalau suatu **keadaan dibiarkan begitu saja** dan tidak diubah. Sering ada nuansa “**seharusnya diubah**”.',
      rumus: [['V-た', '+', '=ままです'], ['V-た', '+', '=まま', '、', 'V2'], ['V-ない', '+', '=まま']],
      rumusNote: 'V-た = bentuk lampau · V-ない = bentuk negatif · V2 = hal yang dilakukan sambil keadaan itu tetap',
      jelas: [
        '**V-たまま** = “dalam keadaan sudah ~ dan **tidak berubah**”: 「電気[でんき]がつい{たまま}です」 = “lampunya dibiarkan menyala”.',
        'Biasanya ada rasa “**seharusnya diubah**”: lupa dimatikan, lupa ditutup. Cocok untuk **menegur halus** atau **menyesal**.',
        'Bisa dipakai **di tengah kalimat**: V-たまま、V2 = “melakukan V2 dengan keadaan itu tetap”: 「窓[まど]を開[あ]けた{まま}、出[で]かけました」 = “pergi dengan jendela dibiarkan terbuka”.',
        'Negatif: **V-ないまま** = “dibiarkan belum / tanpa melakukan ~”: 「朝[あさ]ご飯[はん]を食[た]べ{ないまま}、出[で]かけました」.'
      ],
      contoh: [
        { jp: '会議室[かいぎしつ]の窓[まど]が、開[あ]い{たまま}です。', id: 'Jendela ruang rapat dibiarkan terbuka.' },
        { jp: '電気[でんき]をつけ{たまま}、寝[ね]てしまいました。', id: 'Saya ketiduran dengan lampu masih menyala.' },
        { jp: '靴[くつ]を履[は]い{たまま}、部屋[へや]に入[はい]らないでください。', id: 'Tolong jangan masuk ruangan dengan sepatu masih dipakai.' },
        { jp: 'エアコンがつい{たまま}、みんな帰[かえ]ってしまいました。', id: 'Semua orang pulang dengan AC masih menyala.' },
        { jp: '水[みず]を出[だ]し{たまま}、歯[は]をみがかないでください。', id: 'Tolong jangan menyikat gigi sambil membiarkan air mengalir.' },
        { jp: '朝[あさ]ご飯[はん]を食[た]べ{ないまま}、会社[かいしゃ]に行[い]きました。', id: 'Saya berangkat ke kantor tanpa sarapan.' }
      ],
      awas: [
        'Pakai **V-た** (bentuk lampau), bukan bentuk kamus atau ます: ×つけるまま, ×つけますまま.',
        'Bedakan: 「電気[でんき]がついています」 = lampu menyala (keadaan biasa). 「電気[でんき]がついた{まま}です」 = lampu **dibiarkan** menyala (seharusnya dimatikan).'
      ],
      kw: 'dibiarkan tetap keadaan tidak berubah lupa mematikan menyala terbuka sambil membiarkan'
    },
    {
      name: 'V-るのにいいです',
      short: 'のにいい',
      arti: 'bagus / cocok untuk ~',
      inti: 'Pakai ini untuk bilang sebuah benda atau tempat **bagus dipakai untuk melakukan sesuatu**: “bagus untuk ~”.',
      rumus: [['V-る', '+', '=のに', '+', '=いいです']],
      rumusNote: 'V-る = bentuk kamus · いいです bisa diganti 便利[べんり]です／役[やく]に立[た]ちます',
      jelas: [
        '**V-る＋のに＋いいです** = “bagus untuk ~”. Dipakai untuk **menilai kegunaan** benda, tempat, atau cara.',
        'Di sini **のに** berarti “**untuk (tujuan)**”. Bentuk di depannya harus **bentuk kamus**: 「散歩[さんぽ]する{のに}いい」.',
        'Kata penilai lain yang bisa dipakai: **便利[べんり]です** (praktis), **役[やく]に立[た]ちます** (berguna), **ちょうどいいです** (pas).',
        'Yang menjadi subjek adalah **benda atau tempat** yang dinilai: 「このバッグは、旅行[りょこう]する{のに}便利[べんり]です」.'
      ],
      contoh: [
        { jp: 'この公園[こうえん]は、散歩[さんぽ]する{のに}ちょうどいいです。', id: 'Taman ini pas untuk jalan-jalan.' },
        { jp: 'この辞書[じしょ]は、漢字[かんじ]を調[しら]べる{のに}便利[べんり]です。', id: 'Kamus ini praktis untuk mencari kanji.' },
        { jp: 'この地図[ちず]は、観光[かんこう]する{のに}役[やく]に立[た]ちます。', id: 'Peta ini berguna untuk berwisata.' },
        { jp: '十月[じゅうがつ]は、山[やま]に登[のぼ]る{のに}いい季節[きせつ]です。', id: 'Bulan Oktober adalah musim yang bagus untuk mendaki gunung.' },
        { jp: 'A：ごみを減[へ]らす{のに}、何[なに]がいいですか。\nB：マイバッグを使[つか]うのがいいですよ。', id: 'A: Untuk mengurangi sampah, apa yang bagus?\nB: Sebaiknya pakai tas belanja sendiri lho.' }
      ],
      awas: [
        'Ini **のに = “untuk”**, bukan のに yang berarti “padahal”. Petunjuknya: setelah のに ada **いいです／便利[べんり]です／役[やく]に立[た]ちます**, jadi artinya “untuk”.',
        'Di depan のに pakai **bentuk kamus**: ×減[へ]らしたのにいいです, ×減[へ]らしますのにいいです.'
      ],
      kw: 'bagus untuk cocok untuk berguna untuk praktis pas fungsi kegunaan'
    }
  ]
});
