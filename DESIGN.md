---
name: Justin Winartha — The Rack
description: A petrol-dark key rack where bone tags hang on brass hooks and swing under live pendulum physics.
colors:
  field: "#0C2B30"
  field-lo: "#081F23"
  field-hi: "#123A40"
  field-edge: "#17474E"
  bone: "#EDE7D9"
  bone-2: "#DBD2BE"
  bone-dim: "#A9B5B0"
  ink: "#14211F"
  ink-2: "#4A5A56"
  brass: "#C9A227"
  brass-hi: "#E0BC46"
  brass-lo: "#8A6E19"
  brass-cord: "#7A6116"
  oxblood: "#8C3131"
  oxblood-lt: "#C36A6A"
  confirm: "#2F6B4F"
typography:
  name:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 7vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  name-sm:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 9vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  section:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  door:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.6vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  entry:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  tag-face:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  key-no:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  clock:
    fontFamily: "'Bricolage Grotesque', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.05em"
  lead:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 2vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  rack-line:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(.9375rem, 1.6vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  ui:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  meta:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  tag-sub:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
  stamp:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.16em"
  stamp-xs:
    fontFamily: "'Familjen Grotesk', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.18em"
  hanzi:
    fontFamily: "'Noto Sans SC', 'Familjen Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  stamp: "2px"
  tag: "3px"
  sm: "4px"
  md: "8px"
  device: "1.6rem"
  hook: "50%"
spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s5: "1.5rem"
  s6: "2rem"
  s7: "3rem"
  s8: "4rem"
  s9: "6rem"
  s10: "8rem"
components:
  tag-face:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "1.5rem 0.75rem 0.7rem"
  tag-face-name:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "1.9rem 1.4rem 1.4rem"
  compartment:
    backgroundColor: "{colors.field-lo}"
    textColor: "{colors.bone}"
    rounded: "{rounded.md}"
    padding: "{spacing.s5}"
  stamp:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.stamp}"
    padding: "0.5em 0.7em 0.4em"
    typography: "{typography.stamp}"
  stamp-live:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.oxblood}"
    rounded: "{rounded.stamp}"
  cta:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "0.5rem 0.9rem"
  cta-hover:
    backgroundColor: "{colors.brass-hi}"
    textColor: "{colors.ink}"
  ledger:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "{spacing.s5}"
  sign-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1rem"
  sign-button-hover:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.bone}"
---

# Design System: The Rack

## Overview

The surface is the key rack Justin worked behind for eight years, turned into the index of what he
is opening next. The compartments do not hold hotel rooms; they hold his next moves. That single
inversion is the whole system: hospitality is where the authority came from, never the identity, and
the page can lean hard on the operating record without trapping him inside it.

Everything descends from one physical fact — **a tag hangs, and a hanging thing swings**. The first
viewport is a brass rail with seven bone tags on it, each a damped pendulum with its own natural
frequency, and the visitor's cursor is a force applied to them. Nothing on this page fades up on
scroll. The motion is a simulation the visitor disturbs, and it settles on its own.

The rendering is deliberately **graphic rather than skeuomorphic**. There is no imitation brass, no
bevelled metal, no embossed leather — those are the tells of a machine imitating a material it
cannot actually render. Tags are flat bone rectangles with a punched hole. Depth comes from two
honest sources only: real cast shadow, and real motion.

## Colors

Committed strategy: the petrol field owns the page, and everything else is an object placed on it.

| Token | Role |
|---|---|
| `field` `#0C2B30` | The wall. The dominant surface, 60%+ of the page. |
| `field-lo` `#081F23` | Recessed — compartment interiors, alternate bands, the punched hole. |
| `field-hi` `#123A40` | Raised, and the top of the hero's radial pool. |
| `field-edge` `#17474E` | Hairlines and borders. |
| `bone` `#EDE7D9` | Every tag face, and the ledger. The only large light field. |
| `ink` / `ink-2` | Type on bone. |
| `brass` `#C9A227` | The rail, hooks, cords, key numbers, the primary action. |
| `oxblood` `#8C3131` | Live and in-progress. Also the focused field and the button's hover. |

**Bone is a material, not a background.** It appears only where something is a physical card in this
world — a tag face, the register page. Never use it as a section ground; the field owns the page and
bone objects sit on it.

**Brass carries structure, oxblood carries state.** A brass element is part of the rack — rail, hook,
cord, number, the action that hangs from the header. An oxblood element is a status. Do not swap them.

## Typography

Bricolage Grotesque is stamped: names, section heads, tag faces, key numbers, register entries. It
is set heavy (700–800) with hard negative tracking, tightening as it grows (−0.025em on entries,
−0.045em on the name). Familjen Grotesk does all the reading, plus every label and stamp, where it
runs small with wide positive tracking (0.16–0.18em) — the two directions of tracking are what keep
one voice from blurring into the other. No monospace anywhere; this world stamps and engraves, it
does not print terminal output.

## Layout

Content width is `min(100% - 2.5rem, 74rem)`, gutters widening at 48em. A 4px base runs `--s1`–`--s10`.

**The rack is absolutely positioned against a rail.** Each tag carries four custom properties set
inline — `--x` (position along the rail), `--drop` (cord length), `--w` (face width) and `--tilt`
(resting angle) — and everything else, including the physics, derives from those.

**Below 48em the rack restages rather than shrinks.** Seven tags cannot share a phone: four are
hidden, and the three that remain stack *vertically* — two short tags high, the name hanging clear
beneath them — so nothing competes for the same horizontal band. Scaling all seven down would have
produced a collision, not a layout.

## Elevation & Depth

Three shadows, each with real offset and blur; no zero-offset halos anywhere.

- Tag face: `0 14px 30px -14px rgba(0,0,0,.85), 0 2px 0 rgba(0,0,0,.25)` — the second layer is the card's own thickness.
- Compartment: `inset 0 10px 22px -12px rgba(0,0,0,.9)` — an inset, because a compartment is a hole in the wall, not a card on it.
- Ledger and device: `0 24px 50px -26px rgba(0,0,0,.9)`.

The compartment's inset shadow plus its brass top lip is the whole recess effect. That is the
system's one structural trick and it must not be replaced with a raised card.

## Shapes

Radii are tight and physical: `2px` stamps, `3px` tag faces, `4px` buttons, `8px` compartments and
the ledger. Only the device illustration (`1.6rem`) and the hooks (`50%`) go round, because those
objects are round in life. Nothing else is soft.

Icons are authored SVG. The hooks are stroked circles, the punched holes are filled circles in
`field-lo` — drawn, never glyphs.

## Components

**Tag** — a hook, a cord of `--drop` height, and a bone face with a punched hole. `transform-origin`
is `50% 0` at the hook, so rotating the element swings the cord and the face together, which is why
the cords visibly lean with their tags. This is the system's atom; anything that can hang should be
one.

**Compartment** (`.key`) — a recess: `field-lo` ground, brass top lip, inset shadow, square top
corners and rounded bottom. Explicitly **not** a card, and the page must not reintroduce card-shaped
containers for content.

**Stamp** — the status, rendered as a small bone tag with its own punched hole, sitting in the
compartment's lip row.

**Ledger** (`.ledger`) — the contact form as a register page: bone ground, fields as ruled lines with
a bottom border only, no boxes. The submit button reads "Sign in", not "Submit".

## Do's and Don'ts

- **Do** hang anything that can hang, and give it `--x`, `--drop`, `--w` and `--tilt`.
- **Do** keep bone for objects only; the field owns the page.
- **Do** use brass for structure and oxblood for state, never interchangeably.
- **Do** clamp swing to ±13° — past that a tag stops being readable, and readability outranks the toy.
- **Do** let the physics loop sleep. It parks when every tag is within 0.02° of rest and wakes on the next disturbance; an idle page must cost nothing.
- **Don't** imitate materials. No gradient brass, no bevels, no embossing. Depth is shadow and motion.
- **Don't** reintroduce card containers, project grids, or scroll-triggered fade-ups; the world refuses all three.
- **Don't** add a second light field. One bone object per region at most.
- **Don't** state anything PRODUCT.md does not record as confirmed — the tag labels are load-bearing.
