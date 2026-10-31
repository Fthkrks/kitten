import nodemailer from "nodemailer";
import { applicationEmail, contactFields, emailPattern, type ContactDetails } from "@/lib/kitten-application";

export type EmailConfig = { user: string; password: string; admin: string };
export type AnsweredQuestion = { question: string; answer: string };

export function getEmailConfig(): EmailConfig | null {
  const user = process.env.EMAIL_USER?.trim();
  const password = process.env.EMAIL_PASSWORD?.trim();
  const admin = process.env.ADMIN_EMAIL?.trim();
  return user && password && admin && emailPattern.test(user) && emailPattern.test(admin) ? { user, password, admin } : null;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function emailLayout(title: string, content: string) {
  return `<!doctype html><html lang="en"><body style="margin:0;background:#F8EEFB;font:15px/1.7 Arial,sans-serif;color:#4A2A57"><div style="max-width:680px;margin:24px auto;padding:28px;background:#FDFAFE;border:1px solid #E9D5F0;border-radius:20px"><h1 style="font:28px Georgia,serif;color:#8E3FA8">${title}</h1>${content}<p style="border-top:1px solid #E9D5F0;padding-top:20px">Astrid Moon Cattery<br><a href="mailto:${applicationEmail}" style="color:#8E3FA8">${applicationEmail}</a></p></div></body></html>`;
}

export function getUserConfirmationEmail(firstName: string) {
  return {
    subject: "Application Received - Astrid Moon Cattery",
    html: emailLayout("Your application has arrived", `<p>Dear ${escapeHtml(firstName)},</p><p>Thank you for submitting your kitten application to Astrid Moon Cattery!</p><p>We have received your application and will review it carefully. Please allow 1–3 business days for us to get back to you.</p><p>If you have any questions in the meantime, feel free to contact us.</p>`),
    text: `Dear ${firstName},\n\nThank you for submitting your kitten application to Astrid Moon Cattery!\n\nWe have received your application and will review it carefully. Please allow 1–3 business days for us to get back to you.\n\nAstrid Moon Cattery\n${applicationEmail}`,
  };
}

export function getAdminNotificationEmail(details: ContactDetails, questions: AnsweredQuestion[]) {
  const contactHtml = contactFields.map(field => `<p><strong>${field.label}:</strong> ${escapeHtml(details[field.name])}</p>`).join("");
  const questionsHtml = questions.map(q => `<div style="margin:20px 0"><strong>${escapeHtml(q.question)}</strong><p style="white-space:pre-wrap">${escapeHtml(q.answer || "Not answered")}</p></div>`).join("");
  return {
    subject: `New Kitten Application - ${details.firstName} ${details.lastName}`,
    html: emailLayout("New Kitten Application", `<h2>Contact information</h2>${contactHtml}<h2>Questions &amp; answers</h2>${questionsHtml}`),
    text: `New Kitten Application\n\nCONTACT INFORMATION\n${contactFields.map(field => `${field.label}: ${details[field.name]}`).join("\n")}\n\nQUESTIONS & ANSWERS\n${questions.map(q => `${q.question}\nAnswer: ${q.answer || "Not answered"}`).join("\n\n")}`,
  };
}

export async function sendEmail(config: EmailConfig, to: string, content: { subject: string; html: string; text: string }, replyTo?: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  const info = await transporter.sendMail({
    from: { name: "Astrid Moon Cattery", address: config.user },
    to,
    replyTo,
    ...content,
  });
  if (!info.accepted?.length || info.rejected?.length) throw new Error("Email recipient was not accepted");
}
