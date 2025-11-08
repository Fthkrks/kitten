"use client";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../../../data/blogData";

export interface ExtendedBlogPost extends BlogPost {
  fullContent?: string;
  author?: string;
  date?: string;
}

interface BlogDetailProps {
  post: ExtendedBlogPost;
  relatedPosts?: BlogPost[];
}

export default function BlogDetail({ post, relatedPosts = [] }: BlogDetailProps) {
  const {
    image,
    categories,
    title,
    description,
    fullContent,
    author = "Ethereal Persians",
    date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  } = post;

  return (
    <article className="w-full bg-white min-h-screen">
      {/* Hero Image Section */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-8">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-white/90 text-blue-600 text-xs font-semibold uppercase rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-lora text-white font-bold mb-4 drop-shadow-lg">
              {title}
            </h1>
            {/* Meta */}
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span>By {author}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
        {/* Description/Intro */}
        <div className="mb-8">
          <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-[#b1868e] pl-6">
            {description}
          </p>
        </div>

        {/* Full Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {fullContent ? (
            <div
              className="text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: fullContent }}
            />
          ) : (
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                Welcome to our comprehensive guide. This article provides detailed
                insights and practical advice for Persian cat breeders and enthusiasts.
              </p>
              <p>
                {description} We understand the importance of proper care, nutrition,
                and breeding practices when it comes to maintaining the health and
                happiness of these beautiful felines.
              </p>
              <p>
                Throughout this article, we will explore various aspects of Persian cat
                care, from grooming techniques to nutritional needs, breeding
                considerations, and health management strategies.
              </p>
              <h2 className="text-2xl font-lora text-[#b1868e] mt-8 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Essential care practices for Persian cats</li>
                <li>Nutritional guidelines and feeding recommendations</li>
                <li>Grooming techniques and maintenance tips</li>
                <li>Health considerations and preventive measures</li>
              </ul>
              <p className="mt-6">
                We hope this information helps you provide the best possible care for
                your Persian cats and contributes to their well-being and longevity.
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12" />

        {/* Social Share */}
        <div className="mb-12 text-center">
          <p className="text-gray-600 mb-4 font-semibold">Share this article</p>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Facebook
            </button>
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              Instagram
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
              Twitter
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <>
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-lora text-[#3a2b28] mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.id}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {related.categories.slice(0, 1).map((cat) => (
                          <span
                            key={cat}
                            className="text-xs text-blue-600 font-semibold uppercase"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#b1868e] transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Back to Blog Link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#b1868e] hover:text-[#a67d8f] font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}

