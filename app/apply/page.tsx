import type { Metadata } from "next";
import CheckoutWizard from "@/components/checkout/CheckoutWizard";
import { nephrologistsConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Apply to Be Listed",
  description: "Apply to be listed on TopNephrologists.com. Reach patients and referring physicians actively searching for nephrology and kidney care.",
};

export default function ApplyPage() {
  return <CheckoutWizard config={nephrologistsConfig} />;
}
