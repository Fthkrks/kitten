"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type StoryProps = {
  heroImage?: string;
  heading?: string; // big white text on image
  cardTitle?: string; // OUR STORY title
  cardText?: string; // paragraph
  overlayColor?: string; // overlay on image
  parallaxSpeed?: number; // multiplier for scroll parallax
  backgroundColor?: string; // section background
};

export default function CardImage({
  heroImage,
  heading,
  cardTitle,
  cardText,
  overlayColor,
  parallaxSpeed,
  backgroundColor,
}: StoryProps) {
  const [offset, setOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const speed = parallaxSpeed ?? 0.3; // internal behavior only
  const bg = backgroundColor ?? "transparent";
  const overlay = overlayColor ?? "transparent";

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      setOffset(window.scrollY * speed);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const showCard = Boolean(cardTitle || cardText);

  return (
    <section className="relative overflow-hidden min-h-[650px] flex flex-col items-center justify-end pb-20" style={{ background: bg }}>
      {/* Background image (parallax) */}
      {heroImage && (
        <div
          ref={heroRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            transform: `translateY(${offset}px)`,
            transition: "transform 0.2s cubic-bezier(.47,1.64,.41,.8)",
            pointerEvents: "none",
          }}
          className="w-full h-full overflow-hidden"
          aria-hidden="true"
        >
          <Image
            src={heroImage}
            alt="Cat Family"
            fill
            priority
            className="object-cover w-full h-full select-none pointer-events-none"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: overlay }} />

      <div className="relative z-20 flex flex-col items-center w-full">
        {/* Heading */}
        {heading && (
          <div className="pt-28 md:pt-32 mb-4 text-center">
            <h1 className="font-lora text-white text-3xl md:text-5xl tracking-widest drop-shadow-lg">{heading}</h1>
          </div>
        )}

        {/* Story card */}
        {showCard && (
          <div className="relative flex flex-col items-center w-full max-w-xl mx-auto mt-24">
            {/* Circular logo above card */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border border-[#dab0b9] rounded-full w-20 h-20 flex items-center justify-center shadow-md">
              {/* EP LOGO sample svg */}
              <svg width="48" height="55" viewBox="0 0 62 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.8 59.3c-9-4-16.4-13.2-18-23.8S13 14.4 31 15c18 .7 24.5 11.9 22.6 28-1.9 16-16.6 26-35.5 27.6" stroke="#b1868e" strokeWidth="2.2" />
                <ellipse cx="32" cy="23" rx="12" ry="14" stroke="#dab0b9" strokeWidth="2"/>
                <circle cx="23.8" cy="26.5" r="2" fill="#b1868e"/>
                <circle cx="38.2" cy="26.5" r="2" fill="#b1868e"/>
                <path d="M28 27.5c.7 1.4 2.7 1.5 3.9 1.5s3.1-.1 3.9-1.5" stroke="#b1868e" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="bg-white shadow-2xl rounded-lg px-8 py-10 pt-16 text-center min-h-[220px] flex flex-col items-center">
              {cardTitle && (
                <h2 className="mb-3 font-lora text-xl md:text-2xl border-b border-[#b1868e] pb-2 tracking-wide text-[#b1868e]">{cardTitle}</h2>
              )}
              {cardText && (
                <div className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[620px]">
                  {cardText}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
