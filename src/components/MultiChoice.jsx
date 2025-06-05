"use client";

import { useState } from "react";
import NextButton from "./NextButton";

const MultiChoice = () => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [multiChoiceQA] = useState({
    question_mc_id: 1,
    continent: "Asia",
    sub_category_id: 1,
    level: "Beginner",
    question_text: "Which mountain is the highest peak in Asia?",
    answer_mc_id: 1,
    multiple_choice_text: [
      "Mount Fuji",
      "Altai Mountains",
      "Ural Mountains",
      "Mount Everest",
    ],
    correct_answer: "Mount Everest",
  });

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

  function handleAnswer(e) {
    if (e.target.value === multiChoiceQA.correct_answer) {
      setIsCorrectAnswer(true);
    } else {
      setIsCorrectAnswer(false);
    }
  }

  const colorClasses = levelColors[multiChoiceQA.level] || levelColors.Beginner;

  return (
    <div className="mt-25">
      <div>
        <h2 className="text-2xl font-bold text-center">
          {multiChoiceQA.question_text}
        </h2>
      </div>

      <div className="mt-15">
        {multiChoiceQA.multiple_choice_text.map((item, index) => {
          let buttonClass = `w-full p-2 text-white font-bold m-4 rounded-4xl `;

          if (isCorrectAnswer !== null) {
            if (item === multiChoiceQA.correct_answer) {
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

      {isCorrectAnswer === true && (
        <div className="w-full mt-15 p-3 bg-green-50 text-green-700 rounded text-center">
          That's correct, well done!
        </div>
      )}
      {isCorrectAnswer === false && (
        <div className="w-full mt-15 p-3 bg-red-50 text-red-700 rounded text-center">
          Not quite right. The correct answer is highlighted in green.
        </div>
      )}

      <div className="my-50 flex items-center justify-end">
        <NextButton />
      </div>
    </div>
  );
};

export default MultiChoice;
