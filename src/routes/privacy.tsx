import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Privacy Policy & SMS Consent | Coast to Coast Equity";
const DESC =
  "How Coast to Coast Equity (CTC Equity) collects, uses, and protects your information, plus our SMS/text messaging consent and opt-out policy.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main className="ctc-wrap section" style={{ maxWidth: 820 }}>
        <p className="eyebrow">Legal</p>
        <h1 style={{ fontFamily: "var(--display)", fontSize: "2.25rem", marginBottom: 8 }}>
          Privacy Policy & SMS Consent
        </h1>
        <p style={{ color: "var(--muted-ink)" }}>Last updated: June 25, 2026</p>

        <section style={{ marginTop: 28, lineHeight: 1.65 }}>
          <h2>Who we are</h2>
          <p>
            Coast to Coast Equity ("CTC Equity", "we", "us") is a DBA of EMortgage
            Capital, Inc. (NMLS #1416824). Our office is at 3750 S Susan St, Orange County,
            CA 92704. You can reach us at{" "}
            <a href="tel:+19498777234">(949) 877-7234</a> or{" "}
            <a href="mailto:akhalessi@ctcequity.com">akhalessi@ctcequity.com</a>.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <b>Contact information</b> you submit through our forms: name, phone
              number, email, and the loan goal you select.
            </li>
            <li>
              <b>Loan-application information</b> you provide when you complete a full
              application through our secure intake portal (Floify).
            </li>
            <li>
              <b>Usage data</b> automatically collected when you visit the site, such as
              IP address, browser type, pages viewed, and referring URLs.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your inquiry and present loan options.</li>
            <li>To process and underwrite a loan application you submit.</li>
            <li>
              To send transactional and marketing communications about mortgage
              programs, rates, and updates relevant to your inquiry.
            </li>
            <li>To comply with federal, state, and lender requirements.</li>
          </ul>

          <h2>How we share your information</h2>
          <p>
            We share your information only with: (a) EMortgage Capital, Inc. and its
            staff supporting your loan; (b) lenders, investors, and service providers
            necessary to process your loan; and (c) regulators or others as required by
            law. <b>We do not sell your personal information, and we do not share your
            phone number or SMS opt-in data with third parties for their marketing
            purposes.</b>
          </p>

          <h2>SMS / text messaging consent</h2>
          <p>
            By checking the consent box on our forms or by texting us first, you agree
            to receive SMS/text messages from CTC Equity and Ahoo Khalessi about your
            inquiry, application status, rate updates, appointment reminders, and
            related loan information. Messages may be sent using automated technology.
          </p>
          <ul>
            <li>
              <b>Consent is not a condition of any purchase, application, or service.</b>
            </li>
            <li>Message frequency varies. Message and data rates may apply.</li>
            <li>
              Reply <b>STOP</b> at any time to opt out of further text messages. Reply{" "}
              <b>HELP</b> for help. You can also email us to revoke consent.
            </li>
            <li>
              Mobile carriers are not liable for delayed or undelivered messages.
            </li>
            <li>
              Your mobile number and SMS opt-in status are not sold, rented, or shared
              with third parties for their marketing.
            </li>
          </ul>

          <h2>Email communications</h2>
          <p>
            You may unsubscribe from marketing emails at any time using the link at the
            bottom of any email. Transactional messages tied to an active loan
            application may continue as needed to service your file.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain inquiry and application data for as long as needed to service
            your request and to meet legal, regulatory, and lender record-keeping
            requirements.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, or
            request deletion of your personal information. To make a request, email{" "}
            <a href="mailto:akhalessi@ctcequity.com">akhalessi@ctcequity.com</a>.
          </p>

          <h2>Security</h2>
          <p>
            We use commercially reasonable safeguards to protect the information you
            submit. No method of transmission over the internet is 100% secure.
          </p>

          <h2>Children</h2>
          <p>Our site is not directed to children under 13, and we do not knowingly collect their data.</p>

          <h2>Changes</h2>
          <p>
            We may update this policy from time to time. The "Last updated" date above
            reflects the most recent revision.
          </p>

          <h2>Contact</h2>
          <p>
            Coast to Coast Equity — a DBA of EMortgage Capital, Inc.<br />
            3750 S Susan St, Orange County, CA 92704<br />
            (949) 877-7234 ·{" "}
            <a href="mailto:akhalessi@ctcequity.com">akhalessi@ctcequity.com</a>
          </p>

          <p style={{ marginTop: 24 }}>
            See also our{" "}
            <Link to="/terms" style={{ color: "var(--navy)" }}>
              Terms of Service & SMS Policy
            </Link>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}