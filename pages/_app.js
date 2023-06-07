import "@/styles/globals.css";
import Layout from "../components/Layout";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { initGA, logPageView } from "@/utils/analytics";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
