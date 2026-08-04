# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is peers, recruiters, and an Awwwards/FWA-style design audience evaluating creative-development and motion-design craft. This is a portfolio/demo piece — the audience is judging the work itself, not using the site to accomplish an external task, and it is not built for researchers, students, or a general public seeking factual historical information.

## Product Purpose

The site exists to demonstrate exceptional creative-development and motion-design craft — cinematic scroll storytelling, GSAP choreography, editorial art direction — through an interactive experience about Chinese history. Success is a polished, submission-ready, awards-caliber showcase, not a factual encyclopedic resource and not a client product with external stakeholders.

## Positioning

The differentiator is craft-level ambition itself: treating scroll as a physical journey through time, with each dynasty as its own visual world, tactile artifact-level interactions, and cinematic (not opacity-fade) transitions — built to read as an interactive digital art installation, explicitly not a conventional history/tourism/template website. Full direction is in `CREATIVE_BRIEF.md`.

## Operating Context

A single, self-contained, continuous-scroll web experience with no backend, accounts, or multi-role workflows. Desktop is the primary art-direction target; mobile is a required, intentionally-designed experience in its own right, not a scaled-down copy of desktop.

## Capabilities and Constraints

- Built on React + Vite, with GSAP + ScrollTrigger + Lenis as the animation/scroll engine (Phase 0 engineering foundation already established: React-safe GSAP lifecycle via `@gsap/react`'s `useGSAP`, Lenis synced to `gsap.ticker`, `gsap.matchMedia()`-based responsive branching, reduced-motion handling).
- WebGL is used only where it adds meaningful visual benefit, never by default.
- Every animation must have a narrative reason — motion is not decorative.
- `prefers-reduced-motion` support is a hard requirement, not optional polish.
- Performance discipline holds even at maximum visual ambition: GPU-friendly transforms (`transform`/`opacity`), no layout-thrashing animation of `width`/`height`/`top`/`left`, lazy loading, offscreen animation pausing.

## Brand Commitments

- Working title: "The Gates of Time — A Journey Through China's History" (Chinese: 中国历史).
- `CREATIVE_BRIEF.md` at the project root is the binding art-direction reference (palette, typography, motifs, section-by-section choreography) for visual work once it begins.

## Evidence on Hand

No real historical source material, citations, artifacts, or images are on hand. Historical content is intentionally placeholder/illustrative and stays that way by design — the interactive/visual craft is the deliverable being judged, not historical accuracy. Future work must not fabricate specific historical claims, testimonials, or authoritative sources.

## Product Principles

1. Motion is the storytelling medium, not decoration — every animation needs a narrative reason.
2. Editorial, cinematic craft is the differentiator; avoid template and generic-AI-landing-page conventions.
3. Desktop is the primary art-direction canvas; mobile earns its own deliberate interaction strategy, not a shrink.
4. Accessibility (reduced motion) and performance discipline hold even at maximum visual ambition.
5. Content stays placeholder/illustrative by design — craft and experience are what's being judged.

## Accessibility & Inclusion

`prefers-reduced-motion` must be fully respected across the experience (implemented at the engineering-foundation level: native scroll instead of Lenis smoothing, opacity-only fallbacks instead of transform-heavy animation). No other product-specific accessibility requirement has been established beyond that.
