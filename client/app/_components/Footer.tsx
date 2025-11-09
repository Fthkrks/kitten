"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F9F1F1] pt-12 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Sol - İletişim Bilgileri */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h2 className="font-lora text-[#b1868e] text-xl md:text-2xl tracking-wider">
              ETHEREAL PERSIANS LLC
            </h2>
            <div className="text-[#9a868d] text-base md:text-lg">
              SARASOTA, FLORIDA
            </div>
            <div className="text-[#b1868e] text-base md:text-lg">
              1(941) 822-4016
            </div>
            <div className="flex gap-4 pt-2">
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
          © 2025 Ethereal Persians | 
          <a href="#" className="underline hover:text-[#9a868d] ml-1">Terms Of Use</a> | 
          <a href="#" className="underline hover:text-[#9a868d] ml-1">Privacy Policy</a>
        </div>
        
        {/* Scroll to top butonu */}
        <button
          className="fixed md:static bottom-6 right-6 md:right-0 flex items-center justify-center bg-[#b1868e] hover:bg-[#a67d8f] text-white w-11 h-11 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      </div>
    </footer>
  );
}
