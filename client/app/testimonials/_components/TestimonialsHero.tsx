import React from 'react'

export default function TestimonialsHero() {
  return (
    <section className="py-16 md:py-24 bg-[#F0F8F8]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora text-[#3a2b28] mb-3">
            TESTIMONIALS
          </h2>
          <div className="mx-auto h-px w-32 bg-gray-300" />
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Google Maps */}
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1YOUR_MAP_ID"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ethereal Persian Homes Map"
              className="w-full h-full"
            />
          </div>

          {/* Right Column - Text Content */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-3xl md:text-4xl font-lora text-[#3a2b28] leading-tight">
              Our Customers Love Us... You Will Too!
            </h3>
            
            <p className="text-base md:text-lg text-[#5A5A5A] leading-relaxed">
              We're not just selling kittens, we're gaining new family members! Our hearts are filled with grateful meows for our kitten parents. They not only complete the life of our kittens, but they also become a part of our Ethereal family. We hope that if you're in the market for a new furry friend that you take a chance on us and are fortunate enough to experience the wonderful joy of an Ethereal Persian kitten.
            </p>

            <p className="text-lg md:text-xl font-semibold text-[#3a2b28] leading-relaxed">
              You don't have to take our word for it, read below what our EP families have to say!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

