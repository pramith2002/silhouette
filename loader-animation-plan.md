# Logo Loader Animation - Engineering Implementation Blueprint

Version: 1.0

Stack:

- React
- GSAP
- TailwindCSS
- Lenis
- SVG

Purpose:

Create a premium logo-driven loading experience where:

1. Triangle A appears.
2. Triangle B rotates into place.
3. Triangle C rotates into place.
4. Inner eye stroke is drawn.
5. Outer eye stroke is drawn.
6. Lens fades in.
7. Lens highlights fade in.
8. Lens performs autofocus animation.
9. Eye and triangles fade away.
10. User zooms into the lens.
11. Lens becomes a reveal portal.
12. Website is revealed.

---

# Visual Story

The animation should communicate:

Geometry
→
Eye
→
Camera
→
Focus
→
Portal
→
Website

The animation should feel intentional and cinematic.

Avoid:

- spinning logos
- excessive rotation
- long pauses
- flashy transitions

---

# Final SVG Structure

The SVG must contain the following layers.

logo

├── triangle-A
├── triangle-B
├── triangle-C

├── inner-eye-stroke
├── outer-eye-stroke

├── lens
│
├── lens-outer-ring
├── lens-middle-ring
├── lens-inner-ring
└── highlights

All layer names must remain stable.

The developer will target these names directly through GSAP.

---

# Project Structure

src

components

├── Loader
│ ├── Loader.jsx
│ ├── LogoSvg.jsx
│ └── loader.css

hooks

├── useLoaderAnimation.js

assets

├── logo.svg

---

# Loader Architecture

Application

├── Loader Overlay
│
│ ├── SVG Logo
│ └── Reveal Mask
│
└── Website Content

Loader must sit above all content.

z-index:

9999

Position:

fixed

Inset:

0

---

# Loader State Flow

Initial State

showLoader = true

↓

Animation Runs

↓

Reveal Website

↓

showLoader = false

↓

Unmount Loader

---

# Initial Page Setup

Before animation begins:

1. Disable scrolling.
2. Hide website content.
3. Display loader overlay.

Pseudo flow:

Website opacity = 0

Loader opacity = 1

Lenis.stop()

---

# SVG Preparation

Drawable Layers

inner-eye-stroke

outer-eye-stroke

must use:

stroke

not fills.

Required:

fill="none"

stroke="#color"

---

# Draw Animation Setup

For every drawable path:

const length = path.getTotalLength()

path.style.strokeDasharray = length
path.style.strokeDashoffset = length

This creates:

100% hidden stroke

Animation:

strokeDashoffset → 0

---

# GSAP Timeline

Create a single master timeline.

Never create multiple independent timelines.

const tl = gsap.timeline()

Every animation should belong to this timeline.

---

# Timeline Breakdown

Total Runtime

2.8s - 3.5s

Maximum.

---

# Phase 1

Triangle A

Start:

0.0s

Animation:

opacity: 0 → 1

scale: 0.85 → 1

Duration:

0.4s

Ease:

power2.out

Purpose:

Create foundation.

---

# Phase 2

Triangle B

Start:

0.2s

Animation:

rotation: -18deg → 0deg

x: -20px → 0px

opacity: 0 → 1

Duration:

0.5s

Ease:

power3.out

Purpose:

Assembly begins.

---

# Phase 3

Triangle C

Start:

0.35s

Animation:

rotation: 18deg → 0deg

x: 20px → 0px

opacity: 0 → 1

Duration:

0.5s

Ease:

power3.out

Purpose:

Complete geometry.

---

# Phase 4

Inner Eye Stroke

Start:

0.6s

Animation:

strokeDashoffset

length → 0

Duration:

0.6s

Ease:

none

Direction:

Left → Right

Purpose:

Begin eye formation.

---

# Phase 5

Outer Eye Stroke

Start:

0.8s

Animation:

strokeDashoffset

length → 0

Duration:

0.7s

Ease:

none

Direction:

Left → Right

Purpose:

Complete eye silhouette.

Important:

Do not wait for inner stroke to finish.

Overlap animations.

---

# Phase 6

Lens Fade In

Start:

1.1s

Target:

lens

Animation:

opacity: 0 → 1

scale: 0.95 → 1

Duration:

0.3s

Ease:

power2.out

Purpose:

Lens materializes.

NOTE:

Lens does NOT use draw animation.

Lens should fade in.

---

# Phase 7

Highlights Fade In

Start:

1.25s

Target:

highlights

Animation:

opacity: 0 → 1

Duration:

0.2s

Ease:

power1.out

Purpose:

Bring lens to life.

---

# Phase 8

Autofocus Effect

Start:

1.5s

Target:

lens group

Animation:

scale:

1 → 1.08 → 1

rotation:

0 → 6deg → 0

Duration:

0.4s

Ease:

power2.inOut

Purpose:

Simulate camera focus.

This is a key premium detail.

Do not remove.

---

# Phase 9

Prepare Portal Transition

Start:

1.9s

Targets:

triangle-A
triangle-B
triangle-C

inner-eye-stroke
outer-eye-stroke

Animation:

opacity: 1 → 0

Duration:

0.4s

Purpose:

Shift focus to lens.

After this step:

Only lens remains visible.

---

# Phase 10

Lens Zoom

Start:

2.1s

Target:

lens

Animation:

scale

1 → 2 → 5 → 15 → 40

Duration:

1.0s

Ease:

power3.inOut

Purpose:

Create sensation of entering camera.

Transform Origin:

center center

Required.

---

# Phase 11

Reveal Mask Expansion

Runs simultaneously with Lens Zoom.

Create a circular mask.

Center:

lens center

Initial:

circle(60px)

Final:

circle(150vw)

Duration:

1.0s

Ease:

power3.inOut

Purpose:

Reveal website through lens.

---

# Phase 12

Website Reveal

Start:

2.3s

Target:

Website Container

Animation:

opacity

0 → 1

Duration:

0.6s

Purpose:

Website emerges from lens.

---

# Phase 13

Loader Exit

Start:

3.0s

Target:

Loader

Animation:

opacity

1 → 0

Duration:

0.3s

Purpose:

Remove overlay.

---

# Phase 14

Cleanup

After timeline completion:

Lenis.start()

setShowLoader(false)

Unmount loader component.

---

# React Implementation Notes

Use:

useLayoutEffect

instead of:

useEffect

for GSAP.

Reason:

Prevents visual flashes.

---

Recommended:

useGSAP()

from:

@gsap/react

if available.

---

# Ref Structure

const triangleARef = useRef()

const triangleBRef = useRef()

const triangleCRef = useRef()

const innerEyeRef = useRef()

const outerEyeRef = useRef()

const lensRef = useRef()

const highlightRef = useRef()

const loaderRef = useRef()

---

# GSAP Context

Use:

gsap.context()

Cleanup:

return () => ctx.revert()

Prevents memory leaks.

---

# Performance Requirements

Only animate:

transform
opacity
strokeDashoffset

Avoid animating:

width
height
left
top
margin

These trigger layout recalculation.

---

# GPU Acceleration

Apply:

will-change: transform

to:

lens

loader

website container

during animation.

---

# SVG Optimization

Before committing SVG:

Run through SVGO.

Remove:

- metadata
- unused groups
- unnecessary transforms

Goal:

Small SVG size.

---

# Accessibility

Respect reduced motion.

Check:

prefers-reduced-motion

If enabled:

Skip animation.

Immediately show website.

---

# Loading Strategy

Animation should not block the website.

Recommended:

Minimum display:

1.8 seconds

Maximum display:

3.5 seconds

If content loads early:

Complete animation.

If content loads late:

Hold final lens state until ready.

Never abruptly cut animation.

---

# Final User Experience

Page Opens

↓

Triangle A Appears

↓

Triangle B Rotates In

↓

Triangle C Rotates In

↓

Inner Eye Draws

↓

Outer Eye Draws

↓

Lens Fades In

↓

Highlights Appear

↓

Lens Focuses

↓

Triangles And Eye Fade Away

↓

Lens Becomes Portal

↓

User Travels Through Lens

↓

Website Revealed

↓

Loader Removed

The animation should feel like a camera being assembled, focusing, and transporting the user into the world behind the lens.
