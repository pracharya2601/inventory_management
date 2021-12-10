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
                    {children && (
                        <table className="min-w-full leading-normal">
                            <thead>
                                <TableHead />
                            </thead>
                            <tbody>{children}</tbody>
                        </table>
                    )}
                    {pagination}
                    {!children && <div className="h-96 flex justify-center items-center">No data Found</div>}
                </div>
            </div>
        </>
    );
};
export default ProductLayout;

export const TableHead = () => (
    <tr>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Name
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Color
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Size
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Count
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Price
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Detail
        </th>
    </tr>
);
