import React from "react";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import { Separator } from "../shadcn/ui/separator";
import NavButton from "./nav_button";
import { Button } from "../shadcn/ui/button";
import Link from "next/link";
import NavSearchBar from "./nav_search_bar";
import NavStar from "./nav_star";
import NavNotification from "./nav_notifications";
import NavLogo from "./nav_logo";
import NavIcon from "./nav_icon";
import { FaBook } from "react-icons/fa6";
import { HiMiniAcademicCap } from "react-icons/hi2";

export default function NavLarge() {
  return (
    <div className="backdrop-blur hidden lg:flex justify-center w-full transition-colors duration-500 border-b border-primary-white bg-primary-black supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="flex space-x-4 w-full max-w-screen-2xl py-4 px-8">
        <NavLogo />
        <div className="flex space-x-4 w-full">
          <NavIcon link="/courses" tooltip="Courses page">
            <FaBook className="w-6 h-6 fill-primary-white max-sm:w-7 max-sm:h-7 cursor-pointer hover:fill-primary-red focus:border-0 transition duration-150 ease-out hover:ease-in hover:scale-105" />
          </NavIcon>
          <NavIcon link="/professors" tooltip="Professors page">
            <HiMiniAcademicCap className="w-8 h-8 fill-primary-white max-sm:w-7 max-sm:h-7 cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in hover:scale-105" />
          </NavIcon>
          <NavSearchBar />
        </div>
        <div className="flex items-center space-x-4">
          <NavNotification />
          <NavStar />
          <Separator orientation="vertical" />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full transition duration-150 ease-out hover:ease-in hover:scale-105"
          >
            <Link href="/login">
              <Avatar>
                <AvatarImage
                  className="cursor-pointer"
                  src="https://github.com/shadcn.png"
                />
              </Avatar>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
