# CTC Equity PR build workflow

Date: 2026-08-28

Status: Implemented and locally verified

## Pipeline

The new `.github/workflows/pr-build.yml` runs for pull requests targeting `main` and can also be started manually.

The single verification job:

1. Checks out the repository.
2. Installs Bun 1.3.14.
3. Installs dependencies with `bun ci` against the committed lockfile.
4. Runs repository-wide ESLint with the Prettier rule disabled.
5. Runs `bun run build`.

The formatting rule is temporarily excluded because the inherited branch has repository-wide Prettier debt. Functional ESLint rules remain blocking, and formatting cleanup is intentionally separated from protected content pages so this change does not create a broad, risky diff.

## Security and concurrency controls

- Workflow permissions default to none.
- The job grants only `contents: read`.
- Third-party actions are pinned to full commit SHAs with readable version comments.
- Concurrency cancels superseded runs for the same pull request or ref.
- The workflow does not receive or use deployment secrets.

## Local verification

- Repository-wide functional ESLint passed with zero errors and nine inherited Fast Refresh warnings.
- The production Cloudflare-module build passed.
- A clean Linux-style checkout verification is required before merge.
