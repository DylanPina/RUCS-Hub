"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function SignInGoogleButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/api/auth/login")}
      className="flex items-center rounded overflow-hidden border focus:border-2 focus:border-primary-red text-zinc-500 font-normal transition-all duration-150 ease-out hover:ease-in border-primary-white hover:outline-primary-red hover:shadow-primary-red"
    >
      <span className="text-3xl font-black text-primary-red bg-primary-white px-2 py-1">
        R
      </span>
      <span className="text-md font-bold text-primary-white px-3">Sign in</span>
    </button>
  );
}
