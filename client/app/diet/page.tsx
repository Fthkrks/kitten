import React from 'react'
import CardImage from '../_components/CardImage'
import Diet from './_components/Diet'
import { fetchDietPageData } from '@/services/api'

async function page() {
  const { cardImage, dietData } = await fetchDietPageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <Diet {...dietData} />
    </div>
  )
}

export default page