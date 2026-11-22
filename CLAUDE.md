# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Marketing site for EdTerm (edterm.com), deployed on Vercel. `main` is the live site: hand-written static HTML pages with inline CSS/JS and no build step. All redesign work happens on the `redesign` branch; never commit to or modify `main`. edterm.com stays on `main` until the owner approves the redesign.

The full brief lives outside the repo at `../EdTerm-Site/EdTerm_Site_Brief.md` (brand assets `edinc.png` logo and `edfavcon.png` favicon are in the same folder). Read it before content or design work; it is the source of truth and wins over any design skill or general guidance.

## Redesign (in progress on `redesign`)

- Stack: Astro 7 + Tailwind CSS v4 (via `@tailwindcss/vite`), self-hosted fonts via `@fontsource`, IntersectionObserver for reveals/count-ups, Motion (motion.dev, not yet installed) only for the Home stack diagram and loop lines. No React.
- Commands: `npm run dev` (dev server, localhost:4321), `npm run build` (runs `astro check` type-check, then builds to `dist/`), `npm run preview` (serve `dist/`), `npm run check` (type-check only). No test suite.
- The legacy `*.html` files in the repo root are the old site. They are not part of the Astro build (Vercel serves `dist/`); leave them in place until launch.

### Code layout
- Design tokens live only in `src/styles/global.css` (`@theme`): colors, fluid type scale (`text-display`, `text-h1`…`text-label`), spacing (`py-section`, `gap-gutter`, `px-margin`), radii, plus the `container-site`, `grid-12` and `label` utilities. Use tokens, not raw hex or px.
- Site-wide constants (nav items, contact email, Formspree endpoint, the `NOINDEX` launch flag) are in `src/site.ts`. Nav and footer both read `NAV` from there.
- `src/layouts/BaseLayout.astro` owns `<head>` (title, description, canonical, og, robots), utility bar + sticky header, footer, skip link, and the `[data-reveal]` script. Every page uses it and passes its own `title` and `description`.
- Shared components in `src/components/`: `Hero` (label + h1 + one supporting line in the default slot), `Section` (tone white/paper/deep, layout split/stack, optional heading, `wide` slot), `ProofCard`, `CTA`, `Button`, `Logo`, `LayerBands` (the one recurring decorative motif).
- `src/assets/edterm-logo.png` is the supplied EdTerm Inc. logo with margins trimmed. It has a white background, so only place it on white or paper.
- `/styleguide` is an internal, always-noindexed component review page excluded from the sitemap. Remove it before launch.
- `astro.config.mjs` uses `build.format: 'file'` and `trailingSlash: 'never'` so pages emit as `name.html` for Vercel `cleanUrls`. The sitemap filter excludes `/pitch` and `/styleguide`.
- Pages and URLs: `/` Home, `/reasoning-layer`, `/health-systems`, `/education`, `/evidence`, `/company`, `/early-access`.
- Redirects (vercel.json): `/healthcare` → `/health-systems`, `/universities` → `/education`, `/contact` → `/early-access`, `/about` → `/company`. `vercel.json` must include `"cleanUrls": true`.
- `lis.html` (Learning Identity) is parked: leave it out of the new build and never link it.
- Early Access form posts to Formspree `https://formspree.io/f/mwvgkkvr`; contact email partners@edterm.com.
- Fonts: Plus Jakarta Sans for headlines, Inter for body, DM Mono for small labels, Playfair Display only for the founder quote.
- Color: navy `#121331`, deep `#0d0d25`, purple `#29056b` / `#4a1d9e` / `#7c3aed`, gold `#c9a84c` / `#e8c97a`, paper `#f8f7fc`. Headings on light sections are purple (`#4a1d9e`). Gold is used for text only on navy/deep backgrounds (it fails contrast on light ones). Keep the logo exactly as supplied.
- Hero copy for Home, The Reasoning Layer and For Health Systems must be the exact text in the brief (section 1a), including its bracketed guardrail edits. Do not reintroduce the original wording.
- The whole preview build is `noindex` via the meta tag, controlled by `NOINDEX` in `src/site.ts`. `public/robots.txt` allows crawling on purpose, so crawlers can see the noindex tag.
- Home hero: the Hero A headline exactly as in the brief, with the owner-approved supporting line in the hero ("EdTerm is a healthcare data infrastructure company building the reasoning layer that completes what EHRs and genomic databases cannot capture: how experienced clinicians reason through a decision before it's lost to turnover. Everyday expertise is walking out the door."). The original four-sentence Hero A subtext goes, unchanged, in the first section below the hero. Hero label: "Healthcare data infrastructure".
- Do not use the Resend, Claude Docs or Higgsfield connectors for this project.
- Workflow: design system and Home first, owner reviews screenshots, then one page at a time. Confirm with the owner before building each major section.

## The pitch page rule

- `pitch.html` (investor brief) stays in the repo. Do not delete it.
- In the Astro build it is copied unchanged into `public/` so it serves at `/pitch`. The only permitted edit is adding `<meta name="robots" content="noindex, nofollow">`.
- Never link to it from anywhere: no nav, footer, sitemap, buttons or other pages. Exclude it from any generated sitemap.
- `vercel.json` sends `X-Robots-Tag: noindex, nofollow` for `/pitch` (and `/pitch.html`) only.
- At launch, when noindex is removed from the rest of the site, `/pitch` stays noindexed.

## Hard content rules (apply to every page and every commit)

- No pricing, revenue model, licensing, raise, valuation cap or investor details anywhere on the public site.
- No full Wisdom Node structure or capture protocol; excerpts only (one short excerpt on The Reasoning Layer page).
- No node-count targets (e.g. 50,000).
- No partner or prospect names other than Lindenwood University, described as "an IRB-approved study through Lindenwood University, now open for participants."
- No new superlatives in body copy: avoid "groundbreaking," "first," "only," "world's first." The existing meta description's "world's first Human Wisdom Database" is an accepted category claim; leave it unless told otherwise.
- The methodology passed peer review (double-blind, through IAFOR). Say only that; never call it "validated" or imply more.
- Conference wording: write "Asian Conference on Education" in full wherever ACE2026 appears. On each page, the first mention is "18th Annual Asian Conference on Education (ACE2026), Tokyo, 2026"; later mentions on that page may use "Asian Conference on Education" or "ACE2026". What happened there: "Presented the Wisdom Journalism methodology as curriculum design."
- Hospital conversations are business customer validation, never research.
- "Research stage / site / initiative" and other research language appears only on the Evidence page.
- Every number is sourced on the page where it appears (e.g. $5.19M: NSI National Health Care Retention & RN Staffing Report, 2026 edition). No invented logos, quotes or customers.
- Tone: infrastructure, not product. No AI-hype or trend language ("agentic," etc.), no circuit-board or neural-net imagery. Future capabilities are written as "can reference," never "has."
- Do not name countries of active engagement. Do not use hospitality or culinary background to describe the founder. The founder quote is, verbatim: "You can read something in a book, or you can do it for 30 years. They are not the same." (set in Playfair Display italic). It replaced the earlier "I wasn't built for traditional education…" quote, which must not be used anywhere in the new site.
- Narrative: one mission, two outcomes. Data-layer story leads; education is the downstream loop from the same source. Never present health systems and universities as parallel offerings, and never describe education as a market, customer segment or revenue source. No side-by-side "For Healthcare / For Universities" cards on Home.
- Photography only if licensed and real; no stock AI imagery.

## Before launch

Set `NOINDEX = false` in `src/site.ts` (this leaves `/pitch` noindexed), delete `src/pages/styleguide.astro`, merge `redesign` into `main`, verify edterm.com, and confirm `/pitch` is unlinked and noindexed.
