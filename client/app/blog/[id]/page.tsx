import BlogDetail from "../_components/BlogDetail";
import { defaultPosts } from "../../../data/blogData";
import type { BlogPost } from "../../../data/blogData";
import { fetchBlogPageData } from "@/services/api";
import type { TransformedBlogPost } from "@/types/api";

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const { blogs } = await fetchBlogPageData();
    if (blogs.length > 0) {
      return blogs.map((post) => ({
        id: post.id,
      }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  
  // Fallback to local data
  return defaultPosts.map((post) => ({
    id: post.id,
  }));
}

// Convert TransformedBlogPost to BlogPost format
function convertToBlogPost(transformedPost: TransformedBlogPost): BlogPost {
  return {
    id: transformedPost.id,
    categories: transformedPost.categories,
    title: transformedPost.title,
    description: transformedPost.description,
    image: transformedPost.image,
    author: transformedPost.author,
    date: transformedPost.date,
    fullContent: transformedPost.fullContent,
  };
}

function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  // First, try to find posts with matching categories
  const categoryMatches = allPosts
    .filter((post) => {
      if (post.id === currentPost.id) return false;
      return post.categories.some((cat) => currentPost.categories.includes(cat));
    })
    .slice(0, limit);

  // If we don't have enough matches, fill with any other posts
  if (categoryMatches.length < limit) {
    const remaining = allPosts
      .filter((post) => post.id !== currentPost.id && !categoryMatches.find((p) => p.id === post.id))
      .slice(0, limit - categoryMatches.length);
    return [...categoryMatches, ...remaining];
  }

  return categoryMatches;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Try to fetch from API first
  let post: BlogPost | null = null;
  let allPosts: BlogPost[] = [];
  
  try {
    const { blogs } = await fetchBlogPageData();
    allPosts = blogs.map(convertToBlogPost);
    const apiPost = blogs.find((p) => p.id === id);
    if (apiPost) {
      post = convertToBlogPost(apiPost);
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }
  
  // Fallback to local data if API fails
  if (!post) {
    post = defaultPosts.find((p) => p.id === id) || null;
    allPosts = defaultPosts;
  }

  if (!post) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <a
            href="/blog"
            className="text-[#b1868e] hover:text-[#a67d8f] font-semibold"
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, allPosts);

  return <BlogDetail post={post} relatedPosts={relatedPosts} />;
}

