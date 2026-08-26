# PRD-001b: Content engine, one question, one page

> **Parent:** [PRD-001: CTC Equity website, pending work](./prd-001-website-pending-work-index.md)
> **Status:** Draft
> **Priority:** P1
> **Effort:** M (3-8h) for the process and the first article; ongoing thereafter

---

## Overview

This is the documented engine behind the ChatGPT citations, and it is currently a one-off rather than a process. The model is simple and it is already the site's stated strategy: the client writes down a real borrower question, and that question becomes its **own** indexed page that answers it. Not a paragraph appended to an existing page. Its own page.

The deliverable here is a repeatable authoring process plus the plumbing that makes each new page indexable without anyone having to remember six manual steps.

---

## Goals

- A written procedure exists that a non-engineer can follow to get a new question published.
- Publishing a new article automatically makes it indexable (sitemap, canonical, structured data) with no manual sitemap edit.
- The first article produced under the new process is published end to end, proving the loop.
- The process is explicitly additive and never edits an existing earning page.

## Non-Goals

- Migrating to a headless CMS. The current content module is fine as a starting point.
- Writing the borrower questions. Those come from the client, who talks to borrowers.
- Backfilling or rewriting the existing published article.
- Any change to `/free-home-value-report`, `/avm`, or the homepage as part of publishing an article.

---

## Current state (verified in source 2026-08-25)

- Articles live in `src/content/blog.ts` as a typed `POSTS: BlogPost[]` array, with `getPost(slug)` as the lookup.
- There is exactly **one** published post today: slug `heloc-without-refinancing`.
- `src/routes/blog.index.tsx` renders the list. Its own copy already states the strategy: posts are written so the questions people ask AI get answered first.
- `src/routes/blog.$slug.tsx` renders a single post.
- `src/routes/sitemap[.]xml.ts` already imports `POSTS` and maps each one into a `/blog/<slug>` sitemap entry. So sitemap inclusion is already automatic; adding a post to the array is enough.

That last point matters: most of the plumbing exists. What is missing is the written process, the structured data that makes a question-and-answer page citable, and the discipline that keeps each question on its own page.

---

## Acceptance criteria

| ID | Criterion |
|---|---|
| AC-1b-1 | Given the repository, when `library/knowledge/` is searched, then a committed procedure document exists that describes, step by step, how to take one borrower question from raw text to a published, indexed page. It names the file to edit, the required fields, and how to verify the result. |
| AC-1b-2 | Given that procedure document, when a reader with no engineering background follows it, then every step is a concrete instruction with a file path or a URL. No step says "add it to the site" or similar without saying where. |
| AC-1b-3 | Given the procedure document, when its rules section is read, then it states explicitly that each question gets its own new page and that existing pages are never edited to absorb a new topic, and it names `/free-home-value-report` as a page that is never touched. |
| AC-1b-4 | Given a newly added post, when the site is built and `/sitemap.xml` is fetched, then the new post's URL appears in the sitemap with no manual edit to `src/routes/sitemap[.]xml.ts`. |
| AC-1b-5 | Given any single post page, when its rendered head is inspected, then it emits a canonical link to its own absolute URL, a unique `<title>`, and a unique meta description derived from the post. |
| AC-1b-6 | Given any single post page, when its rendered HTML is inspected, then it emits valid JSON-LD appropriate to a question-answering page. At minimum an `Article` or `BlogPosting` node with `headline`, `datePublished`, and an `author` or `publisher` naming CTC Equity. Where the post is framed as a direct question, a `FAQPage` node answering that question is also emitted. `/get-my-options` is the working reference for FAQPage markup already in this codebase. |
| AC-1b-7 | Given the JSON-LD emitted by a post page, when it is validated with a structured-data validator, then it reports no errors. |
| AC-1b-8 | Given the new process, when the first article is published under it, then the total post count in `src/content/blog.ts` has increased from one, the new post renders at its own `/blog/<slug>` URL returning HTTP 200, and it appears in `/sitemap.xml`. |
| AC-1b-9 | Given the diff for this sub-PRD, when it is reviewed, then no file under `src/routes/` other than the blog routes, the sitemap, and newly created files has been modified. Publishing content must not require touching an earning page. |
| AC-1b-10 | Given the procedure document, when its intake section is read, then it names who supplies the borrower questions (the client: Ahoo and Ben) and what a usable submission looks like, so that a dry pipeline is visibly a client-input problem rather than an engineering problem. |

---

## Implementation notes

- The sitemap already derives blog entries from `POSTS`, so keep new content flowing through that array rather than inventing a parallel route per article. That preserves AC-1b-4 for free.
- Structured data can be emitted from `blog.$slug.tsx` for every post rather than hand-written per post, which keeps AC-1b-6 and AC-1b-7 from decaying as volume grows.
- The procedure document belongs in `library/knowledge/` and is a candidate for `public/guides/` if the client is meant to read it directly, or `private/operations/` if it stays internal. Default to private and promote it if the client will be following it themselves.

---

## Open questions

- [ ] Who writes the answer once the client supplies the question? Owner: Jonathan. The client supplies real borrower questions; whether they draft the answer or Cuantico does affects the throughput assumption in the procedure.
- [ ] Target publishing cadence. Owner: Jonathan and the client. The procedure should state one, even if the answer is "as questions arrive".
