import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { SidebarItem } from './SidebarItem';

export interface SidebaeBottomProps {
    children?: JSX.Element;
}

const SidebarBottomItems = ({ children }: SidebaeBottomProps) => {
    const { dispatch } = useContext(appContext);
    const router = useRouter();
    const accountHandleler = () => {
        dispatch(
            action.toggleAction({
                id: 'account',
                open: true,
            }),
        );
    };
    return (
        <>
            <SidebarItem
                onClick={() => accountHandleler()}
                label="Account"
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                }
            />
            <SidebarItem
                onClick={() => router.push('/privacy')}
                label="Privacy Policy"
                markIcon={router.asPath === '/privacy' ? true : false}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                }
            />
            {children}
        </>
    );
};

export default SidebarBottomItems;
