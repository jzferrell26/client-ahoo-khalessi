# PRD-001a: Team presentation

> **Parent:** [PRD-001: CTC Equity website, pending work](./prd-001-website-pending-work-index.md)
> **Status:** Draft
> **Priority:** P1
> **Effort:** M (3-8h)

---

## Overview

Two related complaints from the client resolve here. First, Ahoo and Ben are the team leads but the homepage renders all five members at the same visual weight, and the last two members are in the wrong order. Second, the client keeps reporting that "the meet the team page is not on the website", which is accurate: a `#team` **section** exists on the homepage, but there is no standalone page and no navigation link.

A third item rides along: the homepage hero "Get My Options" button still scrolls the homepage form while the header CTA now navigates to `/get-my-options`. That is a decision, not a task, and it is gated below.

---

## Goals

- Ahoo and Ben read visually as team leads, laid out horizontally, with the remaining three members stacked below.
- Member order matches what the client confirmed: Ahoo, Ben, Bobby, Susan, James.
- A standalone `/team` page exists and is reachable from the navigation.
- The hero CTA question is answered on the record rather than left ambiguous.

## Non-Goals

- Rewriting any team member's bio text. Missing bios are handled in `prd-001d`.
- Changing headshots, adding new members, or removing existing ones.
- Restructuring the homepage beyond the team section.
- Adding the `/team` page to any existing earning page's content.

---

## Current state (verified in source 2026-08-25)

- `TeamSection` is defined in `src/routes/index.tsx` and renders the section at `id="team"`.
- Current render order: Ahoo Khalessi, Ben Mokri, Bobby Khalessi, Dong-Jin Kim, Susan O'Donovan. The last two are reversed relative to the confirmed order.
- "James" and "Dong-Jin Kim" are the same person. The required order names him as James in fifth position; the rendered display name is a separate decision, and this PRD does not require renaming him.
- `src/components/site/SiteNav.tsx` defines `NAV_LINKS` with seven entries: HELOC, Fixed Second, DSCR, Self-Employed, Analyzer, Blog, FAQ. There is no team entry.
- The hero buttons at `src/routes/index.tsx` lines 137 and 140 use `<Link to="/" hash="getstarted">`. The header CTA in `SiteNav.tsx` uses `to="/get-my-options"` on both the desktop and the mobile branch.

---

## Acceptance criteria

| ID | Criterion |
|---|---|
| AC-1a-1 | Given the homepage team section, when it is rendered at a desktop viewport, then Ahoo Khalessi and Ben Mokri appear side by side in a single horizontal row above the other members, and their cards are visibly larger than the cards of the remaining three members. |
| AC-1a-2 | Given the homepage team section, when it is rendered at a desktop viewport, then Bobby Khalessi, Susan O'Donovan, and Dong-Jin ("James") Kim appear below the two leads, in that order, left to right or top to bottom. |
| AC-1a-3 | Given the homepage team section, when the rendered member sequence is read top to bottom, then it is exactly: Ahoo Khalessi, Ben Mokri, Bobby Khalessi, Susan O'Donovan, Dong-Jin Kim. Susan now precedes Dong-Jin, which is the correction being made. |
| AC-1a-4 | Given the homepage team section, when it is rendered at a mobile viewport width of 390 pixels, then all five cards remain readable, do not overflow horizontally, and preserve the order from AC-1a-3. |
| AC-1a-5 | **Earning-page constraint.** Given the diff for this sub-PRD, when `git diff e3fe236..HEAD -- src/routes/index.tsx` is reviewed, then every changed line falls inside `TeamSection` (or a component it newly delegates to) and is limited to layout, sizing, and member ordering. No bio text, name, NMLS string, headshot path, heading, meta tag, or JSON-LD block on the homepage is altered by this sub-PRD. `src/routes/index.tsx` carries the LLM content that is earning citations, so a diff outside `TeamSection` fails this criterion even if it looks like an improvement. |
| AC-1a-6 | Given the deployed site, when `/team` is requested, then it returns HTTP 200 and renders a standalone team page listing all five members in the order from AC-1a-3. |
| AC-1a-7 | Given the `/team` page, when its head metadata is inspected, then it has its own `<title>`, its own meta description, and a canonical link pointing at `https://ctcequity.com/team`. |
| AC-1a-8 | Given `src/routes/sitemap[.]xml.ts`, when it is inspected, then `/team` has been added as a new entry and every pre-existing entry is unchanged. |
| AC-1a-9 | Given the site navigation, when `NAV_LINKS` in `src/components/site/SiteNav.tsx` is inspected, then it contains an entry pointing to `/team`, and that entry renders in both the desktop and the mobile navigation. |
| AC-1a-10 | Given the `/team` page, when it is compared against the homepage team section, then no homepage content was moved to `/team` and removed from the homepage. The `/team` page is additive; the homepage `#team` section still renders. This follows the additive-growth rule: new surfaces are added, earning surfaces are not hollowed out. |
| AC-1a-11 | **Gated on a decision by Jonathan.** Given the open question "should the homepage hero Get My Options button be aligned to `/get-my-options`?", when the run finishes, then either (a) Jonathan has answered "no" and `src/routes/index.tsx` lines 137 and 140 are unchanged, or (b) Jonathan has answered "yes" and exactly those hero `Link` targets have been changed with no other change to `index.tsx`. If no answer has been given, the criterion is recorded as blocked on Jonathan and no code change is made. Guessing the answer is a failure. |

---

## Implementation notes

- Prefer extracting the team markup into a shared component (for example `src/components/site/TeamMembers.tsx`) that both `TeamSection` in `index.tsx` and the new `/team` route consume. That keeps the order defined once, which makes AC-1a-3 verifiable in a single place, and it keeps the `index.tsx` diff small, which is what AC-1a-5 requires.
- The new route file follows the existing convention: `src/routes/team.tsx` with `createFileRoute("/team")`, a `head()` returning title, description, and canonical, and the standard `SiteNav` plus `SiteFooter` shell used by `src/routes/get-my-options.tsx`.
- `src/routeTree.gen.ts` is generated at build time and is committed. Run the build so the new route lands in it.

---

## Open questions

- [ ] Should the fifth member be displayed as "Dong-Jin Kim", "James Kim", or "Dong-Jin (James) Kim"? The client refers to him as James. The current site says Dong-Jin Kim. Owner: client. This does not block AC-1a-3, which is about position, not label.
- [ ] Hero CTA alignment. Owner: Jonathan. See AC-1a-11.
