# Quality Review: CTC Equity website hardening

Date: 2026-08-28

Verdict: PASS WITH FOLLOW-UP

## Scope reviewed

This review covers the user-approved website work on branch `agent/ctc-equity/website-hardening`: pull-request verification, passive lead-form bot filtering, image delivery, Lighthouse findings that could be corrected without changing protected marketing content, and the supporting audit records.

The binding constraints in `prd-001-website-pending-work-index.md` were treated as invariants. The review did not claim that every backlog item in PRD-001 is complete.

## Scorecard

| Area | Result | Evidence |
|---|---|---|
| Protected route | Pass | `free-home-value-report.tsx` has no diff from PR #9 or from the current branch base. |
| Sitemap and indexing posture | Pass | No sitemap source or route indexing directive changed. |
| Protected homepage content | Pass | Homepage changes are limited to fixing a destinationless award card and serving the existing EMC logo in WebP with PNG fallback. No prose, heading, metadata, or JSON-LD changed in `index.tsx`. |
| Lead intake | Pass | Both public forms send a honeypot and start timestamp. The strict endpoint filters likely bots and strips control fields before forwarding. |
| Accessibility | Pass | Form labels now reference their controls, the logo link has a matching accessible name, and the destinationless homepage anchor is now non-interactive. |
| Image delivery | Pass | Team images use AVIF and WebP sources with PNG fallback, explicit dimensions, lazy loading, and asynchronous decoding. The EMC logo now has a local WebP source. |
| Metadata | Pass | A real favicon is declared, duplicate template metadata is removed, and unverified structured-data placeholders are no longer published. |
| CI | Pass | Locked installation, functional ESLint, and production build run on pull requests with least-privilege permissions and pinned actions. |
| Security ordering | Pass | Security review completed before this quality review, with zero Critical or High findings. |
| Production verification | Pending | Must be completed after merge and Lovable deployment. |

## Requirement traceability

| Requirement | Implementation | Verification |
|---|---|---|
| Do not alter `/free-home-value-report` | No route-file edit | `git diff e3fe236..HEAD -- src/routes/free-home-value-report.tsx` and branch diff both returned empty. |
| Do not remove indexed routes | No sitemap edit | Sitemap diff returned empty. |
| Do not rewrite homepage content | `src/routes/index.tsx:597` and `src/routes/index.tsx:689` | Semantic diff reviewed. Only element semantics and image delivery changed. |
| Filter simple automated lead posts | `src/components/site/BotTrap.tsx:1`, `src/routes/api.lead.ts:47` | Local trapped post returned 200 without downstream forwarding. Invalid payload returned 400. |
| Preserve downstream payload contract | `src/routes/api.lead.ts:59` | Bot-control fields are removed before JSON is sent to the configured webhook. |
| Improve image payload | `src/components/site/TeamMembers.tsx:253`, `src/components/site/SiteNav.tsx:117` | New AVIF and WebP assets were generated and inspected. Measured affected image payload fell from about 958 KB to about 34 KB. |
| Add PR verification | `.github/workflows/pr-build.yml:1` | Workflow syntax and controls reviewed. Clean-checkout execution remains the pre-merge gate. |
| Document results | `library/qa/lighthouse/2026-08-28-reckoning-audit.md`, `library/qa/devops/2026-08-28-pr-build-workflow.md`, `library/qa/security/2026-08-28-website-hardening-security-audit.md` | Reports are present and consistent with observed commands and runtime headers. |

## Findings

### Medium

- Durable per-IP limiting for `POST /api/lead` still requires Cloudflare account configuration. The application-level honeypot is useful but is not a substitute for edge enforcement.
- A nonce-based Content Security Policy remains a separate hardening task because the current runtime emits inline scripts and styles.

### Low

- The inherited repository does not currently pass its Prettier rule without a broad formatting rewrite. The PR workflow keeps functional ESLint blocking and explicitly excludes Prettier until a dedicated cleanup can avoid mixing formatting churn with protected content changes.
- Lighthouse still reports shared visual-system issues, including some color contrast and link affordance findings, plus render-blocking Google Fonts. Those are tracked as follow-up because they require design or delivery changes beyond this safe hardening release.

## Verification completed

- Production build passed after the final source changes.
- Repository-wide functional ESLint passed with zero errors and nine inherited Fast Refresh warnings.
- Workflow YAML parsing passed after the code-lint command was encoded as a folded block scalar.
- The workflow-only correction received a security recheck before this final quality confirmation.
- Dependency audit returned no advisories.
- Local lead-handler probes passed for trapped and invalid requests.
- Three mobile Lighthouse runs were completed for the homepage, with additional mobile runs for `/get-my-options`, `/heloc`, and `/team`.
- Security review found zero Critical or High findings.

## Release gate

The branch may merge after a clean-checkout install, lint, and build pass, current `origin/main` is integrated, the pull request reports MERGEABLE, and required checks succeed. After Lovable deploys the merge, verify the new assets, favicon, metadata, and trapped lead response on `ctcequity.com`.

*Generated by quality-guardian using quality-weapon.*
