"use client";
import Image from "next/image";

type Ingredient = {
  name: string;
  amount?: string;
  note?: string;
};

type RecipeProps = {
  title?: string;
  subtitle?: string;
  coverImage?: string;
  gallery?: string[];
  ingredients?: Ingredient[];
  recipeText?: string;
  tips?: string[];
  bg?: string;
};

export default function Recipe({
  title = "Starter Kitten Recipe",
  subtitle = "Balanced, gentle and easy to transition",
  coverImage = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600",
  gallery = [
    "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200&h=800",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200&h=800",
  ],
  ingredients = [
    { name: "High‑quality wet food (poultry or rabbit)", amount: "70%", note: "primary moisture & protein" },
    { name: "Gently cooked boneless meat", amount: "20%", note: "finely minced" },
    { name: "Pumpkin purée", amount: "5%", note: "digestive support" },
    { name: "Goat milk or water", amount: "5%", note: "adjust texture" },
    { name: "Fish oil or omega blend", amount: "1 tsp", note: "skin & coat" },
  ],
  recipeText = "Warm wet food to room temperature. Finely mince the cooked meat so there are no large pieces. Mix the ingredients in a clean bowl. Add goat milk or water until you reach a pâté‑like texture. Offer small, frequent meals. Refrigerate portions for up to 24h; discard leftovers left out >30 minutes.",
  tips = [
    "Transition gradually over 5–7 days to avoid tummy upset.",
    "Provide fresh water at all times; kittens need moisture‑rich diets.",
    "Consult your veterinarian before making any diet changes.",
  ],
  bg = "#FFF8EE",
}: RecipeProps) {
  return (
    <section className="w-full py-12 md:py-16" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-lora text-2xl md:text-3xl text-[#5A5A5A]">{title}</h2>
          <p className="text-sm md:text-base text-gray-600 mt-2">{subtitle}</p>
        </div>

        {/* Cover */}
        <div className="relative w-full h-[240px] md:h-[360px] rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-10">
          <Image src={coverImage} alt={title} fill className="object-cover" priority />
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {/* Ingredients */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
            <h3 className="font-lora text-lg text-[#5A5A5A] mb-4">Ingredients</h3>
            <ul className="space-y-3">
              {ingredients.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#E2B38A]" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{item.name}</p>
                    <div className="text-xs text-gray-500">{item.amount}{item.note ? ` • ${item.note}` : ""}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recipe Instructions */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
            <h3 className="font-lora text-lg text-[#5A5A5A] mb-4">Instructions</h3>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {recipeText}
            </div>

            {/* Tips */}
            {tips.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-[#5A5A5A] mb-2">Tips</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {gallery.map((src, i) => (
              <div key={i} className="relative w-full h-[220px] md:h-[300px] rounded-xl overflow-hidden border border-gray-200">
                <Image src={src} alt={`recipe-${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


