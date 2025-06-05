"use client";

const { createContext, useState } = require("react");

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  //test need to change later
  // {
  //   user_id: 1,
  //   username: "john_s",
  //   level_nature: "beginner",
  //   level_territory: "beginner",
  //   rating: 0,
  //   avatar_url: "https://avatar.iran.liara.run/public/35",
  // }
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
