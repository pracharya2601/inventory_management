import React from 'react';
import { AlertProps } from '@/interface/elements/Alert';
import clsx from 'clsx';

const Alert = (props: AlertProps) => {
    const [hide, setHide] = React.useState(props.closeStat || false);

    const handleClick = () => {
        setHide(true);
        props.onClick && props.onClick();
    };

    return (
        <div
            className={clsx(
                {
                    'bg-yellow-200 border-yellow-600 text-yellow-600': props.type === 'alert',
                    'bg-green-200 border-green-600 text-green-600': props.type === 'success',
                    'bg-red-200 border-red-600 text-red-600': props.type === 'danger',
                    'cursor-pointer': props.onclickremove,
                    hidden: hide,
                },
                'border-l-4 p-4 relative',
            )}
            role="alert"
            onClick={() => {
                props.onclickremove && handleClick();
            }}
        >
            <p className="font-bold">{props.title}</p>
            <p>{props.text}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 absolute top-1/4 right-0 mr-2 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => handleClick()}
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export default Alert;
