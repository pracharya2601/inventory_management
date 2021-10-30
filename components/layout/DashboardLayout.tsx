/* eslint-disable react/prop-types */
import { productcontext } from '@context/data';
import { uicontext } from '@context/ui';
import React, { useContext } from 'react';
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
    const { accountSidebar, setAccountSidebar } = useContext(uicontext);
    if (whichDataToFetched === 'dashboard') {
        return (
            <div className="bg-gray-200 dark:bg-gray-900 min-h-full pt-10">
                <p>Dashboard Context here</p>
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
            <SideboardOutline open={accountSidebar} setOpen={setAccountSidebar}>
                <h1>Hello</h1>
            </SideboardOutline>
        </div>
    );
};
export default DashboardLayout;

const TableHead = () => (
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
                Count
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
                Size
            </th>
        </tr>
    </thead>
);
