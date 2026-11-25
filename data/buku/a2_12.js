/* =====================================================================
   data/buku/a2_12.js — Buku Bunpou Irodori A2 (初級1) · Bab 12
   Format penanda & aturan: lihat kepala berkas a22_01.js. Contoh kalimat dibuat sendiri (bukan salinan buku pelajaran).
   Daftar pola mengikuti daftar isi resmi Irodori 初級1 (内容一覧): ➊ ナA-／イA- そうです ➋ そうなN ➌ イA-くて／イA-くなくて
   ➍ V-てみます ➎ 自動詞・他動詞 ➏ イA-くないですか？.
   ===================================================================== */
FC.defineBuku('a2', {
  n: 12,
  title: 'お弁当[べんとう]、おいしそうですね',
  arti: 'Bentonya kelihatan enak ya',
  topic: 'おいしい料理[りょうり]',
  topicArti: 'Masakan yang enak',
  bisa: [
    'Menyampaikan kesan dari penampilan makanan, misalnya 「おいしそうですね」',
    'Menyebut dua sifat sekaligus dalam satu kalimat, misalnya 「安[やす]くておいしいです」',
    'Mencoba makanan atau hal baru, lalu membicarakan kesannya',
    'Menanyakan perasaan lawan bicara dengan sopan, misalnya 「辛[から]くないですか？」'
  ],
  pola: [
    {
      name: 'ナA- ／ イA- そうです',
      short: 'ナA／イA そうです',
      arti: 'Kelihatannya … (kesan dari penampilan)',
      inti: 'Pakai ini untuk menyampaikan **kesan** yang kamu dapat dari **penampilan** orang atau benda yang kamu lihat: **“kelihatannya …”**, **“sepertinya …”**.',
      rumus: [['ナA', '+', '=そうです'], ['イA (buang い)', '+', '=そうです']],
      rumusNote: 'いい → よさそうです · ない → なさそうです (pengecualian イA)',
      tabel: [{
        judul: 'Contoh perubahan bentuk',
        kepala: ['Jenis', 'Kata sifat', '＋そうです', 'Arti'],
        baris: [
          ['ナA', '元気[げんき]', '元気[げんき]そうです', 'kelihatan sehat／bersemangat'],
          ['ナA', '大変[たいへん]', '大変[たいへん]そうです', 'kelihatan repot／berat'],
          ['イA', 'おいしい', 'おいしそうです', 'kelihatan enak'],
          ['イA', '辛[から]い', '辛[から]そうです', 'kelihatan pedas'],
          ['イA', '重[おも]い', '重[おも]そうです', 'kelihatan berat'],
          ['イA (pengecualian)', 'いい', 'よさそうです', 'kelihatan bagus'],
          ['イA (negatif)', 'おいしくない', 'おいしくなさそうです', 'kelihatan tidak enak']
        ]
      }],
      jelas: [
        '**ナA／イA ＋ そうです** menyatakan **kesan dari penampilan**: kamu **melihat** sesuatu lalu menilai “kelihatannya begitu”. 「このお弁当[べんとう]、{おいしそうです}ね」 = “Bento ini kelihatannya enak ya”.',
        'Cara membentuk: **ナA** → langsung tambah そうです (元気[げんき] → 元気[げんき]そうです). **イA** → **buang い** lalu tambah そうです (おいしい → おいしそうです).',
        'Pengecualian イA: **いい → よさそうです**, **ない → なさそうです**. Untuk イA negatif: おいしくない → おいしく{なさそうです}.',
        'Perbedaan penting: **おいしそうです** = **belum dicicipi**, hanya menilai dari penampilan. **おいしいです** = **sudah dicicipi**, menyatakan rasa sebenarnya. Sebelum makan pakai そう, sesudah makan pakai おいしいです.',
        'Dalam percakapan santai, cukup **～そう！** tanpa です: 「{おいしそう}！」 = “Kelihatannya enak!”.'
      ],
      contoh: [
        { jp: 'このケーキ、{おいしそう}ですね。', id: 'Kue ini kelihatannya enak ya.' },
        { jp: 'A：これ、見[み]てください。\nB：わあ、{辛[から]そう}ですね。', id: 'A: Coba lihat ini.\nB: Wah, kelihatannya pedas ya.' },
        { jp: 'あの店[みせ]のラーメンは、{高[たか]そう}です。', id: 'Ramen di toko itu kelihatannya mahal.' },
        { jp: '田中[たなか]さんは、毎日[まいにち]{忙[いそが]しそう}です。', id: 'Tanaka-san kelihatannya sibuk setiap hari.' },
        { jp: 'この靴[くつ]は、デザインが{よさそう}ですね。', id: 'Sepatu ini desainnya kelihatan bagus ya.' },
        { jp: 'このスープは、あまり{おいしくなさそう}です。', id: 'Sup ini kelihatannya kurang enak.' }
      ],
      awas: [
        'Ingat pengecualian: ×いそうです → ○**よさそう**です; untuk negatif ○おいしく**なさそう**です (おいしくないそうです punya arti lain, yaitu “katanya tidak enak”).',
        'そうです di sini = **kelihatannya** (dari penampilan). Jangan tertukar dengan そうです yang berarti **“katanya／kabarnya”** (mendengar dari orang), yang dipelajari di bab 18 dan bentuknya berbeda: イA tetap utuh (おいしいそうです). Untuk **kata kerja** (V-そうです, “sepertinya akan …”) lihat bab 13.',
        'Setelah mencicipi, ungkapkan rasanya langsung: ○おいしかったです／○おいしいです, bukan おいしそうです.'
      ],
      kw: 'kelihatannya sepertinya tampak kesan penampilan そう おいしそう よさそう なさそう 元気そう 忙しそう 辛そう 重そう'
    },
    {
      name: 'ナA- ／ イA- そうなN',
      short: 'そうなN',
      arti: 'N yang kelihatannya …',
      inti: 'Pakai ini untuk **menerangkan kata benda** dengan kesan dari penampilannya: **“kue yang kelihatannya enak”**. **そうです** berubah menjadi **そうな** di depan kata benda.',
      rumus: [['ナA／イA-そう', '=な', 'N']],
      rumusNote: 'Sama seperti ナA ＋ な ＋ N (きれいな町[まち]) · よさそうな／なさそうな tetap berlaku',
      tabel: [{
        judul: 'Dari kalimat ke penerang kata benda',
        kepala: ['～そうです', '～そうなN', 'Arti'],
        baris: [
          ['このケーキ、おいしそうです', 'おいしそうなケーキ', 'kue yang kelihatannya enak'],
          ['この荷物[にもつ]、重[おも]そうです', '重[おも]そうな荷物[にもつ]', 'barang yang kelihatannya berat'],
          ['あの人[ひと]、元気[げんき]そうです', '元気[げんき]そうな人[ひと]', 'orang yang kelihatannya sehat'],
          ['この靴[くつ]、よさそうです', 'よさそうな靴[くつ]', 'sepatu yang kelihatannya bagus']
        ]
      }],
      jelas: [
        'Untuk menerangkan kata benda dengan kesan penampilan, ganti **です** dengan **な** lalu sambung ke N: おいしそう**です** → おいしそう{な}ケーキ. Bentuknya sama seperti **ナA ＋ な ＋ N**.',
        'Dipakai untuk menunjuk atau memilih barang yang menarik: 「{おいしそうな}お弁当[べんとう]ですね」 = “Bento yang kelihatannya enak ya”. 「あの{おいしそうな}ケーキをください」 = “Tolong kue yang kelihatannya enak itu”.',
        'Pengecualian イA tetap berlaku: {よさそうな}店[みせ] = toko yang kelihatannya bagus; {おいしくなさそうな}料理[りょうり] = masakan yang kelihatannya kurang enak.'
      ],
      contoh: [
        { jp: 'あそこに、{おいしそうな}パン屋[や]がありますよ。', id: 'Di sana ada toko roti yang kelihatannya enak lho.' },
        { jp: '{重[おも]そうな}荷物[にもつ]ですね。手伝[てつだ]いましょうか。', id: 'Barangnya kelihatannya berat ya. Mau saya bantu?' },
        { jp: '{元気[げんき]そうな}子[こ]どもですね。', id: 'Anaknya kelihatan sehat ya.' },
        { jp: 'A：どのお弁当[べんとう]にしますか。\nB：この{おいしそうな}お弁当[べんとう]にします。', id: 'A: Mau bento yang mana?\nB: Saya pilih bento yang kelihatan enak ini.' },
        { jp: '{よさそうな}店[みせ]ですね。入[はい]りましょう。', id: 'Toko yang kelihatannya bagus ya. Ayo masuk.' },
        { jp: '{辛[から]そうな}カレーですね。私[わたし]は、ちょっと…。', id: 'Kari yang kelihatannya pedas ya. Saya, agak…' }
      ],
      awas: [
        'Jangan lupa **な**: ×おいしそうケーキ／×おいしそうのケーキ → ○おいしそう**な**ケーキ.',
        'おいしそうなケーキ = kue yang **kelihatannya** enak (belum dicoba). おいしいケーキ = kue yang memang enak.'
      ],
      kw: 'kata benda yang kelihatannya そうな おいしそうな 重そうな 元気そうな よさそうな penjelas benda'
    },
    {
      name: 'イA-くて ／ イA-くなくて',
      short: 'イA-くて',
      arti: 'Murah dan enak (menyambung kata sifat)',
      inti: 'Pakai ini untuk **menyambung dua sifat** (atau lebih) dalam satu kalimat: **“murah dan enak”**. Bentuk sambungan イA adalah **～くて**, dan bentuk negatifnya **～くなくて**.',
      rumus: [['イA-い', '→', 'イA-', '=くて'], ['イA-くない', '→', 'イA-', '=くなくて']],
      rumusNote: 'いい → よくて · ナA／N → ～で (静[しず]かで、きれいです)',
      tabel: [{
        judul: 'Bentuk sambungan kata sifat',
        kepala: ['Jenis', 'Bentuk', 'Contoh'],
        baris: [
          ['イA', '～い → ～くて', '安[やす]い → 安[やす]くて、おいしいです'],
          ['イA (いい)', 'いい → よくて', '天気[てんき]がよくて、気持[きも]ちがいいです'],
          ['イA (negatif)', '～くない → ～くなくて', '高[たか]くなくて、おいしいです'],
          ['ナA', '～で', '静[しず]かで、きれいです']
        ]
      }],
      jelas: [
        '**イA-くて** menyambung sifat-sifat dalam satu kalimat: 「このお弁当[べんとう]は、安[やす]{くて}、おいしいです」 = “Bento ini murah dan enak”. Hanya **sifat terakhir** yang memakai **です**.',
        'Cara: buang **い** lalu tambah **くて** (安[やす]い → 安[やす]**くて**). Untuk negatif: **～くない → ～くなくて** (高[たか]くない → 高[たか]**くなくて**).',
        '**いい** menjadi **よくて**: 「天気[てんき]が{よくて}、気持[きも]ちがいいです」 = “Cuacanya bagus, jadi terasa nyaman”.',
        '**ナA／N** memakai **～で**: 「静[しず]か{で}、きれいです」. Jadi **くて** khusus untuk イA.',
        '**くて** juga bisa menyatakan **sebab** (seperti di bab 7): 「先週[せんしゅう]は忙[いそが]し{くて}、パーティーに行[い]きませんでした」 = “Minggu lalu saya sibuk, jadi tidak datang ke pesta”.'
      ],
      contoh: [
        { jp: 'このお弁当[べんとう]は、安[やす]{くて}、おいしいです。', id: 'Bento ini murah dan enak.' },
        { jp: 'この店[みせ]は、広[ひろ]{くて}、きれいです。', id: 'Toko ini luas dan bersih.' },
        { jp: 'このスープは、甘[あま]{くなくて}、おいしいです。', id: 'Sup ini tidak manis dan enak.' },
        { jp: '天気[てんき]が{よくて}、気持[きも]ちがいいです。', id: 'Cuacanya bagus, jadi terasa nyaman.' },
        { jp: '先週[せんしゅう]は忙[いそが]し{くて}、パーティーに行[い]きませんでした。', id: 'Minggu lalu saya sibuk, jadi tidak datang ke pesta.' },
        { jp: 'A：あの店[みせ]は、どうですか。\nB：小[ちい]さ{くて}、静[しず]かな店[みせ]ですよ。', id: 'A: Bagaimana toko itu?\nB: Tokonya kecil dan tenang lho.' }
      ],
      awas: [
        'Jangan lupa membuang **い**: ×安[やす]いくて／×安[やす]いて → ○安[やす]**くて**.',
        '**いい → よくて**: ×いくて → ○よくて. Bentuk negatifnya: よくなくて.',
        'Hanya イA yang jadi **～くて**. **ナA／N** memakai **～で**: ×静[しず]かくて → ○静[しず]かで.',
        'Sifat yang **nilainya berlawanan** (bagus ＋ jelek) biasanya disambung dengan **が／けど**, bukan くて: 「安[やす]いですが、おいしくないです」 lebih alami daripada 「安[やす]くて、おいしくないです」.'
      ],
      kw: 'kata sifat い くて くなくて menyambung dan murah enak よくて sebab alasan 安くておいしい 広くてきれい'
    },
    {
      name: 'V-てみます',
      short: 'V-てみます',
      arti: 'Mencoba melakukan V',
      inti: 'Pakai ini untuk **mencoba melakukan sesuatu** supaya **tahu／merasakan** bagaimana hasilnya: **“coba makan”, “coba pakai”, “coba pergi”**.',
      rumus: [['V-て', '+', '=みます']],
      rumusNote: 'V-てみたいです (ingin mencoba, bab 10) · V-てみました (sudah mencoba) · V-てみてください (silakan coba) · V-てみましょう (ayo coba)',
      tabel: [{
        judul: 'Contoh V-てみます',
        kepala: ['V', 'V-てみます', 'Arti'],
        baris: [
          ['食[た]べる', '食[た]べてみます', 'mencoba makan／mencicipi'],
          ['飲[の]む', '飲[の]んでみます', 'mencoba minum'],
          ['着[き]る', '着[き]てみます', 'mencoba memakai (baju)'],
          ['行[い]く', '行[い]ってみます', 'mencoba pergi／mampir'],
          ['作[つく]る', '作[つく]ってみます', 'mencoba membuat']
        ]
      }],
      jelas: [
        '**V-てみます** = melakukan V **sebagai percobaan**, untuk **tahu／merasakan** bagaimana hasilnya. Cocok untuk makanan, pakaian, tempat, atau cara baru yang belum pernah kamu coba.',
        'Bentuknya: **V-て** + **みます**. Perubahan kala dan sopan–tidak sopan hanya pada みます: V-てみます／V-てみました／V-てみません.',
        'Contoh: 「この料理[りょうり]、{食[た]べてみます}」 = “Saya coba makan masakan ini”. Untuk menyarankan: 「食[た]べて{みてください}」 = “Silakan coba makan”. Untuk mengajak: 「食[た]べて{みましょう}」 = “Ayo kita coba makan”.',
        'Bandingkan dengan bab 10: **V-てみたいです** = **ingin** mencoba (keinginan), **V-てみます** = **akan／mau** mencoba (keputusan).'
      ],
      contoh: [
        { jp: 'このお菓子[かし]、ちょっと{食[た]べてみます}。', id: 'Kue ini, saya coba makan sedikit.' },
        { jp: 'A：このカレー、辛[から]いですよ。\nB：じゃあ、ちょっと{食[た]べてみます}。', id: 'A: Kari ini pedas lho.\nB: Kalau begitu, saya coba sedikit.' },
        { jp: '日本[にほん]のお茶[ちゃ]を{飲[の]んでみました}。おいしかったです。', id: 'Saya mencoba minum teh Jepang. Enak.' },
        { jp: 'すみません、この服[ふく]を着[き]{てみたいんですが}…。', id: 'Permisi, saya ingin mencoba baju ini …' },
        { jp: '今度[こんど]の休[やす]みに、京都[きょうと]に{行[い]ってみます}。', id: 'Libur nanti, saya akan coba pergi ke Kyoto.' },
        { jp: '私[わたし]も、{作[つく]ってみます}。レシピを教[おし]えてください。', id: 'Saya juga akan coba membuatnya. Tolong beri tahu resepnya.' }
      ],
      awas: [
        'Pakai bentuk **て**: ×食[た]べるみます／×食[た]べますみます → ○食[た]べ**て**みます.',
        'みます di sini ditulis dengan **hiragana**. 見[み]ます berarti “melihat”, sedangkan V-てみます berarti “mencoba V”.',
        'V-てみます artinya **mencoba untuk tahu／merasakan**, bukan “berusaha sekuat tenaga”. Untuk “berusaha keras” pakai 頑張[がんば]ります.'
      ],
      kw: 'coba mencoba mencicipi V-てみます 食べてみます 着てみます 行ってみます 作ってみます'
    },
    {
      name: '自動詞[じどうし] ・ 他動詞[たどうし]',
      short: '自動詞[じどうし]・他動詞[たどうし]',
      arti: 'Kata kerja “terjadi sendiri” dan “dilakukan seseorang”',
      inti: 'Banyak kata kerja Jepang **berpasangan**. **自動詞[じどうし]** menyatakan **sesuatu terjadi／berubah** (biasanya **Nが**), sedangkan **他動詞[たどうし]** menyatakan **seseorang dengan sengaja melakukan sesuatu pada N** (biasanya **Nを**).',
      rumus: [['N', '=が', '自動詞[じどうし]'], ['N', '=を', '他動詞[たどうし]']],
      rumusNote: '自動詞[じどうし] = kejadian／perubahan (fokus pada kejadiannya, bukan pelakunya) · 他動詞[たどうし] = ada yang sengaja berbuat pada N (pelaku boleh tidak disebut)',
      tabel: [{
        judul: 'Pasangan yang sering dipakai (tiga baris pertama = tema masakan bab ini)',
        kepala: ['Arti', '自動詞[じどうし] (Nが)', '他動詞[たどうし] (Nを)'],
        baris: [
          ['masuk／berisi ／ memasukkan', '入[はい]ります', '入[い]れます'],
          ['matang dipanggang ／ memanggang', '焼[や]けます', '焼[や]きます'],
          ['matang direbus ／ merebus', '煮[に]えます', '煮[に]ます'],
          ['terbuka ／ membuka', '開[あ]きます', '開[あ]けます'],
          ['tertutup ／ menutup', '閉[し]まります', '閉[し]めます'],
          ['menyala ／ menyalakan', 'つきます', 'つけます'],
          ['padam ／ memadamkan', '消[き]えます', '消[け]します'],
          ['keluar ／ mengeluarkan', '出[で]ます', '出[だ]します'],
          ['mulai ／ memulai', '始[はじ]まります', '始[はじ]めます'],
          ['berhenti ／ menghentikan', '止[と]まります', '止[と]めます'],
          ['jatuh ／ menjatuhkan', '落[お]ちます', '落[お]とします'],
          ['rusak ／ merusak', '壊[こわ]れます', '壊[こわ]します']
        ]
      }],
      jelas: [
        '**自動詞[じどうし]** = kata kerja yang menyatakan **sesuatu terjadi atau berubah dengan sendirinya**, tanpa menyebut pelaku. Biasanya dipakai dengan **が**: 「ドア{が開[あ]きます}」 = “Pintunya terbuka”.',
        '**他動詞[たどうし]** = kata kerja yang menyatakan **seseorang dengan sengaja melakukan sesuatu pada N** (pelakunya boleh tidak disebut). Biasanya dipakai dengan **を**: 「ドア{を開[あ]けます}」 = “(Saya) membuka pintu”.',
        'Banyak kata kerja berpasangan dengan bentuk yang mirip tetapi arti berbeda. Tema masakan: 入[はい]る／入[い]れる, 焼[や]ける／焼[や]く, 煮[に]える／煮[に]る. Di sekitar rumah: 開[あ]く／開[あ]ける, 閉[し]まる／閉[し]める, つく／つける, 消[き]える／消[け]す. Hafalkan **sepasang-sepasang** bersama partikelnya.',
        'Untuk **meminta atau melakukan sesuatu** pakai 他動詞[たどうし]: 「窓[まど]{を開[あ]けて}ください」 = “Tolong buka jendela”. Untuk **melaporkan keadaan／masalah** pakai 自動詞[じどうし]: 「窓[まど]{が開[あ]きません}」 = “Jendelanya tidak terbuka”.',
        'Bentuk て dari 自動詞[じどうし] ＋ います menyatakan **keadaan** secara objektif: 「このスープには、野菜[やさい]が{入[はい]っています}」 = “Di dalam sup ini ada sayur”. Bandingkan 他動詞[たどうし]: 「スープに、野菜[やさい]を{入[い]れます}」 = “(Saya) memasukkan sayur ke dalam sup (dengan sengaja)”.'
      ],
      contoh: [
        { jp: 'このカレーには、じゃがいもが{入[はい]っています}。', id: 'Di dalam kari ini ada kentang.' },
        { jp: 'カレーに、にんじんを{入[い]れます}。', id: 'Ke dalam kari, saya memasukkan wortel.' },
        { jp: 'ケーキが{焼[や]けました}。お茶[ちゃ]を飲[の]みましょう。', id: 'Kuenya sudah matang. Ayo minum teh.' },
        { jp: 'A：晩[ばん]ご飯[はん]は、何[なに]を作[つく]りますか。\nB：魚[さかな]を{焼[や]きます}。', id: 'A: Makan malamnya mau masak apa?\nB: Saya akan memanggang ikan.' },
        { jp: 'もうすぐ、大根[だいこん]が{煮[に]えます}よ。', id: 'Sebentar lagi lobaknya matang (rebusannya) lho.' },
        { jp: '大根[だいこん]を、30分[さんじゅっぷん]ぐらい{煮[に]ます}。', id: 'Lobaknya direbus sekitar 30 menit.' },
        { jp: 'すみません、窓[まど]を{開[あ]けて}もらえませんか。', id: 'Permisi, bisakah tolong buka jendela?' },
        { jp: '電気[でんき]が{つきません}。', id: 'Lampunya tidak menyala.' },
        { jp: '暑[あつ]いですね。エアコンを{つけましょうか}。', id: 'Panas ya. Mau saya nyalakan AC?' },
        { jp: 'A：映画[えいが]は、何時[なんじ]に{始[はじ]まります}か。\nB：7時[しちじ]に{始[はじ]まります}よ。', id: 'A: Filmnya mulai jam berapa?\nB: Mulai jam 7 lho.' }
      ],
      awas: [
        'Jangan tertukar partikel: ×電気[でんき]をつきます → ○電気[でんき]**が**つきます／○電気[でんき]**を**つけます.',
        'Ada kecenderungan bentuk (開[あ]く／開[あ]ける, 始[はじ]まる／始[はじ]める, 消[き]える／消[け]す), tetapi banyak pengecualian, jadi hafalkan sepasang-sepasang.',
        'Tidak semua kata kerja punya pasangan: 食[た]べる, 飲[の]む, 行[い]く, 来[く]る tidak punya. (行[い]く dan 来[く]る tetap 自動詞[じどうし] walau pelakunya orang, karena tidak ada benda yang dikenai tindakan dengan を.)',
        'Kalau ragu, tanya diri sendiri: “Ada **benda yang dikenai tindakan** (Nを)?” Ada → 他動詞[たどうし]; tidak ada → 自動詞[じどうし] (Nが, atau tanpa N).'
      ],
      kw: '自動詞 他動詞 intransitif transitif pasangan 開く 開ける 閉まる 閉める つく つける 消える 消す 入る 入れる 焼ける 焼く 煮える 煮る 出る 出す 始まる 始める 止まる 止める 落ちる 落とす 壊れる 壊す'
    },
    {
      name: 'イA-くないですか？',
      short: 'イA-くないですか？',
      arti: 'Tidak … kah? (mengecek perasaan lawan bicara)',
      inti: 'Pakai ini untuk **menanyakan perasaan lawan bicara** dengan penuh perhatian: **“tidak terlalu pedas?”, “tidak dingin?”**. Bentuknya pertanyaan **negatif** dari イA.',
      rumus: [['イA-い', '→', 'イA-', '=くないですか', '=？']],
      rumusNote: 'Jawab dengan isi kalimat: 大丈夫[だいじょうぶ]です ／ ちょっと～です',
      tabel: [{
        judul: 'Tanya dan jawab yang sering dipakai',
        kepala: ['Tanya', 'Jawab (tidak masalah)', 'Jawab (ada masalah)'],
        baris: [
          ['辛[から]くないですか？', '大丈夫[だいじょうぶ]です', 'ちょっと辛[から]いです'],
          ['寒[さむ]くないですか？', '大丈夫[だいじょうぶ]です', 'ちょっと寒[さむ]いです'],
          ['重[おも]くないですか？', '大丈夫[だいじょうぶ]です', 'ちょっと重[おも]いです'],
          ['熱[あつ]くないですか？', '大丈夫[だいじょうぶ]です', 'ちょっと熱[あつ]いです']
        ]
      }],
      jelas: [
        '**イA-くないですか？** = “apakah **tidak** …?” Walau bentuknya negatif, biasanya bukan menanyakan fakta, melainkan **mengecek perasaan lawan bicara**: “Jangan-jangan terlalu pedas (untukmu)?”. Ini cara halus untuk menunjukkan **perhatian**.',
        'Cara membentuk: イA **～い → ～くないですか？** (辛[から]い → 辛[から]{くないですか}？). Intonasi naik di akhir kalimat.',
        'Dipakai ketika **menawarkan makanan／minuman** atau **melihat orang yang mungkin kesulitan**: 「このカレー、{辛[から]くないですか}？」 (pada tamu), 「その荷物[にもつ]、{重[おも]くないですか}？」 (pada orang yang membawa barang berat).',
        'Menjawab: pakai **isi** kalimat, bukan hanya はい／いいえ: ○大丈夫[だいじょうぶ]です (tidak masalah) ／ ○ちょっと辛[から]いです (agak pedas) ／ ○全然[ぜんぜん]辛[から]くないです (sama sekali tidak pedas). はい／いいえ pada pertanyaan negatif mudah menimbulkan salah paham.',
        'Bandingkan: 「辛[から]いですか？」 hanya menanyakan **fakta** (pedas atau tidak). 「辛[から]くないですか？」 menunjukkan **kekhawatiran／perhatian** (“jangan-jangan terlalu pedas?”).'
      ],
      contoh: [
        { jp: 'A：このカレー、{辛[から]くないですか}？\nB：大丈夫[だいじょうぶ]です。おいしいです。', id: 'A: Kari ini tidak terlalu pedas?\nB: Tidak apa-apa. Enak.' },
        { jp: 'A：その荷物[にもつ]、{重[おも]くないですか}？\nB：ちょっと重[おも]いです。\nA：手伝[てつだ]いましょうか。', id: 'A: Barang itu tidak berat?\nB: Agak berat.\nA: Mau saya bantu?' },
        { jp: 'A：エアコン、{寒[さむ]くないですか}？\nB：大丈夫[だいじょうぶ]です。ありがとうございます。', id: 'A: ACnya, tidak dingin?\nB: Tidak apa-apa. Terima kasih.' },
        { jp: 'A：このスープ、{熱[あつ]くないですか}？\nB：少[すこ]し熱[あつ]いです。気[き]をつけます。', id: 'A: Sup ini tidak panas?\nB: Sedikit panas. Saya akan hati-hati.' },
        { jp: 'A：この靴[くつ]、{小[ちい]さくないですか}？\nB：ちょうどいいです。', id: 'A: Sepatu ini tidak kekecilan?\nB: Pas.' },
        { jp: '窓[まど]を閉[し]めましたが、{暑[あつ]くないですか}？', id: 'Jendelanya sudah saya tutup, tapi tidak panas?' }
      ],
      awas: [
        'Jangan menjawab hanya dengan はい／いいえ, karena artinya mudah terbalik (cara menjawab pertanyaan negatif dengan はい／いいえ dibahas di bab 13). Jawab dengan isi: 「大丈夫[だいじょうぶ]です」「ちょっと辛[から]いです」.',
        'Dipakai untuk hal yang **mungkin mengganggu** lawan bicara (pedas, panas, dingin, berat, kecil, mahal). Untuk sifat yang bagus seperti おいしい／いい, 「おいしくないですか？」 bisa terdengar seperti menebak bahwa rasanya tidak enak, jadi di tahap ini pakai untuk hal yang mengganggu saja.',
        'Perhatikan か di akhir: 辛[から]くないですか？ = bertanya; 辛[から]くないです。 = “tidak pedas”.'
      ],
      kw: 'tidak kah pertanyaan negatif perhatian khawatir 辛くないですか 寒くないですか 重くないですか 大丈夫 mengecek perasaan'
    }
  ]
});
