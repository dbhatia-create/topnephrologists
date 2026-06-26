export interface Service {
  id: string;
  label: string;
  description: string;
  specialties: string[];
}

export const services: Service[] = [
  {
    id: "chronic-kidney-disease",
    label: "Chronic Kidney Disease (CKD)",
    description: "Comprehensive management of all stages of chronic kidney disease",
    specialties: ["CKD Stage 1–5 Management", "Progression Monitoring", "Diet & Nutrition Counseling", "Anemia Management", "CKD-MBD Treatment"],
  },
  {
    id: "hypertension",
    label: "Hypertension & Renal Hypertension",
    description: "Diagnosis and treatment of hypertension, including renal and renovascular causes",
    specialties: ["Resistant Hypertension", "Renovascular Hypertension", "Secondary Hypertension Workup", "Medication Management", "Blood Pressure Monitoring"],
  },
  {
    id: "dialysis-management",
    label: "Dialysis Management",
    description: "Medical oversight and optimization of hemodialysis and peritoneal dialysis",
    specialties: ["Hemodialysis", "Peritoneal Dialysis", "Home Dialysis Programs", "Dialysis Access Management", "Adequacy Monitoring"],
  },
  {
    id: "kidney-transplantation",
    label: "Kidney Transplantation",
    description: "Pre-transplant evaluation, post-transplant management, and long-term care",
    specialties: ["Transplant Evaluation", "Post-Transplant Monitoring", "Immunosuppression Management", "Rejection Treatment", "Living Donor Evaluation"],
  },
  {
    id: "electrolyte-disorders",
    label: "Electrolyte Disorders",
    description: "Diagnosis and management of fluid and electrolyte imbalances",
    specialties: ["Hyponatremia", "Hyperkalemia", "Acid-Base Disorders", "Calcium & Phosphorus Imbalance", "Magnesium Disorders"],
  },
  {
    id: "glomerular-disease",
    label: "Glomerular Disease",
    description: "Evaluation and treatment of glomerulonephritis and glomerulopathies",
    specialties: ["IgA Nephropathy", "Lupus Nephritis", "Membranous Nephropathy", "FSGS", "Nephrotic Syndrome"],
  },
  {
    id: "acute-kidney-injury",
    label: "Acute Kidney Injury (AKI)",
    description: "Rapid assessment and management of acute kidney injury across all settings",
    specialties: ["AKI Staging & Monitoring", "ICU Nephrology", "Continuous Renal Replacement Therapy", "Post-AKI Recovery", "Contrast-Induced AKI"],
  },
  {
    id: "kidney-stones",
    label: "Nephrolithiasis (Kidney Stones)",
    description: "Metabolic evaluation, prevention, and medical management of kidney stones",
    specialties: ["Stone Risk Assessment", "24-Hour Urine Testing", "Dietary Modification", "Medical Stone Prevention", "Recurrent Stone Management"],
  },
  {
    id: "diabetic-nephropathy",
    label: "Diabetic Nephropathy",
    description: "Specialized care for kidney disease related to diabetes",
    specialties: ["Proteinuria Management", "GFR Monitoring", "RAAS Blockade Therapy", "Glycemic Optimization", "Cardiovascular Risk Reduction"],
  },
  {
    id: "polycystic-kidney-disease",
    label: "Polycystic Kidney Disease (PKD)",
    description: "Genetic counseling, monitoring, and treatment of PKD and cystic kidney disorders",
    specialties: ["ADPKD Management", "Tolvaptan Therapy", "Cyst Monitoring", "Pain Management", "Genetic Counseling Coordination"],
  },
  {
    id: "tubular-disorders",
    label: "Tubular & Interstitial Disorders",
    description: "Diagnosis and treatment of tubular dysfunction and interstitial nephritis",
    specialties: ["Acute Interstitial Nephritis", "Chronic Interstitial Nephritis", "Renal Tubular Acidosis", "Fanconi Syndrome", "Drug-Induced Nephropathy"],
  },
  {
    id: "onco-nephrology",
    label: "Onco-Nephrology",
    description: "Kidney care for patients with cancer and those receiving oncologic treatments",
    specialties: ["Chemotherapy-Related AKI", "Immunotherapy Nephrotoxicity", "Paraneoplastic Nephropathy", "Electrolyte Complications", "Post-BMT Nephrology"],
  },
  {
    id: "renovascular-disease",
    label: "Renovascular Disease",
    description: "Evaluation and management of renal artery stenosis and ischemic nephropathy",
    specialties: ["Renal Artery Stenosis", "Ischemic Nephropathy", "Fibromuscular Dysplasia", "Atherosclerotic RVD", "Revascularization Coordination"],
  },
  {
    id: "pediatric-nephrology",
    label: "Pediatric Nephrology",
    description: "Kidney care for children with congenital and acquired renal conditions",
    specialties: ["Congenital Abnormalities", "Childhood CKD", "Pediatric Nephrotic Syndrome", "UTI & Reflux Nephropathy", "Transition to Adult Care"],
  },
  {
    id: "pregnancy-nephrology",
    label: "Pregnancy & Kidney Disease",
    description: "Management of kidney disease in pregnancy and pregnancy-related renal complications",
    specialties: ["Preeclampsia Management", "CKD in Pregnancy", "Lupus Nephritis in Pregnancy", "AKI in Obstetric Setting", "Postpartum Renal Monitoring"],
  },
  {
    id: "autoimmune-nephrology",
    label: "Autoimmune & Systemic Disease Nephrology",
    description: "Renal manifestations of systemic autoimmune and inflammatory diseases",
    specialties: ["Lupus Nephritis", "ANCA Vasculitis", "Anti-GBM Disease", "Amyloidosis", "Scleroderma Renal Crisis"],
  },
];

export const allServiceIds: string[] = services.map((s) => s.id);
export const allServiceLabels: string[] = services.map((s) => s.label);
