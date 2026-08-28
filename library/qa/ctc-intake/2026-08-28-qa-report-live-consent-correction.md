# QA Report: CTC Equity live consent correction

**Audit date:** 2026-08-28
**Base branch:** `origin/main` at `6f796f4`
**Branch:** `agent/ctc-equity/ben-visible-consent`
**Auditor:** quality-guardian

## Summary

Live HTML verification after the first deployment found one borrower-facing mismatch that the earlier check missed: Ben's hidden consent record correctly named Ben, but the visible checkbox label still named Ahoo. The correction now renders one officer-specific `consentText` value in both places. Local SSR verifies that Ben's page contains Ben's consent identity and no Ahoo consent identity, while Ahoo's dedicated route and the shared route retain Ahoo. The first post-fix QA report is explicitly marked superseded so the audit trail remains accurate.

## Scorecard

| Category | Status | Notes |
|---|---|---|
| Completeness | PASS | Visible and submitted consent now use the same officer-specific value |
| Correctness | PASS | Ben, Ahoo, and shared routes render the expected identity |
| Alignment | PASS | No GHL workflow, field, or mapping changed |
| Gaps | PASS | No release-blocking gaps remain |
| Detrimental | PASS | The live borrower-facing identity mismatch is removed |

## Critical Issues (must fix)

None.

## Warnings (should fix)

None.

## Suggestions (consider improving)

- [ ] Add automated SSR assertions that independently inspect the visible consent label and hidden consent record for each officer route.

## Traceability

| Requirement | Status | Evidence |
|---|---|---|
| Ben's visible consent names Ben | PASS | Local `/avm-ben` HTML contains `CTC Equity / Ben Mokri` |
| Ben's visible consent does not name Ahoo | PASS | Local `/avm-ben` HTML does not contain `CTC Equity / Ahoo Khalessi` |
| Ben's submitted consent record names Ben | PASS | The hidden `consent_language` input uses the same `consentText` value |
| Ahoo's route remains Ahoo-specific | PASS | Local `/avm-ahoo` HTML names Ahoo and does not name Ben |
| Shared AVM route keeps the Ahoo default | PASS | Local `/avm` HTML names Ahoo and has no forced officer assignment |
| Existing GHL fields remain untouched | PASS | This branch changes only form rendering and audit reports |
| Security runs before final quality | PASS | `library/qa/security/2026-08-28-security-audit-visible-consent-fix.md` |

## Verification Evidence

- Targeted ESLint: pass with zero errors.
- Production build: pass.
- Bun dependency audit: no advisories.
- Security pattern scan: no new relevant findings.
- Local SSR for `/avm-ben`, `/avm-ahoo`, and `/avm`: all returned successfully.
- Source diff: visible consent now renders the same `consentText` used by the hidden consent input.

## Files Changed

- `src/components/site/HomeValueForm.tsx`: removes the hardcoded visible Ahoo consent copy and renders `consentText`.
- `library/qa/ctc-intake/2026-08-28-qa-report-post-fixes.md`: marks the earlier false-green report superseded.
- `library/qa/ctc-intake/2026-08-28-qa-report-live-consent-correction.md`: records this final quality pass.
- `library/qa/security/2026-08-28-security-audit-visible-consent-fix.md`: records the required security rerun.

## Verdict

PASS. The correction is ready for conflict checks, merge, republish, and live HTML verification.
