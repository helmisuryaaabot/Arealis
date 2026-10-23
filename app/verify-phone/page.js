"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { team } from "../../data/team";
const ADMIN_WA = team[1].wa; // nomor admin WA (anggota ke-2 di data/team.js)
function Verify() {
  const { user, ready, setWa } = useAuth();
  const r = useRouter();
  const next = useSearchParams().get("next") || "/catalog";
  useEffect(() => {
    if (!ready) return;
    if (!user) r.replace("/login?need=1&next=" + encodeURIComponent(next));
    else if (user.wa === "verified") r.replace(next);
  }, [ready, user, r, next]);
  if (!ready || !user) return <p>Memuat...</p>;
  const code = "ARL-" + String([...user.email].reduce((a, c) => a + c.charCodeAt(0), 0)).padStart(4, "0").slice(-4);
  const msg = "Halo admin AREALIS, saya " + user.name + " (" + user.email + ") ingin verifikasi akun. Kode: " + code;
  const href = "https://wa.me/" + ADMIN_WA + "?text=" + encodeURIComponent(msg);
  return (
    <div className="pay">
      <h1>Verifikasi lewat WhatsApp</h1>
      {user.wa === "pending" ? (
        <>
          <p className="muted">Pesanmu sudah dikirim. Admin akan mengonfirmasi akunmu, lalu kamu bisa Pre-Order.</p>
          <a className="btn ghost" href={href} target="_blank" rel="noreferrer">Buka WhatsApp lagi</a>
          <button className="btn" onClick={() => { setWa("verified"); r.push(next); }}>Demo: anggap admin sudah konfirmasi</button>
        </>
      ) : (
        <>
          <p className="muted">Tekan tombol di bawah. WhatsApp terbuka langsung ke chat admin dengan pesan yang sudah terisi, tinggal kamu kirim.</p>
          <a className="btn" href={href} target="_blank" rel="noreferrer" onClick={() => setWa("pending")}>Kirim pesan verifikasi ke admin</a>
        </>
      )}
      <p className="spec">Admin melihat nomor WhatsApp-mu dari chat itu, jadi kamu tidak perlu mengetik nomor.</p>
    </div>
  );
}
export default function Page() {
  return <section className="wrap"><Suspense fallback={<p>Memuat...</p>}><Verify /></Suspense></section>;
}
