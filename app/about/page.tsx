import type { Metadata } from "next";
import { Target, ShieldCheck, Globe } from "lucide-react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about TopNephrologists.com — the premier directory connecting patients and families with top-rated nephrologists and kidney care specialists nationwide.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-navy py-14">
        <Container>
          <div className="text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              About TopNephrologists.com
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed mx-auto">
              TopNephrologists.com was founded to connect patients, families, and referring physicians with trusted, top-rated nephrologists and kidney care specialists across the United States.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-muted text-lg leading-relaxed mb-5">
              Following our 2026 acquisition and complete redesign, we are building the most comprehensive nephrology directory in the country — one that kidney care specialists are proud to be part of and patients can rely on when it matters most.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-12">
              Our mission is simple: recognize excellence, elevate top nephrologists, and help patients and their families find the right care.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Our Mission",
                body: "Connect patients, families, and referring physicians with trusted, verified nephrologists across every nephrology specialty and major U.S. city.",
              },
              {
                icon: ShieldCheck,
                title: "Our Standards",
                body: "Every listed physician undergoes a review process. Only qualified, board-eligible or board-certified nephrologists and kidney care specialists are accepted.",
              },
              {
                icon: Globe,
                title: "Our Reach",
                body: "All 50 states. 15+ nephrology specialties. Launching to the public in August 2026.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <FadeIn key={title}>
                <div className="text-center p-6 rounded-2xl border border-sky-dark bg-sky h-full">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 border border-teal/20 mb-4">
                    <Icon className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
