import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section } from "@/components/site/Prose";

const TITLE = "Commercial Real Estate Loans | CTC Equity";
const DESC =
  "CTC Equity arranges commercial real estate and business-purpose financing — multifamily, mixed-use, office, retail, industrial — with access to 160+ lenders.";

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
          CTC Equity arranges <b>commercial real estate and business-purpose financing</b> — for
          multifamily, mixed-use, office, retail, industrial, and specialized properties — with
          access to 160+ lenders to find terms that fit the deal.
        </>
      }
      chips={[
        { num: "160+", label: "Lenders accessed" },
        { num: "Many", label: "Property types" },
        { num: "Nationwide", label: "Coverage" },
      ]}
      serviceName="Commercial Real Estate Loan"
      serviceDescription="Commercial real estate and business-purpose financing for multifamily, mixed-use, office, retail, and industrial properties."
      body={
        <>
          <Section title="What commercial properties can you finance?">
            Multifamily (5+ units), mixed-use, office, retail, industrial, and a range of
            specialized property types — for purchase, refinance, or cash-out, depending on the
            asset and the lender.
          </Section>
          <Section title="How commercial underwriting differs">
            Commercial financing weighs the property's income and the deal's fundamentals more than
            a single personal-income figure. Structure, terms, and timelines vary widely by lender
            and asset type — which is exactly where access to 160+ lenders pays off.
          </Section>
          <Section title="Why CTC Equity">
            We match each commercial scenario to the right capital source and keep the process
            moving, nationwide and local.
          </Section>
        </>
      }
      faq={[
        { q: "What types of commercial property can you finance?", a: "Multifamily, mixed-use, office, retail, industrial, and specialized property types, subject to lender guidelines." },
        { q: "Can I get cash out on a commercial property?", a: "Often yes, depending on the asset, equity, and lender. We'll review your scenario." },
        { q: "Do you work with investors nationwide?", a: "Yes. CTC Equity is nationwide and local, with access to 160+ lenders." },
      ]}
      related={[
        { to: "/dscr-loans", label: "DSCR Loans" },
        { to: "/heloc", label: "HELOC" },
        { to: "/", label: "Get My Options" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}