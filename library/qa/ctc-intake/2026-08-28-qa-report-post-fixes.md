# QA Report: CTC Equity client request rollout, post-fix verification

**Plan document:** `../operator-home-ctc-client-work/cuantico-clients/active/ctc-equity/pending-work.md`  
**Audit date:** 2026-08-28  
**Base branch:** `origin/main`  
**Head:** `agent/ctc-equity/per-officer-avm-webhooks` at `a48c54a`  
**Auditor:** quality-guardian

## Summary

The implementation now satisfies all eight rollout requirements. Ben's AVM page remains Ben-specific through consent, error recovery, confirmation, assignment, and server-side webhook selection. Ahoo's dedicated and shared routes retain their existing Ahoo defaults. All workflows remain centralized in Ahoo's GoHighLevel location, existing City, State, and Postal Code fields remain untouched, dependency advisories are clear, the production build passes, targeted lint passes, and the team schema validates without errors or warnings.

## Scorecard

| Category | Status | Notes |
|---|---|---|
| Completeness | PASS | All eight requirements are implemented and verified |
| Correctness | PASS | Officer identity, callback, assignment, and routing remain consistent on each AVM path |
| Alignment | PASS | Workflows stay in Ahoo's location and existing fields remain unchanged |
| Gaps | PASS | No release-blocking gaps remain |
| Detrimental | PASS | The three borrower-facing Ben regressions from the first QA pass are fixed |

## Critical Issues (must fix)

None.

## Warnings (should fix)

None.

## Suggestions (consider improving)

- [ ] **Add per-officer form regression tests** - `src/components/site/HomeValueForm.tsx:75`

  The shared form serves shared, Ahoo, and Ben routes. Automated render tests for consent language, callback number, confirmation name, source, and hidden assignment would protect this behavior from future copy drift.

## Plan Item Traceability

| # | Plan Requirement | Status | Implementation Location | Verification |
|---|---|---|---|---|
| REQ-1 | Keep all website workflows in Ahoo's GHL account, including Ben's | PASS | `src/routes/tools.form-to-ghl.tsx` | Ben workflow `AVM Website Intake - Ben Mokri` is published in Ahoo's location |
| REQ-2 | Configure and verify Get My Options production intake | PASS | `src/routes/api.lead.ts:25` | Controlled production POST returned HTTP 200 and `configured: true` |
| REQ-3 | Route `/avm-ben` to Ben's separate workflow without fallback | PASS | `src/routes/api.lead.ts:29` | Ben selection uses `GHL_AVM_BEN_WEBHOOK_URL` and fails closed when absent |
| REQ-4 | Send borrower confirmation SMS and email on all three intake paths | PASS | GoHighLevel workflows | Controlled runs executed the confirmation actions; the GMI SMS was intentionally skipped for a non-routable test phone |
| REQ-5 | Add valid structured data for all five team members | PASS | `src/components/site/TeamMembers.tsx:110` | Local Schema Markup Validator reported 0 errors and 0 warnings |
| REQ-6 | Preserve existing City, State, and Postal Code fields and mappings | PASS | GoHighLevel workflows | No fields or existing mappings were deleted or changed |
| REQ-7 | Ben's dedicated page remains Ben-specific through the whole submission flow | PASS | `src/components/site/AvmLanding.tsx:100`, `src/components/site/HomeValueForm.tsx:84` | Local SSR checks confirm Ben consent, callback, confirmation, source, and hidden assignment; Ahoo and shared defaults also pass |
| REQ-8 | Security then quality close-out before ship | PASS | `library/qa/security/2026-08-28-security-audit-post-qa-fixes.md` | Post-fix security rerun completed before this final QA pass |

## Verification Evidence

- `npm run build`: passed.
- Targeted ESLint on all touched TypeScript and TSX files: passed with zero errors.
- `npx --yes bun audit --json`: returned an empty advisory object.
- Security scan: passed after removing generated scan artifacts.
- Local SSR routes `/avm-ben`, `/avm-ahoo`, and `/avm`: returned successfully.
- Ben SSR form: names Ben in consent, does not name Ahoo, and includes `assigned_lo="Ben Mokri"`.
- Ahoo SSR form: names Ahoo and includes `assigned_lo="Ahoo Khalessi"`.
- Shared SSR form: retains Ahoo defaults and has no forced assignment.
- Structured data: `CollectionPage`, `ItemList`, and five `Person` nodes validated with 0 errors and 0 warnings.
- Live GoHighLevel controlled runs: Ahoo AVM and Ben AVM completed; Get My Options completed all routable actions.

## Files Changed

- `DEPLOY.md` (M): documents Ben's server-side webhook secret and fail-closed behavior.
- `README.md` (M): documents the separate Ben intake path.
- `bun.lock` (M): resolves patched direct and transitive dependencies.
- `library/qa/ctc-intake/2026-08-28-qa-report.md` (A): records the first QA pass and its blockers.
- `library/qa/ctc-intake/2026-08-28-qa-report-post-fixes.md` (A): records this clean post-fix verification.
- `library/qa/security/2026-08-28-security-audit.md` (A): records the pre-QA security close-out.
- `library/qa/security/2026-08-28-security-audit-post-qa-fixes.md` (A): records the post-fix security rerun.
- `library/qa/seo/2026-08-28-team-schema-validation.md` (A): records structured-data validation evidence.
- `package.json` (M): refreshes compatible package version floors used by the clean lockfile.
- `src/components/site/AvmLanding.tsx` (M): passes the full officer definition into the form.
- `src/components/site/HomeValueForm.tsx` (M): derives consent, callback, confirmation, source, and assignment from the officer.
- `src/components/site/JsonLd.tsx` (M): safely escapes literal less-than characters in serialized JSON-LD.
- `src/components/site/TeamMembers.tsx` (M): adds `CollectionPage`, `ItemList`, and five `Person` nodes.
- `src/components/site/avm-officers.ts` (M): types each officer's routing identity against the lead schema.
- `src/lib/lead-schema.ts` (M): constrains `assigned_lo` to Ahoo or Ben and exports the shared type.
- `src/routes/api.lead.ts` (M): routes Ben submissions to a dedicated secret with no fallback.
- `src/routes/team.tsx` (M): renders team structured data.
- `src/routes/tools.form-to-ghl.tsx` (M): documents all centralized intake paths and secrets.

## Verdict

PASS. The branch is ready for conflict checks, merge, deployment, and live verification.
