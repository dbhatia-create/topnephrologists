"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Plus, Trash2, ChevronRight, ChevronLeft,
  MapPin, Star, CheckCircle2, AlertCircle,
} from "lucide-react";
import { applySchema, type ApplyFormData } from "@/lib/schema";
import { FormField, Input, Textarea, Select } from "./FormField";
import CityCombobox from "./CityCombobox";
import ServicesSelect from "./ServicesSelect";
import PricingEstimate from "./PricingEstimate";
import Button from "./Button";
import { getTrafficSource } from "./TrafficSourceTracker";
import { PRICING, formatCurrency } from "@/lib/pricing";

const US_STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
  ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],
  ["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],
  ["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],
  ["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],["MO","Missouri"],
  ["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],
  ["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],
  ["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],
  ["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],
  ["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
  ["DC","District of Columbia"],
] as const;

const POPULAR_CITIES = [
  { city: "New York", state: "NY", pop: "8.3M" },
  { city: "Los Angeles", state: "CA", pop: "3.9M" },
  { city: "Chicago", state: "IL", pop: "2.7M" },
  { city: "Houston", state: "TX", pop: "2.3M" },
  { city: "Phoenix", state: "AZ", pop: "1.6M" },
  { city: "Philadelphia", state: "PA", pop: "1.6M" },
  { city: "San Diego", state: "CA", pop: "1.4M" },
  { city: "Dallas", state: "TX", pop: "1.3M" },
  { city: "Miami", state: "FL", pop: "470K" },
  { city: "Atlanta", state: "GA", pop: "498K" },
  { city: "Seattle", state: "WA", pop: "749K" },
  { city: "Denver", state: "CO", pop: "715K" },
  { city: "Boston", state: "MA", pop: "675K" },
  { city: "Nashville", state: "TN", pop: "689K" },
  { city: "Las Vegas", state: "NV", pop: "641K" },
  { city: "Charlotte", state: "NC", pop: "874K" },
];

const STEP_TITLES = ["Select Cities", "Contact Info", "Payment", "Enhance Listing", "Practice Info"];

const formatPhone = (val: string) => {
  const d = val.replace(/\D/g, "");
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
};
const formatCard = (val: string) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const formatExpiry = (val: string) => {
  const d = val.replace(/\D/g, "").slice(0, 4);
  if (d.length >= 3) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return d;
};

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [popularStatus, setPopularStatus] = useState<Record<string, "available" | "taken">>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [bioLength, setBioLength] = useState(0);

  const {
    register, handleSubmit, control, watch, getValues, setValue, trigger,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      type: "apply",
      locations: [{ city: "", state: "" }],
      services: [],
      featuredPlacement: true,
      excludedFeatured: [],
      assetPermission: "grant",
    },
    mode: "onTouched",
  });

  const { fields: locFields, append: addLocation, remove: removeLocation } = useFieldArray({ control, name: "locations" });

  const watchedServices = watch("services");
  const watchedLocations = watch("locations");
  const watchedFeatured = watch("featuredPlacement");
  const watchedExcluded = watch("excludedFeatured");
  const watchedBio = watch("bio");

  useEffect(() => { setBioLength(watchedBio?.length ?? 0); }, [watchedBio]);

  const checkCityAvailability = useCallback(async (city: string, state: string) => {
    if (!city || !state) return;
    try {
      const res = await fetch(`/api/cities/availability?${new URLSearchParams({ city, state })}`);
      if (!res.ok) return;
      const data = await res.json();
      const taken: boolean = data.taken ?? false;
      const key = `${city}|${state}`;
      setTakenSlots((prev) => {
        if (taken && !prev.includes(key)) return [...prev, key];
        if (!taken) return prev.filter((s) => s !== key);
        return prev;
      });
    } catch { /* fail open */ }
  }, []);

  // Pre-check popular cities availability on mount
  useEffect(() => {
    POPULAR_CITIES.forEach(async ({ city, state }) => {
      try {
        const res = await fetch(`/api/cities/availability?${new URLSearchParams({ city, state })}`);
        if (!res.ok) return;
        const data = await res.json();
        setPopularStatus((prev) => ({ ...prev, [`${city}|${state}`]: data.taken ? "taken" : "available" }));
      } catch { /* fail open */ }
    });
  }, []);

  useEffect(() => {
    if (!watchedFeatured) return;
    getValues("locations").forEach((loc) => {
      if (loc.city && loc.state) checkCityAvailability(loc.city, loc.state);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedFeatured]);

  function addPopularCity(city: string, state: string) {
    const alreadyAdded = watchedLocations.some((l) => l.city === city && l.state === state);
    if (alreadyAdded) return;
    const emptyIdx = watchedLocations.findIndex((l) => !l.city || !l.state);
    if (emptyIdx >= 0) {
      setValue(`locations.${emptyIdx}.city`, city, { shouldValidate: true });
      setValue(`locations.${emptyIdx}.state`, state, { shouldValidate: true });
    } else {
      addLocation({ city, state });
    }
    checkCityAvailability(city, state);
  }

  const stepFields: (keyof ApplyFormData)[][] = [
    ["locations"],
    ["contactFirstName", "contactLastName", "email", "contactPhone", "plaqueShippingAddress", "plaqueShippingCity", "plaqueShippingState", "plaqueShippingZip"],
    ["cardNumber", "cardExpiry", "cardCvc", "cardName", "billingZip", "consentToTerms"],
    [],
    ["businessName", "businessPhone", "assetPermission"],
  ];

  async function goNext() {
    const valid = await trigger(stepFields[step - 1]);
    if (valid) {
      setStep((s) => Math.min(s + 1, 5));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFeatured(key: string) {
    const current = getValues("excludedFeatured") ?? [];
    setValue("excludedFeatured", current.includes(key) ? current.filter((k) => k !== key) : [...current, key], { shouldDirty: true });
  }

  async function onSubmit(data: ApplyFormData) {
    setServerError(null);
    const finalExcluded = [...new Set([...(getValues("excludedFeatured") ?? []), ...takenSlots])];
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-traffic-source": getTrafficSource(),
          "x-landing-page": window.location.pathname,
        },
        body: JSON.stringify({ ...data, excludedFeatured: finalExcluded }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal/5 p-10 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/20">
          <Image src="/logo.png" alt="" width={36} height={36} className="object-contain mix-blend-multiply" />
        </div>
        <h2 className="font-display text-2xl font-bold text-navy">Application Received!</h2>
        <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
          We&apos;ll reach out if we need anything to finalize your listing. Questions?{" "}
          <a href="tel:+18664265255" className="text-teal font-semibold hover:text-teal-dark">(866) 426-5255</a>
        </p>
      </div>
    );
  }

  const validLocations = watchedLocations.filter((l) => l.city && l.state);

  return (
    <>
      <div className="text-center mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 mb-4">
          <Image src="/logo.png" alt="" width={28} height={28} className="object-contain mix-blend-multiply" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-3">Apply to Be Listed</h1>
        <p className="text-muted text-lg leading-relaxed">
          Complete the form below to secure your listing on TopGeriatricians.com.
          All listings go live in August 2026.
        </p>
      </div>

      <div className="rounded-2xl border border-sky-dark bg-white shadow-sm overflow-hidden">
        {/* Step progress */}
        <div className="border-b border-sky-dark px-6 py-4 bg-sky">
          <div className="flex items-center justify-between max-w-2xl mx-auto gap-1">
            {STEP_TITLES.map((title, i) => {
              const s = i + 1;
              const active = s === step;
              const done = s < step;
              return (
                <div key={title} className="flex items-center gap-1 sm:gap-2">
                  <div className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-xs font-bold transition-colors flex-shrink-0 ${
                    done ? "bg-teal text-white" : active ? "bg-navy text-white" : "bg-white border border-sky-dark text-muted"
                  }`}>
                    {done ? "✓" : s}
                  </div>
                  <span className={`text-xs font-medium hidden sm:inline transition-colors ${active ? "text-navy" : done ? "text-teal" : "text-muted"}`}>{title}</span>
                  {i < 4 && <ChevronRight className="h-3 w-3 text-muted mx-0.5 sm:mx-1 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input type="text" aria-hidden tabIndex={-1} className="absolute opacity-0 h-0 w-0 pointer-events-none" {...register("_honeypot")} />

          <div className="p-6 sm:p-8">

            {/* ── STEP 1: Select Cities & Specialties ── */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-1">Select Your Cities</h2>
                  <p className="text-sm text-muted">Choose the markets where you want to be listed. Featured placement secures the top spot — only 1 per city.</p>
                </div>

                {/* Popular cities grid */}
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Popular Markets</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {POPULAR_CITIES.map(({ city, state, pop }) => {
                      const key = `${city}|${state}`;
                      const isTaken = popularStatus[key] === "taken";
                      const isSelected = watchedLocations.some((l) => l.city === city && l.state === state);
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={isTaken}
                          onClick={() => addPopularCity(city, state)}
                          className={`relative text-left p-3 rounded-xl border-2 transition-all ${
                            isSelected
                              ? "border-teal bg-teal/5 cursor-default"
                              : isTaken
                              ? "border-red-200 bg-red-50 cursor-not-allowed opacity-70"
                              : "border-sky-dark hover:border-teal/60 hover:bg-sky cursor-pointer active:scale-95"
                          }`}
                        >
                          <p className="text-sm font-semibold text-navy leading-tight">{city}</p>
                          <p className="text-xs text-muted">{state} · Pop. {pop}</p>
                          <div className="mt-1.5">
                            {isSelected ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal">
                                <CheckCircle2 className="h-3 w-3" /> Selected
                              </span>
                            ) : isTaken ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600">
                                <AlertCircle className="h-3 w-3" /> Featured Taken
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium text-teal/80">+ Add</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom city search */}
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Search Any City</p>
                  {locFields.map((field, i) => {
                    const stateVal = watch(`locations.${i}.state`) ?? "";
                    const lockedCities = (watchedLocations ?? []).filter((l, j) => j !== i && !!l.city && l.state === stateVal).map((l) => l.city);
                    const cityKey = (watchedLocations[i]?.city && watchedLocations[i]?.state)
                      ? `${watchedLocations[i].city}|${watchedLocations[i].state}`
                      : null;
                    const isCityTaken = cityKey ? takenSlots.includes(cityKey) : false;
                    return (
                      <Fragment key={field.id}>
                        <div className={`flex items-start gap-3${i > 0 ? " mt-3" : ""}`}>
                          <FormField label={i === 0 ? "State" : ""} required={i === 0} error={errors.locations?.[i]?.state?.message} className="flex-1">
                            <Select
                              {...register(`locations.${i}.state`)}
                              onChange={(e) => { register(`locations.${i}.state`).onChange(e); setValue(`locations.${i}.city`, ""); }}
                              error={errors.locations?.[i]?.state?.message}
                            >
                              <option value="">Select state</option>
                              {US_STATES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                            </Select>
                          </FormField>
                          <FormField label={i === 0 ? "City" : ""} required={i === 0} error={errors.locations?.[i]?.city?.message} className="flex-1">
                            <CityCombobox
                              state={stateVal}
                              value={watch(`locations.${i}.city`)}
                              excludedCities={lockedCities}
                              onChange={(city) => {
                                setValue(`locations.${i}.city`, city, { shouldValidate: true });
                                if (city && stateVal && watchedFeatured) checkCityAvailability(city, stateVal);
                              }}
                              error={errors.locations?.[i]?.city?.message}
                            />
                          </FormField>
                          {locFields.length > 1 && (
                            <button type="button" onClick={() => removeLocation(i)} className={`text-muted hover:text-red-500 transition-colors flex-shrink-0 ${i === 0 ? "pt-6" : "pt-1"}`} aria-label="Remove city">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        {isCityTaken && (
                          <div className="mt-1.5 flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                            Featured slot is already taken for this city — basic listing still available.
                          </div>
                        )}
                      </Fragment>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => addLocation({ city: "", state: "" })}
                    className="mt-4 inline-flex items-center gap-2 text-base font-extrabold text-navy border-2 border-navy/25 hover:border-teal hover:text-teal bg-white rounded-xl px-6 py-3.5 transition-all"
                  >
                    <Plus className="h-5 w-5" /> Add Another City
                  </button>
                </div>

                {/* Selected cities summary */}
                {validLocations.length > 0 && (
                  <div className="rounded-xl border border-sky-dark bg-sky p-4">
                    <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Your Selected Cities</p>
                    <div className="space-y-2">
                      {validLocations.map((loc) => {
                        const key = `${loc.city}|${loc.state}`;
                        const taken = takenSlots.includes(key);
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-teal flex-shrink-0" />
                              <span className="text-sm font-medium text-navy">{loc.city}, {loc.state}</span>
                            </div>
                            {taken ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 border border-red-200 rounded px-2 py-0.5">
                                <AlertCircle className="h-3 w-3" /> Featured Taken
                              </span>
                            ) : watchedFeatured ? (
                              <span className="text-[10px] font-bold text-teal bg-teal/10 border border-teal/20 rounded px-2 py-0.5">Featured Available</span>
                            ) : (
                              <span className="text-[10px] font-medium text-muted bg-white border border-sky-dark rounded px-2 py-0.5">Basic</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Featured placement toggle */}
                <label className={`flex items-start gap-3 cursor-pointer p-5 rounded-xl border-2 transition-all ${watchedFeatured ? "border-teal bg-teal/5 shadow-[0_0_0_4px_rgba(0,185,160,0.12)]" : "border-sky-dark hover:border-teal/40"}`}>
                  <input
                    type="checkbox"
                    {...register("featuredPlacement")}
                    className="h-5 w-5 rounded accent-teal flex-shrink-0 mt-0.5"
                    onChange={(e) => {
                      register("featuredPlacement").onChange(e);
                      if (!e.target.checked) { setTakenSlots([]); setValue("excludedFeatured", []); }
                      else { getValues("locations").forEach((loc) => { if (loc.city && loc.state) checkCityAvailability(loc.city, loc.state); }); }
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-navy">Include Featured Listing</p>
                      <span className="text-[10px] font-bold text-teal bg-teal/10 border border-teal/20 rounded-full px-2.5 py-0.5">
                        +{formatCurrency(PRICING.featuredFirstCity)}/city
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">Pins your practice at the top of each city page. Only 1 per city — first-come, first-served.</p>
                  </div>
                </label>

                {/* Specialties */}
                <div>
                  <p className="text-sm font-semibold text-navy mb-1">Geriatric Specialties <span className="text-muted text-xs font-normal">(optional)</span></p>
                  <p className="text-xs text-muted mb-3">Select all specialties your practice offers.</p>
                  <ServicesSelect
                    value={watchedServices ?? []}
                    onChange={(selected) => setValue("services", selected, { shouldValidate: true })}
                    error={errors.services?.message as string}
                  />
                </div>

                {typeof errors.locations?.message === "string" && (
                  <p className="text-xs text-red-600">{errors.locations.message}</p>
                )}
              </div>
            )}

            {/* ── STEP 2: Contact Info ── */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-1">Contact Information</h2>
                  <p className="text-sm text-muted">Your contact details for this listing.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="First Name" required error={errors.contactFirstName?.message}>
                    <Input {...register("contactFirstName")} error={errors.contactFirstName?.message} placeholder="Jane" />
                  </FormField>
                  <FormField label="Last Name" required error={errors.contactLastName?.message}>
                    <Input {...register("contactLastName")} error={errors.contactLastName?.message} placeholder="Smith" />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Title / Role" hint="optional" error={errors.contactTitle?.message}>
                    <Input {...register("contactTitle")} error={errors.contactTitle?.message} placeholder="Geriatrician, Medical Director…" />
                  </FormField>
                  <FormField label="Company / Practice" hint="optional" error={errors.company?.message}>
                    <Input {...register("company")} error={errors.company?.message} placeholder="Summit Senior Care" />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Email Address" required error={errors.email?.message}>
                    <Input {...register("email")} type="email" error={errors.email?.message} placeholder="jane@yourpractice.com" />
                  </FormField>
                  <FormField label="Phone" required error={errors.contactPhone?.message}>
                    <Input
                      {...register("contactPhone")}
                      onChange={(e) => { e.target.value = formatPhone(e.target.value); register("contactPhone").onChange(e); }}
                      type="tel" error={errors.contactPhone?.message} placeholder="(555) 000-0000"
                    />
                  </FormField>
                </div>
                <FormField label="Notes" hint="optional" error={errors.notes?.message}>
                  <Textarea {...register("notes")} error={errors.notes?.message} rows={3} placeholder="Anything else we should know?" />
                </FormField>

                <div className="pt-4 border-t border-sky-dark">
                  <h3 className="text-sm font-semibold text-navy mb-1">Complimentary Plaque Delivery</h3>
                  <p className="text-xs text-muted mb-4">Where should we ship your complimentary custom recognition plaque?</p>
                  <div className="space-y-5">
                    <FormField label="Street Address" required error={errors.plaqueShippingAddress?.message}>
                      <Input {...register("plaqueShippingAddress")} error={errors.plaqueShippingAddress?.message} placeholder="123 Main St, Suite 400" autoComplete="off" />
                    </FormField>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <FormField label="City" required error={errors.plaqueShippingCity?.message} className="sm:col-span-1">
                        <Input {...register("plaqueShippingCity")} error={errors.plaqueShippingCity?.message} placeholder="Dallas" autoComplete="off" />
                      </FormField>
                      <FormField label="State" required error={errors.plaqueShippingState?.message}>
                        <Select {...register("plaqueShippingState")} error={errors.plaqueShippingState?.message} autoComplete="off">
                          <option value="">State</option>
                          {US_STATES.map(([code]) => <option key={code} value={code}>{code}</option>)}
                        </Select>
                      </FormField>
                      <FormField label="ZIP Code" required error={errors.plaqueShippingZip?.message}>
                        <Input {...register("plaqueShippingZip")} error={errors.plaqueShippingZip?.message} placeholder="75201" maxLength={10} inputMode="numeric" autoComplete="off" />
                      </FormField>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Payment ── */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-1">Payment</h2>
                  <p className="text-sm text-muted">Secure annual listing fee. All listings debut August 2026.</p>
                </div>

                <PricingEstimate
                  cities={watchedLocations}
                  featured={watchedFeatured}
                  excludedFeatured={watchedExcluded ?? []}
                  takenSlots={takenSlots}
                  onToggleFeatured={toggleFeatured}
                />

                <div className="pt-2 space-y-4">
                  <FormField label="Card Number" required error={errors.cardNumber?.message}>
                    <Input
                      {...register("cardNumber")}
                      onChange={(e) => { e.target.value = formatCard(e.target.value); register("cardNumber").onChange(e); }}
                      error={errors.cardNumber?.message} placeholder="1234 5678 9012 3456" maxLength={19} inputMode="numeric"
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Expiry Date" required error={errors.cardExpiry?.message}>
                      <Input
                        {...register("cardExpiry")}
                        onChange={(e) => { e.target.value = formatExpiry(e.target.value); register("cardExpiry").onChange(e); }}
                        error={errors.cardExpiry?.message} placeholder="MM/YY" maxLength={5} inputMode="numeric"
                      />
                    </FormField>
                    <FormField label="Security Code" required error={errors.cardCvc?.message}>
                      <Input {...register("cardCvc")} error={errors.cardCvc?.message} placeholder="CVV" maxLength={4} inputMode="numeric" />
                    </FormField>
                  </div>
                  <FormField label="Name on Card" required error={errors.cardName?.message}>
                    <Input {...register("cardName")} error={errors.cardName?.message} placeholder="Jane Smith" />
                  </FormField>
                  <FormField label="Billing ZIP Code" required error={errors.billingZip?.message}>
                    <div className="max-w-[180px]">
                      <Input {...register("billingZip")} error={errors.billingZip?.message} placeholder="75201" maxLength={10} inputMode="numeric" />
                    </div>
                  </FormField>
                </div>

                <div className="space-y-1">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" {...register("consentToTerms")} className="mt-0.5 h-4 w-4 rounded accent-teal flex-shrink-0" />
                    <span className="text-sm text-muted leading-snug">
                      I agree to the{" "}
                      <a href="/terms" target="_blank" className="text-teal font-medium underline hover:text-teal-dark">Terms of Service</a>{" "}
                      and{" "}
                      <a href="/privacy" target="_blank" className="text-teal font-medium underline hover:text-teal-dark">Privacy Policy</a>.
                      I understand that my listing fee is non-refundable.
                    </span>
                  </label>
                  {errors.consentToTerms && <p className="text-xs text-red-600 pl-7">{errors.consentToTerms.message}</p>}
                </div>
              </div>
            )}

            {/* ── STEP 4: Enhance Listing (Add-ons) ── */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-1">Enhance Your Listing</h2>
                  <p className="text-sm text-muted">Optional upgrades to maximize your reach and visibility.</p>
                </div>

                {/* Upgrade to Featured */}
                {!watchedFeatured && (
                  <div className="rounded-xl border-2 border-teal/40 bg-teal/5 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Star className="h-4 w-4 text-teal flex-shrink-0" />
                          <p className="font-semibold text-navy text-sm">Upgrade to Featured Listing</p>
                          <span className="text-[10px] font-bold text-teal bg-teal/10 border border-teal/20 rounded-full px-2.5 py-0.5">
                            +{formatCurrency(PRICING.featuredFirstCity)}/city
                          </span>
                        </div>
                        <p className="text-xs text-muted">Pins your practice at the very top of each city page. Only 1 available per city.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setValue("featuredPlacement", true);
                          getValues("locations").forEach((loc) => { if (loc.city && loc.state) checkCityAvailability(loc.city, loc.state); });
                        }}
                        className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-white bg-teal hover:bg-teal-dark rounded-xl px-4 py-2.5 shadow-sm transition-all"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add
                      </button>
                    </div>
                  </div>
                )}

                {watchedFeatured && (
                  <div className="rounded-xl border border-teal/20 bg-teal/5 p-4 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal flex-shrink-0" />
                    <p className="text-sm font-medium text-navy">Featured Listing included — you&apos;re at the top.</p>
                  </div>
                )}

                {/* Add more cities */}
                <div className="rounded-xl border-2 border-sky-dark bg-sky p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <MapPin className="h-4 w-4 text-teal flex-shrink-0" />
                        <p className="font-semibold text-navy text-sm">Add Another City</p>
                        <span className="text-[10px] font-bold text-navy/40 bg-navy/5 border border-navy/10 rounded-full px-2.5 py-0.5">
                          +{formatCurrency(PRICING.basicPerCity)}/city
                        </span>
                      </div>
                      <p className="text-xs text-muted">Currently listed in {validLocations.length} {validLocations.length === 1 ? "city" : "cities"}.</p>
                    </div>
                  </div>
                  {/* Mini city picker */}
                  {locFields.map((field, i) => {
                    const stateVal = watch(`locations.${i}.state`) ?? "";
                    const lockedCities = (watchedLocations ?? []).filter((l, j) => j !== i && !!l.city && l.state === stateVal).map((l) => l.city);
                    if (watchedLocations[i]?.city && watchedLocations[i]?.state) return null;
                    return (
                      <div key={field.id} className="flex items-start gap-3 mb-3">
                        <FormField label="State" error={errors.locations?.[i]?.state?.message} className="flex-1">
                          <Select {...register(`locations.${i}.state`)} onChange={(e) => { register(`locations.${i}.state`).onChange(e); setValue(`locations.${i}.city`, ""); }} error={errors.locations?.[i]?.state?.message}>
                            <option value="">Select state</option>
                            {US_STATES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                          </Select>
                        </FormField>
                        <FormField label="City" error={errors.locations?.[i]?.city?.message} className="flex-1">
                          <CityCombobox state={stateVal} value={watch(`locations.${i}.city`)} excludedCities={lockedCities}
                            onChange={(city) => {
                              setValue(`locations.${i}.city`, city, { shouldValidate: true });
                              if (city && stateVal && watchedFeatured) checkCityAvailability(city, stateVal);
                            }}
                            error={errors.locations?.[i]?.city?.message}
                          />
                        </FormField>
                        <button type="button" onClick={() => removeLocation(i)} className="text-muted hover:text-red-500 transition-colors flex-shrink-0 pt-6" aria-label="Remove city">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => addLocation({ city: "", state: "" })}
                    className="inline-flex items-center gap-2 text-base font-extrabold text-navy border-2 border-navy/25 hover:border-teal hover:text-teal bg-white rounded-xl px-6 py-3.5 transition-all"
                  >
                    <Plus className="h-4 w-4" /> Add Another City
                  </button>
                </div>

                {/* Updated order summary */}
                <PricingEstimate
                  cities={watchedLocations}
                  featured={watchedFeatured}
                  excludedFeatured={watchedExcluded ?? []}
                  takenSlots={takenSlots}
                  onToggleFeatured={toggleFeatured}
                />
              </div>
            )}

            {/* ── STEP 5: Practice Information ── */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-1">Practice Information</h2>
                  <p className="text-sm text-muted">Tell us about your practice so we can build your listing.</p>
                </div>

                <FormField label="Practice / Business Name" required error={errors.businessName?.message}>
                  <Input {...register("businessName")} error={errors.businessName?.message} placeholder="Apex Geriatric Associates" />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Business Phone" required error={errors.businessPhone?.message}>
                    <Input
                      {...register("businessPhone")}
                      onChange={(e) => { e.target.value = formatPhone(e.target.value); register("businessPhone").onChange(e); }}
                      type="tel" error={errors.businessPhone?.message} placeholder="(555) 000-0000"
                    />
                  </FormField>
                  <FormField label="Website" hint="optional" error={errors.website?.message}>
                    <Input {...register("website")} error={errors.website?.message} placeholder="https://yourpractice.com" type="url" />
                  </FormField>
                </div>

                <FormField
                  label="About Your Practice"
                  hint={`${bioLength.toLocaleString()} / 1,500 characters`}
                  error={errors.bio?.message}
                >
                  <Textarea
                    {...register("bio")}
                    rows={5}
                    error={errors.bio?.message}
                    placeholder="Describe your geriatric practice, your approach to senior care, and what makes your practice stand out for older adults and their families…"
                    maxLength={1500}
                  />
                  <div className="mt-1 h-1 rounded-full bg-sky-dark overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${bioLength > 1400 ? "bg-red-400" : bioLength > 1000 ? "bg-yellow-400" : "bg-teal"}`}
                      style={{ width: `${Math.min((bioLength / 1500) * 100, 100)}%` }}
                    />
                  </div>
                </FormField>

                <div>
                  <p className="text-sm font-semibold text-navy mb-3">Website Asset Permission <span className="text-red-500">*</span></p>
                  <div className="space-y-3">
                    {(["grant", "support"] as const).map((val) => (
                      <label key={val} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${watch("assetPermission") === val ? "border-teal bg-teal/5" : "border-sky-dark hover:border-teal/40"}`}>
                        <input type="radio" value={val} {...register("assetPermission")} className="mt-0.5 h-4 w-4 accent-teal flex-shrink-0" />
                        <div>
                          {val === "grant" ? (
                            <>
                              <p className="font-semibold text-sm text-navy">I grant TopGeriatricians.com permission</p>
                              <p className="text-xs text-muted mt-0.5">to use photos, logos, and content from my website for my directory listing.</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold text-sm text-navy">I&apos;d like your support team to contact me</p>
                              <p className="text-xs text-muted mt-0.5">to discuss assets and listing content.</p>
                            </>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.assetPermission && <p className="text-xs text-red-600 mt-1.5">{errors.assetPermission.message}</p>}
                </div>

                {serverError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
                    {serverError}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Navigation */}
          <div className="border-t border-sky-dark px-6 py-4 bg-sky flex justify-between items-center gap-4">
            <div>
              {step > 1 && (
                <Button type="button" variant="outline-dark" size="md" onClick={goBack}>
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              )}
            </div>
            <div>
              {step < 5
                ? <Button type="button" variant="primary" size="md" onClick={goNext}>
                    Continue <ChevronRight className="h-4 w-4" />
                  </Button>
                : <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting…" : "Submit Application"}
                  </Button>
              }
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
