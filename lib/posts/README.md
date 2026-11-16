# Local blog articles

The nine complete article bodies in `content.json` were imported from the source
WordPress REST API on November 16, 2026. Next.js reads this file at build time;
there is no runtime article fetch. Images retain absolute source URLs.
`provenance.json` records each REST endpoint, source modification time, original
HTML SHA-256, and unsupported destinations whose text was retained without links.

To repeat the import, run `py -3 scripts/import-blog-posts.py` (BeautifulSoup is
required, as with the existing source importer). Raw responses are cached under
ignored `tmp/blog-source`; existing responses are not downloaded again.

Adaptations:

- Cattery mentions use Astrid Moon Cattery; Sacramento / Greater Sacramento Area
  become Austin, Texas; Northern California service copy becomes Central Texas.
  Washington locations and Washington import requirements remain unchanged.
- Source cattery emails become astridmooncattery@gmail.com; the old telephone
  number is removed if present. Cat names, quotes and external references remain.
- Application/waitlist links point to `/kitten-application`, kings-and-queens to
  `/our-cats`, companion-kitten information to `/adoption-process`. The nine local
  articles link to `/blog/<slug>`. Other unsupported internal destinations are
  unlinked, including articles outside these nine, about/contact, regional
  landing pages, terms and privacy. Their text remains; no replacement article,
  legal policy or regional page was invented.
- The giveaway deadline was October 25, 2026. Its full source text is retained
  with an archive notice. Source Google entry forms, giveaway rules and privacy
  documents are unlinked. Prize, eligibility, deadlines, manufacturer and photo
  credits are unchanged. These source-specific services were not migrated.
- An allowlist strips executable elements, non-YouTube iframes, inline handlers,
  source styles and tracking attributes/parameters. YouTube embeds, if present,
  use youtube-nocookie.com. Tables receive a scrolling wrapper for mobile.
