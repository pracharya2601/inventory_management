/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useRouter } from 'next/dist/client/router';
import ComponentLayout from '@/components/layout/ComponentLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BusinessHeader from '@/components/layout/BusinessHeader';
import React, { useContext, useEffect, useState } from 'react';
import ProductList from '@/components/layout/product/ProductList';
import ProductNavbar from '@/components/layout/product/ProductNavbar';
import { uicontext } from '@context/ui';
import { productcontext } from '@context/data';
import { usercontext } from '@context/user';
import SearchBar from '@/components/layout/searchbar';
import { GetServerSideProps } from 'next';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { connectDb } from 'ssr/connectDb';
import { withUser } from 'ssr/withUser';
import { getProduct } from 'ssr/getProduct';
import Workplaces from '@/components/layout/user/Workplaces';

interface Props {
    productList: any;
    company: any;
    authenticated: boolean;
    workplaces: any;
    user: any;
    productCatagory: any;
}

const Dashboard = ({ productList, company, authenticated, workplaces, user, productCatagory }: Props) => {
    const router = useRouter();
    const {
        isDataFetched,
        setProductList,
        setInitialData,
        setCompany,
        setAuthenticated,
        setProductCatagoryList,
        whichDataToFetched,
        viewingItem,
    } = useContext(productcontext);

    const { setUser, setWorkplaces } = useContext(usercontext);
    console.log(router);
    useEffect(() => {
        setUser(user);
        setWorkplaces(workplaces);
        setProductList(productList);
        setInitialData(productList);
        setCompany(company);
        setAuthenticated(authenticated);
        setProductCatagoryList(productCatagory);
    }, []);

    const { searchBar, searchTerm } = useContext(uicontext);

    const renderData = (
        <>
            {searchBar && <SearchBar />}
            <DashboardLayout
                businessHeading={<BusinessHeader />}
                productHeading={<ProductNavbar />}
                businessData={<ProductList key={new Date().toISOString() + searchTerm} />}
            ></DashboardLayout>
        </>
    );

    return <ComponentLayout authenticated={authenticated}>{renderData}</ComponentLayout>;
};
export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser, getProduct);

export default Dashboard;
