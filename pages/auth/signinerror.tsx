import React from 'react';
import { signIn, getSession } from 'next-auth/client';
import Button from '@/components/elements/Button';
import { useRouter } from 'next/dist/client/router';
import Alert from '@/components/elements/Alert';

const errors = {
    Signin: 'Try signing with a different account.',
    OAuthSignin: 'Try signing with a different account.',
    OAuthCallback: 'Try signing with a different account.',
    OAuthCreateAccount: 'Try signing with a different account.',
    EmailCreateAccount: 'Try signing with a different account.',
    Callback: 'Try signing with a different account.',
    OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
};

const SigninError = () => {
    const router = useRouter();
    const error: any = router.query.error;
    return (
        <div className="flex flex-col m-auto mt-5 w-full sm:w-96 max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                Error while Login
            </div>
            <Alert type="danger" title="Login Error" text={errors[error]} />
            <div className="flex flex-col mt-5 gap-4 item-center">
                <Button label="Go to Login Page" color="blue" fullwidth onClick={() => router.push('/signin')} />
            </div>
        </div>
    );
};
export default SigninError;

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
