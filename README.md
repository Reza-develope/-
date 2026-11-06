# 赤月 Flashcard — Belajar Bahasa Jepang

Aplikasi flashcard bahasa Jepang (Irodori A1 – A2.2, kanji, kosakata tematik) yang jalan murni di browser:
tanpa server, tanpa build, tanpa framework. Bisa dibuka langsung dari `index.html`, di-host di GitHub Pages,
dan dipasang di layar utama HP sebagai aplikasi (PWA, bisa offline).

## Yang ada di dalamnya

- **Jadwal ulang FSRS-7.** Setiap kartu punya jadwal sendiri (sistem yang sama dengan Anki modern, generasi terbaru).
  Kamu menilai kartu dengan **Lagi / Sulit / Bagus / Mudah**, dan aplikasi menghitung kapan kartu itu perlu muncul lagi
  supaya kamu mengingatnya pada kira-kira 90% (bisa diubah di Pengaturan).
- **Sesi harian ala Anki.** Kartu langkah-belajar → kartu jatuh tempo (yang paling hampir lupa dulu) → kartu baru,
  dengan batas harian global (baru 20, ulasan 200) dan tombol "Belajar lebih" kalau mau lanjut. Ada Batal (undo),
  Tunda sampai besok, Bintang, dan kartu susah (leech) otomatis diberi ⭐.
- **Latihan bebas (cram).** Mengulang deck tanpa mengubah jadwal.
- **Deck dimuat per bagian.** Isi kartu dipecah jadi 62 berkas kecil yang baru diunduh saat dibutuhkan,
  bukan satu berkas 1,4 MB yang dimuat di awal.
- **Deck Saya: bikin deck sendiri tanpa coding.** Siswa bisa membuat, mengubah, menghapus, dan membagikan deck langsung dari web
  (satu per satu, tempel dari Excel/WhatsApp, atau impor `.txt`/`.csv`). Deck buatan sendiri memakai mesin yang sama dengan deck
  bawaan: jadwal FSRS-7, sesi harian, bintang, statistik, offline, dan cadangan. Lihat [Deck Saya](#deck-saya-siswa-bikin-deck-sendiri).
- **Pilihan ganda & Bunpou.** Kuis pilihan ganda dengan skor terbaik tersimpan, plus latihan tata bahasa A1/A2/A2.2.
- **Statistik.** Heatmap 20 minggu, perkiraan ulasan ke depan, sebaran status kartu, retensi 30 hari vs target, sebaran jawaban.
  Setiap grafik punya versi tabel.
- **Furigana, arah kartu (JP→ID / ID→JP), mode gelap, suara, getar** — semuanya di Pengaturan.
- **Penyimpanan di IndexedDB** dengan cadangan JSON/CSV, dan migrasi otomatis dari versi lama.

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

Perintah ini mengganti nomor versi di `index.html` dan `sw.js` sekaligus. Pengguna akan melihat
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
  decks/*.js            isi kartu, satu berkas per deck (dimuat saat dibutuhkan)
  quiz/*.js             isi soal pilihan ganda, satu berkas per kuis
js/core/                mesin: util, fsrs, scheduler, store (IndexedDB), data, session, furigana, tts, userdecks (deck buatan pengguna)
js/ui/                  tampilan: app (rute, tema), kit (komponen), home, decks, mydecks (editor Deck Saya), study, practice, stats, settings
tools/                  skrip pembangun dan tes (tidak ikut dimuat browser)
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

## Gembok deck dan kuis

Diatur di `data/locks.js`. Ini **gembok lunak di sisi browser**: password dan isi deck tetap bisa dibaca lewat View Source,
jadi cukup untuk membatasi iseng, bukan untuk menyimpan rahasia. Deck yang terkunci tidak ikut sesi harian
kecuali sudah dibuka pada sesi halaman itu.

## Data belajar, cadangan, dan migrasi

- Progres disimpan di **IndexedDB** (`akatsuki-fc`) di browser masing-masing: jadwal tiap kartu, riwayat jawaban,
  kartu bintang, batas harian. Pengaturan kecil ada di `localStorage`.
- Deck buatan sendiri (Deck Saya) ada di tabel `kv` yang sama dan ikut dalam cadangan JSON.
- **Pengaturan → Data dan cadangan** menyediakan cadangan JSON (bisa digabung atau menimpa) dan riwayat CSV.
  Progres hanya ada di perangkat itu; pindah HP atau hapus data situs berarti hilang kalau belum dicadangkan.
- Pengguna versi lama dimigrasi otomatis saat pertama membuka: kartu bintang (⭐), mode furigana, dan arah kartu dibawa ke
  sistem baru, dan riwayat hari belajar dari pencatatan lama (`fcSrsV1`) tetap dihitung di statistik dan hari beruntun.
  Jadwal lama dicatat per deck, bukan per kartu, jadi tidak bisa diterjemahkan ke jadwal FSRS per kartu: kartu mulai sebagai
  kartu baru dan jadwalnya terbentuk dari jawabanmu. Data lama tidak dihapus, hanya diarsipkan di dalam IndexedDB.

## Catatan FSRS-7

- Implementasi di `js/core/fsrs.js` dicocokkan angka demi angka dengan pustaka rujukan `ts-fsrs` v6
  (2.539 pemeriksaan, lihat `tools/test-fsrs.js`). Bobot bawaan 34 parameter.
- Langkah belajar kartu baru: 1 menit lalu 10 menit. Langkah ulang setelah lupa: 10 menit.
- **Lompatan awal (model override) aktif secara bawaan**: menjawab *Bagus* pada kartu yang benar-benar baru bisa langsung
  melompat sekitar 5 hari, karena FSRS-7 menilai kamu sudah mengenalnya. Matikan lewat Pengaturan → Penjadwal FSRS-7 →
  "Lompatan awal dari FSRS" kalau ingin langkah belajar yang lebih konservatif.
- Pengacakan jarak kecil (fuzz) bersifat deterministik dan hanya untuk jarak ≥ 2,5 hari, supaya kartu yang dipelajari
  bareng tidak selalu jatuh tempo bersamaan. Jarak maksimum 36.500 hari. Kartu yang gagal 8 kali dianggap leech.
- Hari baru dimulai pukul **04.00** waktu setempat, jadi belajar larut malam masih dihitung hari yang sama.

## Tes

Semua dijalankan dengan Node 18+ tanpa instalasi paket:

```bash
node tools/test-fsrs.js                    # FSRS-7 vs nilai rujukan
node tools/test-scheduler.js               # penjadwal: langkah belajar, lapse, undo, fuzz
TZ=Asia/Jakarta node tools/test-core.js    # store, sesi harian, batas, backup, migrasi
node tools/test-furigana.js                # mesin furigana vs hasil versi lama
node tools/test-userdecks.js               # deck buatan pengguna: pembaca teks, batas, simpan/muat, undo, cadangan, keamanan
node tools/verify-data.js "<folder versi lama>"   # (opsional) bukti pemecahan data tidak menghilangkan kartu
```
