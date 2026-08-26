---
ai_description: |
  Documentation root for the CTC Equity website repository (jzferrell26/client-ahoo-khalessi),
  schema v2. Everything under library/ is agent-owned EXCEPT notes/, which is human-only.
  Sub-trees: knowledge/ (public and private reference docs), requirements/ (PRDs),
  issues/ (IRDs), notes/ (human junk drawer), qa/ (LEGACY v1 path, do not add new content).
  Lifecycle equals location: move whole PRD/IRD folders between backlog/, in-work/, completed/.
  PRD numbers are repo-local sequential. IRD numbers must match a real GitHub issue number
  in jzferrell26/client-ahoo-khalessi. Never invent an IRD number.
human_description: |
  Documentation root for the CTC Equity website.
  - knowledge/: reference documentation split by audience (public vs private)
  - requirements/: planned website work (PRDs) with backlog/in-work/completed lifecycle
  - issues/: reactive bug and incident work (IRDs) with the same lifecycle
  - notes/: unstructured scratch space, only humans write here
  - qa/: legacy schema-v1 folder retained as-is; new QA reports do not go here
---

# Library — CTC Equity website

Documentation root for the CTC Equity website repository. Schema version: **v2**.

- Repository: `jzferrell26/client-ahoo-khalessi`
- Live site: `ctcequity.com`
- Lovable project: `336999dc-5578-42bf-90ec-51cf0c3da9a3` ("Ahoo's Website")

## Start here

| Doc | Why you would read it |
|---|---|
| [`knowledge/private/operations/ctc-equity-client-map.md`](knowledge/private/operations/ctc-equity-client-map.md) | The single authoritative map of the whole engagement: what is done, what is pending, who owns it, and which lane it belongs to |
| [`requirements/backlog/prd-001-website-pending-work/`](requirements/backlog/prd-001-website-pending-work/) | The raid-ready PRD covering every pending **website** item |

## Top-level layout

| Folder | What goes here |
|---|---|
| `knowledge/public/` | Borrower-facing and partner-facing docs: overviews, guides, FAQs |
| `knowledge/private/` | Internal engineering, operations, and business docs: ADRs, standards, engagement maps |
| `requirements/` | Planned website work: PRDs in `backlog/`, `in-work/`, `completed/` |
| `issues/` | Reactive bug and incident work: IRDs in `backlog/`, `in-work/`, `completed/` |
| `notes/` | Human-only scratch space. Agents never read or write here. |

## Repository-specific constraints

These bind every agent and every human working in this repo.

1. **Organic traction is the asset.** The site earns traffic from Google and from
   ChatGPT / LLM citations. Jonathan's decision on the 2026-08-20 call: do not
   migrate the site to Vercel and do not edit pages that are already earning
   traffic. Growth is additive, meaning a new topic gets its own new page rather
   than being appended to an existing one.
2. **`/free-home-value-report` is untouchable.** It ranks in Google for "free home
   value report" and is a live application source. Do not edit it, redirect it, or
   canonicalise it away.
3. **`src/routes/index.tsx` is high-risk.** The homepage carries the LLM-oriented
   content that is earning citations. Any change there must be minimal, reviewed,
   and scoped to the specific element being changed; surrounding copy is not to be
   rewritten as a side effect.
4. **Lovable-connected repo.** Per `AGENTS.md`, never rewrite published git history
   (no force push, no rebase/amend/squash of pushed commits). Commits on the
   connected branch sync back into the Lovable editor.

## Legacy v1 artifacts

`library/qa/` is a schema-v1 path. It currently holds two reports authored by
another agent:

- `library/qa/ctc-intake/2026-08-10-qa-report.md`
- `library/qa/security/2026-08-10-security-audit.md`

Those files are left exactly as they are. Under schema v2 the equivalent
destinations are `library/requirements/reports/` for routine scans, and
`prd-<###>-<slug>/qa/` or `ird-<###>-<slug>/qa/` for reports tied to a specific
PRD or IRD. Migrating the two legacy files is a separate decision for their owner.

## Ownership

QA report **content** is authored by `quality-guardian`, never by `library-guardian`.
`library-guardian` owns the folder structure, naming, numbering, and lifecycle moves.
