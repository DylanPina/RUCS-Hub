import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { hashEmailAddress } from "@/lib/utils";
import {
  createCourseSubscription,
  deleteCourseSubscription,
  isUserSubscribedToCourse,
} from "@/lib/actions/subscription";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { MdNotificationAdd, MdNotificationsOff } from "react-icons/md";

interface Props {
  course: any;
}

export default function NotificationButtonCourse({ course }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const userId = hashEmailAddress(user?.email ?? "");
      const subscribed = await isUserSubscribedToCourse(
        userId,
        course.subjectCode,
        course.code,
      );
      setIsSubscribed(!!subscribed);
    };

    if (user) checkSubscription();
  }, [user, course]);

  function handleTurnOffNotifications() {
    const userId = hashEmailAddress(user?.email ?? "");
    deleteCourseSubscription(userId, course.subjectCode, course.code);
    setIsSubscribed(false);
    router.refresh();
    toast.success(`Unsubscribed from ${course.code} - ${course.name}`);
  }

  function handleTurnOnNotifications() {
    const userId = hashEmailAddress(user?.email ?? "");
    createCourseSubscription(userId, course.subjectCode, course.code);
    setIsSubscribed(true);
    router.refresh();
    toast.success(`Subscribed to ${course.code} - ${course.name}`);
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
