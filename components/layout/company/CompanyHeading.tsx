/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '@/components/elements/Button';
import { appContext } from '@context/appcontext';
import { productcontext } from '@context/data';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { useContext } from 'react';

export const CompanyNav = () => {
    const {
        state: {
            workplace: { companydata },
        },
    } = useContext(appContext);
    const router = useRouter();
    const logoUrl = '/icon.png';

    return (
        <span
            className="flex items-center gap-2 font-bold cursor-pointer"
            onClick={() => router.push(`/dashboard/${companydata?._id}`)}
        >
            <Image src={logoUrl} height={20} width={20} />
            <p>{companydata?.workplaceName}</p>
        </span>
    );
};

export const SearchIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            size="xs"
            customClass="ml-auto mr-3"
            variant="outlined"
            onClick={onClick}
            icon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            }
        />
    );
};

export const BusinessStaffPosition = () => {
    return (
        <p className="capitalize flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                />
            </svg>
            {'Admin'}
        </p>
    );
};
