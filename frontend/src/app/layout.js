import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Providers from "./components/Providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "Credence — Blockchain Certificate Verification",
  description:
    "Issue, verify, and manage tamper-proof digital certificates secured by blockchain technology and IPFS.",
  keywords: "blockchain, certificate, verification, IPFS, decentralized, Web3, Credence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} ${inter.className}`}>
        <Providers>
          <NavBar />
          <main style={{ flex: 1 }}>{children}</main>
          <footer className="footer">
            <p>
              Credence — Blockchain-Powered Certificate Verification &middot;{" "}
              Secured by Ethereum &amp; IPFS
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
