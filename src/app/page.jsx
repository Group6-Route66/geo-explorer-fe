"use client";

import { useState } from "react";

import { Categories, Continent, WelcomeScreen } from "@/components";
import { CategoryProvider } from "@/contexts";

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
    </div>
  );
}
