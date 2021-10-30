import { useOutsideClick } from '@/hooks/useOutsideClick';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { SidebarItem } from './SidebarItem';

interface SideBarProps {
    setOpen: (stat: boolean) => void;
    open: boolean;
    sidebarItems?: JSX.Element;
    sidebarItemsBottom?: JSX.Element;
}

const Sidebar = ({ setOpen, open, sidebarItems, sidebarItemsBottom }: SideBarProps) => {
    const sidebarRef = useRef(null);
    useOutsideClick(sidebarRef, setOpen);
    const router = useRouter();
    return (
        <div
            className={`${
                !open && '-translate-x-full'
            } flex flex-col z-50 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out`}
            ref={sidebarRef}
        >
            {/* <div className={`${!open && '-translate-x-full'} z-10 bg-gray-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out`} ref={sidebarRef}> */}
            <button
                className={`bg-${
                    open ? 'red' : 'blue'
                }-900 text-white p-2 rounded-r absolute bottom-0 right-0 mb-10 -mr-9 `}
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>
            {open && (
                <button
                    className="mobile-menu-button p-2 focus:outline-none text-white focus:bg-gray-600 absolute top-0 right-0 -mr-10 bg-gray-700 rounded-r"
                    onClick={() => setOpen(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}

            <Link href="/">
                <a href="" className="flex items-center space-x-2 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    <span className="text-2xl font-extrabold">Inventory</span>
                </a>
            </Link>

            <nav className="flex-1 flex flex-col justify-between h-full overflow-x-visible overflow-y-auto">
                <span className="pb-1">
                    <SidebarItem
                        onClick={() => router.push('/')}
                        label="Home Page"
                        markIcon={router.asPath === '/' ? true : false}
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
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        }
                    />
                    <SidebarItem
                        onClick={() => router.push('/dashboard')}
                        label="Dashboard"
                        markIcon={router.asPath === '/dashboard' ? true : false}
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
                                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                                />
                            </svg>
                        }
                    />
                    <SidebarItem
                        label="Add New"
                        onClick={() => router.push('/createnew')}
                        markIcon={router.asPath === '/createnew' ? true : false}
                        icon={
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        }
                    />
                    {sidebarItems}
                </span>
                <span className="gap-2 border-t-2 pt-1">{sidebarItemsBottom}</span>
            </nav>
        </div>
    );
};

export default Sidebar;
