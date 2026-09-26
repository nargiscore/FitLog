"use client";

import { PlusCircle, Bookmark } from "lucide-react";
import { usePlan } from "./PlanProvider";

export default function DetailActions({ workout }) {
  const { addToPlan, addToSaved, plan, planCap } = usePlan();

  const alreadyInPlan = plan.some((w) => w.id === workout.id);
  const atCap = plan.length >= planCap && !alreadyInPlan;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={atCap}
        className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
      >
        <PlusCircle className="h-4 w-4" />
        Add to today&apos;s plan
      </button>
      <button
        onClick={() => addToSaved(workout)}
        className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-accenttransition-colors hover:border-accent/60"
      >
        <Bookmark className="h-4 w-4" />
        Save for later
      </button>
    </div>
  );
}
