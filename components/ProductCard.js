import Link from "next/link";
import { fmt } from "../data/products";
export const sigil = (t) => (t === "Flora" ? "❦" : "✦");
export default function ProductCard({ p, onOrder }) {
  return (
    <article className="card">
      {p.image ? <img className="pimg" src={p.image} alt={p.name} /> : <div className="sigil">{sigil(p.type)}</div>}
      <span className="badge">{p.kind}</span>
      <h3>{p.name}</h3>
      <p className="muted">{p.desc}</p>
      <p className="spec">{p.spec}</p>
      <div className="row">
        <b>{fmt(p.price)}</b>
        {onOrder ? (
          <button className="btn" onClick={() => onOrder(p)}>Pre-Order</button>
        ) : (
          <Link className="btn ghost" href="/catalog">Lihat di Catalog</Link>
        )}
      </div>
    </article>
  );
}
