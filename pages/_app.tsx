import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import AppProvider from '@context/AppProvider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <Component {...pageProps} />
        </AppProvider>
    );
}
export default MyApp;
