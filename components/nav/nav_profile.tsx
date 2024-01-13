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
        <Avatar className="max-sm:w-7 max-sm:h-7 ">
          <AvatarImage
            className="max-sm:w-7 max-sm:h-7 cursor-pointer"
            src="https://github.com/shadcn.png"
          />
        </Avatar>
      </Link>
    </Button>
  );
}
