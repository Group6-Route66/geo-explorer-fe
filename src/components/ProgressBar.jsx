"use client";

import React from "react";
import { useFilter, useProgress } from "@/contexts";

const ProgressBar = () => {
  const { progress } = useProgress();
  const { currentQuestion, totalQuestions } = progress;
  const { level } = useFilter();

  
  const percent = Math.min(
    Math.max((currentQuestion / totalQuestions) * 100, 0),
    100
  );

   return (
    <div style={{ margin: "1rem 0" }}>
      <div style={{ marginBottom: "0.25rem", fontWeight: "bold" }} className="dark:text-white">
        Level: {level} | Question {currentQuestion} of {totalQuestions}
      </div>
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
            backgroundColor: "#6ED788",
            borderRadius: "8px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
