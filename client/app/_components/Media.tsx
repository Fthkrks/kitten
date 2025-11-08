import Image from "next/image";

interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
}

interface MediaProps {
  title: string;
  socialLinks: SocialLink[];
}

export default function Media({ title, socialLinks }: MediaProps) {
  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-lora text-[#5A5A5A] text-2xl md:text-3xl">{title}</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gray-300" />
        </div>

        {/* Social Icons */}
        <div className="mt-12 flex flex-wrap justify-between gap-8 md:gap-12">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="flex flex-col items-center group hover:opacity-80 transition-opacity"
            >
              {/* Icon */}
              <div className="rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Text with arrow */}
              <div className="mt-4 flex items-center gap-2">
                <span className="font-lora text-[#808080] text-sm md:text-base">{link.name}</span>
                <span className="text-[#5A5A5A] text-sm">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

