/* =====================================================================
   data/buku/a22_06.js — Buku Bunpou Irodori A2.2 (初級2) · Bab 6
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   ===================================================================== */
FC.defineBuku('a22', {
  n: 6,
  title: 'いろいろなところに行[い]けて、よかったです',
  arti: 'Senang bisa pergi ke berbagai tempat',
  topic: '旅行[りょこう]に行[い]こう',
  topicArti: 'Ayo pergi berlibur',
  bisa: [
    'Menceritakan rencana atau niatmu: “saya berencana …”',
    'Menyatakan perasaan karena sesuatu bisa atau tidak bisa dilakukan',
    'Menceritakan pengalaman dengan beberapa kesan sekaligus memakai し',
    'Menyebut waktu dengan tepat: “ketika (hendak) …”, “ketika (sudah) …”, “ketika sedang …”',
    'Bilang pergi bersama siapa dan berapa orang'
  ],
  pola: [
    {
      name: 'V-るつもりです／V-ないつもりです',
      short: 'つもり',
      arti: 'berencana ~ / berniat tidak ~',
      inti: 'Pakai ini untuk bilang **rencana atau niat** pribadimu.',
      rumus: [['V-る', '+', '=つもりです'], ['V-ない', '+', '=つもりです']],
      rumusNote: 'V-る = bentuk kamus · V-ない = bentuk negatif biasa',
      jelas: [
        '**つもり** = “niat / rencana”: 「あした、友[とも]だちに会[あ]う{つもりです}」 = “besok saya berencana bertemu teman”.',
        'Negatif: **V-ない＋つもりです** = “berniat **tidak** …”: 「お酒[さけ]は飲[の]ま{ないつもりです}」.',
        'Sebelum つもり pakai **bentuk kamus (V-る)** atau **V-ない**, bukan ます atau て.'
      ],
      contoh: [
        { jp: '来年[らいねん]、日本[にほん]の会社[かいしゃ]で働[はたら]く{つもりです}。', id: 'Tahun depan, saya berencana bekerja di perusahaan Jepang.' },
        { jp: '夏[なつ]休[やす]みに、国[くに]へ帰[かえ]る{つもりです}。', id: 'Pada liburan musim panas, saya berencana pulang ke negara asal.' },
        { jp: 'ダイエット中[ちゅう]なので、ケーキは食[た]べ{ないつもりです}。', id: 'Karena sedang diet, saya berniat tidak makan kue.' },
        { jp: 'あしたは、早[はや]く起[お]きる{つもりです}。', id: 'Besok saya berniat bangun pagi.' },
        { jp: 'A：週末[しゅうまつ]は、何[なに]をしますか。\nB：友[とも]だちと、海[うみ]へ行[い]く{つもりです}。', id: 'A: Akhir pekan mau ngapain?\nB: Saya berencana ke pantai dengan teman.' }
      ],
      awas: [
        'Jangan pakai ます di depan つもり: ×行[い]きますつもりです → ○行[い]くつもりです.',
        'つもり = niat yang **sudah kamu putuskan**. Untuk keinginan yang masih samar, pakai ～たいです (ingin).'
      ],
      kw: 'berencana berniat rencana niat'
    },
    {
      name: 'V-（られ）て、～／V-（られ）なくて、～',
      short: 'て／なくて',
      arti: 'karena bisa / tidak bisa ~, (perasaan)',
      inti: 'Pakai **て／なくて** untuk bilang **penyebab perasaan atau keadaan**: “senang karena bisa …”, “sayang karena tidak bisa …”.',
      rumus: [['V-て', '、', 'perasaan / keadaan'], ['V-なくて', '、', 'perasaan / keadaan']],
      rumusNote: 'V-ない → V-なくて (bukan ないで) · bagian belakang berisi perasaan atau keadaan',
      tabel: [{
        judul: 'Penyebab → perasaan',
        kepala: ['Contoh', 'Artinya'],
        baris: [
          ['行[い]け**て**、よかったです', 'senang karena bisa pergi'],
          ['行[い]け**なくて**、残念[ざんねん]でした', 'sayang karena tidak bisa pergi'],
          ['わから**なくて**、困[こま]りました', 'bingung karena tidak mengerti']
        ]
      }],
      jelas: [
        '**V-て／V-なくて** menyatakan **penyebab**. Bagian belakang berisi **perasaan atau keadaan**: よかったです, うれしいです, 残念[ざんねん]です, 大変[たいへん]です, 困[こま]りました.',
        'Sering dipakai dengan **bentuk bisa**: 行[い]け{て}、よかったです (senang karena bisa pergi); 見[み]られ{なくて}、残念[ざんねん]でした (sayang karena tidak bisa melihat).',
        'Negatif: V-ない → V-**なくて** (×行[い]けないで).'
      ],
      contoh: [
        { jp: '友[とも]だちに{会[あ]えて}、うれしかったです。', id: 'Saya senang bisa bertemu teman.' },
        { jp: '日本[にほん]の料理[りょうり]が{食[た]べられて}、よかったです。', id: 'Saya senang bisa makan masakan Jepang.' },
        { jp: '雨[あめ]で、山[やま]に{登[のぼ]れなくて}、残念[ざんねん]でした。', id: 'Karena hujan, saya tidak bisa mendaki gunung, sayang sekali.' },
        { jp: '日本語[にほんご]が{わからなくて}、困[こま]りました。', id: 'Saya kesulitan karena tidak mengerti bahasa Jepang.' },
        { jp: 'A：旅行[りょこう]は、どうでしたか。\nB：天気[てんき]がよくて、いろいろなところに行[い]け{て}、よかったです。', id: 'A: Bagaimana liburannya?\nB: Cuacanya bagus, dan saya senang bisa pergi ke berbagai tempat.' }
      ],
      awas: [
        'Negatif pakai **なくて** (×行[い]けないで). **ないで** dipakai untuk “tanpa …” (Bab 4).',
        'Bagian belakang tidak boleh berisi **perintah atau ajakan**: ×行[い]けなくて、帰[かえ]りましょう. Pakai perasaan atau keadaan: 残念[ざんねん]でした.'
      ],
      kw: 'karena bisa karena tidak bisa perasaan senang sayang'
    },
    {
      name: 'S（普通形[ふつうけい]）し、～',
      short: 'し (lanjutan)',
      arti: '~, dan lagi ~ (menyebut beberapa hal)',
      inti: 'Masih **し** yang sama dengan Bab 2, tapi sekarang dipakai dengan **bentuk lampau** dan **bentuk bisa** untuk menceritakan **pengalaman**.',
      rumus: [['Kalimat 1', '+', '=し', '、', 'Kalimat 2', '+', '=し', '、', 'Kesimpulan']],
      rumusNote: 'Sebelum し pakai bentuk biasa, boleh lampau (～た) atau bentuk bisa (～える／～られる)',
      tabel: [{
        judul: 'Bentuk biasa (lampau / bisa) sebelum し',
        kepala: ['Jenis', 'Bentuk biasa', 'Sebelum し'],
        baris: [
          ['Kata kerja', '泳[およ]げた', '泳[およ]げたし'],
          ['Sifat-い', '楽[たの]しかった', '楽[たの]しかったし'],
          ['Sifat-な', '静[しず]かだった', '静[しず]かだったし'],
          ['Bentuk bisa', '行[い]けない', '行[い]けないし']
        ]
      }],
      jelas: [
        'Cara pakainya sama dengan Bab 2: menyebut beberapa alasan atau kesan sekaligus. Di bab ini dipakai untuk **menceritakan pengalaman** yang sudah lewat.',
        'Sebelum し pakai **bentuk biasa lampau** (～た／～かった／～だった): 「泳[およ]げ{たし}、楽[たの]しかったです」.',
        'Bentuk bisa juga boleh: 「海[うみ]で泳[およ]げる{し}、魚[さかな]も食[た]べられます」.',
        'Kesimpulan atau kesannya ditaruh di akhir: 楽[たの]しかったです, よかったです.'
      ],
      contoh: [
        { jp: '山[やま]に登[のぼ]れ{たし}、きれいな花[はな]も見[み]られ{たし}、いい旅行[りょこう]でした。', id: 'Bisa mendaki gunung, bisa melihat bunga yang indah juga, perjalanan yang menyenangkan.' },
        { jp: 'ホテルは新[あたら]しかった{し}、食事[しょくじ]もおいしかったです。', id: 'Hotelnya baru, makanannya juga enak.' },
        { jp: 'ご飯[はん]も食[た]べた{し}、お茶[ちゃ]も飲[の]んだ{し}、もう帰[かえ]りましょう。', id: 'Sudah makan, sudah minum teh juga, ayo pulang.' },
        { jp: '天気[てんき]もよかった{し}、人[ひと]も親切[しんせつ]だった{し}、また行[い]きたいです。', id: 'Cuacanya bagus, orang-orangnya juga ramah, saya ingin pergi lagi.' },
        { jp: 'A：日本[にほん]の生活[せいかつ]は、どうですか。\nB：ご飯[はん]もおいしい{し}、電車[でんしゃ]も便利[べんり]だ{し}、いいところです。', id: 'A: Bagaimana hidup di Jepang?\nB: Makanannya enak, keretanya praktis, pokoknya tempat yang bagus.' }
      ],
      awas: [
        'Jangan pakai bentuk sopan di depan し: ×泳[およ]げましたし → ○泳[およ]げたし. (Di percakapan sopan ～ましたし juga terdengar, tapi di buku ini kita latih bentuk biasa.)',
        'Kata sifat-な dan kata benda lampau: ～**だった**し (きれい**だった**し).'
      ],
      kw: 'dan lagi pengalaman bentuk lampau beberapa alasan kesan'
    },
    {
      name: 'V-る／V-ている／V-た とき、～',
      short: 'とき',
      arti: 'ketika ~ / saat ~',
      inti: 'Pakai **とき** untuk bilang **“ketika …”**. Bentuk kata kerja di depannya menentukan **urutan waktu**.',
      rumus: [['V-る', '+', '=とき'], ['V-ている', '+', '=とき'], ['V-た', '+', '=とき']],
      rumusNote: 'Kata benda: **N＋の**とき · kata sifat-い: **い**とき · kata sifat-な: **な**とき',
      tabel: [{
        judul: 'Bentuk di depan とき',
        kepala: ['Bentuk', 'Artinya'],
        baris: [
          ['V-るとき', 'ketika (hendak) V — V belum terjadi'],
          ['V-たとき', 'ketika (sudah) V — V sudah terjadi'],
          ['V-ているとき', 'ketika sedang V'],
          ['Nのとき', 'ketika jadi N (子[こ]どものとき)'],
          ['イAいとき', 'ketika … (忙[いそが]しいとき)'],
          ['ナAなとき', 'ketika … (暇[ひま]なとき)']
        ]
      }],
      jelas: [
        '**とき** = “ketika / saat”. Bagian sebelum とき menerangkan **kapan**.',
        '**V-るとき** = ketika (hendak) V, V belum terjadi: 「出[で]かける{とき}、かぎをかけます」 (saat hendak keluar, saya kunci pintu).',
        '**V-たとき** = ketika (sudah) V, V sudah terjadi: 「うちに帰[かえ]った{とき}、母[はは]がいました」.',
        '**V-ているとき** = ketika sedang V: 「電車[でんしゃ]に乗[の]っている{とき}」.'
      ],
      contoh: [
        { jp: '出[で]かける{とき}、かぎをかけます。', id: 'Ketika hendak keluar, saya mengunci pintu.' },
        { jp: 'うちに帰[かえ]った{とき}、母[はは]がいました。', id: 'Ketika sampai di rumah, ibu ada.' },
        { jp: '電車[でんしゃ]に乗[の]っている{とき}、友[とも]だちに会[あ]いました。', id: 'Ketika sedang naik kereta, saya bertemu teman.' },
        { jp: '子[こ]ども{のとき}、よく海[うみ]で遊[あそ]びました。', id: 'Waktu kecil, saya sering main di pantai.' },
        { jp: '忙[いそが]しい{とき}は、ご飯[はん]を作[つく]りません。', id: 'Kalau sedang sibuk, saya tidak masak.' },
        { jp: 'A：日本[にほん]で困[こま]った{とき}は、どうしますか。\nB：駅[えき]の人[ひと]に聞[き]きます。', id: 'A: Kalau kesulitan di Jepang, bagaimana?\nB: Saya tanya orang di stasiun.' }
      ],
      awas: [
        'Bedakan: 家[いえ]を**出[で]るとき**、電気[でんき]を消[け]します (sebelum keluar) ↔ 家[いえ]を**出[で]たとき**、雨[あめ]が降[ふ]っていました (begitu keluar).',
        'Kata benda pakai **の**: ×子[こ]どもとき → ○子[こ]どものとき.'
      ],
      kw: 'ketika saat waktu sebelum sesudah sedang'
    },
    {
      name: '【人[ひと]】と【人数[にんずう]】で',
      short: 'と＋jumlah＋で',
      arti: 'bersama 【orang】, berdua / bertiga / …',
      inti: 'Pakai ini untuk bilang **pergi bersama siapa** dan **berapa orang**: “berdua dengan teman”.',
      rumus: [['Orang', '+', '=と', '+', 'Jumlah orang', '+', '=で']],
      rumusNote: 'Jumlah orang: 一人[ひとり], 二人[ふたり], 三人[さんにん] …',
      tabel: [{
        judul: 'Jumlah orang',
        kepala: ['Jumlah', 'Arti'],
        baris: [
          ['一人[ひとり]', 'sendirian'],
          ['二人[ふたり]', 'berdua'],
          ['三人[さんにん]', 'bertiga'],
          ['四人[よにん]', 'berempat'],
          ['五人[ごにん]', 'berlima'],
          ['何人[なんにん]', 'berapa orang']
        ]
      }],
      jelas: [
        '「友[とも]だち{と二人[ふたり]で}行[い]きました」 = “pergi **berdua** dengan teman”. **と** = “bersama”, **で** = “dengan jumlah segini”.',
        'Jumlah 1 dan 2 punya bacaan khusus: 一人[ひとり], 二人[ふたり]. Mulai 3: 三人[さんにん], 四人[よにん] (bukan しにん), 五人[ごにん].',
        'Kalau pergi **sendirian**, cukup 一人[ひとり]で (tanpa と): 「{一人[ひとり]で}旅行[りょこう]しました」.',
        'Untuk bertanya jumlah: 「何人[なんにん]で行[い]きましたか」 = “berapa orang perginya?”.'
      ],
      contoh: [
        { jp: '友[とも]だち{と二人[ふたり]で}、海[うみ]へ行[い]きました。', id: 'Saya pergi ke pantai berdua dengan teman.' },
        { jp: '家族[かぞく]{と四人[よにん]で}、旅行[りょこう]しました。', id: 'Saya berlibur berempat dengan keluarga.' },
        { jp: '会社[かいしゃ]の人[ひと]{と三人[さんにん]で}、ご飯[はん]を食[た]べました。', id: 'Saya makan bertiga dengan rekan kantor.' },
        { jp: '{一人[ひとり]で}、バスに乗[の]りました。', id: 'Saya naik bus sendirian.' },
        { jp: 'A：何人[なんにん]で行[い]きますか。\nB：友[とも]だち{と三人[さんにん]で}行[い]きます。', id: 'A: Berapa orang perginya?\nB: Bertiga dengan teman-teman.' }
      ],
      awas: [
        'Jumlahnya **termasuk dirimu**: 友[とも]だちと二人[ふたり]で = kamu + 1 teman = 2 orang.',
        'Bacaan khusus: **二人[ふたり]** (bukan ×ににん), **四人[よにん]** (bukan ×しにん).'
      ],
      kw: 'bersama berdua bertiga jumlah orang dengan teman keluarga'
    }
  ]
});
