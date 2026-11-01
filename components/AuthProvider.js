"use client";
// MODE DEMO: sesi dan data diri disimpan di browser (localStorage). Di tahap 2 diganti Supabase Auth + tabel profiles.
import { createContext, useContext, useState, useEffect } from "react";
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
const K = "arealis_user", P = "arealis_profiles";
const ADMINS = ["demo@gmail.com"]; // demo; tahap 2: peran admin dari Supabase
const profiles = () => { try { return JSON.parse(localStorage.getItem(P) || "{}"); } catch { return {}; } };
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setUser(JSON.parse(localStorage.getItem(K) || "null")); } catch {}
    setReady(true);
  }, []);
  const save = (u) => {
    setUser(u);
    try { u ? localStorage.setItem(K, JSON.stringify(u)) : localStorage.removeItem(K); } catch {}
  };
  const login = (u) => {
    const m = { ...u, profile: profiles()[u.email] || null, isAdmin: ADMINS.includes(u.email) };
    save(m);
    return m;
  };
  const saveProfile = (p) => {
    try { localStorage.setItem(P, JSON.stringify({ ...profiles(), [user.email]: p })); } catch {}
    save({ ...user, profile: p });
  };
  return <Ctx.Provider value={{ user, ready, login, logout: () => save(null), saveProfile }}>{children}</Ctx.Provider>;
}
