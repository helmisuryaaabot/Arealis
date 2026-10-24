"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import PreOrderModal from "../../components/PreOrderModal";
import { useAuth } from "../../components/AuthProvider";
const SHELVES = ["Fauna", "Flora"];
const KINDS = ["Gelang", "Keychain", "Kalung", "Paket"]; // urutan kiri ke kanan
export default function Catalog() {
  const [sel, setSel] = useState(null);
  const { user, ready } = useAuth();
  const r = useRouter();
  const order = (p) => {
    if (!user) r.push("/login?need=1&next=/catalog");
    else if (user.wa !== "verified") r.push("/verify-phone?next=/catalog");
    else setSel(p);
  };
  return (
    <section className="wrap">
      <h1>Relic Forge &amp; Store</h1>
      <p className="muted">Delapan relik akrilik 3mm, diukir laser dan diisi cat metalik. Semua dibuat berdasarkan pesanan (Pre-Order).</p>
      {ready && !user && <p className="note">Login atau Sign Up dulu untuk melakukan Pre-Order.</p>}
      {SHELVES.map((t) => (
        <div className="shelf" key={t}>
          <h2 className="shelf-head"><span>{t}</span></h2>
          <div className="shelfgrid">
            {KINDS.map((k) => {
              const p = products.find((x) => x.type === t && x.kind === k);
              return p ? <ProductCard key={p.id} p={p} onOrder={order} /> : null;
            })}
          </div>
        </div>
      ))}
      {sel && <PreOrderModal key={sel.id} product={sel} onClose={() => setSel(null)} />}
    </section>
  );
}
