export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  datePublished: string; // ISO
  displayDate: string; // human readable
  body: { type: "p" | "h2" | "ul"; content: string | string[] }[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "heloc-without-refinancing",
    title: "How to access your home equity without refinancing your first mortgage",
    description:
      "You can tap home equity with a HELOC or fixed second mortgage and keep your low first-mortgage rate. Here's how it works, including no-appraisal options up to $400K.",
    tag: "Home Equity",
    datePublished: "2026-06-01",
    displayDate: "June 2026",
    body: [
      {
        type: "p",
        content:
          "If you locked a low rate on your first mortgage, a cash-out refinance would replace it at today's higher rate — an expensive way to get cash. The better move is usually a <b>second lien</b> that sits behind your first mortgage, so your first loan never changes.",
      },
      { type: "h2", content: "Two ways to do it" },
      {
        type: "p",
        content:
          "A <b>HELOC</b> is a revolving line of credit you draw from as needed, usually at a variable rate — good for ongoing or flexible needs. A <b>fixed second mortgage</b> gives you a one-time lump sum at a fixed rate and payment — good for a known, one-time expense like debt consolidation or a renovation.",
      },
      { type: "h2", content: "You may not even need an appraisal" },
      {
        type: "p",
        content:
          "At CTC Equity, you can often access <b>up to $400,000 with no appraisal required</b> on a HELOC or fixed second — faster and lower cost. For larger needs, we place HELOCs and fixed seconds <b>up to $4 million</b>, which is rarely available elsewhere.",
      },
      { type: "h2", content: "How much can you borrow?" },
      {
        type: "p",
        content:
          "Most programs allow a combined loan-to-value of roughly 80–90% across your first mortgage and the new line, depending on credit and the lender. With access to 160+ lenders, we match your scenario to the program that allows the most.",
      },
      { type: "h2", content: "The bottom line" },
      {
        type: "p",
        content:
          'Keep your low first-mortgage rate. Use a HELOC or fixed second to get cash or clear debt without disturbing it. If you\'d like your real numbers, tell us your scenario — no full application to start.',
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}