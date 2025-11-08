import Image from "next/image";

export default function WhyBlog() {
  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Light blue band at top left */}
      <div className="absolute top-0 left-0 w-full h-40 bg-[#d8ebf0] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-20 pb-12">
        {/* Main Content: Image + Why I Blog Section */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          {/* Left: Woman with Cat Image */}
          <div className="w-full md:w-[450px] shrink-0">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-xl bg-[#fce4ec]">
              <Image
                src="https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?auto=format&fit=crop&q=80&w=800"
                alt="Roxy with cat"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* About Roxy Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-5">About Roxy</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800">Mother, wife, and prior vet tech</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800">Cattery owner since 2015</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800">Practices holistic medicine</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800">Crazy cat lady!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Why I Blog Section */}
          <div className="flex-1 flex items-start">
            <div className="bg-[#d48888] rounded-lg p-10 md:p-12 w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why I Blog?</h2>
              <p className="text-white text-base md:text-lg leading-relaxed">
                When I was a newbie breeder, I struggled to make the right decisions. I did not have a mentor and learned many lessons the hard way. I blog to help other breeders and pet parents overcome challenges without the need to make as many mistakes. Hopefully, this enables your kitty to live their best life.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Three Cats Image */}
        <div className="relative w-full h-[350px] md:h-[450px] mt-12 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1600"
            alt="Three Persian cats"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
