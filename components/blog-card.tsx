import Link from "next/link";
import type posts from "@/lib/posts.json";

type BlogPost = (typeof posts)[number];

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <div className="blog-card-image">
        <img src={post.image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="blog-card-copy">
        <time dateTime={post.date}>
          {new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(new Date(post.date + "Z"))}
        </time>
        <h2><Link href={post.href}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <span aria-hidden="true" className="blog-card-read-more">Read More <span>→</span></span>
      </div>
    </article>
  );
}
