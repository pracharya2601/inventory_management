/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import React from 'react';
import { getBusiness } from 'ssr/getBusiness';
import Dashboard from '@/components/layout/company/Dashboard';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { useFirstRender } from '@/hooks/useFirstRender';
import BusinessInfo from '@/components/layout/company/BusinessInfo';
import { BusinessStaffPosition, CompanyNav } from '@/components/layout/company/CompanyHeading';
import { action } from '@context/action';

interface Props {
    company: any;
    authenticated: boolean;
    workplaces: any;
    user: any;
    productCatagory: any[];
}

const CreateNewItem = ({ authenticated, workplaces, user, company, productCatagory }: Props) => {
    useFirstRender(
        action.checkAuthenticated({ authenticated }),
        action.getUser({ userdata: user }),
        action.getUserWorkplaces({ workplaces }),
        action.getCompanyData({ companydata: company }),
        action.getProductCatagory({ productCatagory }),
    );

    return (
        <ComponentWrapper>
            <Dashboard
                businessHeading={<BusinessInfo companyNav={<CompanyNav />} staffPosition={<BusinessStaffPosition />} />}
            >
                <span>Hello</span>
            </Dashboard>
        </ComponentWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser, getBusiness);

export default CreateNewItem;
