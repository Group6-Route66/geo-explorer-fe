"use client";

import { useState } from "react";

const NextButton = ({ disabled = false }) => {
  const [level] = useState("Beginner");

  const levelColors = {
    Beginner: "text-green-600",
    Intermediate: "text-yellow-600",
    Advanced: "text-red-600 ",
  };

  const buttonClass =
    "w-40 bg-grey-500 border rounded-3xl p-2 font-bold hover:bg-green hover:text-white disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-300 ";

  return (
    <button
      disabled={disabled}
      className={`${buttonClass} ${levelColors[level] || levelColors.Beginner}`}
    >
      Go next
    </button>
  );
};

export default NextButton;
