"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F9F1F1] pt-10 pb-0">
      <div className="max-w-[2000px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 items-center justify-between text-center md:text-left gap-10">
        {/* Sol */}
        <div className="space-y-2 flex flex-col items-center justify-center">
          <h2 className="font-lora text-[#b1868e] text-2xl md:text-3xl tracking-wider">ETHEREAL PERSIANS LLC</h2>
          <div className="text-[#9a868d] text-xl">SARASOTA, FLORIDA</div>
          <div className="text-[#b1868e] text-lg">1(941) 822-4016</div>
          <div className="flex gap-3 pt-2">
            <a href="#" aria-label="Instagram">
              <Image className="w-full h-full object-cover" src="/images/instagram.png" alt="Instagram" width={28} height={28} />
            </a>
            <a href="#" aria-label="Facebook">
              <Image src="/images/facebook.png" alt="Facebook" width={28} height={28} />
            </a>
          </div>
        </div>
        {/* Orta logo */}
        <div className="flex items-center justify-center">
          <div className="rounded-full  w-32 h-32 flex items-center justify-center">
            {/* Geçici logo, kendin SVG ile değiştirebilirsin */}
            <Image src="/images/logo.png" alt="Logo" width={700} height={700} />

          </div>
        </div>
        {/* Sağ menü */}
        <div className="flex flex-col md:flex-row justify-center md:justify-end gap-10">
          <div>
            <h3 className="italic text-2xl text-[#9a868d] mb-3">Browse</h3>
            <ul className="text-[#7c7175] text-sm space-y-2.5">
              <li><a className="text-[#b1868e] " href="#">Home</a></li>
              <li><a href="about-us">About Us</a></li>
              <li><a href="blog">Blog</a></li>
              <li><a href="galleries">Galleries</a></li>
              <li><a href="testimonials">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h3 className="italic text-2xl text-[#9a868d] mb-3">Shop</h3>
            <ul className="text-[#7c7175] text-sm space-y-2.5">
              <li><a href="avaible-kittens">Available Kittens</a></li>
              <li><a href="#">Kitten Application</a></li>
              <li><a href="terms">Terms of Sale</a></li>
              <li><a href="recipe">Homemade Feline Recipe</a></li>
              <li><a href="recommended-products">Recommended Products</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Alt copyright barı */}
      <div className="bg-[#efd1d1] w-full text-[#b1868e] text-xs flex justify-between items-center px-4 md:px-8 py-3 mt-8 relative">
        <div>
          © 2025 Ethereal Persians | <a href="#" className="underline">Terms Of Use</a> | <a href="#" className="underline">Privacy Policy</a>
        </div>
        {/* Scroll to top butonu */}
        <a
          href="#"
          className="fixed md:static bottom-6 right-4 md:right-0 flex items-center justify-center bg-[#b1868e] hover:bg-[#a67d8f] text-white w-10 h-10 rounded-full shadow-xl transition-colors z-30"
          style={{ boxShadow: '0 4px 16px 0 #b1868e33' }}
          aria-label="Scroll to top"
          onClick={e => {
            e.preventDefault(); window.scrollTo({top: 0, behavior: "smooth"});
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12,5L12,20M12,5L5,12M12,5L19,12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </footer>
  );
}
