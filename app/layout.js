import "./globals.css";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";
import FloatingSocial from "../components/FloatingSocial";
import { IG, TT } from "../data/social";
const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--f-body" });
const themeScript = 'try{if(localStorage.getItem("arealis-theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}';
export const metadata = { title: "AREALIS", description: "Aksesori akrilik ukir laser dengan cerita flora dan fauna" };
export default function RootLayout({ children }) {
  return (
    <html lang="id" className={font.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <AuthProvider>
          <div className="announce">Pre-Order dibuka. Pengambilan pesanan di Kampus UBSI Cikarang. <Link href="/catalog">Lihat Catalog</Link></div>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
        <footer className="foot">
          <div className="footgrid">
            <div><h4>AREALIS</h4><p>Aksesori akrilik berukir laser dengan cerita flora dan fauna.</p></div>
            <div><h4>Belanja</h4><Link href="/catalog">Catalog</Link><Link href="/lore">Lore / The Codex</Link></div>
            <div><h4>Tentang</h4><Link href="/about">About Us</Link><Link href="/about">Kontak dan lokasi</Link></div>
            <div><h4>Ikuti kami</h4><a href={IG} target="_blank" rel="noopener noreferrer">Instagram</a><a href={TT} target="_blank" rel="noopener noreferrer">TikTok</a></div>
          </div>
          <div className="legal">AREALIS. Pengambilan pesanan di Kampus UBSI Cikarang.</div>
        </footer>
        <FloatingSocial />
      </body>
    </html>
  );
}
