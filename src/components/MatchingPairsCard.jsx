"use client";

import { useEffect, useState } from "react";
import NextButton from "./NextButton";

const MatchingPairsCard = ({
  mpQuestions,
  activeQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  const colours = [
    "bg-sky-600 text-white",
    "bg-sky-600 text-white",
    "bg-pink-600 text-white",
    "bg-pink-600 text-white",
    "bg-lime-600 text-white",
    "bg-lime-600 text-white",
    "bg-amber-600 text-white",
    "bg-amber-600 text-white",
  ];

  const initialStyle = `w-80 bg-white text-black m-1 px-4 py-2 items-center border rounded-4xl`;

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

  useEffect(() => {
    if (leftButtons.length && rightButtons.length) {
      setCorrectAnswers(setCorrectAnswersArray(leftButtons, rightButtons));
      setRandomLeftButtons(randomize(leftButtons));
      setRandomRightButtons(randomize(rightButtons));
    }
  }, [leftButtons, rightButtons]);

  function isOdd(number) {
    return number % 2 === 0 ? false : true;
  }

  function handleClickButton(event) {
    event.preventDefault();
    if (counterColour < 8) {
      const currentClicked = event.target.name;
      const value = event.target.value;

      setCounterColour(counterColour + 1);
      const currentStyle = `w-80 ${colours[counterColour]} m-1 px-4 py-2 items-center border rounded-4xl`;

      if (isOdd(counterColour)) {
        finalAnswer.push(`${currentAnswer}-${value}`);
      } else {
        setCurrentAnswer(value);
      }
      console.log(finalAnswer, "<---finalAnswer");

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
    if (finalAnswer.length < 4) {
      isCorrectAnswer = false;
    }
    for (const answer of finalAnswer) {
      if (!correctAnswers.includes(answer)) {
        isCorrectAnswer = false;
        break;
      }
    }
    isCorrectAnswer ? console.log("Correct") : console.log("Wrong");
    setActiveQuestionIndex((current) => current + 1);
    handleReset();
  }

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl flex flex-col justify-center items-center m-2 p-4 rounded-sm">
      <h2 className="text-4xl font-bold text-lime-500 mb-2">QUIZ № 1</h2>
      <h4 className="text-2xl font-bold">Match the Pairs</h4>
      <div className="container mx-auto">
        {correctAnswers.length ? (
          <section className="grid grid-cols-2">
            <div className="flex flex-col place-items-end p-4">
              <ul>
                <li>
                  <button
                    name="left1"
                    value={randomLeftButtons[0]}
                    onClick={handleClickButton}
                    className={styleLeftButton1}
                  >
                    {randomLeftButtons[0]}
                  </button>
                </li>
                <li>
                  <button
                    name="left2"
                    value={randomLeftButtons[1]}
                    onClick={handleClickButton}
                    className={styleLeftButton2}
                  >
                    {randomLeftButtons[1]}
                  </button>
                </li>
                <li>
                  <button
                    name="left3"
                    value={randomLeftButtons[2]}
                    onClick={handleClickButton}
                    className={styleLeftButton3}
                  >
                    {randomLeftButtons[2]}
                  </button>
                </li>
                <li>
                  <button
                    name="left4"
                    value={randomLeftButtons[3]}
                    onClick={handleClickButton}
                    className={styleLeftButton4}
                  >
                    {randomLeftButtons[3]}
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex flex-col place-items-start p-4">
              <ul>
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
            className="w-64 bg-black  hover:bg-gray-700 text-white m-1 px-4 py-2 items-center border rounded-4xl"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="flex justify-center p-2">
          <button
            className="w-64 bg-green hover:bg-green-700 text-white m-1 px-4 py-2 items-center border rounded-4xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchingPairsCard;
