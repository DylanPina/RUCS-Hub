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
import { useSession } from "next-auth/react";

export default function NavStar() {
  const { data: session } = useSession();

  return (
    session &&
    session.user && (
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="hover:bg-transparent"
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="focus:outline-none">
              <IoIosStarOutline className="w-10 h-10 fill-primary-white max-sm:w-7 max-sm:h-7 cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in hover:scale-105" />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">Saved</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    )
  );
}
