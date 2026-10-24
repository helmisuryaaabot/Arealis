"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { banners } from "../data/banners";
export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const n = banners.length;
  useEffect(() => {
    if (pause) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [pause, n]);
  return (
    <section className="hero" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} aria-roledescription="carousel" aria-label="Banner promo">
      {banners.map((b, k) => (
        <div key={b.title} className={"slide" + (k === i ? " on" : "") + (b.image ? " img" : "")} style={{ background: b.image ? "url(" + b.image + ") center/cover" : b.bg }} aria-hidden={k !== i}>
          <span className="glyph">{b.glyph}</span>
          <div className="copy">
            <h2 className="stitle">{b.title}</h2>
            <p>{b.text}</p>
            <Link className="btn white" href={b.href} tabIndex={k === i ? 0 : -1}>{b.cta}</Link>
          </div>
        </div>
      ))}
      <button className="arrow l" aria-label="Sebelumnya" onClick={() => setI((i + n - 1) % n)}>‹</button>
      <button className="arrow r" aria-label="Berikutnya" onClick={() => setI((i + 1) % n)}>›</button>
      <div className="dots">{banners.map((b, k) => <button key={b.title} className={k === i ? "on" : ""} aria-label={"Banner " + (k + 1)} onClick={() => setI(k)} />)}</div>
    </section>
  );
}
