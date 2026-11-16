import Link from "next/link";

export default function PostNotFound() {
  return (
    <section className="post-not-found container">
      <p className="post-eyebrow">Astrid Moon Cattery Blog</p>
      <h1>Article not found</h1>
      <p>The article you’re looking for isn’t here. Explore our Ragdoll stories and care guides.</p>
      <Link href="/blog" className="primary-button">Back to the blog</Link>
    </section>
  );
}
