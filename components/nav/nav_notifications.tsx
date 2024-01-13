import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Button } from "../shadcn/ui/button";

export default function NavNotification() {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="hover:bg-transparent"
    >
      <IoIosNotificationsOutline className="w-10 h-10 max-sm:w-7 max-sm:h-7 fill-primary-white !text-sm cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in hover:scale-105" />
    </Button>
  );
}
