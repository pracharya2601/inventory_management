import { useState } from 'react';
import Button from '../Button';

const Modal = ({
    label,
    heading,
    children,
    onClick,
}: {
    label: string | JSX.Element;
    heading?: string;
    children?: JSX.Element | JSX.Element[];
    onClick?: () => void;
}) => {
    const [active, setActive] = useState(false);
    return (
        <>
            <div className="w-full" onClick={() => setActive(true)}>
                {label}
            </div>
            {active && (
                <div
                    className="fixed top-0 left-0 h-screen w-screen z-60 opacity-100 flex justify-center items-center"
                    style={{ backgroundColor: `rgb(0,0,0, 0.7)` }}
                    onClick={() => setActive(false)}
                    id="modal_wrapper"
                >
                    <div
                        className="border rounded bg-gray-900 opacity-100 min-h-sm max-w-screen-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-3 flex justify-between">
                            <div className="mr-10 ">{heading || `Question ?`}</div>
                            <Button
                                size="xs"
                                color="red"
                                onClick={() => setActive(false)}
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
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                        <hr />
                        {children && (
                            <>
                                <div className="p-3">{children}</div>
                                <hr />
                            </>
                        )}
                        <div className="p-3 flex justify-between">
                            <Button label={'Close'} size="xs" color="yellow" onClick={() => setActive(false)} />
                            <Button
                                label={'Submit'}
                                size="xs"
                                color="green"
                                onClick={() => {
                                    onClick && onClick();
                                    setActive(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
