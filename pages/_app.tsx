import '../styles/globals.css';
import type { AppProps } from 'next/app';
import DataProvider from '@context/data';
import React from 'react';
import UiProvider from '@context/ui';
import UserProvider from '@context/user';
import ManageDataProvider from '@context/manage';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UiProvider>
            <UserProvider>
                <DataProvider>
                    <ManageDataProvider>
                        <Component {...pageProps} />
                    </ManageDataProvider>
                </DataProvider>
            </UserProvider>
        </UiProvider>
    );
}
export default MyApp;
