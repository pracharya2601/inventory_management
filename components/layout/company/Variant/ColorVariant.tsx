import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import React, { useContext, useEffect, useState } from 'react';
import statColor from '../../../../colorsName.json';

const ColorVariant = () => {
    const {
        state: {
            workplace: { variant },
        },
        dispatch,
    } = useContext(appContext);
    const [state, setState] = useState<string[]>(variant?.colorVariants || []);
    const [colVal, setColVal] = useState<string>('');
    const [listColors, setListColors] = useState<string[]>(statColor.slice(0, 5));
    const [showDropDown, setShowDropDown] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setState(variant?.colorVariants);
        return () => {
            setState([]);
        };
    }, [variant]);

    const submitHandle = () => {
        const list = [...state];
        list.push(colVal.toLowerCase());
        setState(list);
        setColVal('');
    };

    const onHandleChange = (e) => {
        if (timer) {
            clearTimeout(timer);
        }
        setShowDropDown(true);
        const { value } = e.target;
        const searchTerm = value.toLowerCase();
        setColVal(value);
        const reg = new RegExp(searchTerm);
        const a = statColor.filter((term) => {
            if (term.toLowerCase().match(reg)) {
                return term;
            }
        });
        setListColors(a);
        setTimer(setTimeout(() => setShowDropDown(false), 5000));
    };

    const handleRemove = (i) => {
        const list = [...state];
        list.splice(i, 1);
        setState(list);
    };
    const resetHandle = () => {
        setState(variant?.colorVariants);
    };

    const updateHandle = () => {
        const arrayEquals = () => {
            return (
                Array.isArray(state) &&
                Array.isArray(variant.colorVariants) &&
                state.every((val, index) => val === variant.colorVariants[index])
            );
        };
        if (!arrayEquals() || state.length === variant.colorVariants.length) {
            dispatch(
                action.setVariant({
                    variant: {
                        ...variant,
                        colorVariants: state,
                    },
                }),
            );
        }
    };

    return (
        <>
            <div className="flex flex-col px-3 mt-2 relative">
                <Input
                    square
                    placeholder="Name of the color"
                    name="color-search"
                    value={colVal}
                    onChange={onHandleChange}
                />
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
                <Button
                    label="Add"
                    size="sm"
                    customClass=" mt-4 mb-2"
                    type="button"
                    onClick={submitHandle}
                    disabled={statColor.includes(colVal) && !state.includes(colVal.toLowerCase()) ? false : true}
                />
                <div className="flex justify-between mt-2">
                    <Button
                        label="Reset"
                        color="yellow"
                        size="xs"
                        customClass="w-36 mt-1 mb-2"
                        type="button"
                        onClick={resetHandle}
                    />
                    <Button
                        label="Update"
                        color="green"
                        customClass="w-36 mt-1 mb-2"
                        size="xs"
                        onClick={updateHandle}
                    />
                </div>

                <div className="flex flex-wrap py-2 gap-2">
                    {state?.map((color, index) => (
                        <div
                            key={`${color}-${index}`}
                            className="border py-1 pl-3 pr-1 rounded flex space-between gap-4"
                        >
                            <div className="h-6 w-10 flex-1 ml-2" style={{ background: color }} />
                            {color}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 cursor-pointer"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                onClick={() => handleRemove(index)}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ColorVariant;
