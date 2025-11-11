import React from 'react'
import CardImage from '../_components/CardImage'
import Media from '../_components/Media'
import VideoGallery from '../_components/Video'
import PhotoGrid from '../galleries/_components/PhotoGrid'
import { fetchMediaData, fetchVideoData, fetchGalleriesPageData } from '@/services/api'

async function page() {
    const videoData = await fetchVideoData();
    const mediaData = await fetchMediaData();
    const { cardImage, galleries } = await fetchGalleriesPageData();

    // Transform galleries to match PhotoGrid expected format
    const photoGridData = galleries.map(gallery => ({
      id: gallery.id,
      label: gallery.label,
      src: gallery.coverImage,
      alt: gallery.description
    }));

  return (
    <div>
        <CardImage {...cardImage} />
        <PhotoGrid galleries={photoGridData} />
        <Media {...mediaData} />
        <VideoGallery {...videoData} />
    </div>
  )
}

export default page