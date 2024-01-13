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
      <IoIosNotificationsOutline
        className="fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in hover:scale-105"
        size={32}
      />
    </Button>
  );
}
