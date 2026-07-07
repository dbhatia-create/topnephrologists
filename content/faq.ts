export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Who is TopNephrologists.com for?",
    answer:
      "TopNephrologists.com is for board-certified nephrologists and kidney care specialists who want to increase their practice visibility and connect with patients, family caregivers, and referring physicians actively searching for nephrology care in their area.",
  },
  {
    question: "What does a listing cost?",
    answer:
      "$289 per city for a basic listing. Featured placement — which pins your practice at the top of your city page above all other listings — is an additional $689 per city. Pricing is for a 12-month annual listing.",
  },
  {
    question: "When will my listing go live?",
    answer:
      "Listings are typically published within a few business days after approval. During a new directory's pre-launch period, approved listings are held and published when the directory goes live so that all participating practices debut together.",
  },
  {
    question: "What is a Featured Listing?",
    answer:
      "A Featured Listing pins your practice at the top of search results for your city — above all other ranked listings. Only one Featured Listing is available per city, so it's first-come, first-served.",
  },
  {
    question: "Can I be listed in multiple cities?",
    answer:
      "Yes. You can add as many cities as you serve. Each city is billed separately at $289/year. If you add Featured placement, the upgrade is $689 per city.",
  },
  {
    question: "What nephrology specialties can I highlight?",
    answer:
      "You can showcase any specialties you practice — chronic kidney disease management, dialysis care, kidney transplant care, hypertension management, glomerular disease, kidney stones, and more. Your specialty selections are featured prominently on your listing.",
  },
  {
    question: "Is my application guaranteed to be accepted?",
    answer:
      "Yes — every qualifying nephrologist or nephrology practice that applies is accepted. We will reach out if we need any additional information to finalize your listing.",
  },
  {
    question: "Why should I apply now?",
    answer:
      "The directory launches in August 2026 and Featured placements are first-come, first-served — only one per city. Applying now is the best way to secure your spot before your market fills up.",
  },
  {
    question: "What is the Awards & Recognition Dinner?",
    answer:
      "The Awards & Recognition Dinner is an exclusive annual event celebrating the practices featured on TopNephrologists.com. It brings together recognized practices, industry professionals, and invited guests to celebrate excellence in patient care. Each listing includes an invitation for your practice, with the event schedule and location announced in advance.",
  },
  {
    question: "Can I cancel my listing?",
    answer:
      "Listings are annual. Once your listing is finalized, the fee is non-refundable. You may cancel auto-renewal before the next annual cycle.",
  },
  {
    question: "Do I need to be in private practice?",
    answer:
      "Not at all. TopNephrologists.com welcomes nephrologists in private practice, academic medical centers, hospital-based practices, and dialysis centers alike. If you provide nephrology or kidney care services, you qualify for a listing.",
  },
];

export const howItWorksFaqItems: FaqItem[] = [
  faqItems[0],
  faqItems[2],
  faqItems[3],
  faqItems[6],
];
