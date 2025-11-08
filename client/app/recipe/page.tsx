import React from 'react'
import CardImage from '../_components/CardImage'
import Recipe from './_components/Recipe'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1800",
        heading: "RECIPE",
        cardTitle: "NUTRITION & RECIPE",
        cardText: "Our kittens thrive on balanced, meat‑forward nutrition. We follow a simple, digestible recipe plan that prioritizes high‑quality proteins, moisture, and gentle carbohydrates. Transition guidelines and portion suggestions are included so you can continue the same routine at home without stomach upsets.",
        overlayColor: "rgba(0,0,0,0.25)",
        parallaxSpeed: 0.25,
        backgroundColor: "#FFF8EE",
    }
  return (
    <div>
        <CardImage {...cardImage} />
        <Recipe />
    </div>
  )
}

export default page