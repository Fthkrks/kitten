import React from 'react'
import CardImage from '../_components/CardImage'
import TextImage from './_components/TextImage'
import { fetchHistoryPageData } from '@/services/api'

async function page() {
  const { cardImage, textImageData } = await fetchHistoryPageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <TextImage {...textImageData} />
    </div>
  )
}

export default page