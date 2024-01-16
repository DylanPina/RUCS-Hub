"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import { signOut, useSession } from "next-auth/react";

export default function NavProfile() {
  const { data: session } = useSession();
  console.log(`useSession data: ${JSON.stringify(session, null, 2)}`);

  return (
    session &&
    session.user && (
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="rounded-full transition duration-150 ease-out hover:ease-in hover:scale-105"
        onClick={() => signOut()}
      >
        <Avatar className="w-8 h-8 outline outline-2 shadow-sm shadow-primary-white/20 outline-primary-white max-sm:w-6 max-sm:h-6 max-sm:outline-1 transition duration-150 ease-out hover:ease-in hover:scale-110 hover:outline-primary-red">
          <AvatarImage
            className="max-sm:w-6 max-sm:h-6 cursor-pointer"
            width={300}
            height={300}
            src={session.user?.image}
          />
        </Avatar>
      </Button>
    )
  );
}
