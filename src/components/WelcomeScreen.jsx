"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/contexts";
import { PopUp } from "./ui";
import { getUserByUsername } from "@/api";
import { CustomError } from ".";

const WelcomeScreen = ({ openWelcomeScreen, closeWelcomeScreen }) => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [noUsername, setNoUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    if (user) {
      closeWelcomeScreen();
    }
  }, [user]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (usernameInput) {
      getUserByUsername(usernameInput)
        .then((user) => {
          setNoUsername("");
          setError(false);
          setUsernameInput("");
          setUser(user);
        })
        .catch((err) => {
          const msg = err?.response?.data?.msg;

          if (msg === "username Not Found!") {
            setNoUsername(err.response.data.msg);
          } else {
            setError(true);
          }
        })
        .finally(() => {
          setUsernameInput("");
        });
    }
  };

  const playAsGuest = () => {
    setUser("guest");
  };

  return (
    <PopUp openPopUp={openWelcomeScreen}>
      {error ? (
        <CustomError />
      ) : (
        <>
          <form
            onSubmit={handleSubmitForm}
            className="w-full flex flex-col items-center pt-10 mb-5"
          >
            <h3 className="text-2xl font-bold mb-8">Welcome to Geo Explorer</h3>
            {noUsername ? (
              <p className="text-red mb-1">username Not Found!</p>
            ) : null}
            <input
              placeholder="Enter username"
              className="h-[56px] w-full bg-gray-100 p-4 rounded-xl mb-8 shadow-[0px_4px_4px_0px_#00000040]"
              name="user"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
                setNoUsername("");
              }}
            ></input>

            <button className="w-full bg-green rounded-4xl p-2 text-white font-bold shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600">
              Play
            </button>
          </form>
          <Link
            href="/profile?register=true"
          >
            <button
              className="w-full border border-green text-green rounded-4xl p-2 font-bold shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600 hover:text-white mb-5"
            >
              Register
            </button>
          </Link>
          <button
            className="w-full bg-gray-100 rounded-4xl p-2 text-black font-bold shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600 mb-5"
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
