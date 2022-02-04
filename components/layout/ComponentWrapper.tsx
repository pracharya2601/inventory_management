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
import { useRouter } from 'next/router';
import AccountInfo from './user/AccountInfo';
import CreateWorkplace from './company/CreateWorkplace';
import ProductProcess from './product/ProductProcess';
import Button from '../elements/Button';
import Notification from './Notification';

interface ComponentWrapperProps {
    children?: JSX.Element | JSX.Element[];
    searchBarComponent?: JSX.Element;
    productPreview?: JSX.Element;
}

const ComponentWrapper = ({ children, searchBarComponent, productPreview }: ComponentWrapperProps) => {
    const sidebarRef = useRef(null);
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useOutsideClick(sidebarRef, setSidebarOpen);
    const {
        state: {
            user: { authenticated, workplaces, userdata },
            ui: { toggleOpen, alert },
            workplace: { productCatagory },
        },
        dispatch,
    } = useContext(appContext);
    return (
        <div className="dark relative min-h-screen w-screen overflow-x-hidden">
            {toggleOpen?.viewSearchBar && searchBarComponent && searchBarComponent}
            <div
                className="bg-gray-300 z-20 pr-2 dark:bg-gray-800 text-black border-b dark:text-gray-100 flex justify-between w-screen absolute"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="flex items-center">
                    <MenuIconButton setOpen={setSidebarOpen} />
                    <HomeButton />
                </span>
                <span className="flex items-center">
                    {authenticated && <ProfileButton />}
                    {!authenticated && <SigninButton />}
                    {authenticated && <SignoutButton />}
                </span>
            </div>

            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                sidebarItems={
                    userdata?.workplaces && (
                        <Workplaces
                            workplaces={userdata.workplaces}
                            productCatagory={productCatagory}
                            setOpen={setSidebarOpen}
                        />
                    )
                }
            />
            <SideboardOutline
                setOpen={() => {
                    dispatch(
                        action.toggleAction({
                            id: 'account',
                            open: false,
                        }),
                    );
                }}
                open={toggleOpen?.['account']}
                noOutsideClick={true}
                size="full"
                label="Account"
            >
                <AccountInfo />
            </SideboardOutline>
            <SideboardOutline
                open={toggleOpen?.['createworkplace']}
                label="Create Workplace"
                setOpen={() => {
                    dispatch(
                        action.toggleAction({
                            id: 'createworkplace',
                            open: false,
                        }),
                    );
                }}
                noOutsideClick={true}
                size="full"
            >
                <CreateWorkplace />
            </SideboardOutline>
            {userdata?.workplaces?.length > 0 && (
                <SideboardOutline
                    open={toggleOpen?.['processProduct']}
                    setOpen={() => {
                        dispatch(
                            action.toggleAction({
                                id: 'processProduct',
                                open: false,
                            }),
                        );
                    }}
                    size="full"
                    noOutsideClick={true}
                    label={`Process Order`}
                    bg="bg-gray-800 text-gray-100 md:border-l z-60"
                >
                    <ProductProcess />
                </SideboardOutline>
            )}
            {alert.map(({ type, value }, index: number) => (
                <Notification
                    key={`item-${index}-${type}`}
                    type={type}
                    value={value}
                    index={index}
                    onClick={() => {
                        dispatch(
                            action.deleteAlert({
                                index: index,
                            }),
                        );
                    }}
                    lastItem={alert.length - 1 === index ? true : false}
                    clearAll={() => {
                        dispatch(action.deleteAlert({ index: -1 }));
                    }}
                />
            ))}
            {productPreview && productPreview}
            <div className="flex-1 dark:bg-gray-900 dark:text-white h-screen overflow-auto">{children}</div>
        </div>
    );
};

export default ComponentWrapper;
