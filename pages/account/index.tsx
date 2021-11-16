/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import React from 'react';
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
}

const Account = ({ authenticated, workplaces, user }: Props) => {
    useFirstRender(
        action.checkAuthenticated({ authenticated }),
        action.getUser({ userdata: user }),
        action.getUserWorkplaces({ workplaces }),
    );
    return <ComponentWrapper></ComponentWrapper>;
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser);
export default Account;
