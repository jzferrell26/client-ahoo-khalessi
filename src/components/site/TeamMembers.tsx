import { JsonLd } from "@/components/site/JsonLd";
import { APPLY_NOW_AHOO } from "@/components/site/SiteNav";

/**
 * Single source of truth for the CTC Equity team roster.
 *
 * Consumed by BOTH the homepage `#team` section (src/routes/index.tsx) and the
 * standalone `/team` route (src/routes/team.tsx), so the confirmed member order
 * — Ahoo, Ben, Bobby, Susan, Dong-Jin — is defined in exactly one place.
 *
 * Member copy (names, roles, NMLS strings, phone numbers, bios, headshot paths)
 * is relocated verbatim from src/routes/index.tsx. Do not edit it here as a side
 * effect of a layout change: the homepage carries the LLM content that is
 * earning citations, and bio copy is owned by prd-001d.
 */

const EMC_SITE = "https://www.emortgagecapital.com";

const EMC_PROFILES = {
  ahoo: `${EMC_SITE}/team/Ahoo-Khalessi-3928`,
  ben: `${EMC_SITE}/team/Ben-Mokri-4026?UserId=005Pm00000958z3IAA`,
  dongJin: `${EMC_SITE}/team/Dong-Jin-Kim-4233?UserId=005Pm000008swaHIAQ`,
  susan: `${EMC_SITE}/team/Susan-ODonovan-5067?UserId=005Pm000009YufJIAS`,
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
  photo?: string;
  bio?: string;
};

/** Team leads. Rendered side by side, above the rest, at a larger card size. */
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
    // TODO: confirm and update Microsoft Bookings URL.
    booking: "https://bookings.cloud.microsoft/book/AhooKhalessi@emortgagecapital.com/",
    bio: "Started the home equity department at Rocket Mortgage as top producer, then made home equity her wholesale specialty. Places HELOCs and fixed seconds up to $4M. Scotsman Guide Top Originator, EMC Top 5% Loan Officer (2025), top 5% nationally.",
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
    emcProfile: EMC_PROFILES.ben,
    // TODO: add Ben's Microsoft Bookings URL when provided.
    bio: "Partner at CTC Equity working alongside Ahoo on equity, DSCR, and self-employed financing for investors and business owners nationwide.",
  },
];

/**
 * The remaining loan officers, rendered below the leads.
 * Order is Bobby, Susan, Dong-Jin. Susan now precedes Dong-Jin, which is the
 * correction the client confirmed.
 */
const TEAM_SUPPORT: TeamMember[] = [
  {
    name: "Bobby Khalessi",
    role: "Mortgage Loan Officer",
    initials: "BK",
    photo: "/team/bobby.png",
    phone: "(949) 413-9332",
    // TODO: add Bobby's NMLS number after CTC confirms it.
    bio: "An analytical wholesale loan officer who compares a wide lender network for each scenario. Bobby focuses on careful loan structure, long-term portfolio planning, and keeping borrowers' options open from application through closing.",
  },
  {
    name: "Susan O'Donovan",
    role: "Loan Officer",
    initials: "SO",
    photo: "/team/susan.png",
    nmls: "NMLS #2302891",
    phone: "(949) 441-6545",
    emcProfile: EMC_PROFILES.susan,
    // Per the 2026-08-27 call: Susan and James route through Ahoo's application
    // link so every team card has a congruent "Apply" action.
    apply: APPLY_NOW_AHOO,
  },
  {
    name: "Dong-Jin Kim",
    role: "Loan Officer",
    initials: "DK",
    photo: "/team/dong-jin.png",
    nmls: "NMLS #2615439",
    phone: "(510) 925-5490",
    emcProfile: EMC_PROFILES.dongJin,
    // Per the 2026-08-27 call: Susan and James route through Ahoo's application
    // link so every team card has a congruent "Apply" action.
    apply: APPLY_NOW_AHOO,
  },
];

/** Canonical top-to-bottom render order: Ahoo, Ben, Bobby, Susan, Dong-Jin. */
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
  return `${TEAM_URL}#${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

/**
 * The team roster: two leads in a horizontal row at a larger card size, the
 * remaining three below, then the EMortgage Capital profile strip.
 *
 * At <=900px the global rule in src/styles.css collapses every inline
 * `grid-template-columns` to `1fr`, so both grids stack to a single column and
 * the DOM order above is exactly what a 390px viewport renders, with no
 * horizontal overflow.
 */
export function TeamMembers() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
        {TEAM_LEADS.map((m) => (
          <TeamCard key={m.name} member={m} variant="lead" />
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {TEAM_SUPPORT.map((m) => (
          <TeamCard key={m.name} member={m} variant="member" />
        ))}
      </div>
      <TeamEmcStrip />
    </>
  );
}

/** The "Our team on EMortgage Capital" link strip, ordered off TEAM_ROSTER. */
function TeamEmcStrip() {
  const linked = TEAM_ROSTER.filter((m) => m.emcProfile);
  return (
    <div
      style={{
        marginTop: 26,
        fontFamily: "var(--mono)",
        fontSize: ".76rem",
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--muted-ink)",
        display: "flex",
        flexWrap: "wrap",
        gap: "6px 16px",
        alignItems: "center",
      }}
    >
      <span>Our team on EMortgage Capital:</span>
      {linked.map((m) => (
        <a
          key={m.name}
          href={m.emcProfile}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--cyan)", textDecoration: "none" }}
        >
          {m.name} ↗
        </a>
      ))}
    </div>
  );
}

function TeamCard({
  member,
  variant = "member",
}: {
  member: TeamMember;
  variant?: "lead" | "member";
}) {
  const { name, role, initials, nmls, phone, email, apply, booking, emcProfile, photo, bio } =
    member;
  const isLead = variant === "lead";
  const avatar = isLead ? 88 : 64;

  return (
    <article
      style={{
        background: "#fff",
        border: isLead ? "1px solid var(--tiffany)" : "1px solid var(--line)",
        borderRadius: 18,
        padding: isLead ? 32 : 26,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: isLead ? "0 10px 30px rgba(14,42,61,.08)" : "none",
      }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {photo ? (
          <picture style={{ display: "block", width: avatar, height: avatar, flex: "none" }}>
            <source srcSet={photo.replace(/\.png$/, ".avif")} type="image/avif" />
            <source srcSet={photo.replace(/\.png$/, ".webp")} type="image/webp" />
            <img
              src={photo}
              alt={`${name} headshot`}
              width={avatar}
              height={avatar}
              loading="lazy"
              decoding="async"
              style={{
                width: avatar,
                height: avatar,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </picture>
        ) : (
          <div
            style={{
              width: avatar,
              height: avatar,
              borderRadius: 14,
              background: "linear-gradient(135deg,var(--tiffany),var(--teal))",
              color: "#fff",
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: isLead ? "1.8rem" : "1.4rem",
              display: "grid",
              placeItems: "center",
              flex: "none",
            }}
          >
            {initials}
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontFamily: "var(--display)", fontSize: isLead ? "1.6rem" : "1.4rem" }}>
            {name}
          </h3>
          <div
            style={{ color: "var(--cyan)", fontWeight: 600, fontSize: isLead ? ".95rem" : ".9rem" }}
          >
            {role}
          </div>
        </div>
      </div>
      {bio && (
        <p style={{ color: "#33485a", lineHeight: 1.6, fontSize: isLead ? "1rem" : ".95rem" }}>
          {bio}
        </p>
      )}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: ".82rem",
          color: "var(--muted-ink)",
          overflowWrap: "anywhere",
        }}
      >
        {nmls ? `${nmls} · ${phone}` : phone}
        {email && (
          <>
            <br />
            <a href={`mailto:${email}`} style={{ color: "var(--cyan)" }}>
              {email}
            </a>
          </>
        )}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {apply && (
          <a
            className="btn btn-primary"
            href={apply}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: ".6rem 1.1rem" }}
          >
            Apply with {name.split(" ")[0]}
          </a>
        )}
        {booking && (
          <a
            className="btn btn-dark"
            href={booking}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: ".6rem 1.1rem" }}
          >
            Book an appointment ↗
          </a>
        )}
      </div>
      {emcProfile && (
        <a
          href={emcProfile}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".78rem",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            textDecoration: "none",
          }}
        >
          EMC profile &amp; awards ↗
        </a>
      )}
    </article>
  );
}
