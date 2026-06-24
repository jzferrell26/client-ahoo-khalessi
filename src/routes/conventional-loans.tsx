import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section } from "@/components/site/Prose";

const TITLE = "Conventional Loans | Conforming & Jumbo Mortgages | CTC Equity";
const DESC =
  "Conventional and jumbo mortgages for primary homes, second homes, and investment properties. CTC Equity compares conventional options across 160+ lenders.";

export const Route = createFileRoute("/conventional-loans")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/conventional-loans" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="Conventional Loans"
      h1="Conventional loans: conforming and jumbo options"
      lede={
        <>
          <b>Conventional loans</b> are mortgages that follow guidelines set by Fannie Mae and
          Freddie Mac (conforming) or that exceed those limits as <b>jumbo</b> loans. We compare
          them across 160+ lenders so you get the right structure for your scenario.
        </>
      }
      chips={[
        { num: "3%+", label: "Typical down payment options" },
        { num: "Jumbo", label: "Above conforming limits" },
        { num: "Primary / 2nd / Investment", label: "Use cases" },
      ]}
      serviceName="Conventional Loan"
      serviceDescription="Conforming and jumbo conventional mortgages for primary homes, second homes, and investment properties."
      body={
        <>
          <Section title="Conforming vs. jumbo">
            Conforming loans fit Fannie Mae and Freddie Mac limits. Jumbo loans exceed those limits
            and typically carry their own underwriting and reserve requirements.
          </Section>
          <Section title="When conventional is the right fit">
            Strong credit, documented income, and standard property types often qualify for
            conventional pricing better than government programs.
          </Section>
          <Section title="Why CTC Equity">
            We're an EMC Conventional Specialist — we shop your conventional or jumbo file across
            160+ lenders to find the most competitive total cost.
          </Section>
        </>
      }
      faq={[
        { q: "What credit score do I need for a conventional loan?", a: "Conventional programs generally favor higher credit scores; the exact minimum depends on the loan type and down payment." },
        { q: "What is a jumbo loan?", a: "A conventional loan that exceeds the local Fannie Mae / Freddie Mac conforming loan limit." },
        { q: "Can I use a conventional loan for investment property?", a: "Yes — and if income documentation is the constraint, ask about DSCR." },
      ]}
      related={[
        { to: "/fha-loans", label: "FHA Loans" },
        { to: "/va-loans", label: "VA Loans" },
        { to: "/dscr-loans", label: "DSCR Loans" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}