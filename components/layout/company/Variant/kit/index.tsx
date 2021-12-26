import Input from '@/components/elements/Input';
import { useColorDropdown } from '@/hooks/useVariants';
import React from 'react';

export const DropDownInputColor = ({ setVal, w }: { setVal?: (name: string) => void; w?: string }) => {
    const { listColors, timer, setTimer, colorVal, setColVal, showDropDown, setShowDropDown, onHandleChangeColor } =
        useColorDropdown();
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
                        if (colorVal) {
                            setVal && setVal(colorVal);
                            setColVal('');
                        }
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

export const ColorItem = ({ color, onRemove }: { color: string; onRemove: () => void; }) => (
    <div
        className="border py-1 pl-3 pr-1 rounded flex items-center space-between gap-4"
    >
        <div className="h-6 w-10 flex-1 ml-2" style={{ background: color }} />
        {color}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={onRemove}
        >
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
            />
        </svg>
    </div>
)
