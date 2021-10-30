/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState, useRef } from 'react';
import { getSession, useSession, signOut } from 'next-auth/client';
import { Session } from 'next-auth';
import { getUserById } from 'db/user';
import { connectToDB } from 'db/connect';
import firebase from 'db/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import ComponentLayout from '@/components/layout/ComponentLayout';
import DropdownSideBar from '@/components/layout/sidebar/DropdownSidebar';
import { SidebarItem } from '@/components/layout/sidebar/SidebarItem';
import SidebarBottomItems from '@/components/layout/sidebar/SidebarBottomItems';

interface Props {
    authenticated: boolean;
    workplaces: any;
    user: any;
}

const Home = ({ authenticated, workplaces, user }: Props) => {
    const [workplace, setWorkplaces] = useState(workplaces);
    const [newBody] = useState({ id: 'aslkdjklsjdfklsjdkfjs', name: 'New Store' });
    const [value, loading, error] = useDocument(firebase.firestore().doc('workplaces/61325b3296e4eb481c819011'), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });
    const router = useRouter();
    // eslint-disable-next-line react/prop-types
    const checkRef = useRef(true);
    useEffect(() => {
        if (checkRef.current && value) {
            checkRef.current = false;
            return;
        }
        if (checkRef.current) {
            return;
        }
        updateData(`61325b3296e4eb481c819011`);
        // updateData(value?.data().id)
    }, [value]);

    const updateData = async (workplaceId: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/workplaces/${workplaceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { data } = await res.json();
        const result = JSON.parse(data);

        setWorkplaces(result.workplaces);
    };

    const addWorkplace = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/workplaces`, {
            method: 'POST',
            body: JSON.stringify(newBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const routeChange = (url: string) => {
        router.push(url);
    };

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
export default Home;
