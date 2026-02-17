import Image from "next/image";

interface CardProps {
  title: string;
  text: string;
  img: string;
  reverse?: boolean; // true olursa görsel sağda, değilse solda
  bg?: string; // section arka plan rengi
}

export default function Cards({ title, text, img, reverse = false, bg = "#f4fcfd" }: CardProps) {
  return (
    <section className="w-full py-10 px-2" style={{ background: bg }}>
      <div className={`max-w-5xl mx-auto flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}>
        {/* FOTOĞRAF */}
        <div className="w-full md:w-[340px] flex justify-center md:justify-start mb-6 md:mb-0">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={img}
              alt={title}
              width={340}
              height={227}
              quality={95}
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover w-full h-full rounded-lg"
              priority
              style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
        {/* METİN + BAŞLIK */}
        <div className="flex-1 w-full max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-[#2d2d2d] font-normal mb-5 text-center md:text-left">
            {title}
          </h2>
          <div className="text-[#444] text-base  leading-relaxed text-center md:text-left whitespace-pre-line">
            {text}
          </div>
        </div>
      </div>
    </section>
  );
}
