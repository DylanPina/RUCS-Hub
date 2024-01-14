import React from "react";
import { Button } from "../shadcn/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";

export default function NavProfile() {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="rounded-full transition duration-150 ease-out hover:ease-in hover:scale-105"
    >
      <Link href="/login">
        <Avatar className="w-8 h-8 outline outline-2 shadow-sm shadow-primary-white/20 outline-primary-white max-sm:w-6 max-sm:h-6 max-sm:outline-1 transition duration-150 ease-out hover:ease-in hover:scale-110 hover:outline-primary-red">
          <AvatarImage
            className="max-sm:w-6 max-sm:h-6 cursor-pointer"
            src="https://github.com/shadcn.png"
          />
        </Avatar>
      </Link>
    </Button>
  );
}
