"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const KEY = "tia_traffic_source";
const LANDING_KEY = "tia_landing_page";

export function getTrafficSource(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(KEY) ?? "direct";
}

export function getLandingPage(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(LANDING_KEY) ?? window.location.pathname;
}

export default function TrafficSourceTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!sessionStorage.getItem(KEY)) {
      const utm = searchParams.get("utm_source") ?? searchParams.get("ref");
      const source = utm ?? document.referrer ?? "direct";
      sessionStorage.setItem(KEY, source);
      sessionStorage.setItem(LANDING_KEY, window.location.pathname);
    }
  }, [searchParams]);

  return null;
}
