export interface Service {
  id: string;
  label: string;
  description: string;
  specialties: string[];
}

export const services: Service[] = [
  {
    id: "ckd-management",
    label: "Chronic Kidney Disease (CKD) Management",
    description: "Comprehensive staging, monitoring, and treatment planning to slow the progression of chronic kidney disease",
    specialties: ["CKD Staging (GFR-based)", "Disease Progression Monitoring", "Albuminuria & Proteinuria Management", "Dietary & Lifestyle Counseling", "Nephrology Referral Co-Management", "CKD Patient Education"],
  },
  {
    id: "dialysis-care",
    label: "Dialysis Care",
    description: "Ongoing management of patients on hemodialysis or peritoneal dialysis, from access placement through long-term monitoring",
    specialties: ["Hemodialysis Management", "Peritoneal Dialysis Management", "Vascular Access Care", "Dialysis Adequacy Monitoring", "Home Dialysis Training Coordination", "Dialysis Complication Management"],
  },
  {
    id: "kidney-transplant",
    label: "Kidney Transplant Care",
    description: "Pre- and post-transplant nephrology care, including donor evaluation, immunosuppression, and long-term graft monitoring",
    specialties: ["Pre-Transplant Evaluation", "Living Donor Assessment", "Post-Transplant Management", "Immunosuppression Management", "Rejection Monitoring", "Transplant Complication Care"],
  },
  {
    id: "hypertension-management",
    label: "Hypertension Management",
    description: "Diagnosis and treatment of resistant, secondary, and renovascular hypertension in coordination with primary care",
    specialties: ["Resistant Hypertension", "Renovascular Hypertension", "Secondary Hypertension Workup", "Ambulatory Blood Pressure Monitoring", "Antihypertensive Regimen Optimization"],
  },
  {
    id: "electrolyte-acid-base",
    label: "Electrolyte & Acid-Base Disorders",
    description: "Evaluation and correction of sodium, potassium, and acid-base imbalances that commonly accompany kidney disease",
    specialties: ["Hyponatremia & Hypernatremia", "Hyperkalemia & Hypokalemia", "Metabolic Acidosis", "Calcium & Phosphorus Imbalance", "Fluid Balance Management"],
  },
  {
    id: "glomerular-disease",
    label: "Glomerular Disease",
    description: "Diagnosis and immunologic treatment of glomerulonephritis, nephrotic syndrome, and related autoimmune kidney conditions",
    specialties: ["Glomerulonephritis", "Nephrotic Syndrome", "IgA Nephropathy", "Lupus Nephritis", "Focal Segmental Glomerulosclerosis (FSGS)", "Kidney Biopsy Coordination"],
  },
  {
    id: "acute-kidney-injury",
    label: "Acute Kidney Injury (AKI)",
    description: "Rapid evaluation and management of sudden kidney function decline, including inpatient and ICU nephrology consultation",
    specialties: ["AKI Evaluation & Staging", "ICU Nephrology Consultation", "Contrast-Induced Nephropathy", "Drug-Induced Kidney Injury", "Post-AKI Recovery Monitoring"],
  },
  {
    id: "kidney-stones",
    label: "Kidney Stones (Nephrolithiasis)",
    description: "Metabolic evaluation and long-term prevention planning for patients with recurrent kidney stones",
    specialties: ["Metabolic Stone Workup", "24-Hour Urine Analysis", "Stone Prevention Counseling", "Dietary Modification", "Recurrent Stone Management"],
  },
  {
    id: "polycystic-genetic-kidney-disease",
    label: "Polycystic & Genetic Kidney Disease",
    description: "Management of autosomal dominant polycystic kidney disease and other inherited kidney conditions",
    specialties: ["ADPKD Management", "Genetic Counseling Referral", "Cyst Surveillance Imaging", "Alport Syndrome", "Family Screening Coordination"],
  },
  {
    id: "diabetic-kidney-disease",
    label: "Diabetic Kidney Disease",
    description: "Nephrology co-management of diabetic patients to monitor and slow kidney-related complications",
    specialties: ["Diabetic Nephropathy", "Albuminuria Monitoring", "Glycemic Coordination with Endocrinology", "SGLT2 Inhibitor Management", "Cardiorenal Risk Reduction"],
  },
  {
    id: "ckd-mbd",
    label: "Bone & Mineral Metabolism (CKD-MBD)",
    description: "Management of secondary hyperparathyroidism, renal osteodystrophy, and mineral imbalances caused by kidney disease",
    specialties: ["Secondary Hyperparathyroidism", "Renal Osteodystrophy", "Phosphate Binder Management", "Vitamin D & Calcimimetic Therapy", "Bone Density Monitoring"],
  },
  {
    id: "anemia-management",
    label: "Anemia Management in CKD",
    description: "Evaluation and treatment of anemia associated with chronic kidney disease and dialysis",
    specialties: ["ESA (Erythropoiesis-Stimulating Agent) Therapy", "Iron Deficiency Management", "Anemia Workup", "Lab Monitoring & Dose Titration"],
  },
  {
    id: "renal-nutrition",
    label: "Renal Nutrition & Dietary Counseling",
    description: "Kidney-specific dietary guidance to manage protein, potassium, phosphorus, and sodium intake at every CKD stage",
    specialties: ["Renal Dietitian Referral", "Potassium & Phosphorus Counseling", "Protein Intake Guidance", "Fluid Restriction Planning", "Pre-Dialysis Nutrition Education"],
  },
  {
    id: "pediatric-nephrology",
    label: "Pediatric Nephrology",
    description: "Specialized evaluation and treatment of kidney conditions in infants, children, and adolescents",
    specialties: ["Congenital Kidney Anomalies", "Pediatric Hypertension", "Pediatric CKD", "Nephrotic Syndrome in Children", "Growth & Development Monitoring"],
  },
  {
    id: "care-coordination",
    label: "Care Coordination & Chronic Disease Management",
    description: "Coordinated, whole-patient nephrology care for those managing kidney disease alongside other chronic conditions",
    specialties: ["Multi-Specialty Care Coordination", "Primary Care Co-Management", "Advance Care Planning", "Transition to Dialysis Planning", "Patient & Family Education"],
  },
];

export const allServiceIds: string[] = services.map((s) => s.id);
export const allServiceLabels: string[] = services.map((s) => s.label);
