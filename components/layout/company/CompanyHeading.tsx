/* eslint-disable @typescript-eslint/no-unused-vars */
import { productcontext } from '@context/data';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { useContext } from 'react';

export const CompanyNav = () => {
    const { company } = useContext(productcontext);
    const router = useRouter();
    const logoUrl = '/icon.png';

    return (
        <span
            className="flex items-center gap-2 font-bold cursor-pointer"
            onClick={() => router.push(`/dashboard/${company._id}`)}
        >
            <Image src={logoUrl} height={20} width={20} />
            <p>{company.workplaceName}</p>
        </span>
    );
};

export const BusinessStaffPosition = () => {
    const { company } = useContext(productcontext);
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
