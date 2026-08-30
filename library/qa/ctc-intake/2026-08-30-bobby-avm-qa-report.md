# QA Report: Bobby AVM Intake

**Plan document:** User-approved Bobby AVM requirements, cross-referenced with `library/knowledge/private/operations/ctc-equity-client-map.md` items W-D11 and O-P17
**Audit date:** 2026-08-30
**Base branch:** `main`
**Head:** `codex/ctc-equity/bobby-avm`
**Auditor:** quality-guardian

## Summary

The Bobby AVM implementation satisfies every approved requirement and is ready to merge. The dedicated page, validated officer identity, fail-closed webhook selection, published GHL workflow, server-side Lovable secret, documentation, and regression protections all align, with no Critical, Warning, or Suggestion findings.

## Scorecard

| Category | Status | Notes |
|---|---|---|
| Completeness | ✅ | All 12 requirements are implemented and traceable. |
| Correctness | ✅ | Local route, API routing, schema validation, metadata, and failure behavior match the approved requirements. |
| Alignment | ✅ | The implementation extends the existing per-officer AVM architecture and keeps all workflows in Ahoo's GHL location. |
| Gaps | ✅ | Input validation, body limits, failure handling, documentation, and release verification are present. |
| Detrimental | ✅ | No secret exposure, protected-page edits, sitemap change, field deletion, or existing-route regression was introduced. |

## Critical Findings

None.

## Warnings

None.

## Suggestions

None.

## Plan Item Traceability

| ID | Requirement | Status | Evidence | Notes |
|---|---|---|---|---|
| BR-1 | Add a dedicated public route at `/avm-bobby`. | ✅ | `src/routes/avm-bobby.tsx:21`; `src/routeTree.gen.ts` | Route generation and local HTTP verification passed. |
| BR-2 | Present the officer publicly as Bobby Khalessi. | ✅ | `src/components/site/avm-officers.ts:54-62`; `src/routes/avm-bobby.tsx:7-9` | Public spelling is independent of the misspelled GHL user record. |
| BR-3 | Show Bobby's direct phone number `(949) 413-9332`. | ✅ | `src/components/site/avm-officers.ts:58-60` | The link uses `tel:+19494139332`. |
| BR-4 | Stamp submissions with `assigned_lo: Bobby Khalessi` and Bobby's mailer source. | ✅ | `src/components/site/avm-officers.ts:61-62`; `src/lib/lead-schema.ts:5-27` | The strict schema accepts Bobby and rejects unknown officer values. |
| BR-5 | Use a dedicated Bobby webhook secret with no shared fallback. | ✅ | `src/routes/api.lead.ts:22-43`; `DEPLOY.md:121-142` | Missing Bobby configuration returns HTTP 503 instead of misrouting a lead. |
| BR-6 | Keep the webhook URL server-side and out of tracked source. | ✅ | `src/routes/api.lead.ts:11-16`; `src/routes/tools.form-to-ghl.tsx:14-18`; security report | The Lovable secret is named, but its value is not committed or rendered. |
| BR-7 | Keep the campaign page `noindex,follow`, canonical to itself, and absent from the sitemap. | ✅ | `src/routes/avm-bobby.tsx:21-31`; `DEPLOY.md:109-114` | Local HTML and sitemap checks passed. |
| BR-8 | Publish Bobby's workflow inside Ahoo's GHL location. | ✅ | `library/knowledge/private/operations/ctc-equity-client-map.md:106` | Workflow `AVM Website Intake - Bobby Khalessi` is published in location `hFh6QMpFXIBxyuqN9LLy`. |
| BR-9 | Assign the GHL workflow to Bobby and replace Ben-specific notifications and borrower copy. | ✅ | `library/knowledge/private/operations/ctc-equity-client-map.md:106,176` | Assignment is Bobby's GHL user; internal SMS is Bobby's phone; internal email goes to Ahoo and Bobby; borrower copy names Bobby. |
| BR-10 | Store `GHL_AVM_BOBBY_WEBHOOK_URL` as a server-side Lovable secret. | ✅ | `DEPLOY.md:121-142`; `library/knowledge/private/operations/ctc-equity-client-map.md:106` | Lovable confirmed the runtime secret was added without a code change. |
| BR-11 | Do not delete existing GHL fields. | ✅ | `library/knowledge/private/operations/ctc-equity-client-map.md:106` | No field deletion was performed. |
| BR-12 | Preserve the homepage, organic AVM page, existing officer pages, and indexed earning pages. | ✅ | `DEPLOY.md:90-114`; git diff; local regression requests | No protected earning page was modified. All locally tested regression routes returned HTTP 200. |
| NG-1 | Do not add Bobby to the NMLS footer without a client-confirmed NMLS number. | ✅ | `library/knowledge/private/operations/ctc-equity-client-map.md:174` | The existing compliance blocker remains explicit and unchanged. |
| NG-2 | Do not move Ben's workflow out of Ahoo's GHL location. | ✅ | `library/knowledge/private/operations/ctc-equity-client-map.md:176` | Both officer workflows remain centralized in Ahoo's location. |

## Verification Evidence

- Scoped ESLint passed on the changed TypeScript and TSX files.
- `npm run build` passed and regenerated the committed route tree.
- `/avm-bobby` returned HTTP 200 locally with Bobby's name, phone, canonical link, hidden `assigned_lo`, and `noindex,follow` metadata.
- A bot-trap Bobby request returned HTTP 200 without forwarding.
- A legitimate Bobby request with no dedicated secret returned HTTP 503 with `configured: false`.
- A legitimate Bobby request with only the shared AVM secret still returned HTTP 503, proving there is no fallback.
- A legitimate Bobby request with only a synthetic dedicated secret reached the forwarding path and returned HTTP 502 with `configured: true`, proving the dedicated selector was used.
- `git diff --check` passed.
- The Bobby route is absent from `sitemap.xml`.
- The security audit found no Critical or High issues introduced by this change.

Production HTTP checks and one controlled end-to-end submission are release verification steps after deployment. They are not missing implementation requirements.

## Files Changed

- `DEPLOY.md` (M): added Bobby to release regression checks, campaign indexing rules, and server-side secret documentation.
- `library/knowledge/private/operations/ctc-equity-client-map.md` (M): recorded the Bobby page release state and completed GHL workflow configuration.
- `library/qa/security/2026-08-30-bobby-avm-security-audit.md` (A): documented the security closeout and existing follow-up items.
- `src/components/site/avm-officers.ts` (M): added Bobby's typed AVM officer configuration.
- `src/lib/lead-schema.ts` (M): added Bobby to the strict assigned-loan-officer enum.
- `src/routeTree.gen.ts` (M): registered the generated `/avm-bobby` route.
- `src/routes/api.lead.ts` (M): added fail-closed selection of Bobby's dedicated webhook secret.
- `src/routes/avm-bobby.tsx` (A): added Bobby's dedicated AVM landing page.
- `src/routes/tools.form-to-ghl.tsx` (M): documented Bobby's intake path and dedicated secret.

*Generated by quality-guardian using quality-weapon.*
