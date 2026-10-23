"use client";
// MODE DEMO: sesi disimpan di browser (localStorage). Di tahap 2 diganti Supabase Auth.
// wa: "none" (belum), "pending" (pesan terkirim, menunggu admin), "verified" (dikonfirmasi admin).
import { createContext, useContext, useState, useEffect } from "react";
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
const K = "arealis_user", W = "arealis_wa";
const ADMINS = ["demo@gmail.com"]; // demo; tahap 2: peran admin dari Supabase
const waMap = () => { try { return JSON.parse(localStorage.getItem(W) || "{}"); } catch { return {}; } };
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
    const m = { ...u, wa: waMap()[u.email] || "none", isAdmin: ADMINS.includes(u.email) };
    save(m);
    return m;
  };
  const setWa = (s) => {
    try { localStorage.setItem(W, JSON.stringify({ ...waMap(), [user.email]: s })); } catch {}
    save({ ...user, wa: s });
  };
  return <Ctx.Provider value={{ user, ready, login, logout: () => save(null), setWa }}>{children}</Ctx.Provider>;
}
