import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog-card";
import fallbackPosts from "@/lib/posts.json";
import {getCms} from "@/lib/cms";
import {safeHtml} from "@/lib/safe-html";


type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fallbackPosts.map(({ slug }) => ({ slug }));
}

async function getPosts(){const {lists}=await getCms();return lists.posts.map(row=>({...row.data,title:row.name,slug:row.slug!,href:'/blog/'+row.slug,publishedAt:row.data.publishedAt,category:row.data.category,notice:row.data.notice,html:row.data.html,date:row.data.date,image:row.data.image,excerpt:row.data.excerpt}));}
async function getPost(slug:string){const posts=await getPosts();const post=posts.find(p=>p.slug===slug);if(!post)notFound();return post;}
export const revalidate=60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
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
  const post = await getPost((await params).slug);
  const {content,settings}=await getCms();
  const copy=content["post-detail.copy"];
  const posts = await getPosts();
  const otherPosts = posts.filter((candidate) => candidate.slug !== post.slug);
  const relatedPosts = otherPosts
    .filter((candidate) => candidate.category === post.category)
    .concat(otherPosts.filter((candidate) => candidate.category !== post.category))
    .slice(0, 3);

  return (
    <>
      <article className="blog-post" aria-labelledby="post-title">
        <header className="post-hero">
          <div className="container">
            <Link href="/blog" className="post-back"><span aria-hidden="true">←</span> {copy.back}</Link>
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
          <div className="post-body" dangerouslySetInnerHTML={{ __html: safeHtml(post.html) }} />
          <Link href="/blog" className="post-back post-bottom-back"><span aria-hidden="true">←</span> {copy.back_all}</Link>
        </div>
      </article>

      <section className="post-related" aria-labelledby="related-posts-heading">
        <div className="container">
          <div className="post-section-heading">
            <p className="post-eyebrow">{copy.eyebrow}</p>
            <h2 id="related-posts-heading">{copy.related_heading}</h2>
          </div>
          <div className="post-related-grid">{relatedPosts.map((post) => <BlogCard key={post.slug} post={post} readMore={settings.ui.readMore}/>)}</div>
        </div>
      </section>

      <section className="post-cta" aria-labelledby="post-cta-heading">
        <div className="container">
          <p className="post-eyebrow">{copy.cta_eyebrow}</p>
          <h2 id="post-cta-heading">{copy.cta_heading}</h2>
          <p>{copy.cta_paragraph}</p>
          <Link href={copy.cta_link} className="primary-button">{copy.cta_label} <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
