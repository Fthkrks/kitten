"use client";
import { useState } from "react";
import posts from "@/lib/posts.json";
import site from "@/lib/site.json";
export function BlogGrid() {
  const [limit, setLimit] = useState(6);
  return <section className="bg-kar-ivory py-14 sm:py-16 lg:py-20"><div className="container"><div className="grid gap-6 md:grid-cols-2">
    {posts.slice(0, limit).map(post => <article key={post.href} className="group relative flex h-full gap-4 overflow-hidden rounded-[20px] border border-kar-champagne bg-kar-ivory p-4 shadow-kar-soft motion-safe:transition motion-safe:duration-300 hover:shadow-kar-card">
      <div className="w-[38%] max-w-[190px] shrink-0"><div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"><img src={post.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105" /></div></div>
      <div className="flex min-w-0 flex-1 flex-col"><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-kar-rose">{new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(new Date(post.date + 'Z'))}</p>
        <h2 className="mt-2 font-serif text-lg leading-snug text-kar-chocolate"><a href={post.href} target="_blank" rel="noopener noreferrer" className="rounded-kar after:absolute after:inset-0 hover:text-kar-gold-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kar-gold">{post.title}</a></h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-kar-chocolate-soft">{post.excerpt}</p><span aria-hidden="true" className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-kar-rose">{site.ui.readMore} <span>→</span></span>
      </div>
    </article>)}
  </div>{limit < posts.length && <div className="load-more"><button type="button" className="primary-button" onClick={() => setLimit(posts.length)}>{site.ui.loadMore}</button></div>}</div></section>;
}
