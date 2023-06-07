import Header from "./Header";
import Footer from "./Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={`${inter.className}`}>
      <div className="max-w-[1200px] mx-auto p-5  ">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
