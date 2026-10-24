import { IG, TT } from "../data/social";
export default function FloatingSocial() {
  return (
    <div className="float">
      <a className="tt" href={TT} target="_blank" rel="noopener noreferrer" aria-label="TikTok AREALIS" title="TikTok @arealis_official">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" /></svg>
      </a>
      <a className="ig" href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram AREALIS" title="Instagram @arealis_official">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
      </a>
    </div>
  );
}
