import Link from "next/link";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
const why = [
  ["Akrilik tebal 3mm", "Bahan kokoh yang terasa solid di tangan, tersedia dalam hitam dan frosted."],
  ["Ukir laser presisi", "Setiap motif flora dan fauna diukir detail oleh mesin laser."],
  ["Cat metalik manual", "Garis ukiran diisi cat emas atau perak satu per satu."],
  ["Dibuat sesuai pesanan", "Sistem Pre-Order membuat setiap relik dibuat khusus untukmu."],
];
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
      <section className="hero">
        <h1>AREALIS</h1>
        <p>Relik akrilik hitam berukir emas dan perak, ditempa dari kisah flora dan fauna yang terlupakan.</p>
        <div className="row c">
          <Link className="btn" href="/catalog">Lihat Catalog</Link>
          <Link className="btn ghost" href="/lore">Buka The Codex</Link>
        </div>
      </section>
      <section className="wrap">
        <h2>Mengapa AREALIS</h2>
        <div className="grid">{why.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p className="muted">{d}</p></div>)}</div>
      </section>
      <section className="wrap">
        <h2>Relik terpopuler</h2>
        <div className="grid">{products.slice(0, 3).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
      <section className="wrap">
        <h2>Cara Pre-Order</h2>
        <div className="grid">{steps.map((s, i) => <div className="card" key={s}><div className="sigil">{i + 1}</div><h3>{s}</h3></div>)}</div>
      </section>
      <section className="wrap">
        <h2>Dua dunia relik</h2>
        <div className="grid two">
          <Link href="/lore" className="card"><h3>Flora</h3><p className="muted">Maple, Pinus, dan Spiderlili, tiga relik tanaman dalam satu tema.</p></Link>
          <Link href="/lore" className="card"><h3>Fauna</h3><p className="muted">Kelinci, Pegasus, dan Rubah, tiga relik makhluk yang tercatat di The Codex.</p></Link>
        </div>
      </section>
      <section className="wrap">
        <div className="codex">
          <h2>Dari The Codex</h2>
          <p>[Teaser lore singkat dari tim konten.] Setiap simbol pada relik kami tercatat dalam jurnal seorang peneliti yang menjelajahi taman dan kuil yang telah dilupakan.</p>
          <Link className="btn ghost" href="/lore">Baca The Codex</Link>
        </div>
      </section>
      <section className="wrap">
        <h2>Pertanyaan umum</h2>
        {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p className="muted">{a}</p></details>)}
      </section>
      <section className="wrap">
        <div className="cta">
          <h2>Pilih relikmu sebelum Pre-Order ditutup</h2>
          <Link className="btn" href="/catalog">Mulai Pre-Order</Link>
        </div>
      </section>
    </>
  );
}
