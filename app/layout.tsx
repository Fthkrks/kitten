import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import site from "@/lib/site.json";
import "./globals.css";
import {getCms} from "@/lib/cms";

const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
export const metadata: Metadata = { title: site.brand, description: "TICA registered Ragdoll cattery in Austin, Texas, raising affectionate kittens with love and care.", icons: { icon: site.logo } };
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const {settings,content,lists}=await getCms();
  return <html lang="en" className={`${openSans.variable} ${playfair.variable}`} data-scroll-behavior="smooth"><body><Header site={settings}/><main id="main-content">{children}</main><Footer site={settings} content={content} lists={lists}/></body></html>;
}
