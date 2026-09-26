import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-32 text-center">
      <p className="font-display text-6xl text-accent">404</p>
      <h1 className="font-display text-2xl uppercase tracking-wide text-white">
        Page not found
      </h1>
      <p className="text-sm text-muted">
        The lift you&apos;re looking for doesn&apos;t exist, or the route
        moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink"
      >
        Back to the library
      </Link>
    </section>
  );
}
