import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  position: "main" | "top-right" | "bottom-right"; // Position in the collage
}

interface GaleriesProps {
  title: string;
  description: {
    mainText: string;
    browsingText: string;
    eyeCandyText: string;
  };
  buttonText: string;
  images: GalleryImage[];
}

export default function Galeries({ title, description, buttonText, images }: GaleriesProps) {
  return (
    <section className="py-20 md:py-24 bg-[#EAF7E7]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-center font-lora text-[#5A5A5A] text-2xl md:text-3xl border-b border-gray-200 pb-4">
          {title}
        </h2>

        <div className="mt-10 md:mt-12 grid md:grid-cols-2 items-start gap-10 ">
          {/* Left card */}
          <div className="bg-white shadow-sm ring-1 ring-gray-200 p-8 md:p-12">
            <p className="text-sm md:text-base leading-7 text-[#5A5A5A]/80 max-w-lg">
              {description.mainText}
            </p>
            <p className="mt-4 text-sm md:text-base leading-7 text-[#5A5A5A]/80 max-w-lg">
              {description.browsingText}
            </p>
            <p className="mt-2 text-sm md:text-base leading-7 text-[#5A5A5A]/80 max-w-lg">
              {description.eyeCandyText}
            </p>
            <div className="mt-8">
              <button className="rounded-md bg-[#E2F4E2] px-10 py-3.5 font-lora text-md cursor-pointer tracking-wide font-medium text-[#5A5A5A] shadow-xl hover:bg-[#D0E8D0] transition-colors">
                {buttonText}
              </button>
            </div>
          </div>

          {/* Right collage */}
          <div className="grid grid-cols-2 gap-6 p-6">
            {images.map((image) => {
              if (image.position === "main") {
                return (
                  <div key={image.id} className="relative col-span-1 row-span-2 aspect-3/4 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                );
              } else if (image.position === "top-right") {
                return (
                  <div key={image.id} className="relative aspect-square overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              } else if (image.position === "bottom-right") {
                return (
                  <div key={image.id} className="relative col-span-1 aspect-4/3 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}