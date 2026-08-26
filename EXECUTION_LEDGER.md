# EXECUTION LEDGER: PRD-001 raid (001a + 001e)

> **Run started:** 2026-08-25
> **Branch:** `feat/prd-001-team-and-docs` off `main` @ `8798852`
> **In scope:** `prd-001a` (team presentation), `prd-001e` (internal docs)
> **Explicitly excluded:** `prd-001b`, `prd-001c`, `prd-001d`
> **Total criteria:** 20 (11 in 001a, 9 in 001e)

Status vocabulary: `OPEN` / `IN PROGRESS` / `DONE` (implementer claims it) / `VERIFIED` (independent pass confirms it) / `BLOCKED`.
A criterion is only complete at `VERIFIED`. Implementers do not grade their own work.

---

## Binding constraints (apply to every criterion)

| ID | Constraint |
|---|---|
| C-1 | `git diff e3fe236..HEAD -- src/routes/free-home-value-report.tsx` must return no output. That page ranks in Google and is a live application source. |
| C-2 | Every hunk in `src/routes/index.tsx` must trace to a named criterion and must not touch body copy, headings, meta tags, or JSON-LD. |
| C-3 | Repo is Lovable-connected. Never rewrite pushed history (no force push, rebase, amend, or squash of pushed commits). Repo requires SQUASH merges on GitHub. |
| C-4 | Do not mass-fix the ~9,300 pre-existing repo-wide CRLF lint errors. Lint only files touched. |
| C-5 | `bun` is not installed. Use `npm`. `src/routeTree.gen.ts` is generated at build and committed. |

---

## Wave 1A: `prd-001a` Team presentation

**Owner:** `react-guardian` (armed with `react-weapon`) · **Model:** opus
**Justification:** a component extraction plus layout change on `index.tsx`, the single highest-risk file in the repo (it carries the LLM content earning ChatGPT citations). AC-1a-5 fails the run on any stray hunk, so this needs the strongest reasoning about diff blast radius, not the fastest coder.
**Files in scope:** `src/routes/index.tsx`, new `src/components/site/TeamMembers.tsx`, new `src/routes/team.tsx`, `src/components/site/SiteNav.tsx`, `src/routes/sitemap[.]xml.ts`, `src/routeTree.gen.ts` (generated)

| ID | Criterion (abbreviated) | Status |
|---|---|---|
| AC-1a-1 | Ahoo + Ben side by side in one horizontal row above the others, cards visibly larger | VERIFIED |
| AC-1a-2 | Bobby, Susan, Dong-Jin below the leads, in that order | VERIFIED |
| AC-1a-3 | Rendered sequence exactly: Ahoo, Ben, Bobby, Susan, Dong-Jin (Susan now precedes Dong-Jin) | VERIFIED |
| AC-1a-4 | At 390px viewport all five cards readable, no horizontal overflow, order preserved | VERIFIED |
| AC-1a-5 | **Earning-page constraint.** Every `index.tsx` changed line inside `TeamSection` (or a component it newly delegates to); layout, sizing, and order only | VERIFIED |
| AC-1a-6 | `/team` returns 200 and lists all five in AC-1a-3 order | VERIFIED |
| AC-1a-7 | `/team` has own `<title>`, own meta description, canonical `https://ctcequity.com/team` | VERIFIED |
| AC-1a-8 | `/team` added to sitemap; every pre-existing entry unchanged | VERIFIED |
| AC-1a-9 | `NAV_LINKS` contains a `/team` entry, rendering in both desktop and mobile nav | VERIFIED |
| AC-1a-10 | `/team` is additive; homepage `#team` section still renders, nothing moved out of it | VERIFIED |
| AC-1a-11 | Hero `Link` line 137 ("Get My Options") targets `/get-my-options`, drops `hash`. Line 140 ("Schedule a Consultation") **unchanged** | VERIFIED |

## Wave 1B: `prd-001e` Internal docs

**Owner:** `react-guardian` (armed with `react-weapon`) · **Model:** sonnet
**Justification:** mechanical content rewrite of a single `.tsx` route page. Every fact needed is already verified and written into the PRD, so this is careful transcription inside JSX, not design. Routed to `react-guardian` rather than a writing Guardian because the deliverable is a React route file and the page structure must survive intact.
**Files in scope:** `src/routes/tools.form-to-ghl.tsx` (and nothing else)

| ID | Criterion (abbreviated) | Status |
|---|---|---|
| AC-1e-1 | Zero matches for `VITE_GHL_INBOUND_WEBHOOK_URL` | VERIFIED |
| AC-1e-2 | Documents exactly the three real vars, `GHL_INBOUND_WEBHOOK_URL` described as legacy AVM-only fallback | VERIFIED |
| AC-1e-3 | States forms POST to `/api/lead` and the server picks the webhook from `lead_kind` | VERIFIED |
| AC-1e-4 | Names both `lead_kind` values and which page sends which | VERIFIED |
| AC-1e-5 | States `get_my_options` has **no** fallback; unset var means 503 and lost leads including the homepage form | VERIFIED |
| AC-1e-6 | States vars are server-side, no `VITE_` prefix by design, and why a `VITE_` prefix would leak the URL | VERIFIED |
| AC-1e-7 | Troubleshooting: what a 503 `{ok:false,configured:false}` means and which var to check | VERIFIED |
| AC-1e-8 | Only `tools.form-to-ghl.tsx` changed; no behaviour change to `api.lead.ts`, `lead-schema.ts`, or any form | VERIFIED |
| AC-1e-9 | Indexing posture of `/tools/form-to-ghl` unchanged | VERIFIED |

---

## Wave 2: Close-out (sequential, after the ledger reads fully VERIFIED)

| Step | Guardian | Weapon | Model | Purpose |
|---|---|---|---|---|
| 2.1 | `security-guardian` | `security-weapon` | opus | OWASP / PII / financial-data exposure. Remediate Critical and High in place. |
| 2.2 | `quality-guardian` | `quality-weapon` | opus | Verify implementation against both source PRDs. Runs strictly after security, never before. |

## Wave 3: Ship

Confirm MERGEABLE, squash-merge, then verify the Lovable deploy actually fired against the live domain. Sync is not deploy: confirmed twice, on 2026-07-24 and 2026-08-25.

---

## Blocked register

| ID | Blocker | Owner | Specific ask |
|---|---|---|---|
| (none) | | | |

## Watchdog log

| Time | Guardian | Event | Action |
|---|---|---|---|
| (none) | | | |

---

## Independent verification pass (Raid Leader, 2026-08-25)

Implementers reported DONE. The following were re-checked from scratch by the Raid Leader, not taken on trust.

| Check | Result |
|---|---|
| `npm run build` | Clean, exit 0, 3 build stages |
| C-1 `git diff e3fe236 -- src/routes/free-home-value-report.tsx` | Empty diff |
| Changed-file set | 6 modified + 2 new, plus this ledger. The 6th modified file is `.gitignore`, added by `security-guardian` during close-out (MEDIUM-1, no `.env` rule) and again for the stray-artifact pattern below. One untracked stray exists in the repo root: a `deeplake-wiki-*summary.md` written by another tool with a flattened Windows path as its filename. It is NOT this run's artifact, is now gitignored so it cannot be swept in by a `git add -A`, and was deliberately left on disk rather than deleted (agent work-boundary rule). Every commit in this run stages explicit paths, never `-A`. |
| AC-1a-5 index.tsx diff | 3 hunks: import swap, hero line 138, `TeamSection` body delegating to `TeamMembers`. No copy, heading, meta, or JSON-LD touched |
| Member data integrity | All 4 NMLS strings, 4 phones, 2 emails, 3 photo paths, and both long bios present verbatim in `TeamMembers.tsx`. All 3 TODO markers that `prd-001d` depends on preserved |
| AC-1a-11 | Hero "Get My Options" to `/get-my-options`; "Schedule a Consultation" still `/#getstarted`, unchanged as required |
| AC-1a-3 rendered order | `/team` and homepage `#team` both render Ahoo, Ben, Bobby, Susan, Dong-Jin |
| AC-1a-4 mobile | Emulated 375px (tighter than the 390 required): `scrollWidth == clientWidth`, zero elements overflowing right, order preserved |
| AC-1a-6 / 7 | `/team` renders; own title, own meta description, canonical `https://ctcequity.com/team` |
| AC-1a-8 / 9 | Sitemap diff is a single inserted line; `NAV_LINKS` diff is a single inserted line |
| AC-1a-10 | Homepage `#team` section still renders with its "Meet the team" heading. Additive, not moved |
| AC-1e-1 | `grep VITE_GHL_INBOUND_WEBHOOK_URL` returns 0 matches |
| AC-1e-2 to 1e-7 | Rendered page carries all three real variables, `/api/lead`, both `lead_kind` values, the explicit "no fallback" statement, 503 and `configured: false`, and the troubleshooting table |
| AC-1e-6 nuance | The 3 remaining `VITE_` occurrences are the required explanation of why no variable carries that prefix, not a configuration instruction. Env block keeps the illustrative `hooks/...` shape with no real hook id |
| AC-1e-9 | `robots: noindex,nofollow` unchanged |

## Notes carried forward (not criteria failures)

1. `EMC_PROFILES` is now duplicated between `index.tsx` and `TeamMembers.tsx`. The implementer could not hoist it without editing `index.tsx` lines outside `TeamSection`, which AC-1a-5 forbids. Correct call under the constraint; worth a follow-up once the constraint is lifted.
2. `/team` ships without `Person` or `ProfilePage` structured data. A real AEO opportunity on a page of named, NMLS-licensed people, but schema strategy is `seo-aeo-guardian`'s domain and was outside these criteria.
3. `prd-001a` retains two open questions, both owned outside this run: the "Dong-Jin Kim" vs "James Kim" display label (client), and whether "Schedule a Consultation" should also move off `/#getstarted` (Jonathan).
