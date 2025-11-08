"use client";
import CardImage from "../_components/CardImage";

// Terms Content - Kullanıcı buraya kendi içeriğini ekleyebilir
const terms = {
  title: "Terms & Conditions",
  sections: [
    {
      heading: "Introduction",
      content: `Welcome to Ethereal Persians. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full.`,
    },
    {
      heading: "Use License",
      content: `Permission is granted to temporarily download one copy of the materials on Ethereal Persians' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
      - modify or copy the materials;
      - use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
      - attempt to decompile or reverse engineer any software contained on Ethereal Persians' website;
      - remove any copyright or other proprietary notations from the materials; or
      - transfer the materials to another person or "mirror" the materials on any other server.`,
    },
    {
      heading: "Disclaimer",
      content: `The materials on Ethereal Persians' website are provided on an 'as is' basis. Ethereal Persians makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

      Further, Ethereal Persians does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`,
    },
    {
      heading: "Privacy Policy",
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use our services. By using our website, you agree to the collection and use of information in accordance with this policy.`,
    },
    {
      heading: "Limitations",
      content: `In no event shall Ethereal Persians or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ethereal Persians' website, even if Ethereal Persians or a Ethereal Persians authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      heading: "Revisions",
      content: `The materials appearing on Ethereal Persians' website could include technical, typographical, or photographic errors. Ethereal Persians does not warrant that any of the materials on its website are accurate, complete, or current. Ethereal Persians may make changes to the materials contained on its website at any time without notice.`,
    },
    {
      heading: "Contact Information",
      content: `If you have any questions about these Terms & Conditions, please contact us through our website's contact form or by email.`,
    },
  ],
};

export default function TermsPage() {
  const cardImage = {
    heroImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=1800",
    heading: "TERMS",
    cardTitle: "TERMS & CONDITIONS",
    cardText: "Please read these terms and conditions carefully before using our services.",
    overlayColor: "rgba(0,0,0,0.15)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  };

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

