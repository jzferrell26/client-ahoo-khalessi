# PRD-001d: Compliance placeholder and missing data points

> **Parent:** [PRD-001: CTC Equity website, pending work](./prd-001-website-pending-work-index.md)
> **Status:** Draft
> **Priority:** P0 for the licensing placeholder, P2 for the rest
> **Effort:** S (1-3h) once the inputs arrive

---

## Overview

A cluster of small, high-visibility gaps. One of them is a live compliance defect: the footer of a licensed mortgage site renders a literal `[LICENSED STATES]` placeholder. The rest are missing data points that were deliberately left blank rather than filled with invented or borrowed content.

The defining rule for this sub-PRD: **nothing here may be satisfied with a guess.** Every item is blocked on a named person until that person supplies the real value. An unfilled item recorded as blocked is a pass. An item filled with plausible-looking invented data is a failure.

---

## Goals

- The `[LICENSED STATES]` placeholder is replaced with EMC's real licensing footprint.
- Every remaining missing data point is either filled with a client-confirmed value or recorded as blocked on a named owner.
- No invented NMLS numbers, award years, bios, or booking URLs enter the codebase.

## Non-Goals

- Writing bios in EMC's boilerplate voice. That was deliberately rejected.
- Deciding what EMC's licensing footprint is. That is EMC's answer to give, not a research task to be inferred from public sources.
- Redesigning the footer or the team cards. Values only.

---

## Current state (verified in source 2026-08-25)

| Item | Location | State |
|---|---|---|
| Licensed states placeholder | `src/components/site/SiteFooter.tsx` line 75 (a TODO comment) and line 79 (the rendered string `[LICENSED STATES - insert actual EMC license footprint before launch]`) | Live on every page |
| Same placeholder referenced again | `src/routes/tools.ai-setup-checklist.tsx` line 60, as a launch-checklist item | Internal tools page |
| Ben's Microsoft Bookings URL | `src/routes/index.tsx` around line 741, TODO comment | Missing, button hidden |
| Bobby Khalessi's NMLS | `src/routes/index.tsx` around line 750, TODO comment | Missing |
| Ahoo's Bookings URL | `src/routes/index.tsx` around line 728 | Present and live, with its own confirm-the-URL TODO |
| Scotsman Guide award | `src/routes/index.tsx` around line 593 | Card links out to Ahoo's EMC profile instead of stating a year |
| Dong-Jin Kim bio | `src/routes/index.tsx` around line 754 | Missing |
| Susan O'Donovan bio | `src/routes/index.tsx` around line 763 | Missing |

Ben's NMLS is #2279528 and Susan's is #2302891; both are already rendered. Bobby's is the only one genuinely unknown.

---

## Acceptance criteria

| ID | Criterion |
|---|---|
| AC-1d-1 | Given the repository, when `src/` is searched for the string `[LICENSED STATES`, then there are zero matches. This covers both `src/components/site/SiteFooter.tsx` and the checklist reference in `src/routes/tools.ai-setup-checklist.tsx`. |
| AC-1d-2 | Given the rendered footer on any page of the deployed site, when the licensing disclosure is read, then it names EMortgage Capital's actual licensed states or links to EMC's official licensing disclosure, and the text was supplied or confirmed by the client or EMC. The list must not be assembled by inference from third-party sources. |
| AC-1d-3 | Given the footer change, when `git diff e3fe236..HEAD -- src/components/site/SiteFooter.tsx` is reviewed, then the only substantive change is the licensing text and the removal of its TODO comment. The NMLS #1416824 disclosure and the rest of the footer are unchanged. |
| AC-1d-4 | Given Bobby Khalessi's team card, when the run finishes, then either his real client-confirmed NMLS number renders, or the field remains absent and the item is recorded as blocked on the client. No placeholder, no zero, no borrowed number. |
| AC-1d-5 | Given Ben Mokri's team card, when the run finishes, then either his real Microsoft Bookings URL is wired and his booking button renders, or the button remains hidden and the item is recorded as blocked on Ben. A guessed URL constructed by pattern-matching Ahoo's link is a failure, not a shortcut. |
| AC-1d-6 | Given the Scotsman Guide award card, when the run finishes, then either it states the client-confirmed award year, or it continues to link out to Ahoo's EMC profile exactly as it does today and the item is recorded as blocked on the client. No year is inferred. |
| AC-1d-7 | Given Dong-Jin Kim's and Susan O'Donovan's team cards, when the run finishes, then either each carries a one-line bio supplied by the client, or each remains without a bio and the item is recorded as blocked on the client. EMC boilerplate is not to be substituted; that was a deliberate earlier decision. |
| AC-1d-8 | **Earning-page constraint.** Given the diff for this sub-PRD, when `git diff e3fe236..HEAD -- src/routes/index.tsx` is reviewed, then every changed line is a data value inside a team card or the award card: an NMLS string, a booking URL, a bio string, or an award year. No layout, no heading, no body copy, no meta tag, and no JSON-LD is touched. `src/routes/index.tsx` carries the LLM content that is earning citations, so any diff beyond those specific values fails this criterion. |
| AC-1d-9 | Given every item in this sub-PRD that finished blocked, when the run reports, then each is listed with its named owner (client, Ben, or EMC) and the specific value still needed, so the client can be chased with a precise list rather than a vague reminder. |
| AC-1d-10 | Given the finished branch, when the site is built, then no new console error, broken link, or empty rendered element results from a field that was left blocked. A missing bio or hidden booking button must degrade cleanly. |

---

## Who is blocked on what

| Item | Value needed | Owner |
|---|---|---|
| Licensed states | EMC's actual licensing footprint, or the URL of EMC's official licensing disclosure | Client / EMC |
| Bobby Khalessi NMLS | The number | Client |
| Ben's booking link | His Microsoft Bookings URL | Ben |
| Scotsman Guide year | The award year | Client |
| Bios | One line each for Dong-Jin Kim and Susan O'Donovan | Client |

---

## Open questions

- [ ] Is the licensing disclosure meant to be an explicit state list or a link to EMC's official disclosure page? A link is more durable because EMC's footprint changes without this repository knowing. Owner: Jonathan to propose, client and EMC to confirm.
- [ ] Ahoo's Bookings URL carries its own "confirm and update" TODO in `src/routes/index.tsx`. It is live and presumed working, but confirmation is UNVERIFIED. Owner: Ahoo.
