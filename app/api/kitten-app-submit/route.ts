import { getAdminNotificationEmail, getEmailConfig, getUserConfirmationEmail, sendEmail } from "@/lib/email";
import { fetchKittenAppData } from "@/lib/kitten-application-data";
import { submissionUnavailableMessage, validateAnswers, validateContactDetails } from "@/lib/kitten-application";

export const runtime = "nodejs";
const maxBodyBytes = 128 * 1024;

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Please submit the application as JSON." }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    // Bound the body even when a client omits Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) {
        await reader.cancel();
        return Response.json({ error: "Your application is too long. Please shorten your answers." }, { status: 413 });
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "The application could not be read. Please try again." }, { status: 400 });
  }

  if (body.website !== undefined && (typeof body.website !== "string" || body.website.trim())) {
    return Response.json({ error: "Unable to submit this application." }, { status: 400 });
  }

  const { data: details, errors } = validateContactDetails(body);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please check the highlighted fields.", fieldErrors: errors }, { status: 400 });
  }

  const { questions } = await fetchKittenAppData();
  const { answers, errors: answerErrors } = validateAnswers(body.dynamicAnswers, questions);
  if (Object.keys(answerErrors).length) {
    return Response.json({ error: "Please check your answers.", fieldErrors: answerErrors }, { status: 400 });
  }

  const config = getEmailConfig();
  if (!config) return Response.json({ error: submissionUnavailableMessage }, { status: 503 });

  // The admin notification is the receipt. Never confirm before it is accepted.
  try {
    const content = getAdminNotificationEmail(details, questions.map(q => ({ question: q.question, answer: answers[q.id] || "" })));
    await sendEmail(config, config.admin, content, details.email);
  } catch {
    // SMTP errors can contain recipient details; do not log them or the application.
    console.error("Kitten application admin notification failed.");
    return Response.json({ error: submissionUnavailableMessage }, { status: 503 });
  }

  let confirmationSent = false;
  try {
    await sendEmail(config, details.email, getUserConfirmationEmail(details.firstName));
    confirmationSent = true;
  } catch {
    console.warn("Kitten application received; applicant confirmation could not be sent.");
  }
  return Response.json({ success: true, message: "Application received.", confirmationSent });
}
