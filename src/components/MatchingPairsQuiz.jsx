"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getMatchingPairs } from "@/api";
import MatchingPairsCard from "./MatchingPairsCard";
import { useProgress, useUser } from "@/contexts";
import ProgressBar from "./ProgressBar";

const MatchingPairsQuiz = () => {
  const [mpQuestions, setMpQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [level, setLevel] = useState();

  const { category, continent } = useParams();

  const { progress, updateProgress } = useProgress();

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

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
    });
  }, [category, continent, level]);

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
