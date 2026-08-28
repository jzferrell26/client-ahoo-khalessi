# Security Audit Report: CTC Equity per-officer AVM intake

**Audit date:** 2026-08-28
**Auditor:** security-guardian
**Scope:** AVM and Get My Options lead forms, `/api/lead`, GHL webhook secret routing, team JSON-LD, runtime headers, and the resolved dependency graph
**Next.js version audited:** Not applicable, this project uses TanStack Start
**React version audited:** 19.2.8
**CVE watchlist last refreshed:** 2026-04-24 (126 days old, refresh required)

## Executive Summary

The final dependency audit is clean after upgrading the lockfile out of one critical and multiple high-severity transitive advisories. The lead route keeps all GHL URLs in server-only runtime secrets, validates a strict and size-limited payload, and does not log borrower PII. One medium operational risk remains: the public lead endpoint has no explicit rate limit or bot challenge. The security-weapon CVE watchlist is 126 days old and should be refreshed before the next audit cycle.

## Scorecard

| Category | Status | Findings |
|---|---|---:|
| Financial / Payment Security | OK | 0 |
| PII Exposure | OK | 0 |
| Authentication & Authorization | OK | 0 |
| Injection Vulnerabilities | OK | 1 fixed |
| Dependency Security | OK | Critical and high advisories fixed |
| Configuration & Headers | OK | 0 |
| Data Handling | ATTN | 1 |

Legend: **OK** = zero open findings, **ATTN** = Medium or Low findings documented, **FAIL** = Critical or High findings still open.

## Critical Findings (fixed in this session)

- [x] **Unsafe deserialization dependency** `bun.lock` - `seroval@1.5.2` was affected by GHSA-mv8w-475r-vwqw. Updating the TanStack dependency graph resolved a patched Seroval version, and the final Bun audit reports no advisories.

## High Findings (fixed in this session)

- [x] **Transitive dependency advisories** `bun.lock` - the initial audit found high-severity advisories in `brace-expansion`, `js-yaml`, `nanoid`, `postcss`, and `undici`. Refreshing compatible direct and transitive dependencies removed every reported high-severity advisory.

## Medium Findings

- [x] **JSON-LD script termination** `src/components/site/JsonLd.tsx:5` - the shared JSON-LD renderer accepted an arbitrary value and serialized literal `<` characters, which could allow a future dynamic string containing `</script>` to terminate the script node. The renderer now emits `\u003c` for every literal `<`.
- [ ] **Lead intake abuse controls** `src/routes/api.lead.ts:51` - the public endpoint is intentionally unauthenticated, but it has no explicit per-IP rate limit, Turnstile check, or equivalent bot control. Add a Cloudflare rate-limit rule and consider Turnstile before scaling paid traffic, because automated submissions can create GHL records and trigger SMS or email costs.

## Low Findings

- [ ] **Security research freshness** - the security-weapon CVE watchlist was last refreshed on 2026-04-24, 126 days before this audit. Refresh the security-weapon research before the next release audit.

## Dependency Audit

```text
Initial: 1 critical advisory, multiple high and moderate advisories in transitive packages.
Final command: npx --yes bun audit --json
Final result: {}
Final open advisories: 0
```

The Bun audit was used because this repository tracks `bun.lock` rather than an npm, pnpm, or Yarn lockfile.

## Framework Version Check

| CVE | Patched threshold | Current project | Status |
|---|---|---|---|
| CVE-2025-29927, Next.js middleware bypass | Next.js 14.2.25 / 15.2.3 | TanStack Start, no Next.js | Not applicable |
| CVE-2025-55182, React2Shell RCE | React 19.0.1 / 19.1.2 / 19.2.1 | React 19.2.8 | Patched |
| CVE-2025-66478, Next.js companion | Current supported Next.js | TanStack Start, no Next.js | Not applicable |
| CVE-2026-27978, null-origin CSRF | Current supported Next.js | TanStack Start, no Next.js | Not applicable |

## Secret and PII Review

- `GHL_AVM_BEN_WEBHOOK_URL`, `GHL_AVM_WEBHOOK_URL`, and `GHL_GET_MY_OPTIONS_WEBHOOK_URL` are read only from the server runtime environment.
- No actual webhook URL or token is present in tracked source. Documentation contains placeholders only.
- The client receives only `ok`, `configured`, and stable error identifiers.
- Server logs contain intake-path and downstream status information, not names, emails, phone numbers, addresses, or raw request bodies.
- The Zod schema is strict, field lengths are bounded, and the raw request body is limited to 16 KiB.

## Runtime Header Review

The live site returned HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, a restrictive permissions policy, and `Referrer-Policy: strict-origin-when-cross-origin` on 2026-08-28.

## Files Changed (remediation)

| File | Change Summary |
|---|---|
| `src/components/site/JsonLd.tsx` | Escapes literal `<` characters in serialized JSON-LD. |
| `package.json` | Refreshes compatible package version floors used by the clean dependency graph. |
| `bun.lock` | Resolves patched direct and transitive dependency versions. |

The complete diff was reviewed and the production build passed on 2026-08-28.

## Recommended Follow-Up

- Configure a Cloudflare rate-limit rule for `POST /api/lead`, then evaluate Turnstile if spam reaches GHL.
- Refresh the security-weapon CVE research before the next audit.

*Generated by security-guardian using security-weapon.*
