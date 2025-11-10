import React from 'react'
import CardImage from '../_components/CardImage'
import VideoGallery from '../_components/Video'
import Meet from '../_components/Meet'
import { fetchVideoData, fetchQueensPageData } from '@/services/api'

async function page() {
    const { cardImage, queens } = await fetchQueensPageData();
    const videoData = await fetchVideoData();

  return (
    <div>
        <CardImage {...cardImage} />
        <Meet 
            title="OUR QUEENS" 
            componentBg="#F0F8F8"
            cards={queens}
            titleColor="#84adac"
            pawPrintColor="#84adac"
        />
              <VideoGallery {...videoData} />
    </div>
  )
}

export default page