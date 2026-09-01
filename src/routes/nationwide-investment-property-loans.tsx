import { createFileRoute } from "@tanstack/react-router";
import { SpecialtyPage } from "@/components/site/SpecialtyPage";

const TITLE = "Nationwide Investment Property Loans | DSCR & Commercial Financing | CTC Equity";
const DESC = "Ahoo Khalessi and Ben Mokri work with real-estate investors nationwide on eligible DSCR, investment-property, commercial, bridge and business-purpose financing through CTC Equity's lender network.";

export const Route = createFileRoute("/nationwide-investment-property-loans")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESC }], links: [{ rel: "canonical", href: "https://ctcequity.com/nationwide-investment-property-loans" }] }),
  component: Page,
});

function Page() {
  return <SpecialtyPage
    eyebrow="Real-estate investor financing"
    title="Nationwide Investment Property Financing"
    description={DESC}
    intro="CTC Equity serves residential borrowers across licensed states. For eligible investment-property and business-purpose transactions, Ahoo Khalessi and Ben Mokri work with real-estate investors nationwide through CTC Equity's wholesale lender network, subject to lender, property and program availability."
    bullets={[
      "DSCR purchase, refinance and cash-out financing",
      "No-ratio and alternative DSCR structures for eligible scenarios",
      "Short-term rental and vacation-rental programs",
      "DSCR second-lien and investment-property equity solutions",
      "Commercial, multifamily, mixed-use, bridge and business-purpose financing",
      "Construction and fix-and-hold options for qualifying investor projects"
    ]}
    who="Real-estate investors looking to acquire, refinance, hold, reposition, build or access equity from investment and commercial properties across the United States."
    uses="Eligible transactions can include rental-property purchases, portfolio growth, cash-out for the next acquisition, renovations, construction, business-purpose capital and other lender-permitted investment uses."
    faq={[
      { q: "Does CTC Equity offer investment-property financing nationwide?", a: "Yes. CTC Equity works with real-estate investors nationwide on eligible DSCR, commercial, investment-property, bridge and business-purpose transactions through participating lenders." },
      { q: "Does nationwide investor financing mean every loan officer is residentially licensed in all 50 states?", a: "No. Residential consumer lending is subject to individual and company licensing requirements. Nationwide availability described here applies to eligible investment-property, commercial and business-purpose programs through participating lenders." },
      { q: "Can I use DSCR financing if I own multiple properties?", a: "Often yes. DSCR is commonly used by investors with multiple properties because qualification focuses on the investment property and program requirements rather than conventional personal-income limits." },
      { q: "Can I access equity without selling an investment property?", a: "Potentially. Eligible cash-out, second-lien, bridge or other investment-property structures may allow an investor to keep the property and put equity toward another opportunity." }
    ]}
    related={[
      { to: "/dscr-loans", label: "DSCR Loans" },
      { to: "/commercial-loans", label: "Commercial Loans" },
      { to: "/business-purpose-bridge-loans", label: "Bridge & Business Purpose" },
      { to: "/multifamily-loans", label: "Multifamily" },
      { to: "/fix-and-hold-loans", label: "Fix-and-Hold" },
      { to: "/get-my-options", label: "Get My Options" }
    ]}
  />;
}