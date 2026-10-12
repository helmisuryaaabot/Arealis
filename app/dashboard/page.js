"use client";
import { useState } from "react";
import { orders } from "../../data/orders";
import { fmt } from "../../data/products";
import useRequireAuth from "../../components/useRequireAuth";
import { useAuth } from "../../components/AuthProvider";
const DEMO_BUYER = "Budi Santoso"; // pesanan contoh; tahap 2 diganti pesanan milik akun yang login
export default function Dashboard() {
  const [tab, setTab] = useState("Proses");
  const ok = useRequireAuth(false);
  const { user } = useAuth();
  const mine = orders.filter((o) => o.buyer === DEMO_BUYER);
  const list = mine.filter((o) => o.status === tab);
  if (!ok) return <section className="wrap"><p className="muted">Memuat...</p></section>;
  return (
    <section className="wrap">
      <h1>Pesanan saya</h1>
      <p className="muted">Masuk sebagai {user.name}{user.phone ? ", WA " + user.phone : ""}. Daftar pesanan di bawah masih data contoh.</p>
      <div className="tabs">
        {["Proses", "Siap Diambil"].map((t) => (
          <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t} ({mine.filter((o) => o.status === t).length})</button>
        ))}
      </div>
      {tab === "Siap Diambil" && <p className="note">Ambil pesananmu di Kampus UBSI Cikarang dan tunjukkan kode pesanan ke admin.</p>}
      {list.length ? (
        <div className="grid">
          {list.map((o) => (
            <article className="card" key={o.id}>
              <div className="row"><h3>{o.id}</h3><span className="badge">{o.status}</span></div>
              <p>{o.item} x{o.qty}</p>
              <p className="muted">Dipesan {o.date}</p>
              <b>{fmt(o.total)}</b>
            </article>
          ))}
        </div>
      ) : (
        <p className="muted">Belum ada pesanan di tab ini. Buka Catalog untuk mulai Pre-Order.</p>
      )}
    </section>
  );
}
