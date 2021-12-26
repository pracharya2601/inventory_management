/* eslint-disable react/prop-types */
import React from 'react';
import ProductNavbar from './ProductNavbar';

interface ProductLayoutProps {
    children?: JSX.Element | JSX.Element[];
    pagination?: JSX.Element;
}

const ProductLayout = ({ children, pagination }: ProductLayoutProps) => {
    return (
        <>
            <ProductNavbar />
            <div className="overflow-x-auto sticky top-10">
                <div className="inline-block min-w-full shadow overflow-hidden">
                    {children && children}
                    {!children && <div className="h-96 flex justify-center items-center">No data Found</div>}
                </div>
            </div>
            {pagination}
        </>
    );
};
export default ProductLayout;
