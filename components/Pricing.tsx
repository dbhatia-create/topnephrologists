import { Check, Phone } from "lucide-react";
import Button from "./Button";
import Container from "./Container";
import FadeIn from "./FadeIn";
import { PRICING, formatCurrency } from "@/lib/pricing";

const LISTING_FEATURES = [
  "Full company profile with logo & description",
  "Listed by city and loan product specialties",
  "Contact details, NMLS number & website link",
  "TopMortgageCompanies.com verified badge for your website",
  "Complimentary custom recognition plaque",
  "Invitation to the Annual Awards & Recognition Event",
  "Pre-launch special: balance of 2026 + all of 2027",
  "Reach borrowers actively searching in your market",
];

export default function Pricing() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">
              Transparent Pricing
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
              Simple, Transparent Pricing
            </h2>
            <div className="w-12 h-0.5 bg-teal mx-auto mb-5" />
            <p className="text-muted max-w-xl mx-auto text-lg leading-relaxed">
              One annual fee per city. Optional Featured Listing secures the top spot
              in your city — only one available per city, first-come, first-served.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-sky-dark bg-white shadow-md p-8 flex flex-col h-full">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">
                City Listing
              </p>
              <h3 className="font-display text-2xl font-bold text-navy mb-6">
                Your Listing
              </h3>

              {/* Pricing tiers */}
              <div className="space-y-3 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-sky border border-sky-dark">
                  <div>
                    <p className="font-semibold text-navy text-sm">Basic listing</p>
                    <p className="text-xs text-muted mt-0.5">Per city — includes all loan product specialties</p>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-bold text-navy whitespace-nowrap">
                    {formatCurrency(PRICING.basicPerCity)}
                    <span className="text-sm font-normal text-muted">/yr</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-sky border border-sky-dark">
                  <div>
                    <p className="font-semibold text-navy text-sm">Featured Listing — first city</p>
                    <p className="text-xs text-muted mt-0.5">Top position above all ranked listings — 1 per city</p>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-bold text-teal whitespace-nowrap">
                    +{formatCurrency(PRICING.featuredFirstCity)}
                    <span className="text-sm font-normal text-muted">/yr</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-sky border border-sky-dark">
                  <div>
                    <p className="font-semibold text-navy text-sm">Featured Listing — each additional city</p>
                    <p className="text-xs text-muted mt-0.5">50% off for every city after the first</p>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-bold text-teal whitespace-nowrap">
                    +{formatCurrency(PRICING.featuredAdditionalCity)}
                    <span className="text-sm font-normal text-muted">/yr</span>
                  </span>
                </div>
              </div>

              {/* Included features */}
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">
                Every listing includes
              </p>
              <ul className="space-y-2.5 flex-1 mb-8">
                {LISTING_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-teal" />
                    <span className="text-sm text-muted leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <Button href="/apply" variant="secondary" size="md" className="w-full">
                Submit Your Company Profile
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <p className="text-center text-xs text-muted mt-8 max-w-lg mx-auto">
            Annual listing. All listings debut August 2026. Only one Featured Listing available per city.
          </p>
          <div className="flex justify-center mt-6">
            <a
              href="tel:+18665206592"
              className="inline-flex items-center gap-2.5 rounded-lg border border-navy/20 bg-sky px-5 py-3 text-sm font-semibold text-navy hover:bg-sky-dark hover:border-teal/50 transition-colors"
            >
              <Phone className="h-4 w-4 text-teal" />
              Questions? Call&nbsp;<span className="text-teal">(866) 520-6592</span>
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
