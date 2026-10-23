"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
// true jika halaman boleh tampil. Belum login: ke /login. needWa: wajib sudah verifikasi WhatsApp.
export default function useRequireAuth(needWa = false, next) {
  const { user, ready } = useAuth();
  const r = useRouter();
  const path = usePathname();
  const to = encodeURIComponent(next || path);
  useEffect(() => {
    if (!ready) return;
    if (!user) r.replace("/login?need=1&next=" + to);
    else if (needWa && user.wa !== "verified") r.replace("/verify-phone?next=" + to);
  }, [ready, user, needWa, r, to]);
  return ready && !!user && (!needWa || user.wa === "verified");
}
