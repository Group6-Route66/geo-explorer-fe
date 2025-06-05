"use client";

import React from "react";
import { useProgress } from "@/contexts";

const ProgressBar = () => {
  const { progress } = useProgress();
  const { level, currentQuestion, totalQuestions } = progress;

  const percent = Math.min(
    Math.max((currentQuestion / totalQuestions) * 100, 0),
    100
  );

  return (
    <div style={{ margin: "1rem 0" }}>
      <div style={{ marginBottom: "0.25rem", fontWeight: "bold" }}>
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
