"use client";
import { useState } from "react";
import { products } from "../../data/products";
import { sigil } from "../../components/ProductCard";
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
function Row({ p, n }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lorerow">
      <div className="pframe">
        {p.image ? <img src={p.image} alt={p.name} /> : <div className="ph"><span>{sigil(p.type)}</span><small>Foto {p.name}</small></div>}
      </div>
      <div className={"arcwrap" + (open ? " open" : "")}>
        <aside className="lore hex" aria-hidden={!open}>
          <div className="in"><h3>Kisah {p.name}</h3><p>{p.lore}</p></div>
        </aside>
        <button className="arcana hex" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="in">
            <span className="num">{ROMAN[n]}</span>
            <span className="moon">☾</span>
            <span className="aname">{p.name}</span>
            <span className="akind">{p.kind} {p.type}</span>
            <span className="hint">{open ? "Tutup kisah" : "Buka kisah"}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
export default function Lore() {
  const singles = products.filter((p) => p.kind !== "Paket");
  return (
    <section className="wrap">
      <h1>Jurnal sang peneliti</h1>
      <p className="muted">[Naskah pengantar The Codex dari tim konten.] Setiap relik membawa satu kartu arcana. Buka kartunya untuk membaca kisah di baliknya. Dua paket kami berisi gabungan gelang, kalung, dan keychain dari tema yang sama.</p>
      {singles.map((p, n) => <Row key={p.id} p={p} n={n} />)}
    </section>
  );
}
