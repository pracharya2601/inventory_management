import { getSession } from 'next-auth/client';
import { Session } from 'next-auth';

export const withSession = async (context) => {
  const resolvedUrl = context.resolvedUrl;
  const query = context.query;
  const session: Session = await getSession(context);
  const { res } = context;
  if (!session || !session.user) {
    res.writeHead(302, { Location: `/signin?callbackUrl=${resolvedUrl}` });
    res.end();
  }
  return {
    session,
    query,
  };
};
