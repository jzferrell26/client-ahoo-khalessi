import { useState } from "react";
import { Link } from "@tanstack/react-router";

const CONSENT_TEXT =
  "I agree to be contacted by CTC Equity / Ahoo Khalessi by phone, text, and email about my free home value report and my inquiry, including via automated technology. Consent is not a condition of any purchase. Message & data rates may apply. See our Privacy Policy & SMS Consent and Terms of Service & SMS Policy.";

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "DC",
];

/**
 * Landing-page form for the mailer QR "free virtual home value / appraisal report".
 * Captures the subject PROPERTY ADDRESS (required to generate a home-value report) plus
 * TCPA consent, and POSTs to the same GHL inbound webhook the site's LeadForm uses.
 * The `source` field lets the GHL workflow route these mailer leads to their own pipeline.
 */
export function HomeValueForm({
  source = "Free Home Value Report — Mailer QR",
}: {
  source?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      FormDataEntryValue
    >;
    const payload = {
      ...data,
      consent: form.querySelector<HTMLInputElement>("#hv-consent")?.checked ?? false,
      submitted_at: new Date().toISOString(),
    };

    // Submit to our server-side proxy (/api/lead), which forwards to the GHL
    // inbound webhook. The webhook URL stays server-side and is never shipped in
    // the client bundle. See /tools/form-to-ghl for the wiring spec.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* fire-and-forget; the server logs any delivery failure */
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
          You're all set — your report is on its way.
        </h3>
        <p style={{ color: "var(--muted-ink)" }}>
          Ahoo and the CTC Equity team will prepare your free home value report and reach out
          shortly with your numbers.
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
        color: "var(--ink)",
      }}
    >
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="report_type" value="Free Virtual Home Value / Appraisal Report" />
      <input type="hidden" name="consent_language" value={CONSENT_TEXT} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <Field label="First name" name="first" required autoComplete="given-name" />
        <Field label="Last name" name="last" required autoComplete="family-name" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>

      <div style={{ marginBottom: 12 }}>
        <Field
          label="Property address"
          name="property_address"
          required
          autoComplete="street-address"
          placeholder="123 Main St"
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr .7fr .7fr",
          gap: 12,
          marginBottom: 4,
        }}
      >
        <Field label="City" name="property_city" required autoComplete="address-level2" />
        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: ".88rem", marginBottom: 6 }}>
            State
          </label>
          <select name="property_state" defaultValue="CA" required style={selectStyle}>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="ZIP"
          name="property_zip"
          required
          inputMode="numeric"
          autoComplete="postal-code"
        />
      </div>

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
        <input id="hv-consent" name="consent" type="checkbox" required style={{ marginTop: 4 }} />
        <span>
          I agree to be contacted by CTC Equity / Ahoo Khalessi by phone, text, and email about my
          free home value report and my inquiry, including via automated technology. Consent is not
          a condition of any purchase. Message &amp; data rates may apply. See our{" "}
          <Link
            to="/privacy"
            target="_blank"
            style={{ color: "var(--navy)", textDecoration: "underline" }}
          >
            Privacy Policy &amp; SMS Consent
          </Link>{" "}
          and{" "}
          <Link
            to="/terms"
            target="_blank"
            style={{ color: "var(--navy)", textDecoration: "underline" }}
          >
            Terms of Service &amp; SMS Policy
          </Link>
          .
        </span>
      </label>

      <button
        className="btn btn-primary"
        type="submit"
        disabled={submitting}
        style={{ width: "100%", justifyContent: "center", marginTop: 18 }}
      >
        {submitting ? "Sending…" : "Get My Free Home Value Report"}
      </button>
      <p style={{ fontSize: ".74rem", color: "var(--muted-ink)", marginTop: 12, lineHeight: 1.5 }}>
        You can opt out anytime: reply <b>STOP</b> to texts or <b>unsubscribe</b> in any email.
        Reply HELP for help. Your report is a no-cost estimate — no obligation.
      </p>
    </form>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: ".7rem .5rem",
  borderRadius: 10,
  border: "1.5px solid var(--line)",
  fontFamily: "var(--body)",
  fontSize: "1rem",
  background: "#fff",
  color: "var(--ink)",
};

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
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
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
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
