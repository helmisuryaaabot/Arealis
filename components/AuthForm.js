"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
export default function AuthForm({ mode }) {
  const signup = mode === "signup";
  const sp = useSearchParams();
  const next = sp.get("next") || "/catalog";
  const { loginWithGoogle } = useAuth();
  const [err, setErr] = useState("");
  const go = async () => {
    setErr("");
    const { error } = await loginWithGoogle(next);
    if (error) setErr("Login gagal: " + error.message);
  };
  return (
    <div className="pay">
      <h1>{signup ? "Buat akun" : "Masuk"}</h1>
      {sp.get("need") && <p className="note">Masuk atau daftar dulu untuk Pre-Order dan membuka Dashboard.</p>}
      <p className="muted">AREALIS memakai akun Google, jadi tidak perlu membuat kata sandi. Setelah masuk, kamu akan diminta melengkapi data diri.</p>
      <button className="btn" onClick={go}>{signup ? "Daftar dengan Google" : "Masuk dengan Google"}</button>
      {err && <p className="err">{err}</p>}
      <p className="spec">
        {signup ? "Sudah punya akun? " : "Belum punya akun? "}
        <Link href={(signup ? "/login" : "/signup") + "?next=" + encodeURIComponent(next)}>{signup ? "Login" : "Sign Up"}</Link>
      </p>
    </div>
  );
}
