"use client";
import Image from "next/image";
import Link from "next/link";
import { defaultPosts, type BlogPost } from "../../../data/blogData";

export default function Featured() {
  const featuredPosts = defaultPosts.filter((post) => post.featured === true);

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-lora text-[#3a2b28] mb-3">Featured Posts</h2>
          <div className="w-24 h-px bg-[#b1868e] mx-auto"></div>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
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
                  <div className="absolute top-4 left-4 bg-[#b1868e] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    Featured
                  </div>
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
      </div>
    </section>
  );
}

