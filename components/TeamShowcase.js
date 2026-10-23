"use client";
import { useState, useEffect } from "react";
import { team } from "../data/team";
function Member({ m, delay }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let iv;
    const t = setTimeout(() => {
      setI((x) => 1 - x);
      iv = setInterval(() => setI((x) => 1 - x), 4500);
    }, delay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [delay]);
  return (
    <figure className="member">
      <div className="stage">
        {[0, 1].map((k) => {
          const src = m.photos[k];
          return (
            <div key={k} className={"pose " + (i === k ? "front" : "back")}>
              {src ? <img src={src} alt={m.name + " pose " + (k + 1)} /> : <div className="ph"><span>{m.name.slice(-1)}</span><small>Pose {k + 1}</small></div>}
            </div>
          );
        })}
      </div>
      <figcaption><b>{m.name}</b><span>{m.role}</span></figcaption>
    </figure>
  );
}
export default function TeamShowcase() {
  return (
    <div className="team">
      {team.map((m, k) => (
        <div className="tm" key={m.name}>
          <Member m={m} delay={800 + k * 900} />
          <div className="card contact">
            <a href={"https://wa.me/" + m.wa}>WA +{m.wa}</a>
            <a href={"mailto:" + m.email}>{m.email}</a>
            <a href={"https://instagram.com/" + m.ig}>IG @{m.ig}</a>
          </div>
        </div>
      ))}
    </div>
  );
}
