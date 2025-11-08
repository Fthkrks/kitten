import React from 'react'
import CardImage from '../_components/CardImage'
import TextImage from '../history/_components/TextImage'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=1800",
        heading: "HEALTH",
        cardTitle: "BREEDING FOR HEALTH",
        cardText: "Health is our top priority. We follow strict, veterinarian-advised protocols to safeguard the well-being of our kings, queens, and kittens. Our program includes routine health screenings, genetic testing where appropriate, meticulous sanitation, and age-appropriate vaccination schedules to ensure your kitten begins life with the strongest foundation possible.",
        overlayColor: "rgba(0,0,0,0.2)",
        parallaxSpeed: 0.25,
        backgroundColor: "#EAF7E7",
    }
    const textImageData = {
        leftImage: {
            src: "https://images.unsplash.com/photo-1555680209-51b6ecfa0db9?w=900&h=700&fit=crop",
            alt: "Vet checking a cat",
            title: "Routine Veterinary Care",
            caption: "Regular wellness exams and preventative screening"
        },
        rightImage: {
            src: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=900&h=700&fit=crop",
            alt: "Clean cattery environment",
            title: "Clean, Stress‑Reduced Housing",
            caption: "Sanitation protocols and calm socialization"
        },
        paragraphs: [
            "We operate a prevention‑first health program designed with our consulting veterinarians. Our adults and kittens follow structured deworming, fecal surveillance, and age‑appropriate vaccination schedules.",
            "Nutrition and environment matter. We feed high‑quality, meat‑forward diets, provide fresh water at multiple stations, and maintain HEPA‑assisted air flow. Litter, dishes, and textiles are cleaned on a strict rotation using veterinary‑safe disinfectants.",
            "Breeding cats are screened for heritable concerns where applicable, and pairings are planned to minimize risk. New kittens undergo wellness checks before going home and leave with a health record and guidance for their first weeks.",
            "Your kitten’s transition is supported with gradual socialization, stress‑reduction routines, and a take‑home care plan to help them settle quickly and confidently."
        ],
        showPhylogeneticTree: false
    }
  return (
    <div>
        <CardImage {...cardImage} />
        <TextImage {...textImageData} />
    </div>
  )
}

export default page