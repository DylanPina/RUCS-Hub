"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { BiSolidUser } from "react-icons/bi";
import { MdLogout, MdRateReview } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function NavProfile() {
  const { user } = useUser();
  const router = useRouter();

  return (
    user && (
      <div className="flex items-center space-x-4 max-sm:space-x-0">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="focus:outline-none">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex align-center outline-none">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-full overflow-hidden transition duration-150 ease-out hover:ease-in"
                  >
                    <Avatar className="w-9 h-9 border-2 rounded-full overflow-hidden shadow-sm shadow-primary-white/20 outline-primary-white transition duration-150 ease-out hover:ease-in hover:outline-primary-red hover:shadow-primary-red">
                      <AvatarImage
                        className="cursor-pointer"
                        src={user.picture || ""}
                        alt="Profile image"
                      />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary-black text-primary-white">
                  <DropdownMenuLabel>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8 border-2 rounded-full overflow-hidden shadow-sm shadow-primary-white/20 max-sm:w-6 max-sm:h-6 max-sm:border">
                        <AvatarImage
                          className="max-sm:w-6 max-sm:h-6"
                          width={300}
                          height={300}
                          src={user.picture || ""}
                          alt="Profile image"
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <h3>{user.nickname}</h3>
                        <p className="text-xs text-primary-white/50">
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    <div className="flex items-center space-x-2">
                      <BiSolidUser />
                      <h3>Profile</h3>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/my-reviews")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <MdRateReview />
                      <h3>My Reviews</h3>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/subscriptions")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <FaStar />
                      <h3>Subscriptions</h3>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/api/auth/logout")}
                    className="cursor-pointer hover:bg-primary-red"
                  >
                    <div className="flex items-center space-x-2">
                      <MdLogout />
                      <h3>Logout</h3>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent align="end" className="bg-primary-red">
              Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  );
}
