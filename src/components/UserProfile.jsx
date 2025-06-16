"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/contexts";

import { patchUserAvatar } from "@/api";
import { CustomError, LoginScreen, PickAvatarScreen, RegisterScreen } from ".";

const UserProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegister = searchParams.get("register");
  const { user, setUser } = useContext(UserContext);

  const [showRegisterScreen, setShowRegisterScreen] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showPickAvatarScreen, setShowPickAvatarScreen] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState();
  const [error, setError] = useState(false);

  const closeRegisterScreen = () => setShowRegisterScreen(false);
  const closeLoginScreen = () => setShowLoginScreen(false);
  const closePickAvatarScreen = () => setShowPickAvatarScreen(false);

  //handle default user to "guest"
  useEffect(() => {
    setError(false);
    if (!user) {
      setUser("guest");
    }
  }, [user]);

  //handle ?register=true form searchParams
  useEffect(() => {
    setError(false);
    if (isRegister === "true") {
      setShowRegisterScreen(true);
      router.replace(window.location.pathname); //clear ?register=true
    }
  }, [isRegister, router]);

  //handle avatar change
  useEffect(() => {
    setError(false);
    if (changeAvatar && user !== "guest") {
      patchUserAvatar(user.username, changeAvatar)
        .then((updatedUser) => {
          setUser(updatedUser);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, [changeAvatar, user]);

  if (error) {
    return <CustomError />;
  }

  return (
    <div className="w-full flex flex-col items-center pt-12 pb-12">
      {user !== "guest" && user !== null ? (
        <>
          {showPickAvatarScreen ? (
            <PickAvatarScreen
              openPickAvatarScreen={showPickAvatarScreen}
              closePickAvatarScreen={closePickAvatarScreen}
              setAvatarUrl={setChangeAvatar}
            />
          ) : null}
          <img
            className="w-48 h-48 rounded-full object-cover shadow-md mb-4 hover:scale-110 transition-transform cursor-pointer"
            src={user?.avatar_url}
            alt="user's Profile Image"
            onClick={() => setShowPickAvatarScreen(true)}
          />
          <div className="w-full pt-1 flex flex-col items-center">
            <p className="text-xl font-extrabold text-green flex flex-col items-center">
              {user?.username}
            </p>

            <div className="w-full max-w-75 sm:max-w-100 flex justify-center xs:justify-between items-center flex-wrap gap-4 mt-3 mb-3">
              <div className="border-2 border-green rounded-md p-4 sm:p-7 flex flex-col justify-center items-center gap-2">
                <p className="text-md sm:text-xl font-extrabold dark:text-white">{user?.level_nature}</p>
                <p className="text-sm text-green font-bold">Nature Level</p>
              </div>
              <div className="border-2 border-green rounded-md p-4 sm:p-7 flex flex-col items-center gap-2">
                <p className="text-md sm:text-xl font-extrabold dark:text-white">
                  {user?.level_territory}
                </p>
                <p className="text-sm text-green font-bold">Territory Level</p>
              </div>
            </div>
            <div className="w-full max-w-75 sm:max-w-100 border-2 border-green rounded-md p-8 flex flex-col items-center gap-2">
              <p className="text-xl font-extrabold dark:text-white">{user?.rating}</p>
              <p className="text-sm text-green font-bold">Total Score</p>
            </div>
          </div>
          <button
            className="m-3 p-3 px-4 bg-green text-white rounded-md shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600"
            onClick={() => {
              setUser("guest");
              setShowRegisterScreen(false);
              setShowLoginScreen(false);
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {showRegisterScreen ? (
            <RegisterScreen
              openRegisterScreen={showRegisterScreen}
              closeRegisterScreen={closeRegisterScreen}
              setUser={setUser}
            />
          ) : null}
          {showLoginScreen ? (
            <LoginScreen
              openLoginScreen={showLoginScreen}
              closeLoginScreen={closeLoginScreen}
              setUser={setUser}
            />
          ) : null}
          <img
            className="w-48 h-48 rounded-full object-cover shadow-md mb-4"
            src="https://avatar.iran.liara.run/public/35"
            alt="guest's Profile Image"
          />
          <div className="pt-1 mb-4">
            <p className="text-xl font-extrabold text-green flex flex-col items-center">
              {user}
            </p>
          </div>
          <div>
            <button
              className="m-3 p-2 px-3 border border-green text-green rounded-md shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600 hover:text-white"
              onClick={() => setShowLoginScreen(true)}
            >
              Login
            </button>
            <button
              className="m-3 p-2 px-3 bg-green text-white rounded-md shadow-[0px_4px_4px_0px_#00000040] hover:bg-green-600 hover:text-white"
              onClick={() => setShowRegisterScreen(true)}
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
