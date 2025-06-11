"use client";

import { useContext, useEffect, useState } from "react";

import { getUsers } from "@/api";
import { CustomError, CustomLoading } from ".";
import { UserContext } from "@/contexts";

const UsersRanking = () => {
  const { user } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => { 
    setIsLoading(true);
    setError(false);
    getUsers()
      .then((usersArr) => {
        const sortedUsers = usersArr
          .map((user) => {
            return {
              username: user.username,
              avatar_url: user.avatar_url,
              rating: user.rating,
            };
          })
          .sort((a, b) => b.rating - a.rating);
        setUsers(sortedUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isError) {
    return <CustomError />;
  }

  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-12 pb-12 ">
      <h1 className="text-2xl font-bold mb-6">🏆 Leaderboard</h1>
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        {users.map((individualUser, index) => (
          <div
            key={index}
            className={`${
              individualUser.username === user?.username
                ? "border-4 border-green scale-110"
                : ""
            } flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg shadow-md w-full max-w-md`}
          >
            <div className="flex items-center gap-5">
              <img
                className="w-16 h-16 rounded-full object-cover shadow"
                src={individualUser.avatar_url}
                alt={`${individualUser.username}'s Profile Image`}
              />
              <div className="dark:text-white">
                <p className="font-bold text-lg">{individualUser.username}</p>
                <p className="text-gray-600 dark:text-white">Score: {individualUser.rating}</p>
              </div>
            </div>
            <p className="text-2xl font-bold dark:text-white">{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersRanking;
