/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { signOut, signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Sidebar from './sidebar';
import { SigninButton, SignoutButton, HomeButton, MenuIconButton } from './NavButtons';

export interface ComponentLayoutProps {
    authenticated?: boolean;
    sidebarItems?: JSX.Element;
    sidebarItemsBottom?: JSX.Element;
    children?: JSX.Element;
}

export interface SidebarItemProps {
    markIcon?: boolean;
    label?: string | JSX.Element;
    icon?: JSX.Element;
    onClick?: () => void;
}

const ComponentLayout = ({ children, authenticated, sidebarItems, sidebarItemsBottom }: ComponentLayoutProps) => {
    const sidebarRef = useRef(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    useOutsideClick(sidebarRef, setOpen);
    return (
        <div className="dark relative min-h-screen w-screen overflow-x-hidden">
            <div
                className="bg-gray-300 z-20 pr-2 dark:bg-gray-800 text-black border-b dark:text-gray-100 flex justify-between w-screen absolute"
                onClick={(e) => e.stopPropagation()}
            >
                <MenuIconButton setOpen={setOpen} />
                <HomeButton />
                {!authenticated && <SigninButton />}
                {authenticated && <SignoutButton />}
            </div>

            <Sidebar
                open={open}
                setOpen={setOpen}
                sidebarItemsBottom={sidebarItemsBottom}
                sidebarItems={sidebarItems}
            />
            <div className="flex-1 dark:bg-gray-900 dark:text-white h-screen overflow-auto">{children}</div>
        </div>
    );
};

export default ComponentLayout;
