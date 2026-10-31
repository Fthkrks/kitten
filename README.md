# Kitten Around Ragdolls

Next.js 16.4.3 App Router site based on [Kitten Around Ragdolls](https://kittenaroundragdolls.com/), using TypeScript, Tailwind v4, Open Sans and Playfair Display through `next/font/google`.

Run `npm run dev -- --port 3000`. Validate with `npm run build` and `npm run lint`.

Run `npm run test:application` for isolated validation, Strapi fallback, and SMTP failure regression tests (no real email is sent). With Python Playwright installed, the old site on port 3002, the new dev server on port 3000, and email credentials unset, run `py -3 scripts/verify-kitten-application.py` to compare the rendered questions and check desktop/mobile CTAs, validation, loading, and result states. Screenshots and the browser report are written under the ignored `tmp/qa` directory.

The six navigation pages are `/`, `/available-kittens`, `/our-cats`, `/adoption-process`, `/faq`, and `/blog`. Application CTAs open `/kitten-application`, without adding a seventh navigation link. Blog cards consistently open original external posts. Newsletter Subscribe opens an email to the cattery; it does not claim to save a subscription.

The kitten application loads its title, description, and questions server-side from `/api/kitten-app?populate=*` on Strapi, revalidating every 60 seconds. Set `NEXT_PUBLIC_API_BASE_URL` or `API_BASE_URL` to override the default `https://astridmoonadminpanel.store` (`NEXT_PUBLIC_API_BASE_URL` takes precedence). If the API fails or returns unusable questions, the two legacy fallback questions are shown. Like the old form, all eight contact/address fields are required; dynamic questions are optional, with `isElective` selecting radio options versus a textarea. Every Strapi option is preserved.

Copy `.env.example` to `.env.local` and configure these server-only variables before accepting applications:

- `EMAIL_USER`: Gmail sender address.
- `EMAIL_PASSWORD`: Gmail app password for the sender.
- `ADMIN_EMAIL`: Single email address that receives full applications.

Restart the server after changing email configuration. `nodemailer` sends through Gmail SMTP with verified TLS. `POST /api/kitten-app-submit` trims and validates required fields, email format, lengths, question options, and a honeypot. Applicant text is HTML-escaped in email and is never logged. Missing email configuration or a failed admin notification returns HTTP 503 and directs the applicant to `astridmooncattery@gmail.com`; no success is shown until the admin email is accepted. The confirmation email is sent afterwards; if it fails, the application is still received and the page says no resubmission is needed. Applications are delivered by email; there is no database or file storage.

All source copy, original absolute image URLs, and sanitized section markup live in `lib/*.json`. The read-only HTML inputs are in `D:/projeler/_kar_src`. `scripts/import-source.py` JSON-decodes RSC data and sanitizes the reference markup without executing any downloaded JavaScript. The verified original CSS is in `app/source.css`; local responsive chrome and interaction styles are in `app/globals.css`. Images use native `<img>` elements and their original absolute URLs.

Source mapping: home → `/`; available-kittens → `/available-kittens`; kings-and-queens → `/our-cats`; home adoption steps plus adoption-application explanatory copy → `/adoption-process`; FAQ → `/faq` (all 21 entries); blog listing → `/blog` (nine post cards from RSC data). Original kitten detail pages supplement the two local profile dialogs with photos and videos. All five full testimonials come from the public home page bundle.

Unsupported regional, community, dashboard and policy destinations are removed. Application and waitlist CTAs lead to `/kitten-application`; informational adoption links lead to `/adoption-process`. No deployment configuration was added.
