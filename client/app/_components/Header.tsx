"use client";

import { useState, useRef, useEffect } from "react";

type HeaderProps = {
  siteTitle?: string;
  phoneNumber?: string;
};

export default function Header({
  siteTitle: propSiteTitle,
  phoneNumber: propPhoneNumber,
}: HeaderProps) {
  const [isKittensDropdownOpen, setIsKittensDropdownOpen] = useState(false);
  const [isAdultsDropdownOpen, setIsAdultsDropdownOpen] = useState(false);
  const [isInformationDropdownOpen, setIsInformationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteTitle, setSiteTitle] = useState(propSiteTitle || "Astrid Moon Cattery");
  const [phoneNumber, setPhoneNumber] = useState(propPhoneNumber || "(832) 951-0506");
  
  const kittensTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const adultsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const informationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadHeroesData = async () => {
      try {
        const response = await fetch('/api/heroes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
        }
        
        const data = await response.json();
        setSiteTitle(data.siteTitle);
        setPhoneNumber(data.phoneNumber);
      } catch (error) {
        console.error("Failed to load heroes data:", error);
        // Props'tan gelen değerleri kullanmaya devam et
      }
    };
    loadHeroesData();
  }, []);

  const handleKittensMouseEnter = () => {
    if (kittensTimeoutRef.current) clearTimeout(kittensTimeoutRef.current);
    kittensTimeoutRef.current = setTimeout(() => {
      setIsKittensDropdownOpen(true);
    }, 150);
  };

  const handleKittensMouseLeave = () => {
    if (kittensTimeoutRef.current) clearTimeout(kittensTimeoutRef.current);
    kittensTimeoutRef.current = setTimeout(() => {
      setIsKittensDropdownOpen(false);
    }, 300);
  };

  const handleAdultsMouseEnter = () => {
    if (adultsTimeoutRef.current) clearTimeout(adultsTimeoutRef.current);
    adultsTimeoutRef.current = setTimeout(() => {
      setIsAdultsDropdownOpen(true);
    }, 150);
  };

  const handleAdultsMouseLeave = () => {
    if (adultsTimeoutRef.current) clearTimeout(adultsTimeoutRef.current);
    adultsTimeoutRef.current = setTimeout(() => {
      setIsAdultsDropdownOpen(false);
    }, 300);
  };

  const handleInformationMouseEnter = () => {
    if (informationTimeoutRef.current) clearTimeout(informationTimeoutRef.current);
    informationTimeoutRef.current = setTimeout(() => {
      setIsInformationDropdownOpen(true);
    }, 150);
  };

  const handleInformationMouseLeave = () => {
    if (informationTimeoutRef.current) clearTimeout(informationTimeoutRef.current);
    informationTimeoutRef.current = setTimeout(() => {
      setIsInformationDropdownOpen(false);
    }, 300);
  };

  return (
    <header className="bg-white">
      {/* Top Section */}
      <div>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Site Title */}
          <h1 className="text-2xl md:text-4xl font-serif tracking-wide" style={{ color: '#F7D9C4' }}>
            {siteTitle}
          </h1>
          
          {/* Desktop: Phone Number, Mobile: Burger Menu */}
          <div className="flex items-center gap-4">
            {/* Phone Number - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer">
              <svg
                className="w-8 h-8"
                style={{ color: '#C6DEF1' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 7l10 7 10-7" />
              </svg>
              <span className="text-3xl font-lora" style={{ color: '#C6DEF1' }}>
                {phoneNumber}
              </span>
            </div>
            
            {/* Burger Menu Button - Mobile only */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-gray-50 border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex flex-col">
              <a href="/" className="text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200">
                Home
              </a>
              
              {/* Kittens Dropdown */}
              <div>
                <button
                  onClick={() => setIsKittensDropdownOpen(!isKittensDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200"
                >
                  Kittens
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isKittensDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isKittensDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4">
                    <a href="avaible-kittens" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Available Kittens</a>
                    <a href="kittenapp" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Kitten Application</a>
                    <a href="adoption-process" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Adoption Process</a>
                    <a href="faq" className="block text-gray-700 hover:text-gray-900 transition-colors py-2">FAQ</a>
                  </div>
                </div>
              </div>

              {/* Adults Dropdown */}
              <div>
                <button
                  onClick={() => setIsAdultsDropdownOpen(!isAdultsDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200"
                >
                  Adults
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isAdultsDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAdultsDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4">
                    <a href="kings" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Kings</a>
                    <a href="queens" className="block text-gray-700 hover:text-gray-900 transition-colors py-2">Queens</a>
                  </div>
                </div>
              </div>

              {/* Information Dropdown */}
              <div>
                <button
                  onClick={() => setIsInformationDropdownOpen(!isInformationDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200"
                >
                  Information
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isInformationDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isInformationDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4">
                    <a href="/history" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">History</a>
                    <a href="/adoption-process" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Adoption Process</a>
                    <a href="/wait-list" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Wait List</a>
                    <a href="/recipe" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Homemade Feline Raw Recipe</a>
                    <a href="/diet" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Diet</a>
                    <a href="/spaying-and-neutering" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Spaying and Neutering</a>
                    <a href="/recommended-products" className="block text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-200">Recommended Products</a>
                    <a href="/faq" className="block text-gray-700 hover:text-gray-900 transition-colors py-2">FAQ</a>
                  </div>
                </div>
              </div>

              <a href="galleries" className="text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200">
                Galleries
              </a>
              <a href="blog" className="text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200">
                Blog
              </a>
              <a href="testimonials" className="text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200">
                Testimonials
              </a>
              <a href="about-us" className="text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-200">
                About Us
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-base">
          <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
            Home
          </a>
          
          <div className="relative">
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1 cursor-pointer"
              onMouseEnter={handleKittensMouseEnter}
              onMouseLeave={handleKittensMouseLeave}
            >
              Kittens
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            
            {isKittensDropdownOpen && (
              <div 
                className="absolute top-full left-0 pt-2 z-50"
                onMouseEnter={handleKittensMouseEnter} 
                onMouseLeave={handleKittensMouseLeave}
              >
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 min-w-[200px] transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-top-2">
                  <a href="avaible-kittens" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Available Kittens</a>
                  <a href="kittenapp" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Kitten Application</a>
                  <a href="adoption-process" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Adoption Process</a>
                  <a href="faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">FAQ</a>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1 cursor-pointer"
              onMouseEnter={handleAdultsMouseEnter}
              onMouseLeave={handleAdultsMouseLeave}
            >
              Adults
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            
            {isAdultsDropdownOpen && (
              <div 
                className="absolute top-full left-0 pt-2 z-50"
                onMouseEnter={handleAdultsMouseEnter} 
                onMouseLeave={handleAdultsMouseLeave}
              >
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 min-w-[200px] transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-top-2">
                  <a href="kings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Kings</a>
                  <a href="queens" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Queens</a>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1 cursor-pointer"
              onMouseEnter={handleInformationMouseEnter}
              onMouseLeave={handleInformationMouseLeave}
            >
              Information
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            
            {isInformationDropdownOpen && (
              <div 
                className="absolute top-full left-0 pt-2 z-50"
                onMouseEnter={handleInformationMouseEnter} 
                onMouseLeave={handleInformationMouseLeave}
              >
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 min-w-[200px] transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-top-2">
                  <a href="/history" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">History</a>
                  <a href="/adoption-process" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Adoption Process</a>
                  <a href="/wait-list" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Wait List</a>
                  <a href="/recipe" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Homemade Feline Raw Recipe</a>
                  <a href="/diet" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Diet</a>
                  <a href="/spaying-and-neutering" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Spaying and Neutering</a>
                  <a href="/recommended-products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Recommended Products</a>
                  <a href="/faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">FAQ</a>
                </div>
              </div>
            )}
          </div>
          
          <a href="galleries" className="text-gray-700 hover:text-gray-900 transition-colors">Galleries</a>
          <a href="blog" className="text-gray-700 hover:text-gray-900 transition-colors">Blog</a>
          <a href="testimonials" className="text-gray-700 hover:text-gray-900 transition-colors">Testimonials</a>
          <a href="about-us" className="text-gray-700 hover:text-gray-900 transition-colors">About Us</a>
        </div>
      </nav>
    </header>
  );
}
