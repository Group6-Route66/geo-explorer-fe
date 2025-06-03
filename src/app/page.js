"use client";

import { useState } from "react";

import { WelcomeScreen } from "@/components";

export default function Home() {
  const [isOpenWelcomeScreen, setOpenWelcomeScreen] = useState(true);

  const handleCloseWelcomeScreen = () => setOpenWelcomeScreen(false);

  return (
    <div className="">
      <WelcomeScreen
        openWelcomeScreen={isOpenWelcomeScreen}
        closeWelcomeScreen={handleCloseWelcomeScreen}
      />
    </div>
  );
}
