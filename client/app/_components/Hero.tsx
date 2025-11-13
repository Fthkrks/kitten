"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchHeroData } from "@/services/api";

interface HeroData {
  heroImage: {
    src: string;
    alt: string;
  };
  logo: {
    src: string;
    alt: string;
  };
  welcomeText: string;
  title: string;
  motto: string;
  description: string;
  collageImages: {
    image1: { src: string; alt: string };
    image2: { src: string; alt: string };
    image3: { src: string; alt: string };
  };
  aboutSection: {
    greeting: string;
    introduction: string;
    listItems: string[];
    conclusion: string;
    buttonText: string;
  };
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHeroData() {
      try {
        const data = await fetchHeroData();
        setHeroData(data);
      } catch (err) {
        console.error('❌ Client-side: Error loading hero data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback data
        setHeroData({
          heroImage: {
            src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=1200&h=900&fit=crop",
            alt: "Hero Image"
          },
          logo: {
            src: "/images/logo.png",
            alt: "Logo"
          },
          welcomeText: "Welcome to EPC",
          title: "ETHEREAL PERSIANS CATTERY",
          motto: "The only thing we love more than our kittens is seeing the joy they bring to your family.",
          description: "Our goal is to use our knowledge and experience with the Persian breed to pawsitively impact the life of your family.",
          collageImages: {
            image1: { src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=1200&fit=crop", alt: "Collage Image 1" },
            image2: { src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=1200&fit=crop", alt: "Collage Image 2" },
            image3: { src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=1200&fit=crop", alt: "Collage Image 3" }
          },
          aboutSection: {
            greeting: "HEY FRIEND!",
            introduction: "My name is Roxy and I'm glad you've found my online home.",
            listItems: ["Loading content from API..."],
            conclusion: "Please wait while we load the content.",
            buttonText: "MORE ABOUT US"
          }
        });
      } finally {
        setLoading(false);
      }
    }

    loadHeroData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-[#f5eef8]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!heroData) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading content</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const { heroImage, logo, welcomeText, title, motto, description, collageImages, aboutSection } = heroData;
  return (
    <section className="relative bg-[#f5eef8]">
      {/* Top Section - Image */}
      <div className="h-[500px] md:h-[600px] w-full relative">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="object-cover"
          priority
          unoptimized={process.env.NODE_ENV === 'development'}
        />
      </div>

      {/* Bottom Section - Info Card */}
      <div className="relative -mt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* White Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-12 md:p-16">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>
            </div>

            {/* Welcome Text */}
            <p className="text-center text-gray-500 text-sm mb-3 tracking-wider">
              {welcomeText}
            </p>

            {/* Main Title */}
            <h1 className="text-center text-2xl md:text-4xl lg:text-4xl  text-gray-800 mb-6 tracking-wider font-lora">
              {title}
            </h1>

            {/* Motto */}
            <p className="text-center italic text-gray-700 text-md font-normal md:text-xl mb-8">
              {motto}
            </p>

            {/* Description Paragraph */}
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Images Collage and Text Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col justify-center lg:flex-row gap-12 items-center">
            {/* Image Collage - Left Side with Grid */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-4 gap-3">
                {/* Image 1 - Left Column */}
                <div className="col-span-2 relative aspect-2/3">
                  <Image
                    src={collageImages.image1.src}
                    alt={collageImages.image1.alt}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    unoptimized={process.env.NODE_ENV === 'development'}
                  />
                </div>
                
                {/* Image 2 - Right Column */}
                <div className="col-span-2 relative aspect-2/3">
                  <Image
                    src={collageImages.image2.src}
                    alt={collageImages.image2.alt}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    unoptimized={process.env.NODE_ENV === 'development'}
                  />
                </div>
                
                {/* Image 3 - Bottom Full Width */}
                <div className="col-span-4 relative aspect-3/2">
                  <Image
                    src={collageImages.image3.src}
                    alt={collageImages.image3.alt}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    unoptimized={process.env.NODE_ENV === 'development'}
                  />
                </div>
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
                {/* Greeting */}
                <h2 className="text-3xl md:text-2xl font-md text-gray-800 mb-4 font-lora">
                  {aboutSection.greeting}
                </h2>
                
                {/* Introduction */}
                <p className="text-gray-600 leading-relaxed mb-8">
                  {aboutSection.introduction}
                </p>

                {/* Numbered List */}
                <ol className="list-decimal list-inside space-y-4 mb-8 text-gray-600 leading-relaxed">
                  {aboutSection.listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>

                {/* Concluding Paragraph */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {aboutSection.conclusion}
                </p>

                {/* CTA Button */}
                <div className="flex justify-end">
                  <button className="bg-[#E2F4E2] cursor-pointer  duration-300 hover:bg-[#D0E8D0] text-gray-800 px-6 md:px-8 py-2 md:py-3 rounded-xl font-medium text-sm md:text-base transition-colors shadow-md font-lora">
                    {aboutSection.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
