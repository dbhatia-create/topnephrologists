import type { Metadata } from "next";
import CheckoutWizard from "@/components/checkout/CheckoutWizard";
import { geriatriciansConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Apply to Be Listed",
  description: "Apply to be listed on TopGeriatricians.com. Reach older adults, families, and referring physicians actively searching for geriatric care.",
};

export default function ApplyPage() {
  return <CheckoutWizard config={geriatriciansConfig} />;
}
