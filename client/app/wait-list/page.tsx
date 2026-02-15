import React from 'react'
import CardImage from '../_components/CardImage'
import Paragrafh from '../_components/paragrafh'
import { fetchVaccinePageData } from '@/services/api'

async function page() {
  const { cardImage, vaccineData } = await fetchVaccinePageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <Paragrafh {...vaccineData} />
    </div>
  )
}

export default page