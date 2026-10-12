"use client";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, fmt } from "../../data/products";
import useRequireAuth from "../../components/useRequireAuth";
function Pay() {
  const sp = useSearchParams();
  const ok = useRequireAuth(true, "/catalog");
  const p = products.find((x) => x.id === Number(sp.get("product"))) || products[0];
  const qty = Math.max(1, Number(sp.get("qty")) || 1);
  const [left, setLeft] = useState(900);
  const [paid, setPaid] = useState(false);
  useEffect(() => {
    if (paid) return;
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [paid]);
  const time = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
  if (!ok) return <p>Memuat...</p>;
  if (paid)
    return (
      <div className="pay">
        <div className="check">✓</div>
        <h1>Pembayaran berhasil</h1>
        <p className="muted">{p.name} x{qty} sudah masuk antrean produksi. Pantau statusnya di tab Proses.</p>
        <Link className="btn" href="/dashboard">Buka Dashboard</Link>
      </div>
    );
  return (
    <div className="pay">
      <h1>Bayar dengan QRIS</h1>
      <div className="qr" />
      <p className="spec">[QRIS asli dari payment gateway tampil di sini pada tahap 3]</p>
      <div className="row"><span>Pesanan</span><b>{p.name} x{qty}</b></div>
      <div className="row total"><span>Total</span><b>{fmt(p.price * qty)}</b></div>
      {left > 0 ? <p>Selesaikan pembayaran dalam <b>{time}</b></p> : <p>Waktu habis. <Link href="/catalog">Buat pesanan baru</Link></p>}
      <p className="spec">Menunggu pembayaran. Halaman ini berpindah otomatis setelah pembayaran terverifikasi.</p>
      <button className="btn ghost" onClick={() => setPaid(true)}>Simulasikan pembayaran berhasil (demo)</button>
    </div>
  );
}
export default function Payment() {
  return <section className="wrap"><Suspense fallback={<p>Memuat...</p>}><Pay /></Suspense></section>;
}
