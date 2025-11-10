import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { mediaData } from "@/data/mediaData";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethereal Persians",
  description: "Premium Persian cat breeding - Ethereal Persians Cattery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lora.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer socialLinks={mediaData.socialLinks} />
      </body>
    </html>
  );
}
