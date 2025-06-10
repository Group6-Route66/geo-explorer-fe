"use client";

const { useEffect, useState } = require("react");
import { useParams } from "next/navigation";

import { getMultichoiceQAs } from "@/api";
import { useUser } from "@/contexts";
import MultiChoice from "./MultiChoice";
import ProgressBar from "./ProgressBar";

const MultiChoiceQuiz = () => {
  const [mcQuestions, setMcQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [level, setLevel] = useState();

  const { user } = useUser();

  const { category, continent } = useParams();

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

    getMultichoiceQAs(level, continent, category).then((result) => {
      setMcQuestions(result);
    });
  }, [level, category, continent]);

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
