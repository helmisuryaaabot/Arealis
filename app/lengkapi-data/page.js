"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { getList } from "../../data/wilayah";
const LV = ["prov", "city", "dist", "vill"];
const LABEL = { prov: "Provinsi", city: "Kabupaten / Kota", dist: "Kecamatan", vill: "Desa / Kelurahan" };
function Form() {
  const { user, ready, saveProfile } = useAuth();
  const r = useRouter();
  const next = useSearchParams().get("next") || "/catalog";
  const [f, setF] = useState({ name: "", phone: "", rt: "", rw: "", complex: "", block: "", number: "", ok: false });
  const [loc, setLoc] = useState({ prov: null, city: null, dist: null, vill: null });
  const [lists, setLists] = useState({ prov: [], city: [], dist: [], vill: [] });
  const [manual, setManual] = useState(false);
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  useEffect(() => {
    if (ready && !user) r.replace("/login?need=1&next=" + encodeURIComponent("/lengkapi-data?next=" + next));
  }, [ready, user, r, next]);
  useEffect(() => {
    if (!user) return;
    const p = user.profile || {};
    setF((x) => ({ ...x, name: p.name || user.name || "", phone: p.phone || "", rt: p.rt || "", rw: p.rw || "", complex: p.complex || "", block: p.block || "", number: p.number || "" }));
  }, [user]);
  useEffect(() => {
    getList("prov").then((d) => setLists((l) => ({ ...l, prov: d }))).catch(() => setManual(true));
  }, []);
  const choose = (lv, id) => {
    const i = LV.indexOf(lv);
    const item = lists[lv].find((x) => x.id === id) || null;
    const rest = LV.slice(i + 1);
    setLoc((l) => { const n = { ...l, [lv]: item }; rest.forEach((k) => (n[k] = null)); return n; });
    setLists((l) => { const n = { ...l }; rest.forEach((k) => (n[k] = [])); return n; });
    if (item && rest[0]) getList(rest[0], item.id).then((d) => setLists((l) => ({ ...l, [rest[0]]: d }))).catch(() => setManual(true));
  };
  const submit = (e) => {
    e.preventDefault();
    const digits = f.phone.replace(/[\s-]/g, "").replace(/^\+/, "").replace(/^0/, "62");
    if (f.name.trim().length < 3) return setErr("Isi nama lengkap.");
    if (!/^628\d{8,11}$/.test(digits)) return setErr("Nomor telepon tidak valid. Contoh: 0812xxxxxxxx.");
    if (LV.some((k) => !(loc[k] && loc[k].name.trim()))) return setErr("Lengkapi provinsi, kabupaten/kota, kecamatan, dan desa/kelurahan.");
    if (!/^\d{1,3}$/.test(f.rt) || !/^\d{1,3}$/.test(f.rw)) return setErr("RT dan RW diisi dengan angka.");
    if (!f.complex.trim() || !f.number.trim()) return setErr("Isi nama perumahan atau jalan, dan nomor rumah.");
    if (!f.ok) return setErr("Centang pernyataan bahwa data yang diisi sudah benar.");
    saveProfile({ name: f.name.trim(), phone: "+" + digits, prov: loc.prov.name, city: loc.city.name, dist: loc.dist.name, vill: loc.vill.name, rt: f.rt, rw: f.rw, complex: f.complex.trim(), block: f.block.trim(), number: f.number.trim(), at: new Date().toISOString() });
    r.push(next);
  };
  if (!ready || !user) return <p>Memuat...</p>;
  return (
    <div className="formcard">
      <h1>Lengkapi data dirimu</h1>
      <p className="muted">Data ini dipakai admin untuk memastikan pesanan datang dari pembeli yang nyata dan bisa dihubungi. Isi sesuai KTP atau alamat tempat tinggalmu.</p>
      {manual && <p className="note">Daftar wilayah tidak bisa dimuat, jadi isi wilayah secara manual.</p>}
      <form onSubmit={submit}>
        <h3>Data kontak</h3>
        <label>Nama lengkap</label>
        <input className="inp" value={f.name} onChange={set("name")} />
        <label>Nomor telepon (WhatsApp aktif)</label>
        <input className="inp" inputMode="tel" placeholder="0812xxxxxxxx" value={f.phone} onChange={set("phone")} />
        <h3>Alamat</h3>
        {LV.map((lv, i) => (
          <div key={lv}>
            <label>{LABEL[lv]}</label>
            {manual ? (
              <input className="inp" value={(loc[lv] && loc[lv].name) || ""} onChange={(e) => setLoc({ ...loc, [lv]: { id: "", name: e.target.value } })} />
            ) : (
              <select className="inp" value={(loc[lv] && loc[lv].id) || ""} disabled={i > 0 && !loc[LV[i - 1]]} onChange={(e) => choose(lv, e.target.value)}>
                <option value="">Pilih {LABEL[lv].toLowerCase()}</option>
                {lists[lv].map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
              </select>
            )}
          </div>
        ))}
        <div className="formgrid">
          <div><label>RT</label><input className="inp" inputMode="numeric" maxLength={3} value={f.rt} onChange={set("rt")} /></div>
          <div><label>RW</label><input className="inp" inputMode="numeric" maxLength={3} value={f.rw} onChange={set("rw")} /></div>
        </div>
        <h3>Detail alamat</h3>
        <label>Nama perumahan atau jalan</label>
        <input className="inp" value={f.complex} onChange={set("complex")} />
        <div className="formgrid">
          <div><label>Blok (jika ada)</label><input className="inp" value={f.block} onChange={set("block")} /></div>
          <div><label>Nomor</label><input className="inp" value={f.number} onChange={set("number")} /></div>
        </div>
        <label className="check"><input type="checkbox" checked={f.ok} onChange={set("ok")} />Data yang saya isi sudah benar dan boleh dipakai admin AREALIS untuk keperluan pesanan.</label>
        {err && <p className="err">{err}</p>}
        <button className="btn">Simpan data</button>
      </form>
    </div>
  );
}
export default function Page() {
  return <section className="wrap"><Suspense fallback={<p>Memuat...</p>}><Form /></Suspense></section>;
}
