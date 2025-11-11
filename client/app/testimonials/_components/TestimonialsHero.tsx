import React from 'react'

interface TestimonialsHeroProps {
  title: string;
  mapUrl: string;
  mapTitle: string;
  heading: string;
  description: string;
  closingText: string;
}

export default function TestimonialsHero({
  title,
  mapUrl,
  mapTitle,
  heading,
  description,
  closingText
}: TestimonialsHeroProps) {
  return (
    <section className="py-16 md:py-24 bg-[#F0F8F8]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora text-[#3a2b28] mb-3">
            {title}
          </h2>
          <div className="mx-auto h-px w-32 bg-gray-300" />
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Google Maps */}
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={mapTitle}
              className="w-full h-full"
            />
          </div>

          {/* Right Column - Text Content */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-3xl md:text-4xl font-lora text-[#3a2b28] leading-tight">
              {heading}
            </h3>
            
            <p className="text-base md:text-lg text-[#5A5A5A] leading-relaxed">
              {description}
            </p>

            <p className="text-lg md:text-xl font-semibold text-[#3a2b28] leading-relaxed">
              {closingText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

