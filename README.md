# Justin Winartha — personal site

A single-page personal site built as a hotel key rack: bone tags hanging on brass hooks that swing
under a live pendulum simulation. Static HTML, CSS and JavaScript with **no dependencies at all** —
no framework, no build step, no libraries to install.

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
assets/js/site.js       pendulum physics, widget, reveals, register form
assets/fonts/           Bricolage Grotesque, Familjen Grotesk, Noto Sans SC (self-hosted, subset)
assets/img/             portrait, webp + jpg
PRODUCT.md              product truth — who this is for and what is confirmed
DESIGN.md               the design system, recorded from the built page
```

Fonts are self-hosted rather than loaded from a CDN and there is no JavaScript library, so the page
has no third-party runtime at all and works behind a strict content-security policy.

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

- **Anything that hangs is a tag.** A hook, a cord of `--drop` height, and a punched bone face, with
  four inline custom properties: `--x`, `--drop`, `--w`, `--tilt`. The physics reads those.
- **Compartments are recesses, not cards.** `.key` has a brass top lip and an inset shadow. Do not
  turn it back into a raised card — `DESIGN.md` explains why.
- **Nothing appears here that `PRODUCT.md` does not record as confirmed.** The page's credibility
  rests entirely on its statuses being true — no shipped app, no founded company, no track record
  until those exist.

## Accessibility

WCAG AA contrast across all thirteen text pairs, keyboard-operable throughout with a brass focus
ring, and `prefers-reduced-motion` fully honoured — under reduced motion the physics loop never
starts, the tags hang at their resting angles, and all content is visible without waiting on a
reveal. Chinese text carries `lang="zh-Hans"` so screen readers pronounce it correctly.

The physics loop parks itself roughly eight seconds after load, once every tag is within 0.02° of
rest, and wakes only on a disturbance — an idle page costs nothing.
