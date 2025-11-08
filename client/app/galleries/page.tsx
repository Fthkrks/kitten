import React from 'react'
import CardImage from '../_components/CardImage'
import Media from '../_components/Media'
import VideoGallery from '../_components/Video'
import PhotoGrid from '../galleries/_components/PhotoGrid'

function page() {
    const galleryData = {
        heroImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=1800",
        heading: "GALLERIES",
        cardTitle: "CHECK OUT OUR PHOTO ALBUMS",
        cardText: "Browse through our collection of beautiful moments capturing the elegance, playfulness, and unique personalities of our Persian cats. Each photograph tells a story of love, care, and the special bond we share with our feline family members.",
        overlayColor: "rgba(0,0,0,0.15)",
        parallaxSpeed: 0.3,
        backgroundColor: "#f9f1f1",
    }

  return (
    <div>
        <CardImage {...galleryData} />
        <PhotoGrid />
        <Media/>
        <VideoGallery/>
    </div>
  )
}

export default page