import React from "react";
import { Input } from "../shadcn/ui/input";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import { Separator } from "../shadcn/ui/separator";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import NavButton from "./nav_button";
import { Button } from "../shadcn/ui/button";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur flex justify-center w-full transition-colors duration-500 lg:z-50 border-b border-primary-white bg-primary-black supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="w-full max-w-screen-2xl">
        <div className="flex place-content-between space-x-4 py-4">
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
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:bg-primary-red"
            >
              <IoIosNotificationsOutline
                className="fill-primary-white cursor-pointer hover:fill-primary-black"
                size={32}
              />
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:bg-primary-red"
            >
              <IoIosStarOutline
                className="fill-primary-white cursor-pointer hover:fill-primary-black"
                size={32}
              />
            </Button>
            <Separator orientation="vertical" />
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full transition duration-150 ease-out hover:ease-in hover:scale-110"
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
    </div>
  );
}
