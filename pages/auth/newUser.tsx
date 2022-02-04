/* eslint-disable react/prop-types */
import React from 'react';
import { HomeButton } from '@/components/layout/NavButtons';
import { getSession } from 'next-auth/client';
import { UserHeading } from '@/components/layout/user/kit';

const NewUser = ({ session }) => {
    console.log('usersesssion', session);
    return (
        <div className="dark bg-gray-900 py-10 px-3 fixed h-screen overflow-y-auto w-screen">
            <div className="flex flex-col m-auto mt-5 w-full w-3/4  max-w-lg px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 text-gray-200">
                <UserHeading />
            </div>
        </div>
    );
};
export default NewUser;

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session || !session.user) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        };
    }
    if (session && session.user && session.user.name && session.user.image) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}
