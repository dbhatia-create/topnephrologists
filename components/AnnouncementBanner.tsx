import { Zap } from "lucide-react";
import Container from "./Container";
import FadeIn from "./FadeIn";
import Button from "./Button";

export default function AnnouncementBanner() {
  return (
    <section className="bg-teal py-10">
      <Container>
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                <Zap className="h-5 w-5 text-white fill-white" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white leading-snug">
                  Pre-Launch Special — Balance of 2026 + All of 2027
                </p>
                <p className="text-white/80 text-sm mt-0.5">
                  Apply before August 2026 to lock in extended coverage at no extra cost.
                </p>
              </div>
            </div>
            <Button href="/apply" variant="outline-light" size="md" className="flex-shrink-0 border-white text-white hover:bg-white hover:text-navy">
              Claim Your Spot
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
