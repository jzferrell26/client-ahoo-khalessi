import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section } from "@/components/site/Prose";

const TITLE = "VA Loans | Mortgages for Veterans, Service Members & Eligible Spouses | CTC Equity";
const DESC =
  "VA loans give eligible veterans, active-duty service members, and spouses access to mortgages with no down payment and no mortgage insurance. CTC Equity is a VA Specialist.";

export const Route = createFileRoute("/va-loans")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/va-loans" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LoanPage
      crumb="VA Loans"
      h1="VA loans: zero-down mortgages for those who served"
      lede={
        <>
          <b>VA loans</b> are mortgages guaranteed by the U.S. Department of Veterans Affairs for
          eligible veterans, active-duty service members, and certain surviving spouses — with{" "}
          <b>no down payment</b> and <b>no monthly mortgage insurance</b>.
        </>
      }
      chips={[
        { num: "$0", label: "Down payment required" },
        { num: "No PMI", label: "Monthly mortgage insurance" },
        { num: "Reusable", label: "VA entitlement" },
      ]}
      serviceName="VA Loan"
      serviceDescription="VA-guaranteed mortgage for eligible veterans, active-duty service members, and surviving spouses with no down payment and no mortgage insurance."
      body={
        <>
          <Section title="Who qualifies for a VA loan?">
            Eligible veterans, active-duty service members, National Guard and Reserve members
            meeting service requirements, and certain surviving spouses. Your Certificate of
            Eligibility (COE) confirms entitlement.
          </Section>
          <Section title="Why use a VA loan?">
            No down payment, no monthly mortgage insurance, competitive rates, and flexible
            qualifying — one of the strongest mortgage benefits available to those who served.
          </Section>
          <Section title="Why CTC Equity">
            As an EMC VA Specialist, Ahoo knows VA underwriting and timelines. We shop your
            scenario across our lender network to find the best total cost.
          </Section>
        </>
      }
      faq={[
        { q: "Do VA loans really require no down payment?", a: "Yes — full VA entitlement allows 100% financing up to the loan amount the lender supports." },
        { q: "Can I use a VA loan more than once?", a: "Yes. VA entitlement can be restored and reused, subject to VA rules." },
        { q: "Are there VA loan limits?", a: "With full entitlement, there is generally no VA loan limit; the lender's maximum still applies." },
      ]}
      related={[
        { to: "/fha-loans", label: "FHA Loans" },
        { to: "/conventional-loans", label: "Conventional Loans" },
        { to: "/mortgage-analyzer", label: "Mortgage Analyzer" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}