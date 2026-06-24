import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section, Callout } from "@/components/site/Prose";

const TITLE = "Bank Statement Loans | Mortgages for Self-Employed Borrowers | CTC Equity";
const DESC =
  "Bank statement loans let self-employed borrowers qualify on 12–24 months of deposits instead of tax returns. Purchase or refinance with CTC Equity, 160+ lenders nationwide.";

export const Route = createFileRoute("/bank-statement-loans")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/bank-statement-loans" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="Bank Statement Loans"
      h1="Bank statement loans for self-employed borrowers"
      lede={
        <>
          A <b>bank statement loan</b> lets self-employed borrowers qualify using{" "}
          <b>12–24 months of bank deposits</b> instead of tax returns. It's built for business
          owners whose write-offs make their taxable income look lower than their real cash flow.
        </>
      }
      chips={[
        { num: "12–24 mo", label: "Bank statements used" },
        { num: "No", label: "Tax returns required" },
        { num: "Buy or refi", label: "Both available" },
      ]}
      serviceName="Bank Statement Loan"
      serviceDescription="Mortgage for self-employed borrowers qualified on 12–24 months of bank statement deposits instead of tax returns."
      body={
        <>
          <Section title="Can I qualify for a mortgage using bank statements instead of tax returns?">
            Yes. Instead of tax returns, the lender averages your deposits over 12–24 months to
            establish income. This counts the real money flowing through your business, not the
            reduced figure left after write-offs.
          </Section>
          <Section title="Who bank statement loans are for">
            Self-employed borrowers, business owners, 1099 earners, and gig workers whose tax
            returns understate income. Works for a primary home, second home, or investment property.
            <Callout>
              <b>Related:</b> if tax returns are the issue on an investment property, a{" "}
              <b>DSCR loan</b> may let you skip income docs entirely. We'll compare both.
            </Callout>
          </Section>
          <Section title="What you'll typically need">
            Generally 12 or 24 months of personal or business bank statements, proof of
            self-employment, and standard asset and credit documentation. Requirements vary by
            lender — with 160+ lenders, we match you to the most flexible fit.
          </Section>
          <Section title="Why CTC Equity">
            Self-employed financing is a core specialty. We know which lenders treat deposits most
            favorably and how to structure the file so your true income is recognized.
          </Section>
        </>
      }
      faq={[
        { q: "Can I use bank statements instead of tax returns?", a: "Yes. A bank statement loan qualifies you on 12–24 months of deposits rather than tax returns." },
        { q: "How many months of statements do I need?", a: "Usually 12 or 24 months of personal or business bank statements, depending on the program." },
        { q: "Can I buy a primary home with a bank statement loan?", a: "Yes — primary homes, second homes, and investment properties are all possible." },
        { q: "What is a P&L loan?", a: "A related option that qualifies you using a profit & loss statement for your business. See our P&L loans page." },
        { q: "Will my credit score matter?", a: "Yes, credit still matters, but you don't need tax returns to document income. We serve a wide credit range across 160+ lenders." },
      ]}
      related={[
        { to: "/pnl-loans", label: "P&L Loans" },
        { to: "/dscr-loans", label: "DSCR Loans" },
        { to: "/heloc", label: "HELOC" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}