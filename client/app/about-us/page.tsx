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

async function page() {
  const mediaData = await fetchMediaData();
  const videoData = await fetchVideoData();
  const { cardImage, aboutData, paragData, timelineEvents, cards, faqData, reasons } = await fetchAboutUsPageData();

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
}

export default page;
