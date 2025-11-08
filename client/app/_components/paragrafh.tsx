"use client";

type Section = {
  title: string;
  paragraphs: string[];
};

type VaccineParagraphProps = {
  sections?: Section[];
  bg?: string;
};

export default function Paragrafh({
  sections = [
    {
      title: "OUR PROTOCOL & RECOMMENDATION",
      paragraphs: [
        "Vaccinations can be controversial. Some veterinarians begin a kitten series at 8–16 weeks with yearly boosters, while others prefer a measured approach once immunity is established.",
        "At our cattery we follow a veterinarian‑guided plan. We recommend the core FVRCP series with boosters, and rabies only where required by law. Decisions about FeLV and other non‑core vaccines are made individually based on lifestyle risk.",
        "Vaccines should be administered individually whenever possible to reduce the risk of vaccine reactions and to help identify sensitivity if one occurs.",
      ],
    },
    {
      title: "VACCINOSIS",
      paragraphs: [
        "Over‑vaccination has been associated with avoidable health problems in pets. Modern protocols emphasize achieving immunity, then avoiding unnecessary boosters.",
        "Work with your veterinarian to confirm appropriate timing, assess risk factors, and select only the vaccines your kitten truly needs.",
      ],
    },
  ],
  bg = "#ffffff",
}: VaccineParagraphProps) {
  return (
    <section className="w-full py-12 md:py-16" style={{ background: bg }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-[#4b5563]">
        {sections.map((s, idx) => (
          <div key={idx} className={idx === 0 ? "mb-14" : "mt-8"}>
            <h2 className="text-center font-lora text-2xl md:text-3xl text-[#5A5A5A] tracking-wide">
              {s.title}
            </h2>
            <div className="mx-auto mt-3 h-px w-28 bg-gray-200" />
            <div className="mt-6 space-y-5">
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-sm md:text-base leading-7 md:leading-8 text-gray-600">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


