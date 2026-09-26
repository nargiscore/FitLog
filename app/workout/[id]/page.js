import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import DetailActions from "@/components/DetailActions";
import Image from "next/image";

export default async function WorkoutDetailPage({ params }) {
  let workout;
  try {
    workout = await getWorkout(params.id);
  } catch {
    notFound();
  }

  if (!workout || workout.error) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-xl border border-line bg-panel md:h-full md:min-h-[420px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          {/* <div className="mb-3 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink"
              >
                {tag}
              </span>
            ))}
          </div> */}
          <h1 className="font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
  {workout.muscleGroups.map((tag) => (
    <span
      key={tag}
      className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold  tracking-wide text-black"
    >
      { tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
    </span>
  ))}
</div>

          <div className="mt-6 rounded-lg border border-line bg-panel">
            {specs.map(([label, val]) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="text-muted">{label}</span>
                <span className="font-medium text-white">{val}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-muted">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-muted">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <DetailActions workout={workout} />
        </div>
      </div>
    </section>
  );
}
