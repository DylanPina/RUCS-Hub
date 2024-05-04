"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../shadcn/ui/button";
import { resendEmailVerification } from "@/lib/actions/auth";
import { toast } from "react-toastify";

interface Props {
  user: any;
}

export default function ResendEmailVerificationButton({ user }: Props) {
  const [alreadyClicked, setAlreadyClicked] = useState(false);
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const difference =
      currentDate.getTime() - user.last_email_verification_sent;
    const minutes = Math.floor(difference / 60000);

    console.log(`User: ${JSON.stringify(user, null, 2)}`);
    console.log(
      `Last email verification sent: ${user.last_email_verification_sent}`,
    );
    console.log(`Current date: ${currentDate}`);
    console.log(`Difference: ${difference}`);
    console.log(`Minutes: ${minutes}`);

    if (minutes < 1) {
      setTimePassed(false);
      const timeout = setTimeout(
        () => {
          setTimePassed(true);
        },
        (1 - minutes) * 60000,
      );
      return () => clearTimeout(timeout);
    }
    setTimePassed(true);
  }, [user]);

  function handleClick() {
    resendEmailVerification(user.sub);
    setAlreadyClicked(true);
    setTimeout(() => setAlreadyClicked(false), 60000);
    toast.success(`Verification email has been sent to ${user.email}.`);
  }

  return (
    <Button
      disabled={!timePassed || alreadyClicked}
      className="transition-all duration-150 bg-primary-red hover:bg-primary-red/90 hover:shadow-primary-red/90"
      onClick={handleClick}
    >
      Resend Verification Email
    </Button>
  );
}
