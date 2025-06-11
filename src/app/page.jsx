"use client";

import { useState } from "react";

import { QuizzButtons, WelcomeScreen } from "@/components";

import ProgressBarMain from "@/components/ProgressBarMain";
import FilterBar from "@/components/FilterBar.jsx";

export default function Home() {
  const [isOpenWelcomeScreen, setOpenWelcomeScreen] = useState(true);

  const handleCloseWelcomeScreen = () => setOpenWelcomeScreen(false);

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl dark:bg-gray-800">
      <WelcomeScreen
        openWelcomeScreen={isOpenWelcomeScreen}
        closeWelcomeScreen={handleCloseWelcomeScreen}
      />

      <FilterBar showCategories={true} showSubCategories={false} />

      <ProgressBarMain />

      <QuizzButtons />
    </div>
  );
}
