"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/contexts";
import { PopUp } from "./ui";

const WelcomeScreen = ({ openWelcomeScreen, closeWelcomeScreen }) => {
  const { user, setUser } = useContext(UserContext);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (user) {
      closeWelcomeScreen();
    }
  }, [user]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (value) {
      setUser(value);
    }
  };

  const playAsGuest = () => {
    setUser("guest");
  };

  return (
    <PopUp openPopUp={openWelcomeScreen}>
      {user ? (
        <div className="w-full flex flex-col gap-8 items-center pt-10 pb-10">
          <h2 className="text-2xl font-bold">Welcome {user}</h2>

          <Link
            href="/"
            className="w-full"
            onClick={() => {
              closeWelcomeScreen();
            }}
          >
            <button className="w-full bg-green rounded-4xl p-2 text-white font-bold">
              Take a quiz
            </button>
          </Link>
          <Link
            href="/learn"
            className="w-full"
            onClick={() => {
              closeWelcomeScreen();
            }}
          >
            <button className="w-full bg-green rounded-4xl p-2 text-white font-bold">
              Learn
            </button>
          </Link>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmitForm}
            className="w-full flex flex-col gap-8 items-center pt-10 pb-10"
          >
            <h3 className="text-2xl font-bold">Welcome to Geo Explorer</h3>
            <input
              placeholder="Enter username"
              className="h-[56px] w-full bg-gray-100 p-4 rounded-xl"
              name="user"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            ></input>

            <button className="w-full bg-green rounded-4xl p-2 text-white font-bold">
              Play
            </button>
          </form>
          <button
            className="w-full bg-gray-100 rounded-4xl p-2 text-black font-bold"
            onClick={playAsGuest}
          >
            Play as Guest
          </button>
        </>
      )}
    </PopUp>
  );
};

export default WelcomeScreen;
