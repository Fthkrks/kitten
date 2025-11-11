import React from 'react'

import TestimonialsHero from './_components/TestimonialsHero'
import GoogleReviews from './GoogleReviews'
import SocialReviews from './_components/SocialReviews'
import VideoGallery from '../_components/Video'
import { fetchVideoData, fetchTestimonialPageData } from '@/services/api'

export default async function page() {
  const videoData = await fetchVideoData();
  const { heroData, reviewSections } = await fetchTestimonialPageData();

  return (
    <div>
      <TestimonialsHero {...heroData} />
      {reviewSections.map((section, index) => (
        <GoogleReviews 
          key={index} 
          title={section.title} 
          reviews={section.reviews} 
        />
      ))}
      <VideoGallery {...videoData} />
    </div>
  )
}
