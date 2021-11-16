/* eslint-disable @typescript-eslint/no-unused-vars */
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { appContext } from '@context/appcontext';
import React, { useContext, useRef, useState } from 'react';
import {
    HomeButton,
    MenuIconButton,
    NotificationButton,
    ProfileButton,
    SigninButton,
    SignoutButton,
} from './NavButtons';
import Sidebar from './sidebar';
import SideboardOutline from './sideboard/SideboardOutline';
import Workplaces from './user/Workplaces';
import { action } from '@context/action';
import SearchBar from './searchbar';

interface ComponentWrapperProps {
    children?: JSX.Element | JSX.Element[];
}

const ComponentWrapper = ({ children }: ComponentWrapperProps) => {
    const sidebarRef = useRef(null);
    const accountBarRef = useRef(null);
    const notificationBarRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);
    useOutsideClick(sidebarRef, setSidebarOpen);
    useOutsideClick(accountBarRef, setAccountOpen);
    useOutsideClick(notificationBarRef, setNotiOpen);

    const {
        state: {
            user: { authenticated, workplaces },
            ui: { toggleOpen },
            workplace: { productCatagory },
            route,
        },
        dispatch,
    } = useContext(appContext);

    const setsideBarClosePreview = (stat: boolean) => {
        dispatch(
            action.toggleAction({
                id: 'previewProduct',
                open: false,
            }),
        );
    };
    return (
        <div className="dark relative min-h-screen w-screen overflow-x-hidden">
            {toggleOpen?.viewSearchBar && <SearchBar />}
            <div
                className="bg-gray-300 z-20 pr-2 dark:bg-gray-800 text-black border-b dark:text-gray-100 flex justify-between w-screen absolute"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="flex items-center">
                    <MenuIconButton setOpen={setSidebarOpen} />
                    <HomeButton />
                </span>
                <span className="flex items-center">
                    {authenticated && <NotificationButton setOpen={setNotiOpen} />}
                    {authenticated && <ProfileButton setOpen={setAccountOpen} />}
                    {!authenticated && <SigninButton />}
                    {authenticated && <SignoutButton />}
                </span>
            </div>

            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                sidebarItems={
                    workplaces && (
                        <Workplaces
                            workplaces={workplaces}
                            productCatagory={productCatagory}
                            setOpen={setSidebarOpen}
                        />
                    )
                }
            />
            <SideboardOutline open={accountOpen} setOpen={setAccountOpen}>
                <h1>Account</h1>
            </SideboardOutline>
            <SideboardOutline open={notiOpen} setOpen={setNotiOpen} size="small">
                <h1>Notification</h1>
            </SideboardOutline>
            <SideboardOutline open={toggleOpen?.['previewProduct']} setOpen={setsideBarClosePreview}>
                <h1>Previewing Item</h1>
            </SideboardOutline>
            <div className="flex-1 dark:bg-gray-900 dark:text-white h-screen overflow-auto">{children}</div>
        </div>
    );
};

export default ComponentWrapper;
