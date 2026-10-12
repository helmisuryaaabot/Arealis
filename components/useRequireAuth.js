"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
// Mengembalikan true jika halaman boleh tampil. Jika belum login, diarahkan ke /login.
// needPhone: wajib sudah verifikasi nomor WA. next: tujuan setelah login.
export default function useRequireAuth(needPhone = false, next) {
  const { user, ready } = useAuth();
  const r = useRouter();
  const path = usePathname();
  const to = encodeURIComponent(next || path);
  useEffect(() => {
    if (!ready) return;
    if (!user) r.replace("/login?need=1&next=" + to);
    else if (needPhone && !user.phone) r.replace("/verify-phone?next=" + to);
  }, [ready, user, needPhone, r, to]);
  return ready && !!user && (!needPhone || !!user.phone);
}
