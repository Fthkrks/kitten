import Image from "next/image";

interface VideoOverlay {
  text: string;
  play: boolean;
}

interface VideoItem {
  id: string;
  src: string;
  alt: string;
  href: string;
  labels?: string[];
  overlay?: VideoOverlay;
}

interface VideoGalleryProps {
  backgroundColor?: string;
  items: VideoItem[];
}

export default function VideoGallery({ backgroundColor = '#f5f5f5', items }: VideoGalleryProps) {
  return (
    <div className="w-full py-4" style={{ background: backgroundColor }}>
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
            {/* Overlay */}
            {item.overlay && (
              <>
                {/* Sarı büyük başlık */}
                <div className="absolute bottom-4 left-0 right-0 text-center font-extrabold text-yellow-400 text-xl md:text-3xl drop-shadow-lg tracking-wider select-none">
                  {item.overlay.text}
                </div>
                {/* Play butonu */}
                {item.overlay.play && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.40)" />
                      <polygon points="26,20 50,32 26,44" fill="#fff" />
                    </svg>
                  </div>
                )}
              </>
            )}
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
