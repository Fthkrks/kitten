import React from 'react'
import CardImage from '../_components/CardImage'
import TextImage from '../history/_components/TextImage'
import { fetchHealthPageData } from '@/services/api'

async function page() {
  const { cardImage, textImageData } = await fetchHealthPageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <TextImage {...textImageData} />
    </div>
  )
}

export default page