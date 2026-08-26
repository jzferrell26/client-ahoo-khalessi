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

const SNIPPET = `// Lovable secrets (server-side runtime env, NOT prefixed with VITE_)
GHL_GET_MY_OPTIONS_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
GHL_AVM_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
// Legacy fallback, AVM only, used when GHL_AVM_WEBHOOK_URL is unset:
GHL_INBOUND_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...`;

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
              section and on <code>/get-my-options</code>) and the <code>HomeValueForm</code>{" "}
              component (rendered on <code>/avm</code> and <code>/free-home-value-report</code>)
              collect the fields below. Neither form talks to GoHighLevel directly. Both POST to
              this site's own server route, <code>/api/lead</code>, which validates the payload and
              forwards it to GHL using a server-side secret. See "How the routing actually works"
              below for the full picture.
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

          <Card title="How the routing actually works">
            <p>
              Both forms POST a JSON payload to the server route <code>/api/lead</code>, defined in{" "}
              <code>src/routes/api.lead.ts</code>. The browser never talks to GoHighLevel directly,
              and it never sees a webhook URL. The handler validates the payload with{" "}
              <code>leadSubmissionSchema</code> (in <code>src/lib/lead-schema.ts</code>), a Zod{" "}
              <code>.strict()</code> discriminated union keyed on a hidden field named{" "}
              <code>lead_kind</code>. That field is how the server decides which GHL webhook to
              forward to: it is not a UI choice, it is baked into which form the visitor is on.
            </p>
            <Table
              head={["lead_kind", "sent by", "server reads"]}
              rows={[
                [
                  "get_my_options",
                  "`LeadForm` (homepage `#getstarted` section and `/get-my-options`)",
                  "`GHL_GET_MY_OPTIONS_WEBHOOK_URL`",
                ],
                [
                  "avm_report_request",
                  "`HomeValueForm` (`/avm` and `/free-home-value-report`)",
                  "`GHL_AVM_WEBHOOK_URL`, falling back to `GHL_INBOUND_WEBHOOK_URL`",
                ],
              ]}
            />
            <p>
              <b>The fallback only exists for <code>avm_report_request</code>.</b>{" "}
              <code>get_my_options</code> has no fallback variable at all. If{" "}
              <code>GHL_GET_MY_OPTIONS_WEBHOOK_URL</code> is unset, every Get My Options submission,
              including the homepage form, fails outright: the handler returns HTTP 503 with{" "}
              <code>{"{ ok: false, configured: false }"}</code> and the lead is not forwarded
              anywhere. This is the single most likely cause of "leads stopped arriving." See
              "Troubleshooting a missing lead" below.
            </p>
          </Card>

          <Card title="Setting the webhook secrets">
            <ol style={{ paddingLeft: "1.2rem", color: "#33485a", lineHeight: 1.7 }}>
              <li>
                In GHL, create a Workflow with an <b>Inbound Webhook</b> trigger for each intake
                path (Get My Options, AVM report request). Copy each webhook URL.
              </li>
              <li>
                In that workflow: Create/Update Contact → map the fields below → add to the{" "}
                <b>Sales pipeline, stage "New Lead"</b> → start the follow-up automation. Save{" "}
                <code>consent</code>, <code>consent_language</code>, and{" "}
                <code>submitted_at</code> as custom fields on the contact (TCPA record). Tag with{" "}
                <code>source</code>.
              </li>
              <li>
                Set the URLs as <code>GHL_GET_MY_OPTIONS_WEBHOOK_URL</code> and{" "}
                <code>GHL_AVM_WEBHOOK_URL</code> in the project's Lovable secrets, then rebuild.
                These are read on the server only; none of the three variables carries a{" "}
                <code>VITE_</code> prefix, and that's by design. A <code>VITE_</code>-prefixed
                variable gets bundled into the client-side JavaScript, which would expose the
                webhook URL to anyone viewing the page source. Whether these variables are
                currently set in this project's Lovable secrets has not been verified here; check
                the secrets panel directly.
              </li>
            </ol>
            <Pre code={SNIPPET} />
          </Card>

          <Card title="Troubleshooting a missing lead">
            <p>
              If a lead should have arrived and didn't, the first thing to check is the response{" "}
              <code>/api/lead</code> gave the browser:
            </p>
            <Table
              head={["Response", "Meaning"]}
              rows={[
                [
                  "HTTP 503, `{ ok: false, configured: false }`",
                  "The webhook URL for that `lead_kind` is unset on the server. Check `GHL_GET_MY_OPTIONS_WEBHOOK_URL` for the homepage/Get My Options forms, or `GHL_AVM_WEBHOOK_URL` (and its fallback `GHL_INBOUND_WEBHOOK_URL`) for the AVM forms, in Lovable secrets.",
                ],
                [
                  'HTTP 502, `{ ok: false, configured: true, error: "forward_failed" }`',
                  "The webhook URL is set, but GHL rejected the forwarded request or the fetch itself failed. Check the GHL workflow's Inbound Webhook trigger is still active and the URL hasn't been regenerated.",
                ],
                [
                  'HTTP 400, `{ ok: false, error: "invalid_submission" }`',
                  "The payload failed Zod validation against `leadSubmissionSchema`. Usually means a form field changed shape without the schema being updated to match.",
                ],
                [
                  'HTTP 413, `{ ok: false, error: "payload_too_large" }`',
                  "The request body exceeded the 16 KB cap. Not expected from the site's own forms; likely a probe or a broken client.",
                ],
              ]}
            />
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