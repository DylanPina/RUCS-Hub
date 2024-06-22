"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { user } = useUser();
  const router = useRouter();

  return (
    !user && (
      <Button
        variant="outline"
        className={
          "bg-transparent text-primary-white hover:bg-primary-red/50 max-sm:text-xs max-sm:px-2 max-sm:py-1 hover:text-primary-white transition duration-150 ease-out hover:ease-in"
        }
        onClick={() => router.push("/api/auth/login")}
      >
        Sign in
      </Button>
    )
  );
}
