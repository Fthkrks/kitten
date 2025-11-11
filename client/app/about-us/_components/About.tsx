import Image from "next/image";

interface AboutProps {
  image: string;
  imageAlt: string;
  title: string;
  paragraph1: string;
  highlightText: string;
  paragraph2: string;
}

export default function About({
  image,
  imageAlt,
  title,
  paragraph1,
  highlightText,
  paragraph2
}: AboutProps) {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-8 md:py-14 px-4 mt-10">
      {/* Fotoğraf sol */}
      <div className="w-full md:w-[320px] flex-shrink-0 flex items-center justify-center mb-6 md:mb-0">
        <div className="h-[270px] w-[200px] md:w-[246px] md:h-[320px] rounded-md overflow-hidden shadow-xl">
          <Image
            src={image}
            alt={imageAlt}
            width={246}
            height={320}
            className="w-full h-full object-cover rounded-md"
            priority
          />
        </div>
      </div>

      {/* Metin sağ */}
      <div className="flex-1 max-w-3xl md:pl-12">
        <h2 className="text-2xl md:text-3xl font-lora text-[#444] mb-3 font-medium">{title}</h2>
        <p className="mb-3 text-base md:text-lg leading-relaxed text-[#5d5d5d]">
          {paragraph1}<br /><br />
          <span className="font-semibold text-[#47383e]">{highlightText}</span>
        </p>
        <p className="text-base md:text-lg leading-relaxed text-[#5d5d5d]">
          {paragraph2}
        </p>
      </div>
    </section>
  );
}
