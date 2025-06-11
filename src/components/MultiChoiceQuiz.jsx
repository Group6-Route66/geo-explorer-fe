"use client";

const { useEffect, useState } = require("react");
import { useParams } from "next/navigation";

import { getMultichoiceQAs } from "@/api";
import { useFilter, useProgress, useUser } from "@/contexts";
import MultiChoice from "./MultiChoice";
import ProgressBar from "./ProgressBar";

const MultiChoiceQuiz = () => {
  const [mcQuestions, setMcQuestions] = useState([]);

  const { user } = useUser();
  const { progress, updateProgress } = useProgress();

  const { category, continent } = useParams();

  const { level, setLevel } = useFilter();


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
      setMcQuestions(result);
      updateProgress({ totalQuestions: result.length });
    });
  }, [level, category, continent]);

  const activeQuestion = mcQuestions[progress.currentQuestion - 1] || null;

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
