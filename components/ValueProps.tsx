import { Building2, Globe, TrendingUp, Users } from "lucide-react";
import Container from "./Container";
import FadeIn from "./FadeIn";

const props = [
  {
    icon: Building2,
    heading: "Increase Visibility.",
    body: "Help patients discover your nephrology practice when searching for kidney specialists and renal care providers in your city.",
  },
  {
    icon: Globe,
    heading: "Build Credibility.",
    body: "A professional profile helps prospective patients understand your qualifications, experience, and treatment approach — before they ever pick up the phone.",
  },
  {
    icon: TrendingUp,
    heading: "Differentiate.",
    body: "Showcase your expertise — chronic kidney disease, dialysis management, kidney transplantation, glomerular disease, and more — so patients find the right fit.",
  },
  {
    icon: Users,
    heading: "Reach Every Stage.",
    body: "Patients frequently research multiple nephrologists before selecting a physician. A listing ensures your practice is part of that decision-making process from the very first search.",
  },
];

export default function ValueProps() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
              For Nephrologists. Built for Growth.
            </h2>
            <div className="w-12 h-0.5 bg-teal mx-auto mb-5" />
            <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              TopNephrologists.com is the new destination for nephrology recognition and patient connection. Every practice that applies is listed and ready to be found.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map(({ icon: Icon, heading, body }, i) => (
            <FadeIn key={heading} delay={i * 0.1}>
              <div className="group text-center p-8 rounded-2xl border border-sky-dark hover:border-teal/50 hover:shadow-lg transition-all duration-300 h-full">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/5 border border-navy/10 mb-5 group-hover:bg-teal/10 group-hover:border-teal/30 transition-colors">
                  <Icon className="h-7 w-7 text-navy group-hover:text-teal transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy mb-3">
                  {heading}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
