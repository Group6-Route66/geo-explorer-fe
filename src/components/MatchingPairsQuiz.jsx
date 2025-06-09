"use client";

import { useEffect, useState } from "react";

import { getMatchingPairs } from "@/api";
import { MatchingPairsCard } from ".";
import { useFilter, useProgress } from "@/contexts";
import ProgressBar from "./ProgressBar";

const MatchingPairsQuiz = () => {
  const [mpQuestions, setMpQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const { continent, activeCategory } = useFilter();

  const { progress, updateProgress } = useProgress();

  useEffect(() => {
    getMatchingPairs(activeCategory, continent, "Beginner").then((result) => {
      setMpQuestions(result);
    });
  }, []);

  useEffect(() => {
    if (mpQuestions.length > 0) {
      setActiveQuestion(mpQuestions[activeQuestionIndex]);
    }
  }, [activeQuestionIndex, mpQuestions]);

  useEffect(() => {
    updateProgress({ totalQuestions: mpQuestions.length });
  }, [mpQuestions]);

  return (
    <>
      <ProgressBar />
      <MatchingPairsCard
        mpQuestions={mpQuestions}
        activeQuestion={activeQuestion}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
        progress={progress}
        updateProgress={updateProgress}
      />
    </>
  );
};

export default MatchingPairsQuiz;
