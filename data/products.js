// 6 desain (2 gelang, 2 kalung, 2 keychain) + 2 paket. Nama, harga, deskripsi, dan lore bisa kamu ganti.
// Foto produk: taruh file di folder public/produk lalu isi di objek images di bawah.
const images = {
  // "Maple": "/produk/maple.jpg",
};
const spec = "Akrilik 3mm, ukir laser, infill cat metalik emas/perak, tali hitam uniseks";
export const products = [
  ["Maple", "Flora", "Gelang", 45000, "Daun maple penanda pergantian musim.",
    "Di hutan tempat daun-daun mulai berubah, aku menemukan satu helai maple yang warnanya paling hangat. Penduduk menyebutnya penanda musim: ia memerah sebelum gugur, seakan ingin menyimpan hangatnya musim yang akan pergi. Aku memungutnya dan belajar bahwa peralihan bukan akhir, melainkan cara alam berpamitan dengan indah. Urat-urat daunnya kini kuabadikan dalam emas."],
  ["Kelinci Bulan", "Fauna", "Gelang", 45000, "Kelinci penumbuk ramuan di bawah cahaya bulan.",
    "Setiap malam purnama aku mendongak dan melihat bayangan seekor kelinci di bulan. Para tetua bercerita bahwa ia menumbuk ramuan tanpa henti, supaya mereka yang kehilangan arah selalu punya alasan untuk berharap. Pada malam tergelap sekalipun, katanya, cahaya kecil dari lesungnya sampai ke bumi. Aku tidak tahu apakah ramuan itu nyata, tapi setiap kali menatap bulan bebanku terasa lebih ringan, dan bagiku itu sudah cukup."],
  ["Pinus", "Flora", "Kalung", 55000, "Pinus yang tetap hijau saat musim dingin.",
    "Saat salju turun dan hutan kehilangan warnanya, hanya pinus yang tetap hijau. Ia berdiri di punggung bukit, menahan angin demi pohon-pohon yang lebih kecil. Para pengelana mengikat sehelai jarumnya di dada sebelum menyeberangi musim dingin, sebagai jimat agar hati mereka tidak ikut membeku. Kucatat di sini: keteguhan bukan berarti tidak pernah kedinginan, melainkan tetap berdiri meski dingin."],
  ["Phoenix", "Fauna", "Kalung", 55000, "Burung api pembawa fajar yang bangkit dari abu.",
    "Ini catatan terakhir dari perjalanan malamku. Ketika langit paling pekat dan lentera nyaris padam, seekor burung berbulu bara turun dari kejauhan. Ia terbakar, tetapi tidak takut. Dari abunya ia bangkit lagi, dan sayapnya menyapu gelap hingga garis fajar muncul di ufuk. Katanya, ia datang bagi mereka yang hampir menyerah. Kusimpan ia di bagian akhir jurnal ini, sebab setiap malam punya ujung, dan ujungnya selalu fajar."],
  ["Amber Lotus", "Flora", "Keychain", 25000, "Teratai yang terawetkan dalam amber, pengingat kenangan.",
    "Di rawa tempat air selalu tenang, aku menemukan setangkai teratai yang terperangkap dalam damar bening. Getah itu menetes ketika bunganya baru mekar, lalu mengeras menjadi amber, dan kelopaknya tidak pernah layu sejak saat itu. Orang-orang di sana menyimpan potongan serupa sebagai pengingat bahwa tidak semua yang indah harus pergi bersama waktu. Sebagian boleh kita simpan dan kita bawa ke mana pun melangkah."],
  ["Rubah Kitsune", "Fauna", "Keychain", 25000, "Rubah kitsune cerdik, pemandu jalan di hutan berkabut.",
    "Di tepi hutan yang selalu berkabut, aku bertemu seekor rubah berekor banyak. Ia tidak lari. Ia berjalan beberapa langkah di depanku dan berhenti setiap kali aku tertinggal. Penduduk menyebutnya kitsune, pemandu bagi pengelana yang tulus: ia menyesatkan siapa pun yang berniat buruk, tetapi tidak membiarkan hati yang jujur tersesat. Malam itu aku tiba di tujuan tanpa peta."],
  ["Paket Flora", "Flora", "Paket", 110000, "Satu set Maple, Pinus, dan Amber Lotus.", ""],
  ["Paket Fauna", "Fauna", "Paket", 110000, "Satu set Kelinci Bulan, Phoenix, dan Rubah Kitsune.", ""],
].map(([name, type, kind, price, desc, lore], i) => ({
  id: i + 1, name, type, kind, price, desc, lore, image: images[name] || "",
  spec: kind === "Paket" ? "Isi paket: 1 gelang, 1 kalung, dan 1 keychain bertema " + type.toLowerCase() : spec,
}));
export const fmt = (n) => "Rp" + n.toLocaleString("id-ID");
