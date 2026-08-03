# Justin Winartha — personal site

A single-page personal site built as one night shift. Scroll is time: the page runs 23:00 to 06:00
and the ground colour moves continuously through the night, with a pinned ledger that reconciles to
zero under your own scroll and a dawn that arrives at the end. Static HTML, CSS and JavaScript with
GSAP (ScrollTrigger + SplitText) and Lenis, all vendored locally. No framework, no build step.

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
assets/js/site.js       the hours, masked reveals, the pinned audit, contact
assets/fonts/           Bricolage Grotesque, Familjen Grotesk, JetBrains Mono, Noto Sans SC
assets/vendor/          GSAP + ScrollTrigger + SplitText, Lenis (vendored)
PRODUCT.md              product truth — who this is for and what is confirmed
DESIGN.md               the design system, recorded from the built page
```

Fonts and libraries are self-hosted rather than loaded from a CDN, so the page makes no external
request at runtime and works behind a strict content-security policy.

## Before this goes live

1. **Connect the contact form.** It validates properly but cannot send — a static page has no mail
   server. Sign up for a form service (Formspree, Basin, Netlify Forms) and set `ENDPOINT` at the
   bottom of `assets/js/site.js` to the URL it gives you. Until then the form tells visitors to use
   LinkedIn instead, which is honest but is not a substitute.
2. **Decide the audience.** The page currently serves prospective employers and prospective
   partners equally. Sharpening it toward one would make the work section considerably stronger.

## Editing content

The page is hand-written HTML; edit `index.html` directly. Two conventions matter, and `DESIGN.md`
explains the rest:

- **Every chapter declares its hour.** A `<section class="ch" data-ch data-bg data-fg data-dim
  data-accent>` is one stop in the night; the ground is interpolated between consecutive stops.
  Adding a chapter means adding a stop, and its colours must keep text readable at both ends.
- **Dawn never crossfades.** It owns an opaque ground, because interpolating background and text
  through an inversion makes them meet in the middle at 1.3:1. It arrives instead.
- **Nothing appears here that `PRODUCT.md` does not record as confirmed.** The page's credibility
  rests entirely on its statuses being true — no shipped app, no founded company, no track record
  until those exist.

## Accessibility

Contrast was sampled at 44 points across the whole night, since the palette is interpolated rather
than fixed: worst case is 4.88:1 on secondary text, with primary text never below 11.8:1.

`prefers-reduced-motion` is honoured by returning before any of it starts — no smooth scroll, no
scrubbing, no reveals — and the ledger figures render at their final values. The same path runs if
JavaScript fails, so every chapter keeps its own background and the page reads as a normal document.
Smooth scroll is also skipped on touch, so phones keep native scrolling.
