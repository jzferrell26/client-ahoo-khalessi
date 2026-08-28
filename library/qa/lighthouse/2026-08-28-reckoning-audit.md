# CTC Equity production Lighthouse audit

Date: 2026-08-28

Target: `https://ctcequity.com`

Status: Baseline complete. Remediation is implemented on `agent/ctc-equity/website-hardening` and awaits production verification.

## Method

- Lighthouse 12.6.1
- Mobile form factor
- Simulated mobile throttling
- Chrome headless
- Three sequential homepage passes to reduce single-run variance
- One mobile pass each for `/get-my-options`, `/heloc`, and `/team`
- PageSpeed Insights field-data request attempted, but the public API returned HTTP 429. No CrUX field claims are made in this report.

## Baseline results

| Page | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage, median of 3 | 69 | 82 | 96 | 92 | 3.6 s | 6.8 s | 10 ms | 0.010 |
| `/get-my-options` | 79 | 82 | 96 | 100 | 2.9 s | 4.5 s | 0 ms | 0.017 |
| `/heloc` | 72 | 90 | 96 | 100 | 3.3 s | 4.8 s | 0 ms | 0.110 |
| `/team` | 72 | 88 | 96 | 100 | 3.1 s | 6.4 s | 10 ms | 0.004 |

Homepage performance scores across the three passes were 69, 66, and 70. The median is used above.

## Findings and actions

### P0: image delivery

Lighthouse estimated 788 KiB of responsive-image waste and 863 KiB of next-generation-format savings on the homepage. The primary causes were a 294,735-byte remote EMC logo displayed at 34 px and five oversized PNG headshots displayed at 64 to 88 px.

Implemented:

- Replaced the remote navigation EMC logo with the existing local source.
- Added a 6,732-byte WebP EMC logo with PNG fallback.
- Added 192 px AVIF and WebP variants for all five headshots with PNG fallback.
- Added explicit `width` and `height` values.
- Lazy-loaded below-fold headshots and the lower-page EMC logo.

The static image payload for these assets falls from about 958 KB to about 34 KB when AVIF and WebP are supported, a reduction of about 924 KB before lazy-loading savings.

### P0: render-blocking styles

All audited pages reported roughly 1.25 to 1.71 seconds of potential render-blocking savings. The current root loads three Google font families through a render-blocking stylesheet. This remains a follow-up because safe remediation requires self-hosting and font subsetting, not a one-line preload change.

### P1: accessibility

Implemented:

- Connected every lead-form label to its input with `htmlFor` and `id`.
- Added an explicit label association for both form selects.
- Updated the co-branded logo link accessible name to include its visible text.
- Replaced the non-navigating recognition anchor with a semantic `div`.

Remaining:

- Several design tokens fail color-contrast checks, especially cyan on white and white on cyan.
- Footer links need a non-color affordance such as underlining.
- The team page contains a heading-order issue.

These remaining items affect shared visual styling and should be handled as a focused accessibility pass with visual review.

### P1: SEO and browser hygiene

Implemented:

- Added a real favicon.
- Removed duplicate template metadata that described the site as a generic Website Kit.
- Removed placeholder URLs from public structured data while retaining confirmed LinkedIn data.
- Replaced the homepage anchor without an `href`, the cause of the homepage crawlability failure.

The favicon 404 was the only console error in the audit.

## Next verification

After production deployment:

1. Run three new sequential mobile homepage passes.
2. Re-run `/get-my-options`, `/heloc`, and `/team` once each.
3. Confirm the image-format, form-label, crawlable-anchor, favicon, and label-name findings are cleared.
4. Record post-deploy scores in this report without comparing a single run against the three-run median.
