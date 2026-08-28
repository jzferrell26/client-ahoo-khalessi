import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { AvmOfficer } from "@/components/site/avm-officers";
import { BotTrap } from "@/components/site/BotTrap";

function buildConsentText(contactName: string) {
  return `I agree to be contacted by CTC Equity / ${contactName} by phone, text message, and email regarding my Free Home Value Report, my inquiry, mortgage financing options, home equity solutions, refinancing opportunities, and other loan products and services that may be available to me, including through automated technology. Consent is not a condition of purchase. Message and data rates may apply.`;
}

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
  noticeNumber = false,
  officer,
}: {
  source?: string;
  /** Officer-specific display and routing data. Omitted on shared pages. */
  officer?: AvmOfficer;
  /**
   * Show the "code from your mailer" field. Used by the /avm campaign landing page
   * so a QR scan can be tied back to the exact recipient the piece was mailed to.
   * Off by default so the organic /free-home-value-report page is unchanged.
   */
  noticeNumber?: boolean;
}) {
  const formStartedAt = useRef(Date.now());
  const effectiveSource = officer?.source ?? source;
  const consentText = buildConsentText(officer?.name ?? "Ahoo Khalessi");
  const callbackPhone = officer?.phoneLabel ?? "(949) 877-7234";
  const confirmationName = officer?.firstName ?? "Ahoo";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noticeValue, setNoticeValue] = useState("");

  // Allow the code to be pre-filled from the QR URL (e.g. /avm?n=TX45210) so the
  // borrower does not have to retype it. They can still edit or clear it.
  useEffect(() => {
    if (!noticeNumber || typeof window === "undefined") return;
    const fromUrl = new URLSearchParams(window.location.search).get("n");
    if (fromUrl) setNoticeValue(fromUrl.trim().slice(0, 64).toUpperCase());
  }, [noticeNumber]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      FormDataEntryValue
    >;
    const payload: Record<string, unknown> = {
      ...data,
      consent: form.querySelector<HTMLInputElement>("#hv-consent")?.checked ?? false,
      form_started_at: new Date(formStartedAt.current).toISOString(),
      submitted_at: new Date().toISOString(),
    };
    // Never forward an empty code — the field is optional and GHL should see it
    // absent rather than blank.
    if (typeof payload.notice_number === "string" && payload.notice_number.trim() === "") {
      delete payload.notice_number;
    }

    // Submit to our server-side proxy (/api/lead), which forwards to the GHL
    // inbound webhook. The webhook URL stays server-side and is never shipped in
    // the client bundle. See /tools/form-to-ghl for the wiring spec.
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean };
      if (!response.ok || !result.ok) throw new Error("Lead delivery failed");
    } catch {
      setSubmitting(false);
      setError(`We couldn't send your request yet. Please try again or call ${callbackPhone}.`);
      return;
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
          {confirmationName} and the CTC Equity team will prepare your free home value report and
          reach out shortly with your numbers.
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
      <input type="hidden" name="source" value={effectiveSource} />
      <input type="hidden" name="lead_kind" value="avm_report_request" />
      <input type="hidden" name="lead_source" value="AVM Report Request" />
      {officer && <input type="hidden" name="assigned_lo" value={officer.assignedLo} />}
      <input type="hidden" name="campaign" value="CTC Mailer QR" />
      <input type="hidden" name="report_type" value="Free Virtual Home Value / Appraisal Report" />
      <input type="hidden" name="consent_language" value={consentText} />
      <BotTrap />

      {noticeNumber && (
        <div
          style={{
            background: "var(--sand, #f5f1ea)",
            border: "1.5px solid var(--line)",
            borderRadius: 12,
            padding: "14px 16px",
            marginBottom: 16,
          }}
        >
          <label
            htmlFor="hv-notice"
            style={{ display: "block", fontWeight: 700, fontSize: ".88rem", marginBottom: 6 }}
          >
            Code from your mailer <span style={{ fontWeight: 500 }}>(optional)</span>
          </label>
          <input
            id="hv-notice"
            name="notice_number"
            type="text"
            value={noticeValue}
            onChange={(e) => setNoticeValue(e.target.value.toUpperCase())}
            autoComplete="off"
            placeholder="e.g. TX45210"
            style={{
              width: "100%",
              padding: ".7rem .85rem",
              borderRadius: 10,
              border: "1.5px solid var(--line)",
              fontFamily: "var(--mono)",
              fontSize: "1rem",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              background: "#fff",
              color: "var(--ink)",
            }}
          />
          <p
            style={{
              fontSize: ".74rem",
              color: "var(--muted-ink)",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            Entering the code printed on your letter lets us pull up your property details
            instantly. Don't have it handy? Just leave it blank.
          </p>
        </div>
      )}

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
          <label
            htmlFor="property_state"
            style={{ display: "block", fontWeight: 600, fontSize: ".88rem", marginBottom: 6 }}
          >
            State
          </label>
          <select
            id="property_state"
            name="property_state"
            defaultValue="CA"
            required
            style={selectStyle}
          >
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
          {consentText} See our{" "}
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
        {submitting ? "Sending…" : "Get a copy of your complimentary virtual appraisal report"}
      </button>
      {error && (
        <p role="alert" style={{ color: "#a61b1b", fontWeight: 600, marginTop: 12 }}>
          {error}
        </p>
      )}
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
      <label
        htmlFor={name}
        style={{ display: "block", fontWeight: 600, fontSize: ".88rem", marginBottom: 6 }}
      >
        {label}
      </label>
      <input
        id={name}
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
