# 赤月 Flashcard — Belajar Bahasa Jepang

Aplikasi flashcard bahasa Jepang (Irodori A1 – A2.2, kanji, kosakata tematik, kotoba N3) yang jalan murni di browser:
tanpa server, tanpa build, tanpa framework. Bisa dibuka langsung dari `index.html`, di-host di GitHub Pages,
dan dipasang di layar utama HP sebagai aplikasi (PWA, bisa offline).

## Yang ada di dalamnya

- **Jadwal ulang FSRS-7.** Setiap kartu punya jadwal sendiri (sistem yang sama dengan Anki modern, generasi terbaru).
  Kamu menilai kartu dengan **Lagi / Sulit / Bagus / Mudah**, dan aplikasi menghitung kapan kartu itu perlu muncul lagi
  supaya kamu mengingatnya pada kira-kira 90% (bisa diubah di Pengaturan).
- **Sesi harian ala Anki.** Kartu langkah-belajar → kartu jatuh tempo (yang paling hampir lupa dulu) → kartu baru,
  dengan batas harian global (baru 20, ulasan 200) dan tombol "Belajar lebih" kalau mau lanjut. Ada Batal (undo),
  Tunda sampai besok, Bintang, dan (kalau dinyalakan di Pengaturan) kartu susah / leech otomatis diberi ⭐.
- **Latihan bebas (cram).** Mengulang deck tanpa mengubah jadwal.
- **Deck dimuat per bagian.** Isi kartu dipecah jadi 69 berkas kecil yang baru diunduh saat dibutuhkan,
  bukan satu berkas 1,4 MB yang dimuat di awal.
- **Deck Saya: bikin deck sendiri tanpa coding.** Siswa bisa membuat, mengubah, menghapus, dan membagikan deck langsung dari web
  (satu per satu, tempel dari Excel/WhatsApp, atau impor `.txt`/`.csv`). Deck buatan sendiri memakai mesin yang sama dengan deck
  bawaan: jadwal FSRS-7, sesi harian, bintang, statistik, offline, dan cadangan. Lihat [Deck Saya](#deck-saya-siswa-bikin-deck-sendiri).
- **Pilihan ganda & Bunpou.** Kuis pilihan ganda dengan skor terbaik tersimpan, plus latihan tata bahasa A1/A2/A2.2.
- **Buku Bunpou.** Penjelasan tata bahasa Irodori yang gampang, per pola: intinya, rumus, penjelasan, contoh bersuara, dan jebakan yang
  sering terjadi. Sekarang berisi dua level, A2 (初級1) dan A2.2 (初級2), masing-masing 18 bab (36 bab, 161 pola). Lihat [Buku Bunpou](#buku-bunpou-penjelasan-gampang-per-pola).
- **Statistik.** Heatmap 20 minggu, perkiraan ulasan ke depan, sebaran status kartu, retensi 30 hari vs target, sebaran jawaban.
  Setiap grafik punya versi tabel.
- **Furigana, arah kartu (JP→ID / ID→JP), mode gelap, suara, getar** — semuanya di Pengaturan.
- **Penyimpanan di IndexedDB** dengan cadangan JSON/CSV (bagikan, unduh dengan konfirmasi, atau salin sebagai teks), dan migrasi otomatis dari versi lama.
- **Catatan perubahan** ada di [CHANGELOG.md](CHANGELOG.md).

## Menjalankan di komputer sendiri

Cara paling mudah: dobel-klik `index.html`. Semua berjalan lewat `file://` (tanpa module ES).
Yang tidak aktif lewat `file://` hanya mode offline (service worker) dan pemasangan sebagai aplikasi.

Untuk meniru kondisi sebenarnya, jalankan server kecil di folder ini:

```bash
python -m http.server 8080      # lalu buka http://localhost:8080
# atau
npx serve .
```

## Memasang di GitHub Pages

1. Buat repo baru, upload seluruh isi folder ini (`index.html` harus berada di akar repo).
2. Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder `/ (root)`.
3. Buka `https://<username>.github.io/<nama-repo>/`.

Semua alamat berkas di aplikasi bersifat relatif, jadi tidak perlu pengaturan tambahan walau repo ada di sub-folder.

### Setiap kali mengubah isi atau kode, naikkan versi

Browser menyimpan salinan berkas supaya aplikasi cepat dan bisa offline. Agar pengguna mendapat berkas terbaru:

```bash
node tools/bump-build.js            # versi otomatis dari tanggal dan jam
node tools/bump-build.js 2026.12.1  # atau tentukan sendiri
```

Sebelum itu jalankan `node tools/test-all.js` (semua tes dan pemeriksa data; gagal = jangan deploy dulu).
Perintah di atas mengganti nomor versi di `index.html` dan `sw.js` sekaligus. Pengguna akan melihat
"Versi baru siap dipakai." saat membuka aplikasi lagi. Progres belajar mereka tidak tersentuh.

## Struktur folder

```
index.html              cangkang aplikasi (pemuatan skrip, versi BUILD)
manifest.webmanifest    metadata PWA (nama, ikon, pintasan)
sw.js                   service worker (offline)
assets/                 ikon bulan merah (SVG + PNG)
bunpou/                 tiga halaman latihan tata bahasa (A1, A2, A2.2)
css/                    tokens.css (warna, huruf, mode gelap) · base.css (komponen) · screens.css (layar)
data/
  manifest.js           daftar grup, deck, dan kuis (tanpa isi kartu)
  locks.js              gembok deck dan kuis
  shared.js             DIBUAT OTOMATIS: daftar kartu yang ada di lebih dari satu deck (jangan diedit; dibuat ulang oleh tools/update-counts.js)
  decks/*.js            isi kartu, satu berkas per deck (dimuat saat dibutuhkan)
  quiz/*.js             isi soal pilihan ganda, satu berkas per kuis
  buku/index.js         daftar level dan bab Buku Bunpou
  buku/<level>_<nn>.js  isi Buku Bunpou, satu berkas per bab (dimuat saat bab dibuka), mis. a22_01.js
js/core/                mesin: util, fsrs, scheduler, store (IndexedDB), data, session, furigana, tts, userdecks (deck buatan pengguna), buku (pemuat Buku Bunpou)
js/ui/                  tampilan: app (rute, tema), kit (komponen), home, decks, mydecks (editor Deck Saya), study, practice, buku (Buku Bunpou), stats, settings
tools/                  tes dan pemeriksa data (tidak ikut dimuat browser): test-all.js menjalankan semuanya
```

## Menambah atau mengubah deck

Setiap deck punya dua bagian: satu entri di `data/manifest.js` dan satu berkas kartu di `data/decks/`.

1. **Berkas kartu** `data/decks/nama_deck.js`:

   ```js
   FC.defineShard("nama_deck", {
     "nama_deck": [
       { front: "段ボール", back: "だんボール", backSub: "kardus" },
       { front: "ごみ",     back: "ごみ",       backSub: "sampah" }
     ]
   });
   ```

   `front` = tulisan Jepang (kanji), `back` = cara baca, `backSub` = arti. Kartu kosakata/bunpou boleh menambah
   `level`, `type`, `example`, `exampleMeaning`.

2. **Entri** di `FC.manifest.decks` pada `data/manifest.js`, misalnya
   `{ id: "nama_deck", group: "a1", title: "Judul", sub: "Keterangan", shard: "nama_deck", count: 0 }`.
3. Jalankan `node tools/update-counts.js` untuk mengisi `count` otomatis, lalu `node tools/bump-build.js`.

Deck gabungan memakai `children: ["id_a", "id_b"]` sebagai pengganti `shard`; kartu dari anak-anaknya digabung
dan duplikat (depan + baca sama) dibuang. Ketentuan kolom lainnya (`parent`, `pack`, `patch`, `soon`, `keywords`)
ada di komentar kepala `data/manifest.js`.

**Identitas kartu.** Setiap kartu dikenali dari isi tulisan depan dan belakangnya (bukan dari nomor urut atau nama deck).
Artinya kartu yang sama di dua deck memakai satu jadwal belajar, dan menyisipkan kartu di tengah deck tidak merusak progres.
Konsekuensinya: kalau kamu mengubah tulisan `front` atau `back` sebuah kartu, ia dianggap kartu baru. Mengubah `backSub` (arti) aman.

Kartu yang muncul di beberapa deck (±15%) dicatat otomatis di `data/shared.js` (dibuat oleh `node tools/update-counts.js`). Dengan itu angka
progres tiap deck (dipelajari, jatuh tempo, matang) dihitung dari ISI kartu: kartu yang dipelajari lewat deck A juga terhitung di deck B yang memuatnya,
dan *Atur ulang progres deck* memberi tahu berapa kartu yang ikut kembali baru di deck lain (dan bisa diurungkan).

Dua arti untuk tulisan dan bacaan yang sama (mis. すみません "terima kasih" dan "maaf") jangan dibuat dua baris di satu deck; gabungkan jadi satu
kartu dengan pemisah `; ` di `backSub`. Kalau tidak, hanya baris pertama yang pernah tampil. `node tools/check-data.js` menandai kasus ini.

**Kuis.** `kanji_n5` dan `kanji_n5_p2` di `data/quiz/` adalah kuis "Irodori A2 bab 09" (nama lama dipertahankan supaya skor tersimpan tidak hilang;
id kuis tidak sama dengan id deck bernama sama). Kuis tidak boleh punya opsi kembar; pemeriksa data menandainya.

## Deck Saya: siswa bikin deck sendiri

Siapa pun yang memakai aplikasi bisa membuat deck sendiri langsung dari web, tanpa coding dan tanpa minta ke pemilik situs.
Deck buatan sendiri memakai mesin yang sama dengan deck bawaan (jadwal FSRS-7, sesi harian, bintang, statistik, mode offline).

**Cara pakai (untuk siswa)**

1. Buka tab **Deck** → bagian **Deck Saya** → **Buat deck**, lalu beri nama.
2. Isi kartunya dengan salah satu cara:
   - **Satu per satu** di editor: tulisan Jepang → cara baca → arti, Enter untuk pindah kolom. Cara baca boleh dikosongkan
     kalau katanya hanya hiragana/katakana (otomatis diisi sama dengan tulisannya).
   - **Tempel banyak**: tempel daftar dari catatan, WhatsApp, Excel, atau Google Sheets. Pratinjau menunjukkan kartu yang akan masuk
     dan baris yang tidak terbaca beserta alasannya.
   - **Impor deck dari teks** (di tab Deck): sama, tetapi langsung membuat deck baru. Bisa juga memilih berkas `.txt` atau `.csv`.
3. Deck baru otomatis ikut sesi harian di Beranda (bisa dimatikan di editor). Kartu bisa diubah lagi kapan saja,
   termasuk dari menu ⋯ di tengah sesi belajar.
4. **Bagikan deck** menghasilkan teks untuk dikirim lewat WhatsApp; penerima cukup memakai *Impor deck dari teks*.

**Format teks tempelan** (satu kartu per baris, pemisah dikenali otomatis):

```
# Deck: Kosakata kantor
# Keterangan: Bab 5
会社 | かいしゃ | perusahaan
ごみ | ごみ | sampah
食べる | たべる | makan | 毎日ごはんを食べます。 | Saya makan nasi setiap hari. | verb
```

- Kolom: `tulisan Jepang | cara baca | arti | contoh kalimat | arti contoh | jenis kata`. Hanya dua yang pertama wajib:
  dua kolom dibaca `tulisan Jepang | arti`.
- Jenis kata yang dikenal: `noun`, `verb`, `i-adj`, `na-adj`, `pronoun`, `adjective`, `kanji`.
- Pemisah: `|` (atau `｜`), Tab (hasil salin dari Excel/Google Sheets), titik koma atau koma (CSV), dan tabel Markdown.
  Baris yang diawali `#` diabaikan; `# Deck:` dan `# Keterangan:` mengisi nama deck. Baris yang tidak terbaca dilewati dan dijelaskan di pratinjau.
- Kartu yang persis sama (tulisan, cara baca, arti) di dalam satu deck dilewati.

**Batas**: 100 deck; 3.000 kartu per deck; nama deck 60 karakter, keterangan 80, tulisan Jepang 100, cara baca 150,
arti 300, contoh kalimat dan artinya masing-masing 300; satu tempelan maksimal 600.000 karakter.

**Di balik layar**

- Setiap deck disimpan sebagai satu entri `ud:<id>` di tabel `kv` IndexedDB (skema database tidak berubah).
  Kodenya ada di `js/core/userdecks.js` (data, penyimpanan, pembaca teks) dan `js/ui/mydecks.js` (tampilan).
- Kartu punya nomor tetap `<id deck>.<urutan>`, jadi **mengubah tulisan sebuah kartu tidak mengulang jadwalnya**
  (beda dengan deck bawaan yang mengenali kartu dari isinya). Menghapus kartu atau deck ikut menghapus jadwal dan bintangnya;
  tombol **Urungkan** mengembalikan semuanya.
- Apa pun yang dibaca dari penyimpanan atau berkas cadangan dibersihkan lagi (karakter kontrol, batas panjang), dan isi kartu hanya
  ditampilkan sebagai teks, jadi tulisan yang berisi kode HTML tidak dijalankan.
- Deck buatan sendiri **ikut cadangan JSON**. Pulihkan → *Gabung* menambahkan deck dari cadangan (yang lebih baru menang);
  *Ganti* menghapus progres lebih dulu, tetapi deck yang hanya ada di perangkat itu tetap dipertahankan.
  *Hapus semua progres* tidak menghapus deck buatan sendiri, hanya jadwal belajarnya.
- Deck hanya ada di browser pemakainya. Kalau sebuah deck bagus ingin dijadikan deck resmi untuk semua siswa,
  minta pembuatnya memakai **Bagikan deck**, lalu masukkan teksnya sebagai deck bawaan (bagian di atas).

## Buku Bunpou: penjelasan gampang per pola

Dibuka dari **Latihan → Buku Bunpou**. Daftar bab → ketuk satu bab → baca ringkasannya, lalu geser per pola dengan tombol bawah
(atau panah kiri/kanan di keyboard). Tiap pola berisi: **Intinya** (satu kalimat), **Rumus** (bagian tetap berwarna merah, bagian yang
diisi berwarna abu), tabel bentuk bila perlu, **Penjelasan**, 4–6 **Contoh** (ada tombol suara, terjemahan, dan bagian pola disorot),
**Awas!** (kesalahan yang sering terjadi), dan tombol **Tandai sudah paham**. Tombol **ふ** menyalakan furigana, ada kotak cari
(nama pola, kata kunci, arti, atau “bab 4”). Contoh kalimat dan penjelasannya ditulis sendiri, bukan salinan buku pelajaran.

**Menambah bab** (misalnya Bab 13 untuk A2.2):

1. Salin `data/buku/a22_01.js` menjadi `data/buku/a22_13.js`, ubah `n: 13` lalu isi judul, “bisa”, dan pola-polanya. Format penandanya
   dijelaskan di kepala berkas `a22_01.js`: `漢字[よみ]` untuk furigana (setiap kanji harus punya bacaan), `{sorot}`, `**tebal**`,
   `「kutipan Jepang」`; di rumus, token berawalan `=` adalah bagian tetap.
2. Tambahkan angka bab ke daftar `babs` level itu di `data/buku/index.js`.
3. Jalankan `node tools/verify-buku.js` (struktur, kanji tanpa furigana, kurung tak seimbang, jumlah baris contoh vs terjemahan,
   bacaan yang tidak cocok dengan mesin furigana). Tambahkan `--list` untuk mencetak semua kalimat beserta bacaan kana-nya supaya
   bisa dibaca ulang.
4. `node tools/bump-build.js` supaya pengguna mendapat versi terbaru.

**Menambah level baru** (misalnya A2 atau A1): tambahkan satu objek di `levels` pada `data/buku/index.js`
(`id` huruf kecil/angka, `title`, `sub`, `total` bab, `babs` yang sudah ada) dan berkas `data/buku/<id>_<nn>.js`
yang memanggil `FC.defineBuku('<id>', { n: … })`. Tidak ada kode lain yang perlu diubah.

## Gembok deck dan kuis

Diatur di `data/locks.js`. Ini **gembok lunak di sisi browser**: password dan isi deck tetap bisa dibaca lewat View Source,
jadi cukup untuk membatasi iseng, bukan untuk menyimpan rahasia. Deck yang terkunci tidak ikut sesi harian
kecuali sudah dibuka pada sesi halaman itu.

## Data belajar, cadangan, dan migrasi

- Progres disimpan di **IndexedDB** (`akatsuki-fc`) di browser masing-masing: jadwal tiap kartu, riwayat jawaban,
  kartu bintang, batas harian. Pengaturan kecil ada di `localStorage`.
- Deck buatan sendiri (Deck Saya) ada di tabel `kv` yang sama dan ikut dalam cadangan JSON.
- Tanda “sudah paham” di Buku Bunpou ada di `localStorage` (kunci `bunpou:buku`) dan ikut dalam cadangan JSON.
- **Cadangan dibuat dari Pengaturan → Keamanan data → Cadangkan** (satu pintu). Lembar *Simpan cadangan* menawarkan tiga jalur karena tak ada satu pun yang
  pasti jalan di semua perangkat: **Bagikan** (HP; hasilnya pasti), **Unduh berkas** (browser tidak bisa memastikan berkasnya tersimpan, jadi kamu diminta
  menegaskan, dan kalau berkasnya tidak ada atau 0 KB kamu diarahkan ke jalur berikutnya), dan **Salin sebagai teks** (jalan di mana pun, termasuk APK/WebView;
  tempel ke catatan atau email ke diri sendiri). Cadangan baru dicatat "sudah" setelah ada bukti, bukan saat unduhan baru dimulai.
- **Pulihkan** di Pengaturan → Data dan cadangan, dari berkas atau dari teks yang ditempel. *Gabung* menyatukan (kartu yang lebih baru menang; skor kuis
  tertinggi; tanda paham Buku Bunpou dan percobaan Latihan Bunpou disatukan); *Ganti* membuat hasilnya persis seperti cadangan. Riwayat CSV ada di bagian yang sama.
  Progres hanya ada di perangkat itu; pindah HP atau hapus data situs berarti hilang kalau belum dicadangkan.
- **Kalau aplikasi gagal dimulai**, layar galat menawarkan *Selamatkan data* (menyalin cadangan darurat langsung dari IndexedDB). Jangan hapus data situs sebelum itu.
- **Pengaman progres (Pengaturan → Keamanan data).** Tulisan yang gagal ditandai dan disinkron ulang otomatis; titik pemulihan otomatis disimpan di database terpisah
  (7 terbaru + 1 terbanyak + salinan sebelum Ganti/Hapus); hari belajar dicatat terpisah dari riwayat supaya hari beruntun lebih kuat; "kanari" di localStorage
  mendeteksi data yang tiba-tiba kosong; ada pengingat dan tombol cadangan 1 ketuk (lembar bagikan di HP); dan catatan kejadian penyimpanan untuk diagnosis.
  Semua salinan di dalam browser ikut hilang bila data situs dihapus atau alamat/browser berganti. Hanya berkas cadangan di luar browser yang aman dari itu.
- Pengguna versi lama dimigrasi otomatis saat pertama membuka: kartu bintang (⭐), mode furigana, dan arah kartu dibawa ke
  sistem baru, dan riwayat hari belajar dari pencatatan lama (`fcSrsV1`) tetap dihitung di statistik dan hari beruntun.
  Jadwal lama dicatat per deck, bukan per kartu, jadi tidak bisa diterjemahkan ke jadwal FSRS per kartu: kartu mulai sebagai
  kartu baru dan jadwalnya terbentuk dari jawabanmu. Data lama tidak dihapus, hanya diarsipkan di dalam IndexedDB.

## Catatan FSRS-7

- Implementasi di `js/core/fsrs.js` dicocokkan angka demi angka dengan pustaka rujukan `ts-fsrs` v6
  (2.539 pemeriksaan, lihat `tools/test-fsrs.js`). Bobot bawaan 34 parameter.
- Langkah belajar kartu baru: 1 menit lalu 10 menit. Langkah ulang setelah lupa: 10 menit.
- **Lompatan awal (model override) mati secara bawaan (sejak v28).** Bila dinyalakan, langkah belajar dilewati: kartu baru yang dijawab *Bagus* baru muncul
  ±6 hari lagi dan *Mudah* ±2 bulan (padahal baru dilihat sekali), dan kartu matang yang dijawab *Lagi* baru muncul ±9 jam kemudian, bukan 10 menit.
  Nyalakan lewat Pengaturan → Penjadwal FSRS-7 → "Lompatan awal dari FSRS" kalau kamu memang ingin itu. Pengguna lama dimigrasi sekali (toast memberi tahu).
- Pengacakan jarak kecil (fuzz) bersifat deterministik dan hanya untuk jarak ≥ 2,5 hari, supaya kartu yang dipelajari
  bareng tidak selalu jatuh tempo bersamaan. Jarak maksimum 36.500 hari. Auto-bintang kartu bandel (leech) mati bawaan; atur batasnya di Pengaturan (0 = mati).
- Hari baru dimulai pukul **04.00** waktu setempat, jadi belajar larut malam masih dihitung hari yang sama.

## Tes

Semua dijalankan dengan Node 18+ tanpa instalasi paket:

```bash
node tools/test-all.js                     # SEMUA di bawah ini + pemeriksa data, berurutan (jalankan sebelum deploy)
node tools/check-data.js                   # sintaks, struktur, count, kartu ganda/kosong, kuis, shared.js, PWA, BUILD
node tools/test-fsrs.js                    # FSRS-7 vs nilai rujukan
node tools/test-scheduler.js               # penjadwal: langkah belajar, lapse, undo, fuzz
TZ=Asia/Jakarta node tools/test-core.js    # store, sesi harian, batas, backup, migrasi
node tools/test-furigana.js                # furigana: bacaan yang tampil selalu sama dengan data, kasus yang dulu salah
TZ=Asia/Jakarta node tools/test-v28.js     # perbaikan v28: suara, migrasi, pulihkan cadangan, statistik deck, atur ulang deck, pemuat
node tools/test-userdecks.js               # deck buatan pengguna: pembaca teks, batas, simpan/muat, undo, cadangan, keamanan
node tools/verify-buku.js                  # isi Buku Bunpou: struktur, furigana, penanda, jumlah contoh (--list untuk baca ulang)
node tools/update-counts.js                # setelah mengubah kartu/manifest: segarkan count dan data/shared.js
```
