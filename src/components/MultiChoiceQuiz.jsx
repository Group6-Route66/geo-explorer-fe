"use client";

const { useEffect, useState } = require("react");
import { useParams } from "next/navigation";

import { getMultichoiceQAs } from "@/api";
import { useProgress, useUser } from "@/contexts";
import MultiChoice from "./MultiChoice";
import ProgressBar from "./ProgressBar";
import { randomize } from "@/utils";

const MultiChoiceQuiz = () => {
  const [mcQuestions, setMcQuestions] = useState([]);
  const [level, setLevel] = useState();

  const { user } = useUser();
  const { progress, updateProgress } = useProgress();

  const { category, continent } = useParams();

  useEffect(() => {
    if (!user) return;

    updateProgress({ currentQuestion: 1, totalQuestions: 0 });

    if (category === "1") {
      setLevel(user.level_nature);
    } else if (category === "2") {
      setLevel(user.level_territory);
    } else {
      setLevel("Beginner");
    }
  }, [user, category]);

  useEffect(() => {
    if (!level || !continent || category === undefined) return;

    getMultichoiceQAs(level, continent, category).then((result) => {
      setMcQuestions(randomize(result, 10));
      updateProgress({ totalQuestions: mcQuestions.length });
    });
  }, [level, category, continent]);

  const activeQuestion = mcQuestions[progress.currentQuestion - 1] || null; 
   console.log(mcQuestions, "<---mpQuestions");
  console.log(mcQuestions.length, "<---mpQuestions.length");
  console.log(activeQuestion, "<---activeQuestion");


  return (
    <>
      <ProgressBar />
      {activeQuestion ? (
        <MultiChoice
          mcQuestions={mcQuestions}
          activeQuestion={activeQuestion}
        />
      ) : null}
    </>
  );
};

export default MultiChoiceQuiz;
