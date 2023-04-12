import { withIronSessionApiRoute } from "iron-session/next";

import type { NextApiHandler } from "next";

declare module "iron-session" {
  export interface IronSessionData {
	  token?: {
	    publicKey: string;
	  };
  }
}

if (!process.env.IRON_PRIVATE_KEY) throw new Error('Private key required.');

const sessionOptions = {
  cookieName: "oscar_party_token",
  password: process.env.IRON_PRIVATE_KEY,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const withSession = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, sessionOptions);
}
