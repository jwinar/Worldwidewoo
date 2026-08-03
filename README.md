# Justin Winartha — personal site

A single-page personal site built as a split-flap departure board. Static HTML, CSS and JavaScript
with GSAP; no build step, no framework, no dependencies to install.

## Run it

Any static server will do:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from the filesystem also works, though some browsers restrict local
font loading over `file://`.

## Deploy

Upload the repository root as-is to any static host — GitHub Pages, Netlify, Cloudflare Pages,
Vercel. There is nothing to compile.

## What's here

```
index.html              the page
assets/css/site.css     design tokens and all styling
assets/js/site.js       split-flap engine, scroll choreography, form
assets/fonts/           Archivo, Martian Mono, Noto Sans SC (self-hosted, subset)
assets/img/             portrait, webp + jpg
assets/vendor/          GSAP 3.15 + ScrollTrigger, vendored locally
PRODUCT.md              product truth — who this is for and what is confirmed
DESIGN.md               the design system, recorded from the built page
```

Fonts and GSAP are self-hosted rather than loaded from a CDN, so the page has no third-party
runtime dependencies and works behind a strict content-security policy.

## Before this goes live

1. **Connect the contact form.** It validates properly but cannot send — a static page has no mail
   server. Sign up for a form service (Formspree, Basin, Netlify Forms) and set `ENDPOINT` at the
   bottom of `assets/js/site.js` to the URL it gives you. Until then the form tells visitors to use
   LinkedIn instead, which is honest but is not a substitute.
2. **Confirm the location.** The page states "Sydney, Australia" in the hero caption and the footer.
   That was inferred from the +61 number and the University of Sydney and W Hotels roles, not
   confirmed directly. Correct or remove it if it is wrong.
3. **Re-read the dates.** Every role is written in the past tense, with Room Controller ending
   April 2026 and Exam Supervision Officer ending "2026" — replace that with the real month.

## Editing content

The page is hand-written HTML; edit `index.html` directly. Two conventions matter, and `DESIGN.md`
explains the rest:

- **Every item carries a status.** `chip--live`, `chip--sched`, `chip--study`, `chip--past`. An item
  with no status does not belong on this board.
- **Nothing appears here that `PRODUCT.md` does not record as confirmed.** The board's credibility
  rests entirely on its statuses being true — no shipped app, no founded company, no track record
  until those exist.

## Accessibility

WCAG AA contrast on both grounds, keyboard-operable throughout with a ground-aware focus ring, and
`prefers-reduced-motion` honoured everywhere — under reduced motion the split-flap text renders
instantly and all content stays visible. The split-flap cells are `aria-hidden` with the whole word
carried on the container, so a screen reader reads "Justin Winartha" rather than spelling it out.
