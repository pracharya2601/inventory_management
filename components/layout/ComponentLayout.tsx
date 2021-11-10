/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useContext } from 'react';
import Link from 'next/link';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { signOut, signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Sidebar from './sidebar';
import SideboardOutline from './sideboard/SideboardOutline';
import { SigninButton, SignoutButton, HomeButton, MenuIconButton, ProfileButton, NotificationButton } from './NavButtons';
import { uicontext } from '@context/ui';
import DropDownMenu, { DropDownItem } from '../elements/ddm/DropDownMenu';

export interface ComponentLayoutProps {
    authenticated?: boolean;
    sidebarItems?: JSX.Element;
    sidebarItemsBottom?: JSX.Element;
    children?: JSX.Element | JSX.Element[];
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
    const { accountSidebar, setAccountSidebar, notificationSidebar, setNotificationSidebar, previewItm, setPreviewItm } = useContext(uicontext);
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

                    {authenticated && <NotificationButton />}
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
            <SideboardOutline open={notificationSidebar} setOpen={setNotificationSidebar} size="small">
                <h1>Notification</h1>
            </SideboardOutline>
            <SideboardOutline open={previewItm} setOpen={setPreviewItm}>
                <h1>Previewing Item</h1>
            </SideboardOutline>
            <div className="flex-1 dark:bg-gray-900 dark:text-white h-screen overflow-auto">{children}</div>
        </div>
    );
};

export default ComponentLayout;
