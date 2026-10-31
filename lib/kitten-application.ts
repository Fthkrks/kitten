export type KittenQuestion = {
  id: number;
  question: string;
  // In the legacy form, elective means a radio choice, not a required answer.
  isElective: boolean;
  options: string[];
};

export type KittenApplicationData = {
  title: string;
  description: string;
  questions: KittenQuestion[];
};

export const contactFields = [
  { name: "firstName", label: "First Name", type: "text", autoComplete: "given-name", maxLength: 100 },
  { name: "lastName", label: "Last Name", type: "text", autoComplete: "family-name", maxLength: 100 },
  { name: "email", label: "Email", type: "email", autoComplete: "email", maxLength: 254 },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", maxLength: 40 },
  { name: "streetAddress", label: "Street Address", type: "text", autoComplete: "street-address", maxLength: 300 },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2", maxLength: 100 },
  { name: "state", label: "State", type: "text", autoComplete: "address-level1", maxLength: 100 },
  { name: "zip", label: "Zip", type: "text", autoComplete: "postal-code", maxLength: 20 },
] as const;

export type ContactField = (typeof contactFields)[number]["name"];
export type ContactDetails = Record<ContactField, string>;
export type FieldErrors = Record<string, string>;
export const answerMaxLength = 5000;
export const applicationEmail = "astridmooncattery@gmail.com";
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const submissionUnavailableMessage = `We couldn't deliver your application. Your application has not been received. Please email ${applicationEmail} instead.`;

export function validateContactDetails(input: Record<string, unknown>) {
  const data = {} as ContactDetails;
  const errors: FieldErrors = {};
  for (const field of contactFields) {
    const raw = input[field.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    data[field.name] = value;
    if (!value) errors[field.name] = `${field.label} is required.`;
    else if (value.length > field.maxLength) errors[field.name] = `Use ${field.maxLength} characters or fewer.`;
    else if (/[\r\n\u0000-\u001f\u007f]/.test(value)) errors[field.name] = "Enter a single line of text.";
    else if (field.name === "email" && !emailPattern.test(value)) errors.email = "Enter a valid email address.";
  }
  return { data, errors };
}

export function validateAnswers(input: unknown, questions: KittenQuestion[]) {
  const answers: Record<string, string> = {};
  const errors: FieldErrors = {};
  if (input === undefined) return { answers, errors };
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { answers, errors: { questions: "Please check your answers and try again." } };
  }
  const entries = Object.entries(input);
  const knownIds = new Set(questions.map(q => String(q.id)));
  if (entries.some(([id]) => !knownIds.has(id))) {
    errors.questions = "The questions have changed. Please reload the form before submitting.";
  }
  for (const q of questions) {
    const raw = (input as Record<string, unknown>)[q.id];
    if (raw === undefined) continue;
    const key = `question-${q.id}`;
    if (typeof raw !== "string") {
      errors[key] = "Enter a valid answer.";
      continue;
    }
    const value = raw.trim();
    if (value.length > answerMaxLength) errors[key] = `Use ${answerMaxLength} characters or fewer.`;
    else if (value && q.isElective && !q.options.some(option => option.trim() === value)) errors[key] = "Choose one of the listed options.";
    else answers[q.id] = value;
  }
  return { answers, errors };
}
