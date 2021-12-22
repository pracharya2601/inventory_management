import Button from '@/components/elements/Button';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

type BusinessNavbarProps = {
    name?: string;
    id?: string;
    position?: string;
};
const BusinessNavbar = ({ name, id, position }: BusinessNavbarProps) => {
    const router = useRouter();
    const { dispatch, state: { lugItem: { items } } } = useContext(appContext);

    const openSearchBarHandle = () => {
        dispatch(
            action.toggleAction({
                id: 'viewSearchBar',
                open: true,
            }),
        );
    };
    const openprocessProduct = () => {
        dispatch(
            action.toggleAction({
                id: 'processProduct',
                open: true,
            }),
        );
    };

    const onClickHandle = () => {
        router.asPath != `/${id}` && router.push(`/${id}`);
    };
    return (
        <div className="bg-gray-300 dark:bg-gray-800 sticky top-0 z-30 h-12 mt-1 flex justify-between border-b items-center px-2">
            <span className="flex items-center gap-2 font-bold cursor-pointer" onClick={() => onClickHandle()}>
                <p>{name}</p>
            </span>
            <div className='flex ml-auto'>
                {router.query?.businessId && router.query?.productType && router.query?.page && (
                    <CartIcon onClick={openprocessProduct} stat={items.length > 0 ? true : false} />
                )}
                {router.query?.businessId && router.query?.productType && router.query?.page && (
                    <SearchIcon onClick={openSearchBarHandle} />
                )}
            </div>
            {/* <p className="capitalize flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                    />
                </svg>
                {position}
            </p> */}
        </div>
    );
};

export default BusinessNavbar;

export const SearchIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            size="xs"
            customClass="mr-3"
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
export const CartIcon = ({ onClick, stat }: { onClick: () => void; stat: boolean }) => {
    return (
        <div className=" ml-auto mr-3 relative cursor-pointer" onClick={onClick}>
            {stat && <span className="flex h-2 w-2 absolute top-0 right-0">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </div>
    );
};
