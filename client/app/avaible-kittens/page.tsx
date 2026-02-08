import React from 'react'
import CardImage from '../_components/CardImage'
import Soon from './_components/Soon'
import PetCards from '../_components/PetCards'
import AdultsAvaible from './_components/AdultsAvaible'
import VideoGallery from '../_components/Video'
import { petsData } from '../../data/petData'
import { fetchAvailableKittenCardImage, fetchVideoData, fetchAvailableKittenPetCards, fetchAdultsAvaibleData } from '@/services/api'

async function page() {
    const cardImage = await fetchAvailableKittenCardImage();
    const videoData = await fetchVideoData();
    const apiPets = await fetchAvailableKittenPetCards();
    const adultsAvaibleData = await fetchAdultsAvaibleData();
    
    // Use API pets if available, otherwise fallback to local data
    const allPets = apiPets.length > 0 ? apiPets : petsData.slice(0, 6)

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

    // Split pets into groups of 2
    const petGroups = [];
    for (let i = 0; i < allPets.length; i += 2) {
        petGroups.push(allPets.slice(i, i + 2));
    }

  return (
    <div>
        <CardImage {...cardImage} />
        <Soon />
        
        {/* Dynamically render PetCards based on API data */}
        {petGroups.map((pets, index) => (
            <React.Fragment key={index}>
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
            </React.Fragment>
        ))}
        
        
        {/* Show last group with different background color */}
        {petGroups.length > 0 && (
            <PetCards 
                pets={petGroups[petGroups.length - 1]}
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
        )}
        
        <VideoGallery {...videoData} />
    </div>
  )
}

export default page