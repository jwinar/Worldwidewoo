# Linvale Studio — portfolio site

> **Handoff document.** This plan is written to be executed by a fresh Claude Code
> session on the owner's **local machine**, which has a GPU and a local Stable
> Diffusion install. It is self-contained: you do not need the conversation that
> produced it.
>
> It lives in the repo it describes — `jwinar/studio-porto`, branch
> `claude/linvale-studio-portfolio-mcidrx`. Clone, read this file, then start at
> **Implementation → Setup**.

---

## Context

Justin (`jwinar`) is consolidating five in-flight projects under a studio identity —
**Linvale Studio** (林 *lin*, grove/woods + *vale*, valley). Today the work is scattered
across five repositories with no public face, and **none of it has shipped yet**. Two
mobile apps are at the store-submission stage, a wedding SaaS is mid-build, a
scroll-film portfolio is complete, and a clothing venture for the Indonesian market
has not started.

The site must do three jobs at once:

1. Present the studio as **a company** — a design and engineering practice, not a
   freelancer's link page.
2. State plainly that it is **open for business opportunities**.
3. Announce a forthcoming **omnichannel commerce venture in Indonesia**, trading under
   the Linvale name, without inventing product that does not exist yet.

The visual reference the owner selected is **produx.design** — a dark, Swiss-brutalist
agency site with mono micro-labels, a sticky hero that content rises over, a
scroll-driven horizontal showreel, and a photographic organic object floating in the
layout. A 66-second mobile screen recording of it was reviewed frame-by-frame; the
mechanics extracted from it are specified in **Motion** below. We take its *structural
discipline*, not its look — the palette, the world, and the signature device are ours.

**Outcome:** one long scroll-driven page at `/` plus a `/contact` route, deployed, with
real imagery generated locally by Stable Diffusion, and a working contact form that
delivers to the owner's private address without that address ever entering the repo.

---

## Decisions already made

| Question | Decision |
|---|---|
| Visual world | **Mist & Meridian** — pale grey-green fog, hairline grid, one organic form |
| Repository | **`jwinar/studio-porto`** — this repo (renamed from `Worldwidewoo`, set to private). It was deliberately emptied down to the impeccable skill install and is the site's home |
| Stack | **Next.js (App Router) + TypeScript + Tailwind v4 + GSAP + Lenis** |
| Structure | **One scrolling page (`/`) + a `/contact` route** |
| Studio voice | **Design & engineering practice** (service-led framing, own products as proof) |
| Work section | Three products in the work grid; **Flying-shark as a separate Craft band** |
| Commerce | **Its own section.** Linvale is also the brand for the clothing venture. Kept generic until garment designs exist |
| Contact backend | **Web3Forms** — destination email stored in their dashboard, never in code |
| Imagery | **Local Stable Diffusion**, per the asset contract in this plan |

---

## The world: Mist & Meridian

Two opposing forces held in one page. **Mist** — fog, fluid, an organic photographic
mass, everything soft and moving. **Meridian** — a hairline grid that never moves,
mono micro-labels, tight type, hard alignment. The whole design is the tension between
them: soft things drifting behind hard lines.

The **meridians** are the signature device. Fixed vertical 1px hairlines run the full
viewport height, behind all content and above the fog. Fog drifts behind them; the
organic form passes behind them; type sits on them. They never move. Nothing else on
the site needs to be distinctive if these are right.

### Tokens

Define **only** in `src/app/globals.css` under `@theme`. No raw hex anywhere else.

```
Grounds     haze     #eef0ea   page ground
            fog      #dfe3dd   alternating band, panels
            drift    #c9d0c6   hairlines, dividers, card borders
Greens      lichen   #9aa896   muted secondary text
            sage     #7d9179   accent green, micro-label active
            moss     #4f6350   deeper green, emphasis
Ink         slate    #2a3230   primary text
            basalt   #171c1a   near-black — showreel band, footer
Signal      ember    #a8532f   the single warm accent — CTA, link underline,
                               the live dot on OPEN FOR WORK. Terracotta;
                               reads as clay, and pre-echoes the clothing label.
```

Secondary text is `lichen`, tinted from the world's hue — **never a neutral grey**.
`ember` is a signal colour: it appears on interactive and status elements only, never
as decoration, and never on a large fill.

Light-first. There is a single dark band (`basalt`) carrying the showreel, and the
footer. That inversion is the page's one dramatic beat — do not add a second.

### Type

**Self-host woff2 subsets in `public/fonts`. Do not use `next/font/google`.** When it
cannot fetch — offline or egress-restricted builds — it does not fail, it silently
emits a metric-adjusted fallback and every display heading goes wrong. This has already
burned this owner once in `carpet_gato`; the rule is in that repo's `AGENTS.md`.

- **Geist Sans** (OFL, variable) — display and body.
- **Geist Mono** (OFL) — micro-labels, status pills, figures, form labels.

The mono is load-bearing, not decoration: the micro-label rows above every project
title are what make this layout read as engineered rather than styled. Set them at
10–11px, uppercase, `letter-spacing: 0.14em`, `lichen`, separated by a thin middot.

Display sizing: `clamp(2.5rem, 7vw, 5.5rem)`, weight 500, `line-height: 0.95`,
`letter-spacing: -0.03em`. Tight, not shouty.

**The 林 mark**: ship as an **inline SVG path**, not a webfont. Loading a CJK family for
one glyph costs megabytes. Outline it once, commit the path, use it in the header,
the favicon, and the footer wordmark lockup.

---

## Motion — "liquid flow"

House rules, carried from `carpet_gato/AGENTS.md` and non-negotiable:

- Use `useGSAP()` from `@gsap/react`, **never** `useEffect`. It scopes and reverts
  automatically, which React StrictMode double-mounting requires.
- Register plugins once, in `src/components/motion/gsap.ts`. Never call
  `gsap.registerPlugin` inside a component.
- Every `ScrollTrigger` is created inside a `useGSAP` scope so it reverts on unmount.
- **Content must never depend on JS to become visible.** Start elements visible and let
  GSAP set the "from" state, or the page is broken for crawlers and no-JS visitors.
- **`prefers-reduced-motion: reduce` renders the complete final state** of every
  section. Not a degraded version — the finished one. WebGL does not load at all.
- WebGL is strictly additive. The page must be finished without it, and it must not
  load on low-capability devices or narrow viewports.

Easing throughout: `cubic-bezier(0.16, 1, 0.3, 1)`. UI transitions 200–400ms.
Scroll-linked motion is scrubbed, never triggered-and-timed. Nothing bounces,
nothing overshoots, nothing staggers in with a spring — this world is heavy and calm.

### The six mechanics

1. **Fog field** *(the liquid flow)* — a full-viewport WebGL plane running fbm noise
   with **curl-noise domain warping**. At rest it drifts almost imperceptibly. Scroll
   velocity feeds an advection term, so fast scrolling **smears the fog in the scroll
   direction** and it settles when you stop. This is the entire "liquid" idea; get it
   right and the rest of the motion can stay quiet. Damp the velocity input hard —
   the effect should read as weight, not as a filter.

2. **Sticky hero over-scroll** — extracted directly from the reference. The hero
   headline block pins; the showreel band **rises over it** and occludes it from the
   bottom up. The headline never fades — it is covered. Release the pin when the
   showreel fills the viewport.

3. **Showreel marquee** — a horizontal strip of project stills on the `basalt` band,
   `x` position driven by `scrollY`, two rows travelling in opposite directions. On
   reduced motion this becomes a static two-row grid.

4. **The Form** — the SD-generated moss-covered stone, scroll-scrubbed on rotation,
   scale and vertical drift, passing *behind* the meridians. A single high-resolution
   still is correct here; do not attempt a turntable sequence in the first pass.

5. **Meridian breathing** — the hairlines' opacity eases with scroll velocity, from
   ~24% at rest to ~55% at speed. Positions never change. This is subtle by design and
   is what ties the fixed grid to the moving fog.

6. **Work card parallax** — each project image scrolls at ~0.9× the rate of its text
   block, so image and caption drift apart slightly and resettle. Taken from the
   reference; it is the reason its project list feels alive rather than stacked.

**Type reveal**: headline lines are clipped from below with a mask and scrubbed on
entry. No per-character stagger, no fade-up-and-in. One clean wipe.

---

## Page structure

### `/` — the scroll

| # | Section | Notes |
|---|---|---|
| 1 | **Header** | 林 + LINVALE STUDIO left; `● OPEN FOR WORK` status pill (live `ember` dot); `[ MENU ]` on mobile, inline nav on desktop. Sticky. Inverts over the `basalt` band. |
| 2 | **Hero** | Headline, one-paragraph descriptor, mono capability row. Fog field behind, meridians in front of it. |
| 3 | **Showreel** | `basalt` band. Horizontal marquee. The page's one dark beat. |
| 4 | **Practice statement** | The positioning line + the Form. |
| 5 | **Selected work** | Three product blocks (below). |
| 6 | **Craft** | Flying-shark, framed as capability evidence, visually distinct from the work grid. |
| 7 | **The Label** | The commerce venture. Textile-led, no product. |
| 8 | **Capabilities** | Four disciplines as an expanding list, after the reference's "Where We Contribute". |
| 9 | **Open for work** | The business-opportunity band. Links to `/contact`. |
| 10 | **Footer** | Oversized LINVALE wordmark, nav, legal, socials. |

### `/contact` — the form
### `/privacy` — required, since the form collects personal data

---

## Content — what is true

Every project below is **pre-release**. The status lines are load-bearing: verify each
against the repo before shipping copy, and never soften them.

**Work grid (3):**

- **Evermore-After** — wedding invitations and planning for Southeast Asia. A couple
  picks a template, fills in their details, and publishes a shareable animated
  microsite with RSVP tracking, alongside a planner (checklist, budget, vendors,
  seating). Built for multi-day, multi-tradition SEA weddings — akad nikah, tea
  ceremony, mehndi — not a Western e-vite translated. Next.js, Postgres with RLS.
  Status: **In build**.
  ⚠️ *"Evermore-After" is an explicit placeholder and not the final name.* Render it
  with a `WORKING NAME` micro-tag, or ask the owner for the final name before build.
- **Kotoba Lantern** — a quiet daily Japanese vocabulary deck. 7,897 words across
  JLPT N5–N1 with kana, romaji, gloss, stroke counts and 音/訓 readings, on-device
  pronunciation. Flutter, iOS, offline, no account. Identity: Chōchin, a paper lantern
  that fills with light as the deck is opened. Status: **Preparing for App Store**.
- **Hanzi Mind: 雅 Widgets** — the complete HSK 3.0 vocabulary, 10,057 words across
  HSK 1–9, delivered to the home screen and lock screen as widgets with on-device TTS.
  Flutter, Android. Status: **Preparing for Play Store** (listing written; blocked on
  account verification).

**Craft band (1):**

- **Flying-shark** — a scroll-driven film, *5000 Years of China*, that opens a personal
  portfolio: eight hand-produced video chapters with era-specific colour identities and
  ambient audio, wired with GSAP ScrollTrigger pin-scrub, crossfaded audio handoff, and
  a `prefers-reduced-motion` poster fallback throughout. Present it as **evidence of
  motion and production capability**. It is Justin's own portfolio — do not restate his
  résumé, job titles or employment history on the studio site.

**The Label:**

- Linvale is also the trading name for a forthcoming **omnichannel commerce venture in
  Indonesia**, mostly **clothing**. No garment designs exist yet. The section is
  brand-and-material led: textile macro imagery, the omnichannel intent (marketplace,
  social commerce and physical retail on one stock ledger), and an honest **In build**
  status. **Do not name products, show garments, invent a lookbook, or state a launch
  date.**

### Copy direction

Hero headline — **"Design that survives contact with production."**
Sub — *"Linvale Studio is a design and engineering practice. We take products from
identity to shipped code — brand, interface, motion, and the systems underneath."*

It is the honest differentiator for a practice whose proof is three shipped-to-store
codebases rather than a deck. Alternates, if the owner prefers: *"We build the whole
thing."* / *"From the mark to the migration."*

Voice: declarative, unhedged, technical where technical is the truth. No exclamation
marks, no "we're passionate about", no em-dash-joined marketing triplets.

---

## Honesty constraints — read before writing any copy

The reference site has a client-logo row, a testimonial carousel and named case-study
metrics. **Linvale has no clients, no testimonials and no shipped products.** Copying
those sections means fabricating them.

Do not build, and do not invent:

- Client logos or a "trusted by" row.
- Testimonials, quotes or avatars.
- Metrics, download counts, revenue, user numbers, "14-day" delivery promises.
- Awards, press mentions, team headcount, office locations.
- App Store / Play Store download buttons, or any link to a listing that is not live.
- Product screenshots for anything that does not exist — above all, the clothing.

**SD-generated imagery stays decorative** — atmosphere, texture, the organic form.
Product imagery must be real captures from the actual apps
(`lingostreak/store_listing/screenshots/` has real ones; `kotoba-lantern` and
`carpet_gato` can be captured by running them). Never generate a fake screenshot,
a fake garment, or a fake photograph of a person.

---

## Stable Diffusion asset contract

Run locally. Grade everything toward the palette — nothing may drift warm except
where `ember` is intended. Export **WebP q82 + AVIF**, with explicit `width`/`height`
on every `<Image>` so nothing reflows.

Recommended: **FLUX.1-dev**, 28 steps, guidance 3.5. Falls back to **SDXL** with a
photographic checkpoint (Juggernaut XL / RealVis XL), 30 steps, CFG 6.0,
DPM++ 2M Karras, 1024² → 2× latent upscale. Negative prompts apply to SDXL only.

Store one prompt file per slot in `assets/prompts/NN-slot.txt`, each recording the
final prompt, negative, sampler, seed and checkpoint actually used, so any image can
be regenerated deterministically. Commit the prompts; commit the outputs.

**Slot A — `public/img/form/stone.webp`** · 1536² · the signature Form
```
a single organic moss-covered river stone floating in isolation, dense living
moss and fine lichen over dark wet granite, 100mm macro, soft overcast studio
light from upper left, matte surface, desaturated cool sage and grey-green,
fine detail in the moss fronds, photographic, centered, plain pale grey
background, product photography lighting
neg: text, watermark, logo, people, hands, saturated color, warm orange light,
hard shadow, tabletop, horizon, vignette, bokeh, illustration, 3d render, cgi, plastic
post: rembg (briaai/RMBG-1.4) → trim alpha → WebP q82
```

**Slot B — `public/img/fog/plate-{1,2,3}.webp`** · 2560×1440 · WebGL textures + CSS layers
```
soft volumetric mist drifting over a still valley at dawn, no landmarks, no
trees, pure atmosphere, pale grey-green, extremely low contrast, fine film
grain, horizontal, abstract
neg: sun, sunburst, warm light, mountains, silhouettes, birds, text, vignette
```

**Slot C — `public/img/label/textile-{1,2,3}.webp`** · 1600×1000 · The Label
```
extreme macro of undyed natural linen weave, visible warp and weft threads,
soft raking light, matte fibre, pale oatmeal and cool grey, shallow depth of
field, textile photography, fills the frame, abstract
neg: garment, clothing, seam, stitching, button, zipper, label, model, person,
mannequin, hanger, logo, text
```
Variants across the three: raw cotton canvas · loose-woven ramie · brushed grey twill.
**The negative prompt is a hard requirement here** — a garment in this section is a
fabricated product claim.

**Slot D — `public/img/reel/plate-{1..6}.webp`** · 1200×800 · showreel cells
Abstract material plates, one per cell, each carrying a trace of its project's hue
pulled hard toward fog: wet ceramic glaze (Evermore-After) · warm paper under lantern
light (Kotoba) · cool ink wash on newsprint (Hanzi Mind) · dark lacquer with a single
red thread (Flying-shark) · two of Slot C's textiles. No type, no UI, no logos —
these sit **behind** mono labels rendered in CSS.

**Slot E — `public/og.webp`** · 1200×630
Slot B as the backdrop; compose the 林 mark and wordmark in code or in a vector pass,
never as generated type. SD cannot render text — do not ask it to.

While a slot is empty, its component renders a hand-authored SVG placeholder in
`drift`/`fog` that reads as deliberate — a fine noise field with a meridian across it —
never a broken image or a grey box.

---

## Implementation

### Setup

1. Work in **this repo** (`jwinar/studio-porto`, private — formerly `Worldwidewoo`),
   on branch `claude/linvale-studio-portfolio-mcidrx`. It already contains this plan,
   a `.gitignore` covering impeccable's local artifacts, and **impeccable v4.0.4** at
   `.claude/skills/impeccable/` — do not reinstall or overwrite it. Everything else is
   empty by design. Scaffold Next.js App Router + TypeScript strict + Tailwind v4 into
   it *in place*; do not create a nested project directory.
2. Copy **emil-kowalski-design** from `carpet_gato/.claude/skills/emil-kowalski-design/`
   into `.claude/skills/` — `animate`, `improve-animations` and `review-animations`
   are directly relevant to the six mechanics above.
3. Confirm `.gitignore` still carries impeccable's local-artifact rules
   (`.impeccable/shots/`, `.impeccable/live/*` with `!.impeccable/live/config.json`)
   after the Next.js scaffold rewrites it — scaffolders routinely clobber this file.
4. Write `PRODUCT.md` in the impeccable product schema (see
   `carpet_gato/PRODUCT.md` and `Flying-shark/flying-shark-portfolio/PRODUCT.md` for
   the exact section set) and an `AGENTS.md` carrying the house rules restated above.
5. Run `node .claude/skills/impeccable/scripts/context.mjs` once, then follow the
   `new-work.md` playbook and load `reference/craft-floor.md` before any UI edit.

### Files

```
src/app/globals.css              @theme tokens — the ONLY place colours are defined
src/app/layout.tsx               fonts, metadata, Lenis provider
src/app/page.tsx                 the scroll — composes the ten sections
src/app/contact/page.tsx         the form
src/app/privacy/page.tsx
src/components/motion/gsap.ts    single registerPlugin call
src/components/motion/SmoothScroll.tsx
src/components/motion/Reveal.tsx
src/components/motion/usePrefersReducedMotion.ts
src/components/motion/FogField.tsx     WebGL; additive, capability-gated
src/components/chrome/Meridians.tsx    the fixed hairline grid
src/components/chrome/Header.tsx
src/components/chrome/MicroLabel.tsx   the mono label row — used everywhere
src/components/sections/*.tsx          Hero, Showreel, Practice, Work, Craft,
                                       Label, Capabilities, OpenForWork, Footer
src/components/contact/ContactForm.tsx
src/content/projects.ts          all project copy + statuses — no strings in components
src/content/site.ts              headline, nav, capabilities, legal
public/fonts/                    Geist Sans + Geist Mono woff2 subsets
public/img/                      SD outputs per the contract above
assets/prompts/                  one prompt file per slot, with seeds
```

No hardcoded user-facing copy inside components — it lives in `src/content/`. This is
the owner's existing convention and it is what makes the copy reviewable.

### Contact form

Web3Forms. Client-side `POST` to `https://api.web3forms.com/submit`.

> **The destination address never enters the repository.** Set it in the Web3Forms
> dashboard only. The owner's private work address is the one they supplied for this
> purpose — configure it there, and do not write it into any file, comment, env
> example, or `mailto:` link. Only `NEXT_PUBLIC_WEB3FORMS_KEY` ships.

Fields: name · email · company *(optional)* · enquiry type *(product design ·
engineering · brand & motion · partnership · other)* · budget range *(optional)* ·
message. Plus Web3Forms' `botcheck` honeypot, visually hidden and `tabindex="-1"`.

Real states, all designed: idle, validating, submitting, success, error. No `alert()`,
no unstyled browser validation bubbles. On failure, show an error with a LinkedIn
fallback link — **never reveal the email address as a fallback**. If the key is unset
at build time, render the form disabled with an honest note rather than a form that
silently fails.

`/privacy` states what the form collects, that Web3Forms processes it, and how to
request deletion.

### Deploy

Vercel. No server secrets are required, so a static export is also viable if the owner
prefers portability. Add `metadata` with OG/Twitter cards pointing at `public/og.webp`.

---

## Verification

Before calling this done:

1. `pnpm typecheck && pnpm lint && pnpm build` — all pass.
2. `node .claude/skills/impeccable/scripts/detector/detect-antipatterns.mjs src/ public/`
   — clean. In particular the craft floor bans eyebrow/kicker text above headings,
   hero-metric tiles, icon+heading+text card grids as page structure, gradient text,
   and section numbers.
3. Playwright screenshots at **390px and 1440px**, full page, both routes. The body
   must never scroll horizontally at either width.
4. Force `prefers-reduced-motion: reduce` and scroll the whole page: no console errors,
   no layout jump, every section readable and complete, WebGL never initialised.
5. Disable JavaScript and reload `/`: all copy, all headings and all project statuses
   are present in the HTML.
6. Throttle to Slow 4G: the hero headline paints before the fog field, and the Form
   image does not block it.
7. Submit the live contact form once and confirm the mail arrives. Then `git grep` for
   the address across the repo and confirm **zero** matches.
8. Read every project status line against its repo one final time. Nothing may claim
   to be released.

---

## Open items for the owner

- **The final name for "Evermore-After"** — the current one is an explicit placeholder
  and will be visible on the site.
- **Company particulars** — legal entity name and base jurisdiction, if the footer
  should carry them.
- **Social handles** — which accounts the footer links to.
- **LinkedIn URL** — needed as the contact-form failure fallback.
