// ===== flashcard.js — logic Mode Flash Card (butuh js/flashcard-data.js dimuat duluan) =====

        // --- PENGATURAN PASSWORD DECK PRO ---
        const fcDeckPasswords = {
            
         
        };

        // --- PENGATURAN PASSWORD DECK EXCLUSIVE (tier di atas Pro) ---
        // Cara pakai: tambahin data-category deck ke sini, contoh:
        const fcExclusivePasswords = {
          pribadi_jimmy: "5"  // <-- CONTOH DEMO, ganti/hapus sesuai kebutuhan
        };

        // --- PENGATURAN PASSWORD DECK ADMIN (tier tertinggi, di atas Exclusive) ---
        // Cara pakai: tambahin data-category deck ke sini, contoh:
        const fcAdminPasswords = {
            pribadi_admin: "wokwok" , // <-- CONTOH DEMO, ganti/hapus sesuai kebutuhan
        };

        // DOM Elements
        const fcHomePage = document.getElementById('home-page-fc');
        const fcFlashcardPage = document.getElementById('flashcard-page');
        const fcContainer = document.getElementById('cardContainer');
        const fcDeckTitle = document.getElementById('fcDeckTitle');
        const fcShuffleBtn = document.getElementById('fcShuffleBtn');
        const fcDoneBtn = document.getElementById('fcDoneBtn');
        const fcBackBtn = document.getElementById('fcBackBtn');
        
        let fcActiveCards = []; 
        let fcCurrentIndex = 0;

        // CEK DECK YANG DIKUNCI DAN ATUR BADGE PRO 🔒 / EXCLUSIVE 💎 / ADMIN 🔥 LUXURY
        document.querySelectorAll('#home-page-fc .menu-card').forEach(card => {
            const category = card.getAttribute('data-category');
            if (fcAdminPasswords[category]) {
                const badge = document.createElement('div');
                badge.className = 'admin-badge';
                badge.innerHTML = `<span class="badge-text"><span class="skull-icon">💀</span><span class="txt txt-a">Admin</span><span class="txt txt-b">Danger</span></span>`;
                card.appendChild(badge);
                card.classList.add('is-admin');
            } else if (fcExclusivePasswords[category]) {
                const badge = document.createElement('div');
                badge.className = 'exclusive-badge';
                badge.innerHTML = `
                    <div class="exclusive-badge-inner">
                        <span class="crown-icon">👑</span>
                        <span class="badge-text">Exclusive</span>
                        <span class="gem-icon">💎</span>
                    </div>
                `;
                card.appendChild(badge);
                card.classList.add('is-exclusive');
            } else if (fcDeckPasswords[category]) {
                const badge = document.createElement('div');
                badge.className = 'pro-badge';
                badge.innerHTML = 'PRO <span class="lock-icon">🔒</span>';
                card.appendChild(badge);
            }
        });

        // --- METADATA JENIS KATA: kunci singkat di data -> label Indonesia + tag kanji kamus ---
        const fcWordTypeMeta = {
            noun:     { label: 'Kata Benda',    pos: '名',  cls: 'type-noun' },
            verb:     { label: 'Kata Kerja',     pos: '動',  cls: 'type-verb' },
            'i-adj':  { label: 'Kata Sifat-i',   pos: '形',  cls: 'type-i-adj' },
            'na-adj': { label: 'Kata Sifat-na',  pos: '形動', cls: 'type-na-adj' },
            pronoun:  { label: 'Kata Ganti',     pos: '代',  cls: 'type-pronoun' }
        };

        // Badge Level & Jenis Kata di atas kartu. Diam-diam gak nampilin apa-apa kalau data.level
        // dan data.type gak diisi, jadi aman buat kategori/kartu lama yang belum dikasih metadata ini.
        function fcBuildBadges(data) {
            if (!data.level && !data.type) return '';
            let inner = '';
            if (data.level) inner += `<span class="card-badge badge-level">${data.level}</span>`;
            if (data.type && fcWordTypeMeta[data.type]) {
                const meta = fcWordTypeMeta[data.type];
                inner += `<span class="card-badge badge-type ${meta.cls}"><span class="pos-kanji">${meta.pos}</span>${meta.label}</span>`;
            }
            return `<div class="card-badges">${inner}</div>`;
        }

        // Khusus di kotak "Contoh Penggunaan": kata yang lagi dipelajari (data.front) di-highlight
        // biar keliatan jelas dia dipake di mana dalam kalimatnya. Furigana tetap dipertahankan.
        function fcProcessExample(exampleHtml, front) {
            // Ambil kanji inti dari front (buang okurigana/hiragana di belakangnya, misal "着る" -> "着")
            const kanjiMatch = front ? front.match(/^[\u4E00-\u9FFF\u3400-\u4DBF々〆〤]+/) : null;
            const targetWord = kanjiMatch ? kanjiMatch[0] : front;
            if (!targetWord) return exampleHtml;

            // Cari elemen <ruby>TARGETWORD<rt>...</rt></ruby> yang persis, terus bungkus utuh
            // (kanji + furigananya) biar bacaannya tetep kebaca pas kata itu di-highlight
            const escaped = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const rubyRegex = new RegExp(`<ruby>${escaped}<rt>.*?<\\/rt><\\/ruby>`);
            const match = exampleHtml.match(rubyRegex);
            if (match) {
                return exampleHtml.replace(rubyRegex, `<span class="example-highlight">${match[0]}</span>`);
            }
            // Fallback kalau kata itu ga ke-ruby-in di kalimat contoh (jarang terjadi)
            if (exampleHtml.includes(targetWord)) {
                return exampleHtml.replace(targetWord, `<span class="example-highlight">${targetWord}</span>`);
            }
            return exampleHtml;
        }

        // Kotak "Contoh Penggunaan" di sisi belakang kartu. Cuma render kalau data.example diisi.
        function fcBuildExampleBox(data) {
            if (!data.example) return '';
            const processedExample = fcProcessExample(data.example, data.front);
            const meaning = data.exampleMeaning ? `<div class="example-id">${data.exampleMeaning}</div>` : '';
            return `<div class="example-box"><div class="example-label">Contoh Penggunaan</div><div class="example-jp">${processedExample}</div>${meaning}</div>`;
        }

        function fcLoadCategory(categoryKey, titleText, subtitleText) {
            fcContainer.innerHTML = "";
            const dataSet = fcFlashcardData[categoryKey] || [];
            
            if(dataSet.length === 0) {
                alert("bentar admin capek, coming soon yah daks");
                return;
            }

            fcDeckTitle.innerText = `${titleText} - ${subtitleText}`;

            const isReverse = document.getElementById('reverse-mode').checked;

            dataSet.forEach(data => {
                // Sisi mana yang nampilin kanji (data.front) beda tergantung mode balik atau bukan
                const frontIsKanjiSide = !isReverse;
                const backIsKanjiSide = isReverse;

                let displayFrontMain = isReverse ? data.backSub : fcRenderFurigana(data.front, data.back);
                let displayFrontSub = data.frontSub; 
                
                let displayBackMain = isReverse ? fcRenderFurigana(data.front, data.back) : data.back;
                let displayBackSub = isReverse ? data.back : data.backSub;

                // Cek beneran ada <ruby> yang kepasang apa nggak, buat nentuin perlu line-height ekstra apa nggak
                const frontHasFurigana = displayFrontMain.includes('<ruby');
                const backHasFurigana = displayBackMain.includes('<ruby');

                const badgesHtml = fcBuildBadges(data);
                const exampleHtml = fcBuildExampleBox(data);

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-face card-front">
                        ${badgesHtml}
                        <div class="card-body">
                            <div class="text-main${frontHasFurigana ? ' has-furigana' : ''}"${frontIsKanjiSide ? ` data-kanji="${data.front}" data-reading="${data.back}"` : ''}>${displayFrontMain}</div>
                            <div class="text-sub">${displayFrontSub}</div>
                        </div>
                    </div>
                    <div class="card-face card-back">
                        ${badgesHtml}
                        <div class="card-body">
                            <div class="text-main${backHasFurigana ? ' has-furigana' : ''}"${backIsKanjiSide ? ` data-kanji="${data.front}" data-reading="${data.back}"` : ''}>${displayBackMain}</div>
                            <div class="text-sub">${displayBackSub}</div>
                        </div>
                        ${exampleHtml}
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    card.classList.toggle('flipped');
                });

                fcContainer.appendChild(card);
            });

            fcActiveCards = Array.from(fcContainer.querySelectorAll('.card'));
            fcCurrentIndex = 0;
            
            fcShuffleBtn.style.display = 'block';
            fcDoneBtn.style.display = 'block';

            fcUpdateDisplay();
            
            fcHomePage.style.display = 'none';
            fcFlashcardPage.style.display = 'flex';
            window.scrollTo(0,0);
            fcFlashcardPage.scrollTop = 0; // reset scroll internal halaman FC (container-nya sendiri, terpisah dari scroll window), biar selalu mulai dari atas tiap buka deck - bukan nyangkut di posisi scroll deck sebelumnya
        }

        function fcUpdateDisplay() {
            const allCards = Array.from(fcContainer.querySelectorAll('.card'));
            
            if (fcActiveCards.length === 0) {
                fcContainer.innerHTML = "<div class='all-done-msg'>すごい🥳🤩🔥!<br><br>Semua kartu di kategori ini sudah kamu hafal!<br>Gas ke part selanjutnya!</div>";
                document.getElementById('fcCounter').innerText = "0 / 0";
                fcShuffleBtn.style.display = 'none';
                fcDoneBtn.style.display = 'none';
                return;
            }
            
            allCards.forEach(card => card.classList.remove('active', 'flipped'));
            fcActiveCards[fcCurrentIndex].classList.add('active');
            document.getElementById('fcCounter').innerText = `${fcCurrentIndex + 1} / ${fcActiveCards.length}`;
        }

        function fcShuffleCards() {
            for (let i = fcActiveCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [fcActiveCards[i], fcActiveCards[j]] = [fcActiveCards[j], fcActiveCards[i]];
            }
            fcCurrentIndex = 0; 
            fcUpdateDisplay();
        }

        function fcMarkAsLearned() {
            if (fcActiveCards.length === 0) return;
            fcActiveCards.splice(fcCurrentIndex, 1);
            if (fcCurrentIndex >= fcActiveCards.length && fcActiveCards.length > 0) {
                fcCurrentIndex = fcActiveCards.length - 1;
            }
            fcUpdateDisplay();
        }

        // --- EVENTS ---
        fcShuffleBtn.addEventListener('click', (e) => { e.preventDefault(); fcShuffleCards(); });
        fcDoneBtn.addEventListener('click', (e) => { e.preventDefault(); fcMarkAsLearned(); });
        
        fcBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fcFlashcardPage.style.display = 'none';
            fcHomePage.style.display = 'flex';
            window.scrollTo(0,0);
        });

        document.querySelectorAll('#home-page-fc .menu-card').forEach(menu => {
            menu.addEventListener('click', async () => {
                const category = menu.getAttribute('data-category');
                const title = menu.querySelector('h3').innerText;
                const subtitle = menu.querySelector('span').innerText;
                
                if (fcAdminPasswords[category]) {
                    const ok = await askDeckPassword(title, 'no no ya', fcAdminPasswords[category]);
                    if (ok) fcLoadCategory(category, title, subtitle);
                } else if (fcExclusivePasswords[category]) {
                    const ok = await askDeckPassword(title, 'Deck ini EXCLUSIVE 💎, minta password ke admin', fcExclusivePasswords[category]);
                    if (ok) fcLoadCategory(category, title, subtitle);
                } else if (fcDeckPasswords[category]) {
                    const ok = await askDeckPassword(title, 'Deck ini digembok buat sauqi ajah😝, minta password ke: fadir, Razan, arival', fcDeckPasswords[category]);
                    if (ok) fcLoadCategory(category, title, subtitle);
                } else {
                    fcLoadCategory(category, title, subtitle);
                }
            });
        });

        // --- SWIPE KARTU (native touch, TANPA Hammer.js) ---
        // Sebelumnya pakai Hammer.js buat deteksi swipe, tapi library itu udah lama gak
        // di-maintain dan banyak dilaporkan gak konsisten/gak jalan di browser HP modern.
        // Diganti pake touchstart/touchmove/touchend polos biar behaviornya kekontrol penuh
        // & gak tergantung library luar yang rawan.
        //
        // FIX STABILITAS SCROLL: dulu area kartu (.card-container) pakai touch-action:pan-x,
        // yang di praktiknya masih ngasih celah buat browser "mulai" native-scroll halaman
        // luar duluan sebelum JS sempet manggil preventDefault() di piksel-piksel pertama
        // gesture (khususnya di iOS: begitu native-scroll kepilih jalan, preventDefault yg
        // dipanggil belakangan gak lagi ngefek buat ngebatalinnya) — makanya kerasa "scroll
        // kartu, eh ikut ke-scroll juga bagian lain". Sekarang .card-container pakai
        // touch-action:none (lihat CSS), jadi browser gak akan pernah nyoba native-scroll
        // dari sentuhan di area ini sama sekali; JS di bawah ini yang pegang kendali penuh,
        // jadi gak ada lagi resiko "bocor" ke scroll halaman luar. Sentuhan DI LUAR
        // .card-container (judul, counter, tombol, area kosong) tetap gak disentuh listener
        // ini sama sekali, jadi tetep jalan native-scroll #flashcard-page seperti biasa.
        //
        // Sisi kartu yang isinya kepanjangan (.card-face dg overflow) tetap dikasih scroll
        // sendiri secara native & mulus (lihat touch-action:pan-y di CSS .card-face); JS di
        // sini "ngalah" & gak ikut campur selama masih ada ruang buat discroll di dalam kartu
        // itu. Begitu udah mentok di ujungnya (atas/bawah), tarikan lanjutan baru dianggap
        // swipe ganti kartu seperti biasa.
        (function fcSetupSwipe() {
            let startX = 0, startY = 0, startTime = 0;
            let dragging = false;        // lagi megang jari di area kartu
            let isVerticalSwipe = false; // udah kedetek geraknya vertikal (bukan sekadar tap)
            let scrollFace = null;       // .card-face yg isinya kepanjangan (kalau ada) di titik sentuh awal
            let contentScrolling = false; // true kalau gesture ini lagi scroll konten DI DALAM kartu (bukan ganti kartu)

            const SWIPE_MIN_DISTANCE = 40; // px, jarak vertikal minimal biar dianggap swipe
            const SWIPE_MAX_TIME = 700;    // ms, durasi maksimal gesture
            const LOCK_THRESHOLD = 8;      // px, ambang buat ngunci arah gesture (vertikal vs horizontal)

            fcContainer.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                startTime = Date.now();
                dragging = true;
                isVerticalSwipe = false;
                contentScrolling = false;

                // Jari mulai nyentuh di sisi kartu yang kontennya beneran kepanjangan
                // (butuh discroll)? Dicatat biar touchmove tau harus "ngalah" ke native
                // scroll dulu, bukan langsung dianggap gesture ganti kartu.
                const face = e.target && e.target.closest ? e.target.closest('.card-face') : null;
                scrollFace = (face && face.scrollHeight > face.clientHeight + 1) ? face : null;
            }, { passive: true });

            fcContainer.addEventListener('touchmove', (e) => {
                if (!dragging || e.touches.length !== 1) return;
                if (contentScrolling) return; // udah diputusin ini scroll konten, biarin native yg jalan penuh

                const dx = e.touches[0].clientX - startX;
                const dy = e.touches[0].clientY - startY;

                if (!isVerticalSwipe && Math.abs(dy) > LOCK_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
                    isVerticalSwipe = true;

                    if (scrollFace) {
                        const atTop = scrollFace.scrollTop <= 0;
                        const atBottom = scrollFace.scrollTop + scrollFace.clientHeight >= scrollFace.scrollHeight - 1;
                        const pullingDown = dy > 0; // jari turun -> nampilin konten yg lebih ATAS
                        const pullingUp = dy < 0;   // jari naik -> nampilin konten yg lebih BAWAH

                        if (!((pullingDown && atTop) || (pullingUp && atBottom))) {
                            // Masih ada ruang buat discroll ke arah itu di dalam kartu ->
                            // serahin sepenuhnya ke native scroll, JANGAN dianggap swipe ganti kartu.
                            contentScrolling = true;
                            return;
                        }
                    }
                }

                if (isVerticalSwipe) {
                    e.preventDefault();
                }
            }, { passive: false });

            function fcHandleSwipeEnd(e) {
                if (!dragging) return;
                dragging = false;
                const wasSwipe = isVerticalSwipe && !contentScrolling;
                isVerticalSwipe = false;
                contentScrolling = false;
                scrollFace = null;
                if (!wasSwipe) return; // cuma tap biasa / lagi scroll konten kartu, biarin event click yg nanganin flip

                const touch = e.changedTouches[0];
                const dy = touch.clientY - startY;
                const dt = Date.now() - startTime;

                if (dt > SWIPE_MAX_TIME || Math.abs(dy) < SWIPE_MIN_DISTANCE) return;

                if (dy < 0) {
                    // swipe ke atas -> kartu berikutnya
                    if (fcCurrentIndex < fcActiveCards.length - 1) {
                        fcCurrentIndex++;
                        fcUpdateDisplay();
                    }
                } else {
                    // swipe ke bawah -> kartu sebelumnya
                    if (fcCurrentIndex > 0) {
                        fcCurrentIndex--;
                        fcUpdateDisplay();
                    }
                }
            }

            fcContainer.addEventListener('touchend', fcHandleSwipeEnd);
            fcContainer.addEventListener('touchcancel', () => {
                dragging = false; isVerticalSwipe = false; contentScrolling = false; scrollFace = null;
            });
        })();

