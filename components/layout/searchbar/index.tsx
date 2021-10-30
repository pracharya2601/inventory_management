import { useRouter } from 'next/dist/client/router';
import Input from '@/components/elements/Input';
import React, { useContext, useRef } from 'react';
import { uicontext } from '@context/ui';
import { productcontext } from '@context/data';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const SearchBar = () => {
    const { searchTerm, setSearchTerm, setSearchBar } = useContext(uicontext);
    const { initialData, setProductList, productCatagoryURL } = useContext(productcontext);
    const router = useRouter();
    const id = router.query.id as string[];
    const dataType = id && id[2];

    const urlPath = productCatagoryURL('search');

    const searchBarRef = useRef(null);
    useOutsideClick(searchBarRef, setSearchBar);

    const onSubmitHandle = (e) => {
        e.preventDefault();
        setProductList(initialData);
        router.push(urlPath + '?search=' + searchTerm);
    };

    const onHandleChange = (e) => {
        const { value } = e.target;
        const searchValue = value.toLowerCase();
        const filteredData = initialData.filter((data) => {
            return data.name.toLowerCase().search(searchValue) != -1;
        });
        setSearchTerm(value);
        setProductList(filteredData);
    };
    const handleClear = () => {
        setSearchBar(false);
        setSearchTerm('');
        setProductList(initialData);
        router.push(urlPath);
    };

    return (
        <span
            className="p-2 border rounded-xl bg-gray-900 fixed top-10 left-10 right-10 md:left-20 md:right-20 lg:right-32 lg:left-32  z-50"
            ref={searchBarRef}
        >
            <form onSubmit={onSubmitHandle}>
                <Input
                    value={searchTerm}
                    placeholder={`Searching on catagory ${dataType} and press enter or return`}
                    onChange={onHandleChange}
                    onClear={() => handleClear()}
                    autofocus
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
