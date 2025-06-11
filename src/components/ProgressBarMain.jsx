"use client";

import React from "react";
import { useFilter, useUser } from "@/contexts";

const ProgressBarMain = () => {
  const { level, setLevel, activeCategory, setQuiz } = useFilter();
  const { user } = useUser();

  const levelColors = {
    Beginner: "bg-green",
    Intermediate: "bg-yellow",
    Advanced: "bg-red-300",
  };

  function handleClickBeginner() {
    if (activeCategory === 1) {
      if (
        user.level_nature === "Intermediate" ||
        user.level_nature === "Advanced"
      ) {
        setLevel("Beginner");
        setQuiz(3);
      }
    }

    if (activeCategory === 2) {
      if (
        user.level_territory === "Intermediate" ||
        user.level_territory === "Advanced"
      ) {
        setLevel("Beginner");
        setQuiz(3);
      }
    }
  }

  function handleClickIntermediate() {
    if (activeCategory === 1 && user.level_nature === "Intermediate") {
      setLevel("Intermediate");

      setQuiz(user?.nature_quiz);
    }

    if (activeCategory === 1 && user.level_nature === "Advanced") {
      setLevel("Intermediate");
      setQuiz(3);
    }

    if (activeCategory === 2 && user.level_territory === "Intermediate") {
      setLevel("Intermediate");
      setQuiz(user?.territory_quiz);
    }

    if (activeCategory === 2 && user.level_territory === "Advanced") {
      setLevel("Intermediate");
      setQuiz(3);
    }
  }

  function handleClickAdvanced() {
    if (activeCategory === 1 && user.level_nature === "Advanced") {
      setLevel("Advanced");
      setQuiz(user?.nature_quiz);
    }

    if (activeCategory === 2 && user.level_territory === "Advanced") {
      setLevel("Advanced");
      setQuiz(user?.territory_quiz);
    }
  }

  console.log(level, "<<<<<<level");

  const buttonClass =
    "w-34 h-6 md:w-40 md:h-8 font-bold bg-opacity-50 flex justify-center items-center border-white rounded-2xl ";

  const disabledClass =
    "w-34 h-6 md:w-40 md:h-8 font-bold bg-gray-200 bg-opacity-50 flex justify-center items-center border-white rounded-2xl text-gray-400";

  return (
    <div className="w-full flex flex-column justify-around mt-3 mb-10">
      <button
        onClick={(e) => handleClickBeginner(e)}
        value="Beginner"
        className={`${buttonClass} ${levelColors["Beginner"]}`}
      >
        Beginner
      </button>
      <button
        onClick={(e) => handleClickIntermediate(e)}
        className={
          (activeCategory === 1 && user?.level_nature === "Intermediate") ||
          (activeCategory === 1 && user?.level_nature === "Advanced") ||
          (activeCategory === 2 && user?.level_territory === "Intermediate") ||
          (activeCategory === 2 && user?.level_territory === "Advanced")
            ? `${buttonClass} ${levelColors["Intermediate"]}`
            : `${disabledClass}`
        }
        value="Intermediate"
      >
        Intermediate
      </button>
      <button
        className={
          (activeCategory === 1 && user?.level_nature === "Advanced") ||
          (activeCategory === 2 && user?.level_territory === "Advanced")
            ? `${buttonClass} ${levelColors["Advanced"]}`
            : `${disabledClass}`
        }
        onClick={(e) => handleClickAdvanced(e)}
      >
        Advanced
      </button>
    </div>
  );
};

export default ProgressBarMain;
