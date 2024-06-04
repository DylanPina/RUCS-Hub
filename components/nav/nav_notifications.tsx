"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdNotifications } from "react-icons/md";
import { Notification } from "@/lib/definitions/notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import NotificationVote from "../notification/notification_vote";
import {
  deleteNotifications,
  readNotifications,
} from "@/lib/actions/notification";

interface Props {
  notifications: any[];
}

export default function NavNotification({ notifications }: Props) {
  const { user } = useUser();
  const [filteredNotifications, setFilteredNotifications] =
    useState(notifications);

  useEffect(() => {
    readNotifications(notifications.map((notification) => notification.id));
  }, [notifications]);

  function clearNotifications() {
    deleteNotifications(notifications.map((notification) => notification.id));
    setFilteredNotifications([]);
  }

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
                  {filteredNotifications.length === 0 && (
                    <DropdownMenuLabel>No notifications...</DropdownMenuLabel>
                  )}
                  {filteredNotifications.map(
                    (notification: Notification) =>
                      notification.vote && (
                        <>
                          <NotificationVote
                            vote={notification.vote}
                            review={notification.review}
                          />
                          <DropdownMenuSeparator />
                        </>
                      ),
                  )}
                  {filteredNotifications.length > 0 && (
                    <>
                      <div className="flex justify-center h-6">
                        <Button
                          className="bg-primary-red/50 py-0 h-6 w-full text-primary-white hover:bg-primary-red hover:shadow-primary-red hover:text-primary-white hover:font-bold transition duration-150 ease-out"
                          onClick={clearNotifications}
                        >
                          Clear all
                        </Button>
                      </div>
                    </>
                  )}
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
