"use client";

const { useEffect, useState } = require("react");
import { useParams } from "next/navigation";

import { getMapQAs } from "@/api";
import { useProgress, useUser } from "@/contexts";
import ProgressBar from "./ProgressBar";
import Map from "./Map";

const MapQuiz = () => {
  const [mapQuestions, setMapQuestions] = useState([]);
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

    getMapQAs(level, continent, category).then((result) => {
      setMapQuestions(randomize(result, 5));
      updateProgress({ totalQuestions: mapQuestions.length });
    });
  }, [level, category, continent]);

  const activeQuestion = mapQuestions[progress.currentQuestion - 1] || null;

    
  return (
    <>
      <ProgressBar />
      {activeQuestion ? (
        <Map mapQuestions={mapQuestions} activeQuestion={activeQuestion} />
      ) : null}
    </>
  );
};

export default MapQuiz;
