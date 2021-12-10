/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import React, { useEffect } from 'react';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getSession } from 'next-auth/client';

const Home = () => {
    return <ComponentWrapper></ComponentWrapper>;
};

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session || !session.user) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        };
    }
    return { props: { callbackUrl: context.query.callbackUrl || '' } };
}
export default Home;
