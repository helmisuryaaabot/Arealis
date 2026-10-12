"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
const DEMO_CODE = "123456";
const norm = (v) => v.replace(/\D/g, "").replace(/^0/, "62");
function Verify() {
  const { user, ready, setPhone } = useAuth();
  const r = useRouter();
  const next = useSearchParams().get("next") || "/catalog";
  const [ph, setPh] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    if (ready && !user) r.replace("/login?need=1&next=" + encodeURIComponent(next));
  }, [ready, user, r, next]);
  if (!ready || !user) return <p>Memuat...</p>;
  const send = (e) => {
    e.preventDefault();
    if (!/^628\d{8,11}$/.test(norm(ph))) return setErr("Masukkan nomor WhatsApp aktif, contoh 0812xxxxxxxx.");
    setErr(""); setSent(true);
  };
  const check = (e) => {
    e.preventDefault();
    if (code !== DEMO_CODE) return setErr("Kode salah. Di mode demo, gunakan " + DEMO_CODE + ".");
    setPhone("+" + norm(ph));
    r.push(next);
  };
  return (
    <div className="pay">
      <h1>Verifikasi nomor WhatsApp</h1>
      <p className="muted">Nomor ini dipakai admin untuk menghubungimu saat pesanan siap diambil.</p>
      {!sent ? (
        <form onSubmit={send}>
          <input className="inp" inputMode="tel" placeholder="Nomor WhatsApp, contoh 0812xxxxxxxx" value={ph} onChange={(e) => setPh(e.target.value)} />
          <button className="btn">Kirim kode verifikasi</button>
        </form>
      ) : (
        <form onSubmit={check}>
          <p className="muted">Kode 6 digit dikirim ke +{norm(ph)}. Mode demo: {DEMO_CODE}.</p>
          <input className="inp" inputMode="numeric" maxLength={6} placeholder="Kode verifikasi" value={code} onChange={(e) => setCode(e.target.value)} />
          <button className="btn">Verifikasi</button>
          <button type="button" className="btn ghost" onClick={() => { setSent(false); setCode(""); setErr(""); }}>Ganti nomor</button>
        </form>
      )}
      {err && <p className="err">{err}</p>}
    </div>
  );
}
export default function Page() {
  return <section className="wrap"><Suspense fallback={<p>Memuat...</p>}><Verify /></Suspense></section>;
}
