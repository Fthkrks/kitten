"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "../../../data/galleryData";

interface GalleriesDetailProps {
  item: GalleryItem;
  relatedItems?: GalleryItem[];
}

interface GalleryImage {
  src: string;
  alt: string;
  filter?: string;
}

export default function GalleriesDetail({ item, relatedItems = [] }: GalleriesDetailProps) {
  const {
    src: image,
    label: title,
    alt,
    description,
    fullContent,
    images = [],
    category,
  } = item;

  // Filter options based on photo descriptions
  const filters = ["All", "Traditional Front Profile", "Flat Side Profile", "Flat Front Profile", "Extreme Side Profile", "Extreme Front Profile", "Doll Side Profile", "Doll Front Profile"];
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Generate gallery images with same size
  const generateGalleryImages = (): GalleryImage[] => {
    const allImages = images.length > 0 ? [image, ...images] : [image];
    
    // Create more images for demo (you can replace with actual images)
    const galleryImages: GalleryImage[] = Array.from({ length: Math.max(allImages.length * 3, 20) }, (_, idx) => {
      const imgSrc = allImages[idx % allImages.length];
      
      // Randomize filters for demo
      const randomFilter = filters[Math.floor(Math.random() * (filters.length - 1)) + 1];
      
      return {
        src: imgSrc,
        alt: `${title} - Photo ${idx + 1}`,
        filter: randomFilter,
      };
    });
    
    return galleryImages;
  };

  const allGalleryImages = useMemo(() => generateGalleryImages(), [item]);

  // Filter images
  const filteredImages = useMemo(() => {
    if (activeFilter === "All") {
      return allGalleryImages;
    }
    return allGalleryImages.filter(img => img.filter === activeFilter);
  }, [activeFilter, allGalleryImages]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Show pagination only if more than 20 images
  const showPagination = filteredImages.length > itemsPerPage;

  return (
    <article className="w-full bg-white min-h-screen">
      {/* Hero Image Section */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-8">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            {category && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-white/90 text-[#b1868e] text-xs font-semibold uppercase rounded-full">
                  {category}
                </span>
              </div>
            )}
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-lora text-white font-bold mb-4 drop-shadow-lg">
              {title}
            </h1>
            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-white/90 drop-shadow-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
        {/* Description/Intro */}
        {description && (
          <div className="mb-8">
            <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-[#b1868e] pl-6">
              {description}
            </p>
          </div>
        )}

        {/* Full Content */}
        {fullContent && (
          <div className="prose prose-lg max-w-none mb-12">
            <div
              className="text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: fullContent }}
            />
          </div>
        )}

        {/* Image Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-lora text-[#3a2b28] mb-6 text-center">
            Photo Gallery
          </h2>

          {/* Filter Buttons */}
          <div className="mb-8">
            {/* Top row of filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {filters.slice(0, 6).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
                    activeFilter === filter
                      ? "bg-blue-400 text-blue-900 shadow-md"
                      : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {/* Bottom row of filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.slice(6).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
                    activeFilter === filter
                      ? "bg-blue-400 text-blue-900 shadow-md"
                      : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid Gallery */}
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {paginatedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-square"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    {/* EP Logo overlay (randomly show on some images) */}
                    {idx % 7 === 0 && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-white/80 px-2 py-1 rounded text-xs font-semibold text-gray-800">
                          EP
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - Only show if more than 20 images */}
            {showPagination && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* Previous button */}
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 rounded text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    &lt; Prev
                  </button>
                )}
                
                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                {/* Next button */}
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 rounded text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    Next &gt;
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12" />

        {/* Social Share */}
        <div className="mb-12 text-center">
          <p className="text-gray-600 mb-4 font-semibold">Share this gallery</p>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Facebook
            </button>
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              Instagram
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
              Twitter
            </button>
          </div>
        </div>

        {/* Related Galleries */}
        {relatedItems.length > 0 && (
          <>
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-lora text-[#3a2b28] mb-8 text-center">
                Related Galleries
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedItems.slice(0, 3).map((related) => (
                  <Link
                    key={related.id}
                    href={`/galleries/${related.id}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={related.src}
                        alt={related.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      {related.category && (
                        <div className="mb-2">
                          <span className="text-xs text-[#b1868e] font-semibold uppercase">
                            {related.category}
                          </span>
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#b1868e] transition-colors">
                        {related.label}
                      </h3>
                      {related.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {related.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Back to Galleries Link */}
        <div className="text-center mt-12">
          <Link
            href="/galleries"
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
            Back to Galleries
          </Link>
        </div>
      </div>
    </article>
  );
}
