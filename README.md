# ND Softlabs

The website for ND Softlabs, a software studio by Naveen Kavindu Dilshan.
Built with Next.js (App Router), React, Tailwind CSS, Motion and Lenis.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Layout

- `src/app/` — routes: `/`, `/work`, `/work/[slug]`, `/contact`
- `src/lib/content.ts` — all copy, projects, reviews, pricing and contact details in one place
- `src/components/` — page sections plus the shared motion pieces
- `public/img/`, `public/videos/` — project screenshots, logos and case-study videos

## Editing content

- **Projects:** add an entry to `caseStudies.items` in `src/lib/content.ts`. A
  project with a `video` shows the video on its page in place of the screenshot.
- **Reviews:** entries in `testimonials.items` stay hidden on the live site
  until `approved: true`.
- **Contact:** `site.email` and `site.whatsapp` in `src/lib/content.ts`.

## Notes

- The contact form has no backend; it opens an email to `site.email`.
