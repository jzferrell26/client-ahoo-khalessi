# PRD-001c: Zillow reviews and the weekly refresh routine

> **Parent:** [PRD-001: CTC Equity website, pending work](./prd-001-website-pending-work-index.md)
> **Status:** Draft
> **Priority:** P2
> **Effort:** M (3-8h)

---

## Overview

Two requests that are really one: put Zillow reviews on the site, and keep them fresh without anyone doing it by hand. Options discussed were a scheduled routine that pulls reviews and publishes them, versus dropping in a third-party widget. Jonathan preferred building a routine. Nothing is built yet.

---

## Goals

- Zillow reviews are visible on the site.
- Reviews refresh on a weekly schedule with no manual step.
- The reviews surface is additive: a new component or page, never an edit that reshapes an earning page's content.
- A stale or failed refresh degrades gracefully instead of blanking the section or breaking the build.

## Non-Goals

- Aggregating reviews from other platforms (Google, Facebook, Experience.com). Zillow only for now.
- Building a review-solicitation flow that asks borrowers to leave reviews. That is an ops-lane campaign, not a website feature.
- Editing or curating individual review text. Reviews are shown as published or not shown at all.

---

## Acceptance criteria

| ID | Criterion |
|---|---|
| AC-1c-1 | Given the deployed site, when a page carrying the reviews surface is loaded, then at least one real Zillow review renders with its reviewer attribution and its rating. |
| AC-1c-2 | Given the reviews data source, when the implementation is inspected, then the chosen approach (a scheduled routine that stores fetched reviews in the repository, versus an embedded third-party widget) is recorded in a committed document with the reason for the choice. Jonathan's stated preference was a routine; if the implementation ends up as a widget, the document states why. |
| AC-1c-3 | Given the refresh mechanism, when it is inspected, then it is scheduled to run at least weekly, and the schedule is defined in a committed file (a workflow file, a cron definition, or an equivalent) rather than existing only in someone's account. |
| AC-1c-4 | Given a refresh run, when it completes successfully, then the reviews rendered on the site reflect the newly fetched set without a manual code edit by a human. |
| AC-1c-5 | Given a refresh run that fails or returns no reviews, when the site is next loaded, then the previously fetched reviews still render and no empty section, error state, or broken layout is shown to a visitor. |
| AC-1c-6 | Given the reviews surface, when the page it lives on is identified, then it is either a new page or a new component added to a page, and `git diff e3fe236..HEAD` shows no change to `src/routes/free-home-value-report.tsx` and no change to prose, headings, or JSON-LD in `src/routes/index.tsx` attributable to this sub-PRD. |
| AC-1c-7 | Given the reviews markup, when the rendered HTML is inspected, then any review structured data emitted is valid and is attached to the correct entity. If `Review` or `AggregateRating` JSON-LD is emitted, it validates without errors and it is not attached to an entity the reviews do not describe. If emitting it is not appropriate, the decision to omit it is recorded. |
| AC-1c-8 | Given the reviews implementation, when it is inspected for credentials, then no API key, token, or account credential appears in client-side code or in any file committed to the repository. Any secret is read from the deployment's secret store, consistent with how `src/routes/api.lead.ts` reads its webhook URLs server side. |
| AC-1c-9 | Given the reviews page or component, when it is rendered at a mobile viewport width of 390 pixels, then reviews remain readable and the layout does not overflow horizontally. |
| AC-1c-10 | Given the review content displayed, when it is compared against the source, then reviewer names and text match the source as published. No review is invented, edited, paraphrased, or filtered to remove unfavourable content. |

---

## Implementation notes

- Zillow does not offer a general-purpose public reviews API for this use case, so the two live options really are a scraping-style scheduled routine or an embedded widget. Confirm the current terms and technical route before building, rather than assuming either path works. If the routine proves unworkable, that is a real finding and belongs in AC-1c-2's decision record, not a silent switch.
- A scheduled routine should write its fetched output into the repository (or into a store the site reads at build or request time) so that AC-1c-5's graceful-degradation requirement is satisfied by simply serving the last good file.
- The site already has a precedent for keeping secrets server side in `src/routes/api.lead.ts`. Follow it.

---

## Open questions

- [ ] Routine versus widget. Owner: Jonathan. Preference stated as routine; confirm feasibility before committing.
- [ ] Which Zillow profile or profiles are the source: Ahoo's, Ben's, or a combined CTC Equity presence. Owner: client.
- [ ] Which page the reviews live on: a new `/reviews` page, the new `/team` page from `prd-001a`, or both. Owner: Jonathan.
