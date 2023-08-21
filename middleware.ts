import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { IronSessionOptions } from "iron-session";

/**
 * Copied the session options here since NextJS is importing
 * some IronSession package with crypto implementation when using
 * the `sessionOptions` in `@/providers/auth/iron-session-config.provider.ts`
 *
 * See: https://github.com/vvo/iron-session/issues/537#issuecomment-1232146132
 */
const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_COOKIE_PASSWORD as string,
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const session = await getIronSession(request, response, sessionOptions);
  const { user } = session;
  const currentUrlPath = new URL(request.url).pathname;

  if (currentUrlPath === '/' && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (currentUrlPath !== '/' && !user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
};

export const config = {
  matcher: [
    '/',
    '/api/internal/(.*)',
    '/dashboard'
  ],
};