import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Apply to Be Listed",
  description: "Apply to be listed on TopGeriatricians.com. Reach older adults, families, and referring physicians actively searching for geriatric care.",
};

export default function ApplyPage() {
  return (
    <div className="bg-sky min-h-screen py-16 lg:py-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <ApplyForm />
        </div>
      </Container>
    </div>
  );
}
