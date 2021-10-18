/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSession } from 'next-auth/client';
import { Session } from 'next-auth';
import { getUserById } from 'db/user';
import { connectToDB } from 'db/connect';
import { useRouter } from 'next/dist/client/router';
import ComponentLayout from '@/components/layout/ComponentLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BusinessHeader from '@/components/layout/BusinessHeader';
import { getOneWorkPlace } from 'db/workplace';
import datas from '../../db.json';
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

interface Props {
    productList: any;
    company: any;
    authenticated: boolean;
    workplaces: any;
    user: any;
    productCatagory: any;
}

const Dashboards = ({ productList, company, authenticated, workplaces, user, productCatagory }: Props) => {
    const router = useRouter();
    const {
        isDataFetched,
        setProductList,
        setInitialData,
        setCompany,
        setAuthenticated,
        setProductCatagoryList,
        whichDataToFetched,
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
                    <DropdownSideBar label="Work Places">
                        {workplaces &&
                            workplaces.map(({ positionLabel, workplaceId, workplaceName }) => (
                                <SidebarItem
                                    key={workplaceId - workplaceName}
                                    onClick={() => routeChange(`/dashboards/${workplaceId}/${positionLabel}/product/1`)}
                                    label={workplaceName}
                                />
                            ))}
                        <SidebarItem onClick={() => router.push('/dashboards/newitem')} label="New Places" />
                    </DropdownSideBar>
                    <SidebarItem onClick={() => router.push('/dashboards/newitem')} label="New Places" />
                </>
            }
            sidebarItemsBottom={<SidebarBottomItems></SidebarBottomItems>}
        >
            {renderData}
        </ComponentLayout>
    );
};

export async function getServerSideProps(context) {
    const session: Session = await getSession(context);
    if (!session || !session.user) {
        return {
            redirect: {
                permanent: false,
                destination: `/signin?callbackUrl=/dashboard`,
            },
        };
    }
    const { db } = await connectToDB();
    const user = JSON.parse(await getUserById(db, session.user.id));
    const workplaces = user.workplaces || null;
    let productList = [];
    let company = null;
    let productCatagory = [];
    if (context.query.id) {
        const userId = session.user.id;
        const workPlaceId = context.query.id[0];
        const staffPosition = context.query.id[1];
        const productType = context.query.id[2];
        const page = parseInt(context.query.id[3]);
        const compdata = JSON.parse(await getOneWorkPlace(db, workPlaceId, staffPosition, userId));
        company = compdata ? compdata[0] : null;
        productList = datas;
        productCatagory = [
            { label: 'Inventory', id: 'inventory' },
            { label: 'Stock', id: 'stock' },
            { label: 'Processing', id: 'processing' },
            { label: 'Delivered', id: 'delivered' },
        ];
    }
    console.log('rendering .............');
    return {
        props: {
            authenticated: session.user ? true : false,
            user: session.user,
            workplaces: workplaces ? workplaces : null,
            productList,
            company,
            productCatagory,
        },
    };
}

export default Dashboards;
