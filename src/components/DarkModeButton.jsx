"use client";

import React, { useEffect, useState } from "react";

import { SunIcon, MoonIcon } from "@/assets";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(savedTheme ? savedTheme === "dark" : systemPrefersDark);
  }, []);

  useEffect(() => {
    if (darkMode === undefined) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (darkMode === undefined) return null;

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="w-12 h-6 bg-gray-300 rounded-full transition-all duration-400"
    >
      <span
        className={`h-5 w-5 bg-white rounded-full flex items-center justify-center transform transition-transform duration-400 ${
          darkMode ? "" : "translate-x-6"
        }`}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
};

export default DarkModeButton;
