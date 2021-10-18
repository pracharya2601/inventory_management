import '../styles/globals.css';
import type { AppProps } from 'next/app';
import DataProvider from '@context/data';
import React from 'react';
import UiProvider from '@context/ui';
import UserProvider from '@context/user';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UiProvider>
            <UserProvider>
                <DataProvider>
                    <Component {...pageProps} />
                </DataProvider>
            </UserProvider>
        </UiProvider>
    );
}
export default MyApp;
