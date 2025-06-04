"use client";

import { useContext } from "react";

import { UserContext } from "@/contexts";

const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center pt-16">
      <img
        className="w-48 h-48 rounded-full object-cover shadow-md mb-4"
        src={user.avatar_url}
        alt="user's Profile Image"
      />
      <div className="pt-4">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Nature Level:</strong> {user.level_nature}
        </p>
        <p>
          <strong>Territory Level:</strong> {user.level_territory}
        </p>
        <p>
          <strong>Total Score:</strong> {user.rating}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
