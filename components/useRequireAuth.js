"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
// true jika halaman boleh tampil. Belum login: ke /login. needProfile: wajib sudah mengisi formulir data diri.
export default function useRequireAuth(needProfile = false, next) {
  const { user, ready } = useAuth();
  const r = useRouter();
  const path = usePathname();
  const to = encodeURIComponent(next || path);
  useEffect(() => {
    if (!ready) return;
    if (!user) r.replace("/login?need=1&next=" + to);
    else if (needProfile && !user.profile) r.replace("/lengkapi-data?next=" + to);
  }, [ready, user, needProfile, r, to]);
  return ready && !!user && (!needProfile || !!user.profile);
}
