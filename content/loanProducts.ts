export interface LoanProduct {
  id: string;
  label: string;
  description: string;
  specialties: string[];
}

export const loanProducts: LoanProduct[] = [
  {
    id: "conventional",
    label: "Conventional Loans",
    description: "Fixed-rate and adjustable-rate mortgages for qualified borrowers",
    specialties: [
      "30-Year Fixed Rate",
      "15-Year Fixed Rate",
      "Adjustable-Rate Mortgages (ARM)",
      "Conforming Loans",
      "Non-Conforming Loans",
      "Portfolio Loans",
    ],
  },
  {
    id: "fha",
    label: "FHA Loans",
    description: "Government-backed loans with low down payment requirements",
    specialties: [
      "FHA Purchase Loans",
      "FHA 203(k) Renovation Loans",
      "First-Time Homebuyer Programs",
      "Low Down Payment Options",
      "FHA Streamline Refinance",
    ],
  },
  {
    id: "va",
    label: "VA Loans",
    description: "Exclusive financing for veterans, active duty, and surviving spouses",
    specialties: [
      "VA Purchase Loans",
      "VA Cash-Out Refinance",
      "VA IRRRL (Streamline Refinance)",
      "Active Duty Military",
      "Veterans & Surviving Spouses",
    ],
  },
  {
    id: "jumbo",
    label: "Jumbo Loans",
    description: "High-value financing above conforming loan limits",
    specialties: [
      "Jumbo Purchase Loans",
      "Super Jumbo Loans",
      "Jumbo ARMs",
      "High-Value Property Financing",
      "Luxury Home Mortgages",
    ],
  },
  {
    id: "refinancing",
    label: "Refinancing",
    description: "Rate-and-term and cash-out refinance solutions",
    specialties: [
      "Rate-and-Term Refinance",
      "Cash-Out Refinance",
      "Debt Consolidation Refinance",
      "Streamline Refinance",
      "High LTV Refinance",
    ],
  },
  {
    id: "reverse",
    label: "Reverse Mortgages",
    description: "HECM and proprietary reverse mortgage products for seniors",
    specialties: [
      "HECM (Home Equity Conversion)",
      "Proprietary Reverse Mortgages",
      "HECM for Purchase",
      "Retirement Income Planning",
    ],
  },
  {
    id: "investment",
    label: "Investment Property Loans",
    description: "Financing for rental properties, fix-and-flip, and multi-family",
    specialties: [
      "Rental Property Financing",
      "Fix-and-Flip Loans",
      "DSCR Loans",
      "Multi-Family Properties",
      "Short-Term Rental Financing",
    ],
  },
  {
    id: "usda",
    label: "USDA Loans",
    description: "No-down-payment loans for eligible rural and suburban properties",
    specialties: [
      "USDA Direct Loans",
      "USDA Guaranteed Loans",
      "Rural Development Financing",
      "Zero Down Payment Options",
    ],
  },
  {
    id: "construction",
    label: "Construction Loans",
    description: "Financing for new builds and major renovations",
    specialties: [
      "Construction-to-Permanent Loans",
      "New Construction Financing",
      "Lot Loans",
      "Builder Loans",
      "Renovation Loans",
    ],
  },
  {
    id: "commercial",
    label: "Commercial Mortgages",
    description: "Loans for commercial real estate and mixed-use properties",
    specialties: [
      "Commercial Real Estate Loans",
      "Office Building Financing",
      "Retail & Industrial Properties",
      "Mixed-Use Properties",
      "SBA Real Estate Loans",
    ],
  },
];

export const allLoanProductIds: string[] = loanProducts.map((p) => p.id);
export const allLoanProductLabels: string[] = loanProducts.map((p) => p.label);
