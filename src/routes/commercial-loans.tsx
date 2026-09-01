import { createFileRoute, Link } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section } from "@/components/site/Prose";

const TITLE = "Commercial Real Estate Loans | CTC Equity";
const DESC =
  "Nationwide commercial real estate and business-purpose financing for purchases, refinances, cash-out, multifamily, mixed-use and specialized properties through CTC Equity's lender network.";

export const Route = createFileRoute("/commercial-loans")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/commercial-loans" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="Commercial Real Estate Loans"
      h1="Commercial real estate loans"
      lede={
        <>
          <b>Commercial financing that goes beyond traditional guidelines. More ways to structure the deal.</b> CTC Equity works with borrowers and real-estate
          investors nationwide on eligible commercial, investment-property and business-purpose
          financing. Purchase. Refinance. Cash out. Grow.
        </>
      }
      chips={[
        { num: "160+", label: "Lenders accessed" },
        { num: "Many", label: "Property types" },
        { num: "Nationwide", label: "Investor coverage" },
      ]}
      serviceName="Commercial Real Estate Loan"
      serviceDescription="Nationwide commercial real estate and business-purpose financing for multifamily, mixed-use, office, retail, industrial and specialized properties, subject to lender and program availability."
      body={
        <>
          <Section title="Bank said no? Your deal may still work.">
            We look beyond a one-size-fits-all lending box. When a traditional lender's guidelines do
            not fit the transaction, CTC Equity can review other capital sources and structures from
            a broad lender network. Depending on the deal, options may include purchases, refinances,
            substantial cash-out, bridge or business-purpose financing, cross-collateralization when
            it makes sense, financing without cross-collateralization when an eligible program allows,
            and alternative reserve structures.
          </Section>
          <Section title="Nationwide commercial & investment property financing">
            Eligible commercial, DSCR, investment-property, bridge, hard-money and business-purpose
            transactions are available nationwide through participating lenders, subject to property,
            borrower, lender and program requirements. Residential consumer lending remains subject
            to applicable state licensing.
          </Section>
          <Section title="Need cash out of a commercial property?">
            Put your equity back to work. Cash-out commercial financing may provide capital for
            business investment, property improvements, acquisitions, working capital or other
            eligible purposes, depending on the transaction and lender.
          </Section>
          <Section title="A property that doesn't fit the typical box?">
            Mixed-use, multifamily, commercial and specialized properties deserve more than a
            one-size-fits-all loan. We review the property, income, equity, business purpose and
            overall transaction to identify financing structures that may fit.
          </Section>
          <Section title="Need more flexibility with reserves?">
            Some transactions may allow alternative reserve structures depending on the lender and
            overall deal. Ahoo Khalessi has structured a past 60-unit multifamily commercial
            refinance where eligible transaction proceeds were used to address the borrower's reserve
            requirement. Past transactions are examples only; current requirements vary by lender.
          </Section>
          <Section title="Have equity in another property?">
            Cross-collateralization may provide another way to structure an eligible commercial
            purchase or refinance. Ahoo has also structured commercial purchases using additional
            real-estate collateral when the subject property alone did not support the borrower's
            objective. Other eligible programs may work without cross-collateralization.
          </Section>
          <Section title="Mixed-use financing experience">
            Past transactions structured by Ahoo include financing for a vineyard/mixed-use property
            combining business and residential use. Properties with multiple uses can require a more
            specialized lender and underwriting approach.
          </Section>
          <Section title="More lenders. More structures. More ways to make the deal work.">
            CTC Equity's role is to understand the full scenario and search for a workable financing
            path rather than forcing every transaction into the same guidelines. Have a commercial
            deal that does not fit the traditional box? <Link to="/get-my-options">Bring us the scenario.</Link>
          </Section>
        </>
      }
      faq={[
        { q: "What types of commercial property can you finance?", a: "Multifamily, mixed-use, office, retail, industrial and specialized property types may be eligible for purchase, refinance or cash-out, subject to lender guidelines." },
        { q: "Can I get cash out on a commercial property?", a: "Cash-out options may be available depending on the asset, equity, borrower and lender requirements." },
        { q: "Do you offer commercial and investment-property financing nationwide?", a: "Yes. CTC Equity works with real-estate investors nationwide on eligible commercial, DSCR, investment-property, bridge, hard-money and business-purpose financing through participating lenders. Residential consumer lending is subject to applicable state licensing." },
        { q: "Do all commercial loans require cross-collateralization?", a: "No. Some transactions can be structured without additional collateral, while cross-collateralization can be useful for certain eligible purchases or refinances. The right structure depends on the transaction and lender." },
        { q: "Are there commercial loans with flexible reserve requirements?", a: "Some lenders and transaction structures may offer alternative ways to satisfy reserve requirements. We review the full scenario rather than assuming one reserve rule applies to every commercial loan." },
      ]}
      related={[
        { to: "/dscr-loans", label: "DSCR Loans" },
        { to: "/business-purpose-bridge-loans", label: "Business-Purpose Bridge Loans" },
        { to: "/multifamily-loans", label: "Multifamily Loans" },
        { to: "/mixed-use-property-loans", label: "Mixed-Use Property Loans" },
        { to: "/large-balance-commercial-loans", label: "Large-Balance Commercial" },
        { to: "/gas-station-loans", label: "Gas Station Loans" },
        { to: "/get-my-options", label: "Get My Options" },
      ]}
    />
  );
}
