import { DISCORD_URL, GITHUB_URL } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex place-items-center justify-between w-full bg-primary-red px-4 py-1">
      <div className="flex place-items-center space-x-2 max-w-screen-2xl">
        <Link href={GITHUB_URL}>
          <FaGithub className="w-5 h-5 drop-shadow-xl cursor-pointer transition duration-150 ease-out hover:ease-in" />
        </Link>
        <Link href={DISCORD_URL}>
          <FaDiscord className="w-5 h-5 drop-shadow-xl cursor-pointer transition duration-150 ease-out hover:ease-in" />
        </Link>
      </div>
      <span className="w-fit px-1 text-xs text-primary-white">
        1.0.0-beta.1
      </span>
    </div>
  );
}
