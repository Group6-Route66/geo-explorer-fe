"use client";

import React, { useEffect, useState } from "react";
import { MoonIcon } from "@/assets/icons/MoonIcon";

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(savedTheme ? savedTheme === "dark" : systemPrefersDark);
  }, []);

  useEffect(() => {
    if (isDarkMode === undefined) return;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  if (isDarkMode === undefined) return null;

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="w-12 h-6 bg-gray-300 rounded-full transition-all duration-400"
    >
      <span
        className={`h-5 w-5 bg-white rounded-full flex items-center justify-center transform transition-transform duration-400 ${
          isDarkMode ? "" : "translate-x-6"
        }`}
      >
        <MoonIcon />
      </span>
    </button>
  );
};

export default DarkModeButton;
