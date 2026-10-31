# Kitten Around Ragdolls

Six-page Next.js 16.4.3 App Router clone of [Kitten Around Ragdolls](https://kittenaroundragdolls.com/), using TypeScript, Tailwind v4, Open Sans and Playfair Display through `next/font/google`.

Run `npm run dev -- --port 3000`. Validate with `npm run build` and `npm run lint`.

The only application routes are `/`, `/available-kittens`, `/our-cats`, `/adoption-process`, `/faq`, and `/blog`. Blog cards consistently open original external posts. The adoption page is informational and has no application form, backend, or submission endpoint. Newsletter Subscribe opens an email to the cattery; it does not claim to save a subscription.

All source copy, original absolute image URLs, and sanitized section markup live in `lib/*.json`. The read-only HTML inputs are in `D:/projeler/_kar_src`. `scripts/import-source.py` JSON-decodes RSC data and sanitizes the reference markup without executing any downloaded JavaScript. The verified original CSS is in `app/source.css`; local responsive chrome and interaction styles are in `app/globals.css`. Images use native `<img>` elements and their original absolute URLs.

Source mapping: home → `/`; available-kittens → `/available-kittens`; kings-and-queens → `/our-cats`; home adoption steps plus adoption-application explanatory copy → `/adoption-process`; FAQ → `/faq` (all 21 entries); blog listing → `/blog` (nine post cards from RSC data). Original kitten detail pages supplement the two local profile dialogs with photos and videos. All five full testimonials come from the public home page bundle.

Unsupported regional, community, dashboard and policy destinations are removed; relevant application/about/contact CTAs lead to `/adoption-process`. No deployment configuration or new runtime dependencies were added.
