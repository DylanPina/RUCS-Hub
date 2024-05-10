"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/api/auth/logout")}
      className="bg-primary-white text-primary-black hover:bg-primary-white hover:shadow-primary-white transition duration-150 ease-out"
    >
      Logout
    </Button>
  );
}
