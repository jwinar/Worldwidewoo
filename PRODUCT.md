# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated — the user said "stack is up to you." Choice and rationale are recorded at build time.

## Users

Primary visitor: someone deciding whether to engage Justin Winartha — a prospective employer, business partner, co-founder, supplier contact, or investor-adjacent connection. They arrive from a LinkedIn profile, a message, or a direct link, usually on the strength of a single introduction, and they are deciding in under a minute whether he is credible and worth a reply.

Secondary: recruiters scanning for role fit, who need the career facts findable without hunting.

## Product Purpose

A personal site that repositions Justin from "hospitality operations professional with an IT degree" to "operator moving into e-commerce, investing, and AI-assisted product building." Success is a visitor who understands the transition, believes the operating experience is real and transferable, and sends a message.

## Positioning

Eight years of hotel operations — revenue management, room inventory, night audit, group logistics, guest recovery — is the actual differentiator. Most people entering e-commerce have no operating background; most people with an operating background do not build software. The transition is the claim, and the operations record is the evidence for it. The site must not present him as an experienced founder, a track-record investor, or a shipped iOS developer, because he is none of those yet.

## Operating Context

Visitors arrive predominantly from LinkedIn, frequently on mobile, often mid-conversation with Justin or someone who referred him. The page is read once, quickly, and is expected to answer "who is this and is he serious" before anything else.

## Capabilities and Constraints

- Single-page marketing/positioning site. No CMS, no auth, no application logic.
- Contact is a form (user's explicit choice). A static site cannot send mail on its own; a third-party form service is required, and its provider is an open decision.
- Email address and phone number are deliberately NOT published. LinkedIn is the only published direct channel.
- GitHub profile is not published (user did not select it).

## Brand Commitments

An existing professional poster establishes real identity equity and is a confirmed asset:

- Palette: bone/warm off-white ground, near-black, amber-ochre accent.
- Oversized condensed sans display type used as ghosted background scenery ("PROFESSIONAL").
- Script signature wordmark for the name.
- Confirmed lines: "Grounded in critical thinking. Guided by integrity." and "PRINCIPLE-DRIVEN — Analyst and Value Investor".
- Headshot: cream suit, three-quarter pose, light warm-neutral background. Available at `assets/` once imported.

These are commitments about identity, not a mandate for the site's visual world; the user explicitly asked for a bolder direction than a literal extension of the poster.

## Evidence on Hand

Real and usable:

- **Career record (2017–Apr 2026), all past tense.** Room Controller / Welcome Supervisor, W Hotels (Jun 2025 – Apr 2026) — room inventory for revenue and occupancy, group arrivals/departures, upgrade allocation across Revenue/Front Desk/Housekeeping/Engineering, pre-arrival planning. Welcome Agent, W Hotels (Jun 2024 – Jun 2025) — OPERA PMS, GXP. Exam Supervision Officer, University of Sydney (May 2024 – 2026). Assistant Night Manager, Rydges (Oct–Nov 2023) — Oracle PMS, nightly financial audit. Guest Service Agent, Oaks (Jan–Oct 2023). Night Auditor, Oaks (Oct 2022 – Oct 2023) — nightly reconciliation exceeding $40,000, 98% guest satisfaction. Housekeeping, Oaks (Nov 2021 – Jul 2023) — 9/10 cleaning score. Property Manager, Airbnb (Jun 2018 – Jul 2021). Team Supervisor, Complex Solution (Oct 2017 – Feb 2019). Crew Member, McDonald's (Oct 2017 – Feb 2018).
- **Education.** Charles Sturt University, Bachelor of Information Technology, specialised in Software and Website Development.
- **Certification.** Financial Markets — Yale University via Coursera.
- **University projects.** JustTalk, a WhatsApp-style messaging app (Android Studio, Firebase, Java, ~2020). TravelBiz, a travel agency website (WordPress, JavaScript, HTML, CSS, JavaFX).
- **Hanzi Mind: 雅 (Yǎ) Widgets.** Current ongoing build, repo `jwinar/lingostreak`. A Chinese-language learning app built on passive repetition: a word with its pinyin and English translation is displayed on the phone's home screen or lock screen, so vocabulary is absorbed through the hundred times a day the user already checks their phone — no session to open, no streak to maintain by hand. Composition: Dart 80% (Flutter core), TypeScript 6%, JavaScript 7%, Kotlin 4% (Android widget), Swift 3% (iOS WidgetKit extension). The native slices are what make the concept work — home/lock-screen widgets cannot be built in Dart alone — and they are the concrete iOS/Android platform evidence on this site. Status: in development, not released.
- **E-commerce venture.** Planned to begin by end of year. Intended shape: integrated China supplier sourcing → freight forwarding → fulfilment warehouse → omnichannel distribution to customers, possibly Amazon FBA. The user explicitly said the operational detail need not be stated explicitly and may be used as aesthetic material. It is a plan, not an operating business.

Absences that future work must not fabricate:

- No businesses have been founded or operated. "Entrepreneurial" describes intent and the combination of the other three threads, not a company.
- No investment track record, holdings, returns, or published thesis writing exists to show.
- No released app. Hanzi Mind is in development with no App Store or Play Store presence, no users, and no download figures. JustTalk was Android, not iOS.
- No clients, customers, testimonials, revenue figures, press, or awards.
- Sydney/Australia base is inferred from the +61 number, University of Sydney, and W Hotels; confirm before stating it as fact.

## Product Principles

1. **The transition is the story.** Not arrival. The page earns belief by being specific about where he is standing and where he is going, never by implying he has already arrived.
2. **Operations is the proof.** Every claim about future e-commerce capability routes back to concrete inventory, revenue, and reconciliation work he actually did.
3. **Nothing shipped may be presented as shipped.** In-progress reads as in-progress, planned reads as planned, and the design must make that honesty feel like confidence rather than apology.
4. **One decision, one channel.** The page drives a single action — make contact — through the form and LinkedIn, with no competing calls.
5. **Read in a minute, on a phone.** Mobile-first substance; the first viewport must carry the whole thesis.

## Accessibility & Inclusion

No user-specific requirement established. Standard obligations apply: WCAG AA contrast, keyboard-operable form and navigation, honoured `prefers-reduced-motion` (material, given the scroll-animation brief), and semantic landmark structure.
