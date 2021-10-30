/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { uicontext } from '@context/ui';
import { usercontext } from '@context/user';
import { productcontext } from '@context/data';
import clsx from 'clsx';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';

// eslint-disable-next-line react/prop-types
const BusinessHeader = () => {
    const router = useRouter();
    const id = router.query.id as string[];
    const companyId = id && id[0];

    const { searchBar, setSearchBar, searchTerm } = useContext(uicontext);
    const { workplaces } = useContext(usercontext);
    const { isDataFetched } = useContext(productcontext);
    const renderWorkplace =
        workplaces.length > 0 && workplaces.find((item: WorkplaceTypes) => item.workplaceId === companyId);

    const wrappedClass = clsx(`flex items-center gap-1 cursor-pointer py-1 px-2 border rounded ml-auto mr-3 `, {
        'hover:bg-green-900': !searchTerm,
        'bg-red-500 hover:bg-red-900 animate-pulse': searchTerm && !searchBar,
    });

    const onSearchIconClick = () => {
        setSearchBar(true);
    };

    const businessLogoClick = () => {
        if (router.asPath === `/dashboard/${companyId}`) {
            return;
        }
        router.push(`/dashboard/${companyId}`);
    };

    if (companyId) {
        return (
            <div className="bg-gray-300 dark:bg-gray-800 sticky top-0 z-30 h-12 mt-1 flex justify-between border-b items-center px-2">
                <span className="flex items-center gap-2 font-bold cursor-pointer" onClick={businessLogoClick}>
                    <Image src={'/icon.png'} height={20} width={20} />
                    <p>{renderWorkplace.workplaceName}</p>
                </span>
                {isDataFetched && (
                    <p className={wrappedClass} onClick={onSearchIconClick}>
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </p>
                )}
                <p className="capitalize flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {renderWorkplace.positionLabel}
                </p>
            </div>
        );
    }

    return <></>;
};

export default BusinessHeader;
