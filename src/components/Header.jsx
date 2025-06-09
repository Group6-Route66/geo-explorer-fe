"use client";

import Link from "next/link";

import { LogoIcon, UserIcon } from "@/assets";
import { useContext } from "react";
import { UserContext } from "@/contexts";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="container sticky top-0 z-1 bg-white mx-auto px-4 lg:max-w-5xl flex justify-between items-center p-4 shadow-md rounded-sm">
      <Link href="/">
        <LogoIcon />
      </Link>
      <Link href="/">
        <h1>Geo Explorer</h1>
      </Link>
      <Link href="/profile">
        {user !== "guest" && user !== null ? (
          <img
            className="w-10 h-10 rounded-full cursor-pointer shadow-md"
            src={user?.avatar_url}
            alt="user's profile image icon"
          />
        ) : (
          <UserIcon className="stroke-[var(--color-green)]" />
        )}
      </Link>
    </header>
  );
};

export default Header;
