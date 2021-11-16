/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import Input from '@/components/elements/Input';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { appContext } from '@context/appcontext';
import { action } from '@context/action';
import { ProductList, ProductType } from '@/interface/Product/ProductInterface';

const SearchBar = () => {
    const router = useRouter();
    const id = router.query.id as string[];

    const [searchTerm, setSearchTerm] = useState('');

    const {
        state: {
            workplace: {
                productList: { dataType, data, initialData },
            },
            route: { asPath, pathName },
        },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        const s = pathName?.search as string;
        if (s) {
            setSearchTerm(s);
        }
    }, []);

    const onSubmitHandle = (e) => {
        e.preventDefault();
        console.log('Submitted');
        router.push(`/dashboard/${pathName?.id[0]}/${pathName?.id[1]}/${pathName?.id[2]}/1?search=${searchTerm}`);
    };

    const onHandleChange = (e) => {
        const { value } = e.target;
        const searchValue = value.toLowerCase();
        setSearchTerm(value);
        const filteredData: ProductList = initialData.filter((data: ProductType) => {
            return data.name.toLowerCase().search(searchValue) != -1;
        });
        dispatch(
            action.getSearchFilter({
                filteredData,
                dataType: 'search',
            }),
        );
    };

    const handleClear = () => {
        setSearchTerm('');
        dispatch(
            action.toggleAction({
                id: 'viewSearchBar',
                open: false,
            }),
        );
        dispatch(action.getSearchFilter({ filteredData: initialData, dataType: dataType }));
        if (pathName?.search) {
            router.push(`/dashboard/${pathName?.id[0]}/${pathName?.id[1]}/${pathName?.id[2]}/1`);
        }
    };

    return (
        <span className={`p-2 w-full px-5 py-12 border bg-gray-300 dark:bg-gray-900 fixed top-0 left-0 z-50 shadow-lg`}>
            <form onSubmit={onSubmitHandle}>
                <Input
                    value={searchTerm}
                    placeholder={`Searching on catagory ${dataType} and press Enter or return`}
                    onChange={onHandleChange}
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
