"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/components/PlanProvider";
import PlanItemCard from "@/components/PlanItemCard";
import SortDropdown from "@/components/SortDropdown";

const SORT_KEYS = {
  Duration: "duration",
  Calories: "caloriesBurned",
  Rating: "rating",
};

export default function MyPlanPage() {
  const { plan, saved } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("Duration");

  const rawList = tab === "plan" ? plan : saved;

  const list = useMemo(() => {
    const key = SORT_KEYS[sortBy];
    return [...rawList].sort((a, b) => a[key] - b[key]);
  }, [rawList, sortBy]);

  // const metrics = useMemo(() => {
  //   return {
  //     exercises: plan.length,
  //     minutes: plan.reduce((sum, w) => sum + (w.duration || 0), 0),
  //     calories: plan.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
  //   };
  // }, [plan]);

  const metrics = useMemo(() => {
  const currentList = tab === "plan" ? plan : saved;

  return {
    exercises: currentList.length,
    minutes: currentList.reduce(
      (sum, w) => sum + (w.duration || 0),
      0
    ),
    calories: currentList.reduce(
      (sum, w) => sum + (w.caloriesBurned || 0),
      0
    ),
  };
}, [plan, saved, tab]);

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl uppercase tracking-wide text-white">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 rounded-lg border border-line bg-panel px-6 py-5">
        {[
          ["Exercises", metrics.exercises, true],
          ["Minutes", metrics.minutes, false],
          ["Calories", metrics.calories, false],
        ].map(([label, value, accent]) => (
          <div key={label}>
            <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              {label}
            </div>
            <div
              className={`mt-1 font-display text-2xl ${
                accent ? "text-accent" : "text-white"
              }`}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-line bg-panel p-1 text-xs font-semibold">
          {[
            ["plan", "Today's Plan"],
            ["saved", "Saved"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-4 py-1.5 transition-colors ${
                tab === key
                  ? "bg-panel2 text-accent"
                  : "text-muted hover:text-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-panel py-16 text-center">
            <h2 className="font-display text-xl uppercase tracking-wide text-white">
              Nothing Here Yet
            </h2>
            <p className="max-w-xs text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          list.map((workout) => (
            <PlanItemCard key={workout.id} workout={workout} tab={tab} />
          ))
        )}
      </div>
    </section>
  );
}
