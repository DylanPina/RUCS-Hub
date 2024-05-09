"use client";

import React from "react";
import { Avatar, AvatarImage } from "@/components/shadcn/ui/avatar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Input } from "@/components/shadcn/ui/input";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import DeleteUserButtion from "@/components/profile/delete-user-button";

export default function Page() {
  const { user } = useUser();

  return (
    <div className="flex flex-col space-y-4 place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-white">
        Profile
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-16 h-16 outline outline-2 shadow-sm shadow-primary-white/20 outline-primary-white max-sm:w-6 max-sm:h-6 max-sm:outline-1">
          <AvatarImage
            className="max-sm:w-6 max-sm:h-6"
            width={300}
            height={300}
            src={user?.picture || ""}
            alt="Profile image"
          />
        </Avatar>
        <div className="flex flex-col space-y-1 w-[500px]">
          <h1 className="text-lg font-semibold text-primary-white">Email</h1>
          <Input disabled value={user?.email || ""} className="w-full" />
        </div>
        <div className="flex flex-col space-y-1 w-[500px]">
          <div className="flex place-content-between">
            <h1 className="text-lg font-semibold text-primary-white">
              Verification Status
            </h1>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger className="focus:outline-none">
                  <Badge className="cursor-pointer bg-primary-red hover:bg-primary-red hover:text-primary-white transition duration-150 ease-out hover:ease-in hover:shadow-primary-red">
                    Resend
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-primary-red">
                  Resend Email Verification
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            disabled
            value={user?.email_verified ? "Verified" : "Unverified"}
            className="w-full"
          />
        </div>
        <div className="flex space-x-4 w-[500px] h-8 justify-center place-items-center !mt-8">
          <Button className="bg-primary-white text-primary-black hover:bg-primary-white hover:shadow-primary-white transition duration-150 ease-out ">
            Reset Password
          </Button>
          <Separator orientation="vertical" />
          <Button className="bg-primary-white text-primary-black hover:bg-primary-white hover:shadow-primary-white transition duration-150 ease-out ">
            Logout
          </Button>
          <Separator orientation="vertical" />
          <DeleteUserButtion />
        </div>
      </div>
    </div>
  );
}
