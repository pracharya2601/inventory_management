import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';

interface SideboardOutline {
    setOpen: (i: boolean) => void;
    open: boolean;
    children?: JSX.Element | JSX.Element[];
    size?: 'small' | 'normal' | 'full';
    noOutsideClick?: boolean;
    label?: string | JSX.Element;
    bg?: string;
}

const SideboardOutline = ({ setOpen, open, children, size, noOutsideClick, label, bg }: SideboardOutline) => {
    const sideboardRef = useRef(null);
    !noOutsideClick && useOutsideClick(sideboardRef, setOpen);
    return (
        <div
            className={` ${!open && 'translate-x-full'} 
            flex flex-col w-full max-h-screen h-screen
            ${size === 'small' ? ' md:w-80 lg:w-96' : size === 'full' ? '' : 'md:w-9/12 lg:w-3/5'}
            ${label && 'space-y-4'}
            ${bg ? bg : ' bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100'} 
            z-50 absolute inset-y-0 right-0 transform transition duration-200 ease-in-out `}
            ref={sideboardRef}
        >
            <div className={`${label && 'border-b'} h-11 flex justify-between gap-1`}>
                <div className="px-2  py-1 max-w-max flex-1 truncate text-lg capitalize">{label}</div>
                {open && (
                    <button
                        className="mobile-menu-button p-1 bg-gray-900 focus:outline-none text-white hover:bg-gray-600 rounded m-1"
                        onClick={() => setOpen(false)}
                    >
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className="h-full overflow-x-visible overflow-y-auto pt-2 pb-10">{children}</div>
        </div>
    );
};

export default SideboardOutline;
