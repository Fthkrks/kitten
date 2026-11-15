import type { KittenApplicationData, KittenQuestion } from "@/lib/kitten-application";

// Preserve the cached legacy Strapi form when the admin server is unavailable.
export const fallbackKittenApplication: KittenApplicationData = {
  "title": "Kitten Application",
  "description": "Welcome to our kitten application form. This is the first step towards acquiring a beautiful, healthy, lifelong companion. The information marked with a star is a required field. Please allow 1-3 business days for us to get back to you. If you intend to place a deposit on a kitten please wait until you hear back from us unless you are sure you are the perfect match and your application will be approved. Remember that all deposits are nonrefundable.",
  "questions": [
    {
      "id": 532,
      "question": "Which coat length are you interested in?",
      "isElective": true,
      "options": [
        "British Longhair",
        "British Shorthair",
        "No preference"
      ]
    },
    {
      "id": 533,
      "question": "Do you have a color preference?",
      "isElective": true,
      "options": [
        "Black Golden",
        "Blue Golden",
        "No preference",
        "Please note: We do not maintain separate waitlists or accept requests specifically for shaded vs. chinchilla. Individual golden tones and patterns vary, and availability cannot be guaranteed based on a specific shade or pattern."
      ]
    },
    {
      "id": 534,
      "question": "Do you have a gender preference?",
      "isElective": true,
      "options": [
        "Female",
        "Male",
        "No preference"
      ]
    },
    {
      "id": 535,
      "question": "Are you looking for one or two kittens? *",
      "isElective": true,
      "options": [
        "One",
        "Two",
        "Crazy cat lady starter package"
      ]
    },
    {
      "id": 536,
      "question": "Are you looking for a pet or breeding rights?",
      "isElective": false,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 537,
      "question": "Tell us a little about your household.",
      "isElective": false,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 538,
      "question": "Do other pets currently live in your home? *",
      "isElective": true,
      "options": [
        "Yes, I have fur babies",
        "No"
      ]
    },
    {
      "id": 539,
      "question": "If you have other pets in your home, please briefly describe them (i.e. Age, .Breed, Personality)",
      "isElective": false,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 540,
      "question": "Do children live in your home? ",
      "isElective": true,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 541,
      "question": "If children live with you what are their ages?",
      "isElective": false,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 542,
      "question": "Have you reviewed our pricing and reservation deposit? Our kittens are $3,000, with an $800 non-refundable reservation deposit applied toward the total purchase price.",
      "isElective": true,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 543,
      "question": "When are you looking to add your new kitten(s) to the family? *",
      "isElective": true,
      "options": [
        "Within three months",
        "In three to six months",
        "In six to twelve months"
      ]
    },
    {
      "id": 544,
      "question": "If your preferred kitten isn’t currently available, would you like to be added to our free waitlist?",
      "isElective": true,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 545,
      "question": "If the right kitten becomes available, are you prepared to move forward with a reservation?",
      "isElective": true,
      "options": [
        "Yes",
        "Not yet",
        "I’m currently researching"
      ]
    },
    {
      "id": 546,
      "question": "Where would you like to pick up your kitten? *",
      "isElective": true,
      "options": [
        "Austin, Texas",
        "Will require shipping"
      ]
    },
    {
      "id": 547,
      "question": "If shipped, into which airport?",
      "isElective": false,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 548,
      "question": "Is there anything else you’d like us to know or any questions you’d like us to answer?",
      "isElective": false,
      "options": [
        "yes",
        "no"
      ]
    },
    {
      "id": 549,
      "question": "How did you find us?",
      "isElective": false,
      "options": [
        "yes",
        "no"
      ]
    }
  ]
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeCopy(value: string): string {
  return value.replace(/\uFFFD/g, "\u2019");
}

export async function fetchKittenAppData(): Promise<KittenApplicationData> {
  try {
    const base = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "https://astridmoonadminpanel.store").replace(/\/+$/, "");
    const response = await fetch(`${base}/api/kitten-app?populate=*`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
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
      return { id: q.id, question: normalizeCopy(q.Question), isElective: q.isElective === true, options: (options as string[]).map(normalizeCopy) };
    });
    if (new Set(questions.map(q => q.id)).size !== questions.length) throw new Error("Duplicate application questions");
    return {
      title: typeof data.label === "string" && data.label.trim() ? normalizeCopy(data.label) : fallbackKittenApplication.title,
      description: typeof data.Desc === "string" && data.Desc.trim() ? normalizeCopy(data.Desc) : fallbackKittenApplication.description,
      questions,
    };
  } catch {
    console.warn("Kitten application questions unavailable; using the legacy fallback.");
    return fallbackKittenApplication;
  }
}
