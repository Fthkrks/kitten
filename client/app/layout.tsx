import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { fetchHeroesData, fetchMediaData } from "@/services/api";

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
  title: "Astrid Moon Cattery",
  description: "Premium Persian cat breeding - Astrid Moon Cattery",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch heroes data and media data for footer
  const heroesData = await fetchHeroesData();
  const mediaData = await fetchMediaData();

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lora.variable} antialiased`}
      >
        <Header siteTitle={heroesData.siteTitle} phoneNumber={heroesData.phoneNumber} />
        {children}
        <Footer 
          siteTitle={heroesData.siteTitle} 
          phoneNumber={heroesData.phoneNumber}
          socialLinks={mediaData.socialLinks} 
        />
      </body>
    </html>
  );
}
