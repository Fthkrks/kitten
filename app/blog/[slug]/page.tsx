import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog-card";
import posts from "@/lib/posts.json";
import content from "@/lib/posts/content.json";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

function getPost(slug: string) {
  const post = posts.find((post) => post.slug === slug);
  if (!post) notFound();
  return { ...post, ...content[post.slug as keyof typeof content] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  const title = `${post.title} | Astrid Moon Cattery`;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      siteName: "Astrid Moon Cattery",
      publishedTime: post.publishedAt,
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  const otherPosts = posts.filter((candidate) => candidate.slug !== post.slug);
  const relatedPosts = otherPosts
    .filter((candidate) => content[candidate.slug as keyof typeof content].category === post.category)
    .concat(otherPosts.filter((candidate) => content[candidate.slug as keyof typeof content].category !== post.category))
    .slice(0, 3);

  return (
    <>
      <article className="blog-post" aria-labelledby="post-title">
        <header className="post-hero">
          <div className="container">
            <Link href="/blog" className="post-back"><span aria-hidden="true">←</span> Back to the blog</Link>
            <div className="post-heading">
              <p className="post-eyebrow">
                <span>{post.category}</span><span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(post.publishedAt))}</time>
              </p>
              <h1 id="post-title">{post.title}</h1>
              <p className="post-summary">{post.excerpt}</p>
            </div>
            <div className="post-featured-image">
              <img src={post.image} alt={post.title} fetchPriority="high" decoding="async" />
            </div>
          </div>
        </header>
        <div className="post-reading-area container">
          {post.notice && <aside className="post-notice" aria-label="Archived giveaway">{post.notice}</aside>}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          <Link href="/blog" className="post-back post-bottom-back"><span aria-hidden="true">←</span> Back to all articles</Link>
        </div>
      </article>

      <section className="post-related" aria-labelledby="related-posts-heading">
        <div className="container">
          <div className="post-section-heading">
            <p className="post-eyebrow">From the blog</p>
            <h2 id="related-posts-heading">A little more Ragdoll reading</h2>
          </div>
          <div className="post-related-grid">{relatedPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
        </div>
      </section>

      <section className="post-cta" aria-labelledby="post-cta-heading">
        <div className="container">
          <p className="post-eyebrow">Astrid Moon Cattery · Austin, Texas</p>
          <h2 id="post-cta-heading">Ready to welcome a Ragdoll?</h2>
          <p>Tell us about your home and the companion you’re hoping to find.</p>
          <Link href="/kitten-application" className="primary-button">Apply for a Kitten <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
