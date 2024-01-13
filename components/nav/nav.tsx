import React from "react";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import { Separator } from "../shadcn/ui/separator";
import NavButton from "./nav_button";
import { Button } from "../shadcn/ui/button";
import Link from "next/link";
import NavSearchBar from "./nav_search_bar";
import NavStar from "./nav_star";
import NavNotification from "./nav_notifications";

export default function Nav() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur flex justify-center w-full transition-colors duration-500 lg:z-50 border-b border-primary-white bg-primary-black supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="w-full max-w-screen-2xl">
        <div className="flex space-x-4 py-4 px-8">
          <h2 className="font-bold text-3xl text-primary-white whitespace-nowrap">
            <span className="text-primary-red">RUCS</span>Hub
          </h2>
          <div className="flex space-x-4 w-full">
            <div className="flex space-x-2">
              <NavButton link="/professors" text="Professors" />
              <NavButton link="/courses" text="Courses" />
            </div>
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
    </div>
  );
}
