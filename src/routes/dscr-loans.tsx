import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section, Callout } from "@/components/site/Prose";

const TITLE = "DSCR Loans | Buy Investment Property With No Income Documentation | CTC Equity";
const DESC =
  "Nationwide DSCR financing for real estate investors: purchase, refinance, cash-out, no-ratio DSCR, short-term rentals, DSCR seconds and construction options through CTC Equity's lender network.";

export const Route = createFileRoute("/dscr-loans")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/dscr-loans" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="DSCR Loans"
      h1="DSCR loans: buy investment property with no income documentation"
      lede={
        <>
          <b>DSCR financing built for real estate investors who move fast.</b> Markets change. Your financing should be able to adjust with you. CTC Equity works with
          real-estate investors nationwide on eligible <b>DSCR purchases, refinances, cash-out,
          no-ratio DSCR, short-term rentals, DSCR seconds and construction financing</b> through a
          broad wholesale lender network.
        </>
      }
      chips={[
        { num: "Nationwide", label: "Investor financing" },
        { num: "No-Ratio", label: "Options available" },
        { num: "1st + 2nd", label: "DSCR structures" },
      ]}
      serviceName="DSCR Loan"
      serviceDescription="Nationwide investment-property financing including DSCR purchase, refinance, cash-out, no-ratio, short-term-rental, second-lien and construction options, subject to lender and program availability."
      body={
        <>
          <Section title="Real estate investors move fast. Their financing should too.">
            Investors change strategies as markets move. Whether you are buying the next property,
            holding instead of selling, refinancing, accessing equity, building a rental or protecting
            a favorable first-mortgage rate, we look for a DSCR structure that fits the investment plan.
          </Section>
          <Section title="Listed the property for sale and changed your mind?">
            Maybe the market changed, you decided to keep the property, or you want to access equity
            for the next opportunity instead of selling. Some DSCR cash-out programs may consider
            properties that were recently listed and then taken off the market without the lengthy
            seasoning periods required by many programs. Eligibility and waiting periods vary by lender.
          </Section>
          <Section title="Need DSCR cash-out but don't have a renter?">
            No current tenant does not automatically mean no DSCR options. Depending on the property
            and program, eligible lenders may use market-rent analysis or another permitted rental-income
            method instead of requiring an existing tenant or current lease.
          </Section>
          <Section title="Your DSCR ratio doesn't work? You may still have options.">
            A low debt-service-coverage ratio does not always end the transaction. CTC Equity has
            access to alternative DSCR structures, including eligible <b>No-Ratio DSCR</b> programs
            where qualification is not based on meeting a traditional minimum DSCR ratio.
            <Callout>
              <b>One property. More than one way to finance it.</b> Purchase. Cash out. Build. Hold.
              Reposition. Keep your first.
            </Callout>
          </Section>
          <Section title="Short-term rental DSCR">
            Airbnb, vacation-rental and other eligible short-term-rental properties may qualify through
            specialized DSCR programs. The permitted income method depends on the lender, property and
            market, so we match the scenario to a program designed for the way the property is operated.
          </Section>
          <Section title="DSCR second mortgage: keep the first rate you already have">
            Need equity but do not want to automatically refinance a favorable first mortgage? Eligible
            investors may have access to a <b>DSCR second mortgage or investment-property equity
            solution</b> that allows the existing first lien to remain in place. Availability, lien
            position and qualification vary by lender and property.
          </Section>
          <Section title="DSCR construction: turn land into the next investment property">
            Already own the land? Depending on the program, eligible land equity may contribute toward
            the investor's required investment while construction financing helps fund the build. We can
            help structure the construction phase and identify a path into longer-term DSCR financing
            after completion, subject to lender requirements.
          </Section>
          <Section title="How standard DSCR qualification works">
            Traditional DSCR programs generally compare the property's qualifying rental income with
            its required housing payment. They are designed for investment properties and can reduce
            reliance on traditional personal-income documentation. Exact documentation and ratio
            requirements vary by lender and program.
          </Section>
          <Section title="More lenders. More DSCR structures. More ways to keep your investment moving.">
            DSCR is a core CTC Equity specialty. We work with investors nationwide on eligible
            investment-property and business-purpose transactions and search across our lender network
            for the structure that fits the property and strategy. Residential consumer lending remains
            subject to applicable state licensing.
          </Section>
        </>
      }
      faq={[
        { q: "Can I get a DSCR cash-out refinance without a current tenant?", a: "Potentially. Some eligible programs may use market rent or another permitted rental-income method rather than requiring an existing tenant or lease. Requirements vary by lender." },
        { q: "Can I refinance with DSCR after listing my property for sale?", a: "Some DSCR programs may consider a property that was recently listed and then taken off the market. Listing and seasoning requirements vary by lender, so we review the timing and property before selecting a program." },
        { q: "What if my DSCR ratio is too low?", a: "You may still have options. Alternative structures, including eligible no-ratio DSCR programs, may be available when a traditional DSCR ratio does not work." },
        { q: "Can I get a DSCR second mortgage and keep my first loan?", a: "Eligible investors may have access to second-lien DSCR or investment-property equity solutions that leave the existing first mortgage in place. Program availability varies." },
        { q: "Do short-term rentals and Airbnb properties qualify for DSCR?", a: "They may. Specialized programs can consider eligible short-term and vacation rentals, with the permitted income method depending on the lender, property and market." },
        { q: "Can I use land equity for DSCR construction financing?", a: "Depending on the construction program, eligible land equity may contribute toward the required investment. The construction loan and transition to permanent DSCR financing are subject to lender and project requirements." },
        { q: "Do you offer DSCR loans nationwide?", a: "CTC Equity works with real-estate investors nationwide on eligible DSCR, investment-property and business-purpose financing through participating lenders. Residential consumer lending is subject to applicable state licensing." },
        { q: "Can I close a DSCR loan in an LLC?", a: "Many DSCR programs permit eligible investment-property transactions to close in an LLC. Entity and guarantor requirements vary by lender." },
      ]}
      related={[
        { to: "/commercial-loans", label: "Commercial Loans" },
        { to: "/fix-and-hold-loans", label: "Fix-and-Hold Loans" },
        { to: "/multifamily-loans", label: "Multifamily Loans" },
        { to: "/business-purpose-bridge-loans", label: "Business-Purpose Bridge Loans" },
        { to: "/heloc", label: "Home Equity Options" },
        { to: "/get-my-options", label: "Get My Options" },
      ]}
    />
  );
}
