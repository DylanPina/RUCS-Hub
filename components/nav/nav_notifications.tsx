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
import { MdNotifications, MdNotificationsActive } from "react-icons/md";
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
import NotificationProfessor from "../notification/notification_professor";
import NotificationCourse from "../notification/notification_course";

interface Props {
  notifications: any[];
}

export default function NavNotification({ notifications }: Props) {
  const { user } = useUser();
  const [filteredNotifications, setFilteredNotifications] =
    useState(notifications);
  const [newNotifications, setNewNotifications] = useState(
    notifications.filter((notification) => !notification.read),
  );

  function handleDropdownChange(open: boolean) {
    if (open) {
      return;
    }

    readNotifications(newNotifications.map((notification) => notification.id));
    setNewNotifications([]);

    for (const filteredNotification of filteredNotifications) {
      filteredNotification.read = true;
    }
    setFilteredNotifications(filteredNotifications);
  }

  function clearNotifications() {
    deleteNotifications(notifications.map((notification) => notification.id));
    setFilteredNotifications([]);
  }

  return (
    user && (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="focus:outline-none">
            <DropdownMenu onOpenChange={handleDropdownChange}>
              <DropdownMenuTrigger className="relative flex align-center outline-none">
                {newNotifications.length !== 0 ? (
                  <div className="relative">
                    <MdNotificationsActive className="w-8 h-8 fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-[0.625rem] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary-red rounded-full">
                      {newNotifications.length}
                    </span>
                  </div>
                ) : (
                  <MdNotifications className="w-8 h-8 fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                alignOffset={50}
                className="bg-primary-black text-primary-white"
              >
                <DropdownMenuLabel className="font-bold text-center w-full">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filteredNotifications.length === 0 && (
                  <DropdownMenuLabel>No notifications...</DropdownMenuLabel>
                )}
                {filteredNotifications.map((notification: any) =>
                  notification.vote ? (
                    <>
                      <NotificationVote
                        notification={notification}
                        vote={notification.vote}
                        review={notification.review}
                      />
                      <DropdownMenuSeparator />
                    </>
                  ) : notification.professor ? (
                    <>
                      <NotificationProfessor
                        notification={notification}
                        professor={notification.professor}
                        review={notification.review}
                      />
                      <DropdownMenuSeparator />
                    </>
                  ) : (
                    notification.course && (
                      <>
                        <NotificationCourse
                          notification={notification}
                          review={notification.review}
                        />
                        <DropdownMenuSeparator />
                      </>
                    )
                  ),
                )}
                {filteredNotifications.length > 0 && (
                  <>
                    <div className="flex justify-center h-6">
                      <Button
                        className="bg-primary-red/90 py-0 h-6 w-full text-primary-white hover:bg-primary-red hover:shadow-primary-red hover:text-primary-white hover:font-bold transition duration-150 ease-out"
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
    )
  );
}
