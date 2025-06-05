"use client";

import { useEffect, useState } from "react";

import { getUsers } from "@/api";
import { CustomError, CustomLoading } from ".";

const UsersRanking = () => {
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
    <div className="flex flex-col items-center pt-12 pb-12">
      <h1 className="text-2xl font-bold mb-6">🏆 Leaderboard</h1>
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg shadow-md w-full max-w-md"
          >
            <div className="flex items-center gap-5">
              <img
                className="w-16 h-16 rounded-full object-cover shadow"
                src={user.avatar_url}
                alt={`${user.username}'s Profile Image`}
              />
              <div>
                <p className="font-bold text-lg">{user.username}</p>
                <p className="text-gray-600">Score: {user.rating}</p>
              </div>
            </div>
            <p className="text-2xl font-bold">{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersRanking;
