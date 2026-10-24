import Link from "next/link";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
const cats = [["Gelang", "◯"], ["Kalung", "◇"], ["Keychain", "✦"], ["Paket", "❖"]];
const steps = ["Pilih relik di Catalog", "Tentukan jumlah pesanan", "Bayar lewat QRIS", "Ambil di Kampus UBSI Cikarang"];
const faq = [
  ["Apa itu Pre-Order?", "Relik baru dibuat setelah pesanan ditutup, jadi stok sesuai jumlah yang dipesan."],
  ["Berapa lama produksinya?", "[Isi estimasi waktu produksi dan tanggal penutupan Pre-Order.]"],
  ["Bagaimana cara membayar?", "Lewat QRIS. Status pesanan berubah otomatis begitu pembayaran terverifikasi."],
  ["Bagaimana cara mengambil pesanan?", "Pesanan yang sudah selesai muncul di tab Siap Diambil pada Dashboard, lalu diambil di Kampus UBSI Cikarang."],
];
export default function Home() {
  return (
    <>
      <HeroSlider />
      <section className="wrap">
        <div className="sechead"><h2>Belanja per kategori</h2></div>
        <div className="grid">{cats.map(([c, g]) => <Link key={c} href="/catalog" className="tile"><i>{g}</i>{c}</Link>)}</div>
      </section>
      <section className="wrap">
        <div className="sechead"><h2>Relik terpopuler</h2><Link href="/catalog">Lihat semua</Link></div>
        <div className="grid">{products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
      <section className="wrap">
        <div className="grid two">
          <div className="promo fauna"><i>☾</i><h3>Fauna</h3><p>Penjaga perjalanan malam dalam akrilik berukir perak.</p><div><Link className="btn white" href="/catalog#fauna">Lihat Fauna</Link></div></div>
          <div className="promo flora"><i>❦</i><h3>Flora</h3><p>Siklus musim yang diukir dan dilukis emas.</p><div><Link className="btn white" href="/catalog#flora">Lihat Flora</Link></div></div>
        </div>
      </section>
      <section className="wrap">
        <div className="sechead"><h2>Cara Pre-Order</h2></div>
        <div className="grid">{steps.map((s, i) => <div className="card" key={s}><div className="sigil">{i + 1}</div><h3>{s}</h3></div>)}</div>
      </section>
      <section className="wrap">
        <div className="sechead"><h2>Pertanyaan umum</h2></div>
        {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p className="muted">{a}</p></details>)}
      </section>
      <section className="wrap">
        <div className="cta"><h2>Pilih relikmu sebelum Pre-Order ditutup</h2><Link className="btn white" href="/catalog">Mulai Pre-Order</Link></div>
      </section>
    </>
  );
}
