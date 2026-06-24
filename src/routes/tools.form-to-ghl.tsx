import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/form-to-ghl")({
  head: () => ({
    meta: [
      { title: "Wire the website short form to GHL | CTC Equity (internal)" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Page,
});

const SNIPPET = `// .env / Lovable secrets
VITE_GHL_INBOUND_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...`;

function Page() {
  return (
    <div style={{ background: "var(--sand)", minHeight: "100vh" }}>
      <header className="hero-grad" style={{ position: "relative", padding: "40px 0", borderBottom: "1px solid var(--tiffany)" }}>
        <div className="ctc-wrap-narrow">
          <span className="eyebrow on-dark">CTC Equity · Dev handoff</span>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: "10px 0 8px" }}>
            Wire the website short form to GHL
          </h1>
          <p style={{ color: "var(--muted-on-dark)" }}>
            Goal: the homepage "Get My Options / Schedule a Consultation" form drops the lead into
            GHL, fires our follow-up automation, and records consent.
          </p>
        </div>
      </header>
      <main style={{ padding: "34px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          <Card title="What the form is">
            <p>
              The <code>LeadForm</code> component (rendered in the homepage <code>#getstarted</code>{" "}
              section, plus the loan-page CTAs) collects the fields below. By default it POSTs to a
              GHL inbound webhook if the env var <code>VITE_GHL_INBOUND_WEBHOOK_URL</code> is set.
              If it's missing, the form still completes — payload is console-logged so you can
              inspect it in preview.
            </p>
            <Table
              head={["name", "meaning"]}
              rows={[
                ["first", "First name"],
                ["last", "Last name"],
                ["phone", "Phone"],
                ["email", "Email"],
                ["goal", "What they want (HELOC, DSCR, etc.)"],
                ["consent", "TCPA consent checkbox (required, boolean)"],
                ["source", "Hidden: where the lead came from"],
                ["consent_language", "Hidden: exact consent text shown to the user"],
                ["submitted_at", "Auto: ISO timestamp added on submit"],
              ]}
            />
          </Card>

          <Card title="Wiring (recommended): GHL inbound webhook">
            <ol style={{ paddingLeft: "1.2rem", color: "#33485a", lineHeight: 1.7 }}>
              <li>
                In GHL, create a Workflow with an <b>Inbound Webhook</b> trigger. Copy the webhook
                URL.
              </li>
              <li>
                In that workflow: Create/Update Contact → map the fields below → add to the{" "}
                <b>Sales pipeline, stage "New Lead"</b> → start the follow-up automation. Save{" "}
                <code>consent</code>, <code>consent_language</code>, and{" "}
                <code>submitted_at</code> as custom fields on the contact (TCPA record). Tag with{" "}
                <code>source</code>.
              </li>
              <li>
                Set the webhook URL as <code>VITE_GHL_INBOUND_WEBHOOK_URL</code> in the project's
                Lovable secrets (rebuild the preview to pick it up).
              </li>
            </ol>
            <Pre code={SNIPPET} />
          </Card>

          <Card title="Field mapping → GHL contact">
            <Table
              head={["Form field", "GHL field"]}
              rows={[
                ["first / last", "First Name / Last Name"],
                ["phone", "Phone"],
                ["email", "Email"],
                ["goal", "Custom field 'Loan Interest'"],
                ["consent (true/false)", "Custom field 'TCPA Consent'"],
                ["consent_language", "Custom field 'Consent Text' (compliance record)"],
                ["submitted_at", "Custom field 'Consent Timestamp'"],
                ["source", "Contact Source / tag"],
              ]}
            />
          </Card>

          <Card title="The flow it creates">
            <p>
              <b>
                Get My Options / Schedule a Consultation → short form → GHL "New Lead" → follow-up
                automation → Ahoo + Ben follow up.
              </b>
            </p>
            <p>
              Note: this is the quick-intake form. "Apply Now" is separate and already routes to
              Floify (Ahoo: akhalessi.floify.com/apply-now, Ben: benmokri.floify.com/apply-now).
              "Book an appointment" routes to each LO's Microsoft Bookings page.
            </p>
          </Card>

          <Card title="Compliance">
            <p>
              Have EMC compliance confirm the exact TCPA consent wording in{" "}
              <code>LeadForm.tsx</code>. The consent text + timestamp + checkbox are stored on the
              contact, which is the record you want.
            </p>
          </Card>

          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link to="/" style={{ color: "var(--cyan)" }}>← Back to site</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: "24px 26px",
        marginBottom: 18,
      }}
    >
      <h2 style={{ fontFamily: "var(--display)", fontSize: "1.3rem", marginBottom: 12 }}>{title}</h2>
      <div style={{ color: "#33485a", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".9rem", marginTop: 12 }}>
      <thead>
        <tr>
          {head.map((h) => (
            <th
              key={h}
              style={{
                textAlign: "left",
                padding: "8px 10px",
                borderBottom: "1px solid var(--line)",
                fontFamily: "var(--mono)",
                fontSize: ".66rem",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--muted-ink)",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td
                key={j}
                style={{ padding: "8px 10px", borderBottom: "1px solid var(--line)" }}
                dangerouslySetInnerHTML={{ __html: c.replace(/`([^`]+)`/g, "<code>$1</code>") }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pre({ code }: { code: string }) {
  return (
    <pre
      style={{
        background: "var(--ink)",
        color: "#cfe8ef",
        borderRadius: 10,
        padding: 18,
        overflow: "auto",
        fontFamily: "var(--mono)",
        fontSize: ".84rem",
        lineHeight: 1.6,
        marginTop: 12,
      }}
    >
      {code}
    </pre>
  );
}