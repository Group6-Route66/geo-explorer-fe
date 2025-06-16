"use client";

import { useState } from "react";
import { PopUp } from "./ui";

import avatarUrls from "@/data/avatarUrls";

const PickAvatarScreen = ({
  openPickAvatarScreen,
  closePickAvatarScreen,
  setAvatarUrl,
}) => {
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(null);

  return (
    <PopUp openPopUp={openPickAvatarScreen}>
      <div className="w-full flex justify-end">
        <button
          className="text-gray-500 text-xl font-bold p-2 rounded-xl hover:bg-red hover:text-white"
          onClick={() => closePickAvatarScreen()}
        >
          X
        </button>
      </div>
      <div className="w-full flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold dark:text-gray-100">
          Select Your Avatar
        </h2>
      </div>
      <div className="grid grid-cols-5 gap-4 justify-items-center w-full max-h-55 p-1 overflow-auto">
        {avatarUrls.map((avatar, index) => {
          return (
            <img
              key={index}
              src={avatar.avatar_url}
              alt="avatar icon"
              onClick={() => setSelectedAvatarUrl(avatar.avatar_url)}
              className={`${
                selectedAvatarUrl === avatar.avatar_url
                  ? "border-4 border-green"
                  : ""
              } w-16 h-16 rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform`}
            />
          );
        })}
      </div>
      <button
        className="w-full bg-green rounded-4xl p-2 text-white font-bold shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600 mt-5 mb-5"
        onClick={() => {
          setAvatarUrl(selectedAvatarUrl);
          closePickAvatarScreen();
        }}
      >
        OK
      </button>
    </PopUp>
  );
};

export default PickAvatarScreen;
