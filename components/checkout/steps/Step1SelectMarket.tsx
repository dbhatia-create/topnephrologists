"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import MarketCard from "@/components/checkout/MarketCard";
import MarketSearch from "@/components/checkout/MarketSearch";
import SpecialtySelector from "@/components/checkout/SpecialtySelector";
import { useCheckoutStore } from "@/lib/store/checkoutStore";
import { getPopularMarkets, getMarketById, getNearbyMarkets, type Market } from "@/lib/checkoutMarkets";
import { marketSelectionSchema } from "@/lib/checkoutSchema";
import type { SiteConfig } from "@/lib/config";

export default function Step1SelectMarket({ config }: { config: SiteConfig }) {
  const selectedMarkets = useCheckoutStore((s) => s.selectedMarkets);
  const specialtyIds = useCheckoutStore((s) => s.specialtyIds);
  const addMarket = useCheckoutStore((s) => s.addMarket);
  const removeMarket = useCheckoutStore((s) => s.removeMarket);
  const goNext = useCheckoutStore((s) => s.goNext);

  const [searchResults, setSearchResults] = useState<Market[] | null>(null);
  const [showPopular, setShowPopular] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedAsMarkets = selectedMarkets
    .map((m) => getMarketById(m.marketId))
    .filter((m): m is Market => Boolean(m));

  // Default view (no active search, popular not toggled) falls back to
  // whatever's already selected, so returning to this step (e.g. via Back)
  // doesn't land on a blank screen.
  const visibleMarkets = searchResults ?? (showPopular ? getPopularMarkets() : selectedAsMarkets);

  const sectionLabel = searchResults
    ? "Search Results"
    : showPopular
      ? "Popular Markets"
      : "Your Selected Markets";

  const lastSelected = selectedMarkets[selectedMarkets.length - 1] ?? null;
  const lastSelectedMarket = lastSelected ? getMarketById(lastSelected.marketId) : null;
  const nearbyMarkets = lastSelectedMarket
    ? getNearbyMarkets(lastSelectedMarket).filter(
        (n) => !selectedMarkets.some((m) => m.marketId === n.id),
      )
    : [];

  function handleContinue() {
    const result = marketSelectionSchema.safeParse({
      selectedMarkets,
      specialtyIds,
      specialtyRequired: config.specialty?.required ?? false,
    });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please complete this step to continue.");
      return;
    }
    setError(null);
    goNext();
  }

  return (
    <FadeIn>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-1">
            Select your {config.marketLabel.toLowerCase()}
          </h2>
          <p className="text-sm text-muted mb-4">
            Choose one or more cities for your listing.
          </p>
          <MarketSearch
            config={config}
            onResults={(results) => {
              setSearchResults(results);
              if (results !== null) setShowPopular(false);
            }}
          />
          <p className="text-xs text-muted mt-2">
            Check available cities or{" "}
            <button
              type="button"
              onClick={() => setShowPopular((v) => !v)}
              className="font-semibold text-accent-dark hover:underline"
            >
              {showPopular ? "Hide Popular Markets" : "View Popular Markets"}
            </button>
          </p>
        </div>

        {visibleMarkets.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
              {sectionLabel}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visibleMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  isSelected={selectedMarkets.some((m) => m.marketId === market.id)}
                  pricePerYear={config.listingTier.basePrice}
                  onAdd={() => addMarket(market.id)}
                  onRemove={() => removeMarket(market.id)}
                />
              ))}
            </div>
          </div>
        )}

        {searchResults !== null && searchResults.length === 0 && (
          <p className="text-sm text-muted italic">No cities match your search.</p>
        )}

        {nearbyMarkets.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
              Nearby to {lastSelectedMarket!.city}, {lastSelectedMarket!.state}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearbyMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  isSelected={false}
                  pricePerYear={config.listingTier.basePrice}
                  onAdd={() => addMarket(market.id)}
                  onRemove={() => removeMarket(market.id)}
                />
              ))}
            </div>
          </div>
        )}

        {config.specialty && <SpecialtySelector config={config} />}

        {error && (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          {selectedMarkets.length > 0 ? (
            <p className="text-sm text-muted">
              {selectedMarkets.length} {config.marketLabel.toLowerCase()}
              {selectedMarkets.length === 1 ? "" : "s"} selected
            </p>
          ) : (
            <span />
          )}
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    </FadeIn>
  );
}
