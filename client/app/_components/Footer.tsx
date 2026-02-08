import Image from "next/image";
import ScrollToTop from "./ScrollToTop";

interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
}

interface FooterProps {
  siteTitle?: string;
  phoneNumber?: string;
  location?: string;
  socialLinks?: SocialLink[];
}

export default function Footer({ 
  siteTitle = "Astrid Moon Cattery",
  phoneNumber = "(832) 951-0506",
  location = "AUSTIN, TEXAS",
  socialLinks = [] 
}: FooterProps) {
  return (
    <footer className="bg-[#F9F1F1] pt-12 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Sol - İletişim Bilgileri */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h2 className="font-lora text-[#b1868e] text-xl md:text-2xl tracking-wider">
              {siteTitle.toUpperCase()}
            </h2>
            <div className="text-[#9a868d] text-base md:text-lg">
              {location}
            </div>
            <div className="text-[#b1868e] text-base md:text-lg">
              {phoneNumber}
            </div>
            <div className="flex gap-4 pt-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a 
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image 
                      src={link.icon} 
                      alt={link.name} 
                      width={28} 
                      height={28}
                      className="w-7 h-7 object-cover"
                    />
                  </a>
                ))
              ) : (
                <>
                  <a 
                    href="#" 
                    aria-label="Instagram"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image 
                      src="/images/instagram.png" 
                      alt="Instagram" 
                      width={28} 
                      height={28}
                      className="w-7 h-7"
                    />
                  </a>
                  <a 
                    href="#" 
                    aria-label="Facebook"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image 
                      src="/images/facebook.png" 
                      alt="Facebook" 
                      width={28} 
                      height={28}
                      className="w-7 h-7"
                    />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Orta - Logo */}
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 md:w-36 md:h-36 relative">
              <Image 
                src="/images/logo.png" 
                alt="Ethereal Persians Logo" 
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Sağ - Menüler */}
          <div className="flex flex-row justify-center md:justify-end gap-8 md:gap-12">
            <div>
              <h3 className="font-lora text-xl md:text-2xl text-[#9a868d] mb-4">
                Browse
              </h3>
              <ul className="text-[#7c7175] text-sm space-y-2">
                <li>
                  <a className="text-[#b1868e] hover:text-[#9a868d] transition-colors" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/about-us">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/blog">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/galleries">
                    Galleries
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/testimonials">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-lora text-xl md:text-2xl text-[#9a868d] mb-4">
                Shop
              </h3>
              <ul className="text-[#7c7175] text-sm space-y-2">
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/avaible-kittens">
                    Available Kittens
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="#">
                    Kitten Application
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/terms">
                    Terms of Sale
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/recipe">
                    Homemade Recipe
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#b1868e] transition-colors" href="/recommended-products">
                    Products
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Copyright Barı */}
      <div className="bg-[#efd1d1] w-full text-[#b1868e] text-xs flex flex-col md:flex-row justify-between items-center px-6 py-4 mt-12 gap-3 md:gap-0">
        <div className="text-center md:text-left">
          © 2025 {siteTitle} | 
          <a href="#" className="underline hover:text-[#9a868d] ml-1">Terms Of Use</a> | 
          <a href="#" className="underline hover:text-[#9a868d] ml-1">Privacy Policy</a>
        </div>
        
        {/* Scroll to top butonu */}
        <ScrollToTop />
      </div>
    </footer>
  );
}
