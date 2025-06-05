import Link from "next/link";

import { LogoIcon, UserIcon } from "@/assets";

const Header = () => {
  return (
    <header className="container mx-auto px-4 lg:max-w-5xl flex justify-between items-center p-4 shadow-md rounded-sm">
      <Link href="/">
        <LogoIcon />
      </Link>
      <Link href="/">
        <h1>Geo Explorer</h1>
      </Link>
      <Link href="/profile">
        <UserIcon />
      </Link>
    </header>
  );
};

export default Header;
