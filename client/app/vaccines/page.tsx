import React from 'react'
import CardImage from '../_components/CardImage'
import Paragrafh from '../_components/paragrafh'


function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1800",
        heading: "VACCINES",
        cardTitle: "CORE & OPTIONAL VACCINES",
        cardText: "Our kittens follow a veterinarian‑guided protocol: core FVRCP series with boosters, deworming and fecal checks, and rabies where required by law. We discuss optional vaccines (e.g., FeLV) based on lifestyle risk so you and your vet can make the best decision together.",
        overlayColor: "rgba(0,0,0,0.25)",
        parallaxSpeed: 0.2,
        backgroundColor: "#EEF5FF",
    }
  return (
    <div>
        <CardImage {...cardImage} />
        <Paragrafh />
    </div>
  )
}

export default page