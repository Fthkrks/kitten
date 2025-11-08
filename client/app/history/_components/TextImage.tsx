"use client";
import Image from "next/image";

type TextImageProps = {
  leftImage?: {
    src: string;
    alt: string;
    title: string;
    caption?: string;
  };
  rightImage?: {
    src: string;
    alt: string;
    title: string;
    caption?: string;
  };
  paragraphs?: string[];
  showPhylogeneticTree?: boolean;
};

export default function TextImage({
  leftImage,
  rightImage,
  paragraphs = [],
  showPhylogeneticTree = true,
}: TextImageProps) {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section: Two Side-by-Side Cat Images */}
        {(leftImage || rightImage) && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {leftImage && (
              <div className="flex flex-col">
                <div className="relative w-full h-[400px] md:h-[500px] mb-3">
                  <Image
                    src={leftImage.src}
                    alt={leftImage.alt}
                    fill
                    className="object-cover rounded-lg border border-gray-200"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  {leftImage.title}
                </p>
                {leftImage.caption && (
                  <p className="text-xs text-gray-600 italic">{leftImage.caption}</p>
                )}
              </div>
            )}

            {rightImage && (
              <div className="flex flex-col">
                <div className="relative w-full h-[400px] md:h-[500px] mb-3">
                  <Image
                    src={rightImage.src}
                    alt={rightImage.alt}
                    fill
                    className="object-cover rounded-lg border border-gray-200"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  {rightImage.title}
                </p>
                {rightImage.caption && (
                  <p className="text-xs text-gray-600 italic">{rightImage.caption}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Middle Section: Explanatory Text Paragraphs */}
        {paragraphs.length > 0 && (
          <div className="mb-12 md:mb-16 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 text-base md:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

