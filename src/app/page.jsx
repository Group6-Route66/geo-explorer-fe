"use client";

import { useState } from "react";

import { Categories, Continent, WelcomeScreen } from "@/components";
import { CategoryProvider } from "@/contexts";
import { ProgressProvider } from "@/contexts/ProgressContext";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const [isOpenWelcomeScreen, setOpenWelcomeScreen] = useState(true);

  const handleCloseWelcomeScreen = () => setOpenWelcomeScreen(false);

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl">
      <WelcomeScreen
        openWelcomeScreen={isOpenWelcomeScreen}
        closeWelcomeScreen={handleCloseWelcomeScreen}
      />
      <Continent />
      <CategoryProvider>
        <Categories />
      </CategoryProvider>

      <ProgressProvider>
        <ProgressBar />
      </ProgressProvider>
    </div>
  );
}
