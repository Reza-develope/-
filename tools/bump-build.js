#!/usr/bin/env node
/* Naikkan nomor versi (BUILD) di index.html dan sw.js sekaligus.
   Jalankan setiap kali isi deck/kuis atau kode berubah sebelum di-upload, supaya browser pengguna mengambil berkas baru:
       node tools/bump-build.js            → versi otomatis dari tanggal & jam (mis. 2026.11.02-1530)
       node tools/bump-build.js 2026.12.1  → versi sesuai pilihanmu                                                       */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const d = new Date(), p = (n) => String(n).padStart(2, '0');
const ver = process.argv[2] || d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes());
const edit = (file, re, rep) => {
  const f = path.join(root, file), s = fs.readFileSync(f, 'utf8');
  if (!re.test(s)) { console.error('Pola versi tidak ditemukan di ' + file); process.exit(1); }
  fs.writeFileSync(f, s.replace(re, rep));
};
edit('index.html', /FC\.BUILD = '[^']*'/, "FC.BUILD = '" + ver + "'");
edit('sw.js', /const BUILD = '[^']*'/, "const BUILD = '" + ver + "'");
console.log('BUILD → ' + ver);
