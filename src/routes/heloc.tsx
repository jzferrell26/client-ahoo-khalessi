import { createFileRoute } from "@tanstack/react-router";
import { LoanPage } from "@/components/site/LoanPage";
import { Section, Callout } from "@/components/site/Prose";

const TITLE = "HELOC | Access Your Equity Without Refinancing Your First Mortgage | CTC Equity";
const DESC =
  "A HELOC lets you borrow against home equity while keeping your low first-mortgage rate untouched. CTC Equity places HELOCs up to $400,000 with no appraisal and up to $4 million.";

export const Route = createFileRoute("/heloc")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/heloc" }],
  }),
  component: HelocPage,
});

function HelocPage() {
  return (
    <LoanPage
      crumb="HELOC"
      h1="HELOC: access your home equity without touching your first mortgage"
      lede={
        <>
          A <b>HELOC</b> (home equity line of credit) lets you borrow against your equity as a
          flexible line of credit while keeping your first mortgage — and its low rate — exactly
          where it is. At CTC Equity you can often access <b>up to $400,000 with no appraisal
          required</b>, and we place HELOCs <b>up to $4 million</b>.
        </>
      }
      chips={[
        { num: "$400K", label: "No appraisal required" },
        { num: "$4M", label: "Maximum line — rare anywhere" },
        { num: "0", label: "Changes to your first mortgage" },
      ]}
      serviceName="HELOC"
      serviceDescription="Home equity line of credit that lets borrowers access equity without refinancing their first mortgage. Up to $400,000 with no appraisal required; HELOCs placed up to $4 million."
      body={
        <>
          <Section title="Can I get a HELOC without refinancing my first mortgage?">
            Yes. A HELOC is a second lien that sits behind your existing first mortgage, so your
            current rate and balance are untouched. If you locked a low first-mortgage rate, this is
            almost always smarter than a cash-out refinance that would replace it at today's rates.
          </Section>
          <Section title="How a HELOC works">
            A HELOC gives you a revolving credit line based on your available equity. You draw what
            you need during the draw period and pay interest only on what you use, then repay over
            time.
            <Callout>
              <b>Two standouts at CTC Equity:</b> up to <b>$400,000 with no appraisal required</b>{" "}
              (faster, lower cost, less hassle), and for larger needs, HELOCs <b>up to $4 million</b>{" "}
              — a size most lenders will not place.
            </Callout>
          </Section>
          <Section title="HELOC vs. fixed second mortgage">
            A HELOC is a flexible, revolving line you draw from as needed, usually at a variable rate
            — good for ongoing or uncertain expenses. A <b>fixed second mortgage</b> gives you a
            one-time lump sum at a fixed rate and payment — good for a known, one-time need. Both
            keep your first mortgage in place.
          </Section>
          <Section title="How much can you borrow?">
            Most programs allow a combined loan-to-value of roughly 80–90% across your first
            mortgage and the new line, depending on credit and the lender. With access to 160+
            lenders, we match your scenario to the program that allows the most — and check whether
            you qualify for the no-appraisal lane up to $400,000.
          </Section>
          <Section title="Why borrowers use CTC Equity">
            We specialize in equity lending and keep your low first-mortgage rate intact. Nationwide
            and local, with 160+ lenders, we routinely place HELOCs other brokers turn away —
            including larger lines up to $4 million.
          </Section>
        </>
      }
      faq={[
        { q: "Can I get a HELOC without refinancing my first mortgage?", a: "Yes. A HELOC sits behind your first mortgage as a second lien, so your first mortgage rate and balance stay exactly the same." },
        { q: "Is an appraisal required for a HELOC?", a: "Not always. CTC Equity can often provide up to <b>$400,000 with no appraisal required</b>, which is faster and lower cost. Larger amounts may require a valuation." },
        { q: "How large a HELOC can I get?", a: "We place HELOCs up to <b>$4 million</b> — a size rarely available elsewhere — subject to equity, credit, and lender guidelines." },
        { q: "How much equity do I need?", a: "Generally enough to keep your combined loan-to-value around 80–90%. The exact maximum depends on the lender and your credit profile." },
        { q: "Can I use a HELOC for business or investment purposes?", a: "Often yes. Many borrowers use a HELOC for a business need, an investment, or a down payment on another property, depending on structure and property type." },
        { q: "HELOC or fixed second — which is better?", a: "A HELOC suits ongoing or flexible needs; a fixed second suits a one-time lump sum at a fixed payment. We help you choose based on how you'll use the funds." },
        { q: "How fast can a HELOC close?", a: "No-appraisal lines move quickly — often in a couple of weeks. Timing depends on the lender and your documentation." },
      ]}
      related={[
        { to: "/fixed-second-mortgage", label: "Fixed Second Mortgage" },
        { to: "/dscr-loans", label: "DSCR Loans" },
        { to: "/mortgage-analyzer", label: "Mortgage Analyzer" },
        { to: "/faq", label: "All FAQs" },
      ]}
    />
  );
}
