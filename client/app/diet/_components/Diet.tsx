"use client";
import Image from "next/image";

type DietCard = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

type FeedingItem = {
  label: string;
  detail: string;
};

type DietProps = {
  title?: string;
  subtitle?: string;
  coverImage?: string;
  highlights?: DietCard[];
  feedingSchedule?: FeedingItem[];
  dos?: string[];
  donts?: string[];
  bg?: string;
};

export default function Diet({
  title = "Everyday Diet Guidelines",
  subtitle = "Moisture‑rich, meat‑forward meals for happy Persians",
  coverImage = "https://images.unsplash.com/photo-1604908554039-913b1b90a44b?auto=format&fit=crop&q=80&w=1600",
  highlights = [
    { title: "Hydration First", description: "Wet food or added water/goat milk supports urinary health." },
    { title: "Quality Proteins", description: "Poultry/rabbit based recipes are gentle for most stomachs." },
    { title: "Small & Frequent", description: "3–4 meals daily for kittens; 2–3 for adults." },
  ],
  feedingSchedule = [
    { label: "Kittens (8–16 wks)", detail: "3–4 small wet meals/day; free‑access water" },
    { label: "Juveniles (4–12 mo)", detail: "3 wet meals/day; adjust portions to body condition" },
    { label: "Adults", detail: "2–3 wet meals/day; optional measured dry as topper" },
  ],
  dos = [
    "Transition new foods slowly over 5–7 days",
    "Keep bowls spotless; replace water daily",
    "Consult your vet for special needs (allergies, weight, kidneys)",
  ],
  donts = [
    "Don’t free‑feed rich dry foods to young kittens",
    "Avoid sudden recipe changes",
    "No cooked bones, onions, garlic, or xylitol",
  ],
  bg = "#F4FCFD",
}: DietProps) {
  return (
    <section className="w-full py-12 md:py-16" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-lora text-2xl md:text-3xl text-[#5A5A5A]">{title}</h2>
          <p className="text-sm md:text-base text-gray-600 mt-2">{subtitle}</p>
        </div>

        {/* Cover */}
        <div className="relative w-full h-[220px] md:h-[340px] rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-10">
          <Image src={coverImage} alt={title} fill className="object-cover" priority />
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
                <div className="text-[#5A5A5A] font-lora text-lg mb-2">{h.title}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Feeding schedule */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8 mb-10">
          <h3 className="font-lora text-lg text-[#5A5A5A] mb-4">Feeding Schedule</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {feedingSchedule.map((f, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <div className="text-sm font-semibold text-gray-800">{f.label}</div>
                <div className="text-sm text-gray-600 mt-1">{f.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Do / Don't */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
            <h4 className="text-sm font-semibold text-[#3B7F3B] mb-2">Do</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {dos.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
            <h4 className="text-sm font-semibold text-[#9A3A3A] mb-2">Don’t</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {donts.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


