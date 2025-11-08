"use client";
import Image from "next/image";
import { useState } from "react";

interface Testimonial {
  id: string;
  titleLines: [string, string];
  body: string;
  author: string;
  location: string;
  cats: string;
  image: string;
}

interface TestimonialProps {
  sectionTitle: {
    subtitle: string;
    title: string;
  };
  testimonials: Testimonial[];
  avatarImage: {
    src: string;
    alt: string;
  };
  navigation: {
    prevText: string;
    nextText: string;
  };
  readMoreText: string;
}

export default function Testimonial({ 
  sectionTitle, 
  testimonials, 
  avatarImage, 
  navigation, 
  readMoreText 
}: TestimonialProps) {
  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* Left: Testimonial slider */}
          <div className="bg-[#F7EDEE] p-8 md:p-12 overflow-hidden h-full min-h-[380px] md:min-h-[520px]">
            <div
              className="flex transition-transform duration-500 h-full"
              style={{ transform: `translateX(-${index * 100}%)`, width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((t, idx) => (
                <div key={t.id} className="basis-full w-full shrink-0 pr-0 md:pr-8 flex flex-col h-full">
                  <h3 className="font-lora text-lg md:text-[28px] text-[#5A5A5A]">
                    {t.titleLines[0]}
                    <br />
                    {t.titleLines[1]}
                  </h3>
                  <div className="mt-6 text-sm leading-7 text-[#5A5A5A]/80 md:w-[400px] w-[300px] hyphens-auto overflow-auto flex-1 pr-2">
                    {t.body}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-white/60">
                      <Image
                        src={avatarImage.src}
                        alt={avatarImage.alt}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="text-[#5A5A5A] text-sm">
                      <div>{t.author}</div>
                      <div className="text-[#5A5A5A]/70">{t.location}</div>
                      <div className="text-[#5A5A5A]/70">{t.cats}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image slider with titles and controls */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <div className="text-xs tracking-wider text-gray-400">{sectionTitle.subtitle}</div>
              <h2 className="mt-1 font-serif text-[#5A5A5A] text-xl md:text-2xl">{sectionTitle.title}</h2>
            </div>

            {/* Image slider */}
            <div className="w-full relative overflow-hidden h-[520px] md:h-[680px]">
              <div
                className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {testimonials.map((t, idx) => (
                  <div key={t.id} className="min-w-full h-full relative bg-[#F7F7F7] flex-shrink-0">
                    <Image 
                      src={t.image} 
                      alt={t.author} 
                      fill 
                      className="object-cover"
                      priority={idx === 0}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-6 flex w-full justify-between gap-4">
              <button 
                onClick={goPrev} 
                className="px-6 py-2 border border-gray-300 text-[#5A5A5A] text-sm hover:bg-gray-50 transition-colors"
              >
                {navigation.prevText}
              </button>
              <button 
                onClick={goNext} 
                className="px-6 py-2 border border-gray-300 text-[#5A5A5A] text-sm hover:bg-gray-50 transition-colors"
              >
                {navigation.nextText}
              </button>
            </div>

            {/* Dots indicator */}
            <div className="mt-4 flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === index ? 'bg-[#5A5A5A] w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button className="mt-6 text-xs tracking-wide text-[#5A5A5A]/70 hover:text-[#5A5A5A] transition-colors">
              {readMoreText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}