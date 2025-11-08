"use client";
import Image from "next/image";
import Link from "next/link";

export interface Pet {
  id: string;
  image: string;
  name: string;
  age: string;
  gender: string;
  reserved?: boolean;
}

interface PetCardsProps {
  // Data
  pets: Pet[];
  
  // Section Settings
  backgroundColor?: string;
  sectionPadding?: string; // e.g. "py-8 md:py-12" or custom style
  maxWidth?: string; // e.g. "max-w-7xl"
  containerPadding?: string; // e.g. "px-4 md:px-6"
  
  // Grid Settings
  mobileCols?: number; // Mobil sütun sayısı (default: 2)
  desktopCols?: number; // Desktop sütun sayısı (default: 4)
  gap?: number; // Grid gap (default: 0)
  
  // Card Settings
  cardBorderColor?: string; // Border rengi (default: "black")
  cardBorderWidth?: string; // Border kalınlığı (default: "1px")
  cardBackgroundColor?: string; // Kart alt kısmı arka plan (default: "white")
  
  // Image Settings
  imageAspectRatio?: string; // e.g. "square", "4/3", "16/9" (default: "square")
  
  // Badge Settings
  badgeBackgroundColor?: string; // Reserved badge arka plan (default: "#b1868e")
  badgeTextColor?: string; // Reserved badge metin (default: "white")
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; // Badge pozisyonu
  
  // Overlay Settings
  overlayGradient?: string; // Overlay gradient (default: "from-black/70 via-black/50 to-transparent")
  overlayPadding?: string; // Overlay padding (default: "p-3")
  
  // Icon Settings
  showHearts?: boolean; // Kalpler gözüksün mü? (default: true)
  heartColor?: string; // Kalp rengi (default: "red-400")
  eyeColor?: string; // Göz ikonu rengi (default: "gray-600")
  iconSize?: string; // İkon boyutu (default: "w-5 h-5")
  
  // Bottom Section Settings
  bottomSectionPadding?: string; // Alt kısım padding (default: "p-3")
  bottomBorderColor?: string; // Alt border rengi (default: "black")
}

export default function PetCards({ 
  pets,
  backgroundColor = "white",
  sectionPadding = "py-8 md:py-12",
  maxWidth = "max-w-7xl",
  containerPadding = "px-4 md:px-6",
  mobileCols = 2,
  desktopCols = 4,
  gap = 0,
  cardBorderColor = "black",
  cardBorderWidth = "1px",
  cardBackgroundColor = "white",
  imageAspectRatio = "square",
  badgeBackgroundColor = "#b1868e",
  badgeTextColor = "white",
  badgePosition = "top-right",
  overlayGradient = "from-black/70 via-black/50 to-transparent",
  overlayPadding = "p-3",
  showHearts = true,
  heartColor = "red-400",
  eyeColor = "gray-600",
  iconSize = "w-5 h-5",
  bottomSectionPadding = "p-3",
  bottomBorderColor = "black",
}: PetCardsProps) {
  
  // Parse gender text to highlight price
  const renderGenderWithPrice = (genderText: string) => {
    if (!genderText || !genderText.includes("$")) {
      return <span>{genderText}</span>;
    }
    
    // Find the price part (starts with $)
    const parts = genderText.split("|");
    const lastPart = parts[parts.length - 1].trim();
    
    if (lastPart.startsWith("$")) {
      const pricePart = lastPart;
      const beforePrice = parts.slice(0, -1).join("|").trim();
      
      return (
        <>
          {beforePrice && <span>{beforePrice} | </span>}
          <span className="bg-green-500 text-white px-1 rounded">{pricePart}</span>
        </>
      );
    }
    
    return <span>{genderText}</span>;
  };
  
  // Aspect ratio mapping
  const aspectRatioClass = imageAspectRatio === "square" 
    ? "aspect-square" 
    : imageAspectRatio === "4/3"
    ? "aspect-[4/3]"
    : imageAspectRatio === "16/9"
    ? "aspect-video"
    : "aspect-square";
  
  // Badge position mapping
  const badgePositionClass = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  }[badgePosition];

  // Grid columns mapping for Tailwind
  const mobileColsClass: { [key: number]: string } = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };
  
  const desktopColsClass: { [key: number]: string } = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
  };

  return (
    <section 
      className={`w-full ${sectionPadding}`} 
      style={{ backgroundColor }}
    >
      <div className={`${maxWidth} mx-auto ${containerPadding}`}>
        {/* Grid Container */}
        <div 
          className={`grid ${mobileColsClass[mobileCols] || "grid-cols-2"} ${desktopColsClass[desktopCols] || "md:grid-cols-4"}`}
          style={{ 
            gap: `${gap}px`,
            rowGap: `${gap}px`,
            columnGap: `${gap}px`
          }}
        >
          {pets.map((pet) => (
            <Link
              key={pet.id}
              href={`/pet/${pet.id}`}
              className="relative overflow-hidden cursor-pointer block"
              style={{
                borderColor: cardBorderColor,
                borderWidth: cardBorderWidth,
              }}
            >
              {/* Pet Image */}
              <div className={`relative w-full ${aspectRatioClass}`}>
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  className="object-cover"
                  sizes={`(max-width: 768px) ${100/mobileCols}vw, ${100/desktopCols}vw`}
                />

                {/* Reserved Badge */}
                {pet.reserved && (
                  <div 
                    className={`absolute ${badgePositionClass} px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide z-10`}
                    style={{
                      backgroundColor: badgeBackgroundColor,
                      color: badgeTextColor,
                    }}
                  >
                    RESERVED
                  </div>
                )}
 
              </div>

              {/* Bottom Section with Name, Gender and Icons */}
              <div 
                className={`${bottomSectionPadding} flex flex-col`}
                style={{
                  backgroundColor: cardBackgroundColor,
                  borderTopColor: bottomBorderColor,
                  borderTopWidth: cardBorderWidth,
                }}
              >
                {/* Name */}
                <div className="font-lora font-semibold text-sm md:text-base text-[#3a2b28] mb-2">
                  {pet.name}
                </div>

                {/* Gender and Icons Row */}
                <div className="flex justify-between items-center">
                  {/* Gender */}
                  <div className="text-sm md:text-base font-lora font-semibold text-[#3a2b28]">
                    {renderGenderWithPrice(pet.gender)}
                  </div>

                {/* Hearts and Eye Icons */}
                {showHearts && (
                  <div className="flex items-center gap-2">
                    {/* Hearts */}
                    <div className="flex gap-1">
                      <svg
                        className={`${iconSize} ${heartColor.includes('#') ? '' : `text-${heartColor}`}`}
                        style={heartColor.includes('#') ? { color: heartColor } : undefined}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className={`${iconSize} ${heartColor.includes('#') ? '' : `text-${heartColor}`}`}
                        style={heartColor.includes('#') ? { color: heartColor } : undefined}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Eye Icon */}
                    <svg
                      className={`${iconSize} ${eyeColor.includes('#') ? '' : `text-${eyeColor}`}`}
                      style={eyeColor.includes('#') ? { color: eyeColor } : undefined}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

