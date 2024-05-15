import React from "react";
import { Avatar, AvatarImage } from "@/components/shadcn/ui/avatar";
import { Input } from "@/components/shadcn/ui/input";
import DeleteUserButton from "@/components/profile/delete-user-button";
import ResetPasswordButton from "@/components/profile/reset-password-button";
import { getSession } from "@auth0/nextjs-auth0";
import {
  getLastEmailVerification,
  getLastPasswordReset,
} from "@/lib/data/user";
import ResendEmailVerificationBadge from "@/components/auth/resend-email-verification-badge";

export default async function Page() {
  const session = await getSession();
  const lastEmailVerification = await getLastEmailVerification(
    session?.user.email,
  );
  const lastPasswordReset = await getLastPasswordReset(session?.user.email);

  return (
    <div className="flex flex-col space-y-4 place-items-center justify-center w-full">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-white">
        Profile
      </h1>
      <div className="flex flex-col items-center space-y-4 w-[325px] max-sm:max-w-full">
        <Avatar className="w-12 h-12 border-2 rounded-full overflow-hidden shadow-sm shadow-primary-white/20 border-primary-white">
          <AvatarImage
            width={300}
            height={300}
            src={session?.user.picture || ""}
            alt="Profile image"
          />
        </Avatar>
        <div className="flex flex-col space-y-1 w-full">
          <h1 className="text-md max-sm:text-sm font-semibold text-primary-white">
            Email
          </h1>
          <Input
            disabled
            value={session?.user.email || ""}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex place-content-between">
            <h1 className="text-md max-sm:text-sm font-semibold text-primary-white">
              Verification Status
            </h1>
            {!session?.user.email_verified && (
              <ResendEmailVerificationBadge
                user={session?.user}
                lastEmailVerification={lastEmailVerification}
              />
            )}
          </div>
          <Input
            disabled
            value={session?.user.email_verified ? "Verified" : "Unverified"}
            className="w-full"
          />
        </div>
        <div className="flex justify-center w-full items-center sm:space-x-4 max-sm:flex-col max-sm:space-y-4">
          <ResetPasswordButton
            user={session?.user}
            lastPasswordReset={lastPasswordReset}
          />
          <DeleteUserButton
            email={session?.user.email || ""}
            userAuthId={session?.user.sub || ""}
          />
        </div>
      </div>
    </div>
  );
}
