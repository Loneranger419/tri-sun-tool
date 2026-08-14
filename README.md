# Tri-Sun Tool Website

Public website for **Tri-Sun Tool Company** (St. Charles, MO) — precision machining, sheet metal, and fabrication. The site is a simple single page so visitors can see capabilities, equipment, and get in contact quickly.

## Holiday hero logos

The center logo switches by local date (hero background and CTA accents shift to match):

| Window | Logo | Accent |
|--------|------|--------|
| Jun 28 – Jul 7 | Independence Day | Navy / red |
| Nov 15 – Thanksgiving (4th Thursday) | Thanksgiving | Amber / brown |
| Day after Thanksgiving – Dec 26 | Christmas | Evergreen / winter blue / red |
| Dec 27 – Jan 3 | New Year | Midnight / silver |
| Otherwise | Default | Blue / gold |

**On/off switch:** in `main.js`, set `HOLIDAY_LOGOS_ENABLED` to `false` to keep the default logo for all visitors. `?dev=1` preview still works while it’s off.

**Dev preview:** open with `?dev=1` for a corner dropdown plus a date schedule table. Choice sticks for the browser tab via `sessionStorage`. You can also force one with `?holiday=independence`, `thanksgiving`, `christmas`, `newyear`, or `default`.

## Contact (canonical)

- Phone: (636) 947-0406
- Address: 225 Spring Drive, St. Charles, MO 63303
- Maps: https://goo.gl/maps/TysXCb2tej92

## License

Proprietary. See [`LICENSE`](LICENSE) — © 2026 Tri-Sun Tool Company, LLC. All rights reserved.
