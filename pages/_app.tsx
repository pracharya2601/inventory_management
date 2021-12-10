/* eslint-disable @typescript-eslint/no-unused-vars */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useContext, useEffect, useState } from 'react';
import AppProvider from '@context/AppProvider';
import { getSession, session } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { apiGET } from '@/hooks/middleware/api';
import { appContext } from '@context/appcontext';
import { action } from '@context/action';
import { UserData, UserSession } from '@/interface/AuthSession';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <Wrapper>
                <Component {...pageProps} />
            </Wrapper>
        </AppProvider>
    );
}

const Wrapper = ({ children }) => {
    const router = useRouter();
    const {
        state: {
            user: { userdata, authenticated },
        },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        (async function myFunction() {
            const session: Session = await getSession();
            if (!session) {
                router.push('/signin');
            }
            if (authenticated && userdata) {
                return;
            }
            if (session && session.user) {
                dispatch(action.checkAuthenticated({ authenticated: session ? true : false }));
                const user: UserData = await apiGET<UserData>(`/user/${session?.user?.id}`);
                dispatch(action.getUser({ userdata: user }));
            }
        })();
        return () => {
            dispatch(action.checkAuthenticated({ authenticated: false }));
            dispatch(action.getUser({ userdata: null }));
            dispatch(
                action.setVariant({
                    variant: {
                        _id: '',
                        colorVariants: [],
                        sizeVariants: [],
                    },
                }),
            );
        };
    }, []);

    return children;
};

export default MyApp;
