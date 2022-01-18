/* eslint-disable react/prop-types */
import React from 'react';
import { signIn, getSession } from 'next-auth/client';
import Button from '@/components/elements/Button';
import { HomeButton } from '@/components/layout/NavButtons';

const Signin = (props) => {
    return (
        <div className="dark bg-gray-900 py-10 px-3 fixed h-screen w-screen">
            <div className="flex flex-col m-auto mt-5 w-full w-3/4 md:w-96 max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className=" flex flex-col items-center mb-6 text-md font-light text-gray-600 dark:text-white">
                    <HomeButton />
                    <p className='text-gray-200'>Login to your account</p>
                </div>
                <div className="flex flex-col gap-4 item-center">
                    <Button
                        label="Facebook"
                        color="blue"
                        fullwidth
                        onClick={() => signIn('facebook')}
                        icon={
                            <svg
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="mr-2"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
                            </svg>
                        }
                    />
                    <Button
                        label="Google"
                        color="red"
                        fullwidth
                        onClick={() => signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_API_HOST}${props.callbackUrl}` })}
                        icon={
                            <svg
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="mr-2"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                            </svg>
                        }
                    />
                </div>
            </div>
        </div>
    );
};
export default Signin;

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
    return { props: { callbackUrl: context.query.callbackUrl || '' } };
}
