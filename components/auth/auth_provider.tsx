"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  return <UserProvider>{children}</UserProvider>;
};
