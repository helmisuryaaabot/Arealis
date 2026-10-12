"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
const DEMO_OTP = "123456";
export default function AuthForm({ mode }) {
  const signup = mode === "signup";
  const r = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/catalog";
  const { login } = useAuth();
  const [step, setStep] = useState("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const done = (u) => {
    const m = login(u);
    r.push(m.phone ? next : "/verify-phone?next=" + encodeURIComponent(next));
  };
  const sendOtp = (e) => {
    e.preventDefault();
    if (signup && !name.trim()) return setErr("Isi nama lengkapmu.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Masukkan alamat email yang valid.");
    setErr(""); setStep("otp");
  };
  const check = (e) => {
    e.preventDefault();
    if (otp !== DEMO_OTP) return setErr("Kode salah. Di mode demo, gunakan " + DEMO_OTP + ".");
    done({ name: name.trim() || email.split("@")[0], email, avatar: "" });
  };
  return (
    <div className="pay">
      <h1>{signup ? "Buat akun" : "Masuk"}</h1>
      {sp.get("need") && <p className="note">Masuk atau daftar dulu untuk Pre-Order dan membuka Dashboard.</p>}
      <button className="btn" onClick={() => done({ name: "Pengguna Google", email: "demo@gmail.com", avatar: "" })}>
        {signup ? "Daftar dengan Google" : "Masuk dengan Google"}
      </button>
      <p className="spec">atau pakai kode OTP lewat email</p>
      {step === "email" ? (
        <form onSubmit={sendOtp}>
          {signup && <input className="inp" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} />}
          <input className="inp" type="email" placeholder="Email (Gmail)" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn ghost">Kirim kode OTP</button>
        </form>
      ) : (
        <form onSubmit={check}>
          <p className="muted">Kode 6 digit dikirim ke {email}. Mode demo: {DEMO_OTP}.</p>
          <input className="inp" inputMode="numeric" maxLength={6} placeholder="Kode OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button className="btn">{signup ? "Daftar" : "Masuk"}</button>
          <button type="button" className="btn ghost" onClick={() => { setStep("email"); setOtp(""); setErr(""); }}>Ganti email</button>
        </form>
      )}
      {err && <p className="err">{err}</p>}
      <p className="spec">
        {signup ? "Sudah punya akun? " : "Belum punya akun? "}
        <Link href={(signup ? "/login" : "/signup") + "?next=" + encodeURIComponent(next)}>{signup ? "Login" : "Sign Up"}</Link>
      </p>
    </div>
  );
}
