/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { useFirstRender } from '@/hooks/useFirstRender';
import { action } from '@context/action';

interface Props {
    authenticated: boolean;
    workplaces: any;
    user: any;
    productCatagory: any[];
}

const Home = ({ authenticated, workplaces, user, productCatagory }: Props) => {
    useFirstRender(
        action.checkAuthenticated({ authenticated }),
        action.getUser({ userdata: user }),
        action.getUserWorkplaces({ workplaces }),
        action.getProductCatagory({ productCatagory }),
    );

    const a = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/workplaces/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { data } = await res.json();
        console.log(data);
    };

    return <ComponentWrapper></ComponentWrapper>;
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser);
export default Home;
