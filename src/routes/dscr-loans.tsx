import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section, Callout } from "@/components/site/Prose";

const TITLE = "DSCR Loans | Buy Investment Property With No Income Documentation | CTC Equity";
const DESC =
  "DSCR loans let you purchase or refinance investment property with no income docs — no tax returns, W-2s, or pay stubs. Qualify on the property's rental income. 160+ lenders.";

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
          A <b>DSCR loan</b> lets you <b>purchase or refinance an investment property with no
          income documentation at all</b> — no tax returns, no W-2s, no pay stubs. It qualifies on
          the property's rental income instead of yours, so you can keep buying even if you already
          own several.
        </>
      }
      chips={[
        { num: "$0", label: "Income docs to purchase" },
        { num: "Rent", label: "Qualifies the loan" },
        { num: "Multiple", label: "Properties OK" },
      ]}
      serviceName="DSCR Loan"
      serviceDescription="Investment property purchase or refinance loan qualified on rental income with no income documentation — no tax returns, W-2s, or pay stubs."
      body={
        <>
          <Section title="Can I buy an investment property without tax returns?">
            Yes — with a DSCR loan. Qualification is based on whether the property's rent covers the
            loan payment, not on your personal income. That means no tax returns, no W-2s, no pay
            stubs, and no employment verification.
          </Section>
          <Section title="How DSCR qualification works">
            DSCR stands for Debt Service Coverage Ratio: the property's rental income divided by its
            total loan payment. A ratio of 1.0 means rent exactly covers the payment; higher is
            stronger. Many programs allow ratios at or even below 1.0 with the right structure.
            <Callout>
              <b>The point:</b> the property qualifies itself. Your job, tax returns, and
              debt-to-income don't gate the loan the way they do on a conventional mortgage.
            </Callout>
          </Section>
          <Section title="Who DSCR loans are for">
            Real estate investors who want to scale without income-documentation hurdles,
            self-employed buyers whose tax returns understate their income, and anyone purchasing
            through an LLC. Works for long-term rentals and, with many lenders, short-term rentals.
          </Section>
          <Section title="Why CTC Equity for DSCR">
            DSCR is a core specialty. With 160+ lenders, nationwide and local, we match each
            property to the lender with the best terms — and structure deals for investors who
            already own multiple properties.
          </Section>
        </>
      }
      faq={[
        { q: "What is a DSCR loan?", a: "An investment-property loan that qualifies on the property's rental income (its debt service coverage ratio) rather than your personal income." },
        { q: "Can I buy an investment property without tax returns?", a: "Yes. A DSCR loan requires <b>no income documentation</b> — no tax returns, W-2s, or pay stubs — for purchase or refinance." },
        { q: "What DSCR ratio do I need?", a: "Often around 1.0 (rent covers the payment), though many programs allow lower with the right down payment or structure." },
        { q: "How many properties can I finance?", a: "There's typically no cap tied to your personal income, so DSCR is how many investors keep buying past the limits of conventional financing." },
        { q: "Can a first-time investor use a DSCR loan?", a: "Often yes, depending on the lender and down payment. We'll match you to a program that fits." },
        { q: "Can I close in an LLC?", a: "Yes — DSCR loans are commonly closed in the name of an LLC, which many investors prefer." },
        { q: "Do short-term rentals qualify?", a: "With many lenders, yes — short-term rental income can be used. The right program depends on the property and market." },
      ]}
      related={[
        { to: "/heloc", label: "HELOC" },
        { to: "/fixed-second-mortgage", label: "Fixed Second Mortgage" },
        { to: "/mortgage-analyzer", label: "Mortgage Analyzer" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}