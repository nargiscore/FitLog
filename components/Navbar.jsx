"use client";


import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "./PlanProvider";
import logo from "../assets/logo.png";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2">
  <Image src={logo} alt={logo} className="h-6 w-6 object-contain" />
  <span className="font-display text-sm tracking-wide text-white">
    FITLOG
  </span>
</Link>

        <nav className="hidden gap-1 font-body text-xs font-medium sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-[#1A2312] text-accent"
                    : "text-white hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-xs text-white">
          <Link href="/my-plan" className="flex items-center gap-1.5">
            Plan
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-ink">
              {planCount}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5">
            Saved
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white text-[10px] font-bold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
