# Meridian Family Health

A high-end marketing site for a modern family medicine practice, built as a portfolio piece for pitching to doctors with outdated or nonexistent websites.

**Live demo:** deploy this repo to Vercel to get a live URL (see below).

## Stack

- [Astro](https://astro.build) — static site generation
- [React](https://react.dev) — interactive islands (booking flow, mobile nav, contact form)
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [lucide-react](https://lucide.dev) — icons

## Pages

- `/` — Home
- `/about` — Practice story and facility
- `/services` — Six core services with deep-linkable sections
- `/team` — Doctor and nurse practitioner profiles
- `/reviews` — Full patient testimonials
- `/contact` — Contact form and appointment booking

## Development

```sh
npm install
npm run dev
```

Visit `http://localhost:4321`.

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm install`       | Install dependencies                        |
| `npm run dev`       | Start the local dev server                  |
| `npm run build`     | Build the static site to `./dist/`          |
| `npm run preview`   | Preview the production build locally        |
| `npx astro check`   | Type-check the project                      |

## Deploying to Vercel

This is a fully static site (`output: "static"` in `astro.config.mjs`), so it deploys to Vercel with zero configuration:

1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Vercel auto-detects the Astro framework preset (also pinned explicitly in `vercel.json`).
3. Build command `npm run build`, output directory `dist` — no environment variables required.
4. Deploy.

## Content notes

All copy, staff names, addresses, and phone numbers are fictional placeholders for demo purposes. Photography is sourced from [Unsplash](https://unsplash.com). The booking widget and contact form are fully interactive UI demos; no data is actually submitted anywhere.
