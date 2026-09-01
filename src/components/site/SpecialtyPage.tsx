import { Link } from "@tanstack/react-router";
import { FaqList } from "./FaqList";
import { JsonLd, faqPageSchema, serviceSchema, type FaqItem } from "./JsonLd";
import { LeadForm } from "./LeadForm";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

export type SpecialtyPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  bullets: string[];
  who: string;
  uses: string;
  faq: FaqItem[];
  related: { to: string; label: string }[];
};

export function SpecialtyPage(p: SpecialtyPageProps) {
  return <div><SiteNav />
    <header className="hero-grad" style={{padding:"72px 0 64px"}}><div className="ctc-wrap-narrow">
      <span className="eyebrow on-dark">{p.eyebrow}</span><h1 style={{fontFamily:"var(--display)",fontSize:"clamp(2.2rem,4.6vw,3.5rem)",color:"#fff",marginTop:16}}>{p.title}</h1>
      <p style={{color:"var(--muted-on-dark)",fontSize:"1.1rem",lineHeight:1.65,marginTop:18}}>{p.intro}</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:26}}><Link to="/get-my-options" className="btn btn-primary">Get My Options</Link><a href="tel:+19498777234" className="btn btn-ghost">Call CTC Equity</a></div>
    </div></header>
    <main style={{padding:"60px 0"}}><div className="ctc-wrap-narrow">
      <section><h2 style={{fontFamily:"var(--display)",fontSize:"1.7rem"}}>Key features</h2><ul style={{lineHeight:1.8,marginTop:14}}>{p.bullets.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section style={{marginTop:38}}><h2 style={{fontFamily:"var(--display)",fontSize:"1.7rem"}}>Who this is designed for</h2><p style={{lineHeight:1.75,marginTop:12}}>{p.who}</p></section>
      <section style={{marginTop:38}}><h2 style={{fontFamily:"var(--display)",fontSize:"1.7rem"}}>Property types and uses</h2><p style={{lineHeight:1.75,marginTop:12}}>{p.uses}</p></section>
      <section style={{marginTop:38}}><h2 style={{fontFamily:"var(--display)",fontSize:"1.7rem"}}>Common questions</h2><FaqList items={p.faq} /></section>
      <section style={{marginTop:38}}><h2 style={{fontFamily:"var(--display)",fontSize:"1.5rem"}}>Related financing</h2><div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:14}}>{p.related.map(r=><Link key={r.to} to={r.to} className="btn">{r.label}</Link>)}</div></section>
      <section style={{marginTop:44,background:"var(--sand)",padding:28,borderRadius:18}}><h2 style={{fontFamily:"var(--display)",fontSize:"1.7rem"}}>Tell us your scenario</h2><p style={{margin:"8px 0 18px",lineHeight:1.6}}>CTC Equity compares your scenario across its lender network. Program availability, pricing, leverage and documentation requirements vary by lender, borrower and property.</p><LeadForm source={`Specialty Page — ${p.title}`} /></section>
    </div></main>
    <JsonLd data={serviceSchema(p.title,p.description)} /><JsonLd data={faqPageSchema(p.faq)} /><SiteFooter />
  </div>;
}
