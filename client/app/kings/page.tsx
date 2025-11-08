import React from 'react'
import CardImage from '../_components/CardImage'
import VideoGallery from '../_components/Video'
import Meet from '../_components/Meet'
import type { MeetCard } from '../_components/Meet'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1800",
        heading: "KINGS",
        cardTitle: "OUR KINGS",
        cardText: "Meet our magnificent Persian kings - the regal fathers of our bloodline. These distinguished gentlemen showcase exceptional breeding, majestic presence, and the noble characteristics that define our royal lineage.",
        overlayColor: "rgba(0,0,0,0.15)",
        parallaxSpeed: 0.3,
        backgroundColor: "#f9f1f1",
    }

    const kings: MeetCard[] = [
        {
            name: "KING | TITAN",
            description: "Meet our magnificent Persian kings - the regal fathers of our bloodline. These distinguished gentlemen showcase exceptional breeding, majestic presence, and the noble characteristics that define our royal lineage. KING TITAN stands as a proud example of traditional Persian excellence with his impressive orange tabby coat and commanding presence.",
            imageSrc: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800",
            cardBackgroundColor: "#E0F2F7",
            buttonText: "MEET TITAN",
            imageOverlayText: "EP ETHEREAL Persians TITAN",
            imagePosition: "right",
            titleColor: "#7DD3FC",
            buttonBackgroundColor: "#E0F2F7",
            buttonTextColor: "#3a2b28",
            descriptionTextColor: "#5A5A5A",
        },
        {
            name: "SKY",
            description: "Sky is an exquisite Russian import, a seal lynx point Himalayan with stunning deep blue eyes and an extreme face. His personality is that of a dog-like-cat - overly needy, affectionate, demanding, vocal, and simply a joy to live with. He brings endless entertainment and love to his family.",
            imageSrc: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&q=80&w=800",
            cardBackgroundColor: "#D1ECF1",
            buttonText: "MEET SKY",
            imageOverlayText: "EP ETHEREAL Persians SKY",
            imagePosition: "left",
            titleColor: "#84adac",
            buttonBackgroundColor: "#D1ECF1",
            buttonTextColor: "#3a2b28",
            descriptionTextColor: "#5A5A5A",
        }
    ]

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
        <VideoGallery/>
    </div>
  )
}

export default page