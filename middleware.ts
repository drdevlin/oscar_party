import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';

import type { NextRequest } from 'next/server';

if (!process.env.IRON_PRIVATE_KEY) throw new Error('Private key required.');

const sessionOptions = {
  cookieName: "oscar_party_token",
  password: process.env.IRON_PRIVATE_KEY,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  const isAuthorized = process.env.IRON_PUBLIC_KEY && session.token?.publicKey && session.token.publicKey === process.env.IRON_PUBLIC_KEY;
  if (!isAuthorized) {
	 return new NextResponse(
     JSON.stringify({ error: 'token authorization failed' }),
     { status: 401, headers: { 'content-type': 'application/json' } }
   );
  };
};

export const config = {
  // secure all api routes, except auth
  matcher: '/api/((?!auth).*)', 
};
