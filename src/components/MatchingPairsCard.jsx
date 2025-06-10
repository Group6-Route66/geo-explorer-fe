"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import NextButton from "./NextButton";
import { QuizFeedbackPopup } from ".";
import { handleFinishQuiz } from "@/utils";
import { useProgress, useUser } from "@/contexts";

const MatchingPairsCard = ({ mpQuestions, activeQuestion }) => {
  const colours = [
    "bg-sky-300 text-white",
    "bg-sky-300 text-white",
    "bg-pink-300 text-white",
    "bg-pink-300 text-white",
    "bg-green-300 text-white",
    "bg-green-300 text-white",
    "bg-amber-300 text-white",
    "bg-amber-300 text-white",
  ];

  const initialStyle = `  w-full 
  bg-white 
  text-black 
  m-1 
  px-6 
  py-3 
  flex 
  items-center 
  justify-center 
  border-2 
  border-gray-300 
  rounded-2xl 
  shadow-md 
  text-base 
  font-medium 
  break-words 
  hover:bg-gray-100 
`;

  const [styleLeftButton1, setStyleLeftButton1] = useState("");
  const [styleLeftButton2, setStyleLeftButton2] = useState("");
  const [styleLeftButton3, setStyleLeftButton3] = useState("");
  const [styleLeftButton4, setStyleLeftButton4] = useState("");
  const [styleRightButton1, setStyleRightButton1] = useState("");
  const [styleRightButton2, setStyleRightButton2] = useState("");
  const [styleRightButton3, setStyleRightButton3] = useState("");
  const [styleRightButton4, setStyleRightButton4] = useState("");

  const [counterColour, setCounterColour] = useState(0);

  const [currentAnswer, setCurrentAnswer] = useState("");
  const [finalAnswer, setFinalAnswer] = useState([]);
  const [leftButtons, setLeftButtons] = useState([]);
  const [rightButtons, setRightButtons] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctStyle, setCorrectStyle] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpenFeedback, setOpenFeedback] = useState(false);

  const { user, setUser } = useUser();

  const { category } = useParams();

  const { progress, updateProgress } = useProgress();

  function setCorrectAnswersArray(arr1, arr2) {
    let correctAnswersArray = [];
    for (let i = 0; i < arr1.length; i++) {
      correctAnswersArray.push(`${arr1[i]}-${arr2[i]}`);
      correctAnswersArray.push(`${arr2[i]}-${arr1[i]}`);
    }
    return correctAnswersArray;
  }

  function randomize(items) {
    function getRandomInt(num) {
      return Math.floor(Math.random() * num);
    }
    const randomArray = [];
    while (randomArray.length < items.length) {
      const index = getRandomInt(items.length);
      if (!randomArray.includes(index)) {
        randomArray.push(index);
      }
    }
    return randomArray.map((index) => items[index]);
  }

  const [randomLeftButtons, setRandomLeftButtons] = useState(
    randomize(leftButtons)
  );
  const [randomRightButtons, setRandomRightButtons] = useState(
    randomize(rightButtons)
  );

  const successRate = correctAnswers.length / mpQuestions.length;
  const isSuccess = successRate >= 0.8;

  function isOdd(number) {
    return number % 2 === 0 ? false : true;
  }

  function handleClickButton(event) {
    event.preventDefault();
    if (counterColour < 8) {
      const currentClicked = event.target.name;
      const value = event.target.value;

      setCounterColour(counterColour + 1);
      const currentStyle = `w-full ${colours[counterColour]} m-1 
  px-6 
  py-3 
  flex 
  items-center 
  justify-center 
  border-2 
  border-gray-300 
  rounded-2xl 
  shadow-md 
  text-base 
  font-medium 
  break-words `;

      if (isOdd(counterColour)) {
        finalAnswer.push(`${currentAnswer}-${value}`);
      } else {
        setCurrentAnswer(value);
      }

      switch (currentClicked) {
        case "left1":
          {
            setStyleLeftButton1(currentStyle);
          }
          break;
        case "left2":
          {
            setStyleLeftButton2(currentStyle);
          }
          break;
        case "left3":
          {
            setStyleLeftButton3(currentStyle);
          }
          break;
        case "left4":
          {
            setStyleLeftButton4(currentStyle);
          }
          break;
        case "right1":
          {
            setStyleRightButton1(currentStyle);
          }
          break;
        case "right2":
          {
            setStyleRightButton2(currentStyle);
          }
          break;
        case "right3":
          {
            setStyleRightButton3(currentStyle);
          }
          break;
        case "right4":
          {
            setStyleRightButton4(currentStyle);
          }
          break;
        default:
          break;
      }
    }
  }

  function handleReset() {
    setStyleLeftButton1(initialStyle);
    setStyleLeftButton2(initialStyle);
    setStyleLeftButton3(initialStyle);
    setStyleLeftButton4(initialStyle);
    setStyleRightButton1(initialStyle);
    setStyleRightButton2(initialStyle);
    setStyleRightButton3(initialStyle);
    setStyleRightButton4(initialStyle);
    setCounterColour(0);
    setCurrentAnswer("");
    setFinalAnswer([]);
  }

  function handleSubmit() {
    let isCorrectAnswer = true;

    const correctGreen = "border-2 border-green-400 shadow-md shadow-green-200";
    const incorrectRed = "border-2 border-red-400 shadow-md shadow-rose-200";

    const leftStyles = ["", "", "", ""];
    const rightStyles = ["", "", "", ""];

    if (finalAnswer.length < 4) {
      isCorrectAnswer = false;
    }

    setIsSubmitted(true);
    for (const answer of finalAnswer) {
      const [left, right] = answer.split("-");

      const leftIndex = randomLeftButtons.indexOf(left);
      const rightIndex = randomRightButtons.indexOf(right);

      if (correctAnswers.includes(answer)) {
        if (leftIndex !== -1) leftStyles[leftIndex] = correctGreen;
        if (rightIndex !== -1) rightStyles[rightIndex] = correctGreen;
      } else {
        isCorrectAnswer = false;
        if (leftIndex !== -1) leftStyles[leftIndex] = incorrectRed;
        if (rightIndex !== -1) rightStyles[rightIndex] = incorrectRed;
      }
    }

    setStyleLeftButton1((prev) => `${prev} ${leftStyles[0]}`);
    setStyleLeftButton2((prev) => `${prev} ${leftStyles[1]}`);
    setStyleLeftButton3((prev) => `${prev} ${leftStyles[2]}`);
    setStyleLeftButton4((prev) => `${prev} ${leftStyles[3]}`);

    setStyleRightButton1((prev) => `${prev} ${rightStyles[0]}`);
    setStyleRightButton2((prev) => `${prev} ${rightStyles[1]}`);
    setStyleRightButton3((prev) => `${prev} ${rightStyles[2]}`);
    setStyleRightButton4((prev) => `${prev} ${rightStyles[3]}`);
  }

  function handleNext() {
    handleReset();
    setIsSubmitted(false);

    updateProgress({ currentQuestion: progress.currentQuestion + 1 });
  }

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };

  const onFinishQuiz = () => {
    handleFinishQuiz(isSuccess, category, user, setUser, correctAnswers);
  };

  const resetCorrectAnswers = () => {
    setCorrectAnswers([]);
  };

  useEffect(() => {
    setStyleLeftButton1(initialStyle);
    setStyleLeftButton2(initialStyle);
    setStyleLeftButton3(initialStyle);
    setStyleLeftButton4(initialStyle);
    setStyleRightButton1(initialStyle);
    setStyleRightButton2(initialStyle);
    setStyleRightButton3(initialStyle);
    setStyleRightButton4(initialStyle);
    setCounterColour(0);
    setCurrentAnswer("");
    setFinalAnswer([]);
  }, []);

  useEffect(() => {
    if (activeQuestion?.answers?.length) {
      const lefts = activeQuestion.answers.map((answer) => answer.left_text);
      const rights = activeQuestion.answers.map((answer) => answer.right_text);

      setLeftButtons(lefts);
      setRightButtons(rights);
    }
  }, [activeQuestion]);

  useEffect(() => {
    if (leftButtons.length && rightButtons.length) {
      setCorrectAnswers(setCorrectAnswersArray(leftButtons, rightButtons));
      setRandomLeftButtons(randomize(leftButtons));
      setRandomRightButtons(randomize(rightButtons));
    }
  }, [leftButtons, rightButtons]);

  return (
    <div className="flex flex-col justify-center items-center m-2 p-4 rounded-sm">
      <h4 className="text-2xl font-bold">{activeQuestion?.question_text}</h4>
      <div className="container mx-auto">
        {correctAnswers.length ? (
          <section className="grid grid-cols-2">
            <div className="flex flex-col place-items-end p-4">
              <ul className="w-full h-full flex flex-col items-stretch justify-between">
                <li>
                  <button
                    name="left1"
                    value={randomLeftButtons[0]}
                    onClick={handleClickButton}
                    className={`${styleLeftButton1} ${correctStyle}`}
                  >
                    {randomLeftButtons[0]}
                  </button>
                </li>
                <li>
                  <button
                    name="left2"
                    value={randomLeftButtons[1]}
                    onClick={handleClickButton}
                    className={`${styleLeftButton2} ${correctStyle}`}
                  >
                    {randomLeftButtons[1]}
                  </button>
                </li>
                <li>
                  <button
                    name="left3"
                    value={randomLeftButtons[2]}
                    onClick={handleClickButton}
                    className={`${styleLeftButton3} ${correctStyle}`}
                  >
                    {randomLeftButtons[2]}
                  </button>
                </li>
                <li>
                  <button
                    name="left4"
                    value={randomLeftButtons[3]}
                    onClick={handleClickButton}
                    className={`${styleLeftButton4} ${correctStyle}`}
                  >
                    {randomLeftButtons[3]}
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex flex-col place-items-start p-4">
              <ul className="w-full h-full flex flex-col items-stretch justify-between">
                <li>
                  <button
                    name="right1"
                    value={randomRightButtons[0]}
                    onClick={handleClickButton}
                    className={styleRightButton1}
                  >
                    {randomRightButtons[0]}
                  </button>
                </li>
                <li>
                  <button
                    name="right2"
                    value={randomRightButtons[1]}
                    onClick={handleClickButton}
                    className={styleRightButton2}
                  >
                    {randomRightButtons[1]}
                  </button>
                </li>
                <li>
                  <button
                    name="right3"
                    value={randomRightButtons[2]}
                    onClick={handleClickButton}
                    className={styleRightButton3}
                  >
                    {randomRightButtons[2]}
                  </button>
                </li>
                <li>
                  <button
                    name="right4"
                    value={randomRightButtons[3]}
                    onClick={handleClickButton}
                    className={styleRightButton4}
                  >
                    {randomRightButtons[3]}
                  </button>
                </li>
              </ul>
            </div>
          </section>
        ) : null}
        <div className="flex justify-center p-2">
          <button
            className="w-40 px-5 py-2 rounded-2xl border border-gray-300 text-black bg-white hover:bg-gray-100 shadow transition duration-200 ease-in-out"
            onClick={handleReset}
            disabled={isSubmitted}
          >
            Reset
          </button>
        </div>
        {!isSubmitted ? (
          <div className="flex justify-center p-2">
            <button
              className="w-40 bg-green rounded-3xl p-2 font-bold hover:bg-green-500 shadow disabled:bg-gray-200 disabled:text-gray-500"
              onClick={handleSubmit}
              disabled={finalAnswer.length < 4}
            >
              Submit
            </button>
          </div>
        ) : progress.currentQuestion < progress.totalQuestions ? (
          <div className="flex justify-center p-2" onClick={handleNext}>
            <NextButton />
          </div>
        ) : (
          <div
            className="flex justify-center p-2"
            onClick={() => {
              setOpenFeedback(true);
              onFinishQuiz();
            }}
          >
            <button className="w-40 bg-green hover:bg-green-700text-white m-1 px-4 py-2 items-center border rounded-4xl">
              Finish
            </button>
          </div>
        )}
      </div>
      {isOpenFeedback ? (
        <QuizFeedbackPopup
          openFeedback={isOpenFeedback}
          onClose={handleCloseFeedback}
          isSuccess={isSuccess}
          correctCount={correctAnswers.length}
          totalCount={mpQuestions.length * 4}
          updateProgress={updateProgress}
          setActiveQuestionIndex={setActiveQuestionIndex}
          onResetQuiz={resetCorrectAnswers}
        />
      ) : null}
    </div>
  );
};

export default MatchingPairsCard;
