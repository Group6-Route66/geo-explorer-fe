"use client";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";

const QuizzButtons = () => {
  const { progress } = useProgress();
  const { level, quizz } = progress;

  const levelColors = {
    Beginner: "bg-green",
    Intermediate: "bg-yellow",
    Advanced: "bg-red-400",
  };

  const buttonClass =
    "shadow-lg/60 shadow-green-600 border-2 border-green-600 rounded-full px-8 py-4 sm:px-12 sm:py-6 lg:px-20 lg:py-10 text-white text-3xl font-bold hover:text-green-600";

  const disabledClass =
    "bg-gray-200 shadow-xl/20 rounded-full px-8 py-4 sm:px-12 sm:py-6 lg:px-20 lg:py-10 text-gray-400 text-3xl font-bold ";

  return (
    <div className="w-full flex flex-col justify-center items-center my-10  bg-gray-100 py-3 md:py-10 px-6 rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-green-600">
        Start Your Quiz Journey
      </h2>
      <div className="w-full sm:max-w-100  lg:max-w-150 flex flex-col gap-4 p-10">
        <div className="flex justify-start">
          <Link href="/multichoice">
            <button
              className={`${buttonClass} ${
                levelColors[level] || levelColors.Beginner
              }`}
            >
              1
            </button>
          </Link>
        </div>
        <div className="flex justify-end">
          <Link href="/matchingPairs">
            <button
              disabled={quizz === 1}
              className={`${quizz === 1 ? disabledClass : buttonClass}`}
            >
              2
            </button>
          </Link>
        </div>
        <div className="flex justify-start">
          <Link href="/">
            <button
              disabled={quizz === 1 && quizz === 2}
              className={`${
                quizz === 1 || quizz === 2 ? disabledClass : buttonClass
              }`}
            >
              3
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizzButtons;
