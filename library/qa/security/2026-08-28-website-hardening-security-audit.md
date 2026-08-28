# Security Audit Report: CTC Equity website hardening

**Audit date:** 2026-08-28
**Auditor:** security-guardian
**Scope:** PR workflow, lead-form bot filtering, `/api/lead`, public metadata, image delivery changes, runtime headers, tracked secrets, and the resolved dependency graph
**Next.js version audited:** Not applicable, this project uses TanStack Start
**React version audited:** 19.2.8
**CVE watchlist last refreshed:** 2026-04-24, 126 days old and due for refresh

## Executive Summary

No Critical or High vulnerabilities were detected. The public lead endpoint now filters common automated posts without forwarding bot-control metadata or borrower data to GHL, while retaining strict validation and a 16 KiB request limit. Durable per-IP limiting remains a Medium operational follow-up at Cloudflare, and the site does not yet have a Content Security Policy.

## Scorecard

| Category | Status | Findings |
|---|---|---:|
| Financial / Payment Security | OK | 0 |
| PII Exposure | OK | 0 |
| Authentication & Authorization | OK | 0 |
| Injection Vulnerabilities | OK | 0 |
| Dependency Security | OK | 0 |
| Configuration & Headers | ATTN | 1 |
| Data Handling | ATTN | 1 open, 1 partially remediated |

Legend: **OK** = zero findings, **ATTN** = Medium or Low findings documented, **FAIL** = Critical or High findings.

## Critical Findings

None detected.

## High Findings

None detected.

## Medium Findings

- [x] **Application-layer bot filtering** `src/routes/api.lead.ts:47` - The unauthenticated endpoint previously forwarded every schema-valid request to GHL. It now detects a hidden honeypot or an impossibly fast form completion, acknowledges the post without forwarding it, and strips bot-control fields from every legitimate downstream payload.
- [ ] **Durable lead intake abuse controls** `src/routes/api.lead.ts:67` - The route still has no durable per-IP rate limit or cryptographic challenge. Configure a Cloudflare rate-limit rule for `POST /api/lead`; add Turnstile if paid traffic or spam volume warrants it. An in-memory limiter was intentionally not added because isolates do not provide reliable shared state.
- [ ] **Content Security Policy** `src/routes/__root.tsx:145` - The live response includes HSTS, `nosniff`, frame denial, a restrictive permissions policy, and strict referrer policy, but no CSP. The site currently uses inline styles and inline JSON scripts, so a strict nonce-based CSP needs a focused rollout and browser verification.

## Low Findings

- [ ] **Security research freshness** - The security-weapon CVE watchlist was last refreshed 126 days before this audit. Refresh it before the next release audit.

## Dependency Audit

```text
Command: npx --yes bun@1.3.14 audit --json
Result: {}
Critical: 0
High: 0
Moderate: 0
Low: 0
```

The Bun audit was used because this repository tracks `bun.lock`.

## Framework Version Check

| CVE | Patched threshold | Current project | Status |
|---|---|---|---|
| CVE-2025-29927, Next.js middleware bypass | Next.js 14.2.25 / 15.2.3 | TanStack Start | Not applicable |
| CVE-2025-55182, React2Shell RCE | React 19.2.2 or later | React 19.2.8 | Patched |
| CVE-2025-66478, Next.js companion | Current supported Next.js | TanStack Start | Not applicable |
| CVE-2026-27978, null-origin CSRF | Current supported Next.js | TanStack Start | Not applicable |

## Secret and PII Review

- No tracked `.env` files were found.
- No hardcoded credentials, private keys, or live webhook URLs were found.
- GHL webhook destinations remain server-only environment values.
- The server does not log names, email addresses, phone numbers, property addresses, or request bodies.
- Schema validation is strict and every string field has a length limit.
- The request body is rejected above 16 KiB.
- Honeypot and timing fields are deleted before legitimate submissions are sent to GHL.
- Static blog, FAQ, JSON-LD, chart, and internal documentation HTML sinks were reviewed. Their inputs are repository-owned constants, and JSON-LD rendered through the shared helper escapes literal `<` characters.

## Runtime Header Review

The production homepage returned these headers on 2026-08-28:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Files Changed for Security

| File | Change Summary |
|---|---|
| `src/components/site/BotTrap.tsx` | Adds the hidden bot-only field. |
| `src/components/site/LeadForm.tsx` | Sends the honeypot and form-start timestamp. |
| `src/components/site/HomeValueForm.tsx` | Sends the honeypot and form-start timestamp. |
| `src/lib/lead-schema.ts` | Strictly validates the two optional bot-control fields. |
| `src/routes/api.lead.ts` | Filters likely bot posts and removes bot-control fields before forwarding. |

The complete diff was reviewed, targeted ESLint passed, the production build passed, and local endpoint probes returned 200 for a trapped bot post and 400 for an invalid post.

## Recommended Follow-Up

- Configure Cloudflare per-IP rate limiting for `POST /api/lead`.
- Consider Turnstile only if the passive controls are insufficient.
- Plan a nonce-based CSP rollout around TanStack Start's inline scripts.
- Refresh the security-weapon CVE research.

*Generated by security-guardian using security-weapon.*
