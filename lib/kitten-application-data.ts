import type { KittenApplicationData } from "@/lib/kitten-application";

// Public import archive used by the seed generator. Runtime reads Supabase or cms-fallback.json.
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

export async function fetchKittenAppData(): Promise<KittenApplicationData> {
 const {getApplication}=await import('./cms');return getApplication();
}
