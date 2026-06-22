"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { citiesByState } from "@/content/cities";

interface CityComboboxProps {
  state: string;
  value: string;
  onChange: (city: string) => void;
  error?: string;
  excludedCities?: string[];
}

export default function CityCombobox({ state, value, onChange, error, excludedCities = [] }: CityComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  const cities = useMemo(
    () => (state ? (citiesByState[state] ?? []) : []),
    [state],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities.slice(0, 50);
    return cities.filter((c) => c.toLowerCase().includes(q)).slice(0, 50);
  }, [query, cities]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (!cities.includes(query)) setQuery(value);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [cities, query, value]);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder={state ? "Type to search city…" : "Select a state first"}
          disabled={!state}
          value={query}
          aria-invalid={!!error}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => state && setOpen(true)}
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-3 pr-10 text-sm text-dark placeholder-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal disabled:bg-sky/50 disabled:cursor-not-allowed",
            error ? "border-red-400" : "border-sky-dark hover:border-teal/50",
          )}
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
      </div>

      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-52 overflow-y-auto rounded-lg border border-sky-dark bg-white shadow-lg">
          {filtered.map((city) => {
            const taken = excludedCities.includes(city);
            return (
              <li key={city}>
                <button
                  type="button"
                  disabled={taken}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    taken
                      ? "text-muted opacity-50 cursor-not-allowed"
                      : "text-dark hover:bg-sky cursor-pointer"
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (!taken) {
                      onChange(city);
                      setQuery(city);
                      setOpen(false);
                    }
                  }}
                >
                  {city}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
