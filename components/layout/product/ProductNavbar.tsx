// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { productcontext } from '@context/data';
import { uicontext } from '@context/ui';
import React, { useContext } from 'react';
import ProductCatagoryButton from './ProductCatagoryNav';

const ProductNavbar = () => {
    const { productCatagoryList, isActiveCatagory, productCatagoryURL } = useContext(productcontext);
    const { setSearchBar } = useContext(uicontext);
    return (
        <div className="bg-gray-300 dark:bg-gray-800 sticky top-0 z-40 h-12  pr-px pl-px overflow-x-auto flex justify-start items-end">
            {productCatagoryList &&
                productCatagoryList.map(({ label, id }) => (
                    <ProductCatagoryButton
                        key={id}
                        active={isActiveCatagory(id)}
                        label={label}
                        url={productCatagoryURL(id)}
                    />
                ))}
            <span onClick={() => setSearchBar(true)}>
                <ProductCatagoryButton
                    key={'search_tab'}
                    active={isActiveCatagory('search')}
                    label={'Search'}
                    url={productCatagoryURL('search')}
                />
            </span>
            <div className="flex-1 border-b" />
        </div>
    );
};

export default ProductNavbar;
