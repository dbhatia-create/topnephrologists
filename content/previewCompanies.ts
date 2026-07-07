import { IMAGES } from "./images";

export interface PreviewCompany {
  id: number;
  name: string;
  services: string[];
  rating: number;
  reviewCount: number;
  phone: string;
  location: string;
  servingArea: string;
  imageUrl: string;
  featured?: boolean;
  rank?: number;
}

export const previewCompanies: PreviewCompany[] = [
  {
    id: 1,
    name: "Apex Nephrology Associates",
    services: ["Chronic Kidney Disease (CKD) Management", "Dialysis Care", "Kidney Transplant Care"],
    rating: 5.0,
    reviewCount: 241,
    phone: "(214) 555-1200",
    location: "Dallas, TX",
    servingArea: "Metro Dallas & Surrounding Areas",
    imageUrl: IMAGES.companyFeatured,
    featured: true,
  },
  {
    id: 2,
    name: "Summit Kidney Care Specialists",
    services: ["Hypertension Management", "Glomerular Disease", "Electrolyte & Acid-Base Disorders"],
    rating: 4.9,
    reviewCount: 318,
    phone: "(214) 444-8800",
    location: "Dallas, TX",
    servingArea: "Serving Metro Dallas",
    imageUrl: IMAGES.companyOne,
    rank: 1,
  },
  {
    id: 3,
    name: "Pinnacle Renal Medicine",
    services: ["Diabetic Kidney Disease", "Kidney Stones (Nephrolithiasis)", "Bone & Mineral Metabolism (CKD-MBD)"],
    rating: 4.8,
    reviewCount: 196,
    phone: "(214) 310-5500",
    location: "Dallas, TX",
    servingArea: "Serving Metro Dallas",
    imageUrl: IMAGES.companyTwo,
    rank: 2,
  },
  {
    id: 4,
    name: "Meridian Nephrology Group",
    services: ["Acute Kidney Injury (AKI)", "Polycystic & Genetic Kidney Disease", "Anemia Management in CKD"],
    rating: 4.7,
    reviewCount: 158,
    phone: "(214) 555-9900",
    location: "Dallas, TX",
    servingArea: "Serving Metro Dallas",
    imageUrl: IMAGES.companyThree,
    rank: 3,
  },
];
