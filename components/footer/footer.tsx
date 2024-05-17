import { DISCORD_URL, GITHUB_ISSUES_URL, GITHUB_URL } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { FaGithub, FaDiscord, FaBug } from "react-icons/fa";
import { Badge } from "../shadcn/ui/badge";

export default function Footer() {
  return (
    <div className="flex justify-center w-full bg-primary-red px-4 py-2">
      <div className="flex justify-between align-center w-full max-w-screen-2xl">
        <div className="flex align-center space-x-4">
          <Link href={GITHUB_URL}>
            <FaGithub className="w-6 h-6 drop-shadow-xl cursor-pointer transition duration-150 ease-out hover:ease-in" />
          </Link>
          <Link href={DISCORD_URL}>
            <FaDiscord className="w-6 h-6 cursor-pointer transition duration-150 ease-out hover:ease-in" />
          </Link>
          <Link href={GITHUB_ISSUES_URL}>
            <Badge
              variant="outline"
              className="text-primary-white cursor-pointer"
            >
              <div className="flex align-center">
                <FaBug className="mt-[1px] mr-1.5" /> <span>Found a Bug?</span>
              </div>
            </Badge>
          </Link>
        </div>
        <span className="w-fit px-1 text-sm text-primary-white mt-0.5">
          1.0.0-beta.1
        </span>
      </div>
    </div>
  );
}
