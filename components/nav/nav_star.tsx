import React from "react";
import { Button } from "../shadcn/ui/button";
import { IoIosStarOutline } from "react-icons/io";

export default function NavStar() {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="hover:bg-transparent"
    >
      <IoIosStarOutline
        className="fill-primary-white cursor-pointer hover:fill-yellow-300 transition duration-150 ease-out hover:ease-in hover:scale-105"
        size={32}
      />
    </Button>
  );
}
