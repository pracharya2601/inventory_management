import { signOut, signIn } from 'next-auth/client';
import Link from 'next/dist/client/link';
import React from 'react';

export const MenuIconButton = ({ setOpen }: { setOpen: (stat: boolean) => void }) => (
    <button
        className="mobile-menu-button p-2 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 "
        onClick={() => setOpen(true)}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
);

export const HomeButton = () => (
    <Link href="/">
        <a href="" className="text-gray-800 dark:text-white flex items-center space-x-2 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            <span className="text-lg font-extrabold">Inventory</span>
        </a>
    </Link>
);

export const SigninButton = () => (
    <button
        className="mobile-menu-button text-blue-500 font-bold uppercase hover:text-blue-700 p-2 px-3 focus:outline-none focus:bg-gray-700 ml-auto text-xs items-center flex"
        onClick={() => signIn()}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
        </svg>
        Login
    </button>
);

export const SignoutButton = () => (
    <button
        className="mobile-menu-button font-bold uppercase text-red-500 hover:text-red-700 p-2 px-3 text-xs items-center focus:outline-none focus:bg-gray-700 ml-auto flex "
        onClick={() => signOut()}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
        </svg>
        Logout
    </button>
);
