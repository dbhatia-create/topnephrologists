export interface Service {
  id: string;
  label: string;
  description: string;
  specialties: string[];
}

export const services: Service[] = [
  {
    id: "dementia-memory-care",
    label: "Dementia & Memory Care",
    description: "Comprehensive evaluation, diagnosis, and management of dementia and memory-related conditions in older adults",
    specialties: ["Alzheimer's Disease", "Vascular Dementia", "Lewy Body Dementia", "Frontotemporal Dementia", "Mild Cognitive Impairment", "Cognitive Screening"],
  },
  {
    id: "chronic-disease-management",
    label: "Chronic Disease Management",
    description: "Coordinated, patient-centered care for older adults managing multiple chronic conditions simultaneously",
    specialties: ["Multi-Morbidity Management", "Care Coordination", "Disease Progression Monitoring", "Chronic Pain Management", "Long-Term Condition Planning"],
  },
  {
    id: "medication-management",
    label: "Medication Management & Polypharmacy",
    description: "Review, optimization, and deprescribing of complex medication regimens to reduce harm and improve outcomes in older adults",
    specialties: ["Polypharmacy Review", "Deprescribing", "Drug Interaction Assessment", "Medication Reconciliation", "Beers Criteria Evaluation"],
  },
  {
    id: "preventive-care",
    label: "Preventive Care & Healthy Aging",
    description: "Proactive health maintenance strategies to promote independence, vitality, and quality of life in aging adults",
    specialties: ["Comprehensive Geriatric Assessment", "Cancer Screenings", "Immunization Management", "Advance Care Planning", "Wellness Counseling"],
  },
  {
    id: "falls-prevention",
    label: "Falls Prevention & Balance Disorders",
    description: "Evaluation and intervention to reduce fall risk and manage balance and mobility challenges in older adults",
    specialties: ["Fall Risk Assessment", "Balance & Gait Evaluation", "Home Safety Review", "Physical Therapy Coordination", "Vestibular Disorders"],
  },
  {
    id: "palliative-care",
    label: "Palliative & End-of-Life Care",
    description: "Compassionate symptom management, goals-of-care conversations, and support for patients and families facing serious illness",
    specialties: ["Symptom Management", "Goals-of-Care Discussions", "Hospice Coordination", "Advance Directives", "Family Support Services"],
  },
  {
    id: "geriatric-psychiatry",
    label: "Geriatric Psychiatry & Behavioral Health",
    description: "Diagnosis and treatment of mental health and behavioral conditions common in older adults",
    specialties: ["Late-Life Depression", "Anxiety Disorders", "Behavioral Symptoms of Dementia", "Delirium Management", "Sleep-Related Psychiatric Conditions"],
  },
  {
    id: "osteoporosis-bone-health",
    label: "Osteoporosis & Bone Health",
    description: "Assessment and treatment of bone density loss and fracture risk in older adults",
    specialties: ["DEXA Scan Interpretation", "Osteoporosis Treatment", "Fracture Risk Assessment", "Calcium & Vitamin D Management", "Post-Fracture Care"],
  },
  {
    id: "urinary-incontinence",
    label: "Urinary Incontinence & Pelvic Health",
    description: "Evaluation and management of bladder control issues and pelvic floor disorders affecting older adults",
    specialties: ["Urge Incontinence", "Stress Incontinence", "Overactive Bladder", "Pelvic Floor Therapy Coordination", "Catheter Management"],
  },
  {
    id: "cardiovascular-older-adults",
    label: "Cardiovascular Disease in Older Adults",
    description: "Geriatric-focused management of heart disease, hypertension, and vascular conditions in elderly patients",
    specialties: ["Hypertension in Elderly", "Atrial Fibrillation", "Heart Failure Management", "Orthostatic Hypotension", "Peripheral Artery Disease"],
  },
  {
    id: "diabetes-seniors",
    label: "Diabetes Management in Seniors",
    description: "Age-appropriate diabetes care that balances glycemic control with safety and quality of life in older adults",
    specialties: ["Glycemic Goal Individualization", "Hypoglycemia Prevention", "Insulin Management", "Diabetes Complications Monitoring", "Nutrition Counseling"],
  },
  {
    id: "geriatric-rehabilitation",
    label: "Geriatric Rehabilitation & Functional Recovery",
    description: "Post-acute and long-term rehabilitation to restore function, independence, and quality of life in older patients",
    specialties: ["Post-Surgical Recovery", "Stroke Rehabilitation", "Hip & Joint Recovery", "Functional Capacity Assessment", "Physical & Occupational Therapy Coordination"],
  },
  {
    id: "sleep-disorders",
    label: "Sleep Disorders in Older Adults",
    description: "Diagnosis and management of sleep-related conditions that disproportionately affect the aging population",
    specialties: ["Insomnia", "Sleep Apnea", "Restless Legs Syndrome", "Circadian Rhythm Disorders", "Sleep Hygiene Counseling"],
  },
  {
    id: "caregiver-support",
    label: "Caregiver Support & Care Coordination",
    description: "Guidance and resources for family caregivers, with coordinated care planning across providers and settings",
    specialties: ["Family Caregiver Education", "Care Transition Planning", "Home Health Coordination", "Community Resource Referrals", "Respite Care Planning"],
  },
  {
    id: "home-based-care",
    label: "Home-Based Primary Care",
    description: "Physician-led primary care delivered in the patient's home for older adults with limited mobility or complex needs",
    specialties: ["House Calls", "Mobile Diagnostics", "Homebound Patient Care", "Remote Monitoring", "Care Management for Frail Elderly"],
  },
  {
    id: "nutritional-health",
    label: "Nutritional Health & Weight Management",
    description: "Assessment and intervention for malnutrition, unintentional weight loss, and dietary challenges in older adults",
    specialties: ["Malnutrition Screening", "Weight Loss Evaluation", "Appetite Stimulation", "Dietary Counseling", "Sarcopenia Management"],
  },
];

export const allServiceIds: string[] = services.map((s) => s.id);
export const allServiceLabels: string[] = services.map((s) => s.label);
