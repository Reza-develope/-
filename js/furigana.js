        // ======================= MODE FURIGANA (GLOBAL, SEMUA MODE) =======================
        // Aktif cuma berpengaruh ke Flash Card, karena cuma di situ ada pasangan data
        // kanji + cara baca (front & back) yang jelas. Di mode Pilihan Ganda, kanji
        // justru jadi jawaban yang harus ditebak, jadi furigana sengaja gak dipasang
        // di situ biar kuisnya tetap ada tantangannya (gak bocor jawaban).
        let furiganaMode = localStorage.getItem('furiganaMode') === '1';
        const furiganaToggleBtn = document.getElementById('furiganaToggleBtn');
        const furiganaToggleLabel = document.getElementById('furiganaToggleLabel');
        const KANJI_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF々〆〤]/;
        const KANJI_OR_DIGIT_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF々〆〤0-90-9]/;

        // Pecah teks jadi runs: yang butuh cara baca (kanji/angka) vs yang literal (hiragana/katakana/simbol)
        function fcSegmentFront(front) {
            const segments = [];
            let current = '';
            let currentType = null;
            for (const ch of front) {
                const type = KANJI_OR_DIGIT_REGEX.test(ch);
                if (currentType === null || type === currentType) {
                    current += ch;
                } else {
                    segments.push({ text: current, needsReading: currentType });
                    current = ch;
                }
                currentType = type;
            }
            if (current) segments.push({ text: current, needsReading: currentType });
            return segments;
        }

        // ======================= KAMUS CARA BACA KANJI (buat furigana presisi per-kanji) =======================
        // Kamus ini isinya cara baca "dasar" tiap kanji (on-yomi & kun-yomi paling umum),
        // hasil verifikasi manual terhadap SEMUA kosakata kanji majemuk yang ada di file
        // ini (bukan tebak-tebakan generik). Perubahan bunyi (sokuon/rendaku/handaku)
        // di-generate OTOMATIS dari kamus dasar ini oleh expandVariants(), jadi kamus di
        // bawah gak perlu nulis tiap varian bunyi satu-satu (misal '学':['がく'] otomatis
        // juga mencakup 'がっ' buat 学校, gak perlu ditulis manual).
        const KANJI_READINGS = {"一":["いち","いつ","ひと"],"丈":["じょう"],"上":["じょう","うえ","かみ","あ"],"下":["か","げ","した","さ"],"不":["ふ"],"世":["せ","せい"],"両":["りょう"],"中":["ちゅう","じゅう","なか"],"主":["しゅ"],"丼":["どん"],"乗":["じょう","の"],"乳":["にゅう"],"乾":["かん"],"了":["りょう"],"予":["よ"],"事":["じ","こと"],"二":["に","ふた"],"交":["こう"],"京":["きょう"],"人":["じん","にん","ひと"],"今":["こん","いま"],"介":["かい"],"仕":["し"],"付":["ふ","つけ","つ"],"代":["だい"],"以":["い"],"件":["けん"],"任":["にん"],"休":["きゅう","やす"],"会":["かい","あ"],"伝":["でん","つだ","つた"],"体":["たい"],"何":["なん","なに"],"作":["さく"],"例":["れい"],"価":["か"],"便":["びん","べん"],"保":["ほ"],"信":["しん"],"倉":["そう"],"個":["こ"],"倍":["ばい"],"借":["しゃく"],"値":["ち","ね"],"停":["てい"],"健":["けん"],"側":["そく","がわ"],"備":["び","そな"],"元":["げん"],"充":["じゅう"],"先":["せん","さき"],"光":["こう"],"入":["にゅう","いり","い","はい"],"全":["ぜん"],"公":["こう"],"具":["ぐ"],"内":["ない","うち"],"円":["えん"],"再":["さい"],"写":["しゃ"],"冷":["れい","ひや"],"処":["しょ"],"出":["しゅつ","だし","で","だ"],"分":["ふん","ぶん","ぶ"],"切":["せつ","きり","き"],"列":["れつ"],"初":["しょ"],"判":["はん"],"別":["べつ"],"利":["り"],"券":["けん"],"刺":["し","さし","さ"],"刻":["こく"],"前":["ぜん","まえ"],"剤":["ざい"],"割":["わり"],"加":["か"],"効":["こう"],"勉":["べん"],"動":["どう","うご"],"務":["む"],"募":["ぼ"],"化":["か","け"],"北":["ほく","きた"],"区":["く"],"医":["い"],"十":["じゅう","じっ","じゅっ"],"午":["ご"],"半":["はん"],"卓":["たく"],"南":["なん","みなみ"],"単":["たん"],"博":["はく"],"印":["いん"],"危":["き"],"卵":["たまご"],"原":["げん"],"去":["きょ"],"参":["さん"],"反":["はん"],"取":["しゅ","とり","と"],"受":["じゅ","うけ","う"],"口":["こう","ぐち","くち"],"古":["こ"],"台":["だい","たい"],"右":["う","みぎ"],"号":["ごう"],"司":["し"],"各":["かく"],"合":["ごう","あい","あ"],"名":["めい","な"],"向":["こう","む"],"呂":["ろ"],"味":["み","あじ"],"和":["わ"],"品":["ひん"],"唐":["から"],"商":["しょう"],"問":["もん"],"喫":["きつ"],"営":["えい"],"器":["き"],"四":["し","よん","よ"],"回":["かい"],"因":["いん"],"国":["こく","くに"],"園":["えん"],"土":["ど","ど"],"在":["ざい"],"地":["ち"],"均":["きん"],"型":["がた"],"基":["き"],"堂":["どう"],"場":["じょう","ば"],"増":["ぞう"],"士":["し"],"売":["ばい","う"],"変":["へん"],"夏":["か","なつ"],"夕":["ゆう"],"外":["がい","そと"],"夜":["や","よ"],"大":["だい","たい","おお"],"天":["てん"],"夫":["ふ"],"女":["じょ"],"奴":["やっこ"],"好":["こう","す"],"妊":["にん"],"娠":["しん"],"婚":["こん"],"婦":["ふ"],"子":["し","こ"],"字":["じ"],"存":["ぞん"],"季":["き"],"学":["がく","まな"],"宅":["たく"],"完":["かん"],"定":["てい"],"客":["きゃく"],"室":["しつ"],"家":["か","いえ","や"],"容":["よう"],"宿":["しゅく","じゅく"],"富":["ふ"],"寝":["ね"],"察":["さつ"],"対":["たい"],"寿":["す"],"専":["せん"],"小":["しょう","こ","ちい"],"少":["しょう"],"局":["きょく"],"居":["きょ","い"],"屈":["くつ"],"届":["とどけ"],"屋":["おく","や"],"展":["てん"],"属":["ぞく"],"山":["さん","やま"],"島":["しま"],"工":["こう"],"差":["さ","さし"],"市":["し","いち"],"布":["ふ"],"帰":["き"],"常":["じょう"],"帽":["ぼう"],"幌":["ほろ"],"干":["ほ"],"平":["へい"],"年":["ねん","とし"],"幹":["かん"],"広":["こう","ひろ"],"店":["てん"],"府":["ふ"],"度":["ど"],"庫":["こ"],"庭":["てい"],"康":["こう"],"延":["えん"],"建":["けん","たて","た"],"弁":["べん"],"引":["いん","びき","ひ"],"強":["きょう"],"当":["とう"],"形":["けい","ぎょう"],"役":["やく"],"待":["たい","まち"],"後":["ご","こう","あと"],"得":["とく"],"心":["しん"],"必":["ひつ"],"忘":["ぼう"],"応":["おう"],"快":["かい"],"念":["ねん"],"急":["きゅう"],"性":["せい"],"恋":["れん"],"息":["そく","むす"],"恵":["え"],"意":["い"],"愛":["あい"],"感":["かん"],"憩":["けい"],"懐":["かい"],"成":["せい"],"戸":["こ","と"],"房":["ぼう"],"所":["しょ","じょ","ところ"],"手":["しゅ","て"],"才":["さい"],"承":["しょう"],"投":["とう"],"抜":["ぬき"],"択":["たく"],"拝":["はい"],"拡":["かく"],"持":["じ","も"],"指":["し","ゆび"],"掃":["そう"],"接":["せつ"],"提":["てい"],"揚":["あ"],"援":["えん"],"改":["かい"],"放":["ほう"],"故":["こ"],"教":["きょう","おし"],"散":["さん"],"数":["すう","かず"],"敵":["てき"],"文":["ぶん","もん"],"料":["りょう"],"断":["だん"],"新":["しん"],"方":["ほう","かた"],"旅":["りょ"],"族":["ぞく"],"日":["にち","じつ","ひ","に"],"早":["そう"],"昆":["こん"],"明":["めい","あ"],"映":["えい"],"春":["しゅん","はる"],"昨":["さく"],"昼":["ちゅう","ひる"],"時":["じ","とき"],"晩":["ばん"],"普":["ふ"],"景":["けい"],"暇":["か"],"暖":["だん"],"暮":["ぼ","く"],"曜":["よう"],"更":["こう"],"書":["しょ","かき","か"],"替":["たい","がえ"],"最":["さい"],"月":["げつ","がつ","つき"],"有":["ゆう"],"服":["ふく"],"望":["ぼう"],"朝":["ちょう","あさ"],"期":["き"],"木":["もく"],"末":["まつ","すえ"],"本":["ほん","もと"],"札":["さつ"],"杏":["あん"],"材":["ざい"],"村":["むら"],"来":["らい"],"杯":["ぱい","はい"],"東":["とう","ひがし"],"枚":["まい"],"果":["か"],"枝":["えだ"],"柄":["がら"],"染":["せん"],"査":["さ"],"校":["こう"],"格":["かく"],"案":["あん"],"梅":["うめ","ばい"],"検":["けん"],"業":["ぎょう"],"楽":["がく","らく"],"様":["さま","よう"],"槽":["そう"],"標":["ひょう"],"横":["おう"],"樹":["き"],"機":["き"],"欲":["よく"],"止":["し","とめ","と"],"正":["せい","しょう"],"武":["む"],"歩":["ほ","ぽ","あゆ"],"歳":["さい"],"残":["ざん"],"段":["だん"],"殺":["さつ"],"母":["ぼ","ぼう"],"毎":["まい","ごと"],"毒":["どく"],"毛":["もう"],"氏":["し"],"民":["みん"],"気":["き"],"水":["すい","みず"],"永":["えい","なが"],"汚":["お"],"池":["ち","いけ"],"泉":["せん"],"法":["ほう"],"注":["ちゅう"],"泳":["えい"],"洗":["せん","あら"],"活":["かつ"],"流":["りゅう"],"浄":["じょう"],"浜":["はま"],"浴":["よく"],"消":["しょう","けし"],"渡":["と","わた"],"温":["おん"],"港":["こう"],"湯":["とう","ゆ"],"湿":["しつ"],"源":["げん"],"準":["じゅん"],"漢":["かん"],"漱":["そう"],"濃":["のう"],"濯":["たく"],"火":["か"],"灯":["とう"],"炊":["すい"],"点":["てん"],"無":["む","ぶ"],"焼":["しょう","やき","や"],"煙":["えん"],"熱":["ねつ"],"片":["へん","かた"],"牛":["ぎゅう"],"物":["ぶつ","もの"],"特":["とく"],"状":["じょう"],"玄":["げん"],"率":["りつ"],"現":["げん"],"球":["きゅう"],"理":["り"],"生":["せい","じょう","しょう","なま","い"],"産":["さん"],"用":["よう"],"田":["でん","た"],"由":["ゆ","ゆう"],"申":["しん","もうし","もう"],"男":["だん"],"画":["が"],"番":["ばん"],"病":["びょう"],"症":["しょう"],"痛":["つう"],"痢":["り"],"発":["はつ","ぱつ"],"白":["しろ"],"皆":["みな"],"皮":["ひ"],"盛":["せい","じょう","もり","も"],"目":["もく","め"],"相":["そう","あい"],"県":["けん"],"真":["しん"],"眠":["みん"],"着":["ちゃく","き"],"睡":["すい"],"知":["ち"],"石":["せき"],"砂":["さ","すな"],"碗":["わん"],"示":["じ"],"礼":["れい"],"社":["しゃ"],"神":["じん","しん"],"票":["ひょう"],"祭":["さい","まつ"],"私":["し"],"科":["か"],"称":["しょう"],"程":["てい"],"税":["ぜい"],"種":["しゅ"],"稿":["こう"],"空":["くう","から"],"立":["りつ","だ","た"],"第":["だい"],"等":["とう"],"算":["さん"],"管":["かん"],"箱":["ばこ"],"節":["せつ"],"簡":["かん"],"粉":["ふん","こな","こ"],"粧":["しょう"],"糖":["とう"],"約":["やく"],"紅":["こう"],"紙":["し","かみ"],"素":["す"],"索":["さく"],"紳":["しん"],"紹":["しょう"],"終":["しゅう"],"経":["けい"],"結":["けつ"],"絡":["らく"],"給":["きゅう"],"絵":["え"],"総":["そう"],"緑":["りょく","みどり"],"線":["せん"],"練":["れん"],"縁":["えん"],"縮":["しゅく"],"習":["しゅう"],"考":["こう"],"者":["しゃ","もの"],"肉":["にく"],"肌":["はだ"],"育":["いく"],"背":["せ"],"胸":["むね"],"能":["のう"],"腹":["ふく"],"膚":["ふ"],"自":["じ"],"興":["きょう"],"舎":["しゃ"],"般":["はん"],"色":["しょく","いろ"],"花":["か","はな"],"若":["わか"],"苦":["く","にが"],"英":["えい"],"茶":["ちゃ","さ"],"菌":["きん"],"菓":["か"],"菜":["さい"],"落":["らく"],"葉":["は","よう"],"蒸":["む"],"蔵":["ぞう"],"薬":["やく","くすり"],"蛍":["けい"],"行":["こう","ぎょう","い"],"街":["がい"],"衣":["い"],"表":["ひょう"],"袋":["ぶくろ"],"装":["そう"],"製":["せい"],"西":["せい","にし"],"要":["よう"],"見":["けん","み"],"覧":["らん"],"親":["しん","おや"],"角":["かく"],"解":["かい","げ"],"計":["けい"],"記":["き"],"設":["せつ"],"診":["しん"],"証":["しょう"],"評":["ひょう"],"試":["し"],"話":["わ","はなし","はな"],"認":["にん"],"誕":["たん"],"語":["ご"],"説":["せつ"],"読":["どく"],"調":["ちょう"],"談":["だん"],"議":["ぎ"],"護":["ご"],"豆":["まめ","ず"],"豚":["ぶた"],"負":["ふ"],"財":["ざい"],"貨":["か"],"販":["はん"],"費":["ひ"],"賀":["が"],"資":["し"],"賞":["しょう"],"質":["しつ"],"起":["き"],"趣":["しゅ"],"足":["そく","あし"],"躍":["やく"],"身":["しん","み"],"車":["しゃ","くるま"],"転":["てん"],"輩":["はい"],"辞":["じ"],"込":["こみ","こ"],"近":["きん"],"退":["たい"],"送":["そう"],"通":["つう"],"速":["そく"],"造":["ぞう"],"連":["れん","つ"],"週":["しゅう"],"遅":["ち"],"運":["うん"],"道":["どう","みち"],"選":["せん"],"部":["ぶ"],"郵":["ゆう"],"都":["と","つ"],"酎":["ちゅう"],"酒":["しゅ","さか","さけ"],"酔":["よ","すい"],"野":["や"],"量":["りょう"],"金":["きん"],"鉄":["てつ"],"銀":["ぎん"],"銘":["めい"],"錠":["じょう"],"鍵":["かぎ"],"長":["ちょう"],"門":["もん"],"間":["かん","あいだ","ま"],"関":["かん"],"防":["ぼう"],"限":["げん"],"院":["いん"],"除":["じょ"],"険":["けん"],"階":["かい","がい"],"際":["さい"],"集":["しゅう","あつ"],"雑":["ざつ"],"雨":["う","あめ"],"電":["でん"],"露":["ろ"],"非":["ひ"],"面":["めん"],"音":["おん"],"項":["こう"],"須":["す"],"題":["だい"],"額":["がく"],"類":["るい"],"風":["ふう","かぜ"],"飛":["ひ"],"食":["しょく","た"],"飯":["はん"],"飾":["しょく"],"館":["かん"],"首":["しゅ","くび"],"馬":["ば"],"駅":["えき"],"駐":["ちゅう"],"験":["けん"],"高":["こう","たか"],"鶏":["けい","とり"],"麦":["むぎ"],"黒":["くろ"],"鼻":["はな"]};

        // Kata-kata yang bacaannya TIDAK BISA dipecah per-kanji pakai aturan umum
        // (jukujikun / bacaan tidak beraturan, misal 今日=きょう, atau nama tempat),
        // plus rangkaian baca tanggal 1-10/20 yang memang tidak beraturan (二日=ふつか,
        // bukan に+にち). Dicek LEBIH DULU sebelum kamus per-kanji di atas.
        const SPECIAL_COMPOUNDS = {"10日":["とおか"],"1人":["ひとり"],"1日":["ついたち"],"20日":["はつか"],"2人":["ふたり"],"2日":["ふつか"],"3日":["みっか"],"4日":["よっか"],"5日":["いつか"],"6日":["むいか"],"7日":["なのか"],"8日":["ようか"],"9日":["ここのか"],"一人":["ひとり"],"一日":["ついたち"],"一昨年":["おととし"],"一昨日":["おととい"],"七日":["なのか"],"三日":["みっか"],"上手":["じょうず"],"下手":["へた"],"九日":["ここのか"],"二人":["ふたり"],"二十日":["はつか"],"二十歳":["はたち"],"二日":["ふつか"],"五日":["いつか"],"今年":["ことし"],"今日":["きょう"],"今朝":["けさ"],"八日":["ようか"],"六日":["むいか"],"十日":["とおか"],"四日":["よっか"],"土産":["みやげ"],"大人":["おとな"],"掃除":["そうじ"],"文字":["もじ"],"明日":["あした","あす"],"昨日":["きのう"],"時計":["とけい"],"景色":["けしき"],"果物":["くだもの"],"梅雨":["つゆ"],"武蔵":["むさし"],"母さん":["かあさん"],"浴衣":["ゆかた"],"父さん":["とうさん"],"田舎":["いなか"],"眼鏡":["めがね"],"財布":["さいふ"],"部屋":["へや"],"銀杏":["ぎんなん"],"風呂":["ふろ"]};

        // --- Aturan perubahan bunyi otomatis, biar KANJI_READINGS di atas cukup nyimpan
        //     satu bentuk dasar per bacaan (sokuon/rendaku/handaku dihitung sendiri) ---
        const RENDAKU_MAP = {'は':'ば','ひ':'び','ふ':'ぶ','へ':'べ','ほ':'ぼ','か':'が','き':'ぎ','く':'ぐ','け':'げ','こ':'ご','さ':'ざ','し':'じ','す':'ず','せ':'ぜ','そ':'ぞ','た':'だ','ち':'ぢ','つ':'づ','て':'で','と':'ど'};
        const HANDAKU_MAP = {'は':'ぱ','ひ':'ぴ','ふ':'ぷ','へ':'ぺ','ほ':'ぽ'};
        const SOKUON_TRIGGER = new Set(['く','き','ち','つ']);

        function rendakuVariant(r) {
            if (!r) return null;
            const v = RENDAKU_MAP[r[0]];
            return v ? v + r.slice(1) : null;
        }
        function handakuVariant(r) {
            if (!r) return null;
            const v = HANDAKU_MAP[r[0]];
            return v ? v + r.slice(1) : null;
        }
        function sokuonSelfVariant(r) {
            if (r && SOKUON_TRIGGER.has(r[r.length - 1])) return r.slice(0, -1) + 'っ';
            return null;
        }
        // Dari daftar bacaan dasar, hasilkan SEMUA varian bunyi yang mungkin (dasar +
        // rendaku + handaku + sokuon-diri-sendiri). Dipakai tiap kali mau cocokkan
        // kandidat bacaan terhadap data asli.
        function expandVariants(baseList) {
            const out = new Set();
            for (const r of baseList) {
                if (!r) continue;
                out.add(r);
                const rv = rendakuVariant(r); if (rv) out.add(rv);
                const hv = handakuVariant(r); if (hv) out.add(hv);
                const sv = sokuonSelfVariant(r); if (sv) out.add(sv);
            }
            return [...out].sort((a, b) => b.length - a.length);
        }

        // --- Sistem baca angka: tiap digit dibaca beda tergantung POSISI (satuan/
        //     puluhan/ratusan/ribuan), bukan sekadar disambung — "24" itu "dua-puluh-
        //     empat", bukan angka '2' lalu '4' dibaca sendiri-sendiri. Satu blok angka
        //     dianggap SATU unit furigana, sesuai konvensi furigana angka pada umumnya. ---
        const DIGIT_ONES = {'0':['ぜろ','れい'],'1':['いち'],'2':['に'],'3':['さん'],'4':['よん','よ','し'],'5':['ご'],'6':['ろく'],'7':['なな','しち'],'8':['はち'],'9':['きゅう','く']};

        function placeCandidates(d, place) {
            if (place === 0) {
                if (d === '0') return [''];
                return DIGIT_ONES[d].slice();
            }
            if (d === '0') return [''];
            if (place === 1) {
                if (d === '1') return ['じゅう'];
                return DIGIT_ONES[d].filter(b => b !== 'し' && b !== 'く').map(b => b + 'じゅう');
            }
            if (place === 2) {
                const specials = {'3':['さんびゃく'],'6':['ろっぴゃく'],'8':['はっぴゃく']};
                const base = specials[d] || [];
                if (d === '1') return ['ひゃく'];
                return base.concat(DIGIT_ONES[d].filter(b => b !== 'し' && b !== 'しち' && b !== 'く').map(b => b + 'ひゃく'));
            }
            if (place === 3) {
                const specials = {'3':['さんぜん'],'8':['はっせん']};
                const base = specials[d] || [];
                if (d === '1') return ['せん', 'いっせん'];
                return base.concat(DIGIT_ONES[d].filter(b => b !== 'し' && b !== 'しち' && b !== 'く').map(b => b + 'せん'));
            }
            return DIGIT_ONES[d].slice();
        }

        function numberReadingCandidates(digits, maxCandidates = 40) {
            const n = digits.length;
            if (n === 0) return [];
            if (n === 1) return DIGIT_ONES[digits].slice();
            const perPlace = [];
            for (let i = 0; i < n; i++) {
                const place = Math.min(n - 1 - i, 3);
                perPlace.push(placeCandidates(digits[i], place));
            }
            let results = [''];
            for (const cands of perPlace) {
                const next = [];
                outer:
                for (const prefix of results) {
                    for (const c of cands) {
                        next.push(prefix + c);
                        if (next.length >= maxCandidates) break outer;
                    }
                }
                results = next;
            }
            // じゅう (puluhan) sering menyusut jadi じゅっ/じっ sebelum penyebut yang
            // berawal bunyi tak bersuara (10分->じゅっぷん). Tambahkan sebagai kandidat.
            const extra = [];
            for (const r of results) {
                if (r.endsWith('じゅう')) {
                    const stem = r.slice(0, -3);
                    extra.push(stem + 'じゅっ', stem + 'じっ');
                }
            }
            const all = results.concat(extra).filter(r => r);
            const seen = new Set();
            const out = [];
            for (const r of all) {
                if (!seen.has(r)) { seen.add(r); out.push(r); }
            }
            out.sort((a, b) => b.length - a.length);
            return out;
        }

        // --- Mesin pencocokan: cari pembagian per-karakter yang MEREKONSTRUKSI PERSIS
        //     bacaan asli yang sudah benar (dari data 'back'). Kalau gak ketemu pembagian
        //     yang pasti dan tunggal, return null — pemanggil WAJIB pakai fallback aman
        //     (satu furigana di atas semua kanji), gak boleh nebak. Ini yang menjamin
        //     fitur ini gak akan pernah nampilin bacaan yang salah: total bacaan yang
        //     ditampilkan selalu persis sama dengan data yang sudah diverifikasi. ---
        function isDigit(ch) { return ch >= '0' && ch <= '9'; }

        function digitRunLength(text, start) {
            let i = start;
            while (i < text.length && isDigit(text[i])) i++;
            return i - start;
        }

        function findSegmentations(text, reading, cache, limit, prevReading) {
            const cacheKey = text + '\u0000' + reading + '\u0000' + (text[0] === '々' ? (prevReading || '') : '');
            if (cache.has(cacheKey)) return cache.get(cacheKey);
            if (text === '' && reading === '') return [[]];
            if (text === '' || reading === '') return [];

            const results = [];

            function tryConsume(piece, cand, nextPrevReading) {
                if (results.length >= limit) return;
                if (!reading.startsWith(cand, reading.length - reading.length)) { /* noop */ }
                if (reading.indexOf(cand) !== 0) return;
                const rest = findSegmentations(text.slice(piece.length), reading.slice(cand.length), cache, limit - results.length, nextPrevReading);
                for (const r of rest) {
                    results.push([[piece, cand], ...r]);
                    if (results.length >= limit) return;
                }
            }

            // 0) tanda pengulangan 々: selalu mengulang bacaan karakter sebelumnya
            if (text[0] === '々' && prevReading) {
                for (const cand of expandVariants([prevReading])) {
                    if (results.length >= limit) break;
                    tryConsume('々', cand, cand);
                }
            }

            // 1) override kata khusus (jukujikun / nama), dicoba dari yang paling panjang
            const maxLen = Math.min(text.length, 7);
            for (let L = maxLen; L >= 1 && results.length < limit; L--) {
                const piece = text.slice(0, L);
                if (SPECIAL_COMPOUNDS.hasOwnProperty(piece)) {
                    for (const cand of expandVariants(SPECIAL_COMPOUNDS[piece])) {
                        if (results.length >= limit) break;
                        tryConsume(piece, cand, cand);
                    }
                }
            }

            // 2) rangkaian digit (dicoba dari rangkaian penuh dulu, baru makin pendek)
            const dlen = digitRunLength(text, 0);
            if (dlen > 0) {
                for (let L = dlen; L >= 1 && results.length < limit; L--) {
                    const piece = text.slice(0, L);
                    for (const cand of expandVariants(numberReadingCandidates(piece))) {
                        if (results.length >= limit) break;
                        tryConsume(piece, cand, cand);
                    }
                }
            }

            // 3) satu kanji dari kamus
            if (dlen === 0 && text[0] !== '々') {
                const ch = text[0];
                const base = KANJI_READINGS[ch];
                if (base) {
                    for (const cand of expandVariants(base)) {
                        if (results.length >= limit) break;
                        tryConsume(ch, cand, cand);
                    }
                }
            }

            cache.set(cacheKey, results);
            return results;
        }

        function matchSegment(text, reading) {
            const cache = new Map();
            const segs = findSegmentations(text, reading, cache, 2, null);
            if (segs.length === 0) return { pieces: null, status: 'nomatch' };
            if (segs.length >= 2 && JSON.stringify(segs[0]) !== JSON.stringify(segs[1])) {
                return { pieces: null, status: 'ambiguous' };
            }
            return { pieces: segs[0], status: 'ok' };
        }

        // CATATAN PENTING soal posisi furigana per-kanji:
        // Dulu, kanji yang NEMPEL jadi kata majemuk (misal 教科書, 郵便局, 大丈夫) gak
        // dipecah per-huruf sama sekali — satu bacaan lengkap dipasang ngambang rata di
        // tengah di atas SELURUH kelompok kanji itu. Aman (bacaan totalnya tetap benar),
        // tapi kurang presisi: hiragananya gak nempel di kanji yang bersangkutan.
        //
        // Sekarang tiap kelompok kanji nempel itu dicocokkan ke KANJI_READINGS (kamus
        // cara baca per-kanji hasil verifikasi manual terhadap SEMUA kosakata di file
        // ini) lewat matchSegment(). Kalau ketemu SATU cara pecah yang PASTI merekonstruksi
        // persis bacaan aslinya (termasuk lewat SPECIAL_COMPOUNDS buat kata tak-beraturan
        // kayak 今日=きょう, dan aturan sokuon/rendaku/handaku otomatis kayak 学校=がっこう),
        // tiap kanji dapet <ruby> sendiri-sendiri, presisi nempel di kanji itu.
        //
        // Kalau kamus gak punya jawaban pasti, ATAU ternyata ada lebih dari satu cara
        // pecah yang sama-sama valid (ambigu) — sistem TIDAK PERNAH NEBAK. Otomatis balik
        // ke cara lama yang aman: satu <ruby> ngambang di atas seluruh kelompok. Jadi:
        // - Kanji yang berdiri SENDIRI (dijepit kana, misal 知り合い -> 知/り/合/い):
        //   selalu presisi (batasnya pasti dari pencocokan literal).
        // - Kanji yang nempel jadi kelompok: presisi per-kanji KALAU kamus yakin;
        //   fallback aman (ngambang di seluruh kelompok) kalau kamus ragu.
        // Di kedua kasus, TOTAL bacaan yang ditampilkan selalu 100% sama dengan data
        // 'back' yang sudah diverifikasi — fitur ini gak pernah nampilin bacaan yang
        // beda dari data asli, cuma beda cara motong-motongnya di layar.
        function fcRenderFurigana(front, back) {
            if (!front) return front;
            if (!furiganaMode) return front;
            if (!back || back === front) return front;
            if (!KANJI_REGEX.test(front)) return front; // ga ada kanji sama sekali, gausah dikasih furigana

            const segments = fcSegmentFront(front);

            // Normalisasi kecil buat beberapa data verba yang nulis bacaan dg format
            // "き(る)" buat kata 着る (maksudnya: 着 dibaca き, "る"-nya cuma diulang
            // dalam kurung krn emang udah ada sbg kana di front). Kalau pola ini kedetek
            // PERSIS — isi kurung di akhir 'back' sama persis dgn kana terakhir di
            // 'front' — kurungnya dilepas dulu SEBELUM diproses, biar gak ada "(" nyasar
            // ikut ketampil sbg furigana & gak ada ")" yang somehow hilang gak ke-render.
            // Cuma nembak kalau cocok PERSIS, jadi entri lain (kartu referensi cara baca
            // kanji yang isi 'back'-nya emang sengaja banyak varian dlm kurung) gak kesenggol.
            const lastSeg = segments[segments.length - 1];
            if (lastSeg && !lastSeg.needsReading) {
                const parenSuffix = `(${lastSeg.text})`;
                if (back.endsWith(parenSuffix)) {
                    back = back.slice(0, -parenSuffix.length) + lastSeg.text;
                }
            }

            let pointer = 0;
            let html = '';
            let failed = false;

            for (let i = 0; i < segments.length; i++) {
                const seg = segments[i];
                if (!seg.needsReading) {
                    // bagian literal (hiragana/katakana/simbol) harus persis sama di posisi ini
                    const slice = back.slice(pointer, pointer + seg.text.length);
                    if (slice !== seg.text) { failed = true; break; }
                    html += seg.text;
                    pointer += seg.text.length;
                } else {
                    // cari batas akhir: posisi mulainya bagian literal berikutnya (kalau ada) di 'back'
                    let boundary = back.length;
                    const nextLiteral = segments.slice(i + 1).find(s => !s.needsReading);
                    if (nextLiteral) {
                        const found = back.indexOf(nextLiteral.text, pointer);
                        if (found === -1) { failed = true; break; }
                        boundary = found;
                    }
                    const segReading = back.slice(pointer, boundary);
                    if (!segReading) { failed = true; break; }
                    // Batas segmen ini sendiri udah pasti benar (segReading = bacaan lengkap
                    // yang 100% akurat buat seg.text, dari pencocokan literal di atas). Sekarang
                    // coba pecah LEBIH LANJUT per-kanji lewat kamus cara baca — kalau pasti &
                    // tunggal, tiap kanji dapet <ruby> sendiri; kalau ragu/ambigu, JANGAN NEBAK,
                    // pakai fallback aman (satu <ruby> di seluruh kelompok, seperti sebelumnya).
                    const matchResult = matchSegment(seg.text, segReading);
                    if (matchResult.status === 'ok' && matchResult.pieces && matchResult.pieces.length > 0) {
                        html += matchResult.pieces.map(([pt, pr]) => `<ruby>${pt}<rt>${pr}</rt></ruby>`).join('');
                    } else {
                        html += `<ruby>${seg.text}<rt>${segReading}</rt></ruby>`;
                    }
                    pointer = boundary;
                }
            }

            // Kalau ada bagian yang gagal dicocokin (data ga standar), fallback aman:
            // satu furigana gede di atas semua kanji, drpd hasilnya salah potong/rusak.
            if (failed) {
                return `<ruby>${front}<rt>${back}</rt></ruby>`;
            }

            return html;
        }

        function fcRefreshFurigana() {
            document.querySelectorAll('#cardContainer .text-main[data-kanji]').forEach(el => {
                const kanji = el.getAttribute('data-kanji');
                const reading = el.getAttribute('data-reading');
                const rendered = fcRenderFurigana(kanji, reading);
                el.innerHTML = rendered;
                // toggle class buat line-height ekstra, cuma kalau beneran ada ruby yang kepasang
                el.classList.toggle('has-furigana', rendered.includes('<ruby'));
            });
        }

        function updateFuriganaBtnUI() {
            furiganaToggleBtn.classList.toggle('active', furiganaMode);
            furiganaToggleLabel.innerText = furiganaMode ? 'ON' : 'OFF';
        }

        furiganaToggleBtn.addEventListener('click', () => {
            furiganaMode = !furiganaMode;
            localStorage.setItem('furiganaMode', furiganaMode ? '1' : '0');
            updateFuriganaBtnUI();
            fcRefreshFurigana();
        });

        updateFuriganaBtnUI();

