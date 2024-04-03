"use client";

import React from "react";
import { signIn } from "next-auth/react";

export default function SignInGoogleButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center rounded border focus:border-2 focus:border-primary-red text-zinc-500 font-normal transition-all duration-150 ease-out hover:ease-in outline outline-1 outline-primary-white hover:outline-primary-red hover:shadow-primary-red"
    >
      <span className="text-3xl font-black text-primary-red bg-primary-white px-2 py-1">
        R
      </span>
      <span className="text-md font-bold text-primary-white px-3">Sign in</span>
    </button>
  );
}
