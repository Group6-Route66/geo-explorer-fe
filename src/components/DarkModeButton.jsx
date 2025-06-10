"use client";

import React from "react";
import { MoonIcon } from "@/assets/icons/MoonIcon";
import { useTheme } from "next-themes";

const DarkModeButton = () => {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-12 h-6 bg-gray-300 rounded-full transition-all duration-400"
    >
      <span
        className={` h-5 w-5 bg-white rounded-full flex items-center justify-center transform transition-transform duration-400 ${
          theme === "light" ? "translate-x-6" : ""
        }`}
      >
        <MoonIcon />
      </span>
    </button>
  );
};

export default DarkModeButton;
