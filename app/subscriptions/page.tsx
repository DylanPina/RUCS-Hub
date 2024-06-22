import SubscriptionTable from "@/components/Subscription/SubscriptionTable";
import { getSubscriptionCards } from "@/lib/actions/subscription";
import { hashEmailAddress } from "@/lib/utils";
import { getSession } from "@auth0/nextjs-auth0";
import React from "react";

export default async function Page() {
  const session = await getSession();
  const subscriptions = await getSubscriptionCards(
    hashEmailAddress(session?.user.email),
  );

  return (
    <div className="flex flex-col space-y-4 w-full place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl text-primary-white font-bold">
        Manage Subscriptions
      </h1>
      <SubscriptionTable user={session?.user} subscriptions={subscriptions} />
    </div>
  );
}
