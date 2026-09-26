// import Image from "next/image";
// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import banner from "../assets/banner.png";

export default function Hero() {
  return (
    <section className="pt-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 rounded-xl border border-line bg-panel px-5 py-10 md:grid-cols-2 md:py-14">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-tight tracking-wide text-white md:text-5xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Browse Workouts
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="w-full overflow-hidden rounded-xl">
  <Image
    src={banner}
    alt="Athlete mid-lift"
    className="h-auto w-full"
    priority
  />
</div>
      </div>
    </section>
  );
}
