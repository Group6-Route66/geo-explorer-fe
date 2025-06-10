"use client";

import React from "react";
import { useFilter } from "@/contexts";

const ProgressBarMain = () => {
  const { level } = useFilter();

  const levelColors = {
    Beginner: "bg-green",
    Intermediate: "bg-yellow",
    Advanced: "bg-red-300",
  };

  const buttonClass =
    "w-34 h-6 md:w-40 md:h-8 font-bold bg-opacity-50 flex justify-center items-center border-white rounded-2xl ";

  const disabledClass =
    "w-34 h-6 md:w-40 md:h-8 font-bold bg-gray-200 bg-opacity-50 flex justify-center items-center border-white rounded-2xl";

  return (
    <div className="w-full flex flex-column justify-around mt-3 mb-10">
      <div
        className={
          level === "Beginner"
            ? `${buttonClass} ${levelColors[level]}`
            : `${disabledClass}`
        }
      >
        <p
          className={`${
            level === "Beginner" ? "text-gray" : "text-gray-500/50"
          } text-xs md:text-sm`}
        >
          Beginner
        </p>
      </div>
      <div
        className={
          level === "Intermediate"
            ? `${buttonClass} ${levelColors[level]}`
            : `${disabledClass}`
        }
      >
        <p
          className={`${
            level === "Intermediate" ? "text-gray" : "text-gray-500/50"
          } text-xs md:text-sm`}
        >
          Intermediate
        </p>
      </div>
      <div
        className={
          level === "Advanced"
            ? `${buttonClass} ${levelColors[level]}`
            : `${disabledClass}`
        }
      >
        <p
          className={`${
            level === "Advanced" ? "text-gray" : "text-gray-500/50"
          } text-xs md:text-sm`}
        >
          Advanced
        </p>
      </div>
    </div>
  );
};

export default ProgressBarMain;
