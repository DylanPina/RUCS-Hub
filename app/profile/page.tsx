import React from "react";
import { Avatar, AvatarImage } from "@/components/shadcn/ui/avatar";
import { Input } from "@/components/shadcn/ui/input";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Separator } from "@/components/shadcn/ui/separator";
import DeleteUserButtion from "@/components/profile/delete-user-button";
import ResetPasswordButton from "@/components/profile/reset-password-button";
import { getSession } from "@auth0/nextjs-auth0";
import LogoutButton from "@/components/profile/logout-button";
import {
  getLastEmailVerification,
  getLastPasswordReset,
} from "@/lib/data/user";

export default async function Page() {
  const session = await getSession();
  const lastEmailVerification = await getLastEmailVerification(
    session?.user.email,
  );
  const lastPasswordReset = await getLastPasswordReset(session?.user.email);

  return (
    <div className="flex flex-col space-y-4 place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-white">
        Profile
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-16 h-16 outline outline-2 shadow-sm shadow-primary-white/20 outline-primary-white max-sm:w-6 max-sm:h-6 max-sm:outline-1">
          <AvatarImage
            className="max-sm:w-6 max-sm:h-6"
            width={300}
            height={300}
            src={session?.user.picture || ""}
            alt="Profile image"
          />
        </Avatar>
        <div className="flex flex-col space-y-1 w-[500px]">
          <h1 className="text-lg font-semibold text-primary-white">Email</h1>
          <Input
            disabled
            value={session?.user.email || ""}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-1 w-[500px]">
          <div className="flex place-content-between">
            <h1 className="text-lg font-semibold text-primary-white">
              Verification Status
            </h1>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger className="focus:outline-none">
                  <Badge className="cursor-pointer bg-primary-red hover:bg-primary-red hover:text-primary-white transition duration-150 ease-out hover:ease-in hover:shadow-primary-red">
                    Resend
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-primary-red">
                  Resend Email Verification
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            disabled
            value={session?.user.email_verified ? "Verified" : "Unverified"}
            className="w-full"
          />
        </div>
        <div className="flex space-x-4 w-[500px] h-8 justify-center place-items-center !mt-8">
          <LogoutButton />
          <Separator orientation="vertical" />
          <ResetPasswordButton
            user={session?.user}
            lastPasswordReset={lastPasswordReset}
          />
          <Separator orientation="vertical" />
          <DeleteUserButtion
            email={session?.user.email || ""}
            userAuthId={session?.user.sub || ""}
          />
        </div>
      </div>
    </div>
  );
}
