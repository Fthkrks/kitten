import React from "react";
import CardImage from "../_components/CardImage";
import About from "./_components/About";
import Parag from "../_components/Parag";
import TimeLine from "./_components/TimeLine";
import Card from "../_components/Card";
import Cards from "../_components/Card";
import Faq from "../_components/Faq";
import Why from "./_components/Why";
import Media from "../_components/Media";
import VideoGallery from "../_components/Video";
import { fetchMediaData, fetchVideoData, fetchAboutUsPageData } from "@/services/api";

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function page() {
  try {
    const [mediaData, videoData, aboutUsData] = await Promise.all([
      fetchMediaData(),
      fetchVideoData(),
      fetchAboutUsPageData()
    ]);
    
    const { cardImage, aboutData, paragData, timelineEvents, cards, faqData, reasons } = aboutUsData;

    return (
      <div>
        <CardImage {...cardImage} />
        <About {...aboutData} />
        <Parag {...paragData} />
        <TimeLine events={timelineEvents} />
        {cards.map((card) => (
          <Cards key={card.title} {...card} />
        ))}
        <Faq title={faqData.title} questions={faqData.questions} />
        <Why reasons={reasons} />
        <Media {...mediaData} />
        <VideoGallery {...videoData} />
      </div>
    );
  } catch (error) {
    console.error('❌ Error in about-us page:', error);
    // Return a basic error message or fallback UI
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Page</h1>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
}

export default page;
