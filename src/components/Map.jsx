"use client";
import { useProgress, useUser } from "@/contexts";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
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
    <div className="flex flex-col justify-center items-center mt-8 p-4 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 px-4">
        <p className=" text-2xl font-bold  text-center sm:text-left mb-4 sm:mb-0">
          {activeQuestion ? activeQuestion.instruction : null}
        </p>
        {isCorrectAnswer ? (
          <p className="text-green-300 text-green-600 ">Correct!</p>
        ) : country && answer ? (
          <p className="text-red-800 text-red-600 ">Not correct!</p>
        ) : null}
      </div>

      <div className="flex w-full">
        <div className="flex items-center m-auto gap-4">
          <p>{country}</p>
          {country ? (
            <button
              disabled={answer}
              className="bg-green rounded-4xl p-2 text-white font-bold disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            <button className="w-40 bg-grey-500 border rounded-3xl p-2 text-green-600 font-bold hover:bg-green hover:text-white">
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
