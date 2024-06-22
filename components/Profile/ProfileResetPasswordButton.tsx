"use client";

import React, { useEffect, useState } from "react";
import { LoaderButton } from "../shadcn/ui/loader-button";
import { toast } from "react-toastify";
import { resetPassword } from "@/lib/actions/user";

interface Props {
  user: any;
  lastPasswordReset: any;
}

export default function ProfileResetPasswordButton({
  user,
  lastPasswordReset,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [alreadyClicked, setAlreadyClicked] = useState(false);
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const difference = currentDate.getTime() - lastPasswordReset.getTime();
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
  }, [user, lastPasswordReset]);

  function handleResetPassword() {
    setLoading(true);
    resetPassword(user.email);
    toast.info("Check your email for a link to reset your password.");
    setLoading(false);
    setAlreadyClicked(true);
  }

  return (
    <LoaderButton
      className="bg-primary-white text-primary-black hover:bg-primary-white hover:shadow-primary-white transition duration-150 ease-out"
      disabled={!timePassed || alreadyClicked}
      isLoading={loading}
      onClick={handleResetPassword}
    >
      Reset Password
    </LoaderButton>
  );
}
