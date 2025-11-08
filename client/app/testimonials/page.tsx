import React from 'react'

import TestimonialsHero from './_components/TestimonialsHero'
import GoogleReviews from './GoogleReviews'
import SocialReviews from './_components/SocialReviews'
import VideoGallery from '../_components/Video'

export default function page() {
  return (
    <div>
      <TestimonialsHero />
      <GoogleReviews />
      <SocialReviews/>
      <VideoGallery/>
      </div>
  )
}
