"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fmt } from "../data/products";
import { sigil } from "./ProductCard";
export default function PreOrderModal({ product, onClose }) {
  const [q, setQ] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Tutup">×</button>
        <div className="sigil">{sigil(product.type)}</div>
        <h3>{product.name}</h3>
        <p className="spec">{product.spec}</p>
        <div className="row"><span>Harga satuan</span><b>{fmt(product.price)}</b></div>
        <div className="row">
          <span>Jumlah</span>
          <div className="qty">
            <button onClick={() => setQ(Math.max(1, q - 1))} aria-label="Kurangi">−</button>
            <span>{q}</span>
            <button onClick={() => setQ(Math.min(20, q + 1))} aria-label="Tambah">+</button>
          </div>
        </div>
        <div className="row total"><span>Total</span><b>{fmt(product.price * q)}</b></div>
        <button className="btn" onClick={() => router.push("/payment?product=" + product.id + "&qty=" + q)}>Pre-Order Sekarang</button>
      </div>
    </div>
  );
}
