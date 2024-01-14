import {
  AARON_NEWLAND_GITHUB_URL,
  ALEX_LAUDINO_GITHUB_URL,
  DYLAN_PINA_GITHUB_URL,
  GITHUB_URL,
  JACK_BOGART_GITHUB_URL,
} from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex place-items-center justify-center w-full bg-primary-red">
      <div className="flex place-items-center space-x-2 w-full max-w-screen-2xl py-1 px-8 max-sm:px-4">
        <Link href={GITHUB_URL}>
          <FaGithub className="w-5 h-5 drop-shadow-xl cursor-pointer transition duration-150 ease-out hover:ease-in hover:scale-110" />
        </Link>
        <h2>
          <Link href={DYLAN_PINA_GITHUB_URL}>
            <span className="px-1 text-xs text-primary-white cursor-pointer hover:font-bold hover:text-sm transition-all duration-150 ease-out hover:ease-in">
              Dylan<span className="max-sm:hidden"> Pina</span>
            </span>
          </Link>
          |
          <Link href={JACK_BOGART_GITHUB_URL}>
            <span className="px-1 text-xs text-primary-white cursor-pointer hover:font-bold hover:text-sm transition-all duration-150 ease-out hover:ease-in">
              Jack<span className="max-sm:hidden"> Bogart</span>
            </span>
          </Link>
          |
          <Link href={ALEX_LAUDINO_GITHUB_URL}>
            <span className="px-1 text-xs text-primary-white cursor-pointer hover:font-bold hover:text-sm transition-all duration-150 ease-out hover:ease-in">
              Alex<span className="max-sm:hidden"> Laudino</span>
            </span>
          </Link>
          |
          <Link href={AARON_NEWLAND_GITHUB_URL}>
            <span className="px-1 text-xs text-primary-white cursor-pointer hover:font-bold hover:text-sm transition-all duration-150 ease-out hover:ease-in">
              Aaron<span className="max-sm:hidden"> Newland</span>
            </span>
          </Link>
        </h2>
      </div>
    </div>
  );
}
