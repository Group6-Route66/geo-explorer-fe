"use client";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useProgress, useUser } from "@/contexts";
import NextButton from "./NextButton";
import { handleFinishQuiz } from "@/utils";
import { QuizFeedbackPopup } from ".";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = ({ activeQuestion, mapQuestions }) => {
  const [country, setCountry] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [correctAnswersList, setCorrectAnswersList] = useState([]);
  const [isOpenFeedback, setOpenFeedback] = useState(false);

  const { progress, updateProgress } = useProgress();

  const { user, setUser } = useUser();

  const { category } = useParams();

  const pathname = usePathname();

  const pathParts = pathname.split("/").filter(Boolean);
  const quizType = pathParts[0] || "";

  const successRate = correctAnswersList.length / mapQuestions.length;
  const isSuccess = successRate >= 0.8;

  const handleAnswer = () => {
    if (!country) return;
    setAnswer(country);

    const isCurrentAnswerCorrect = activeQuestion.location.includes(country);

    if (isCurrentAnswerCorrect) {
      setIsCorrectAnswer(true);
      setCorrectAnswersList((currentList) => [
        ...currentList,
        activeQuestion.instruction,
      ]);
    } else setIsCorrectAnswer(false);
  };

  const resetCorrectAnswers = () => {
    setCorrectAnswersList([]);
  };

  const onFinishQuiz = () => {
    handleFinishQuiz(
      isSuccess,
      category,
      user,
      setUser,
      correctAnswersList,
      quizType
    );
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };

  useEffect(() => {
    updateProgress({ totalQuestions: mapQuestions.length });
  }, [mapQuestions]);

  useEffect(() => {
    setCountry(null);
    setAnswer(null);
    setIsCorrectAnswer(null);
  }, [activeQuestion]);

  return (
    <div className="flex flex-col justify-center items-center mt-4 bg-white max-w-4xl mx-auto dark:bg-gray-800">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-5 ">
        <p className=" text-xl sm:text-xl font-semibold text-gray-900 content-justify:start dark:text-white sm:text-left">
          {activeQuestion ? activeQuestion.instruction : null}
        </p>
        <div>
          {isCorrectAnswer ? (
            <p className="w-100 mt-4 sm:mt-0 block px-3 py-1 rounded-full bg-green text-white dark:text-gray-800 font-medium ">
              Correct!
            </p>
          ) : country && answer ? (
            <p className="w-100 mt-4 sm:mt-0 block px-3 py-1 rounded-full bg-red text-white font-medium">
              Not correct!
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex w-full mb-6">
        <div className="flex-1 flex items-center justify-center sm:justify-start gap-4">
          <div className="px-8 py-1 text-gray-800 border-2 border-green dark:text-white font-medium">
            <p>{country || "No country selected"}</p>
          </div>
          {country ? (
            <button
              disabled={answer}
              className="w-40 bg-green border text-white dark:text-gray-800 rounded-3xl p-2 font-bold hover:bg-green disabled:bg-transparent disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-300"
              onClick={handleAnswer}
            >
              Confirm
            </button>
          ) : null}
        </div>

        {progress.currentQuestion < progress.totalQuestions ? (
          <div
            className="flex items-center justify-end"
            onClick={() => {
              setCountry(null);
              setAnswer(null);
              updateProgress({ currentQuestion: progress.currentQuestion + 1 });
            }}
          >
            <NextButton disabled={answer === null} />
          </div>
        ) : null}

        {progress.currentQuestion >= progress.totalQuestions ? (
          <div
            className="flex items-center justify-end"
            onClick={() => {
              setOpenFeedback(true);
              onFinishQuiz();
            }}
          >
            <button className="w-40 bg-grey-900 border rounded-3xl p-2 text-green font-bold hover:bg-green hover:text-white">
              Finish
            </button>
          </div>
        ) : null}
      </div>

      <ComposableMap disabled>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#F0F2F5",
                    outline: "none",
                    stroke: "black",
                  },
                  hover: {
                    fill: "#6ED788",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#FF5722",
                    outline: "none",
                  },
                }}
                onClick={() => {
                  setCountry(geo.properties.name);
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {isOpenFeedback ? (
        <QuizFeedbackPopup
          openFeedback={isOpenFeedback}
          onClose={handleCloseFeedback}
          isSuccess={isSuccess}
          correctCount={correctAnswersList.length}
          totalCount={mapQuestions.length}
          setIsCorrectAnswer={setIsCorrectAnswer}
          onResetQuiz={resetCorrectAnswers}
        />
      ) : null}
    </div>
  );
};

export default Map;
