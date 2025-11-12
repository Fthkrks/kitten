import React from 'react'
import CardImage from '../_components/CardImage'
import RecommendedProducts from './_components/RecommendedProducts'
import { fetchProductsRecommendPageData } from '@/services/api'

async function page() {
  const { cardImage, productsData } = await fetchProductsRecommendPageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <RecommendedProducts {...productsData} />
    </div>
  )
}

export default page