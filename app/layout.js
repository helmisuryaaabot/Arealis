import "./globals.css";
import { IM_Fell_English_SC, IM_Fell_English } from "next/font/google";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";
const head = IM_Fell_English_SC({ subsets: ["latin"], weight: "400", variable: "--f-head" });
const body = IM_Fell_English({ subsets: ["latin"], weight: "400", variable: "--f-body" });
export const metadata = { title: "AREALIS", description: "Aksesoris akrilik ukir laser bergaya relik fantasi" };
export default function RootLayout({ children }) {
  return (
    <html lang="id" className={head.variable + " " + body.variable}>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
        <footer>AREALIS. Pengambilan pesanan di Kampus UBSI Cikarang.</footer>
      </body>
    </html>
  );
}
