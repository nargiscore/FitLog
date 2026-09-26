import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-accent/60"
    >
      <div className="relative h-48 w-full overflow-hidden bg-panel2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover  transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      {/* <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-base uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
       <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted">
  <span className="flex items-center gap-1">
    <Clock className="h-3.5 w-3.5 text-accent" />
    {workout.duration} min
  </span>

  <span className="flex items-center gap-1">
    <Flame className="h-3.5 w-3.5 text-accent" />
    {workout.caloriesBurned} kcal
  </span>

  <span className="flex items-center gap-1">
    <Star className="h-3.5 w-3.5 text-accent" />
    {workout.rating}
  </span>
</div>
      </div> */}

      <div className="flex flex-1 flex-col gap-2 p-4">
  {/* Muscle Groups */}
  <div className="flex flex-wrap gap-1.5">
    {workout.muscleGroups.map((tag) => (
      <span
        key={tag}
        className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black"
      >
        {tag}
      </span>
    ))}
  </div>

  {/* Workout Name */}
  <h3 className="font-display text-base uppercase tracking-wide text-white">
    {workout.name}
  </h3>

  {/* Description */}
  <p className="text-xs text-muted">
    {workout.description}
  </p>

  {/* Equipment */}
  <p className="text-xs text-muted">
    {workout.equipment}
  </p>

  {/* Duration / Calories / Rating */}
  <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted">
    <span className="flex items-center gap-1">
      <Clock className="h-3.5 w-3.5 text-accent" />
      {workout.duration} min
    </span>

    <span className="flex items-center gap-1">
      <Flame className="h-3.5 w-3.5 text-accent" />
      {workout.caloriesBurned} kcal
    </span>

    <span className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 text-accent" />
      {workout.rating}
    </span>
  </div>
</div>
    </Link>
  );
}
