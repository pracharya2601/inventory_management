/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import Input from '@/components/elements/Input';
import React, { useContext } from 'react';
import { appContext } from '@context/appcontext';
import { action } from '@context/action';

type SearchBarProps = {
    searchTerm?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear?: () => void;
};

const SearchBar = ({ searchTerm, onChange, handleClear }: SearchBarProps) => {
    const router = useRouter();
    const { dispatch } = useContext(appContext);

    const onSubmitHandle = (e) => {
        e.preventDefault();
        dispatch(
            action.toggleAction({
                id: 'viewSearchBar',
                open: false,
            }),
        );
        router.push(`/${router.query?.businessId}/${router.query?.productType}/1?search=${searchTerm}`);
    };

    return (
        <span className={`p-2 w-full px-5 py-12 border bg-gray-300 dark:bg-gray-900 fixed top-0 left-0 z-50 shadow-lg`}>
            <form onSubmit={onSubmitHandle}>
                <Input
                    value={searchTerm}
                    placeholder={`Searching on catagory ${router.query?.productType} and press Enter or return`}
                    onChange={onChange}
                    onClear={() => handleClear()}
                    autofocus
                    square
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    }
                />
            </form>
        </span>
    );
};

export default SearchBar;
