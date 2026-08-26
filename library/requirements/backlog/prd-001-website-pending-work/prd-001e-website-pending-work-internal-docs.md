# PRD-001e: Internal docs page is stale

> **Parent:** [PRD-001: CTC Equity website, pending work](./prd-001-website-pending-work-index.md)
> **Status:** Draft
> **Priority:** P2
> **Effort:** XS (under 1h)

---

## Overview

`/tools/form-to-ghl` is an internal documentation page that explains how site forms reach GoHighLevel. It still documents `VITE_GHL_INBOUND_WEBHOOK_URL`, a client-side environment variable that was retired when the lead flow moved behind a server-side proxy. Anyone following that page today would configure the wrong variable and conclude the integration is broken.

Small, but it is actively misleading, and it is the page someone reads precisely when they are trying to work out why leads are not arriving.

---

## Goals

- The page documents the variables the code actually reads.
- The page reflects that the webhook URL is server side and never exposed to the browser.
- A reader troubleshooting a missing lead gets accurate guidance.

## Non-Goals

- Redesigning the page or the other `/tools/*` pages.
- Documenting the GoHighLevel side of the flow (workflows, tags, opportunity naming). That is the ops lane.
- Changing any behaviour in `src/routes/api.lead.ts`. This sub-PRD is documentation only.

---

## Current state (verified in source 2026-08-25)

Stale references in `src/routes/tools.form-to-ghl.tsx`:

- Line 14: a sample env block showing `VITE_GHL_INBOUND_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...`
- Line 37: prose saying the form posts to the GHL inbound webhook "if the env var `VITE_GHL_INBOUND_WEBHOOK_URL` is set"
- Line 71: an instruction to set the webhook URL as `VITE_GHL_INBOUND_WEBHOOK_URL` in the project's settings

What the code actually does, verified in `src/routes/api.lead.ts`:

- Forms POST to the server route `/api/lead`, not directly to GoHighLevel.
- The payload is validated by `leadSubmissionSchema` in `src/lib/lead-schema.ts`, which is a `.strict()` discriminated union on `lead_kind` with two members: `get_my_options` and `avm_report_request`.
- `lead_kind: "get_my_options"` reads `GHL_GET_MY_OPTIONS_WEBHOOK_URL`, **with no fallback**.
- `lead_kind: "avm_report_request"` reads `GHL_AVM_WEBHOOK_URL`, falling back to the legacy `GHL_INBOUND_WEBHOOK_URL`.
- If the resolved URL is missing, the handler returns HTTP 503 with `{ ok: false, configured: false }`.
- None of these variables carries the `VITE_` prefix, which is exactly the point: they are server-side only and are never bundled into client code.

---

## Acceptance criteria

| ID | Criterion |
|---|---|
| AC-1e-1 | Given `src/routes/tools.form-to-ghl.tsx`, when it is searched for the string `VITE_GHL_INBOUND_WEBHOOK_URL`, then there are zero matches. |
| AC-1e-2 | Given the rendered `/tools/form-to-ghl` page, when the documented environment variables are read, then they are exactly the three the code reads: `GHL_GET_MY_OPTIONS_WEBHOOK_URL`, `GHL_AVM_WEBHOOK_URL`, and `GHL_INBOUND_WEBHOOK_URL` described as the legacy AVM-only fallback. |
| AC-1e-3 | Given the rendered page, when the routing explanation is read, then it states that forms POST to the server route `/api/lead` and that the server selects the destination webhook from the `lead_kind` field, rather than the browser posting directly to GoHighLevel. |
| AC-1e-4 | Given the rendered page, when the `lead_kind` values are read, then it names both `get_my_options` and `avm_report_request` and states which page sends which. |
| AC-1e-5 | Given the rendered page, when the fallback behaviour is read, then it states explicitly that `get_my_options` has **no** fallback variable, so an unset `GHL_GET_MY_OPTIONS_WEBHOOK_URL` causes every Get-My-Options submission, including the homepage form, to fail with HTTP 503 and be lost. |
| AC-1e-6 | Given the rendered page, when the secrets guidance is read, then it states that these are server-side variables set in the deployment's secret store, that they carry no `VITE_` prefix by design, and that adding a `VITE_` prefix would expose the webhook URL in the browser bundle. |
| AC-1e-7 | Given the rendered page, when the troubleshooting section is read, then it tells a reader what an HTTP 503 with `{ ok: false, configured: false }` from `/api/lead` means and which variable to check. |
| AC-1e-8 | Given the diff for this sub-PRD, when it is reviewed, then only `src/routes/tools.form-to-ghl.tsx` has changed. No behaviour change to `src/routes/api.lead.ts`, `src/lib/lead-schema.ts`, or any form component. |
| AC-1e-9 | Given `/tools/form-to-ghl`, when its indexing posture is checked, then it is unchanged by this sub-PRD. This is an internal page and this work does not alter whether it is indexed. |

---

## Implementation notes

- Read `src/routes/api.lead.ts` and `src/lib/lead-schema.ts` and describe what they do rather than what the old page said. Do not copy the stale wording forward with a renamed variable.
- Do not paste a real webhook URL into the page as an example. Keep the illustrative `https://services.leadconnectorhq.com/hooks/...` shape.
- AC-1e-5 exists because this documentation page is the natural place someone lands when leads stop arriving, and the single most likely cause is the unset `GHL_GET_MY_OPTIONS_WEBHOOK_URL`. Verifying whether that variable is actually set in Lovable is **not** part of this sub-PRD; it is a secrets-panel action owned by Jonathan and tracked in the Client Map, section 7.1. Its status is UNVERIFIED.
