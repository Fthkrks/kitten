import { popularData } from "@/data/popularData";
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
import { fetchKittenData, fetchAdultsData, fetchCommentsData, fetchSpecialData, fetchGaleriesData, fetchTestimonialData, fetchMediaData, fetchVideoData } from "@/services/api";

export default async function Home() {
  const kittenData = await fetchKittenData();
  const adultsData = await fetchAdultsData();
  const commentsData = await fetchCommentsData();
  const specialData = await fetchSpecialData();
  const galeriesData = await fetchGaleriesData();
  const testimonialData = await fetchTestimonialData();
  const mediaData = await fetchMediaData();
  const videoData = await fetchVideoData();
  
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
