import Image from "next/image";

interface AboutItem {
  text: string;
}

interface WhyBlogProps {
  imageTop: string;
  imageTopAlt: string;
  aboutTitle: string;
  aboutItems: AboutItem[];
  whyBlogTitle: string;
  whyBlogText: string;
  whyBlogBg: string;
  imageBottom: string;
  imageBottomAlt: string;
  topBandColor?: string;
}

export default function WhyBlog({
  imageTop,
  imageTopAlt,
  aboutTitle,
  aboutItems,
  whyBlogTitle,
  whyBlogText,
  whyBlogBg,
  imageBottom,
  imageBottomAlt,
  topBandColor = "#d8ebf0",
}: WhyBlogProps) {
  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Light blue band at top left */}
      <div 
        className="absolute top-0 left-0 w-full h-40 z-0"
        style={{ backgroundColor: topBandColor }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-20 pb-12">
        {/* Main Content: Image + Why I Blog Section */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          {/* Left: Woman with Cat Image */}
          <div className="w-full md:w-[450px] shrink-0">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-xl bg-[#fce4ec]">
              <Image
                src={imageTop}
                alt={imageTopAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* About Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-5">{aboutTitle}</h3>
              <ul className="space-y-3">
                {aboutItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Why I Blog Section */}
          <div className="flex-1 flex items-start">
            <div 
              className="rounded-lg p-10 md:p-12 w-full"
              style={{ backgroundColor: whyBlogBg }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{whyBlogTitle}</h2>
              <p className="text-white text-base md:text-lg leading-relaxed">
                {whyBlogText}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Three Cats Image */}
        <div className="relative w-full h-[350px] md:h-[450px] mt-12 rounded-lg overflow-hidden">
          <Image
            src={imageBottom}
            alt={imageBottomAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
