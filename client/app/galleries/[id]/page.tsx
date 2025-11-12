import GalleriesDetail from "../../galleries/_components/GalleriesDetail";
import { galleryData } from "../../../data/galleryData";
import type { GalleryItem } from "../../../data/galleryData";
import { fetchGalleriesPageData } from "@/services/api";

// Generate static params for all gallery items
export async function generateStaticParams() {
  try {
    const { galleries } = await fetchGalleriesPageData();
    return galleries.map((item) => ({
      id: item.id,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Fallback to local data
    return galleryData.map((item) => ({
      id: item.id,
    }));
  }
}

// Get gallery item by id from API
async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  try {
    const { galleries } = await fetchGalleriesPageData();
    const apiGallery = galleries.find((item) => item.id === id);
    
    if (apiGallery) {
      // Transform API gallery to match GalleryItem interface
      // Convert images from object array to string array for component compatibility
      const imageStrings = apiGallery.images.map(img => img.src);
      
      return {
        id: apiGallery.id,
        label: apiGallery.label,
        src: apiGallery.coverImage,
        alt: apiGallery.description,
        category: apiGallery.category,
        description: apiGallery.description,
        fullContent: apiGallery.fullContent,
        images: imageStrings
      };
    }
  } catch (error) {
    console.error('Error fetching gallery item:', error);
  }
  
  // Fallback to local data
  const localItem = galleryData.find((item) => item.id === id);
  return localItem || null;
}

// Get related gallery items
async function getRelatedItems(currentItem: GalleryItem, limit = 3): Promise<GalleryItem[]> {
  try {
    const { galleries } = await fetchGalleriesPageData();
    
    // Transform API galleries to match GalleryItem interface
    // Convert images from object array to string array for component compatibility
    const allItems: GalleryItem[] = galleries.map(gallery => ({
      id: gallery.id,
      label: gallery.label,
      src: gallery.coverImage,
      alt: gallery.description,
      category: gallery.category,
      description: gallery.description,
      fullContent: gallery.fullContent,
      images: gallery.images.map(img => img.src)
    }));

    // First, try to find items with matching categories
    const categoryMatches = allItems
      .filter((item) => {
        if (item.id === currentItem.id) return false;
        return item.category === currentItem.category;
      })
      .slice(0, limit);

    // If we don't have enough matches, fill with any other items
    if (categoryMatches.length < limit) {
      const remaining = allItems
        .filter((item) => item.id !== currentItem.id && !categoryMatches.find((p) => p.id === item.id))
        .slice(0, limit - categoryMatches.length);
      return [...categoryMatches, ...remaining];
    }

    return categoryMatches;
  } catch (error) {
    console.error('Error fetching related items:', error);
    // Fallback to local data
    const categoryMatches = galleryData
      .filter((item) => {
        if (item.id === currentItem.id) return false;
        return item.category === currentItem.category;
      })
      .slice(0, limit);

    if (categoryMatches.length < limit) {
      const remaining = galleryData
        .filter((item) => item.id !== currentItem.id && !categoryMatches.find((p) => p.id === item.id))
        .slice(0, limit - categoryMatches.length);
      return [...categoryMatches, ...remaining];
    }

    return categoryMatches;
  }
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const galleryItem = await getGalleryItemById(id);

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

  const relatedItems = await getRelatedItems(galleryItem);

  return <GalleriesDetail item={galleryItem} relatedItems={relatedItems} />;
}
