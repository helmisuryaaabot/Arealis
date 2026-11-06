"use client";
// Autentikasi Supabase (Google). Data diri disimpan di tabel profiles, admin dicek lewat tabel admins.
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
const toProfile = (p) => p && { name: p.full_name, phone: p.phone, prov: p.province, city: p.city, dist: p.district, vill: p.village, rt: p.rt, rw: p.rw, complex: p.complex, block: p.block || "", number: p.house_number };
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    const load = async (session) => {
      if (!session) { setUser(null); setReady(true); return; }
      const u = session.user;
      const [pr, ad] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", u.id).maybeSingle(),
        supabase.from("admins").select("user_id").eq("user_id", u.id).maybeSingle(),
      ]);
      const meta = u.user_metadata || {};
      setUser({ id: u.id, email: u.email, name: meta.full_name || meta.name || u.email.split("@")[0], avatar: meta.avatar_url || meta.picture || "", profile: toProfile(pr.data), isAdmin: !!ad.data });
      setReady(true);
    };
    supabase.auth.getSession().then(({ data }) => load(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { setTimeout(() => load(session), 0); });
    return () => sub.subscription.unsubscribe();
  }, []);
  const loginWithGoogle = async (next) => {
    if (!supabase) return { error: { message: "Supabase belum dikonfigurasi (cek file .env.local)." } };
    try { sessionStorage.setItem("arealis_next", next || "/catalog"); } catch {}
    return supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin + "/auth/callback" } });
  };
  const logout = async () => { if (supabase) await supabase.auth.signOut(); setUser(null); };
  const saveProfile = async (p) => {
    const row = { id: user.id, email: user.email, full_name: p.name, phone: p.phone, province: p.prov, city: p.city, district: p.dist, village: p.vill, rt: p.rt, rw: p.rw, complex: p.complex, block: p.block || null, house_number: p.number, updated_at: new Date().toISOString() };
    const { error } = await supabase.from("profiles").upsert(row);
    if (!error) setUser((u) => ({ ...u, profile: p }));
    return { error };
  };
  return <Ctx.Provider value={{ user, ready, loginWithGoogle, logout, saveProfile }}>{children}</Ctx.Provider>;
}
