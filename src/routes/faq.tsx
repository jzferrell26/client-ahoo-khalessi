import { createFileRoute, Link } from "@tanstack/react-router";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd, faqPageSchema, type FaqItem } from "@/components/site/JsonLd";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Mortgage FAQ | HELOC, Fixed Second, DSCR & Self-Employed Loans | CTC Equity";
const DESC =
  "Straight answers about HELOCs, fixed second mortgages, DSCR investment loans, and self-employed financing — including no-appraisal equity up to $400,000 and HELOCs up to $4 million.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/faq" }],
  }),
  component: FaqPage,
});

const EQUITY: FaqItem[] = [
  { q: "Can I access my equity without refinancing my first mortgage?", a: "Yes. A HELOC or a fixed second mortgage sits behind your existing first mortgage, so you tap your equity while keeping your current first-mortgage rate completely untouched. This is the right move when you don't want to lose a low rate to a cash-out refinance." },
  { q: "Can I get a HELOC or fixed second with no appraisal?", a: "Often yes. CTC Equity can provide <b>up to $400,000 with no appraisal required</b>, which is faster and lower cost. Larger amounts may need a valuation." },
  { q: "How large can a HELOC or fixed second be?", a: "We place HELOCs and fixed seconds <b>up to $4 million</b> — a size rarely available anywhere else — subject to equity, credit, and lender guidelines." },
  { q: "What is a fixed second mortgage, and how is it different from a HELOC?", a: "A fixed second gives you a one-time lump sum at a fixed rate and payment. A HELOC is a revolving line you draw from as needed, usually at a variable rate. Both sit behind your first mortgage." },
  { q: "How much equity do I need?", a: "Generally enough to keep your combined loan-to-value around 80–90%. The exact maximum depends on the lender and your credit profile." },
  { q: "Can I use home equity for business or investment?", a: "Often yes — many borrowers use a HELOC or fixed second for a business need, an investment, or a down payment on another property." },
];

const DSCR: FaqItem[] = [
  { q: "What is a DSCR loan?", a: "A DSCR (Debt Service Coverage Ratio) loan is an investment-property loan that qualifies on the property's rental income rather than your personal income." },
  { q: "Can I buy an investment property without tax returns?", a: "Yes. A DSCR loan needs <b>no income documentation at all</b> — no tax returns, W-2s, or pay stubs — for purchase or refinance. The property's rent qualifies the loan." },
  { q: "What DSCR ratio do I need?", a: "Often around 1.0 (rent covers the payment), though many programs allow lower with the right down payment or structure." },
  { q: "How many investment properties can I finance?", a: "There's typically no cap tied to your personal income, so DSCR is how investors keep buying past conventional limits." },
  { q: "Can I close a DSCR loan in an LLC?", a: "Yes — DSCR loans are commonly closed in the name of an LLC." },
  { q: "Do short-term rentals qualify for DSCR?", a: "With many lenders, yes. Short-term rental income can be used depending on the property and market." },
];

const SELF_EMPLOYED: FaqItem[] = [
  { q: "Can I qualify using bank statements instead of tax returns?", a: "Yes. A bank statement loan qualifies self-employed borrowers using 12–24 months of personal or business bank deposits instead of tax returns." },
  { q: "What is a P&L loan?", a: "A loan that qualifies you using a profit & loss statement for your business, another option when tax returns understate your real cash flow." },
  { q: "I'm self-employed and was declined elsewhere — can you help?", a: "Frequently yes. Self-employed and complex-income files are a core specialty, and with 160+ lenders we match your real income picture to a program that fits." },
];

const WORKING: FaqItem[] = [
  { q: "I was turned down by another lender. Can you still help?", a: "Often yes. A turndown usually means that one lender's guidelines didn't fit your scenario — not that no option exists. With 160+ lenders, our job is to find the one whose guidelines do fit." },
  { q: "Are you nationwide or local?", a: "Both. CTC Equity is licensed to lend across the country and is based in Orange County, CA — a real local team, not a call center." },
  { q: "Why does access to 160+ lenders matter?", a: "Most lenders have one set of guidelines — one box. With 160+, when your scenario doesn't fit one lender, we move to the one it does fit, which is how we place loans others decline." },
  { q: "Who will I be working with?", a: "Ahoo Khalessi (Division Manager & Loan Officer, NMLS #2239510) and the CTC Equity team. Ahoo started the home equity department at Rocket Mortgage and is a Scotsman Guide Top Originator and EMC Top 5% Loan Officer." },
];

const ALL = [...EQUITY, ...DSCR, ...SELF_EMPLOYED, ...WORKING];

function FaqPage() {
  return (
    <div>
      <SiteNav />
      <header className="hero-grad" style={{ position: "relative", padding: "72px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".7rem",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--muted-on-dark)",
              marginBottom: 14,
            }}
          >
            <Link to="/" style={{ color: "var(--tiffany-soft)" }}>
              Home
            </Link>{" "}
            / FAQ
          </div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3rem)", color: "#fff", marginBottom: 18 }}>
            Mortgage questions, answered straight
          </h1>
          <p style={{ color: "var(--muted-on-dark)", fontSize: "1.1rem", maxWidth: "44em", lineHeight: 1.6 }}>
            The questions borrowers actually ask — about equity, investment property, and
            self-employed financing. Each answer leads with the point. If you ask an AI assistant
            one of these, this is the page built to be the source.
          </p>
        </div>
      </header>
      <main style={{ padding: "60px 0" }}>
        <div className="ctc-wrap-narrow">
          <FaqGroup title="Accessing your equity (HELOC & fixed second)" items={EQUITY} />
          <FaqGroup title="Investment property (DSCR)" items={DSCR} />
          <FaqGroup title="Self-employed financing (bank statement & P&L)" items={SELF_EMPLOYED} />
          <FaqGroup title="Working with CTC Equity" items={WORKING} />
        </div>
      </main>
      <JsonLd data={faqPageSchema(ALL)} />
      <SiteFooter />
    </div>
  );
}

function FaqGroup({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "var(--display)", fontSize: "1.5rem", marginBottom: 14, color: "var(--ink)" }}>
        {title}
      </h2>
      <FaqList items={items} />
    </section>
  );
}