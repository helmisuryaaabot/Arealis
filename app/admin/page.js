"use client";
import { useState } from "react";
import { orders, STATUS } from "../../data/orders";
import { fmt } from "../../data/products";
import useRequireAuth from "../../components/useRequireAuth";
import { useAuth } from "../../components/AuthProvider";
const TABS = ["Ringkasan", "Pesanan", "Verifikasi WA", "Produksi"];
const waudit = [
  { name: "Gita Maharani", email: "gita@gmail.com", code: "ARL-4821" },
  { name: "Hadi Kurniawan", email: "hadi@gmail.com", code: "ARL-1937" },
];
function download(name, rows) {
  const csv = "\uFEFF" + rows.map((a) => a.map((v) => '"' + v + '"').join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = name;
  a.click();
}
export default function Admin() {
  const ok = useRequireAuth(false);
  const { user } = useAuth();
  const [tab, setTab] = useState("Ringkasan");
  const [rows, setRows] = useState(orders);
  const [pend, setPend] = useState(waudit);
  const [q, setQ] = useState("");
  const [f, setF] = useState("Semua");
  if (!ok) return <section className="wrap"><p>Memuat...</p></section>;
  if (!user.isAdmin) return <section className="wrap"><h1>Akses ditolak</h1><p className="muted">Halaman ini khusus admin kelompok AREALIS.</p></section>;
  const setStatus = (id, s) => setRows(rows.map((r) => (r.id === id ? { ...r, status: s } : r)));
  const count = (s) => rows.filter((r) => r.status === s).length;
  const shown = rows.filter((r) => (f === "Semua" || r.status === f) && (r.id + r.buyer + r.item).toLowerCase().includes(q.toLowerCase()));
  const prod = {};
  rows.filter((r) => r.status === "Proses").forEach((r) => { prod[r.item] = (prod[r.item] || 0) + r.qty; });
  const prodRows = Object.entries(prod);
  return (
    <section className="wrap">
      <h1>Panel admin</h1>
      <p className="note">Tampilan contoh. Data asli tersambung di tahap 2.</p>
      <div className="tabs">
        {TABS.map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}{t === "Verifikasi WA" && pend.length ? " (" + pend.length + ")" : ""}</button>)}
      </div>

      {tab === "Ringkasan" && (
        <>
          <div className="stats">
            <div className="card"><b>{rows.length}</b>Total pesanan lunas</div>
            <div className="card"><b>{count("Proses")}</b>Dalam produksi</div>
            <div className="card"><b>{count("Siap Diambil")}</b>Siap diambil</div>
            <div className="card"><b>{count("Selesai")}</b>Selesai</div>
            <div className="card"><b>{fmt(rows.reduce((s, r) => s + r.total, 0))}</b>Total pemasukan</div>
          </div>
          <h2>Pesanan terbaru</h2>
          {rows.slice(-3).reverse().map((r) => (
            <div className="row" key={r.id}><span>{r.id}, {r.buyer}, {r.item} x{r.qty}</span><span className="badge">{r.status}</span></div>
          ))}
        </>
      )}

      {tab === "Pesanan" && (
        <>
          <div className="row">
            <input className="inp" style={{ flex: 1 }} placeholder="Cari kode, nama, atau produk" value={q} onChange={(e) => setQ(e.target.value)} />
            <select value={f} onChange={(e) => setF(e.target.value)}>{["Semua", ...STATUS].map((s) => <option key={s}>{s}</option>)}</select>
          </div>
          <div className="row">
            <button className="btn" onClick={() => download("arealis-pesanan.csv", [["ID", "Pembeli", "WA", "Produk", "Jumlah", "Total", "Status"], ...rows.map((r) => [r.id, r.buyer, r.wa, r.item, r.qty, r.total, r.status])])}>Export CSV</button>
          </div>
          <div className="scroll">
            <table>
              <thead><tr><th>ID</th><th>Pembeli</th><th>WA</th><th>Produk</th><th>Jumlah</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td><td>{r.buyer}</td><td>{r.wa}</td><td>{r.item}</td><td>{r.qty}</td><td>{fmt(r.total)}</td>
                    <td><select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}>{STATUS.map((s) => <option key={s}>{s}</option>)}</select></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "Verifikasi WA" && (
        <>
          <p className="muted">Akun yang sudah mengirim pesan verifikasi ke WhatsApp admin. Cocokkan kodenya dengan isi chat, lalu konfirmasi.</p>
          {pend.length ? pend.map((p) => (
            <div className="card row" key={p.code}>
              <span>{p.name}, {p.email}, kode {p.code}</span>
              <button className="btn" onClick={() => setPend(pend.filter((x) => x !== p))}>Konfirmasi</button>
            </div>
          )) : <p className="muted">Tidak ada permintaan verifikasi.</p>}
        </>
      )}

      {tab === "Produksi" && (
        <>
          <p className="muted">Rekap jumlah per produk dari pesanan berstatus Proses, untuk diserahkan ke vendor laser cut.</p>
          {prodRows.length ? (
            <>
              <div className="scroll">
                <table>
                  <thead><tr><th>Produk</th><th>Jumlah</th></tr></thead>
                  <tbody>{prodRows.map(([n, q2]) => <tr key={n}><td>{n}</td><td>{q2}</td></tr>)}</tbody>
                </table>
              </div>
              <div className="row"><button className="btn" onClick={() => download("arealis-rekap-produksi.csv", [["Produk", "Jumlah"], ...prodRows])}>Export rekap produksi</button></div>
            </>
          ) : <p className="muted">Belum ada pesanan dalam produksi.</p>}
        </>
      )}
    </section>
  );
}
