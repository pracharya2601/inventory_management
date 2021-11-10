/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Session } from 'next-auth';
import { getUserById } from 'db/user';

export const withUser = async ({ session, db, ...rest }) => {
    if (session) {
        const user = JSON.parse(await getUserById(db, session.user.id));
        return {
            session,
            user,
            workplaces: user?.workplaces || [],
            db,
            ...rest,
        };
    }
};
