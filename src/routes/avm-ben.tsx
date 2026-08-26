import { createFileRoute } from "@tanstack/react-router";
import { AvmLanding } from "@/components/site/AvmLanding";
import { AVM_OFFICERS } from "@/components/site/avm-officers";

const OFFICER = AVM_OFFICERS.ben;

const TITLE = "Your Free Virtual Appraisal Report with Ben Mokri | CTC Equity";
const DESC =
  "Scan-to-request landing page for Ben Mokri's CTC Equity mailer. Enter the code from your letter and get a free virtual appraisal (AVM) report for your property.";

/**
 * /avm-ben : Ben Mokri's dedicated mailer and QR campaign landing page.
 *
 * Per-officer so each loan officer's mailer traffic shows their own callback
 * number and lands in their own GHL pipeline. The submission carries
 * `assigned_lo` for the workflow to route on.
 *
 * Marked noindex,follow like the shared /avm page: these are campaign landing
 * pages and must not compete with /free-home-value-report, which ranks
 * organically for "free home value report".
 */
export const Route = createFileRoute("/avm-ben")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/avm-ben" }],
  }),
  component: () => <AvmLanding officer={OFFICER} />,
});
