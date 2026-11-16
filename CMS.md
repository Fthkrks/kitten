# Supabase content integration

The admin is a separate project at `D:\projeler\kitten-panel`. See its `README.md` for schema, setup, environment variables, importer and owner go-live steps; `IMPLEMENTATION-REPORT.md` records the checks actually run.

This project's CMS work is on local branch `cms`.

```powershell
npm install
Copy-Item .env.example .env.local
# Fill the local Supabase keys and shared revalidation secret.
npm run dev       # port 3005
```

`lib/cms.ts` reads published content with the anon key on the server, with 60-second ISR and collection-level structured fallbacks. `POST /api/revalidate` requires the private shared bearer secret. The service-role key is used only by the server-side application insertion path. A saved application succeeds even if SMTP is unavailable; if both database insertion and admin email fail, submission returns 503.

`components/generated-content.tsx` contains layout templates compiled from the original markup; its content lives in `lib/cms-fallback.json` and Supabase. Regenerate using the panel's `scripts/generate-content.py`. Original `lib/*.json` HTML sections and the application constant remain import archives, not runtime section renderers. Article HTML is intentionally supported and sanitized.

Checks: `npm run lint`, `npm run build`, `npm run test:application`, `npm run test:cms`, `py -3 scripts/test-blog-posts.py`, and `py -3 scripts/verify-site.py http://localhost:3005`. Full-page captures and text/pixel comparisons are under `tmp/parity/{before,final-supabase,final-fallback}`; tracked summaries are in the panel's `evidence` directory.

Do not overwrite the `before` capture when rerunning comparisons against the implementation. No publishing commands are part of this workflow.
