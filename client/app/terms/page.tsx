import CardImage from "../_components/CardImage";
import { fetchTermsPageData } from "@/services/api";

export default async function TermsPage() {
  const { cardImage, termsContent: terms } = await fetchTermsPageData();

  return (
    <div className="w-full bg-white">
      <CardImage {...cardImage} />
      
      <section className="w-full py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="font-lora text-4xl md:text-5xl text-[#3a2b28] mb-4 font-bold">
              {terms.title}
            </h1>
            <div className="mx-auto h-px w-32 bg-gray-300" />
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {terms.sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h2 className="font-lora text-2xl md:text-3xl text-[#3a2b28] mb-4 font-semibold">
                  {section.heading}
                </h2>
                <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </section>
    </div>
  );
}

