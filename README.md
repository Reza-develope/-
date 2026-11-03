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
js/core/                mesin: util, fsrs, scheduler, store (IndexedDB), data, session, furigana, tts
js/ui/                  tampilan: app (rute, tema), kit (komponen), home, decks, study, practice, stats, settings
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

## Gembok deck dan kuis

Diatur di `data/locks.js`. Ini **gembok lunak di sisi browser**: password dan isi deck tetap bisa dibaca lewat View Source,
jadi cukup untuk membatasi iseng, bukan untuk menyimpan rahasia. Deck yang terkunci tidak ikut sesi harian
kecuali sudah dibuka pada sesi halaman itu.

## Data belajar, cadangan, dan migrasi

- Progres disimpan di **IndexedDB** (`akatsuki-fc`) di browser masing-masing: jadwal tiap kartu, riwayat jawaban,
  kartu bintang, batas harian. Pengaturan kecil ada di `localStorage`.
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
node tools/verify-data.js "<folder versi lama>"   # (opsional) bukti pemecahan data tidak menghilangkan kartu
```
