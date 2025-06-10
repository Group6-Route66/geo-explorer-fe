"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const { PopUp } = require("./ui");

const QuizFeedbackPopup = ({
  openFeedback,
  correctCount,
  totalCount,
  onClose,
}) => {
  const { continent } = useParams();

  const successRate = correctCount / totalCount;
  const isSuccess = successRate >= 0.8;

  return (
    <PopUp openPopUp={openFeedback}>
      <div className="flex flex-col gap-2">
        <h2
          className={`text-2xl font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Success! 🎉" : "Try Again 💡"}
        </h2>
        <p className="text-xl font-bold text-gray-800">
          Score: {correctCount} / {totalCount}
        </p>
        <p className="text-gray-600">
          {isSuccess
            ? "Great job! You passed the quiz."
            : "Don't worry! Review and try again to improve your score."}
        </p>
        <div className="flex gap-2">
          <Link href={`/learn/${continent }`}>
            <button className="mt-4 px-6 py-2 bg-grey-500 text-green-600 border rounded-3xl p-2 font-bold hover:bg-green hover:text-white">
              Learn
            </button>
          </Link>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-green hover:bg-green-700 text-white rounded-3xl"
          >
            Close
          </button>
        </div>
      </div>
    </PopUp>
  );
};

export default QuizFeedbackPopup;
