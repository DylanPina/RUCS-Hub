"use client";

import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import {
  createProfessorSubscription,
  deleteProfessorSubscription,
  isUserSubscribedToProfessor,
} from "@/lib/actions/subscription";
import { formatProfessorName, hashEmailAddress } from "@/lib/utils";
import { Professor } from "@prisma/client";
import { toast } from "react-toastify";
import { MdNotificationAdd, MdNotificationsOff } from "react-icons/md";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

interface Props {
  professor: Professor;
}

export default function NotificationButtonProfessor({ professor }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const userId = hashEmailAddress(user?.email ?? "");
      const subscribed = await isUserSubscribedToProfessor(
        userId,
        professor.id,
      );
      setIsSubscribed(!!subscribed);
    };

    if (user) checkSubscription();
  }, [user, professor]);

  function handleTurnOffNotifications() {
    const userId = hashEmailAddress(user?.email ?? "");
    deleteProfessorSubscription(userId, professor.id);
    setIsSubscribed(false);
    router.refresh();
    toast.success(
      `Unsubscribed from ${formatProfessorName(
        professor.lastName,
        professor.firstName,
      )}`,
    );
  }

  function handleTurnOnNotifications() {
    const userId = hashEmailAddress(user?.email ?? "");
    createProfessorSubscription(userId, professor.id);
    setIsSubscribed(true);
    router.refresh();
    toast.success(
      `Subscribed to ${formatProfessorName(
        professor.lastName,
        professor.firstName,
      )}`,
    );
  }

  if (!user || !user.email_verified) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <MdNotificationAdd
              size={20}
              onClick={() => {
                toast.error("Must be verified to turn on notifications");
              }}
              className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-primary-red">
            Turn on notifications
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        {isSubscribed ? (
          <>
            <TooltipTrigger>
              <MdNotificationsOff
                onClick={handleTurnOffNotifications}
                size={20}
                className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red">
              Turn off notifications
            </TooltipContent>
          </>
        ) : (
          <>
            <TooltipTrigger>
              <MdNotificationAdd
                onClick={handleTurnOnNotifications}
                size={20}
                className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary-red" side="right">
              Turn on notifications
            </TooltipContent>
          </>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
