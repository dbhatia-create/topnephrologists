export const PRICING = {
  basicPerCity: 289,
  featuredFirstCity: 689,
  featuredAdditionalCity: 345, // 50% off $689
} as const;

export interface QuoteInput {
  cities: { city: string; state: string }[];
  featured: boolean;
  // "city|state" keys the user has opted out of featured placement
  excludedFeatured: string[];
}

export interface QuoteLineItem {
  label: string;
  amount: number;
}

export interface Quote {
  lineItems: QuoteLineItem[];
  total: number;
}

export function calculateQuote({ cities, featured, excludedFeatured }: QuoteInput): Quote {
  const lineItems: QuoteLineItem[] = [];
  const cityCount = Math.max(1, cities.length);

  lineItems.push({
    label: `Basic listing × ${cityCount} cit${cityCount > 1 ? "ies" : "y"}`,
    amount: PRICING.basicPerCity * cityCount,
  });

  if (featured) {
    let firstIncluded = true;
    let includedCount = 0;
    let featuredTotal = 0;

    for (const loc of cities) {
      const key = `${loc.city}|${loc.state}`;
      if (!excludedFeatured.includes(key)) {
        includedCount++;
        featuredTotal += firstIncluded ? PRICING.featuredFirstCity : PRICING.featuredAdditionalCity;
        firstIncluded = false;
      }
    }

    if (includedCount > 0) {
      lineItems.push({
        label: `Featured Listing (${includedCount} cit${includedCount > 1 ? "ies" : "y"})`,
        amount: featuredTotal,
      });
    }
  }

  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
  return { lineItems, total };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}
