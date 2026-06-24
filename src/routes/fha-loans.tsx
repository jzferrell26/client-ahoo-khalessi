import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section } from "@/components/site/Prose";

const TITLE = "FHA Loans | Low Down Payment Mortgages for Primary Homes | CTC Equity";
const DESC =
  "FHA loans offer low down payment and flexible credit options for first-time and primary-home buyers. Compare across 160+ lenders with CTC Equity.";

export const Route = createFileRoute("/fha-loans")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/fha-loans" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="FHA Loans"
      h1="FHA loans: low down payment options for primary-home buyers"
      lede={
        <>
          <b>FHA loans</b> are government-insured mortgages designed to make homeownership reachable
          with a lower down payment and more flexible credit requirements than conventional loans —
          a good fit for many first-time and primary-home buyers.
        </>
      }
      chips={[
        { num: "3.5%", label: "Typical minimum down payment" },
        { num: "Flexible", label: "Credit guidelines" },
        { num: "Primary", label: "Owner-occupied homes" },
      ]}
      serviceName="FHA Loan"
      serviceDescription="FHA-insured mortgage with low down payment and flexible credit guidelines for owner-occupied homes."
      body={
        <>
          <Section title="What is an FHA loan?">
            A mortgage insured by the Federal Housing Administration. Lender risk is reduced by FHA
            insurance, which is why down payment and credit requirements can be more flexible than
            conventional loans.
          </Section>
          <Section title="Who FHA loans are for">
            Buyers who want a lower down payment or have a credit profile that doesn't fit
            conventional guidelines. The home must be owner-occupied.
          </Section>
          <Section title="Why CTC Equity">
            We shop your FHA scenario across 160+ lenders to find the best combination of rate,
            fees, and qualifying flexibility.
          </Section>
        </>
      }
      faq={[
        { q: "What credit score do I need for an FHA loan?", a: "FHA programs accept a wide credit range. The exact minimum depends on the lender and the down payment you bring." },
        { q: "Can I use an FHA loan for an investment property?", a: "No — FHA loans require the home to be your primary residence." },
        { q: "Does FHA require mortgage insurance?", a: "Yes. FHA loans carry upfront and annual mortgage insurance premiums; we'll compare the total cost against conventional options." },
      ]}
      related={[
        { to: "/va-loans", label: "VA Loans" },
        { to: "/conventional-loans", label: "Conventional Loans" },
        { to: "/mortgage-analyzer", label: "Mortgage Analyzer" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}