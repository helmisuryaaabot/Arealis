import TeamShowcase from "../../components/TeamShowcase";
export default function About() {
  const bts = ["Laser cutting", "Pewarnaan cat metalik", "Perakitan tali", "Pengemasan jewelry box"];
  return (
    <section className="wrap">
      <h1>Awal mula AREALIS</h1>
      <p>[Tulis di sini bagaimana AREALIS terbentuk: siapa yang mencetuskan ide, kapan, dan masalah atau inspirasi apa yang melatarinya.]</p>
      <p className="muted">[Paragraf kedua: dari proyek kewirausahaan menjadi brand relik akrilik, apa yang ingin disampaikan lewat flora dan fauna.]</p>

      <h2>Tim dan kontak kami</h2>
      <TeamShowcase />

      <h2>Lokasi AREALIS</h2>
      <p>Kampus UBSI Cikarang. [Tulis alamat lengkap dan titik serah terima pesanan, misalnya gedung dan jam pengambilan.]</p>
      <iframe className="map" title="Lokasi AREALIS" loading="lazy" src="https://maps.google.com/maps?q=UBSI%20Kampus%20Cikarang&output=embed" />

      <h2>Di balik pembuatan</h2>
      <div className="grid">
        {bts.map((b, i) => (
          <div className="card" key={b}>
            <div className="sigil">{i + 1}</div>
            <h3>{b}</h3>
            <p className="muted">[Taruh foto atau dokumentasi di sini.]</p>
          </div>
        ))}
      </div>
      <h2>Cara merawat akrilik</h2>
      <ul>
        <li>Bersihkan dengan kain mikrofiber lembut.</li>
        <li>Hindari alkohol, thinner, dan pelarut.</li>
        <li>Jauhkan dari panas langsung dan benda tajam.</li>
      </ul>
    </section>
  );
}
