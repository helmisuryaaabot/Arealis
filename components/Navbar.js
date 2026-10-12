"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
const links = [["/", "Home"], ["/lore", "Lore / The Codex"], ["/catalog", "Catalog"], ["/about", "About Us"]];
export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  return (
    <header className="nav">
      <Link href="/" className="logo">AREALIS</Link>
      <nav>
        {links.map(([href, t]) => (
          <Link key={href} href={href} className={path === href ? "on" : ""}>{t}</Link>
        ))}
      </nav>
      <div className="acct">
        {ready && (user ? (
          <>
            <Link href="/dashboard" className="profile" title="Buka dashboard saya">
              {user.avatar ? <img className="ava" src={user.avatar} alt="" /> : <span className="ava">{user.name[0]}</span>}
              {user.name}
            </Link>
            <button className="btn ghost" onClick={() => { logout(); router.push("/"); }}>Log Out</button>
          </>
        ) : (
          <>
            <Link className="btn" href="/signup">Sign Up</Link>
            <Link className="btn ghost" href="/login">Login</Link>
          </>
        ))}
      </div>
    </header>
  );
}
