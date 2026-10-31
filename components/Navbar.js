"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useTheme, ThemeIcon } from "./theme";
const base = [["/", "Home"], ["/lore", "Lore / The Codex"], ["/catalog", "Catalog"], ["/about", "About Us"]];
export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const themeLabel = theme === "dark" ? "Mode terang" : "Mode gelap";
  useEffect(() => setOpen(false), [path]);
  const links = base; // halaman /admin sengaja tidak ditautkan di menu; dibuka lewat alamat langsung
  const out = () => { logout(); setOpen(false); router.push("/"); };
  return (
    <>
      <header className="nav">
        <button className="burger" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(true)}>☰</button>
        <Link href="/" className="logo"><img src="/logo-mark.svg" alt="" width="36" height="36" />AREALIS</Link>
        <nav>
          {links.map(([href, t]) => <Link key={href} href={href} className={path === href ? "on" : ""}>{t}</Link>)}
        </nav>
        <div className="acct">
          <button className="themebtn" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}><ThemeIcon theme={theme} /></button>
          {ready && (user ? (
            <>
              <Link href="/dashboard" className="profile" title="Buka dashboard saya">
                {user.avatar ? <img className="ava" src={user.avatar} alt="" /> : <span className="ava">{user.name[0]}</span>}
                <span className="pname">{user.name}</span>
              </Link>
              <button className="btn ghost out" onClick={out}>Log Out</button>
            </>
          ) : (
            <>
              <Link className="btn" href="/signup">Sign Up</Link>
              <Link className="btn ghost" href="/login">Login</Link>
            </>
          ))}
        </div>
      </header>
      <div className={"scrim" + (open ? " on" : "")} onClick={() => setOpen(false)} />
      <aside className={"drawer" + (open ? " on" : "")} aria-hidden={!open}>
        <div className="row"><span className="logo"><img src="/logo-mark.svg" alt="" width="36" height="36" />AREALIS</span><button className="x2" aria-label="Tutup menu" onClick={() => setOpen(false)}>×</button></div>
        {links.map(([href, t]) => <Link key={href} href={href} className={path === href ? "on" : ""}>{t}</Link>)}
        <button className="themerow" onClick={toggleTheme}><ThemeIcon theme={theme} />{themeLabel}</button>
        {user && <button className="btn ghost" onClick={out}>Log Out</button>}
      </aside>
    </>
  );
}
