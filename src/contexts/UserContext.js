"use client";

import { getUsers } from "@/api";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsersList(users);
      })
      .catch((err) => {
        setError(true);
      });
  });

  if (error) return <p>Sorry, something went wrong!</p>;
  console.log(usersList, "<---userlist");
  
  //test need to change later
  // {
  //   user_id: 1,
  //   username: "john_s",
  //   level_nature: "beginner",
  //   level_territory: "beginner",
  //   rating: 0,
  //   avatar_url: "https://avatar.iran.liara.run/public/35",
  // }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
