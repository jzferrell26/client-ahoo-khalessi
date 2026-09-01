import { createFileRoute } from "@tanstack/react-router";
import { SpecialtyPage } from "@/components/site/SpecialtyPage";

const TITLE = "Equity-Based Refinance & Low-Credit Loan Options | CTC Equity";
const DESC = "Have equity but challenged credit? Explore eligible equity-based refinance, first-lien, second-lien and Non-QM options for credit scores that may not fit conventional guidelines.";

export const Route = createFileRoute("/equity-based-loans-low-credit")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESC }], links: [{ rel: "canonical", href: "https://ctcequity.com/equity-based-loans-low-credit" }] }),
  component: Page,
});

function Page() {
  return <SpecialtyPage
    eyebrow="Equity-driven financing"
    title="Have Equity but Bad Credit? You May Still Have Refinance Options."
    description={DESC}
    intro="Lower credit does not necessarily mean no options. Your credit score is part of the story—not the whole story. For borrowers with meaningful property equity, CTC Equity can compare Non-QM, private, equity-based and other eligible structures where the complete scenario matters."
    bullets={[
      "Eligible refinance options may be available for credit scores as low as 500 with sufficient equity and a qualifying scenario",
      "Some equity-focused programs can consider recent mortgage lates or credit events that conventional programs may not accept",
      "Possible first-lien, second-lien or business-purpose structures depending on occupancy, purpose and lender",
      "For stronger qualifying profiles, higher-LTV options may be available depending on program, property, occupancy and complete credit profile",
      "Alternative-income options can include bank statements, P&L, 1099 and other Non-QM documentation methods where eligible",
      "No promise of approval: credit, equity, documentation, occupancy and program requirements vary by lender"
    ]}
    who="Borrowers with substantial property equity whose score, mortgage history, income documentation, recent credit events or debt profile may not fit conventional lending."
    uses="Potential uses include eligible refinance, debt consolidation, property investment, business-purpose financing and other permitted needs. The correct structure depends on occupancy and loan purpose."
    faq={[
      { q: "Can I refinance with a credit score around 500 if I have equity?", a: "Potentially. CTC Equity has access to eligible equity-focused programs that can consider scores as low as 500 in certain scenarios, but approval depends on equity, property, occupancy, documentation and lender requirements." },
      { q: "Can I refinance after mortgage lates?", a: "Some Non-QM and equity-focused lenders may consider recent mortgage lates that do not fit conventional guidelines. The number, timing and severity of lates matter." },
      { q: "Can I get more leverage with a 600+ credit score?", a: "Depending on the complete credit profile, occupancy, property and program, higher-LTV options may be available. A score alone does not determine maximum leverage." },
      { q: "Will I have to refinance my first mortgage?", a: "Not necessarily. Where eligible, a second-lien option may preserve the existing first mortgage; in other cases a refinance may be the better or only structure." },
      { q: "Can self-employed or 1099 borrowers use alternative income documentation?", a: "Yes, eligible Non-QM programs may use bank statements, profit-and-loss statements, 1099 income or other alternative documentation. Program rules vary." }
    ]}
    related={[
      { to: "/heloc", label: "HELOC" },
      { to: "/fixed-second-mortgage", label: "Fixed Second" },
      { to: "/bank-statement-loans", label: "Bank Statement" },
      { to: "/pnl-loans", label: "P&L Loans" },
      { to: "/get-my-options", label: "Get My Options" }
    ]}
  />;
}