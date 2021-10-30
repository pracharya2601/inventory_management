/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useRouter } from 'next/dist/client/router';
import ComponentLayout from '@/components/layout/ComponentLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BusinessHeader from '@/components/layout/BusinessHeader';
import React, { useContext, useEffect, useState } from 'react';
import ProductList from '@/components/layout/product/ProductList';
import SidebarBottomItems from '@/components/layout/sidebar/SidebarBottomItems';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import DropdownSideBar from '@/components/layout/sidebar/DropdownSidebar';
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

    const routeChange = (url: string) => {
        router.push(url);
    };
    console.log('This is item', viewingItem);
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

    return (
        <ComponentLayout
            authenticated={authenticated}
            sidebarItems={
                <>
                    {/* <DropdownSideBar label="Work Places">
                        {workplaces &&
                            workplaces.map(({ positionLabel, workplaceId, workplaceName }) => (
                                <SidebarItem
                                    key={workplaceId - workplaceName}
                                    onClick={() => routeChange(`/dashboard/${workplaceId}/${positionLabel}/product/1`)}
                                    label={workplaceName}
                                />
                            ))}
                        <SidebarItem onClick={() => router.push('/dashboard/newitem')} label="New Places" />
                    </DropdownSideBar> */}
                    {workplaces && (
                        <DropdownSideBar label="Workplaces" openStat={true}>
                            <Workplaces />
                        </DropdownSideBar>
                    )}

                    <SidebarItem onClick={() => router.push('/dashboard/newitem')} label="New Places" />
                </>
            }
            sidebarItemsBottom={<SidebarBottomItems></SidebarBottomItems>}
        >
            {renderData}
        </ComponentLayout>
    );
};
export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser, getProduct);

export default Dashboard;
