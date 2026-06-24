import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section, Callout } from "@/components/site/Prose";

const TITLE = "Fixed Second Mortgage | Lump Sum at a Fixed Rate, First Mortgage Untouched | CTC Equity";
const DESC =
  "A fixed second mortgage gives you a one-time lump sum at a fixed rate and payment, leaving your first mortgage in place. Up to $400,000 with no appraisal, up to $4 million.";

export const Route = createFileRoute("/fixed-second-mortgage")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/fixed-second-mortgage" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="Fixed Second Mortgage"
      h1="Fixed second mortgage: a lump sum at a fixed rate, first mortgage untouched"
      lede={
        <>
          A <b>fixed second mortgage</b> gives you a one-time lump sum at a fixed interest rate and
          a predictable monthly payment — while your first mortgage and its low rate stay in place.
          CTC Equity offers <b>up to $400,000 with no appraisal required</b> and fixed seconds{" "}
          <b>up to $4 million</b>.
        </>
      }
      chips={[
        { num: "$400K", label: "No appraisal required" },
        { num: "$4M", label: "Maximum — rare anywhere" },
        { num: "Fixed", label: "Rate & payment" },
      ]}
      serviceName="Fixed Second Mortgage"
      serviceDescription="Fixed-rate lump-sum second mortgage that leaves the first mortgage untouched. Up to $400,000 with no appraisal required; placed up to $4 million."
      body={
        <>
          <Section title="What is a fixed second mortgage?">
            It is a second lien behind your first mortgage that pays you a single lump sum at
            closing, repaid at a fixed rate over a set term. Because it sits behind your first
            mortgage, your existing first-mortgage rate is never touched.
            <Callout>
              <b>Why people choose it over a cash-out refinance:</b> if your first mortgage is at a
              low rate, refinancing would replace it at today's higher rate. A fixed second leaves
              that rate alone and only adds a second, predictable payment.
            </Callout>
          </Section>
          <Section title="Fixed second vs. HELOC">
            A fixed second is a lump sum at a fixed rate and payment — best when you know the
            amount you need (debt consolidation, renovation, a specific purchase). A HELOC is a
            revolving line at a usually variable rate — best for flexible or ongoing needs.
          </Section>
          <Section title="How much can you get?">
            Up to a combined loan-to-value of roughly 80–90% in most cases. CTC Equity can often
            fund up to <b>$400,000 with no appraisal required</b>, and place fixed seconds up to{" "}
            <b>$4 million</b> for larger needs.
          </Section>
          <Section title="Why CTC Equity for fixed seconds">
            Ahoo Khalessi started the home equity department at Rocket Mortgage and made home equity
            her specialty in wholesale. With 160+ lenders, nationwide and local, CTC Equity places
            fixed seconds — including large and complex ones — that most brokers can't.
          </Section>
        </>
      }
      faq={[
        { q: "What is a fixed second mortgage?", a: "A second lien behind your first mortgage that gives you a lump sum at a fixed rate and payment, leaving your first mortgage untouched." },
        { q: "How is a fixed second different from a HELOC?", a: "A fixed second is a one-time lump sum at a fixed rate; a HELOC is a revolving line you draw from, usually at a variable rate. Both sit behind your first mortgage." },
        { q: "Do I need an appraisal?", a: "Often no — CTC Equity can provide up to <b>$400,000 with no appraisal required</b>. Larger amounts may need a valuation." },
        { q: "How much can I borrow with a fixed second?", a: "Up to <b>$4 million</b>, subject to equity, credit, and lender guidelines — a size rarely available elsewhere." },
        { q: "Will it change my first mortgage rate?", a: "No. A fixed second is separate from your first mortgage, so your existing rate and balance stay the same." },
        { q: "What can I use the funds for?", a: "Common uses include debt consolidation, home improvement, investment, or a down payment on another property." },
      ]}
      related={[
        { to: "/heloc", label: "HELOC" },
        { to: "/dscr-loans", label: "DSCR Loans" },
        { to: "/mortgage-analyzer", label: "Mortgage Analyzer" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}