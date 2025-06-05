"use client";

import { useState } from "react";

import { PopUp } from "./ui";

const RegisterScreen = ({ openWelcomeScreen, closeWelcomeScreen, setUser }) => {
  const [userInput, setUserInput] = useState("");
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const checkUrl = (imgUrl) => {
    const urlRegex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    return urlRegex.test(imgUrl);
  };

  const handleRegister = () => {
    if (userInput && checkUrl(imgUrlInput)) {
      setUser(userInput);
      setUserInput("")
      setImgUrlInput("")
    } else {
      setIsValidUrl(false);
      setUserInput("")
      setImgUrlInput("");
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
        <h2 className="text-2xl font-bold">Register</h2>
      </div>
      <form className="w-full flex flex-col items-center pt-10 pb-5">
        <input
          placeholder="Enter username"
          className="h-[56px] w-full bg-gray-100 p-4 rounded-xl mb-8"
          name="user"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            setIsValidUrl(true);
          }}
        />
        {isValidUrl ? null : <p className="text-red">Please Enter a Url!</p>}
        <input
          placeholder="Enter User Image Url"
          className="h-[56px] w-full bg-gray-100 p-4 rounded-xl"
          name="img-url"
          value={imgUrlInput}
          onChange={(e) => {
            setImgUrlInput(e.target.value);
            setIsValidUrl(true);
          }}
        />
      </form>
      <button
        className="w-full bg-green rounded-4xl p-2 text-white font-bold hover:bg-green-600 mb-5"
        onClick={handleRegister}
      >
        Register
      </button>
    </PopUp>
  );
};

export default RegisterScreen;
