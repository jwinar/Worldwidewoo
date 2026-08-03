# Justin Winartha — personal site

A single-page personal site: a dark/light, grain-lit surface with a bento grid of work. Static HTML,
CSS and JavaScript with GSAP; no build step, no framework, no dependencies to install.

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
assets/css/site.css     theme tokens and all styling
assets/js/site.js       theme, film grain, scroll choreography, form
assets/fonts/           Schibsted Grotesk, Geist Mono, Noto Sans SC (self-hosted, subset)
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
2. **Decide the audience.** The page currently serves prospective employers and prospective
   partners equally. Sharpening it toward one would make the work section considerably stronger.

## Editing content

The page is hand-written HTML; edit `index.html` directly. Two conventions matter, and `DESIGN.md`
explains the rest:

- **Cell size states what is real.** The bento span is the claim: the only project actually running
  is 2×2, plans and coursework are 1×1. Give every new item a status badge too — `tag--live`,
  `tag`, `tag--done`.
- **Nothing appears here that `PRODUCT.md` does not record as confirmed.** The page's credibility
  rests entirely on its statuses being true — no shipped app, no founded company, no track record
  until those exist.

## Accessibility

WCAG AA contrast in both themes, keyboard-operable throughout, and `prefers-reduced-motion` honoured
everywhere — under reduced motion the grain stops moving, nothing rotates or counts, and all content
stays visible rather than waiting on a reveal. The theme is applied before first paint so there is no
flash of the wrong ground, and Chinese text carries `lang="zh-Hans"` so screen readers pronounce it
correctly.
