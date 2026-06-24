import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CTC Equity | HELOC, Fixed Second, DSCR & Self-Employed Mortgage Specialists" },
      {
        name: "description",
        content:
          "CTC Equity gives borrowers access to 160+ lenders for HELOCs, fixed second mortgages, DSCR investment loans, and bank statement loans for self-employed borrowers.",
      },
      { name: "author", content: "Ahoo Khalessi, CTC Equity" },
      { property: "og:title", content: "CTC Equity | Coast to Coast. Clear to Close." },
      {
        property: "og:description",
        content:
          "Access to 160+ lenders for HELOCs, fixed seconds, DSCR, and self-employed financing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CTC Equity | Coast to Coast. Clear to Close." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ROOT_ORG_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ROOT_PEOPLE_SCHEMA) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const ROOT_ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["FinancialService", "LocalBusiness"],
  "@id": "https://ctcequity.com/#org",
  name: "CTC Equity",
  alternateName: "Coast to Coast Equity",
  description:
    "Nationwide mortgage brokerage based in Orange County, CA with access to 160+ lenders, specializing in HELOCs, fixed second mortgages, DSCR investment loans, and bank statement / P&L loans for self-employed borrowers.",
  url: "https://ctcequity.com",
  telephone: "+1-949-877-7234",
  email: "akhalessi@ctcequity.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3750 S Susan St",
    addressLocality: "Santa Ana",
    addressRegion: "CA",
    postalCode: "92704",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: "33.7100", longitude: "-117.9100" },
  // TODO: paste Google Business Profile / Maps URL once claimed.
  hasMap: "[INSERT GOOGLE BUSINESS PROFILE / MAPS URL]",
  parentOrganization: { "@type": "Organization", name: "EMortgage Capital, Inc." },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "AdministrativeArea", name: "Orange County, California" },
  ],
  knowsAbout: [
    "HELOC",
    "Fixed Second Mortgage",
    "DSCR Loan",
    "Bank Statement Loan",
    "P&L Loan",
    "Reverse Mortgage",
    "Commercial Loan",
    "Jumbo Loan",
    "FHA Loan",
    "VA Loan",
    "Conventional Loan",
    "No-appraisal HELOC or fixed second up to $400,000",
    "HELOC and fixed second up to $4 million",
  ],
};

const ROOT_PEOPLE_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahoo Khalessi",
    jobTitle: "Division Manager & Loan Officer",
    worksFor: { "@id": "https://ctcequity.com/#org" },
    identifier: "NMLS #2239510",
    // TODO: fill the bracketed sameAs URLs with real profile links before launch.
    sameAs: [
      "[AHOO ZILLOW PROFILE URL]",
      "[GOOGLE BUSINESS PROFILE URL]",
      "[EXPERIENCE.COM PROFILE URL]",
      "https://www.linkedin.com/in/ahookhalessi/",
    ],
    award: [
      "Scotsman Guide Top Originator",
      "Started the home equity department at Rocket Mortgage — top producer on team and in department",
      "EMC Top 5% Loan Officer by Volume (2025)",
      "EMC Top 5% Loan Officer by Units (2025)",
      "EMC Top 10% Loan Officer by Units (Q1 2026)",
      "Top 5% of originators nationally",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ben Mokri",
    jobTitle: "Partner & Executive Loan Officer",
    worksFor: { "@id": "https://ctcequity.com/#org" },
    identifier: "NMLS #2279528",
  },
];

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
