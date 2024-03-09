import { hashEmailAddress } from "../utils";

export const mockVotes = [
  {
    userId: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    reviewId: 1,
    upvote: true,
  },
  {
    userId: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    reviewId: 2,
    upvote: false,
  },
  {
    userId: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    reviewId: 3,
    upvote: true,
  },
];
