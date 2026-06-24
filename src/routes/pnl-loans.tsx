import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section } from "@/components/site/Prose";

const TITLE = "P&L Loans | Qualify on a Profit & Loss Statement | CTC Equity";
const DESC =
  "P&L loans let self-employed borrowers qualify using a profit & loss statement instead of tax returns. Purchase or refinance with CTC Equity, 160+ lenders nationwide.";

export const Route = createFileRoute("/pnl-loans")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/pnl-loans" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="P&L Loans"
      h1="P&L loans: qualify on a profit & loss statement"
      lede={
        <>
          A <b>P&L loan</b> lets you qualify for a mortgage using a <b>profit & loss statement</b>{" "}
          for your business instead of tax returns — another path for self-employed borrowers whose
          returns understate real income.
        </>
      }
      chips={[
        { num: "P&L", label: "Qualifies your income" },
        { num: "No", label: "Tax returns required" },
        { num: "Self-employed", label: "Built for owners" },
      ]}
      serviceName="P&L Loan"
      serviceDescription="Mortgage for self-employed borrowers qualified on a profit & loss statement instead of tax returns."
      body={
        <>
          <Section title="What is a P&L loan?">
            It's a mortgage that uses a profit & loss statement (often CPA-prepared) to document
            your business income, rather than tax returns. It suits established business owners
            with steady, demonstrable profit.
          </Section>
          <Section title="P&L loan vs. bank statement loan">
            A P&L loan relies on your profit & loss statement; a bank statement loan relies on your
            actual deposits. Some borrowers qualify more favorably one way than the other — we run
            both.
          </Section>
          <Section title="Who it's for">
            Self-employed borrowers and business owners, often with a CPA who can prepare or attest
            to the P&L. Works for purchase or refinance.
          </Section>
          <Section title="Why CTC Equity">
            We know which lenders accept P&L-only documentation and how to package the file for
            approval, across 160+ lenders nationwide.
          </Section>
        </>
      }
      faq={[
        { q: "What is a P&L loan?", a: "A mortgage that qualifies you using a profit & loss statement for your business instead of tax returns." },
        { q: "How is it different from a bank statement loan?", a: "A P&L loan uses your profit & loss statement; a bank statement loan uses your bank deposits. We compare both for you." },
        { q: "Do I need a CPA?", a: "Many P&L programs prefer a CPA-prepared or CPA-attested statement, though requirements vary by lender." },
        { q: "Can I use a P&L loan to buy or refinance?", a: "Yes, both purchase and refinance are available." },
      ]}
      related={[
        { to: "/bank-statement-loans", label: "Bank Statement Loans" },
        { to: "/dscr-loans", label: "DSCR Loans" },
        { to: "/heloc", label: "HELOC" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}