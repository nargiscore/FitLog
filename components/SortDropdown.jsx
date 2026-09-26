"use client";

import { ChevronDown } from "lucide-react";

const OPTIONS = ["Duration", "Calories", "Rating"];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-line bg-panel2 py-2 pl-3 pr-8 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent"
        aria-label="Sort by"
      >
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            Sort By: {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}
