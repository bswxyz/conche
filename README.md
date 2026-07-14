# Conche — bean-to-bar chocolate, ground slow

A design-showcase website template for **Parable**: the storefront of a fictional two-person
bean-to-bar chocolate workshop. Five single origins, two ingredients, and a brand voice that
talks percentages and tempering temperatures the way a winemaker talks terroir.

**Live demo:** https://bswxyz.github.io/conche/ · **Build guide:** https://bswxyz.github.io/conche/guide/

## The concept

Everything a chocolate maker actually does is invisible by the time you hold the bar. Conche
plots it instead of describing it:

- **The origin flavor-wheel** — 18 tasting notes in 6 families, rendered as a radial SVG whose
  arc geometry is computed at build time. Hover, tap or tab through an origin and the wheel
  lights exactly the notes that bar hits (and dims everything it doesn't), while the hub and an
  `aria-live` caption swap to that origin.
- **The tempering curve** — one batch from the log, drawn as a single SVG path with
  `pathLength="1"` that plots itself on scroll into view: melt to 45 °C, cool and seed Form Ⅴ
  at 26.8 °C, rework to 31.5 °C and hold.
- **The snap** — the hero bar loads whole, then its corner pieces snap off ~1s in. Without JS
  (or with reduced motion) the bar simply renders already snapped.

## Design system

| Token | Light (default) | Dark |
| --- | --- | --- |
| `--bg` | cream `#f6efe3` | cocoa `#211511` |
| `--ink` | cocoa `#211511` | cream `#f6efe3` |
| accent | gold `#c98a3c` | gold `#c98a3c` |
| secondary | cacao red `#8f3b2e` | cacao red (lifted) |

- **Type:** Playfair Display (display) · Karla (body) · Space Mono (lot numbers, temperatures, microns)
- **Ease:** `cubic-bezier(.77, 0, .16, 1)` — "the temper": slow melt in, clean snap out
- Both themes flip on `:root[data-theme]`, toggled in the nav and persisted as `conche-theme`

## Stack

- [Astro 5](https://astro.build) — content as frontmatter data arrays, zero client framework
- One small vanilla `<script>` for theme, reveals, counters, the wheel and the demo form
- All art is inline SVG drawn from theme tokens — no image files, no chart library, no JS CDN
  (the only external requests are the three typefaces from Google Fonts)

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321/conche/
npm run build      # builds to ./docs for GitHub Pages
```

## Structure

```
src/
  pages/index.astro          # the page — data in frontmatter, sections in template
  pages/guide.astro          # "How Conche was built" → /guide/
  components/FlavorWheel.astro   # signature #1 — build-time arc geometry
  components/TemperCurve.astro   # signature #2 — self-drawing SVG path
  components/HeroBar.astro       # the hero bar + the snap
  components/BarMold.astro       # six mold patterns for the shop cards
  styles/global.css          # design tokens (both themes) at the top
public/.nojekyll
astro.config.mjs             # base '/conche', outDir './docs'
```

## Demo vs. real

This is a design showcase, not a shop. Conche is not a real chocolate maker; origins, prices,
lot numbers and the batch log are invented (plausibly). The **batch-list form is a demo** — it
validates and confirms in place but sends and stores nothing. Wire it to your own endpoint
before collecting real addresses, and swap the stockists for yours.

## Accessibility & motion

- Content is never hidden without JavaScript (`.js` gate set synchronously in `<head>`)
- Full `prefers-reduced-motion` support: the curve renders fully drawn, the bar pre-snapped,
  counters at their targets — one honest static frame
- Skip link, `:focus-visible` outlines, real `<button>`s with `aria-pressed`, `aria-live`
  caption on the wheel, decorative art `aria-hidden`

## License

MIT — see [LICENSE](./LICENSE). Designed & built by Parable.
