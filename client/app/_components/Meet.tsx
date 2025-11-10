"use client";
import Image from "next/image";
import Link from "next/link";

export interface MeetCard {
  id?: string;
  name: string;
  description: string;
  imageSrc: string;
  cardBackgroundColor: string;
  buttonText: string;
  imageOverlayText: string;
  imagePosition: "left" | "right";
  titleColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  descriptionTextColor?: string;
}

interface MeetProps {
  title: string;
  componentBg?: string;
  cards: MeetCard[];
  titleColor?: string;
  pawPrintColor?: string;
}

export default function Meet({
  title,
  componentBg = "#F0F8F8",
  cards,
  titleColor = "#84adac",
  pawPrintColor = "#84adac",
}: MeetProps) {
  // Function to darken a hex color
  const darkenColor = (hex: string, percent: number = 20): string => {
    // Remove # if present
    const cleanHex = hex.replace("#", "");
    
    // Convert to RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    // Darken by reducing each component
    const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));
    
    // Convert back to hex
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  };

  // Paw print SVG icon
  const PawPrintIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="7.5" cy="10.5" rx="1.25" ry="2" />
      <ellipse cx="16.5" cy="10.5" rx="1.25" ry="2" />
      <ellipse cx="12" cy="7.5" rx="2.25" ry="2" />
      <ellipse cx="8.5" cy="14.5" rx="2.5" ry="2" />
      <ellipse cx="15.5" cy="14.5" rx="2.5" ry="2" />
    </svg>
  );

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: componentBg }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-4"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          
          {/* Paw Prints Decoration */}
          <div className="flex justify-center items-center gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ color: pawPrintColor }}>
                <PawPrintIcon />
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-8 md:space-y-12">
          {cards.map((card, index) => {
            const isImageLeft = card.imagePosition === "left";
            const cardBg = card.cardBackgroundColor;
            const titleClr = card.titleColor || cardBg;
            // If buttonBackgroundColor is provided, use it; otherwise darken the card background
            const buttonBg = card.buttonBackgroundColor 
              ? card.buttonBackgroundColor 
              : darkenColor(cardBg, 20);
            const buttonTextClr = card.buttonTextColor || "#3a2b28";
            const descriptionClr = card.descriptionTextColor || "#5A5A5A";

            return (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ backgroundColor: cardBg }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div
                    className={`relative w-full h-[300px] md:h-[400px] ${
                      isImageLeft ? "order-2 md:order-1" : "order-2 md:order-2"
                    }`}
                  >
                    <div className="relative w-full h-full p-6 md:p-8">
                      <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-gray-300">
                        <Image
                          src={card.imageSrc}
                          alt={card.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        
                        {/* Image Overlay Text */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className="text-xs md:text-sm font-semibold tracking-wide"
                            style={{ color: descriptionClr }}
                          >
                            {card.imageOverlayText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Content Section */}
                  <div
                    className={`flex flex-col justify-center p-6 md:p-8 md:px-12 ${
                      isImageLeft ? "order-1 md:order-2" : "order-1 md:order-1"
                    }`}
                  >
                    {/* Title */}
                    <h3
                      className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4 md:mb-6"
                      style={{ color: titleClr }}
                    >
                      {card.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm md:text-base leading-relaxed mb-6 md:mb-8"
                      style={{ color: descriptionClr }}
                    >
                      {card.description}
                    </p>

                    {/* Button */}
                    {card.id ? (
                      <Link
                        href={`/pet/${card.id}`}
                        className="self-start px-6 cursor-pointer md:px-8 py-3 md:py-4 rounded-lg font-bold uppercase tracking-wide  shadow-2xl hover:shadow-lg transition-shadow inline-block text-center"
                          style={{
                            backgroundColor: buttonBg,
                            color: buttonTextClr,
                          }}
                      >
                        {card.buttonText}
                      </Link>
                    ) : (
                      <button
                        className="self-start px-6 cursor-pointer md:px-8 py-3 md:py-4 rounded-lg  font-bold uppercase tracking-wide shadow-2xl  transition-shadow"
                        style={{
                          backgroundColor: buttonBg,
                          color: buttonTextClr,
                        }}
                      >
                        {card.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

