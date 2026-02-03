import Image from "next/image";
import Link from "next/link";
import { TransformedKittenData } from "@/types/api";

type KittenProps = TransformedKittenData;

export default function Kitten({ title, kittens, buttonText }: KittenProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-md text-center text-[#5A5A5A] mb-8 font-lora">
          {title}
        </h2>
        
        {/* Border */}
        <div className="border-t border-gray-300 mb-16"></div>

        {/* Desktop: Grid layout, items touch with no spacing */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative mb-12">
          {kittens.map((kitten, index) => (
            <div 
              key={kitten.id} 
              className={`col-span-1 ${index % 2 === 1 ? 'mt-20' : ''}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={kitten.image.src}
                  alt={kitten.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#5A5A5A] text-center">{kitten.name}</h3>
            </div>
          ))}
        </div>

        {/* Mobile: Grid layout for small screens, items touch with no spacing */}
        <div className="md:hidden grid grid-cols-2 gap-0 mb-8">
          {kittens.map((kitten) => (
            <div key={kitten.id} className="text-center">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={kitten.image.src}
                  alt={kitten.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-[#5A5A5A]">
                {kitten.mobileTitle || kitten.name}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center md:justify-end">
          <Link href="/avaible-kittens">
            <button className="bg-[#E2F4E2] cursor-pointer duration-300 hover:bg-[#D0E8D0] text-[#5A5A5A] px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium text-base md:text-lg transition-colors shadow-xl font-lora">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

