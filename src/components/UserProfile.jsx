"use client";
//need to remove useState later
import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/contexts";
import RegisterScreen from "./Register";
import LoginScreen from "./LogIn";

const UserProfile = () => {
  //use after api calls implemented
  const { user, setUser } = useContext(UserContext);
  const [showRegisterScreen, setShowRegisterScreen] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  const closeRegisterScreen = () => setShowRegisterScreen(false);
  const closeLoginScreen = () => setShowLoginScreen(false);

  //mock data
  // const [user, setUser] = useState({
  //   user_id: 1,
  //   username: "john_s",
  //   level_nature: "Beginner",
  //   level_territory: "Intermediate",
  //   rating: 200,
  //   avatar_url: "https://avatar.iran.liara.run/public/35",
  // });

  //test
  useEffect(() => {
    if (!user) {
      setUser("guest");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center pt-12 pb-12">
      {user !== "guest" && user !== undefined ? (
        <>
          <img
            className="w-48 h-48 rounded-full object-cover shadow-md mb-4"
            src={user.avatar_url}
            alt="user's Profile Image"
          />
          <div className="pt-1">
            <p className="text-xl font-extrabold text-green flex flex-col items-center">
              {user.username}
            </p>

            <div className="flex gap-4 mt-3 mb-3">
              <div className="border-2 border-green rounded-md p-8 flex flex-col items-center gap-2">
                <p className="text-xl font-extrabold">{user.level_nature}</p>
                <p className="text-sm text-green font-bold">Nature Level</p>
              </div>
              <div className="border-2 border-green rounded-md p-8 flex flex-col items-center gap-2">
                <p className="text-xl font-extrabold">{user.level_territory}</p>
                <p className="text-sm text-green font-bold">Territory Level</p>
              </div>
            </div>
            <div className="border-2 border-green rounded-md p-8 flex flex-col items-center gap-2">
              <p className="text-xl font-extrabold">{user.rating}</p>
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
          {showRegisterScreen && (
            <RegisterScreen
              openWelcomeScreen={showRegisterScreen}
              closeWelcomeScreen={closeRegisterScreen}
              setUser={setUser}
            />
          )}
          {showLoginScreen && (
            <LoginScreen
              openWelcomeScreen={showLoginScreen}
              closeWelcomeScreen={closeLoginScreen}
              setUser={setUser}
            />
          )}
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
