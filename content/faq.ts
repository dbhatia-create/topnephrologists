export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Who is TopNephrologists.com for?",
    answer:
      "TopNephrologists.com is for board-certified nephrologists and kidney specialists who want to increase their practice visibility and connect with patients, referring physicians, and healthcare organizations actively searching for nephrology care in their area.",
  },
  {
    question: "What does a listing cost?",
    answer:
      "$289 per city for a basic listing. Featured placement — which pins your practice at the top of your city page above all other listings — is an additional $689 for your first city and 50% off ($345) for each additional city. Pricing is for a 12-month annual listing.",
  },
  {
    question: "When will my listing go live?",
    answer:
      "The directory launches in August 2026. All listings debut simultaneously, so every practice that applies now will be live from day one. Practices applying during the pre-launch period receive the balance of 2026 plus all of 2027.",
  },
  {
    question: "What is a Featured Listing?",
    answer:
      "A Featured Listing pins your practice at the top of search results for your city — above all other ranked listings. Only one Featured Listing is available per city, so it's first-come, first-served.",
  },
  {
    question: "Can I be listed in multiple cities?",
    answer:
      "Yes. You can add as many cities as you serve. Each city is billed separately at $289/year. If you add Featured placement, the upgrade is $689 for your first city and $345 for each additional city.",
  },
  {
    question: "What nephrology specialties can I highlight?",
    answer:
      "You can showcase any specialties you practice — chronic kidney disease, hypertension, dialysis management, kidney transplantation, electrolyte disorders, glomerular disease, acute kidney injury, and more. Your specialty selections are featured prominently on your listing.",
  },
  {
    question: "Is my application guaranteed to be accepted?",
    answer:
      "Yes — every qualifying nephrologist or nephrology practice that applies is accepted. We will reach out if we need any additional information to finalize your listing.",
  },
  {
    question: "What is the pre-launch special?",
    answer:
      "Practices that apply before the August 2026 launch receive the balance of 2026 plus all of 2027 — so you're not paying a full year for just a few months. This is the best time to apply and secure your Featured placement before your market fills up.",
  },
  {
    question: "Can I cancel my listing?",
    answer:
      "Listings are annual. Once your listing is finalized, the fee is non-refundable. You may cancel auto-renewal before the next annual cycle.",
  },
  {
    question: "Do I need to be in private practice?",
    answer:
      "Not at all. TopNephrologists.com welcomes nephrologists in private practice, academic medical centers, hospital-based practices, and dialysis centers alike. If you provide nephrology services, you qualify for a listing.",
  },
];

export const howItWorksFaqItems: FaqItem[] = [
  faqItems[0],
  faqItems[2],
  faqItems[3],
  faqItems[6],
];
