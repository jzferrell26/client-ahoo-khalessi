import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Mortgage Analyzer | Estimate Accessible Equity & Best-Fit Loan | CTC Equity";
const DESC =
  "Estimate how much equity you can access without touching your first mortgage, or find the loan that fits your goal. Quick, no application.";

export const Route = createFileRoute("/mortgage-analyzer")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/mortgage-analyzer" }],
  }),
  component: AnalyzerPage,
});

type Goal = "equity" | "invest" | "selfemp" | "purchase";
const CLTV: Record<string, number> = { hi: 0.9, mid: 0.85, lo: 0.8, vlo: 0.75, xlo: 0.7 };

function money(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function AnalyzerPage() {
  const [goal, setGoal] = useState<Goal>("equity");
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState("");
  const [credit, setCredit] = useState<keyof typeof CLTV>("mid");
  const [result, setResult] = useState<React.ReactNode>(null);

  function num(s: string) {
    return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
  }

  function analyze() {
    if (goal === "equity") {
      const v = num(value);
      const bal = num(balance);
      if (v <= 0) {
        setResult(<Reco><p>Enter your estimated home value to see your accessible equity.</p></Reco>);
        return;
      }
      const cltv = CLTV[credit];
      const avail = Math.max(0, v * cltv - bal);
      const noAppraisal = Math.min(avail, 400000);
      setResult(
        <>
          <BigResult label="Estimated equity you may be able to access" num={money(avail)} sub={`at about ${Math.round(cltv * 100)}% combined loan-to-value, first mortgage untouched`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
            <StatBox n={money(noAppraisal)} l="May qualify with NO appraisal (up to $400K)" />
            <StatBox n="up to $4M" l="We place HELOCs & fixed seconds this large" />
          </div>
          <Reco>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "1.3rem", marginBottom: 6 }}>
              Your likely fit: HELOC or Fixed Second
            </h3>
            <p>
              You can tap this equity <b>without refinancing your first mortgage</b>, so your
              current rate stays put. Choose a HELOC for a flexible line you draw as needed, or a
              fixed second for a lump sum at a fixed payment.
            </p>
            <Tags items={["No appraisal up to $400K", "Up to $4M", "First mortgage untouched"]} />
          </Reco>
        </>,
      );
    } else if (goal === "invest") {
      setResult(
        <Reco>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.3rem", marginBottom: 6 }}>
            Your likely fit: DSCR Loan
          </h3>
          <p>
            You can <b>purchase or refinance an investment property with no income documentation</b>{" "}
            — no tax returns, W-2s, or pay stubs. The loan qualifies on the property's rental
            income, so you can keep buying even if you already own several.
          </p>
          <Tags items={["$0 income docs", "Qualifies on rent", "LLC OK"]} />
        </Reco>,
      );
    } else if (goal === "selfemp") {
      setResult(
        <>
          <Reco>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "1.3rem", marginBottom: 6 }}>
              Your likely fit: Bank Statement or P&L Loan
            </h3>
            <p>
              If your tax returns understate your real income, we can qualify you on{" "}
              <b>12–24 months of bank deposits</b> or a <b>profit & loss statement</b> instead —
              for a purchase or a refinance.
            </p>
            <Tags items={["No tax returns", "Self-employed"]} />
          </Reco>
          <Reco>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "1.3rem", marginBottom: 6 }}>
              Also worth a look: your equity
            </h3>
            <p>
              If you already own a home, you may be able to access equity through a HELOC or fixed
              second too. Re-run the analyzer with the "Get cash from my equity" goal.
            </p>
          </Reco>
        </>,
      );
    } else {
      setResult(
        <Reco>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.3rem", marginBottom: 6 }}>
            Your likely fit: FHA, VA, or Conventional
          </h3>
          <p>
            For a primary home, we shop your scenario across 160+ lenders to find the best fit.
            Credit from the 500s to 800s, with options for first-time buyers and veterans.
          </p>
          <Tags items={["FHA", "VA", "Conventional"]} />
        </Reco>,
      );
    }
  }

  const goals: { id: Goal; t: string; d: string }[] = [
    { id: "equity", t: "Get cash from my equity", d: "Keep my low first-mortgage rate" },
    { id: "invest", t: "Buy an investment property", d: "No income docs (DSCR)" },
    { id: "selfemp", t: "Buy/refi — I'm self-employed", d: "Bank statement or P&L" },
    { id: "purchase", t: "Buy a home to live in", d: "FHA / VA / Conventional" },
  ];

  return (
    <div>
      <SiteNav />
      <header className="hero-grad" style={{ position: "relative", padding: "72px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          <span className="eyebrow on-dark">Mortgage Analyzer</span>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: "clamp(2rem,4.4vw,3rem)",
              color: "#fff",
              margin: "12px 0 16px",
            }}
          >
            See what you can do — in about 30 seconds
          </h1>
          <p style={{ color: "var(--muted-on-dark)", fontSize: "1.1rem", maxWidth: "44em", lineHeight: 1.6 }}>
            Estimate the equity you can access without touching your first mortgage, or find out
            which loan fits your goal. This is a quick estimate, not an application or an offer.
          </p>
        </div>
      </header>
      <main style={{ padding: "60px 0" }}>
        <div className="ctc-wrap-narrow">
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 18,
              padding: 28,
            }}
          >
            <label style={{ display: "block", fontWeight: 600, marginBottom: 10 }}>
              What's your goal? <span style={{ color: "var(--muted-ink)", fontWeight: 400, fontSize: ".82rem" }}>· pick one</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, marginBottom: 20 }}>
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  style={{
                    textAlign: "left",
                    padding: 14,
                    borderRadius: 12,
                    border: goal === g.id ? "1.5px solid var(--cyan)" : "1.5px solid var(--line)",
                    background: goal === g.id ? "var(--sand)" : "#fff",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>{g.t}</span>
                  <span style={{ fontSize: ".82rem", color: "var(--muted-ink)" }}>{g.d}</span>
                </button>
              ))}
            </div>

            {goal === "equity" && (
              <>
                <Field label="Estimated home value">
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    inputMode="numeric"
                    placeholder="$750,000"
                    style={inputStyle}
                  />
                </Field>
                <Field label="Current first mortgage balance" hint="enter $0 if paid off">
                  <input
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    inputMode="numeric"
                    placeholder="$420,000"
                    style={inputStyle}
                  />
                </Field>
              </>
            )}

            <Field label="Estimated credit score range">
              <select value={credit} onChange={(e) => setCredit(e.target.value as keyof typeof CLTV)} style={inputStyle}>
                <option value="hi">740 or higher</option>
                <option value="mid">680–739</option>
                <option value="lo">620–679</option>
                <option value="vlo">580–619</option>
                <option value="xlo">Below 580</option>
              </select>
            </Field>

            <button className="btn btn-primary" type="button" onClick={analyze} style={{ marginTop: 14 }}>
              Analyze my options
            </button>

            {result && (
              <div style={{ marginTop: 26 }}>
                {result}
                <div
                  style={{
                    background: "linear-gradient(120deg,var(--cyan),var(--teal))",
                    color: "#fff",
                    borderRadius: 14,
                    padding: 24,
                    marginTop: 18,
                    textAlign: "center",
                  }}
                >
                  <p style={{ marginBottom: 14 }}>
                    Want the real numbers for your situation? Send it over — no full application to
                    start.
                  </p>
                  <Link to="/" hash="getstarted" className="btn" style={{ background: "#fff", color: "var(--teal)" }}>
                    Get My Options
                  </Link>
                </div>
              </div>
            )}
          </div>

          <p style={{ fontSize: ".82rem", color: "var(--muted-ink)", marginTop: 18, lineHeight: 1.6 }}>
            For estimate only. Figures are illustrative based on typical guidelines and are not an
            offer, pre-approval, rate quote, or commitment to lend. Actual options depend on full
            underwriting, property, credit, and lender guidelines. CTC Equity is a DBA of EMortgage
            Capital, Inc., NMLS #1416824. Ahoo Khalessi, NMLS #2239510. Equal Housing Lender.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".7rem .85rem",
  borderRadius: 10,
  border: "1.5px solid var(--line)",
  fontFamily: "var(--body)",
  fontSize: "1rem",
  background: "#fff",
  color: "var(--ink)",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: ".92rem", marginBottom: 6 }}>
        {label}{" "}
        {hint && <span style={{ fontWeight: 400, color: "var(--muted-ink)", fontSize: ".82rem" }}>· {hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Reco({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--sand)",
        borderLeft: "4px solid var(--tiffany)",
        borderRadius: 12,
        padding: 18,
        marginTop: 14,
        color: "#33485a",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

function BigResult({ label, num, sub }: { label: string; num: string; sub: string }) {
  return (
    <div
      style={{
        background: "linear-gradient(120deg, var(--ink), var(--navy))",
        color: "#fff",
        padding: 26,
        borderRadius: 14,
        marginTop: 8,
      }}
    >
      <div style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--tiffany-soft)" }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--bright)", marginTop: 6 }}>
        {num}
      </div>
      <div style={{ color: "var(--muted-on-dark)", fontSize: ".9rem", marginTop: 6 }}>{sub}</div>
    </div>
  );
}

function StatBox({ n, l }: { n: string; l: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 16 }}>
      <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "1.4rem", color: "var(--teal)" }}>{n}</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted-ink)", marginTop: 4 }}>{l}</div>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
      {items.map((t) => (
        <span
          key={t}
          style={{
            background: "var(--tiffany)",
            color: "#06302f",
            fontFamily: "var(--mono)",
            fontSize: ".7rem",
            padding: ".25rem .7rem",
            borderRadius: 999,
            fontWeight: 600,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}