import { User } from "@prisma/client";
import { hashEmailAddress } from "../utils";

export const mockUsers: User[] = [
  {
    id: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    createdAt: new Date(),
    lastEmailVerification: new Date(),
    lastPasswordReset: new Date(),
  },
];
