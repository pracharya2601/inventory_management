/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { Session } from 'next-auth';
import { getUserById } from 'db/user';
import { connectToDB } from 'db/connect';
import { useRouter } from 'next/dist/client/router';
import ComponentLayout from '@/components/layout/ComponentLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BusinessHeader from '@/components/layout/BusinessHeader';
import { getOneWorkPlace } from 'db/workplace';
import { StaffType } from '@/interface/Workplace/StaffType';
import datas from '../../db.json';
import { ProductType } from '@/interface/Product/ProductInterface';
import ProductRow from '@/components/layout/product/ProductRow';
import { datacontext } from '@context/data/datacontext';
import React, { useContext, useState } from 'react';
import Pagination from '@/components/layout/Pagination';
import { useDashboard } from '@/hooks/useDashboard';
import ProductList from '@/components/layout/product/ProductList';
import SidebarBottomItems from '@/components/layout/sidebar/SidebarBottomItems';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import DropdownSideBar from '@/components/layout/sidebar/DropdownSidebar';
import ProductNavbar from '@/components/layout/product/ProductNavbar';
import ProductCatagoryButton from '@/components/layout/product/ProductCatagoryNav';
import Input from '@/components/elements/Input';
import { uicontext } from '@context/ui';
import Button from '@/components/elements/Button';
import SearchBar from '@/components/layout/searchbar';

interface Props {
    productList: any;
    company: any;
    authenticated: boolean;
    workplaces: any;
    user: any;
}

const Dashboard = ({ productList, company, authenticated, workplaces, user }: Props) => {
    const router = useRouter();
    const { searchBar } = useContext(uicontext);
    //const { position, isDataFetched, page, companyId, dataType, routeChange } = useDashboard()
    const [companyDetail, setCompany] = useState(company);

    const id = router.query.id as string[];
    const companyId = id && id[0];
    const position = id && id[1];
    const dataType = id && id[2];
    const page = (id && id[3]) || 1;
    const isDataFetched = companyId && position && dataType && page;
    const productCatagory = (catagoryName: string): string => {
        return `http://localhost:3000/dashboard/${companyId}/${position}/${catagoryName}/1`;
    };

    const routeChange = (url: string) => {
        router.push(url);
    };

    const renderData = isDataFetched && (
        <>
            {searchBar && <SearchBar />}
            <DashboardLayout
                businessHeading={<BusinessHeader position={position} company={company} />}
                productHeading={
                    <ProductNavbar>
                        <ProductCatagoryButton
                            active={dataType === 'inventory'}
                            label="Inventory"
                            url={productCatagory('inventory')}
                        />
                        <ProductCatagoryButton
                            active={dataType === 'instock'}
                            label="In_Stock"
                            url={productCatagory('instock')}
                        />
                        <ProductCatagoryButton
                            active={dataType === 'processing'}
                            label="Processing"
                            url={productCatagory('processing')}
                        />
                        <ProductCatagoryButton
                            active={dataType === 'delevered'}
                            label="Delevered"
                            url={productCatagory('delevered')}
                        />
                    </ProductNavbar>
                }
                businessData={<ProductList key={page} productList={productList} />}
                pagination={
                    <Pagination
                        active={page}
                        routeChange={routeChange}
                        workplaceId={companyId}
                        positionLabel={position}
                    />
                }
                // eslint-disable-next-line react/no-children-prop
                children={undefined}
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
                                    onClick={() => routeChange(`/dashboard/${workplaceId}/${positionLabel}/product/1`)}
                                    label={workplaceName}
                                />
                            ))}
                        <SidebarItem onClick={() => router.push('/dashboard/newitem')} label="New Places" />
                    </DropdownSideBar>
                    <SidebarItem onClick={() => router.push('/dashboard/newitem')} label="New Places" />
                </>
            }
            sidebarItemsBottom={
                <SidebarBottomItems>
                    <SidebarItem
                        onClick={() => router.push('/privacy')}
                        label="Extra You can add here you know"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        }
                    />
                </SidebarBottomItems>
            }
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
    if (context.query.id) {
        const userId = session.user.id;
        const workPlaceId = context.query.id[0];
        const staffPosition = context.query.id[1];
        const productType = context.query.id[2];
        const page = parseInt(context.query.id[3]);
        const compdata = JSON.parse(await getOneWorkPlace(db, workPlaceId, staffPosition, userId));
        company = compdata ? compdata[0] : null;
        productList = datas;
    }
    console.log(productList);
    return {
        props: {
            authenticated: session.user ? true : false,
            user: session.user,
            workplaces: workplaces ? workplaces : null,
            productList,
            company,
        },
    };
}

export default Dashboard;
