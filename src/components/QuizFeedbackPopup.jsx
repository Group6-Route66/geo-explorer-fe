"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import NextButton from "./NextButton";
import { useProgress } from "@/contexts";

const { PopUp } = require("./ui");

const QuizFeedbackPopup = ({
  openFeedback,
  isSuccess,
  correctCount,
  totalCount,
  setIsCorrectAnswer,
  onClose,
  onResetQuiz,
}) => {
  const { category, continent } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const { progress, updateProgress } = useProgress();

  const goToHomePage = () => {
    router.push("/");
  };

  const goToNextPage = () => {
    if (pathname.includes("multichoice")) {
      router.push(`/matchingPairs/${category}/${continent}`);
    } else if (pathname.includes("matchingPairs")) {
      router.push(`/map/${category}/${continent}`);
    } else if (pathname.includes("map")) {
      router.push("/");
    }
  };

  const tryAgainQuiz = () => {
    if (pathname.includes("multichoice")) {
      router.push(`/multichoice/${category}/${continent}`);
    } else if (pathname.includes("matchingPairs")) {
      router.push(`/matchingPairs/${category}/${continent}`);
    } else if (pathname.includes("map")) {
      router.push(`/map/${category}/${continent}`);
    }
  };

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
          {isSuccess ? (
            <div
              onClick={() => {
                onClose();
                goToNextPage();
                updateProgress({
                  currentQuestion: progress.currentQuestion + 1,
                });
              }}
            >
              <NextButton />
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href={`/learn/${continent}`}>
                <button className="px-6 py-2 bg-grey-500 text-green-600 border rounded-3xl p-2 font-bold hover:bg-green hover:text-white">
                  Learn
                </button>
              </Link>

              <button
                onClick={() => {
                  onClose();
                  tryAgainQuiz();
                  updateProgress({
                    currentQuestion: 1,
                  });
                  setIsCorrectAnswer(null);
                  onResetQuiz();
                }}
                className="px-6 py-2 bg-grey-500 text-green-600 border rounded-3xl p-2 font-bold hover:bg-green hover:text-white"
              >
                Try again
              </button>
            </div>
          )}
          <button
            onClick={() => {
              onClose();
              goToHomePage();
              updateProgress({ currentQuestion: progress.currentQuestion + 1 });
              onResetQuiz();
            }}
            className="px-6 py-2 bg-green hover:bg-green-700 text-white rounded-3xl"
          >
            Close
          </button>
        </div>
      </div>
    </PopUp>
  );
};

export default QuizFeedbackPopup;
