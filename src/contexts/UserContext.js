"use client";

import { getUsers } from "@/api";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState();

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
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
