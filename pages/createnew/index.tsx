/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import { useRouter } from 'next/router';
import ComponentLayout from '@/components/layout/ComponentLayout';
import React, { useContext, useEffect } from 'react';
import { managecontext } from '@context/manage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/elements/Button';

interface Props {
    authenticated: boolean;
    workplaces: any;
    user: any;
}

const CreateNew = (props: Props) => {
    const router = useRouter();
    const { updateData, removeData } = useContext(managecontext);

    useEffect(() => {
        updateData(props);
        return () => removeData();
    }, []);
    return (
        <ComponentLayout authenticated={props.authenticated}>
            <>
                <div className="p-2 pt-12">
                    <div className="flex justify-center items-center p-10 h-36 bg-gray-100 dark:bg-gray-800">
                        <Button label="Create New Copany" />
                    </div>
                </div>
                <div className="p-2">
                    <div className="flex justify-center items-center p-10 h-36 bg-gray-100 dark:bg-gray-800">
                        <Button label="Join Company" color="green" />
                    </div>
                </div>
            </>
        </ComponentLayout>
    );
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser);

export default CreateNew;
