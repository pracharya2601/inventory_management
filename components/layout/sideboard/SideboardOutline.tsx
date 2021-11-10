import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';

interface SideboardOutline {
    setOpen: (i: boolean) => void;
    open: boolean;
    children?: JSX.Element | JSX.Element[];
}

const SideboardOutline = ({ setOpen, open, children }: SideboardOutline) => {
    const sideboardRef = useRef(null);
    useOutsideClick(sideboardRef, setOpen);
    return (
        <div
            className={` ${
                !open && 'translate-x-full'
            } flex flex-col  z-50 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full md:w-9/12 lg:w-3/5 space-y-6 pt-4 absolute inset-y-0 right-0 transform transition duration-200 ease-in-out `}
            ref={sideboardRef}
        >
            {open && (
                <button
                    className="mobile-menu-button p-1 bg-gray-900 focus:outline-none text-white hover:bg-gray-600 absolute m-1 top-0 right-0 rounded"
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
            <div className="h-full overflow-x-visible overflow-y-auto py-2">{children}</div>
        </div>
    );
};

export default SideboardOutline;
