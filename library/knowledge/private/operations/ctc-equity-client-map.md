# CTC Equity Client Map

> Category: Operations | Version: 1.0 | Date: August 2026 | Status: Active

The single authoritative map of the CTC Equity engagement: everything delivered, everything still open, who owns each open item, and which of the two lanes it belongs to.

**Audience:** Jonathan Ferrell (Cuantico) plus the CTC Equity team (Ahoo Khalessi, Ben Mokri, Steven).

**Related:**
- [`prd-001-website-pending-work`](../../../requirements/backlog/prd-001-website-pending-work/prd-001-website-pending-work-index.md) covers the pending **website** items as executable acceptance criteria.
- [`library/README.md`](../../../README.md) for the repository-wide constraints.

---

## 1. Read this first: the strategic constraint

This is the load-bearing rule for the entire website lane. It governs every decision below.

The site earns organic traffic from two places: Google, and citations inside ChatGPT and other LLM answers. That traction is the asset, and it resets if the site moves or if earning pages are rewritten.

Jonathan's decision on the 2026-08-20 call:

1. **Do not migrate to Vercel.** The site stays where it is.
2. **Do not touch pages that are already earning traffic.** Editing an earning page risks the traction it already has.
3. **Growth is additive.** Every new topic gets its OWN new page. New content is never appended into an existing earning page.
4. **`/free-home-value-report` is specifically off limits.** It ranks in Google for "free home value report" and is a live application source. It must not be edited, redirected, or canonicalised away.

A practical consequence: `src/routes/index.tsx` (the homepage) carries the LLM-oriented content that is earning citations. Any pending item that requires editing that file is a minimal, reviewed, layout-or-order-only change. Surrounding copy is not rewritten as a side effect.

---

## 2. Lane ownership

Two lanes run in parallel. Nothing is lost between them, but ownership is unambiguous.

| Lane | Scope | Primary owner | Tracked in |
|---|---|---|---|
| **Website** | The `ctcequity.com` codebase: pages, nav, forms, content, on-page compliance text | Jonathan (Cuantico) | `prd-001-website-pending-work` in this repository |
| **GHL / ops** | GoHighLevel: pipelines, workflows, tags, custom fields, campaigns, phone and A2P, lead handling after the webhook fires | Steven, with Ben and Ahoo supplying inputs | This document only. Not in the PRD. |

The boundary is the webhook. The website's job ends when a lead POSTs successfully to the GoHighLevel inbound webhook. Everything that happens to that lead afterwards (opportunity naming, tagging, pipeline stage, confirmation SMS, drip) is the GHL / ops lane.

---

## 3. Engagement facts

| Item | Value |
|---|---|
| Client | CTC Equity, trading as Coast to Coast Equity |
| Legal parent | A DBA of EMortgage Capital (NMLS #1416824) |
| Site | ctcequity.com |
| Repository | `jzferrell26/client-ahoo-khalessi` |
| Lovable project | `336999dc-5578-42bf-90ec-51cf0c3da9a3` ("Ahoo's Website") |
| Stack | TanStack Start, React 19, Tailwind v4, shadcn |
| Package manager | bun is declared (`bun.lock`) but bun is not installed on the working machine; npm works |
| Build note | `src/routeTree.gen.ts` is generated at build time and is committed |
| Repo constraint | Lovable-connected. Never rewrite published git history (`AGENTS.md`). |

### Loan officers

| Name | NMLS | Notes |
|---|---|---|
| Ahoo Khalessi | #2239510 | Primary. Microsoft Bookings link is live. |
| Ben Mokri | #2279528 | Bookings URL not yet supplied, so his booking button stays hidden. |
| Bobby Khalessi | Unknown | Number not yet supplied by CTC. There is an explicit TODO in `src/routes/index.tsx`. |
| Dong-Jin "James" Kim | #2615439 | "James" and "Dong-Jin" are the same person. |
| Susan O'Donovan | #2302891 | |

---

## 4. DONE, website lane

Verified live on ctcequity.com on 2026-08-25 unless noted otherwise.

| # | Item | Evidence |
|---|---|---|
| W-D1 | **`/avm` mailer and QR landing page.** Optional `notice_number` field labelled as the code from the mailer, prefillable via `/avm?n=CODE`, normalised to uppercase. | Verified live 2026-08-25: field present, prefill works, canonical correct. |
| W-D2 | **`/avm` is deliberately `robots: noindex,follow`.** This is on purpose so it cannot cannibalise `/free-home-value-report`. | Verified live 2026-08-25. Confirmed in `src/routes/avm.tsx`. |
| W-D3 | **`/get-my-options` indexable general-inquiry page** with FAQPage JSON-LD and five question-and-answer pairs. Posts `lead_kind=get_my_options`. Present in `sitemap.xml`. | Verified live 2026-08-25. Confirmed in `src/routes/sitemap[.]xml.ts`. |
| W-D4 | **Header CTA repointed to `/get-my-options`** on both desktop and mobile in `SiteNav.tsx`, replacing the old `/` plus `#getstarted` scroll target. This was the real reason the client kept reporting that AVM and Get My Options "aren't separate": the button only scrolled the homepage form. | Verified in `src/components/site/SiteNav.tsx`. |
| W-D5 | **`/free-home-value-report` verified UNCHANGED.** No notice field, still indexable (no noindex directive), canonical intact. | Verified live 2026-08-25. |
| W-D6 | Shipped as **PR #9**, merge commit `e3fe236`. | Git history. |
| W-D7 | **Backend lead split** (pre-existing, not part of PR #9). `src/routes/api.lead.ts` routes on `lead_kind` to `GHL_AVM_WEBHOOK_URL` or `GHL_GET_MY_OPTIONS_WEBHOOK_URL`. The legacy `GHL_INBOUND_WEBHOOK_URL` is an AVM-only fallback. The schema in `src/lib/lead-schema.ts` is `.strict()`. | Verified in source 2026-08-25. |
| W-D8 | **Server-side lead proxy** so the webhook URL is never exposed to the browser. | Shipped as PR #3. |
| W-D9 | **EMC co-branding, team section with five headshots, footer NMLS disclosure.** | Shipped as PRs #5, #6, #7. |
| W-D10 | **"Santa Ana" replaced with "Orange County" sitewide.** | Commit `61f7175`. |
| W-D11 | **Per-officer AVM landing pages** `/avm-ahoo` and `/avm-ben`. New requirement from Ben in Slack on 2026-08-25: "AVM page BEN, avm page ahoo on site ... so JUST make sure We are each having separate workflows." Each page shows that officer's own callback number and stamps `assigned_lo` on the submission so the GHL workflow can route it into their own pipeline. Both `noindex,follow` like the shared `/avm`. | Verified locally 2026-08-25. `src/components/site/avm-officers.ts`. |
| W-D12 | **Footer NMLS disclosure reordered** to match the confirmed team order (Ahoo, Ben, then Susan, then Dong-Jin). | `src/components/site/SiteFooter.tsx`. |

---

## 5. DONE, GHL / ops lane

From the 2026-08-20 and 2026-08-25 calls. Owner of record: Steven unless noted.

| # | Item | Detail |
|---|---|---|
| O-D1 | **Pipelines rebuilt.** | Final order: Prescreen Connected, Mailer Connected, AVM Request, then FRU, FRU Connected, Meta Leads (plus Connected), LendingTree (plus Connected). |
| O-D2 | **Opportunity-creation rule set.** | Opportunities are created only when a lead REPLIES, never on bulk upload. This is what prevents roughly 50,000 dead opportunities. |
| O-D3 | **Mailer inbound text routing live.** | Routes to Ahoo's work line plus Quo plus OpenPhone. Tested live and confirmed working. |
| O-D4 | **"Split to Mailer 1 / Mailer 2 / Mailer 3" workflow built.** | Built by Steven. |
| O-D5 | **GHL call recording enabled.** | Enabled 2026-08-25. |
| O-D6 | **Ben assigned a local number.** | Interim measure while his toll-free number (877-586-7977) is in A2P verification. |

---

## 6. PENDING, website lane

**These items are specified as executable acceptance criteria in [`prd-001-website-pending-work`](../../../requirements/backlog/prd-001-website-pending-work/prd-001-website-pending-work-index.md).** This table is the index; the PRD is the spec.

Owner for execution on all of these is **Jonathan (Cuantico)**. Items that need client input before they can be finished name that second owner in the "Blocked on" column.

| # | Item | Blocked on | Touches an earning page? |
|---|---|---|---|
| W-P1 | Team layout: Ahoo and Ben larger and side by side as team leads, remaining members stacked below. Required order: Ahoo, Ben, Bobby, Susan, James. The current render order in `TeamSection` is Ahoo, Ben, Bobby, Dong-Jin, Susan, so the last two are reversed. | Nothing | **Yes.** `src/routes/index.tsx`. Layout and order only. |
| W-P2 | Dedicated `/team` page plus a nav entry. A "Meet the team" section exists on the homepage at `#team`, but there is no standalone page and no nav link, which is why the client reports the team page "is not on the website". | Nothing | No. New page plus `SiteNav.tsx`. |
| W-P3 | Blog and indexing program. The client writes real borrower questions; each becomes its OWN indexed page answering it. This is the documented engine behind the ChatGPT citations. Needs a repeatable authoring process, not a one-off post. | Client (Ahoo and Ben) supplying real borrower questions | No. Additive by design. |
| W-P4 | Add Zillow reviews to the site. | Source of the review data | No, if built as a new component or page. |
| W-P5 | Review automation: a scheduled routine that pulls reviews weekly and publishes them to the site. Options discussed were a scheduled crawler routine versus a third-party widget; Jonathan preferred building a routine. Currently unbuilt. | Depends on W-P4 | No. |
| W-P6 | **Decision needed.** The homepage hero "Get My Options" button still points at `/#getstarted` (it scrolls the homepage form) while the header CTA now goes to `/get-my-options`. Decide whether to align the hero too. Deliberately left alone because it lives in `index.tsx`. | Jonathan's decision | **Yes** if the decision is to change it. |
| W-P7 | **Compliance.** The footer still renders a literal `[LICENSED STATES]` placeholder. Confirmed at `src/components/site/SiteFooter.tsx` line 79. | Client and EMC supplying the real licensing footprint | No. Footer component. |
| W-P8 | Ben's Microsoft Bookings URL is still missing, so his booking button stays hidden. Ahoo's is live. | **Ben** | Yes, but a data-only change. |
| W-P9 | Bobby Khalessi's NMLS number is missing. Explicit TODO in `src/routes/index.tsx`. | **Client** confirming the number | Yes, but a data-only change. |
| W-P10 | Scotsman Guide award year is unconfirmed, so the card links out instead of stating a year. | **Client** confirming the year | Yes, but a data-only change. |
| W-P11 | `/tools/form-to-ghl` internal doc page still documents the old `VITE_GHL_INBOUND_WEBHOOK_URL` variable. Stale since the server-proxy migration. | Nothing | No. Internal tools page. |
| W-P12 | One-line bios for Dong-Jin Kim and Susan O'Donovan are still needed from the client. EMC's boilerplate was deliberately not used. | **Client** | Yes, but a data-only change. |
| W-P13 | **FUTURE, do not schedule now.** Per-borrower calculator page where a borrower can model their own numbers, for example "based on your FICO you cannot exceed 70% LTV". The client put this at a two to three month horizon. `/mortgage-analyzer` already exists and may be the seed. | Client, on their own timeline | Not yet scoped. |

### Website observation, not a scheduled item

`/free-home-value-report` is indexable (it carries no `noindex` directive) but it is **not listed** in `src/routes/sitemap[.]xml.ts`. Verified in source 2026-08-25. This is recorded as an observation only. It is not scheduled, because the standing instruction is to leave that page and its indexing posture alone. If anyone wants to change it, that is a decision for Jonathan, not a default.

---

## 7. PENDING, GHL / ops lane

Not in the PRD. Tracked here.

### 7.1 RISK, highest priority

| Item | Status | Owner |
|---|---|---|
| **`GHL_GET_MY_OPTIONS_WEBHOOK_URL` has never been confirmed set in Lovable secrets.** | **UNVERIFIED** | **Jonathan** to verify in the Lovable secrets panel |

Why this matters, verified in source on 2026-08-25:

- `src/routes/api.lead.ts` resolves the webhook for `lead_kind: "get_my_options"` from `GHL_GET_MY_OPTIONS_WEBHOOK_URL` **with no fallback**. The `GHL_INBOUND_WEBHOOK_URL` fallback applies only to `avm_report_request`.
- If the variable is unset, the handler returns HTTP 503 and the submission is silently lost.
- Both `src/components/site/LeadForm.tsx` (the homepage form) and `/get-my-options` post `lead_kind=get_my_options`. So this affects the homepage form too, not just the new page.

This is not a new regression: the same `lead_kind` was in use before PR #9. What changed is exposure, because `/get-my-options` is now a far more prominent front door. **Whether the secret is actually set remains UNVERIFIED.** Verify it before treating any lead-volume number as real.

### 7.2 Everything else in the ops lane

| # | Item | Status | Owner |
|---|---|---|---|
| O-P1 | Confirmation SMS plus email on form submit. The client's decision was to just send it, not ask the borrower which channel. The page already shows an on-screen confirmation; the actual text and email are an unbuilt GHL workflow. | Not built | Steven |
| O-P2 | AVM QR submissions reportedly create opportunities NAMED "get my options" in GHL. This is a workflow naming bug. It makes the two lead types look merged even though the site sends them correctly (see W-D7). | Open, reported | Steven |
| O-P3 | FRU mis-tagging: AVM short-form notifications arrive tagged FRU. Flagged 2026-08-06, never assigned a tracking number, still open. | Open since 2026-08-06 | Steven |
| O-P4 | **Dependency with a hard deadline.** The mailing vendor must supply a per-record notice-number column before the next mailer batch prints, or the new `/avm` code field has nothing to match against. The next batch was slated for the week of 2026-08-25. | Open, deadline live | **Ben** |
| O-P5 | FICO, SSN, and DOB surfaced on the contact card. Steven created a dedicated "FICO Score" custom field on 2026-08-25. The pre-existing "Total Score" is a propensity score, **not** FICO; do not conflate the two. The new field still needs mapping. | Field created, mapping open | Steven |
| O-P6 | Subject property address on both the contact record and the 1st Mortgage page. | Not built | Steven |
| O-P7 | Funded-loans-to-social-media automation. | Not built | Steven |
| O-P8 | Docs-missing automation: auto-text borrowers until documents are received. | Not built | Steven |
| O-P9 | Bulk 13,000-lead upload with daily drip pool logic plus reporting (uploaded, dropped per account, remaining). | Not built | Steven |
| O-P10 | Credential vault: log Jonathan into all new systems and store credentials. | Open | Jonathan and client |
| O-P11 | Ben's NMLS number and phone number check. | Open | Ben |
| O-P12 | FRU and LendingTree email and text campaigns for both Ahoo and Ben; investor campaigns; "Tiffany" and "Ashley" warm-transfer AI agents. | Not built | Steven |
| O-P13 | Lovable project transfer to the client's own account. The invite link was sent 2026-08-25. Jonathan is to remain a collaborator. The GitHub repository transfer is deferred to a separate day. | Invite sent 2026-08-25; acceptance status unknown | Jonathan and client |
| O-P14 | Ben's toll-free A2P verification (877-586-7977). | In progress | Ben |
| O-P15 | **Bobby Khalessi is still absent from the footer NMLS disclosure.** The order was corrected, but Bobby cannot be listed without a real NMLS number: this is a regulatory licensing disclosure, and a placeholder or borrowed number is not an option. A code comment marks the exact insertion point. Also unconfirmed whether Bobby is NMLS-licensed at all. | Blocked | **Client** |
| O-P16 | **Ben's dedicated toll-free (877) 586-7977 is not yet published on `/avm-ben`.** It was still in A2P verification on 2026-08-25 and the number before it was rejected outright, so the page shows his already-published direct line instead. Swap the two fields in `avm-officers.ts` once verification clears. | Blocked on A2P | **Ben / Steven** |
| O-P17 | **Separate GHL workflows for the per-officer AVM leads.** The site now stamps `assigned_lo` as "Ahoo Khalessi" or "Ben Mokri". The routing itself is a GHL workflow change and is not built. | Not built | Steven |

---

## 8. Deadlines and hard dependencies

| Date | What | Owner | Consequence if missed |
|---|---|---|---|
| Week of 2026-08-25 | Mailing vendor must supply the per-record notice-number column before the next mailer batch prints (O-P4). | Ben | The `notice_number` field shipped on `/avm` has nothing to match against, so the mailer-to-lead attribution built in W-D1 does not work for that batch. |
| As soon as possible | Verify `GHL_GET_MY_OPTIONS_WEBHOOK_URL` in the Lovable secrets panel (section 7.1). | Jonathan | Every Get-My-Options submission, homepage form included, returns 503 and is lost. |

---

## 9. Outstanding promise to the client

Jonathan told the client he would run "The Reckoning" website audit on ctcequity.com and send the report within the hour. There is no evidence it was ever delivered. The client is expecting it.

- **Owner:** Jonathan
- **Status:** Undelivered as of 2026-08-25
- **Note:** this is a commitment already made to the client, not a proposal. It sits outside both lanes and is not in the PRD.

---

## 10. How to read the status labels

| Label | Meaning |
|---|---|
| Verified live | Checked against ctcequity.com on the stated date. |
| Verified in source | Checked against the code in this repository on the stated date. |
| **UNVERIFIED** | Believed to be true but not directly confirmed. Do not build on it without checking. |
| Unknown | Genuinely not known. Not a guess and not an assumption. |
| Open / Not built | Confirmed as outstanding, with no work started that we know of. |

Every claim in this document is traceable to a file path, a commit, a pull request, or a dated call, or else it is explicitly marked UNVERIFIED or Unknown. Nothing here is inferred status.
