import React from 'react'
import CardImage from '../_components/CardImage'
import Blogs from './_components/Blogs'
import Featured from './_components/Featured'
import WhyBlog from './_components/WhyBlog'

function page() {


  const cardImage = {
    heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1800",
    cardTitle: "WELCOME TO OUR BLOG",
    overlayColor: "rgba(0,0,0,0.10)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f111",
  }

  return (
    <div>
      <CardImage {...cardImage} />
      <Blogs />
      <Featured />
      <WhyBlog />
    </div>
  )
}

export default page