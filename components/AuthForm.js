"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
export default function AuthForm({ mode }) {
  const signup = mode === "signup";
  const r = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/catalog";
  const { login } = useAuth();
  const go = () => {
    // Tahap 2: ganti dengan supabase.auth.signInWithOAuth({ provider: "google" })
    const m = login({ name: "Pengguna Google", email: "demo@gmail.com", avatar: "" });
    r.push(m.wa === "verified" ? next : "/verify-phone?next=" + encodeURIComponent(next));
  };
  return (
    <div className="pay">
      <h1>{signup ? "Buat akun" : "Masuk"}</h1>
      {sp.get("need") && <p className="note">Masuk atau daftar dulu untuk Pre-Order dan membuka Dashboard.</p>}
      <p className="muted">AREALIS memakai akun Google, jadi tidak perlu membuat kata sandi.</p>
      <button className="btn" onClick={go}>{signup ? "Daftar dengan Google" : "Masuk dengan Google"}</button>
      <p className="spec">Mode demo: tombol ini membuat akun contoh. Di tahap 2 tersambung ke Google asli lewat Supabase.</p>
      <p className="spec">
        {signup ? "Sudah punya akun? " : "Belum punya akun? "}
        <Link href={(signup ? "/login" : "/signup") + "?next=" + encodeURIComponent(next)}>{signup ? "Login" : "Sign Up"}</Link>
      </p>
    </div>
  );
}
