"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { answerMaxLength, applicationEmail, contactFields, submissionUnavailableMessage, validateAnswers, validateContactDetails, type FieldErrors, type KittenQuestion } from "@/lib/kitten-application";

export function KittenApplicationForm({ questions }: { questions: KittenQuestion[] }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(true);
  const pending = useRef(false);
  const status = useRef<HTMLDivElement>(null);

  function showErrors(next: FieldErrors, form: HTMLFormElement) {
    setErrors(next);
    const first = form.elements.namedItem(Object.keys(next)[0]);
    if (first instanceof HTMLElement) first.focus();
    else status.current?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const contact = validateContactDetails(Object.fromEntries(values));
    const dynamicAnswers = Object.fromEntries(questions.flatMap(q => [[q.id, values.get(`question-${q.id}`) || ""], ...(q.note ? [[`${q.id}-note`, values.get(`question-${q.id}-note`) || ""]] : [])]));
    const checkedAnswers = validateAnswers(dynamicAnswers, questions);
    const nextErrors = { ...contact.errors, ...checkedAnswers.errors };
    setSubmitError("");
    if (Object.keys(nextErrors).length) {
      showErrors(nextErrors, form);
      return;
    }
    setErrors({});
    pending.current = true;
    setSubmitting(true);
    try {
      const response = await fetch("/api/kitten-app-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact.data, dynamicAnswers: checkedAnswers.answers, website: values.get("website") || "" }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        if (result.fieldErrors) showErrors(result.fieldErrors, form);
        setSubmitError(result.error || submissionUnavailableMessage);
        return;
      }
      setConfirmationSent(result.confirmationSent === true);
      setSuccess(true);
      status.current?.focus();
    } catch {
      setSubmitError(`We couldn't confirm delivery. Please email ${applicationEmail} to check whether your application was received.`);
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  }

  return <div className="application-card">
    <div ref={status} tabIndex={-1} className={`application-status${success ? " application-success" : ""}`} role="status" aria-live="polite" aria-atomic="true">
      {success && <>
        <span className="application-success-icon" aria-hidden="true">✓</span>
        <h2>Thank you for your application!</h2>
        <p>We have received your application and will carefully review it. Please allow 1–3 business days for us to get back to you.</p>
        {!confirmationSent && <p>Your application reached us, but we couldn’t send your confirmation email. You don’t need to submit again.</p>}
        <Link href="/" className="primary-button">Return to Homepage</Link>
      </>}
      {!success && Object.keys(errors).length > 0 && <p className="application-error-summary">Please check the highlighted fields below. {errors.questions}</p>}
    </div>
    {!success && <form onSubmit={handleSubmit} noValidate aria-busy={submitting} onChange={event => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
      const key = target.name;
      if (errors[key]) setErrors(current => { const next = { ...current }; delete next[key]; return next; });
    }}>
      <fieldset disabled={submitting} className="application-fields">
        <legend className="application-section-title">A little about you</legend>
        <p className="application-form-note">All contact and address fields and questions marked with * are required. Please share as much as you can in the questions below.</p>
        <div className="application-contact-grid">
          {contactFields.map(field => <div key={field.name} className={`application-field application-field-${field.name}`}>
            <label htmlFor={`application-${field.name}`}>{field.label} <span aria-hidden="true">*</span></label>
            <input id={`application-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} required maxLength={field.maxLength} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `application-${field.name}-error` : undefined} />
            {errors[field.name] && <p id={`application-${field.name}-error`} className="application-field-error">{errors[field.name]}</p>}
          </div>)}
        </div>
        <div className="application-honeypot" aria-hidden="true">
          <label htmlFor="application-website">Leave this field empty</label>
          <input id="application-website" name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
        </div>
        <h2 className="application-section-title application-questions-title">Your home &amp; your future kitten</h2>
        <div className="application-questions">
          {questions.map((q, index) => {
            const name = `question-${q.id}`;
            const error = errors[name];
            const required = q.question.includes("*");
            return <fieldset key={q.id} className="application-question" data-question-id={q.id} aria-describedby={error ? `${name}-error` : undefined}>
              <legend><span className="application-question-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{q.isElective ? q.question : <label htmlFor={name}>{q.question}</label>}</legend>
              {q.isElective ? <><div className="application-options">{q.options.map((option, optionIndex) => <label key={`${q.id}-${optionIndex}`} className="application-option" htmlFor={`${name}-${optionIndex}`}>
                <input id={`${name}-${optionIndex}`} name={name} type="radio" value={option} required={required} />
                <span>{option}</span>
              </label>)}</div>{q.note && <div className="application-note-field">
                <p className="application-note" id={`${name}-note-text`}>{q.note}</p>
                <label htmlFor={`${name}-note`}>Your note (optional)</label>
                <textarea id={`${name}-note`} name={`${name}-note`} rows={3} maxLength={answerMaxLength} placeholder="Anything you'd like us to know about your color preference" aria-invalid={!!errors[`${name}-note`]} aria-describedby={[`${name}-note-text`, errors[`${name}-note`] && `${name}-note-error`].filter(Boolean).join(" ")} />
                {errors[`${name}-note`] && <p id={`${name}-note-error`} className="application-field-error">{errors[`${name}-note`]}</p>}
              </div>}</> : <textarea id={name} name={name} rows={4} required={required} maxLength={answerMaxLength} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} />}
              {error && <p id={`${name}-error`} className="application-field-error">{error}</p>}
            </fieldset>;
          })}
        </div>
      </fieldset>
      <div aria-live="assertive" aria-atomic="true">
        {submitError && <div className="application-submit-error"><p>{submitError}</p><a href={`mailto:${applicationEmail}`}>Email {applicationEmail}</a></div>}
      </div>
      <div className="application-submit-row">
        <button type="submit" className="primary-button application-submit" disabled={submitting}>
          {submitting && <span className="application-spinner" aria-hidden="true" />}{submitting ? "Submitting…" : "Submit Application"}
        </button>
        <p>Please allow 1–3 business days for a personal reply.</p>
      </div>
      <noscript><p>Please enable JavaScript to submit this form, or email <a href={`mailto:${applicationEmail}`}>{applicationEmail}</a>.</p></noscript>
    </form>}
  </div>;
}
