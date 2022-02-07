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
import { socket } from 'socket/client';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import MetaTag from '@/components/layout/Meta/MetaTag';
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <MetaTag
                title="Inventory Management"
                description="Inventory Mangement Wholesale for Business and retail suppliers"
                currentURL="www.prakashacharya.com"
                previewImage="https://storage.googleapis.com/product-files-v1/1642204061214-inv-1.png"
            />
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
    const event = `remove-from-workspace-${userdata?.id}`;
    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
        });
        (async function myFunction() {
            const session: Session = await getSession();
            console.log('session', session);
            if (authenticated && userdata) {
                return;
            }
            if (session && session.user) {
                dispatch(action.checkAuthenticated({ authenticated: session ? true : false }));
                const user: UserData = await apiGET<UserData>(`/user/${session?.user?.id}`);
                dispatch(action.getUser({ userdata: user }));
            }
        })();
        socket.on(event, (workplaceId: string) => {
            if (userdata?.workplaces) {
                const newArr: WorkplaceTypes[] = [...userdata?.workplaces];
                const rowIndex = newArr.findIndex((item: WorkplaceTypes) => item.workplaceId === workplaceId);
                newArr.splice(rowIndex, 1);
                dispatch(
                    action.getUser({
                        userdata: {
                            ...userdata,
                            workplaces: newArr,
                        },
                    }),
                );
            }
        });
        return () => {
            dispatch(action.checkAuthenticated({ authenticated: false }));
            dispatch(action.getUser({ userdata: null }));
            dispatch(
                action.setVariant({
                    variant: {
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
