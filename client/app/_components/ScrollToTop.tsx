"use client";

export default function ScrollToTop() {
  return (
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
  );
}
