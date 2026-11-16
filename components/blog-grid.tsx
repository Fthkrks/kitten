"use client";
import { useState } from "react";
import { BlogCard } from "@/components/blog-card";
import posts from "@/lib/posts.json";
import site from "@/lib/site.json";
export function BlogGrid() {
  const [limit, setLimit] = useState(6);
  return <section className="bg-kar-ivory py-14 sm:py-16 lg:py-20"><div className="container"><div className="grid gap-6 md:grid-cols-2">
    {posts.slice(0, limit).map(post => <BlogCard key={post.slug} post={post} />)}
  </div>{limit < posts.length && <div className="load-more"><button type="button" className="primary-button" onClick={() => setLimit(posts.length)}>{site.ui.loadMore}</button></div>}</div></section>;
}
