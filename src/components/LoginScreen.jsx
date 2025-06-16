"use client";

import { useState } from "react";

import { PopUp } from "./ui";
import { getUserByUsername } from "@/api";
import { CustomError } from ".";

const LoginScreen = ({ openLoginScreen, closeLoginScreen, setUser }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [error, setError] = useState(false);
  const [noUsername, setNoUsername] = useState("");

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

  return (
    <PopUp openPopUp={openLoginScreen}>
      {error ? (
        <CustomError />
      ) : (
        <>
          <div className="w-full flex justify-end">
            <button
              className="text-gray-500 text-xl font-bold p-2 rounded-xl hover:bg-red hover:text-white"
              onClick={() => closeLoginScreen()}
            >
              X
            </button>
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold dark:text-gray-100">Login</h2>
          </div>
          <form
            className="w-full flex flex-col items-center mt-4"
            onSubmit={handleSubmitForm}
          >
            {noUsername ? (
              <p className="text-red mb-1">Username Not Found!</p>
            ) : null}
            <input
              placeholder="Enter username"
              className="h-[56px] w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 p-4 rounded-xl shadow-[0px_4px_4px_0px_#00000040] mb-5"
              name="user"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
                setNoUsername("");
              }}
            />
            <button className="w-full bg-green rounded-4xl p-2 text-white font-bold shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600 mb-5">
              Login
            </button>
          </form>
        </>
      )}
    </PopUp>
  );
};

export default LoginScreen;
