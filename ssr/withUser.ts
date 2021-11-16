/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Session } from 'next-auth';
import { getUserById } from 'db/user';

export const withUser = async ({ session, db, ...rest }) => {
    if (session) {
        const user = JSON.parse(await getUserById(db, session.user.id));
        const productCatagory = [
            { label: 'Inventory', id: 'inventory' },
            { label: 'Stock', id: 'stock' },
            { label: 'Processing', id: 'processing' },
            { label: 'Delivered', id: 'delivered' },
        ];
        return {
            session,
            user,
            workplaces: user?.workplaces || [],
            productCatagory,
            db,
            ...rest,
        };
    }
};
