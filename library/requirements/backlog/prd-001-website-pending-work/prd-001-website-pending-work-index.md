# PRD-001: CTC Equity website, pending work

> **Status:** Backlog
> **Priority:** P1
> **Effort:** L (1-3d)
> **Schema changes:** None

---

## Overview

Everything still outstanding on the `ctcequity.com` **website** after PR #9 (merge commit `e3fe236`) shipped the AVM and Get-My-Options split. This PRD is the executable spec: every requirement below is a discrete, individually verifiable acceptance criterion so that an automated run can drive it to zero open items.

Non-website work (GoHighLevel workflows, tags, custom fields, campaigns, phone and A2P, lead handling after the webhook fires) is deliberately **not** in this PRD. It lives in the [CTC Equity Client Map](../../../knowledge/private/operations/ctc-equity-client-map.md), section 7, owned by Steven.

---

## Binding constraint: do not damage the organic traction

Read this before touching a single file. It is not advisory.

The site earns organic traffic from Google and from citations inside ChatGPT and other LLM answers. Jonathan's decision on the 2026-08-20 call:

1. **No migration to Vercel.** The site stays where it is.
2. **Do not touch pages that are already earning traffic.** Editing an earning page risks resetting its traction.
3. **Growth is additive.** Every new topic gets its OWN new page. Content is never appended into an existing earning page to make it "cover more".
4. **`/free-home-value-report` is off limits.** It ranks in Google for "free home value report" and is a live application source. It must not be edited, redirected, or canonicalised away. No criterion in this PRD authorises a change to that route.

**High-risk file:** `src/routes/index.tsx`. The homepage carries the LLM-oriented content that is earning citations. Where a criterion below requires editing it, the criterion itself states the limit of the permitted change. Any diff to `index.tsx` that alters prose, headings, or JSON-LD outside the named element is a failed criterion, not an incidental improvement.

**Repository constraint:** this project is Lovable-connected. Per `AGENTS.md`, never rewrite published git history (no force push, no rebase, amend, or squash of already-pushed commits).

---

## Goals

- The client can point at a real `/team` page and a correctly ordered, correctly weighted team section, so the recurring "the meet the team page is not on the website" complaint is closed.
- The site has a documented, repeatable process for turning a real borrower question into its own indexed page, because that is the engine behind the ChatGPT citations.
- Zillow reviews appear on the site and refresh themselves on a weekly schedule without manual work.
- The literal `[LICENSED STATES]` compliance placeholder is gone from the footer.
- Every known stale or missing data point (Ben's booking link, Bobby's NMLS, the Scotsman Guide year, two missing bios, the stale env var in the internal docs page) is either filled in or explicitly recorded as still blocked on a named person.
- Zero measurable regression to the traffic-earning pages.

## Non-Goals

- **Any change to `/free-home-value-report`.** Explicitly excluded.
- **Migrating the site off its current hosting.** Explicitly excluded per the 2026-08-20 decision.
- **Rewriting homepage copy, headings, or structured data.** Only the specific elements named in the criteria may change.
- **The per-borrower calculator page** (for example "based on your FICO you cannot exceed 70% LTV"). The client placed this on a two to three month horizon and it is explicitly not scheduled now. `/mortgage-analyzer` already exists and may become its seed later.
- **Any GoHighLevel work.** Confirmation SMS and email, opportunity naming, FRU tagging, custom-field mapping, campaigns, and the bulk lead upload are all the ops lane. See the Client Map, section 7.
- **Verifying or setting `GHL_GET_MY_OPTIONS_WEBHOOK_URL`.** That is a Lovable secrets-panel action owned by Jonathan, tracked in the Client Map, section 7.1. It is a prerequisite for lead capture working at all, but it is not a code change and no criterion here covers it.

---

## Sub-features

| Sub-PRD | Scope | Status |
|---|---|---|
| [`prd-001a-website-pending-work-team-presentation`](./prd-001a-website-pending-work-team-presentation.md) | Team lead layout and member order on the homepage; new `/team` page; nav entry; hero CTA alignment decision | Draft |
| [`prd-001b-website-pending-work-content-engine`](./prd-001b-website-pending-work-content-engine.md) | The repeatable one-question-one-page authoring process behind the LLM citations | Draft |
| [`prd-001c-website-pending-work-reviews`](./prd-001c-website-pending-work-reviews.md) | Zillow reviews on the site plus the weekly refresh routine | Draft |
| [`prd-001d-website-pending-work-compliance-and-data`](./prd-001d-website-pending-work-compliance-and-data.md) | `[LICENSED STATES]` footer placeholder; Ben's booking URL; Bobby's NMLS; Scotsman Guide year; two missing bios | Draft |
| [`prd-001e-website-pending-work-internal-docs`](./prd-001e-website-pending-work-internal-docs.md) | `/tools/form-to-ghl` still documents the retired `VITE_GHL_INBOUND_WEBHOOK_URL` | Draft |

---

## Acceptance criteria (module level)

Each criterion is independently checkable. A run is complete only when every one is checked or is explicitly recorded as blocked on a named person.

| ID | Criterion |
|---|---|
| AC-1 | Given the finished branch, when `git diff e3fe236..HEAD -- src/routes/free-home-value-report.tsx` is run, then it returns no output. `/free-home-value-report` must be byte-identical to its state at the PR #9 merge commit. |
| AC-2 | Given the finished branch, when the sitemap source `src/routes/sitemap[.]xml.ts` is inspected, then no existing route entry has been removed and no `noindex` directive has been added to any route that did not already carry one. |
| AC-3 | Given the finished branch, when `git diff e3fe236..HEAD -- src/routes/index.tsx` is reviewed, then every hunk is attributable to a named criterion in sub-PRD `prd-001a` or `prd-001d`, and no hunk changes body copy, headings, meta tags, or JSON-LD. |
| AC-4 | Given the finished branch, when the project is built with `npm run build`, then the build succeeds with no new errors and `src/routeTree.gen.ts` reflects any new route added by this PRD. |
| AC-5 | Given the finished branch, when the site is loaded, then a standalone `/team` page renders and is reachable from the site navigation. (Detail in `prd-001a`.) |
| AC-6 | Given the finished branch, when the rendered footer is inspected on any page, then the literal string `[LICENSED STATES` does not appear anywhere in `src/`. (Detail in `prd-001d`.) |
| AC-7 | Given the finished branch, when `src/routes/tools.form-to-ghl.tsx` is inspected, then the string `VITE_GHL_INBOUND_WEBHOOK_URL` does not appear and the documented variables match the ones actually read by `src/routes/api.lead.ts`. (Detail in `prd-001e`.) |
| AC-8 | Given the finished branch, when the repository is searched, then a written, repeatable procedure for publishing a new one-question-one-page article exists as a committed document under `library/knowledge/`. (Detail in `prd-001b`.) |
| AC-9 | Given the finished branch, when the site is loaded, then Zillow reviews are rendered on at least one page, and a documented scheduled routine exists that refreshes them weekly. (Detail in `prd-001c`.) |
| AC-10 | Given any criterion in this PRD that is blocked on client-supplied information, when the run finishes, then that criterion is recorded as blocked with the named owner (Ben, Bobby, Ahoo, the client, or Jonathan) rather than being satisfied with invented data. Placeholder or guessed NMLS numbers, award years, bios, and booking URLs are a failure, not a partial pass. |
| AC-11 | Given the finished branch, when the git history is inspected, then no already-pushed commit has been amended, rebased, squashed, or force-pushed, per the Lovable constraint in `AGENTS.md`. |

---

## Open questions

- [ ] **Hero CTA alignment (owner: Jonathan).** The homepage hero "Get My Options" button still points at `/#getstarted`, which scrolls the homepage form, while the header CTA now goes to `/get-my-options`. Should the hero be aligned to the header? It was deliberately left alone because it lives in `index.tsx`. Tracked as a gated criterion in `prd-001a`; no code change happens until this is answered.
- [ ] **Zillow review source (owner: Jonathan).** Whether the weekly refresh is a scheduled crawler routine or a third-party widget. Jonathan preferred building a routine. Tracked in `prd-001c`.
- [ ] **Where the `/team` page bios come from (owner: client).** Dong-Jin Kim and Susan O'Donovan still have no one-line bio. EMC's boilerplate was deliberately not used. Tracked in `prd-001d`.
- [ ] **`/free-home-value-report` is indexable but is not listed in `src/routes/sitemap[.]xml.ts`** (verified in source 2026-08-25). This is recorded as an observation, not a task. Adding it would be a change to that page's indexing posture, which the standing instruction forbids by default. Decision owner: Jonathan.

---

## Related

- [CTC Equity Client Map](../../../knowledge/private/operations/ctc-equity-client-map.md) is the authoritative done-and-pending map for the whole engagement, including the GoHighLevel and ops lane that this PRD deliberately excludes.
- [`library/README.md`](../../../README.md) records the repository-wide constraints.
- `library/qa/ctc-intake/2026-08-10-qa-report.md` and `library/qa/security/2026-08-10-security-audit.md` are pre-existing audits at the legacy schema-v1 path, authored by another agent. They are context, not scope.
