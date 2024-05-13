import {
  DISCORD_URL,
  DYLAN_PINA_GITHUB_URL,
  GITHUB_URL,
} from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex place-items-center justify-center w-full bg-primary-red">
      <div className="flex place-items-center space-x-2 w-full max-w-screen-2xl px-4 py-1 ">
        <Link href={GITHUB_URL}>
          <FaGithub className="w-5 h-5 drop-shadow-xl cursor-pointer transition duration-150 ease-out hover:ease-in" />
        </Link>
        <Link href={DISCORD_URL}>
          <FaDiscord className="w-5 h-5 drop-shadow-xl cursor-pointer transition duration-150 ease-out hover:ease-in" />
        </Link>
        <span className="px-1 text-xs text-primary-white">
          Developed by{" "}
          <Link href={DYLAN_PINA_GITHUB_URL}>
            <span className="cursor-pointer hover:font-black transition-all duration-150 ease-out hover:ease-in underline">
              Dylan Pina
            </span>
          </Link>
        </span>
      </div>
      <span className="px-1 text-xs text-primary-white">1.0.0-beta.1</span>
    </div>
  );
}
