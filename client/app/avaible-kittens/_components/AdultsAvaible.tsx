import React from "react";

function AdultsAvaible() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Main Title */}
        <div className="text-center mb-6">
          <h1 className="font-lora text-3xl md:text-4xl font-semibold text-[#5A5A5A] uppercase tracking-wide mb-4">
            RETIRING ADULTS
          </h1>
          {/* Divider */}
          <div className="mx-auto h-px w-24 bg-gray-300" />
        </div>

        {/* Descriptive Paragraph */}
        <div className="text-center mb-8">
          <p className="text-base md:text-lg text-[#5A5A5A] leading-relaxed max-w-2xl mx-auto">
            The cats in this section are near and dear to our hearts. They are
            adults that have served a huge part in our cattery and occasionally
            some younger cats that we considered keeping to breed but for
            whatever reason, decided to place as beloved pets. Some may be
            discounted due to age. Nevertheless, these are our top kitties – the
            ones we consider most aesthetically pleasing and with great
            temperament.
          </p>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center">
          <button className="px-8 md:px-12 py-3 md:py-4 bg-[#f9f1f1] text-[#3a2b28] font-lora  text-sm md:text-md uppercase tracking-wide rounded-3xl shadow-lg hover:bg-[#f5e8e8] transition-colors cursor-pointer">
            SUBMIT A APPLICATION
          </button>
        </div>
      </div>
    </section>
  );
}

export default AdultsAvaible;
