import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd, faqPageSchema, type FaqItem } from "@/components/site/JsonLd";
import { LeadForm } from "@/components/site/LeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav, APPLY_NOW_AHOO } from "@/components/site/SiteNav";

const PAGE_TITLE =
  "CTC Equity | HELOC, Fixed Second, DSCR & Self-Employed Mortgage Specialists";
const PAGE_DESC =
  "Access to 160+ lenders for HELOCs, fixed second mortgages, DSCR investment loans, and bank statement loans. We find solutions others miss — often after another lender said no.";

const EMC_SITE = "https://www.emortgagecapital.com";
const EMC_PROFILES = {
  ahoo: `${EMC_SITE}/team/Ahoo-Khalessi-3928`,
  ben: `${EMC_SITE}/team/Ben-Mokri-4026?UserId=005Pm00000958z3IAA`,
  dongJin: `${EMC_SITE}/team/Dong-Jin-Kim-4233?UserId=005Pm000008swaHIAQ`,
  susan: `${EMC_SITE}/team/Susan-ODonovan-5067?UserId=005Pm000009YufJIAS`,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: "CTC Equity | Coast to Coast. Clear to Close." },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/" }],
  }),
  component: HomePage,
});

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Can I access my equity without refinancing my first mortgage?",
    a: "Yes. A <b>HELOC</b> or a <b>fixed second mortgage</b> sits behind your existing first mortgage, so you tap your equity while keeping your current first-mortgage rate completely untouched. This is usually the right move when your first mortgage is at a low rate you don't want to lose to a cash-out refinance.",
  },
  {
    q: "What is a fixed second mortgage, and how is it different from a HELOC?",
    a: "A <b>fixed second mortgage</b> gives you a one-time lump sum at a fixed interest rate with a set monthly payment — predictable and good for a known, one-time expense. A <b>HELOC</b> is a revolving line of credit you draw from as needed, usually at a variable rate. Both sit behind your first mortgage.",
  },
  {
    q: "How much equity do I need for a HELOC?",
    a: "Most programs let you borrow up to a combined 80–90% of your home's value across your first mortgage and the new line. Two things set our equity options apart: you can often access up to <b>$400,000 with no appraisal required</b>, and we place HELOCs and fixed seconds <b>up to $4 million</b>.",
  },
  {
    q: "Can I qualify for a mortgage using bank statements instead of tax returns?",
    a: "Yes. A <b>bank statement loan</b> qualifies self-employed borrowers using 12–24 months of personal or business bank deposits instead of tax returns. A <b>P&L loan</b> is a related option that uses a profit & loss statement.",
  },
  {
    q: "What is a DSCR loan?",
    a: "A <b>DSCR (Debt Service Coverage Ratio) loan</b> is an investment-property loan that qualifies based on the property's rental income rather than your personal income. No tax returns, W-2s, or pay stubs required.",
  },
  {
    q: "Can I buy an investment property without tax returns?",
    a: "Yes — with a <b>DSCR loan</b>. Qualification is based on the rental income the property generates, so you can purchase or refinance an investment property with no personal income documentation.",
  },
  {
    q: "Can I use a HELOC or home equity for business purposes?",
    a: "Often, yes. Many borrowers use equity from a HELOC or fixed second to fund a business need, an investment, or a down payment on another property.",
  },
  {
    q: "I was turned down by another lender. Can you still help?",
    a: "Frequently, yes. A 'no' from one lender usually means your scenario didn't fit that single lender's guidelines. With access to 160+ lenders, our job is to find the lender whose guidelines do fit.",
  },
];

function HomePage() {
  return (
    <div>
      <SiteNav />
      <Hero />
      <NationwideStrip />
      <LeadFormSection />
      <SolutionsSection />
      <WhyDifferentSection />
      <RecognitionSection />
      <TeamSection />
      <PaymentEstimator />
      <FaqSection />
      <SiteFooter />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
    </div>
  );
}

function Hero() {
  return (
    <header className="hero-grad" style={{ position: "relative", padding: "88px 0 96px" }}>
      <div
        className="ctc-wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <span className="eyebrow on-dark">
            Nationwide Lending · Local Expertise · Clear to Close
          </span>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem,5vw,4rem)",
              lineHeight: 1.04,
              letterSpacing: "-.015em",
              margin: "18px 0 0",
              color: "#fff",
            }}
          >
            Another lender said no.
            <br />
            You were just standing at{" "}
            <em style={{ fontStyle: "italic", color: "var(--tiffany-soft)" }}>the wrong door.</em>
          </h1>
          <p
            style={{
              fontSize: "1.12rem",
              color: "var(--muted-on-dark)",
              marginTop: 22,
              maxWidth: "32em",
              lineHeight: 1.6,
            }}
          >
            Licensed coast to coast and based in Orange County, CA. Most lenders have one box — we
            have access to 160+. We specialize in the loans other brokers send away — HELOCs, fixed
            seconds, DSCR, and self-employed financing — and find the option that actually fits,
            wherever you are.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
            <Link to="/" hash="getstarted" className="btn btn-primary">
              Get My Options
            </Link>
            <Link to="/" hash="getstarted" className="btn btn-ghost">
              Schedule a Consultation
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 34 }}>
            {["HELOC", "Fixed Second", "DSCR", "Bank Statement", "P&L", "Reverse", "Commercial"].map(
              (p) => (
                <span
                  key={p}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: ".72rem",
                    letterSpacing: ".06em",
                    padding: ".4rem .8rem",
                    borderRadius: 999,
                    border: "1px solid var(--line-on-dark)",
                    color: "var(--bright)",
                    fontWeight: 600,
                  }}
                >
                  {p}
                </span>
              ),
            )}
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,.05)",
            border: "1px solid var(--line-on-dark)",
            borderRadius: 18,
            padding: 28,
            backdropFilter: "blur(6px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: "1.35rem",
              lineHeight: 1.3,
              color: "#fff",
            }}
          >
            “I want to pull cash out — but I'm not giving up my low first-mortgage rate.”
          </p>
          <p
            style={{
              color: "var(--muted-on-dark)",
              marginTop: 14,
              fontSize: ".95rem",
              lineHeight: 1.55,
            }}
          >
            That's the most common thing we hear. You don't have to refinance to access your equity.
            Keep your first mortgage exactly where it is.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginTop: 24,
              borderTop: "1px solid var(--line-on-dark)",
              paddingTop: 22,
            }}
          >
            <Stat num="160+" label="Lender options" />
            <Stat num="500–800s" label="FICO range served" />
            <Stat num="$0" label="Income docs (DSCR)" />
            <Stat num="Top 5%" label="Originators, nationally" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "2rem", color: "var(--bright)", lineHeight: 1 }}>
        {num}
      </div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: ".66rem",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--muted-on-dark)",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function NationwideStrip() {
  return (
    <section style={{ background: "var(--navy)", color: "#fff", borderBottom: "1px solid var(--line-on-dark)" }}>
      <div className="ctc-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, padding: "26px 24px" }}>
        {[
          { t: "Licensed nationwide", d: "We lend coast to coast across our licensed states." },
          { t: "Local in Orange County", d: "Based in Santa Ana, CA — a real team, not a call center." },
          { t: "160+ lenders, one point of contact", d: "Wholesale access, handled directly by us." },
        ].map((s) => (
          <div key={s.t} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontWeight: 700, fontSize: "1rem" }}>{s.t}</div>
            <div style={{ fontSize: ".88rem", color: "var(--muted-on-dark)" }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LeadFormSection() {
  return (
    <section
      id="getstarted"
      style={{ padding: "72px 0", background: "linear-gradient(180deg, var(--ink), var(--navy))", color: "#fff" }}
    >
      <div className="ctc-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <span className="eyebrow on-dark">60-second start</span>
          <h2
            style={{
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: "clamp(1.9rem,3.4vw,2.7rem)",
              lineHeight: 1.1,
              marginTop: 14,
              color: "#fff",
            }}
          >
            Tell us what you need. We'll find your options.
          </h2>
          <p style={{ color: "var(--muted-on-dark)", marginTop: 14, fontSize: "1.05rem", lineHeight: 1.6 }}>
            No full application. A quick note gets you real options from across 160+ lenders — HELOC,
            fixed second, DSCR, self-employed, and more.
          </p>
        </div>
        <LeadForm source="Website — Short Form (Schedule Consultation / Get My Options)" />
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="solutions" className="section">
      <div className="ctc-wrap">
        <div className="sec-head">
          <span className="eyebrow">Solutions, not loan programs</span>
          <h2>The problem you came in with — and the door we open.</h2>
          <p>
            We lead with what you're trying to solve. The loan program is just the route we take to
            get you there.
          </p>
        </div>

        <div style={{ display: "grid", gap: 26 }}>
          <SolutionCard
            num="01"
            quote="“I want cash out, but I'm keeping my low first-mortgage rate.”"
            answer={
              <>
                You can access your equity <b>without refinancing your first mortgage</b> — your low
                first-mortgage rate stays exactly where it is. Two standouts: get up to{" "}
                <b>$400,000 with no appraisal required</b> on a HELOC or fixed second — and for
                larger needs, we place HELOCs and fixed seconds <b>up to $4 million</b>, a size
                almost no one else will touch.
              </>
            }
            highlights={[
              { n: "$400K", d: "No appraisal required" },
              { n: "$4M", d: "Max HELOC / fixed second — rarely available anywhere" },
            ]}
            routes={[
              { to: "/heloc", title: "HELOC", desc: "Flexible line of credit against your equity." },
              { to: "/fixed-second-mortgage", title: "Fixed Second Mortgage", desc: "One lump sum, fixed rate, predictable payment." },
            ]}
          />

          <SolutionCard
            num="02"
            quote="“I want another rental — but I can't qualify on tax returns.”"
            answer={
              <>
                A DSCR loan lets you <b>purchase or refinance an investment property with no income
                documentation at all</b> — it qualifies on the property's rental income, not yours.
                No tax returns, no W-2s, no pay stubs, no employment verification.
              </>
            }
            highlights={[
              { n: "$0", d: "Income docs to purchase" },
              { n: "Rent", d: "qualifies the loan, not your taxes" },
            ]}
            routes={[
              { to: "/dscr-loans", title: "DSCR Loan", desc: "Buy investment property with no income docs." },
            ]}
          />
        </div>

        <h3 style={{ fontFamily: "var(--display)", fontSize: "1.4rem", margin: "46px 0 4px" }}>
          More ways we help
        </h3>
        <p style={{ color: "var(--muted-ink)", marginBottom: 18 }}>
          Self-employed, retired, or commercial — different needs, same access to 160+ lenders.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          {[
            { to: "/bank-statement-loans", t: "Self-Employed", d: "Bank statement, P&L, 1099, stated income, and no-DTI loans — qualify without tax returns." },
            { to: "/dscr-loans", t: "Investor & Construction", d: "DSCR, fix & flip, bridge, hard money, construction, and land loans for investors and builders." },
            { to: "/reverse-mortgages", t: "Reverse Mortgage", d: "Retired? Turn home equity into income with no monthly mortgage payment." },
            { to: "/commercial-loans", t: "Commercial", d: "Financing for commercial real estate and business purposes." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 22,
                textDecoration: "none",
                color: "var(--ink)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <h3 style={{ fontFamily: "var(--display)", fontSize: "1.2rem" }}>{c.t}</h3>
              <p style={{ color: "var(--muted-ink)", fontSize: ".94rem", lineHeight: 1.55 }}>{c.d}</p>
              <span style={{ color: "var(--cyan)", fontWeight: 600, fontSize: ".88rem" }}>Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  num,
  quote,
  answer,
  highlights,
  routes,
}: {
  num: string;
  quote: string;
  answer: React.ReactNode;
  highlights: { n: string; d: string }[];
  routes: { to: string; title: string; desc: string }[];
}) {
  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1.4fr 1fr",
        gap: 26,
        padding: 28,
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 18,
      }}
    >
      <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: "2rem", color: "var(--tiffany)" }}>
        {num}
      </span>
      <div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".68rem",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--cyan)",
          }}
        >
          You said
        </span>
        <p
          style={{
            fontFamily: "var(--display)",
            fontSize: "1.35rem",
            fontStyle: "italic",
            color: "var(--ink)",
            margin: "8px 0 14px",
            lineHeight: 1.35,
          }}
        >
          {quote}
        </p>
        <p style={{ color: "#33485a", lineHeight: 1.65 }}>{answer}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 18 }}>
          {highlights.map((h) => (
            <span
              key={h.d}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--sand)",
                borderRadius: 12,
                padding: "12px 16px",
                minWidth: 140,
              }}
            >
              <b style={{ fontFamily: "var(--display)", fontSize: "1.4rem", color: "var(--teal)" }}>
                {h.n}
              </b>
              <span style={{ fontSize: ".78rem", color: "var(--muted-ink)" }}>{h.d}</span>
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {routes.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: 16,
              background: "var(--sand)",
              borderRadius: 12,
              color: "var(--ink)",
              textDecoration: "none",
              border: "1px solid transparent",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column" }}>
              <b style={{ fontSize: "1rem" }}>{r.title}</b>
              <span style={{ fontSize: ".84rem", color: "var(--muted-ink)" }}>{r.desc}</span>
            </span>
            <span style={{ color: "var(--cyan)", fontWeight: 700 }}>→</span>
          </Link>
        ))}
      </div>
    </article>
  );
}

function WhyDifferentSection() {
  return (
    <section className="section section-dark">
      <div className="ctc-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50 }}>
        <div>
          <span className="eyebrow on-dark">Why CTC Equity is different</span>
          <p style={{ marginTop: 14, fontFamily: "var(--display)", fontSize: "2rem", lineHeight: 1.2 }}>
            Most lenders have <b>one box.</b>
            <br />
            We have <b>160+.</b>
          </p>
          <p style={{ color: "var(--muted-on-dark)", marginTop: 20, fontSize: "1.05rem", maxWidth: "30em", lineHeight: 1.6 }}>
            A lot of our clients come to us after being told "no" somewhere else. That "no" usually
            just means that one lender's box didn't fit. Our job is to find the lender whose box does
            — and to find the options you didn't know existed.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {[
            "Access to 160+ lenders — wholesale pricing, not one retail menu.",
            "HELOC & fixed-second specialists — keep your first mortgage rate.",
            "DSCR & investor financing — qualify on the property, not your taxes.",
            "Self-employed solutions — bank statement and P&L underwriting.",
            "Licensed coast to coast — and we serve FICO from the 500s to 800s.",
            "Fast communication & strategic execution — we move at your speed.",
          ].map((d) => (
            <div key={d} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ color: "var(--tiffany)", fontWeight: 700, fontSize: "1.1rem" }}>✓</span>
              <p style={{ color: "rgba(255,255,255,.92)", lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecognitionSection() {
  return (
    <section className="section">
      <div className="ctc-wrap">
        <div className="sec-head">
          <span className="eyebrow">Recognition & track record</span>
          <h2>The receipts.</h2>
          <p>Production volume and recognition earned the hard way — closing loans other lenders couldn't.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 50, marginBottom: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 800,
                  fontSize: "clamp(3rem,7vw,5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-.02em",
                  color: "var(--teal)",
                }}
              >
                $<span style={{ color: "var(--tiffany)" }}>4M</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".74rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--muted-ink)",
                  marginTop: 8,
                }}
              >
                Max HELOC or fixed second we place — a size almost no one else offers
              </div>
            </div>
            <div style={{ display: "flex", gap: 36, borderTop: "1px solid var(--line)", paddingTop: 22 }}>
              {[
                { n: "$400K", l: "No appraisal required (HELOC / 2nd)" },
                { n: "160+", l: "Lenders accessed" },
                { n: "Top 5%", l: "Originators nationally" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "1.7rem", color: "var(--ink)" }}>
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".64rem",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--muted-ink)",
                      marginTop: 6,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {(
              [
                { t: "Scotsman Guide Top Originator", y: "View on Ahoo's EMC profile ↗", href: EMC_PROFILES.ahoo },
                { t: "Started the home equity department at Rocket Mortgage", y: "Top producer — team & department" },
                { t: "EMC Top 5% Loan Officer — Volume", y: "EMortgage Capital · 2025", href: EMC_PROFILES.ahoo },
                { t: "EMC Top 5% Loan Officer — Units", y: "EMortgage Capital · 2025", href: EMC_PROFILES.ahoo },
                { t: "EMC Top 10% Loan Officer — Units", y: "EMortgage Capital · Q1 2026", href: EMC_PROFILES.ahoo },
              ] as { t: string; y: string; href?: string }[]
            ).map((a) => (
              <a
                key={a.t}
                href={a.href}
                target={a.href ? "_blank" : undefined}
                rel={a.href ? "noopener noreferrer" : undefined}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: 20,
                  display: "block",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: ".98rem", lineHeight: 1.3 }}>{a.t}</div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: ".66rem",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "var(--cyan)",
                    marginTop: 6,
                  }}
                >
                  {a.y}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".72rem",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--muted-ink)",
              marginBottom: 14,
            }}
          >
            EMC-certified specialist designations
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { t: "HELOC Specialist", primary: true },
              { t: "HELOAN / Fixed Second Specialist", primary: true },
              { t: "Non-QM Specialist" },
              { t: "Conventional Specialist" },
              { t: "VA Specialist" },
              { t: "Commercial" },
            ].map((b) => (
              <span
                key={b.t}
                style={{
                  background: b.primary
                    ? "linear-gradient(120deg,var(--cyan),var(--teal))"
                    : "var(--navy)",
                  color: "#fff",
                  borderRadius: 999,
                  padding: ".55rem 1.1rem",
                  fontWeight: 600,
                  fontSize: ".88rem",
                }}
              >
                {b.t}
              </span>
            ))}
          </div>
        </div>
        {/* TODO: replace this slot with the official EMortgage Capital logo (SVG or PNG). */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: "var(--sand)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: "20px 24px",
            marginTop: 24,
          }}
        >
          <div
            style={{
              width: 130,
              height: 52,
              border: "1px dashed var(--cyan)",
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              background: "#fff",
              fontFamily: "var(--mono)",
              fontSize: ".62rem",
              color: "var(--muted-ink)",
              textAlign: "center",
              padding: 6,
            }}
          >
            EMC LOGO HERE
          </div>
          <p style={{ fontSize: ".92rem", color: "var(--muted-ink)" }}>
            <b style={{ color: "var(--ink)" }}>
              Proudly originating through{" "}
              <a href={EMC_SITE} target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)" }}>
                EMortgage Capital
              </a>
              .
            </b>{" "}
            CTC Equity is a DBA of EMortgage Capital, Inc. — giving our clients the backing of a
            national lender with wholesale access to 160+ investors.
          </p>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="section section-sand">
      <div className="ctc-wrap">
        <div className="sec-head">
          <span className="eyebrow">Who you're working with</span>
          <h2>Meet the team</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22 }}>
          <TeamCard
            name="Ahoo Khalessi"
            role="Division Manager · Loan Officer"
            initials="AK"
            nmls="NMLS #2239510"
            phone="(949) 877-7234"
            email="akhalessi@ctcequity.com"
            apply={APPLY_NOW_AHOO}
            emcProfile={EMC_PROFILES.ahoo}
            // TODO: confirm and update Microsoft Bookings URL.
            booking="https://bookings.cloud.microsoft/book/AhooKhalessi@emortgagecapital.com/"
            bio="Started the home equity department at Rocket Mortgage as top producer, then made home equity her wholesale specialty. Places HELOCs and fixed seconds up to $4M. Scotsman Guide Top Originator, EMC Top 5% Loan Officer (2025), top 5% nationally."
          />
          <TeamCard
            name="Ben Mokri"
            role="Partner · Executive Loan Officer"
            initials="BM"
            nmls="NMLS #2279528"
            phone="(949) 889-2993"
            email="bmokri@ctcequity.com"
            apply="https://benmokri.floify.com/apply-now"
            emcProfile={EMC_PROFILES.ben}
            // TODO: add Ben's Microsoft Bookings URL when provided.
            bio="Partner at CTC Equity working alongside Ahoo on equity, DSCR, and self-employed financing for investors and business owners nationwide."
          />
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: "var(--mono)",
            fontSize: ".76rem",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--muted-ink)",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
            alignItems: "center",
          }}
        >
          <span>Our team on EMortgage Capital:</span>
          {[
            { n: "Ahoo Khalessi", href: EMC_PROFILES.ahoo },
            { n: "Ben Mokri", href: EMC_PROFILES.ben },
            { n: "Dong Jin Kim", href: EMC_PROFILES.dongJin },
            { n: "Susan O'Donovan", href: EMC_PROFILES.susan },
          ].map((m) => (
            <a
              key={m.n}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--cyan)", textDecoration: "none" }}
            >
              {m.n} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  name,
  role,
  initials,
  nmls,
  phone,
  email,
  apply,
  booking,
  emcProfile,
  bio,
}: {
  name: string;
  role: string;
  initials: string;
  nmls: string;
  phone: string;
  email: string;
  apply: string;
  booking?: string;
  emcProfile?: string;
  bio: string;
}) {
  return (
    <article
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 18,
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: "linear-gradient(135deg,var(--tiffany),var(--teal))",
            color: "#fff",
            fontFamily: "var(--display)",
            fontWeight: 800,
            fontSize: "1.4rem",
            display: "grid",
            placeItems: "center",
            flex: "none",
          }}
        >
          {initials}
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.4rem" }}>{name}</h3>
          <div style={{ color: "var(--cyan)", fontWeight: 600, fontSize: ".9rem" }}>{role}</div>
        </div>
      </div>
      <p style={{ color: "#33485a", lineHeight: 1.6, fontSize: ".95rem" }}>{bio}</p>
      <div style={{ fontFamily: "var(--mono)", fontSize: ".82rem", color: "var(--muted-ink)" }}>
        {nmls} · {phone}
        <br />
        <a href={`mailto:${email}`} style={{ color: "var(--cyan)" }}>
          {email}
        </a>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a className="btn btn-primary" href={apply} target="_blank" rel="noopener" style={{ padding: ".6rem 1.1rem" }}>
          Apply with {name.split(" ")[0]}
        </a>
        {booking && (
          <a className="btn btn-dark" href={booking} target="_blank" rel="noopener noreferrer" style={{ padding: ".6rem 1.1rem" }}>
            Book an appointment ↗
          </a>
        )}
      </div>
      {emcProfile && (
        <a
          href={emcProfile}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".78rem",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            textDecoration: "none",
          }}
        >
          EMC profile & awards ↗
        </a>
      )}
    </article>
  );
}

function PaymentEstimator() {
  const [amt, setAmt] = useState("400000");
  const [rate, setRate] = useState("7.25");
  const [term, setTerm] = useState("30");

  const P = parseFloat(amt) || 0;
  const r = parseFloat(rate) / 100 / 12;
  const m = parseFloat(term) * 12;
  const payment = m > 0 && P > 0 ? (r > 0 ? (P * r) / (1 - Math.pow(1 + r, -m)) : P / m) : 0;
  const formatted = "$" + Math.round(payment).toLocaleString("en-US");

  return (
    <section id="estimator" className="section section-dark">
      <div className="ctc-wrap">
        <div className="sec-head">
          <span className="eyebrow on-dark">Payment Estimator</span>
          <h2>Estimate your monthly payment.</h2>
          <p>A quick principal & interest estimate. Not a quote — taxes, insurance, and final terms vary.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid var(--line-on-dark)",
              borderRadius: 14,
              padding: 22,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <EstField label="Loan amount" value={amt} onChange={setAmt} />
            <EstField label="Interest rate (%)" value={rate} onChange={setRate} />
            <label style={{ display: "block", color: "#fff", fontWeight: 600, fontSize: ".9rem" }}>
              Term
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                style={{
                  display: "block",
                  marginTop: 6,
                  width: "100%",
                  padding: ".7rem .85rem",
                  borderRadius: 10,
                  border: "1px solid var(--line-on-dark)",
                  background: "var(--navy)",
                  color: "#fff",
                  fontFamily: "var(--body)",
                  fontSize: "1rem",
                }}
              >
                <option value="30">30 years</option>
                <option value="20">20 years</option>
                <option value="15">15 years</option>
                <option value="10">10 years</option>
              </select>
            </label>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(10,186,181,.18), transparent)",
              border: "1px solid var(--line-on-dark)",
              borderRadius: 14,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".14em", color: "var(--tiffany-soft)", textTransform: "uppercase" }}>
              Estimated monthly principal & interest
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: "3rem", fontWeight: 700, color: "#fff", marginTop: 8 }}>
              {formatted}
            </div>
            <p style={{ color: "var(--muted-on-dark)", marginTop: 14, fontSize: ".88rem" }}>
              Estimate only. Excludes property taxes, insurance, HOA, and mortgage insurance.
            </p>
            <Link to="/" hash="getstarted" className="btn btn-primary" style={{ marginTop: 16, alignSelf: "flex-start" }}>
              Get my real numbers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EstField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={{ display: "block", color: "#fff", fontWeight: 600, fontSize: ".9rem" }}>
      {label}
      <input
        value={value}
        inputMode="decimal"
        onChange={(e) => onChange(e.target.value)}
        style={{
          display: "block",
          marginTop: 6,
          width: "100%",
          padding: ".7rem .85rem",
          borderRadius: 10,
          border: "1px solid var(--line-on-dark)",
          background: "var(--navy)",
          color: "#fff",
          fontFamily: "var(--body)",
          fontSize: "1rem",
        }}
      />
    </label>
  );
}

function FaqSection() {
  // Close other open <details> when one opens.
  useEffect(() => {
    const all = Array.from(document.querySelectorAll<HTMLDetailsElement>("#home-faq details.qa"));
    function handler(this: HTMLDetailsElement) {
      if (this.open) all.forEach((d) => d !== this && (d.open = false));
    }
    all.forEach((d) => d.addEventListener("toggle", handler));
    return () => all.forEach((d) => d.removeEventListener("toggle", handler));
  }, []);

  return (
    <section id="faq" className="section">
      <div className="ctc-wrap-narrow" id="home-faq">
        <div className="sec-head" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
          <span className="eyebrow">The questions people actually ask</span>
          <h2>Equity, DSCR & self-employed financing — answered</h2>
          <p>
            Straight answers to the questions we hear every day. (These mirror what borrowers ask AI
            assistants — so they're written answer-first.)
          </p>
        </div>
        <FaqList items={FAQ_ITEMS} />
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link to="/faq" className="btn btn-dark">
            See the full FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
