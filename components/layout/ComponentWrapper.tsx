/* eslint-disable @typescript-eslint/no-unused-vars */
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { uicontext } from '@context/ui';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { HomeButton, MenuIconButton, ProfileButton, SigninButton, SignoutButton } from './NavButtons';
import Sidebar from './sidebar';
import SideboardOutline from './sideboard/SideboardOutline';

interface ComponentWrapperProps {
    authenticated?: boolean;
    sidebarItems?: JSX.Element;
    sidebarItemsBottom?: JSX.Element;
    children?: JSX.Element | JSX.Element[];
}

const ComponentWrapper = ({ children, authenticated, sidebarItems, sidebarItemsBottom }: ComponentWrapperProps) => {
    const sidebarRef = useRef(null);
    const [open, setOpen] = useState(false);
    const { accountSidebar, setAccountSidebar } = useContext(uicontext);
    const router = useRouter();
    useOutsideClick(sidebarRef, setOpen);
    return (
        <div className="dark relative min-h-screen w-screen overflow-x-hidden">
            <div
                className="bg-gray-300 z-20 pr-2 dark:bg-gray-800 text-black border-b dark:text-gray-100 flex justify-between w-screen absolute"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="flex items-center">
                    <MenuIconButton setOpen={setOpen} />
                    <HomeButton />
                </span>
                <span className="flex items-center">
                    {authenticated && <ProfileButton />}
                    {!authenticated && <SigninButton />}
                    {authenticated && <SignoutButton />}
                </span>
            </div>

            <Sidebar
                open={open}
                setOpen={setOpen}
                sidebarItemsBottom={sidebarItemsBottom}
                sidebarItems={sidebarItems}
            />
            <SideboardOutline open={accountSidebar} setOpen={setAccountSidebar}>
                <h1>Account</h1>
            </SideboardOutline>
            <div className="flex-1 dark:bg-gray-900 dark:text-white h-screen overflow-auto">{children}</div>
        </div>
    );
};

export default ComponentWrapper;
