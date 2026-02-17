import React from 'react'
import CardImage from '../_components/CardImage'
import TextImage from '../history/_components/TextImage'
import Paragrafh from '../_components/paragrafh'
import { fetchHealthPageData } from '@/services/api'

async function page() {
  const { cardImage, textImageData, paragraphSections } = await fetchHealthPageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <TextImage {...textImageData} />
      {paragraphSections && paragraphSections.length > 0 && (
        <Paragrafh sections={paragraphSections} bg="#ffffff" />
      )}
    </div>
  )
}

export default page