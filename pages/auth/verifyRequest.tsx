import React from 'react';
import { HomeButton } from '@/components/layout/NavButtons';
import { getSession } from 'next-auth/client';

const VerifyRequest = () => {
    return (
        <div className="dark bg-gray-900 py-10 px-3 fixed h-screen w-screen">
            <div className="flex flex-col m-auto mt-5 w-full w-3/4 md:w-96 max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className=" flex flex-col items-center mb-6 text-md font-light text-gray-600 dark:text-white">
                    <HomeButton />
                </div>
                <div className="flex flex-col items-center justify-center text-gray-100">
                    <p className="text-3xl">Check your email</p>
                    <div className="border-2 max-w-max rounded-full my-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-40 w-40"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-center">A sign in link has been sent to your email address.</p>
                </div>
            </div>
        </div>
    );
};
export default VerifyRequest;

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (session && session.user) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }
    return { props: {} };
}
