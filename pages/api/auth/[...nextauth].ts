/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDB } from 'db/connect';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { ObjectId } from 'mongodb';

export default (req, res) =>
    NextAuth(req, res, {
        session: {
            jwt: true,
        },
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        providers: [
            Providers.Email({
                server: {
                    host: process.env.EMAIL_SMTP_HOST,
                    port: Number(process.env.EMAIL_SMTP_PORT),
                    auth: {
                        user: process.env.EMAIL_SMTP_USER,
                        pass: process.env.EMAIL_SMTP_PASSWORD,
                    },
                },
                from: process.env.EMAIL_SMTP_FROM,
            }),
            Providers.Google({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                authorizationUrl:
                    'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            }),
            Providers.Facebook({
                clientId: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            }),
        ],
        database: process.env.DATABASE_URL,
        pages: {
            signIn: '/signin',
            error: '/auth/signinerror',
            newUser: '/auth/newUser?type=new',
            verifyRequest: '/auth/verifyRequest',
        },
        callbacks: {
            async session(session: any, user) {
                session.user.id = user.id;
                return session;
            },
            async jwt(tokenPayload, user, account, profile, isNewUser) {
                const { db } = await connectToDB();
                if (isNewUser) {
                    await db.collection('userworkplaces').insertOne({
                        _id: ObjectId(user.id),
                        workplacesIds: [],
                    });
                }
                if (tokenPayload && user) {
                    return { ...tokenPayload, id: `${user.id}` };
                }

                return tokenPayload;
            },
            async signIn(user, account, profile) {
                // if (account.provider === "google") {
                //     return profile.email_verified && profile.email.endsWith("@example.com")
                // }
                return true;
            },
        },
    });
