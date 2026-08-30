# Security Audit Report: Bobby AVM Intake

**Audit date:** 2026-08-30
**Auditor:** security-guardian
**Scope:** Bobby AVM route, officer configuration, lead schema, server-side webhook selection, generated route registration, deployment documentation, and the shared lead endpoint controls
**Framework audited:** TanStack Start 1.168.49 on Nitro 3.0.260603-beta
**React version audited:** 19.2.8
**CVE watchlist last refreshed:** 2026-04-24

## Executive Summary

No Critical or High findings were detected in the Bobby AVM implementation. The new webhook remains server-side, Bobby is selected through a strict enum, the route fails closed when its dedicated secret is absent, and errors do not log borrower PII or the webhook URL. Two pre-existing Medium items remain: the public lead endpoint has no durable edge rate limit, and the response header set does not yet include a Content Security Policy.

The security watchlist is 128 days old, which exceeds the 120-day freshness threshold. Refresh the security-weapon CVE research before the next release audit.

## Scorecard

| Category | Status | Findings |
|---|---|---:|
| Financial / Payment Security | OK | 0 |
| PII Exposure | OK | 0 |
| Authentication and Authorization | OK | 0 |
| Injection Vulnerabilities | OK | 0 |
| Dependency Security | OK | 0 |
| Configuration and Headers | ATTN | 1 |
| Data Handling | ATTN | 1 |

Legend: **OK** means zero findings. **ATTN** means Medium or Low findings are documented. **FAIL** means a Critical or High finding was detected.

## Critical Findings

None detected.

## High Findings

None detected.

## Medium Findings

- [ ] **Abuse resistance** `src/routes/api.lead.ts:98` - The public lead endpoint uses a honeypot, completion-time check, strict validation, and a 16 KiB body limit, but it explicitly lacks durable edge rate limiting. Add a Cloudflare per-IP and per-route limit before materially increasing paid campaign volume.
- [ ] **Content Security Policy** `src/server.ts:11` - The server adds HSTS, `nosniff`, frame denial, referrer policy, and permissions policy, but no Content Security Policy. Add and regression-test a nonce-based policy as a separate hardening change because this application currently uses inline JSON-LD and other inline content.

## Low Findings

None detected.

## Bobby Routing Evidence

- `src/lib/lead-schema.ts:5` restricts `assigned_lo` to the known officer enum, including `Bobby Khalessi`.
- `src/lib/lead-schema.ts:8` uses a strict Zod object and bounded lead fields.
- `src/routes/api.lead.ts:37` reads only the server-side `GHL_AVM_BOBBY_WEBHOOK_URL` for Bobby.
- `src/routes/api.lead.ts:39` fails closed instead of falling back to Ahoo's shared webhook.
- `src/routes/api.lead.ts:66` removes bot-trap timing fields before forwarding.
- `src/routes/api.lead.ts:77` enforces the declared body-size limit and `src/routes/api.lead.ts:84` verifies the actual encoded body size.
- `src/routes/api.lead.ts:107` logs only a bounded intake-path identifier derived from the strict officer enum. Borrower names, email, phone, address, message content, and webhook URLs are not logged.
- `src/routes/avm-bobby.tsx:15` marks the campaign page `noindex,follow`, and its canonical URL contains no lead PII.

## Dependency Audit

```text
Production dependencies: 255
Info: 0
Low: 0
Moderate: 0
High: 0
Critical: 0
Total vulnerabilities: 0
```

The repository uses `bun.lock`. Because Bun was unavailable on this host, the audit was reproduced from `package.json` into a temporary npm lockfile with lifecycle scripts disabled. The temporary lockfile was not committed.

## Framework CVE Check

| CVE | Required state | Current project | Status |
|---|---|---|---|
| CVE-2025-55182, React2Shell | React 19.2.2 or later on the 19.2 line | React 19.2.8 | Patched |
| CVE-2025-66478, Next.js companion | Patched Next.js release | No Next.js dependency | Not applicable |
| CVE-2025-29927, middleware bypass | Next.js 14.2.25 or 15.2.3 or later | No Next.js dependency | Not applicable |
| CVE-2025-55184 and CVE-2025-55183 | Patched Next.js App Router release | TanStack Start, no Next.js | Not applicable |
| CVE-2026-27978, null-origin CSRF | Patched Next.js Server Actions release | No Next.js Server Actions | Not applicable |

## Deterministic Scan Results

- Hidden Unicode scan of AI instruction files: clean.
- `NEXT_PUBLIC_` and `VITE_` secret-name scan: no hits.
- Hardcoded credential patterns: no hits.
- Raw payment-card fields: no hits.
- JWT algorithm, SQL template, command injection, prototype-pollution merge, and wildcard CORS patterns: no hits in source.
- Existing `dangerouslySetInnerHTML` hits were reviewed as pre-existing surfaces. The Bobby route adds none.
- The actual GHL webhook URL is absent from tracked source and documentation. Only placeholder hook URLs are shown in the internal setup guide.

## Files Changed for Remediation

No application remediation was required. This audit adds only this report.

## Recommended Follow-Up

- Add Cloudflare rate limiting for `POST /api/lead`, with separate thresholds for bot traffic and genuine campaign submissions.
- Add a nonce-based Content Security Policy after inventorying inline scripts and styles.
- Refresh the security-weapon CVE watchlist because it is older than 120 days.

The final diff was reviewed on 2026-08-30. No secrets, borrower PII, new dependencies, authentication bypasses, injection sinks, or client-side webhook exposure were introduced.

*Generated by security-guardian using security-weapon.*
