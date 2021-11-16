import { signOut, signIn } from 'next-auth/client';
import Link from 'next/dist/client/link';
import React from 'react';
import { useContext } from 'react';
import { uicontext } from '@context/ui';

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

export const NotificationButton = ({ setOpen }: { setOpen: (i: boolean) => void }) => {
    return (
        <div className=" ml-auto mr-3 relative cursor-pointer" onClick={() => setOpen(true)}>
            <span className="flex h-2 w-2 absolute top-0 right-0">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
        </div>
    );
};

export const ProfileButton = ({ setOpen }: { setOpen: (i: boolean) => void }) => {
    return (
        <div className=" ml-auto cursor-pointer hover:ring-2 ring-blue rounded-full" onClick={() => setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

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
