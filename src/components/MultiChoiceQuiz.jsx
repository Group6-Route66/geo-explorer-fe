"use client";

const { useEffect, useState } = require("react");

import { getMultichoiceQAs } from "@/api";
import MultiChoice from "./MultiChoice";

const MultiChoiceQuiz = () => {
  const [mcQuestions, setMcQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  //todo: use filterContext for endpoints
  useEffect(() => {
    getMultichoiceQAs("Beginner", "asia", 1).then((result) => {
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
