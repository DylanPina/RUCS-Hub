"use server";

import axios from "axios";
import { updateLastEmailVerification } from "../data/user";

/**
 * Gets an access token for Auth0
 */
export async function getAuth0Token() {
  const config = {
    method: "POST",
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    data: {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    },
  };

  const response = await axios(config);
  const { access_token } = response.data;
  return access_token;
}

/**
 * Resends an email verification
 *
 * @param user - The user
 */
export async function resendEmailVerification(user: any) {
  const { email, sub } = user;
  const token = await getAuth0Token();

  const verificationEmailConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/jobs/verification-email`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_id: sub,
      client_id: process.env.AUTH0_CLIENT_ID,
      identity: {
        user_id: sub.split("|")[1],
        provider: "auth0",
      },
    },
  };

  await axios.request(verificationEmailConfig);
  await updateLastEmailVerification(email);
}
