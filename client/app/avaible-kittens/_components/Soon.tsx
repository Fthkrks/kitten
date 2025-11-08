export default function Soon() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Main Title */}
        <div className="text-center mb-6">
          <h1 className="font-lora text-3xl md:text-4xl font-semibold text-[#5A5A5A] uppercase tracking-wide mb-4">
            AVAILABLE SOON
          </h1>
          {/* Divider */}
          <div className="mx-auto h-px w-24 bg-gray-300" />
        </div>

        {/* Descriptive Paragraph */}
        <div className="text-center mb-8">
          <p className="text-base md:text-lg text-[#5A5A5A] leading-relaxed max-w-2xl mx-auto">
            The kittens below are not quite ready to go to their furrever home, but you can certainly reserve one. Just ask for them by name when you fill-out the kitten application.
          </p>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center">
          <button className="px-8 md:px-12 py-3 md:py-4 bg-[#f9f1f1] text-[#3a2b28] font-lora  text-sm md:text-md uppercase tracking-wide rounded-3xl shadow-lg hover:bg-[#f5e8e8] transition-colors cursor-pointer">
            SUBMIT A KITTEN APPLICATION
          </button>
        </div>
      </div>
    </section>
  );
}

