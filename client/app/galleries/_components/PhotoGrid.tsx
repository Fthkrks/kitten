"use client";
import Image from "next/image";
import Link from "next/link";
import { galleryData } from "../../../data/galleryData";

export default function PhotoGrid() {
  const galleryItems = galleryData;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Mobile: Simple 2-column grid */}
        <div className="grid grid-cols-3 md:hidden" style={{ rowGap: 0, columnGap: 0 }}>
          {galleryItems.slice(0, 12).map((item) => (
            <Link
              key={item.id}
              href={`/galleries/${item.id}`}
              className="relative group cursor-pointer overflow-hidden border-2 border-black aspect-square"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 z-10">
                  <div className="text-white font-lora text-xs font-semibold tracking-wider uppercase drop-shadow-lg">
                    {item.label}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: Complex grid layout */}
        <div
          className="hidden md:grid grid-cols-3 md:gap-6 "
          style={{
            gridAutoRows: "auto",
            rowGap: 0,
            columnGap: 0,
          }}
        >
          {galleryItems.map((item) => {
            const isMainPanel = item.label === "TOO CUTE";

            return (
              <Link
                key={item.id}
                href={`/galleries/${item.id}`}
                className="relative cursor-pointer group overflow-hidden border-2 rounded-xl border-black transition-all duration-300 aspect-square"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Logo overlay for main panel */}
                  {isMainPanel && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="text-white text-xs md:text-sm font-semibold tracking-wider drop-shadow-lg">
                        ETHEREAL Persians YOSHI
                      </div>
                    </div>
                  )}

                  {/* Label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 md:p-4 z-10">
                    <div className="text-white font-lora text-sm md:text-base lg:text-lg font-semibold tracking-wider uppercase drop-shadow-lg">
                      {item.label}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
