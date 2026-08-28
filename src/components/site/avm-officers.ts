/**
 * Per-loan-officer AVM landing configuration.
 *
 * Kept in its own module so `AvmLanding.tsx` exports only a component, which is
 * what the react-refresh lint rule requires.
 */
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

export const AVM_OFFICERS: Record<"ahoo" | "ben", AvmOfficer> = {
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
    // NOTE: Ben's dedicated toll-free (877) 586-7977 was still in A2P
    // verification as of 2026-08-25, and the number before it was rejected
    // outright. Publishing an unverified toll-free on a live mailer landing
    // page risks printing a number that changes, so this shows his already
    // published direct line for now. Swap these two fields (and nothing else)
    // the moment his toll-free clears verification.
    phoneLabel: "(949) 889-2993",
    phoneHref: "tel:+19498892993",
    phoneNote: "direct",
    assignedLo: "Ben Mokri",
    source: "AVM Report Request (Ben Mailer QR)",
  },
};
import type { AssignedLoanOfficer } from "@/lib/lead-schema";
