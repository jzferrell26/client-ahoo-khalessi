import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { TeamMembers } from "@/components/site/TeamMembers";

const TITLE = "Meet the Team | CTC Equity Mortgage Loan Officers — Orange County, CA";
const DESC =
  "Meet the CTC Equity team — licensed mortgage loan officers specializing in HELOCs, fixed second mortgages, DSCR investment loans, and self-employed financing. Based in Orange County, CA and licensed coast to coast.";

/**
 * /team — the standalone team page.
 *
 * ADDITIVE by design. The homepage `#team` section in src/routes/index.tsx is
 * unchanged and still renders; this page is a second surface for the same
 * roster, not a relocation of it. The roster itself lives in
 * src/components/site/TeamMembers.tsx so member order is defined once.
 */
export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div>
      <SiteNav />

      <header className="hero-grad" style={{ position: "relative", padding: "64px 0 72px" }}>
        <div className="ctc-wrap">
          <span className="eyebrow on-dark">Who you&rsquo;re working with</span>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: "clamp(2.2rem,4.6vw,3.4rem)",
              lineHeight: 1.06,
              letterSpacing: "-.015em",
              margin: "16px 0 0",
              color: "#fff",
            }}
          >
            Meet the team
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--muted-on-dark)",
              marginTop: 20,
              maxWidth: "36em",
              lineHeight: 1.6,
            }}
          >
            A real team based in Orange County, CA and licensed coast to coast. You work with a
            named licensed loan officer from the first call through closing, not a call center
            queue.
          </p>
        </div>
      </header>

      <section className="section section-sand">
        <div className="ctc-wrap">
          <TeamMembers />
          <p
            style={{
              color: "var(--muted-ink)",
              fontSize: ".82rem",
              marginTop: 28,
              maxWidth: "44em",
              lineHeight: 1.6,
            }}
          >
            CTC Equity is a DBA of EMortgage Capital, Inc. (NMLS #1416824). Program availability
            depends on credit, income, property type, and state.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
