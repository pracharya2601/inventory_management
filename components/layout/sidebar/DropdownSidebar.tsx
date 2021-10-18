import React, { useState } from 'react';

const DropdownSideBar = ({ children, label }: { children: JSX.Element | JSX.Element[]; label: string }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="border-b-2 border-t-2">
            <a
                onClick={() => setOpen(!open)}
                className="block py-2.5 px-4 rounded transition duration-200 bg-gray-200  dark:bg-gray-900 flex justify-between cursor-pointer"
            >
                {label}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${open && 'transform rotate-180'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
            <span className={`${!open && 'hidden'}`}>{children}</span>
        </div>
    );
};

export default DropdownSideBar;
