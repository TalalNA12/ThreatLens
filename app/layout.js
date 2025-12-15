import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Layout/Navbar';
import { AssetProvider } from "./context/AssetContext";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans", 
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "ThreatLens — Lightweight Cyber Threat Dashboard",
  description: "ThreatLens helps you track assets and security findings across your attack surface.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar/>
        <main className="flex-1 relative z-10">
          <AssetProvider>
          {children}
          </AssetProvider>
        </main>
      </body>
    </html>
  );
}
