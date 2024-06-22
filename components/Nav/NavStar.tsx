"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { IoIosStarOutline } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavStar() {
  const { user } = useUser();

  return (
    user && (
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="hover:bg-transparent"
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="focus:outline-none">
              <IoIosStarOutline className="w-10 h-10 fill-primary-white max-sm:w-7 max-sm:h-7 cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in" />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">Saved</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    )
  );
}
