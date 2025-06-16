"use client";

import { useState } from "react";

import { PopUp } from "./ui";
import { postUser } from "@/api";
import { CustomError, PickAvatarScreen } from ".";

const RegisterScreen = ({
  openRegisterScreen,
  closeRegisterScreen,
  setUser,
}) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [showPickAvatarScreen, setShowPickAvatarScreen] = useState(false);
  const [regAvatarUrl, setRegAvatarUrl] = useState(
    "https://avatar.iran.liara.run/public/35"
  );
  const [usernameExists, setusernameExists] = useState("");
  const [error, setError] = useState(false);

  const closePickAvatarScreen = () => setShowPickAvatarScreen(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (usernameInput) {
      setUsernameInput("");
      postUser(usernameInput, regAvatarUrl)
        .then((newUser) => {
          setUser(newUser);
          setError(false);
          closePickAvatarScreen();
        })
        .catch((err) => {
          const msg = err?.response?.data?.msg;

          if (msg === "username already exists!") {
            setusernameExists(err.response.data.msg);
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
    <PopUp openPopUp={openRegisterScreen}>
      {showPickAvatarScreen ? (
        <PickAvatarScreen
          openPickAvatarScreen={showPickAvatarScreen}
          closePickAvatarScreen={closePickAvatarScreen}
          setAvatarUrl={setRegAvatarUrl}
        />
      ) : null}
      {error ? (
        <CustomError />
      ) : (
        <>
          <div className="w-full flex justify-end">
            <button
              className="text-gray-500 text-xl font-bold p-2 rounded-xl hover:bg-red hover:text-white"
              onClick={() => closeRegisterScreen()}
            >
              X
            </button>
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold dark:text-gray-100">Register</h2>
          </div>
          <div className="flex justify-center items-center mt-4">
            <img
              className="w-28 h-28  rounded-full object-cover shadow-md mb-4 hover:scale-110 transition-transform cursor-pointer"
              src={regAvatarUrl}
              alt="Profile Image"
              onClick={() => setShowPickAvatarScreen(true)}
            />
          </div>
          <form
            className="w-full flex flex-col items-center pt-5 pb-5"
            onSubmit={handleSubmitForm}
          >
            {usernameExists ? (
              <p className="text-red mb-1">Username Already Exists!</p>
            ) : null}
            <input
              placeholder="Enter username"
              className="h-[56px] w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 p-4 rounded-xl mb-8 shadow-[0px_4px_4px_0px_#00000040]"
              name="user"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
                setusernameExists("");
              }}
            />
            <button className="w-full bg-green rounded-4xl p-2 text-white font-bold hover:bg-green-600 mb-5 shadow-[0px_4px_4px_0px_#00000040]">
              Register
            </button>
          </form>
        </>
      )}
    </PopUp>
  );
};

export default RegisterScreen;
