import Image from "next/image";

interface CommitmentFeature {
  id: string;
  title: string;
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface CommentsProps {
  title: string;
  description: string;
  features: CommitmentFeature[];
}

export default function Comments({ title, description, features }: CommentsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-lora text-[#5A5A5A]">{title}</h2>
          <div className="mx-auto mt-3 h-px w-28 bg-gray-300" />
        </div>

        {/* Description */}
        <p className="mt-6 text-center text-sm md:text-base leading-7 text-[#5A5A5A]/80 max-w-3xl mx-auto">
          {description}
        </p>

        {/* Features */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              <div className="relative h-28 w-28 rounded-full bg-[#FFF2EE] ring-1 ring-gray-200 flex items-center justify-center">
                <Image
                  src={feature.icon.src}
                  alt={feature.icon.alt}
                  width={feature.icon.width}
                  height={feature.icon.height}
                  className="opacity-90"
                />
              </div>
              <h3 className="mt-6 text-lg font-lora text-[#5A5A5A]" dangerouslySetInnerHTML={{ __html: feature.title }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
