/* eslint-disable react/prop-types */
import { productcontext } from '@context/data';
import { uicontext } from '@context/ui';
import React, { useContext } from 'react';
import CreatenewLayout from './createnewLayout';
import SideboardOutline from './sideboard/SideboardOutline';
interface DashboardLayoutProps {
    children?: JSX.Element | JSX.Element[];
    businessHeading?: JSX.Element;
    businessData?: JSX.Element;
    productHeading?: JSX.Element;
    pagination?: JSX.Element;
}

const DashboardLayout = ({
    children,
    businessHeading,
    businessData,
    productHeading,
    pagination,
}: DashboardLayoutProps) => {
    const { isDataFetched, whichDataToFetched } = useContext(productcontext);
    if (whichDataToFetched === 'dashboard') {
        return (
            <div className="bg-gray-200 dark:bg-gray-900 min-h-full pt-10">
                <CreatenewLayout />
            </div>
        );
    }
    if (whichDataToFetched === 'company') {
        return (
            <div className="bg-gray-200 dark:bg-gray-900 min-h-full pt-10">
                {businessHeading}
                <CreatenewLayout />
            </div>
        );
    }
    return (
        <div className="bg-gray-200 dark:bg-gray-900 min-h-full pt-10">
            {(whichDataToFetched === 'company' || isDataFetched) && businessHeading}
            {isDataFetched && productHeading}
            {isDataFetched && children && children}
            {isDataFetched && businessData && (
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full shadow overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <TableHead />
                            <tbody>{businessData}</tbody>
                        </table>
                        {pagination}
                    </div>
                </div>
            )}
        </div>
    );
};
export default DashboardLayout;

export const TableHead = () => (
    <thead>
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
                Size
            </th>
        </tr>
    </thead>
);
