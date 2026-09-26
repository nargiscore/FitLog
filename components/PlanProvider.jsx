"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

function readList(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // storage unavailable, ignore
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readList(PLAN_KEY));
    setSaved(readList(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeList(PLAN_KEY, plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) writeList(SAVED_KEY, saved);
  }, [saved, hydrated]);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 2600);
  }, []);

  const addToPlan = useCallback(
    (workout) => {
      let added = false;
      let atCap = false;
      setPlan((prev) => {
        if (prev.some((w) => w.id === workout.id)) return prev;
        if (prev.length >= PLAN_CAP) {
          atCap = true;
          return prev;
        }
        added = true;
        return [...prev, { ...workout, done: false }];
      });
      if (atCap) showToast("Today's plan is full — cap of five lifts");
      else if (added) showToast("Added to today's plan");
      else showToast("Already in today's plan");
    },
    [showToast]
  );

  const addToSaved = useCallback(
    (workout) => {
      let added = false;
      setSaved((prev) => {
        if (prev.some((w) => w.id === workout.id)) return prev;
        added = true;
        return [...prev, workout];
      });
      showToast(added ? "Saved for later" : "Already saved");
    },
    [showToast]
  );

  const removeFromPlan = useCallback(
    (id) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from today's plan");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from saved");
    },
    [showToast]
  );

  const markDone = useCallback(
    (id) => {
      setPlan((prev) =>
        prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
      );
      showToast("Marked as done");
    },
    [showToast]
  );

  const value = {
    plan,
    saved,
    planCount: plan.length,
    savedCount: saved.length,
    planCap: PLAN_CAP,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
    showToast,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-md border border-line bg-panel2 px-4 py-3 text-sm text-white shadow-lg shadow-black/40 animate-[fadeIn_0.15s_ease-out]"
          >
            {t.message}
          </div>
        ))}
      </div>
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
