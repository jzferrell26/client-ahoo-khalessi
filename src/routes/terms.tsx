import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Terms of Service & SMS Policy | Coast to Coast Equity";
const DESC =
  "Terms governing the use of the Coast to Coast Equity (CTC Equity) website, lead forms, and SMS/text messaging program.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <SiteNav />
      <main className="ctc-wrap section" style={{ maxWidth: 820 }}>
        <p className="eyebrow">Legal</p>
        <h1 style={{ fontFamily: "var(--display)", fontSize: "2.25rem", marginBottom: 8 }}>
          Terms of Service & SMS Policy
        </h1>
        <p style={{ color: "var(--muted-ink)" }}>Last updated: June 25, 2026</p>

        <section style={{ marginTop: 28, lineHeight: 1.65 }}>
          <h2>Acceptance of terms</h2>
          <p>
            By accessing the Coast to Coast Equity ("CTC Equity") website, submitting a
            form, or opting in to our SMS messaging program, you agree to these Terms
            of Service. If you do not agree, please do not use the site or services.
          </p>

          <h2>About us</h2>
          <p>
            CTC Equity is a DBA of EMortgage Capital, Inc. (Company NMLS #1416824).
            Ahoo Khalessi, NMLS #2239510. Ben Mokri, NMLS #2279528. Equal Housing
            Lender. Verify licensing at{" "}
            <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener">
              nmlsconsumeraccess.org
            </a>
            .
          </p>

          <h2>Not a commitment to lend</h2>
          <p>
            Nothing on this site is an offer or commitment to lend. Loan approval,
            rates, terms, and program availability are subject to credit review,
            property qualification, lender guidelines, and applicable law, and are
            subject to change without notice.
          </p>

          <h2>Use of the site</h2>
          <ul>
            <li>You agree to provide accurate information on any form you submit.</li>
            <li>
              You may not use the site to submit false applications, attempt to gain
              unauthorized access, or interfere with site operations.
            </li>
            <li>
              Content on the site (text, graphics, logos) is owned by CTC Equity or its
              licensors and may not be copied or redistributed without permission.
            </li>
          </ul>

          <h2>SMS / text messaging program</h2>
          <p>
            When you check the SMS consent box on our forms or text us first, you
            consent to receive recurring SMS/text messages from CTC Equity and Ahoo
            Khalessi regarding your inquiry, application status, rate alerts,
            appointment reminders, and related mortgage information. Messages may be
            sent using automated technology.
          </p>
          <ul>
            <li>
              <b>Consent is not a condition of any purchase, service, or application.</b>
            </li>
            <li>Message frequency varies based on your activity with us.</li>
            <li>Message and data rates may apply.</li>
            <li>
              Reply <b>STOP</b> to cancel at any time. Reply <b>HELP</b> for help, or
              contact us at (949) 877-7234.
            </li>
            <li>
              Supported carriers include AT&T, T-Mobile, Verizon Wireless, Sprint, and
              most major U.S. carriers. Carriers are not liable for delayed or
              undelivered messages.
            </li>
            <li>
              <b>We do not sell, rent, or share your mobile number or SMS opt-in data
              with third parties for their marketing purposes.</b>
            </li>
          </ul>

          <h2>TCPA consent language</h2>
          <p>
            By submitting a form on this site, you expressly consent to be contacted by
            CTC Equity and Ahoo Khalessi by phone, text, and email at the contact
            information you provided, including via an automatic telephone dialing
            system or prerecorded/artificial voice, about your inquiry and related loan
            programs, even if your number is on a state or federal Do-Not-Call list.
            Consent is not a condition of any purchase. You may opt out at any time.
          </p>

          <h2>Third-party links and tools</h2>
          <p>
            We link to third-party tools (for example, our Floify loan application
            portal and our online booking system). Their terms and privacy policies
            govern your use of those services.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The site is provided "as is." We make no warranties, express or implied,
            about the accuracy or completeness of information on the site. Nothing on
            this site constitutes legal, tax, or financial advice.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, CTC Equity and EMortgage Capital,
            Inc. are not liable for any indirect, incidental, special, or consequential
            damages arising out of your use of the site or SMS program.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of California, without
            regard to its conflict-of-law rules.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these Terms at any time. Continued use of the site after
            changes are posted constitutes acceptance of the revised Terms.
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
            <Link to="/privacy" style={{ color: "var(--navy)" }}>
              Privacy Policy & SMS Consent
            </Link>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}