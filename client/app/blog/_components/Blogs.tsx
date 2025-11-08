"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultPosts, type BlogPost } from "../../../data/blogData";

interface BlogsProps {
  categories?: string[];
  posts?: BlogPost[];
  defaultCategory?: string;
}

export default function Blogs({
  categories = ["ALL", "FEATURED", "GROOMING", "MISCELLANEOUS", "NUTRITION", "REARING", "UNCATEGORIZED"],
  posts = defaultPosts,
  defaultCategory = "ALL",
}: BlogsProps) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState("All Posts");
  const [displayCount, setDisplayCount] = useState(8);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "ALL" || post.categories.includes(activeCategory);
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMore = filteredPosts.length > displayCount;

  return (
    <section className="w-full py-8 px-4 bg-[#f0f8f8] min-h-screen">
      {/* Search and Dropdown Header */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Keyword (only one)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Q Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="md:w-48">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Filter
          </label>
          <div className="relative">
            <select
              value={selectedDropdown}
              onChange={(e) => setSelectedDropdown(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
            >
              <option>All Posts</option>
              <option>Featured</option>
              <option>Recent</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-4 left-4 bg-[#b1868e] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="text-xs text-blue-600 font-semibold uppercase"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#b1868e] transition-colors">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                    {post.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                    <span>{post.author || "Ethereal Persians"}</span>
                    <span>{post.date || "Recent"}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setDisplayCount((prev) => prev + 8)}
              className="px-8 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-50"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </section>
  );
}

