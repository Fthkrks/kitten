import type { KittenApplicationData, KittenQuestion } from "@/lib/kitten-application";

// Keep the legacy fallback copy and questions when Strapi is unavailable.
export const fallbackKittenApplication: KittenApplicationData = {
  title: "KITTEN APPLICATION",
  description: "Welcome to our kitten application form. This is the first step towards adopting a beautiful, healthy, lifelong companion. The information marked with a star is a required field. Please allow 1-3 business days for us to get back to you. If you intend to place a deposit on a kitten please wait until you hear back from us unless you are sure you are the perfect match and your application will be approved. Remember that all deposits are nonrefundable.",
  questions: [
    { id: 1, question: "If you have other pets in your home, please briefly describe them (i.e. Age, Breed, Personality)", isElective: false, options: [] },
    { id: 2, question: "Do children live in your home?", isElective: true, options: ["Yes", "No", "On the way"] },
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export async function fetchKittenAppData(): Promise<KittenApplicationData> {
  try {
    const base = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "https://astridmoonadminpanel.store").replace(/\/+$/, "");
    const response = await fetch(`${base}/api/kitten-app?populate=*`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Kitten application API unavailable");
    const payload: unknown = await response.json();
    if (!isRecord(payload) || !isRecord(payload.data)) throw new Error("Invalid application data");
    const data = isRecord(payload.data.attributes) ? payload.data.attributes : payload.data;
    if (!Array.isArray(data.KittenQuestion) || !data.KittenQuestion.length) throw new Error("Missing application questions");
    const questions: KittenQuestion[] = data.KittenQuestion.map((q: unknown) => {
      if (!isRecord(q) || typeof q.id !== "number" || !Number.isSafeInteger(q.id) || typeof q.Question !== "string" || !q.Question.trim()) {
        throw new Error("Invalid application question");
      }
      // Object.values deliberately includes every option, as in the old page.
      const options = q.Options && typeof q.Options === "object" ? Object.values(q.Options) : [];
      if (options.some(option => typeof option !== "string") || (q.isElective === true && !options.length)) throw new Error("Invalid application options");
      return { id: q.id, question: q.Question, isElective: q.isElective === true, options: options as string[] };
    });
    if (new Set(questions.map(q => q.id)).size !== questions.length) throw new Error("Duplicate application questions");
    return {
      title: typeof data.label === "string" && data.label.trim() ? data.label : "KITTEN APPLICATION",
      description: typeof data.Desc === "string" && data.Desc.trim() ? data.Desc : "Welcome to our kitten application form.",
      questions,
    };
  } catch {
    console.warn("Kitten application questions unavailable; using the legacy fallback.");
    return fallbackKittenApplication;
  }
}
