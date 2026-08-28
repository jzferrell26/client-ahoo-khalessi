# Deploying ctcequity.com

The one thing to know before anything else:

> **Merging to `main` does NOT publish the site.**
> It syncs the code into Lovable. Publishing is a separate step that has to be triggered.
> This has been true on every deploy measured so far (2026-07-24, and PRs #9, #11, #12).
> Treat it as how the system works, not as an intermittent bug.

If you merge and walk away, the live site does not change.

---

## The stack, in one paragraph

The GitHub repo (`jzferrell26/client-ahoo-khalessi`) is connected to a Lovable project
(`336999dc-5578-42bf-90ec-51cf0c3da9a3`, "Ahoo's Website"). Merging to `main` syncs the commit into
Lovable within about a minute. Lovable then serves that code at a preview URL. The public site,
`ctcequity.com`, is served from the last **published** build, which is a separate artifact from the
preview. So there are three states, and they can all disagree:

| Surface                                     | What it reflects                  |
| ------------------------------------------- | --------------------------------- |
| `main` on GitHub                            | What was merged                   |
| `id-preview--336999dc-...lovable.app`       | What Lovable has synced and built |
| `ctcequity.lovable.app` and `ctcequity.com` | What was last **published**       |

A deploy is only finished when the third row changes.

---

## Deploy procedure

### 1. Merge

The repo requires **squash** merges. Merge commits are rejected.

```bash
gh pr merge <number> --repo jzferrell26/client-ahoo-khalessi --squash
```

Never force push, rebase, amend, or squash commits that are already pushed. The project is
Lovable-connected and rewriting published history corrupts the project history on Lovable's side.
This is also stated in `AGENTS.md`.

### 2. Publish

Either route works. Both publish the same build.

**From the Lovable editor:** open the project, click **Publish**, then **Update**. If the button
reads "Publish, unpublished changes available", that is confirmation the publish never fired on its
own.

**Programmatically,** via the Lovable MCP `deploy_project` tool:

```
deploy_project(project_id: "336999dc-5578-42bf-90ec-51cf0c3da9a3", name: "ctcequity")
```

Pass the existing slug `ctcequity`. A different name publishes to a **new URL** instead of updating
the live one.

It returns `status: "pending"`. The live domain typically flips within 15 to 60 seconds.

### 3. Verify, and verify the right thing

Do not trust any of these as proof the deploy worked:

- Lovable's `latest_commit_sha` matching `main`. That only proves the **sync** happened.
- The preview URL working. The preview is not the published build.
- A `200` on the homepage. The homepage returns `200` from the old build too.

**The only reliable check is requesting a route that is new in this specific deploy, cache-busted:**

```bash
curl -sS -o /dev/null -w "%{http_code}\n" -L "https://ctcequity.com/<new-route>?cb=$(date +%s)"
```

`404` means the publish has not landed yet. `200` means it has.

If the deploy contained no new routes, grep the live HTML for a string that is unique to the change:

```bash
curl -sS -L "https://ctcequity.com/?cb=$(date +%s)" | grep -c "some new string"
```

### 4. Regression check

After any change touching shared components (`SiteNav`, `SiteFooter`) or the homepage, confirm the
pages that earn traffic are intact:

```bash
for u in / /free-home-value-report /get-my-options /team /avm /avm-ahoo /avm-ben; do
  echo "$(curl -sS -o /dev/null -w '%{http_code}' -L "https://ctcequity.com${u}?cb=$(date +%s)")  ${u}"
done
```

---

## Do not break these

**`/free-home-value-report` is off limits.** It ranks in Google for "free home value report" and is
a live source of applications. Do not edit it, redirect it, or point a canonical away from it.

**Do not migrate the site off Lovable.** It earns organic traffic from Google and from citations
inside ChatGPT and other LLM answers. Moving it resets that traction. This was decided on
2026-08-20 and is the reason the site has not been moved to Vercel.

**Growth is additive.** A new topic gets its own new page. Content is not appended into an existing
earning page to make it "cover more".

**Campaign landing pages are `noindex,follow`.** `/avm`, `/avm-ahoo`, and `/avm-ben` are deliberately
kept out of the index so they cannot compete with `/free-home-value-report`. They are also
deliberately absent from `sitemap.xml`. Keep it that way.

---

## Environment variables

These are **server-side** Lovable secrets. None of them carries a `VITE_` prefix, and that is
deliberate: a `VITE_` prefixed variable is bundled into the browser JavaScript, which would expose
the webhook URL publicly.

| Variable                         | Used by                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `GHL_GET_MY_OPTIONS_WEBHOOK_URL` | `lead_kind: get_my_options`. **No fallback.**                                    |
| `GHL_AVM_WEBHOOK_URL`            | Shared and Ahoo `lead_kind: avm_report_request` submissions                      |
| `GHL_AVM_BEN_WEBHOOK_URL`        | `/avm-ben` submissions assigned to Ben's separate GHL location. **No fallback.** |
| `GHL_INBOUND_WEBHOOK_URL`        | Legacy fallback, AVM only                                                        |

If `GHL_GET_MY_OPTIONS_WEBHOOK_URL` is unset, every Get My Options submission, **including the
homepage form**, returns HTTP 503 and the lead is lost with no visible error. There is no fallback
for that path. `/tools/form-to-ghl` documents this in full.

If `GHL_AVM_BEN_WEBHOOK_URL` is unset, `/avm-ben` submissions return HTTP 503. They deliberately
do not fall back to the shared Ahoo webhook, because that would silently put Ben's leads in the
wrong GHL subaccount.

Secrets are set in the Lovable project's secrets panel. Changing one requires a rebuild to take
effect.

---

## Rolling back

Lovable keeps published versions. The fastest rollback is to republish the previous version from
the editor's version history.

To roll back in git instead, revert the offending commit on a branch and merge it forward. Do not
rewrite history that has already been pushed.

```bash
git revert <sha>
```

Then publish again, and verify per step 3.

---

## Local development

`bun` is declared (`bun.lock`) but is not installed on the current working machine. `npm` works.

```bash
npm install
npm run dev      # local dev server
npm run build    # also regenerates src/routeTree.gen.ts, which is committed
npm run lint
```

`src/routeTree.gen.ts` is generated at build time and **is** committed. After adding a route file,
run the build so the new route lands in it, and commit the result.

**Do not run `eslint --fix` or `prettier --write` across the repo.** There are roughly 9,300
pre-existing CRLF formatting errors. A repo-wide fix rewrites every file and buries the real diff.
Lint only the files you touched.
