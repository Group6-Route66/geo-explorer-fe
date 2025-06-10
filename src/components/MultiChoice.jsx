"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import NextButton from "./NextButton";
import { useProgress, useUser } from "@/contexts";
import QuizFeedbackPopup from "./QuizFeedbackPopup";
import { handleFinishQuiz } from "@/utils";

const MultiChoice = ({ activeQuestion, mcQuestions }) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [correctAnswersList, setCorrectAnswersList] = useState([]);
  const [isOpenFeedback, setOpenFeedback] = useState(false);

  const { progress, updateProgress } = useProgress();

  const { user, setUser } = useUser();

  const { category } = useParams();

  const levelColors = {
    Beginner: {
      base: "bg-green hover:bg-green-600",
      correct: "bg-green-600",
    },
    Intermediate: {
      base: "bg-yellow-500 hover:bg-yellow-600",
      correct: "bg-yellow-600",
    },
    Advanced: {
      base: "bg-red-500 hover:bg-red-600",
      correct: "bg-red-600",
    },
  };
  const colorClasses =
    levelColors[activeQuestion?.level] || levelColors.Beginner;

  const multipleChoiceList = activeQuestion?.multiple_choice_text?.split(",");

  const successRate = correctAnswersList.length / mcQuestions.length;
  const isSuccess = successRate >= 0.8;

  function handleAnswer(e) {
    if (e.target.value === activeQuestion.correct_answer) {
      setIsCorrectAnswer(true);
      setCorrectAnswersList((currentList) => [...currentList, e.target.value]);
    } else {
      setIsCorrectAnswer(false);
    }
  }

  const onFinishQuiz = () => {
    handleFinishQuiz(isSuccess, category, user, setUser, correctAnswersList);
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };

  const resetCorrectAnswers = () => {
    setCorrectAnswersList([]);
  };

  useEffect(() => {
    updateProgress({ totalQuestions: mcQuestions.length });
  }, [mcQuestions]);

  return (
    <div className=" w-full my-25">
      <h2 className="text-2xl font-bold text-center mb-6">
        {activeQuestion?.question_text}
      </h2>

      {multipleChoiceList && multipleChoiceList.length ? (
        <div className="w-full flex flex-col items-center gap-4 mb-6 ">
          {multipleChoiceList.map((item, index) => {
            let buttonClass = `w-full p-2 text-white font-bold rounded-4xl `;
            if (isCorrectAnswer !== null) {
              if (item === activeQuestion.correct_answer) {
                buttonClass += colorClasses.correct;
              } else {
                buttonClass +=
                  "bg-gray-100 text-gray-600 cursor-not-allowed opacity-60";
              }
            } else {
              buttonClass += `${colorClasses.base} cursor-pointer`;
            }
            return (
              <button
                key={`button-mc-qa-${index}`}
                onClick={handleAnswer}
                value={item}
                className={buttonClass}
                disabled={isCorrectAnswer !== null}
              >
                {item}
              </button>
            );
          })}
        </div>
      ) : null}

      {isCorrectAnswer === true ? (
        <div className="w-full my-10 p-3 bg-green-50 text-green-700 rounded text-center">
          That's correct, well done!
        </div>
      ) : isCorrectAnswer === false ? (
        <div className="w-full my-10 p-3 bg-red-50 text-red-700 rounded text-center">
          Not quite right. The correct answer is highlighted in green.
        </div>
      ) : null}
      {progress.currentQuestion < progress.totalQuestions ? (
        <div
          className="flex items-center justify-end"
          onClick={() => {
            setIsCorrectAnswer(null);
            updateProgress({ currentQuestion: progress.currentQuestion + 1 });
          }}
        >
          <NextButton disabled={isCorrectAnswer === null} />
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

      {isOpenFeedback ? (
        <QuizFeedbackPopup
          openFeedback={isOpenFeedback}
          onClose={handleCloseFeedback}
          isSuccess={isSuccess}
          correctCount={correctAnswersList.length}
          totalCount={mcQuestions.length}
          setIsCorrectAnswer={setIsCorrectAnswer}
          onResetQuiz={resetCorrectAnswers}
        />
      ) : null}
    </div>
  );
};

export default MultiChoice;
