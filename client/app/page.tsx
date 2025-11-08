import { kittenData } from "@/data/kittenData";
import { adultsData } from "@/data/adultsData";
import { commentsData } from "@/data/commentsData";
import { specialData } from "@/data/specialData";
import { galeriesData } from "@/data/galeriesData";
import { popularData } from "@/data/popularData";
import { testimonialData } from "@/data/testimonialData";
import { mediaData } from "@/data/mediaData";
import { videoData } from "@/data/videoData";
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

export default function Home() {
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
