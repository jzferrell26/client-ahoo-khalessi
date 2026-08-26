import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/ai-setup-checklist")({
  head: () => ({
    meta: [
      { title: "AI Discoverability Setup Checklist | CTC Equity (internal)" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Page,
});

const SECTIONS = [
  {
    title: "1. Publish the technical files",
    who: "Jonathan · at the site root",
    priority: "do first",
    items: [
      ["robots.txt", "Live at /robots.txt — allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Bingbot, and links the sitemap."],
      ["sitemap.xml", "Live at /sitemap.xml — auto-generated from the site routes."],
      ["llms.txt", "Live at /llms.txt — plain-language summary written for AI assistants."],
      ["Deploy the pages", "Home, /heloc, /fixed-second-mortgage, /dscr-loans, /mortgage-analyzer, /faq, plus /bank-statement-loans, /pnl-loans, /reverse-mortgages, /commercial-loans, /fha-loans, /va-loans, /conventional-loans."],
    ],
  },
  {
    title: "2. Submit to the engines",
    who: "Jonathan",
    priority: "do first",
    items: [
      ["Bing Webmaster Tools", "Add the site and submit the sitemap. ChatGPT Search runs on Bing's index — the single most direct lever for ChatGPT visibility."],
      ["Google Search Console", "Verify the site, submit the sitemap. Feeds Google AI Overviews and Gemini."],
      ["Validate the schema", "Run the homepage and each loan page through Google's Rich Results Test and Schema.org validator."],
    ],
  },
  {
    title: "3. Claim and complete the local + review profiles",
    who: "Ahoo (owns the accounts) + Jonathan (wires the embeds)",
    priority: "high impact",
    items: [
      ["Google Business Profile", "#1 lever for 'near me' AI answers. Category 'Mortgage Broker', exact NAP, photos, hours, reviews. Paste the Maps URL into the site's schema (hasMap)."],
      ["Zillow lender profile", "Send the URL so it drops into the site (reviews button, footer, schema). Embed the official widget on the Reviews section."],
      ["Experience.com + Google reviews", "Embed live widgets and keep requesting reviews after every closing."],
    ],
    note: "NAP must match everywhere, exactly: CTC Equity · 3750 S Susan St, Orange County, CA 92704 · (949) 877-7234.",
  },
  {
    title: "4. Build the off-site signals that make AI say your NAME",
    who: "Ahoo (this part isn't a dev task)",
    items: [
      ["Get into 'best of' roundups", "Search 'best DSCR lender 2026,' 'best self-employed mortgage,' 'best HELOC broker [state].' Ask to be included. AI heavily cites these."],
      ["Answer genuinely on Reddit / forums", "r/RealEstate, r/realestateinvesting, r/FirstTimeHomeBuyer."],
      ["Create a Wikidata entry", "A simple factual entity for CTC Equity is consumed directly by AI knowledge graphs."],
      ["Complete LinkedIn + consistent bios", "Same name, title, NMLS, and specialties everywhere."],
    ],
  },
  {
    title: "5. Confirm before launch",
    who: "Ahoo",
    items: [
      ["Licensed states", "Done: the footer now links to EMC's Licensing and Disclosures page instead of listing states inline, so it stays current as EMC's footprint changes. Confirm with EMC that linking is acceptable for your disclosure."],
      ["EMC logo", "Drop the official logo into the two logo slots."],
      ["Headshots", "Swap the AK/BM initials avatars on the homepage for real photos."],
      ["Scotsman Guide year", "Fill the remaining year placeholder on the awards card."],
    ],
  },
  {
    title: "6. Measure",
    who: "Jonathan",
    items: [
      ["Track AI referral traffic", "Watch for referrers chatgpt.com, perplexity.ai, gemini. Test monthly by asking each assistant target questions and noting when CTC Equity appears."],
    ],
  },
] as const;

function Page() {
  return (
    <div style={{ background: "var(--sand)", minHeight: "100vh" }}>
      <header className="hero-grad" style={{ position: "relative", padding: "48px 0 42px", borderBottom: "1px solid var(--tiffany)" }}>
        <div className="ctc-wrap-narrow">
          <span className="eyebrow on-dark">CTC Equity · Internal tool</span>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(1.9rem,4vw,2.7rem)", color: "#fff", margin: "12px 0 10px" }}>
            What AI needs to find you, index you, and recommend you
          </h1>
          <p style={{ color: "var(--muted-on-dark)", maxWidth: "46em", lineHeight: 1.6 }}>
            Everything required beyond the website so ChatGPT, Gemini, Perplexity, Claude, and
            Google AI can discover, trust, and name CTC Equity in answers. Expect a 4–8 week lag
            after publishing before pages start appearing in AI answers.
          </p>
        </div>
      </header>
      <main style={{ padding: "40px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          {SECTIONS.map((s) => (
            <section
              key={s.title}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "26px 28px",
                marginBottom: 20,
              }}
            >
              <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "1.4rem" }}>
                {s.title}
                {"priority" in s && s.priority ? (
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".6rem",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      background: "var(--tiffany)",
                      color: "#06302f",
                      borderRadius: 999,
                      padding: ".2rem .55rem",
                      marginLeft: 10,
                      verticalAlign: "middle",
                    }}
                  >
                    {s.priority}
                  </span>
                ) : null}
              </h2>
              <div style={{ fontFamily: "var(--mono)", fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--cyan)", margin: "8px 0 16px" }}>
                {s.who}
              </div>
              {s.items.map(([t, d], i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: i === 0 ? "0" : "1px solid var(--line)" }}>
                  <div style={{ width: 22, height: 22, border: "2px solid var(--tiffany)", borderRadius: 6, marginTop: 2, flex: "none" }} />
                  <div>
                    <b style={{ display: "block", marginBottom: 2 }}>{t}</b>
                    <span style={{ color: "#33485a", fontSize: ".93rem" }}>{d}</span>
                  </div>
                </div>
              ))}
              {"note" in s && s.note ? (
                <div
                  style={{
                    background: "var(--sand)",
                    borderLeft: "4px solid var(--tiffany)",
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginTop: 12,
                    fontSize: ".92rem",
                    color: "#33485a",
                  }}
                >
                  <b>NAP must match:</b> {s.note}
                </div>
              ) : null}
            </section>
          ))}
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link to="/" style={{ color: "var(--cyan)" }}>← Back to site</Link>
          </p>
        </div>
      </main>
    </div>
  );
}