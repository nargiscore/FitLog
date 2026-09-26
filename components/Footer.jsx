import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2 text-white">
          <Dumbbell className="h-5 w-5 text-accent" />
          <span className="font-display tracking-wide">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
