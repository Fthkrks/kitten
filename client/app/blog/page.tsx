import React from 'react'
import CardImage from '../_components/CardImage'
import Blogs from './_components/Blogs'
import Featured from './_components/Featured'
import WhyBlog from './_components/WhyBlog'
import { fetchBlogPageData } from '@/services/api'
import type { BlogPostSimple } from './_components/Blogs'

async function page() {
  const { cardImage, whyBlogData, blogs } = await fetchBlogPageData();
  
  // Convert TransformedBlogPost to BlogPostSimple
  const blogPosts: BlogPostSimple[] = blogs.map(blog => ({
    id: blog.id,
    categories: blog.categories,
    title: blog.title,
    description: blog.description,
    image: blog.image,
    author: blog.author,
    date: blog.date,
    featured: blog.features, // Use features field from API
  }));
  
  // Extract unique categories from blogs
  const allCategories = Array.from(
    new Set(
      blogs.flatMap(blog => blog.categories)
    )
  ).sort();
  
  const categoriesWithAll = ["ALL", ...allCategories];

  return (
    <div>
      <CardImage {...cardImage} />
      <Blogs posts={blogPosts} categories={categoriesWithAll} />
      <Featured posts={blogPosts} />
      <WhyBlog {...whyBlogData} />
    </div>
  )
}

export default page