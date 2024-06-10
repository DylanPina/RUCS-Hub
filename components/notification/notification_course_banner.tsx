"use client";

import {
  createCourseSubscription,
  deleteCourseSubscription,
  isUserSubscribedToCourse,
} from "@/lib/actions/subscription";
import { hashEmailAddress } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { MdNotificationAdd, MdNotificationsOff } from "react-icons/md";
import { toast } from "react-toastify";

interface Props {
  coursePage: any;
  user: any;
}

export default function NotificationCourseBanner({ coursePage, user }: Props) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function checkSubscription() {
      const isSubscribed = await isUserSubscribedToCourse(
        hashEmailAddress(user.email),
        coursePage.courseCode,
      );
      setSubscribed(isSubscribed != null);
    }
    checkSubscription();
  }, [user.email, coursePage.courseCode]);

  const subscribe = () => {
    createCourseSubscription(
      hashEmailAddress(user.email),
      coursePage.courseCode,
    );
    setSubscribed(true);
    toast.success(`Notifications turned on for ${coursePage.courseName}`);
  };

  const unsubscribe = () => {
    deleteCourseSubscription(
      hashEmailAddress(user.email),
      coursePage.courseCode,
    );
    setSubscribed(false);
    toast.success(`Notifications turned off for ${coursePage.courseName}`);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        {subscribed ? (
          <>
            <TooltipTrigger>
              <MdNotificationsOff
                onClick={unsubscribe}
                className="absolute right-0 top-0 h-6 w-6"
              />
            </TooltipTrigger>
            <TooltipContent className="outline outline-1 outline-primary-white">
              Turn off notifications
            </TooltipContent>
          </>
        ) : (
          <>
            <TooltipTrigger>
              <MdNotificationAdd
                onClick={subscribe}
                className="absolute right-0 top-0 h-6 w-6"
              />
            </TooltipTrigger>
            <TooltipContent>Turn on notifications</TooltipContent>
          </>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
