import type { Metadata } from "next";
import { KittenApplicationForm } from "@/components/kitten-application-form";
import { fetchKittenAppData } from "@/lib/kitten-application-data";

export const metadata: Metadata = {
  title: "Kitten Application | Astrid Moon Cattery",
  description: "Tell us about your home and the kitten you hope to welcome. Apply for a kitten from Astrid Moon Cattery.",
};

export const revalidate = 60;

export default async function KittenApplicationPage() {
  const data = await fetchKittenAppData();
  return <section className="kitten-application" aria-labelledby="kitten-application-heading">
    <div className="container">
      <header className="application-heading">
        <p className="application-eyebrow">{data.eyebrow}</p>
        <h1 id="kitten-application-heading">{data.title}</h1>
        <div className="application-divider" aria-hidden="true"><span /><svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 0 12 6 6 12 0 6Z" fill="currentColor" /></svg><span /></div>
        <p className="application-description">{data.description}</p>
      </header>
      <KittenApplicationForm questions={data.questions} />
    </div>
  </section>;
}
