// src/components/ProgressBar.jsx
"use client";

import React from "react";
import { useFilter, useProgress } from "@/contexts";

export default function ProgressBar() {
  const { progress } = useProgress();
  const { currentQuestion, totalQuestions } = progress;
  const { level } = useFilter();

  const percent = Math.min(
    Math.max((currentQuestion / totalQuestions) * 100, 0),
    100
  );

  return (
    <div className="my-4 dark:bg-gray-800">
      {/* Label */}
      <div className="mb-1 font-bold dark:text-gray-300 ">
        Level: {level} | Question {currentQuestion} of {totalQuestions}
      </div>

      {/* Track */}
      <div className="w-full h-3 bg-gray-300 dark:bg-gray-300 rounded-full overflow-hidden">
        {/* Filled */}
        <div
          className="h-full bg-green rounded-full transition-[width] duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
