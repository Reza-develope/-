// ===== quiz-data.js — DATABASE soal Mode Pilihan Ganda (mcFlashcardData) =====
// Taruh/edit soal baru di sini. Jangan dihapus, dipakai oleh js/quiz.js

        const mcFlashcardData = {
            kanji_n5: [
  { question: "にほんごがっこう", correct: "日本語学校", wrong: ["日本学校", "日本語学行", "日木語学校"] },
  { question: "こうこう", correct: "高校", wrong: ["高交", "校高", "高校う"] },
  { question: "じょうず", correct: "上手", wrong: ["上下", "手上", "上手い"] },
  { question: "かん", correct: "間", wrong: ["問", "門", "聞"] },
  { question: "じぶん", correct: "自分", wrong: ["目分", "自文", "白分"] },
  { question: "だいがく", correct: "大学", wrong: ["大字", "学大", "犬学"] },
  { question: "べんきょう", correct: "勉強", wrong: ["免強", "勉京", "強勉"] },
  { question: "かんたん", correct: "簡単", wrong: ["簡短", "間単", "簡旦"] },
  { question: "むずかしい", correct: "難しい", wrong: ["灘しい", "難かしい", "難し"] },
  { question: "にている", correct: "似ている", wrong: ["以ている", "似でいる", "似て居る"] },
  { question: "ちがう", correct: "違う", wrong: ["達う", "遠う", "違える"] },
  { question: "とくい", correct: "得意", wrong: ["特意", "徳意", "得異"] },
  { question: "にがて", correct: "苦手", wrong: ["若手", "苦守", "苦者"] },
  { question: "ぶんぽう", correct: "文法", wrong: ["文章", "文学", "文方"] },
  { question: "はつおん", correct: "発音", wrong: ["発売", "発言", "発声"] },
  { question: "もじ", correct: "文字", wrong: ["文宇", "文字列", "文子"] },
  { question: "かんじ", correct: "漢字", wrong: ["感じ", "漢学", "漢寺"] },
  { question: "かいわ", correct: "会話", wrong: ["会話す", "会詰", "会読"] },
  { question: "おぼえる", correct: "覚える", wrong: ["党える", "覚る", "学える"] },
  { question: "おしえる", correct: "教える", wrong: ["数える", "教る", "数える"] },
  { question: "じしょ", correct: "辞書", wrong: ["字書", "辞典", "辞暑"] },
  { question: "かす", correct: "貸す", wrong: ["貨す", "賃す", "貸し"] },
  { question: "みせる", correct: "見せる", wrong: ["看せる", "見える", "視せる"] },
  { question: "せつめいする", correct: "説明する", wrong: ["説名する", "説明します", "設明する"] },
  { question: "かみ", correct: "紙", wrong: ["神", "髪", "低"] },
  { question: "かく", correct: "書く", wrong: ["描く", "書ける", "書き"] },
  { question: "いう", correct: "言う", wrong: ["話す", "語る", "言える"] },
  { question: "かた", correct: "方", wrong: ["形", "向", "万"] },
  { question: "しょるい", correct: "書類", wrong: ["書顔", "資料", "書数"] },
  { question: "きょうかしょ", correct: "教科書", wrong: ["教料書", "教科本", "教材書"] },
  { question: "じしん", correct: "自信", wrong: ["自身", "自慎", "白信"] },
  { question: "れんしゅう", correct: "練習", wrong: ["練集", "練修", "練習う"] },
  { question: "さがす", correct: "探す", wrong: ["捜す", "採す", "探し"] },
  { question: "なんかいも", correct: "何回も", wrong: ["何度も", "何会も", "何階も"] },
  { question: "きょうしつ", correct: "教室", wrong: ["教屋", "教事", "教室う"] },
  { question: "むりょう", correct: "無料", wrong: ["無科", "無料う", "無費"] },
  { question: "せんせい", correct: "先生", wrong: ["先生", "先生い", "学生"] },
  { question: "ちえ", correct: "知恵", wrong: ["智慧", "知思", "知識"] },
  { question: "はいしゃくする", correct: "拝借する", wrong: ["拝貸する", "借用する", "排借する"] },
  { question: "けんさく", correct: "検索", wrong: ["検察", "検索", "検索す"] },
  { question: "しつもん", correct: "質問", wrong: ["質門", "質問する", "問質"] },
  { question: "そうだん", correct: "相談", wrong: ["相談", "相談する", "相談者"] }
            ],
            kanji_n5_p2: [ 
  { "question": "アニメ [ ] にほんごを べんきょうしました。", "correct": "で", "wrong": ["を", "に", "が"] },
  { "question": "Apa fungsi partikel 「で」 dalam kalimat 「ネットでべんきょうしました」?", "correct": "Menunjukkan cara atau metode", "wrong": ["Menunjukkan tempat kegiatan", "Menunjukkan waktu", "Menunjukkan arah tujuan"] },
  { "question": "にほんごは [ ] が むずかしいです。", "correct": "もじ", "wrong": ["もじを", "もじは", "もじに"] },
  { "question": "にほんごは [ ] が たいへんです。", "correct": "はなすの", "wrong": ["はなす", "はなします", "はなして"] },
  { "question": "ひらがなは すきです。[ ] は にがてです。", "correct": "カタカナ", "wrong": ["カタカナが", "カタカナを", "カタカナも"] },
  { "question": "にほんごを チェックして [ ] ？", "correct": "もらえませんか", "wrong": ["ください", "ますか", "ましょうか"] },
  { "question": "Bagaimana cara bertanya 'bagaimana cara belajar' secara khusus?", "correct": "どうやって", "wrong": ["どこで", "なにで", "いつ"] },
  { "question": "この かんじの [ ] を おしえて もらえませんか？", "correct": "よみかた", "wrong": ["よむかた", "よみますかた", "よんでかた"] },
  { "question": "えいごは [ ] が かんたんです。", "correct": "ぶんぽう", "wrong": ["ぶんぽうを", "ぶんぽうは", "ぶんぽうに"] },
  { "question": "あたらしい きょうかしょを [ ] もらえませんか？", "correct": "みせて", "wrong": ["みせ", "みせる", "みした"] },
  { "question": "じしょの [ ] を おしえて ください。", "correct": "つかいかた", "wrong": ["つかいますかた", "つかってかた", "つかえかた"] },
  { "question": "タイごは もじを [ ] のが むずかしいです。", "correct": "おぼえる", "wrong": ["おぼえて", "おぼえます", "おぼえ"] },
  { "question": "にほんごは、よむのは むずかしいです。[ ]、かいわは とくいです。", "correct": "でも", "wrong": ["そして", "だから", "それで"] },
  { "question": "Apa bentuk Masu dari 'Cara Menulis' (Kakikata)?", "correct": "かきます", "wrong": ["かくます", "かいてます", "かいたます"] },
  { "question": "アプリ [ ] べんきょうしました。", "correct": "で", "wrong": ["を", "が", "は"] },
  { "question": "Manakah yang lebih halus untuk meminta bantuan?", "correct": "〜てもらえませんか", "wrong": ["〜てください", "〜なさい", "〜て"] },
  { "question": "にほんごの いい れんしゅうの [ ] が ありますか？", "correct": "しかた", "wrong": ["しするかた", "しのかた", "するのかた"] },
  { "question": "にほんごがっこう [ ] べんきょうしました。", "correct": "で", "wrong": ["を", "に", "へ"] },
  { "question": "えいごは たんごを おぼえる [ ] たいへんです。", "correct": "のが", "wrong": ["は", "を", "に"] },
  { "question": "この かんじを [ ] もらえませんか？", "correct": "かいて", "wrong": ["かき", "かく", "かいた"] },
  { "question": "ひらがな [ ] すきです。カタカナは にがてです。", "correct": "は", "wrong": ["が", "を", "の"] },
  { "question": "せんせい、せつめい [ ] もらえませんか？", "correct": "して", "wrong": ["し", "する", "した"] },
  { "question": "バス [ ] かいしゃに いきます。", "correct": "で", "wrong": ["を", "に", "が"] },
  { "question": "にほんごは [ ] が とくいですか？", "correct": "なに", "wrong": ["どこ", "いつ", "だれ"] },
  { "question": "ごはんの [ ] を おしえて ください。", "correct": "たべかた", "wrong": ["たべるかた", "たべてかた", "たべますかた"] },
  { "question": "ほん [ ] べんきょうしました。", "correct": "で", "wrong": ["を", "が", "に"] },
  { "question": "がっこうへの [ ] を おしえて もらえませんか？", "correct": "いきかた", "wrong": ["いくかた", "いってかた", "いきますかた"] },
  { "question": "にほんごは はつおん [ ] むずかしいです。", "correct": "が", "wrong": ["を", "に", "で"] },
  { "question": "ちょっと じしょを [ ] もらえませんか？", "correct": "かして", "wrong": ["かし", "かす", "かした"] },
  { "question": "にほんごは ぶんぽうは かんたんです。[ ] かんじは むずかしいです。", "correct": "でも", "wrong": ["それで", "そして", "だから"] }
             ],
            Irodori_A2_10: [ 
  {
    "question": "「ようび」の正しい漢字はどれですか？",
    "correct": "曜日",
    "wrong": ["躍日", "曜目", "燿日"]
  },
  {
    "question": "「じかん」の正しい漢字はどれですか？",
    "correct": "時間",
    "wrong": ["侍間", "寺間", "待間"]
  },
  {
    "question": "「ひよう」の正しい漢字は？",
    "correct": "費用",
    "wrong": ["費要", "買用", "費角"]
  },
  {
    "question": "「毎月」の正しい読み方は？(Dalam konteks jadwal rutin)",
    "correct": "まいつき",
    "wrong": ["まいげつ", "まいがつ", "まいにち"]
  },
  {
    "question": "「こうみんかん」の正しい漢字は？",
    "correct": "公民館",
    "wrong": ["公民菅", "交民館", "公明館"]
  },
  {
    "question": "「といあわせ」の正しい漢字は？",
    "correct": "問い合わせ",
    "wrong": ["伺い合わせ", "間い合わせ", "向い合わせ"]
  },
  {
    "question": "「しゅん」の正しい漢字はどれ？",
    "correct": "旬",
    "wrong": ["匂", "句", "殉"]
  },
  {
    "question": "「あじわう」の正しい漢字は？",
    "correct": "味わう",
    "wrong": ["昧わう", "呼わう", "吸わう"]
  },
  {
    "question": "「ちょうりしつ」の正しい漢字は？",
    "correct": "調理室",
    "wrong": ["調査室", "調里室", "訓理室"]
  },
  {
    "question": "「かく」の正しい漢字は？(Contoh: __自)",
    "correct": "各",
    "wrong": ["名", "客", "洛"]
  },
  {
    "question": "「せんちゃく」の正しい漢字は？",
    "correct": "先着",
    "wrong": ["先看", "失着", "先若"]
  },
  {
    "question": "「しょどう」の正しい漢字は？",
    "correct": "書道",
    "wrong": ["晝道", "書首", "筆道"]
  },
  {
    "question": "「日時」の正しい読み方は？",
    "correct": "にちじ",
    "wrong": ["にちとき", "ひじ", "ひとき"]
  },
  {
    "question": "「がいこくじんむけ」の正しい漢字は？",
    "correct": "外国人向け",
    "wrong": ["外国人向げ", "外国人村け", "外国人同け"]
  },
  {
    "question": "「たいけんきょうしつ」の正しい漢字は？",
    "correct": "体験教室",
    "wrong": ["休験教室", "体険教室", "体驗教室"]
  },
  {
    "question": "「みにつける」の正しい漢字は？",
    "correct": "身につける",
    "wrong": ["見につける", "自につける", "耳につける"]
  },
  {
    "question": "「どうぐ」の正しい漢字は？",
    "correct": "道具",
    "wrong": ["道貝", "導具", "首具"]
  },
  {
    "question": "「けんがく」の正しい漢字は？",
    "correct": "見学",
    "wrong": ["貝学", "見覚", "視学"]
  },
  {
    "question": "「もうしこみ」の正しい漢字は？",
    "correct": "申し込み",
    "wrong": ["伸し込み", "押し込み", "神し込み"]
  },
  {
    "question": "「あいきどう」の正しい漢字は？",
    "correct": "合気道",
    "wrong": ["会気道", "今気道", "合気首"]
  },
  {
    "question": "「たいいくしつ」の正しい漢字は？",
    "correct": "体育室",
    "wrong": ["休育室", "体有室", "体育屋"]
  },
  {
    "question": "「どうぎ」の正しい漢字は？",
    "correct": "道着",
    "wrong": ["道看", "導着", "首着"]
  },
  {
    "question": "「ひつよう」の正しい漢字は？",
    "correct": "必要",
    "wrong": ["必用", "泌要", "心要"]
  },
  {
    "question": "「さいしょ」の正しい漢字は？",
    "correct": "最初",
    "wrong": ["最好", "撮初", "最処"]
  },
  {
    "question": "「きょうみ」の正しい漢字は？",
    "correct": "興味",
    "wrong": ["興未", "奥味", "挙味"]
  },
  {
    "question": "「ぜんぶ」の正しい漢字は？",
    "correct": "全部",
    "wrong": ["金部", "企部", "全陪"]
  },
  {
    "question": "「しょうかい」の正しい漢字は？",
    "correct": "紹介",
    "wrong": ["沼介", "招介", "紹会"]
  },
  {
    "question": "「ぼご」の正しい漢字は？",
    "correct": "母語",
    "wrong": ["毎語", "毋語", "母話"]
  },
  {
    "question": "「いみ」の正しい漢字は？",
    "correct": "意味",
    "wrong": ["意未", "意見", "異味"]
  },
  {
    "question": "「うごきやすい」の正しい漢字は？",
    "correct": "動きやすい",
    "wrong": ["働きやすい", "重きやすい", "勘きやすい"]
  }
            ],
            Irodori_A2_07: [
  {
    "question": "「えき」の正しい漢字はどれですか？",
    "correct": "駅",
    "wrong": ["駐", "験", "馳"]
  },
  {
    "question": "「うけつけ」の正しい漢字はどれですか？",
    "correct": "受付",
    "wrong": ["授付", "受附", "受府"]
  },
  {
    "question": "「かいしゃ」の正しい漢字はどれですか？",
    "correct": "会社",
    "wrong": ["合社", "会杜", "会車"]
  },
  {
    "question": "「もん」の正しい漢字はどれですか？",
    "correct": "門",
    "wrong": ["問", "間", "開"]
  },
  {
    "question": "「しゅうごう（する）」の正しい漢字はどれですか？",
    "correct": "集合",
    "wrong": ["習合", "集会", "集号"]
  },
  {
    "question": "「あんないする」の正しい漢字はどれですか？",
    "correct": "案内",
    "wrong": ["安内", "案外", "按内"]
  },
  {
    "question": "「まちあわせ」の正しい漢字はどれですか？",
    "correct": "待ち合わせ",
    "wrong": ["持ち合わせ", "待ち会わせ", "待ち合せ"]
  },
  {
    "question": "「はじまる」の正しい漢字はどれですか？",
    "correct": "始まる",
    "wrong": ["治まる", "台まる", "怠まる"]
  },
  {
    "question": "「～まえ」の正しい漢字はどれですか？",
    "correct": "前",
    "wrong": ["削", "剪", "煎"]
  },
  {
    "question": "「まちあわせする」の正しい漢字はどれですか？",
    "correct": "待ち合わせする",
    "wrong": ["持ち合わせする", "待ち会わせする", "待ち合せする"]
  },
  {
    "question": "「へいわ」の正しい漢字はどれですか？",
    "correct": "平和",
    "wrong": ["平話", "評和", "半和"]
  },
  {
    "question": "「とり」の正しい漢字はどれですか？",
    "correct": "鳥",
    "wrong": ["島", "烏", "鳴"]
  },
  {
    "question": "「ぞう」の正しい漢字はどれですか？",
    "correct": "像",
    "wrong": ["象", "橡", "増"]
  },
  {
    "question": "「それ、なんですか？」の「なん」の正しい漢字はどれですか？",
    "correct": "何",
    "wrong": ["荷", "河", "可"]
  },
  {
    "question": "「じこ」の正しい漢字はどれですか？",
    "correct": "事故",
    "wrong": ["自己", "事古", "事固"]
  },
  {
    "question": "「とまる」の正しい漢字はどれですか？",
    "correct": "止まる",
    "wrong": ["泊まる", "留まる", "停まる"]
  },
  {
    "question": "「れんらくする」の正しい漢字はどれですか？",
    "correct": "連絡",
    "wrong": ["運絡", "連路", "速絡"]
  },
  {
    "question": "「いまから」の正しい漢字はどれですか？",
    "correct": "今から",
    "wrong": ["令から", "会から", "合から"]
  },
  {
    "question": "「いそぐ」の正しい漢字はどれですか？",
    "correct": "急ぐ",
    "wrong": ["忌ぐ", "怠ぐ", "念ぐ"]
  },
  {
    "question": "「さきに」の正しい漢字はどれですか？",
    "correct": "先に",
    "wrong": ["洗に", "光に", "尖に"]
  },
  {
    "question": "「はじめる」の正しい漢字はどれですか？",
    "correct": "始める",
    "wrong": ["治める", "怠める", "姶める"]
  },
  {
    "question": "「みちにまよう」の正しい漢字はどれですか？",
    "correct": "道に迷う",
    "wrong": ["道に逃う", "道に述う", "道に送う"]
  },
  {
    "question": "「おくれる」の正しい漢字はどれですか？",
    "correct": "遅れる",
    "wrong": ["犀れる", "運れる", "遣れる"]
  },
  {
    "question": "「つく」の正しい漢字はどれですか？",
    "correct": "着く",
    "wrong": ["就く", "突く", "付く"]
  },
  {
    "question": "「だいじょうぶ（な）」の正しい漢字はどれですか？",
    "correct": "大丈夫",
    "wrong": ["大丈父", "大文夫", "太丈夫"]
  },
  {
    "question": "「じかん」の正しい漢字はどれですか？",
    "correct": "時間",
    "wrong": ["時聞", "特間", "時問"]
  },
  {
    "question": "「まつ」の正しい漢字はどれですか？",
    "correct": "待つ",
    "wrong": ["持つ", "侍つ", "特つ"]
  }
           ],
           Irodori_A2_08: [
  {
    "question": "「どうぶつえん」の正しい漢字はどれですか？",
    "correct": "動物園",
    "wrong": ["働物園", "動物圏", "動物薗"]
  },
  {
    "question": "「おしろ」の正しい漢字はどれですか？",
    "correct": "お城",
    "wrong": ["お坂", "お域", "お成"]
  },
  {
    "question": "「はくぶつかん」の正しい漢字はどれですか？",
    "correct": "博物館",
    "wrong": ["薄物館", "博物官", "博物間"]
  },
  {
    "question": "「やきゅう」の正しい漢字はどれですか？",
    "correct": "野球",
    "wrong": ["野求", "夜球", "野救"]
  },
  {
    "question": "「しみんたいいくかん」の正しい漢字はどれですか？",
    "correct": "市民体育館",
    "wrong": ["市民体育官", "市眠体育館", "市民休育館"]
  },
  {
    "question": "「しあい」の正しい漢字はどれですか？",
    "correct": "試合",
    "wrong": ["詩合", "試会", "試合い"]
  },
  {
    "question": "「たりない」の正しい漢字はどれですか？",
    "correct": "足りない",
    "wrong": ["定りない", "足らない", "促りない"]
  },
  {
    "question": "「むり（な）」の正しい漢字はどれですか？",
    "correct": "無理",
    "wrong": ["無利", "武理", "無裏"]
  },
  {
    "question": "「おかね」の正しい漢字はどれですか？",
    "correct": "お金",
    "wrong": ["お全", "お金銭", "お余"]
  },
  {
    "question": "「しょくじ」の正しい漢字はどれですか？",
    "correct": "食事",
    "wrong": ["食侍", "食持", "食事う"]
  },
  {
    "question": "「やすむ」の正しい漢字はどれですか？",
    "correct": "休む",
    "wrong": ["体む", "休すむ", "仮む"]
  },
  {
    "question": "「えいがかん」の正しい漢字はどれですか？",
    "correct": "映画館",
    "wrong": ["映両館", "映画官", "栄画館"]
  },
  {
    "question": "「スポーツてん」の正しい漢字はどれですか？",
    "correct": "スポーツ店",
    "wrong": ["スポーツ点", "スポーツ庖", "スポーツ広"]
  },
  {
    "question": "「なにか」の正しい漢字はどれですか？",
    "correct": "何か",
    "wrong": ["荷か", "河か", "可か"]
  },
  {
    "question": "「そのまえに」の正しい漢字はどれですか？",
    "correct": "その前に",
    "wrong": ["その削に", "その煎に", "その剪に"]
  },
  {
    "question": "「むずかしい」の正しい漢字はどれですか？",
    "correct": "難しい",
    "wrong": ["雑しい", "離しい", "難かしい"]
  },
  {
    "question": "「かんどうする」の正しい漢字はどれですか？",
    "correct": "感動する",
    "wrong": ["感働する", "感導する", "感動する する"]
  },
  {
    "question": "「てんらんかい」の正しい漢字はどれですか？",
    "correct": "展覧会",
    "wrong": ["展覧会い", "展観会", "展覧回"]
  },
  {
    "question": "「げんだい」の正しい漢字はどれですか？",
    "correct": "現代",
    "wrong": ["見代", "現台", "限代"]
  },
  {
    "question": "「さくひん」の正しい漢字はどれですか？",
    "correct": "作品",
    "wrong": ["昨品", "作晶", "作賓"]
  },
  {
    "question": "「ホラーえいが」の正しい漢字はどれですか？",
    "correct": "ホラー映画",
    "wrong": ["ホラー栄画", "ホラー映両", "ホラー影画"]
  },
  {
    "question": "「たいくつ（な）」の正しい漢字はどれですか？",
    "correct": "退屈",
    "wrong": ["退窟", "対屈", "退掘"]
  }
            ],
            Irodori_A2_11: [
  {
    "question": "「にく」の正しい漢字はどれですか？",
    "correct": "肉",
    "wrong": ["肌", "冈", "内"]
  },
  {
    "question": "「ぎゅうにく」の正しい漢字はどれですか？",
    "correct": "牛肉",
    "wrong": ["午肉", "牛肌", "牛内"]
  },
  {
    "question": "「ぶたにく」の正しい漢字はどれですか？",
    "correct": "豚肉",
    "wrong": ["豚肌", "豕肉", "豚内"]
  },
  {
    "question": "「とりにく」の正しい漢字はどれですか？",
    "correct": "鶏肉",
    "wrong": ["鳥肉", "鶏肌", "鶏内"]
  },
  {
    "question": "「さかな」の正しい漢字はどれですか？",
    "correct": "魚",
    "wrong": ["漁", "鯉", "焦"]
  },
  {
    "question": "「やきそば」の正しい漢字はどれですか？",
    "correct": "焼きそば",
    "wrong": ["焙きそば", "燒きそば", "焼そば"]
  },
  {
    "question": "「やきにく」の正しい漢字はどれですか？",
    "correct": "焼肉",
    "wrong": ["焙肉", "焼肌", "焼内"]
  },
  {
    "question": "「おかし」の正しい漢字はどれですか？",
    "correct": "お菓子",
    "wrong": ["お果子", "お菓了", "お菓孑"]
  },
  {
    "question": "「おちゃ」の正しい漢字はどれですか？",
    "correct": "お茶",
    "wrong": ["お荼", "お茉", "お余"]
  },
  {
    "question": "「おさけ」の正しい漢字はどれですか？",
    "correct": "お酒",
    "wrong": ["お洒", "お酉", "お酌"]
  },
  {
    "question": "「にほんしゅ」の正しい漢字はどれですか？",
    "correct": "日本酒",
    "wrong": ["日本洒", "日本酉", "日木酒"]
  },
  {
    "question": "「しょうちゅう」の正しい漢字はどれですか？",
    "correct": "焼酎",
    "wrong": ["焼酌", "焙酎", "焼酋"]
  },
  {
    "question": "「おさら」の正しい漢字はどれですか？",
    "correct": "お皿",
    "wrong": ["お血", "お盆", "お盤"]
  },
  {
    "question": "「ごみぶくろ」の正しい漢字はどれですか？",
    "correct": "ごみ袋",
    "wrong": ["ごみ帒", "ごみ俗", "ごみ裳"]
  },
  {
    "question": "「じゅんび」の正しい漢字はどれですか？",
    "correct": "準備",
    "wrong": ["準俻", "淮備", "準脩"]
  },
  {
    "question": "「もっていく」の正しい漢字はどれですか？",
    "correct": "持って行く",
    "wrong": ["待って行く", "侍って行く", "特って行く"]
  },
  {
    "question": "「てつだう」の正しい漢字はどれですか？",
    "correct": "手伝う",
    "wrong": ["手仁う", "手伝なう", "手云う"]
  },
  {
    "question": "「のみもの」の正しい漢字はどれですか？",
    "correct": "飲み物",
    "wrong": ["飮み物", "飲み者", "飲み物う"]
  },
  {
    "question": "「やく」の正しい漢字はどれですか？",
    "correct": "焼く",
    "wrong": ["燃く", "炒く", "焙く"]
  },
  {
    "question": "「やきとり」の正しい漢字はどれですか？",
    "correct": "焼き鳥",
    "wrong": ["焼き島", "焼き烏", "焼鳥き"]
  },
  {
    "question": "「しお」の正しい漢字はどれですか？",
    "correct": "塩",
    "wrong": ["監", "堪", "温"]
  },
  {
    "question": "「こうちゃ」の正しい漢字はどれですか？",
    "correct": "紅茶",
    "wrong": ["江茶", "紅荼", "紅菜"]
  },
  {
    "question": "「うる」の正しい漢字はどれですか？",
    "correct": "売る",
    "wrong": ["買る", "壳る", "売う"]
  },
  {
    "question": "「りょうほう」の正しい漢字はどれですか？",
    "correct": "両方",
    "wrong": ["両万", "面方", "両放"]
  },
  {
    "question": "「たまご」の正しい漢字はどれですか？",
    "correct": "卵",
    "wrong": ["卯", "卵う", "巣"]
  },
  {
    "question": "「らっかせい」の正しい漢字はどれですか？",
    "correct": "落花生",
    "wrong": ["洛花生", "落化生", "落花性"]
  },
  {
    "question": "「そばこ」の正しい漢字はどれですか？",
    "correct": "そば粉",
    "wrong": ["そば紛", "そば扮", "そば粉う"]
  },
  {
    "question": "「こむぎ」の正しい漢字はどれですか？",
    "correct": "小麦",
    "wrong": ["少麦", "小妻", "小麥"]
  },
  {
    "question": "「こむぎこ」の正しい漢字はどれですか？",
    "correct": "小麦粉",
    "wrong": ["小麦紛", "少麦粉", "小麦扮"]
  },
  {
    "question": "「にゅうせいひん」の正しい漢字はどれですか？",
    "correct": "乳製品",
    "wrong": ["乳制品", "乳製晶", "孚製品"]
  },
  {
    "question": "「ぎゅうにゅう」の正しい漢字はどれですか？",
    "correct": "牛乳",
    "wrong": ["午乳", "牛孚", "牛乱"]
  },
  {
    "question": "「ざいりょう」の正しい漢字はどれですか？",
    "correct": "材料",
    "wrong": ["材科", "村料", "材了"]
  },
  {
    "question": "「しょうひきげん」の正しい漢字はどれですか？",
    "correct": "消費期限",
    "wrong": ["消費期眼", "消費期恨", "消賓期限"]
  },
  {
    "question": "「はいっている」の正しい漢字はどれですか？",
    "correct": "入っている",
    "wrong": ["込っている", "人っている", "入って居る"]
  },
  {
    "question": "「きょうじゅうに」の正しい漢字はどれですか？",
    "correct": "今日中に",
    "wrong": ["今日仲に", "今曰中に", "令日中に"]
  },
  {
    "question": "「しょうひん」の正しい漢字はどれですか？",
    "correct": "商品",
    "wrong": ["商晶", "啇品", "商賓"]
  },
  {
    "question": "「にゅうせいぶん」の正しい漢字はどれですか？",
    "correct": "乳成分",
    "wrong": ["孚成分", "乳成介", "乳戚分"]
  },
  {
    "question": "「だいず」の正しい漢字はどれですか？",
    "correct": "大豆",
    "wrong": ["太豆", "大荳", "犬豆"]
  },
  {
    "question": "「めいしょう」の正しい漢字はどれですか？",
    "correct": "名称",
    "wrong": ["名秤", "各称", "名称う"]
  },
  {
    "question": "「げんざいりょうめい」の正しい漢字はどれですか？",
    "correct": "原材料名",
    "wrong": ["原村料名", "原材科名", "原材料各"]
  },
  {
    "question": "「さっきんほうほう」の正しい漢字はどれですか？",
    "correct": "殺菌方法",
    "wrong": ["殺菌方注", "殺菌万法", "殺困方法"]
  },
  {
    "question": "「ないようりょう」の正しい漢字はどれですか？",
    "correct": "内容量",
    "wrong": ["内容重", "内客量", "内容測"]
  },
  {
    "question": "「しょうみきげん」の正しい漢字はどれですか？",
    "correct": "賞味期限",
    "wrong": ["賞味期眼", "賞味期恨", "賞未期限"]
  },
  {
    "question": "「ほぞんほうほう」の正しい漢字はどれですか？",
    "correct": "保存方法",
    "wrong": ["保存方注", "保在方法", "保存万法"]
  },
  {
    "question": "「はんばいしゃ」の正しい漢字はどれですか？",
    "correct": "販売者",
    "wrong": ["販買者", "販売者う", "阪売者"]
  },
  {
    "question": "「ほんぴん」の正しい漢字はどれですか？",
    "correct": "本品",
    "wrong": ["本晶", "本賓", "木品"]
  },
  {
    "question": "「ふくまれる」の正しい漢字はどれですか？",
    "correct": "含まれる",
    "wrong": ["合まれる", "今まれる", "含れる"]
  },
  {
    "question": "「アレルギーぶっしつ」の正しい漢字はどれですか？",
    "correct": "アレルギー物質",
    "wrong": ["アレルギー物貭", "アレルギー物資", "アレルギー勿質"]
  },
  {
    "question": "「せいぞうしゃ」の正しい漢字はどれですか？",
    "correct": "製造者",
    "wrong": ["制造者", "製造者う", "製浩者"]
  },
  {
    "question": "「にじゅうななひんもく」の正しい漢字はどれですか？",
    "correct": "27品目",
    "wrong": ["27品且", "27晶目", "27品目う"]
  }
            ],
            Irodori_A2_12: [
  {
    "question": "「あじ」の正しい漢字はどれですか？",
    "correct": "味",
    "wrong": ["昧", "味う", "沫"]
  },
  {
    "question": "「あまい」の正しい漢字はどれですか？",
    "correct": "甘い",
    "wrong": ["甜い", "甘るい", "廿い"]
  },
  {
    "question": "「からい」の正しい漢字はどれですか？",
    "correct": "辛い",
    "wrong": ["幸い", "辛るい", "辛らい"]
  },
  {
    "question": "「にがい」の正しい漢字はどれですか？",
    "correct": "苦い",
    "wrong": ["若い", "苫い", "苦るい"]
  },
  {
    "question": "「おべんとう」の正しい漢字はどれですか？",
    "correct": "お弁当",
    "wrong": ["お弁富", "お辨当", "お升当"]
  },
  {
    "question": "「にわ」の正しい漢字はどれですか？",
    "correct": "庭",
    "wrong": ["廷", "延", "庁"]
  },
  {
    "question": "「たまごやき」の正しい漢字はどれですか？",
    "correct": "卵焼き",
    "wrong": ["卯焼き", "卵焙き", "卵焼",]
  },
  {
    "question": "「おこのみやき」の正しい漢字はどれですか？",
    "correct": "お好み焼き",
    "wrong": ["お好味焼き", "お好み焙き", "お妤み焼き"]
  },
  {
    "question": "「うめぼし」の正しい漢字はどれですか？",
    "correct": "梅干し",
    "wrong": ["海干し", "梅千し", "梅干うし"]
  },
  {
    "question": "「すきやき」の正しい漢字はどれですか？",
    "correct": "すき焼き",
    "wrong": ["すき焙き", "すき燒き", "すき焼"]
  },
  {
    "question": "「なま」の正しい漢字はどれですか？",
    "correct": "生",
    "wrong": ["圭", "牛", "産"]
  },
  {
    "question": "「おなかがいっぱい（な）」の「なか」の正しい漢字はどれですか？",
    "correct": "お腹",
    "wrong": ["お復", "お複", "お腸"]
  },
  {
    "question": "「にがて（な）」の正しい漢字はどれですか？",
    "correct": "苦手",
    "wrong": ["若手", "苫手", "苦季"]
  },
  {
    "question": "「ちゃわんむし」の正しい漢字はどれですか？",
    "correct": "茶碗蒸し",
    "wrong": ["茶椀蒸し", "茶碗蓋し", "茶碗蒸",]
  },
  {
    "question": "「ぎんなん」の正しい漢字はどれですか？",
    "correct": "銀杏",
    "wrong": ["銀否", "銀本", "根杏"]
  },
  {
    "question": "「いれる」の正しい漢字はどれですか？",
    "correct": "入れる",
    "wrong": ["込れる", "人れる", "入る"]
  },
  {
    "question": "「ちょうりほうほう」の正しい漢字はどれですか？",
    "correct": "調理方法",
    "wrong": ["調里方法", "調理万法", "調理方注"]
  },
  {
    "question": "「とりだす」の正しい漢字はどれですか？",
    "correct": "取り出す",
    "wrong": ["採り出す", "取り出だす", "取出す"]
  },
  {
    "question": "「ねっとう」の正しい漢字はどれですか？",
    "correct": "熱湯",
    "wrong": ["熱陽", "熱温", "熱満"]
  },
  {
    "question": "「そそぐ」の正しい漢字はどれですか？",
    "correct": "注ぐ",
    "wrong": ["注そぐ", "注く", "沖ぐ"]
  },
  {
    "question": "「おゆ」の正しい漢字はどれですか？",
    "correct": "お湯",
    "wrong": ["お陽", "お温", "お満"]
  },
  {
    "question": "「すてる」の正しい漢字はどれですか？",
    "correct": "捨てる",
    "wrong": ["拾てる", "舎てる", "捨る"]
  },
  {
    "question": "「まぜる」の正しい漢字はどれですか？",
    "correct": "混ぜる",
    "wrong": ["交ぜる", "混じる", "混る"]
  },
  {
    "question": "「うちがわ」の正しい漢字はどれですか？",
    "correct": "内側",
    "wrong": ["内則", "内測", "内偄"]
  },
  {
    "question": "「せん」の正しい漢字はどれですか？",
    "correct": "線",
    "wrong": ["綜", "緑", "縁"]
  },
  {
    "question": "「ゆきりぐち」の正しい漢字はどれですか？",
    "correct": "湯切り口",
    "wrong": ["湯切口", "陽切り口", "湯切りロ"]
  }
        ],
        IrodoriA2_bunpou_13: [
          { question: "会議室の電気が＿＿＿んですが……。（つく）", correct: "つかない", wrong: ["つきません", "つかなくて", "つかなかった"] },
  { question: "パソコンが＿＿＿んですが……。（動く）", correct: "動かない", wrong: ["動きません", "動けない", "動かなくて"] },
  { question: "窓が＿＿＿んですが……。（開く）", correct: "開かない", wrong: ["開けない", "開かなくて", "開きません"] },
  { question: "コーヒーマシーンから変な音が＿＿＿んですが……。（する）", correct: "する", wrong: ["します", "した", "しない"] },
  { question: "トイレットペーパーが＿＿＿んですが……。（なくなる）", correct: "なくなった", wrong: ["なくなる", "なくなります", "なくならない"] },
  { question: "コピーの紙が＿＿＿んですが……。（なくなる）", correct: "なくなった", wrong: ["なくなる", "なくなって", "なくなりました"] },
  { question: "コピー機、＿＿＿ことないですか？（使う）", correct: "使った", wrong: ["使う", "使わない", "使って"] },
  { question: "すみません、このやり方がよく＿＿＿んですが……。（わかる）", correct: "わからない", wrong: ["わかりません", "わかった", "わかる"] },
  { question: "ドアが＿＿＿んですが……。（閉まる）", correct: "閉まらない", wrong: ["閉まりません", "閉めない", "閉まった"] },
  { question: "あのう、エアコンが＿＿＿んですが……。（つく）", correct: "つかない", wrong: ["つきません", "つけない", "ついた"] },
    { question: "あと10分ぐらいで＿＿＿そうです。（終わる）", correct: "終わり", wrong: ["終わる", "終わった", "終わって"] },
  { question: "どのぐらい＿＿＿そうですか？（かかる）", correct: "かかり", wrong: ["かかる", "かかった", "かかって"] },
  { question: "1人で＿＿＿そうですか？（できる）", correct: "でき", wrong: ["できる", "できた", "できて"] },
  { question: "雨が＿＿＿そうです。（降る）", correct: "降り", wrong: ["降る", "降った", "降って"] },
  { question: "資料はもうすぐ＿＿＿そうです。（終わる）", correct: "終わり", wrong: ["終わる", "終わって", "終わった"] },
  { question: "このケーキ、とても＿＿＿そうです。（おいしい）", correct: "おいし", wrong: ["おいしい", "おいしくて", "おいしかった"] },
    { question: "拡大コピー＿＿＿とき、どうすればいいですか？（する）", correct: "したい", wrong: ["する", "した", "して"] },
  { question: "両面コピー＿＿＿とき、どうすればいいですか？（する）", correct: "したい", wrong: ["します", "した", "して"] },
  { question: "資料をコピー＿＿＿とき、どうすればいいですか？（する）", correct: "したい", wrong: ["する", "しました", "して"] },
  { question: "パソコンを＿＿＿とき、どうすればいいですか？（使う）", correct: "使いたい", wrong: ["使う", "使った", "使って"] },
  { question: "縮小コピー＿＿＿とき、どうすればいいですか？（する）", correct: "したい", wrong: ["する", "した", "して"] },
    { question: "このボタンを押す＿＿＿、コピーが始まります。", correct: "と", wrong: ["ので", "から", "ば"] },
  { question: "このスタートボタンを＿＿＿と、コピーが始まります。（押す）", correct: "押す", wrong: ["押して", "押した", "押します"] },
  { question: "このボタンを＿＿＿と、カラーコピーができます。（押す）", correct: "押す", wrong: ["押して", "押した", "押します"] },
  { question: "ここに手をかざす＿＿＿、水が流れます。", correct: "と", wrong: ["ので", "たら", "なら"] },
  { question: "このボタンを押すと、コピーが＿＿＿。（始まる）", correct: "始まります", wrong: ["始めます", "始まった", "始める"] },
    { question: "Ａ：コピー機、使ったことないですか？　Ｂ：＿＿＿、ないです。", correct: "はい", wrong: ["いいえ", "うん", "そうです"] },
  { question: "Ａ：この機械、前に使ったことないですか？　Ｂ：＿＿＿、一度もありません。", correct: "はい", wrong: ["いいえ", "そう", "うん"] },
  { question: "Ａ：この機械、前に使ったことないですか？　Ｂ：＿＿＿。私は前に一度使ったことがあります。", correct: "いいえ", wrong: ["はい", "そうです", "うん"] },
  { question: "Ａ：わからないこと、ある？　Ｂ：＿＿＿、ありません。", correct: "いえ", wrong: ["はい", "そうです", "うん"] },
        ],
        IrodoriA2_bunpou_14: [
          { question: "事故＿＿＿、電車が遅れています。（事故）", correct: "で", wrong: ["に", "から", "が"] },
  { question: "道が複雑＿＿＿、よくわかりません。（複雑）", correct: "で", wrong: ["くて", "な", "に"] },
  { question: "仕事が大変＿＿＿、疲れました。（大変）", correct: "で", wrong: ["くて", "の", "に"] },
  { question: "体の具合が＿＿＿、休みます。（悪い）", correct: "悪くて", wrong: ["悪いで", "悪くで", "悪って"] },
  { question: "昨日からせきが＿＿＿、これから病院に行きます。（ひどい）", correct: "ひどくて", wrong: ["ひどいで", "ひどくで", "ひどかった"] },
  { question: "道が＿＿＿、ぜんぜん動きません。（混んでいる）", correct: "混んでいて", wrong: ["混んで", "混んでいる", "混んでいた"] },
  { question: "熱が＿＿＿、会社を休みました。（ある）", correct: "あって", wrong: ["あります", "あった", "ある"] },
  { question: "昨日は、＿＿＿すみませんでした。（休む）", correct: "休んで", wrong: ["休みます", "休んだ", "休む"] },
  { question: "家に財布を忘れました。これから取りに帰ります。＿＿＿、少し遅れます。", correct: "それで", wrong: ["でも", "それに", "しかし"] },
  { question: "昨日から熱があります。＿＿＿、今日は1日休みたいんですが……。", correct: "それで", wrong: ["でも", "それに", "そして"] },
  { question: "事故がありました。＿＿＿、電車が遅れています。", correct: "それで", wrong: ["それに", "でも", "そして"] },
  { question: "道が混んでいます。＿＿＿、少し遅れそうです。", correct: "それで", wrong: ["でも", "それに", "しかし"] },
  { question: "あのう、ちょっと休憩＿＿＿？（する）", correct: "してもいいですか", wrong: ["します", "してください", "しています"] },
  { question: "トイレに行って＿＿＿？（来る）", correct: "来てもいいですか", wrong: ["来ました", "来ています", "来るんです"] },
  { question: "ちょっと飲み物を買って＿＿＿？（来る）", correct: "来てもいいですか", wrong: ["来ました", "来るんです", "来ています"] },
  { question: "外でたばこを吸って＿＿＿？（来る）", correct: "来てもいいですか", wrong: ["来ます", "来るんですが", "来ました"] },
  { question: "今、お祈りに行っ＿＿＿？（行く）", correct: "てもいいですか", wrong: ["たらいいですか", "たほうがいいですか", "てもいいでしょう"] },
  { question: "今から休憩。ちょっと外でたばこを吸っ＿＿＿？（吸う）", correct: "てもいいですか", wrong: ["てはいけません", "たほうがいいですか", "てもいいでしょう"] },
  { question: "明日の午後、早退し＿＿＿？（する）", correct: "てもいいでしょうか", wrong: ["てもいいですか", "たらいいでしょうか", "てはいけません"] },
  { question: "ちょっと質問し＿＿＿？（する）", correct: "てもいいでしょうか", wrong: ["てもいいですか", "ないでしょうか", "たいでしょうか"] },
  { question: "来月20日の月曜日、休みを取っ＿＿＿？（取る）", correct: "てもいいでしょうか", wrong: ["てもいいですか", "たらいいでしょうか", "たほうがいいでしょうか"] },
  { question: "社長、ちょっと、いい＿＿＿？", correct: "でしょうか", wrong: ["ですか", "ますか", "でした"] },
  { question: "ちょっと、役所に行か＿＿＿。（行く）", correct: "なければなりません", wrong: ["なくてもいいです", "ないでください", "なくないです"] },
  { question: "今日はガスの点検があって、午前中は家にい＿＿＿。（いる）", correct: "なければなりません", wrong: ["てもいいです", "ないでください", "ましょう"] },
  { question: "病院に行か＿＿＿んです。（行く）", correct: "なければならない", wrong: ["なくてもいい", "ないほうがいい", "なくてはだめだ"] },
  { question: "市役所に行か＿＿＿んです。（行く）", correct: "なければならない", wrong: ["なくてもいい", "ないほうがいい", "なくてはだめな"] },
  { question: "東京から、国の友だちが来る＿＿＿。", correct: "んです", wrong: ["んですが", "です", "んでした"] },
  { question: "病院に行かなければならない＿＿＿。", correct: "んです", wrong: ["んですが", "です", "でした"] },
  { question: "市役所に行かなければならない＿＿＿。", correct: "んです", wrong: ["んですが", "です", "んでした"] },
  { question: "Ａ：どうしましたか？　Ｂ：熱がある＿＿＿。今日は休みたいです。", correct: "んです", wrong: ["んですが", "です", "でした"] },
        ],
        IrodoriA2_bunpou_15: [
  { question: "昨日、道で転んで、足を＿＿＿んです。（くじく）", correct: "くじいた", wrong: ["くじきます", "くじかない", "くじいて"] },
  { question: "昨日の夜から、熱が38度5分＿＿＿んです。（ある）", correct: "ある", wrong: ["あった", "あります", "あって"] },
  { question: "せきがなかなか＿＿＿んです。もう1週間続いています。（止まる）", correct: "止まらない", wrong: ["止まります", "止まった", "止まりません"] },
  { question: "転んで、頭を＿＿＿んです。すごく痛いです。（ぶつける）", correct: "ぶつけた", wrong: ["ぶつけます", "ぶつけない", "ぶつけて"] },
  { question: "お腹が痛くて、吐き気が＿＿＿んです。（する）", correct: "する", wrong: ["します", "した", "して"] },
  { question: "のどがすごく＿＿＿。（痛い）", correct: "痛いんです", wrong: ["痛くてんです", "痛かったんです", "痛いですんです"] },
  { question: "すみません、ちょっと＿＿＿。急用ができました。（用事）", correct: "用事なんです", wrong: ["用事んです", "用事いんです", "用事ですんです"] },
  { question: "今日はどうしましたか。＿＿＿。（風邪）", correct: "風邪なんです", wrong: ["風邪んです", "風邪いんです", "風邪ですんです"] },
  { question: "熱がありますから、今日はお風呂に＿＿＿。（入る）", correct: "入らないでください", wrong: ["入りないでください", "入らないください", "入らないでくださる"] },
  { question: "薬を飲んだあと、＿＿＿ね。（運転する）", correct: "運転しないでください", wrong: ["運転しませんでください", "運転しないください", "運転しなくてください"] },
  { question: "風邪ですね。しばらく、激しい運動を＿＿＿。（する）", correct: "しないでください", wrong: ["しませんでください", "しないくてください", "してないでください"] },
  { question: "今週は仕事を休んで、できるだけ人に＿＿＿。（会う）", correct: "会わないでください", wrong: ["会いないでください", "会わないください", "会わなくてください"] },
  { question: "辛いものは、あまり＿＿＿。（食べる）", correct: "食べないでください", wrong: ["食べませんでください", "食べないくてください", "食べなくてください"] },
  { question: "インフルエンザですから、しばらく仕事に＿＿＿。（行く）", correct: "行かないでください", wrong: ["行きないでください", "行かないください", "行かなくてください"] },
  { question: "こちらは、せきを＿＿＿薬です。（抑える）", correct: "抑える", wrong: ["抑えます", "抑えた", "抑えて"] },
  { question: "これは、熱を＿＿＿お薬です。（下げる）", correct: "下げる", wrong: ["下げます", "下げた", "下げますお"] },
  { question: "これは、胃を＿＿＿薬です。いっしょに飲んでください。（守る）", correct: "守る", wrong: ["守ります", "守った", "守って"] },
  { question: "こちらは、くしゃみや鼻水を＿＿＿薬です。（抑える）", correct: "抑える", wrong: ["抑えます", "抑えている", "抑えました"] },
  { question: "これは、病原菌を＿＿＿お薬です。（抑える）", correct: "抑える", wrong: ["抑えます", "抑えた", "抑えました"] },
  { question: "1日1回、＿＿＿飲んでください。（寝る）", correct: "寝る前に", wrong: ["寝たあと", "寝る前で", "寝るまえで"] },
  { question: "（食後に飲む薬）この薬は、ご飯を＿＿＿飲んでください。（食べる）", correct: "食べたあと", wrong: ["食べる前に", "食べるあと", "食べた前に"] },
  { question: "家を＿＿＿、窓を閉めてください。（出る）", correct: "出る前に", wrong: ["出たあと", "出る前で", "出た前に"] },
  { question: "薬を＿＿＿、しばらく休んでください。（飲む）", correct: "飲んだあと", wrong: ["飲む前に", "飲んでいるあと", "飲んだ前に"] },
  { question: "（食前に飲む薬）この薬は、ご飯を＿＿＿飲んでください。（食べる）", correct: "食べる前に", wrong: ["食べたあと", "食べるあとで", "食べる前で"] },
  { question: "お風呂に＿＿＿、体温を測りました。（入る）", correct: "入る前に", wrong: ["入ったあと", "入る前で", "入った前に"] },
  { question: "高い熱が＿＿＿、この薬を飲んでください。（出る）", correct: "出たとき", wrong: ["出るとき", "出ているとき", "出ないとき"] },
  { question: "痛くてがまん＿＿＿、飲んでください。（できる）", correct: "できないとき", wrong: ["できるとき", "できたとき", "できているとき"] },
  { question: "＿＿＿は、温かくして、よく休んでください。（風邪）", correct: "風邪のとき", wrong: ["風邪とき", "風邪なとき", "風邪いとき"] },
  { question: "頭が＿＿＿、休んでください。（痛い）", correct: "痛いとき", wrong: ["痛かったとき", "痛くとき", "痛いのとき"] },
  { question: "せきが＿＿＿、この薬を飲んでください。（続く）", correct: "続くとき", wrong: ["続いたとき", "続きとき", "続いているとき"] },
  { question: "忙しい＿＿＿、電話しないでください。（忙しい）", correct: "忙しいとき", wrong: ["忙しかったとき", "忙しくとき", "忙しいなとき"] },
        ],
        partikel_penempatan_1: [
  { question: "わたし＿＿＿がくせいです。", correct: "は", wrong: ["が", "を", "に"], explanation: "「は」nandain topik kalimat. Di sini kita lagi ngenalin ‘watashi’ sebagai topik, bukan nekenin subjek baru (itu tugasnya「が」)." },
  { question: "あそこに人＿＿＿います。", correct: "が", wrong: ["は", "を", "に"], explanation: "「が」dipake bareng いる/ある buat nunjukin keberadaan sesuatu — ‘ada orang di sana’." },
  { question: "わたしはコーヒー＿＿＿のみます。", correct: "を", wrong: ["が", "に", "で"], explanation: "「を」nandain objek langsung dari kata kerja transitif kayak 飲む (minum sesuatu)." },
  { question: "まいばん11じ＿＿＿ねます。", correct: "に", wrong: ["で", "を", "へ"], explanation: "「に」nunjukin titik waktu yang spesifik, jawab pertanyaan ‘jam berapa’." },
  { question: "としょかん＿＿＿しゅくだいをします。", correct: "で", wrong: ["に", "を", "へ"], explanation: "「で」nandain tempat berlangsungnya suatu kegiatan (ngerjain PR di perpus), beda sama「に」yang nandain keberadaan/tujuan." },
  { question: "でんしゃ＿＿＿かいしゃへ行きます。", correct: "で", wrong: ["に", "を", "と"], explanation: "「で」di sini nunjukin alat/sarana transportasi yang dipakai (naik kereta)." },
  { question: "なつやすみに、おきなわ＿＿＿行きたいです。", correct: "へ", wrong: ["で", "を", "が"], explanation: "「へ」nunjukin arah tujuan perjalanan. （に juga bisa dipake di sini, tapi へ lebih nekenin ‘arah menuju’ ketimbang titik tujuannya persis.）" },
  { question: "ともだち＿＿＿えいがを見ました。", correct: "と", wrong: ["に", "で", "へ"], explanation: "「と」nandain orang yang nemenin ngelakuin sesuatu bareng-bareng (nonton film bareng temen)." },
  { question: "あしたは雨だ＿＿＿思います。", correct: "と", wrong: ["は", "に", "で"], explanation: "「と」dipake sebelum 思う/言う buat ngutip isi pikiran atau ucapan." },
  { question: "わたしも学生です。田中さん＿＿＿学生です。", correct: "も", wrong: ["は", "が", "を"], explanation: "「も」nunjukin ‘juga’, gantiin は/が pas infonya sama kayak kalimat sebelumnya." },
  { question: "すしもたべます。てんぷら＿＿＿たべます。", correct: "も", wrong: ["は", "が", "を"], explanation: "「も」nambahin hal yang sama (juga makan tempura, kayak sushi tadi)." },
  { question: "うち＿＿＿かいしゃまで、1じかんかかります。", correct: "から", wrong: ["まで", "に", "で"], explanation: "「から」nandain titik awal/asal (dari rumah), pasangan sama まで (sampai ke kantor)." },
  { question: "あめが降っています＿＿＿、かさを持って行きます。", correct: "から", wrong: ["まで", "けど", "し"], explanation: "「から」nandain alasan/sebab: ‘karena hujan turun, jadi bawa payung.’" },
  { question: "すみません、10じ＿＿＿まってください。", correct: "まで", wrong: ["から", "に", "で"], explanation: "「まで」nunjukin batas akhir waktu (‘tunggu sampai jam 10’)." },
  { question: "これはわたし＿＿＿ほんです。", correct: "の", wrong: ["は", "が", "を"], explanation: "「の」nyambungin dua kata benda buat nunjukin kepemilikan (‘buku milik saya’)." },
  { question: "つくえの上に本＿＿＿ノートがあります。", correct: "や", wrong: ["と", "か", "も"], explanation: "「や」dipake buat nyebutin beberapa contoh doang (bukan daftar lengkap), beda sama「と」yang nyebutin semua barangnya secara lengkap." },
  { question: "おかねが100円＿＿＿ありません。", correct: "しか", wrong: ["だけ", "も", "は"], explanation: "「しか」selalu diikutin bentuk negatif dan nekenin ‘cuma, gak lebih dari’ (cuma 100 yen doang)." },
  { question: "この教室に女性＿＿＿います。", correct: "だけ", wrong: ["しか", "も", "が"], explanation: "「だけ」artinya ‘cuma’ dan bisa dipake di kalimat positif, beda dari しか yang wajib diikutin bentuk negatif." },
  { question: "あさごはんは、パン＿＿＿ごはんを食べます。", correct: "か", wrong: ["や", "と", "も"], explanation: "「か」dipake buat milih salah satu di antara pilihan (roti atau nasi), beda dari と (dan, semuanya) atau や (dan lain-lain)." },
  { question: "だれ＿＿＿来ましたか。", correct: "が", wrong: ["は", "を", "に"], explanation: "「が」dipake pas nanyain subjek yang belum diketahui — ‘siapa yang datang’." },
  { question: "きょうしつ＿＿＿、たなかせんせいがいません。", correct: "には", wrong: ["では", "とは", "までは"], explanation: "には = に (tempat/waktu) + は (topik yang dikontraskan). ‘Di kelas (khususnya), pak Tanaka gak ada’ — nyiratin kontras sama tempat lain." },
  { question: "これは日本語＿＿＿ありません。えいごです。", correct: "では", wrong: ["には", "とは", "からは"], explanation: "では = で (penanda predikat kata benda) + は (topik). Dipake sebelum ありません buat negasiin kata benda (‘bukan bahasa Jepang’)." },
  { question: "たばこをすう＿＿＿、体に悪いです。", correct: "のは", wrong: ["には", "とは", "までは"], explanation: "のは = の (ngubah kata kerja jadi frasa benda) + は (topik). ‘Merokok (sebagai topik) buruk buat badan.’" },
  { question: "かんじ＿＿＿何ですか。", correct: "とは", wrong: ["には", "では", "までは"], explanation: "とは dipake pas nanyain definisi/arti sesuatu secara formal — ‘Kanji itu apa (sih)?’" },
  { question: "しゅくだいは、きんようび＿＿＿だしてください。", correct: "までに", wrong: ["までは", "までも", "までが"], explanation: "までに nunjukin batas waktu/deadline — harus kelar sebelum atau pas hari Jumat, beda sama まで doang yang artinya ‘terus-menerus sampai’." },
  { question: "わたしのかばんはつくえの下＿＿＿あります。", correct: "に", wrong: ["で", "を", "へ"], explanation: "「に」nunjukin lokasi keberadaan suatu benda (ada di bawah meja), dipake bareng ある/いる." },
  { question: "この電車は大阪＿＿＿とまりません。", correct: "にしか", wrong: ["にも", "までに", "とは"], explanation: "にしか = に (tempat) + しか (cuma, dgn bentuk negatif). ‘Kereta ini cuma berhenti di Osaka (gak di tempat lain).’" },
  { question: "わたしはケーキ＿＿＿好きじゃないです。", correct: "が", wrong: ["を", "は", "に"], explanation: "「が」dipake bareng kata sifat perasaan kayak 好き/きらい/欲しい buat nandain hal yang disuka/gak disuka." },
  { question: "スーパーへ牛乳＿＿＿買いに行きます。", correct: "を", wrong: ["に", "で", "が"], explanation: "「を」nandain objek dari 買う di dalam pola “V-masu + に行く” (pergi buat beli susu)." },
  { question: "あには東京＿＿＿すんでいます。", correct: "に", wrong: ["で", "を", "へ"], explanation: "「に」nandain tempat tinggal/keberadaan (tinggal di Tokyo), dipake bareng すむ." },
        ],
        shiken_bunpou_A2: [
          { question: "Dua teman akrab lagi ngobrol santai (bentuk futsuutai). Lengkapi balasannya: 久しぶり。＿＿＿？", correct: "元気？", wrong: ["元気です", "元気ですか"], explanation: "Ini obrolan santai (futsuutai) antar temen akrab, jadi cukup naikin nada tanya di akhir kata tanpa embel-embel ですか kayak basa formal. 元気ですか sama 元気です kedengeran kaku banget buat ngobrol sama temen deket." },
  { question: "Artinya: \"Sudah setahun sejak saya datang ke Jepang.\" Lengkapi: 日本に来て、＿＿＿になります。", correct: "1年", wrong: ["1年に", "1年の"], explanation: "Pola '~になります' buat nunjukin udah jadi sekian lama sejak suatu kejadian, langsung tempel angka+satuan waktu tanpa partikel tambahan (1年になります = 'udah jadi setahun'). Nambahin に atau の di sini malah bikin gramatikalnya salah." },
  { question: "Artinya: \"Saya bersekolah di sekolah kejuruan, belajar pemrograman.\" Lengkapi: 私は専門学校に＿＿＿。プログラミングを勉強しています。", correct: "通っています", wrong: ["通いました", "通います"], explanation: "~ています di sini nunjukin kebiasaan/rutinitas yang lagi berlangsung (masih sekolah sampai sekarang). 通いました itu udah selesai (lampau), 通います lebih ke kebiasaan umum/rencana ke depan doang, kurang pas buat 'saat ini lagi sekolah'." },

  // ===== BAB 2 =====
  { question: "Artinya: \"Hobi saya adalah menonton film.\" Lengkapi: 趣味は映画を見る＿＿＿です。", correct: "こと", wrong: ["の", "とき"], explanation: "こと dipake buat ngubah kata kerja jadi nomina abstrak pas lagi nyebutin definisi hobi secara formal ('hobiku adalah [nonton film]=koto'). とき artinya 'waktu/saat', jelas beda makna. の juga bisa nominalize tapi biasanya dipake buat hal yang dirasain langsung (liat No. 5), bukan definisi kayak gini." },
  { question: "Artinya: \"Saya suka main gim.\" Lengkapi: ゲームを＿＿＿好きです。", correct: "するのが", wrong: ["することが", "するのを"], explanation: "好き selalu pasangannya partikel が, jadi するのを langsung gugur. Antara の & こと, buat kegiatan konkret yang dirasain langsung (main game di depan mata), の lebih natural dipake dibanding こと yang lebih abstrak." },
  { question: "Artinya: \"Saya biasanya main bulu tangkis bersama teman di gedung olahraga.\" Lengkapi: 休みの日は、友だち＿＿＿体育館＿＿＿バドミントンをします。", correct: "と／で", wrong: ["に／を", "の／へ"], explanation: "と nandain 'bareng siapa' (temen), で nandain lokasi tempat aktivitas berlangsung (gedung olahraga). Kombinasi partikel lain nggak pas sama maksud kalimat ini." },

  // ===== BAB 3 =====
  { question: "Artinya: \"Pada musim semi, udara menjadi hangat.\" Lengkapi: 春は暖か＿＿＿なります。", correct: "く", wrong: ["に", "と"], explanation: "い-adjective (暖かい) diubah jadi bentuk ~く dulu sebelum digandeng なります buat nunjukin perubahan keadaan ('jadi hangat'). Kalo na-adjective baru pake に, jadi に di sini salah." },
  { question: "Artinya: \"Saya paling suka musim gugur.\" Lengkapi: 秋が＿＿＿好きです。", correct: "いちばん", wrong: ["どちら", "いろいろ"], explanation: "いちばん artinya 'paling/nomor satu', superlative marker buat nunjukin preferensi tertinggi. どちら artinya 'yang mana (dari 2)', いろいろ artinya 'macam-macam' — keduanya nggak nyambung sama maksud 'paling suka'." },
  { question: "Artinya: \"Karena buah-buahan enak, saya suka musim gugur.\" Lengkapi: 果物がおいしいです＿＿＿、秋が好きです。", correct: "から", wrong: ["が", "のに"], explanation: "から nyambungin alasan ke hasil (karena buahnya enak, MAKANYA suka musim gugur). のに malah nunjukin pertentangan ('padahal...tapi...'), beda makna total sama yang diminta." },

  // ===== BAB 4 =====
  { question: "Konteks: basa-basi soal cuaca, ngarep lawan bicara setuju/sependapat. Lengkapi: 今日はいい天気です＿＿＿。", correct: "ね", wrong: ["よ", "か"], explanation: "ね dipake pas ngajak lawan bicara setuju/senada, mirip 'kan?' di bahasa kita. よ malah buat ngasih info baru yang lawan bicara belum tau, jadi kurang pas buat basa-basi cuaca." },
  { question: "Artinya: \"Kemarin hujan deras sekali, ya.\" (bentuk lampau) Lengkapi: 昨日はすごい雨＿＿＿。", correct: "でした", wrong: ["です", "だった"], explanation: "Bentuk lampau sopan dari です itu でした. だった itu versi futsuu (kasual), nggak nyambung sama gaya formal yang dipake di awal kalimat." },
  { question: "Artinya: \"Sekarang pun masih gerimis.\" Lengkapi: 今も少し雨が＿＿＿。", correct: "降っています", wrong: ["降ります", "降りました"], explanation: "~ています di sini nunjukin kejadian yang lagi berlangsung sekarang (hujannya masih turun pas ngomong). 降ります lebih ke general/masa depan, 降りました itu udah selesai." },

  // ===== BAB 5 =====
  { question: "Artinya: \"Kota ini sangat ramai dan praktis.\" (gabungin 2 sifat) Lengkapi: この町は、とてもにぎやか＿＿＿、便利です。", correct: "で", wrong: ["くて", "だ"], explanation: "Buat nggabungin 2 sifat jadi satu kalimat, na-adjective (にぎやか) diubah dari だ jadi で dulu. くて itu buat i-adjective, jadi nggak cocok di sini." },
  { question: "Artinya: \"Taman Tachibana lokasinya kurang praktis, tapi indah, lho.\" Lengkapi: たちばな公園は、場所は不便＿＿＿、きれいですよ。", correct: "だけど", wrong: ["だから", "ので"], explanation: "だけど nunjukin pertentangan ('walau begini, tapi begitu'). だから & ので malah nunjukin sebab-akibat, arahnya kebalik sama makna yang diminta soal." },
  { question: "Artinya: \"Sepanjang tahun, kita bisa melihat berbagai bunga.\" Lengkapi: 一年中、いろいろな花を見る＿＿＿できます。", correct: "ことが", wrong: ["が", "のが"], explanation: "Pola baku 'verb (bentuk kamus) + ことができます' dipake buat nunjukin kemampuan/kesempatan ngelakuin sesuatu. の kurang natural dipasangin できる dibanding こと." },

  // ===== BAB 6 =====
  { question: "Artinya: \"Saya ingin pergi ke toserba Maruichi...\" (lagi nanya jalan) Lengkapi: マルイチデパートに＿＿＿。", correct: "行きたいんですが…", wrong: ["行きますが…", "行きましたが…"], explanation: "Pola ~たいんですが… dipake buat nyampein keinginan sekaligus buka obrolan minta bantuan/nanya arah — kesannya sopan dan nggak maksa." },
  { question: "Artinya: \"Lurus terus di jalan ini, lalu belok kiri di lampu lalu lintas kedua.\" Lengkapi: この道をまっすぐ＿＿＿、2つ目の信号を左に曲がってください。", correct: "行って", wrong: ["行けば", "行くと"], explanation: "Te-form (行って) dipake buat nyambungin instruksi berurutan — 'lakuin ini dulu, terus lakuin itu' — pas ngasih tau arah jalan. 行けば & 行くと itu bentuk conditional, kurang pas buat instruksi langsung kayak gini." },
  { question: "Artinya: \"Bukan yang pertama, tapi yang kedua.\" (ngoreksi lawan bicara) Lengkapi: 1つ目＿＿＿、2つ目です。", correct: "じゃなくて", wrong: ["ではないので", "じゃないなら"], explanation: "Pola 'X じゃなくて、Y' dipake buat ngoreksi ('bukan X, tapi Y') dengan nyambungin 2 frasa pake te-form negatif." },

  // ===== BAB 7 =====
  { question: "Artinya: \"Bagaimana kalau bertemu di lobi hotel?\" (ngajuin usul) Lengkapi: ホテルのロビー＿＿＿？", correct: "はどうですか", wrong: ["がいいですか", "はどこですか"], explanation: "Pola 'X はどうですか' itu cara standar buat ngajuin usul/nanya pendapat orang ('gimana kalau X?'). はどこですか malah nanya lokasi, bukan ngajuin usul." },
  { question: "Artinya: \"Bagaimana kalau pukul 6:30?\" (usul alternatif) Lengkapi: 6時半＿＿＿？", correct: "でもいいですか", wrong: ["もいいですか", "がいいですか"], explanation: "Pola 'X でもいいですか' dipake buat nawarin alternatif santai ('gimana kalo X aja, boleh?'). がいいですか lebih ke nanya preferensi, bukan nawarin opsi lain." },
  { question: "Artinya: \"Kereta berhenti karena kecelakaan.\" (sebab/alasan) Lengkapi: 事故＿＿＿、電車が止まりました。", correct: "で", wrong: ["に", "へ"], explanation: "Partikel で di sini nunjukin sebab/alasan kejadian (kereta berhenti KARENA kecelakaan), bukan fungsi lokasi kayak biasanya." },

  // ===== BAB 8 =====
  { question: "Artinya: \"Apakah kamu sudah pergi ke outlet mall yang baru itu?\" Lengkapi: 新しいアウトレットモール、＿＿＿行きましたか？", correct: "もう", wrong: ["まだ", "いつも"], explanation: "もう dipasangin sama kata tanya buat nanya 'udah belum' ngelakuin sesuatu. まだ artinya kebalikannya ('masih belum'), lebih cocok buat jawaban negatif." },
  { question: "Artinya: \"Apakah kamu pernah menonton gulat profesional?\" (pengalaman) Lengkapi: プロレスを＿＿＿ことがありますか。", correct: "見た", wrong: ["見る", "見て"], explanation: "Pola baku 'verb (bentuk lampau) + ことがあります' dipake buat nanya/cerita pengalaman ('pernah ngelakuin X'). 見る & 見て nggak cocok sama pola ini." },
  { question: "Artinya: \"Maukah kamu pergi makan bersama?\" (ajakan) Lengkapi: いっしょに食べ＿＿＿行きませんか。", correct: "に", wrong: ["て", "で"], explanation: "Pola 'verb (bentuk ~ます tanpa ます) + に行きませんか' dipake buat ngajak orang pergi DENGAN TUJUAN ngelakuin sesuatu ('pergi buat makan bareng')." },

  // ===== BAB 9 =====
  { question: "Artinya: \"Saya belajar bahasa Jepang dengan menonton anime.\" (cara/metode) Lengkapi: アニメ＿＿＿日本語を勉強しました。", correct: "で", wrong: ["が", "に"], explanation: "Partikel で di sini nunjukin cara/metode/alat buat ngelakuin sesuatu (belajar PAKAI media anime), beda sama が (subjek) atau に (target/waktu)." },
  { question: "Artinya: \"Bagian yang sulit dari bahasa Jepang adalah hurufnya.\" Lengkapi: 日本語は文字＿＿＿難しいです。", correct: "が", wrong: ["を", "に"], explanation: "Pola kalimat bertopik ganda 'AはBが〜' dipake buat nunjukin bagian spesifik (B) dari topik besar (A) yang lagi dinilai — di sini 'bahasa Jepang (topik), hurufnya (bagian) yang susah'." },
  { question: "Artinya: \"Bahasa Jepang, membacanya agak sulit. Tapi, saya terampil bicara.\" (perbandingan) Lengkapi: 日本語は、読むのは少し難しいです。＿＿＿、会話は得意です。", correct: "でも", wrong: ["それで", "だから"], explanation: "でも dipake buat nunjukin pertentangan antar 2 kalimat (baca susah, TAPI ngomong jago). それで & だから malah nunjukin sebab-akibat, beda arah makna." },

  // ===== BAB 10 =====
  { question: "Artinya: \"Saya ingin mencoba berlatih Aikido.\" Lengkapi: 合気道を＿＿＿みたいんですが…", correct: "やって", wrong: ["やる", "やった"], explanation: "Pola 'verb (te-form) + みたい' artinya 'pengen nyoba ngelakuin X' — te-form-nya wajib biar nyambung ke みたい." },
  { question: "Artinya: \"Kelas bahasa Jepang diadakan seminggu sekali.\" (frekuensi) Lengkapi: 日本語クラスは週＿＿＿1回です。", correct: "に", wrong: ["が", "を"], explanation: "Partikel に nempel di satuan waktu (週) buat nunjukin frekuensi ('per minggu, sekian kali')." },
  { question: "Konteks: nanya balik arti kata yang nggak dimengerti. Lengkapi: すみません、「ぼご」は＿＿＿ですか？", correct: "どういう意味", wrong: ["どんな", "なぜ"], explanation: "Pola 'X はどういう意味ですか' itu cara baku buat nanya arti sebuah kata yang nggak dimengerti. どんな buat nanya jenis/sifat, なぜ buat nanya alasan — keduanya nggak pas." },

  // ===== BAB 11 =====
  { question: "Artinya: \"Daging dan sayur, saya yang akan membeli lalu membawanya.\" Lengkapi: 肉と野菜は、私が買っ＿＿＿行きます。", correct: "て", wrong: ["た", "てから"], explanation: "Pola 'verb (te-form) + 行きます' (買って行きます) dipake buat nunjukin 'ngelakuin sesuatu dulu, terus bawa pergi hasilnya' — te-form biasa udah cukup & natural di sini. てから lebih nekenin 'abis itu baru', kesannya agak berlebihan buat konteks santai kayak gini." },
  { question: "Artinya: \"Chocolate cake atau cheese cake, mana yang kamu suka?\" (milih dari 2 pilihan) Lengkapi: チョコレートケーキとチーズケーキ、＿＿＿がいいですか。", correct: "どっち", wrong: ["どれ", "なに"], explanation: "どっち dipake khusus buat milih dari 2 opsi yang udah disebutin (choco cake ATAU cheese cake). どれ biasanya buat pilihan 3 atau lebih." },
  { question: "Artinya: \"Berapa pun (potong karaage-nya) boleh.\" (nggak ada preferensi khusus) Lengkapi: からあげは、いくつ買いましょうか。－いくつ＿＿＿いいです。", correct: "でも", wrong: ["だけ", "しか"], explanation: "Pola 'kata tanya + でも' (いくつでも, なんでも, dst) artinya 'berapa/apa pun boleh, nggak masalah' — pas buat nunjukin nggak ada preferensi khusus." },

  // ===== BAB 12 =====
  { question: "Artinya: \"Bekal itu terlihat enak, ya.\" (penilaian dari penglihatan) Lengkapi: そのお弁当、おいし＿＿＿ですね。", correct: "そう", wrong: ["い", "らしい"], explanation: "~そう (nempel abis batang adjective) nunjukin kesan visual sekilas ('kelihatannya X'). い itu akhiran adjective aslinya (udah lengkap di おいしい, jadi duplikat kalo dipake lagi), らしい lebih ke info denger-denger." },
  { question: "Artinya: \"Itu masakan yang terlihat pedas, ya.\" (nerangin kata benda) Lengkapi: それ、辛＿＿＿料理ですね。", correct: "そうな", wrong: ["そうの", "そうだ"], explanation: "Pas ~そう mau nerangin kata benda di belakangnya, harus ditambah な dulu (辛そうな料理), bukan の atau だ." },
  { question: "Artinya: \"Tamagoyaki ini manis, jadi enak.\" (alasan pake sifat) Lengkapi: この卵焼き、＿＿＿、おいしいですね。（甘い）", correct: "甘くて", wrong: ["甘いで", "甘くくて"], explanation: "Buat nyambungin i-adjective ke alasan berikutnya, い diubah jadi くて (甘い→甘くて) — bukan cuma nambahin で kayak na-adjective. 甘いで & 甘くくて bukan bentuk yang valid." },

  // ===== BAB 13 =====
  { question: "Artinya: \"Maaf, lampu di ruang rapat tidak menyala...\" (lapor masalah) Lengkapi: 会議室の電気がつか＿＿＿んですが…", correct: "ない", wrong: ["なく", "ぬ"], explanation: "Pola 'verb (nai-form) + んです' dipake buat ngelaporin masalah/keadaan dengan nada minta perhatian ('lampunya nggak nyala nih...'). なく butuh lanjutan lain, ぬ itu bentuk klasik yang udah jarang dipake." },
  { question: "Artinya: \"Sepertinya akan selesai sekitar 10 menit lagi.\" (perkiraan) Lengkapi: あと10分ぐらいで終わり＿＿＿です。", correct: "そう", wrong: ["よう", "みたい"], explanation: "~そう nempel abis batang kata kerja (終わり+そう) buat nunjukin kesan 'kayaknya bakal kejadian sebentar lagi' berdasar tanda-tanda yang keliatan sekarang." },
  { question: "Artinya: \"Kalau menekan tombol ini, mesin akan mulai fotokopi.\" (hasil dari suatu aksi) Lengkapi: このボタンを押す＿＿＿、コピーが始まります。", correct: "と", wrong: ["ば", "なら"], explanation: "Partikel と dipake buat kondisional yang hasilnya otomatis/pasti terjadi tiap kali syaratnya kepenuhi — cocok banget buat jelasin cara pakai alat/mesin." },

  // ===== BAB 14 =====
  { question: "Artinya: \"Lalu lintas padat dan sama sekali tidak bergerak.\" (alasan, dari verba) Lengkapi: 道が混んで＿＿＿、ぜんぜん動きません。", correct: "いて", wrong: ["いで", "います"], explanation: "混んでいる (lagi keadaan macet) diubah ke te-form (混んでいて) buat nyambungin ke alasan kenapa jalan sama sekali nggak gerak." },
  { question: "Artinya: \"Dompet saya tertinggal di rumah. Karena itu, saya akan sedikit terlambat.\" Lengkapi: 家に財布を忘れました。＿＿＿、少し遅れます。", correct: "それで", wrong: ["それに", "それから"], explanation: "それで dipake buat nyambungin sebab ke akibat secara netral ('karena itu, makanya...'). それに nambahin info tambahan, それから nunjukin urutan waktu — fungsinya beda." },
  { question: "Artinya: \"Bolehkah saya permisi ke toilet?\" (minta izin) Lengkapi: トイレに行って来＿＿＿いいですか。", correct: "ても", wrong: ["れば", "たら"], explanation: "Pola 'verb (te-form) + もいいですか' itu pola baku buat minta izin ('boleh nggak kalau saya...?')." },
  { question: "Artinya: \"Saya harus pergi ke kantor pemerintahan.\" (keharusan) Lengkapi: ちょっと、役所に行か＿＿＿ならないんです。", correct: "なければ", wrong: ["なくて", "ないと"], explanation: "Pola 'verb (nai-form) + なければなりません' itu pola baku buat nunjukin keharusan/kewajiban ('harus ngelakuin X')." },

  // ===== BAB 15 =====
  { question: "Artinya: \"Sejak kemarin saya demam 38 derajat dan tenggorokan sakit sekali.\" (jelasin gejala ke dokter) Lengkapi: 昨日から38度の熱があって、のどがすごく痛い＿＿＿。", correct: "んです", wrong: ["です", "そうです"], explanation: "んです dipake pas lagi ngejelasin situasi/gejala secara personal ke orang lain (kayak ke dokter) — kesannya 'makanya saya ke sini karena...'. そうです malah artinya 'katanya/kelihatannya', nggak cocok buat cerita gejala sendiri." },
  { question: "Artinya: \"Minggu ini sebaiknya cuti kerja dan sebisa mungkin jangan bertemu orang lain.\" (larangan halus) Lengkapi: 今週は仕事を休んで、できるだけ人に会わ＿＿＿ください。", correct: "ないで", wrong: ["ない", "なくて"], explanation: "Pola 'verb (nai-form) + でください' itu pola baku buat minta orang JANGAN ngelakuin sesuatu secara halus/sopan." },
  { question: "Artinya: \"Ini adalah obat untuk meredakan batuk.\" (nerangin nomina dengan verba) Lengkapi: こちらは、せきを抑え＿＿＿薬です。", correct: "る", wrong: ["た", "ます"], explanation: "Bentuk kamus verb (る) dipake buat nerangin kata benda di belakangnya kalo yang dimaksud itu fungsi/sifat umum ('obat YANG MEREDAKAN batuk'), bukan kejadian yang udah lewat kayak た." },

  // ===== BAB 16 =====
  { question: "Artinya: \"Kalau susah tidur, sebaiknya berendam santai di air hangat.\" (saran ringan) Lengkapi: よく眠れないときは、ぬるいお風呂にゆっくり入る＿＿＿よ。", correct: "といいです", wrong: ["そうです", "らしいです"], explanation: "Pola 'verb (bentuk kamus) + といいです' dipake buat ngasih saran ringan ('sebaiknya X, deh') — beda fungsi sama そう/らしい yang buat nyampein info denger-denger/kesan." },
  { question: "Artinya: \"Kemarin saya minum terlalu banyak.\" (berlebihan) Lengkapi: 昨日、飲み＿＿＿ました。", correct: "すぎ", wrong: ["すぎて", "すぎる"], explanation: "Pola 'verb (masu-stem) + すぎる' nunjukin sesuatu dilakuin berlebihan ('kebanyakan ngelakuin X'), di sini diubah ke bentuk lampau すぎました." },
  { question: "Artinya: \"Di hari libur saya santai, misalnya nonton tv dan dengar musik.\" (contoh beberapa kegiatan) Lengkapi: 休みは、テレビを見＿＿＿、音楽を聞い＿＿＿して、ゆっくり過ごします。", correct: "たり／たり", wrong: ["て／て", "ながら／ながら"], explanation: "Pola 'verb (ta-form) + り〜verb (ta-form) + りする' dipake buat nyebutin beberapa contoh kegiatan (nggak harus lengkap/berurutan) — beda sama ながら yang artinya 'sambil'." },
  { question: "Artinya: \"Demi kesehatan, saya berusaha untuk tidak makan berlebihan.\" (usaha/kebiasaan) Lengkapi: 健康のために、食べすぎない＿＿＿しています。", correct: "ように", wrong: ["そうに", "らしく"], explanation: "Pola 'verb (nai-form) + ようにしています' dipake buat nunjukin usaha yang dijaga terus-menerus ('berusaha supaya nggak ngelakuin X')." },

  // ===== BAB 17 =====
  { question: "Artinya: \"Ini pajangan yang saya bawa dari Nepal.\" (nerangin nomina, bentuk lampau) Lengkapi: ネパールから持って＿＿＿飾りです。", correct: "来た", wrong: ["来て", "来ます"], explanation: "Bentuk lampau verb (来た) dipake buat nerangin nomina kalo kejadiannya udah terjadi di masa lalu ('pajangan yang DULU dibawa dari Nepal')." },
  { question: "Artinya: \"Mug ini saya dapatkan dari teman waktu ulang tahun.\" (nerima sesuatu) Lengkapi: このマグカップ、誕生日に、友だち＿＿＿もらったんです。", correct: "に", wrong: ["が", "を"], explanation: "Kata kerja もらう (menerima) selalu dipasangin partikel に (atau から) buat nunjukin dari siapa barangnya didapat." },
  { question: "Artinya: \"Ini adalah azimat pemberian dari kakak laki-laki saya.\" (dikasih orang lain ke pembicara) Lengkapi: これは、兄＿＿＿くれたお守りです。", correct: "が", wrong: ["に", "を"], explanation: "Kata kerja くれる (diberi orang lain ke pembicara) makai partikel が buat nandain siapa yang ngasih — beda sama もらう yang makai に buat nandain dari siapa nerima." },

  // ===== BAB 18 =====
  { question: "Artinya: \"Saya dengar anak Anda sudah lahir, ya.\" (nyampein info yang didenger) Lengkapi: お子さんが生まれた＿＿＿ですね。", correct: "そう", wrong: ["よう", "みたい"], explanation: "~そうです (nempel di bentuk plain kalimat) di sini fungsinya buat nyampein info yang DIDENGER dari orang lain (伝聞) — beda sama そう yang nempel di batang kata (kesan visual, liat No. 38)." },
  { question: "Artinya: \"Bagaimana kalau kita memberikan sesuatu untuk Ana?\" (ngasih ke orang lain) Lengkapi: アナさんに何かプレゼントを＿＿＿？", correct: "あげませんか", wrong: ["くれませんか", "もらいませんか"], explanation: "あげる dipake pas kita (atau orang lain) ngasih sesuatu ke pihak ketiga (di sini: ke Ana). くれませんか & もらいませんか arahnya kebalik, nggak cocok sama maksud kalimat." },
  { question: "Artinya: \"Ana pernah mengatakan bahwa dia sangat suka yakitori.\" (ngutip perkataan orang) Lengkapi: アナさんは前に、焼き鳥が大好きだ＿＿＿言っていました。", correct: "と", wrong: ["が", "の"], explanation: "Partikel と dipake buat nandain isi kutipan/perkataan sebelum kata kerja 言う (bilang) — pola '〜と言っていました' artinya 'pernah bilang bahwa...'." },
  { question: "Artinya: \"Saya rasa lebih baik memberi sesuatu yang berkesan.\" (nyatain pendapat) Lengkapi: もっと、思い出に残るものがいい＿＿＿思います。", correct: "と", wrong: ["が", "を"], explanation: "Partikel と dipake buat nandain isi pikiran/pendapat sebelum kata kerja 思う (berpikir) — pola '〜と思います' artinya 'saya rasa...'." },
        ],
        };

