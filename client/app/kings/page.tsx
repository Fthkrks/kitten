import React from 'react'
import CardImage from '../_components/CardImage'
import VideoGallery from '../_components/Video'
import Meet from '../_components/Meet'
import { fetchVideoData, fetchKingsPageData } from '@/services/api'

async function page() {
    const { cardImage, kings } = await fetchKingsPageData();
    const videoData = await fetchVideoData();

  return (
    <div>
        <CardImage {...cardImage} />
        <Meet 
            title="OUR KINGS" 
            componentBg="#F0F8F8"
            cards={kings}
            titleColor="#84adac"
            pawPrintColor="#84adac"
        />
              <VideoGallery {...videoData} />
    </div>
  )
}

export default page