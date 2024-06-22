"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../shadcn/ui/button";
import { resendEmailVerification } from "@/lib/actions/auth";
import { toast } from "react-toastify";

interface Props {
  user: any;
  lastEmailVerification: any;
}

export default function ResendEmailVerificationButton({
  user,
  lastEmailVerification,
}: Props) {
  const [alreadyClicked, setAlreadyClicked] = useState(false);
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const difference = currentDate.getTime() - lastEmailVerification.getTime();
    const minutes = Math.floor(difference / 60000);

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
  }, [user, lastEmailVerification]);

  function handleClick() {
    resendEmailVerification(user);
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
