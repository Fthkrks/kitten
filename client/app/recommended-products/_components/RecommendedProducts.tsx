"use client";
import Image from "next/image";

// Types describing the data model to keep this component reusable and single-source
export type ProductCTA = {
  label: string;
  href: string;
};

export type ProductCard = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  bullets?: string[];
  cta?: ProductCTA;
};

export type Category = {
  title: string;
  products: ProductCard[];
};

export type Section = {
  // Example: "HYDRATION", "GROOMING"
  heading: string;
  categories: Category[];
};

export type RecommendedProductsProps = {
  sections?: Section[];
  // Layout/theme controls
  cardsPerRow?: 1 | 2 | 3; // default 2 as in the reference screenshot
  cardBg?: string; // default white
  accentDividerColor?: string; // small divider color below headings
};

export default function RecommendedProducts({
  sections,
  cardsPerRow = 2,
  cardBg = "#ffffff",
  accentDividerColor = "#E5E7EB", // gray-200
}: RecommendedProductsProps) {
  // Provide a minimal default so the component is drop-in without props
  const fallbackSections: Section[] = [
    {
      heading: "HYDRATION",
      categories: [
        {
          title: "Drinking Fountains",
          products: [
            {
              imageSrc:
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
              imageAlt: "Ceramic fountain on stand",
              title: "Drinkwell Seascape Ceramic",
              bullets: [
                "Dishwasher-safe ceramic with dual waterfall",
                "Charcoal + foam filters improve taste",
              ],
              cta: { label: "SHOP NOW", href: "#" },
            },
            {
              imageSrc:
                "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&h=600&fit=crop",
              imageAlt: "Pagoda fountain",
              title: "Drinkwell Pagoda",
              bullets: [
                "Dual free-falling streams encourage drinking",
                "Easy to clean glazed ceramic",
              ],
              cta: { label: "SHOP NOW", href: "#" },
            },
          ],
        },
      ],
    },
  ];

  const data = sections?.length ? sections : fallbackSections;

  const gridCols = cardsPerRow === 3 ? "lg:grid-cols-3" : cardsPerRow === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2";

  return (
    <section className="w-full py-10 md:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {data.map((section, sectionIdx) => (
          <div key={sectionIdx} className={sectionIdx === 0 ? "" : "mt-14 md:mt-20"}>
            {/* Section heading */}
            <div className="text-center">
              <h2 className="font-lora text-[#5A5A5A] text-xl md:text-2xl tracking-wide">
                {section.heading}
              </h2>
              <div
                className="mx-auto mt-2 h-px w-28"
                style={{ background: accentDividerColor }}
              />
            </div>

            {/* Categories within a section */}
            {section.categories.map((category, catIdx) => (
              <div key={catIdx} className={catIdx === 0 ? "mt-8" : "mt-12"}>
                <h3 className="text-center font-lora text-[#5A5A5A] text-lg md:text-xl mb-6">
                  {category.title}
                </h3>

                <div className={`grid grid-cols-1 ${gridCols} gap-6 md:gap-8`}>
                  {category.products.map((product, idx) => (
                    <article
                      key={idx}
                      className="rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden flex flex-col bg-white"
                      style={{ background: cardBg }}
                    >
                      <div className="relative w-full h-[200px] md:h-[220px]">
                        <Image
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <h4 className="text-[#5A5A5A] font-semibold text-sm md:text-base">{product.title}</h4>

                        {product.bullets && product.bullets.length > 0 && (
                          <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-gray-600 list-disc pl-5">
                            {product.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}

                        {product.cta && (
                          <div className="mt-5">
                            <a
                              className="inline-block text-[11px] md:text-xs tracking-wide rounded-md px-4 py-2 border border-gray-300 text-[#5A5A5A] hover:bg-gray-50 transition-colors"
                              href={product.cta.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {product.cta.label}
                            </a>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}


