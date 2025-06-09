"use client";

import { useEffect, useState } from "react";

import { getMatchingPairs } from "@/api";
import { MatchingPairsCard } from ".";

const MatchingPairsQuiz = () => {
  const [mpQuestions, setMpQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  //todo: use filterContext for endpoints
  useEffect(() => {
    getMatchingPairs(1, "asia", "Beginner").then((result) => {
      setMpQuestions(result);
    });
  }, []);

  useEffect(() => {
    if (mpQuestions.length > 0) {
      setActiveQuestion(mpQuestions[activeQuestionIndex]);
    }
  }, [activeQuestionIndex, mpQuestions]);

  return (
    <>
      <MatchingPairsCard
        mpQuestions={mpQuestions}
        activeQuestion={activeQuestion}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
      />
    </>
  );
};

export default MatchingPairsQuiz;
