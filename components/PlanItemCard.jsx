"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { usePlan } from "./PlanProvider";

export default function PlanItemCard({ workout, tab }) {
  const { markDone, removeFromPlan, removeFromSaved } = usePlan();

  const remove = () => {
    if (tab === "plan") removeFromPlan(workout.id);
    else removeFromSaved(workout.id);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line bg-panel p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full flex-shrink-0 overflow-hidden rounded-md bg-panel2 sm:h-16 sm:w-24">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3
          className={`font-display text-base uppercase tracking-wide ${
            workout.done ? "text-muted line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-accent">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-white hover:border-accent/60"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={() => markDone(workout.id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold ${
              workout.done
                ? "border border-line text-muted"
                : "bg-accent text-ink"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            Mark as Done
          </button>
        )}
        <button
          onClick={remove}
          className="p-1.5 text-muted hover:text-red-400"
          aria-label="Remove"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
