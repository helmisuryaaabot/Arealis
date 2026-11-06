"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../components/AuthProvider";
export default function Callback() {
  const { user, ready } = useAuth();
  const r = useRouter();
  useEffect(() => {
    if (!ready) return;
    let next = "/catalog";
    try { next = sessionStorage.getItem("arealis_next") || next; sessionStorage.removeItem("arealis_next"); } catch {}
    if (!user) { r.replace("/login"); return; }
    r.replace(user.profile ? next : "/lengkapi-data?next=" + encodeURIComponent(next));
  }, [ready, user, r]);
  return <section className="wrap"><p className="muted">Memproses login...</p></section>;
}
