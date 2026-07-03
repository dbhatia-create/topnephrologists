import { Check, Phone } from "lucide-react";
import Button from "./Button";
import Container from "./Container";
import FadeIn from "./FadeIn";
import { PRICING, formatCurrency } from "@/lib/pricing";

const BASIC_FEATURES = [
  "Full professional profile with credentials & description",
  "Listed by city and geriatric specialties",
  "City directory placement",
  "Contact details, website & social media",
  "TopGeriatricians.com verified badge",
];

const FEATURED_EXTRAS = [
  "Featured badge + top placement",
  "Highlighted above all basic listings",
  "Only 1 available per city",
];

export default function Pricing() {
  const basicStandard = PRICING.basicPerCity * 2;
  const featuredStandard = PRICING.featuredFirstCity * 2;

  return (
    <section id="pricing" className="bg-white py-20 lg:py-24">
      <Container>
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">
              Transparent Pricing
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
              One-Time Annual Fee
            </h2>
            <div className="w-12 h-0.5 bg-teal mx-auto mb-5" />
            <p className="text-muted max-w-xl mx-auto text-lg leading-relaxed">
              No subscriptions. No per-click fees. Pay once and your listing runs a full 12-month term.
            </p>
          </div>

        </FadeIn>

        {/* Two cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Basic */}
          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-sky-dark bg-white shadow-md p-8 flex flex-col h-full">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">Basic Listing</p>
              <p className="text-sm text-muted mb-6">Standard directory placement</p>

              <div className="mb-6">
                <p className="text-sm text-muted line-through">{formatCurrency(basicStandard)}</p>
                <div className="flex items-end gap-2">
                  <p className="font-display text-4xl font-bold text-navy">{formatCurrency(PRICING.basicPerCity)}</p>
                  <span className="text-sm text-muted mb-1.5">/ city / year</span>
                </div>
                <span className="inline-block mt-2 text-xs font-bold text-teal bg-teal/10 border border-teal/20 rounded-full px-3 py-1">50% Off</span>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {BASIC_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-teal" />
                    <span className="text-sm text-muted leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <Button href="/apply" variant="secondary" size="md" className="w-full">
                Get Basic Listing
              </Button>
            </div>
          </FadeIn>

          {/* Featured */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border-2 border-teal bg-navy shadow-xl p-8 flex flex-col h-full relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-1.5 bg-teal text-white font-bold text-[11px] tracking-widest uppercase rounded-full shadow-md">
                Most Visible — 1 Per City
              </div>

              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-2 mt-2">Featured Listing</p>
              <p className="text-sm text-white/60 mb-6">Premium placement + spotlight badge</p>

              <div className="mb-6">
                <p className="text-sm text-white/40 line-through">+{formatCurrency(featuredStandard)}</p>
                <div className="flex items-end gap-2">
                  <p className="font-display text-4xl font-bold text-white">+{formatCurrency(PRICING.featuredFirstCity)}</p>
                  <span className="text-sm text-white/50 mb-1.5">/ city</span>
                </div>
                <span className="inline-block mt-2 text-xs font-bold text-teal bg-teal/20 border border-teal/30 rounded-full px-3 py-1">50% Off</span>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-teal" />
                  <span className="text-sm text-white/70 leading-snug">Everything in Basic</span>
                </li>
                {FEATURED_EXTRAS.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-teal" />
                    <span className="text-sm text-white/70 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <Button href="/apply" variant="primary" size="md" className="w-full">
                Get Featured Listing
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <p className="text-center text-xs text-muted mt-8 max-w-lg mx-auto">
            12-month annual listing. All listings debut August 2026. Only one Featured Listing available per city.
          </p>
          <div className="flex justify-center mt-6">
            <a
              href="tel:+18664265255"
              className="inline-flex items-center gap-2.5 rounded-lg border border-navy/20 bg-sky px-5 py-3 text-sm font-semibold text-navy hover:bg-sky-dark hover:border-teal/50 transition-colors"
            >
              <Phone className="h-4 w-4 text-teal" />
              Questions? Call&nbsp;<span className="text-teal">(866) 426-5255</span>
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
