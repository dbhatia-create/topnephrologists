"use client";

import { loanProducts } from "@/content/loanProducts";

interface LoanProductSelectProps {
  value: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export default function LoanProductSelect({ value, onChange, error }: LoanProductSelectProps) {
  function toggle(label: string) {
    if (value.includes(label)) {
      onChange(value.filter((v) => v !== label));
    } else {
      onChange([...value, label]);
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {loanProducts.map((product) => {
          const selected = value.includes(product.label);
          return (
            <label
              key={product.id}
              className={`flex items-start gap-3 rounded-xl border-2 cursor-pointer p-3.5 transition-all ${
                selected
                  ? "border-teal bg-teal/5"
                  : "border-sky-dark hover:border-teal/40 bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggle(product.label)}
                className="mt-0.5 h-4 w-4 rounded accent-teal flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-sm text-navy leading-snug">{product.label}</p>
                <p className="text-xs text-muted mt-0.5 leading-snug">{product.description}</p>
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
