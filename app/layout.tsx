import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import site from "@/lib/site.json";
import "./globals.css";

const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
export const metadata: Metadata = { title: site.brand, description: "TICA registered Ragdoll cattery in Austin, Texas, raising affectionate kittens with love and care.", icons: { icon: site.logo } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${openSans.variable} ${playfair.variable}`} data-scroll-behavior="smooth"><body><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}
