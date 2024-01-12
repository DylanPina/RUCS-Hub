import React from "react";
import { Input } from "../shadcn/ui/input";
import NavButton from "./nav_button";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import { Separator } from "../shadcn/ui/separator";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Nav() {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 bg-primary-black supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="flex place-content-between space-x-4 py-4 border-b border-primary-white lg:px-8 mx-4 lg:mx-0">
        <h2 className="font-bold text-3xl text-primary-white whitespace-nowrap">
          <span className="text-primary-red">RUCS</span>Hub
        </h2>
        <div className="flex space-x-4 place-content-center w-full">
          <div className="flex space-x-2">
            <NavButton link="/professors" text="Professors" />
            <NavButton link="/courses" text="Courses" />
          </div>
          <Input
            className="w-full max-w-md justify-self-center focus:border-primary-red"
            placeholder="Search for a course..."
          />
        </div>
        <div className="flex items-center space-x-4">
          <IoIosNotificationsOutline
            className="fill-primary-white cursor-pointer hover:fill-primary-red"
            size={32}
          />
          <IoIosStarOutline
            className="fill-primary-white cursor-pointer hover:fill-yellow-400"
            size={32}
          />
          <Separator orientation="vertical" />
          <Avatar>
            <AvatarImage
              className="cursor-pointer"
              src="https://github.com/shadcn.png"
            />
          </Avatar>
        </div>
      </div>
    </div>
  );
}
