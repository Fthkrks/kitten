import Image from "next/image";
import { TransformedVideoData } from "@/types/api";

type VideoGalleryProps = TransformedVideoData;

export default function VideoGallery({ items }: VideoGalleryProps) {
  // Safety check
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-4" style={{ background: '#f5f5f5' }}>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full aspect-square"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 25vw, 12vw"
              className="object-cover w-full h-full"
            />
            {/* Küçük çoklu label örneği */}
            {item.labels && item.labels.length > 0 && (
              <div className="absolute inset-0 flex flex-col items-start justify-between p-2 pointer-events-none">
                {item.labels.map((label) => (
                  <span
                    key={label}
                    className="bg-white bg-opacity-80 text-xs text-gray-700 rounded px-2 py-1 mb-1 font-semibold shadow"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
