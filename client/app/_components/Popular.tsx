import Image from "next/image";

interface PopularItem {
  id: string;
  src: string;
  alt: string;
}

interface PopularProps {
  title: string;
  items: PopularItem[];
  decorativeSquares?: number; // Optional number of decorative squares, defaults to 20
}

export default function Popular({ title, items, decorativeSquares = 20 }: PopularProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center font-lora text-[#5A5A5A] text-2xl md:text-3xl mb-10 md:mb-14 border-b border-gray-200 pb-4">
          {title}
        </h2>

        {/* 3 x 2 photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="relative w-full aspect-square overflow-hidden bg-[#F7F7F7]">
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Decorative squares */}
        <div className="mt-12 flex justify-center gap-2">
          {[...Array(decorativeSquares)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-200" />
          ))}
        </div>
      </div>
    </section>
  );
}

