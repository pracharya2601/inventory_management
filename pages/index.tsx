/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getSession } from 'next-auth/client';
import Input from '@/components/elements/Input';
import { socket } from '@socket/client';
import { appContext } from '@context/appcontext';
import { apiPOST } from '@/hooks/middleware/api';
import Button from '@/components/elements/Button';

const Home = () => {
    const {
        state: {
            user: { userdata },
        },
    } = useContext(appContext);


    return (
        <ComponentWrapper>
        </ComponentWrapper>
    );
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
