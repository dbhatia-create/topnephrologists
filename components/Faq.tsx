"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import Container from "./Container";
import FadeIn from "./FadeIn";
import type { FaqItem } from "@/content/faq";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-sky py-20 lg:py-24">
      <Container>
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
              Common Questions
            </h2>
            <div className="w-12 h-0.5 bg-teal mx-auto" />
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto divide-y divide-sky-dark">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="py-5">
                <button
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-navy text-base">{item.question}</span>
                  <ChevronDown
                    className={clsx(
                      "h-5 w-5 text-teal flex-shrink-0 transition-transform duration-200",
                      open === i && "rotate-180",
                    )}
                  />
                </button>
                {open === i && (
                  <p className="mt-3 text-sm text-muted leading-relaxed">{item.answer}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
