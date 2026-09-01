import { createFileRoute } from "@tanstack/react-router";
import { SpecialtyPage } from "@/components/site/SpecialtyPage";

const TITLE = "Non-QM Jumbo & Large-Balance Refinance Options | CTC Equity";
const DESC = "Turned down for a conventional refinance? Explore eligible Non-QM jumbo, large-balance, alternative-income and challenged-credit refinance options through CTC Equity.";

export const Route = createFileRoute("/non-qm-jumbo-loans")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESC }], links: [{ rel: "canonical", href: "https://ctcequity.com/non-qm-jumbo-loans" }] }),
  component: Page,
});

function Page() {
  return <SpecialtyPage
    eyebrow="Beyond conventional guidelines"
    title="Non-QM Jumbo & Large-Balance Loans for Borrowers Who Don't Fit Conventional Guidelines"
    description={DESC}
    intro="Turned down for a conventional refinance? You may still have options. Large loan balances, county loan limits, self-employed income, lower credit or recent mortgage history can push a borrower outside the conventional box without eliminating every financing path."
    bullets={[
      "Large-balance and jumbo-size refinance options outside conventional guidelines",
      "Alternative-income qualification including eligible bank-statement and P&L programs",
      "Eligible 1099 programs may qualify income without applying a traditional expense ratio",
      "Stated-income and other alternative-documentation options may be available for eligible borrowers and transactions",
      "Some Non-QM or equity-focused programs may consider lower credit scores or mortgage lates",
      "Cash-out and rate-and-term structures depend on equity, property, occupancy and lender requirements"
    ]}
    who="Borrowers who need a large loan amount or refinance but do not fit conventional or agency guidelines because of credit, income documentation, county limits, mortgage history or another underwriting constraint."
    uses="Potential scenarios include a conventional refinance denial, an FHA borrower limited by county loan caps, jumbo-size financing with a nontraditional credit profile, self-employed or 1099 income and eligible cash-out needs."
    faq={[
      { q: "Can I refinance if a conventional lender denied me?", a: "Potentially. Non-QM and equity-focused lenders evaluate some scenarios differently from conventional programs. The reason for the denial, property equity, credit and documentation determine the available options." },
      { q: "What if my FHA loan limit does not provide enough cash-out?", a: "A borrower with sufficient equity may have Non-QM or other refinance options outside FHA county loan limits, subject to credit, property, occupancy and lender requirements." },
      { q: "Can a 1099 borrower qualify without a traditional expense ratio?", a: "Some eligible Non-QM programs may qualify using 1099 income without applying a traditional expense ratio. Exact documentation, history and eligibility rules vary by lender." },
      { q: "Are stated-income loans available?", a: "Stated-income and alternative-documentation options may be available for eligible borrowers and transactions. Availability depends heavily on occupancy, loan purpose, property and lender guidelines." },
      { q: "Can mortgage lates or lower credit still qualify?", a: "Some Non-QM and equity-focused programs may consider credit profiles or mortgage histories that conventional programs do not. Approval is never guaranteed and lender requirements vary." }
    ]}
    related={[
      { to: "/equity-based-loans-low-credit", label: "Equity-Based Low-Credit Options" },
      { to: "/bank-statement-loans", label: "Bank Statement Loans" },
      { to: "/pnl-loans", label: "P&L Loans" },
      { to: "/conventional-loans", label: "Conventional Loans" },
      { to: "/get-my-options", label: "Get My Options" }
    ]}
  />;
}