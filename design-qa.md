**Comparison target**

- Source visual truth: `/Users/nikitaalekseev/Desktop/Снимок экрана 2026-10-27 в 23.33.59.png` and the supplied Pen frame `Партнёрская программа — десктоп` / `Партнёрская программа — мобильная версия`.
- Implementation: browser-rendered `http://127.0.0.1:4173/`.
- Desktop viewport: 1440 × 900 CSS px, device scale factor 1; source reference is 2940 × 1672 px and was compared against the 1440 px canvas content, excluding Pen editor chrome.
- Mobile viewport: 375 × 812 CSS px, device scale factor 1; closed-menu state.

**Findings**

- No actionable P0, P1, or P2 differences in the partner-program first screen.
- Fonts and typography: Montserrat is used for the 48 px / 28 px headings and the exact desktop/mobile hard line breaks from the Pen frame are retained. Futura PT is used for the CTA.
- Spacing and layout rhythm: desktop uses the 860 px content rail, 80 px section padding, 24 px content rhythm, inline markers, and the 8 px CTA offset. Mobile uses 64 px × 16 px padding, 20 px content rhythm, a vertical marker list, and a 52 px full-width CTA.
- Colors and visual tokens: the source #3E2063 → #4A2570 linear gradient, #EBDCF2 supporting copy, #B93BA0 desktop separators, #CC5FCE mobile checks, and #741B75 CTA are mapped directly.
- Image and asset fidelity: only source project assets are used for the shared shell. The hero has no raster artwork in the Pen frame; its two source decorative ellipses are implemented as the matching translucent background layers.
- Copy and content: heading, supporting copy, marker labels, CTA label, and all authored breaks match the Pen frame.

**Comparison history**

1. Desktop comparison found check marks appearing before desktop marker labels. The Pen desktop frame uses only text with two 4 px separator dots. Fixed by hiding checks on desktop while retaining them for the Pen mobile frame.
2. Rechecked desktop at 1440 px and mobile at 375 px. No P0/P1/P2 differences remain in the requested first-screen scope.

**Implementation Checklist**

- [x] Preserve desktop copy, geometry, gradient, markers, and CTA.
- [x] Preserve mobile copy wrapping, marker state, and CTA geometry.
- [x] Verify the shared mobile menu remains operable.

**Follow-up Polish**

- None for the requested first-screen scope.

final result: passed

## Section 2: "Почему стоит начать сейчас"

- Desktop was checked at 1440 px: section padding is 88 px × 80 px, the heading is 36 px, and each of the three cards is 220 px high with 28 px padding.
- Mobile was checked at 375 px: section padding is 56 px × 16 px, the heading is 24 px, cards stack with a 12 px gap, and each card is 343 px wide with 20 px padding.
- The CTA hover color is taken from the corp.pay source: `#68186A`.
- Copy, sources, numerical values, card order, and authored desktop/mobile line breaks match the supplied Pen frame.
