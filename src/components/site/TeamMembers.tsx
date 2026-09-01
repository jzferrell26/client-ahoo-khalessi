import { Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/site/JsonLd";
import { APPLY_NOW_AHOO } from "@/components/site/SiteNav";

const EMC_SITE = "https://www.emortgagecapital.com";
const CTC_OFFICE_PHONE = "(877) 227-0477";
const EMC_PROFILES = {
  ahoo: `${EMC_SITE}/team/Ahoo-Khalessi-3928`,
  ben: `${EMC_SITE}/team/Ben-Mokri-4026?UserId=005Pm00000958z3IAA`,
};

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  nmls?: string;
  phone: string;
  email?: string;
  apply?: string;
  booking?: string;
  emcProfile?: string;
  profile?: "/ahoo-khalessi" | "/ben-mokri";
  photo?: string;
  bio?: string;
  awards?: { label: string; detail?: string; source: "emc" | "client" }[];
  certifications?: string[];
};

type VisualOnlyMember = {
  name: string;
  role: string;
  photo: string;
};

const TEAM_LEADS: TeamMember[] = [
  {
    name: "Ahoo Khalessi",
    role: "Division Manager · Loan Officer",
    initials: "AK",
    photo: "/team/ahoo.png",
    nmls: "NMLS #2239510",
    phone: "(949) 877-7234",
    email: "akhalessi@ctcequity.com",
    apply: APPLY_NOW_AHOO,
    emcProfile: EMC_PROFILES.ahoo,
    profile: "/ahoo-khalessi",
    booking: "https://bookings.cloud.microsoft/book/AhooKhalessi@emortgagecapital.com/",
    bio: "Started the home equity department at Rocket Mortgage as top producer, then made home equity her wholesale specialty. Places HELOCs and fixed seconds up to $4M. Scotsman Guide Top Originator, EMC Top 5% Loan Officer (2025), top 5% nationally.",
    awards: [
      { label: "Scotsman Guide Top Originator", source: "client" },
      { label: "EMC Top 5% Loan Officer, Volume", detail: "2025", source: "emc" },
      { label: "EMC Top 5% Loan Officer, Units", detail: "2025", source: "emc" },
      { label: "EMC Top 10% Loan Officer, Units", detail: "Q1 2026", source: "client" },
    ],
    certifications: ["HELOC", "Non-QM", "VA"],
  },
  {
    name: "Ben Mokri",
    role: "Partner · Executive Loan Officer",
    initials: "BM",
    photo: "/team/ben.png",
    nmls: "NMLS #2279528",
    phone: "(949) 889-2993",
    email: "bmokri@ctcequity.com",
    apply: "https://benmokri.floify.com/apply-now",
    booking: "https://outlook.office.com/bookwithme/user/0b254cf5058d47aca6e262954b39337c@ctcequity.com/meetingtype/HQtsLliNK0OeAseDE6etww2?anonymous&ismsaljsauthenabled&ep=mcard",
    emcProfile: EMC_PROFILES.ben,
    profile: "/ben-mokri",
    bio: "Partner at CTC Equity and an Executive Loan Officer, with a background spanning finance, real estate, and architecture. Ben serves residential borrowers across his licensed states and works with real-estate investors nationwide on eligible DSCR, investment-property, commercial, and business-purpose financing through CTC Equity's lender network.",
    awards: [{ label: "EMC Top 5% Loan Officer", source: "emc" }],
    certifications: ["Non-QM", "Challenged Credit", "HELOAN"],
  },
];

const TEAM_SUPPORT: TeamMember[] = [
  {
    name: "Bobby Khalessi",
    role: "Mortgage Loan Officer",
    initials: "BK",
    photo: "/team/bobby.png",
    nmls: "NMLS #1901225",
    phone: "(949) 413-9332",
    bio: "An analytical wholesale loan officer who compares a wide lender network for each scenario. Bobby focuses on careful loan structure, long-term portfolio planning, and keeping borrowers' options open from application through closing.",
    apply: APPLY_NOW_AHOO,
    booking: "#",
    certifications: ["Conventional"],
  },
];

const VISUAL_ONLY_TEAM: VisualOnlyMember[] = [
  { name: "Susan O'Donovan", role: "Loan Officer", photo: "/team/susan.png" },
  { name: "Dong-Jin Kim", role: "Loan Officer", photo: "/team/dong-jin.png" },
];

const TEAM_ROSTER: TeamMember[] = [...TEAM_LEADS, ...TEAM_SUPPORT];
const TEAM_URL = "https://ctcequity.com/team";

export function TeamSchema({ title, description }: { title: string; description: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${TEAM_URL}#page`,
            url: TEAM_URL,
            name: title,
            description,
            isPartOf: { "@id": "https://ctcequity.com/#website" },
            mainEntity: { "@id": `${TEAM_URL}#team-list` },
          },
          {
            "@type": "ItemList",
            "@id": `${TEAM_URL}#team-list`,
            name: "CTC Equity loan officers",
            numberOfItems: TEAM_ROSTER.length,
            itemListElement: TEAM_ROSTER.map((member, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: { "@id": personId(member.name) },
            })),
          },
          ...TEAM_ROSTER.map((member) => ({
            "@type": "Person",
            "@id": personId(member.name),
            name: member.name,
            jobTitle: member.role.replaceAll(" · ", ", "),
            image: member.photo ? new URL(member.photo, TEAM_URL).href : undefined,
            telephone: member.phone,
            email: member.email ? `mailto:${member.email}` : undefined,
            identifier: member.nmls,
            worksFor: { "@id": "https://ctcequity.com/#org" },
            sameAs: member.emcProfile ? [member.emcProfile] : undefined,
          })),
        ],
      }}
    />
  );
}

function personId(name: string) {
  return `${TEAM_URL}#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function TeamMembers() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
        {TEAM_LEADS.map((m) => <TeamCard key={m.name} member={m} variant="lead" />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(0, 1fr))", gap: 20, marginTop: 20 }}>
        {TEAM_SUPPORT.map((m) => <TeamCard key={m.name} member={m} variant="member" />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginTop: 20 }}>
        {VISUAL_ONLY_TEAM.map((m) => <VisualOnlyCard key={m.name} member={m} />)}
      </div>
      <TeamEmcStrip />
    </>
  );
}

function TeamEmcStrip() {
  const linked = TEAM_ROSTER.filter((m) => m.emcProfile);
  return (
    <div style={{ marginTop: 26, fontFamily: "var(--mono)", fontSize: ".76rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted-ink)", display: "flex", flexWrap: "wrap", gap: "6px 16px", alignItems: "center" }}>
      <span>Our team on EMortgage Capital:</span>
      {linked.map((m) => (
        <a key={m.name} href={m.emcProfile} target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "none" }}>
          {m.name} ↗
        </a>
      ))}
    </div>
  );
}

function VisualOnlyCard({ member }: { member: VisualOnlyMember }) {
  return (
    <article style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <picture style={{ display: "block", width: 56, height: 56, flex: "none" }}>
          <source srcSet={member.photo.replace(/\.png$/, ".avif")} type="image/avif" />
          <source srcSet={member.photo.replace(/\.png$/, ".webp")} type="image/webp" />
          <img src={member.photo} alt={`${member.name} headshot`} width={56} height={56} loading="lazy" decoding="async" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: "50%" }} />
        </picture>
        <div>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.18rem" }}>{member.name}</h3>
          <div style={{ color: "var(--cyan)", fontWeight: 600, fontSize: ".88rem" }}>{member.role}</div>
        </div>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: ".8rem", color: "var(--muted-ink)" }}>
        CTC Equity office · <a href="tel:+18772270477" style={{ color: "var(--cyan)" }}>{CTC_OFFICE_PHONE}</a>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a className="btn btn-primary" href={APPLY_NOW_AHOO} target="_blank" rel="noopener noreferrer" style={{ padding: ".55rem 1rem" }}>Apply now</a>
        <Link className="btn btn-dark" to="/get-my-options" style={{ padding: ".55rem 1rem" }}>Get My Options</Link>
      </div>
    </article>
  );
}

function TeamCard({ member, variant = "member" }: { member: TeamMember; variant?: "lead" | "member" }) {
  const { name, role, initials, nmls, phone, email, apply, booking, emcProfile, profile, photo, bio, awards, certifications } = member;
  const isLead = variant === "lead";
  const avatar = isLead ? 88 : 64;

  return (
    <article style={{ background: "#fff", border: isLead ? "1px solid var(--tiffany)" : "1px solid var(--line)", borderRadius: 18, padding: isLead ? 32 : 26, display: "flex", flexDirection: "column", gap: 14, boxShadow: isLead ? "0 10px 30px rgba(14,42,61,.08)" : "none" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {photo ? (
          <picture style={{ display: "block", width: avatar, height: avatar, flex: "none" }}>
            <source srcSet={photo.replace(/\.png$/, ".avif")} type="image/avif" />
            <source srcSet={photo.replace(/\.png$/, ".webp")} type="image/webp" />
            <img src={photo} alt={`${name} headshot`} width={avatar} height={avatar} loading="lazy" decoding="async" style={{ width: avatar, height: avatar, objectFit: "cover", borderRadius: "50%" }} />
          </picture>
        ) : (
          <div style={{ width: avatar, height: avatar, borderRadius: 14, background: "linear-gradient(135deg,var(--tiffany),var(--teal))", color: "#fff", fontFamily: "var(--display)", fontWeight: 800, fontSize: isLead ? "1.8rem" : "1.4rem", display: "grid", placeItems: "center", flex: "none" }}>{initials}</div>
        )}
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontFamily: "var(--display)", fontSize: isLead ? "1.6rem" : "1.4rem" }}>{name}</h3>
          <div style={{ color: "var(--cyan)", fontWeight: 600, fontSize: isLead ? ".95rem" : ".9rem" }}>{role}</div>
        </div>
      </div>
      {bio && <p style={{ color: "#33485a", lineHeight: 1.6, fontSize: isLead ? "1rem" : ".95rem" }}>{bio}</p>}
      {awards && awards.length > 0 && (
        <ul aria-label={`${name} recognition`} style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
          {awards.map((a) => (
            <li key={a.label} style={{ display: "flex", gap: 8, alignItems: "baseline", fontSize: isLead ? ".92rem" : ".88rem", color: "#33485a", lineHeight: 1.45 }}>
              <span aria-hidden="true" style={{ color: "var(--tiffany)", fontWeight: 700 }}>&#9733;</span>
              <span>{a.label}{a.detail && <span style={{ color: "var(--muted-ink)" }}> &middot; {a.detail}</span>}</span>
            </li>
          ))}
        </ul>
      )}
      {certifications && certifications.length > 0 && (
        <div aria-label={`${name} certifications`} style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {certifications.map((c) => <span key={c} style={{ fontFamily: "var(--mono)", fontSize: ".68rem", letterSpacing: ".05em", padding: ".28rem .6rem", borderRadius: 999, border: "1px solid var(--line)", color: "var(--muted-ink)", fontWeight: 600 }}>{c}</span>)}
        </div>
      )}
      <div style={{ fontFamily: "var(--mono)", fontSize: ".82rem", color: "var(--muted-ink)", overflowWrap: "anywhere" }}>
        {nmls ? `${nmls} · ${phone}` : phone}
        {email && <><br /><a href={`mailto:${email}`} style={{ color: "var(--cyan)" }}>{email}</a></>}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {profile && <Link className="btn btn-dark" to={profile} style={{ padding: ".6rem 1.1rem" }}>View {name.split(" ")[0]}'s profile</Link>}
        {apply && <a className="btn btn-primary" href={apply} target="_blank" rel="noopener noreferrer" style={{ padding: ".6rem 1.1rem" }}>Apply with {name.split(" ")[0]}</a>}
        {booking && <a className="btn btn-dark" href={booking} target={booking === "#" ? undefined : "_blank"} rel={booking === "#" ? undefined : "noopener noreferrer"} aria-disabled={booking === "#" ? true : undefined} onClick={booking === "#" ? (event) => event.preventDefault() : undefined} style={{ padding: ".6rem 1.1rem", cursor: booking === "#" ? "default" : undefined }}>Book an appointment ↗</a>}
      </div>
      {emcProfile && <a href={emcProfile} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--mono)", fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--cyan)", textDecoration: "none" }}>EMC profile &amp; awards ↗</a>}
    </article>
  );
}
