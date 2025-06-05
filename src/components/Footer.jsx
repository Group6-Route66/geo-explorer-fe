"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { QuizIcon, LearnIcon, LeaderboardIcon, UserIcon } from "@/assets";

const Footer = () => {
  const pathname = usePathname();

  // to define if it's active
  const isActive = (path) => pathname === path;

  // active button
  const linkClass = (path) =>
    `flex flex-col items-center transition-colors duration-300 ${
      isActive(path)
        ? "text-[var(--accent-green)] font-bold"
        : "text-gray-600 hover:text-[var(--accent-green)]"
    }`;

  return (
    <footer className="container sticky bottom-0 z-10 bg-white mx-auto px-4 lg:max-w-5xl flex justify-between items-center p-4 shadow-md rounded-sm">
      <Link href="/" className={linkClass("/")}>
        <QuizIcon
          className={isActive("/") ? "text-[var(--accent-green)]" : ""}
        />
        <span className="text-xs mt-1">Take a quiz</span>
      </Link>

      <Link href="/learn" className={linkClass("/learn")}>
        <LearnIcon
          className={isActive("/learn") ? "text-[var(--accent-green)]" : ""}
        />
        <span className="text-xs mt-1">Learn</span>
      </Link>

      <Link href="/leaderboard" className={linkClass("/leaderboard")}>
        <LeaderboardIcon
          className={
            isActive("/leaderboard") ? "text-[var(--accent-green)]" : ""
          }
        />
        <span className="text-xs mt-1">Leaderboard</span>
      </Link>

      <Link href="/profile" className={linkClass("/profile")}>
        <UserIcon
          className={isActive("/profile") ? "text-[var(--accent-green)]" : ""}
        />
        <span className="text-xs mt-1">Profile</span>
      </Link>

      <Link
        href="/testQuizMatchingPairs"
        className={linkClass("/testQuizMatchingPairs")}
      >
        <span className="text-xs mt-1">Quiz Matching Pairs</span>
      </Link>

      <Link href="/multichoice" className={linkClass("/multichoice")}>
        <span className="text-xs mt-1">Quiz Multichoice</span>
      </Link>
    </footer>
  );
};

export default Footer;
