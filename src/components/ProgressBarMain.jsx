"use client";

import React from "react";
import { useProgress } from "@/contexts/ProgressContext";

const ProgressBarMain = () => {
  const { progress } = useProgress();
  const { level, quizz, currentQuestion, totalQuestions } = progress;

  let percent = 0;
  let colour = "#6ED788";

  if (level === "Beginner") {
    percent = Math.min(
      Math.max((currentQuestion / totalQuestions) * 33.33, 0),
      100
    );
  }

  if (level === "Intermediate") {
    percent =
      33.33 +
      Math.min(Math.max((currentQuestion / totalQuestions) * 33.33, 0), 100);

    colour = "#ffb703";
  }

  if (level === "Advanced") {
    percent =
      66.66 +
      Math.min(Math.max((currentQuestion / totalQuestions) * 33.33, 0), 100);

    colour = "#f25c54";
  }

  return (
    <div style={{ margin: "2rem 0" }}>
      <div
        style={{
          height: "12px",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#ddd",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            backgroundColor: colour,
            borderRadius: "8px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div className="w-full flex flex-column justify-around mt-3 mb-10">
        <div className="w-30 font-bold bg-gray-100 bg-opacity-50 flex justify-center border-white rounded-2xl ">
          <p>Beginner</p>
        </div>
        <div className="w-30 font-bold bg-gray-100 bg-opacity-50 flex justify-center border-white rounded-2xl">
          <p>Intermediate</p>
        </div>
        <div className="w-30 font-bold bg-gray-100 flex justify-center border-white rounded-2xl bg-opacity-50">
          <p>Advanced</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarMain;
