"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    !session && (
      <Button
        variant="outline"
        className={
          "bg-transparent text-primary-white hover:bg-primary-red/50 max-sm:text-xs max-sm:px-2 max-sm:py-1 hover:text-primary-white transition duration-150 ease-out hover:ease-in"
        }
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    )
  );
}
