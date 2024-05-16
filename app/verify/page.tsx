import ResendEmailVerificationButton from "@/components/auth/resend_email_verification_button";
import { getLastEmailVerification } from "@/lib/data/user";
import { getSession } from "@auth0/nextjs-auth0";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Verify",
};

export default async function Page() {
  const session = await getSession();

  if (!session || session.user.email_verified) {
    redirect("/");
  }

  const lastEmailVerification = await getLastEmailVerification(
    session?.user.email,
  );

  return (
    <div className="flex flex-col space-y-4 place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-red">
        Verify Email Address
      </h1>
      <h4 className="max-w-4xl text-md max-sm:text-sm font-semibold text-center text-primary-white">
        You must verify your email address to add and vote reviews. An email has
        been sent to your email address at{" "}
        <span className="underline">{session.user.email}</span> with a
        verification link. If you have not recieved an email verification, click
        the button below to resend the verification email.
      </h4>
      <ResendEmailVerificationButton
        user={session.user}
        lastEmailVerification={lastEmailVerification}
      />
    </div>
  );
}
