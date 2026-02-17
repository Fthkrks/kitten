import Image from "next/image";
import { TransformedSpecialData } from "@/types/api";

type SpecialProps = TransformedSpecialData;

export default function Special({ title, features }: SpecialProps) {
  return (
    <section className="py-20 md:py-24 bg-[#EAF7E7] rounded-br-[170px]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-lora text-[#5A5A5A]">{title}</h2>
          <div className="mx-auto mt-3 h-px w-28 bg-[#C7DFC7]" />
        </div>

        {/* Dynamic Features */}
        {features.map((feature, index) => (
          <div key={feature.id} className={`${index === 0 ? 'mt-12 md:mt-16' : 'mt-10 md:mt-14'} grid md:grid-cols-2 gap-0 items-stretch md:min-h-[260px]`}>
            {feature.imagePosition === "left" ? (
              <>
                {/* Image */}
                <div className="relative w-full h-full min-h-[260px] overflow-hidden order-1 md:order-0">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </div>
                {/* Text card */}
                <div className="bg-white shadow-sm ring-1 ring-gray-200 p-8 md:p-10 h-full flex flex-col justify-center">
                  <div className="text-center">
                    <div className="text-[#C7DFC7] font-lora text-5xl font-bold">{feature.number}</div>
                    <h3 className="mt-2 font-lora text-xl text-[#5A5A5A] tracking-wide">{feature.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#5A5A5A]/80">
                      {feature.description}
                    </p>
                    <div className="mt-6">
                      <button className="rounded-md cursor-pointer duration-300 font-lora bg-[#E2F4E2] px-10 py-3.5 text-md tracking-wide text-[#5A5A5A] shadow-2xl hover:bg-[#D0E8D0] transition-colors">
                        {feature.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Text card */}
                <div className="bg-white shadow-sm ring-1 ring-gray-200 p-8 md:p-10 h-full flex flex-col justify-center">
                  <div className="text-center">
                    <div className="text-[#C7DFC7] font-lora text-5xl font-bold">{feature.number}</div>
                    <h3 className="mt-2 font-lora text-xl text-[#5A5A5A] tracking-wide">{feature.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#5A5A5A]/80">
                      {feature.description}
                    </p>
                    <div className="mt-6">
                      <button className="rounded-md cursor-pointer duration-300 font-lora bg-[#E2F4E2] px-10 py-3.5 text-md tracking-wide text-[#5A5A5A] shadow-2xl hover:bg-[#D0E8D0] transition-colors">
                        {feature.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Image */}
                <div className="relative w-full h-full min-h-[260px] overflow-hidden">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
