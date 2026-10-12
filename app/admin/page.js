"use client";
import { useState } from "react";
import { orders, STATUS } from "../../data/orders";
import { fmt } from "../../data/products";
export default function Admin() {
  const [rows, setRows] = useState(orders);
  const setStatus = (id, s) => setRows(rows.map((r) => (r.id === id ? { ...r, status: s } : r)));
  const exportCsv = () => {
    const head = ["ID", "Pembeli", "WA", "Produk", "Jumlah", "Total", "Status"];
    const body = rows.map((r) => [r.id, r.buyer, r.wa, r.item, r.qty, r.total, r.status]);
    const csv = "\uFEFF" + [head, ...body].map((a) => a.map((v) => '"' + v + '"').join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "arealis-pesanan.csv";
    a.click();
  };
  return (
    <section className="wrap">
      <h1>Panel admin</h1>
      <p className="note">Tampilan contoh. Pada tahap 2 halaman ini dikunci hanya untuk akun admin.</p>
      <div className="stats">
        <div className="card"><b>{rows.length}</b>Total pesanan lunas</div>
        <div className="card"><b>{rows.filter((r) => r.status === "Proses").length}</b>Dalam produksi</div>
        <div className="card"><b>{fmt(rows.reduce((s, r) => s + r.total, 0))}</b>Total pemasukan</div>
      </div>
      <button className="btn" onClick={exportCsv}>Export CSV untuk vendor</button>
      <div className="scroll">
        <table>
          <thead><tr><th>ID</th><th>Pembeli</th><th>WA</th><th>Produk</th><th>Jumlah</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.buyer}</td><td>{r.wa}</td><td>{r.item}</td><td>{r.qty}</td><td>{fmt(r.total)}</td>
                <td><select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}>{STATUS.map((s) => <option key={s}>{s}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
