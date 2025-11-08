import GalleriesDetail from "../../galleries/_components/GalleriesDetail";
import { galleryData } from "../../../data/galleryData";
import type { GalleryItem } from "../../../data/galleryData";

// Generate static params for all gallery items
export async function generateStaticParams() {
  return galleryData.map((item) => ({
    id: item.id,
  }));
}

// Get gallery item by id
function getGalleryItemById(id: string): GalleryItem | null {
  const item = galleryData.find((item) => item.id === id);
  return item || null;
}

// Get related gallery items
function getRelatedItems(currentItem: GalleryItem, limit = 3): GalleryItem[] {
  // First, try to find items with matching categories
  const categoryMatches = galleryData
    .filter((item) => {
      if (item.id === currentItem.id) return false;
      return item.category === currentItem.category;
    })
    .slice(0, limit);

  // If we don't have enough matches, fill with any other items
  if (categoryMatches.length < limit) {
    const remaining = galleryData
      .filter((item) => item.id !== currentItem.id && !categoryMatches.find((p) => p.id === item.id))
      .slice(0, limit - categoryMatches.length);
    return [...categoryMatches, ...remaining];
  }

  return categoryMatches;
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const galleryItem = getGalleryItemById(id);

  if (!galleryItem) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gallery Not Found</h1>
          <p className="text-gray-600 mb-6">The gallery you're looking for doesn't exist.</p>
          <a
            href="/galleries"
            className="text-[#b1868e] hover:text-[#a67d8f] font-semibold"
          >
            ← Back to Galleries
          </a>
        </div>
      </div>
    );
  }

  const relatedItems = getRelatedItems(galleryItem);

  return <GalleriesDetail item={galleryItem} relatedItems={relatedItems} />;
}
