// src/components/Footer.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { QuizIcon, LearnIcon, LeaderboardIcon, UserIcon } from "@/assets";
import { useFilter } from "@/contexts/FilterContext";

export default function Footer() {
  const pathname = usePathname();
  const { continent } = useFilter();

  // returns true if the link's path matches the current pathname
  const isActive = (path) => {
    // special case: /learn should match /learn/<continent>
    if (path === "/learn") {
      return pathname?.startsWith("/learn");
    }
    return pathname === path;
  };

  // shared classes for each <Link>
  const linkClass = (path) =>
    [
      "flex flex-col items-center transition-colors duration-300",
      isActive(path)
        ? "text-[var(--color-green)] font-bold"
        : "text-gray-600 hover:text-[var(--color-green)] dark:text-gray-400 dark:hover:text-[var(--color-green)]",
    ].join(" ");

  return (
    <footer
      className="
        container
        sticky bottom-0 z-10
        bg-white dark:bg-gray-800
        w-full max-w-full mx-0 md:mx-auto px-4 lg:max-w-5xl
        flex justify-between items-center
        p-4 shadow-md rounded-sm
        transition-colors duration-300
      "
    >
      <Link href="/" className={linkClass("/")}>
        <QuizIcon className="fill-current" />
        <span className="text-xs mt-1">Take a quiz</span>
      </Link>

      <Link href={`/learn/${continent}`} className={linkClass("/learn")}>
        <LearnIcon className="fill-current" />
        <span className="text-xs mt-1">Learn</span>
      </Link>

      <Link href="/leaderboard" className={linkClass("/leaderboard")}>
        <LeaderboardIcon className="fill-current" />
        <span className="text-xs mt-1">Leaderboard</span>
      </Link>

      <Link href="/profile" className={linkClass("/profile")}>
        <UserIcon className="fill-current" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </footer>
  );
}
