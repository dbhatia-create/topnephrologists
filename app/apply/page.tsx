import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Apply to Be Listed",
  description: "Apply to be listed on TopNephrologists.com. Reach patients, referring physicians, and healthcare organizations actively searching for nephrology care.",
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
