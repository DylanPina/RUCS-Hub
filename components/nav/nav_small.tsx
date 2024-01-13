import React from "react";
import NavLogo from "./nav_logo";
import NavNotification from "./nav_notifications";
import NavStar from "./nav_star";
import { Separator } from "../shadcn/ui/separator";
import { Button } from "../shadcn/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import NavProfile from "./nav_profile";

export default function NavSmall() {
  return (
    <div className="backdrop-blur flex lg:hidden justify-center w-full transition-colors duration-500 border-b border-primary-white bg-primary-black supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="flex place-content-between align-items-center space-x-4 w-full max-w-screen-2xl py-4 px-8 max-sm:py-2 max-sm:px-4">
        <NavLogo />
        <div className="flex items-center space-x-4 max-sm:space-x-2">
          <NavNotification />
          <NavStar />
          <Separator orientation="vertical" className="max-sm:h-6" />
          <NavProfile />
        </div>
      </div>
    </div>
  );
}
