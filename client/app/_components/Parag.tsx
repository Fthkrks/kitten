import Image from "next/image";

interface ParagProps {
  image: string;
  imageAlt: string;
  title: string;
  paragraphs: string[];
  listTitle: string;
  listItems: string[];
}

export default function Parag({
  image,
  imageAlt,
  title,
  paragraphs,
  listTitle,
  listItems
}: ParagProps) {
  return (
    <section className="w-full bg-[#fbf7f3] py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-[1500px] flex flex-col md:flex-row items-start justify-start md:justify-center gap-12 md:gap-16">
        {/* Sağ üstte görsel */}
        <div className="order-1 md:order-2 flex-shrink-0 w-full md:w-[340px] flex justify-center md:justify-end mb-6 md:mb-0">
          <div className="relative w-[320px] h-[220px] md:w-[320px] md:h-[210px] rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover w-full h-full rounded-lg"
              priority
            />
          </div>
        </div>
        {/* Yazılar yalnızca geniş ve net; kutusuz */}
        <div className="order-2 md:order-1 flex-1 max-w-3xl">
          <h1 className="font-serif text-[#49332b] text-3xl md:text-4xl mb-7 text-center md:text-left font-normal">
            {title}
          </h1>
          <div className="space-y-4 text-[#38312d] text-sm  text-left leading-relaxed">
            {paragraphs.slice(0, 3).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            
            <div className="font-bold mt-5 mb-2">{listTitle}</div>
            <ul className="ml-8 mb-2 list-disc text-[#6a6258] text-sm">
              {listItems.map((item, index) => (
                <li key={index}>
                  {index === 0 ? <span className="italic">{item}</span> : item}
                </li>
              ))}
            </ul>
            
            {paragraphs.slice(3).map((paragraph, index) => (
              <p key={index + 3}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
