"use client";

import { useState } from "react";

import {
  // Categories,
  // Continent,
  QuizzButtons,
  WelcomeScreen,
} from "@/components";
// import { CategoryProvider } from "@/contexts";
import { ProgressProvider } from "@/contexts/ProgressContext";
import ProgressBar from "@/components/ProgressBar";
import ProgressBarMain from "@/components/ProgressBarMain";
import FilterBar from "@/components/FilterBar.jsx";
import { FilterProvider } from "@/contexts/FilterContext";

export default function Home() {
  const [isOpenWelcomeScreen, setOpenWelcomeScreen] = useState(true);

  const handleCloseWelcomeScreen = () => setOpenWelcomeScreen(false);

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl">
      <WelcomeScreen
        openWelcomeScreen={isOpenWelcomeScreen}
        closeWelcomeScreen={handleCloseWelcomeScreen}
      />
      {/* <Continent />
      <CategoryProvider>
        <Categories />
      </CategoryProvider> */}

      <FilterProvider>
        <FilterBar showCategories={true} showSubCategories={false} />
      </FilterProvider>

      <ProgressProvider>
        <ProgressBarMain />
      </ProgressProvider>

      <ProgressProvider>
        <ProgressBar />
      </ProgressProvider>

      <ProgressProvider>
        <QuizzButtons />
      </ProgressProvider>
    </div>
  );
}
