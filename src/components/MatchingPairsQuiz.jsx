"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getMatchingPairs } from "@/api";
import MatchingPairsCard from "./MatchingPairsCard";
import { useFilter, useProgress, useUser } from "@/contexts";
import ProgressBar from "./ProgressBar";

const MatchingPairsQuiz = () => {
  const [mpQuestions, setMpQuestions] = useState([]);

  const { level, setLevel } = useFilter();

  const { category, continent } = useParams();

  const { progress, updateProgress } = useProgress();

  const { user } = useUser();


  useEffect(() => {
    if (!user) return;

    updateProgress({ currentQuestion: 1, totalQuestions: 0 });

    if (category === 1) {
      setLevel(user.level_nature);
    } else if (category === 2) {
      setLevel(user.level_territory);
    } else {
      setLevel("Beginner");
    }
  }, [user, category]);

  useEffect(() => {
    if (!level || !continent || category === undefined) return;
    getMatchingPairs(category, continent, level).then((result) => {
      setMpQuestions(result);
      updateProgress({ totalQuestions: result.length });
    });
  }, [category, continent, level]);

  useEffect(() => {
    updateProgress({ totalQuestions: mpQuestions.length });
  }, [mpQuestions]);

  const activeQuestion = mpQuestions[progress.currentQuestion - 1] || null;

  return (
    <>
      <ProgressBar />
      <MatchingPairsCard
        mpQuestions={mpQuestions}
        activeQuestion={activeQuestion}
      />
    </>
  );
};

export default MatchingPairsQuiz;
