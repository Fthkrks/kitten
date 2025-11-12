import React from 'react'
import CardImage from '../_components/CardImage'
import Recipe from './_components/Recipe'
import { fetchRecipePageData } from '@/services/api'

async function page() {
  const { cardImage, recipeData } = await fetchRecipePageData();

  return (
    <div>
      <CardImage {...cardImage} />
      <Recipe {...recipeData} />
    </div>
  )
}

export default page