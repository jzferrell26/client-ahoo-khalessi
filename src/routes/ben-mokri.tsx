import { createFileRoute, Link } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/LeadForm";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Ben Mokri | Partner & Executive Loan Officer | CTC Equity";
const DESC = "Meet Ben Mokri, Partner and Executive Loan Officer at CTC Equity, NMLS #2279528, serving residential borrowers across his licensed states and investors nationwide on eligible DSCR and commercial financing.";
const APPLY = "https://benmokri.floify.com/apply-now";
const BOOK = "https://outlook.office.com/bookwithme/user/0b254cf5058d47aca6e262954b39337c@ctcequity.com/meetingtype/HQtsLliNK0OeAseDE6etww2?anonymous&ismsaljsauthenabled&ep=mcard";
const EMC = "https://www.emortgagecapital.com/team/Ben-Mokri-4026?UserId=005Pm00000958z3IAA";
const BEN_ONLY_STATES = ["Georgia", "Idaho", "Illinois", "Indiana", "Maryland", "Minnesota", "Montana", "Nevada", "New Jersey", "North Carolina", "Ohio", "Oregon", "South Carolina", "Texas", "Washington"];

export const Route = createFileRoute("/ben-mokri")({
  head: () => ({
    meta: [{ title: TITLE }, { name: "description", content: DESC }],
    links: [{ rel: "canonical", href: "https://ctcequity.com/ben-mokri" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Ben Mokri", jobTitle: "Partner & Executive Loan Officer", identifier: "NMLS #2279528", telephone: "+1-949-889-2993", email: "bmokri@ctcequity.com", worksFor: { "@id": "https://ctcequity.com/#org" }, sameAs: [EMC] }) }],
  }),
  component: Page,
});

function Page() {
  return <div><SiteNav/><header className="hero-grad" style={{padding:"72px 0"}}><div className="ctc-wrap" style={{display:"grid",gridTemplateColumns:".7fr 1.3fr",gap:42,alignItems:"center"}}><img src="/team/ben.png" alt="Ben Mokri" style={{width:"100%",maxWidth:360,borderRadius:18}}/><div><span className="eyebrow on-dark">CTC Equity leadership</span><h1 style={{fontFamily:"var(--display)",fontSize:"3.2rem",color:"#fff",marginTop:14}}>Ben Mokri</h1><p style={{color:"var(--tiffany-soft)",fontWeight:700,marginTop:8}}>Partner · Executive Loan Officer · NMLS #2279528</p><p style={{color:"var(--muted-on-dark)",lineHeight:1.7,marginTop:18}}>Ben's background spans finance, real estate and architecture. He serves residential borrowers across his licensed states and works with real-estate investors nationwide on eligible DSCR, investment-property, commercial and business-purpose financing through CTC Equity's lender network.</p><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:24}}><a href={APPLY} className="btn btn-primary" target="_blank" rel="noopener">Apply</a><a href={BOOK} className="btn btn-ghost" target="_blank" rel="noopener">Schedule</a><a href={EMC} className="btn btn-ghost" target="_blank" rel="noopener">EMC Profile</a></div></div></div></header><main style={{padding:"60px 0"}}><div className="ctc-wrap-narrow"><h2 style={{fontFamily:"var(--display)",fontSize:"1.8rem"}}>Specialties</h2><p style={{lineHeight:1.8,marginTop:12}}>Ben works across home equity, Non-QM, DSCR, commercial and self-employed financing. His EMC profile includes Top 5% Loan Officer recognition.</p><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:22}}><Link to="/dscr-loans" className="btn">DSCR</Link><Link to="/commercial-loans" className="btn">Commercial</Link><Link to="/bank-statement-loans" className="btn">Bank Statement</Link></div><section style={{marginTop:42}}><h2 style={{fontFamily:"var(--display)",fontSize:"1.8rem"}}>Additional residential states served by Ben</h2><p style={{lineHeight:1.8,marginTop:12}}>Ben's residential licensing adds CTC Equity coverage in the following states beyond Ahoo Khalessi's individual residential licensing footprint. Program and property eligibility still apply.</p><p style={{lineHeight:1.9,marginTop:14,fontWeight:600}}>{BEN_ONLY_STATES.join(" · ")}</p><p style={{lineHeight:1.8,marginTop:14}}>For eligible DSCR, commercial, investment-property, bridge and business-purpose transactions, CTC Equity also works with real-estate investors nationwide through participating lenders. Nationwide investor financing should not be read as residential consumer licensing in every state.</p></section><section style={{marginTop:40}}><LeadForm source="Ben Mokri Profile — Get My Options"/></section></div></main><SiteFooter/></div>;
}