/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import { useRouter } from 'next/router';
import { useCreate } from '@/hooks/useCreate';
import ComponentLayout from '@/components/layout/ComponentLayout';
import SidebarBottomItems from '@/components/layout/sidebar/SidebarBottomItems';
import React from 'react';
import DropdownSideBar from '@/components/layout/sidebar/DropdownSidebar';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import { getBusiness } from 'ssr/getBusiness';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessInfo from '@/components/layout/company/BusinessInfo';
import { BusinessStaffPosition, CompanyNav } from '@/components/layout/company/CompanyHeading';

interface Props {
    company: any;
    authenticated: boolean;
    workplaces: any;
    user: any;
}

const CreateNew = ({ authenticated, company, workplaces }: Props) => {
    const router = useRouter();
    const { catagory, color, size, setCatagory, setColor, setSize } = useCreate();
    console.log(catagory, color, size);
    const routeChange = (url: string) => {
        router.push(url);
    };
    console.log(company);

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
            <Dashboard
                popItem={<div>Pop Item</div>}
                businessHeading={
                    <BusinessInfo
                        companyNav={<CompanyNav workplaceName={company.workplaceName} logoUrl={'/icon.png'} />}
                        staffPosition={<BusinessStaffPosition positionLabel={'Admin'} />}
                    />
                }
            >
                <span>Hello</span>
            </Dashboard>
        </ComponentLayout>
    );
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser, getBusiness);

export default CreateNew;
