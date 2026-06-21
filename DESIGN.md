---
name: Monochrome Authority
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
  deep-neutral: '#111111'
  muted-gray: '#F5F5F5'
  border-subtle: '#E0E0E0'
typography:
  display-xl:
    fontFamily: Montserrat
    fontSize: 80px
    fontWeight: '800'
    lineHeight: 96px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 120px
---

## Brand & Style

This design system is built for a high-end consultancy where strategic precision meets creative execution. The brand personality is authoritative, sophisticated, and uncompromising. It operates at the intersection of business intelligence and cinematic media production.

The chosen aesthetic is **Minimalist Bold**. It relies on extreme high-contrast, massive typographic scales, and purposeful whitespace to convey confidence. By stripping away color, the focus shifts entirely to the quality of the content—be it strategic insights or high-production-value imagery. The mood is premium, architectural, and definitive.

## Colors

The palette is strictly monochromatic to enforce a sense of timeless professionalism and high-end luxury. 

- **Primary Black:** Used for all primary typography, icons, and high-impact background blocks.
- **Pure White:** The foundation of the layout, providing generous "breathable" space and ensuring a crisp, gallery-like feel.
- **Muted Gray:** Used sparingly for secondary backgrounds or subtle UI dividers to prevent visual fatigue without introducing chromatic noise.

Photography and film assets should ideally follow a desaturated or high-contrast color grading to remain cohesive within this system.

## Typography

Typography is the primary vehicle for the brand’s voice. We use **Montserrat** for headlines to provide a geometric, modern, and slightly aggressive stance. **Inter** is used for body copy to ensure maximum legibility and a neutral, systematic feel.

- **Display Scales:** Use the `display-xl` role for hero statements and the "Consult | Create | Communicate" pillars. 
- **Hierarchy:** Ensure a clear distinction between service levels. Labels should always be in uppercase with increased letter spacing to act as "overlines" for headlines.
- **Contrast:** Maintain a strict black-on-white or white-on-black relationship. Avoid mid-tone grays for text to preserve the high-contrast directive.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to mimic the structured feel of a high-end print magazine. 

- **Grid:** A 12-column grid with wide 32px gutters. Elements should often span 4, 6, or 12 columns to maintain a bold, monolithic appearance.
- **Vertical Rhythm:** Generous `section-gap` units of 120px ensure that the consultancy's different service pillars feel distinct and significant.
- **Responsive Behavior:** On mobile, margins shrink to 24px, and columns collapse into a single-column vertical stack. The "Consult | Create | Communicate" pillars transition from a horizontal trio to a vertical sequence of cards.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layering** and **High-Contrast Outlines**. 

Depth is communicated through:
- **Strict Stacking:** Elements sit on clear black or white planes. 
- **Parallax:** As established in the brand's media showcase, depth is achieved through the physical movement of layers (background imagery moving slower than foreground text).
- **Crisp Borders:** Use 1px or 2px solid black/white borders for cards and inputs. There are no blurs; every edge is intentional and sharp.

## Shapes

The primary shape language is **Sharp (0px)** to reflect architectural precision and professional rigor. Squares and rectangles dominate the layout to create a "grid-locked" aesthetic.

**Exception: The Pill.** To differentiate the interactive layer from the structural layer, global navigation and primary call-to-action buttons use a full pill-shaped radius. This contrast makes the "human" interactive elements stand out against the "institutional" grid of the content.

## Components

### Navigation Bar
A floating, **pill-shaped** navigation bar is the centerpiece of the interface. It should feature a translucent white backdrop (`rgba(255, 255, 255, 0.8)`) with a `backdrop-filter: blur(10px)` and a thin 1px black border. This ensures visibility over both text and media content.

### Buttons
- **Primary:** Black background, white Montserrat Bold text, pill-shaped.
- **Secondary:** Transparent background, 1px black border, black Montserrat Bold text, pill-shaped.
- **Interaction:** On hover, primary buttons invert (white background, black text).

### Cards
Cards are used for service descriptions. They feature sharp 90-degree corners, a 1px `border-subtle`, and no shadows. Inverted cards (black background with white text) should be used to highlight the core "Consult | Create | Communicate" sections.

### Input Fields
Inputs are minimalist: a single 1px black bottom-border with Montserrat labels. Focus states are indicated by the border thickness increasing to 2px.

### Chips & Labels
Used for industry tagging (e.g., "FMCG", "Automobile"). These are small, uppercase labels with high letter-spacing, enclosed in a 1px sharp-edged box.