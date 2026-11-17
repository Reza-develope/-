/* =====================================================================
   data/buku/index.js — DAFTAR level & bab Buku Bunpou Irodori. Isi tiap bab ada di data/buku/<level>_<nn>.js
   (mis. a22_01.js), dimuat saat buku dibuka. Format isi bab: lihat README bagian "Buku Bunpou".

   Kolom level:
     id      sama dengan id grup/level di aplikasi (a1 = 入門, a2 = 初級1, a22 = 初級2)
     title   judul yang tampil               sub     keterangan Jepang
     total   jumlah bab seluruhnya di buku   babs    nomor bab yang SUDAH ada isinya (berkas <level>_<nn>.js harus ada)
   Menambah bab baru: buat berkas bab-nya, tambahkan nomornya ke `babs`, lalu jalankan
       node tools/verify-buku.js      (cek penulisan) dan   node tools/bump-build.js   (naikkan versi).
   ===================================================================== */
window.FC = window.FC || {};
FC.bukuIndex = {
  version: 1,
  levels: [
    { id: "a22", title: "Irodori A2.2", sub: "初級2", total: 18, babs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }
  ]
};
