"use client";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";

const QuizzButtons = () => {
  const { progress } = useProgress();
  const { level, quizz } = progress;

  const levelColors = {
    Beginner:
      "w-50 h-30 bg-green shadow-lg/60 shadow-green-600  border-2 border-green-600 rounded-full p-2 text-white text-3xl font-bold hover:text-green-600",
    Intermediate:
      "w-50 h-30 bg-yellow shadow-lg/60 shadow-yellow-600 border-2 border-yellow-600 rounded-full p-2 text-white text-3xl font-bold hover:text-yellow-600",
    Advanced:
      "w-50 h-30 bg-red-400 shadow-lg/60 border-2 shadow-red-600 border-red-600 rounded-full p-2 text-white text-3xl font-bold hover:text-red-600",
  };

  const buttonClass = levelColors[level] || levelColors.Beginner;

  const disabledClass =
    "w-50 h-30 bg-gray-200 shadow-xl/20 rounded-full p-2 text-gray-400 text-3xl font-bold";

  return (
    <div className=" flex-col p-20 content-center mt-10">
      <div className="flex justify-start mb-15 ml-30">
        <Link href="/">
          <button className={buttonClass}>1</button>
        </Link>
      </div>

      <div className="flex justify-end mb-20 mr-30">
        {quizz === 1 ? (
          <button disabled className={`${disabledClass}`}>
            2
          </button>
        ) : (
          <Link href="/">
            <button className={buttonClass}>2</button>
          </Link>
        )}
      </div>

      <div className="flex justify-start mb-10 ml-30">
        {quizz === 1 || quizz === 2 ? (
          <button disabled className={`${disabledClass}`}>
            3
          </button>
        ) : (
          <Link href="/">
            <button className={buttonClass}>3</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuizzButtons;
