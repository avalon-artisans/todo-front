import type { IronSessionOptions } from 'iron-session';
import type { UserSession } from '@/types/auth';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

/**
 * Session Options for Iron session
 */
export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_COOKIE_PASSWORD as string,
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserSession;
  }
}