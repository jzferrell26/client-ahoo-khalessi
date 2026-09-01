import { createFileRoute } from "@tanstack/react-router";
import { SpecialtyPage } from "@/components/site/SpecialtyPage";

const TITLE = "Jumbo Mortgage Loans & Large-Balance Financing | CTC Equity";
const DESC = "Jumbo and large-balance mortgage options for eligible purchases and refinances, with conventional jumbo and Non-QM alternatives through CTC Equity's lender network.";

export const Route = createFileRoute("/jumbo-loans")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESC }], links: [{ rel: "canonical", href: "https://ctcequity.com/jumbo-loans" }] }),
  component: Page,
});

function Page() {
  return <SpecialtyPage
    eyebrow="Large-balance residential financing"
    title="Jumbo Mortgage & Large-Balance Loan Options"
    description={DESC}
    intro="A loan amount above conforming limits does not mean there is only one jumbo box. CTC Equity compares conventional jumbo and eligible Non-QM large-balance programs to match the borrower's property, credit, assets and income profile."
    bullets={[
      "Jumbo purchase and refinance options",
      "Large-balance cash-out structures where eligible",
      "Conventional jumbo for qualifying borrowers",
      "Non-QM alternatives when conventional jumbo guidelines do not fit",
      "Bank-statement, P&L, 1099 and other alternative-income programs where eligible",
      "Program limits, reserves, credit and documentation vary by lender"
    ]}
    who="Borrowers financing higher-value homes or larger residential loan balances who want access to multiple conventional jumbo and Non-QM lender options."
    uses="Eligible primary residences, second homes and other residential scenarios depending on lender, state licensing, occupancy and program requirements."
    faq={[
      { q: "What if I need a jumbo loan but do not fit conventional jumbo credit guidelines?", a: "Eligible Non-QM large-balance programs may provide another path. We review the complete credit, equity, property and income-documentation scenario." },
      { q: "Can self-employed borrowers get jumbo financing?", a: "Yes, depending on the program. Eligible options can include traditional documentation as well as bank statements, P&L, 1099 or other alternative-income methods." },
      { q: "Can jumbo loans be used for cash-out refinance?", a: "Cash-out may be available depending on equity, credit, property, occupancy, loan amount and lender requirements." }
    ]}
    related={[
      { to: "/non-qm-jumbo-loans", label: "Non-QM Jumbo Options" },
      { to: "/conventional-loans", label: "Conventional Loans" },
      { to: "/bank-statement-loans", label: "Bank Statement Loans" },
      { to: "/get-my-options", label: "Get My Options" }
    ]}
  />;
}