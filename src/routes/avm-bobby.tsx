import { createFileRoute } from "@tanstack/react-router";
import { AvmLanding } from "@/components/site/AvmLanding";
import { AVM_OFFICERS } from "@/components/site/avm-officers";

const OFFICER = AVM_OFFICERS.bobby;

const TITLE = "Your Free Virtual Appraisal Report with Bobby Khalessi | CTC Equity";
const DESC =
  "Scan-to-request landing page for Bobby Khalessi's CTC Equity mailer. Enter the code from your letter and get a free virtual appraisal (AVM) report for your property.";

/**
 * /avm-bobby : Bobby Khalessi's dedicated mailer and QR campaign landing page.
 *
 * Per-officer so each loan officer's mailer traffic shows their own callback
 * number and lands in their own GHL workflow. The submission carries
 * `assigned_lo` for deterministic routing.
 *
 * Marked noindex,follow like the other campaign AVM pages so it does not
 * compete with /free-home-value-report for organic traffic.
 */
export const Route = createFileRoute("/avm-bobby")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/avm-bobby" }],
  }),
  component: () => <AvmLanding officer={OFFICER} />,
});
