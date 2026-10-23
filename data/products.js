// 6 desain (2 gelang, 2 kalung, 2 keychain) + 2 paket. Nama, harga, deskripsi, dan lore bisa kamu ganti.
// Foto produk: taruh file di folder public/produk lalu isi di objek images di bawah.
const images = {
  // "Maple": "/produk/maple.jpg",
};
const spec = "Akrilik 3mm, ukir laser, infill cat metalik emas/perak, tali hitam uniseks";
export const products = [
  ["Maple", "Flora", "Gelang", 45000, "Daun maple penanda pergantian musim.", "[Tulis lore Maple di sini.] Daunnya memerah tepat sebelum gugur, seakan menyimpan hangat musim yang akan pergi."],
  ["Kelinci", "Fauna", "Gelang", 45000, "Kelinci penjaga yang berlari di bawah cahaya bulan.", "[Tulis lore Kelinci di sini.] Dikisahkan ia menumbuk ramuan abadi di bulan, dan turun ke bumi hanya pada malam purnama."],
  ["Pinus", "Flora", "Kalung", 55000, "Pinus yang tetap hijau di tengah musim dingin.", "[Tulis lore Pinus di sini.] Ia tidak pernah menggugurkan daunnya, lambang keteguhan bagi para pengelana."],
  ["Pegasus", "Fauna", "Kalung", 55000, "Kuda bersayap penjaga langit.", "[Tulis lore Pegasus di sini.] Sayapnya membelah awan, dan ia hanya menuruti penunggang yang berani menatap langit."],
  ["Spiderlili", "Flora", "Keychain", 25000, "Bunga yang mekar di ujung musim.", "[Tulis lore Spiderlili di sini.] Ia mekar saat musim berganti, dan dikenang sebagai bunga perpisahan dan ingatan."],
  ["Rubah", "Fauna", "Keychain", 25000, "Rubah cerdik pemandu jalan di hutan.", "[Tulis lore Rubah di sini.] Ia pandai menyesatkan orang jahat, namun menuntun yang tulus keluar dari hutan."],
  ["Paket Flora", "Flora", "Paket", 110000, "Satu set Maple, Pinus, dan Spiderlili.", ""],
  ["Paket Fauna", "Fauna", "Paket", 110000, "Satu set Kelinci, Pegasus, dan Rubah.", ""],
].map(([name, type, kind, price, desc, lore], i) => ({
  id: i + 1, name, type, kind, price, desc, lore, image: images[name] || "",
  spec: kind === "Paket" ? "Isi paket: 1 gelang, 1 kalung, dan 1 keychain bertema " + type.toLowerCase() : spec,
}));
export const fmt = (n) => "Rp" + n.toLocaleString("id-ID");
