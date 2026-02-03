import Image from "next/image";
import Link from "next/link";
import { TransformedAdultsData } from "@/types/api";

type AdultsProps = TransformedAdultsData;

export default function Adults({ title, cats }: AdultsProps) {
  return (
    <section className="py-20 bg-[#FBF3F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl  text-center text-[#5A5A5A] mb-8 font-lora">
          {title}
        </h2>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-14"></div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {cats.map((cat) => {
            // Determine link based on title
            const link = cat.title.toLowerCase().includes('king') ? '/kings' : '/queens';
            
            return (
              <div key={cat.id} className="text-center">
                <div className="relative w-full aspect-16/10 overflow-hidden">
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="mt-8 text-2xl md:text-[28px] text-[#5A5A5A] font-lora">{cat.title}</h3>
                <div className="mt-4 flex justify-center">
                  <Link href={link}>
                    <button className="bg-[#E2F4E2] cursor-pointer duration-300 hover:bg-[#D0E8D0] text-[#5A5A5A] px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-medium text-sm md:text-base transition-colors shadow-xl font-lora">
                      {cat.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


