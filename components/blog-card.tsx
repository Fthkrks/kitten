import Link from "next/link";


export type BlogPost = {slug:string;href:string;title:string;date:string;image:string;excerpt:string};

export function BlogCard({ post, readMore="Read More" }: { post: BlogPost; readMore?:string }) {
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
        <span aria-hidden="true" className="blog-card-read-more">{readMore} <span>→</span></span>
      </div>
    </article>
  );
}
