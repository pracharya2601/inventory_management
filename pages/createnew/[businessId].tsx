/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import ComponentLayout from '@/components/layout/ComponentLayout';
import React, { useContext, useEffect } from 'react';
import { getBusiness } from 'ssr/getBusiness';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessInfo from '@/components/layout/company/BusinessInfo';
import { BusinessStaffPosition, CompanyNav } from '@/components/layout/company/CompanyHeading';
import { managecontext } from '@context/manage';
import BusinessHeader from '@/components/layout/BusinessHeader';
import { productcontext } from '@context/data';

interface Props {
    company: any;
    authenticated: boolean;
    workplaces: any;
    user: any;
}

const CreateNewItem = (props: Props) => {
    const { updateData, removeData } = useContext(managecontext);
    const { company } = useContext(productcontext);
    useEffect(() => {
        updateData(props);
        return () => removeData();
    }, []);

    console.log(company);
    return (
        <ComponentLayout authenticated={props.authenticated}>
            <Dashboard businessHeading={<BusinessHeader />}>
                <span>Hello</span>
            </Dashboard>
        </ComponentLayout>
    );
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser, getBusiness);

export default CreateNewItem;
