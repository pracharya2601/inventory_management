import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { HomeButton } from '@/components/layout/NavButtons';
import { decrypt, encrypt } from '@/hooks/middleware/encrypt';
import { isMobileView } from '@/hooks/middleware/isMobileView';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { getImage } from 'db/firebase';

/* eslint-disable @typescript-eslint/no-explicit-any */
const ImageUpload = (props: { error: string }) => {
    const router = useRouter();
    const token = router.query?.token as string;
    const [formId, setFormId] = useState('');
    const [error, setError] = useState(props.error);

    const onSubmitHandle = () => {
        setError('');
        if (formId) {
            router.push(`/imageupload/${token}&&formId=${formId}`);
        } else {
            setError('Please fill out all the form and submit');
        }
    };
    return (
        <div className="dark bg-gray-900 py-10 px-3 fixed h-screen w-screen">
            <div className="flex flex-col m-auto mt-5 w-full w-3/4 md:w-96 max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className=" flex flex-col items-center mb-6 text-md font-light text-gray-600 dark:text-white">
                    <HomeButton />
                    <p className="text-gray-200">Upload Image from your phone</p>
                </div>
                {error && <p className="text-red-500 text-center my-2">{error}</p>}
                <div className="flex flex-col gap-4 item-center">
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Generated pin"
                            onChange={(e) => setFormId(e.target.value)}
                            type="pin"
                            value={formId}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                    />
                                </svg>
                            }
                        />
                        <Button color="blue" label={'Verify and Connect'} size="sm" onClick={() => onSubmitHandle()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;

export async function getServerSideProps(context: any) {
    const isMobile = isMobileView(context.req);
    if (!isMobile) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }
    const token = context.query?.token as string;
    const formId = context.query?.formId as string;
    let error = '';
    if (formId) {
        const decryptVal = decrypt<string>(token);
        const [storeId, pin] = decryptVal.split('-');
        if (pin === formId) {
            const newEncrypt = encrypt(`${new Date().getTime()}`);
            return {
                redirect: {
                    permanent: false,
                    destination: `/imageupload?iam=${newEncrypt}&&share=${storeId}`,
                },
            };
        } else {
            error = 'Form connect PIN not matching.';
        }
    }
    return {
        props: {
            error: error,
        },
    };
}
