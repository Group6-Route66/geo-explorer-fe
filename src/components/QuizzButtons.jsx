"use client";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { useFilter } from "@/contexts";

const QuizzButtons = () => {
  const { progress } = useProgress();
  const { level, quizz } = progress;

  const { continent, activeCategory } = useFilter();

  const levelColors = {
    Beginner: "bg-green shadow-green-600 border-green-600 hover:text-green-600",
    Intermediate:
      "bg-yellow shadow-yellow-600 border-yellow-600 hover:text-yellow-600",
    Advanced: "bg-red-300 shadow-red-500 border-red-400 hover:text-red-600",
  };

  const textColors = {
    Beginner: "text-green-600",
    Intermediate: "text-yellow-500",
    Advanced: "text-red-500",
  };

  const buttonClass =
    "shadow-lg/60  border-2  rounded-full px-8 py-4 sm:px-12 sm:py-6 lg:px-20 lg:py-10 text-white text-3xl font-bold ";

  const disabledClass =
    "bg-gray-200 shadow-xl/20 rounded-full px-8 py-4 sm:px-12 sm:py-6 lg:px-20 lg:py-10 text-gray-400 text-3xl font-bold ";

  const textClass =
    "text-2xl sm:text-3xl md:text-4xl font-extrabold text-center ";

  return (
    <div className="w-full flex flex-col justify-center items-center my-10  bg-gray-100 py-3 md:py-10 px-6 rounded-xl shadow-lg dark:bg-gray-500">
      <h2
        className={`${textClass} ${textColors[level] || textColors.Beginner}`}
      >
        Start Your Quiz Journey
      </h2>
      <div className="w-full sm:max-w-100  lg:max-w-150 flex flex-col gap-4 p-10">
        <div className="flex justify-start">
          <Link href={`/multichoice/${activeCategory}/${continent}`}>
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
          <Link href={`/matchingPairs/${activeCategory}/${continent}`}>
            <button
              disabled={quizz === 1}
              className={`${quizz === 1 ? disabledClass : buttonClass}`}
            >
              2
            </button>
          </Link>
        </div>
        <div className="flex justify-start">
          <Link href={`/map/${activeCategory}/${continent}`}>
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
