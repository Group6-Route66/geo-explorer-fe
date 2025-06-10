"use client";

import React, { createContext, useState, useContext } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    level: "Beginner",
    quizz: 1,
    currentQuestion: 1,
    totalQuestions: 0,
  });

  const updateProgress = (newProgress) => {
    setProgress((prev) => ({ ...prev, ...newProgress }));
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
