import BlogDetail from "../_components/BlogDetail";
import { defaultPosts } from "../../../data/blogData";
import type { BlogPost } from "../../../data/blogData";

// Generate static params for all blog posts
export async function generateStaticParams() {
  return defaultPosts.map((post) => ({
    id: post.id,
  }));
}

// In a real app, this would fetch from an API or database
function getPostById(id: string): BlogPost | null {
  const post = defaultPosts.find((post) => post.id === id);
  if (!post) return null;
  
  // Ensure all detail fields are present with fake data if missing
  return {
    ...post,
    author: post.author || "Ethereal Persians",
    date: post.date || new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    fullContent: post.fullContent || `<p>${post.description}</p><p>This is a comprehensive guide covering all aspects of this important topic. Our years of experience at Ethereal Persians have taught us valuable lessons that we're excited to share with you.</p><p>Continue reading to discover detailed insights, practical tips, and proven strategies that will help you on your journey with Persian cats.</p>`,
  };
}

function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  // First, try to find posts with matching categories
  const categoryMatches = defaultPosts
    .filter((post) => {
      if (post.id === currentPost.id) return false;
      return post.categories.some((cat) => currentPost.categories.includes(cat));
    })
    .slice(0, limit);

  // If we don't have enough matches, fill with any other posts
  if (categoryMatches.length < limit) {
    const remaining = defaultPosts
      .filter((post) => post.id !== currentPost.id && !categoryMatches.find((p) => p.id === post.id))
      .slice(0, limit - categoryMatches.length);
    return [...categoryMatches, ...remaining];
  }

  return categoryMatches;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostById(id);

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

  const relatedPosts = getRelatedPosts(post);

  return <BlogDetail post={post} relatedPosts={relatedPosts} />;
}

