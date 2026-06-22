import { IMAGES } from "./images";

export interface PreviewCompany {
  id: number;
  name: string;
  loanProducts: string[];
  rating: number;
  reviewCount: number;
  phone: string;
  location: string;
  servingArea: string;
  imageUrl: string;
  featured?: boolean;
  rank?: number;
  nmls?: string;
}

export const previewCompanies: PreviewCompany[] = [
  {
    id: 1,
    name: "Summit Home Lending",
    loanProducts: ["Conventional Loans", "Jumbo Loans", "Refinancing"],
    rating: 5.0,
    reviewCount: 218,
    phone: "(303) 555-1200",
    location: "Denver, CO",
    servingArea: "Metro Denver & Front Range",
    imageUrl: IMAGES.companyFeatured,
    featured: true,
    nmls: "NMLS #1234567",
  },
  {
    id: 2,
    name: "Patriot Mortgage Group",
    loanProducts: ["VA Loans", "FHA Loans", "Conventional Loans"],
    rating: 4.9,
    reviewCount: 312,
    phone: "(303) 444-8800",
    location: "Denver, CO",
    servingArea: "Serving Metro Denver",
    imageUrl: IMAGES.companyOne,
    rank: 1,
    nmls: "NMLS #2345678",
  },
  {
    id: 3,
    name: "Greenfield Mortgage Solutions",
    loanProducts: ["FHA Loans", "USDA Loans", "Conventional Loans"],
    rating: 4.8,
    reviewCount: 187,
    phone: "(303) 310-5500",
    location: "Denver, CO",
    servingArea: "Serving Metro Denver",
    imageUrl: IMAGES.companyTwo,
    rank: 2,
    nmls: "NMLS #3456789",
  },
  {
    id: 4,
    name: "Apex Capital Lending",
    loanProducts: ["Investment Property Loans", "Commercial Mortgages", "Jumbo Loans"],
    rating: 4.7,
    reviewCount: 143,
    phone: "(303) 555-9900",
    location: "Denver, CO",
    servingArea: "Serving Metro Denver",
    imageUrl: IMAGES.companyThree,
    rank: 3,
    nmls: "NMLS #4567890",
  },
];
