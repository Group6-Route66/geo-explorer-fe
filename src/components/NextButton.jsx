"use client";
import Link from "next/link";
import { useState } from "react";

const NextButton = () => {
  const [level] = useState("Beginner");

  const levelColors = {
    Beginner:
      "w-40 bg-grey-500 border rounded-3xl p-2 text-green-600 font-bold hover:bg-green hover:text-white",
    Intermediate:
      "w-40 bg-grey-500 border rounded-3xl p-2 text-yellow-600 font-bold hover:bg-yellow hover:text-white",
    Advanced:
      "w-40 bg-grey-500 border rounded-3xl p-2 text-red-600 font-bold hover:bg-red hover:text-white",
  };

  const buttonClass = levelColors[level] || levelColors.Beginner;

  return (
    <Link href="/">
      <button className={buttonClass}>Go next</button>
    </Link>
  );
};

export default NextButton;
