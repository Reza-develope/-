        // --- NAVIGASI ANTAR MODE ---
        const modeSelectPage = document.getElementById('mode-select-page');
        const homePageFcEl = document.getElementById('home-page-fc');
        const homePageMcEl = document.getElementById('home-page-mc');

        function showModeSelect() {
            homePageFcEl.style.display = 'none';
            homePageMcEl.style.display = 'none';
            modeSelectPage.style.display = 'flex';
            window.scrollTo(0,0);
        }
        // Judul yang ditampilkan di halaman deck FC sesuai grup yang dipilih
        const fcGroupTitles = {
            'A1': 'Irodori A1',
            'A2': 'Irodori A2',
            'A2.2': 'Irodori A2.2',
            'lainnya': 'Lainnya'
        };
        let fcCurrentGroup = 'A1';

        function showModeFC(group) {
            fcCurrentGroup = group || 'A1';
            modeSelectPage.style.display = 'none';
            homePageFcEl.style.display = 'flex';

            const fcMainTitleEl = homePageFcEl.querySelector('.main-title');
            if (fcMainTitleEl) {
                fcMainTitleEl.innerHTML = `${fcGroupTitles[fcCurrentGroup] || 'Flash Card'}<br>kelas 赤月🔥🔥`;
            }

            const fcSearchEl = document.getElementById('fcSearchInput');
            if (fcSearchEl) fcSearchEl.value = '';

            applyFcGroupFilter();
            window.scrollTo(0,0);
        }

        // Filter deck FC berdasarkan grup (A1/A2/A2.2/lainnya) + kata kunci pencarian
        function applyFcGroupFilter() {
            const searchInput = document.getElementById('fcSearchInput');
            const noResultsMsg = document.getElementById('fcNoResults');
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            const cards = document.querySelectorAll('#fcMenuGrid .menu-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const inGroup = card.getAttribute('data-group') === fcCurrentGroup;
                const text = card.innerText.toLowerCase();
                const matchesSearch = query === '' || text.includes(query);
                const show = inGroup && matchesSearch;
                card.style.display = show ? '' : 'none';
                if (show) visibleCount++;
            });

            if (noResultsMsg) noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        function showModeMC() {
            modeSelectPage.style.display = 'none';
            homePageMcEl.style.display = 'flex';
            window.scrollTo(0,0);
        }

        // --- MODAL PASSWORD CUSTOM (dipakai bareng sama mode FC & MC) ---
        // Return Promise<boolean>: true kalo password bener, false kalo dibatalin.
        function askDeckPassword(title, tierText, correctPassword) {
            return new Promise(resolve => {
                const overlay = document.getElementById('password-modal-overlay');
                const input = document.getElementById('modalPasswordInput');
                const errorEl = document.getElementById('modalError');
                const submitBtn = document.getElementById('modalSubmitBtn');
                const cancelBtn = document.getElementById('modalCancelBtn');

                document.getElementById('modalTitle').innerText = `🔒 ${title}`;
                document.getElementById('modalSubtitle').innerText = tierText;
                input.value = '';
                errorEl.innerText = '';
                overlay.style.display = 'flex';
                setTimeout(() => input.focus(), 50);

                function cleanup(result) {
                    overlay.style.display = 'none';
                    submitBtn.removeEventListener('click', onSubmit);
                    cancelBtn.removeEventListener('click', onCancel);
                    input.removeEventListener('keydown', onKey);
                    resolve(result);
                }

                function onSubmit() {
                    if (input.value === correctPassword) {
                        cleanup(true);
                    } else {
                        errorEl.innerText = 'Yah, passwordnya salah! Coba inget-inget lagi deh.';
                        input.classList.add('shake');
                        input.value = '';
                        input.focus();
                        setTimeout(() => input.classList.remove('shake'), 300);
                    }
                }
                function onCancel() { cleanup(false); }
                function onKey(e) {
                    if (e.key === 'Enter') onSubmit();
                    if (e.key === 'Escape') onCancel();
                }

                submitBtn.addEventListener('click', onSubmit);
                cancelBtn.addEventListener('click', onCancel);
                input.addEventListener('keydown', onKey);
            });
        }

        // --- PENGELOMPOKAN DECK FC: Irodori A1 / A2 / A2.2 / Lainnya ---
        document.querySelectorAll('#fcMenuGrid .menu-card').forEach(card => {
            const cat = card.getAttribute('data-category') || '';
            let group = 'lainnya';
            if (cat.startsWith('Irodori_A1')) {
                group = 'A1';
            } else if (cat.startsWith('Irodori_A2_')) {
                group = 'A2';
            } else if (cat.startsWith('Irodori_A3')) {
                group = 'A2.2';
            }
            card.setAttribute('data-group', group);
        });

        // --- SEARCH/FILTER DECK (dipakai bareng sama mode FC & MC) ---
        function setupDeckSearch(inputId, gridId, noResultsId) {
            const searchInput = document.getElementById(inputId);
            const noResultsMsg = document.getElementById(noResultsId);
            if (!searchInput) return;

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.trim().toLowerCase();
                const cards = document.querySelectorAll(`#${gridId} .menu-card`);
                let visibleCount = 0;

                cards.forEach(card => {
                    const text = card.innerText.toLowerCase();
                    const match = text.includes(query);
                    card.style.display = match ? '' : 'none';
                    if (match) visibleCount++;
                });

                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            });
        }

        const fcSearchInputEl = document.getElementById('fcSearchInput');
        if (fcSearchInputEl) {
            fcSearchInputEl.addEventListener('input', applyFcGroupFilter);
        }
        setupDeckSearch('mcSearchInput', 'mcMenuGrid', 'mcNoResults');

