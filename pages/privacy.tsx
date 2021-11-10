/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import React, { useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import ComponentLayout from '@/components/layout/ComponentLayout';
import { managecontext } from '@context/manage';

interface Props {
    authenticated: boolean;
    workplaces: any;
    user: any;
}

const Privacy = (props) => {
    const router = useRouter();
    const { updateData, removeData } = useContext(managecontext);

    useEffect(() => {
        updateData(props);
        return () => removeData();
    }, []);
    return <ComponentLayout authenticated={props.authenticated}></ComponentLayout>;
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser);
export default Privacy;
