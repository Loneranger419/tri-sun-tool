# Tri-Sun Website — agent knowledge

## What
Static single-page site for Tri-Sun Tool Company. Goal: show shop info + contact. No framework/build.

## Paths
- Live site root: `index.html`, `styles.css`, `main.js`, `assets/`
- GitHub: `Loneranger419/tri-sun-tool` (public), Pages: https://loneranger419.github.io/tri-sun-tool/
- Archive (local, untracked): `Tri-Sun Old Site/`

## Brand
- Blue: `#0066cc` / deep `#004a99` / ink `#0a2a4a`
- Gold: `#c9a227` / bright `#e0b83a`
- Surface: warm neutrals `#f3f0e8` / `#e8e3d6`
- Fonts: Barlow Condensed (display), Source Sans 3 (body)
- Header logo: `assets/Logo - Minimal.png` (transparent, cropped; original backup `Logo - Minimal.original.png`)
- Hero logo default: `assets/Logo - Reimage Var 3 - Fixed.png`
- Seasonal hero logos gated by `HOLIDAY_LOGOS_ENABLED` in `main.js` (true/false). When false, visitors always get default; `?dev=1` preview still works.
- Seasonal hero logos (local date) + matching hero background accents + soft drifting glow animation:
  - Independence: Jun 28–Jul 7 → `Logo - Independence Day.png` (navy/red)
  - Thanksgiving: Nov 15–Thanksgiving (4th Thu) → `Logo - Thanksgiving.png` (amber/brown)
  - Christmas: day after Thanksgiving–Dec 26 → `Logo - Christmas.png` (evergreen/blue/red)
  - New Year: Dec 27–Jan 3 → `Logo - New Year.png` (midnight/silver)
- Preview: `?dev=1` shows corner selector + simple schedule table; `?holiday=christmas` etc. forces a logo
- Other logo variants in `assets/` for reference only

## Contact (source of truth)
- Phone: (636) 947-0406 / tel:+16369470406
- Address: **225** Spring Drive, St. Charles, MO 63303 (old site sometimes said 255 — wrong)
- Maps: https://goo.gl/maps/TysXCb2tej92

## Page sections
1. Sticky header: logo + Capabilities / Equipment / Contact
2. Hero: brand logo dominant, one lead line, Call + Directions CTAs
3. Capabilities (from old capabilities.html)
4. Equipment (from old equipment.html)
5. Contact + footer repeat

## Constraints
- Keep simple; no contact form/backend unless requested
- Prefer content accuracy from archive; address always 225
- Frontend design rules: brand-first hero, no hero cards/overlays, avoid purple/cream-AI defaults
