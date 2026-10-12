// ===== quiz.js — logic Mode Pilihan Ganda (butuh js/quiz-data.js dimuat duluan) =====

        const mcDeckPasswords = {
        IrodoriA2_bunpou_15: "xauusd2024" , 
        IrodoriA2_bunpou_14: "xauusd2024" , 
        IrodoriA2_bunpou_13: "xauusd2024" ,
        kanji_n5_p2: "xauusd2024" ,     // <-- CONTOH DEMO, ganti/hapus sesuai kebutuhan
        };

        // --- PENGATURAN PASSWORD DECK EXCLUSIVE (tier di atas Pro) ---
        const mcExclusivePasswords = {
        // <-- CONTOH DEMO, ganti/hapus sesuai kebutuhan
        };

        const mcHomePage = document.getElementById('home-page-mc');
        const mcQuizPage = document.getElementById('quiz-page');
        const mcDeckTitle = document.getElementById('quizDeckTitle');
        const mcCounterEl = document.getElementById('quizCounter');
        const mcQuestionBox = document.getElementById('questionBox');
        const mcOptionsGrid = document.getElementById('optionsGrid');
        const mcPromptText = document.querySelector('.prompt-text');
        const mcBackBtn = document.getElementById('quizBackBtn');
        const mcProgressFill = document.getElementById('quizProgressFill');
        const mcScoreCorrectEl = document.getElementById('quizScoreCorrect');
        const mcScoreWrongEl = document.getElementById('quizScoreWrong');

        const mcOptionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        let mcCurrentDeck = [];
        let mcCurrentIndex = 0;
        let mcCurrentQuestion = "";
        let mcCurrentCorrectAnswer = "";
        let mcCurrentExplanation = "";
        let mcScoreCorrect = 0;
        let mcScoreWrong = 0;
        let mcWrongLog = [];
        let mcAnswerTimeoutId = null; // id timer "lanjut ke soal berikutnya", biar bisa dibatalin kalau user buru-buru ganti halaman/deck

        function mcUpdateScorePill() {
            mcScoreCorrectEl.innerText = mcScoreCorrect;
            mcScoreWrongEl.innerText = mcScoreWrong;
        }

        function mcLoadCategory(categoryKey, titleText, subtitleText) {
            const dataSet = mcFlashcardData[categoryKey] || [];
            
            if(dataSet.length === 0) {
                alert("early acces, bentar saya coba sempurnain");
                return;
            }

            if (mcAnswerTimeoutId) { clearTimeout(mcAnswerTimeoutId); mcAnswerTimeoutId = null; } // batalin timer soal sebelumnya yg mungkin masih ngambang
            mcCurrentDeck = [...dataSet];
            mcCurrentIndex = 0;
            mcScoreCorrect = 0;
            mcScoreWrong = 0;
            mcWrongLog = [];
            mcUpdateScorePill();

            mcDeckTitle.innerText = `${titleText} - ${subtitleText}`;
            
            mcHomePage.style.display = 'none';
            mcQuizPage.style.display = 'flex';
            window.scrollTo(0,0);
            
            mcRenderQuestion();
        }

        const MC_MAX_SCORE = 250;
        const MC_PASS_SCORE = 200;

        function mcEscapeHtml(str) {
            const div = document.createElement('div');
            div.innerText = str;
            return div.innerHTML;
        }

        function mcRenderQuestion() {
            if (mcCurrentIndex >= mcCurrentDeck.length) {
                const total = mcScoreCorrect + mcScoreWrong;
                const rawScore = total > 0 ? (mcScoreCorrect / total) * MC_MAX_SCORE : 0;
                const finalScore = Math.round(rawScore);
                const isPass = finalScore >= MC_PASS_SCORE;
                const dotPosPct = (finalScore / MC_MAX_SCORE) * 100;
                const passMarkerPct = (MC_PASS_SCORE / MC_MAX_SCORE) * 100;

                let feedback = 'Gas ulang lagi biar makin nempel! 💪';
                let resultTitle = 'Kuis Selesai!';
                if (finalScore === MC_MAX_SCORE) { feedback = 'Sempurna banget, gokil! 🔥🔥'; resultTitle = 'Perfect Score!'; }
                else if (isPass) { feedback = 'Mantap, kamu lulus deck ini!'; resultTitle = 'Lulus!'; }
                else if (finalScore >= MC_PASS_SCORE - 30) { feedback = 'Dikit lagi lulus, ulangi yuk!'; resultTitle = 'Hampir Lulus'; }
                else feedback = 'Belum lulus, yuk diulang biar makin nempel!';

                let reviewHtml = '';
                if (mcWrongLog.length > 0) {
                    const reviewItems = mcWrongLog.map(item => `
                        <div class="quiz-review-item">
                            <div class="quiz-review-question">${mcEscapeHtml(item.question)}</div>
                            <div class="quiz-review-answer wrong"><span>Jawaban kamu</span><span>${mcEscapeHtml(item.selected)}</span></div>
                            <div class="quiz-review-answer correct"><span>Jawaban benar</span><span>${mcEscapeHtml(item.correct)}</span></div>
                            ${item.explanation ? `<div class="quiz-review-note">💡 ${mcEscapeHtml(item.explanation)}</div>` : ''}
                        </div>
                    `).join('');
                    reviewHtml = `
                        <div class="quiz-review-list">
                            <div class="quiz-review-title">📋 Evaluasi Jawaban Salah (${mcWrongLog.length})</div>
                            ${reviewItems}
                        </div>
                    `;
                } else if (total > 0) {
                    reviewHtml = `<div class="quiz-review-empty">🎉 Semua jawaban kamu benar, mantap!</div>`;
                }

                mcQuestionBox.innerHTML = `
                    <div class="quiz-result-card">
                        <div class="quiz-score-number">${finalScore}<span class="max"> / ${MC_MAX_SCORE}</span></div>
                        <div class="quiz-pass-tag ${isPass ? 'pass' : 'fail'}">${isPass ? '✓ Lulus' : '✕ Belum Lulus'}</div>
                        <div class="quiz-gauge-wrap">
                            <div class="quiz-gauge-track">
                                <div class="quiz-gauge-pass-marker" style="left:${passMarkerPct}%;"></div>
                                <div class="quiz-gauge-dot" style="left:${dotPosPct}%; color:${isPass ? '#2ed573' : '#ff4d5e'};"></div>
                            </div>
                            <div class="quiz-gauge-labels">
                                <span>0</span>
                                <span>${MC_MAX_SCORE}</span>
                            </div>
                        </div>
                        <div class="quiz-result-title">${resultTitle}</div>
                        <div class="quiz-result-score">${mcScoreCorrect} benar &nbsp;•&nbsp; ${mcScoreWrong} salah &nbsp;•&nbsp; ${total} soal</div>
                        <div class="quiz-result-feedback">${feedback}</div>
                    </div>
                    ${reviewHtml}
                `;
                mcOptionsGrid.innerHTML = "";
                mcPromptText.style.display = 'none';
                mcCounterEl.innerText = "Selesai";
                mcProgressFill.style.width = '100%';
                return;
            }

            mcPromptText.style.display = 'block';
            const qData = mcCurrentDeck[mcCurrentIndex];
            
            mcQuestionBox.innerText = qData.question;
            mcCurrentQuestion = qData.question;
            mcCurrentCorrectAnswer = qData.correct;
            mcCurrentExplanation = qData.explanation || '';
            mcCounterEl.innerText = `Soal ${mcCurrentIndex + 1} dari ${mcCurrentDeck.length}`;
            mcProgressFill.style.width = `${(mcCurrentIndex / mcCurrentDeck.length) * 100}%`;
            mcUpdateScorePill();

            let options = [qData.correct, ...qData.wrong];

            options = options.sort(() => 0.5 - Math.random());

            mcOptionsGrid.innerHTML = '';
            options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.setAttribute('data-option-label', mcOptionLabels[i] || (i + 1));
                btn.innerText = opt;
                btn.onclick = () => mcHandleAnswer(btn, opt);
                mcOptionsGrid.appendChild(btn);
            });
        }

        function mcHandleAnswer(btn, selectedAns) {
            const allBtns = document.querySelectorAll('.option-btn');
            
            allBtns.forEach(b => {
                b.style.pointerEvents = 'none';
                b.disabled = true;
                if (b !== btn) b.classList.add('dimmed');
            });

            if (selectedAns === mcCurrentCorrectAnswer) {
                btn.classList.remove('dimmed');
                btn.classList.add('correct');
                mcScoreCorrect++;
            } else {
                btn.classList.remove('dimmed');
                btn.classList.add('wrong');
                mcScoreWrong++;
                mcWrongLog.push({
                    question: mcCurrentQuestion,
                    selected: selectedAns,
                    correct: mcCurrentCorrectAnswer,
                    explanation: mcCurrentExplanation
                });
                allBtns.forEach(b => {
                    if (b.innerText === mcCurrentCorrectAnswer) {
                        b.classList.remove('dimmed');
                        b.classList.add('correct');
                    }
                });
            }

            mcUpdateScorePill();

            if (mcAnswerTimeoutId) clearTimeout(mcAnswerTimeoutId); // jaga-jaga kalau ada timer lama yg belum sempet kepake
            mcAnswerTimeoutId = setTimeout(() => {
                mcAnswerTimeoutId = null;
                mcCurrentIndex++;
                mcRenderQuestion();
            }, 1200);
        }

        // --- EVENTS ---
        mcBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (mcAnswerTimeoutId) { clearTimeout(mcAnswerTimeoutId); mcAnswerTimeoutId = null; } // batalin timer lanjut-soal kalau user keburu pencet kembali
            mcQuizPage.style.display = 'none';
            mcHomePage.style.display = 'flex';
            window.scrollTo(0,0);
        });

        document.querySelectorAll('#home-page-mc .menu-card').forEach(card => {
            const category = card.getAttribute('data-category');
            if (mcExclusivePasswords[category]) {
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
            } else if (mcDeckPasswords[category]) {
                const badge = document.createElement('div');
                badge.className = 'pro-badge';
                badge.innerHTML = 'PRO <span class="lock-icon">🔒</span>';
                card.appendChild(badge);
            }
        });

        document.querySelectorAll('#home-page-mc .menu-card').forEach(menu => {
            menu.addEventListener('click', async () => {
                const category = menu.getAttribute('data-category');
                const title = menu.querySelector('h3').innerText;
                const subtitle = menu.querySelector('span').innerText;

                if (mcExclusivePasswords[category]) {
                    const ok = await askDeckPassword(title, 'sumimasennn, mahal mina', mcExclusivePasswords[category]);
                    if (ok) mcLoadCategory(category, title, subtitle);
                } else if (mcDeckPasswords[category]) {
                    const ok = await askDeckPassword(title, 'すみません,  高いですから🙏🏻', mcDeckPasswords[category]);
                    if (ok) mcLoadCategory(category, title, subtitle);
                } else {
                    mcLoadCategory(category, title, subtitle);
                }
            });
        });

