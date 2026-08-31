/**
 * Per-loan-officer AVM landing configuration.
 *
 * Kept in its own module so `AvmLanding.tsx` exports only a component, which is
 * what the react-refresh lint rule requires.
 */

import type { AssignedLoanOfficer } from "@/lib/lead-schema";
export type AvmOfficer = {
  /** URL slug, also used in the canonical link. */
  slug: string;
  /** Display name, used in the page copy and the meta title. */
  name: string;
  /** First name, for the friendlier inline references. */
  firstName: string;
  /** Number shown as the "prefer to talk" fallback on this page. */
  phoneLabel: string;
  /** tel: href matching phoneLabel. */
  phoneHref: string;
  /** How to describe the number in copy, for example "toll-free". */
  phoneNote: string;
  /** Stamped onto the submission as `assigned_lo` for GHL workflow routing. */
  assignedLo: AssignedLoanOfficer;
  /** Stamped onto the submission as `source`. */
  source: string;
};

export const AVM_OFFICERS: Record<"ahoo" | "ben" | "bobby", AvmOfficer> = {
  ahoo: {
    slug: "avm-ahoo",
    name: "Ahoo Khalessi",
    firstName: "Ahoo",
    // The mailer toll-free already published site-wide in the top bar.
    phoneLabel: "(877) 227-0477",
    phoneHref: "tel:+18772270477",
    phoneNote: "toll-free",
    assignedLo: "Ahoo Khalessi",
    source: "AVM Report Request (Ahoo Mailer QR)",
  },
  ben: {
    slug: "avm-ben",
    name: "Ben Mokri",
    firstName: "Ben",
    // Ben's dedicated toll-free, VERIFIED by Steven on the 2026-08-27 call.
    // Note it is NOT the (877) 586-7977 number that was in verification on
    // 2026-08-25: that one did not clear, and this 8001 number replaced it.
    phoneLabel: "(877) 331-8001",
    phoneHref: "tel:+18773318001",
    phoneNote: "toll-free",
    assignedLo: "Ben Mokri",
    source: "AVM Report Request (Ben Mailer QR)",
  },
  bobby: {
    slug: "avm-bobby",
    name: "Bobby Khalessi",
    firstName: "Bobby",
    phoneLabel: "(949) 413-9332",
    phoneHref: "tel:+19494139332",
    phoneNote: "direct",
    assignedLo: "Bobby Khalessi",
    source: "AVM Report Request (Bobby Mailer QR)",
  },
};
