import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section } from "@/components/site/Prose";

const TITLE = "Reverse Mortgages | Turn Home Equity Into Income in Retirement | CTC Equity";
const DESC =
  "A reverse mortgage lets eligible homeowners (typically 62+) convert home equity into cash with no required monthly mortgage payment. Compare options with CTC Equity.";

export const Route = createFileRoute("/reverse-mortgages")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/reverse-mortgages" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="Reverse Mortgages"
      h1="Reverse mortgages: turn home equity into income in retirement"
      lede={
        <>
          A <b>reverse mortgage</b> lets eligible homeowners (generally age 62+) convert part of
          their home equity into cash — as a lump sum, monthly payments, or a line of credit —
          with <b>no required monthly mortgage payment</b>. You keep title to your home.
        </>
      }
      chips={[
        { num: "62+", label: "Typical eligibility" },
        { num: "$0", label: "Required monthly payment" },
        { num: "Keep", label: "Title to your home" },
      ]}
      serviceName="Reverse Mortgage"
      serviceDescription="Reverse mortgages for eligible homeowners (generally 62+) — convert equity into income with no required monthly mortgage payment."
      body={
        <>
          <Section title="How does a reverse mortgage work?">
            Instead of you paying the lender each month, the lender pays you from your equity. The
            balance is repaid when you sell, move out, or pass away — typically from the home's
            sale. You remain responsible for taxes, insurance, and upkeep.
          </Section>
          <Section title="Ways to receive the funds">
            Common options include a lump sum at closing, fixed monthly payments for added income,
            or a growing line of credit you draw as needed.
          </Section>
          <Section title="Is it right for you?">
            Reverse mortgages can ease cash flow in retirement, but they reduce the equity left to
            heirs and have specific costs and rules. We'll walk through whether it fits your goals
            and compare it to alternatives like a HELOC.
          </Section>
          <Section title="Why CTC Equity">
            We explain reverse mortgages plainly, with no pressure, and compare them honestly
            against other equity options so you can decide with full information.
          </Section>
        </>
      }
      faq={[
        { q: "Who qualifies for a reverse mortgage?", a: "Generally homeowners age 62 or older with significant equity in their primary residence. Specific requirements apply." },
        { q: "Do I still own my home?", a: "Yes. You keep title and can live there as long as it remains your primary residence and you meet the loan terms (taxes, insurance, upkeep)." },
        { q: "Do I make monthly payments?", a: "No monthly mortgage payment is required. The loan is repaid later, usually when the home is sold." },
        { q: "How do I receive the money?", a: "As a lump sum, monthly payments, a line of credit, or a combination." },
        { q: "How is it different from a HELOC?", a: "A HELOC requires monthly payments and is available at any qualifying age; a reverse mortgage requires no monthly payment and is for older homeowners. We compare both." },
      ]}
      related={[
        { to: "/heloc", label: "HELOC" },
        { to: "/fixed-second-mortgage", label: "Fixed Second" },
        { to: "/mortgage-analyzer", label: "Payment Estimator" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}