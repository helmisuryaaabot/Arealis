// 6 desain (2 gelang, 2 kalung, 2 keychain) + 2 paket. Nama, harga, deskripsi, dan lore bisa kamu ganti.
// Foto produk: taruh file di folder public/produk lalu isi di objek images di bawah.
const images = {
  // "Lunaria Bloom": "/produk/lunaria-bloom.jpg",
};
const spec = "Akrilik 3mm, ukir laser, infill cat metalik emas/perak, tali hitam uniseks";
export const products = [
  ["Lunaria Bloom", "Flora", "Gelang", 45000, "Bunga bulan yang mekar hanya di bawah cahaya perak.", "[Tulis lore Lunaria Bloom di sini.] Konon kelopaknya hanya terbuka saat bulan purnama, dan pemakainya tak akan tersesat di malam hari."],
  ["Sable Phoenix", "Fauna", "Gelang", 45000, "Burung api hitam yang lahir kembali dari abu.", "[Tulis lore Sable Phoenix di sini.] Setiap kali terbakar habis, ia bangkit membawa ingatan seluruh kehidupannya yang lampau."],
  ["Amber Lotus", "Flora", "Kalung", 55000, "Teratai yang menyimpan cahaya senja dalam kelopaknya.", "[Tulis lore Amber Lotus di sini.] Cahaya senja terakhir dikatakan terkurung di dalam kelopaknya, menunggu pemilik yang tepat."],
  ["Umbra Wolf", "Fauna", "Kalung", 55000, "Serigala bayangan penjaga gerbang kuil tua.", "[Tulis lore Umbra Wolf di sini.] Ia hanya menampakkan diri pada mereka yang berjalan sendirian dan tak pernah mengkhianati janji."],
  ["Silver Thistle", "Flora", "Keychain", 25000, "Duri perak pelindung taman rahasia.", "[Tulis lore Silver Thistle di sini.] Durinya tidak melukai pemiliknya, hanya menjaga pintu taman dari tamu yang tak diundang."],
  ["Veil Moth", "Fauna", "Keychain", 25000, "Ngengat tirai pembawa pesan antar dunia.", "[Tulis lore Veil Moth di sini.] Sayapnya menjadi tirai tipis antara dunia manusia dan dunia arwah, membawa pesan yang tak sempat terucap."],
  ["Paket Flora", "Flora", "Paket", 110000, "Satu set gelang, kalung, dan keychain bertema flora.", ""],
  ["Paket Fauna", "Fauna", "Paket", 110000, "Satu set gelang, kalung, dan keychain bertema fauna.", ""],
].map(([name, type, kind, price, desc, lore], i) => ({
  id: i + 1, name, type, kind, price, desc, lore, image: images[name] || "",
  spec: kind === "Paket" ? "Isi paket: 1 gelang, 1 kalung, dan 1 keychain bertema " + type.toLowerCase() : spec,
}));
export const fmt = (n) => "Rp" + n.toLocaleString("id-ID");
