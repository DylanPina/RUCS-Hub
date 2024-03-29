import {
  DYLAN_PINA_GITHUB_URL,
  JACK_BOGART_GITHUB_URL,
  GITHUB_URL,
} from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex place-items-center justify-center w-full bg-primary-red">
      <div className="flex place-items-center space-x-2 w-full max-w-screen-2xl px-4 py-1 ">
        <Link href={GITHUB_URL}>
          <FaGithub className="w-5 h-5 drop-shadow-xl cursor-pointer transition duration-150 ease-out hover:ease-in" />
        </Link>
        <h2>
          <Link href={DYLAN_PINA_GITHUB_URL}>
            <span className="px-1 text-xs text-primary-white cursor-pointer hover:font-black transition-all duration-150 ease-out hover:ease-in">
              Dylan Pina
            </span>
          </Link>
          |
          <Link href={JACK_BOGART_GITHUB_URL}>
            <span className="px-1 text-xs text-primary-white cursor-pointer hover:font-black transition-all duration-150 ease-out hover:ease-in">
              Jack Bogart
            </span>
          </Link>
        </h2>
      </div>
    </div>
  );
}
