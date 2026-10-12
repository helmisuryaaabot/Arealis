import { Suspense } from "react";
import AuthForm from "../../components/AuthForm";
export default function Page() {
  return <section className="wrap"><Suspense fallback={<p>Memuat...</p>}><AuthForm mode="signup" /></Suspense></section>;
}
