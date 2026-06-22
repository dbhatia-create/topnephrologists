export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Who is TopMortgageCompanies.com for?",
    answer:
      "TopMortgageCompanies.com is for licensed mortgage companies, lenders, and brokers who want to increase their visibility and reach borrowers actively searching for financing solutions in their market.",
  },
  {
    question: "What does a listing cost?",
    answer:
      "$289 per city for a basic listing. Featured placement — which pins your company at the top of your city page above all other listings — is an additional $689 for your first city and 50% off ($345) for each additional city. Pricing is for a 12-month annual listing.",
  },
  {
    question: "When will my listing go live?",
    answer:
      "The directory launches in August 2026. All listings debut simultaneously, so every company that applies now will be live from day one. Companies applying during the pre-launch period receive the balance of 2026 plus all of 2027.",
  },
  {
    question: "What is a Featured Listing?",
    answer:
      "A Featured Listing pins your company at the top of search results for your city — above all other ranked listings. Only one Featured Listing is available per city, so it's first-come, first-served.",
  },
  {
    question: "Can I be listed in multiple cities?",
    answer:
      "Yes. You can add as many cities as you serve. Each city is billed separately at $289/year. If you add Featured placement, the upgrade is $689 for your first city and $345 for each additional city.",
  },
  {
    question: "What loan products can I highlight?",
    answer:
      "You can showcase any loan products your company offers — conventional, FHA, VA, jumbo, refinancing, reverse mortgages, investment property loans, USDA, construction, and commercial mortgages. Your specialties are featured prominently on your listing.",
  },
  {
    question: "Is my company guaranteed to be listed?",
    answer:
      "Yes — every qualifying mortgage company that applies is accepted. We will reach out if we need any additional information to finalize your listing.",
  },
  {
    question: "What is the pre-launch special?",
    answer:
      "Companies that apply before the August 2026 launch receive the balance of 2026 plus all of 2027 — so you're not paying a full year for just a few months. This is the best time to apply and secure your Featured placement before your market fills up.",
  },
  {
    question: "Can I cancel my listing?",
    answer:
      "Listings are annual. Once your listing is finalized, the fee is non-refundable. You may cancel auto-renewal before the next annual cycle.",
  },
  {
    question: "Do I receive a recognition plaque?",
    answer:
      "Yes. Every listed company receives a complimentary custom Top Mortgage Companies recognition plaque, suitable for display in your office or branch. You'll provide your shipping address during the application process.",
  },
  {
    question: "What is the Annual Awards & Recognition Event?",
    answer:
      "Every listed company is invited to the Annual Top Mortgage Companies Awards & Recognition Event in Summer 2027 — an exclusive evening of peer recognition, networking, and celebration. Details will be sent to all listed companies closer to the event.",
  },
];

export const howItWorksFaqItems: FaqItem[] = [
  faqItems[0],
  faqItems[2],
  faqItems[3],
  faqItems[6],
];
