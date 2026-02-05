import { popularData as fallbackPopularData } from "@/data/popularData";
import { kittenData as fallbackKittenData } from "@/data/kittenData";
import { adultsData as fallbackAdultsData } from "@/data/adultsData";
import { commentsData as fallbackCommentsData } from "@/data/commentsData";
import { specialData as fallbackSpecialData } from "@/data/specialData";
import { galeriesData as fallbackGaleriesData } from "@/data/galeriesData";
import { testimonialData as fallbackTestimonialData } from "@/data/testimonialData";
import { mediaData as fallbackMediaData } from "@/data/mediaData";
import { videoData as fallbackVideoData } from "@/data/videoData";
import Adults from "./_components/Adults";
import Comments from "./_components/Comments";
import Footer from "./_components/Footer";
import Galeries from "./_components/Galeries";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Kitten from "./_components/Kitten";
import Look from "./_components/Look";
import Media from "./_components/Media";
import Popular from "./_components/Popular";
import Special from "./_components/Special";
import Testimontal from "./_components/Testimontal";
import VideoGallery from "./_components/Video";
import { fetchKittenData, fetchAdultsData, fetchCommentsData, fetchSpecialData, fetchGaleriesData, fetchPopularData, fetchTestimonialData, fetchMediaData, fetchVideoData } from "@/services/api";

// Helper function to safely fetch data with fallback
async function safeFetch<T>(
  fetchFn: () => Promise<T>,
  fallback: T,
  dataName: string
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    console.error(`❌ Error fetching ${dataName}:`, error);
    console.warn(`⚠️ Using fallback data for ${dataName}`);
    return fallback;
  }
}

export default async function Home() {
  // Fetch all data with error handling and fallbacks
  const [kittenData, adultsData, commentsData, specialData, galeriesData, popularData, testimonialData, mediaData, videoData] = await Promise.all([
    safeFetch(fetchKittenData, fallbackKittenData, 'kittenData'),
    safeFetch(fetchAdultsData, fallbackAdultsData, 'adultsData'),
    safeFetch(fetchCommentsData, fallbackCommentsData, 'commentsData'),
    safeFetch(fetchSpecialData, fallbackSpecialData, 'specialData'),
    safeFetch(fetchGaleriesData, fallbackGaleriesData, 'galeriesData'),
    safeFetch(fetchPopularData, fallbackPopularData, 'popularData'),
    safeFetch(fetchTestimonialData, fallbackTestimonialData, 'testimonialData'),
    safeFetch(fetchMediaData, fallbackMediaData, 'mediaData'),
    safeFetch(fetchVideoData, fallbackVideoData, 'videoData'),
  ]);
  
  return (
    <>
      <Hero />
      <Kitten {...kittenData} />
      <Adults {...adultsData} />
      <Comments {...commentsData} />
      <Special {...specialData} />
      <Look />
      <Galeries {...galeriesData} />
      <Popular {...popularData} />
      <Testimontal {...testimonialData} />
      <Media {...mediaData} />
      <VideoGallery {...videoData} />
    </>
  );
}
