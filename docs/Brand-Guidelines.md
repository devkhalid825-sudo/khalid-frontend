# Elipse Studio: Brand Guidelines (extracted from the website code)

Source: `src/app/globals.css`, `src/app/layout.jsx` and the components. Colour counts are how often each colour is used in the site code.

## Fonts (all free, Google Fonts)

| Use | Font | Weight | Notes |
|---|---|---|---|
| **Headings** (H1–H6, numbers/metrics) | **Poppins** | 600 (SemiBold), 700 for hero/article titles | Letter-spacing -0.02em (tight) |
| **Body / paragraphs** | **Lora** (serif) | 400 Regular, 500 for bold words, Italic for emphasis | 17px mobile, 18px desktop, line-height 1.75 |
| **UI / some sections** (client reviews, buttons) | **Inter** | 400–800 | Used where a clean sans is needed |
| **Table headers / code-like labels** | JetBrains Mono | Bold, uppercase | Only in article data tables |

Available weights loaded on the site: Poppins 400–800, Lora 400–700 (+italic), Inter 400–800.

### Heading sizes in use
- Section heading (e.g. "Latest Work", "Latest News & Blogs"): 24px mobile, 36px tablet, 44px desktop, SemiBold, line-height 1.1
- Page hero (H1): 36–72px depending on page, line-height about 1.1
- Small eyebrow labels: 11–14px, UPPERCASE, wide letter-spacing (0.2em+), bold

## Colours

### Primary blues
| Name | HEX | Where |
|---|---|---|
| **Brand blue (buttons)** | **#3558D4** | Main buttons, CTAs, links on hover |
| Brand blue hover | #2A48B8 | Button hover state |
| **Royal blue (accent)** | **#4169E1** | Accent dot ".", eyebrows, highlights (most used colour) |
| Link blue | #2563EB | Text links, italic accents |
| Deep blue | #223A9F | News section, footer, big CTA banners |
| Bright blue | #3B82F6 | Marquee separators, small accents |

### Neutrals
| Name | HEX | Where |
|---|---|---|
| **Black** | **#000000** / #0D0D0D | Dark sections, hero, tables headers |
| Near-black | #1A1A1A / #0E0E10 | Cards on dark backgrounds |
| **White** | **#FFFFFF** | Light pages, text on dark |
| Warm off-white | #F2F0EB | Soft section backgrounds |
| Heading text (light mode) | #0B0D14 | Headings on white |
| Muted text on dark | #A9A9AE | Sub-headings on black |
| Muted text on light | #55555C | Sub-headings on white |

## Theme in one line
**Black and white base with royal/brand blue as the accent.** Dark mode uses black backgrounds with white text and blue accents. Light mode uses white backgrounds with near-black text and the same blues. Deep blue (#223A9F) is used for large coloured bands (News, CTA, footer).

## Buttons
- Primary: background #3558D4, white text, fully rounded (pill), semi-bold, small shadow; hover #2A48B8.
- Secondary: white background with #223A9F text (on blue bands), or a thin grey border with dark text (on white).

## Logo files (in the project)
- `src/assets/images/khalid.png` : main logo
- `src/assets/images/elipse-icon-white.png` / `elipse-icon-black.png` : icon mark (white for dark backgrounds, black for light)
- `src/assets/images/logo.webp`
