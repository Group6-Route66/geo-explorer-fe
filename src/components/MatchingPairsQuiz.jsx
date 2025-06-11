"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getMatchingPairs } from "@/api";
import MatchingPairsCard from "./MatchingPairsCard";
import { useFilter, useProgress, useUser } from "@/contexts";
import ProgressBar from "./ProgressBar";
import { randomize } from "@/utils";
import { CustomLoading } from ".";

const MatchingPairsQuiz = () => {
  const [mpQuestions, setMpQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { level, setLevel } = useFilter();

  const { category, continent } = useParams();

  const { progress, updateProgress } = useProgress();

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    updateProgress({ currentQuestion: 1, totalQuestions: 0 });
  }, [user, category]);

  useEffect(() => {
    if (!level || !continent || category === undefined) return;
    setLoading(true);
    getMatchingPairs(category, continent, level).then((result) => {
      const randomized = randomize(result, 3);
      setMpQuestions(randomized);
      updateProgress({ totalQuestions: randomized.length });
      setLoading(false);
    });
  }, [category, continent, level]);

  useEffect(() => {
    updateProgress({ totalQuestions: mpQuestions.length });
  }, [mpQuestions]);

  const activeQuestion = mpQuestions[progress.currentQuestion - 1] || null;

  return (
    <>
      {!loading && activeQuestion ? (
        <>
          <ProgressBar />
          <MatchingPairsCard
            mpQuestions={mpQuestions}
            activeQuestion={activeQuestion}
          />
        </>
      ) : (
        <CustomLoading />
      )}
    </>
  );
};

export default MatchingPairsQuiz;
