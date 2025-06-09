"use client";

const { useEffect, useState } = require("react");

import { getMultichoiceQAs } from "@/api";
import { useFilter } from "@/contexts";
import MultiChoice from "./MultiChoice";
import ProgressBar from "./ProgressBar";

const MultiChoiceQuiz = () => {
  const [mcQuestions, setMcQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const { continent, activeCategory } = useFilter();

  useEffect(() => {
    getMultichoiceQAs("Beginner", continent, activeCategory).then((result) => {
      setMcQuestions(result);
    });
  }, []);

  useEffect(() => {
    if (mcQuestions.length > 0) {
      setActiveQuestion(mcQuestions[activeQuestionIndex]);
    }
  }, [activeQuestionIndex, mcQuestions]);

  return (
    <>
      <ProgressBar />
      {activeQuestion ? (
        <MultiChoice
          mcQuestions={mcQuestions}
          activeQuestion={activeQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
      ) : null}
    </>
  );
};

export default MultiChoiceQuiz;
