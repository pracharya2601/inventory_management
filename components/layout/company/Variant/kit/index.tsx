import Input from '@/components/elements/Input';
import { colorVariants } from '@/hooks/useVariants';
import React from 'react';

export const DropDownInputColor = ({ setVal, w }: { setVal?: (name: string) => void; w?: string }) => {
    const { listColors, timer, setTimer, colorVal, setColVal, showDropDown, setShowDropDown, onHandleChangeColor } =
        colorVariants();
    return (
        <div className={`relative w-full md:${w ? w : 'w-72'}`}>
            <div className="w-full flex items-center border">
                <div className="flex-1">
                    <Input
                        square
                        helper="Color"
                        type="text"
                        placeholder={`Type color name`}
                        value={colorVal}
                        onChange={onHandleChangeColor}
                    />
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 border-2 cursor-pointer bg-green-500 hover:bg-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => {
                        setVal && setVal(colorVal);
                        setColVal('');
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </div>
            {showDropDown && (
                <div
                    className="absolute z-60 top-12 w-72 bg-gray-900 rounded max-h-72 overflow-y-auto"
                    onMouseMove={() => {
                        if (timer) {
                            clearTimeout(timer);
                        }
                    }}
                    onMouseLeave={() => setTimer(setTimeout(() => setShowDropDown(false), 3000))}
                >
                    {listColors?.map((item) => (
                        <div
                            className=" rounded hover:bg-gray-800 cursor-pointer mb-px p-2 flex"
                            key={item}
                            onClick={() => {
                                setColVal(item);
                                setShowDropDown(false);
                                if (timer) {
                                    clearTimeout(timer);
                                }
                            }}
                        >
                            {item}
                            <div className="h-6 w-10 flex-1 ml-2" style={{ background: item }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
