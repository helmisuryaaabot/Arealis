"use client";
// MODE DEMO: sesi disimpan di browser (localStorage). Di tahap 2 diganti Supabase Auth.
import { createContext, useContext, useState, useEffect } from "react";
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
const K = "arealis_user", P = "arealis_phones";
const phones = () => { try { return JSON.parse(localStorage.getItem(P) || "{}"); } catch { return {}; } };
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
  const login = (u) => { const m = { ...u, phone: phones()[u.email] || "" }; save(m); return m; };
  const setPhone = (ph) => {
    try { localStorage.setItem(P, JSON.stringify({ ...phones(), [user.email]: ph })); } catch {}
    save({ ...user, phone: ph });
  };
  return <Ctx.Provider value={{ user, ready, login, logout: () => save(null), setPhone }}>{children}</Ctx.Provider>;
}
