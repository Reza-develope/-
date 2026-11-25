# Catatan perubahan

## v28 — perbaikan hasil audit v27

Semua perubahan diuji: 9 rangkaian tes (`node tools/test-all.js`) dan uji asap di Chromium sungguhan (boot, semua tab, cadangan, atur ulang deck,
unduh offline, halaman bunpou offline, layar galat, kuis, Buku Bunpou, sesi belajar, pulihkan dari teks, migrasi).

### Cadangan dan keamanan data
- **Cadangan tidak lagi "sukses palsu".** Dulu app mencatat "sudah dicadangkan" begitu unduhan *dimulai* dan berhenti mengingatkan 7 hari, padahal
  di WebView/APK unduhan sering gagal diam-diam atau 0 KB. Sekarang satu lembar **Simpan cadangan** (Pengaturan → Keamanan data → Cadangkan) dengan tiga jalur:
  Bagikan (hasilnya pasti), Unduh berkas (kamu diminta menegaskan berkasnya ada dan tidak 0 KB), dan **Salin sebagai teks** (jalan di mana pun). Dicatat hanya setelah ada bukti.
- Tombol "Unduh cadangan" yang duplikat (jalur berbeda, tanpa lembar bagikan) dihapus.
- **Pulihkan dari teks** (Pengaturan → Data dan cadangan → Tempel teks cadangan): pasangan jalur "Salin sebagai teks", berguna di APK.
- **Pulihkan cadangan sekarang lengkap.** Skor terbaik kuis dan waktu cadangan terakhir ikut dipulihkan (dulu diekspor tapi diabaikan saat memulihkan).
  *Gabung* menyatukan tanda paham Buku Bunpou dan percobaan Latihan Bunpou (dulu: bila di perangkat sudah ada satu tanda, seluruh isi cadangan diabaikan).
  *Ganti* membuat catatan bunpou persis seperti cadangan.
- "Hapus semua progres" membuat titik pemulihan **sebelum** catatan bunpou dihapus (dulu terbalik, jadi titik pemulihan tidak memuatnya).
- **Layar galat aman.** Dulu menyuruh "hapus data situs di pengaturan browser" (itu menghapus seluruh progres). Sekarang melarangnya dan menawarkan
  **Selamatkan data** (menyalin cadangan darurat langsung dari IndexedDB) serta tombol Muat ulang.
- **Atur ulang progres deck**: memberi tahu berapa kartu yang juga ada di deck lain (kartu dikenali dari isinya, jadi jadwalnya satu), membuat titik pemulihan, dan ada tombol **Urungkan**.

### Jadwal belajar
- **Lompatan awal FSRS dimatikan secara bawaan.** Bila nyala, langkah belajar dilewati: kartu baru + Bagus muncul lagi ±6 hari kemudian, Mudah ±2 bulan, dan kartu matang yang dijawab
  Lagi baru muncul ±9 jam kemudian. Teks "Cara kerja jadwal" dan petunjuk toggle di Pengaturan sekarang menjelaskan perilaku sebenarnya.
- **Auto-bintang kartu bandel (leech) mati secara bawaan** dan bisa dimatikan (batas 0); dulu batas minimum 2 sehingga tak bisa dimatikan.
- Pengguna lama dimigrasi **sekali** (penanda `sv` di pengaturan) dan diberi tahu lewat toast. Pilihan yang kamu ubah sesudahnya dihormati.
- Hitungan sesi: kartu belajar yang dikembalikan oleh Urungkan tidak lagi dihitung sebagai review.

### Progres per deck
- Kartu yang ada di beberapa deck (609 kartu, ±15%) sekarang dihitung di **setiap** deck yang memuatnya (indeks baru `data/shared.js`, dibuat otomatis).
  Dulu hanya deck tempat kartu pertama kali dipelajari yang kebagian, jadi baris deck lain tampak kosong padahal lembar deck-nya menunjukkan sebaliknya.
  Deck induk/paket tetap menghitung tiap kartu sekali.

### Suara dan furigana
- **Suara (TTS):** 54 kata kerja/sifat dengan bacaan seperti `はし(る)` dibacakan "はし" (ekor dalam kurung terbuang). Sekarang はしる. Penanda `(な)` tetap dibuang,
  dan `／` di dalam kurung tidak lagi memotong kurungnya.
- **Furigana:** batas kanji→okurigana diambil dari kemunculan pertama kana di bacaan dan sisa bacaan tak pernah diperiksa, sehingga 黄色い hanya menampilkan "き" dan 新築祝い
  kehilangan "いわ"; 低く見る salah potong (低=ひ, 見=くみ). Mesin sekarang menelusuri semua potongan yang sah: satu → dipakai; nol atau ambigu → satu furigana di atas seluruh kata
  (tidak menebak). Bonus: 歌う, 失う, 痛い, 最も, お祝い, 日本に行きたい dan lainnya kini dipisah per kanji dengan benar. Bacaan yang tampil sama dengan data di 3.315 kartu berkanji.

### Offline dan PWA
- `manifest.webmanifest` yang **hilang dari zip v27** dibuat ulang (nama, ikon, pintasan) sehingga pemasangan sebagai aplikasi berfungsi dan 404 saat buka hilang.
- Tombol offline sekarang **Unduh semua** dan benar-benar mengunduh deck, kuis, Buku Bunpou, dan 3 halaman Latihan Bunpou (dulu hanya deck, tapi bertuliskan "Siap offline").
- Halaman Latihan Bunpou (iframe) dulu gagal dibuka offline bila tema berbeda dari saat diunduh, lalu yang tampil malah cangkang aplikasi di dalam iframe. Kunci cache-nya sekarang tanpa `?theme=`.
- `data/shared.js` ikut di-precache. BUILD dinaikkan (data Buku Bunpou berubah 22 Nov tanpa kenaikan BUILD, jadi pengguna lama bisa memakai cache lama).

### Data
- **Kotoba N3** (582 kartu, 24 bagian) yang berkas datanya ada tapi tidak terdaftar sehingga tak pernah tampil, kini terdaftar sebagai grup sendiri. Sebelumnya `update-counts` pun menolak berjalan karena shard yatim ini.
  Kalau belum mau dipublikasikan, hapus grup `n3` dan semua deck `N3_kotoba*` dari `data/manifest.js`.
- 10 stub "Segera hadir" kanji (`kanji_N5_P1…P10`, id hanya beda huruf besar/kecil dari deck "100 Kanji N5" `kanji_n5_p…`) dibuang. 14 stub lain tetap. Id stub "kata sifat" dirapikan (P1…P4 = Part 1…4).
- Kartu ganda dalam satu deck digabung (arti dipisah `; `): すみません (A1 bab 1), 出る (A3 bab 8 bagian 3); satu baris ganda dibuang di `pribadi_admin`. Progres kartu tidak terpengaruh (identitas = depan + baca).
- Kuis `kanji_n5` (Irodori A2 bab 09): 4 soal punya opsi kembar (#20, #37, #40, #42) diperbaiki. Pemutar kuis juga membuang opsi kembar bila ada lagi.
- 5 berkas `.txt` di `data/quiz/` (duplikat 100% deck A1 bab 1–5, tak pernah dimuat) dihapus.

### Tampilan dan teks
- Disclaimer dan email admin tidak lagi menempel sebagai petunjuk di bawah "Arah kartu"; kini catatan kaki Beranda (juga untuk pengguna baru yang Berandanya kosong).
- Salah ketik: "Deck ga ketemu" di daftar kuis → "Kuis ga ketemu"; "early acces" → "Early access".

### Kode dan alat
- Pemuat deck, kuis, dan bab Buku Bunpou tidak lagi **menggantung selamanya** bila berkasnya termuat tapi id di dalamnya salah (sekarang gagal dengan pesan yang jelas).
- Fungsi mati dibuang (`isParentOf`, `remaining`, `nextLearnDue`); `reloadDone` yang tak pernah dipanggil kini dipanggil setelah pulihkan/hapus.
- Alat baru: `tools/test-all.js` (semua pemeriksaan sekaligus), `tools/check-data.js` (pemeriksa menyeluruh), `tools/test-v28.js`, dan `tools/test-furigana.js` yang kini mandiri.
  `tools/update-counts.js` juga membuat ulang `data/shared.js`.
- Dihapus karena membutuhkan folder aplikasi lama yang sudah tak ada dan berbahaya bila dijalankan (`build-furigana.js` menimpa `furigana.js` hasil perbaikan):
  `legacy-split.js`, `verify-data.js`, `build-furigana.js`. `test-core.js` diperbaiki (angka basi: 284 deck, 14 kuis, tier gembok).

### Sengaja tidak diubah
- **Gembok deck/kuis** tetap gembok lunak (isi tetap bisa dibuka lewat URL); sudah tertulis di README.
- **Lapisan pengaman** (kanari, jurnal, titik pemulihan otomatis) tetap: berguna untuk galat aplikasi dan penghapusan tak sengaja. Hanya berkas di luar browser yang aman dari
  penghapusan data situs, makanya cadangan keluar browser diutamakan di atas.
- **Id kuis `kanji_n5` / `kanji_n5_p2`** (isinya Irodori A2 bab 09) tidak diganti supaya skor tersimpan tidak hilang; hanya didokumentasikan di README.
- **Latihan Bunpou** masih halaman terpisah (iframe) dan belum terhubung ke jadwal FSRS.
- 10 kuis (Irodori A2 bab 7–15 dan kanji) belum punya kolom `explanation`; pemeriksa data hanya mencatatnya.
