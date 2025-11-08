"use client";
import Image from "next/image";
import Link from "next/link";
import type { PetDetail } from "../../data/petData";

interface PetDetailProps {
  pet: PetDetail;
}

export default function PetDetail({ pet }: PetDetailProps) {
  const detailItems = [
    { 
      icon: "calendar",
      label: "D.O.B", 
      value: pet.dob,
      iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    { 
      icon: "comb",
      label: "Coat Type", 
      value: pet.coatType,
      iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    },
    { 
      icon: "face",
      label: "Face Type", 
      value: pet.faceType,
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    { 
      icon: "scale",
      label: "Weight", 
      value: pet.weight,
      iconPath: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    },
    { 
      icon: "cat",
      label: "Coat Color", 
      value: pet.coatColor,
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    { 
      icon: "eye",
      label: "Eye Color", 
      value: pet.eyeColor,
      iconPath: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    },
    { 
      icon: "sun",
      label: "Shading", 
      value: pet.shading,
      iconPath: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    },
    { 
      icon: "paw",
      label: "Breed", 
      value: pet.breed,
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
  ];

  const detailBg = pet.detailBg || "#E0F2F7";

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: detailBg }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Top Section - Main Image and Details */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Main Pet Image */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={pet.image}
              alt={pet.name}
              fill
              className="object-cover"
              priority
            />
            {/* EP Logo */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-white/80 text-xs md:text-sm font-semibold tracking-wider">
                EP ETHEREAL SKY
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-lora text-center text-[#3a2b28] mb-8 uppercase">
              DETAILS
            </h2>
            
            <div className="grid grid-cols-2 gap-6">
              {detailItems.map((item, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <svg 
                      className="w-6 h-6 text-[#7DD3FC]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d={item.iconPath}
                      />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-base md:text-lg text-gray-900 font-medium ml-8">
                    {item.value || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Album Section */}
        {pet.albumImages && pet.albumImages.length > 0 && (
          <div className="mt-16">
            {/* Album Title */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center gap-4 w-full max-w-md">
                <div className="flex-1 h-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-2xl md:text-3xl font-lora text-[#3a2b28] uppercase">
                    ALBUM
                  </h3>
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {pet.albumImages.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                >
                  <Image
                    src={img}
                    alt={`${pet.name} - Photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  {/* EP Logo on some images */}
                  {index % 3 === 0 && (
                    <div className="absolute bottom-2 left-2 z-10">
                      <div className="text-white/80 text-xs font-semibold tracking-wider">
                        EP ETHEREAL SKY
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            href="/avaible-kittens"
            className="inline-flex items-center gap-2 text-[#b1868e] hover:text-[#a67d8f] font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Available Kittens
          </Link>
        </div>
      </div>
    </div>
  );
}

