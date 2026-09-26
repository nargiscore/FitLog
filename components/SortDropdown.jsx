"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const OPTIONS = ["Duration", "Calories", "Rating"];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div className="mb-1 text-md font-semibold text-white">
        Sort By:
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex min-w-32 items-center justify-between gap-4 rounded-md border border-line bg-panel2 px-3 py-2 text-sm text-white"
      >
        {value}

        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-line bg-panel2 py-1 shadow-lg">
          {OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className="block w-full px-3 py-2 text-left text-sm text-white hover:bg-panel hover:text-accent"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}