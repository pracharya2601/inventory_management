// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import ProductCatagoryButton from './ProductCatagoryNav';

const ProductNavbar = () => {
    const router = useRouter();
    const {
        state: {
            workplace: { productCatagory },
        },
    } = useContext(appContext);

    const productCatagoryURL = (catagoryName: string): string => {
        return `http://localhost:3000/${router.query?.businessId}/${catagoryName}/1`;
    };

    const isActiveCatagory = (ctName: string): boolean => {
        //return dataType === ctName && true;
        return router.query?.productType === ctName && true;
    };

    return (
        <div className="bg-gray-300 dark:bg-gray-800 sticky top-0 z-40 h-12  pr-px pl-px overflow-x-auto flex justify-start items-end">
            {productCatagory.map(({ label, id }) => (
                <ProductCatagoryButton
                    key={id}
                    active={isActiveCatagory(id)}
                    label={label}
                    url={productCatagoryURL(id)}
                />
            ))}
            <div className="flex-1 border-b" />
        </div>
    );
};

export default ProductNavbar;
