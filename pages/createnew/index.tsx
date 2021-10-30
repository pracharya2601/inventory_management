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
import { route } from 'next/dist/next-server/server/router';

interface Props {
    authenticated: boolean;
    workplaces: any;
    user: any;
}

const CreateNew = ({ authenticated, workplaces, user }: Props) => {
    const router = useRouter();
    const routeChange = (url: string) => {
        router.push(url);
    };
    console.log(router);
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
            sidebarItemsBottom={<SidebarBottomItems></SidebarBottomItems>}
        ></ComponentLayout>
    );
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser);

export default CreateNew;
