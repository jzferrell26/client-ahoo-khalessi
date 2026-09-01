import { createFileRoute } from "@tanstack/react-router";
import { SpecialtyPage } from "@/components/site/SpecialtyPage";

const TITLE = "Business-Purpose Bridge & Real Estate Equity Loans | CTC Equity";
const DESC = "Use eligible real-estate equity for business-purpose financing, working capital, expansion, investment or time-sensitive transactions through CTC Equity's nationwide lender network.";

export const Route = createFileRoute("/business-purpose-bridge-loans")({
  head: () => ({
    meta: [{ title: TITLE }, { name: "description", content: DESC }],
    links: [{ rel: "canonical", href: "https://ctcequity.com/business-purpose-bridge-loans" }],
  }),
  component: Page,
});

function Page() {
  return <SpecialtyPage
    eyebrow="Nationwide investor & business-purpose financing"
    title="Turn Your Real Estate Equity Into Business Capital"
    description={DESC}
    intro="Starting a business? Getting back into business? Expanding an existing business? Your property's equity may help fund the next move. CTC Equity compares eligible business-purpose, bridge, private and commercial structures across a broad lender network."
    bullets={[
      "Access eligible real-estate equity for business investment, working capital, expansion, equipment, inventory, real-estate investment and other permitted uses",
      "Programs may be available for newly established or returning business owners without a lengthy operating history",
      "EIN-based and alternative-qualification programs may be available depending on the lender, collateral and transaction",
      "Options can include short-term bridge financing, first liens, second liens and other eligible business-purpose structures",
      "Alternative income documentation, challenged credit and equity-focused programs may be available for qualifying scenarios",
      "Permitted use of proceeds varies by lender, program and transaction; no fixed percentage is represented"
    ]}
    who="Real-estate investors and business owners who have eligible real-estate equity and need capital for a business or investment objective, including a new business, a return to business ownership, expansion or a time-sensitive transaction."
    uses="Depending on lender and transaction guidelines, proceeds may support business investment, working capital, expansion, equipment, inventory, acquiring or improving real estate and other eligible uses. Consumer-purpose owner-occupied transactions require different programs."
    faq={[
      { q: "Can I use real-estate equity to start or restart a business?", a: "Potentially. Eligible business-purpose programs may be available for newly established or returning business owners. Some lenders offer EIN-based or alternative qualification without requiring a lengthy operating history, subject to the full transaction and program requirements." },
      { q: "Do all of the loan proceeds have to be used for the business?", a: "Not necessarily. Permitted use of proceeds varies by lender, program and transaction. We'll review your goals and determine which eligible financing structure fits." },
      { q: "Do business-purpose loans require tax returns?", a: "Not always. Some programs focus more heavily on collateral, equity, business purpose and exit strategy, while others require income or financial documentation." },
      { q: "Can I keep my existing first mortgage?", a: "In some eligible scenarios, a business-purpose second-lien structure may allow the existing first mortgage to remain in place. Availability depends on property, equity, purpose and lender." },
      { q: "What can business-purpose financing be used for?", a: "Eligible uses can include business investment, working capital, expansion, equipment, inventory, real-estate investment and other lender-permitted business purposes." },
      { q: "How is a bridge loan repaid?", a: "Common exits include sale of a property, completion of a renovation or stabilization plan, business cash flow, or refinance into longer-term financing. The exit must fit lender requirements." }
    ]}
    related={[
      { to: "/commercial-loans", label: "Commercial Loans" },
      { to: "/dscr-loans", label: "DSCR" },
      { to: "/equity-based-loans-low-credit", label: "Equity-Based Options" },
      { to: "/get-my-options", label: "Get My Options" }
    ]}
  />;
}