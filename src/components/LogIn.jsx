"use client";

import { useState } from "react";

import { PopUp } from "./ui";

const LoginScreen = ({ openWelcomeScreen, closeWelcomeScreen, setUser }) => {
  const [userInput, setUserInput] = useState("");

  const handleLogin = () => {
    if (userInput) {
      setUser(userInput);
      setUserInput("");
    }
  };

  return (
    <PopUp openPopUp={openWelcomeScreen}>
      <div className="w-full flex justify-end">
        <button
          className="text-gray-500 text-xl font-bold p-2 rounded-xl hover:bg-red hover:text-white"
          onClick={() => closeWelcomeScreen()}
        >
          X
        </button>
      </div>
      <div className="w-full flex flex-col gap-8 items-center">
        <h2 className="text-2xl font-bold">Login</h2>
      </div>
      <form className="w-full flex flex-col gap-8 items-center pt-10 pb-5">
        <input
          placeholder="Enter username"
          className="h-[56px] w-full bg-gray-100 p-4 rounded-xl"
          name="user"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
      </form>
      <button
        className="w-full bg-green rounded-4xl p-2 text-white font-bold hover:bg-green-600 mb-5"
        onClick={handleLogin}
      >
        Login
      </button>
    </PopUp>
  );
};

export default LoginScreen;
