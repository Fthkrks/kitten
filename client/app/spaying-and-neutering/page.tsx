import React from 'react'
import CardImage from '../_components/CardImage'
import Paragrafh from '../_components/paragrafh'
import { fetchSpayingAndNeuteringPageData } from '@/services/api'

async function page() {
  const { cardImage, paragrafhData } = await fetchSpayingAndNeuteringPageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <Paragrafh {...paragrafhData} />
    </div>
  )
}

export default page