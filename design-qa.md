**Comparison target**

- Source visual truth: `/Users/nikitaalekseev/Desktop/Снимок экрана 2026-10-27 в 23.33.59.png` and the supplied Pen frame `Партнёрская программа — десктоп` / `Партнёрская программа — мобильная версия`.
- Implementation: browser-rendered `http://127.0.0.1:4173/`.
- Desktop viewport: 1440 × 1000 CSS px, device scale factor 1; source reference is 2940 × 1672 px and was compared against the normalized 1440 px canvas content, excluding Pen editor chrome.
- Mobile viewport: 375 × 667 CSS px, device scale factor 1; closed-menu state.

**Findings**

- No actionable P0, P1, or P2 differences in the partner-program first screen.
- Fonts and typography: Montserrat is used for the 48 px / 28 px headings and the exact desktop/mobile hard line breaks from the Pen frame are retained. Futura PT is used for the CTA.
- Spacing and layout rhythm: desktop uses the 860 px content rail, 80 px section padding, 24 px content rhythm, inline markers, and the 8 px CTA offset. Mobile uses 64 px × 16 px padding, 20 px content rhythm, a vertical marker list, and a 52 px full-width CTA.
- Colors and visual tokens: the requested #3E2063 → #503072 linear gradient, #EBDCF2 supporting copy, #B93BA0 desktop separators, #CC5FCE mobile checks, and #741B75 CTA are mapped directly.
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

Section 1 result: passed

## Section 2: "Почему стоит начать сейчас"

- Desktop was checked at 1440 px: section padding is 88 px × 80 px, the heading is 36 px, and each of the three cards is 220 px high with 28 px padding.
- Mobile was checked at 375 px: section padding is 56 px × 16 px, the heading is 24 px, cards stack with a 12 px gap, and each card is 343 px wide with 20 px padding.
- The CTA hover color is taken from the corp.pay source: `#68186A`.
- Copy, sources, numerical values, card order, and authored desktop/mobile line breaks match the supplied Pen frame.

## Section 3: "Как это работает"

- Desktop was checked at 1440 px: section padding is 88 px × 80 px, the steps rail is 1280 px, and the four equal columns are 296 px wide with 32 px gaps.
- Mobile was checked at 375 px: section padding is 56 px × 16 px, four steps stack vertically, and the first three numbered rails use source-matched 2 px × 100 px connectors.
- Copy, ordering, paragraph separation, typography, and colors are mapped directly from the Pen desktop and mobile frames.

## Section 4: "Чем выше статус, тем больше вознаграждение"

- Desktop was checked at 1440 px: section padding is 88 px × 80 px, the 1280 px status rail has three equal 413.33 px cards with 28 px padding.
- Mobile was checked at 375 px: section padding is 56 px × 16 px, cards stack vertically at 343 px wide with 24 px padding.
- The source status colors, `award` and check glyphs, benefits, tier thresholds, percentages, gradient, and all three footnotes are retained.

## Section 5: "Статус не снижается из-за одного слабого месяца"

- Desktop was checked at 1440 px: section padding is 88 px × 80 px, the sequence is 1280 px wide, each monthly card is 189 px × 188 px, and the three-month fixed group is 607 px wide.
- Mobile was checked at 375 px: section padding is 56 px × 16 px; six 343 px-wide month rows stack vertically and the desktop arrows are omitted as in the Pen mobile frame.
- The month order, fixed-status label, monthly results, tier colors, lock glyphs, and the three explanatory rules match the source frames.

## Section 6: "Выгодно и вам, и клиенту"

- Desktop was checked at 1440 px: section padding is 88 px × 80 px, the audiences rail is 1280 px × 448 px, and the two panels are 628 px × 448 px.
- Mobile was checked at 375 px: section padding is 56 px × 16 px, audience panels stack vertically at 343 px wide, followed by the shared-benefits card.
- Both audience lists, shared benefits, source colors, typography, and authored mobile title breaks are retained.

## Sections 7–9: objections, FAQ, partner form

- The objections section uses the exact `#EDE3F4` fill, 760 px desktop chat rail, authored message widths and mobile text wrapping.
- The FAQ uses a single-open-item accordion. The first item is expanded on initial load; opening another question collapses the previous one.
- The application block uses the requested `#3E2063 → #503072` gradient, matching form geometry, shared CTA hover state, and the checked-state SVG tick.
- The fixed-status label is positioned at the source x-offset above the October–December group.
- `Montserrat` and `Futura PT` files match the `corp.pay` files byte-for-byte by SHA-256.

final result: passed

## Form states and requested icon/badge corrections

- The partner-application background uses the same continuous diagonal gradient and glow treatment as the hero, following the latest request.
- Monthly-result badges use the Pen fills and award glyphs: base `#E6E0EC`, gold `#D6BFE8`, and platinum `#CC5FCE → #A32A8D`.
- The shared-benefits headset is the exact Lucide `headset` geometry from the Pen source.
- Empty contact submission was exercised in Chrome: the contact field receives `#E6484B`, and “Укажите Telegram или email для связи” appears directly below it in `#FF8A8D`.
- Valid submission was exercised in Chrome: the button enters the 270° spinner state and then switches to the circle-check success state with the exact supplied copy. The same form markup and JavaScript state machine are used below and above the 900 px breakpoint.

Form-state result: passed

## Focus, partner background, and objection-message motion

- The form inputs now use a `1.5px` `#A32A8D` border while focused; the validation state remains `#E6484B` and takes precedence.
- The partner section was visually rechecked against the hero. Both compute to `linear-gradient(135deg, #3E2063 0%, #503072 100%)`, with identical 750 px/650 px blurred white glow layers and opacity values.
- At 375 px, both sections use the same 400 px upper-left glow and hide the lower-right glow.
- The seven objection messages start hidden only after JavaScript initializes, then reveal in DOM order at `0, 300, 600, 900, 1200, 1500, 1800ms` after the section intersects the viewport.
- With `prefers-reduced-motion: reduce`, every message is shown immediately and transitions are disabled.

Requested-state result: passed
