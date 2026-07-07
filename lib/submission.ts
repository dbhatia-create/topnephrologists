import type { ApplyFormData } from "@/lib/schema";
import type { SiteConfig } from "@/lib/config";
import type { SelectedMarket } from "@/lib/checkoutMarkets";
import type {
  ContactInfo,
  PlaqueShippingAddress,
  PaymentInfo,
  ListingInfo,
} from "@/lib/store/checkoutStore";

/**
 * Maps the checkout wizard's store state into topnephrologists' existing
 * ApplyFormData shape (lib/schema.ts's applySchema), so it can be POSTed
 * straight to the existing /api/apply route (which validates against
 * applySchema and then calls the BFF via lib/bff.ts — this function does not
 * talk to the BFF directly).
 *
 * This site's pricing model (lib/pricing.ts) sells Featured Placement per
 * city only — the store tracks a single `featured` boolean per selected
 * market (see lib/checkoutMarkets.ts's SelectedMarket), so featuredPlacement
 * is "was Featured selected for any market" and excludedFeatured is simply
 * the "city|state" keys of markets that opted out.
 */
export function buildSubmissionPayload(params: {
  config: SiteConfig;
  selectedMarkets: SelectedMarket[];
  specialtyIds: string[];
  contact: ContactInfo;
  plaqueShipping: PlaqueShippingAddress | null;
  payment: PaymentInfo;
  selectedUpsellIds: string[];
  listingChoice: "now" | "later";
  listingInfo: ListingInfo | null;
}): ApplyFormData {
  const specialtyOptions = params.config.specialty?.options ?? [];
  const serviceLabels = specialtyOptions
    .filter((o) => params.specialtyIds.includes(o.id))
    .map((o) => o.label);

  const featuredPlacement = params.selectedMarkets.some((m) => m.featured);
  const excludedFeatured = params.selectedMarkets
    .filter((m) => !m.featured)
    .map((m) => `${m.city}|${m.state}`);

  return {
    type: "apply",
    businessName: params.listingInfo?.businessName || params.contact.company,
    website: params.listingInfo?.website ?? "",
    businessPhone: params.listingInfo?.listingPhone || params.contact.phone,
    // Maps 1:1 from the store's grant/support enum (see checkoutStore.ts's
    // AssetPermission) onto applySchema's own "grant" | "support" enum.
    assetPermission: params.listingInfo?.assetPermission ?? "grant",

    locations: params.selectedMarkets.map((m) => ({ city: m.city, state: m.state })),
    services: serviceLabels,
    featuredPlacement,
    excludedFeatured,

    contactFirstName: params.contact.firstName,
    contactLastName: params.contact.lastName,
    email: params.contact.email,
    contactPhone: params.contact.phone,
    contactTitle: params.contact.title,
    company: params.contact.company,
    plaqueShippingAddress: params.plaqueShipping?.street ?? "",
    plaqueShippingCity: params.plaqueShipping?.city ?? "",
    plaqueShippingState: params.plaqueShipping?.state ?? "",
    plaqueShippingZip: params.plaqueShipping?.zip ?? "",
    notes: params.contact.notes,
    bio: params.listingInfo?.bio ?? "",

    cardNumber: params.payment.cardNumber,
    cardExpiry: params.payment.expiry,
    cardCvc: params.payment.cvv,
    cardName: params.payment.cardholderName,
    billingAddress: params.payment.billingAddress,
    billingCity: params.payment.billingCity,
    billingState: params.payment.billingState,
    billingZip: params.payment.billingZip,
    consentToTerms: true,
  };
}
