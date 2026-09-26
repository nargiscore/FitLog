"use client";

import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import { getWorkouts } from "@/lib/api";

const SORT_KEYS = {
  Duration: "duration",
  Calories: "caloriesBurned",
  Rating: "rating",
};

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("Duration");

  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(() => {
    const key = SORT_KEYS[sortBy];
    return [...workouts].sort((a, b) => a[key] - b[key]);
  }, [workouts, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-wide text-white">
            The Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {loading && (
        <div className="flex h-40 items-center justify-center text-sm text-muted">
          Loading workouts…
        </div>
      )}

      {!loading && error && (
        <div className="flex h-40 items-center justify-center text-sm text-muted">
          Couldn&apos;t load the library. Try refreshing.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
