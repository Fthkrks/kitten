import React from 'react'
import CardImage from '../_components/CardImage'
import Soon from './_components/Soon'
import PetCards from '../_components/PetCards'
import AdultsAvaible from './_components/AdultsAvaible'
import VideoGallery from '../_components/Video'
import { petsData } from '../../data/petData'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1800",
        heading: "AVAILABLE KITTEN",
        cardTitle: "AVAILABLE KITTENS",
        cardText: "Discover our adorable Persian kittens ready for their forever homes. Each kitten is lovingly raised with care, socialized, and comes from our champion bloodlines.",
        overlayColor: "rgba(0,0,0,0.15)",
        parallaxSpeed: 0.3,
        backgroundColor: "#f9f1f1",
    }
    
    // Use petsData from petData.ts to ensure consistency with detail pages
    const pets = petsData.slice(0, 6)

    // Bottom hearts component
    const BottomHearts = () => (
        <div className="flex justify-center gap-2 py-8">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className="w-5 h-5 text-pink-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                    />
                </svg>
            ))}
        </div>
    )

  return (
    <div>
        <CardImage {...cardImage} />
        <Soon />
        <PetCards 
            pets={pets}
            backgroundColor="#f9f1f1"
            mobileCols={2}
            desktopCols={2}
            gap={8}
            cardBorderColor="white"
            cardBorderWidth="1px"
            showHearts={false}
            overlayGradient="from-transparent via-transparent to-transparent"
            overlayPadding="p-0"

            bottomSectionPadding="p-4"
        />
        <BottomHearts />
        <PetCards 
            pets={pets}
            backgroundColor="#f9f1f1"
            mobileCols={2}
            desktopCols={2}
            gap={8}
            cardBorderColor="white"
            cardBorderWidth="1px"
            showHearts={false}
            overlayGradient="from-transparent via-transparent to-transparent"
            overlayPadding="p-0"

            bottomSectionPadding="p-4"
        />
        <BottomHearts />
        <PetCards 
            pets={pets}
            backgroundColor="#f9f1f1"
            mobileCols={2}
            desktopCols={2}
            gap={8}
            cardBorderColor="white"
            cardBorderWidth="1px"
            showHearts={false}
            overlayGradient="from-transparent via-transparent to-transparent"
            overlayPadding="p-0"

            bottomSectionPadding="p-4"
        />
        <BottomHearts />
        <PetCards 
            pets={pets}
            backgroundColor="#f9f1f1"
            mobileCols={2}
            desktopCols={2}
            gap={8}
            cardBorderColor="white"
            cardBorderWidth="1px"
            showHearts={false}
            overlayGradient="from-transparent via-transparent to-transparent"
            overlayPadding="p-0"

            bottomSectionPadding="p-4"
        />
        <AdultsAvaible />
        <PetCards 
            pets={pets}
            backgroundColor="#D1ECF1"
            mobileCols={2}
            desktopCols={2}
            gap={8}
            cardBorderColor="white"
            cardBorderWidth="1px"
            showHearts={false}
            overlayGradient="from-transparent via-transparent to-transparent"
            overlayPadding="p-0"

            bottomSectionPadding="p-4"
        />
        <VideoGallery/>

    </div>
  )
}

export default page