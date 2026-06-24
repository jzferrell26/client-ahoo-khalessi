import { useState } from "react";

const CONSENT_TEXT =
  "I agree to be contacted by CTC Equity / Ahoo Khalessi by phone, text, and email about my inquiry, including via automated technology. Consent is not a condition of any purchase. Message & data rates may apply.";

const GOAL_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Tap your equity (keep your first mortgage)",
    options: [
      "HELOC",
      "Fixed second mortgage",
      "DSCR second",
      "Bank statement HELOC",
      "Bank statement fixed second",
      "P&L HELOC or second",
    ],
  },
  {
    label: "Self-employed & alternative income",
    options: ["Bank statement loan", "P&L loan", "1099 income loan", "Stated income", "No-DTI (no debt-to-income) loan"],
  },
  {
    label: "Investor & construction",
    options: ["DSCR purchase or refinance", "Fix & flip", "Bridge loan", "Hard money", "Construction", "Land loan"],
  },
  { label: "Buy a home", options: ["Conventional", "FHA", "VA", "Jumbo"] },
  { label: "Specialty", options: ["Commercial", "Reverse mortgage", "Not sure yet"] },
];

export function LeadForm({ source = "Website — Short Form" }: { source?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, FormDataEntryValue>;
    const payload = {
      ...data,
      consent: form.querySelector<HTMLInputElement>("#lf-consent")?.checked ?? false,
      submitted_at: new Date().toISOString(),
    };

    // Jonathan: set VITE_GHL_INBOUND_WEBHOOK_URL to the GHL inbound webhook URL.
    // See /tools/form-to-ghl for the full wiring spec.
    const webhook = import.meta.env.VITE_GHL_INBOUND_WEBHOOK_URL as string | undefined;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        /* fire-and-forget */
      }
    } else if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.info("[LeadForm] VITE_GHL_INBOUND_WEBHOOK_URL not set. Payload:", payload);
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 28,
          color: "var(--ink)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontFamily: "var(--display)", fontSize: "1.4rem", marginBottom: 10 }}>
          Thanks — your request is on its way.
        </h3>
        <p style={{ color: "var(--muted-ink)" }}>
          Ahoo or a CTC Equity team member will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 28,
        boxShadow: "0 18px 40px rgba(14,42,61,.18)",
      }}
    >
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="consent_language" value={CONSENT_TEXT} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <Field label="First name" name="first" required />
        <Field label="Last name" name="last" required />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <label style={{ display: "block", fontWeight: 600, fontSize: ".9rem", marginBottom: 6 }}>
        What are you looking to do?
      </label>
      <select
        name="goal"
        defaultValue="HELOC"
        style={{
          width: "100%",
          padding: ".7rem .85rem",
          borderRadius: 10,
          border: "1.5px solid var(--line)",
          fontFamily: "var(--body)",
          fontSize: "1rem",
          background: "#fff",
          color: "var(--ink)",
        }}
      >
        {GOAL_GROUPS.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <label
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          marginTop: 16,
          fontSize: ".82rem",
          color: "var(--muted-ink)",
          lineHeight: 1.5,
        }}
      >
        <input id="lf-consent" name="consent" type="checkbox" required style={{ marginTop: 4 }} />
        <span>{CONSENT_TEXT}</span>
      </label>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={submitting}
        style={{ width: "100%", justifyContent: "center", marginTop: 18 }}
      >
        {submitting ? "Sending…" : "Get My Options"}
      </button>
      <p style={{ fontSize: ".74rem", color: "var(--muted-ink)", marginTop: 12, lineHeight: 1.5 }}>
        You can opt out anytime: reply <b>STOP</b> to texts or <b>unsubscribe</b> in any email.
        Reply HELP for help.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: ".88rem", marginBottom: 6 }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        style={{
          width: "100%",
          padding: ".7rem .85rem",
          borderRadius: 10,
          border: "1.5px solid var(--line)",
          fontFamily: "var(--body)",
          fontSize: "1rem",
          background: "#fff",
          color: "var(--ink)",
        }}
      />
    </div>
  );
}