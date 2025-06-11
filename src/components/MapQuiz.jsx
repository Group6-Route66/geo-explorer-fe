"use client";

const { useEffect, useState } = require("react");
import { useParams } from "next/navigation";

import { getMapQAs } from "@/api";
import { useProgress, useUser } from "@/contexts";
import ProgressBar from "./ProgressBar";
import Map from "./Map";
import { randomize } from "@/utils";
import { CustomLoading } from ".";

const MapQuiz = () => {
  const [mapQuestions, setMapQuestions] = useState([]);
  const [level, setLevel] = useState();
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    getMapQAs(level, continent, category).then((result) => {
      setMapQuestions(randomize(result, 5));
      updateProgress({ totalQuestions: mapQuestions.length });
      setLoading(false);
    });
  }, [level, category, continent]);

  const activeQuestion = mapQuestions[progress.currentQuestion - 1] || null;

  return (
    <>
      {!loading && activeQuestion ? (
        <>
          <ProgressBar />

          <Map mapQuestions={mapQuestions} activeQuestion={activeQuestion} />
        </>
      ) : (
        <CustomLoading />
      )}
    </>
  );
};

export default MapQuiz;
