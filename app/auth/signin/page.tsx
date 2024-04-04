"use client";

import React from "react";
import SignInGoogleButton from "@/components/auth/sign_in_google_button";

export default function Page() {
  return (
    <div className="flex flex-col place-items-center justify-center space-y-8">
      <div className="flex flex-col space-y-2 place-items-center justify-center">
        <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-white">
          Sign in
        </h1>
        <h4 className="max-w-4xl text-sm max-sm:text-xs font-semibold text-center text-primary-white">
          Sign in with your{" "}
          <span className="underline">
            <span className="font-bold text-primary-red">Rutgers</span>{" "}
            affilated Google account
          </span>{" "}
          to add and upvote reviews.
          <br className="max-md:hidden" />
          <span className="md:hidden"> </span>
          This is to ensure only students can add reviews.{" "}
          <span className="underline">Your identity will not be shared.</span>
        </h4>
      </div>
      <SignInGoogleButton />
    </div>
  );
}
