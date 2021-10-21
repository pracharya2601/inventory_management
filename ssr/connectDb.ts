import { connectToDB } from 'db/connect';

export const connectDb = async ({ session, ...rest }) => {
    if (session) {
        const { db } = await connectToDB();
        return {
            session,
            db,
            ...rest,
        };
    }
};
