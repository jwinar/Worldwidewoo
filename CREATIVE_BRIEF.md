# Creative Web Design Brief — Immersive China History Experience

You are an award-winning creative developer, interaction designer, and GSAP animation specialist.

Build a high-end, immersive, cinematic website about Chinese history.

The website should feel like an Awwwards / FWA / CSS Design Awards-level experimental website, not a conventional historical website.

The primary objective is visual storytelling through motion.

Do NOT create a generic website with:

* Navbar
* Hero heading
* 3 cards
* About section
* Footer

Instead, design the experience as a continuous interactive journey through Chinese history, where the user feels as though they are physically entering an ancient Chinese world.

---

## 1. CORE CREATIVE DIRECTION

**Theme:**

"The Gates of Time — A Journey Through China's History"

**Visual language:**

* Ancient China
* Imperial architecture
* Palace gates
* Silk
* Gold leaf
* Ink
* Scrolls
* Calligraphy
* Red lacquer
* Bronze
* Stone
* Mist
* Mountains
* Lanterns
* Traditional Chinese patterns
* Historical artifacts
* Architectural silhouettes

The visual style should combine:

Ancient Chinese aesthetics + modern luxury editorial design + experimental web interaction.

Think:

If an ancient Chinese imperial palace were designed by a world-class digital art director in 2026.

The site should feel expensive, restrained, mysterious, elegant and cinematic.

Avoid looking like:

* A Chinese restaurant website
* A tourism website
* A school history project
* A Wikipedia clone
* A generic AI-generated landing page
* A template

---

## 2. DESIGN REFERENCES / PHILOSOPHY

Use the interaction philosophy of websites such as:

* lannino.com
* justus-john.com
* 21st.dev
* Awwwards Site of the Day winners
* FWA award-winning interactive sites
* Experimental GSAP portfolio websites

Do NOT copy their layouts or branding.

Instead study the principles:

* Extreme attention to typography
* Large editorial typography
* Cinematic transitions
* Scroll-driven storytelling
* Smooth inertia
* Layered depth
* Image masking
* Text displacement
* Scale transitions
* Horizontal scrolling sections
* Cursor interactions
* Full-screen transitions
* Unusual navigation
* Carefully choreographed entrance animations
* Minimal UI
* Large negative space
* Sophisticated micro-interactions

The site should feel like an interactive art installation rather than a webpage.

---

## 3. COLOR SYSTEM

**Primary palette:**

* Deep imperial red
* Almost-black charcoal
* Aged parchment
* Warm antique gold
* Muted bronze
* Very dark brown

**Suggested colors:**

| Role | Hex |
|---|---|
| Background | `#100C09` |
| Secondary dark | `#1A1210` |
| Imperial red | `#6E1717` |
| Deep red | `#3D0D0D` |
| Gold | `#C9A45C` |
| Muted gold | `#8E7440` |
| Parchment | `#D8C7A1` |
| Text | `#E8DCC3` |

Use gold sparingly.

The website must NOT look bright yellow or overly saturated.

Gold should resemble: old Chinese gold leaf / oxidized imperial ornamentation.

---

## 4. TYPOGRAPHY

Typography should combine:

**Chinese display typography**

Use an elegant serif / Song-style Chinese typeface where available.

**Latin typography**

Use a sophisticated editorial serif such as:

* Cormorant Garamond
* Playfair Display
* Instrument Serif

For small interface text, use a restrained modern sans-serif such as:

* Inter
* Helvetica Neue
* DM Sans

Typography hierarchy should be dramatic.

Examples:

Huge: `秦` or `QIN` or `THE FIRST EMPIRE`

Use typography as an actual visual element, not simply information.

Large text should sometimes overlap imagery, disappear behind masks, move at different speeds, or become part of transitions.

---

## 5. OPENING EXPERIENCE — THE IMPERIAL GATE

This is extremely important.

The website should NOT immediately display the homepage.

The user should first encounter an ancient Chinese imperial gate.

Full screen. Darkness. Minimal gold typography: `中国历史`

Then: `THE HISTORY OF CHINA`

Small instruction: `ENTER THE GATE` or `SCROLL TO ENTER`

### Gate animation

Create two enormous ancient wooden doors.

They should feel heavy.

The doors contain:

* Dark red lacquer
* Gold ornamentation
* Ancient Chinese patterns
* Metal studs
* Subtle texture
* Slight imperfections

When the user scrolls / drags / interacts:

The doors slowly begin opening.

Use GSAP.

The movement should have:

* Heavy inertia
* Slight resistance
* Slow acceleration
* Subtle overshoot
* Extremely smooth easing

Behind the gate:

A mysterious golden light. Fog. A distant mountain silhouette.

As the doors open completely, the camera appears to move forward through the gate.

The gate should NOT simply slide left/right like two DIVs.

Create the illusion of physical depth.

Use:

* perspective
* transforms
* layered shadows
* parallax
* scale
* blur
* depth-of-field simulation
* atmospheric particles

The gate opening should feel like a cinematic transition.

---

## 6. SILK / ROPE INTERACTION

Introduce silk fabric and silk rope as recurring visual elements.

For example:

A thin red silk cord can run vertically through the page.

As the user scrolls:

* The cord moves
* It bends
* It reacts to scrolling velocity
* It occasionally becomes a transition element

The silk should feel physically simulated.

Use either:

* SVG paths
* Canvas
* GSAP MotionPath
* WebGL
* lightweight physics

Do NOT make it look like a simple CSS line.

It should have:

* organic movement
* slight inertia
* tension
* subtle oscillation

At certain moments the silk can pull a curtain open.

That curtain reveals the next historical period.

---

## 7. INTRODUCTION — CHINA AS A LANDSCAPE

After passing through the gate:

Reveal a gigantic cinematic landscape.

Mountains. Mist. Chinese architecture. Small distant structures.

The screen should feel enormous.

Text appears very slowly: `5000 YEARS OF CIVILIZATION`

Then: `A STORY WRITTEN IN STONE, SILK AND BLOOD.`

Use scroll-driven animation.

The typography should appear through masks and atmospheric fog rather than simply fading in.

---

## 8. HISTORICAL TIMELINE

Create a completely unconventional timeline.

Do NOT use a standard vertical timeline with dots.

Instead create a horizontal cinematic journey.

**Periods:**

1. Ancient China
2. Xia
3. Shang
4. Zhou
5. Qin
6. Han
7. Three Kingdoms
8. Jin
9. Sui
10. Tang
11. Song
12. Yuan
13. Ming
14. Qing
15. Modern China

Each period becomes a visual world.

Example — QIN:

Huge typography: `秦`

Small: `221 BC — 206 BC`

Then: `THE FIRST EMPIRE`

Background: Terracotta Army, Stone, Dust, Bronze, Dark red, Gold

Animation: As the user scrolls, the huge Chinese character slowly fractures into particles. Those particles transform into silhouettes of soldiers. Then the soldiers disappear into dust. The next dynasty emerges.

---

## 9. DYNASTY TRANSITIONS

Every dynasty should have its own visual identity.

| Dynasty | Identity |
|---|---|
| Qin | Stone / bronze / military |
| Han | Silk / red / expansive landscapes |
| Tang | Gold / cosmopolitan / lanterns |
| Song | Ink / mountains / poetry |
| Yuan | Horse / wind / vast landscape |
| Ming | Porcelain / architecture / imperial red |
| Qing | Dark lacquer / gold / palace interiors |

Do NOT make every section visually identical.

Each transition should feel like entering another historical era.

---

## 10. SCROLL EXPERIENCE

Scrolling should control the narrative.

Use GSAP ScrollTrigger extensively.

Potential techniques:

* Pinning
* Scrubbing
* Horizontal scroll
* Image reveal masks
* Clip-path transitions
* Parallax
* Scale transitions
* Rotational movement
* Text splitting
* Velocity-based movement
* Scroll velocity distortion
* Layered depth
* SVG path animation

The user should feel that scrolling is physically moving through time.

---

## 11. CINEMATIC IMAGE TRANSITIONS

Do NOT simply use `opacity: 0 → 1` for image transitions.

Instead use:

* clip-path
* masks
* scale
* displacement
* blur
* distortion
* grain
* image slicing
* directional reveals
* layered overlays

For example:

An ancient Chinese painting fills the screen. As the user scrolls: the painting slowly stretches. Its ink mountains dissolve. The image becomes fog. The fog reveals the next historical scene.

---

## 12. INTERACTIVE ARTIFACTS

Create several interactive historical objects.

**Terracotta Soldier** — Hovering over the soldier: camera slowly moves around it, gold information markers appear, small historical facts appear.

**Ancient Chinese Scroll** — Allow the user to drag / scroll through the scroll. The scroll physically unrolls. Content is revealed progressively.

**Ancient Coin** — The coin rotates slowly according to cursor movement.

**Porcelain** — A Ming porcelain object rotates subtly based on mouse position.

**Imperial Seal** — Hover causes a gold/red ink effect.

These interactions should feel tactile.

---

## 13. MOUSE / CURSOR EXPERIENCE

Create a custom cursor.

Normal: small gold dot.

When hovering over an interactive object: cursor expands. Display `EXPLORE` or `ENTER` or `VIEW`.

Use smooth interpolation.

The cursor should lag slightly behind the mouse.

Do NOT use a huge annoying cursor everywhere. Keep it elegant.

---

## 14. NAVIGATION

Do not use a conventional large navigation bar.

Create an extremely minimal navigation system.

* Top left: `CHINA / 5000 YEARS`
* Top right: `MENU`
* Bottom: a very thin gold progress line
* Small dynasty indicator: `06 / 15  TANG`

Clicking MENU should reveal a full-screen dark-red / black overlay.

Inside: a vertical list of dynasties. Hovering over each dynasty previews its visual environment.

---

## 15. INTERACTIVE MAP

Create an interactive map of historical China.

Not a standard Google Maps style.

Create a stylized dark parchment map.

Use: gold borders, ancient geography, mountains, rivers, Silk Road.

As the user moves across the map: historical cities appear. Examples: Chang'an, Luoyang, Beijing, Nanjing, Kaifeng, Hangzhou.

Clicking a city transitions to its historical story.

Use GSAP for camera movement.

---

## 16. SILK ROAD SECTION

Create an immersive Silk Road section.

Dark background. A golden line travels across the screen. This line represents the Silk Road. It should be animated using SVG path drawing.

Along the route appear: Xi'an, Dunhuang, Kashgar, Central Asia, Mediterranean.

As the line moves: small artifacts appear — silk, spices, coins, ceramics, maps.

This section should feel like an animated historical map.

---

## 17. SCROLL-BASED STORYTELLING

Use narrative statements.

Examples:

> BEFORE THERE WAS AN EMPIRE,
>
> THERE WERE KINGDOMS.
>
> BEFORE THERE WERE BORDERS,
>
> THERE WERE RIVERS.
>
> AND BEFORE THERE WAS HISTORY,
>
> THERE WERE STORIES.

Typography should animate one line at a time.

Make these moments cinematic.

Do not fill the screen with paragraphs.

---

## 18. FINAL EXPERIENCE

Eventually the user reaches modern China.

The visual language gradually changes.

Ancient parchment becomes modern architecture. Ink becomes light. Gold becomes city lights. Mountains become skyscrapers.

The historical timeline collapses into one vertical line.

Then show: `5000 YEARS ONE CONTINUOUS STORY.`

Final interaction: the original imperial gate appears again. But this time it is open. Behind it is a bright horizon.

Text: `THE STORY CONTINUES.`

---

## 19. GSAP IMPLEMENTATION

GSAP should be the primary animation framework.

Use: GSAP, ScrollTrigger, SplitText if available, MotionPathPlugin where appropriate.

Animations should be coordinated through GSAP timelines.

Avoid random CSS transitions.

Create reusable animation functions such as:

```
createGateAnimation()
createSilkAnimation()
createDynastyTransition()
createImageReveal()
createTextReveal()
createArtifactInteraction()
createMapAnimation()
createScrollScene()
```

Use ScrollTrigger for: pinning, scrubbing, timeline progression, horizontal sections, parallax.

---

## 20. PERFORMANCE

This is important.

The website should look extremely advanced without becoming unusable.

Implement:

* lazy loading
* responsive images
* optimized assets
* requestAnimationFrame only when needed
* GPU-friendly transforms
* avoid expensive layout thrashing
* pause animations when elements are offscreen
* responsive animation complexity

Use WebGL only where it provides meaningful visual benefit.

Do not introduce WebGL merely because it sounds impressive.

---

## 21. RESPONSIVE DESIGN

Desktop is the primary art direction.

But mobile must remain a complete experience.

On mobile:

* simplify extremely heavy effects
* reduce particle count
* simplify WebGL
* adapt horizontal scrolling
* maintain the gate opening
* maintain silk interaction
* maintain cinematic transitions
* preserve typography hierarchy

Do not simply shrink the desktop layout.

Design a mobile-specific interaction strategy.

---

## 22. TECHNOLOGY

Build using:

* React
* Vite
* GSAP
* ScrollTrigger
* HTML
* CSS
* JavaScript

Use a clean component architecture.

Suggested structure:

```
src/
  components/
    GateIntro.jsx
    SilkTransition.jsx
    Hero.jsx
    Timeline.jsx
    DynastySection.jsx
    Artifact.jsx
    SilkRoad.jsx
    HistoricalMap.jsx
    FinalSection.jsx
    Navigation.jsx
    CustomCursor.jsx
  animations/
    gate.js
    scroll.js
    text.js
    transitions.js
    silk.js
  data/
    dynasties.js
  assets/
```

Keep data separate from presentation.

Dynasty information should be represented as structured data so additional periods can easily be added.

---

## 23. CONTENT

For the initial prototype, use historically responsible placeholder content.

Do NOT invent specific historical claims.

Use concise text.

The purpose of this prototype is primarily: visual experience + interaction + animation, rather than encyclopedic historical information.

Use Chinese characters alongside English where appropriate.

Example:

```
秦
QIN

221 BC — 206 BC

THE FIRST EMPIRE
```

---

## 24. IMPORTANT DESIGN RULES

1. Motion is part of the storytelling.
2. Every animation should have a reason.
3. Do not animate everything simultaneously.
4. Use silence and negative space.
5. Avoid generic UI components.
6. Avoid excessive cards.
7. Avoid gradients that look like generic AI design.
8. Avoid excessive gold.
9. Avoid stock-looking Chinese imagery.
10. Avoid excessive text.
11. The website should feel editorial, cinematic and mysterious.
12. The first 10 seconds must immediately communicate that this is an exceptional interactive experience.

---

## 25. DELIVERABLE

Generate the complete working website.

Do not give me merely a concept or pseudo-code.

Provide:

1. Complete React/Vite project
2. All components
3. GSAP animations
4. ScrollTrigger implementation
5. Responsive CSS
6. Historical data structure
7. Placeholder image assets or appropriate remote image sources
8. Custom cursor
9. Gate opening sequence
10. Silk animation
11. Dynasty timeline
12. Interactive map
13. Silk Road section
14. Final gate sequence

The project should run with:

```
npm install
npm run dev
```

---

## FINAL CREATIVE DIRECTIVE

Before writing code, think like a creative director, not a software engineer.

The goal is NOT:

"Make a website about Chinese history."

The goal is:

Create an interactive digital museum that makes the user feel as if they are physically travelling through 5,000 years of Chinese civilization.

The experience should feel:

Ancient. Cinematic. Tactile. Elegant. Mysterious. Immersive. Expensive. Minimal. Experimental.

Prioritize:

Art direction → interaction design → motion design → typography → storytelling → implementation.

If a design decision makes the site technically easier but visually less impressive, choose the visually superior solution while keeping performance reasonable.
