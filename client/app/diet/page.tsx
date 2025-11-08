import React from 'react'
import CardImage from '../_components/CardImage'
import Diet from './_components/Diet'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1604908554039-913b1b90a44b?auto=format&fit=crop&q=80&w=1800",
        heading: "DIET",
        cardTitle: "DIET GUIDELINES",
        cardText: "A gentle, moisture‑rich diet keeps Persians thriving. We recommend meat‑forward wet food with added hydration, portioned into small, frequent meals. Transition slowly over 5–7 days and consult your vet for individual needs.",
        overlayColor: "rgba(0,0,0,0.2)",
        parallaxSpeed: 0.25,
        backgroundColor: "#F4FCFD",
    }
    const dietData = {
        title: "Everyday Diet Guidelines",
        subtitle: "Moisture‑rich, meat‑forward meals for happy Persians",
        coverImage: "https://images.unsplash.com/photo-1604908554039-913b1b90a44b?auto=format&fit=crop&q=80&w=1600",
        highlights: [
            { title: "Hydration First", description: "Wet food or added water/goat milk supports urinary health." },
            { title: "Meat‑Forward", description: "Protein sources promote muscle growth and vitality." },
            { title: "Gentle Carbs", description: "Balanced carbohydrates support energy and digestion." },
        ],
        dos: [
            "Offer small, frequent meals. Refrigerate portions for up to 24h; discard leftovers left out >30 minutes.",
        ],
        donts: [
            "Avoid dry food; it lacks moisture and can cause dehydration.",
            "Never feed table scraps; they can upset digestion and lead to obesity.",
        ],
    }       
  return (
    <div>
        <CardImage {...cardImage} />
        <Diet {...dietData} />
    </div>
  )
}

export default page