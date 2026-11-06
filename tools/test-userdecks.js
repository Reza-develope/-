#!/usr/bin/env node
'use strict';
/* =====================================================================
   tools/test-userdecks.js — uji fitur "Deck Saya" (js/core/userdecks.js + pemasangannya di data.js/store.js):
   pembersihan teks, baca/tulis teks (| Tab Markdown CSV), siklus hidup deck & kartu, integrasi dengan sesi FSRS
   (jadwal, batas harian, undo, bintang), penyimpanan & cadangan (muat ulang, gabung/ganti, hapus progres),
   data rusak/berbahaya, dan keamanan tampilan contoh kalimat. IndexedDB dites di browser (QA Playwright).
   Pakai:  TZ=Asia/Jakarta node tools/test-userdecks.js
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
global.window = globalThis;

const LS = new Map();
global.localStorage = { getItem: k => (LS.has(k) ? LS.get(k) : null), setItem: (k, v) => LS.set(k, String(v)), removeItem: k => LS.delete(k), key: i => Array.from(LS.keys())[i], get length() { return LS.size; } };
let scriptLoads = 0;      // berapa kali "mengunduh" berkas deck (harus tidak bertambah untuk deck pengguna)
global.document = {
  head: { appendChild(s) { scriptLoads++; const f = path.join(ROOT, s.src.split('?')[0]); setTimeout(() => { if (!fs.existsSync(f)) return s.onerror && s.onerror(); vm.runInThisContext(fs.readFileSync(f, 'utf8'), { filename: f }); }, 0); } },
  createElement() { return { remove() {} }; }
};
const CORE = ['js/core/util.js', 'js/core/fsrs.js', 'js/core/scheduler.js', 'js/core/store.js', 'js/core/data.js', 'js/core/session.js', 'js/core/userdecks.js', 'js/core/furigana-data.js', 'js/core/furigana.js', 'js/ui/cardface.js'];

const clone = x => JSON.parse(JSON.stringify(x));
/** Muat aplikasi dari nol (seperti membuka halaman). state = {kv, cards, marks}: isi penyimpanan yang dibawa dari "sesi" sebelumnya. */
async function boot(state) {
  for (const k of Object.keys(require.cache)) if (k.startsWith(path.join(ROOT, 'js'))) delete require.cache[k];
  delete globalThis.FC; LS.clear();
  const warn = console.warn; console.warn = (m, ...r) => { if (!/\[store\] Penyimpanan browser/.test(String(m))) warn(m, ...r); };
  for (const f of CORE) require(path.join(ROOT, f));
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'data/manifest.js'), 'utf8'));
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'data/locks.js'), 'utf8'));
  await FC.store.ready; console.warn = warn;
  if (state) {
    state = clone(state);
    FC.store._kv = state.kv || {};
    (state.cards || []).forEach(r => FC.store._cards.set(r.k, r));
    (state.marks || []).forEach(m => FC.store._marks.set(m.cid, m));
  }
  FC.data.init();
  return FC;
}
/** Foto isi penyimpanan saat ini (seperti isi IndexedDB yang bertahan setelah halaman dimuat ulang). */
const takeState = () => clone({ kv: FC.store._kv, cards: Array.from(FC.store.allCards().values()), marks: FC.store.stars() });

let pass = 0, fail = 0; const bad = [];
const ok = (name, cond, info) => { if (cond) pass++; else { fail++; bad.push(name + (info !== undefined ? ' → ' + info : '')); } };
const J = x => JSON.stringify(x);
const T0 = new Date(2026, 0, 15, 9, 0).getTime();

(async () => {
  let fc = await boot();
  let { util: U, store, data: D, session, userDecks: UD, face: F } = fc;
  const refresh = () => ({ util: U, store, data: D, session, userDecks: UD, face: F } = FC);
  const parse = t => UD.parseText(t);
  const front = r => r.cards.map(c => c.front).join(',');

  /* ============ 1. pembersihan teks ============ */
  ok('clean: kontrol, spasi lebar-nol, pembalik arah, BOM dibuang', UD.clean('a\u0000b\u200bc\u202ed\u2066e\ufefff', 50) === 'abcdef');
  ok('clean: tab/baris baru jadi spasi tunggal, ujung dipangkas', UD.clean('  a\t\tb\r\nc  ', 50) === 'a b c');
  ok('clean: NFC (が terurai → utuh)', UD.clean('が', 50) === 'が' && UD.clean('が', 50).length === 1);
  ok('clean: batas panjang tidak memotong pasangan surrogat', UD.clean('𠮟𠮟𠮟', 2) === '𠮟𠮟' && UD.clean('abc', 2) === 'ab');
  ok('clean: ZWJ emoji dipertahankan', UD.clean('👨\u200d👩', 50) === '👨\u200d👩');
  ok('clean: teks HTML tetap teks biasa (diamankan saat ditampilkan)', UD.clean('<b>x</b>', 50) === '<b>x</b>');
  ok('check: depan kosong', !UD.check({ front: '', backSub: 'a' }).ok && UD.check({ front: '', backSub: 'a' }).field === 'front');
  ok('check: arti kosong', UD.check({ front: '犬', back: 'いぬ' }).field === 'backSub');
  ok('check: kana murni tanpa bacaan → bacaan = tulisan', UD.check({ front: 'ごみ', backSub: 'sampah' }).card.back === 'ごみ');
  ok('check: kanji tanpa bacaan → bacaan tetap kosong', UD.check({ front: '犬', backSub: 'anjing' }).card.back === '');
  ok('check: jenis kata di luar daftar dibuang, yang sah dipakai', UD.check({ front: 'a', backSub: 'b', type: 'verb' }).card.type === 'verb' && UD.check({ front: 'a', backSub: 'b', type: '<x>' }).card.type === undefined);
  ok('check: arti contoh tanpa contoh dibuang', UD.check({ front: 'a', backSub: 'b', exampleMeaning: 'z' }).card.exampleMeaning === undefined);

  /* ============ 2. baca teks ============ */
  let r = parse('会社 | かいしゃ | perusahaan\nごみ | ごみ | sampah\n学校 | がっこう | sekolah');
  ok('teks |: tiga kartu, kolom benar', r.cards.length === 3 && r.delimiter === 'pipe' && J(r.cards[0]) === J({ front: '会社', back: 'かいしゃ', backSub: 'perusahaan' }), J(r.cards[0]));
  r = parse('会社 ｜ かいしゃ ｜ perusahaan\n犬｜いぬ｜anjing');
  ok('teks ｜ lebar-penuh (ketikan IME) dikenali', r.cards.length === 2 && r.cards[1].backSub === 'anjing' && r.delimiter === 'pipe');
  r = parse('会社\tかいしゃ\tperusahaan\n猫\tねこ\tkucing');
  ok('teks Tab (tempel dari Excel/Sheets)', r.delimiter === 'tab' && r.cards.length === 2 && r.cards[1].back === 'ねこ');
  r = parse('| Kanji | Hiragana | Arti |\n|---|:---:|---:|\n| 会社 | かいしゃ | perusahaan |\n| 犬 | いぬ | anjing |');
  ok('tabel Markdown: judul & garis pemisah dilewati', r.cards.length === 2 && r.skipped.length === 0 && front(r) === '会社,犬', J(r.cards) + J(r.skipped));
  r = parse('Kanji | Hiragana | Arti\n漢字 | かんじ | huruf kanji');
  ok('judul kolom dilewati, tapi kartu "漢字" tidak salah dikira judul', r.cards.length === 1 && r.cards[0].front === '漢字');
  r = parse('会社,かいしゃ,perusahaan\n"食べる","たべる","makan, memakan"');
  ok('CSV koma dengan kutipan', r.delimiter === ',' && r.cards.length === 2 && r.cards[1].backSub === 'makan, memakan', J(r.cards));
  r = parse('会社;かいしゃ;perusahaan\n犬;いぬ;anjing');
  ok('CSV titik koma (Excel berbahasa Indonesia)', r.delimiter === ';' && r.cards.length === 2);
  r = parse('"a ""b"" c",x,"baris1\nbaris2"');
  ok('CSV: kutipan ganda & baris baru di dalam sel', r.cards.length === 1 && r.cards[0].front === 'a "b" c' && r.cards[0].backSub === 'baris1 baris2', J(r.cards));
  r = parse('ねこ | kucing\n犬 | anjing');
  ok('dua kolom = depan | arti (kana murni: bacaan disalin)', r.cards.length === 2 && r.cards[0].back === 'ねこ' && r.cards[0].backSub === 'kucing' && r.cards[1].back === '');
  r = parse('# Deck: Kosakata kantor\n# Keterangan: Bab 5\n# Format: depan | bacaan | arti\n会社 | かいしゃ | perusahaan');
  ok('baris # = komentar; "# Deck:" dan "# Keterangan:" mengisi nama', r.title === 'Kosakata kantor' && r.sub === 'Bab 5' && r.cards.length === 1 && r.skipped.length === 0);
  r = parse('\ufeff会社 | かいしゃ | perusahaan\r\n\r\n  犬 |  いぬ | anjing  \r\n');
  ok('BOM, CRLF, baris kosong, spasi berlebih', r.cards.length === 2 && r.cards[1].front === '犬' && r.cards[1].back === 'いぬ');
  r = parse('会社 | かいしゃ | perusahaan | 会社に行きます。 | Saya pergi ke kantor. | noun\n犬 | いぬ | anjing | | | alien');
  ok('kolom contoh, arti contoh, jenis; jenis tak dikenal dibuang', r.cards[0].example === '会社に行きます。' && r.cards[0].exampleMeaning === 'Saya pergi ke kantor.' && r.cards[0].type === 'noun' && r.cards[1].type === undefined && r.cards[1].example === undefined, J(r.cards));
  r = parse('hanya satu\n犬 | いぬ |\n | | anjing\n犬 | いぬ | anjing\n犬 | いぬ | anjing\n猫 | ねこ | kucing');
  ok('baris tak sah dilewati dengan alasan & nomor baris', r.cards.length === 2 && r.skipped.length === 4 && r.skipped[0].line === 1 && /satu kolom/.test(r.skipped[0].reason) && /arti kosong/.test(r.skipped[1].reason) && /depan kosong/.test(r.skipped[2].reason) && /sama persis/.test(r.skipped[3].reason), J(r.skipped));
  r = parse('犬 | anjing |\n猫 | kucing |');
  ok('tabel dua kolom dengan | di ujung baris: tetap depan | arti', r.cards.length === 2 && r.cards[0].backSub === 'anjing' && r.cards[0].back === '' && r.skipped.length === 0, J(r));
  r = parse('犬\tanjing\t\t\n猫\tkucing\t\t');
  ok('tabel dua kolom yang dilebarkan Excel (Tab kosong di ujung): tetap depan | arti', r.cards.length === 2 && r.cards[1].backSub === 'kucing' && r.skipped.length === 0, J(r));
  r = parse('ごみ | sampah\n犬 | いぬ | anjing');
  ok('baris 2 kolom dan 3 kolom boleh bercampur', r.cards.length === 2 && r.cards[0].back === 'ごみ' && r.cards[0].backSub === 'sampah' && r.cards[1].back === 'いぬ' && r.cards[1].backSub === 'anjing', J(r.cards));
  r = parse('犬 | いぬ | anjing |||\n猫 | ねこ | kucing | | |');
  ok('kolom kosong berlebih di ujung baris tiga kolom diabaikan', r.cards.length === 2 && r.skipped.length === 0 && r.cards[1].example === undefined, J(r));
  r = parse('\t会社 | かいしゃ | perusahaan\n\t学校 | がっこう | sekolah\n犬 | いぬ | anjing');
  ok('Tab nyasar (indentasi) di baris pipa tidak merusak seluruh daftar', r.delimiter === 'pipe' && r.cards.length === 3 && r.skipped.length === 0 && front(r) === '会社,学校,犬', J(r));
  r = parse('会社 | かいしゃ | perusahaan\t\n学校 | がっこう | sekolah\t');
  ok('Tab di ujung baris pipa juga tidak jadi pemisah', r.delimiter === 'pipe' && r.cards.length === 2 && r.cards[0].backSub === 'perusahaan', J(r));
  r = parse('会社 | かいしゃ | perusahaan\n学校 | がっこう | sekolah\n犬\tいぬ\tanjing');
  ok('baris Tab di tengah daftar pipa tetap terbaca (per baris)', r.delimiter === 'pipe' && r.cards.length === 3 && r.cards[2].front === '犬' && r.cards[2].back === 'いぬ' && r.cards[2].backSub === 'anjing' && r.skipped.length === 0, J(r));
  r = parse('会社\tかいしゃ\tperusahaan\n学校\tがっこう\tsekolah\n犬 | いぬ | anjing');
  ok('baris pipa di tengah daftar Tab tetap terbaca (per baris)', r.delimiter === 'tab' && r.cards.length === 3 && r.cards[2].front === '犬' && r.cards[2].backSub === 'anjing' && r.skipped.length === 0, J(r));
  r = parse('会社\tかいしゃ\tdibaca a | b\n学校\tがっこう\tsekolah');
  ok('daftar Tab yang isinya memuat tanda | tetap Tab', r.delimiter === 'tab' && r.cards.length === 2 && r.cards[0].backSub === 'dibaca a | b', J(r));
  r = parse('\t会社,かいしゃ,perusahaan\n学校,がっこう,sekolah');
  ok('CSV dengan satu Tab nyasar tetap dibaca sebagai CSV', r.delimiter === ',' && r.cards.length === 2, J(r));
  r = parse('tanpa pemisah sama sekali\nbaris lain');
  ok('tanpa pemisah: semua dilewati, tidak error', r.cards.length === 0 && r.skipped.length === 2 && r.delimiter === null);
  ok('teks kosong / null / bukan teks', parse('').cards.length === 0 && parse(null).cards.length === 0 && parse(12345).cards.length === 0);
  const many = Array.from({ length: 3050 }, (_, i) => `kata${i} | kata${i} | arti${i}`).join('\n');
  const t0 = Date.now(); r = parse(many); const dt = Date.now() - t0;
  ok('batas 3.000 kartu per deck: sisanya dilewati dan ditandai terpotong', r.cards.length === UD.LIMITS.cards && r.truncated && r.skipped.length === 50, r.cards.length + '/' + r.skipped.length);
  ok('kecepatan: 3.050 baris < 300 ms', dt < 300, dt + ' ms');
  r = parse('x'.repeat(UD.LIMITS.paste + 5000) + ' | a | b');
  ok('teks terlalu besar dipotong tanpa macet', r.truncated === true);
  r = parse(`${'あ'.repeat(300)} | ${'い'.repeat(300)} | ${'a'.repeat(900)} | ${'u'.repeat(900)} | ${'v'.repeat(900)}`);
  ok('panjang tiap kolom dibatasi', r.cards[0].front.length === 100 && r.cards[0].back.length === 150 && r.cards[0].backSub.length === 300 && r.cards[0].example.length === 300 && r.cards[0].exampleMeaning.length === 300);
  r = parse('<img src=x onerror=alert(1)> | <b>x</b> | "&" <script>');
  ok('HTML di isi kartu tidak dibuang (hanya diamankan saat tampil)', r.cards.length === 1 && r.cards[0].front.indexOf('<img') === 0);

  /* acak: tidak boleh melempar error, dan semua kartu hasil harus sah */
  {
    const rnd = U.mulberry32(20261105), alpha = ['|', '｜', '\t', ',', ';', '"', '\n', '\r\n', '#', ' ', '-', ':', 'a', 'Z', '犬', 'ね', '漢', '<', '>', '&', '\u0000', '\u200b', '😀', '々', 'Deck:', '---', 'kanji'];
    let threw = 0, invalid = 0;
    for (let n = 0; n < 3000; n++) {
      let s = ''; const len = Math.floor(rnd() * 60);
      for (let i = 0; i < len; i++) s += alpha[Math.floor(rnd() * alpha.length)];
      try {
        const rr = parse(s);
        rr.cards.forEach(c => { if (!c.front || !c.backSub || c.front.length > 100 || c.backSub.length > 300 || /[\u0000-\u001f]/.test(c.front + c.back + c.backSub)) invalid++; });
      } catch (e) { threw++; }
    }
    ok('uji acak 3.000 teks: tanpa error', threw === 0, threw);
    ok('uji acak: setiap kartu hasil sah (depan & arti terisi, tanpa karakter kontrol)', invalid === 0, invalid);
  }

  /* ============ 3. siklus hidup deck ============ */
  const manifestDecks = FC.manifest.decks.length, bawaan = D.decks.length;
  ok('data: grup "Deck Saya" selalu ada dan paling atas', D.groups[0].id === 'saya' && D.groups[0].user === true && D.groupById.get('saya').title === 'Deck Saya' && D.groups.length === FC.manifest.groups.length + 1);
  const mk = UD.create({ title: '  Kosakata   kantor ', sub: 'Bab 5' });
  const id = mk.id;
  ok('create: id berawalan u_ + 8 huruf/angka', mk.ok && /^u_[a-z0-9]{8}$/.test(id), id);
  ok('create: terdaftar di FC.data sebagai deck daun milik pengguna', D.deck(id).user === true && D.deck(id).shard === id && D.deck(id).group === 'saya' && D.deck(id).count === 0 && D.deck(id).title === 'Kosakata kantor' && D.isUserDeck(id));
  ok('create: manifest bawaan tidak tersentuh', FC.manifest.decks.length === manifestDecks && D.decks.length === bawaan + 1);
  ok('create: tersimpan di kv "ud:<id>"', store.getKv('ud:' + id) && store.getKv('ud:' + id).title === 'Kosakata kantor' && store.getKv('ud:' + id).cards.length === 0);
  ok('create: nama kosong ditolak', !UD.create({ title: '   ' }).ok && UD.create({ title: '' }).error === 'Beri nama deck dulu.');
  ok('topDecks("saya") & pencarian menemukan deck', D.topDecks('saya').length === 1 && D.searchDecks('kantor').some(d => d.id === id) && D.searchDecks('deck saya').some(d => d.id === id));
  ok('deck baru kosong bisa diselesaikan (0 kartu)', (await D.resolve(id)).length === 0);

  const a1 = UD.addCard(id, { front: '会社', back: 'かいしゃ', backSub: 'perusahaan', type: 'noun', example: '会社に行きます。', exampleMeaning: 'Saya ke kantor.' });
  const a2 = UD.addCard(id, { front: 'ごみ', backSub: 'sampah' });
  const a3 = UD.addCard(id, { front: '犬', back: 'いぬ', backSub: 'anjing' });
  ok('addCard: id kartu "<deck>.<nomor>" berurutan', a1.ok && a1.card._id === id + '.1' && a2.card._id === id + '.2' && a3.card._id === id + '.3' && a3.total === 3, a1.card && a1.card._id);
  ok('addCard: kolom tersimpan, kana murni bacaan disalin', a2.card.back === 'ごみ' && a1.card.example === '会社に行きます。' && a1.card.type === 'noun');
  ok('kartu: _id tidak ikut terserialisasi / terhitung kolom', !('_id' in JSON.parse(JSON.stringify(a1.card))) && Object.keys(a1.card).indexOf('_id') < 0);
  const cards = await D.resolve(id);
  ok('resolve: isi deck = kartu yang ditambahkan, urutan terjaga', cards.length === 3 && front({ cards }) === '会社,ごみ,犬' && D.deck(id).count === 3);
  ok('cid: memakai id tetap, bukan hash isi', D.cid(cards[0]) === id + '.1' && D.cid(cards[0]) !== U.cardId('会社', 'かいしゃ'));
  ok('findCard / shardOfCard / originOf terhubung', D.findCard(id + '.2') === cards[1] && D.shardOfCard(id + '.2') === id && D.originOf(cards[1]) === id);
  ok('kv memuat 3 kartu dengan id', store.getKv('ud:' + id).cards.length === 3 && store.getKv('ud:' + id).cards[2].id === id + '.3' && store.getKv('ud:' + id).seq === 4);
  ok('addCard: kartu persis sama ditolak (bertanda duplikat)', UD.addCard(id, { front: '犬', back: 'いぬ', backSub: 'anjing' }).duplicate === true);
  ok('addCard: kata sama dengan arti lain diizinkan', UD.addCard(id, { front: '犬', back: 'いぬ', backSub: 'anjing (hewan)' }).ok);
  ok('addCard: depan/arti kosong ditolak dengan nama kolom', UD.addCard(id, { front: '', backSub: 'x' }).field === 'front' && UD.addCard(id, { front: 'x', backSub: '' }).field === 'backSub');
  ok('addCard: deck tidak ada', UD.addCard('u_tidakada', { front: 'a', backSub: 'b' }).ok === false);

  const mk2 = UD.create({ title: 'Bab 10' }), mk3 = UD.create({ title: 'Bab 2' });
  ok('urutan deck pengguna: urut nama, angka dibaca sebagai angka', D.topDecks('saya').map(d => d.title).join('|') === 'Bab 2|Bab 10|Kosakata kantor', D.topDecks('saya').map(d => d.title).join('|'));
  ok('rename: ganti nama & keterangan, urutan ikut berubah', UD.rename(mk3.id, { title: 'Zzz', sub: 'ket' }).ok && D.topDecks('saya').map(d => d.title).join('|') === 'Bab 10|Kosakata kantor|Zzz' && D.deck(mk3.id).sub === 'ket' && store.getKv('ud:' + mk3.id).title === 'Zzz');
  ok('rename: nama kosong ditolak, nama lama tetap', !UD.rename(mk3.id, { title: ' ' }).ok && D.deck(mk3.id).title === 'Zzz');
  const bulk = UD.addCards(mk2.id, [{ front: 'a', back: 'a', backSub: 'satu' }, { front: 'b', back: 'b', backSub: 'dua' }, { front: 'b', back: 'b', backSub: 'dua' }, { front: '', backSub: 'kosong' }, { front: 'c', backSub: 'tiga' }]);
  ok('addCards: sekali simpan, duplikat/rusak dilewati', bulk.ok && bulk.added === 3 && bulk.skipped === 2 && bulk.total === 3 && store.getKv('ud:' + mk2.id).cards.length === 3, J(bulk));
  ok('addCards: hasil parseText bisa langsung dimasukkan', UD.addCards(mk2.id, parse('d | d | empat\ne | e | lima').cards).added === 2 && UD.cards(mk2.id).length === 5);
  UD.removeCard(mk2.id, UD.cards(mk2.id)[4]._id); UD.removeCard(mk2.id, UD.cards(mk2.id)[3]._id);
  const capped = UD.addCards(mk3.id, Array.from({ length: 3005 }, (_, i) => ({ front: 'k' + i, backSub: 'a' })));
  ok('addCards: berhenti di 3.000, ditandai capped', capped.added === 3000 && capped.capped === true && D.deck(mk3.id).count === 3000);
  ok('addCard: deck penuh ditolak', /maksimal/i.test(UD.addCard(mk3.id, { front: 'baru', backSub: 'x' }).error));
  UD.remove(mk3.id); await store.flush();

  /* ============ 4. integrasi sesi belajar (FSRS) ============ */
  store.patch({ active: [id], newPerDay: 20, revPerDay: 200, mix: 'campur', newOrder: 'urut', dir: 'f' });
  let t = session.today(T0);
  ok('beranda: deck aktif milik pengguna → kartu baru terhitung', t.newAvail === 4 && t.newShown === 4 && t.pending === 4, J([t.newAvail, t.newShown, t.pending]));
  let s = await session.build({ scope: { type: 'deck', id }, now: T0 });
  ok('sesi deck: 4 kartu baru, judul = nama deck', s.counts().n === 4 && s.title === 'Kosakata kantor', s.title + ' ' + s.counts().n);
  let it = s.next(T0);
  ok('sesi: kartu pertama = kartu pertama deck (urut)', it.card.front === '会社' && it.cid === id + '.1' && it.key === id + '.1:f' && it.kind === 'n');
  let res = s.answer(3, T0 + 5000);
  const rec = store.getCard(id + '.1:f');
  ok('jawab: catatan FSRS memakai id kartu, deck daun, dan shard milik pengguna', rec && rec.id === id + '.1' && rec.dk === id && rec.sh === id && rec.dir === 'f' && res.first === true, J(rec && [rec.id, rec.dk, rec.sh]));
  ok('jawab: hitungan harian kartu baru bertambah', store.daily(U.dayIndex(T0, 4)).nw === 1);
  s.undo();
  ok('undo: catatan kartu baru dihapus lagi', store.getCard(id + '.1:f') === null);
  s = await session.build({ scope: { type: 'deck', id }, now: T0 }); it = s.next(T0); s.answer(3, T0 + 1000);
  const stats = session.leafStats(T0 + 2000);
  ok('statistik per deck daun: 1 kartu dipelajari', stats[id] && stats[id].learned === 1 && session.deckStats(id, stats).learned === 1);
  const ds = await session.build({ scope: { type: 'all' }, now: T0 + 3000 });
  ok('sesi harian: kartu deck aktif ikut, yang sudah dijawab tak dihitung baru', ds.counts().n === 3, ds.counts().n);
  store.set('dir', 'r');
  const rs = await session.build({ scope: { type: 'deck', id }, now: T0 }); const rit = rs.next(T0); rs.answer(3, T0 + 1000);
  ok('arah Indonesia→Jepang: catatan terpisah (:r), 4 kartu baru', rs.initial.n === 4 && store.getCard(rit.cid + ':r') && store.getCard(rit.cid + ':r').dir === 'r');
  store.set('dir', 'f');
  ok('latihan bebas: kartu deck pengguna tersedia', (await session.cramCards({ scope: 1, type: 'deck', id })).length === 4);

  /* ubah kartu yang sudah dipelajari → jadwal tetap */
  const before = J(store.getCard(id + '.1:f'));
  store.setStar(id + '.1', cards[0], id, true);
  const up = UD.updateCard(id, id + '.1', { front: '会社員', back: 'かいしゃいん', backSub: 'karyawan perusahaan' });
  ok('updateCard: berhasil, id tetap', up.ok && up.card._id === id + '.1' && D.findCard(id + '.1').front === '会社員');
  ok('updateCard: jadwal belajar TIDAK berubah/hilang meski tulisannya diganti', J(store.getCard(id + '.1:f')) === before && store.getCard(id + '.1:f').dk === id);
  ok('updateCard: salinan di Kartu Susah ikut diperbarui', store.stars().filter(m => m.cid === id + '.1')[0].c.front === '会社員');
  ok('updateCard: contoh & jenis kata lama dibersihkan bila dikosongkan', !('example' in D.findCard(id + '.1')) && !('type' in D.findCard(id + '.1')) && store.getKv('ud:' + id).cards[0].example === undefined);
  ok('updateCard: menabrak kartu lain ditolak', UD.updateCard(id, id + '.3', { front: 'ごみ', back: 'ごみ', backSub: 'sampah' }).duplicate === true);
  ok('updateCard: kartu tidak ada', UD.updateCard(id, id + '.99', { front: 'a', backSub: 'b' }).ok === false);
  ok('latihan bebas & resolve memakai tulisan terbaru kartu yang diubah', (await session.cramCards({ type: 'deck', id })).some(c => c.front === '会社員') && (await D.resolve(id)).some(c => c.front === '会社員') && !(await D.resolve(id)).some(c => c.front === '会社'));

  /* hapus kartu + batalkan */
  const rm = UD.removeCard(id, id + '.1');
  ok('removeCard: kartu, jadwal, dan bintangnya hilang', rm.ok && rm.hadProgress && D.findCard(id + '.1') === null && store.getCard(id + '.1:f') === null && !store.isStarred(id + '.1'));
  ok('removeCard: hitungan deck turun', D.deck(id).count === 3 && UD.cards(id).length === 3 && UD.cards(id).findIndex(c => c._id === id + '.1') < 0, D.deck(id).count);
  ok('removeCard: undo mengembalikan kartu di posisi semula beserta jadwal & bintang', rm.undo() === true && UD.cards(id)[0]._id === id + '.1' && J(store.getCard(id + '.1:f')) === before && store.isStarred(id + '.1'));
  ok('removeCard: undo kedua tidak berlaku', rm.undo() === false);
  const rm2 = UD.removeCard(id, id + '.2'); UD.removeCard(id, id + '.3');
  ok('removeCard: setelah ditinggal, undo lama tetap aman (deck sama)', rm2.undo() === true && UD.cards(id).some(c => c._id === id + '.2'));

  /* hapus deck */
  const orphanKey = id + '.zz:f';
  store.putCard({ k: orphanKey, id: id + '.zz', dir: 'f', sh: id, dk: id, st: 2, due: T0, ivl: 3, created: T0 });          // catatan yatim milik deck ini
  const loadsBefore = scriptLoads;
  const del = await UD.remove(id);
  ok('remove: semua jadwal (termasuk yatim) & bintang deck ikut terhapus', del.ok && Array.from(store.allCards().keys()).filter(k => k.indexOf(id) === 0).length === 0 && store.stars().filter(m => m.sh === id).length === 0, J(Array.from(store.allCards().keys())));
  ok('remove: hilang dari FC.data, penyimpanan, dan sesi harian', !D.deck(id) && !UD.has(id) && store.getKv('ud:' + id) === undefined && store.get('active').indexOf(id) < 0 && D.findCard(id + '.2') === null);
  ok('remove: shard milik deck terhapus dianggap kosong, tanpa mengunduh berkas', J(await D.loadShard(id)) === '{}' && scriptLoads === loadsBefore);
  ok('remove: deck lain tidak ikut terhapus', D.deck(mk2.id) && UD.cards(mk2.id).length === 3);
  const t2 = session.today(T0 + 60000);
  ok('beranda setelah deck dihapus: tidak ada kartu yatim yang menunggu', t2.review === 0 && t2.learn === 0, J([t2.review, t2.learn]));

  /* hapus deck → urungkan */
  {
    const du = UD.create({ title: 'Untuk urungkan', cards: [{ front: '火', back: 'ひ', backSub: 'api' }, { front: '水', back: 'みず', backSub: 'air' }] });
    store.patch({ active: [du.id] });
    const sx = await session.build({ scope: { type: 'deck', id: du.id }, now: T0 }); sx.next(T0); sx.answer(3, T0 + 1000);
    store.setStar(du.id + '.2', UD.cards(du.id)[1], du.id, true);
    const recBefore = J(store.getCard(du.id + '.1:f')), updBefore = store.getKv('ud:' + du.id).updated;
    const gone = await UD.remove(du.id);
    ok('remove (untuk urungkan): semuanya hilang', gone.ok && gone.cards === 2 && gone.records === 1 && !D.deck(du.id) && store.getCard(du.id + '.1:f') === null && !store.isStarred(du.id + '.2') && store.get('active').indexOf(du.id) < 0 && store.getKv('ud:' + du.id) === undefined);
    const back = await gone.undo();
    ok('urungkan hapus deck: deck, id kartu, jadwal, bintang, dan sesi harian kembali', back === true && D.deck(du.id).count === 2 && UD.cards(du.id)[1]._id === du.id + '.2' && J(store.getCard(du.id + '.1:f')) === recBefore && store.isStarred(du.id + '.2') && store.get('active').indexOf(du.id) >= 0 && store.getKv('ud:' + du.id).cards.length === 2 && store.getKv('ud:' + du.id).updated === updBefore && D.findCard(du.id + '.1').front === '火', J([back, D.deck(du.id)]));
    ok('urungkan hapus deck: hanya sekali', (await gone.undo()) === false);
    ok('urungkan hapus deck: kartu bisa dipelajari lagi', (await session.build({ scope: { type: 'deck', id: du.id }, now: T0 + 5000 })).counts().n === 1);
    const gone2 = await UD.remove(du.id);
    ok('urungkan bisa diulang pada penghapusan berikutnya', (await gone2.undo()) === true && D.deck(du.id).count === 2);
    await UD.remove(du.id);
  }
  { /* pratinjau impor */
    const pv = UD.create({ title: 'Pratinjau', cards: [{ front: 'a', back: 'a', backSub: 'x' }] });
    const c1 = UD.countNew(pv.id, [{ front: 'a', back: 'a', backSub: 'x' }, { front: 'b', back: 'b', backSub: 'y' }, { front: '', backSub: 'z' }, { front: 'b', back: 'b', backSub: 'y' }]);
    ok('countNew: baru, sudah ada, rusak (termasuk dobel di dalam impor)', J([c1.fresh, c1.dup, c1.bad]) === J([1, 2, 1]), J(c1));
    ok('countNew.cards: hanya kartu yang akan masuk (tanpa yang kembar/rusak), berurutan', c1.cards.length === 1 && c1.cards[0].front === 'b' && c1.cards[0].backSub === 'y', J(c1.cards));
    const c3 = UD.countNew(pv.id, [{ front: 'a', back: 'a', backSub: 'x' }]);
    ok('countNew: semua kembar → fresh 0, cards kosong', c3.fresh === 0 && c3.cards.length === 0 && c3.dup === 1, J(c3));
    const c2 = UD.countNew(null, [{ front: 'a', backSub: 'x' }]);
    ok('countNew: deck baru (id null) dengan ruang penuh', c2.fresh === 1 && c2.room === UD.LIMITS.cards);
    await UD.remove(pv.id);
  }

  /* ============ 5. penyimpanan, muat ulang, cadangan ============ */
  const deckA = UD.create({ title: 'Kanji N5', sub: '日本語', cards: parse('日 | ひ | hari\n月 | つき | bulan').cards });
  store.patch({ active: [deckA.id, mk2.id] });
  { const sx = await session.build({ scope: { type: 'deck', id: deckA.id }, now: T0 }); sx.next(T0); sx.answer(4, T0 + 1000); }
  store.setStar(deckA.id + '.2', UD.cards(deckA.id)[1], deckA.id, true);
  await store.flush();
  const snapshot = takeState();
  const backup = clone(await store.exportJSON());
  ok('cadangan: kunci ud:* ikut tersimpan', Object.keys(backup.kv).filter(k => k.indexOf('ud:') === 0).length === 2 && backup.kv['ud:' + deckA.id].cards.length === 2);

  await boot(snapshot); refresh();
  ok('muat ulang halaman: tanpa load() deck belum terpasang', D.decks.length === FC.manifest.decks.length && !D.deck(deckA.id));
  const ld = UD.load();
  ok('load(): semua deck pulih (nama, isi, id kartu, urutan)', ld.decks === 2 && ld.skipped === 0 && D.deck(deckA.id).title === 'Kanji N5' && D.deck(deckA.id).sub === '日本語' && front({ cards: UD.cards(deckA.id) }) === '日,月' && UD.cards(deckA.id)[1]._id === deckA.id + '.2' && D.topDecks('saya').length === 2);
  ok('load(): progres belajar & bintang tetap nyambung ke kartu yang sama', store.getCard(deckA.id + '.1:f') && D.findCard(deckA.id + '.1').front === '日' && session.leafStats(T0 + 5000)[deckA.id].learned === 1 && store.isStarred(deckA.id + '.2') && D.findCard(deckA.id + '.2').front === '月');
  ok('load(): id kartu berikutnya melanjutkan nomor (tidak menimpa)', UD.addCard(deckA.id, { front: '火', back: 'ひ', backSub: 'api' }).card._id === deckA.id + '.3');
  UD.load(); ok('load() dua kali aman (tidak menggandakan)', D.topDecks('saya').length === 2 && D.decks.filter(d => d.user).length === 2);

  /* cadangan: ganti & gabung */
  await boot(); refresh();
  const rep = await store.importJSON(JSON.parse(JSON.stringify(backup)), 'replace'); UD.load();
  ok('pulihkan (ganti): deck, kartu, dan jadwal kembali', rep.decks === 2 && D.deck(deckA.id) && UD.cards(deckA.id).length === 2 && store.getCard(deckA.id + '.1:f') !== null, J(rep));
  const localOnly = UD.create({ title: 'Hanya di perangkat ini', cards: [{ front: '空', back: 'そら', backSub: 'langit' }] }).id;
  const rep2 = await store.importJSON(clone(backup), 'replace'); UD.load();
  ok('pulihkan (ganti): deck yang hanya ada di perangkat tetap ada, deck cadangan tetap pulih', rep2.decks === 2 && D.deck(localOnly) && UD.cards(localOnly).length === 1 && D.deck(deckA.id) && D.deck(mk2.id) && D.topDecks('saya').length === 3, D.topDecks('saya').map(d => d.title).join('|'));
  const edited = clone(backup); edited.kv['ud:' + deckA.id].title = 'Versi cadangan';
  UD.rename(deckA.id, { title: 'Versi perangkat' }); await store.importJSON(edited, 'replace'); UD.load();
  ok('pulihkan (ganti): deck yang ada di keduanya diganti versi cadangan', D.deck(deckA.id).title === 'Versi cadangan');
  const newer = JSON.parse(JSON.stringify(backup)); newer.kv['ud:' + deckA.id].title = 'Dari cadangan baru'; newer.kv['ud:' + deckA.id].updated = Date.now() + 99999;
  const older = JSON.parse(JSON.stringify(backup)); older.kv['ud:' + deckA.id].title = 'Dari cadangan lama'; older.kv['ud:' + deckA.id].updated = 5;
  await store.importJSON(older, 'merge'); UD.load();
  ok('pulihkan (gabung): versi cadangan yang lebih LAMA tidak menimpa', D.deck(deckA.id).title === 'Versi cadangan', D.deck(deckA.id).title);
  await store.importJSON(newer, 'merge'); UD.load();
  ok('pulihkan (gabung): versi cadangan yang lebih BARU menang', D.deck(deckA.id).title === 'Dari cadangan baru');
  const solo = JSON.parse(JSON.stringify(backup)); Object.keys(solo.kv).forEach(k => { if (k === 'ud:' + mk2.id) delete solo.kv[k]; });
  await boot(); refresh(); await store.importJSON(solo, 'merge'); UD.load();
  ok('pulihkan (gabung) ke perangkat kosong: hanya deck yang ada di cadangan', D.topDecks('saya').length === 1 && D.deck(deckA.id));
  await boot(snapshot); refresh(); UD.load();
  ok('cadangan lama (tanpa deck pengguna) tetap bisa dipulihkan', (await store.importJSON({ format: 'akatsuki-fc-backup', version: 2, cards: [], log: [], marks: [], kv: {} }, 'merge')).decks === 0 && D.topDecks('saya').length === 2);

  /* hapus semua progres: deck dipertahankan */
  ok('(sebelum hapus progres) ada jadwal & bintang', store.allCards().size === 1 && store.starCount() === 1);
  await store.reset(false, 'ud:'); UD.load();
  ok('hapus progres: jadwal & bintang hilang tapi deck buatan pengguna selamat', store.allCards().size === 0 && store.starCount() === 0 && store.getKv('ud:' + deckA.id) && D.topDecks('saya').length === 2 && UD.cards(deckA.id).length === 2 && front({ cards: UD.cards(deckA.id) }) === '日,月');
  await store.reset(false);
  ok('reset biasa (tanpa pengecualian) tetap menghapus semuanya', store.kvKeys('ud:').length === 0);

  /* ============ 6. data rusak / tidak dipercaya ============ */
  const evil = {
    'ud:u_evil0001': { id: 'u_evil0001', title: '<img src=x onerror=alert(1)>\u202e' + 'T'.repeat(500), sub: 5, created: 'x', cards: [
      { id: 'u_evil0001.1', front: ' 犬\u0000 ', back: 'いぬ', backSub: 'anjing' }, { id: 'u_evil0001.1', front: 'dobel', backSub: 'id ganda' },
      { id: 'u_lain.7', front: 'milik deck lain', backSub: 'id salah' }, { id: 5, front: 'id bukan teks', backSub: 'x' }, null, 'teks', { front: '', backSub: 'tanpa depan' },
      { id: 'u_evil0001.2', front: 'a'.repeat(5000), back: { toString() { throw new Error('boom'); } }, backSub: 'ok' }
    ] },
    'ud:u_evil0002': 'bukan objek', 'ud:u_evil0003': { id: 'u_lainlagi', title: 'id tak cocok kunci', cards: [] },
    'ud:../../x': { id: '../../x', title: 'kunci jahat', cards: [] }, 'ud:u_evil0005': { id: 'u_evil0005', title: 'cards bukan array', cards: { a: 1 } },
    'ud:u_evil0006': null, 'ud:A': { id: 'A', title: 'id terlalu pendek/besar', cards: [] }
  };
  await boot(); refresh(); store._kv = evil;     // objek mentah (tanpa kloning JSON) supaya toString yang melempar error ikut diuji
  let loaded; let threw = null; try { loaded = UD.load(); } catch (e) { threw = e; }
  ok('data rusak: load() tidak melempar error', !threw, threw && threw.message);
  ok('data rusak: kunci/id tak sah dibuang, deck yang bisa diselamatkan dimuat', loaded.decks === 2 && loaded.skipped >= 4 && D.deck('u_evil0001') && D.deck('u_evil0005') && !D.deck('u_lainlagi'), J(loaded));
  const ev = UD.cards('u_evil0001');
  ok('data rusak: nama dibersihkan & dipotong, kartu rusak dibuang', D.deck('u_evil0001').title.length <= 60 && D.deck('u_evil0001').title.indexOf('\u202e') < 0 && ev.length === 5, ev.length + ' ' + ev.map(c => c._id).join());
  ok('data rusak: id ganda/salah diberi id baru, tak ada tabrakan', new Set(ev.map(c => c._id)).size === ev.length && ev.every(c => c._id.indexOf('u_evil0001.') === 0), ev.map(c => c._id).join());
  ok('data rusak: teks kartu dibersihkan (kontrol dibuang, panjang dibatasi)', ev[0].front === '犬' && ev.some(c => c.front.length === 100));
  await boot(); refresh();
  Array.from({ length: 105 }, (_, i) => i).forEach(i => { const rec = { v: 1, id: 'u_many' + String(i).padStart(4, '0'), title: 'D' + i, cards: [] }; store._kv['ud:' + rec.id] = rec; });
  ok('batas 100 deck saat memuat', UD.load().decks === 100 && D.decks.filter(d => d.user).length === 100);
  ok('batas 100 deck saat membuat', /Maksimal 100/.test(UD.create({ title: 'ke-101' }).error));

  /* ============ 7. bolak-balik teks ============ */
  await boot(); refresh();
  const rt = UD.create({ title: 'Uji | bolak-balik', sub: 'ket', cards: [
    { front: '会社', back: 'かいしゃ', backSub: 'perusahaan', type: 'noun', example: '会社に行く。', exampleMeaning: 'Pergi ke kantor.' }, { front: 'ごみ', backSub: 'sampah' },
    { front: 'a|b', back: 'c｜d', backSub: 'e\tf' }, { front: '犬', back: 'いぬ', backSub: 'anjing, hewan; "peliharaan"' }] });
  const txt = UD.toText(rt.id), back = parse(txt);
  ok('toText: judul, keterangan, dan format (lengkap karena ada contoh) di komentar', txt.split('\n').slice(0, 3).join('\n') === '# Deck: Uji | bolak-balik\n# Keterangan: ket\n# Format: depan | bacaan | arti | contoh | arti contoh | jenis', txt.split('\n').slice(0, 3).join('|'));
  ok('toText → parseText: judul & keterangan terbaca lagi', back.title === 'Uji | bolak-balik' && back.sub === 'ket', J([back.title, back.sub]));
  ok('toText → parseText: semua kartu kembali persis sama (tanda | diganti ¦)', back.cards.length === 4 && J(back.cards[0]) === J(UD.cards(rt.id).map(c => ({ front: c.front, back: c.back, backSub: c.backSub, example: c.example, exampleMeaning: c.exampleMeaning, type: c.type }))[0]) && back.cards[2].front === 'a¦b' && back.cards[3].backSub === 'anjing, hewan; "peliharaan"', J(back.cards));
  const plain = UD.create({ title: 'Polos', cards: parse('犬 | いぬ | anjing').cards });
  ok('toText: tanpa contoh/jenis → hanya tiga kolom, tanpa baris Keterangan bila kosong', UD.toText(plain.id) === '# Deck: Polos\n# Format: depan | bacaan | arti\n犬 | いぬ | anjing\n', J(UD.toText(plain.id)));
  ok('toText: deck tidak ada → teks kosong', UD.toText('u_tidakada') === '');
  UD.rename(plain.id, { title: 'A/B:C*?"<>|  nama   aneh ' + 'x'.repeat(80) });
  ok('fileName: karakter terlarang dibuang, panjang dibatasi, ekstensi', /^[^\\/:*?"<>|]+\.txt$/.test(UD.fileName(plain.id)) && UD.fileName(plain.id).length <= 44 && UD.fileName(plain.id, '.csv').slice(-4) === '.csv' && UD.fileName('u_tidakada') === 'deck.txt', UD.fileName(plain.id));

  /* ============ 8. keamanan tampilan (cardface) ============ */
  await D.loadAll();
  let nEx = 0, diff = 0, anyEx = [];
  Object.values(D.shards).forEach(sh => Object.values(sh).forEach(arr => arr.forEach(c => { if (c.example) { nEx++; if (F.safeExample(c.example) !== c.example) { diff++; anyEx.push(c.example); } } })));
  ok('contoh kalimat deck bawaan: ' + nEx + ' contoh tidak berubah sedikit pun', nEx >= 89 && diff === 0, anyEx[0]);
  ok('safeExample: tag berbahaya dilucuti', F.safeExample('<img src=x onerror=alert(1)>').indexOf('<') < 0 && F.safeExample('<script>x</script>').indexOf('<') < 0 && F.safeExample('a & b "c"') === 'a &amp; b &quot;c&quot;');
  ok('safeExample: ruby/rt tetap, huruf besar dinormalkan, atribut ditolak', F.safeExample('<RUBY>空<RT>そら</RT></RUBY>') === '<ruby>空<rt>そら</rt></ruby>' && F.safeExample('<ruby onclick=x>空</ruby>').indexOf('<ruby onclick') < 0 && F.safeExample('<ruby onclick=x>').indexOf('<') < 0);
  store.set('showExample', true);
  const evilCard = { front: '空', back: 'そら', backSub: '<b>langit</b>', example: '<img src=x onerror=alert(1)>空が<ruby>青<rt>あお</rt></ruby>い', exampleMeaning: '<script>1</script>' };
  const box = F.exampleBox(evilCard);
  ok('exampleBox: HTML berbahaya dari pengguna tampil sebagai teks', box.indexOf('<img') < 0 && box.indexOf('<script') < 0 && box.indexOf('&lt;img') >= 0 && box.indexOf('<mark class="hl">空</mark>') >= 0 && box.indexOf('<ruby>青<rt>あお</rt></ruby>') >= 0, box);
  store.set('furigana', true);
  const part = F.parts({ front: '<b>漢字</b>', back: 'かんじ', backSub: '<i>x</i>' }, 'f');
  ok('parts: depan/bacaan/arti dengan HTML diloloskan (furigana menyala)', part.q.html.indexOf('<b>') < 0 && part.aSub.html.indexOf('<i>') < 0 && part.q.html.indexOf('&lt;b&gt;') >= 0, J(part.q));
  const part2 = F.parts({ front: '漢字', back: 'かんじ', backSub: 'x' }, 'f');
  ok('parts: kartu normal tetap bisa memakai furigana', part2.q.ruby === true && part2.q.html.indexOf('<ruby>') >= 0);

  console.log('Deck pengguna: ' + pass + ' lulus, ' + fail + ' gagal');
  if (fail) { bad.forEach(b => console.log('  ✗ ' + b)); process.exit(1); }
  console.log('LULUS — deck buatan pengguna berjalan sesuai rancangan.');
})().catch(e => { console.error(e); process.exit(1); });
