import Link from "next/link";

import { QuizIcon, LearnIcon, LeaderboardIcon, UserIcon } from "@/assets";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 lg:max-w-5xl flex justify-between items-center p-4 shadow-md rounded-sm border">
      <Link href="/" className="flex flex-col items-center">
        <QuizIcon />
        Take a quiz
      </Link>
      <Link href="/learn" className="flex flex-col items-center">
        <LearnIcon />
        Learn
      </Link>
      <Link href="/leaderboard" className="flex flex-col items-center">
        <LeaderboardIcon />
        Leaderboard
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <UserIcon />
        Profile
      </Link>
      <Link href="/testQuizMatchingPairs" className="flex flex-col items-center">
        Quiz Matching Pairs
        </Link>
      <Link href="/multichoice" className="flex flex-col items-center">
        test-question
      </Link>
    </footer>
  );
};

export default Footer;
