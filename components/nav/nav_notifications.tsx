"use client";

import React, { useState } from "react";
import { Button } from "../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdNotifications } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { LoaderButton } from "../shadcn/ui/loader-button";

export default function NavNotification() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

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
              <DropdownMenu>
                <DropdownMenuTrigger className="flex align-center outline-none">
                  <MdNotifications className="w-8 h-8 fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary-black text-primary-white">
                  <DropdownMenuLabel className="font-bold text-center">
                    Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>No notifications...</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex justify-center h-6">
                    <LoaderButton
                      isLoading={loading}
                      className="bg-transparent py-0 h-6 w-full text-primary-white hover:bg-primary-red hover:shadow-primary-red hover:text-primary-white hover:font-bold transition duration-150 ease-out"
                    >
                      Clear all
                    </LoaderButton>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">
              Notifications
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    )
  );
}
